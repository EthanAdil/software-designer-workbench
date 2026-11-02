/* ==========================================================================
 * views-exam.js —— 阶段测评 / 全真模考（上午卷自动判分 + 下午卷自评）
 * ========================================================================== */
(function (RK) {
  var U = RK.U;
  var LETTERS = U.letters;
  var EXAMS = window.RK_EXAMS;
  var sess = null;

  /* ---------------- 组卷 ---------------- */
  function buildCasePaper(paper, seq) {
    var pools = {};
    RK.bank.afternoon.forEach(function (q) {
      (pools[q.type] = pools[q.type] || []).push(q);
    });
    var out = [];
    paper.rules.forEach(function (rule, ri) {
      var pool;
      if (rule.type === 'code') {
        pool = (pools.java || []).concat(pools.cpp || []);
      } else {
        pool = pools[rule.type] || [];
      }
      if (!pool.length) return;
      for (var k = 0; k < rule.count; k++) {
        out.push(pool[(seq + ri + k) % pool.length]);
      }
    });
    return out;
  }

  function startSession(paper) {
    var list;
    if (paper.paper === 'afternoon') {
      var seq = EXAMS.cases.indexOf(paper);
      list = buildCasePaper(paper, seq < 0 ? 0 : seq);
    } else {
      /* 每套卷一次性乱序，答题、答题卡、交卷解析共用同一套顺序 */
      list = RK.buildPaper(paper.rules).map(RK.variant);
    }
    sess = {
      paper: paper,
      list: list,
      idx: 0,
      answers: {},
      flagged: {},
      texts: {},
      startTs: Date.now(),
      timer: null,
      phase: 'running',
      result: null
    };
    return sess;
  }

  /* ---------------- 列表 ---------------- */
  function renderList() {
    var h = '';
    var records = RK.record.examsAll();
    var best = {};
    records.forEach(function (r) {
      if (!best[r.paperId] || r.score > best[r.paperId].score) best[r.paperId] = r;
    });

    function card(p, tag) {
      var rec = best[p.id];
      var h2 = '<div class="card module-card">';
      h2 += '<div class="mod-top"><span class="mod-name">' + U.esc(p.name) + '</span>' +
        (rec ? RK.ui.badge('最高 ' + rec.score + ' 分', rec.score >= (p.targetScore || 60) ? 'badge-ok' : 'badge-warn') : RK.ui.badge('未完成', 'badge-plain')) + '</div>';
      h2 += '<p class="dim" style="font-size:13px;margin:0">' + U.esc(p.desc) + '</p>';
      h2 += '<div class="row-wrap" style="font-size:12px;color:var(--text-3)">' +
        '<span>' + (p.paper === 'afternoon' ? p.duration + ' 分钟' : p.duration + ' 分钟') + '</span>' +
        '<span>合格 ' + (p.passScore || 45) + ' 分</span>' +
        (p.targetScore ? '<span>目标 ' + p.targetScore + ' 分</span>' : '') +
        (p.difficulty ? '<span>' + p.difficulty + '</span>' : '') +
        '</div>';
      h2 += '<div class="row-wrap"><a class="btn btn-sm" href="#/exam?p=' + p.id + '">开始</a>' +
        (rec ? '<a class="btn btn-sm btn-ghost" href="#/stats">查看成绩</a>' : '') + '</div>';
      h2 += '</div>';
      return h2;
    }

    h += '<div class="card"><div class="card-head"><h2>阶段测评</h2>' +
      '<span class="hint">每阶段结束做一次，检验该阶段掌握情况（40~45 题 / 45 分钟）</span></div>';
    h += '<div class="grid grid-3">' + EXAMS.stages.map(function (p) { return card(p); }).join('') + '</div></div>';

    h += '<div class="card mt-16"><div class="card-head"><h2>全真模考（上午卷）</h2>' +
      '<span class="hint">75 题 / 120 分钟 / 75 分，两科连考中的第一科</span></div>';
    h += '<div class="grid grid-3">' + EXAMS.mocks.map(function (p) { return card(p); }).join('') + '</div>';
    h += '<div class="dim mt-8" style="font-size:12.5px">说明：题库为按考点自编练习题，非官方真题。模考用于固定节奏与查漏，建议在 W27、W28 配合近年真题使用。</div></div>';

    h += '<div class="card mt-16"><div class="card-head"><h2>下午卷（应用技术）</h2>' +
      '<span class="hint">5 道案例题 / 120 分钟 / 75 分，交卷后对照参考答案自评</span></div>';
    h += '<div class="grid grid-3">' + EXAMS.cases.map(function (p) { return card(p); }).join('') + '</div>';
    h += '<div class="dim mt-8" style="font-size:12.5px">下午卷评分靠人工自评：先独立作答，再展开参考答案逐问打分，最后提交自评结果。</div></div>';

    return h;
  }

  /* ---------------- 考试中 ---------------- */
  function renderTimerBox() {
    var p = sess.paper;
    var totalSec = (p.duration || 120) * 60;
    return '<div class="card">' +
      '<div class="dim" style="font-size:12px">剩余时间</div>' +
      '<div class="timer" id="timer">' + U.fmtClock(totalSec) + '</div>' +
      '<div class="bar mt-8" id="timebar"><i style="width:100%"></i></div>' +
      '<button class="btn mt-16" id="btn-submit" type="button" style="width:100%">交卷</button>' +
      '<div class="dim mt-8" style="font-size:11.5px">考试中请勿刷新页面，刷新会丢失作答记录</div>' +
      '</div>';
  }

  /* 已答计数：上午卷看选择题，下午卷看是否写了作答要点 */
  function answeredCount() {
    if (!sess) return 0;
    if (sess.paper.paper === 'afternoon') {
      return sess.list.filter(function (q, i) {
        var t = sess.texts[i] || {};
        return Object.keys(t).some(function (k) { return String(t[k] || '').trim(); });
      }).length;
    }
    return Object.keys(sess.answers).length;
  }

  function renderSheet() {
    var h = '<div class="card"><div class="card-head"><h2 style="font-size:14px">答题卡</h2>' +
      '<span class="hint" id="sheet-count">' + answeredCount() + '/' + sess.list.length + '</span></div>';
    h += '<div class="answer-grid" id="exam-sheet">';
    sess.list.forEach(function (q, i) {
      var cls = 'answer-cell';
      if (sess.answers[i] !== undefined) cls += ' done';
      if (sess.flagged[i]) cls += ' flagged';
      if (i === sess.idx) cls += ' current';
      h += '<div class="' + cls + '" data-jump="' + i + '">' + (i + 1) + '</div>';
    });
    h += '</div>';
    h += '<div class="legend mt-8"><span><i class="done"></i>已答</span><span><i></i>未答</span><span><i class="flag"></i>标记</span></div>';
    h += '</div>';
    return h;
  }

  function renderQuestion() {
    var q = sess.list[sess.idx];
    if (!q) return '<div class="empty">没有题目</div>';
    var mod = RK.MODULE_MAP[q.module];
    var h = '';

    h += '<div class="q-head">' +
      '<span class="badge" style="background:' + (mod ? mod.color : '#666') + ';color:#fff">' + U.esc(mod ? mod.short : '') + '</span>' +
      (q.topic ? '<span class="badge badge-plain">' + U.esc(q.topic) + '</span>' : '') +
      '<span class="spacer"></span><span class="q-index">第 ' + (sess.idx + 1) + ' / ' + sess.list.length + ' 题</span></div>';

    if (q.kind === 'choice') {
      h += '<div class="q-stem">' + U.esc(q.stem) + '</div><div class="opts">';
      q.options.forEach(function (opt, i) {
        var cls = 'opt' + (sess.answers[sess.idx] === i ? ' is-selected' : '');
        h += '<div class="' + cls + '" data-opt="' + i + '"><span class="opt-key">' + LETTERS[i] + '</span><span>' + U.esc(opt) + '</span></div>';
      });
      h += '</div>';
    } else {
      h += '<div class="q-stem" style="font-size:14px">' + U.esc(q.background).replace(/\n/g, '<br>') + '</div>';
      q.questions.forEach(function (sub, qi) {
        h += '<div class="explain" style="border-left-color:var(--border-strong)">' +
          '<div style="font-weight:600;margin-bottom:4px">' + U.esc(sub.q) + ' <span class="dim">（' + sub.score + ' 分）</span></div>' +
          '<textarea data-qi="' + qi + '" rows="3" placeholder="写下你的答案要点…" ' +
          'style="width:100%;padding:9px 11px;border:1px solid var(--border);border-radius:9px;background:var(--surface);color:var(--text);font-family:inherit;font-size:13.5px;resize:vertical">' +
          U.esc((sess.texts[sess.idx] || {})[qi] || '') + '</textarea></div>';
      });
    }

    h += '<div class="q-toolbar">' +
      '<button class="btn btn-ghost" data-act="prev"' + (sess.idx === 0 ? ' disabled' : '') + '>上一题</button>' +
      '<button class="btn btn-ghost" data-act="flag">' + (sess.flagged[sess.idx] ? '取消标记' : '标记本题') + '</button>' +
      '<span class="spacer"></span>' +
      '<button class="btn" data-act="next"' + (sess.idx === sess.list.length - 1 ? ' disabled' : '') + '>下一题</button>' +
      '</div>';

    return h;
  }

  function renderRunning() {
    return '<div class="exam-layout">' +
      '<div class="card"><div id="exam-q">' + renderQuestion() + '</div></div>' +
      '<div class="exam-side">' + renderTimerBox() + renderSheet() + '</div>' +
      '</div>';
  }

  /* ---------------- 结果 ---------------- */
  function renderMorningResult() {
    var r = sess.result;
    var pass = r.score >= r.passScore;
    var h = '<div class="card">';
    h += '<div class="row" style="align-items:flex-start;gap:24px;flex-wrap:wrap">';
    h += '<div><div class="dim" style="font-size:12.5px">' + U.esc(r.name) + '</div>' +
      '<div style="font-size:52px;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums">' + r.score +
      '<span style="font-size:18px;color:var(--text-3);font-weight:400"> / ' + r.total + '</span></div>' +
      '<div class="row mt-8">' + (pass ? RK.ui.badge('达到合格线', 'badge-ok') : RK.ui.badge('未达合格线', 'badge-bad')) +
      (r.score >= (r.targetScore || 60) ? RK.ui.badge('达成目标', 'badge-ok') : '') + '</div></div>';
    h += '<span class="spacer"></span>';
    h += '<div class="grid grid-2" style="min-width:300px;gap:16px">' +
      '<div class="kpi"><span class="kpi-label">用时</span><span class="kpi-value">' + U.fmtDuration(r.usedSec) + '</span></div>' +
      '<div class="kpi"><span class="kpi-label">正确率</span><span class="kpi-value">' + U.pct(r.total ? r.score / r.total : 0) + '</span></div>' +
      '</div>';
    h += '</div></div>';

    h += '<div class="card mt-16"><div class="card-head"><h2>模块得分</h2><span class="hint">找出拖分模块，优先回炉</span></div>';
    h += '<table class="table"><thead><tr><th>模块</th><th style="width:70px">题数</th><th style="width:70px">答对</th><th style="width:110px">正确率</th><th style="width:80px">评价</th></tr></thead><tbody>';
    r.moduleStats.forEach(function (s) {
      var rate = s.total ? s.right / s.total : 0;
      h += '<tr><td><i class="dot" style="background:' + RK.moduleColor(s.key) + '"></i> ' + U.esc(RK.moduleName(s.key)) + '</td>' +
        '<td class="mono">' + s.total + '</td>' +
        '<td class="mono">' + s.right + '</td>' +
        '<td>' + RK.ui.bar(rate) + '<span class="dim" style="font-size:12px">' + U.pct(rate) + '</span></td>' +
        '<td>' + (rate >= 0.75 ? RK.ui.badge('扎实', 'badge-ok') : rate >= 0.55 ? RK.ui.badge('待巩固', 'badge-warn') : RK.ui.badge('薄弱', 'badge-bad')) + '</td></tr>';
    });
    h += '</tbody></table></div>';

    var wrongIdx = [];
    r.detail.forEach(function (d, i) { if (!d.ok) wrongIdx.push(i); });

    h += '<div class="card mt-16"><div class="card-head"><h2>错题回顾</h2><span class="hint">共 ' + wrongIdx.length + ' 题（含未作答），答错的题已进入错题本</span></div>';
    if (!wrongIdx.length) {
      h += RK.ui.empty('本套卷全部答对，状态很好');
    } else {
      wrongIdx.forEach(function (i) {
        var q = sess.list[i];
        var d = r.detail[i];
        h += '<details style="border-bottom:1px solid var(--border);padding:9px 0">' +
          '<summary style="cursor:pointer;font-size:13.8px">' +
          '<span class="q-index">' + (i + 1) + '.</span> ' + U.esc(q.stem.slice(0, 60)) + '… ' +
          '<span class="badge badge-bad">你选 ' + (d.pick === null ? '未答' : LETTERS[d.pick]) + '</span> ' +
          '<span class="badge badge-ok">正确 ' + LETTERS[q.answer] + '</span></summary>' +
          '<div class="explain mt-8"><div class="ex-title">解析</div>' + U.esc(q.explanation) + '</div>' +
          '</details>';
      });
    }
    h += '</div>';

    h += '<div class="row mt-16"><a class="btn" href="#/exam">返回试卷列表</a>' +
      '<a class="btn btn-ghost" href="#/review">去错题本</a>' +
      '<a class="btn btn-ghost" href="#/stats">看成绩趋势</a></div>';

    return h;
  }

  function renderCaseScore() {
    var h = '<div class="card"><div class="card-head"><h2>对照参考答案自评</h2>' +
      '<span class="hint">先看自己的作答，再按评分要点给分，不要凭感觉放水</span></div>';
    sess.list.forEach(function (q, i) {
      h += '<div style="border-bottom:1px solid var(--border);padding:14px 0">';
      h += '<div class="row"><strong>' + (i + 1) + '. ' + U.esc(q.title) + '</strong><span class="spacer"></span>' +
        '<span class="badge badge-plain">' + q.points + ' 分</span></div>';
      h += '<div class="dim mt-8" style="font-size:12.5px">题型：' + U.esc(q.topic) + '</div>';

      q.questions.forEach(function (sub, qi) {
        var mine = (sess.texts[i] || {})[qi] || '';
        h += '<div class="point-block"><h4>' + U.esc(sub.q) + '（' + sub.score + ' 分）</h4>';
        if (mine) h += '<div class="dim" style="font-size:12.5px">我的作答：' + U.esc(mine).replace(/\n/g, '<br>') + '</div>';
        h += '<div class="explain mt-8"><div class="ex-title">参考答案</div>' + U.esc(sub.answer).replace(/\n/g, '<br>') + '</div>';
        h += '<div class="row mt-8"><span class="dim" style="font-size:12.5px">该问得分</span>' +
          '<input type="number" min="0" max="' + sub.score + '" step="0.5" data-score-pair="' + i + '-' + qi + '" ' +
          'value="0" style="width:76px;padding:5px 8px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);font-family:inherit">' +
          '<span class="dim" style="font-size:12px">/ ' + sub.score + '</span></div>';
        h += '</div>';
      });

      if (q.tips && q.tips.length) {
        h += '<div class="explain" style="border-left-color:var(--warn)"><div class="ex-title">评分要点</div>' +
          q.tips.map(function (t) { return '· ' + U.esc(t); }).join('<br>') + '</div>';
      }
      h += '</div>';
    });

    h += '<div class="row mt-16"><button class="btn" data-act="commit-case">提交自评得分</button>' +
      '<a class="btn btn-ghost" href="#/exam">放弃本次成绩</a></div>';
    h += '</div>';
    return h;
  }

  function renderCaseResult() {
    var r = sess.result;
    var pass = r.score >= r.passScore;
    var h = '<div class="card"><div class="dim" style="font-size:12.5px">' + U.esc(r.name) + '</div>' +
      '<div style="font-size:52px;font-weight:700;line-height:1.1">' + r.score +
      '<span style="font-size:18px;color:var(--text-3);font-weight:400"> / ' + r.total + '</span></div>' +
      '<div class="row mt-8">' + (pass ? RK.ui.badge('达到合格线', 'badge-ok') : RK.ui.badge('未达合格线', 'badge-bad')) +
      RK.ui.badge('用时 ' + U.fmtDuration(r.usedSec), 'badge-plain') + '</div></div>';

    h += '<div class="card mt-16"><div class="card-head"><h2>逐题得分</h2></div><table class="table"><thead><tr><th>题号</th><th>题目</th><th>题型</th><th>得分</th></tr></thead><tbody>';
    r.detail.forEach(function (d, i) {
      h += '<tr><td class="mono">' + (i + 1) + '</td><td>' + U.esc(d.title) + '</td><td class="dim">' + U.esc(d.topic) + '</td>' +
        '<td class="mono">' + d.score + ' / ' + d.total + '</td></tr>';
    });
    h += '</tbody></table></div>';

    h += '<div class="row mt-16"><a class="btn" href="#/exam">返回试卷列表</a><a class="btn btn-ghost" href="#/stats">看成绩趋势</a></div>';
    return h;
  }

  /* ---------------- 交卷 ---------------- */
  function submitExam(el) {
    if (!sess || sess.phase !== 'running') return;
    var paper = sess.paper;

    if (paper.paper === 'afternoon') {
      sess.texts[sess.idx] = sess.texts[sess.idx] || {};
      sess.usedSec = Math.round((Date.now() - sess.startTs) / 1000);
      stopTimer();
      sess.phase = 'selfscore';
      RK.router.render();
      return;
    }

    stopTimer();
    var detail = [];
    var moduleMap = {};
    var score = 0;

    sess.list.forEach(function (q, i) {
      var pick = sess.answers[i];
      var ok = pick === q.answer;
      if (ok) score += 1;
      detail.push({ id: q.id, pick: pick === undefined ? null : pick, ok: ok });
      if (!moduleMap[q.module]) moduleMap[q.module] = { key: q.module, total: 0, right: 0 };
      moduleMap[q.module].total += 1;
      if (ok) moduleMap[q.module].right += 1;
      /* 未作答的题只计入成绩，不写入错题本与掌握度统计，避免一次模考灌入几十道未答题 */
      if (pick !== undefined) RK.record.answer(q.id, ok, pick, q.order);
    });

    var total = sess.list.length;
    var passScore = Math.round((paper.passScore || 45) / 75 * total);
    var usedSec = Math.round((Date.now() - sess.startTs) / 1000);

    sess.result = {
      paperId: paper.id,
      name: paper.name,
      kind: paper.kind,
      paper: paper.paper,
      score: score,
      total: total,
      passScore: passScore,
      targetScore: paper.targetScore ? Math.round(paper.targetScore / 75 * total) : null,
      usedSec: usedSec,
      moduleStats: Object.keys(moduleMap).map(function (k) { return moduleMap[k]; }),
      detail: detail
    };
    RK.record.addExam({
      paperId: paper.id,
      name: paper.name,
      kind: paper.kind,
      paper: paper.paper,
      score: score,
      total: total,
      passScore: passScore,
      ts: Date.now(),
      usedSec: usedSec
    });
    sess.phase = 'result';
    RK.router.render();
  }

  function commitCase(el) {
    var total = 0;
    var maxTotal = 0;
    var detail = [];
    sess.list.forEach(function (q, i) {
      var sum = 0;
      q.questions.forEach(function (sub, qi) {
        var input = el.querySelector('[data-score-pair="' + i + '-' + qi + '"]');
        var v = input ? Number(input.value) : 0;
        if (isNaN(v) || v < 0) v = 0;
        if (v > sub.score) v = sub.score;
        sum += v;
      });
      total += sum;
      maxTotal += q.points;
      detail.push({ title: q.title, topic: q.topic, score: sum, total: q.points });
    });
    var paper = sess.paper;
    var passScore = Math.round((paper.passScore || 45) / 75 * maxTotal);
    sess.result = {
      paperId: paper.id,
      name: paper.name,
      kind: paper.kind,
      paper: 'afternoon',
      score: Math.round(total * 2) / 2,
      total: maxTotal,
      passScore: passScore,
      usedSec: sess.usedSec || 0,
      detail: detail
    };
    RK.record.addExam({
      paperId: paper.id,
      name: paper.name,
      kind: paper.kind,
      paper: 'afternoon',
      score: sess.result.score,
      total: maxTotal,
      passScore: passScore,
      ts: Date.now(),
      usedSec: sess.usedSec || 0
    });
    sess.phase = 'result';
    RK.router.render();
  }

  /* ---------------- 计时器 ---------------- */
  function stopTimer() {
    if (sess && sess.timer) {
      clearInterval(sess.timer);
      sess.timer = null;
    }
  }

  function startTimer(el) {
    stopTimer();
    var totalSec = (sess.paper.duration || 120) * 60;
    var tick = function () {
      var left = totalSec - Math.round((Date.now() - sess.startTs) / 1000);
      if (left < 0) left = 0;
      var t = el.querySelector('#timer');
      if (t) {
        t.textContent = U.fmtClock(left);
        t.classList.toggle('low', left <= 300);
      }
      var bar = el.querySelector('#timebar i');
      if (bar) bar.style.width = (left / totalSec * 100) + '%';
      if (left <= 0) {
        stopTimer();
        RK.toast('时间到，自动交卷');
        submitExam(el);
      }
    };
    tick();
    sess.timer = setInterval(tick, 1000);
  }

  /* ---------------- 路由 ---------------- */
  RK.router.add('exam', {
    title: '模拟考试',
    sub: '阶段测评检验掌握度，全真模考固定节奏；两科都需 ≥45 分',
    render: function (params) {
      if (!params.p) {
        sess = null;
        return renderList();
      }
      var paper = EXAMS.index[params.p];
      if (!paper) {
        sess = null;
        return RK.ui.empty('未找到试卷：' + params.p) + renderList();
      }
      if (!sess || sess.paper.id !== paper.id) {
        startSession(paper);
      } else if (sess.phase === 'running') {
        sess.startTs = sess.startTs; /* 保留原始开始时间，离开页面的时间照常计 */
      }

      if (sess.phase === 'running') return renderRunning();
      if (sess.phase === 'selfscore') return renderCaseScore();
      return sess.paper.paper === 'afternoon' ? renderCaseResult() : renderMorningResult();
    },

    mount: function (el, params) {
      if (!sess) return;

      if (sess.phase === 'running') {
        startTimer(el);

        el.addEventListener('click', function (e) {
          if (!sess || sess.phase !== 'running') return;

          var opt = e.target.closest('[data-opt]');
          if (opt) {
            sess.answers[sess.idx] = Number(opt.getAttribute('data-opt'));
            el.querySelector('#exam-q').innerHTML = renderQuestion();
            el.querySelector('#exam-sheet').innerHTML = sheetInner();
            var sc = el.querySelector('#sheet-count');
            if (sc) sc.textContent = answeredCount() + '/' + sess.list.length;
            return;
          }

          var jump = e.target.closest('[data-jump]');
          if (jump) {
            sess.idx = Number(jump.getAttribute('data-jump'));
            el.querySelector('#exam-q').innerHTML = renderQuestion();
            el.querySelector('#exam-sheet').innerHTML = sheetInner();
            return;
          }

          var act = e.target.getAttribute && e.target.getAttribute('data-act');
          if (act === 'next' && sess.idx < sess.list.length - 1) {
            sess.idx += 1;
            el.querySelector('#exam-q').innerHTML = renderQuestion();
            el.querySelector('#exam-sheet').innerHTML = sheetInner();
          } else if (act === 'prev' && sess.idx > 0) {
            sess.idx -= 1;
            el.querySelector('#exam-q').innerHTML = renderQuestion();
            el.querySelector('#exam-sheet').innerHTML = sheetInner();
          } else if (act === 'flag') {
            sess.flagged[sess.idx] = !sess.flagged[sess.idx];
            el.querySelector('#exam-q').innerHTML = renderQuestion();
            el.querySelector('#exam-sheet').innerHTML = sheetInner();
          }

          if (e.target.id === 'btn-submit' || (e.target.closest && e.target.closest('#btn-submit'))) {
            var done = answeredCount();
            var left = sess.list.length - done;
            var tip = sess.paper.paper === 'afternoon'
              ? '交卷后进入自评环节，需对照参考答案逐问打分。'
              : '交卷后立即判分并记录成绩。';
            RK.modal({
              title: '确认交卷？',
              html: '<p class="muted">已作答 ' + done + ' 题，未作答 <strong>' + left + '</strong> 题。' + tip + '</p>',
              okText: '确认交卷',
              onOk: function () { submitExam(el); return true; }
            });
          }
        });

        /* 案例题作答内容缓存 */
        el.addEventListener('input', function (e) {
          var ta = e.target.closest('textarea[data-qi]');
          if (!ta || !sess) return;
          var qi = Number(ta.getAttribute('data-qi'));
          sess.texts[sess.idx] = sess.texts[sess.idx] || {};
          sess.texts[sess.idx][qi] = ta.value;

          var sheet = el.querySelector('#exam-sheet');
          if (sheet) sheet.innerHTML = sheetInner();
          var cnt = el.querySelector('#sheet-count');
          if (cnt) cnt.textContent = answeredCount() + '/' + sess.list.length;
        });

        return function () { stopTimer(); };
      }

      if (sess.phase === 'selfscore') {
        el.addEventListener('click', function (e) {
          var btn = e.target.closest('[data-act="commit-case"]');
          if (btn) commitCase(el);
        });
      }
    }
  });

  function sheetInner() {
    var h = '';
    var isCase = sess.paper.paper === 'afternoon';
    sess.list.forEach(function (q, i) {
      var cls = 'answer-cell';
      var filled = isCase
        ? Object.keys(sess.texts[i] || {}).some(function (k) { return String(sess.texts[i][k] || '').trim(); })
        : sess.answers[i] !== undefined;
      if (filled) cls += ' done';
      if (sess.flagged[i]) cls += ' flagged';
      if (i === sess.idx) cls += ' current';
      h += '<div class="' + cls + '" data-jump="' + i + '">' + (i + 1) + '</div>';
    });
    return h;
  }
})(window.RK);
