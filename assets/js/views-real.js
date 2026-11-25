/* ==========================================================================
 * views-real.js —— 历年真题题库：按模块 / 年份浏览，单题判题与练习小结
 * 交互与 views-practice.js 保持一致，但题库与作答记录完全独立
 * ========================================================================== */
(function (RK) {
  var U = RK.U;
  var LETTERS = U.letters;
  var session = null;
  /* 题干填空占位：历史数据里的（数字）在注册时已转为横线；此处兼容旧的全/半角空括号 */
  var BLANK_RE = /_{2,}|（\s*\d*\s*）|\(\s*\)/g;

  function blankLabel(q) {
    if (!q || !(q.group > 1) || !(q.blank >= 1)) return '';
    return '第 ' + q.blank + ' / ' + q.group + ' 空';
  }

  function renderStem(q) {
    var stem = String(q.stem || '');
    if (!blankLabel(q)) return U.esc(stem);
    var out = '';
    var last = 0;
    var n = 0;
    var m;
    BLANK_RE.lastIndex = 0;
    while ((m = BLANK_RE.exec(stem)) !== null) {
      n += 1;
      out += U.esc(stem.slice(last, m.index));
      out += '<span class="blank-mark' + (n === q.blank ? ' is-current' : '') + '">' +
        '第 ' + n + ' 空' + (n === q.blank ? '（当前）' : '') + '</span>';
      last = m.index + m[0].length;
    }
    return out + U.esc(stem.slice(last));
  }

  function optionsHint(q) {
    var label = blankLabel(q);
    if (!label) return '';
    return '<div class="opts-hint">以下选项仅对应题干' + label + '；其余横线请在同一原题的其他题目中作答。</div>';
  }
  var SEL_KEY = 'real_sel';
  var SCALES = [0, 20, 30, 50];

  function paperLabel(key) {
    return RK.real.paperMap[key] ? RK.real.paperMap[key].label : key;
  }

  function paperShort(key) {
    var p = RK.real.paperMap[key];
    return p ? (p.year + ' ' + p.half.replace('半年', '')) : key;
  }

  function splitParam(v) {
    return String(v || '').split(',').filter(function (x) { return !!x; });
  }

  function yearPaperCount(year) {
    return RK.real.papers.filter(function (p) { return p.year === year; })
      .reduce(function (n, p) { return n + p.count; }, 0);
  }

  function dataYears() {
    return RK.real.years().filter(function (y) { return yearPaperCount(y) > 0; });
  }

  function loadedModules() {
    return RK.MODULES.filter(function (m) { return RK.real.moduleCount(m.key) > 0; });
  }

  function sourceLink(label, url) {
    if (!label) return '未标注';
    var text = U.esc(label);
    return url ? '<a href="' + U.esc(url) + '" target="_blank" rel="noopener">' + text + '</a>' : text;
  }

  function verifiedBadge(v) {
    var cls = v === 'crosschecked' ? 'badge-ok' : 'badge-plain';
    return '<span class="badge ' + cls + '">' + U.esc(RK.real.verifiedLabel(v)) + '</span>';
  }

  function savedSelection() {
    var years = dataYears();
    var modules = loadedModules().map(function (m) { return m.key; });
    var sel = { years: years, types: ['morning'], modules: modules, n: 0 };
    var saved = RK.store.get(SEL_KEY, null);
    if (saved) {
      if (Object.prototype.toString.call(saved.y) === '[object Array]') {
        sel.years = saved.y.map(Number).filter(function (y) { return dataYears().indexOf(y) >= 0; });
      }
      if (Object.prototype.toString.call(saved.m) === '[object Array]') {
        sel.modules = saved.m.filter(function (k) { return !!RK.MODULE_MAP[k]; });
      }
      if ([0, 20, 30, 50].indexOf(Number(saved.n)) >= 0) sel.n = Number(saved.n);
    }
    return sel;
  }

  function saveSelection(sel) {
    RK.store.set(SEL_KEY, { y: sel.years || [], t: sel.types || ['morning'], m: sel.modules || [], n: Number(sel.n) || 0 });
  }

  function checkedSelection(el) {
    var years = [];
    var modules = [];
    var yearsEl = el.querySelectorAll('.real-year input[data-year]');
    for (var i = 0; i < yearsEl.length; i++) {
      if (yearsEl[i].checked) years.push(Number(yearsEl[i].getAttribute('data-year')));
    }
    var modsEl = el.querySelectorAll('.real-mod input[data-mod]');
    for (var j = 0; j < modsEl.length; j++) {
      if (modsEl[j].checked) modules.push(modsEl[j].getAttribute('data-mod'));
    }
    var seg = el.querySelector('#real-scale .seg-btn.is-on');
    return { years: years, types: ['morning'], modules: modules, n: seg ? Number(seg.getAttribute('data-scale')) : 0 };
  }

  function customPool(params) {
    var years = splitParam(params.y).map(Number);
    var types = splitParam(params.t);
    var modules = splitParam(params.m);
    return RK.real.filterQuestions({
      years: years,
      paperTypes: types.length ? types : ['morning'],
      modules: modules
    });
  }

  function buildCustom(params) {
    var pool = customPool(params);
    var n = Number(params.n) || 0;
    return n > 0 ? U.sample(pool, Math.min(n, pool.length)) : U.shuffle(pool);
  }

  function isSession(params) {
    return !!(params.q || params.p || params.m || params.w || params.s) && !params.browse;
  }

  function buildList(params) {
    if (params.q) {
      var one = RK.real.get(params.q);
      return one ? [one] : [];
    }
    if (params.w) {
      return RK.realRecord.unresolvedIds().map(function (id) {
        return RK.real.get(id);
      }).filter(Boolean);
    }
    if (params.s) return buildCustom(params);
    var pool;
    if (params.p && RK.real.byPaper[params.p]) {
      pool = RK.real.byPaper[params.p].slice();
    } else if (params.m && RK.real.byModule[params.m]) {
      pool = RK.real.byModule[params.m].slice();
    } else {
      pool = RK.real.questions.slice();
    }
    if (params.p && params.m) {
      pool = pool.filter(function (q) { return q.module === params.m; });
    }
    /* 整卷保持原题号顺序；按模块 / 全库随机打乱，和现有刷题练习一致 */
    return params.p ? pool : U.shuffle(pool);
  }

  function titleOf(params) {
    if (params.w) return '真题错题重做';
    if (params.q) {
      var q = RK.real.get(params.q);
      return q ? paperLabel(q.paper) + ' · 第 ' + q.no + ' 题' : '真题单题';
    }
    if (params.s) {
      var years = splitParam(params.y);
      var mods = splitParam(params.m);
      var n = Number(params.n) || 0;
      return '自选真题练习 · ' + (years.length ? years.join('/') + ' 年' : '全部年份') +
        ' · ' + (mods.length ? mods.length + ' 个模块' : '全部模块') +
        (n > 0 ? ' · ' + n + ' 题档' : ' · 全部匹配题');
    }
    if (params.p && params.m) {
      return paperLabel(params.p) + ' · ' + RK.moduleName(params.m);
    }
    if (params.p) return paperLabel(params.p) + ' · 整套练习';
    if (params.m) return RK.moduleName(params.m) + ' · 历年真题';
    return '全部真题随机练';
  }

  function signature(params) {
    return [params.q || '', params.p || '', params.m || '', params.w || '',
      params.s || '', params.y || '', params.t || '', params.n || ''].join('|');
  }

  function ensureSession(params) {
    var sig = signature(params);
    if (session && session.sig === sig) return session;
    var list = buildList(params).map(RK.variant);
    session = {
      sig: sig,
      mode: params.w ? 'w' : (params.q ? 'q' : (params.s ? 's' : (params.p && params.m ? 'pm' : (params.p ? 'p' : (params.m ? 'm' : 'all'))))),
      list: list,
      idx: 0,
      picked: {},
      correct: 0,
      wrong: 0,
      done: false,
      title: titleOf(params)
    };
    return session;
  }

  /* ---------------- 题目区 ---------------- */
  function renderBox() {
    var s = session;
    if (!s.list.length) {
      var tip = '当前没有可练的真题。';
      if (s.mode === 'w') tip = '暂无待复习的真题错题；先去练几道真题吧。';
      else if (s.mode === 's') tip = '当前筛选组合没有题目，请回到真题首页放宽年份或模块。';
      else if (s.mode === 'q') tip = '这道真题不存在，可能链接有误。';
      return '<div class="empty">' + tip + '</div>';
    }
    if (s.done) return renderSummary();

    var q = s.list[s.idx];
    var picked = s.picked[s.idx];
    var answered = picked !== undefined;
    var mod = RK.MODULE_MAP[q.module];
    var h = '';

    h += '<div class="q-head">';
    if (mod) h += '<span class="badge" style="background:' + mod.color + ';color:#fff">' + U.esc(mod.short) + '</span>';
    if (q.topic) h += '<span class="badge badge-plain">' + U.esc(q.topic) + '</span>';
    h += '<span class="badge badge-plain">' + U.esc(paperShort(q.paper)) + '</span>';
    h += verifiedBadge(q.verified);
    var blank = blankLabel(q);
    if (blank) h += '<span class="badge badge-plain">' + blank + '</span>';
    h += '<span class="spacer"></span><span class="q-index">原题 ' + q.no + '</span>';
    h += '</div>';

    h += '<div class="q-stem">' + renderStem(q) + '</div>';
    h += optionsHint(q);
    h += '<div class="opts">';
    q.options.forEach(function (opt, i) {
      var cls = 'opt';
      if (answered) {
        if (i === q.answer) cls += ' is-correct';
        else if (i === picked) cls += ' is-wrong';
        else cls += ' is-dim';
      }
      h += '<div class="' + cls + '" data-opt="' + i + '">' +
        '<span class="opt-key">' + LETTERS[i] + '</span><span>' + U.esc(opt) + '</span></div>';
    });
    h += '</div>';

    if (answered) {
      var ok = picked === q.answer;
      var ex = RK.real.explanationFor(q);
      h += '<div class="explain"><div class="ex-title ' + (ok ? 'ok' : 'bad') + '">' +
        (ok ? '回答正确' : '回答错误') + '</div>' +
        '<div class="ex-sec"><span class="ex-label">答案</span>' +
        '<span class="ex-answer">' + U.esc(ex.answer ? (ex.answer + '（' + LETTERS[q.answer] + '）') : LETTERS[q.answer]) + '</span></div>' +
        '<div class="ex-sec"><span class="ex-label">解题思路</span><span>' + U.esc(ex.idea) + '</span></div>' +
        '<div class="ex-sec"><span class="ex-label">推导过程</span><span>' + U.esc(ex.derivation) + '</span></div>' +
        '<div class="ex-source">解析来源：' + U.esc(ex.source) +
        (ex.selfComposed ? '（依据题面与对应知识点编写，供理解答案来源参考）' : '') +
        '<br />题面：' + sourceLink(q.source, q.sourceUrl) +
        ' · 答案：' + sourceLink(q.answerSource, q.answerSourceUrl) +
        ' · 原解析出处：' + U.esc(q.explanationSource || '未提供') +
        '</div></div>';
    }

    h += '<div class="q-toolbar">';
    h += '<button class="btn btn-ghost" data-act="prev"' + (s.idx === 0 ? ' disabled' : '') + '>上一题</button>';
    if (answered) {
      if (s.idx === s.list.length - 1) {
        h += '<button class="btn" data-act="finish">完成练习，查看小结</button>';
      } else {
        h += '<button class="btn" data-act="next">下一题</button>';
      }
    } else {
      h += '<span class="dim" style="font-size:12.5px">选择一个答案后立即判题</span>';
    }
    h += '<span class="spacer"></span>';
    h += '<button class="btn btn-sm btn-ghost" data-act="reset">重新开始</button>';
    h += '</div>';

    return h;
  }

  function renderSummary() {
    var s = session;
    var total = s.list.length;
    var answeredCount = Object.keys(s.picked).length;
    var rate = answeredCount ? s.correct / answeredCount : 0;
    var h = '<div class="card-head"><h2>练习小结</h2><span class="hint">' + U.esc(s.title) + '</span></div>';
    h += '<div class="grid grid-3">' +
      '<div class="kpi"><span class="kpi-label">已答</span><span class="kpi-value">' + answeredCount + ' <small>/ ' + total + '</small></span></div>' +
      '<div class="kpi"><span class="kpi-label">正确率</span><span class="kpi-value">' + U.pct(rate) + '</span></div>' +
      '<div class="kpi"><span class="kpi-label">错题</span><span class="kpi-value">' + s.wrong + ' <small>题</small></span></div>' +
      '</div>';
    h += '<div class="mt-16">' + RK.ui.bar(rate) + '</div>';

    /* 按模块拆本次正确率，便于查漏补缺 */
    var byMod = {};
    Object.keys(s.picked).forEach(function (i) {
      var q = s.list[Number(i)];
      if (!q) return;
      var m = byMod[q.module] || (byMod[q.module] = { total: 0, right: 0 });
      m.total += 1;
      if (s.picked[i] === q.answer) m.right += 1;
    });
    var modKeys = Object.keys(byMod);
    if (modKeys.length > 1) {
      h += '<div class="divider"></div><h3 style="font-size:14px;margin-bottom:8px">本次模块正确率</h3>';
      h += '<table class="table"><tbody>';
      modKeys.forEach(function (k) {
        var m = byMod[k];
        h += '<tr><td>' + U.esc(RK.moduleName(k)) + '</td>' +
          '<td class="mono">' + m.right + ' / ' + m.total + '</td>' +
          '<td class="mono">' + U.pct(m.right / m.total) + '</td></tr>';
      });
      h += '</tbody></table>';
    }

    var wrongList = [];
    Object.keys(s.picked).forEach(function (i) {
      var q = s.list[Number(i)];
      if (q && s.picked[i] !== q.answer) wrongList.push(q);
    });
    if (wrongList.length) {
      h += '<div class="divider"></div><div class="dim" style="font-size:12.5px;margin-bottom:6px">本次错题（已自动进入真题错题，不影响现有错题本）</div>';
      wrongList.forEach(function (q) {
        h += '<div class="task"><span class="task-text">' + U.esc(q.stem.slice(0, 46)) + '… ' +
          '<span class="dim">（' + U.esc(paperShort(q.paper)) + ' 原题 ' + q.no + '）</span></span></div>';
      });
    }
    h += '<div class="row mt-16">' +
      '<button class="btn" data-act="reset">再练一遍</button>' +
      '<a class="btn btn-ghost" href="#/real">返回真题首页</a>' +
      '<a class="btn btn-ghost" href="#/real?w=1">查看真题错题</a>' +
      '</div>';
    return h;
  }

  function renderCounters() {
    var s = session;
    var answered = Object.keys(s.picked).length;
    var rate = answered ? s.correct / answered : null;
    return '<span class="mono">第 ' + Math.min(s.idx + 1, s.list.length) + ' / ' + s.list.length + ' 题</span>' +
      '<span class="spacer"></span>' +
      '<span class="badge badge-ok">正确 ' + s.correct + '</span>' +
      '<span class="badge badge-bad">错误 ' + s.wrong + '</span>' +
      '<span class="badge badge-plain">正确率 ' + (rate === null ? '—' : U.pct(rate)) + '</span>';
  }

  /* ---------------- 首页 ---------------- */
  function moduleCard(m) {
    var count = RK.real.moduleCount(m.key);
    var parts = [];
    RK.real.papers.forEach(function (p) {
      var n = RK.real.modulePaperCount(m.key, p.key);
      if (n) parts.push(paperShort(p.key) + ' ' + n);
    });
    var h = '<div class="card module-card" style="box-shadow:none;background:var(--surface-2)">';
    h += '<div class="mod-top"><span class="mod-name"><i class="dot" style="background:' + m.color + '"></i> ' + U.esc(m.name) + '</span>' +
      '<span class="mod-weight">' + m.weight + ' 题/卷</span></div>';
    var shown = parts.slice(0, 2).join(' · ');
    if (parts.length > 2) shown += ' 等 ' + parts.length + ' 套';
    h += '<div class="row" style="justify-content:space-between;font-size:12px;color:var(--text-3)">' +
      '<span>真题 ' + count + ' 题</span><span>' + (count ? U.esc(shown) : '已入库套卷无题位') + '</span></div>';
    if (count) {
      h += '<div class="row-wrap mt-8"><a class="btn btn-sm btn-soft" href="#/real?m=' + encodeURIComponent(m.key) + '">开始练习</a>' +
        '<a class="btn btn-sm btn-ghost" href="#/real?m=' + encodeURIComponent(m.key) + '&browse=1">浏览题目</a>' +
        '<a class="btn btn-sm btn-ghost" href="#/knowledge?m=' + encodeURIComponent(m.key) + '">看要点</a></div>';
    } else {
      h += '<div class="dim mt-8" style="font-size:12px;line-height:1.7">已入库上午卷没有出现该模块的题目，可先用自编题库练习。</div>' +
        '<div class="row-wrap mt-8"><a class="btn btn-sm btn-ghost" href="#/practice?m=' + encodeURIComponent(m.key) + '">做自编题</a>' +
        '<a class="btn btn-sm btn-ghost" href="#/knowledge?m=' + encodeURIComponent(m.key) + '">看要点</a></div>';
    }
    h += '</div>';
    return h;
  }

  function renderBuilder() {
    var sel = savedSelection();
    var h = '<div class="card mt-16 real-builder"><div class="card-head"><h2>自选真题练习</h2>' +
      '<span class="hint">年份 / 卷型 / 模块自由组合，生成一组真题</span></div>';
    h += '<p class="dim" style="font-size:12.5px;line-height:1.75;margin-bottom:10px">' +
      '年份与模块至少各选 1 个；题量档只设上限，匹配题不足时按实际题量出题。' +
      '2025 / 2026 已收少量考生回忆题（9/10/5/2 题，单源·待核对），不能当完整套卷计时。</p>';

    h += '<div class="real-filter-row"><span class="real-filter-label">年份</span><div class="mod-pick real-year">';
    RK.real.years().forEach(function (y) {
      var n = yearPaperCount(y);
      var on = sel.years.indexOf(y) >= 0;
      h += '<label class="mod-pick-item' + (on ? ' is-on' : '') + (n ? '' : ' is-off') + '">' +
        '<input type="checkbox" data-year="' + y + '"' + (on ? ' checked' : '') + (n ? '' : ' disabled') + '>' +
        '<span>' + y + ' 年</span><span class="mod-pick-meta">' + (n ? n + ' 题' : '待补') + '</span></label>';
    });
    h += '</div></div>';

    h += '<div class="real-filter-row"><span class="real-filter-label">卷型</span>' +
      '<div class="seg" id="real-type">' +
      '<button type="button" class="seg-btn is-on" data-type="morning">上午卷 · 选择题</button>' +
      '<button type="button" class="seg-btn" data-type="afternoon" disabled title="下午案例卷暂未入库">下午卷 · 待补</button>' +
      '</div><span class="dim" style="font-size:12px">当前只入库上午选择题</span></div>';

    h += '<div class="real-filter-row"><span class="real-filter-label">模块</span><div class="mod-pick real-mod">';
    RK.MODULES.forEach(function (m) {
      var n = RK.real.moduleCount(m.key);
      var on = sel.modules.indexOf(m.key) >= 0;
      h += '<label class="mod-pick-item' + (on ? ' is-on' : '') + (n ? '' : ' is-off') + '">' +
        '<input type="checkbox" data-mod="' + m.key + '"' + (on ? ' checked' : '') + (n ? '' : ' disabled') + '>' +
        '<i class="dot" style="background:' + m.color + '"></i>' +
        '<span>' + U.esc(m.short) + '</span><span class="mod-pick-meta">' + n + ' 题</span></label>';
    });
    h += '</div></div>';

    h += '<div class="row mt-8" style="gap:8px;flex-wrap:wrap">' +
      '<button type="button" class="btn btn-sm btn-ghost" data-act="year-all">全选年份</button>' +
      '<button type="button" class="btn btn-sm btn-ghost" data-act="year-none">清空年份</button>' +
      '<span class="dim" style="font-size:12px">|</span>' +
      '<button type="button" class="btn btn-sm btn-ghost" data-act="mod-all">全选模块</button>' +
      '<button type="button" class="btn btn-sm btn-ghost" data-act="mod-none">清空模块</button>' +
      '</div>';

    h += '<div class="row mt-16" style="flex-wrap:wrap;gap:12px"><span class="dim" style="font-size:12.5px">题量档</span>' +
      '<div class="seg" id="real-scale">';
    SCALES.forEach(function (n) {
      h += '<button type="button" class="seg-btn' + (sel.n === n ? ' is-on' : '') + '" data-scale="' + n + '">' +
        (n > 0 ? n + ' 题' : '全部') + '</button>';
    });
    h += '</div><span class="spacer"></span><button type="button" class="btn" data-act="real-start">开始练习</button></div>';
    h += '<div class="mt-8 real-preview" id="real-preview"></div>';
    h += '</div>';
    return h;
  }

  function renderHome() {
    if (!RK.real.papers.length) {
      return '<div class="card"><div class="empty">真题数据未加载：请检查 index.html 是否已注册 assets/js/real/ 下的套卷脚本。</div></div>';
    }
    var total = RK.real.questions.length;
    var covered = RK.real.coveredModules().length;
    var unresolved = RK.realRecord.unresolvedIds();
    var loaded = RK.real.papers.filter(function (p) { return p.count > 0; });
    var pending = RK.real.papers.filter(function (p) { return !p.count; });
    var loadedLabels = loaded.map(function (p) { return p.label; }).join(' / ');

    var h = '';

    h += '<div class="card"><div class="card-head"><h2>历年真题 · 上午卷</h2>' +
      '<span class="hint">' + loaded.length + ' 套已入库 / ' + pending.length + ' 套待补 · ' + total + ' 题</span></div>' +
      '<p class="dim" style="font-size:13px;line-height:1.8;margin-bottom:10px">' +
      '已入库 ' + U.esc(loadedLabels) + '；2025 / 2026 只收公开的少量考生回忆题（单源·待核对），不是完整套卷。' +
      '真题按原卷题号与答案整理，按现有 13 个知识模块归类。练习流程与「刷题练习」一致：点击选项立即判题并显示解析，' +
      '答错进入独立的真题错题清单。真题作答不进入现有 607 题自编题库的掌握度、错题本与成绩统计。' +
      '</p>' +
      '<div class="grid grid-3">' +
      '<div class="kpi"><span class="kpi-label">真题总量</span><span class="kpi-value">' + total + ' <small>题</small></span></div>' +
      '<div class="kpi"><span class="kpi-label">覆盖模块</span><span class="kpi-value">' + covered + ' <small>/ ' + RK.MODULES.length + '</small></span></div>' +
      '<div class="kpi"><span class="kpi-label">待复习真题错题</span><span class="kpi-value">' + unresolved.length + ' <small>题</small></span></div>' +
      '</div>' +
      '<div class="row-wrap mt-16">' +
      loaded.slice().sort(function (a, b) { return a.key < b.key ? 1 : -1; }).map(function (p, i) {
        return '<a class="btn' + (i === 0 ? '' : ' btn-ghost') + '" href="#/real?p=' + encodeURIComponent(p.key) + '">练 ' + U.esc(p.label) + ' 整套</a>';
      }).join('') +
      '<a class="btn btn-ghost" href="#/real?w=1"' + (unresolved.length ? '' : ' style="opacity:.5;pointer-events:none"') + '>重做真题错题</a>' +
      '</div></div>';

    h += renderBuilder();

    h += '<div class="card mt-16"><div class="card-head"><h2>按模块浏览</h2>' +
      '<span class="hint">点「浏览题目」看该模块历年题位与题干，点「开始练习」直接刷</span></div>';
    h += '<div class="grid grid-3">';
    RK.MODULES.forEach(function (m) { h += moduleCard(m); });
    h += '</div></div>';

    h += '<div class="card mt-16"><div class="card-head"><h2>按年份浏览</h2>' +
      '<span class="hint">整卷练习保持原题号顺序，方便对照原卷</span></div>';
    h += '<div class="grid grid-2">';
    RK.real.papers.forEach(function (p) {
      var modules = RK.real.paperModuleCount(p.key);
      var isPending = !p.count;
      h += '<div class="card module-card" style="box-shadow:none;background:var(--surface-2)">' +
        '<div class="mod-top"><span class="mod-name">' + U.esc(p.label) + ' ' + U.esc(RK.real.paperTypeLabel(p.paperType)) + '</span>' +
        '<span class="mod-weight">' + (isPending ? '待补' : p.count + ' / ' + p.total + ' 题') + '</span></div>' +
        '<div class="row-wrap" style="gap:6px;margin-top:6px">' +
        '<span class="badge badge-plain">' + U.esc(RK.real.paperTypeLabel(p.paperType)) + '</span>' +
        verifiedBadge(p.verified) +
        (isPending ? '<span class="badge badge-plain">未入库</span>' : '<span class="badge badge-plain">' + modules + ' 个模块</span>') +
        '</div>' +
        '<div class="dim mt-8" style="font-size:12.5px;line-height:1.75">' +
        U.esc(isPending ? p.absent : (p.absent || ('覆盖 ' + modules + ' 个模块。'))) + '</div>' +
        (p.excluded ? '<div class="dim mt-8" style="font-size:12px;line-height:1.75">' + U.esc(p.excluded) + '</div>' : '') +
        '<div class="dim mt-8" style="font-size:12px;line-height:1.75">来源：' +
        sourceLink(p.sourceLabel || p.source, p.source) +
        (p.answerSource ? ' · 答案：' + sourceLink(p.answerSource, p.answerSourceUrl) : '') + '</div>' +
        (isPending ? '' : '<div class="row-wrap mt-8"><a class="btn btn-sm btn-soft" href="#/real?p=' + encodeURIComponent(p.key) + '">整套练习</a>' +
          '<a class="btn btn-sm btn-ghost" href="#/real?p=' + encodeURIComponent(p.key) + '&browse=1">浏览题目</a></div>') +
        '</div>';
    });
    h += '</div></div>';

    h += '<div class="card mt-16"><div class="card-head"><h2>真题错题</h2>' +
      '<span class="hint">独立存储 rk_sd_real_*，错因与复习标记统一在「错题本」置顶区管理</span></div>';
    if (unresolved.length) {
      h += '<p class="dim" style="font-size:13px">当前有 <strong>' + unresolved.length + '</strong> 道真题错题待复习（含复习中）。答对后自动标记为已掌握。</p>' +
        '<div class="row-wrap mt-8"><a class="btn" href="#/real?w=1">开始重做</a>' +
        '<a class="btn btn-ghost" href="#/review">到错题本整理错因</a></div>';
    } else {
      h += '<p class="dim" style="font-size:13px">暂无待复习的真题错题。做完一套卷后，错题会自动出现在「错题本」置顶区。</p>' +
        '<div class="row-wrap mt-8"><a class="btn btn-ghost" href="#/review">查看错题本</a></div>';
    }
    h += '</div>';

    h += '<div class="card mt-16"><div class="card-head"><h2>数据与来源说明</h2></div>' +
      '<p class="dim" style="font-size:12.5px;line-height:1.8">' +
      '已入库套卷：' + U.esc(loadedLabels) + '。2025 / 2026 按单源口径收录少量考生回忆题，出处逐题标注、核对状态为「单源」，来源说明中标「待核对」。' +
      '每题判题后会显示题面来源、答案来源与核对状态（已核对 / 单源 / 回忆版 / 待补）。' +
      '真题原文与解析的权利归原命题、出版或整理方，本库仅本地个人备考使用。' +
      '依赖原卷配图、表格、程序或 OCR 残缺的题目未录入，题号已写在各套卷卡片上。' +
      '多媒体与新技术在已入库套卷中没有对应题目，卡片显示为 0 题。' +
      '</p></div>';

    return h;
  }

  /* ---------------- 浏览列表 ---------------- */
  function renderBrowse(params) {
    var list;
    var title;
    var sub;
    var startLink;
    if (params.q) {
      return renderHome();
    }
    if (params.p && params.m) {
      list = (RK.real.byPaper[params.p] || []).filter(function (q) { return q.module === params.m; });
      title = paperLabel(params.p) + ' · ' + RK.moduleName(params.m);
      sub = '这套卷中该模块的题位';
      startLink = '#/real?p=' + encodeURIComponent(params.p) + '&m=' + encodeURIComponent(params.m);
    } else if (params.p) {
      list = (RK.real.byPaper[params.p] || []).slice();
      title = paperLabel(params.p) + ' · 题目列表';
      sub = '按原题号排列，共 ' + list.length + ' 题';
      startLink = '#/real?p=' + encodeURIComponent(params.p);
    } else if (params.m) {
      list = (RK.real.byModule[params.m] || []).slice().sort(function (a, b) {
        return a.paper === b.paper ? a.no - b.no : (a.paper < b.paper ? -1 : 1);
      });
      title = RK.moduleName(params.m) + ' · 历年真题';
      sub = '已入库上午卷中该模块的题位，共 ' + list.length + ' 题';
      startLink = '#/real?m=' + encodeURIComponent(params.m);
    } else {
      return renderHome();
    }

    var h = '';
    h += '<div class="card"><div class="row" style="align-items:flex-start">' +
      '<div><h2 style="font-size:18px">' + U.esc(title) + '</h2>' +
      '<div class="dim mt-8" style="font-size:12.8px">' + U.esc(sub) + '</div></div>' +
      '<span class="spacer"></span>' +
      '<div class="row-wrap">' +
      (list.length ? '<a class="btn" href="' + startLink + '">开始练习</a>' : '') +
      '<a class="btn btn-ghost" href="#/real">返回真题首页</a></div></div></div>';

    h += '<div class="card mt-16">';
    if (!list.length) {
      var paper = params.p ? RK.real.paperMap[params.p] : null;
      if (paper && !paper.count) {
        h += '<div class="empty">' + U.esc(paper.label) + ' 暂未入库：' +
          U.esc(paper.absent || '公开来源未提供可核对题面。') + '</div>' +
          '<div class="dim mt-8" style="font-size:12.5px;line-height:1.8">来源：' +
          sourceLink(paper.sourceLabel || paper.source, paper.source) +
          (paper.sourceNote ? ' · ' + U.esc(paper.sourceNote) : '') + '</div>';
      } else {
        h += '<div class="empty">该分类下暂无真题。可回到真题首页换一个模块，或先做现有自编题库。</div>';
      }
      h += '</div>';
      return h;
    }
    h += '<div class="real-list">';
    list.forEach(function (q) {
      var mod = RK.MODULE_MAP[q.module];
      h += '<a class="real-item" href="#/real?q=' + encodeURIComponent(q.id) + '">' +
        '<span class="real-no">' + q.no + '</span>' +
        '<span class="real-main">' +
        '<span class="real-title">' + U.esc(q.topic || '真题') +
        (blankLabel(q) ? ' <span class="dim">（题干' + blankLabel(q) + '）</span>' : '') + '</span>' +
        '<span class="real-stem">' + U.esc(q.stem.slice(0, 88)) + (q.stem.length > 88 ? '…' : '') + '</span>' +
        '</span>' +
        '<span class="badge badge-plain">' + U.esc(paperShort(q.paper)) + '</span>' +
        (mod ? '<span class="badge" style="background:' + mod.color + ';color:#fff">' + U.esc(mod.short) + '</span>' : '') +
        '</a>';
    });
    h += '</div></div>';
    h += '<div class="card mt-16"><div class="dim" style="font-size:12.5px;line-height:1.8">' +
      '点任意一题可单独练习并立即看解析；「开始练习」按当前筛选范围组题。' +
      '整卷练习保持原题号顺序，按模块练习会随机打乱题序。' +
      '</div></div>';
    return h;
  }

  function previewReal(el) {
    var box = el.querySelector('#real-preview');
    if (!box) return;
    var sel = checkedSelection(el);
    if (!sel.years.length || !sel.modules.length) {
      box.innerHTML = '请至少选择 1 个年份和 1 个模块。';
      return;
    }
    var pool = RK.real.filterQuestions({ years: sel.years, paperTypes: sel.types, modules: sel.modules });
    if (!pool.length) {
      box.innerHTML = '当前组合没有匹配题目，请放宽年份或模块。';
      return;
    }
    var mods = {};
    pool.forEach(function (q) { mods[q.module] = (mods[q.module] || 0) + 1; });
    var parts = Object.keys(mods).map(function (k) {
      return RK.MODULE_MAP[k].short + ' ' + mods[k];
    });
    var take = sel.n > 0 ? Math.min(sel.n, pool.length) : pool.length;
    box.innerHTML = '匹配 <strong>' + pool.length + '</strong> 题，本次抽 <strong>' + take + '</strong> 题：' +
      U.esc(parts.join(' · '));
  }

  function mountHome(el) {
    previewReal(el);

    el.addEventListener('change', function (e) {
      var input = e.target.closest ? e.target.closest('.real-year input[data-year],.real-mod input[data-mod]') : null;
      if (!input) return;
      if (input.parentNode && input.parentNode.classList) {
        input.parentNode.classList.toggle('is-on', input.checked);
      }
      saveSelection(checkedSelection(el));
      previewReal(el);
    });

    el.addEventListener('click', function (e) {
      var bulk = e.target.closest ? e.target.closest('[data-act="year-all"],[data-act="year-none"],[data-act="mod-all"],[data-act="mod-none"]') : null;
      if (bulk) {
        var act = bulk.getAttribute('data-act');
        var isYear = act.indexOf('year') === 0;
        var check = act.indexOf('-all') >= 0;
        var boxes = el.querySelectorAll(isYear ? '.real-year input[data-year]' : '.real-mod input[data-mod]');
        for (var i = 0; i < boxes.length; i++) {
          if (boxes[i].disabled) continue;
          boxes[i].checked = check;
          if (boxes[i].parentNode && boxes[i].parentNode.classList) {
            boxes[i].parentNode.classList.toggle('is-on', check);
          }
        }
        saveSelection(checkedSelection(el));
        previewReal(el);
        return;
      }

      var seg = e.target.closest ? e.target.closest('#real-scale .seg-btn') : null;
      if (seg) {
        var btns = el.querySelectorAll('#real-scale .seg-btn');
        for (var j = 0; j < btns.length; j++) btns[j].classList.remove('is-on');
        seg.classList.add('is-on');
        saveSelection(checkedSelection(el));
        previewReal(el);
        return;
      }

      var start = e.target.closest ? e.target.closest('[data-act="real-start"]') : null;
      if (!start) return;
      var sel = checkedSelection(el);
      if (!sel.years.length) { RK.toast('请至少选择 1 个年份'); return; }
      if (!sel.modules.length) { RK.toast('请至少选择 1 个模块'); return; }
      var pool = RK.real.filterQuestions({ years: sel.years, paperTypes: sel.types, modules: sel.modules });
      if (!pool.length) { RK.toast('当前组合没有匹配题目'); return; }
      saveSelection(sel);
      RK.router.go('/real?s=1&y=' + sel.years.join(',') + '&t=' + sel.types.join(',') +
        '&m=' + sel.modules.join(',') + '&n=' + sel.n);
    });
  }

  /* ---------------- 路由 ---------------- */
  RK.router.add('real', {
    title: '真题题库',
    sub: '2020 下 / 2022 下 / 2023 上 / 2024 上 · 2025-2026 少量回忆题（待核对） · 按年份 / 卷型 / 模块自选',
    render: function (params) {
      if (params.browse) return renderBrowse(params);
      if (!isSession(params)) return renderHome();
      var s = ensureSession(params);
      if (!s.list.length) {
        var tip = '当前没有可练的真题。';
        if (params.w) tip = '暂无待复习的真题错题；先去练几道真题吧。';
        else if (params.s) tip = '当前筛选组合没有题目，请回到真题首页放宽年份或模块。';
        else if (params.m) tip = RK.moduleName(params.m) + ' 在已入库上午卷中没有对应题目，可先用自编题库练习。';
        else if (params.q) tip = '这道真题不存在，可能链接有误。';
        var emptyBtns = '<a class="btn btn-ghost" href="#/real">返回真题首页</a>';
        if (params.m) {
          emptyBtns += '<a class="btn" href="#/practice?m=' + encodeURIComponent(params.m) + '">做自编题</a>';
        }
        return '<div class="card"><div class="empty">' + U.esc(tip) + '</div>' +
          '<div class="row mt-16">' + emptyBtns + '</div></div>';
      }
      return '<div class="card">' +
        '<div class="row" id="real-counters" style="margin-bottom:14px">' + renderCounters() + '</div>' +
        '<div id="real-qbox">' + renderBox() + '</div>' +
        '</div>';
    },

    mount: function (el, params) {
      if (params.browse) return;
      if (!isSession(params)) {
        mountHome(el);
        return;
      }
      if (!session) return;
      el.addEventListener('click', function (e) {
        var s = session;
        if (!s) return;

        var opt = e.target.closest('[data-opt]');
        if (opt && !s.done) {
          var i = Number(opt.getAttribute('data-opt'));
          if (s.picked[s.idx] !== undefined) return;
          var q = s.list[s.idx];
          s.picked[s.idx] = i;
          var ok = i === q.answer;
          if (ok) s.correct += 1; else s.wrong += 1;
          RK.realRecord.answer(q, ok, i, q.order);
          el.querySelector('#real-qbox').innerHTML = renderBox();
          var counters = el.querySelector('#real-counters');
          if (counters) counters.innerHTML = renderCounters();
          return;
        }

        var actEl = e.target.closest('[data-act]');
        if (!actEl) return;
        var act = actEl.getAttribute('data-act');

        if (act === 'next') {
          if (s.idx < s.list.length - 1) s.idx += 1;
          el.querySelector('#real-qbox').innerHTML = renderBox();
        } else if (act === 'prev') {
          if (s.idx > 0) s.idx -= 1;
          el.querySelector('#real-qbox').innerHTML = renderBox();
        } else if (act === 'finish') {
          s.done = true;
          el.querySelector('#real-qbox').innerHTML = renderBox();
        } else if (act === 'reset') {
          session = null;
          RK.router.render();
          return;
        }
        var row = el.querySelector('#real-counters');
        if (row) row.innerHTML = renderCounters();
      });
    }
  });
})(window.RK);
