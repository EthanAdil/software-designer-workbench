/* ==========================================================================
 * r-2022-05.js
 * 2022 年上半年 上午卷真题（可核对子集，单源：人人文库 + 希赛/CSDN 交叉校选项）
 * 来源页仅 1-30 题可见，第 31-75 题公开来源无完整可校对题面，按口径不猜题。
 * ========================================================================== */
(function (RK) {
  RK.real.registerPaper({
    key: '2022-05', year: 2022, half: '上半年', label: '2022 年上半年',
    exam: '软件设计师（中级）· 上午卷（综合知识）', paperType: 'morning',
    total: 75, included: 30,
    absent: '第 35—75 题来源页不可见，公开检索未找到完整可校对题面/答案。',
    excluded: '第 5 题依赖系统结构图；第 11 题来源答案与解析矛盾（防御 SQL 注入应为部署 IDS 而非 WAF）；第 28 题答案与按题干数据推导结果不符；第 31 题来源无解析。共 4 题未录入（第 35—75 见 absent）。',
    source: 'https://m.renrendoc.com/paper/395586433.html',
    sourceLabel: '人人文库（全文版）',
    answerSource: '人人文库（全文版）',
    answerSourceUrl: 'https://m.renrendoc.com/paper/395586433.html',
    explanationSource: '人人文库解析 + CSDN/希赛交叉校订（自编推导）',
    verified: 'single-source', pending: false,
    sourceNote: '题面/答案/解析主要来自人人文库 DOCX 文字版，题号 1-30 连续，与希赛分段题面交叉核对一致；第 2、5 题选项按希赛/CSDN 原文修正转写错误。2026-11-26 按本地 PDF `docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf` 补入第 30、32、33、34 题（题面、答案、解析齐全）；第 31 题该 PDF 无解析故不录入。单源标注；第 35-75 无完整来源，不录入。'
  });

  var S = 'https://m.renrendoc.com/paper/395586433.html';
  RK.real.register([
    { id:'ZR-2022-05-001', paper:'2022-05', no:1, module:'computer-system', topic:'冯诺依曼结构', stem:'以下关于冯诺依曼计算机的叙述中，不正确的是（1）。', options:['程序指令和数据都采用二进制表示','程序指令总是存储在主存中，而数据则存储在高速缓存中','程序的功能都由中央处理器（CPU）执行指令来实现','程序的执行过程由指令进行自动控制'], answer:1, explanation:'参考答案 B：冯诺依曼结构中指令与数据存放在同一存储器。', group:1, blank:0 },
    { id:'ZR-2022-05-002', paper:'2022-05', no:2, module:'computer-system', topic:'SRAM 与 DRAM', stem:'以下关于 SRAM 和 DRAM 存储器的叙述中正确的是（2）。', options:['与 DRAM 相比，SRAM 集成率低，功率大、不需要动态刷新','与 DRAM 相比，SRAM 集成率高，功率小、需要动态刷新','与 SRAM 相比，DRAM 集成率高，功率大、不需要动态刷新','与 SRAM 相比，DRAM 集成率高，功率大、需要动态刷新'], answer:3, explanation:'参考答案 D：DRAM 集成率高、功耗大、需周期刷新；选项按 CSDN/希赛原文修正了来源转写错误。', group:1, blank:0 },
    { id:'ZR-2022-05-003', paper:'2022-05', no:3, module:'computer-system', topic:'中断现场保护', stem:'为了实现多级中断，保存程序现场信息最有效的方法是使用（3）。', options:['通用寄存器','累加器','堆栈','程序计数器'], answer:2, explanation:'参考答案 C：堆栈的后进先出特性适合保存/恢复多级中断的现场。', group:1, blank:0 },
    { id:'ZR-2022-05-004', paper:'2022-05', no:4, module:'computer-system', topic:'RISC 与 CISC', stem:'以下关于 RISC 和 CISC 的叙述中，不正确的是（4）。', options:['RISC 的大多指令在一个时钟周期内完成','RISC 普遍采用微程序控制器，CISC 则普遍采用硬布线控制器','RISC 的指令种类和寻址方式相对于 CISC 更少','RISC 和 CISC 都采用流水线技术'], answer:1, explanation:'参考答案 B：RISC 用硬布线、CISC 用微程序控制，该选项说反了。', group:1, blank:0 },
    { id:'ZR-2022-05-006', paper:'2022-05', no:6, module:'computer-system', topic:'异步传输', stem:'以下信息交换情形中，采用异步传输方式的是（6）。', options:['CPU 与内存储器之间交换信息','CPU 与 PCI 总线交换信息','CPU 与 I/O 接口交换信息','I/O 接口与打印设备间交换'], answer:2, explanation:'参考答案 C：CPU 与 I/O 接口间为异步传输，靠应答信号协调。', group:1, blank:0 },
    { id:'ZR-2022-05-007', paper:'2022-05', no:7, module:'security', topic:'安全文件传输', stem:'下列协议中，可以用于文件安全传输的是（7）。', options:['FTP','SFTP','TFTP','ICMP'], answer:1, explanation:'参考答案 B：SFTP 基于 SSH 提供加密通道；FTP/TFTP 明文，ICMP 非文件传输协议。', group:1, blank:0 },
    { id:'ZR-2022-05-008', paper:'2022-05', no:8, module:'security', topic:'计算机病毒', stem:'下列不属于计算机病毒的是（8）。', options:['永恒之蓝','蠕虫','特洛伊木马','DDOS'], answer:3, explanation:'参考答案 D：DDoS 是拒绝服务攻击，不是计算机病毒；其余均为恶意程序。', group:1, blank:0 },
    { id:'ZR-2022-05-009', paper:'2022-05', no:9, module:'security', topic:'杀毒软件', stem:'以下关于杀毒软件的描述中，错误的是（9）。', options:['应当为计算机安装杀毒软件并及时更新病毒库','安装杀毒软件可以有效防止蠕虫病毒','安装杀毒软件可以有效防止网站信息被篡改','服务器操作系统也需要安装杀毒软件'], answer:2, explanation:'参考答案 C：网站信息被篡改需靠 Web 防护/完整性保护，非杀毒软件能力。', group:1, blank:0 },
    { id:'ZR-2022-05-010', paper:'2022-05', no:10, module:'security', topic:'访问控制列表', stem:'通过在出口防火墙上配置（10）功能可以阻止外部未授权用户访问内部网络。', options:['ACL','SNAT','入侵检测','防病毒'], answer:0, explanation:'参考答案 A：ACL 基于包过滤规则允许或丢弃报文，实现访问控制。', group:1, blank:0 },
    { id:'ZR-2022-05-012', paper:'2022-05', no:12, module:'standard-law', topic:'专利申请权', stem:'甲乙丙三者分别就相同内容的发明创造，先后向专利管理部门提出申请，（12）可以获得专利申请权。', options:['甲乙丙均','先申请者','先使用者','先发明者'], answer:1, explanation:'参考答案 B：我国专利采用先申请原则，专利权授予最先申请人。', group:1, blank:0 },
    { id:'ZR-2022-05-013', paper:'2022-05', no:13, module:'standard-law', topic:'知识产权保护期', stem:'（13）的保护期是可以延长的。', options:['著作权','专利权','商标权','商业秘密权'], answer:2, explanation:'参考答案 C：商标权可通过续展注册延长保护期。', group:1, blank:0 },
    { id:'ZR-2022-05-014', paper:'2022-05', no:14, module:'software-engineering', topic:'边界值分析', stem:'针对月收入小于等于 3500 元免征个人所得税的需求，分别输入 3499、3500 和 3501 进行测试，则采用的测试方法是（14）。', options:['判定覆盖','边界值分析','路径覆盖','因果图'], answer:1, explanation:'参考答案 B：取边界点及其两侧邻近值测试，属边界值分析。', group:1, blank:0 },
    { id:'ZR-2022-05-015', paper:'2022-05', no:15, module:'software-engineering', topic:'软件维护', stem:'以下关于软件维护的叙述中，正确的是（15）。', options:['工作量相对于软件开发而言要小很多','成本相对于软件开发而言要更低','时间相对于软件开发而言通常更长','只对软件代码进行修改的行为'], answer:2, explanation:'参考答案 C：维护贯穿软件整个使用期，持续时间通常长于开发。', group:1, blank:0 },
    { id:'ZR-2022-05-016', paper:'2022-05', no:16, module:'programming-language', topic:'动态绑定', stem:'在运行时将调用和响应调用所需执行的代码加以结合的机制是（16）。', options:['强类型','弱类型','静态绑定','动态绑定'], answer:3, explanation:'参考答案 D：运行时确定调用与代码对应关系即动态绑定。', group:1, blank:0 },
    { id:'ZR-2022-05-017', paper:'2022-05', no:17, module:'software-engineering', topic:'无环依赖原则', stem:'进行面向对象系统设计时，在包的依赖关系图中不允许存在环，这属于（17）原则。', options:['单一责任','无环依赖','依赖倒置','里氏替换'], answer:1, explanation:'参考答案 B：包之间依赖不能成环，即无环依赖原则。', group:1, blank:0 },
    { id:'ZR-2022-05-018', paper:'2022-05', no:18, module:'oo-uml', topic:'OOA 活动', stem:'面向对象分析的第一项活动是（18）。', options:['组织对象','描述对象间的相互作用','认定对象','确定对象的操作'], answer:2, explanation:'参考答案 C：面向对象分析首先认定（识别）对象。', group:1, blank:0 },
    { id:'ZR-2022-05-019', paper:'2022-05', no:19, module:'oo-uml', topic:'面向对象程序设计语言', stem:'面向对象程序设计语言为面向对象（19）。', options:['用例设计','分析','需求分析','实现'], answer:3, explanation:'参考答案 D：OOP 是面向对象的实现阶段（编程）。', group:1, blank:0 },
    { id:'ZR-2022-05-020', paper:'2022-05', no:20, module:'programming-language', topic:'pip 命令', stem:'用 pip 安装 numpy 模块的命令为（20）。', options:['pip numpy','pip install numpy','install numpy','import num'], answer:1, explanation:'参考答案 B：pip 安装包的命令格式为 pip install 包名。', group:1, blank:0 },
    { id:'ZR-2022-05-021', paper:'2022-05', no:21, module:'programming-language', topic:'Python 列表运算', stem:'某 Python 程序中定义了 X=[1,2]，那么 X*2 的值为（21）。', options:['[1,2,1,2]','[1,1,2,2]','[2,4]','出错'], answer:0, explanation:'参考答案 A：列表与整数相乘表示重复该列表元素序列。', group:1, blank:0 },
    { id:'ZR-2022-05-022', paper:'2022-05', no:22, module:'programming-language', topic:'Python 元组', stem:'在 Python 语言中，（22）是一种不可变的、有序的序列结构，其中元素可以重复。', options:['tuple（元组）','dict（字典）','list（列表）','set（集合）'], answer:0, explanation:'参考答案 A：元组不可变且有序、元素可重复；列表可变，集合无序。', group:1, blank:0 },
    { id:'ZR-2022-05-023', paper:'2022-05', no:23, module:'database', topic:'数据字典与视图', stem:'数据库中的视图是一个虚拟表。若设计师为 user 表创建一个 user1 视图，那数据字典中保存的是（23）。', options:['user1 查询语句','user1 视图定义','user1 查询结果','所引用的基本表'], answer:1, explanation:'参考答案 B：数据字典保存视图的定义（含其查询），不保存查询结果。', group:1, blank:0 },
    { id:'ZR-2022-05-024', paper:'2022-05', no:24, module:'database', topic:'自然连接', stem:'给定关系 R(A,B,C,D) 和关系 S(A,D,E,F)，对这两个关系进行自然连接运算后的属性列有（24）个。', options:['4','5','6','8'], answer:2, explanation:'参考答案 C：4+4−2（同名列 A、D 各去重一次）=6 列。', group:1, blank:0 },
    { id:'ZR-2022-05-025', paper:'2022-05', no:25, module:'database', topic:'关系代数等价', stem:'关系代数表达式 σR.B>S.F(R⋈S) 与（25）等价。', options:['σ2>8(R×S)','Π1,2,3,4,7,8(σ1=5∧2>8∧4=6(R×S))','σ"2">"8"(R×S)','Π1,2,3,4,7,8(σ1=5∧"2">"8"∧4=6(R×S))'], answer:1, explanation:'参考答案 B：需在笛卡尔积上附加同名列相等条件并投影出去重后的 6 列。', group:1, blank:0 },
    { id:'ZR-2022-05-026', paper:'2022-05', no:26, module:'ds-algorithm', topic:'散列表', stem:'以下关于散列表（哈希表）及其查找特点的叙述中，正确的是（26）。', options:['在散列表中进行查找时，只需要与待查找关键字及其同义词进行比较','只要散列表的装填因子不大于 1/2，就能避免冲突','用线性探测法解决冲突容易产生聚集问题','用链地址法解决冲突可确保平均查找长度为 1'], answer:2, explanation:'参考答案 C：线性探测会使冲突元素聚集，降低查找效率。', group:1, blank:0 },
    { id:'ZR-2022-05-027', paper:'2022-05', no:27, module:'ds-algorithm', topic:'折半查找判定树', stem:'对长度为 n 的有序顺序表进行折半查找的过程可用一棵判定树表示，该判定树的形态符合（27）的特点。', options:['最优二叉树（即哈夫曼树）','平衡二叉树','完全二叉树','最小生成树'], answer:1, explanation:'参考答案 B：每次取中间元素划分，判定树左右子树高度接近，是平衡二叉树。', group:1, blank:0 },
    { id:'ZR-2022-05-029', paper:'2022-05', no:29, module:'ds-algorithm', topic:'排序稳定性', stem:'排序算法的稳定性是指将待排序列排序后，能确保排序码中的相对位置保持不变。（29）是稳定的排序算法。', options:['冒泡排序','快速排序','堆排序','简单选择排序'], answer:0, explanation:'参考答案 A：冒泡排序稳定；快速、堆、简单选择排序均不稳定。', group:1, blank:0 },
    { id:'ZR-2022-05-030', paper:'2022-05', no:30, module:'ds-algorithm', topic:'邻接表与有向图', stem:'某图 G 的邻接表中共有奇数个表示边的表结点，则图 G（30）。', options:['有奇数个顶点','有偶数个顶点','是无向图','是有向图'], answer:3, explanation:'无向图中每条边在两个端点的邻接表中各出现一次，边表结点数为偶数；有奇数个边表结点只能是有向图。顶点数奇偶无法由边数确定。', source:'docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf', answerSource:'docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf', explanationSource:'docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf', verified:'single-source', group:1, blank:0 },
    { id:'ZR-2022-05-032', paper:'2022-05', no:32, module:'network', topic:'远程登录协议', stem:'在 TCP/IP 协议栈中，远程登录采用的协议为（32）。', options:['HTTP','TELNET','SMTP','FTP'], answer:1, explanation:'TELNET 是远程登录服务的标准协议；HTTP 用于网页传输，SMTP 用于邮件发送，FTP 用于文件传输。', source:'docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf', answerSource:'docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf', explanationSource:'docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf', verified:'single-source', group:1, blank:0 },
    { id:'ZR-2022-05-033', paper:'2022-05', no:33, module:'network', topic:'无痕浏览', stem:'浏览器开启无痕浏览模式时，（33）仍然会被保存。', options:['浏览历史','搜索历史','下载的文件','临时文件'], answer:2, explanation:'无痕模式不保存浏览历史、搜索历史与临时文件；用户主动下载的文件会保留在磁盘上。', source:'docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf', answerSource:'docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf', explanationSource:'docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf', verified:'single-source', group:1, blank:0 },
    { id:'ZR-2022-05-034', paper:'2022-05', no:34, module:'network', topic:'电子邮件协议', stem:'下列不属于电子邮件收发协议的是（34）。', options:['SMTP','POP3','IMAP','FTP'], answer:3, explanation:'SMTP 用于发送邮件，POP3 与 IMAP 用于接收和访问邮件；FTP 是文件传输协议，不属于电子邮件收发协议。', source:'docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf', answerSource:'docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf', explanationSource:'docs/真题/2009-2023真题答案解析/2022年05月软件设计师上午真题及答案解析.pdf', verified:'single-source', group:1, blank:0 }
  ].map(function (q) {
    q.source = q.source || '人人文库（全文版）';
    q.sourceUrl = q.sourceUrl || S;
    q.answerSource = q.answerSource || '人人文库（全文版）';
    q.answerSourceUrl = q.answerSourceUrl || S;
    q.explanationSource = q.explanationSource || '人人文库解析 + CSDN/希赛交叉校订（自编推导）';
    q.verified = q.verified || 'single-source';
    return q;
  }));
})(window.RK);
