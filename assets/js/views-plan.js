/* ==========================================================================
 * views-plan.js —— 学习计划视图 + 计划工具函数（供总览页复用）
 * ========================================================================== */
(function (RK) {
  var U = RK.U;
  var PLAN = window.RK_PLAN;

  /* ---------------- 计划工具 ---------------- */
  var startDate = U.parseDate(PLAN.meta.start);

  function weekStart(no) {
    return new Date(startDate.getTime() + (no - 1) * 7 * 86400000);
  }
  function fmt(d) {
    return d.getFullYear() + '-' + U.pad(d.getMonth() + 1) + '-' + U.pad(d.getDate());
  }

  var allTasks = [];
  PLAN.stages.forEach(function (st) {
    st.weeks.forEach(function (wk) {
      wk.tasks.forEach(function (t) {
        allTasks.push({ id: t.id, weekId: wk.id, weekNo: wk.no, stageId: st.id, hours: t.hours || 0, text: t.text });
      });
    });
  });

  RK.planUtil = {
    weekStart: weekStart,
    weekRangeText: function (no) {
      var s = weekStart(no);
      var e = new Date(s.getTime() + 6 * 86400000);
      return fmt(s) + ' ~ ' + fmt(e).slice(5);
    },
    currentWeekNo: function () {
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var diff = Math.floor((today - startDate) / 86400000);
      if (diff < 0) return 0;
      var no = Math.floor(diff / 7) + 1;
      return Math.min(no, PLAN.meta.totalWeeks);
    },
    stageOfWeek: function (no) {
      for (var i = 0; i < PLAN.stages.length; i++) {
        var weeks = PLAN.stages[i].weeks;
        if (weeks.length && no >= weeks[0].no && no <= weeks[weeks.length - 1].no) return PLAN.stages[i];
      }
      return null;
    },
    weekById: function (id) { return PLAN.weekIndex[id] || null; },
    allTasks: allTasks,
    progress: function () {
      var done = 0;
      var hours = 0;
      var doneHours = 0;
      allTasks.forEach(function (t) {
        hours += t.hours;
        if (RK.tasks.isDone(t.id)) { done += 1; doneHours += t.hours; }
      });
      return { done: done, total: allTasks.length, hours: hours, doneHours: doneHours, rate: allTasks.length ? done / allTasks.length : 0 };
    },
    weekProgress: function (wk) {
      var total = wk.tasks.length;
      var done = wk.tasks.filter(function (t) { return RK.tasks.isDone(t.id); }).length;
      return { done: done, total: total };
    }
  };

  /* ---------------- 视图 ---------------- */
  RK.router.add('plan', {
    title: '学习计划',
    sub: '四阶段 29 周任务表（2026-11-02 ~ 2027-05-22），勾选即打卡，进度自动保存',
    render: function () {
      var p = RK.planUtil.progress();
      var cur = RK.planUtil.currentWeekNo();
      var curStage = RK.planUtil.stageOfWeek(cur);
      var html = '';

      html += '<div class="grid grid-4">';
      html += kpi('总任务', p.done + ' <small>/ ' + p.total + '</small>', p.rate);
      html += kpi('累计投入', p.doneHours + ' <small>/ ' + p.hours + ' 小时</small>', null);
      html += kpi('当前进度', cur ? '第 ' + cur + ' 周' : '未开始', null, curStage ? curStage.name.replace('第', '') : '');
      html += kpi('计划完成度', U.pct(p.rate), p.rate);
      html += '</div>';

      html += '<div class="card mt-16"><div class="card-head"><h2>总体进度</h2>' +
        '<span class="hint">已完成 ' + p.done + ' / ' + p.total + ' 项任务</span></div>' +
        RK.ui.bar(p.rate) + '</div>';

      PLAN.stages.forEach(function (st) {
        var stTasks = [];
        st.weeks.forEach(function (wk) { stTasks = stTasks.concat(wk.tasks); });
        var stDone = stTasks.filter(function (t) { return RK.tasks.isDone(t.id); }).length;
        var rate = stTasks.length ? stDone / stTasks.length : 0;
        var isCur = curStage && curStage.id === st.id;

        html += '<div class="card stage-card mt-16" style="border-left-color:' + st.color + '">';
        html += '<div class="stage-head"><div>';
        html += '<h2>' + U.esc(st.name) + (isCur ? ' ' + RK.ui.badge('进行中', '') : '') + '</h2>';
        html += '<div class="stage-meta">' + U.esc(st.range) + ' · ' + st.weekRange + ' · 目标 ' + st.targetScore + ' 分</div>';
        html += '</div><div style="min-width:180px">' +
          '<div class="row" style="justify-content:flex-end;font-size:12.5px;color:var(--text-3)">' +
          '<span>' + stDone + ' / ' + stTasks.length + '</span><span>' + U.pct(rate) + '</span></div>' +
          RK.ui.bar(rate) + '</div></div>';

        html += '<p class="muted mt-8">' + U.esc(st.goal) + '</p>';
        html += '<div class="row-wrap mt-8">' + st.focus.map(function (k) {
          return '<span class="badge badge-plain"><i class="dot" style="background:' + RK.moduleColor(k) + '"></i>&nbsp;' + U.esc(RK.moduleName(k)) + '</span>';
        }).join('') + '</div>';

        html += '<div class="divider"></div>';
        html += '<div class="stack" style="gap:6px">';
        st.keyActions.forEach(function (a, i) {
          html += '<div class="muted" style="font-size:13.2px">· ' + U.esc(a) + '</div>';
        });
        html += '</div>';

        html += '<div class="row mt-16"><span class="badge badge-warn">达标线 ' + st.targetScore + ' 分</span>' +
          '<span class="dim" style="font-size:12.5px">' + U.esc(st.targetNote) + '</span>' +
          '<span class="spacer"></span>' +
          '<a class="btn btn-sm btn-soft" href="#/assessment?p=' + st.assessment + '">进入阶段测评</a></div>';

        html += '<div class="week-list">';
        st.weeks.forEach(function (wk) {
          var wp = RK.planUtil.weekProgress(wk);
          var open = (cur === wk.no);
          html += '<div class="week' + (open ? ' open current' : '') + '" data-week="' + wk.id + '">';
          html += '<div class="week-head" data-toggle="' + wk.id + '">' +
            '<span class="week-no">W' + wk.no + '</span>' +
            '<span class="week-title">' + U.esc(wk.title) + '</span>' +
            '<span class="week-progress" data-week-progress="' + wk.id + '">' + wp.done + '/' + wp.total + '</span>' +
            '<span class="dim" style="font-size:12px">' + U.esc(wk.range) + '</span>' +
            '</div>';
          html += '<div class="week-body">';
          wk.tasks.forEach(function (t) {
            var done = RK.tasks.isDone(t.id);
            html += '<label class="task' + (done ? ' done' : '') + '">' +
              '<input type="checkbox" data-task="' + t.id + '" data-week="' + wk.id + '"' + (done ? ' checked' : '') + '>' +
              '<span class="task-text">' + U.esc(t.text) + '</span>' +
              '<span class="task-hours">' + t.hours + 'h</span>' +
              '</label>';
          });
          html += '</div></div>';
        });
        html += '</div></div>';
      });

      return html;
    },
    mount: function (el) {
      el.addEventListener('click', function (e) {
        var head = e.target.closest('[data-toggle]');
        if (head) {
          var wk = head.parentNode;
          wk.classList.toggle('open');
        }
      });

      el.addEventListener('change', function (e) {
        var cb = e.target.closest('[data-task]');
        if (!cb) return;
        var id = cb.getAttribute('data-task');
        var weekId = cb.getAttribute('data-week');
        var done = RK.tasks.toggle(id);
        cb.closest('.task').classList.toggle('done', done);

        var wk = RK.planUtil.weekById(weekId);
        if (wk) {
          var wp = RK.planUtil.weekProgress(wk);
          var label = el.querySelector('[data-week-progress="' + weekId + '"]');
          if (label) label.textContent = wp.done + '/' + wp.total;
        }
        var p = RK.planUtil.progress();
        RK.toast(done ? '已打卡，保持节奏' : '已取消打卡');
      });
    }
  });

  function kpi(label, value, rate, extra) {
    return '<div class="card"><div class="kpi">' +
      '<span class="kpi-label">' + U.esc(label) + '</span>' +
      '<span class="kpi-value">' + value + '</span>' +
      (rate === null || rate === undefined ? '<span class="dim" style="font-size:12px">' + U.esc(extra || '') + '</span>' : RK.ui.bar(rate)) +
      '</div></div>';
  }
})(window.RK);
