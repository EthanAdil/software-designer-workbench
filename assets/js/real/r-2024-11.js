/* ==========================================================================
 * r-2024-11.js —— 2024 年下半年 上午卷真题（公开来源可核对子集）
 * 来源：希赛网 2024 下基础知识真题汇总/真题及答案（网友回忆版，2024-11）。
 * 仅收录题面完整、答案明确的题目；缺图 / OCR 残缺 / 题号冲突者不录。
 * 真题原文权利归原命题/出版/整理方，本库仅本地个人备考使用。
 * ========================================================================== */
(function (RK) {
  RK.real.registerPaper({
    "key": "2024-11",
    "year": 2024,
    "half": "下半年",
    "label": "2024 年下半年",
    "exam": "软件设计师（中级）· 上午卷（综合知识）",
    "paperType": "morning",
    "total": 75,
    "included": 15,
    "absent": "公开来源仅提供网友回忆的部分题目（第 1~8、21~30 题段），其余题号无完整公开题面。",
    "excluded": "第 1 题缺目录结构图、第 7 题代码 OCR 残缺、第 23 题选项排版残缺，未录入。",
    "source": "https://www.educity.cn/zq/5444515.html",
    "sourceLabel": "希赛网（2024 下真题汇总/真题及答案）",
    "answerSource": "希赛网回忆版答案",
    "answerSourceUrl": "https://www.educity.cn/zyys/5353330.html",
    "explanationSource": "自编解析",
    "verified": "recalled",
    "pending": false,
    "sourceNote": "网友回忆版，题面与答案来自希赛网；答案可依据对应知识点验证。题号沿用来源回忆编号。"
  });
  RK.real.register([
    {
      "id": "ZR-2024-11-002", "paper": "2024-11", "no": 2,
      "module": "software-engineering", "topic": "详细设计",
      "stem": "详细设计结束后，重点审查的内容不包括____。",
      "options": ["数据流图", "算法", "数据结构", "软件界面"],
      "answer": 0, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-003", "paper": "2024-11", "no": 3,
      "module": "ds-algorithm", "topic": "图的矩阵表示",
      "stem": "一个有向图具有拓扑排序序列，则该图的邻接矩阵必定为____矩阵。",
      "options": ["三角", "一般", "对称", "稀疏"],
      "answer": 0, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-004", "paper": "2024-11", "no": 4,
      "module": "software-engineering", "topic": "软件可维护性",
      "stem": "以下软件工程行为中，____不能提高软件的可维护性。",
      "options": ["重视程序的结构设计，使程序具有较好的层次结构", "尽可能在软件开发过程中保证各阶段文档的正确性", "尽可能利用硬件的特点", "在进行概要设计时，应加强模块间的联系"],
      "answer": 3, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-005", "paper": "2024-11", "no": 5,
      "module": "network", "topic": "端口号",
      "stem": "访问 Web 服务器默认使用的端口号是____。",
      "options": ["53", "110", "80", "23"],
      "answer": 2, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-006", "paper": "2024-11", "no": 6,
      "module": "software-engineering", "topic": "数据流图",
      "stem": "在数据流图中，____不属于待开发系统的内容。",
      "options": ["外部主体", "数据加工", "数据存储", "数据流"],
      "answer": 0, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-008", "paper": "2024-11", "no": 8,
      "module": "ds-algorithm", "topic": "线性表",
      "stem": "以下关于单链表存储结构特征的叙述中，错误的是____。",
      "options": ["可随机访问表中的任一元素结点", "在表中任意位置插入和删除都不用移动其他元素结点", "表中结点所占用存储空间的地址不必是连续的", "所需空间与结点个数成正比"],
      "answer": 0, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-021", "paper": "2024-11", "no": 21,
      "module": "security", "topic": "访问控制",
      "stem": "访问控制的策略主要分为三类，正确的是____。",
      "options": ["基于时间的访问控制、自主访问控制和强制访问控制", "自主访问控制、强制访问控制和基于角色的访问控制", "基于角色的访问控制、基于时间的访问控制和自主访问控制", "强制访问控制、基于角色的访问控制和基于时间的访问控制"],
      "answer": 1, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-022", "paper": "2024-11", "no": 22,
      "module": "software-engineering", "topic": "软件风险",
      "stem": "“开发了一个没有人真正需要的软件系统”属于____风险。",
      "options": ["商业", "管理", "技术", "项目"],
      "answer": 0, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-024", "paper": "2024-11", "no": 24,
      "module": "database", "topic": "参照完整性",
      "stem": "关系型数据库的参考完整性约束可以通过____来实现。",
      "options": ["主码", "候选码", "超码", "外码"],
      "answer": 3, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-025", "paper": "2024-11", "no": 25,
      "module": "ds-algorithm", "topic": "折半查找",
      "stem": "设某线性表的元素存储在有序顺序表 A[1..20] 中，表中元素互异，用折半查找（向下取整）在 A[] 中查找 key，若 key 等于 A[13]，则查找过程中参与比较的元素依次为 A[10]、____。",
      "options": ["A[15]、A[12]、A[13]", "A[16]、A[15]、A[13]", "A[15]、A[14]、A[13]", "A[16]、A[14]、A[13]"],
      "answer": 0, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-026", "paper": "2024-11", "no": 26,
      "module": "security", "topic": "信息安全属性",
      "stem": "____不属于信息安全的基本要素。",
      "options": ["可重用性", "保密性", "完整性", "可控性"],
      "answer": 0, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-027", "paper": "2024-11", "no": 27,
      "module": "software-engineering", "topic": "软件过程模型",
      "stem": "____适合于面向对象的开发方法，是一种以用户需求为动力，以对象作为驱动的模型。",
      "options": ["统一过程模型", "瀑布模型", "喷泉模型", "螺旋模型"],
      "answer": 2, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-028", "paper": "2024-11", "no": 28,
      "module": "database", "topic": "SQL 授权",
      "stem": "____操作可以对 SQL 访问控制进行授权。",
      "options": ["DELETE", "GRANT", "REVOKE", "DROP"],
      "answer": 1, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-029", "paper": "2024-11", "no": 29,
      "module": "ds-algorithm", "topic": "排序",
      "stem": "要在 O(nlgn) 时间内，对数据进行稳定排序，则应选择____排序算法。",
      "options": ["快速", "归并", "堆", "直接插入"],
      "answer": 1, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    },
    {
      "id": "ZR-2024-11-030", "paper": "2024-11", "no": 30,
      "module": "database", "topic": "SQL 分组",
      "stem": "对数据库查询结果进行分组，可以使用____子句实现。",
      "options": ["GROUP BY", "HAVING", "WHERE", "ORDER BY"],
      "answer": 0, "explanation": "回忆版未提供解析。", "group": 1, "blank": 0
    }
  ]);
})(window.RK);
