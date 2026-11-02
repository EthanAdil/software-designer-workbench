/* 题库与数据自检：node tools/check-data.js */
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
    getElementById() { return null; },
    querySelectorAll() { return []; },
    addEventListener() {},
    body: { setAttribute() {}, getAttribute() { return 'light'; } },
    readyState: 'loading'
  }
};
sandbox.window = sandbox;
sandbox.window.matchMedia = () => ({ matches: false });
sandbox.window.addEventListener = () => {};
sandbox.window.location = { hash: '' };
vm.createContext(sandbox);

const files = [
  'assets/js/core.js',
  'assets/js/data-syllabus.js',
  'assets/js/data-plan.js',
  'assets/js/data-exams.js'
];
const bankDir = path.join(root, 'assets/js/bank');
fs.readdirSync(bankDir).filter(f => f.endsWith('.js')).sort()
  .forEach(f => files.push('assets/js/bank/' + f));

files.forEach(rel => {
  const code = fs.readFileSync(path.join(root, rel), 'utf8');
  vm.runInContext(code, sandbox, { filename: rel });
});

const RK = sandbox.window.RK;
const errors = [];
const warnings = [];

/* 1. 题目结构 */
const ids = new Set();
RK.bank.morning.forEach(q => {
  if (ids.has(q.id)) errors.push('题目 id 重复: ' + q.id);
  ids.add(q.id);
  if (!Array.isArray(q.options) || q.options.length < 2) errors.push(q.id + ' 选项数量异常');
  if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) errors.push(q.id + ' answer 越界');
  if (!q.explanation) errors.push(q.id + ' 缺少解析');
  if (!RK.MODULE_MAP[q.module]) errors.push(q.id + ' module 未知: ' + q.module);
});
RK.bank.afternoon.forEach(q => {
  if (ids.has(q.id)) errors.push('题目 id 重复: ' + q.id);
  ids.add(q.id);
  const sum = q.questions.reduce((a, b) => a + b.score, 0);
  if (sum !== q.points) warnings.push(q.id + ' 小问分数合计 ' + sum + ' ≠ 总分 ' + q.points);
});

/* 2. 模块覆盖 */
console.log('模块题量：');
RK.MODULES.forEach(m => {
  const n = (RK.byModule[m.key] || []).length;
  const mark = n >= m.weight ? 'ok ' : 'LOW';
  console.log(`  ${mark} ${m.name.padEnd(12, ' ')} 权重 ${String(m.weight).padStart(2)} / 题库 ${String(n).padStart(3)}`);
  if (n < m.weight) errors.push(m.name + ' 题量不足以组卷');
});
console.log(`上午题合计 ${RK.bank.morning.length} 题，下午案例 ${RK.bank.afternoon.length} 道`);

/* 3. 组卷 */
RK_EXAMS = sandbox.window.RK_EXAMS;
const totalWeight = RK_EXAMS.morningRules.reduce((a, r) => a + r.count, 0);
if (totalWeight !== 75) errors.push('上午卷组卷规则合计 ' + totalWeight + ' ≠ 75');
RK_EXAMS.mocks.forEach(p => {
  const paper = RK.buildPaper(p.rules);
  if (paper.length !== 75) errors.push(p.name + ' 实际组卷 ' + paper.length + ' 题');
});
RK_EXAMS.stages.forEach(p => {
  const paper = RK.buildPaper(p.rules);
  const want = p.rules.reduce((a, r) => a + r.count, 0);
  if (paper.length !== want) errors.push(p.name + ' 实际组卷 ' + paper.length + ' 题（期望 ' + want + '）');
});

/* 4. 下午卷可组题 */
const typeCount = {};
RK.bank.afternoon.forEach(q => { typeCount[q.type] = (typeCount[q.type] || 0) + 1; });
['dfd', 'uml', 'db', 'algo', 'java', 'cpp'].forEach(t => {
  if (!typeCount[t]) errors.push('缺少题型: ' + t);
});
console.log('下午题型分布：', JSON.stringify(typeCount));

/* 5. 计划完整性 */
const PLAN = sandbox.window.RK_PLAN;
const taskIds = new Set();
let weekNos = [];
PLAN.stages.forEach(st => {
  st.weeks.forEach(wk => {
    weekNos.push(wk.no);
    let hours = 0;
    wk.tasks.forEach(t => {
      if (taskIds.has(t.id)) errors.push('任务 id 重复: ' + t.id);
      taskIds.add(t.id);
      hours += t.hours || 0;
    });
    if (hours < 8 || hours > 18) warnings.push('W' + wk.no + ' 任务时长 ' + hours + 'h 偏离 10~15h 区间');
  });
});
weekNos.sort((a, b) => a - b);
if (weekNos.length !== PLAN.meta.totalWeeks) errors.push('周数 ' + weekNos.length + ' ≠ ' + PLAN.meta.totalWeeks);
for (let i = 0; i < weekNos.length; i++) {
  if (weekNos[i] !== i + 1) { errors.push('周序号不连续：第 ' + (i + 1) + ' 个为 W' + weekNos[i]); break; }
}
console.log(`计划：${PLAN.stages.length} 阶段 / ${weekNos.length} 周 / ${taskIds.size} 项任务`);

/* 6. 知识模块数据 */
Object.keys(RK.syllabus.modules).forEach(k => {
  if (!RK.MODULE_MAP[k]) errors.push('知识模块 key 未在 MODULES 中定义: ' + k);
});
RK.MODULES.forEach(m => {
  if (!RK.syllabus.modules[m.key]) errors.push('模块缺少知识数据: ' + m.key);
});
console.log(`知识模块：${Object.keys(RK.syllabus.modules).length} 个`);

/* 输出 */
console.log('');
if (warnings.length) {
  console.log('提示：');
  warnings.forEach(w => console.log('  ! ' + w));
}
if (errors.length) {
  console.log('错误：');
  errors.forEach(e => console.log('  × ' + e));
  process.exitCode = 1;
} else {
  console.log('全部数据校验通过');
}
