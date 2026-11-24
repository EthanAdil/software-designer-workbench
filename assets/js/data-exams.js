/* ==========================================================================
 * data-exams.js —— 阶段测评卷（3 套）、模拟考试卷（8 套）、下午案例卷（4 套）
 * rules: 按模块抽题；count 为期望题量，题库不足时自动取全部
 * ========================================================================== */
window.RK_EXAMS = {
  /* ---------------- 阶段测评 ---------------- */
  stages: [
    {
      id: 'stage-1',
      kind: 'stage',
      paper: 'morning',
      name: '阶段一测评 · 基础奠基',
      desc: '覆盖计算机组成、操作系统、数据结构与算法、程序语言四个模块，检验"能算的题"是否全部拿下。限时压缩约 30%，用于训练答题节奏。',
      duration: 45,
      passScore: 45,
      targetScore: 58,
      rules: [
        { module: 'computer-system', count: 9 },
        { module: 'os', count: 8 },
        { module: 'ds-algorithm', count: 14 },
        { module: 'programming-language', count: 9 }
      ]
    },
    {
      id: 'stage-2',
      kind: 'stage',
      paper: 'morning',
      name: '阶段二测评 · 核心攻坚',
      desc: '覆盖软件工程、面向对象与 UML、数据库三大高产模块，这三块决定上午卷的天花板。限时压缩约 30%，用于训练答题节奏。',
      duration: 45,
      passScore: 45,
      targetScore: 62,
      rules: [
        { module: 'software-engineering', count: 14 },
        { module: 'oo-uml', count: 11 },
        { module: 'database', count: 10 },
        { module: 'network', count: 3 },
        { module: 'standard-law', count: 2 }
      ]
    },
    {
      id: 'stage-3',
      kind: 'stage',
      paper: 'morning',
      name: '阶段三测评 · 全模块综合',
      desc: '全模块综合检验，重点看小模块（网络/安全/标准/多媒体/英语/新技术）是否已补齐。限时压缩约 30%，用于训练答题节奏。',
      duration: 50,
      passScore: 45,
      targetScore: 66,
      rules: [
        { module: 'computer-system', count: 4 },
        { module: 'os', count: 3 },
        { module: 'ds-algorithm', count: 6 },
        { module: 'programming-language', count: 3 },
        { module: 'software-engineering', count: 7 },
        { module: 'oo-uml', count: 6 },
        { module: 'database', count: 5 },
        { module: 'network', count: 4 },
        { module: 'security', count: 2 },
        { module: 'standard-law', count: 2 },
        { module: 'multimedia', count: 1 },
        { module: 'english', count: 1 },
        { module: 'tech', count: 1 }
      ]
    }
  ],

  /* ---------------- 模拟考试（上午卷，75 题 / 120 分钟） ---------------- */
  mocks: [
    { id: 'mock-01', kind: 'mock', name: '模拟考试 一', desc: '按真实权重组卷，难度偏基础，用于建立答题节奏。', difficulty: '基础' },
    { id: 'mock-02', kind: 'mock', name: '模拟考试 二', desc: '按真实权重组卷，重点观察软件工程与面向对象的得分。', difficulty: '基础' },
    { id: 'mock-03', kind: 'mock', name: '模拟考试 三', desc: '按真实权重组卷，检验前两阶段的综合掌握度。', difficulty: '基础' },
    { id: 'mock-04', kind: 'mock', name: '模拟考试 四', desc: '按真实权重组卷，开始压缩单题用时（目标 90 秒/题）。', difficulty: '进阶' },
    { id: 'mock-05', kind: 'mock', name: '模拟考试 五', desc: '按真实权重组卷，配合真题一起自查盲区。', difficulty: '进阶' },
    { id: 'mock-06', kind: 'mock', name: '模拟考试 六', desc: '按真实权重组卷，关注连续两套都错的同一考点。', difficulty: '进阶' },
    { id: 'mock-07', kind: 'mock', name: '模拟考试 七', desc: '按真实权重组卷，模拟考前两周状态，严格计时。', difficulty: '冲刺' },
    { id: 'mock-08', kind: 'mock', name: '模拟考试 八', desc: '考前最后一套完整模拟考试，目标是稳定在 60 分以上。', difficulty: '冲刺' }
  ],

  /* ---------------- 下午案例卷（4 套，代码题 Java / C++ 交替） ---------------- */
  cases: [
    {
      id: 'case-01',
      kind: 'case',
      paper: 'afternoon',
      name: '下午卷 模拟考试 A',
      desc: 'DFD + UML + 数据库设计 + 算法设计 + Java 代码题各一道，共 5 题 75 分，交卷后自评。',
      duration: 120,
      passScore: 45,
      targetScore: 55,
      rules: [
        { type: 'dfd', count: 1 },
        { type: 'uml', count: 1 },
        { type: 'db', count: 1 },
        { type: 'algo', count: 1 },
        { type: 'java', count: 1 }
      ]
    },
    {
      id: 'case-02',
      kind: 'case',
      paper: 'afternoon',
      name: '下午卷 模拟考试 B',
      desc: '第二套完整下午卷，题目与 A 卷不重复，代码题为 C++，用于检验答题模板是否真的掌握。',
      duration: 120,
      passScore: 45,
      targetScore: 58,
      rules: [
        { type: 'dfd', count: 1 },
        { type: 'uml', count: 1 },
        { type: 'db', count: 1 },
        { type: 'algo', count: 1 },
        { type: 'cpp', count: 1 }
      ]
    },
    {
      id: 'case-03',
      kind: 'case',
      paper: 'afternoon',
      name: '下午卷 专项练习（剩余题）',
      desc: '把题库中尚未成套的案例题集中练一遍，适合查漏补缺，不限时。',
      duration: 90,
      passScore: 45,
      targetScore: 55,
      rules: [
        { type: 'dfd', count: 1 },
        { type: 'uml', count: 1 },
        { type: 'db', count: 1 },
        { type: 'algo', count: 1 },
        { type: 'java', count: 1 }
      ]
    },
    {
      id: 'case-04',
      kind: 'case',
      paper: 'afternoon',
      name: '下午卷 模拟考试 C',
      desc: '第四套完整下午卷，代码题为 C++，与 A/B 卷题目不重复，用于考前完整计时演练。',
      duration: 120,
      passScore: 45,
      targetScore: 60,
      rules: [
        { type: 'dfd', count: 1 },
        { type: 'uml', count: 1 },
        { type: 'db', count: 1 },
        { type: 'algo', count: 1 },
        { type: 'cpp', count: 1 }
      ]
    }
  ]
};

(function () {
  var list = window.RK_EXAMS;
  var defaultRules = [
    { module: 'computer-system', count: 7 },
    { module: 'os', count: 6 },
    { module: 'ds-algorithm', count: 8 },
    { module: 'programming-language', count: 5 },
    { module: 'software-engineering', count: 12 },
    { module: 'oo-uml', count: 9 },
    { module: 'database', count: 7 },
    { module: 'network', count: 6 },
    { module: 'security', count: 3 },
    { module: 'standard-law', count: 3 },
    { module: 'multimedia', count: 2 },
    { module: 'english', count: 5 },
    { module: 'tech', count: 2 }
  ];
  list.mocks.forEach(function (m) {
    m.paper = 'morning';
    m.duration = 120;
    m.passScore = 45;
    m.targetScore = 60;
    m.rules = defaultRules;
  });
  list.morningRules = defaultRules;

  /* 统一索引：id -> 卷 */
  var index = {};
  list.stages.concat(list.mocks, list.cases).forEach(function (p) { index[p.id] = p; });
  list.index = index;

  list.allMorning = list.stages.concat(list.mocks);
})();
