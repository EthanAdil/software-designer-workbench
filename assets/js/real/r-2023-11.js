/* ==========================================================================
 * r-2023-11.js
 * 2023 年下半年 上午卷真题（可核对子集，单源：人人文库全文版）
 * 来源页仅可见 1-32 题，第 33 题截断、34-75 题不可见，按项目口径不猜题。
 * ========================================================================== */
(function (RK) {
  RK.real.registerPaper({
    key: '2023-11', year: 2023, half: '下半年', label: '2023 年下半年',
    exam: '软件设计师（中级）· 上午卷（综合知识）', paperType: 'morning',
    total: 75, included: 32,
    absent: '第 33 题选项与答案截断；第 34—75 题来源页不可见，公开检索未找到完整可校对题面。',
    excluded: '',
    source: 'https://m.renrendoc.com/paper/395586491.html',
    sourceLabel: '人人文库（全文版）',
    answerSource: '人人文库（全文版）',
    answerSourceUrl: 'https://m.renrendoc.com/paper/395586491.html',
    explanationSource: '人人文库解析整理（含教材页码引用）',
    verified: 'single-source', pending: false,
    sourceNote: '题面、答案、解析同源于人人文库 DOCX 文字版，题号 1-32 连续且与 51CTO 公开卷题位交叉吻合；单源未逐题双源复核，标注「单源」。第 33 题后来源截断，不录入。'
  });

  var S = 'https://m.renrendoc.com/paper/395586491.html';
  RK.real.register([
    { id:'ZR-2023-11-001', paper:'2023-11', no:1, module:'ds-algorithm', topic:'链表', stem:'线性表采用链表存储结构的特点中不包括（1）。', options:['所需空间大小与表长成正比','可随机访问表中的任一元素','插入和删除操作不需要移动元素','无须事先估计存储空间大小'], answer:1, explanation:'参考答案 B：链表不能随机访问，需从头指针顺序查找。', group:1, blank:0 },
    { id:'ZR-2023-11-002', paper:'2023-11', no:2, module:'computer-system', topic:'多核处理器', stem:'在双核处理器中，双核是指（2）。', options:['执行程序时有两条指令流水线并行工作','在一个 CPU 中集成两个运算核心以提高运算能力','利用超线程技术实现的多任务并行处理','在主板上设置两个独立的 CPU 以提高处理能力'], answer:1, explanation:'参考答案 B：双核是在一个 CPU 内集成两个运算核心。', group:1, blank:0 },
    { id:'ZR-2023-11-003', paper:'2023-11', no:3, module:'ds-algorithm', topic:'贪心算法', stem:'采用贪心策略求解（3）问题，一定可以得到最优解。', options:['分数背包','0-1 背包','旅行商','最长公共子序列'], answer:0, explanation:'参考答案 A：分数背包可用贪心（按单位价值排序）得到最优解。', group:1, blank:0 },
    { id:'ZR-2023-11-004', paper:'2023-11', no:4, module:'software-engineering', topic:'统一过程', stem:'统一过程模型的四个阶段中，在（4）阶段进行需求分析和架构演进。', options:['移交','精化','构建','起始'], answer:1, explanation:'参考答案 B：精化阶段进行需求分析和架构演进。', group:1, blank:0 },
    { id:'ZR-2023-11-005', paper:'2023-11', no:5, module:'security', topic:'安全协议', stem:'下列协议中，不属于安全协议的是（5）。', options:['IPsec','SNMP','SFTP','HTTPS'], answer:1, explanation:'参考答案 B：SNMP 早期版本无安全设计，其余均为安全协议。', group:1, blank:0 },
    { id:'ZR-2023-11-006', paper:'2023-11', no:6, module:'programming-language', topic:'汇编语言', stem:'以下关于汇编语言程序的叙述中，错误的是（6）。', options:['汇编程序的功能是将汇编语言源程序翻译为相应的目标程序','用汇编语言编写的程序可以直接被计算机硬件执行','汇编语言是低级程序设计语言','汇编语言与计算机硬件体系结构密切相关'], answer:1, explanation:'参考答案 B：汇编程序须经汇编翻译为机器语言后才能执行。', group:1, blank:0 },
    { id:'ZR-2023-11-007', paper:'2023-11', no:7, module:'programming-language', topic:'重载与覆盖', stem:'以下关于方法重载（Overload）和方法覆盖（Override）与多态的关系的叙述中，不正确的是（7）。', options:['覆盖通过动态绑定机制实现多态','重载通过动态绑定机制实现多态','重载属于编译时多态，在一个类中定义多个名称相同而参数表不同的方法','覆盖属于运行时多态，子类重新定义父类中已定义的方法'], answer:1, explanation:'参考答案 B：重载是静态（编译时）绑定，不是动态绑定。', group:1, blank:0 },
    { id:'ZR-2023-11-008', paper:'2023-11', no:8, module:'software-engineering', topic:'白盒测试', stem:'以下关于白盒测试原则的叙述中，不正确的是（8）。', options:['在所有的逻辑判断中，取“真”和取“假”的两种情况至少都能执行一次','程序模块中的所有独立路径至少执行一次','每个循环都应在边界条件和一般条件下各执行一次','在输入条件规定的取值范围的情况下，合理的输入和不合理的输入至少都能执行一次'], answer:3, explanation:'参考答案 D：合理/不合理输入属黑盒测试原则，非白盒测试。', group:1, blank:0 },
    { id:'ZR-2023-11-009', paper:'2023-11', no:9, module:'oo-uml', topic:'面向对象测试层次', stem:'对采用面向对象方法开发的系统进行测试时，对类中定义的每个方法进行测试属于（9）层。', options:['系统','算法','类','模板'], answer:1, explanation:'参考答案 B：算法层测试类中定义的每个方法。', group:1, blank:0 },
    { id:'ZR-2023-11-010', paper:'2023-11', no:10, module:'security', topic:'公开密钥加密', stem:'下列算法中，不属于公开密钥加密算法的是（10）。', options:['DSA','ECC','DES','RSA'], answer:2, explanation:'参考答案 C：DES 是对称加密算法。', group:1, blank:0 },
    { id:'ZR-2023-11-011', paper:'2023-11', no:11, module:'network', topic:'POP3 端口', stem:'POP3 服务默认的 TCP 端口号是（11）。', options:['110','25','20','80'], answer:0, explanation:'参考答案 A：POP3 默认端口 110。', group:1, blank:0 },
    { id:'ZR-2023-11-012', paper:'2023-11', no:12, module:'ds-algorithm', topic:'折半查找', stem:'以下关于折半查找的叙述中，不正确的是（12）。', options:['是一个分治算法','只能应用于有序表','查找成功和不成功的平均查找长度是一样的','若表长为 n，时间复杂度为 O(logn)'], answer:2, explanation:'参考答案 C：折半查找成功与不成功的平均查找长度不一定相同。', group:1, blank:0 },
    { id:'ZR-2023-11-013', paper:'2023-11', no:13, module:'ds-algorithm', topic:'折半查找 ASL', stem:'采用折半查找等概率查找某个包含 8 个元素的有序表，查找成功的平均查找长度为（13）。', options:['9/8','1/8','20/8','21/8'], answer:3, explanation:'参考答案 D：判定树各层命中次数 (1+2×2+3×4+4)/8=21/8。', group:1, blank:0 },
    { id:'ZR-2023-11-014', paper:'2023-11', no:14, module:'os', topic:'位示图', stem:'某文件管理系统在磁盘上建立了位示图（bitmap）记录磁盘的使用情况。若计算机系统的字长为 128 位，磁盘容量为 1024GB，物理块大小为 8MB，那么该位示图的大小为（14）个字。', options:['4096','1024','2048','4098'], answer:1, explanation:'参考答案 B：物理块数 1024GB/8MB=131072，每字 128 位，需 131072/128=1024 字。', group:1, blank:0 },
    { id:'ZR-2023-11-015', paper:'2023-11', no:15, module:'software-engineering', topic:'项目估算', stem:'在项目开发过程中，（15）不属于项目估算的主要因素。', options:['规模','类型','成本','工作量'], answer:1, explanation:'参考答案 B：项目估算主要考虑规模、工作量、成本等，不含类型。', group:1, blank:0 },
    { id:'ZR-2023-11-016', paper:'2023-11', no:16, module:'programming-language', topic:'Python 列表', stem:'执行以下 Python 语句之后，列表 x 为（16）。x=[1,2,3]；x.append([4,5])', options:['[1,2,3,4,5]','[1,2,3]','[4,5]','[1,2,3,[4,5]]'], answer:3, explanation:'参考答案 D：append 把整个列表作为单个元素追加。', group:1, blank:0 },
    { id:'ZR-2023-11-017', paper:'2023-11', no:17, module:'security', topic:'防火墙功能', stem:'防火墙不具备（17）功能。', options:['病毒防治','状态检测','代理','包过滤'], answer:0, explanation:'参考答案 A：病毒防治由防病毒软件完成，防火墙不查杀病毒。', group:1, blank:0 },
    { id:'ZR-2023-11-018', paper:'2023-11', no:18, module:'ds-algorithm', topic:'哈夫曼树', stem:'一棵哈夫曼树共有 127 个结点，对其进行哈夫曼编码，共能得到（18）个字符的编码。', options:['64','127','63','126'], answer:0, explanation:'参考答案 A：哈夫曼树结点数=2n−1，127=2n−1 得 n=64 个叶子（字符）。', group:1, blank:0 },
    { id:'ZR-2023-11-019', paper:'2023-11', no:19, module:'computer-system', topic:'浮点运算', stem:'浮点加（减）法运算的操作要素：①零操作数检查 ②规格化及舍入处理 ③尾数加（减）运算 ④对阶操作。正确的加（减）法操作流程是（19）。', options:['①③④②','①④③②','②①④③','④③②①'], answer:1, explanation:'参考答案 B：顺序为零操作数检查→对阶→尾数加减→规格化及舍入。', group:1, blank:0 },
    { id:'ZR-2023-11-020', paper:'2023-11', no:20, module:'ds-algorithm', topic:'双端队列', stem:'某队列允许在其两端进行入队操作，但仅允许在一端进行出队操作。若元素 a、b、c、d 依次全部入队列之后进行出队列操作，则不能得到的出队序列是（20）。', options:['dbac','cabd','acdb','bacd'], answer:2, explanation:'参考答案 C：按两端入一端出的约束，acdb 无法构造。', group:1, blank:0 },
    { id:'ZR-2023-11-021', paper:'2023-11', no:21, module:'software-engineering', topic:'基于构件开发', stem:'以下关于基于构件的开发模型的叙述中，不正确的是（21）。', options:['本质上是演进模型，以迭代方式构建软件','必须采用面向对象开发技术','采用预先打包的软件构件构造软件','构件可以是组织内部开发的，也可以是商品化成品软件构件'], answer:1, explanation:'参考答案 B：基于构件开发不强制采用面向对象技术。', group:1, blank:0 },
    { id:'ZR-2023-11-022', paper:'2023-11', no:22, module:'programming-language', topic:'C/C++ 局部变量', stem:'在 C/C++ 程序中，对于函数中定义的非静态局部变量，其存储空间在（22）分配。', options:['栈区','静态数据区','文本区','自由堆区'], answer:0, explanation:'参考答案 A：非静态局部变量在栈区分配。', group:1, blank:0 },
    { id:'ZR-2023-11-023', paper:'2023-11', no:23, module:'software-engineering', topic:'测试原则', stem:'以下关于测试原则的叙述中，不正确的是（23）。', options:['充分注意测试中的群集现象','设计测试用例时，应包括合理的输入条件和不合理的输入条件','应该由程序员测试自己编写的程序','严格执行测试计划，避免测试的随意性'], answer:2, explanation:'参考答案 C：测试应避免由原开发人员承担。', group:1, blank:0 },
    { id:'ZR-2023-11-024', paper:'2023-11', no:24, module:'computer-system', topic:'I/O 控制方式', stem:'在微型计算机中，管理键盘最适合采用的 I/O 控制方式是（24）方式。', options:['DMA','无条件传送','程序查询','中断'], answer:3, explanation:'参考答案 D：键盘是慢速随机事件设备，适合中断方式。', group:1, blank:0 },
    { id:'ZR-2023-11-025', paper:'2023-11', no:25, module:'ds-algorithm', topic:'二叉树遍历', stem:'当一棵非空二叉树的（25）时，对该二叉树进行中序遍历和后序遍历所得的序列相同。', options:['每个非叶子结点都只有左子树','每个非叶子结点都只有右子树','每个非叶子结点的度都为 1','每个非叶子结点的度都为 2'], answer:0, explanation:'参考答案 A：只有左子树时中序与后序序列相同。', group:1, blank:0 },
    { id:'ZR-2023-11-026', paper:'2023-11', no:26, module:'software-engineering', topic:'甘特图', stem:'以下关于甘特图的叙述中，不正确的是（26）。', options:['一种进度管理的工具','易于看出每个子任务的持续时间','易于看出目前项目的实际进度情况','易于看出子任务之间的衔接关系'], answer:3, explanation:'参考答案 D：甘特图难以清晰反映任务间的依赖（衔接）关系。', group:1, blank:0 },
    { id:'ZR-2023-11-027', paper:'2023-11', no:27, module:'software-engineering', topic:'软件工程标准化', stem:'以下关于软件工程标准化的叙述中，不正确的是（27）。', options:['可以提高开发人员之间的沟通效率','有助于提高管理水平','有助于提高软件产品质量','可以提高每一位开发人员的开发技能'], answer:3, explanation:'参考答案 D：标准化提升质量与效率，但不直接提高个人开发技能。', group:1, blank:0 },
    { id:'ZR-2023-11-028', paper:'2023-11', no:28, module:'database', topic:'三级模式', stem:'数据库的基本表、存储文件和视图的结构分别对应（28）。', options:['用户视图、内部视图和概念视图','用户视图、概念视图和内部视图','概念视图、用户视图和内部视图','概念视图、内部视图和用户视图'], answer:3, explanation:'参考答案 D：基本表对应概念模式，存储文件对应内模式，视图对应外模式（用户视图）。', group:1, blank:0 },
    { id:'ZR-2023-11-029', paper:'2023-11', no:29, module:'oo-uml', topic:'装饰模式', stem:'（29）模式可以给对象动态地添加一些额外的职责，而不改变该对象的结构。', options:['装饰（Decorator）','外观（Facade）','组合（Composite）','享元（Flyweight）'], answer:0, explanation:'参考答案 A：装饰模式动态附加职责、不改变对象结构。', group:1, blank:0 },
    { id:'ZR-2023-11-030', paper:'2023-11', no:30, module:'database', topic:'事务', stem:'在 SQL 中，结束事务通常可以使用 COMMIT 和 ROLLBACK 语句。若某事务 T 执行了（30）。', options:['ROLLBACK 语句，则可将 T 对数据库的更新撤销','ROLLBACK 语句，则可将 T 对数据库的更新写入数据库','COMMIT 语句，则 T 对数据库影响可用 ROLLBACK 语句来撤销','ROLLBACK 语句，则表示 T 已正确地执行完毕'], answer:0, explanation:'参考答案 A：ROLLBACK 撤销事务内所有更新。', group:1, blank:0 },
    { id:'ZR-2023-11-031', paper:'2023-11', no:31, module:'security', topic:'报文摘要', stem:'利用报文摘要算法生成报文摘要的目的是（31）。', options:['防止发送的报文被篡改','对传输数据进行加密，防止数据被窃听','验证通信对方的身份，防止假冒','防止发送方否认发送过的数据'], answer:0, explanation:'参考答案 A：报文摘要用于保证完整性、防止篡改。', group:1, blank:0 },
    { id:'ZR-2023-11-032', paper:'2023-11', no:32, module:'ds-algorithm', topic:'冒泡排序', stem:'采用冒泡排序算法对序列 (49,38,65,97,76,13,27,49) 进行非降序排序，两趟后的序列为（32）。', options:['(49,38,65,13,27,49,76,97)','(38,49,65,76,13,27,49,97)','(38,49,65,13,27,49,76,97)','(49,38,65,97,76,13,27,49)'], answer:2, explanation:'参考答案 C：逐趟把最大值交换到位，两趟后为 (38,49,65,13,27,49,76,97)。', group:1, blank:0 }
  ].map(function (q) {
    q.source = q.source || '人人文库（全文版）';
    q.sourceUrl = q.sourceUrl || S;
    q.answerSource = q.answerSource || '人人文库（全文版）';
    q.answerSourceUrl = q.answerSourceUrl || S;
    q.explanationSource = q.explanationSource || '人人文库解析整理（含教材页码引用）';
    q.verified = q.verified || 'single-source';
    return q;
  }));
})(window.RK);
