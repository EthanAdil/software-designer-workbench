/* ==========================================================================
 * r-2026-11.js —— 2026 年下半年 上午卷真题（考生回忆版，单源·待核对）
 * 来源：希赛网公众号《速来估分！26下软考「软件设计师」真题答案已出（10.24）》
 *       http://mp.weixin.qq.com/s?__biz=MzU4NjA2MDIxNw==&mid=2247570348&idx=6&sn=6679227e625fc6aff800ac12c7bd9728
 * 仅收录原文自带题干、两组选项与答案的第 1~2 题（同题干双空）；其余题号未录入。
 * 2026-11-25 采集，verified=single-source，核对状态「待核对」。
 * ========================================================================== */
(function (RK) {
  var SRC = 'http://mp.weixin.qq.com/s?__biz=MzU4NjA2MDIxNw==&mid=2247570348&idx=6&sn=6679227e625fc6aff800ac12c7bd9728';
  var stem = '某业务场景中：①一个 A 对象可对应多个 B 对象；②C 对象包含多个 D 对象，且 C 不存在时 D 也不再存在。在 UML 类图中，A 与 B、C 与 D 的关系分别应表示为____、____。';

  RK.real.registerPaper({
    "key": "2026-11",
    "year": 2026,
    "half": "下半年",
    "label": "2026 年下半年",
    "exam": "软件设计师（中级）· 上午卷（综合知识）",
    "paperType": "morning",
    "total": 75,
    "included": 2,
    "absent": "公开可核对来源仅提供第 1~2 题的题干、两组选项与答案，其余题号无完整题面。",
    "excluded": "课课家 2026 下页面虽列出 75 题，但专业英语为孤立词汇题、与近年原文填空体裁不符，未采信入库。",
    "source": SRC,
    "sourceLabel": "希赛网公众号（考生回忆版·待核对）",
    "answerSource": "希赛网公众号回忆版答案（待核对）",
    "answerSourceUrl": SRC,
    "explanationSource": "依据题面与知识点自编（待核对）",
    "verified": "single-source",
    "pending": false,
    "verifyNote": "单源录入·待核对",
    "sourceNote": "2026-11-25 采集。题面与答案为同一篇考生回忆版答案解析，未做第二来源交叉核对。",
    "sourceScope": "希赛网公众号；课课家 2026 下页面仅作题位参考，未采信其题目内容"
  });

  RK.real.register([
    {
      "id": "ZR-2026-11-001", "paper": "2026-11", "no": 1,
      "module": "oo-uml", "topic": "UML 类图关系·关联",
      "stem": stem,
      "options": ["继承", "关联", "实现接口", "组合"],
      "answer": 1, "explanation": "来源未提供解析，依据题面与知识点自编；单源回忆版，待核对。", "group": 2, "blank": 1
    },
    {
      "id": "ZR-2026-11-002", "paper": "2026-11", "no": 2,
      "module": "oo-uml", "topic": "UML 类图关系·组合",
      "stem": stem,
      "options": ["依赖", "聚合", "关联", "组合"],
      "answer": 3, "explanation": "来源未提供解析，依据题面与知识点自编；单源回忆版，待核对。", "group": 2, "blank": 2
    }
  ]);
})(window.RK);
