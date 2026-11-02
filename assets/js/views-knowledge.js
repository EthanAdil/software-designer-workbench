/* ==========================================================================
 * views-knowledge.js —— 知识模块：要点速览、学习路径、易错点
 * ========================================================================== */
(function (RK) {
  var U = RK.U;
  var KB = RK.syllabus;

  function resolveKey(params) {
    var k = params.m;
    if (k && KB.modules[k]) return k;
    return RK.MODULES[0].key;
  }

  RK.router.add('knowledge', {
    title: function (params) {
      var k = resolveKey(params);
      return RK.moduleName(k);
    },
    sub: '要点速览 + 学习路径 + 易错清单，配合 docs 精要文档使用',
    render: function (params) {
      var key = resolveKey(params);
      var mod = RK.MODULE_MAP[key];
      var data = KB.modules[key];
      var mastery = RK.mastery()[key] || { rate: null, total: 0 };
      var bankCount = (RK.byModule[key] || []).length;

      var html = '';

      /* 顶部模块切换 */
      html += '<div class="card"><div class="flex row-wrap">';
      RK.MODULES.forEach(function (m) {
        var active = m.key === key;
        html += '<a href="#/knowledge?m=' + m.key + '" class="badge ' + (active ? '' : 'badge-plain') + '" ' +
          'style="padding:5px 10px;font-size:12.5px;' + (active ? 'background:' + m.color + ';color:#fff' : '') + '">' +
          U.esc(m.short) + ' · ' + m.weight + '题</a>';
      });
      html += '</div></div>';

      html += '<div class="grid grid-2 mt-16" style="grid-template-columns:minmax(0,1fr) 300px">';

      /* 主体 */
      html += '<div class="card">';
      html += '<div class="row" style="align-items:flex-start"><div>';
      html += '<h2 style="font-size:19px"><i class="dot" style="background:' + mod.color + ';width:10px;height:10px"></i> ' + U.esc(mod.name) + '</h2>';
      html += '<div class="dim mt-8" style="font-size:12.8px">上午卷典型题量 ' + mod.weight + ' 题 · 题库现有 ' + bankCount + ' 题</div>';
      html += '</div><span class="spacer"></span>' +
        '<a class="btn btn-sm" href="#/practice?m=' + key + '">刷本模块题</a></div>';

      html += '<p class="muted mt-16" style="font-size:14px;line-height:1.8">' + U.esc(data.summary) + '</p>';
      html += '<div class="explain mt-16" style="border-left-color:' + mod.color + '"><div class="ex-title">考试定位</div>' + U.esc(data.examHint) + '</div>';

      (data.points || []).forEach(function (blk) {
        html += '<div class="point-block"><h4>' + U.esc(blk.title) + '</h4><ul>';
        blk.items.forEach(function (it) {
          html += '<li>' + U.esc(it) + '</li>';
        });
        html += '</ul></div>';
      });

      html += '<div class="divider"></div>';
      html += '<h3 style="font-size:14.5px;margin-bottom:8px">学习路径</h3>';
      html += '<div class="path-list">';
      (data.path || []).forEach(function (p, i) {
        html += '<div class="path-step"><span class="step-no">' + (i + 1) + '</span><span>' + U.esc(p) + '</span></div>';
      });
      html += '</div>';

      html += '<div class="divider"></div>';
      html += '<h3 style="font-size:14.5px;margin-bottom:8px">高频易错点</h3>';
      html += '<div class="explain" style="border-left-color:var(--danger)">';
      (data.pitfalls || []).forEach(function (p) {
        html += '<div style="margin:3px 0">× ' + U.esc(p) + '</div>';
      });
      html += '</div>';

      html += '</div>'; /* 主体 card */

      /* 侧栏 */
      html += '<div class="stack">';
      html += '<div class="card"><div class="card-head"><h2>掌握度</h2></div>' +
        '<div class="kpi"><span class="kpi-value">' + (mastery.rate === null ? '—' : U.pct(mastery.rate)) + '</span>' +
        '<span class="dim" style="font-size:12px">累计作答 ' + mastery.total + ' 次</span></div>' +
        RK.ui.bar(mastery.rate) +
        '<div class="dim mt-8" style="font-size:12px">低于 70% 建议重看要点并补练 15 题</div></div>';

      html += '<div class="card"><div class="card-head"><h2>精要文档</h2></div>' +
        '<p class="dim" style="font-size:12.5px">完整版知识点梳理，含公式、对比表与答题模板。</p>' +
        '<a class="btn btn-sm btn-ghost" href="' + encodeURI(mod.doc) + '" target="_blank" rel="noopener">打开文档</a>' +
        '<div class="dim mt-8" style="font-size:12px">HTML 版已声明 UTF-8，浏览器直接打开不会乱码；可打印或另存为 PDF</div></div>';

      html += '<div class="card"><div class="card-head"><h2>本模块题量</h2></div>';
      html += '<table class="table"><tbody>' +
        '<tr><td class="dim">题库总数</td><td class="mono">' + bankCount + ' 题</td></tr>' +
        '<tr><td class="dim">上午卷占比</td><td class="mono">' + mod.weight + ' / 75</td></tr>' +
        '<tr><td class="dim">掌握目标</td><td class="mono">≥ 75%</td></tr>' +
        '</tbody></table></div>';

      html += '</div></div>';

      return html;
    }
  });
})(window.RK);
