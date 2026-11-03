/* ==========================================================================
 * check-coverage.js —— 知识点覆盖校验
 *
 * 用途：按 data-syllabus.js 的「要点组」统计题库题量，回答三个问题：
 *   1. 每个知识模块的题量够不够支撑多套模考（权重 × 3 / × 5）？
 *   2. 哪些大纲要点在题库中完全没有对应题目？
 *   3. 8 套模考卷之间的重复率有多高？
 *
 * 用法：
 *   node tools/check-coverage.js           报告模式，只输出、不阻断
 *   node tools/check-coverage.js --strict  达标校验，不达标退出码 1
 *
 * 维护：新增/改名 data-syllabus.js 的要点组后，必须在 POINT_TOPICS 中补映射，
 *       否则脚本会报「未配置映射」。
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

/* --------------------------------------------------------------------------
 * 要点组 → 题库 topic 映射
 * key = 模块 key + '|' + data-syllabus.js 中的 points[].title
 * 新增要点时同步补一行；一个要点可对应多个 topic。
 * 专业英语的「高频题材」「解题方法」共用同一批题目，属预期重复计数。
 * -------------------------------------------------------------------------- */
const POINT_TOPICS = {
  'computer-system|数据表示与运算': ['数据表示', '浮点数', '运算方法', '校验码'],
  'computer-system|CPU 与体系结构': ['体系结构', '指令流水线', 'CPU'],
  'computer-system|存储系统': ['Cache', '存储系统'],
  'computer-system|总线、I/O 与可靠性': ['可靠性', '总线', 'I/O 方式'],
  'computer-system|性能指标': ['性能指标'],

  'os|进程管理': ['进程管理', 'PV 操作', '死锁'],
  'os|存储管理': ['存储管理', '页面置换'],
  'os|文件与设备管理': ['文件管理', '设备管理'],
  'os|作业与进程调度': ['调度算法'],

  'ds-algorithm|线性结构': ['队列', '串', '栈', '线性表'],
  'ds-algorithm|树与二叉树': ['二叉树性质', '二叉树遍历', '哈夫曼树', '二叉排序树', 'B树'],
  'ds-algorithm|图': ['图', '最小生成树', '最短路径', '拓扑排序', '关键路径'],
  'ds-algorithm|查找': ['查找', '散列表'],
  'ds-algorithm|排序': ['排序'],
  'ds-algorithm|算法设计与复杂度': ['复杂度', '算法设计'],

  'programming-language|语言基础': ['语言基础', '参数传递'],
  'programming-language|文法与自动机': ['正规式', '有限自动机', '文法'],
  'programming-language|编译过程': ['编译过程', '中间代码'],
  'programming-language|表达式与程序结构': ['表达式'],

  'software-engineering|开发模型': ['开发模型', '敏捷开发'],
  'software-engineering|需求工程': ['需求工程'],
  'software-engineering|结构化设计（耦合与内聚）': ['耦合', '内聚', '模块化'],
  'software-engineering|详细设计与复杂度': ['详细设计'],
  'software-engineering|软件测试': ['软件测试'],
  'software-engineering|维护与项目管理': ['软件维护', '项目管理', '过程改进', '软件质量'],

  'oo-uml|面向对象基础': ['面向对象基础'],
  'oo-uml|UML 图': ['UML 图', '类图关系', '用例图'],
  'oo-uml|设计模式（按目的分三类）': ['设计模式'],
  'oo-uml|面向对象分析与设计': ['设计原则', 'OOA'],

  'database|数据库体系结构': ['数据库体系结构'],
  'database|ER 模型与关系转换': ['ER 模型'],
  'database|关系代数与规范化': ['关系代数', '规范化'],
  'database|SQL': ['SQL', '索引'],
  'database|事务与并发': ['事务', '并发控制'],
  'database|备份与恢复': ['备份与恢复'],

  'network|分层模型': ['分层模型', '传输层'],
  'network|IP 地址与子网': ['IP 地址', '子网划分', 'CIDR'],
  'network|TCP 与 UDP': ['TCP'],
  'network|应用层与网络管理': ['应用层', '路由协议'],
  'network|传输介质与编码': ['传输介质'],

  'security|密码学基础': ['密码学', '哈希'],
  'security|认证与签名': ['数字签名', 'PKI', 'MAC'],
  'security|网络攻击与防护': ['防护技术', '恶意代码'],
  'security|安全体系与管理': ['安全体系'],

  'standard-law|标准化': ['标准化'],
  'standard-law|著作权': ['著作权', '软件著作权'],
  'standard-law|专利与商标': ['专利', '商标', '商业秘密'],
  'standard-law|侵权与责任': ['侵权'],

  'multimedia|音频': ['音频'],
  'multimedia|图像': ['图像'],
  'multimedia|视频': ['视频'],
  'multimedia|压缩': ['压缩', '格式'],

  'english|高频题材': ['专业英语'],
  'english|解题方法': ['专业英语'],

  'tech|云计算与大数据': ['云计算', '大数据', '边缘计算'],
  'tech|人工智能与机器学习': ['人工智能'],
  'tech|物联网、区块链与新兴应用': ['物联网', '区块链', '5G']
};

const unconfigured = [];
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
    const topics = POINT_TOPICS[key];
    if (!topics) {
      unconfigured.push(key);
      return;
    }
    const n = pool.filter(q => topics.indexOf(q.topic) >= 0).length;
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

if (unconfigured.length) {
  console.log('');
  console.log('=== 未配置映射的要点（需补 POINT_TOPICS） ===');
  unconfigured.forEach(x => console.log('  ! ' + x));
}

/* 题库中未归入任何要点的 topic */
const mappedTopics = {};
Object.keys(POINT_TOPICS).forEach(k => POINT_TOPICS[k].forEach(t => { mappedTopics[t] = true; }));
const orphanTopics = {};
RK.bank.morning.forEach(q => {
  if (!mappedTopics[q.topic]) orphanTopics[q.module + ' / ' + q.topic] = true;
});
console.log('');
console.log('=== 未归类的 topic ===');
const orphanList = Object.keys(orphanTopics);
if (orphanList.length) orphanList.forEach(x => console.log('  ! ' + x));
else console.log('  （无）');

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
  if (unconfigured.length) fails.push(`有 ${unconfigured.length} 个要点未配置映射`);
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
