/* ==========================================================================
 * r-2022-11.js —— 2022 年下半年 上午卷真题（逐题整理）
 * 来源：xiaomabenten/software_designer（MIT）；真题原文权利归原命题/出版/整理方。
 * 仅本地个人备考使用；题号、答案与解析按原卷整理。
 * ========================================================================== */
(function (RK) {
  RK.real.registerPaper({
  "key": "2022-11",
  "year": 2022,
  "half": "下半年",
  "label": "2022 年下半年",
  "exam": "软件设计师（中级）· 上午卷（综合知识）",
  "paperType": "morning",
  "total": 75,
  "included": 62,
  "absent": "原卷 PDF 缺第 54 题；第 57 题题干/选项不完整，未录入。",
  "excluded": "第 17、18、24、25、26、27、42、50、51、55、57、65 题依赖原卷配图、程序或 OCR 残缺，未录入。",
  "source": "https://github.com/xiaomabenten/software_designer/tree/main/02.%20%E7%9C%9F%E9%A2%98%E5%8F%8A%E8%A7%A3%E6%9E%90%EF%BC%882020%E5%B9%B4-2024%E5%B9%B4%EF%BC%89",
  "sourceLabel": "xiaomabenten/software_designer",
  "answerSource": "原卷答案",
  "answerSourceUrl": "https://github.com/xiaomabenten/software_designer/tree/main/02.%20%E7%9C%9F%E9%A2%98%E5%8F%8A%E8%A7%A3%E6%9E%90%EF%BC%882020%E5%B9%B4-2024%E5%B9%B4%EF%BC%89",
  "explanationSource": "依据原卷答案补写",
  "verified": "crosschecked",
  "pending": false,
  "sourceNote": "来源：xiaomabenten/software_designer（MIT）；真题原文与答案权利归原命题/出版/整理方，本库仅本地个人备考使用；2022 下解析为依据原卷答案补写的简短说明。"
});

  RK.real.register([
  {
    "id": "ZR-2022-11-001",
    "paper": "2022-11",
    "no": 1,
    "module": "computer-system",
    "topic": "指令系统",
    "stem": "以下关于RISC（精简指令集计算机）特点的叙述中，错误的是（1）。",
    "options": [
      "对存储器操作进行限制，使控制简单化",
      "指令种类多，指令功能强",
      "设置大量通用寄存器",
      "选取使用频率较高的一些指令，提高执行速度"
    ],
    "answer": 1,
    "explanation": "RISC 指令种类少、格式简单、寻址方式少，采用硬布线控制并设置大量通用寄存器；“指令种类多、功能强”是 CISC 的特点。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-002",
    "paper": "2022-11",
    "no": 2,
    "module": "computer-system",
    "topic": "CPU 组成",
    "stem": "CPU（中央处理单元）的基本组成部件不包括（2）。",
    "options": [
      "算逻运算单元",
      "系统总线",
      "控制单元",
      "寄存器组"
    ],
    "answer": 1,
    "explanation": "CPU 由运算器、控制器、寄存器组等组成；系统总线属于外部总线，不在 CPU 内部。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-003",
    "paper": "2022-11",
    "no": 3,
    "module": "computer-system",
    "topic": "可靠性",
    "stem": "某种部件用在2000台计算机系统中，运行工作1000小时后，其中有4台计算机的这种部件失效，则该部件的千小时可靠度R为（3）。",
    "options": [
      "0.990",
      "0.992",
      "0.996",
      "0.998"
    ],
    "answer": 3,
    "explanation": "千小时可靠度 R =（2000-4）/2000 = 0.998。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-004",
    "paper": "2022-11",
    "no": 4,
    "module": "computer-system",
    "topic": "存储器",
    "stem": "以下存储器中，（4）使用电容存储信息且需要周期性地进行刷新。",
    "options": [
      "DRAM",
      "EPROM",
      "SRAM",
      "EEPROM"
    ],
    "answer": 0,
    "explanation": "DRAM 用电容存储信息，需要周期性刷新；SRAM 用触发器存储，不需要刷新。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-005",
    "paper": "2022-11",
    "no": 5,
    "module": "computer-system",
    "topic": "浮点数表示",
    "stem": "对于长度相同但格式不同的两种浮点数，假设前者阶码长、尾数短，后者阶码短、尾数长，其它规定都相同，则二者可以表示数值的范围和精度情况为（5）。",
    "options": [
      "二者可表示的数的范围和精度相同",
      "前者所表示的数的范围更大且精度更高",
      "前者所表示的数的范围更大但精度更低",
      "前者所表示的数的范围更小但精度更高"
    ],
    "answer": 2,
    "explanation": "阶码长则表示范围大，尾数短则精度低。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-006",
    "paper": "2022-11",
    "no": 6,
    "module": "computer-system",
    "topic": "补码",
    "stem": "计算机系统中采用补码表示有符号的数值，（6）。",
    "options": [
      "可以保持加法和减法运算过程与手工运算方式一致",
      "可以提高运算过程和结果的精准程度",
      "可以提高加法和减法运算的速度",
      "可以将减法运算转换为加法运算从而简化运算器的设计"
    ],
    "answer": 3,
    "explanation": "补码把减法转换为加法，从而简化运算器的设计。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-007",
    "paper": "2022-11",
    "no": 7,
    "module": "security",
    "topic": "认证方式",
    "stem": "下列认证方式安全性较低的是（7）。",
    "options": [
      "生物认证",
      "多因子认证",
      "口令认证",
      "U盾认证"
    ],
    "answer": 2,
    "explanation": "口令认证只依赖静态口令，易被窃取或猜测，安全性最低。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-008",
    "paper": "2022-11",
    "no": 8,
    "module": "security",
    "topic": "数字证书",
    "stem": "X.509数字证书标准推荐使用的密码算法是（8），而国密SM2数字证书采用的公钥密码算法是（9）。",
    "options": [
      "RSA",
      "DES",
      "AES",
      "ECC"
    ],
    "answer": 0,
    "explanation": "X.509 数字证书推荐使用 RSA；国密 SM2 采用 ECC 公钥算法。",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2022-11-009",
    "paper": "2022-11",
    "no": 9,
    "module": "security",
    "topic": "数字证书",
    "stem": "X.509数字证书标准推荐使用的密码算法是（8），而国密SM2数字证书采用的公钥密码算法是（9）。",
    "options": [
      "RSA",
      "DES",
      "AES",
      "ECC"
    ],
    "answer": 3,
    "explanation": "国密 SM2 采用椭圆曲线密码（ECC）。",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2022-11-010",
    "paper": "2022-11",
    "no": 10,
    "module": "security",
    "topic": "Web 安全",
    "stem": "某单位网站首页被恶意篡改，应部署（10）设备阻止恶意攻击。",
    "options": [
      "数据库审计",
      "包过滤防火墙",
      "Web应用防火墙",
      "入侵检测"
    ],
    "answer": 2,
    "explanation": "WAF 针对 Web 应用层攻击；首页被恶意篡改应部署 Web 应用防火墙。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-011",
    "paper": "2022-11",
    "no": 11,
    "module": "security",
    "topic": "漏洞扫描",
    "stem": "使用漏洞扫描系统对信息系统和服务器进行定期扫描可以（11）。",
    "options": [
      "发现高危风险和安全漏洞",
      "修复高危风险和安全漏洞",
      "获取系统受攻击的日志信息",
      "关闭非必要的网络端口和服务"
    ],
    "answer": 0,
    "explanation": "漏洞扫描用于发现高危风险和漏洞，不能修复漏洞或阻断攻击。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-012",
    "paper": "2022-11",
    "no": 12,
    "module": "standard-law",
    "topic": "著作权归属",
    "stem": "以下关于某委托开发软件的著作权归属的叙述中，正确的是（12）。",
    "options": [
      "该软件的著作权归属仅依据委托人与受托人在书面合同中的约定来确定",
      "无论是否有合同约定，该软件的著作权都由委托人和受托人共同享有",
      "若无书面合同或合同中未明确约定，则该软件的著作权由受托人享有",
      "若无书面合同或合同中未明确约定，则该软件的著作权由委托人享有"
    ],
    "answer": 2,
    "explanation": "委托开发软件，合同未明确约定时，著作权由受托人享有。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-013",
    "paper": "2022-11",
    "no": 13,
    "module": "standard-law",
    "topic": "著作权权利",
    "stem": "《计算机软件保护条例》第八条第一款第八项规定的软件著作权中的翻译权是将原软件由（13）的权利。",
    "options": [
      "源程序语言转换成目标程序语言",
      "一种程序设计语言转换成另一种程序设计语言",
      "一种汇编语言转换成一种自然语言",
      "一种自然语言文字转换成另一种自然语言文字"
    ],
    "answer": 1,
    "explanation": "翻译权是将一种程序设计语言转换成另一种程序设计语言的权利。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-014",
    "paper": "2022-11",
    "no": 14,
    "module": "standard-law",
    "topic": "知识产权",
    "stem": "M公司将其开发的某软件产品注册商标为S，为确保公司在市场竞争中占据优势地位， M公司对员工进行了保密约束，此情形下，该公司不享有（14）。",
    "options": [
      "软件著作权",
      "专利权",
      "商业秘密权",
      "商标权"
    ],
    "answer": 1,
    "explanation": "商标注册不产生专利权；保密约束可形成商业秘密权，软件开发完成即享有著作权。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-015",
    "paper": "2022-11",
    "no": 15,
    "module": "software-engineering",
    "topic": "结构化分析",
    "stem": "某零件厂商的信息系统中，一个基本加工根据客户类型、订单金额、客户信用等信息的不同采取不同的行为，此时最适宜采用（15）来描述该加工规格说明。",
    "options": [
      "自然语言",
      "流程图",
      "判定表",
      "某程序设计语言"
    ],
    "answer": 2,
    "explanation": "多个条件组合决定不同处理行为，最适合用判定表描述。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-016",
    "paper": "2022-11",
    "no": 16,
    "module": "software-engineering",
    "topic": "模块设计",
    "stem": "优化模块结构时，（16）不是适当的处理方法。",
    "options": [
      "使模块功能完整",
      "消除重复功能，改善软件结构",
      "只根据模块功能确定规模大小",
      "避免或减少模块之间的病态连接"
    ],
    "answer": 2,
    "explanation": "模块规模不能只按功能确定，还要综合考虑可理解性、可维护性等因素。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-019",
    "paper": "2022-11",
    "no": 19,
    "module": "software-engineering",
    "topic": "风险管理",
    "stem": "以下关于风险管理的叙述中，不正确的是（19）。",
    "options": [
      "承认风险是客观存在的，不可能完全避免",
      "同时管理所有的风险",
      "风险管理应该贯穿整个项目管理过程",
      "风险计划本身可能会带来新的风险"
    ],
    "answer": 1,
    "explanation": "风险管理应突出重点，不可能同时管理所有风险。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-020",
    "paper": "2022-11",
    "no": 20,
    "module": "programming-language",
    "topic": "运行时存储",
    "stem": "当函数调用执行时，在栈顶创建且用来支持被调用函数执行的一段存储空间称为活动记录或者栈帧，栈帧中不包括（20）。",
    "options": [
      "形参变量",
      "全局变量",
      "返回地址",
      "局部变量"
    ],
    "answer": 1,
    "explanation": "栈帧保存形参、返回地址、局部变量等；全局变量存放在静态存储区。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-021",
    "paper": "2022-11",
    "no": 21,
    "module": "programming-language",
    "topic": "编译与解释",
    "stem": "编译器与解释器是程序语言翻译的两种基本形态，以下关于编译器工作方式及特点的叙述中，正确的是（21）。",
    "options": [
      "边翻译边执行，用户程序运行效率低且可移植性差",
      "先翻译后执行，用户程序运行效率高且可移植性好",
      "边翻译边执行，用户程序运行效率低且可移植性好",
      "先翻译后执行，用户程序运行效率高且可移植性差"
    ],
    "answer": 3,
    "explanation": "编译方式先翻译后执行，运行效率高，但可移植性差。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-022",
    "paper": "2022-11",
    "no": 22,
    "module": "programming-language",
    "topic": "语法分析",
    "stem": "对高级语言源程序进行编译或解释的过程中需要进行语法分析，递归子程序分析属于（22）的分析法。",
    "options": [
      "自上而下",
      "自下而上",
      "从左至右",
      "从右至左"
    ],
    "answer": 0,
    "explanation": "递归子程序分析法属于自上而下的语法分析方法。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-023",
    "paper": "2022-11",
    "no": 23,
    "module": "os",
    "topic": "进程调度",
    "stem": "在计算机系统中，若P1进程正在运行，操作系统强行撤下P1进程所占用的CPU，让具有更高优先级的进程P2运行，这种调度方式称为（23）。",
    "options": [
      "中断方式",
      "先进先出方式",
      "可剥夺方式",
      "不可剥夺方式"
    ],
    "answer": 2,
    "explanation": "操作系统强行剥夺正在运行进程的 CPU，属于可剥夺（抢占）调度。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-028",
    "paper": "2022-11",
    "no": 28,
    "module": "os",
    "topic": "磁盘管理",
    "stem": "假设磁盘磁头从一个磁道移至相邻磁道需要2ms。文件在磁盘上非连续存放，逻辑上相邻数据块的平均移动距离为5个磁道，每块的旋转延迟时间及传输时间分别为10ms和1ms，则读取一个100块的文件需要（28） ms。",
    "options": [
      "1100",
      "1200",
      "2100",
      "2200"
    ],
    "answer": 2,
    "explanation": "每块读取时间 = 寻道 5×2ms + 旋转延迟 10ms + 传输 1ms = 21ms，100 块共 2100ms。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-029",
    "paper": "2022-11",
    "no": 29,
    "module": "software-engineering",
    "topic": "软件过程模型",
    "stem": "以下关于快速原型模型优点的叙述中，不正确的是（29）。",
    "options": [
      "有助于满足用户的真实需求",
      "适用于大型软件系统的开发",
      "开发人员快速开发出原型系统，因此可以加速软件开发过程，节约开发成本",
      "原型系统已经通过与用户的交互得到验证，因此对应的规格说明文档能正确描述用户需求"
    ],
    "answer": 1,
    "explanation": "快速原型适合需求不明确的中小型系统，不适用于大型软件系统。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-030",
    "paper": "2022-11",
    "no": 30,
    "module": "software-engineering",
    "topic": "软件架构",
    "stem": "以下关于三层C/S结构的叙述中，不正确的是（30）。",
    "options": [
      "允许合理划分三层结构的功能，使之在逻辑上保持相对独立性，提高系统的可维护性和可扩展性",
      "允许更灵活有效地选用相应的软硬件平台和系统",
      "应用的各层可以并发开发，但需要相同的开发语言",
      "利用功能层有效地隔离表示层和数据层，便于严格的安全管理"
    ],
    "answer": 2,
    "explanation": "三层 C/S 各层可以并发开发，但不要求使用相同的开发语言。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-031",
    "paper": "2022-11",
    "no": 31,
    "module": "software-engineering",
    "topic": "模块耦合",
    "stem": "若模块A和模块B通过外部变量来交换输入、输出信息，则这两个模块的耦合类型是（31）耦合。",
    "options": [
      "数据",
      "标记",
      "控制",
      "公共"
    ],
    "answer": 3,
    "explanation": "模块之间通过外部变量（公共数据区）交换信息，属于公共耦合。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-032",
    "paper": "2022-11",
    "no": 32,
    "module": "software-engineering",
    "topic": "软件质量",
    "stem": "软件开发的目标是开发出高质量的软件系统，这里的高质量不包括（32）。",
    "options": [
      "软件必须满足用户规定的需求",
      "软件应遵循规定标准所定义的一系列开发准则",
      "软件开发应采用最新的开发技术",
      "软件应满足某些隐含的需求，如可理解性、可维护性等"
    ],
    "answer": 2,
    "explanation": "高质量软件不意味着必须采用最新技术；满足需求、遵循标准、可维护才是质量要求。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-033",
    "paper": "2022-11",
    "no": 33,
    "module": "software-engineering",
    "topic": "白盒测试",
    "stem": "白盒测试技术的各种覆盖方法中，（33）具有最弱的错误发现能力。",
    "options": [
      "判定覆盖",
      "语句覆盖",
      "条件覆盖",
      "路径覆盖"
    ],
    "answer": 1,
    "explanation": "语句覆盖最弱，只要求每条语句至少执行一次。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-034",
    "paper": "2022-11",
    "no": 34,
    "module": "software-engineering",
    "topic": "软件文档",
    "stem": "文档是软件的重要因素，关于高质量文档，以下说法不正确的是（34）。",
    "options": [
      "不论项目规模和复杂程度如何，都要用统一的标准指定相同类型和相同要素的文档",
      "应该分清读者对象",
      "应当是完整的、独立的、自成体系的",
      "行文应十分确切，不出现多义性描述"
    ],
    "answer": 0,
    "explanation": "文档应区分项目规模和复杂程度，不能一律采用相同类型和相同要素。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-035",
    "paper": "2022-11",
    "no": 35,
    "module": "software-engineering",
    "topic": "软件测试",
    "stem": "某财务系统的一个组件中，某个变量没有正确初始化，（35）最可能发现该错误。",
    "options": [
      "单元测试",
      "集成测试",
      "接受测试",
      "安装测试"
    ],
    "answer": 0,
    "explanation": "变量未正确初始化属于单元内部错误，单元测试最可能发现。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-036",
    "paper": "2022-11",
    "no": 36,
    "module": "software-engineering",
    "topic": "软件维护",
    "stem": "软件交付给用户之后进入维护阶段，根据维护具体内容的不同将维护分为不同的类型，其中“采用专用的程序模块对文件或数据中的记录进行增加、修改和删除等操作”的维护属于（36）。",
    "options": [
      "程序维护",
      "数据维护",
      "代码维护",
      "设备维护"
    ],
    "answer": 1,
    "explanation": "对文件或数据记录进行增加、修改、删除，属于数据维护。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-037",
    "paper": "2022-11",
    "no": 37,
    "module": "oo-uml",
    "topic": "继承",
    "stem": "采用面向对象方法进行某游戏设计，游戏中有野鸭、红头鸭等各种鸭子边游泳戏水边呱呱叫，不同种类的鸭子具有不同颜色，设计鸭子类负责呱呱叫和游泳方法的实现，显示颜色设计为抽象方法，由野鸭和红头鸭各自具体实现，这一机制称为（37）。当给这些类型的一组不同对象发送同一显示颜色消息时，能实现各自显示自己不同颜色的结果，这种现象称为（38）。",
    "options": [
      "继承",
      "聚合",
      "组合",
      "多态"
    ],
    "answer": 0,
    "explanation": "子类继承父类的属性和方法，这一机制称为继承。",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2022-11-038",
    "paper": "2022-11",
    "no": 38,
    "module": "oo-uml",
    "topic": "多态",
    "stem": "采用面向对象方法进行某游戏设计，游戏中有野鸭、红头鸭等各种鸭子边游泳戏水边呱呱叫，不同种类的鸭子具有不同颜色，设计鸭子类负责呱呱叫和游泳方法的实现，显示颜色设计为抽象方法，由野鸭和红头鸭各自具体实现，这一机制称为（37）。当给这些类型的一组不同对象发送同一显示颜色消息时，能实现各自显示自己不同颜色的结果，这种现象称为（38）。",
    "options": [
      "覆盖",
      "重载",
      "动态绑定",
      "多态"
    ],
    "answer": 3,
    "explanation": "同一消息发送给不同对象产生不同行为，属于多态。",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2022-11-039",
    "paper": "2022-11",
    "no": 39,
    "module": "oo-uml",
    "topic": "面向对象分析",
    "stem": "采用面向对象方法分析时，首先要在应用领域中按自然存在的实体认定对象，即将自然存在的（39）作为一个对象。",
    "options": [
      "问题",
      "关系",
      "名词",
      "动词"
    ],
    "answer": 2,
    "explanation": "面向对象分析首先从问题域中的名词认定对象。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-040",
    "paper": "2022-11",
    "no": 40,
    "module": "oo-uml",
    "topic": "设计原则",
    "stem": "进行面向对象系统设计时，修改某个类的原因有且只有一个，即一个类只做一种类型的功能，这属于（40）原则",
    "options": [
      "单一责任",
      "开放-封闭",
      "接口分离",
      "依赖倒置"
    ],
    "answer": 0,
    "explanation": "一个类只有一个引起变化的原因，符合单一责任原则。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-041",
    "paper": "2022-11",
    "no": 41,
    "module": "oo-uml",
    "topic": "UML 活动图",
    "stem": "UML 活动图用于建模（41）。",
    "options": [
      "系统在它的周边环境的语境中所提供的外部可见服务",
      "某一时刻一组对象以及它们之间的关系",
      "系统内从一个活动到另一个活动的流程",
      "对象的生命周期中某个条件或者状态"
    ],
    "answer": 2,
    "explanation": "活动图用于建模系统内从一个活动到另一个活动的流程。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-043",
    "paper": "2022-11",
    "no": 43,
    "module": "oo-uml",
    "topic": "UML 构件图",
    "stem": "UML构件图（componentdiagram）展现了一组构件之间的组织和依赖，专注于系统的静态（43）图，图中通常包括构件、接口以及各种关系。",
    "options": [
      "关联",
      "实现",
      "结构",
      "行为"
    ],
    "answer": 1,
    "explanation": "构件图专注于系统的静态实现视图，通常包括构件、接口和各种关系。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-044",
    "paper": "2022-11",
    "no": 44,
    "module": "oo-uml",
    "topic": "设计模式",
    "stem": "在某系统中，不同级别的日志信息记录方式不同，每个级别的日志处理对象根据信息级别高低，采用不同方式进行记录。每个日志处理对象检查消息的级别，如果达到它的级别则进行记录，否则不记录；然后将消息传递给它的下一个日志处理对象。该设计模式采用（44）模式使多个前后连接的对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。该模式属于（45）模式，该模式适用于（46）。",
    "options": [
      "责任链（Chain of Responsibility）",
      "策略（Strategy）",
      "过滤器（Filter）",
      "备忘录（Memento）"
    ],
    "answer": 0,
    "explanation": "多个前后连接的对象都有机会处理请求，属于责任链模式。",
    "group": 3,
    "blank": 1
  },
  {
    "id": "ZR-2022-11-045",
    "paper": "2022-11",
    "no": 45,
    "module": "oo-uml",
    "topic": "设计模式",
    "stem": "在某系统中，不同级别的日志信息记录方式不同，每个级别的日志处理对象根据信息级别高低，采用不同方式进行记录。每个日志处理对象检查消息的级别，如果达到它的级别则进行记录，否则不记录；然后将消息传递给它的下一个日志处理对象。该设计模式采用（44）模式使多个前后连接的对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。该模式属于（45）模式，该模式适用于（46）。",
    "options": [
      "行为型类",
      "行为型对象",
      "结构型类",
      "结构型对象"
    ],
    "answer": 1,
    "explanation": "责任链模式属于行为型对象模式。",
    "group": 3,
    "blank": 2
  },
  {
    "id": "ZR-2022-11-046",
    "paper": "2022-11",
    "no": 46,
    "module": "oo-uml",
    "topic": "设计模式",
    "stem": "在某系统中，不同级别的日志信息记录方式不同，每个级别的日志处理对象根据信息级别高低，采用不同方式进行记录。每个日志处理对象检查消息的级别，如果达到它的级别则进行记录，否则不记录；然后将消息传递给它的下一个日志处理对象。该设计模式采用（44）模式使多个前后连接的对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。该模式属于（45）模式，该模式适用于（46）。",
    "options": [
      "不同的标准过滤一组对象，并通过逻辑操作以解耦的方式将它们链接起来",
      "可处理一个请求的对象集合应被动态指定",
      "必须保存一个对象在某一个时刻的状态，需要时它才能恢复到先前的状态",
      "一个类定义了多种行为，并且以多个条件语句的形式出现"
    ],
    "answer": 1,
    "explanation": "责任链适用于“可处理一个请求的对象集合应被动态指定”的场景。",
    "group": 3,
    "blank": 3
  },
  {
    "id": "ZR-2022-11-047",
    "paper": "2022-11",
    "no": 47,
    "module": "oo-uml",
    "topic": "设计模式",
    "stem": "驱动新能源汽车的发动机时，电能和光能汽车分别采用不同驱动方法，而客户端希望使用统一的驱动方法，需定义一个统一的驱动接口屏蔽不同的驱动方法，该要求适合采用（47）模式。",
    "options": [
      "中介者（Mediator）",
      "访问者（Visitor）",
      "观察者（Observer）",
      "适配器（Adapter）"
    ],
    "answer": 3,
    "explanation": "用统一接口屏蔽不同的驱动方法，属于适配器模式。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-048",
    "paper": "2022-11",
    "no": 48,
    "module": "programming-language",
    "topic": "Python 异常",
    "stem": "在Python3中，（48）不是合法的异常处理结构。",
    "options": [
      "try...except...",
      "try...except...finally",
      "try...catch...",
      "raise"
    ],
    "answer": 2,
    "explanation": "Python 异常处理使用 try...except，不使用 try...catch。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-049",
    "paper": "2022-11",
    "no": 49,
    "module": "programming-language",
    "topic": "Python 切片",
    "stem": "在Python3中，表达式list(range(11))[10:0:-2]的值为（49）。",
    "options": [
      "[10,8,6,4,2,0]",
      "[10,8,6,4,2]",
      "[0,2,4,6,8,10]",
      "[0,2,4,6,8]"
    ],
    "answer": 1,
    "explanation": "切片 [10:0:-2] 从 10 开始、步长 -2、到 0 前停止，结果为 [10,8,6,4,2]。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-052",
    "paper": "2022-11",
    "no": 52,
    "module": "database",
    "topic": "关系模式",
    "stem": "某高校人力资源管理系统的数据库中，教师关系模式为T（教师号，姓名，部门号，岗位，联系地址，薪资），函数依赖集F={教师号→（姓名，部门号，岗位，联系地址），岗位→薪资}。关系模式T的主键为（52），函数依赖集F （53）。",
    "options": [
      "教师号，T存在冗余以及插入异常和删除异常的问题",
      "教师号，T不存在冗余以及插入异常和删除异常的问题",
      "（教师号，岗位），T存在冗余以及插入异常和删除异常的问题",
      "（教师号，岗位），T不存在冗余以及插入异常和删除异常的问题"
    ],
    "answer": 0,
    "explanation": "教师号是主键；岗位→薪资形成传递依赖，存在冗余及插入、删除异常。",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2022-11-053",
    "paper": "2022-11",
    "no": 53,
    "module": "database",
    "topic": "规范化",
    "stem": "某高校人力资源管理系统的数据库中，教师关系模式为T（教师号，姓名，部门号，岗位，联系地址，薪资），函数依赖集F={教师号→（姓名，部门号，岗位，联系地址），岗位→薪资}。关系模式T的主键为（52），函数依赖集F （53）。",
    "options": [
      "存在传递依赖，故关系模式T最高达到1NF",
      "存在传递依赖，故关系模式T最高达到2NF",
      "不存在传递依赖，故关系模式T最高达到3NF",
      "不存在传递依赖，故关系模式T最高达到4NF 给定员工关系E（员工号，员工名，部门名，电话，家庭住址）、工程关系P（工程号，工程名，前期工程号）、参与关系EP（员工号，工程号，工作量）。查询“005”员工参与了“虎头山隧道”工程的员工名、部门名、工程名、工作量的关系代数表达式如下： 2,3,5,6 1,2,3 54 55 π（54） A. π ⋈ ( ) B. C. σ2= ' 005 '(E) D. σ1= ' 005 '(E)"
    ],
    "answer": 1,
    "explanation": "存在传递依赖，关系模式最高达到 2NF。",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2022-11-056",
    "paper": "2022-11",
    "no": 56,
    "module": "database",
    "topic": "事务故障",
    "stem": "假设事务程序A中的表达式x/y，若y取值为0，则计算该表达式时，会产生故障。该故障属于（56）。",
    "options": [
      "系统故障",
      "事务故障",
      "介质故障",
      "死机"
    ],
    "answer": 1,
    "explanation": "除数为 0 属于事务内部故障，回滚该事务即可。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-058",
    "paper": "2022-11",
    "no": 58,
    "module": "ds-algorithm",
    "topic": "二叉树遍历",
    "stem": "设 m 和 n 是某二叉树上的两个结点，中序遍历时，n 排在 m 之前的条件是（58）。",
    "options": [
      "m是n的祖先结点",
      "m是n的子孙结点",
      "m在n的左边",
      "m在n的右边"
    ],
    "answer": 3,
    "explanation": "中序遍历中 n 排在 m 之前，说明 m 在 n 的右子树，即 m 在 n 的右边。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-059",
    "paper": "2022-11",
    "no": 59,
    "module": "ds-algorithm",
    "topic": "图存储",
    "stem": "若无向图G有n个顶点e条边，则G采用邻接矩阵存储时，矩阵的大小为（59）。",
    "options": [
      "n×e",
      "n²",
      "n²+e",
      "(n+e)²"
    ],
    "answer": 1,
    "explanation": "邻接矩阵存放 n 个顶点之间的关系，大小为 n×n，即 n²。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-060",
    "paper": "2022-11",
    "no": 60,
    "module": "ds-algorithm",
    "topic": "B- 树",
    "stem": "以下关于m阶B-树的说法中，错误的是（60）。",
    "options": [
      "根结点最多有m棵子树",
      "所有叶子结点都在同一层次上",
      "结点中的关键字有序排列",
      "叶子结点通过指针链接为有序表"
    ],
    "answer": 3,
    "explanation": "B- 树的叶子结点不带指针链接；用指针把叶子结点链接为有序表的是 B+ 树。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-061",
    "paper": "2022-11",
    "no": 61,
    "module": "ds-algorithm",
    "topic": "排序",
    "stem": "下列排序算法中，占用辅助存储空间最多的是（61）。",
    "options": [
      "归并排序",
      "快速排序",
      "堆排序",
      "冒泡排序"
    ],
    "answer": 0,
    "explanation": "归并排序需要 O(n) 辅助空间，快速排序、堆排序、冒泡排序只需常数额外空间。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-062",
    "paper": "2022-11",
    "no": 62,
    "module": "ds-algorithm",
    "topic": "查找",
    "stem": "折半查找在有序数组A中查找特定的记录K：通过比较K和数组中的中间元素A[mid] 进行比较，如果相等，则算法结束；如果K小于A[mid]，则对数组的前半部分进行折半查找；否则对数组的后半部分进行折半查找。根据上述描述，折半查找采用了（62）算法设计策略。对有序数组（3，14，27，39，42，55，70，85，93，98），成功查找和失败查找所需要的平均比较次数分别是（63）（假设查找每个元素的概率是相同的）。",
    "options": [
      "分治",
      "动态规划",
      "贪心",
      "回溯"
    ],
    "answer": 0,
    "explanation": "折半查找每次把问题规模减半，属于分治策略。",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2022-11-063",
    "paper": "2022-11",
    "no": 63,
    "module": "ds-algorithm",
    "topic": "查找复杂度",
    "stem": "折半查找在有序数组A中查找特定的记录K：通过比较K和数组中的中间元素A[mid] 进行比较，如果相等，则算法结束；如果K小于A[mid]，则对数组的前半部分进行折半查找；否则对数组的后半部分进行折半查找。根据上述描述，折半查找采用了（62）算法设计策略。对有序数组（3，14，27，39，42，55，70，85，93，98），成功查找和失败查找所需要的平均比较次数分别是（63）（假设查找每个元素的概率是相同的）。",
    "options": [
      "29/10和29/11",
      "30/10和30/11",
      "29/10和39/11",
      "30/10和40/11"
    ],
    "answer": 2,
    "explanation": "按判定树计算，成功查找平均比较 29/10 次，失败查找平均比较 39/11 次。",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2022-11-064",
    "paper": "2022-11",
    "no": 64,
    "module": "ds-algorithm",
    "topic": "算法策略",
    "stem": "Dijkstra 算法求解最短路径时采用的算法设计策略是（64）。",
    "options": [
      "分治法",
      "动态规划",
      "贪心算法",
      "回溯法"
    ],
    "answer": 2,
    "explanation": "Dijkstra 每步选择当前距离最短的顶点，属于贪心策略。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-066",
    "paper": "2022-11",
    "no": 66,
    "module": "network",
    "topic": "VLAN",
    "stem": "VLANtag在OSI参考模型的（66）实现。",
    "options": [
      "网络层",
      "传输层",
      "数据链路层",
      "物理层"
    ],
    "answer": 2,
    "explanation": "VLAN tag 加在 MAC 帧中，工作在数据链路层。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-067",
    "paper": "2022-11",
    "no": 67,
    "module": "network",
    "topic": "远程登录",
    "stem": "Telnet协议是一种（67）远程登录协议。",
    "options": [
      "安全",
      "B/S模式",
      "基于TCP",
      "分布式"
    ],
    "answer": 2,
    "explanation": "Telnet 是基于 TCP 的明文远程登录协议。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-068",
    "paper": "2022-11",
    "no": 68,
    "module": "network",
    "topic": "HTTP/HTTPS",
    "stem": "以下关于HTTPS和HTTP协议的叙述中，错误的是（68）。",
    "options": [
      "HTTPS协议使用加密传输",
      "HTTPS协议默认服务端口号是443",
      "HTTP协议默认服务端口号是80",
      "电子支付类网站应使用HTTP协议"
    ],
    "answer": 3,
    "explanation": "电子支付类网站应使用 HTTPS，而不是 HTTP。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-069",
    "paper": "2022-11",
    "no": 69,
    "module": "network",
    "topic": "DNS",
    "stem": "将网址转换为IP地址要用（69）协议。",
    "options": [
      "域名解析",
      "IP地址解析",
      "路由选择",
      "传输控制"
    ],
    "answer": 0,
    "explanation": "域名解析使用 DNS 协议。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-070",
    "paper": "2022-11",
    "no": 70,
    "module": "network",
    "topic": "IP/MAC",
    "stem": "以下关于IP地址和MAC地址说法错误的是（70）。",
    "options": [
      "IP 地址长度 32 或 128 位，MAC 地址的长度 48 位",
      "IP 地址工作在网络层，MAC 地址工作在数据链路层",
      "IP 地址的分配是基于网络拓扑，MAC 地址的分配是基于制造商",
      "IP 地址具有唯一性，MAC 地址不具有唯一性"
    ],
    "answer": 3,
    "explanation": "MAC 地址具有全球唯一性；IP 地址可复用，且私有地址不唯一。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2022-11-071",
    "paper": "2022-11",
    "no": 71,
    "module": "english",
    "topic": "专业英语",
    "stem": "We initially described SOA without mentioning Web services, and vice versa. This is because they are orthogonal: service-orientation is an architectural ______(71), while Web services are an implementation ______(72). The two can be used together, and they frequently are, but they are not mutually dependent. For example, although it is widely considered to be a distributed-computing solution, SOA can be applied to advantage in a single system, where services might be individual processes with well-defined ______(73) that communicate using local channels, or in a self-contained cluster, where they might communicate across a high-speed interconnect. Similarly, while Web services are ______(74) as the basis for a service-oriented environment, there is nothing in their definition that requires them to embody the SOA principles. While ______(75) is often held up as a key characteristic of Web services, there is no technical reason that they should be stateless—that would be a design choice of the developer, which may be dictated by the architectural style of the environment in which the service is intended to participate.",
    "options": [
      "design",
      "style",
      "technology",
      "structure"
    ],
    "answer": 1,
    "explanation": "service-orientation is an architectural style，架构风格。",
    "group": 5,
    "blank": 1
  },
  {
    "id": "ZR-2022-11-072",
    "paper": "2022-11",
    "no": 72,
    "module": "english",
    "topic": "专业英语",
    "stem": "We initially described SOA without mentioning Web services, and vice versa. This is because they are orthogonal: service-orientation is an architectural ______(71), while Web services are an implementation ______(72). The two can be used together, and they frequently are, but they are not mutually dependent. For example, although it is widely considered to be a distributed-computing solution, SOA can be applied to advantage in a single system, where services might be individual processes with well-defined ______(73) that communicate using local channels, or in a self-contained cluster, where they might communicate across a high-speed interconnect. Similarly, while Web services are ______(74) as the basis for a service-oriented environment, there is nothing in their definition that requires them to embody the SOA principles. While ______(75) is often held up as a key characteristic of Web services, there is no technical reason that they should be stateless—that would be a design choice of the developer, which may be dictated by the architectural style of the environment in which the service is intended to participate.",
    "options": [
      "structure",
      "style",
      "technology",
      "method"
    ],
    "answer": 2,
    "explanation": "Web services are an implementation technology，实现技术。",
    "group": 5,
    "blank": 2
  },
  {
    "id": "ZR-2022-11-073",
    "paper": "2022-11",
    "no": 73,
    "module": "english",
    "topic": "专业英语",
    "stem": "We initially described SOA without mentioning Web services, and vice versa. This is because they are orthogonal: service-orientation is an architectural ______(71), while Web services are an implementation ______(72). The two can be used together, and they frequently are, but they are not mutually dependent. For example, although it is widely considered to be a distributed-computing solution, SOA can be applied to advantage in a single system, where services might be individual processes with well-defined ______(73) that communicate using local channels, or in a self-contained cluster, where they might communicate across a high-speed interconnect. Similarly, while Web services are ______(74) as the basis for a service-oriented environment, there is nothing in their definition that requires them to embody the SOA principles. While ______(75) is often held up as a key characteristic of Web services, there is no technical reason that they should be stateless—that would be a design choice of the developer, which may be dictated by the architectural style of the environment in which the service is intended to participate.",
    "options": [
      "interfaces",
      "functions",
      "logics",
      "formats"
    ],
    "answer": 0,
    "explanation": "well-defined interfaces，定义良好的接口。",
    "group": 5,
    "blank": 3
  },
  {
    "id": "ZR-2022-11-074",
    "paper": "2022-11",
    "no": 74,
    "module": "english",
    "topic": "专业英语",
    "stem": "We initially described SOA without mentioning Web services, and vice versa. This is because they are orthogonal: service-orientation is an architectural ______(71), while Web services are an implementation ______(72). The two can be used together, and they frequently are, but they are not mutually dependent. For example, although it is widely considered to be a distributed-computing solution, SOA can be applied to advantage in a single system, where services might be individual processes with well-defined ______(73) that communicate using local channels, or in a self-contained cluster, where they might communicate across a high-speed interconnect. Similarly, while Web services are ______(74) as the basis for a service-oriented environment, there is nothing in their definition that requires them to embody the SOA principles. While ______(75) is often held up as a key characteristic of Web services, there is no technical reason that they should be stateless—that would be a design choice of the developer, which may be dictated by the architectural style of the environment in which the service is intended to participate.",
    "options": [
      "regarded",
      "well-suited",
      "worked",
      "used"
    ],
    "answer": 1,
    "explanation": "Web services are well-suited as the basis for a service-oriented environment。",
    "group": 5,
    "blank": 4
  },
  {
    "id": "ZR-2022-11-075",
    "paper": "2022-11",
    "no": 75,
    "module": "english",
    "topic": "专业英语",
    "stem": "We initially described SOA without mentioning Web services, and vice versa. This is because they are orthogonal: service-orientation is an architectural ______(71), while Web services are an implementation ______(72). The two can be used together, and they frequently are, but they are not mutually dependent. For example, although it is widely considered to be a distributed-computing solution, SOA can be applied to advantage in a single system, where services might be individual processes with well-defined ______(73) that communicate using local channels, or in a self-contained cluster, where they might communicate across a high-speed interconnect. Similarly, while Web services are ______(74) as the basis for a service-oriented environment, there is nothing in their definition that requires them to embody the SOA principles. While ______(75) is often held up as a key characteristic of Web services, there is no technical reason that they should be stateless—that would be a design choice of the developer, which may be dictated by the architectural style of the environment in which the service is intended to participate.",
    "options": [
      "distribution",
      "interconnection",
      "dependence",
      "statelessness"
    ],
    "answer": 3,
    "explanation": "statelessness，无状态性，常被视为 Web 服务的特征之一。",
    "group": 5,
    "blank": 5
  }
]);
})(window.RK);
