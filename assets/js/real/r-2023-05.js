/* ==========================================================================
 * r-2023-05.js
 * 2023 年上半年 上午卷真题（可核对子集，单源）
 * ========================================================================== */
(function (RK) {
  RK.real.registerPaper({
  "key": "2023-05",
  "year": 2023,
  "half": "上半年",
  "label": "2023 年上半年",
  "exam": "软件设计师（中级）· 上午卷（综合知识）",
  "paperType": "morning",
  "total": 75,
  "included": 61,
  "absent": "",
  "excluded": "第 17、18、22、26、27、28、34、35、41、42、44、45、64、65 题依赖原卷配图或代码，未录入。",
  "source": "https://www.ruankaoba.com/paper/paperId/64c9430d39b46da8008bb2c7b4330e5f",
  "sourceLabel": "软考吧",
  "answerSource": "CSDN 冰城的程",
  "answerSourceUrl": "https://blog.csdn.net/weixin_42114300/article/details/136014068",
  "explanationSource": "未提供公开解析",
  "verified": "single-source",
  "pending": false,
  "sourceNote": "题面来自软考吧 2023 年 05 月上午卷，答案来自 CSDN 逐题答案表；题面与答案不同源，未逐题双源复核，标注为「单源」。"
});
  /* 来源与答案说明见套卷 meta；本文件只收录文字可作答、答案可对表的题目。 */
  RK.real.register([
  {
    "id": "ZR-2023-05-001",
    "paper": "2023-05",
    "no": 1,
    "module": "computer-system",
    "topic": "总线",
    "stem": "计算机中，系统总线用于（1）连接。",
    "options": [
      "接口和外设",
      "运算器、控制器和寄存器",
      "CPU、主存及外设部件",
      "DMA控制器和中断控制器"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-002",
    "paper": "2023-05",
    "no": 2,
    "module": "computer-system",
    "topic": "中断",
    "stem": "在由高速缓存、主存和硬盘构成的三级存储体系中，CPU执行指令时需要读取数据，那么DMA控制器和CPU发出的数据地址是（2）。",
    "options": [
      "高速缓存地址",
      "主存物理地址",
      "硬盘的扇区地址",
      "虚拟地址"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-003",
    "paper": "2023-05",
    "no": 3,
    "module": "computer-system",
    "topic": "海明码",
    "stem": "设信息位是8位，用海明码来发现并纠正1位出错的情况，则校验位的位数至少为（3）。",
    "options": [
      "1",
      "2",
      "4",
      "8"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-004",
    "paper": "2023-05",
    "no": 4,
    "module": "computer-system",
    "topic": "中断向量",
    "stem": "中断向量提供的是（4）。",
    "options": [
      "中断源的设备地址",
      "中断服务程序的入口地址",
      "传递数据的起始地址",
      "主程序的断点地址"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-005",
    "paper": "2023-05",
    "no": 5,
    "module": "computer-system",
    "topic": "码制",
    "stem": "计算机系统中，定点数常采用补码表示，以下关于补码表示的叙述中， 错误的是（5）。",
    "options": [
      "补码零的表示是唯一的",
      "可以将减法运算转化为加法运算",
      "符号位可以与数值位一起参加运算",
      "与真值的对应关系简单且直观"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-006",
    "paper": "2023-05",
    "no": 6,
    "module": "computer-system",
    "topic": "流水线计算",
    "stem": "设指令流水线将一条指令的执行分为取指、分析、执行三段，已知取指时间是2ns，分析时间是2ns，执行时间是1ns，则执行完1000条指令所需的时间为（6）。",
    "options": [
      "1004ns",
      "1998ns",
      "2003ns",
      "2008ns"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-007",
    "paper": "2023-05",
    "no": 7,
    "module": "network",
    "topic": "OSI参考模型",
    "stem": "在OSI参考模型中，负责对应用层消息进行压缩、加密功能的层次为（7）。",
    "options": [
      "传输层",
      "会话层",
      "表示层",
      "应用层"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-008",
    "paper": "2023-05",
    "no": 8,
    "module": "security",
    "topic": "PKI",
    "stem": "在PKI体系中，由SSL/TLS实现HTTPS应用。浏览器和服务器之间用于加密HTTP消息的方式是（8），如果服务器证书被撤销那么所产生的后果是（9）。",
    "options": [
      "对方公钥+公钥加密",
      "本方公钥+公钥加密",
      "会话密钥+公钥加密",
      "会话密钥+对称加密"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2023-05-009",
    "paper": "2023-05",
    "no": 9,
    "module": "security",
    "topic": "PKI",
    "stem": "在PKI体系中，由SSL/TLS实现HTTPS应用。浏览器和服务器之间用于加密HTTP消息的方式是（8），如果服务器证书被撤销那么所产生的后果是（9）。",
    "options": [
      "服务器不能执行加解密",
      "服务器不能执行签名",
      "客户端无法再信任服务器",
      "客户端无法发送加密信息给服务器"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2023-05-010",
    "paper": "2023-05",
    "no": 10,
    "module": "security",
    "topic": "入侵检测与防御",
    "stem": "以下关于入侵防御系统功能的描述中， 不正确的是（10）。",
    "options": [
      "监测并分析用户和系统的网络活动",
      "匹配特征库识别已知的网络攻击行为",
      "联动入侵检测系统使其阻断网络攻击行为",
      "检测僵尸网络，木马控制等僵尸主机行为"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-011",
    "paper": "2023-05",
    "no": 11,
    "module": "security",
    "topic": "防火墙",
    "stem": "Web应用防火墙无法有效保护（11）。",
    "options": [
      "登录口令暴力破解",
      "恶意注册",
      "抢票机器人",
      "流氓软件"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-012",
    "paper": "2023-05",
    "no": 12,
    "module": "standard-law",
    "topic": "知识产权",
    "stem": "著作权中（12）的保护期不受限制。",
    "options": [
      "发表权",
      "发行权",
      "展览权",
      "署名权"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-013",
    "paper": "2023-05",
    "no": 13,
    "module": "standard-law",
    "topic": "知识产权",
    "stem": "国际上为保护计算机软件知识产权不受侵犯所采用的主要方式是实施（13）。",
    "options": [
      "合同法",
      "物权法",
      "版权法",
      "刑法"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-014",
    "paper": "2023-05",
    "no": 14,
    "module": "standard-law",
    "topic": "软件著作权",
    "stem": "以下关于计算机软件著作权的叙述中， 不正确的是（14）。",
    "options": [
      "软件著作权人可以许可他人行使其软件著作权，并有权获得报酬",
      "软件著作权人可以全部或者部分转让其软件著作权，并有权获得报酬",
      "软件著作权属于自然人的，该自然人死亡后，在软件著作权的保护期内，继承人能继承软件著作权的所有权利",
      "为了学习和研究软件内含的设计思想和原理，通过安装、显示、传输或者存储软件等使用软件的，可以不经软件著作权人许可，不向其支付报酬"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-015",
    "paper": "2023-05",
    "no": 15,
    "module": "software-engineering",
    "topic": "数据流图",
    "stem": "以下关于数据流图基本加工的叙述中， 不正确的是（15）。",
    "options": [
      "对每一个基本加工，必须有一个加工规格说明",
      "加工规格说明必须描述把输入数据流变换为输出数据流的加工规则",
      "加工规格说明需要给出实现加工的细节",
      "决策树、决策表可以用来表示加工规格说明"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-016",
    "paper": "2023-05",
    "no": 16,
    "module": "software-engineering",
    "topic": "系统设计原则",
    "stem": "以下关于好的软件设计原则的叙述中， 不正确的是（16）。",
    "options": [
      "模块化",
      "提高模块独立性",
      "集中化",
      "提高抽象层次"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-019",
    "paper": "2023-05",
    "no": 19,
    "module": "software-engineering",
    "topic": "沟通路径",
    "stem": "由8位成员组成的开发团队中，一共有（19）条沟通路径。",
    "options": [
      "64",
      "56",
      "32",
      "28"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-020",
    "paper": "2023-05",
    "no": 20,
    "module": "programming-language",
    "topic": "程序语言成分",
    "stem": "对布尔表达式“a or ((b<c) and d)”求值时，当（20）时可进行短路计算。",
    "options": [
      "a为true",
      "b为true",
      "c为true",
      "d为true"
    ],
    "answer": 0,
    "explanation": "该来源未提供公开解析；参考答案为 A。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-021",
    "paper": "2023-05",
    "no": 21,
    "module": "programming-language",
    "topic": "正规式",
    "stem": "设有正规式s=（0|10）*，则其所描述正规集中字符体的特点是（21）。",
    "options": [
      "长度必须是偶数",
      "长度必须是奇数",
      "0不能连续出现",
      "1不能连续出现"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-023",
    "paper": "2023-05",
    "no": 23,
    "module": "os",
    "topic": "位示图",
    "stem": "某文件管理系统采用位示图（bitmap）来记录磁盘的使用情况，若计算机系统的字长为64位，磁盘容量为512GB，物理块的大小为4MB，那么位示图的大小为（23）个字。",
    "options": [
      "1024",
      "2048",
      "4096",
      "9600"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-024",
    "paper": "2023-05",
    "no": 24,
    "module": "os",
    "topic": "磁盘调度",
    "stem": "磁盘调度分为移臂调度和旋转调度两类，在移臂调度的算法中， （24）算法可能会随时改变移动臂的运行方向。",
    "options": [
      "单向扫描和先来先服务",
      "电梯调度和最短寻道时间优先",
      "电梯调度和最短寻道时间优先",
      "先来先服务和最短寻道时间优先"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-025",
    "paper": "2023-05",
    "no": 25,
    "module": "os",
    "topic": "线程",
    "stem": "在支持多线程的操作系统中，假设进程P创建了T1、T2、T3线程，那么（25）。",
    "options": [
      "该进程的代码段不能被T1、T2、T3共享",
      "该进程的全局变量只能被Tl共享",
      "该进程中T1、T2、T3的栈指针不能被共享",
      "该进程中T1的栈指针可以被T2、T3共享"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-029",
    "paper": "2023-05",
    "no": 29,
    "module": "software-engineering",
    "topic": "增量模型",
    "stem": "以下关于增量模型优点的叙述中， 不正确的是（29）。",
    "options": [
      "能够在较短的时间提交一个可用的产品系统",
      "可以尽早让用户熟悉系统",
      "优先级高的功能首先交付，这些功能将接受更多的测试",
      "系统的设计更加容易"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-030",
    "paper": "2023-05",
    "no": 30,
    "module": "software-engineering",
    "topic": "敏捷方法",
    "stem": "以下敏捷开发方法中， （30）使用迭代的方法，把一段短的时间（如30天）的迭代称为一个冲刺，并按照需求优先级来实现产品。",
    "options": [
      "极限编程（XP）",
      "水晶法（Crystal）",
      "并列争求法（Scrum）",
      "自适应软件开发（ASD）"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-031",
    "paper": "2023-05",
    "no": 31,
    "module": "software-engineering",
    "topic": "耦合",
    "stem": "若模块A通过控制参数来传递信息给模块B，从而确定执行模块B中的那部分语句。则这两个模块的耦合类型是（31）耦合。",
    "options": [
      "数据",
      "标记",
      "控制",
      "公共"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-032",
    "paper": "2023-05",
    "no": 32,
    "module": "software-engineering",
    "topic": "软件质量模型",
    "stem": "在设计中实现可移植性设计的规则不包括（32）。",
    "options": [
      "将设备相关程序和设备无关程序分开设计",
      "可使用特定环境的专用功能",
      "采用平台无关的程序设计语言",
      "不使用依赖于某一平台的类库"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-033",
    "paper": "2023-05",
    "no": 33,
    "module": "software-engineering",
    "topic": "软件架构风格",
    "stem": "以下关于管道—过滤器软件体系结构风格优点的叙述中， 不正确的是（33）。",
    "options": [
      "构件具有良好的高内聚、低耦合的特点",
      "支持软件复用",
      "支持并行执行",
      "适合交互处理应用"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-036",
    "paper": "2023-05",
    "no": 36,
    "module": "software-engineering",
    "topic": "系统维护内容",
    "stem": "在软件系统交付给用户使用后，为了使用户界面更友好，对系统的图形输出进行改进，该行为属于（36）维护。",
    "options": [
      "改正性",
      "适应性",
      "改善性",
      "预防性"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-037",
    "paper": "2023-05",
    "no": 37,
    "module": "oo-uml",
    "topic": "封装",
    "stem": "采用面向对象方法开发学生成绩管理系统，学生的姓名、性别、出生日期、期末考试成绩、查看成绩操作均被（37）在学生对象中。系统中定义不同类，不同类的对象之间通过（38）进行通信。",
    "options": [
      "封装",
      "继承",
      "多态",
      "信息"
    ],
    "answer": 0,
    "explanation": "该来源未提供公开解析；参考答案为 A。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2023-05-038",
    "paper": "2023-05",
    "no": 38,
    "module": "oo-uml",
    "topic": "消息",
    "stem": "采用面向对象方法开发学生成绩管理系统，学生的姓名、性别、出生日期、期末考试成绩、查看成绩操作均被（37）在学生对象中。系统中定义不同类，不同类的对象之间通过（38）进行通信。",
    "options": [
      "继承",
      "多态",
      "消息",
      "重载"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2023-05-039",
    "paper": "2023-05",
    "no": 39,
    "module": "oo-uml",
    "topic": "面向对象测试",
    "stem": "对采用面向对象方法开发的系统进行测试时，通常从不同层次进行测试。测试类中定义的每个方法属于（39）层。",
    "options": [
      "算法",
      "类",
      "模板",
      "系统"
    ],
    "answer": 0,
    "explanation": "该来源未提供公开解析；参考答案为 A。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-040",
    "paper": "2023-05",
    "no": 40,
    "module": "oo-uml",
    "topic": "共同重用原则",
    "stem": "在面向对象系统设计中，如果重用了一个包中的某个类，那么就要重用该包中的所有类，这属于（40）原则。",
    "options": [
      "共同封闭",
      "共同重用",
      "开放—封闭",
      "接口分离"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-043",
    "paper": "2023-05",
    "no": 43,
    "module": "oo-uml",
    "topic": "UML包图",
    "stem": "UML包图展现由模型本身分解而成的组织单元及其依赖关系，以下关于包图的叙述中， 不正确的是（43）。",
    "options": [
      "可以拥有类、接口构件、节点",
      "一个元素可以被多个包拥有",
      "一个包可以嵌套其他包",
      "一个包内元素不能重名"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-046",
    "paper": "2023-05",
    "no": 46,
    "module": "oo-uml",
    "topic": "策略模式",
    "stem": "某旅游公司欲开发一套软件系统，要求能根据季节，节假日等推出不同的旅行定价包，如淡季打折、一口价等。实现该要求适合采用（46）模式，该模式的主要意图是（47）。",
    "options": [
      "策略模式（Strategy）",
      "状态（State）",
      "观察者（Observer）",
      "命令（Command）"
    ],
    "answer": 0,
    "explanation": "该来源未提供公开解析；参考答案为 A。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2023-05-047",
    "paper": "2023-05",
    "no": 47,
    "module": "oo-uml",
    "topic": "策略模式",
    "stem": "某旅游公司欲开发一套软件系统，要求能根据季节，节假日等推出不同的旅行定价包，如淡季打折、一口价等。实现该要求适合采用（46）模式，该模式的主要意图是（47）。",
    "options": [
      "将一个请求封装为对象，从而可以用不同的请求对客户进行参数化",
      "当一个对象的状态发生改变时，依赖于它的对象都得到通知并被自动更新",
      "允许一个对象在其内部状态改变时改变它的行为",
      "定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2023-05-048",
    "paper": "2023-05",
    "no": 48,
    "module": "programming-language",
    "topic": "python语言",
    "stem": "Python中采用（48）方法来获取一个对象的类型。",
    "options": [
      "str()",
      "type()",
      "id()",
      "object()"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-049",
    "paper": "2023-05",
    "no": 49,
    "module": "programming-language",
    "topic": "python语言",
    "stem": "在Python语言中，语句x= （49）不能定义一个元组。",
    "options": [
      "(1，2，1，2)",
      "1，2，1，2",
      "tuple()",
      "(1)"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-050",
    "paper": "2023-05",
    "no": 50,
    "module": "programming-language",
    "topic": "python语言",
    "stem": "关于Python语言的叙述中， 不正确的是（50）。",
    "options": [
      "for 语句可以用在序列（如列表、元组和字符串）上进行迭代访问",
      "循环结构如 for和 while后可以加else语句",
      "可以用if...else和 switch...case 语句表示选择结构",
      "支持嵌套循环"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-051",
    "paper": "2023-05",
    "no": 51,
    "module": "database",
    "topic": "三级模式",
    "stem": "在数据库应用系统的开发过程中，开发人员需要通过视图层、逻辑层次上的抽象来对用户屏蔽系统的复杂性，简化用户与系统的交互过程。 错误的是（51）。",
    "options": [
      "视图层是最高层次的抽象",
      "逻辑层是比视图层更低一层的抽象",
      "物理层是最低层次的抽象",
      "物理层是比逻辑层更高一层的抽象"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-052",
    "paper": "2023-05",
    "no": 52,
    "module": "database",
    "topic": "ArmStrong公理",
    "stem": "给定关系模式R（U，F），其中U为属性集，F是U上的一组函数，属于自反律的是（52）。",
    "options": [
      "若Y⊆X⊆U，则X→Y为F所蕴含",
      "若X→Y，Y→Z，则X→Z为F所蕴含",
      "若X→Y，Z⊆Y，则X→Z为F所蕴含",
      "若X→Y，X→Z，则X→YZ为F所蕴含"
    ],
    "answer": 0,
    "explanation": "该来源未提供公开解析；参考答案为 A。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-053",
    "paper": "2023-05",
    "no": 53,
    "module": "database",
    "topic": "候选码",
    "stem": "给定关系模式R（U，F），U={A，B，C，D}，函数依赖集F={AB→C，CD→B}。关系模式R （53），主属性和非主属性个数分别为（54）。",
    "options": [
      "只有1个候选关键字ACB",
      "只有一个候选关键字BCD",
      "有2个候选关键字ABD和ACD",
      "有2个候选关键字ACB和BCD"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2023-05-054",
    "paper": "2023-05",
    "no": 54,
    "module": "database",
    "topic": "属性",
    "stem": "给定关系模式R（U，F），U={A，B，C，D}，函数依赖集F={AB→C，CD→B}。关系模式R （53），主属性和非主属性个数分别为（54）。",
    "options": [
      "4和0",
      "3和1",
      "2和2",
      "1和3"
    ],
    "answer": 0,
    "explanation": "该来源未提供公开解析；参考答案为 A。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2023-05-055",
    "paper": "2023-05",
    "no": 55,
    "module": "database",
    "topic": "SQL授权",
    "stem": "如果将Students表的插入权限赋予用户User1，并允许其将该权限授予他人，那么正确的SQL语句如下：GRANT （55） TABLE Students TO User1 （56）。",
    "options": [
      "INSERT",
      "INSERT ON",
      "UPDATE",
      "UPDATE ON"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2023-05-056",
    "paper": "2023-05",
    "no": 56,
    "module": "database",
    "topic": "SQL授权",
    "stem": "如果将Students表的插入权限赋予用户User1，并允许其将该权限授予他人，那么正确的SQL语句如下：GRANT （55） TABLE Students TO User1 （56）。",
    "options": [
      "FOR ALL",
      "PUBLIC",
      "WITH GRANT OPTION",
      "WITH CHECK OPTION"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2023-05-057",
    "paper": "2023-05",
    "no": 57,
    "module": "ds-algorithm",
    "topic": "栈",
    "stem": "利用栈对算术表达式10*（40-30/5）+20求值时，存放操作数的栈（初始为空）的容量至少为（57），才能满足暂存该表达式中的运算数或运算结果的要求。",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-058",
    "paper": "2023-05",
    "no": 58,
    "module": "ds-algorithm",
    "topic": "哈夫曼树",
    "stem": "设有5个字符，根据其使用频率为其构造哈夫曼编码。以下编码方案中（58）是不可能的。",
    "options": [
      "{111,110,101,100,0}",
      "{O000,0001,001,01,1}",
      "{11,10,01,001,000}",
      "{11,10,011,010,000}"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-059",
    "paper": "2023-05",
    "no": 59,
    "module": "ds-algorithm",
    "topic": "图的存储结构",
    "stem": "设有向图G具有n个顶点、e条弧，采用邻接表存储，则完成广度优先遍历的时间复杂度为（59）。",
    "options": [
      "O(n+e)",
      "O(n^2)",
      "O(e^2)",
      "O(n*e)"
    ],
    "answer": 0,
    "explanation": "该来源未提供公开解析；参考答案为 A。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-060",
    "paper": "2023-05",
    "no": 60,
    "module": "ds-algorithm",
    "topic": "折半查找",
    "stem": "对某有序顺序表进行折半查找（二分查找）时，进行比较的关键字序列不可能是（60）。",
    "options": [
      "42,61,90,85,77",
      "42,90,85,61,77",
      "90,85,61,77,42",
      "90,85,77,61,42"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-061",
    "paper": "2023-05",
    "no": 61,
    "module": "ds-algorithm",
    "topic": "二叉树性质",
    "stem": "设由三棵树构成的森林中，第一棵树、第二棵树和第三棵树的结点总数分别为n1、n2和n3。将该森林转换为一颗二叉树，那么该二叉树的右子树包含（61）个结点。",
    "options": [
      "n1",
      "n1+n2",
      "n3",
      "n2+n3"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-062",
    "paper": "2023-05",
    "no": 62,
    "module": "ds-algorithm",
    "topic": "归并排序",
    "stem": "对一组数据进行排序，要求排序算法的时间复杂度为O(nlgn)，且要求排序是稳定的，则可采用（62）算法。若要求排序算法的时间复杂度为O(nlgn)，且在原数据上进行，即空间复杂度为O(1)，则可以采用（63）算法。",
    "options": [
      "直接插入排序",
      "堆排序",
      "快速排序",
      "归并排序"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2023-05-063",
    "paper": "2023-05",
    "no": 63,
    "module": "ds-algorithm",
    "topic": "堆排序",
    "stem": "对一组数据进行排序，要求排序算法的时间复杂度为O(nlgn)，且要求排序是稳定的，则可采用（62）算法。若要求排序算法的时间复杂度为O(nlgn)，且在原数据上进行，即空间复杂度为O(1)，则可以采用（63）算法。",
    "options": [
      "直接插入排序",
      "堆排序",
      "快速排序",
      "归并排序"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2023-05-066",
    "paper": "2023-05",
    "no": 66,
    "module": "network",
    "topic": "www服务",
    "stem": "www的控制协议是（66）。",
    "options": [
      "FTP",
      "HTTP",
      "SSL",
      "DNS"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-067",
    "paper": "2023-05",
    "no": 67,
    "module": "os",
    "topic": "系统目录",
    "stem": "在Linux操作系统中通常使用（67）作为Web服务器，其默认的Web目录为（68）。",
    "options": [
      "IIS",
      "Apache",
      "NFS",
      "MYSQL"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2023-05-068",
    "paper": "2023-05",
    "no": 68,
    "module": "os",
    "topic": "系统目录",
    "stem": "在Linux操作系统中通常使用（67）作为Web服务器，其默认的Web目录为（68）。",
    "options": [
      "/etc/httpd",
      "/var/log/httpd",
      "/etc/home",
      "/home/httpd"
    ],
    "answer": 3,
    "explanation": "该来源未提供公开解析；参考答案为 D。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2023-05-069",
    "paper": "2023-05",
    "no": 69,
    "module": "network",
    "topic": "SNMP服务",
    "stem": "SNMP的传输层协议是（69）。",
    "options": [
      "UDP",
      "TCP",
      "IP",
      "ICM"
    ],
    "answer": 0,
    "explanation": "该来源未提供公开解析；参考答案为 A。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-070",
    "paper": "2023-05",
    "no": 70,
    "module": "network",
    "topic": "DNS服务",
    "stem": "某电脑无法打开任意网页，但是互联网即时聊天软件使用正常。造成该故障的原因可能是（70）。",
    "options": [
      "IP地址配置错误",
      "DNS配置错误",
      "网卡故障",
      "链路故障"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2023-05-071",
    "paper": "2023-05",
    "no": 71,
    "module": "english",
    "topic": "低代码",
    "stem": "Low-code and no code software development solutions have emerged as viable and convenientalternatives to the traditional development process. Low-code is a rapid application development （RAD） approach that enables automated codegeneration through （71） building blocks like drag-and-drop and pull-down menu interfaces. This （72） allows low-code users to focus on the differentiator rather than the common denominator ofprogramming.Low-code is a balanced middle ground between manual coding and no-code as its userscan still add code over auto-generated code. No-code is also a RAD approach and is often treated as a subset of the modular plug-and-play,low-code development approach. While in low-code there is some handholding done by developers inthe form of scripting or manual coding，no-code has a completely （73） approach,with 100%dependence on visual tools. A low-code application platform（LCAP）— also called a low-code development platform （LCDP）-contains an integrated development environment （IDE） with （74） features like APIs，codetemplates, reusable plug-in modules and graphical connectors to automate a significant percentage ofthe application development process LCAPs are typically available as cloud-basedPlatform-as-a-Service（PaaS） solutions. A low-code platform works on the principle of lowering complexity by using visual tools andtechniques like process modeling, where users employ visual tools to define workflows, business rules,user interfaces and the like.Behind the scenes, the complete workflow is automatically converted intocode. LCAPs are used predominantly by professional developers to automate the generic aspects ofcoding to redirect effort on the last mile of （75） .",
    "options": [
      "visual",
      "component-based",
      "object-oriented",
      "structural"
    ],
    "answer": 0,
    "explanation": "该来源未提供公开解析；参考答案为 A。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 5,
    "blank": 1
  },
  {
    "id": "ZR-2023-05-072",
    "paper": "2023-05",
    "no": 72,
    "module": "english",
    "topic": "低代码",
    "stem": "Low-code and no code software development solutions have emerged as viable and convenientalternatives to the traditional development process. Low-code is a rapid application development （RAD） approach that enables automated codegeneration through （71） building blocks like drag-and-drop and pull-down menu interfaces. This （72） allows low-code users to focus on the differentiator rather than the common denominator ofprogramming.Low-code is a balanced middle ground between manual coding and no-code as its userscan still add code over auto-generated code. No-code is also a RAD approach and is often treated as a subset of the modular plug-and-play,low-code development approach. While in low-code there is some handholding done by developers inthe form of scripting or manual coding，no-code has a completely （73） approach,with 100%dependence on visual tools. A low-code application platform（LCAP）— also called a low-code development platform （LCDP）-contains an integrated development environment （IDE） with （74） features like APIs，codetemplates, reusable plug-in modules and graphical connectors to automate a significant percentage ofthe application development process LCAPs are typically available as cloud-basedPlatform-as-a-Service（PaaS） solutions. A low-code platform works on the principle of lowering complexity by using visual tools andtechniques like process modeling, where users employ visual tools to define workflows, business rules,user interfaces and the like.Behind the scenes, the complete workflow is automatically converted intocode. LCAPs are used predominantly by professional developers to automate the generic aspects ofcoding to redirect effort on the last mile of （75） .",
    "options": [
      "block",
      "automation",
      "function",
      "method"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 5,
    "blank": 2
  },
  {
    "id": "ZR-2023-05-073",
    "paper": "2023-05",
    "no": 73,
    "module": "english",
    "topic": "低代码",
    "stem": "Low-code and no code software development solutions have emerged as viable and convenientalternatives to the traditional development process. Low-code is a rapid application development （RAD） approach that enables automated codegeneration through （71） building blocks like drag-and-drop and pull-down menu interfaces. This （72） allows low-code users to focus on the differentiator rather than the common denominator ofprogramming.Low-code is a balanced middle ground between manual coding and no-code as its userscan still add code over auto-generated code. No-code is also a RAD approach and is often treated as a subset of the modular plug-and-play,low-code development approach. While in low-code there is some handholding done by developers inthe form of scripting or manual coding，no-code has a completely （73） approach,with 100%dependence on visual tools. A low-code application platform（LCAP）— also called a low-code development platform （LCDP）-contains an integrated development environment （IDE） with （74） features like APIs，codetemplates, reusable plug-in modules and graphical connectors to automate a significant percentage ofthe application development process LCAPs are typically available as cloud-basedPlatform-as-a-Service（PaaS） solutions. A low-code platform works on the principle of lowering complexity by using visual tools andtechniques like process modeling, where users employ visual tools to define workflows, business rules,user interfaces and the like.Behind the scenes, the complete workflow is automatically converted intocode. LCAPs are used predominantly by professional developers to automate the generic aspects ofcoding to redirect effort on the last mile of （75） .",
    "options": [
      "modern",
      "hands-off",
      "generic",
      "labor-free"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 5,
    "blank": 3
  },
  {
    "id": "ZR-2023-05-074",
    "paper": "2023-05",
    "no": 74,
    "module": "english",
    "topic": "低代码",
    "stem": "Low-code and no code software development solutions have emerged as viable and convenientalternatives to the traditional development process. Low-code is a rapid application development （RAD） approach that enables automated codegeneration through （71） building blocks like drag-and-drop and pull-down menu interfaces. This （72） allows low-code users to focus on the differentiator rather than the common denominator ofprogramming.Low-code is a balanced middle ground between manual coding and no-code as its userscan still add code over auto-generated code. No-code is also a RAD approach and is often treated as a subset of the modular plug-and-play,low-code development approach. While in low-code there is some handholding done by developers inthe form of scripting or manual coding，no-code has a completely （73） approach,with 100%dependence on visual tools. A low-code application platform（LCAP）— also called a low-code development platform （LCDP）-contains an integrated development environment （IDE） with （74） features like APIs，codetemplates, reusable plug-in modules and graphical connectors to automate a significant percentage ofthe application development process LCAPs are typically available as cloud-basedPlatform-as-a-Service（PaaS） solutions. A low-code platform works on the principle of lowering complexity by using visual tools andtechniques like process modeling, where users employ visual tools to define workflows, business rules,user interfaces and the like.Behind the scenes, the complete workflow is automatically converted intocode. LCAPs are used predominantly by professional developers to automate the generic aspects ofcoding to redirect effort on the last mile of （75） .",
    "options": [
      "reusable",
      "built-in",
      "existed",
      "well-known"
    ],
    "answer": 1,
    "explanation": "该来源未提供公开解析；参考答案为 B。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 5,
    "blank": 4
  },
  {
    "id": "ZR-2023-05-075",
    "paper": "2023-05",
    "no": 75,
    "module": "english",
    "topic": "低代码",
    "stem": "Low-code and no code software development solutions have emerged as viable and convenientalternatives to the traditional development process. Low-code is a rapid application development （RAD） approach that enables automated codegeneration through （71） building blocks like drag-and-drop and pull-down menu interfaces. This （72） allows low-code users to focus on the differentiator rather than the common denominator ofprogramming.Low-code is a balanced middle ground between manual coding and no-code as its userscan still add code over auto-generated code. No-code is also a RAD approach and is often treated as a subset of the modular plug-and-play,low-code development approach. While in low-code there is some handholding done by developers inthe form of scripting or manual coding，no-code has a completely （73） approach,with 100%dependence on visual tools. A low-code application platform（LCAP）— also called a low-code development platform （LCDP）-contains an integrated development environment （IDE） with （74） features like APIs，codetemplates, reusable plug-in modules and graphical connectors to automate a significant percentage ofthe application development process LCAPs are typically available as cloud-basedPlatform-as-a-Service（PaaS） solutions. A low-code platform works on the principle of lowering complexity by using visual tools andtechniques like process modeling, where users employ visual tools to define workflows, business rules,user interfaces and the like.Behind the scenes, the complete workflow is automatically converted intocode. LCAPs are used predominantly by professional developers to automate the generic aspects ofcoding to redirect effort on the last mile of （75） .",
    "options": [
      "delivery",
      "automation",
      "development",
      "success"
    ],
    "answer": 2,
    "explanation": "该来源未提供公开解析；参考答案为 C。建议对照 docs/02 对应精讲与 `docs/04` 避坑清单复习。",
    "explanationSource": "未提供",
    "group": 5,
    "blank": 5
  }
]);
})(window.RK);
