/* ==========================================================================
 * app.js —— 启动：主题、路由、倒计时、数据自检
 * ========================================================================== */
(function (RK) {
  var U = RK.U;

  function renderCountdown() {
    var el = document.getElementById('countdown');
    if (!el) return;
    var days = U.daysBetween(U.today(), RK.EXAM.date);
    if (days > 0) {
      el.innerHTML = '<div><b>' + days + '<span>天</span></b>' +
        '<div class="cd-hint">距离 ' + RK.EXAM.date + ' 考试</div></div>';
    } else {
      el.innerHTML = '<div><b>已开考<span></span></b><div class="cd-hint">祝你一次通过</div></div>';
    }
  }

  function selfCheck() {
    var total = RK.bank.morning.length;
    var problems = [];
    RK.MODULES.forEach(function (m) {
      var n = (RK.byModule[m.key] || []).length;
      if (n < m.weight) problems.push(m.name + ' 仅 ' + n + ' 题（建议 ≥ ' + m.weight + '）');
    });
    if (problems.length) {
      console.warn('[题库自检] 部分模块题量不足以组一套 75 题模拟考试：\n' + problems.join('\n'));
    }
    console.log('%c软件设计师备考工作台', 'font-weight:700;font-size:13px');
    console.log('上午题库 ' + total + ' 题 / 下午案例 ' + RK.bank.afternoon.length + ' 道 / 模块 ' + RK.MODULES.length + ' 个');
  }

  function boot() {
    RK.theme.init();

    if (RK.realRecord && RK.realRecord.removeBackfilledScores) {
      var removed = RK.realRecord.removeBackfilledScores();
      if (removed) console.info('[真题成绩] 已移除历史回填记录 ' + removed + ' 条');
    }

    var toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () { RK.theme.toggle(); });
    }

    if (!window.location.hash) {
      window.location.hash = '#/dashboard';
    }

    window.addEventListener('hashchange', function () { RK.router.render(); });

    renderCountdown();
    selfCheck();
    RK.router.render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window.RK);
