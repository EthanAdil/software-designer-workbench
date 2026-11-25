/* ==========================================================================
 * exercise-engine.js —— 自编练习与真题练习共用的会话、计数、小结与事件
 * 只抽取两者完全一致的交互骨架；题目渲染与解析差异仍由各视图提供
 * ========================================================================== */
(function (RK) {
  var U = RK.U;

  RK.exercise = {
    createSession: function (sig, list, mode, title) {
      return {
        sig: sig, mode: mode, list: list, idx: 0,
        picked: {}, correct: 0, wrong: 0, done: false, title: title,
        startedAt: Date.now()
      };
    },

    counters: function (s) {
      var answered = Object.keys(s.picked).length;
      var rate = answered ? s.correct / answered : null;
      return '<span class="mono">第 ' + Math.min(s.idx + 1, s.list.length) + ' / ' + s.list.length + ' 题</span>' +
        '<span class="spacer"></span>' +
        '<span class="badge badge-ok">正确 ' + s.correct + '</span>' +
        '<span class="badge badge-bad">错误 ' + s.wrong + '</span>' +
        '<span class="badge badge-plain">正确率 ' + (rate === null ? '—' : U.pct(rate)) + '</span>';
    },

    toolbar: function (s) {
      var h = '<div class="q-toolbar">';
      h += '<button class="btn btn-ghost" data-act="prev"' + (s.idx === 0 ? ' disabled' : '') + '>上一题</button>';
      if (s.picked[s.idx] !== undefined) {
        if (s.idx === s.list.length - 1) h += '<button class="btn" data-act="finish">完成练习，查看小结</button>';
        else h += '<button class="btn" data-act="next">下一题</button>';
      } else {
        h += '<span class="dim" style="font-size:12.5px">选择一个答案后立即判题</span>';
      }
      h += '<span class="spacer"></span>';
      h += '<button class="btn btn-sm btn-ghost" data-act="reset">重新开始</button></div>';
      return h;
    },

    summaryHead: function (s) {
      var total = s.list.length;
      var answeredCount = Object.keys(s.picked).length;
      var rate = answeredCount ? s.correct / answeredCount : 0;
      var h = '<div class="card-head"><h2>练习小结</h2><span class="hint">' + U.esc(s.title) + '</span></div>';
      h += '<div class="grid grid-3">' +
        '<div class="kpi"><span class="kpi-label">已答</span><span class="kpi-value">' + answeredCount + ' <small>/ ' + total + '</small></span></div>' +
        '<div class="kpi"><span class="kpi-label">正确率</span><span class="kpi-value">' + U.pct(rate) + '</span></div>' +
        '<div class="kpi"><span class="kpi-label">错题</span><span class="kpi-value">' + s.wrong + ' <small>题</small></span></div>' +
        '</div>';
      return h + '<div class="mt-16">' + RK.ui.bar(rate) + '</div>';
    },

    wrongList: function (s, label, rowHtml) {
      var wrongList = [];
      Object.keys(s.picked).forEach(function (i) {
        var q = s.list[Number(i)];
        if (q && s.picked[i] !== q.answer) wrongList.push(q);
      });
      if (!wrongList.length) return '';
      var h = '<div class="divider"></div><div class="dim" style="font-size:12.5px;margin-bottom:6px">' + label + '</div>';
      wrongList.forEach(function (q) { h += rowHtml(q); });
      return h;
    },

    /* cfg: getSession / setSession / answer / renderBox / renderCounters / qbox / counters */
    mount: function (el, cfg) {
      el.addEventListener('click', function (e) {
        var s = cfg.getSession();
        if (!s) return;

        var opt = e.target.closest('[data-opt]');
        if (opt && !s.done) {
          var i = Number(opt.getAttribute('data-opt'));
          if (s.picked[s.idx] !== undefined) return;
          var q = s.list[s.idx];
          s.picked[s.idx] = i;
          var ok = i === q.answer;
          if (ok) s.correct += 1; else s.wrong += 1;
          cfg.answer(q, ok, i, q.order);
          el.querySelector(cfg.qbox).innerHTML = cfg.renderBox();
          var counters = el.querySelector(cfg.counters);
          if (counters) counters.innerHTML = cfg.renderCounters();
          return;
        }

        var actEl = e.target.closest('[data-act]');
        if (!actEl) return;
        var act = actEl.getAttribute('data-act');
        if (act === 'next') {
          if (s.idx < s.list.length - 1) s.idx += 1;
          el.querySelector(cfg.qbox).innerHTML = cfg.renderBox();
        } else if (act === 'prev') {
          if (s.idx > 0) s.idx -= 1;
          el.querySelector(cfg.qbox).innerHTML = cfg.renderBox();
        } else if (act === 'finish') {
          s.done = true;
          if (!s.finishedAt) s.finishedAt = Date.now();
          /* 成绩落盘只做一次：重复点「完成」或重渲染不会重复计数 */
          if (cfg.onFinish && !s.scoreRecorded) {
            s.scoreRecorded = true;
            cfg.onFinish(s);
          }
          el.querySelector(cfg.qbox).innerHTML = cfg.renderBox();
        } else if (act === 'reset') {
          cfg.setSession(null);
          RK.router.render();
          return;
        }
        var row = el.querySelector(cfg.counters);
        if (row) row.innerHTML = cfg.renderCounters();
      });
    }
  };
})(window.RK);
