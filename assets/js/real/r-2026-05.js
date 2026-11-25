/* ==========================================================================
 * r-2026-05.js —— 2026 年上半年 上午卷·专业英语（考生回忆版，单源·待核对）
 * 来源：希赛网公众号《速来估分！26上软考「软件设计师」真题答案已出》
 *       http://mp.weixin.qq.com/s?__biz=Mzg2NDExMzM3Ng==&mid=2247618867&idx=6&sn=553dbf6dee2b810bf0b8000df6b1fa5a
 * 原卷题号 3~7（LLM 与软件设计），5 空共用题干；英文原文仅做断词与空格规范化，
 * 不改词序与选项。2026-11-25 采集，verified=single-source，核对状态「待核对」。
 * ========================================================================== */
(function (RK) {
  var SRC = 'http://mp.weixin.qq.com/s?__biz=Mzg2NDExMzM3Ng==&mid=2247618867&idx=6&sn=553dbf6dee2b810bf0b8000df6b1fa5a';
  var passage = 'The emergence of Large Language Models (LLMs) has fundamentally shifted modern software design toward a highly ______ and interactive process. By interpreting complex, often ambiguous business requirements, these models can instantly generate ______ code for various UML diagrams, such as Mermaid or PlantUML, which allows architects to visualize system structures in seconds. Beyond simple visualization, LLMs now act as advanced "reasoning partners" that help technical leaders select the most suitable ______ patterns, such as Microservices or Event-Driven systems, based on specific project constraints like scalability and budget. While these AI tools significantly enhance the ______ between high-level design documents and actual code implementation, human oversight remains indispensable. Professional architects must meticulously verify all AI-generated outputs to prevent technical ______ - plausible but incorrect suggestions ensuring that the final system remains secure, performant and maintainable over the long term.';

  RK.real.registerPaper({
    "key": "2026-05",
    "year": 2026,
    "half": "上半年",
    "label": "2026 年上半年",
    "exam": "软件设计师（中级）· 上午卷（综合知识）",
    "paperType": "morning",
    "total": 75,
    "included": 5,
    "absent": "公开可核对来源仅提供 7 道考生回忆题；其中第 1~2 题依赖未公开的程序流程图，未录入。",
    "excluded": "第 1~2 题（语句/路径覆盖与 McCabe 环路复杂度）缺流程图，无法作答，未录入。",
    "source": SRC,
    "sourceLabel": "希赛网公众号（考生回忆版·待核对）",
    "answerSource": "希赛网公众号回忆版答案（待核对）",
    "answerSourceUrl": SRC,
    "explanationSource": "依据短文语境与知识点自编（待核对）",
    "verified": "single-source",
    "pending": false,
    "verifyNote": "单源录入·待核对",
    "sourceNote": "2026-11-25 采集。仅收录原文自带答案的 5 空专业英语题；英文原文对抓取断词（hasfundamentally / visualizesystem 等）与 modem→modern 做了空格与明显 OCR 纠错，词序和选项未改。",
    "sourceScope": "希赛网公众号；同场 GitHub / Gitee / 知乎 / 哔哩哔哩 未找到可提取文本的专业英语题面+答案"
  });

  RK.real.register([
    {
      "id": "ZR-2026-05-003", "paper": "2026-05", "no": 3,
      "module": "english", "topic": "LLM 与软件设计",
      "stem": passage,
      "options": ["competitive", "collaborative", "manual", "destructive"],
      "answer": 1, "explanation": "来源未提供解析，依据短文语境自编；单源回忆版，待核对。", "group": 5, "blank": 1
    },
    {
      "id": "ZR-2026-05-004", "paper": "2026-05", "no": 4,
      "module": "english", "topic": "LLM 与软件设计",
      "stem": passage,
      "options": ["invisible", "encrypted", "physical", "executable"],
      "answer": 3, "explanation": "来源未提供解析，依据短文语境自编；单源回忆版，待核对。", "group": 5, "blank": 2
    },
    {
      "id": "ZR-2026-05-005", "paper": "2026-05", "no": 5,
      "module": "english", "topic": "LLM 与软件设计",
      "stem": passage,
      "options": ["service", "architectural", "idiom", "design"],
      "answer": 1, "explanation": "来源未提供解析，依据短文语境自编；单源回忆版，待核对。", "group": 5, "blank": 3
    },
    {
      "id": "ZR-2026-05-006", "paper": "2026-05", "no": 6,
      "module": "english", "topic": "LLM 与软件设计",
      "stem": passage,
      "options": ["distance", "resistance", "consistency", "conflict"],
      "answer": 2, "explanation": "来源未提供解析，依据短文语境自编；单源回忆版，待核对。", "group": 5, "blank": 4
    },
    {
      "id": "ZR-2026-05-007", "paper": "2026-05", "no": 7,
      "module": "english", "topic": "LLM 与软件设计",
      "stem": passage,
      "options": ["calculation", "meditation", "acceleration", "hallucination"],
      "answer": 3, "explanation": "来源未提供解析，依据短文语境自编；单源回忆版，待核对。", "group": 5, "blank": 5
    }
  ]);
})(window.RK);
