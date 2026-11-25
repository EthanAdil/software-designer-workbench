/* 真题题库自检：node tools/check-real.js */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const memory = {};
const sandbox = {
  console,
  Math,
  Date,
  JSON,
  setTimeout,
  clearTimeout,
  localStorage: {
    getItem(k) { return Object.prototype.hasOwnProperty.call(memory, k) ? memory[k] : null; },
    setItem(k, v) { memory[k] = String(v); },
    removeItem(k) { delete memory[k]; }
  },
  document: {
    body: { setAttribute() {}, getAttribute() { return 'light'; } },
    getElementById() { return null; },
    querySelectorAll() { return []; }
  }
};
sandbox.window = sandbox;
sandbox.window.matchMedia = () => ({ matches: false });
sandbox.window.addEventListener = () => {};
sandbox.window.location = { hash: '' };
sandbox.window.scrollTo = () => {};
vm.createContext(sandbox);

const files = [
  'assets/js/core.js',
  'assets/js/data-syllabus.js',
  'assets/js/data-plan.js',
  'assets/js/data-exams.js',
  'assets/js/data-real.js'
];
const bankDir = path.join(root, 'assets/js/bank');
fs.readdirSync(bankDir).filter(f => f.endsWith('.js')).sort()
  .forEach(f => files.push('assets/js/bank/' + f));
const realDir = path.join(root, 'assets/js/real');
fs.readdirSync(realDir).filter(f => f.endsWith('.js')).sort()
  .forEach(f => files.push('assets/js/real/' + f));

files.forEach(rel => {
  vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), sandbox, { filename: rel });
});

const RK = sandbox.window.RK;
const errors = [];
const warnings = [];
const questions = RK.real.questions;
const BLANK_RE = /_{2,}|（\s*\d*\s*）|\(\s*\)/g;
const blankGroups = {};

function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

/* 1. 基本结构 */
if (!RK.real || !RK.real.papers.length) fail('真题题库未注册任何套卷');
if (!questions.length) fail('真题题库没有题目');

const ids = {};
const paperNos = {};
questions.forEach(q => {
  if (ids[q.id]) fail('题目 id 重复：' + q.id);
  ids[q.id] = true;
  if (!RK.MODULE_MAP[q.module]) fail(q.id + ' 的 module 不在 RK.MODULES：' + q.module);
  if (!q.stem) fail(q.id + ' 缺少题干');
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    fail(q.id + ' 选项数不是 4（' + (q.options ? q.options.length : 'null') + '）');
  } else if (q.options.some(o => !o || !String(o).trim())) {
    fail(q.id + ' 存在空选项');
  }
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) {
    fail(q.id + ' 答案不是 0~3 的整数：' + q.answer);
  }
  if (!q.explanation) fail(q.id + ' 缺少解析');
  var ex = RK.real.explanationFor(q);
  if (!ex || !ex.answer || !ex.idea || !ex.derivation) {
    fail(q.id + ' 三段解析不完整（答案 / 解题思路 / 推导过程）');
  }
  if (/选项\s*[A-D]|[（(]\s*[A-D]\s*[）)]\s*(正确|为答案)/.test(ex.idea + ex.derivation)) {
    fail(q.id + ' 解析出现选项字母引用（展示层会乱序错位）');
  }
  if (!RK.real.paperMap[q.paper]) fail(q.id + ' 的 paper 未注册：' + q.paper);
  const paper = RK.real.paperMap[q.paper];
  if (paper) {
    if (q.year !== paper.year) fail(q.id + ' 的 year 与套卷不一致：' + q.year + ' vs ' + paper.year);
    if (q.paperType !== paper.paperType) fail(q.id + ' 的 paperType 与套卷不一致：' + q.paperType + ' vs ' + paper.paperType);
  }
  if (q.kind !== 'choice') fail(q.id + ' 的 kind 不是 choice：' + q.kind);
  if (!q.source || !q.answerSource || !q.explanationSource) {
    fail(q.id + ' 缺少 source / answerSource / explanationSource');
  }
  if (['crosschecked', 'single-source', 'recalled', 'pending'].indexOf(q.verified) < 0) {
    fail(q.id + ' 的 verified 值不合法：' + q.verified);
  }
  if (q.group > 1) {
    if (!Number.isInteger(q.blank) || q.blank < 1 || q.blank > q.group) {
      fail(q.id + ' 多空题的 blank 不合法：' + q.blank + '/' + q.group);
    } else {
      const stem = String(q.stem || '');
      const found = (stem.match(BLANK_RE) || []).length;
      if (found < q.group) fail(q.id + ' 多空题题干横线不足：需要 ' + q.group + ' 处，实际 ' + found);
      const groupKey = q.paper + '#' + q.group + '#' + stem;
      const slot = blankGroups[groupKey] || (blankGroups[groupKey] = { ids: {}, count: 0 });
      if (slot.ids[q.blank]) fail(q.id + ' 多空题 blank 重复：' + q.blank + '/' + q.group);
      slot.ids[q.blank] = q.id;
      slot.count += 1;
    }
  } else if (q.blank) {
    warn(q.id + ' 单空题 blank 应为 0，实际 ' + q.blank);
  }
  const key = q.paper + '#' + q.no;
  if (paperNos[key]) fail('同一套卷题号重复：' + key);
  paperNos[key] = true;
});

Object.keys(blankGroups).forEach(key => {
  const g = blankGroups[key];
  const total = Number(key.split('#')[1]);
  for (let i = 1; i <= total; i += 1) {
    if (!g.ids[i]) fail('多空题缺少 blank ' + i + '：' + key + '（已有 ' + g.count + ' 条）');
  }
});

/* 2. 套卷计数 */
RK.real.papers.forEach(p => {
  const n = RK.real.paperCount(p.key);
  if (n !== p.count) fail(p.label + ' 的 count 与实收题数不一致：' + p.count + ' vs ' + n);
  if (p.count > p.total) fail(p.label + ' 实收题数超过原卷总题数');
  if (p.pending && p.count !== 0) fail(p.label + ' 标记为待补但已收题：' + p.count);
  const modules = RK.real.paperModuleCount(p.key);
  if (!p.pending && modules < 2) warn(p.label + ' 仅覆盖 ' + modules + ' 个模块');
});

/* 3. 与自编题库隔离 */
if (RK.bank.morning.length !== 607) {
  fail('自编上午题库题量应为 607，实际 ' + RK.bank.morning.length);
}
if (Object.keys(RK.qIndex).length !== 631) {
  fail('RK.qIndex 应只含 607 道上午题 + 24 道下午案例，实际 ' + Object.keys(RK.qIndex).length);
}
questions.forEach(q => {
  if (RK.qIndex[q.id]) fail('真题 id 混入自编题库索引：' + q.id);
});

/* 4. 模块覆盖与答案分布 */
const dist = [0, 0, 0, 0];
const modRows = [];
RK.MODULES.forEach(m => {
  const n = RK.real.moduleCount(m.key);
  modRows.push({ key: m.key, name: m.name, n });
  if (n === 0) warn('模块无真题：' + m.name);
});
questions.forEach(q => { if (dist[q.answer] !== undefined) dist[q.answer] += 1; });

/* 5. 输出 */
console.log('真题题库：');
RK.real.papers.forEach(p => {
  console.log('  ' + p.label + '  ' + p.count + ' / ' + p.total + ' 题  ' +
    RK.real.paperModuleCount(p.key) + ' 个模块');
});
console.log('  合计 ' + questions.length + ' 题 / ' + RK.real.papers.length + ' 套卷');

console.log('\n模块覆盖：');
modRows.forEach(r => {
  const mark = r.n === 0 ? '!!' : ' ok';
  console.log('  ' + mark + '  ' + r.name.padEnd(18) + String(r.n).padStart(3) + ' 题');
});

console.log('\n答案位置：' + dist.join(' / ') + '（0/1/2/3）');
console.log('自编题库：' + RK.bank.morning.length + ' 题；真题题库：' + questions.length + ' 题');

if (warnings.length) {
  console.log('\n提示：');
  warnings.forEach(w => console.log('  - ' + w));
}
if (errors.length) {
  console.log('\n错误：');
  errors.forEach(e => console.log('  × ' + e));
  process.exitCode = 1;
} else {
  console.log('\n真题题库自检通过');
}
