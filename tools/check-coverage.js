/* ==========================================================================
 * check-coverage.js —— 知识点覆盖校验
 *
 * 用途：按 data-syllabus.js 的「要点」与题目自带的 points 统计题库覆盖，回答三个问题：
 *   1. 每个知识模块的题量够不够支撑多套模考（权重 × 3 / × 5）？
 *   2. 哪些大纲要点在题库中完全没有对应题目？
 *   3. 8 套模考卷之间的重复率有多高？
 *
 * 用法：
 *   node tools/check-coverage.js           报告模式，只输出、不阻断
 *   node tools/check-coverage.js --strict  达标校验，不达标退出码 1
 *
 * 维护：要点键格式为「模块 key|要点标题」，标题取自 data-syllabus.js 的 points[].title；
 *       新增/改名要点后必须同步题目 points，否则脚本报「points 无法解析」。
 *       专业英语 2 个要点共用同一批题目，属预期的重复计数。
 * ========================================================================== */
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

const files = ['assets/js/core.js', 'assets/js/data-syllabus.js', 'assets/js/data-exams.js'];
fs.readdirSync(path.join(root, 'assets/js/bank')).filter(f => f.endsWith('.js')).sort()
  .forEach(f => files.push('assets/js/bank/' + f));
files.forEach(rel => vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), sandbox, { filename: rel }));

const RK = sandbox.window.RK;
const EX = sandbox.window.RK_EXAMS;

/* 大纲要点键集合：模块 key|要点标题 */
const pointKeys = {};
RK.MODULES.forEach(m => {
  ((RK.syllabus.modules[m.key] || {}).points || []).forEach(p => { pointKeys[m.key + '|' + p.title] = true; });
});

/* 题目 points 校验：缺失、非数组、无法解析的键 */
const invalidPoints = [];
RK.bank.morning.forEach(q => {
  if (!Array.isArray(q.points) || !q.points.length) {
    invalidPoints.push(q.id + ' 缺少 points');
    return;
  }
  q.points.forEach(k => {
    if (pointKeys[k] !== true) invalidPoints.push(q.id + ' points 无法解析: ' + k);
  });
});
const multiPointCount = RK.bank.morning.filter(q => (q.points || []).length > 1).length;

const missing = [];
const pointRows = [];
let totalPoints = 0;
let coveredPoints = 0;

console.log('=== 模块题量 ===');
console.log('模块'.padEnd(22) + '权重  题量  倍数  要点  达标×3  达标×5');
RK.MODULES.forEach(m => {
  const points = (RK.syllabus.modules[m.key] || {}).points || [];
  const pool = RK.byModule[m.key] || [];
  let cov = 0;
  points.forEach(p => {
    totalPoints++;
    const key = m.key + '|' + p.title;
    const n = pool.filter(q => (q.points || []).indexOf(key) >= 0).length;
    pointRows.push({ module: m.name, title: p.title, count: n });
    if (n > 0) {
      cov++;
      coveredPoints++;
    } else {
      missing.push(m.name + ' / ' + p.title);
    }
  });
  const ratio = (pool.length / m.weight).toFixed(1);
  console.log(
    m.name.padEnd(22, ' ') +
    String(m.weight).padStart(2) + '    ' +
    String(pool.length).padStart(3) + '   ' +
    ratio.padStart(4) + '   ' +
    (String(cov) + '/' + String(points.length)).padStart(4) + '   ' +
    (pool.length >= m.weight * 3 ? ' ok ' : 'LOW ') + '    ' +
    (pool.length >= m.weight * 5 ? ' ok ' : 'LOW ')
  );
});

console.log('');
console.log('=== 无题要点（覆盖缺口） ===');
missing.forEach(x => console.log('  × ' + x));
if (!missing.length) console.log('  （无）');

console.log('');
console.log('=== 题目要点校验 ===');
if (invalidPoints.length) {
  invalidPoints.forEach(x => console.log('  × ' + x));
} else {
  console.log('  （全部题目 points 有效）');
}
console.log(`  一题多要点 ${multiPointCount} 题（专业英语 2 个要点共用同一批题目，属预期重复计数）`);

/* 模考重复率 */
const papers = EX.mocks.map(p => new Set(RK.buildPaper(p.rules).map(q => q.id)));
const freq = {};
papers.forEach(set => set.forEach(id => { freq[id] = (freq[id] || 0) + 1; }));
const freqVals = Object.keys(freq).map(k => freq[k]);
let overlapSum = 0;
let pairCount = 0;
for (let i = 0; i < papers.length; i++) {
  for (let j = i + 1; j < papers.length; j++) {
    let common = 0;
    papers[i].forEach(id => { if (papers[j].has(id)) common++; });
    overlapSum += common / 75;
    pairCount++;
  }
}
const overlapRate = pairCount ? overlapSum / pairCount : 0;
const avgPick = freqVals.length ? (papers.length * 75 / freqVals.length) : 0;

console.log('');
console.log('=== 模考独立性 ===');
console.log(`  8 套卷两两平均重合：${(overlapRate * 100).toFixed(1)}%`);
console.log(`  题库去重题数：${freqVals.length}，平均每题被抽 ${avgPick.toFixed(1)} 次`);
console.log(`  被抽 6 次以上：${freqVals.filter(v => v >= 6).length} 题`);

console.log('');
console.log('=== 汇总 ===');
console.log(`  上午题 ${RK.bank.morning.length} 道 / 知识要点 ${totalPoints} 个 / 有题要点 ${coveredPoints} 个（${(coveredPoints / totalPoints * 100).toFixed(1)}%）`);
console.log(`  平均每个要点 ${(RK.bank.morning.length / totalPoints).toFixed(2)} 题`);

/* strict 模式：按目标值判定 */
if (process.argv.indexOf('--strict') >= 0) {
  const fails = [];
  if (missing.length) fails.push(`仍有 ${missing.length} 个要点无题`);
  if (invalidPoints.length) fails.push(`有 ${invalidPoints.length} 处题目 points 缺失或无法解析`);
  RK.MODULES.forEach(m => {
    const n = (RK.byModule[m.key] || []).length;
    if (n < m.weight * 3) fails.push(`${m.name} 题量 ${n} < 权重×3 ${m.weight * 3}`);
  });
  if (overlapRate > 0.4) fails.push(`模考两两重合 ${(overlapRate * 100).toFixed(1)}% > 40%`);
  if (fails.length) {
    console.log('');
    console.log('未达标：');
    fails.forEach(f => console.log('  × ' + f));
    process.exitCode = 1;
  } else {
    console.log('');
    console.log('覆盖校验达标');
  }
}
