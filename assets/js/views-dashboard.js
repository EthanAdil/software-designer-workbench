/* ==========================================================================
 * views-dashboard.js —— 总览：倒计时、本周任务、模块掌握度、最近成绩
 * ========================================================================== */
(function (RK) {
  var U = RK.U;
  var PLAN = window.RK_PLAN;

  RK.router.add('dashboard', {
    title: '总览',
    sub: '距离考试还有多久、本周该做什么、哪块最薄弱',
    render: function () {
      var today = U.today();
      var daysLeft = U.daysBetween(today, RK.EXAM.date);
      var plan = RK.planUtil ? RK.planUtil.progress() : { done: 0, total: 0, rate: 0, doneHours: 0, hours: 0 };
      var answers = RK.record.answersAll();
      var totalAns = 0, rightAns = 0;
      Object.keys(answers).forEach(function (k) {
        totalAns += answers[k].right + answers[k].wrong;
        rightAns += answers[k].right;
      });
      var acc = totalAns ? rightAns / totalAns : null;
      var exams = RK.record.examsAll();
      var lastMock = null;
      for (var i = exams.length - 1; i >= 0; i--) {
        if (exams[i].kind === 'mock') { lastMock = exams[i]; break; }
      }

      var html = '';

      /* KPI */
      html += '<div class="grid grid-4">';
      html += '<div class="card"><div class="kpi"><span class="kpi-label">距离考试</span>' +
        '<span class="kpi-value">' + (daysLeft > 0 ? daysLeft : 0) + ' <small>天</small></span>' +
        '<span class="dim" style="font-size:12px">' + RK.EXAM.date + '（' + RK.EXAM.dateNote + '）</span></div></div>';
      html += '<div class="card"><div class="kpi"><span class="kpi-label">计划完成度</span>' +
        '<span class="kpi-value">' + U.pct(plan.rate) + '</span>' +
        RK.ui.bar(plan.rate) +
        '<span class="dim" style="font-size:12px">' + plan.done + ' / ' + plan.total + ' 项任务</span></div></div>';
      html += '<div class="card"><div class="kpi"><span class="kpi-label">累计答题</span>' +
        '<span class="kpi-value">' + totalAns + ' <small>题</small></span>' +
        '<span class="dim" style="font-size:12px">答对 ' + rightAns + ' 题</span></div></div>';
      html += '<div class="card"><div class="kpi"><span class="kpi-label">平均正确率</span>' +
        '<span class="kpi-value">' + (acc === null ? '—' : U.pct(acc)) + '</span>' +
        (acc === null ? '<span class="dim" style="font-size:12px">还没有做题记录</span>' : RK.ui.bar(acc)) + '</div></div>';
      html += '</div>';

      /* 本周任务 */
      var cur = RK.planUtil ? RK.planUtil.currentWeekNo() : 0;
      var curWeek = null;
      PLAN.stages.forEach(function (st) {
        st.weeks.forEach(function (wk) { if (wk.no === cur) curWeek = wk; });
      });

      html += '<div class="card mt-16"><div class="card-head"><h2>本周任务</h2>';
      if (curWeek) {
        var wp = RK.planUtil.weekProgress(curWeek);
        html += '<span class="hint">W' + curWeek.no + ' · ' + U.esc(curWeek.title) + ' · ' + wp.done + '/' + wp.total + '</span>';
      }
      html += '</div>';

      if (!curWeek) {
        html += RK.ui.empty(daysLeft > 0 ? '计划尚未开始，请从 W1 开始' : '计划周期已结束，按错题本滚动复习即可');
      } else {
        html += '<div class="muted" style="font-size:12.5px;margin-bottom:8px">' + U.esc(curWeek.range) + ' · 本周建议投入 10~15 小时</div>';
        curWeek.tasks.forEach(function (t) {
          var done = RK.tasks.isDone(t.id);
          html += '<label class="task' + (done ? ' done' : '') + '">' +
            '<input type="checkbox" data-task="' + t.id + '" data-week="' + curWeek.id + '"' + (done ? ' checked' : '') + '>' +
            '<span class="task-text">' + U.esc(t.text) + '</span>' +
            '<span class="task-hours">' + t.hours + 'h</span></label>';
        });
        html += '<div class="row mt-16"><a class="btn btn-sm btn-soft" href="#/plan">查看完整计划</a>' +
          '<a class="btn btn-sm btn-ghost" href="#/practice">开始刷题</a></div>';
      }
      html += '</div>';

      /* 模块掌握度 */
      var mastery = RK.mastery();
      html += '<div class="grid grid-2 mt-16">';
      html += '<div class="card"><div class="card-head"><h2>模块掌握度</h2><span class="hint">按累计作答正确率</span></div>';
      RK.MODULES.forEach(function (m) {
        var s = mastery[m.key];
        html += '<div style="margin-bottom:11px">' +
          '<div class="row" style="justify-content:space-between;font-size:12.8px;margin-bottom:3px">' +
          '<span><i class="dot" style="background:' + m.color + '"></i> ' + U.esc(m.short) + '</span>' +
          '<span class="dim">' + (s.rate === null ? '未练' : U.pct(s.rate) + '（' + s.total + '）') + '</span></div>' +
          RK.ui.bar(s.rate) + '</div>';
      });
      html += '</div>';

      /* 最近成绩 */
      html += '<div class="card"><div class="card-head"><h2>最近成绩</h2><span class="hint">模拟考试 / 阶段测评</span></div>';
      if (!exams.length) {
        html += RK.ui.empty('还没有考试成绩，先完成一次阶段测评或模拟考试');
      } else {
        html += '<table class="table"><thead><tr><th>时间</th><th>试卷</th><th>得分</th><th>结果</th></tr></thead><tbody>';
        exams.slice(-6).reverse().forEach(function (e) {
          html += '<tr><td class="dim nowrap">' + U.fmtDate(e.ts) + '</td>' +
            '<td>' + U.esc(e.name) + '</td>' +
            '<td class="mono">' + e.score + ' / ' + e.total + '</td>' +
            '<td>' + (e.score >= (e.passScore || 45) ? RK.ui.badge('达标', 'badge-ok') : RK.ui.badge('未达标', 'badge-bad')) + '</td></tr>';
        });
        html += '</tbody></table>';
        if (lastMock) {
          html += '<div class="dim mt-8" style="font-size:12.5px">最近一次模拟考试：' + U.esc(lastMock.name) + ' ' + lastMock.score + ' 分（' + U.fmtDate(lastMock.ts) + '）</div>';
        }
      }
      html += '<div class="divider"></div>';
      html += '<div class="row-wrap">' +
        '<a class="btn btn-sm" href="#/exam">进入模拟考试</a>' +
        '<a class="btn btn-sm btn-ghost" href="#/assessment">阶段测评</a>' +
        '<a class="btn btn-sm btn-ghost" href="#/review">错题本</a>' +
        '<a class="btn btn-sm btn-ghost" href="#/knowledge">知识模块</a>' +
        '</div>';
      html += '</div>';
      html += '</div>';

      /* 考试情报 */
      html += '<div class="card mt-16"><div class="card-head"><h2>考试情报</h2><span class="hint">' + U.esc(RK.EXAM.name) + '</span></div>';
      html += '<table class="table"><tbody>';
      (RK.syllabus.facts || []).forEach(function (f) {
        html += '<tr><td style="width:110px" class="dim nowrap">' + U.esc(f.label) + '</td>' +
          '<td><strong>' + U.esc(f.value) + '</strong><div class="dim" style="font-size:12.5px">' + U.esc(f.note) + '</div></td></tr>';
      });
      html += '</tbody></table>';
      html += '<div class="dim mt-8" style="font-size:12.5px">报名提醒：' + U.esc(RK.EXAM.signup) + '</div>';
      html += '</div>';

      return html;
    },
    mount: function (el) {
      el.addEventListener('change', function (e) {
        var cb = e.target.closest('[data-task]');
        if (!cb) return;
        var done = RK.tasks.toggle(cb.getAttribute('data-task'));
        cb.closest('.task').classList.toggle('done', done);
        RK.toast(done ? '已打卡，保持节奏' : '已取消打卡');
      });
    }
  });
})(window.RK);
