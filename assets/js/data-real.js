/* ==========================================================================
 * data-real.js —— 历年真题题库：独立注册、独立作答记录
 * 与自编题库（RK.bank / RK.qIndex）完全隔离，不影响刷题练习、错题本与掌握度
 * ========================================================================== */
(function (RK) {
  'use strict';

  var R = {
    papers: [],
    paperMap: {},
    questions: [],
    qIndex: {},
    byModule: {},
    byPaper: {},
    explanations: {}
  };
  RK.real = R;

  /* 结构化解析：按题目 id 注册 { answer, idea, derivation, source }，
     与题目数据分离，便于集中维护；缺失时由旧 explanation 兜底。 */
  R.registerExplanations = function (map) {
    Object.keys(map || {}).forEach(function (id) { R.explanations[id] = map[id]; });
  };

  R.explanationFor = function (q) {
    if (!q) return null;
    var e = R.explanations[q.id];
    if (e && e.idea && e.derivation) {
      var answerText = e.answer ||
        ((q.options && q.options[q.answer] !== undefined) ? String(q.options[q.answer]) : '');
      return {
        answer: answerText,
        idea: e.idea,
        derivation: e.derivation,
        source: e.source || (e.selfComposed ? '自编解析' : '原卷解析整理'),
        selfComposed: !!e.selfComposed
      };
    }
    var legacy = String(q.explanation || '');
    var isUrl = /^https?:\/\//.test(legacy.trim());
    return {
      answer: (q.options && q.options[q.answer] !== undefined) ? String(q.options[q.answer]) : '',
      idea: isUrl ? '原卷/来源仅给出答案，未提供公开的解题思路。' : (legacy || '原卷未提供解析。'),
      derivation: isUrl ? '原解析为外部链接，请按题面与对应知识点自行推导。' : '原卷未提供可核对的推导过程。',
      source: '自编解析',
      selfComposed: true
    };
  };

  R.registerPaper = function (meta) {
    if (!meta || !meta.key || R.paperMap[meta.key]) return;
    var p = {};
    Object.keys(meta).forEach(function (k) { p[k] = meta[k]; });
    p.count = 0;
    p.paperType = p.paperType || 'morning';
    p.verified = p.verified || 'single-source';
    p.pending = !!p.pending;
    R.papers.push(p);
    R.paperMap[p.key] = p;
  };

  /**
   * 注册真题。字段：
   * id / paper / no / module / topic / stem / options / answer / explanation / group / blank
   * 可选：year / paperType / kind / source / sourceUrl / answerSource / answerSourceUrl
   *       explanationSource / explanationUrl / verified
   * group > 1 表示同一题干的多空题，blank 为第几空（1 起）。
   * 未显式给出的来源/年份/卷型/核对状态从套卷 meta 继承，保持旧数据字段兼容。
   */
  /* 题干展示优化：把填空占位里的题号数字去掉，只保留横线。
     全角 （数字） 是中文卷的填空占位；半角 ______(数字) 是专业英语填空。
     半角 O(1) / range(11) 等正常记号不动。原题号仍在 q-head 的「原题 N」展示。 */
  function cleanStem(s) {
    return String(s || '')
      .replace(/（\s*\d+\s*）/g, '____')
      .replace(/_{2,}\(\s*\d+\s*\)/g, function (m) { return m.replace(/\(\s*\d+\s*\)/, ''); });
  }

  R.register = function (list) {
    (list || []).forEach(function (q) {
      if (!q || !q.id || R.qIndex[q.id]) return;
      q.stem = cleanStem(q.stem);
      var p = R.paperMap[q.paper] || {};
      q.kind = q.kind || 'choice';
      q.answer = Number(q.answer);
      q.year = q.year || p.year || 0;
      q.paperType = q.paperType || p.paperType || 'morning';
      q.source = q.source || p.sourceLabel || '';
      q.sourceUrl = q.sourceUrl || p.source || '';
      q.answerSource = q.answerSource || p.answerSource || '';
      q.answerSourceUrl = q.answerSourceUrl || p.answerSourceUrl || '';
      q.explanationSource = q.explanationSource || p.explanationSource || '';
      q.explanationUrl = q.explanationUrl || p.explanationUrl || '';
      q.verified = q.verified || p.verified || 'single-source';
      R.questions.push(q);
      R.qIndex[q.id] = q;
      if (!R.byModule[q.module]) R.byModule[q.module] = [];
      R.byModule[q.module].push(q);
      if (!R.byPaper[q.paper]) R.byPaper[q.paper] = [];
      R.byPaper[q.paper].push(q);
      if (R.paperMap[q.paper]) R.paperMap[q.paper].count += 1;
    });
  };

  R.years = function () {
    var seen = {};
    R.papers.forEach(function (p) { if (p.year) seen[p.year] = true; });
    return Object.keys(seen).map(Number).sort(function (a, b) { return b - a; });
  };

  R.paperTypeLabel = function (type) {
    return type === 'afternoon' ? '下午卷' : '上午卷';
  };

  R.verifiedLabel = function (v) {
    if (v === 'crosschecked') return '已核对';
    if (v === 'recalled') return '回忆版';
    if (v === 'pending') return '待补';
    return '单源';
  };

  /**
   * 多维筛选：years / paperTypes / modules 为空数组表示不限；不传表示不限。
   * 返回题目数组，不改变题目顺序。
   */
  R.filterQuestions = function (opts) {
    opts = opts || {};
    var years = opts.years || [];
    var types = opts.paperTypes || [];
    var modules = opts.modules || [];
    return R.questions.filter(function (q) {
      if (years.length && years.indexOf(q.year) < 0) return false;
      if (types.length && types.indexOf(q.paperType) < 0) return false;
      if (modules.length && modules.indexOf(q.module) < 0) return false;
      return true;
    });
  };

  R.get = function (id) { return R.qIndex[id] || null; };
  R.moduleCount = function (key) { return (R.byModule[key] || []).length; };
  R.paperCount = function (key) { return (R.byPaper[key] || []).length; };

  R.modulePaperCount = function (moduleKey, paperKey) {
    return (R.byPaper[paperKey] || []).filter(function (q) {
      return q.module === moduleKey;
    }).length;
  };

  R.paperModuleCount = function (paperKey) {
    var seen = {};
    (R.byPaper[paperKey] || []).forEach(function (q) { seen[q.module] = true; });
    return Object.keys(seen).length;
  };

  R.coveredModules = function () {
    return RK.MODULES.filter(function (m) { return R.moduleCount(m.key) > 0; });
  };

  /* ------------------------------------------------------------------
   * 真题作答与错题：键前缀 rk_sd_ 仍由 RK.store 统一加，但用独立键名
   * ------------------------------------------------------------------ */
  var KEYS = { answers: 'real_answers', wrong: 'real_wrong' };
  R.KEYS = KEYS;

  /* 真题错题复习三态：待复习 / 复习中 / 已掌握。
     stage 为新增字段；旧记录只有 resolved 布尔，读取时按 resolved 推导，写操作时同步两者兼容旧视图。 */
  var STAGES = ['todo', 'doing', 'done'];
  var STAGE_LABELS = { todo: '待复习', doing: '复习中', done: '已掌握' };
  R.STAGES = STAGES;
  R.STAGE_LABELS = STAGE_LABELS;

  function stageOf(w) {
    if (!w) return 'todo';
    if (STAGES.indexOf(w.stage) >= 0) return w.stage;
    return w.resolved ? 'done' : 'todo';
  }
  R.stageOf = stageOf;

  RK.realRecord = {
    /* choice 为本次展示选项下标，order 为乱序映射；choiceText 直接存展示文本 */
    answer: function (q, isRight, choice, order) {
      if (!q || !q.id) return;
      var all = RK.store.get(KEYS.answers, {});
      var item = all[q.id] || { right: 0, wrong: 0 };
      if (isRight) item.right += 1; else item.wrong += 1;
      item.last = !!isRight;
      item.ts = Date.now();
      all[q.id] = item;
      RK.store.set(KEYS.answers, all);

      var wrong = RK.store.get(KEYS.wrong, {});
      if (!isRight) {
        var w = wrong[q.id] || { count: 0 };
        w.count += 1;
        w.choice = (choice === undefined ? null : choice);
        w.order = (order && order.length ? order.slice() : null);
        w.choiceText = (q.options && q.options[choice] !== undefined) ? q.options[choice] : null;
        w.ts = Date.now();
        w.stage = 'todo';            /* 再次答错回到待复习，但保留已写的错因与结论 */
        w.resolved = false;
        wrong[q.id] = w;
        RK.store.set(KEYS.wrong, wrong);
      } else if (wrong[q.id]) {
        var w2 = wrong[q.id];
        w2.stage = 'done';
        w2.resolved = true;
        w2.reviewTs = Date.now();
        RK.store.set(KEYS.wrong, wrong);
      }
    },
    /* 错因、结论与复习状态落库；真题错题专用，字段随 real_wrong 一起存，随 v2 备份的 realWrong 类别单独导出 */
    setNote: function (id, patch) {
      var wrong = RK.store.get(KEYS.wrong, {});
      var w = wrong[id];
      if (!w) return false;
      if (patch && typeof patch.cause === 'string') w.cause = patch.cause;
      if (patch && typeof patch.conclusion === 'string') w.conclusion = patch.conclusion;
      if (patch && STAGES.indexOf(patch.stage) >= 0) {
        w.stage = patch.stage;
        w.resolved = (patch.stage === 'done');
        w.reviewTs = Date.now();
      }
      RK.store.set(KEYS.wrong, wrong);
      return true;
    },
    /* 错因统计：按复习状态、错因、模块计数；「未归因」显式计入，便于发现待整理条目 */
    stats: function () {
      var wrong = RK.store.get(KEYS.wrong, {});
      var stages = { todo: 0, doing: 0, done: 0 };
      var causes = {};
      var modules = {};
      Object.keys(wrong).forEach(function (id) {
        var w = wrong[id];
        stages[stageOf(w)] += 1;
        var c = w.cause || '未归因';
        causes[c] = (causes[c] || 0) + 1;
        var q = R.qIndex[id];
        var m = q ? q.module : 'unknown';
        modules[m] = (modules[m] || 0) + 1;
      });
      return {
        total: Object.keys(wrong).length,
        stages: stages,
        causes: causes,
        modules: modules
      };
    },
    answersAll: function () { return RK.store.get(KEYS.answers, {}); },
    wrongAll: function () { return RK.store.get(KEYS.wrong, {}); },
    unresolvedIds: function () {
      var wrong = RK.realRecord.wrongAll();
      return Object.keys(wrong).filter(function (id) { return stageOf(wrong[id]) !== 'done'; });
    },
    removeWrong: function (id) {
      var wrong = RK.store.get(KEYS.wrong, {});
      delete wrong[id];
      RK.store.set(KEYS.wrong, wrong);
    },
    clearAll: function () {
      RK.store.del(KEYS.answers);
      RK.store.del(KEYS.wrong);
    }
  };
})(window.RK);
