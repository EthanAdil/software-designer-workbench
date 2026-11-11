/* ==========================================================================
 * views-practice.js —— 刷题练习：按模块 / 随机 / 错题重做
 * ========================================================================== */
(function (RK) {
  var U = RK.U;
  var LETTERS = U.letters;
  var session = null;

  function buildList(params) {
    if (params.w) {
      var wrong = RK.record.wrongAll();
      var ids = Object.keys(wrong).filter(function (id) { return !wrong[id].resolved; });
      return ids.map(function (id) { return RK.getQuestion(id); }).filter(Boolean);
    }
    if (params.m && RK.byModule[params.m]) {
      return U.shuffle(RK.byModule[params.m]);
    }
    var n = Number(params.r) || 30;
    return U.sample(RK.bank.morning, n);
  }

  function signature(params) {
    return [params.m || '', params.r || '', params.w || ''].join('|');
  }

  function ensureSession(params) {
    var sig = signature(params);
    if (session && session.sig === sig) return session;
    /* 本次练习内每题固定一套乱序选项，重绘/回看不会变 */
    var list = buildList(params).map(RK.variant);
    session = {
      sig: sig,
      list: list,
      idx: 0,
      picked: {},
      correct: 0,
      wrong: 0,
      done: false,
      title: params.w ? '错题重做' : (params.m ? RK.moduleName(params.m) + ' · 专项练习' : '随机练习')
    };
    return session;
  }

  /* ---------------- 题目区渲染 ---------------- */
  function renderBox() {
    var s = session;
    if (!s.list.length) {
      return '<div class="empty">当前没有可练的题目。' +
        (s.sig.indexOf('w') >= 0 ? '先去刷题积累错题，或错题已全部掌握。' : '') + '</div>';
    }
    if (s.done) return renderSummary();

    var q = s.list[s.idx];
    var picked = s.picked[s.idx];
    var answered = picked !== undefined;
    var mod = RK.MODULE_MAP[q.module];
    var h = '';

    h += '<div class="q-head">';
    h += '<span class="badge" style="background:' + (mod ? mod.color : '#666') + ';color:#fff">' + U.esc(mod ? mod.short : q.module) + '</span>';
    if (q.topic) h += '<span class="badge badge-plain">' + U.esc(q.topic) + '</span>';
    if (q.difficulty) h += '<span class="badge badge-plain">难度 ' + q.difficulty + '/3</span>';
    h += '<span class="spacer"></span><span class="q-index">' + q.id + '</span>';
    h += '</div>';

    h += '<div class="q-stem">' + U.esc(q.stem) + '</div>';
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
      h += '<div class="explain"><div class="ex-title ' + (ok ? 'ok' : 'bad') + '">' +
        (ok ? '回答正确' : '回答错误，正确答案 ' + LETTERS[q.answer]) + '</div>' + U.esc(q.explanation) + '</div>';
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

    var wrongList = [];
    Object.keys(s.picked).forEach(function (i) {
      var q = s.list[Number(i)];
      if (q && s.picked[i] !== q.answer) wrongList.push(q);
    });
    if (wrongList.length) {
      h += '<div class="divider"></div><div class="dim" style="font-size:12.5px;margin-bottom:6px">本次错题（已自动进入错题本）</div>';
      wrongList.forEach(function (q) {
        h += '<div class="task"><span class="task-text">' + U.esc(q.stem.slice(0, 46)) + '… <span class="dim">（' + q.id + '）</span></span></div>';
      });
    }
    h += '<div class="row mt-16">' +
      '<button class="btn" data-act="reset">再练一遍</button>' +
      '<a class="btn btn-ghost" href="#/practice">返回练习首页</a>' +
      '<a class="btn btn-ghost" href="#/review">查看错题本</a>' +
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

  /* ---------------- 视图 ---------------- */
  RK.router.add('practice', {
    title: function (params) {
      var isSession = params.m || params.r || params.w;
      return isSession ? '刷题练习' : '刷题练习';
    },
    sub: '点击选项立即判题并显示解析，答错自动进入错题本',
    render: function (params) {
      var isSession = params.m || params.r || params.w;

      if (!isSession) {
        var h = '';
        var wrong = RK.record.wrongAll();
        var unresolved = Object.keys(wrong).filter(function (id) { return !wrong[id].resolved; }).length;

        h += '<div class="grid grid-3">';
        h += '<div class="card"><div class="card-head"><h2>随机练习</h2></div>' +
          '<p class="dim" style="font-size:13px">从全部题库中随机抽 30 题，适合碎片时间保持手感。</p>' +
          '<a class="btn mt-8" href="#/practice?r=30">开始 30 题</a></div>';
        h += '<div class="card"><div class="card-head"><h2>错题重做</h2></div>' +
          '<p class="dim" style="font-size:13px">当前待攻克错题 <strong>' + unresolved + '</strong> 题（答对后自动标记为已掌握）。</p>' +
          '<a class="btn mt-8" href="#/practice?w=1"' + (unresolved ? '' : ' style="opacity:.5;pointer-events:none"') + '>开始重做</a></div>';
        h += '<div class="card"><div class="card-head"><h2>当前总量</h2></div>' +
          '<div class="kpi"><span class="kpi-value">' + RK.bank.morning.length + ' <small>题</small></span>' +
          '<span class="dim" style="font-size:12px">覆盖 ' + RK.MODULES.length + ' 个模块，按考点权重分布</span></div></div>';
        h += '</div>';

        var mastery = RK.mastery();
        h += '<div class="card mt-16"><div class="card-head"><h2>按模块练习</h2><span class="hint">题目数量与上午卷权重一致</span></div>';
        h += '<div class="grid grid-3">';
        RK.MODULES.forEach(function (m) {
          var count = (RK.byModule[m.key] || []).length;
          var s = mastery[m.key];
          h += '<div class="card module-card" style="box-shadow:none;background:var(--surface-2)">' +
            '<div class="mod-top"><span class="mod-name"><i class="dot" style="background:' + m.color + '"></i> ' + U.esc(m.name) + '</span>' +
            '<span class="mod-weight">' + m.weight + ' 题/卷</span></div>' +
            '<div class="row" style="justify-content:space-between;font-size:12px;color:var(--text-3)">' +
            '<span>题库 ' + count + ' 题</span><span>' + (s.rate === null ? '未练' : U.pct(s.rate)) + '</span></div>' +
            RK.ui.bar(s.rate) +
            '<div class="row-wrap"><a class="btn btn-sm btn-soft" href="#/practice?m=' + m.key + '">开始练习</a>' +
            '<a class="btn btn-sm btn-ghost" href="#/knowledge?m=' + m.key + '">看要点</a></div>' +
            '</div>';
        });
        h += '</div></div>';
        return h;
      }

      var s = ensureSession(params);
      return '<div class="card">' +
        '<div class="row" id="prac-counters" style="margin-bottom:14px">' + renderCounters() + '</div>' +
        '<div id="qbox">' + renderBox() + '</div>' +
        '</div>';
    },

    mount: function (el, params) {
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
          RK.record.answer(q.id, ok, i, q.order);
          el.querySelector('#qbox').innerHTML = renderBox();
          var counters = el.querySelector('#prac-counters');
          if (counters) counters.innerHTML = renderCounters();
          return;
        }

        var actEl = e.target.closest('[data-act]');
        if (!actEl) return;
        var act = actEl.getAttribute('data-act');

        if (act === 'next') {
          if (s.idx < s.list.length - 1) s.idx += 1;
          el.querySelector('#qbox').innerHTML = renderBox();
        } else if (act === 'prev') {
          if (s.idx > 0) s.idx -= 1;
          el.querySelector('#qbox').innerHTML = renderBox();
        } else if (act === 'finish') {
          s.done = true;
          el.querySelector('#qbox').innerHTML = renderBox();
        } else if (act === 'reset') {
          session = null;
          RK.router.render();
          return;
        }
        var row = el.querySelector('#prac-counters');
        if (row) row.innerHTML = renderCounters();
      });
    }
  });
})(window.RK);
