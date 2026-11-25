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
    if (hours < 8 || hours > 18) warnings.push('W' + wk.no + ' 任务时长 ' + hours + 'h 偏离 10~17h 区间');
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
/* 6.1 学习引导四字段：13 模块均需非空字符串数组 */
const GUIDE_KEYS = ['goals', 'core', 'focus', 'hard'];
RK.MODULES.forEach(m => {
  const d = RK.syllabus.modules[m.key] || {};
  GUIDE_KEYS.forEach(k => {
    const v = d[k];
    if (!Array.isArray(v) || !v.length || v.some(s => typeof s !== 'string' || !s.trim())) {
      errors.push(m.key + ' 学习引导字段缺失或为空: ' + k);
    }
  });
});
console.log(`知识模块：${Object.keys(RK.syllabus.modules).length} 个 / 学习引导四字段齐全`);

/* 7. 题型与难度分布（对应 docs/平台开发/开发任务清单.md 3.3 目标，只提示不阻断） */
const morningTotal = RK.bank.morning.length;
const cmCount = RK.bank.morning.filter(q => (q.tags || []).some(t => t === '概念' || t === '记忆')).length;
const diffCount = { 1: 0, 2: 0, 3: 0 };
RK.bank.morning.forEach(q => {
  if (Object.prototype.hasOwnProperty.call(diffCount, q.difficulty)) diffCount[q.difficulty]++;
});
const cmRate = cmCount / morningTotal;
const diffRate = [1, 2, 3].map(d => diffCount[d] / morningTotal);
const pct = x => (x * 100).toFixed(1) + '%';
console.log('题型与难度分布：');
console.log(`  概念/记忆 ${cmCount}/${morningTotal}（${pct(cmRate)}），目标 ≤55%`);
console.log(`  难度 1/2/3 ${diffCount[1]}/${diffCount[2]}/${diffCount[3]}（${diffRate.map(pct).join(' / ')}），目标 30% / 50% / 20%`);

/* 告警阈值直接引用 3.3 已确认目标；难度按 ±5 个百分点容差，避免整数题量下永远报差 */
if (cmRate > 0.55) warnings.push(`概念/记忆题占比 ${pct(cmRate)} 超过 55% 目标`);
const diffTargets = [0.30, 0.50, 0.20];
const TOLERANCE = 0.05;
diffRate.forEach((r, i) => {
  if (Math.abs(r - diffTargets[i]) > TOLERANCE) {
    warnings.push(`难度 ${i + 1} 占比 ${pct(r)} 偏离目标 ${pct(diffTargets[i])}（容差 ±5 个百分点）`);
  }
});

/* 8. 正确答案位置分布（对应 docs/平台开发/开发任务清单.md 2.14，只提示不阻断）
 * 统计口径：分母为 vm 加载后的上午题有效题量，只计 4 选项且 answer 为 0~3 整数的题目。
 * 25 道专业英语题由 eng() 工厂生成、源码无 answer: 字面量；下午题 answer 为字符串参考答案，
 * 因此不能按文本 grep，也不能扫全库 answer 字段。 */
const posCount = [0, 0, 0, 0];
let posSkipped = 0;
RK.bank.morning.forEach(q => {
  if (!Array.isArray(q.options) || q.options.length !== 4 ||
      typeof q.answer !== 'number' || !Number.isInteger(q.answer) ||
      q.answer < 0 || q.answer > 3) {
    posSkipped++;
    return;
  }
  posCount[q.answer]++;
});
const posTotal = posCount.reduce((a, b) => a + b, 0);
console.log('答案位置分布：');
console.log(`  位置 0/1/2/3 ${posCount.join('/')}（${posCount.map(c => posTotal ? pct(c / posTotal) : '—').join(' / ')}），目标 25% ±3 个百分点（22%~28%）`);
if (posSkipped) console.log(`  排除 ${posSkipped} 题（answer 非数字/越界或选项数不为 4，见第 1 节错误）`);
if (posTotal < 20) {
  console.log(`  有效题量 ${posTotal} < 20，样本不足，跳过均衡阈值判断`);
} else {
  /* 先乘整数再除，避免 0.22/0.28 × N 的浮点误差把边界算偏（如 0.28×100 得 28.000000000000004） */
  const posLow = Math.ceil(22 * posTotal / 100);
  const posHigh = Math.floor(28 * posTotal / 100);
  const posOver = posCount.reduce((a, c) => a + Math.max(0, c - posHigh), 0);
  const posUnder = posCount.reduce((a, c) => a + Math.max(0, posLow - c), 0);
  if (posOver || posUnder) {
    posCount.forEach((c, i) => {
      if (c < posLow || c > posHigh) {
        warnings.push(`答案位置 ${i} ${c} 题（${pct(c / posTotal)}）超出允许 ${posLow}~${posHigh} 题，偏离 25%（容差 ±3 个百分点）`);
      }
    });
    warnings.push(`答案位置需人工重排至少 ${Math.max(posOver, posUnder)} 题（各位置允许 ${posLow}~${posHigh} 题），不自动改写题库`);
  }
}

/* 9. 模块—要点—文档口径一致性
 * 单一事实源：core.js（key / 别名 / 权重 / 文档）、data-syllabus.js（要点）、题库（points）、
 * docs/00 索引表、docs/02 锚点行。任何一处改了另一处没跟上，这里报错。 */
const DOCS_DIR = path.join(root, 'docs');
const PRECISE_DIR = path.join(DOCS_DIR, '02-知识点精要');
const POINT_PREFIX = '> 对应知识模块要点：';

/* 9.1 模块定义：别名、文档存在、权重合计 */
const aliasOwner = new Map();
RK.MODULES.forEach(m => {
  if (!Array.isArray(m.aliases) || !m.aliases.length) errors.push(m.key + ' 缺少 aliases（计划/文档/题库的其它叫法）');
  if (!fs.existsSync(path.join(root, m.doc))) errors.push(m.key + ' 精要文档不存在: ' + m.doc);
  [m.name, m.short].concat(m.aliases || []).forEach(a => {
    if (aliasOwner.has(a) && aliasOwner.get(a) !== m.key) {
      errors.push('名称/别名冲突：「' + a + '」同时属于 ' + aliasOwner.get(a) + ' 与 ' + m.key);
    }
    aliasOwner.set(a, m.key);
  });
});
const weightSum = RK.MODULES.reduce((a, m) => a + m.weight, 0);
if (weightSum !== 75) errors.push('模块权重合计 ' + weightSum + ' ≠ 75');

/* 9.2 精要文档锚点行（每篇恰好 1 行，要点用「；」分隔） */
const preciseFiles = fs.readdirSync(PRECISE_DIR).filter(f => /\.md$/i.test(f)).sort();
const anchorByDoc = new Map();
preciseFiles.forEach(f => {
  const hits = fs.readFileSync(path.join(PRECISE_DIR, f), 'utf8')
    .split(/\r?\n/).filter(l => l.trim().indexOf(POINT_PREFIX) === 0);
  if (hits.length !== 1) {
    errors.push(f + ' 的锚点行数 ' + hits.length + '（应为 1 行「' + POINT_PREFIX + '…」）');
    return;
  }
  const list = hits[0].trim().slice(POINT_PREFIX.length).replace(/。\s*$/, '')
    .split('；').map(s => s.trim()).filter(Boolean);
  if (!list.length) errors.push(f + ' 锚点行为空');
  anchorByDoc.set(f, list);
});

/* 9.3 要点 ↔ 文档双向一一对应（57 个要点各出现且仅出现一次） */
const moduleOfPoint = new Map();
Object.keys(RK.syllabus.modules).forEach(k => {
  (RK.syllabus.modules[k].points || []).forEach(p => {
    if (moduleOfPoint.has(p.title)) errors.push('要点标题重复: ' + p.title);
    moduleOfPoint.set(p.title, k);
  });
});
const pointDoc = new Map();
anchorByDoc.forEach((list, f) => {
  list.forEach(t => {
    if (!moduleOfPoint.has(t)) { errors.push(f + ' 锚点含未知要点: ' + t); return; }
    if (pointDoc.has(t)) errors.push('要点「' + t + '」重复声明于 ' + pointDoc.get(t) + ' 与 ' + f);
    pointDoc.set(t, f);
  });
});
moduleOfPoint.forEach((k, t) => {
  if (!pointDoc.has(t)) errors.push('要点无文档锚点: ' + t + '（' + k + '）');
});

/* 9.4 每个模块的要点必须落在 core.js 给它声明的文档里 */
RK.MODULES.forEach(m => {
  const f = path.basename(m.doc, '.html') + '.md';
  const list = anchorByDoc.get(f) || [];
  (RK.syllabus.modules[m.key].points || []).forEach(p => {
    if (list.indexOf(p.title) === -1) errors.push(m.key + ' 的要点「' + p.title + '」未在 ' + f + ' 锚点声明');
  });
});

/* 9.5 docs/00「知识模块与精要文档索引」逐列对齐 */
const doc00 = fs.readFileSync(path.join(DOCS_DIR, '00-考试情报与备考策略.md'), 'utf8').split(/\r?\n/);
let inIndex = false;
const indexRows = [];
doc00.forEach(l => {
  if (/^##\s/.test(l)) { inIndex = /知识模块与精要文档索引/.test(l); return; }
  const t = l.trim();
  if (!inIndex || t.charAt(0) !== '|') return;
  if (/^\|\s*-{3,}/.test(t)) return;
  indexRows.push(t);
});
indexRows.shift();
const dataRows = indexRows.filter(r => r.indexOf('合计') === -1);
const cell = (row, i) => (row.split('|').slice(1, -1).map(c => c.trim().replace(/`/g, ''))[i] || '');
if (dataRows.length !== RK.MODULES.length) {
  errors.push('docs/00 索引表数据行 ' + dataRows.length + ' ≠ 模块数 ' + RK.MODULES.length);
}
RK.MODULES.forEach(m => {
  const hit = dataRows.filter(r => cell(r, 1) === m.key);
  if (hit.length !== 1) { errors.push('docs/00 索引表模块行数异常: ' + m.key + '（' + hit.length + ' 行）'); return; }
  const r = hit[0];
  const aliasWant = [m.short].concat(m.aliases || []).sort().join('、');
  const aliasGot = cell(r, 2).split('、').map(s => s.trim()).filter(Boolean).sort().join('、');
  if (aliasGot !== aliasWant) errors.push('docs/00 索引表别名不一致: ' + m.key + '（表「' + aliasGot + '」/ 源「' + aliasWant + '」）');
  if (cell(r, 3) !== String(m.weight)) errors.push('docs/00 索引表权重不一致: ' + m.key + '（表 ' + cell(r, 3) + ' / 源 ' + m.weight + '）');
  const bankN = (RK.byModule[m.key] || []).length;
  if (cell(r, 4) !== String(bankN)) errors.push('docs/00 索引表题量不一致: ' + m.key + '（表 ' + cell(r, 4) + ' / 实际 ' + bankN + '）');
  const pointN = (RK.syllabus.modules[m.key].points || []).length;
  if (cell(r, 5) !== String(pointN)) errors.push('docs/00 索引表要点数不一致: ' + m.key + '（表 ' + cell(r, 5) + ' / 实际 ' + pointN + '）');
  if (cell(r, 6) !== path.basename(m.doc, '.html')) errors.push('docs/00 索引表文档名不一致: ' + m.key + '（表 ' + cell(r, 6) + '）');
});

/* 9.6 每个模块至少在某个阶段的 focus 中出现（计划落点） */
const focusSet = new Set();
PLAN.stages.forEach(st => (st.focus || []).forEach(k => { if (k !== 'all') focusSet.add(k); }));
RK.MODULES.forEach(m => { if (!focusSet.has(m.key)) errors.push(m.key + ' 未出现在任何阶段 focus 中'); });
focusSet.forEach(k => { if (!RK.MODULE_MAP[k]) errors.push('data-plan 阶段 focus 含未知模块: ' + k); });

console.log(`口径一致性：${RK.MODULES.length} 模块 / ${moduleOfPoint.size} 要点 / ${preciseFiles.length} 篇精要 / docs/00 索引 ${dataRows.length} 行`);

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
