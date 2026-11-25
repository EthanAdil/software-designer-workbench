/* ==========================================================================
 * r-2020-11.js —— 2020 年下半年 上午卷真题（逐题整理）
 * 来源：xiaomabenten/software_designer（MIT）；真题原文权利归原命题/出版/整理方。
 * 仅本地个人备考使用；题号、答案与解析按原卷整理。
 * ========================================================================== */
(function (RK) {
  RK.real.registerPaper({
  "key": "2020-11",
  "year": 2020,
  "half": "下半年",
  "label": "2020 年下半年",
  "exam": "软件设计师（中级）· 上午卷（综合知识）",
  "paperType": "morning",
  "total": 75,
  "included": 53,
  "absent": "原卷 PDF 缺第 41~47 题。",
  "excluded": "第 17、18、20、23、24、35、36、48、49、50、54、55、60、61、65 题依赖原卷配图、表格、代码或 OCR 残缺，未录入。",
  "source": "https://github.com/xiaomabenten/software_designer/tree/main/02.%20%E7%9C%9F%E9%A2%98%E5%8F%8A%E8%A7%A3%E6%9E%90%EF%BC%882020%E5%B9%B4-2024%E5%B9%B4%EF%BC%89",
  "sourceLabel": "xiaomabenten/software_designer",
  "answerSource": "原卷答案",
  "answerSourceUrl": "https://github.com/xiaomabenten/software_designer/tree/main/02.%20%E7%9C%9F%E9%A2%98%E5%8F%8A%E8%A7%A3%E6%9E%90%EF%BC%882020%E5%B9%B4-2024%E5%B9%B4%EF%BC%89",
  "explanationSource": "原卷解析",
  "verified": "crosschecked",
  "pending": false,
  "sourceNote": "来源：xiaomabenten/software_designer（MIT），文件路径 `02. 真题及解析（2020年-2024年）/2020年11月软件设计师上午真题及答案解析.pdf`；chenxuhl/medium-software-designer 的 `历年真题/2020年11月软件设计师上午真题及答案解析.pdf` 与之哈希一致，为同源副本。真题原文与解析权利归原命题/出版/整理方，本库仅本地个人备考使用。"
});

  RK.real.register([
  {
    "id": "ZR-2020-11-001",
    "paper": "2020-11",
    "no": 1,
    "module": "computer-system",
    "topic": "存储系统",
    "stem": "在程序执行过程中，高速缓存(Cache)与主存间的地址映射由（）。",
    "options": [
      "操作系统进行管理",
      "存储管理软件进行管理",
      "程序员自行安排",
      "硬件自动完成"
    ],
    "answer": 3,
    "explanation": "历年缓存(Cache)相关试题：https://blog.csdn.net/shujuku____/article/details/115599506",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-002",
    "paper": "2020-11",
    "no": 2,
    "module": "computer-system",
    "topic": "CPU 组成",
    "stem": "计算机中提供指令地址的程序计数器PC在（）中。",
    "options": [
      "控制器",
      "运算器",
      "存储器",
      "I/O设备"
    ],
    "answer": 0,
    "explanation": "控制器是分析和执行指令的部件 ●指令寄存器 ●指令译码器 ●程序计数器 ●定时与控制电路 ●堆栈和堆栈指针",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-003",
    "paper": "2020-11",
    "no": 3,
    "module": "computer-system",
    "topic": "浮点数运算",
    "stem": "以下关于两个浮点数相加运算的叙述中，正确的是（）。",
    "options": [
      "首先进行对阶，阶码大的向阶码小的对齐",
      "首先进行对阶，阶码小的向阶码大的对齐",
      "不需要对阶，直接将尾数相加",
      "不需要对阶，直接将阶码相加"
    ],
    "answer": 1,
    "explanation": "两个浮点数相加时，首先需要比较阶码大小，使小阶向大阶看齐(称为“对阶”)。即小阶的尾数向右移位(相当于小数点左移)，每右移-位，其阶码加1，直到阶码相等，右移的位数等于阶差。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-004",
    "paper": "2020-11",
    "no": 4,
    "module": "computer-system",
    "topic": "性能指标",
    "stem": "某计算机系统的CPU主频为2.8GHz。某应用程序包括3类指令，各类指令的CPI(执行每条指令所需要的时钟周期数)及指令比例如下表所示。执行该应用程序时的平均CPI为（）；运算速度用MIPS表示，约为（）。指令A 指令B 指令C 比例 35% 45% 20% CPI 4 2 6",
    "options": [
      "2.5",
      "3",
      "3.5",
      "4"
    ],
    "answer": 2,
    "explanation": "4*0.35+2*0.45+6*0.2=3. 5 2.8G=2.8*10^9HZ(=2.8*10^3MHz), 2.8*10^9 /3.5=8*10^8=800* 10^6=800MIPS (2.8*10^3/3.5=2800/3.5=800MIPS) 1，主频主频 = 时钟频率，它是指CPU内部晶振的频率，常用单位为MHz，它反映了CPU的基本工作节拍; 时钟频率又称主频，它是指CPU内部晶振的频率，常用单位为MHz，它反映了CPU的基本工作节拍; 2，时钟周期时钟周期 t=1/f; 主频的倒数 3，机器周期机器周期 =m*t;一个机器周期包含若干个时钟周期 4，指令周期指令周期 =m*t*n; 执行一条指令所需要的时间，一般包含若干个机器周期 5，CPI CPI=m*n; 平均每条指令的平均时钟周期个数指令周期 =CPI×机器周期 = n（CPI=n）×m×时钟周期=nm/主频f, 注意指令周期单位是s或者ns，CPI无量纲 6，MIPS(MillionInstructionsPer Second） MIPS= 每秒执行百万条指令数 =1/（CPI×时钟周期）= 主频/CPI MFLOPS 每秒百万浮点运算次数。表示秒钟所能执行的指令条数，对于微型计算机可用CPU的主频和每条指令的执行所需的时钟周期来衡量。",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2020-11-005",
    "paper": "2020-11",
    "no": 5,
    "module": "computer-system",
    "topic": "性能指标",
    "stem": "某计算机系统的CPU主频为2.8GHz。某应用程序包括3类指令，各类指令的CPI(执行每条指令所需要的时钟周期数)及指令比例如下表所示。执行该应用程序时的平均CPI为（）；运算速度用MIPS表示，约为（）。指令A 指令B 指令C 比例 35% 45% 20% CPI 4 2 6",
    "options": [
      "700",
      "800",
      "930",
      "1100"
    ],
    "answer": 1,
    "explanation": "4*0.35+2*0.45+6*0.2=3. 5 2.8G=2.8*10^9HZ(=2.8*10^3MHz), 2.8*10^9 /3.5=8*10^8=800* 10^6=800MIPS (2.8*10^3/3.5=2800/3.5=800MIPS) 1，主频主频 = 时钟频率，它是指CPU内部晶振的频率，常用单位为MHz，它反映了CPU的基本工作节拍; 时钟频率又称主频，它是指CPU内部晶振的频率，常用单位为MHz，它反映了CPU的基本工作节拍; 2，时钟周期时钟周期 t=1/f; 主频的倒数 3，机器周期机器周期 =m*t;一个机器周期包含若干个时钟周期 4，指令周期指令周期 =m*t*n; 执行一条指令所需要的时间，一般包含若干个机器周期 5，CPI CPI=m*n; 平均每条指令的平均时钟周期个数指令周期 =CPI×机器周期 = n（CPI=n）×m×时钟周期=nm/主频f, 注意指令周期单位是s或者ns，CPI无量纲 6，MIPS(MillionInstructionsPer Second） MIPS= 每秒执行百万条指令数 =1/（CPI×时钟周期）= 主频/CPI MFLOPS 每秒百万浮点运算次数。表示秒钟所能执行的指令条数，对于微型计算机可用CPU的主频和每条指令的执行所需的时钟周期来衡量。",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2020-11-006",
    "paper": "2020-11",
    "no": 6,
    "module": "computer-system",
    "topic": "中断",
    "stem": "中断向量提供（）。",
    "options": [
      "函数调用结束后的返回地址",
      "I/O设备的接口地址",
      "主程序的入口地址",
      "中断服务程序入口地址"
    ],
    "answer": 3,
    "explanation": "中断向量是中断服务程序的入口地址,在计算机中中断向量的地址存放一条跳转到中断服务程序的跳转指令。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-007",
    "paper": "2020-11",
    "no": 7,
    "module": "security",
    "topic": "认证与加密",
    "stem": "以下关于认证和加密的叙述中，错误的是（）。",
    "options": [
      "加密用以确保数据的保密性",
      "认证用以确保报文发送者和接收者的真实性",
      "认证和加密都可以阻止对手进行被动攻击",
      "身份认证的目的在于识别用户的合法性，阻止非法用户访问系统"
    ],
    "answer": 2,
    "explanation": "认证和加密的区别在于:加密用以确保数据的保密性，阻止对手的被动攻击，如截取，窃听等，认证用以确保报文发送者和接收者的真实性以及报文的完整性，阻止对手的主动攻击，如冒充、篡改、重播等。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-008",
    "paper": "2020-11",
    "no": 8,
    "module": "security",
    "topic": "访问控制",
    "stem": "访问控制是对信息系统资源进行保护的重要措施，适当的访问控制能够阻止未经授权的用户有意或者无意地获取资源。计算机系统中，访问控制的任务不包括（）。",
    "options": [
      "审计",
      "授权",
      "确定存取权限",
      "实施存取权限"
    ],
    "answer": 0,
    "explanation": "访问控制包括三个任务: ●授权:确定哪些主体有权访问哪些客体 ●确定访问权限(读、写、执行、删除、追加等存取方式的组合) ●实施访问权限审计是指专业审核，涉核实公司的会计文件及相关凭证，以便就公司帐目的公正性、一致性和符合一般认可的会计原则上表达意见。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-009",
    "paper": "2020-11",
    "no": 9,
    "module": "network",
    "topic": "路由协议",
    "stem": "路由协议称为内部网关协议，自治系统之间的协议称为外部网关协议，以下属于外部网关协议的是()。",
    "options": [
      "RIP",
      "OSPF",
      "BGP",
      "UDP"
    ],
    "answer": 2,
    "explanation": "常见协议功能 POP3：邮件收取 SMTP：邮件发送 FTP：20数据端口/21控制端口，文件传输协议 HTTP：超文本传输协议，网页传输 DHCP： IP地址自动分配 SNMP：简单网络管理协议 DNS：域名解析协议，记录域名与IP的映射关系 TCP：可靠的传输层协议 UDP：不可靠的传输层协议 ICMP：因特网控制协议，PING命令来自该协议 IGMP：组播协议 ARP：地址解析协议，IP地址转换为MAC地址 RARP：反向地址解析协议，MAC地址转IP地址 BCP(边界网关协议)是运行于TCP上的一种自治系统的编由协议。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-010",
    "paper": "2020-11",
    "no": 10,
    "module": "security",
    "topic": "安全属性",
    "stem": "所有资源只能由授权方或以授权的方式进行修改，即信息未经授权不能进行改变的特性是指信息的()。",
    "options": [
      "完整性",
      "可用性",
      "保密性",
      "不可抵赖性"
    ],
    "answer": 0,
    "explanation": "安全的五个基本要素 ●机密性(确保信息不暴露给未授权的实体或进程) ●完整性(只有得到允许的人才能修改数据，并能够判别数据是否己被篡改) ●可用性(得到授权的实体在需要时可访问数据) ●可控性(可以控制授权范围内的信息流向和行为方式) ●可审查性(对出现的安全问题提供调查的依据和手段)",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-011",
    "paper": "2020-11",
    "no": 11,
    "module": "network",
    "topic": "网络命令",
    "stem": "在Windows操作系统下，要获取某个网络开放端口所对应的应用程序信息,可以使用命令 ().",
    "options": [
      "ipconfig",
      "traceroute",
      "netstat",
      "nslookup"
    ],
    "answer": 2,
    "explanation": "常见网络诊断命令： ping：用于检查网络是否连通； tracert（linux:traceroute）：用于确定 IP数据包访问目标所采取的路径，若网络不通，能定位到具体哪个结点不通； ipconfig （ linux:ifconfig）：显示TCP/IP网络配置值，如：IP地址，MAC地址，网关地址； nslookup：查询DNS记录； Netstat：用于显示网络连接、路由表和网络接口信息。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-012",
    "paper": "2020-11",
    "no": 12,
    "module": "standard-law",
    "topic": "专利与知识产权",
    "stem": "甲、乙两个申请人分别就相同内容的计算机软件发明创造，向国务院专利行政部门提出专利申请，甲先于乙一日提出，则（）。",
    "options": [
      "甲获得该项专利申请权",
      "乙获得该项专利申请权",
      "甲和乙都获得该项专利申请权",
      "甲和乙都不能获得该项专利申请权"
    ],
    "answer": 0,
    "explanation": "专利申请权授予先申请人；同日申请时才需要协商。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-013",
    "paper": "2020-11",
    "no": 13,
    "module": "standard-law",
    "topic": "著作权归属",
    "stem": "小王是某高校的非全日制在读研究生，目前在甲公司实习，负责了该公司某软件项目的开发工作并撰写相关的软件文档。以下叙述中，正确的是（）。",
    "options": [
      "该软件文档属于职务作品，但小王享有该软件著作权的全部权利",
      "该软件文档属于职务作品，甲公司享有该软件著作权的全部权利",
      "该软件文档不属于职务作品，小王享有该软件著作权的全部权利",
      "该软件文档不属于职务作品，甲公司和小王共同享有该著作权的全部权利"
    ],
    "answer": 1,
    "explanation": "如果开发者在单位或组织中任职期间，所开发的软件符合以下条件，则软件著作权应归单位或组织所有。 ●针对本职工作中明确规定的开发目标所开发的软件。 ●开发出的软件属于从事本职工作活动的结果。 ●使用了单位或组织的资金、专用设备、未公开的信息等物质、技术条件，并由单位或组织承担责任的软件。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-014",
    "paper": "2020-11",
    "no": 14,
    "module": "standard-law",
    "topic": "著作权保护期",
    "stem": "按照我国著作权法的权利保护期，以下权利中，（）受到永久保护。",
    "options": [
      "发表权",
      "修改权",
      "复制权",
      "发行权"
    ],
    "answer": 1,
    "explanation": "作者的署名权、修改权、保护作品完整权的保护期不受限制。公民的作品，其发表权、使用权和获得报酬权的保护期为作者终生及其死亡后50年，截止于作者死亡后第50年的 12月31日;如果是合作作品，截止到最后死亡的作者死亡后第50年的12月31日。法人或者其他组织的作品、著作权(署名权除外)由法人或者其他组织享有的职务作品，其发表权、使用权和获得报酬权的保护期为50年，截止于作品首次发表后第50年的12月 31日，但作品自创作完成后50年内未发表的，著作权法不再保护。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-015",
    "paper": "2020-11",
    "no": 15,
    "module": "software-engineering",
    "topic": "结构化分析",
    "stem": "结构化分析方法中，数据流图中的元素在（）中进行定义。",
    "options": [
      "加工逻辑",
      "实体联系图",
      "流程图",
      "数据字典"
    ],
    "answer": 3,
    "explanation": "数据流图中的数据流、数据存储、加工和外部实体等元素，均在数据字典中给出定义。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-016",
    "paper": "2020-11",
    "no": 16,
    "module": "software-engineering",
    "topic": "模块设计",
    "stem": "良好的启发式设计原则上不包括（）。",
    "options": [
      "提高模块独立性",
      "模块规模越小越好",
      "模块作用域在其控制域之内",
      "降低模块接口复杂性"
    ],
    "answer": 1,
    "explanation": "模块规模并非越小越好，应在可理解性、独立性与开发成本之间平衡。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-019",
    "paper": "2020-11",
    "no": 19,
    "module": "software-engineering",
    "topic": "成本估算",
    "stem": "软件项目成本估算模型 COCOMOII 中，体系结构阶段模型基于（）进行估算。",
    "options": [
      "应用程序点数量",
      "功能点数量",
      "复用或生成的代码行数",
      "源代码的行数"
    ],
    "answer": 3,
    "explanation": "COCOMOI模型也需要使用规模估算信息,体系结构阶段,在模型层次结构中有3种不同规模估算选择,即:对象点、功能点和代码行。应用组装模型使用的是对象点;早期设计阶段模型使用的是功能点,功能点可以转换为代码行。体系结构模型把工作量表示为代码行数。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-021",
    "paper": "2020-11",
    "no": 21,
    "module": "programming-language",
    "topic": "编译过程",
    "stem": "用 C/C++语言为某个应用编写的程序，经过（）后形成可执行程序。",
    "options": [
      "预处理、编译、汇编、链接",
      "编译、预处理、汇编、链接",
      "汇编、预处理、链接、编译",
      "链接、预处理、编译、汇编"
    ],
    "answer": 0,
    "explanation": "编译四个过程:预处理、编译、汇编、链接",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-022",
    "paper": "2020-11",
    "no": 22,
    "module": "programming-language",
    "topic": "运行时存储",
    "stem": "在程序的执行过程中，系统用（）实现嵌套调用(递归调用)函数的正确返回。",
    "options": [
      "队列",
      "优先队列",
      "栈",
      "散列表"
    ],
    "answer": 2,
    "explanation": "嵌套调用和递归调用使用栈保存返回地址、参数与局部变量。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-025",
    "paper": "2020-11",
    "no": 25,
    "module": "os",
    "topic": "文件系统",
    "stem": "某文件系统采用索引节点管理，其磁盘索引块和磁盘数据块大小均为 1KB 字节且每个文件索引节点有 8 个地址项 iaddr[0]~iaddr[7]，每个地址项大小为 4 字节，其中 iaddr[0]~iaddr[4]采用直接地址索引，iaddr[5]和 iaddr[6]采用一级间接地址索引，iaddr[7] 采用二级间接地址索引。若用户要访问文件 userA 中逻辑块号为 4 和 5 的信息，则系统应分别采用（），该文件系统可表示的单个文件最大长度是（）KB。",
    "options": [
      "直接地址访问和直接地址访问",
      "直接地址访问和一级间接地址访问",
      "一级间接地址访问和一级间接地址访问",
      "一级间接地址访问和二级间接地址访问"
    ],
    "answer": 1,
    "explanation": "试题相关 【 文件管理 - 索引文件结构 】 ： https://blog.csdn.net/shujuku____/article/details/116227917",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2020-11-026",
    "paper": "2020-11",
    "no": 26,
    "module": "os",
    "topic": "文件系统",
    "stem": "某文件系统采用索引节点管理，其磁盘索引块和磁盘数据块大小均为 1KB 字节且每个文件索引节点有 8 个地址项 iaddr[0]~iaddr[7]，每个地址项大小为 4 字节，其中 iaddr[0]~iaddr[4]采用直接地址索引，iaddr[5]和 iaddr[6]采用一级间接地址索引，iaddr[7] 采用二级间接地址索引。若用户要访问文件 userA 中逻辑块号为 4 和 5 的信息，则系统应分别采用（），该文件系统可表示的单个文件最大长度是（）KB。",
    "options": [
      "517",
      "1029",
      "65797",
      "66053"
    ],
    "answer": 3,
    "explanation": "试题相关 【 文件管理 - 索引文件结构 】 ： https://blog.csdn.net/shujuku____/article/details/116227917",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2020-11-027",
    "paper": "2020-11",
    "no": 27,
    "module": "os",
    "topic": "进程同步",
    "stem": "假设系统有 n(n≥5) 个进程共享资源 R，且资源 R 的可用数为 5。若采用 PV 操作，则相应的信号量 S 的取值范围应为（）。",
    "options": [
      "-1~n-1",
      "-5~5",
      "-(n-1)~1",
      "-(n-5)~5"
    ],
    "answer": 3,
    "explanation": "PV操作是一种实现进程互斥与同步的有效方法。PV操作与信号量的处理相关，P表示通过的意思，V表示释放的意思。 PV操作是典型的同步机制之一。用一个信号量与一个消息联系起来，当信号量的值为 0时，表示期望的消息尚未产生；当信号量的值非0时，表示期望的消息已经存在。用PV 操作实现进程同步时，调用P操作测试消息是否到达，调用V操作发送消息。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-028",
    "paper": "2020-11",
    "no": 28,
    "module": "os",
    "topic": "线程",
    "stem": "在支持多线程的操作系统中，假设进程 P 创建了线程 TI、T2 和 T3，那么以下叙述中错误的是（）。",
    "options": [
      "线程 T1、 T2 和 T3 可以共享程 P 的代码",
      "线程 T1、T2 可以共享 P 进程中 T3 的栈指针",
      "线程 T1、T2 和 T3 可以共享进程 P 打开的文件",
      "线程 T1、T2 和 T3 可以共享进程 P 的全局变量"
    ],
    "answer": 1,
    "explanation": "1.线程是程序执行的最小单位，而进程是操作系统分配资源的最小单位 2.一个进程由一个或多个线程组成，线程是一个进程中代码的不同执行路线 3. 进程之间相互独立，但同一进程下的各个线程之间共享程序的内存空间(包括代码段，数据集，堆等)及一些进程级的资源(如打开文件和信号等)，某进程内的线程在其他进程不可见",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-029",
    "paper": "2020-11",
    "no": 29,
    "module": "software-engineering",
    "topic": "软件过程模型",
    "stem": "喷泉模型是一种适合于面向（）开发方法的软件过程模型。该过程模型的特点不包括（）。",
    "options": [
      "对象",
      "数据",
      "数据流",
      "事件"
    ],
    "answer": 0,
    "explanation": "喷泉模型是一种以用户需求为动力，以对象为驱动的模型，主要用于描述面向对象的软件开发过程。该模型认为软件开发过程自下而上周期的各阶段是相互迭代和无间隙的特性。无间隙指在各项活动之间无明显边界，如分析和设计活动之间没有明显的界限。",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2020-11-030",
    "paper": "2020-11",
    "no": 30,
    "module": "software-engineering",
    "topic": "软件过程模型",
    "stem": "喷泉模型是一种适合于面向（）开发方法的软件过程模型。该过程模型的特点不包括（）。",
    "options": [
      "以用户需求为动力",
      "支持软件重用",
      "具有迭代性",
      "开发活动之间存在明显的界限"
    ],
    "answer": 3,
    "explanation": "喷泉模型是一种以用户需求为动力，以对象为驱动的模型，主要用于描述面向对象的软件开发过程。该模型认为软件开发过程自下而上周期的各阶段是相互迭代和无间隙的特性。无间隙指在各项活动之间无明显边界，如分析和设计活动之间没有明显的界限。",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2020-11-031",
    "paper": "2020-11",
    "no": 31,
    "module": "software-engineering",
    "topic": "模块内聚",
    "stem": "若某模块内所有处理元素都在同一个数据结构上操作，则该模块的内聚类型为()。",
    "options": [
      "逻辑",
      "过程",
      "通信",
      "功能"
    ],
    "answer": 2,
    "explanation": "如果模块A的三个处理都对同一数据结构操作，则模块A的内聚类型是通信内聚。模块间的耦合和模块的内聚是度量模块独立性的两个准则。内聚是模块功能强度的度量，即模块内部各个元素彼此结合的紧密程度。一个模块内部各元素之间的紧密程度越高，则其内聚性越高，模块独立性越好。模块内聚类型主要有以下几类: 偶然内聚或巧合内聚：指一个模块内的各处理元素之间没有任何联系。逻辑内聚：指模块内执行若干个逻辑上相似的功能，通过参数确定该模块完成哪一个功能。时间内聚：把需要同时执行的动作组合在一起形成的模块。过程内聚：指一个模块完成多个任务，这些任务必须按指定的过程执行。通信内聚：指模块内的所有处理元素都在同一数据结构上操作，或者各处理使用相同的输入数据或产生相同的输出数据。顺序内聚：指一个模块中的各个处理元素都密切相关于同一各功能且必须顺序执行，前一个功能元素的输出就是下一个功能的输入。功能内聚：指模块内的所有元素共同作用完成一个功能，缺一不可。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-032",
    "paper": "2020-11",
    "no": 32,
    "module": "software-engineering",
    "topic": "软件质量属性",
    "stem": "软件质量属性中，() 是指软件每分钟可以处理多少个请求。",
    "options": [
      "响应时间",
      "吞吐量",
      "负载",
      "容量"
    ],
    "answer": 1,
    "explanation": "吞吐量指单位时间内系统能够处理的请求数量。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-033",
    "paper": "2020-11",
    "no": 33,
    "module": "software-engineering",
    "topic": "性能优化",
    "stem": "提高程序执行效率的方法一般不包括（）。",
    "options": [
      "设计更好的算法",
      "采用不同的数据结构",
      "采用不同的程序设计语言",
      "改写代码使其更紧凑"
    ],
    "answer": 3,
    "explanation": "提高执行效率主要依靠更好的算法、合适的数据结构和编译优化；仅把代码改写得更紧凑不一定提高效率。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-034",
    "paper": "2020-11",
    "no": 34,
    "module": "software-engineering",
    "topic": "软件可靠性",
    "stem": "软件可靠性是指系统在给定的时间间隔内、在给定条件下无失效运行的概率。若MTTF 和MTTR分别表示平均无故障时间和平均修复时间，则公式() 可用于计算软件可靠性。",
    "options": [
      "MTTF/(1+MTTF)",
      "1/(1+MTTF)",
      "MTTR/(1+MTTR)",
      "1/(1+MTTR)"
    ],
    "answer": 0,
    "explanation": "●可靠性:指一个系统对于给定时间间隔内、给定条件下无失效运作的概率。可以用 MTTF/(1+MTTF)来度量，其中MTTF为平均无故障时间 ●可用性:在给定时间点上，一个系统能够按照规格说明正确运作的概率。可以用 MTBF/(1+MTBF)来度量，其中MTBF为平均失效间隔时间 ●可维护性:实在给定使用条件下，再规定时间间隔内，使用规定的过程和资源完成维护活动的概率，可以用1/(MTTR)来度量，其中MTTR为平均修复时间",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-037",
    "paper": "2020-11",
    "no": 37,
    "module": "oo-uml",
    "topic": "面向对象语言",
    "stem": "面向对象程序设计语言C++、JAVA中，关键字() 可以用于区分同名的对象属性和局.部变量名。",
    "options": [
      "private",
      "protected",
      "public",
      "this"
    ],
    "answer": 3,
    "explanation": "C++、Java 中用 this 区分同名的成员变量与局部变量。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-038",
    "paper": "2020-11",
    "no": 38,
    "module": "oo-uml",
    "topic": "继承与分类",
    "stem": "采用面向对象方法进行系统开发时，以下与新型冠状病毒有关的对象中，存在“一般-特殊”关系的是（）。",
    "options": [
      "确诊病人和治愈病人",
      "确诊病人和疑似病人",
      "医生和病人",
      "发热病人和确诊病人"
    ],
    "answer": 3,
    "explanation": "面向对象基本概念。面向对象：对象+分类+继承+通过消息的通信对象：属性（数据）+方法（操作）+对象ID 封装：隐藏对象的属性和实现细节,仅对外公开接口（信息隐藏技术）类（实体类/控制类/边界类）：对对象的抽象。接口：一种特殊的类，他只有方法定义没有实现继承与泛化：复用机制消息和消息通信：对象之间进行通信的一种构造叫做消息。消息是异步通信的。重置/覆盖：在子类中重新定义父类中已经定义的方法。重载：一个类可以有多个同名而参数类型不同的方法。动态绑定：根据接收对象的具体情况将请求的操作与实现的方法进行连接（运行时绑定）。多态：不同对象收到同样的消息产生不同的结果。（软设一般只涉及过载多态-同一个名字在不同的上下文中所代表的含义不同）",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-039",
    "paper": "2020-11",
    "no": 39,
    "module": "oo-uml",
    "topic": "设计原则",
    "stem": "进行面向对象系统设计时，针对包中的所有类对于同一类性质的变化。一个变化若对一个包产生影响，则将对该包中的所有类产生影响，而对于其他的包不造成任何影响。这属于 ()设计原则。",
    "options": [
      "共同重用",
      "开放-封闭",
      "接口分离",
      "共同封闭"
    ],
    "answer": 3,
    "explanation": "●共同重用原则:-组接口中应该是共同重用的。如果重用了这组中的一个类，那么就要重用包中的所有的类。相互之间没有紧密联系的类不应该在同一组中。这个原则强调了分类，就具有相同关系或者关联比较紧密的类应该分到一组中，方便修改和客户端的调用。 ●共同封闭原则:包中的所有类对于同一种性质的变化应该是共同封闭的。一个变化若对一个封闭的包产生影响,则将对该包中的所有类产生影响,而对于其他包则不造成任何影响。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-040",
    "paper": "2020-11",
    "no": 40,
    "module": "oo-uml",
    "topic": "多态",
    "stem": "多态有不同的形式，() 的多态是指同一个名字在不同上下文中所代表的含义不同。",
    "options": [
      "参数",
      "包含",
      "过载",
      "强制"
    ],
    "answer": 2,
    "explanation": "多态细分为4类:参数多态、包含多态、过载多态、强制多态，前两种为通用多态，后两种为特定多态。参数多态:采用参数化模板，通过给出不同的类型参数，使得一个结构有多种类型。包含多态:在许多语言中都存在，最常见的例子就是子类型化，即-一个类型是另外一个类型的子类型。-般需要进行运行时的类型检查，属于动态多态。过载多态:同一个名字在不同的上下文中所代表的含义不同。典型的例子是运算符重载和函数重载，属于静态多态强制多态:编译程序通过语义操作，把操作对象的类型强行加以变换，以符合函数或操作符的要求。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-051",
    "paper": "2020-11",
    "no": 51,
    "module": "database",
    "topic": "概念设计",
    "stem": "某高校信息系统设计的分E-R图中，人力部门定义的职工实体具有属性:职工号、姓名、性别和出生日期;教学部门定义的教师实体具有属性:教师号、姓名和职称。这种情况属于(),在合并E-R图时，()解决这一冲突。",
    "options": [
      "属性冲突",
      "命名冲突",
      "结构冲突",
      "实体冲突"
    ],
    "answer": 2,
    "explanation": "属性冲突。同一属性可能会存在于不同的分E-R图,由于设计人员不同或是出发点不同, 对属性的类型、取值范围和数据单位等可能会不一致。命名冲突。相同意义的属性在不同的分E-R图中有着不同的命名,或是名词相同的属性在不同的分E-R图中代表这不同的意义。结构冲突。同-实体在不同的分E-R图中有不同的属性,同-对象在某一分E-R图中被抽象为实体 ,而在另-分E-R图中又被抽象为属性, 需要统一-。本题属于结构冲突没有实体冲突的说法。将局部的E-R图集成为全局E-R图时，可能存在3类冲突。 ●属性冲突:包括类型、取值范围、取值单位的冲突; ●结构冲突:例如同一对象在一个局部E-R图中作为实体，而在另一个局部E-R图中作为属性，同一实体在不同的E-R图中的属性个数和类型不同等， ●命名冲突:包括实体类型名、联系类型名之间异名同义，或同名异义等。",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2020-11-052",
    "paper": "2020-11",
    "no": 52,
    "module": "database",
    "topic": "概念设计",
    "stem": "某高校信息系统设计的分E-R图中，人力部门定义的职工实体具有属性:职工号、姓名、性别和出生日期;教学部门定义的教师实体具有属性:教师号、姓名和职称。这种情况属于(),在合并E-R图时，()解决这一冲突。",
    "options": [
      "职工和教师实体保持各自属性不变",
      "职工实体中加入职称属性，删除教师实体",
      "教师也是学校的职工，故直接将教师实体删除",
      "将教师实体所有属性并入职工实体，删除教师实体"
    ],
    "answer": 1,
    "explanation": "属性冲突。同一属性可能会存在于不同的分E-R图,由于设计人员不同或是出发点不同, 对属性的类型、取值范围和数据单位等可能会不一致。命名冲突。相同意义的属性在不同的分E-R图中有着不同的命名,或是名词相同的属性在不同的分E-R图中代表这不同的意义。结构冲突。同-实体在不同的分E-R图中有不同的属性,同-对象在某一分E-R图中被抽象为实体 ,而在另-分E-R图中又被抽象为属性, 需要统一-。本题属于结构冲突没有实体冲突的说法。将局部的E-R图集成为全局E-R图时，可能存在3类冲突。 ●属性冲突:包括类型、取值范围、取值单位的冲突; ●结构冲突:例如同一对象在一个局部E-R图中作为实体，而在另一个局部E-R图中作为属性，同一实体在不同的E-R图中的属性个数和类型不同等， ●命名冲突:包括实体类型名、联系类型名之间异名同义，或同名异义等。",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2020-11-053",
    "paper": "2020-11",
    "no": 53,
    "module": "database",
    "topic": "规范化",
    "stem": "假设关系R<U,F>,U={A,B,C,D,E},F= {A→BC,AC→D,B→D},那么在关系R中()。",
    "options": [
      "不存在传递依赖，候选关键字A",
      "不存在传递依赖，候选关键字AC",
      "存在传递依赖A→D，候选关键字A",
      "存在传递依赖B→D，候选关键字C"
    ],
    "answer": 2,
    "explanation": "分别用给出各选项给出的候关键字做闭包，如A，A→BC,B→D，包括了全部属性，所以A是候选关键字。{A→BC,B→D}存在传递依赖。传递依赖：A-->B-->C 那么A-->C 部分依赖：学号，课程号确定学生姓名，但是学号也可以直接确定姓名给定一个x的值，能够求出唯一的y值，这就是函数依赖学号-->姓名，但是通过姓名可能会找到两个学号。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-056",
    "paper": "2020-11",
    "no": 56,
    "module": "database",
    "topic": "分布式数据库",
    "stem": "其企业信息系统采用分布式数据库系统。“当某一场地故障时，系统可以使用其他场地上的副本而不至于使整个系统瘫痪”称为分布式数据库的()。",
    "options": [
      "共享性",
      "自治性",
      "可用性",
      "分布性"
    ],
    "answer": 2,
    "explanation": "●可用性是指将数据分布于多个场地，并增加适当的冗余度，当一个场地出了故障不会引起整个系統崩溃，因为故障场地的用户可以通过其它场地进入系统,利用其它数据副本执行操作，不影响，业务的正常运行。 ●自治性是指网络中的每个节点具有独立处理的能力(称为场地自治),可以执行局部应用。同时，每个节点也能通过网络通信子系统执行全局应用。在分布式数据库系统中，应用程序直接使用本节点数据的性质称为自治性共享性是指各节点数据共享；自治性是指每个节点对本地数据都能独立管理。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-057",
    "paper": "2020-11",
    "no": 57,
    "module": "ds-algorithm",
    "topic": "树与哈夫曼",
    "stem": "以下关于Huffman (哈夫曼)树的叙述中，错误的是()。",
    "options": [
      "权值越大的叶子离根结点越近",
      "Huffman(哈夫曼)树中不存在只有一个子树的结点",
      "Huffman(哈夫曼)树中的结点总数一定为奇数",
      "权值相同的结点到树根的路径长度一定相同"
    ],
    "answer": 3,
    "explanation": "哈夫曼树: 1.哈夫曼树中权越大的叶子离根越近 2.具有相同带权结点的哈夫曼树不惟一 3.哈夫曼树的结点的度数为0或2，没有度为1的结点。 4.包含n个叶子结点的哈夫曼树中共有2n-1 个结点。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-058",
    "paper": "2020-11",
    "no": 58,
    "module": "ds-algorithm",
    "topic": "线性表",
    "stem": "通过元素在存储空间中的相对位置来表示数据元素之间的逻辑关系，是()的特点。",
    "options": [
      "顺序存储",
      "链表存储",
      "索引存储",
      "哈希存储"
    ],
    "answer": 0,
    "explanation": "顺序存储是用一组地址连续的存储单元依次存储线性表中的数据元素,从而使得逻辑关系相邻的两个元素在物理位置上也相邻。 ●优点:可以随机存取表中的元素 ●缺点:插入和删除操作需要移动大量的元素。在线性表的顺序存储结构中,第i个元素ai的存储位置为: LOC(ai)=LOC(a1)+(i-1)xL 其中LOC(a1)是表中第一个元素的存储位置，L是表中每个元素所占空间的大小。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-059",
    "paper": "2020-11",
    "no": 59,
    "module": "ds-algorithm",
    "topic": "查找",
    "stem": "在线性表L中进行二分查找，要求L()。",
    "options": [
      "顺序存储，元素随机排列",
      "双向链表存储，元素随机排列",
      "顺序存储，元素有序排列",
      "双向链表存储，元素有序排列"
    ],
    "answer": 2,
    "explanation": "折半查找(二分查找) 先给数据排序，形成有序表，把待查数据值与查找范围的中间元素值进行比较，会有四种情况出现: 1)待查找数值与中间元素值相等，返回中间元素值的索引。 2)待查找数值比中间元素值小，则以整个查找范围的前部分作为新的查找范围，执行 1)，直到找到相等的值。 3)待查找数值比中间元素值大，则以整个查找范围的后半部分作为新的查找范围，执行 1)，直到找到相等的值 4)如果最后找不到相等的值，则返回错误提示信息。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-062",
    "paper": "2020-11",
    "no": 62,
    "module": "ds-algorithm",
    "topic": "排序",
    "stem": "对数组A=(2,8,7,1,3,5,6,4)用快速排序算法的划分方法进行一趟划分后得到的数组A为 ()(非递减排序，以最后一个元素为基准元素)。进行一趟划分的计算时间为()。",
    "options": [
      "(1,2,8,7,3,5,6,4)",
      "(1,2,3,4,8,7,5,6)",
      "(2,3,1,4,7,5,6,8)",
      "(2,1,3,4,8,7,5,6)"
    ],
    "answer": 2,
    "explanation": "取最后一个元素 4 为基准（挖坑填数法）：4 取出后末尾留空位，左指针找到大于 4 的 8 填入末尾空位，右指针找到小于 4 的 3 填入位置 1，左指针再把 7 填入位置 4，右指针把 1 填入位置 2，两指针在位置 3 相遇后填入 4，结果为 (2,3,1,4,7,5,6,8)。",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2020-11-063",
    "paper": "2020-11",
    "no": 63,
    "module": "ds-algorithm",
    "topic": "排序复杂度",
    "stem": "对数组A=(2,8,7,1,3,5,6,4)用快速排序算法的划分方法进行一趟划分后得到的数组A为 ()(非递减排序，以最后一个元素为基准元素)。进行一趟划分的计算时间为()。",
    "options": [
      "O(1)",
      "O(logn)",
      "O(n)",
      "O(nlogn)"
    ],
    "answer": 2,
    "explanation": "一趟划分需要扫描整个数组，时间复杂度为 O(n)。",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2020-11-064",
    "paper": "2020-11",
    "no": 64,
    "module": "ds-algorithm",
    "topic": "图",
    "stem": "某简单无向连通图G的顶点数为n，则图G最少和最多分别有() 条边。",
    "options": [
      "n, n²/2",
      "n-1, n×(n-1)/2",
      "n, n×(n-1)/2",
      "n-1, n²/2"
    ],
    "answer": 1,
    "explanation": "一个无向图 G=(V,E) 是连通的，那么边的数目大于等于顶点的数目减一：|E|>=|V|-1，而反之不成立。如果 G=(V,E) 是有向图，那么它是强连通图的必要条件是边的数目大于等于顶点的数目：|E|>=|V|，而反之不成立。没有回路的无向图是连通的当且仅当它是树，即等价于：|E|=|V|-1。有向完全图:n个顶点的有向图有n(n-1)条边。无向完全图:n个顶点的无向图有n(n-1)/2条边。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-066",
    "paper": "2020-11",
    "no": 66,
    "module": "network",
    "topic": "DHCP",
    "stem": "采用DHCP动态分配IP地址,如果其主机开机后没有得到DHCP服务器的响应，则该主机获取的IP地址属于网络()。",
    "options": [
      "202.117.0.0/24",
      "192.168.1.0/24",
      "172.16.0.0/16",
      "169.254.0.0/16"
    ],
    "answer": 3,
    "explanation": "运行 Windows 系统的计算机无法从 DHCP 服务器中获取动态地址时，它将在 169.254.0.0/16中随机选取一个自动专用IP地址(APIPA)。 169.254.0.0/16 这个是保留的\"link local\"网段，当不能获得DHCP服务时，自动配置的系统被分配这个网段的地址。详细见RFC3927。保留地址用来在系统中做特殊用途的，不会被分配给任何一个企业、组织。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-067",
    "paper": "2020-11",
    "no": 67,
    "module": "network",
    "topic": "域名与 URL",
    "stem": "在浏览器的地址栏中输入 xxxftp.abc.can.cn，在该 URL 中（）是要访问的主机名。",
    "options": [
      "xxxftp",
      "abc",
      "can",
      "cn"
    ],
    "answer": 0,
    "explanation": "1.url= 协议//主机名（包括服务器的计算机名+域名）/路径 https:// www.baidu.com https:// www.baidu.com中的https是协议，www是主机名。就是www, 就是web的主机。 .com是顶级域名，从右向左，每碰到一个“.”,依次表示二级域名，三级域名 2.location.hostname 可设置或返回当前 URL 的主机名",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-068",
    "paper": "2020-11",
    "no": 68,
    "module": "network",
    "topic": "邮件协议",
    "stem": "当收发邮件时，客户与 POP3 服务器之间通过（）建立连接，所使用的端口是（）。",
    "options": [
      "HTTP",
      "TCP",
      "UDP",
      "HTTPS"
    ],
    "answer": 1,
    "explanation": "POP3主要用于支持使用客户端远程管理在服务器上的电子邮件，默认传输协议是TCP, 认端口号110。QQ邮箱的POP3。",
    "group": 2,
    "blank": 1
  },
  {
    "id": "ZR-2020-11-069",
    "paper": "2020-11",
    "no": 69,
    "module": "network",
    "topic": "邮件协议",
    "stem": "当收发邮件时，客户与 POP3 服务器之间通过（）建立连接，所使用的端口是（）。",
    "options": [
      "52",
      "25",
      "1100",
      "110"
    ],
    "answer": 3,
    "explanation": "POP3主要用于支持使用客户端远程管理在服务器上的电子邮件，默认传输协议是TCP, 认端口号110。QQ邮箱的POP3。",
    "group": 2,
    "blank": 2
  },
  {
    "id": "ZR-2020-11-070",
    "paper": "2020-11",
    "no": 70,
    "module": "network",
    "topic": "域名系统",
    "stem": "因特网中的域名系统(DomainNameSystem)是-个分层的域名，在根域下面是顶级域，以下顶级域中，() 属于国家顶级域。",
    "options": [
      "NET",
      "EDU",
      "COM",
      "UK"
    ],
    "answer": 3,
    "explanation": "ABC属于，国际顶级域名英国的全称是大不列颠及北爱尔兰联合王国，又简称英国〔UnitedKingdom，UK〕 英国的顶级域名是.UK这取决于那个国家的域名管理机构是如何定义的。例如 co.uk，这其实就是com.uk的缩写，com代表公司的意思，uk呢就是他们的国家代码相当于用co.uk 意思就是代表英国的公司，我们中国的com.cn 是一个道理。 uk是英国网络的标志,像中国的.com.cn。",
    "group": 1,
    "blank": 0
  },
  {
    "id": "ZR-2020-11-071",
    "paper": "2020-11",
    "no": 71,
    "module": "english",
    "topic": "专业英语",
    "stem": "Regardless of how well designed, constructed, and tested a system or application may be, errors or bugs will inevitably occur. Once a system has been ______(71), it enters operation and support. Systems support is the ongoing technical support for users, as well as the maintenance required to fix any errors, omissions, or new requirements that may arise. Before an information system can be ______(72), it must be in operation. System operation is the day-to-day, week-to-week, month-to-month, and year-to-year ______(73) of an information system's business processes and application programs. Unlike systems analysis, design, and implementation, systems support cannot sensibly be ______(74) into actual phases that a support project must perform. Rather, systems support consists of four ongoing activities that are program maintenance, system recovery, technical support, and system enhancement. Each activity is a type of support project that is ______(75) by a particular problem, event, or opportunity encountered with the implemented system.",
    "options": [
      "designed",
      "implemented",
      "investigated",
      "analyzed"
    ],
    "answer": 1,
    "explanation": "implemented 意为“实现”：系统实现后进入运行与支持阶段。",
    "group": 5,
    "blank": 1
  },
  {
    "id": "ZR-2020-11-072",
    "paper": "2020-11",
    "no": 72,
    "module": "english",
    "topic": "专业英语",
    "stem": "Regardless of how well designed, constructed, and tested a system or application may be, errors or bugs will inevitably occur. Once a system has been ______(71), it enters operation and support. Systems support is the ongoing technical support for users, as well as the maintenance required to fix any errors, omissions, or new requirements that may arise. Before an information system can be ______(72), it must be in operation. System operation is the day-to-day, week-to-week, month-to-month, and year-to-year ______(73) of an information system's business processes and application programs. Unlike systems analysis, design, and implementation, systems support cannot sensibly be ______(74) into actual phases that a support project must perform. Rather, systems support consists of four ongoing activities that are program maintenance, system recovery, technical support, and system enhancement. Each activity is a type of support project that is ______(75) by a particular problem, event, or opportunity encountered with the implemented system.",
    "options": [
      "supported",
      "tested",
      "implemented",
      "constructed"
    ],
    "answer": 0,
    "explanation": "supported 意为“支持”：信息系统必须先投入运行，才能被支持。",
    "group": 5,
    "blank": 2
  },
  {
    "id": "ZR-2020-11-073",
    "paper": "2020-11",
    "no": 73,
    "module": "english",
    "topic": "专业英语",
    "stem": "Regardless of how well designed, constructed, and tested a system or application may be, errors or bugs will inevitably occur. Once a system has been ______(71), it enters operation and support. Systems support is the ongoing technical support for users, as well as the maintenance required to fix any errors, omissions, or new requirements that may arise. Before an information system can be ______(72), it must be in operation. System operation is the day-to-day, week-to-week, month-to-month, and year-to-year ______(73) of an information system's business processes and application programs. Unlike systems analysis, design, and implementation, systems support cannot sensibly be ______(74) into actual phases that a support project must perform. Rather, systems support consists of four ongoing activities that are program maintenance, system recovery, technical support, and system enhancement. Each activity is a type of support project that is ______(75) by a particular problem, event, or opportunity encountered with the implemented system.",
    "options": [
      "construction",
      "maintenance",
      "execution",
      "implementation"
    ],
    "answer": 2,
    "explanation": "execution 意为“执行”：系统运行就是业务过程与应用程序的日常执行。",
    "group": 5,
    "blank": 3
  },
  {
    "id": "ZR-2020-11-074",
    "paper": "2020-11",
    "no": 74,
    "module": "english",
    "topic": "专业英语",
    "stem": "Regardless of how well designed, constructed, and tested a system or application may be, errors or bugs will inevitably occur. Once a system has been ______(71), it enters operation and support. Systems support is the ongoing technical support for users, as well as the maintenance required to fix any errors, omissions, or new requirements that may arise. Before an information system can be ______(72), it must be in operation. System operation is the day-to-day, week-to-week, month-to-month, and year-to-year ______(73) of an information system's business processes and application programs. Unlike systems analysis, design, and implementation, systems support cannot sensibly be ______(74) into actual phases that a support project must perform. Rather, systems support consists of four ongoing activities that are program maintenance, system recovery, technical support, and system enhancement. Each activity is a type of support project that is ______(75) by a particular problem, event, or opportunity encountered with the implemented system.",
    "options": [
      "broke",
      "formed",
      "composed",
      "decomposed"
    ],
    "answer": 3,
    "explanation": "decomposed 意为“分解”：系统支持工作不能简单地分解为若干阶段。",
    "group": 5,
    "blank": 4
  },
  {
    "id": "ZR-2020-11-075",
    "paper": "2020-11",
    "no": 75,
    "module": "english",
    "topic": "专业英语",
    "stem": "Regardless of how well designed, constructed, and tested a system or application may be, errors or bugs will inevitably occur. Once a system has been ______(71), it enters operation and support. Systems support is the ongoing technical support for users, as well as the maintenance required to fix any errors, omissions, or new requirements that may arise. Before an information system can be ______(72), it must be in operation. System operation is the day-to-day, week-to-week, month-to-month, and year-to-year ______(73) of an information system's business processes and application programs. Unlike systems analysis, design, and implementation, systems support cannot sensibly be ______(74) into actual phases that a support project must perform. Rather, systems support consists of four ongoing activities that are program maintenance, system recovery, technical support, and system enhancement. Each activity is a type of support project that is ______(75) by a particular problem, event, or opportunity encountered with the implemented system.",
    "options": [
      "triggered",
      "leaded",
      "caused",
      "produced"
    ],
    "answer": 0,
    "explanation": "triggered 意为“触发”：每项支持活动由具体问题、事件或机会触发。",
    "group": 5,
    "blank": 5
  }
]);
})(window.RK);
