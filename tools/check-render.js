/* 视图渲染冒烟测试：node tools/check-render.js */
const { createSandbox, load, jsFiles, report } = require('./vm-sandbox');

const sandbox = createSandbox(true);
const files = [
  'assets/js/core.js',
  'assets/js/exercise-engine.js',
  'assets/js/data-syllabus.js',
  'assets/js/data-plan.js',
  'assets/js/data-exams.js',
  'assets/js/data-real.js'
].concat(jsFiles('assets/js/bank'), jsFiles('assets/js/real'),
  ['views-plan.js', 'views-dashboard.js', 'views-knowledge.js', 'views-docs.js',
    'views-practice.js', 'views-real.js', 'views-exam.js', 'views-review.js']
    .map(f => 'assets/js/' + f));
load(sandbox, files);

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
const knowledgeHtml = RK.router.routes.knowledge.render({ m: 'computer-system' });
['学习引导', '学习目标', '核心知识点', '重点', '难点', '要点速览'].forEach(k => {
  if (!knowledgeHtml.includes(k)) problems.push('知识模块页缺少区块: ' + k);
});
check('docs', {}, 600);
check('practice', {}, 600);
check('practice', { m: 'os' }, 400);
check('practice', { r: '30' }, 400);
check('practice', { c: 'computer-system,network,database', n: '30' }, 400);

/* 真题题库：首页、按模块、整卷、浏览列表、单题 */
check('real', {}, 800);
check('real', { m: 'os' }, 400);
check('real', { p: '2020-11' }, 400);
check('real', { p: '2020-11', browse: '1' }, 400);
check('real', { m: 'multimedia' }, 300);
check('real', { m: 'os', browse: '1' }, 300);
check('real', { q: 'ZR-2020-11-001' }, 300);
check('real', { w: '1' }, 100);
check('real', { p: '2023-05' }, 400);
check('real', { p: '2024-05' }, 400);
check('real', { p: '2025-05', browse: '1' }, 200);
check('real', { s: '1', y: '2023,2024', t: 'morning', m: 'os,software-engineering', n: '20' }, 400);
const realHome = RK.router.routes.real.render({});
if (!realHome.includes('按模块浏览') || !realHome.includes('2020 年下半年') || !realHome.includes('2022 年下半年')) {
  problems.push('真题首页缺少模块/年份分类入口');
}
if (!realHome.includes('自选真题练习') || !realHome.includes('data-act="real-start"')) {
  problems.push('真题首页缺少自选真题练习筛选器');
}
if (!realHome.includes('2025 年') || !realHome.includes('待补')) {
  problems.push('真题首页缺少 2025/2026 待补年份');
}
const realOsList = RK.router.routes.real.render({ m: 'os', browse: '1' });
if (!realOsList.includes('#/real?q=ZR-') || !realOsList.includes('操作系统')) {
  problems.push('真题模块浏览页缺少单题链接或模块名');
}
const realOne = RK.router.routes.real.render({ q: 'ZR-2020-11-001' });
if (!realOne.includes('原题 1') || !realOne.includes('real-qbox')) {
  problems.push('真题单题练习渲染不完整');
}
const real2023 = RK.router.routes.real.render({ p: '2023-05' });
const real2023Count = real2023.match(/第 1 \/ (\d+) 题/);
if (!real2023Count || real2023Count[1] !== '61') {
  problems.push('2023 整卷题量不符：期望 61 题，实际 ' + (real2023Count ? real2023Count[1] : '未渲染'));
}
const realCustom = RK.router.routes.real.render({ s: '1', y: '2023,2024', t: 'morning', m: 'os,software-engineering', n: '20' });
const realCustomCount = realCustom.match(/第 1 \/ (\d+) 题/);
if (!realCustomCount || realCustomCount[1] !== '20') {
  problems.push('自选真题题量不符：期望 20 题（2023+2024 匹配池已超 20，按 20 题档截断），实际 ' + (realCustomCount ? realCustomCount[1] : '未渲染'));
}
const real2025 = RK.router.routes.real.render({ p: '2025-05', browse: '1' });
if (!real2025.includes('#/real?q=ZR-2025-05-') || !real2025.includes('原题')) {
  problems.push('2025 上已入库套卷浏览页缺少题号链接或原题号提示');
}

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

/* 阶段测评与模拟考试必须是两套列表：测评页只出 3 套测评，模拟考试页只出模拟考试与下午卷 */
const stageHtml = RK.router.routes.assessment.render({});
const examHtml = RK.router.routes.exam.render({});
if (!stageHtml.includes('assessment?p=stage-1')) problems.push('assessment 页缺少 stage-1 入口');
if (stageHtml.includes('模拟考试（上午卷）')) problems.push('assessment 页不应列出模拟考试');
if (stageHtml.includes('下午卷（应用技术）')) problems.push('assessment 页不应列出下午卷');
if (examHtml.includes('阶段一测评') || examHtml.includes('stage-1')) problems.push('exam 页不应再列出阶段测评');

/* 有错题时渲染一次，覆盖错因下拉与结论输入 */
RK.record.answer('CS-001', false, 3, [2, 0, 3, 1]);
check('review', {}, 800);

/* 真题错题集成错题本：错因建议、三态复习、统计与备份边界 */
const realQ = RK.real.get('ZR-2020-11-001');
RK.realRecord.answer(realQ, false, 0, realQ.options.map((_, i) => i));
if (!RK.realRecord.setNote('ZR-2020-11-001', {
  cause: '知识盲区', conclusion: '重做 Cache 地址映射题', stage: 'doing'
})) problems.push('真题错题 setNote 写入失败');
const rst = RK.realRecord.stats();
if (rst.total !== 1 || rst.stages.doing !== 1 || rst.causes['知识盲区'] !== 1) {
  problems.push('真题错因统计计数不符：' + JSON.stringify(rst));
}
if (!RK.causeAdvice('知识盲区').includes('精讲')) problems.push('错因自动建议缺失');
if (JSON.stringify(sandbox.__memory['rk_sd_wrong'] || '{}').includes('ZR-2020-11-001')) {
  problems.push('真题错题误入自编备份字段 rk_sd_wrong');
}
const realReviewHtml = RK.router.routes.review.render({});
['真题错题 · 重点管理', '结论建议', 'data-note-src="real"', 'data-stage="todo"',
  'data-stage="doing"', 'data-stage="done"', '错因统计', '真题错题（1）',
  '知识盲区', 'data-remove-real'].forEach(k => {
  if (!realReviewHtml.includes(k)) problems.push('错题本真题区块缺少: ' + k);
});
if (realReviewHtml.indexOf('真题错题 · 重点管理') > realReviewHtml.indexOf('自编待攻克清单')) {
  problems.push('错题本真题区块未置顶');
}

/* 错因自定义下拉：触发器 / 弹层 / 选项齐全，且已移除原生 select */
['data-cause-select', 'data-cause-toggle', 'aria-haspopup="listbox"',
  'role="listbox"', 'data-cause-value="all"', 'data-cause-value="知识盲区"',
  'cause-option is-selected'].forEach(k => {
  if (!realReviewHtml.includes(k)) problems.push('错因自定义下拉缺少: ' + k);
});
if (realReviewHtml.includes('<select data-filter-cause')) {
  problems.push('错因筛选仍使用原生 select');
}
const causeOptCount = (realReviewHtml.match(/data-cause-value="[^"]+"/g) || []).length;
if (causeOptCount < RK.CAUSES.length + 1) {
  problems.push('错因下拉选项不足：期望至少 ' + (RK.CAUSES.length + 1) + ' 项，实际 ' + causeOptCount);
}

console.log('');
report(problems, [], '全部视图渲染通过', { errTitle: '' });
