/* ==========================================================================
 * core.js —— 基础设施：模块定义、存储、题库注册、路由、通用工具
 * 全部挂在 window.RK 下，使用经典 script 加载，保证 file:// 双击可用
 * ========================================================================== */
window.RK = window.RK || {};

(function (RK) {
  'use strict';

  /* ------------------------------------------------------------------
   * 1. 考试常量
   * ------------------------------------------------------------------ */
  RK.EXAM = {
    name: '2027 年上半年 · 软件设计师（中级）',
    date: '2027-05-22',
    dateNote: '按往年 5 月下旬推算，实际以准考证为准',
    signup: '预计 2027-03 上旬开启报名，需关注中国计算机技术职业资格网',
    passScore: 45,
    morning: {
      name: '基础知识（综合知识）',
      count: 75,
      score: 75,
      minutes: 120,
      desc: '75 道单项选择题，每题 1 分，45 分合格'
    },
    afternoon: {
      name: '应用技术（案例分析）',
      count: 5,
      score: 75,
      minutes: 120,
      desc: '6 道大题中完成 5 道（4 必答 + Java/C++ 二选一），45 分合格'
    }
  };

  /* ------------------------------------------------------------------
   * 2. 知识模块定义（weight = 上午卷典型题量，合计 75）
   * ------------------------------------------------------------------ */
  RK.MODULES = [
    { key: 'computer-system', name: '计算机组成与体系结构', short: '组成原理', weight: 7, color: '#4c66f0', doc: 'docs/02-知识点精要/01-计算机组成与体系结构.html' },
    { key: 'os', name: '操作系统', short: '操作系统', weight: 6, color: '#8b5cf6', doc: 'docs/02-知识点精要/02-操作系统.html' },
    { key: 'ds-algorithm', name: '数据结构与算法', short: '数据结构', weight: 8, color: '#0ea5a4', doc: 'docs/02-知识点精要/03-数据结构与算法.html' },
    { key: 'programming-language', name: '程序设计语言与编译', short: '程序语言', weight: 5, color: '#f59e0b', doc: 'docs/02-知识点精要/04-程序设计语言与编译原理.html' },
    { key: 'software-engineering', name: '软件工程', short: '软件工程', weight: 12, color: '#e0554b', doc: 'docs/02-知识点精要/05-软件工程.html' },
    { key: 'oo-uml', name: '面向对象与 UML', short: '面向对象', weight: 9, color: '#d946ef', doc: 'docs/02-知识点精要/06-面向对象与UML.html' },
    { key: 'database', name: '数据库系统', short: '数据库', weight: 7, color: '#0d9488', doc: 'docs/02-知识点精要/07-数据库系统.html' },
    { key: 'network', name: '计算机网络', short: '网络', weight: 6, color: '#2563eb', doc: 'docs/02-知识点精要/08-计算机网络.html' },
    { key: 'security', name: '信息安全', short: '信息安全', weight: 3, color: '#b45309', doc: 'docs/02-知识点精要/09-信息安全与知识产权.html' },
    { key: 'standard-law', name: '标准化与知识产权', short: '标准法规', weight: 3, color: '#64748b', doc: 'docs/02-知识点精要/09-信息安全与知识产权.html' },
    { key: 'multimedia', name: '多媒体基础', short: '多媒体', weight: 2, color: '#db2777', doc: 'docs/02-知识点精要/10-多媒体与专业英语.html' },
    { key: 'english', name: '专业英语', short: '专业英语', weight: 5, color: '#475569', doc: 'docs/02-知识点精要/10-多媒体与专业英语.html' },
    { key: 'tech', name: '新技术应用', short: '新技术', weight: 2, color: '#0891b2', doc: 'docs/02-知识点精要/11-新技术应用.html' }
  ];

  RK.MODULE_MAP = {};
  RK.MODULES.forEach(function (m) { RK.MODULE_MAP[m.key] = m; });

  /* 错因固定分类：错题本下拉、CSV 与文档模板共用同一套口径 */
  RK.CAUSES = ['概念混淆', '公式记错', '计算失误', '审题偏差', '知识盲区', '术语不熟', '时间不够', '蒙对未掌握'];

  RK.moduleName = function (key) {
    return RK.MODULE_MAP[key] ? RK.MODULE_MAP[key].name : key;
  };
  RK.moduleColor = function (key) {
    return RK.MODULE_MAP[key] ? RK.MODULE_MAP[key].color : '#8b95ab';
  };

  /* ------------------------------------------------------------------
   * 3. 本地存储（localStorage 降级到内存）
   * ------------------------------------------------------------------ */
  var PREFIX = 'rk_sd_';
  var memoryStore = {};

  function hasLS() {
    try {
      var k = PREFIX + '__t';
      window.localStorage.setItem(k, '1');
      window.localStorage.removeItem(k);
      return true;
    } catch (e) { return false; }
  }
  var LS_OK = hasLS();

  RK.store = {
    get: function (key, fallback) {
      try {
        var raw = LS_OK ? window.localStorage.getItem(PREFIX + key) : memoryStore[key];
        if (raw === null || raw === undefined) return fallback;
        return JSON.parse(raw);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try {
        var raw = JSON.stringify(value);
        if (LS_OK) window.localStorage.setItem(PREFIX + key, raw);
        else memoryStore[key] = raw;
      } catch (e) { /* 配额或隐私模式，静默降级 */ }
    },
    del: function (key) {
      try {
        if (LS_OK) window.localStorage.removeItem(PREFIX + key);
        else delete memoryStore[key];
      } catch (e) { /* ignore */ }
    }
  };

  /* ------------------------------------------------------------------
   * 4. 题库注册
   * ------------------------------------------------------------------ */
  RK.bank = { morning: [], afternoon: [] };
  RK.byModule = {};
  RK.qIndex = {};

  RK.registerQuestions = function (list) {
    (list || []).forEach(function (q) {
      if (!q || !q.id) return;
      if (RK.qIndex[q.id]) {
        console.warn('[题库] 题目 id 重复，已跳过：' + q.id);
        return;
      }
      q.kind = 'choice';
      RK.bank.morning.push(q);
      RK.qIndex[q.id] = q;
      if (!RK.byModule[q.module]) RK.byModule[q.module] = [];
      RK.byModule[q.module].push(q);
    });
  };

  RK.registerAfternoon = function (list) {
    (list || []).forEach(function (q) {
      if (!q || !q.id) return;
      if (RK.qIndex[q.id]) {
        console.warn('[题库] 题目 id 重复，已跳过：' + q.id);
        return;
      }
      q.kind = 'case';
      RK.bank.afternoon.push(q);
      RK.qIndex[q.id] = q;
    });
  };

  RK.getQuestion = function (id) { return RK.qIndex[id] || null; };

  /**
   * 生成一次作答用的乱序副本：
   * - options 按随机顺序重排，answer 同步映射到新下标，判题逻辑无需改动
   * - order[d] = 第 d 个展示项在原题 options 中的下标，写入错题本后可按同一顺序还原
   * - 原题对象不改动，题库顺序保持稳定
   */
  RK.variant = function (q) {
    if (!q || q.kind !== 'choice' || !q.options || q.options.length < 2) return q;
    var order = U.shuffle(q.options.map(function (_, i) { return i; }));
    var v = {};
    Object.keys(q).forEach(function (k) { v[k] = q[k]; });
    v.options = order.map(function (i) { return q.options[i]; });
    v.answer = order.indexOf(q.answer);
    v.order = order;
    return v;
  };

  /* ------------------------------------------------------------------
   * 5. 做题与考试记录
   * ------------------------------------------------------------------ */
  var KEYS = {
    answers: 'answers',
    wrong: 'wrong',
    exams: 'exams',
    tasks: 'tasks',
    theme: 'theme'
  };
  RK.KEYS = KEYS;

  /* 按本次展示顺序取出所选选项文本；缺少 order 时按题库原顺序兜底 */
  RK.pickText = function (qid, choice, order) {
    var q = RK.qIndex[qid];
    if (!q || !q.options || choice === undefined || choice === null || choice < 0) return null;
    var idx = (order && order.length && order[choice] !== undefined) ? order[choice] : choice;
    var text = q.options[idx];
    return text === undefined ? null : text;
  };

  RK.record = {
    /* 单题作答累计：{ right, wrong, last, ts }；order 为本次展示的选项顺序 */
    answer: function (qid, isRight, choice, order) {
      var all = RK.store.get(KEYS.answers, {});
      var item = all[qid] || { right: 0, wrong: 0 };
      if (isRight) item.right += 1; else item.wrong += 1;
      item.last = !!isRight;
      item.ts = Date.now();
      all[qid] = item;
      RK.store.set(KEYS.answers, all);

      var wrong = RK.store.get(KEYS.wrong, {});
      if (!isRight) {
        var w = wrong[qid] || { count: 0 };
        w.count += 1;
        w.choice = (choice === undefined ? null : choice);
        /* 记录本次选项顺序，错题本按同一顺序回放，避免重排后“你选”标错位置 */
        w.order = (order && order.length ? order.slice() : null);
        /* 另存所选选项文本：选项重排后旧 order 会失效，文本可让“我的答案”继续正确展示 */
        w.choiceText = RK.pickText(qid, choice, order);
        w.ts = Date.now();
        w.resolved = false;
        wrong[qid] = w;
        RK.store.set(KEYS.wrong, wrong);
      } else if (wrong[qid]) {
        wrong[qid].resolved = true;
        RK.store.set(KEYS.wrong, wrong);
      }
    },
    answersAll: function () { return RK.store.get(KEYS.answers, {}); },
    wrongAll: function () { return RK.store.get(KEYS.wrong, {}); },
    removeWrong: function (qid) {
      var wrong = RK.store.get(KEYS.wrong, {});
      delete wrong[qid];
      RK.store.set(KEYS.wrong, wrong);
    },
    /* 错因与一句话结论：随错题记录一起存 localStorage，重复答错不会清空 */
    setNote: function (qid, patch) {
      var wrong = RK.store.get(KEYS.wrong, {});
      var w = wrong[qid];
      if (!w) return false;
      if (patch && typeof patch.cause === 'string') w.cause = patch.cause;
      if (patch && typeof patch.conclusion === 'string') w.conclusion = patch.conclusion;
      RK.store.set(KEYS.wrong, wrong);
      return true;
    },
    examsAll: function () { return RK.store.get(KEYS.exams, []); },
    addExam: function (row) {
      var list = RK.store.get(KEYS.exams, []);
      list.push(row);
      RK.store.set(KEYS.exams, list);
    },
    clearAll: function () {
      Object.keys(KEYS).forEach(function (k) {
        if (k !== 'theme') RK.store.del(KEYS[k]);
      });
    }
  };

  /* 模块掌握度：基于累计作答正确率 */
  RK.mastery = function () {
    var answers = RK.record.answersAll();
    var out = {};
    RK.MODULES.forEach(function (m) {
      out[m.key] = { total: 0, right: 0, rate: null };
    });
    Object.keys(answers).forEach(function (qid) {
      var q = RK.qIndex[qid];
      if (!q || !out[q.module]) return;
      out[q.module].total += answers[qid].right + answers[qid].wrong;
      out[q.module].right += answers[qid].right;
    });
    Object.keys(out).forEach(function (k) {
      out[k].rate = out[k].total ? out[k].right / out[k].total : null;
    });
    return out;
  };

  /* 计划任务打卡 */
  RK.tasks = {
    all: function () { return RK.store.get(KEYS.tasks, {}); },
    isDone: function (id) { return !!RK.tasks.all()[id]; },
    toggle: function (id) {
      var all = RK.tasks.all();
      if (all[id]) delete all[id]; else all[id] = true;
      RK.store.set(KEYS.tasks, all);
      return !!all[id];
    }
  };

  /**
   * 每周「已完成计划时长」统计。
   * 口径：打卡记录只有 {任务id: true}、没有时间戳，因此按任务所属计划周汇总，
   * 只累加已打卡任务的 hours；这是计划投入完成量，不是实测学习用时。
   * 返回 [{ no, label, hours, checked, total, title }]，按周序升序。
   */
  RK.weeklyHours = function () {
    var plan = window.RK_PLAN;
    if (!plan || !plan.stages) return [];
    var done = RK.tasks.all();
    var out = [];
    plan.stages.forEach(function (stage) {
      (stage.weeks || []).forEach(function (week) {
        var hours = 0, checked = 0;
        (week.tasks || []).forEach(function (t) {
          if (done[t.id]) { checked += 1; hours += Number(t.hours) || 0; }
        });
        out.push({
          no: week.no,
          label: 'W' + week.no,
          hours: hours,
          checked: checked,
          total: (week.tasks || []).length,
          title: week.title || ''
        });
      });
    });
    return out.sort(function (a, b) { return a.no - b.no; });
  };

  /* ------------------------------------------------------------------
   * 6. 通用工具
   * ------------------------------------------------------------------ */
  var U = {};

  U.esc = function (s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  U.pad = function (n) { return n < 10 ? '0' + n : '' + n; };

  U.shuffle = function (arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };

  U.sample = function (arr, n) {
    return U.shuffle(arr).slice(0, n);
  };

  U.letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  U.today = function () {
    var d = new Date();
    return d.getFullYear() + '-' + U.pad(d.getMonth() + 1) + '-' + U.pad(d.getDate());
  };

  U.parseDate = function (str) {
    var p = String(str).split('-');
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]), 0, 0, 0);
  };

  U.daysBetween = function (a, b) {
    var d1 = typeof a === 'string' ? U.parseDate(a) : a;
    var d2 = typeof b === 'string' ? U.parseDate(b) : b;
    return Math.round((d2 - d1) / 86400000);
  };

  U.fmtDate = function (ts) {
    var d = new Date(ts);
    return d.getFullYear() + '-' + U.pad(d.getMonth() + 1) + '-' + U.pad(d.getDate());
  };

  U.fmtDateTime = function (ts) {
    var d = new Date(ts);
    return U.fmtDate(ts) + ' ' + U.pad(d.getHours()) + ':' + U.pad(d.getMinutes());
  };

  U.fmtDuration = function (sec) {
    sec = Math.max(0, Math.round(sec));
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 60;
    if (h > 0) return h + ' 小时 ' + m + ' 分';
    return m + ' 分 ' + U.pad(s) + ' 秒';
  };

  U.fmtClock = function (sec) {
    sec = Math.max(0, Math.round(sec));
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 60;
    return (h > 0 ? U.pad(h) + ':' : '') + U.pad(m) + ':' + U.pad(s);
  };

  U.pct = function (v) {
    if (v === null || v === undefined || isNaN(v)) return '—';
    return Math.round(v * 100) + '%';
  };

  U.rateClass = function (rate) {
    if (rate === null || rate === undefined) return '';
    if (rate >= 0.75) return 'ok';
    if (rate >= 0.55) return 'warn';
    return 'bad';
  };

  U.deep = function (o) { return JSON.parse(JSON.stringify(o)); };

  RK.U = U;

  /* ------------------------------------------------------------------
   * 7. 组卷
   * ------------------------------------------------------------------ */
  /**
   * rules: [{ module: 'software-engineering', count: 13 }, ...]
   * 返回按规则抽出的题目数组；某模块题量不足时取全部。
   */
  RK.buildPaper = function (rules) {
    var picked = [];
    var used = {};
    (rules || []).forEach(function (rule) {
      var pool = (RK.byModule[rule.module] || []).filter(function (q) { return !used[q.id]; });
      var take = U.sample(pool, Math.min(rule.count, pool.length));
      take.forEach(function (q) { used[q.id] = true; picked.push(q); });
    });
    return U.shuffle(picked);
  };

  /* 默认上午卷组卷规则（合计 75 题） */
  RK.defaultMorningRules = function () {
    return RK.MODULES.map(function (m) { return { module: m.key, count: m.weight }; });
  };

  /* ------------------------------------------------------------------
   * 8. 提示与弹层
   * ------------------------------------------------------------------ */
  var toastTimer = null;
  RK.toast = function (msg) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2200);
  };

  RK.modal = function (opts) {
    var mask = document.createElement('div');
    mask.className = 'modal-mask';
    mask.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true">' +
      '<h3>' + U.esc(opts.title || '') + '</h3>' +
      '<div class="modal-body">' + (opts.html || '') + '</div>' +
      '<div class="row mt-24" style="justify-content:flex-end">' +
      (opts.cancelText === null ? '' : '<button class="btn btn-ghost" data-act="cancel" type="button">' + U.esc(opts.cancelText || '取消') + '</button>') +
      (opts.okText ? '<button class="btn" data-act="ok" type="button">' + U.esc(opts.okText) + '</button>' : '') +
      '</div></div>';
    document.body.appendChild(mask);

    function close() {
      if (mask.parentNode) mask.parentNode.removeChild(mask);
    }
    mask.addEventListener('click', function (e) {
      var act = e.target.getAttribute && e.target.getAttribute('data-act');
      if (act === 'cancel') { close(); if (opts.onCancel) opts.onCancel(); }
      if (act === 'ok') {
        var keep = opts.onOk ? opts.onOk(mask) : false;
        if (keep !== false) close();
      }
      if (e.target === mask) { close(); if (opts.onCancel) opts.onCancel(); }
    });
    if (opts.onMount) opts.onMount(mask);
    return { el: mask, close: close };
  };

  /* ------------------------------------------------------------------
   * 9. 折线图（原生 canvas，无依赖）
   * ------------------------------------------------------------------ */
  RK.drawLine = function (canvas, series, opts) {
    if (!canvas) return;
    opts = opts || {};
    var dpr = window.devicePixelRatio || 1;
    var cssW = canvas.clientWidth || 640;
    var cssH = opts.height || 200;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.height = cssH + 'px';
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    var padL = 34, padR = 14, padT = 14, padB = 24;
    var w = cssW - padL - padR;
    var h = cssH - padT - padB;
    var maxY = opts.max || 75;
    var minY = 0;

    var styles = getComputedStyle(document.body);
    var cBorder = styles.getPropertyValue('--border').trim() || '#e3e8f2';
    var cText = styles.getPropertyValue('--text-3').trim() || '#8b95ab';

    ctx.strokeStyle = cBorder;
    ctx.lineWidth = 1;
    ctx.font = '10px -apple-system, "Segoe UI", sans-serif';
    ctx.fillStyle = cText;

    for (var i = 0; i <= 4; i++) {
      var y = padT + (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + w, y);
      ctx.stroke();
      var v = Math.round(maxY - (maxY - minY) / 4 * i);
      ctx.fillText(String(v), 6, y + 3);
    }

    if (opts.passLine !== undefined) {
      var py = padT + h - (opts.passLine - minY) / (maxY - minY) * h;
      ctx.save();
      ctx.strokeStyle = '#d94f45';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padL, py);
      ctx.lineTo(padL + w, py);
      ctx.stroke();
      ctx.restore();
    }

    series = series || [];
    if (!series.length) return;

    var stepX = series.length > 1 ? w / (series.length - 1) : 0;
    var pts = series.map(function (v, idx) {
      return {
        x: padL + stepX * idx,
        y: padT + h - (Math.max(minY, Math.min(maxY, v)) - minY) / (maxY - minY) * h,
        v: v
      };
    });

    ctx.beginPath();
    pts.forEach(function (p, idx) {
      if (idx === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = '#4c66f0';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.lineTo(pts[pts.length - 1].x, padT + h);
    ctx.lineTo(pts[0].x, padT + h);
    ctx.closePath();
    ctx.fillStyle = 'rgba(76,102,240,.10)';
    ctx.fill();

    ctx.fillStyle = '#4c66f0';
    pts.forEach(function (p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  /* 通用：按容器宽度和 DPR 准备画布；返回 ctx / cssW / cssH */
  function chartCanvas(canvas, height) {
    var dpr = window.devicePixelRatio || 1;
    var cssW = canvas.clientWidth || 640;
    var cssH = height || 200;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.height = cssH + 'px';
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);
    return { ctx: ctx, w: cssW, h: cssH };
  }

  function chartColors() {
    var styles = getComputedStyle(document.body);
    return {
      border: styles.getPropertyValue('--border').trim() || '#e3e8f2',
      text: styles.getPropertyValue('--text-3').trim() || '#8b95ab',
      primary: styles.getPropertyValue('--primary').trim() || '#4c66f0'
    };
  }

  /**
   * 模块雷达图：items = [{ label, value(0~1), color }]，每圈网格 25%。
   * value 为 null / 0 表示该模块未练，落在圆心。
   */
  RK.drawRadar = function (canvas, items, opts) {
    if (!canvas) return;
    opts = opts || {};
    items = items || [];
    var n = items.length;
    if (n < 3) return;

    var cssW = canvas.clientWidth || 420;
    var height = opts.height || Math.max(280, Math.min(cssW, 380));
    var c = chartCanvas(canvas, height);
    var ctx = c.ctx;
    var col = chartColors();
    var cx = c.w / 2;
    var cy = c.h / 2 + 4;
    var r = Math.max(40, Math.min(c.w / 2, c.h / 2) - 46);
    var angle = function (i) { return -Math.PI / 2 + i * 2 * Math.PI / n; };
    var point = function (i, ratio) {
      var a = angle(i);
      return { x: cx + Math.cos(a) * r * ratio, y: cy + Math.sin(a) * r * ratio };
    };
    var ratioOf = function (it) { return Math.max(0, Math.min(1, Number(it.value) || 0)); };

    ctx.lineWidth = 1;
    ctx.strokeStyle = col.border;
    for (var ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      for (var i = 0; i < n; i++) {
        var p = point(i, ring / 4);
        if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.stroke();
    }
    for (var a = 0; a < n; a++) {
      var end = point(a, 1);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }

    ctx.font = '10px -apple-system, "Segoe UI", "PingFang SC", sans-serif';
    items.forEach(function (it, idx) {
      var ang = angle(idx);
      var lp = { x: cx + Math.cos(ang) * (r + 14), y: cy + Math.sin(ang) * (r + 14) };
      var cos = Math.cos(ang), sin = Math.sin(ang);
      ctx.textAlign = cos > 0.25 ? 'left' : cos < -0.25 ? 'right' : 'center';
      ctx.textBaseline = sin > 0.5 ? 'top' : sin < -0.5 ? 'bottom' : 'middle';
      ctx.fillStyle = it.color || col.text;
      ctx.fillText(it.label, lp.x, lp.y);
    });

    ctx.beginPath();
    items.forEach(function (it, idx) {
      var p = point(idx, ratioOf(it));
      if (idx === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(76,102,240,.16)';
    ctx.strokeStyle = col.primary;
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    items.forEach(function (it, idx) {
      var p = point(idx, ratioOf(it));
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = it.color || col.primary;
      ctx.fill();
    });
  };

  /**
   * 周学习时长柱状图：items = [{ label, value, color? }]。
   * 柱宽按周数自适应（29 周也能一屏看完），标签按间隔抽稀避免重叠。
   */
  RK.drawBars = function (canvas, items, opts) {
    if (!canvas) return;
    opts = opts || {};
    items = items || [];
    var c = chartCanvas(canvas, opts.height || 200);
    var ctx = c.ctx;
    var col = chartColors();
    var padL = 30, padR = 10, padT = 12, padB = 24;
    var w = c.w - padL - padR;
    var h = c.h - padT - padB;
    var maxV = 0;
    items.forEach(function (it) { maxV = Math.max(maxV, Number(it.value) || 0); });
    var maxY = opts.max || Math.max(4, Math.ceil((maxV + 2) / 4) * 4);

    ctx.strokeStyle = col.border;
    ctx.lineWidth = 1;
    ctx.fillStyle = col.text;
    ctx.font = '10px -apple-system, "Segoe UI", sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (var g = 0; g <= 4; g++) {
      var y = padT + h / 4 * g;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + w, y);
      ctx.stroke();
      ctx.fillText(String(Math.round(maxY - maxY / 4 * g)), padL - 6, y);
    }

    if (!items.length) return;
    var slot = w / items.length;
    var bw = Math.max(3, Math.min(opts.barWidth || 26, slot - 3));
    var labelStep = Math.max(1, Math.ceil(items.length / 8));
    items.forEach(function (it, idx) {
      var v = Math.max(0, Number(it.value) || 0);
      var bh = Math.min(1, v / maxY) * h;
      var x = padL + slot * idx + (slot - bw) / 2;
      var y = padT + h - bh;
      ctx.fillStyle = it.color || col.primary;
      ctx.fillRect(x, y, bw, bh);
      if (v > 0 && bw >= 8) {
        ctx.fillStyle = col.text;
        ctx.font = '9px -apple-system, "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(String(v), x + bw / 2, y - 1);
      }
      if (idx % labelStep === 0 || idx === items.length - 1) {
        ctx.fillStyle = col.text;
        ctx.font = '10px -apple-system, "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(it.label, padL + slot * idx + slot / 2, padT + h + 5);
      }
    });
  };

  /* ------------------------------------------------------------------
   * 10. 路由
   * ------------------------------------------------------------------ */
  RK.router = {
    routes: {},
    _unmount: null,
    add: function (name, view) { this.routes[name] = view; },
    parse: function () {
      var hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) return { name: 'dashboard', params: {} };
      var qi = hash.indexOf('?');
      var name = qi >= 0 ? hash.slice(0, qi) : hash;
      var params = {};
      if (qi >= 0) {
        hash.slice(qi + 1).split('&').forEach(function (pair) {
          if (!pair) return;
          var kv = pair.split('=');
          params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
        });
      }
      return { name: name || 'dashboard', params: params };
    },
    go: function (path) {
      if (window.location.hash === '#' + path) this.render();
      else window.location.hash = path;
    },
    render: function () {
      var r = this.parse();
      var view = this.routes[r.name];
      if (!view) {
        console.warn('[路由] 未注册：' + r.name + '，已回退到总览');
        view = this.routes.dashboard;
      }
      if (this._unmount) {
        try { this._unmount(); } catch (e) { console.warn(e); }
        this._unmount = null;
      }
      var titleEl = document.getElementById('page-title');
      var subEl = document.getElementById('page-sub');
      var oldView = document.getElementById('view');
      if (!view || !oldView) return;

      /* 用全新元素替换旧视图容器，避免多次渲染时 mount 里的事件监听叠加 */
      var viewEl = oldView.cloneNode(false);
      oldView.parentNode.replaceChild(viewEl, oldView);

      titleEl.textContent = typeof view.title === 'function' ? view.title(r.params) : (view.title || '');
      subEl.textContent = typeof view.sub === 'function' ? view.sub(r.params) : (view.sub || '');
      viewEl.innerHTML = view.render(r.params);

      var route = r.name;
      Array.prototype.forEach.call(document.querySelectorAll('.nav-item'), function (a) {
        a.classList.toggle('active', a.getAttribute('data-route') === route);
      });

      if (view.mount) {
        try {
          var cleanup = view.mount(viewEl, r.params);
          if (typeof cleanup === 'function') this._unmount = cleanup;
        } catch (e) {
          console.error('[视图挂载失败]', route, e);
        }
      }
      window.scrollTo(0, 0);
    }
  };

  /* ------------------------------------------------------------------
   * 11. 主题
   * ------------------------------------------------------------------ */
  RK.theme = {
    apply: function (t) {
      document.body.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
      RK.store.set(KEYS.theme, t);
    },
    init: function () {
      var saved = RK.store.get(KEYS.theme, null);
      if (!saved) {
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        saved = prefersDark ? 'dark' : 'light';
      }
      this.apply(saved);
    },
    toggle: function () {
      var cur = document.body.getAttribute('data-theme');
      this.apply(cur === 'dark' ? 'light' : 'dark');
    }
  };

  /* ------------------------------------------------------------------
   * 12. 渲染片段
   * ------------------------------------------------------------------ */
  RK.ui = {
    bar: function (rate, cls) {
      var w = rate === null || rate === undefined ? 0 : Math.round(rate * 100);
      return '<div class="bar ' + (cls || U.rateClass(rate)) + '"><i style="width:' + w + '%"></i></div>';
    },
    badge: function (text, kind) {
      return '<span class="badge ' + (kind || '') + '">' + U.esc(text) + '</span>';
    },
    empty: function (text) {
      return '<div class="empty">' + U.esc(text) + '</div>';
    }
  };
})(window.RK);
