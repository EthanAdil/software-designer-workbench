/* ==========================================================================
 * r-2025-11.js —— 2025 年下半年 上午卷真题（考生回忆版，单源·待核对）
 * 来源 1~8：希赛网 https://www.educity.cn/ccbp/5437189.html
 * 来源 9~10：希赛架构师公众号（该文标题写「2025 上」，题面与答案同 2025 下
 *            希赛网/信管网答案表一致，故按 2025 下登记；标题差异待核对）
 * 2026-11-25 采集：注明出处，verified=single-source，核对状态「待核对」。
 * ========================================================================== */
(function (RK) {
  var WECHAT = 'http://mp.weixin.qq.com/s?__biz=MzkxOTQ5NDc5NA==&mid=2247524772&idx=2&sn=5083881bc463efd6ddeebc579b3cb5ea';

  RK.real.registerPaper({
    "key": "2025-11",
    "year": 2025,
    "half": "下半年",
    "label": "2025 年下半年",
    "exam": "软件设计师（中级）· 上午卷（综合知识）",
    "paperType": "morning",
    "total": 75,
    "included": 10,
    "absent": "公开可核对来源仅提供 10 道考生回忆题，其余题号无完整题面与答案。",
    "excluded": "希赛网页面仅显示第 1~8 题；第 9~10 题取自公众号同源回忆题，其余题号不猜题。",
    "source": "https://www.educity.cn/ccbp/5437189.html",
    "sourceLabel": "希赛网 / 希赛架构师公众号（考生回忆版·待核对）",
    "answerSource": "希赛网考生回忆版答案（待核对）",
    "answerSourceUrl": "https://www.educity.cn/ccbp/5437189.html",
    "explanationSource": "依据题面与知识点自编（待核对）",
    "verified": "single-source",
    "pending": false,
    "verifyNote": "单源录入·待核对",
    "sourceNote": "2026-11-25 采集。第 1~8 题题面与答案同源希赛网；第 9~10 题来自希赛架构师公众号（原文标题为 2025 上，按答案表归到 2025 下，标题归属待核对）。",
    "sourceScope": "希赛网、希赛架构师公众号；信管网 2025 下答案表用于题位交叉参考"
  });

  RK.real.register([
    {
      "id": "ZR-2025-11-001", "paper": "2025-11", "no": 1,
      "module": "standard-law", "topic": "软件著作权·署名权",
      "stem": "软件设计师王某根据工作安排参与某软件项目开发，项目中途辞职并将任务交接给李某，项目负责人将开发人员名单中的王某变更为李某，软件开发完成后王某也不再署名。该项目负责人的行为____。",
      "options": ["不构成侵权，因为王某不是软件著作权人", "侵犯了王某的软件著作权", "侵犯了王某作为开发者的署名权", "不构成侵权，因为王某已不是项目组成员"],
      "answer": 2, "explanation": "来源未提供解析，依据题面与知识点自编；单源回忆版，待核对。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2025-11-002", "paper": "2025-11", "no": 2,
      "module": "security", "topic": "报文摘要",
      "stem": "下列关于报文摘要的叙述中，错误的是____。",
      "options": ["在物联网环境中，可以为资源受限的传感器生成轻量级摘要", "对电子文档生成摘要，接收方用私钥解密", "对发送方报文生成的摘要值，接收方应重新计算并与原始摘要比对", "报文摘要仅用于验证完整性，传输数据仍需 TLS 加密"],
      "answer": 1, "explanation": "来源未提供解析，依据题面与知识点自编；单源回忆版，待核对。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2025-11-003", "paper": "2025-11", "no": 3,
      "module": "software-engineering", "topic": "软件可维护性度量",
      "stem": "____是评估软件可维护性的关键度量。",
      "options": ["用户数量", "功能点数量", "数据库容量", "平均修复时间（MTTR）"],
      "answer": 3, "explanation": "来源未提供解析，依据题面与知识点自编；单源回忆版，待核对。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2025-11-004", "paper": "2025-11", "no": 4,
      "module": "os", "topic": "SPOOLing 技术",
      "stem": "使用 SPOOLing 技术的主要目的是____。",
      "options": ["将独占设备虚拟为共享设备", "提高进程并发度", "加快内存访问速度", "提高 CPU 利用率"],
      "answer": 0, "explanation": "来源未提供解析，依据题面与知识点自编；单源回忆版，待核对。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2025-11-005", "paper": "2025-11", "no": 5,
      "module": "standard-law", "topic": "软件著作权产生时间",
      "stem": "以下关于软件著作权产生时间的叙述中，正确的是____。",
      "options": ["自开发者获得软件著作权登记证书起", "自开发计划文档完成时", "自软件首次公开发表时", "自软件开发完成之日起"],
      "answer": 3, "explanation": "来源未提供解析，依据题面与知识点自编；单源回忆版，待核对。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2025-11-006", "paper": "2025-11", "no": 6,
      "module": "oo-uml", "topic": "面向对象设计原则",
      "stem": "以下____不是面向对象设计的基本原则。",
      "options": ["过程优先", "单一职责", "依赖倒置", "开放-封闭"],
      "answer": 0, "explanation": "来源未提供解析，依据题面与知识点自编；单源回忆版，待核对。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2025-11-007", "paper": "2025-11", "no": 7,
      "module": "software-engineering", "topic": "黑盒测试依据",
      "stem": "黑盒测试的主要依据是____。",
      "options": ["代码复杂度", "软件需求规格说明书", "设计文档", "程序内部逻辑"],
      "answer": 1, "explanation": "来源未提供解析，依据题面与知识点自编；单源回忆版，待核对。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2025-11-008", "paper": "2025-11", "no": 8,
      "module": "ds-algorithm", "topic": "堆",
      "stem": "以下序列中，满足大顶堆条件的是____。",
      "options": ["50，38，40，28，43，16，25，19", "50，37，45，25，16，40，35，19", "45，25，15，16，24，20，7，10", "55，43，45，48，52，29，75，15"],
      "answer": 1, "explanation": "来源未提供解析，依据题面与知识点自编；单源回忆版，待核对。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2025-11-009", "paper": "2025-11", "no": 9,
      "module": "network", "topic": "VLAN 与 OSI 分层",
      "stem": "VLAN 技术基于 MAC 地址实现逻辑分组，工作在 OSI 参考模型的____。",
      "options": ["传输层", "数据链路层", "网络层", "物理层"],
      "answer": 1,
      "source": "希赛架构师公众号（考生回忆版·待核对）", "sourceUrl": WECHAT,
      "answerSource": "希赛架构师公众号回忆版答案（待核对）", "answerSourceUrl": WECHAT,
      "explanation": "来源未提供解析，依据题面与知识点自编；单源回忆版，待核对。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2025-11-010", "paper": "2025-11", "no": 10,
      "module": "database", "topic": "SQL HAVING 子句",
      "stem": "在 SQL 查询中，用于过滤分组后数据的子句是____。",
      "options": ["GROUP BY", "HAVING", "ORDER BY", "WHERE"],
      "answer": 1,
      "source": "希赛架构师公众号（考生回忆版·待核对）", "sourceUrl": WECHAT,
      "answerSource": "希赛架构师公众号回忆版答案（待核对）", "answerSourceUrl": WECHAT,
      "explanation": "来源未提供解析，依据题面与知识点自编；单源回忆版，待核对。", "group": 1, "blank": 0
    }
  ]);
})(window.RK);
