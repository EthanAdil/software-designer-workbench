/* ==========================================================================
 * r-2024-05.js
 * 2024 年上半年 上午卷真题（回忆版，可核对子集）
 * ========================================================================== */
(function (RK) {
  RK.real.registerPaper({
  "key": "2024-05",
  "year": 2024,
  "half": "上半年",
  "label": "2024 年上半年",
  "exam": "软件设计师（中级）· 上午卷（综合知识）",
  "paperType": "morning",
  "total": 75,
  "included": 11,
  "absent": "第 8 题缺图；第 13~75 题公开来源未提供可核对的题干与答案。",
  "excluded": "第 8 题依赖原卷配图，未录入。",
  "source": "https://www.educity.cn/rk/5315406.html",
  "sourceLabel": "希赛网",
  "answerSource": "希赛/哔哩哔哩回忆版",
  "answerSourceUrl": "https://m.bilibili.com/opus/936435091132907541",
  "explanationSource": "未提供（第 3 题除外）",
  "verified": "recalled",
  "pending": false,
  "sourceNote": "题面来自希赛 2024 上真题（1-10 / 11-20），答案为希赛/哔哩哔哩回忆版；仅收录可核对的 1-7、9-12 题，标注为「回忆版」。"
});
  /* 第 8 题缺图、第 13~75 题公开来源不完整，未收录。 */
  RK.real.register([
  {
    "id": "ZR-2024-05-001",
    "paper": "2024-05",
    "no": 1,
    "module": "ds-algorithm",
    "topic": "树的性质",
    "stem": "对于一棵树，每个结点的孩子结点个数称为结点的度，结点度数的最大值称为树的度。某树T的度为4，其中有5个度为4的结点，8个度为3的结点，6个度为2的结点，10个度为1的结点，则T中的叶子结点个数为（）。",
    "options": [
      "38",
      "29",
      "66",
      "57"
    ],
    "answer": 0,
    "explanation": "该来源仅提供回忆版答案，未提供公开解析；参考答案为 A。",
    "explanationSource": "未提供",
    "source": "希赛网",
    "sourceUrl": "https://www.educity.cn/rk/5315406.html",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2024-05-002",
    "paper": "2024-05",
    "no": 2,
    "module": "programming-language",
    "topic": "Python 基础",
    "stem": "执行以下Python语句之后，列表y为（）。 x=[1,2,3] y=x+[4,5,6]",
    "options": [
      "出错",
      "[1,2,3,4,5,6]",
      "[5,7,9]",
      "[1,2,3,[4,5,6]]"
    ],
    "answer": 1,
    "explanation": "该来源仅提供回忆版答案，未提供公开解析；参考答案为 B。",
    "explanationSource": "未提供",
    "source": "希赛网",
    "sourceUrl": "https://www.educity.cn/rk/5315406.html",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2024-05-003",
    "paper": "2024-05",
    "no": 3,
    "module": "software-engineering",
    "topic": "结构化分析方法",
    "stem": "结构化分析方法的基本思想是（）。",
    "options": [
      "自底向上逐步分解",
      "自顶向下逐步分解",
      "自底向上逐步抽象",
      "自顶向下逐步抽象"
    ],
    "answer": 1,
    "explanation": "结构化开发方法的主要特征：自顶向下、逐步分解求精、严格区分阶段、阶段产生标准化。",
    "explanationSource": "希赛/哔哩哔哩",
    "source": "希赛网",
    "sourceUrl": "https://www.educity.cn/rk/5315406.html",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2024-05-004",
    "paper": "2024-05",
    "no": 4,
    "module": "database",
    "topic": "Armstrong 公理",
    "stem": "以下不属于函数依赖的Armstrong公理系统的是（）。",
    "options": [
      "自反规则",
      "传递规则",
      "合并规则",
      "增广规律"
    ],
    "answer": 2,
    "explanation": "该来源仅提供回忆版答案，未提供公开解析；参考答案为 C。",
    "explanationSource": "未提供",
    "source": "希赛网",
    "sourceUrl": "https://www.educity.cn/rk/5315406.html",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2024-05-005",
    "paper": "2024-05",
    "no": 5,
    "module": "software-engineering",
    "topic": "软件维护",
    "stem": "软件交付之后，由于软硬件环境发生变化而对软件进行修改的行为属于（）维护。",
    "options": [
      "改善性",
      "适应性",
      "预防性",
      "改正性"
    ],
    "answer": 1,
    "explanation": "该来源仅提供回忆版答案，未提供公开解析；参考答案为 B。",
    "explanationSource": "未提供",
    "source": "希赛网",
    "sourceUrl": "https://www.educity.cn/rk/5315406.html",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2024-05-006",
    "paper": "2024-05",
    "no": 6,
    "module": "network",
    "topic": "网络体系结构",
    "stem": "在计算机网络协议5层体系结构中，（）工作在数据链路层。",
    "options": [
      "路由器",
      "以太网交换机",
      "防火墙",
      "集线器"
    ],
    "answer": 1,
    "explanation": "该来源仅提供回忆版答案，未提供公开解析；参考答案为 B。",
    "explanationSource": "未提供",
    "source": "希赛网",
    "sourceUrl": "https://www.educity.cn/rk/5315406.html",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2024-05-007",
    "paper": "2024-05",
    "no": 7,
    "module": "computer-system",
    "topic": "数组地址计算",
    "stem": "已知二维数组A按行优先方式存储，每个元素占用2个存储单元，第一个元素A[0][0]的地址为100，元素A[3][3]的存储地址是220，则元素A[5][5]的地址是（）。",
    "options": [
      "300",
      "310",
      "306",
      "296"
    ],
    "answer": 0,
    "explanation": "该来源仅提供回忆版答案，未提供公开解析；参考答案为 A。",
    "explanationSource": "未提供",
    "source": "希赛网",
    "sourceUrl": "https://www.educity.cn/rk/5315406.html",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2024-05-009",
    "paper": "2024-05",
    "no": 9,
    "module": "database",
    "topic": "SQL 权限",
    "stem": "用于收回SQL访问控制权限的操作是（）。",
    "options": [
      "GRANT",
      "DELETE",
      "REVOKE",
      "DROP"
    ],
    "answer": 2,
    "explanation": "该来源仅提供回忆版答案，未提供公开解析；参考答案为 C。",
    "explanationSource": "未提供",
    "source": "希赛网",
    "sourceUrl": "https://www.educity.cn/rk/5315406.html",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2024-05-010",
    "paper": "2024-05",
    "no": 10,
    "module": "computer-system",
    "topic": "定点运算",
    "stem": "在采用定点二进制的运算器中，减法运算一般是通过（）来实现的。",
    "options": [
      "补码运算的二进制加法器",
      "原码运算的二进制加法器",
      "补码运算的二进制减法器",
      "原码运算的二进制减法器"
    ],
    "answer": 0,
    "explanation": "该来源仅提供回忆版答案，未提供公开解析；参考答案为 A。",
    "explanationSource": "未提供",
    "source": "希赛网",
    "sourceUrl": "https://www.educity.cn/rk/5315406.html",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2024-05-011",
    "paper": "2024-05",
    "no": 11,
    "module": "oo-uml",
    "topic": "继承类型",
    "stem": "进行面向对象设计时，以下（）不能作为继承的类型。",
    "options": [
      "多重继承",
      "分布式继承",
      "单重继承",
      "层次继承"
    ],
    "answer": 1,
    "explanation": "该来源仅提供回忆版答案，未提供公开解析；参考答案为 B。",
    "explanationSource": "未提供",
    "source": "希赛网",
    "sourceUrl": "https://www.educity.cn/rk/5315409.html",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2024-05-012",
    "paper": "2024-05",
    "no": 12,
    "module": "standard-law",
    "topic": "知识产权",
    "stem": "在撰写学术论文时，通常需要引用某些文献资料。以下叙述中，（）是不正确的。",
    "options": [
      "既可引用发表的作品，也可引用未发表的作品",
      "不必征得原作者的同意，不需要向他支付报酬",
      "只能限于介绍、评论作品",
      "只要不构成自己作品的主要部分，可适当引用资料"
    ],
    "answer": 0,
    "explanation": "该来源仅提供回忆版答案，未提供公开解析；参考答案为 A。",
    "explanationSource": "未提供",
    "source": "希赛网",
    "sourceUrl": "https://www.educity.cn/rk/5315409.html",
    "group": 1,
    "blank": 0
  }
]);
})(window.RK);
