/* 视图渲染冒烟测试：node tools/check-render.js */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const memory = {};

const fakeEl = () => ({
  innerHTML: '',
  textContent: '',
  classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
  style: {},
  setAttribute() {}, getAttribute() { return null; },
  appendChild() {}, removeChild() {}, addEventListener() {},
  querySelector() { return null; },
  querySelectorAll() { return []; },
  closest() { return null; }
});

const sandbox = {
  console,
  Math,
  Date,
  JSON,
  setTimeout,
  clearTimeout,
  URL: { createObjectURL() { return 'blob:'; } },
  Blob: function () {},
  localStorage: {
    getItem(k) { return Object.prototype.hasOwnProperty.call(memory, k) ? memory[k] : null; },
    setItem(k, v) { memory[k] = String(v); },
    removeItem(k) { delete memory[k]; }
  },
  document: {
    body: { setAttribute() {}, getAttribute() { return 'light'; }, appendChild() {}, removeChild() {} },
    getElementById() { return fakeEl(); },
    querySelectorAll() { return []; },
    querySelector() { return null; },
    createElement() { return fakeEl(); },
    addEventListener() {},
    readyState: 'loading'
  }
};
sandbox.window = sandbox;
sandbox.window.matchMedia = () => ({ matches: false });
sandbox.window.addEventListener = () => {};
sandbox.window.location = { hash: '' };
sandbox.window.scrollTo = () => {};
sandbox.window.getComputedStyle = () => ({ getPropertyValue: () => '#fff' });
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
['views-plan.js', 'views-dashboard.js', 'views-knowledge.js', 'views-docs.js', 'views-practice.js', 'views-exam.js', 'views-review.js']
  .forEach(f => files.push('assets/js/' + f));

files.forEach(rel => {
  vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), sandbox, { filename: rel });
});

const RK = sandbox.window.RK;
const problems = [];

function check(routeName, params, minLen) {
  const view = RK.router.routes[routeName];
  if (!view) { problems.push('路由缺失: ' + routeName); return; }
  let html;
  try {
    html = view.render(params || {});
  } catch (e) {
    problems.push(routeName + ' render 抛异常: ' + e.message);
    return;
  }
  if (typeof html !== 'string') { problems.push(routeName + ' render 未返回字符串'); return; }
  if (html.length < (minLen || 200)) problems.push(routeName + ' 输出过短(' + html.length + ')');
  ['undefined', 'NaN', '[object Object]'].forEach(bad => {
    if (html.includes(bad)) {
      const idx = html.indexOf(bad);
      problems.push(routeName + ' 输出包含 "' + bad + '"：…' + html.slice(Math.max(0, idx - 60), idx + 40).replace(/\s+/g, ' ') + '…');
    }
  });
  console.log(`  ok  ${routeName.padEnd(10)} ${String(html.length).padStart(6)} 字符`);
}

console.log('视图渲染：');
check('dashboard', {}, 800);
check('plan', {}, 800);
check('knowledge', {}, 800);
check('knowledge', { m: 'database' }, 800);
check('docs', {}, 600);
check('practice', {}, 600);
check('practice', { m: 'os' }, 400);
check('practice', { r: '30' }, 400);
check('practice', { c: 'computer-system,network,database', n: '30' }, 400);

/* 自选模块练习：题量按上午卷权重折算（7+6+7=20 → 30 × 20 / 75 = 8 题） */
const pracHomeHtml = RK.router.routes.practice.render({});
if (!pracHomeHtml.includes('自选模块练习')) {
  problems.push('练习首页缺少「自选模块练习」入口');
}
if (!pracHomeHtml.includes('data-act="combo-all"') || !pracHomeHtml.includes('data-act="combo-none"')) {
  problems.push('练习首页缺少自选模块的全选 / 全不选按钮');
}
const comboHtml = RK.router.routes.practice.render({ c: 'computer-system,network,database', n: '30' });
const comboCount = comboHtml.match(/第 1 \/ (\d+) 题/);
if (!comboCount || comboCount[1] !== '8') {
  problems.push('自选模块练习题量折算不符：期望 8 题，实际 ' + (comboCount ? comboCount[1] : '未渲染'));
}
check('exam', {}, 600);
check('assessment', {}, 600);
check('review', {}, 300);
check('stats', {}, 500);

['stage-1', 'mock-01', 'case-01', 'case-02', 'case-03', 'case-04'].forEach(id => check('exam', { p: id }, 500));
check('assessment', { p: 'stage-1' }, 500);

/* 阶段测评与模拟考试必须是两套列表：测评页只出 3 套测评，模考页只出模考与下午卷 */
const stageHtml = RK.router.routes.assessment.render({});
const examHtml = RK.router.routes.exam.render({});
if (!stageHtml.includes('assessment?p=stage-1')) problems.push('assessment 页缺少 stage-1 入口');
if (stageHtml.includes('全真模考（上午卷）')) problems.push('assessment 页不应列出全真模考');
if (stageHtml.includes('下午卷（应用技术）')) problems.push('assessment 页不应列出下午卷');
if (examHtml.includes('阶段一测评') || examHtml.includes('stage-1')) problems.push('exam 页不应再列出阶段测评');

/* 有错题时渲染一次，覆盖错因下拉与结论输入 */
RK.record.answer('CS-001', false, 3, [2, 0, 3, 1]);
check('review', {}, 800);

console.log('');
if (problems.length) {
  problems.forEach(p => console.log('  × ' + p));
  process.exitCode = 1;
} else {
  console.log('全部视图渲染通过');
}
