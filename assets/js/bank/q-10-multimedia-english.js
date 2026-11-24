/* 多媒体基础（10 题）+ 专业英语（5 篇 × 5 空 = 25 题） */
(function (RK) {
  var passage1 =
    'Software engineering is the application of a systematic, disciplined, quantifiable approach to the development, operation and maintenance of software. ' +
    'A software process model provides a (1)______ for the activities required to build a software product. ' +
    'The waterfall model follows a strictly sequential flow, which works well when requirements are (2)______ at the beginning of the project. ' +
    'In contrast, iterative and incremental models deliver software in small releases and allow requirements to (3)______ over time. ' +
    'Regardless of which model is chosen, (4)______ management is essential to control changes to the software configuration. ' +
    'Before release, a final (5)______ test is performed by the customer to decide whether the software meets the agreed requirements.';

  var passage2 =
    'A database management system provides concurrency control so that multiple transactions can execute simultaneously without (1)______ with each other. ' +
    'The ACID properties guarantee that every transaction is processed reliably. ' +
    'An index is a data structure that improves the speed of data (2)______ operations at the cost of additional writes and storage space. ' +
    'Normalization reduces data (3)______ by organizing attributes into well-structured relations. ' +
    'When a query joins several tables, the optimizer chooses an execution plan based on (4)______ statistics. ' +
    'To protect the data, an administrator can (5)______ different privileges to different users.';

  var passage3 =
    'The Transmission Control Protocol provides a reliable, connection-oriented service on top of the unreliable network layer. ' +
    'Before data can be exchanged, a three-way handshake is performed to (1)______ the sequence numbers of the two hosts. ' +
    'TCP also implements flow control with a sliding window, so that a fast sender cannot (2)______ a slow receiver. ' +
    'When a segment is lost, the sender retransmits it after a timeout or after receiving duplicate acknowledgements. ' +
    'Congestion control is a different mechanism: the congestion window grows slowly at first and is (3)______ when the network becomes congested. ' +
    'Routers forward packets according to their routing tables, and a routing protocol such as OSPF exchanges (4)______ information so that each router can build a complete map of the network. ' +
    'Finally, the Domain Name System translates human-readable names into IP addresses, which makes the network (5)______ to end users.';

  var passage4 =
    'An operating system manages the hardware resources of a computer and provides a convenient interface for application programs. ' +
    'A process is a program in (1)______, and the operating system records its state, registers and resources in a process control block. ' +
    'Modern systems often support threads, which share the address space of their parent process but keep their own stack and program counter, so context switching between threads is (2)______ than between processes. ' +
    'Virtual memory lets a program larger than physical memory run by keeping only active pages in memory. ' +
    'When a page is missing, a page fault occurs and the operating system must (3)______ it from disk. ' +
    'The replacement policy decides which page to evict; the least recently used policy works well in practice but needs hardware (4)______. ' +
    'If too few frames are allocated to a process, it spends most of its time paging, a situation known as (5)______.';

  var passage5 =
    'Machine learning has become a core technology behind many modern applications. ' +
    'In supervised learning, a model is trained on a labelled dataset and then used to (1)______ the output for new, unseen samples. ' +
    'Deep neural networks can learn hierarchical features from raw data, which removes much of the manual feature (2)______ required by traditional algorithms. ' +
    'However, a very complex model may fit the training data too closely and perform poorly on new data; this problem is called (3)______ and can be reduced by regularization, dropout and early stopping. ' +
    'Security is another major concern, because training data and model parameters are valuable assets that an attacker may try to (4)______ or to poison. ' +
    'Therefore, services that expose AI models over the network should enforce authentication and (5)______ of the traffic between clients and servers.';

  function eng(id, passage, no, options, answer, explanation, difficulty) {
    return {
      id: id, module: 'english', topic: '专业英语', difficulty: difficulty || 2, points: ['english|高频题材', 'english|解题方法'],
      stem: passage + '\n\n第 (' + no + ') 空应填入（ ）。',
      options: options,
      answer: answer || 0,
      explanation: explanation,
      tags: ['英语']
    };
  }

  RK.registerQuestions([
    {
      id: 'MM-001', module: 'multimedia', topic: '音频', difficulty: 2, points: ['multimedia|音频'],
      stem: '对 CD 音质的立体声信号（采样频率 44.1kHz、量化位数 16 位、双声道）录制 1 分钟，未压缩的数据量约为（ ）。',
      options: ['20.2 MB', '84.7 MB', '10.1 MB', '5.05 MB'],
      answer: 2,
      explanation: '数据量 = 采样频率 × 量化位数 × 声道数 × 时间 / 8 = 44100 × 16 × 2 × 60 / 8 = 10,584,000 字节 ≈ 10.1 MB。单声道则减半为 5.05 MB。',
      tags: ['计算', '高频']
    },
    {
      id: 'MM-002', module: 'multimedia', topic: '图像', difficulty: 2, points: ['multimedia|图像'],
      stem: '一幅 1024×768 的 24 位真彩色图像，未压缩时占用的存储空间约为（ ）。',
      options: ['18 MB', '0.75 MB', '2.25 KB', '2.25 MB'],
      answer: 3,
      explanation: '容量 = 水平像素 × 垂直像素 × 颜色深度 / 8 = 1024 × 768 × 24 / 8 = 2,359,296 字节 ≈ 2.25 MB。24 位即每个像素 3 字节。',
      tags: ['计算', '高频']
    },
    {
      id: 'MM-003', module: 'multimedia', topic: '格式', difficulty: 1, points: ['multimedia|压缩'],
      stem: '下列图像格式中，支持动画且最多只能表示 256 种颜色的是（ ）。',
      options: ['GIF', 'JPEG', 'BMP', 'PNG'],
      answer: 0,
      explanation: 'GIF 采用 8 位调色板（256 色），支持多帧动画与透明背景，适合图标与简单动图；JPEG 有损压缩适合照片；BMP 无损但体积大；PNG 无损且支持 alpha 透明，但不支持动画（APNG 除外）。',
      tags: ['记忆']
    },
    {
      id: 'MM-004', module: 'multimedia', topic: '压缩', difficulty: 2, points: ['multimedia|压缩'],
      stem: '下列关于压缩编码的说法，正确的是（ ）。',
      options: ['哈夫曼编码属于有损压缩', 'JPEG 对静态图像采用有损压缩，MPEG 对运动图像利用了时间冗余', 'JPEG 与 MPEG 均为无损压缩', 'MP3 属于无损音频压缩'],
      answer: 1,
      explanation: 'JPEG 基于 DCT 的有损压缩，利用空间冗余与视觉冗余；MPEG 在此基础上还利用帧间的时间冗余（运动补偿）。哈夫曼、RLE、LZW 均为无损压缩。',
      tags: ['概念']
    },
    {
      id: 'MM-005', module: 'multimedia', topic: '音频', difficulty: 2, points: ['multimedia|音频'],
      stem: '人耳可听频率上限约为 20kHz，为能不失真地恢复原始信号，采样频率至少应为（ ）。',
      options: ['10kHz', '44.1Hz', '40kHz', '20kHz'],
      answer: 2,
      explanation: '奈奎斯特采样定理要求采样频率不低于信号最高频率的 2 倍，故至少 2 × 20kHz = 40kHz。CD 采用 44.1kHz 正是为覆盖 20kHz 的听感上限并留出滤波过渡带。',
      tags: ['计算', '必背']
    },
    {
      id: 'MM-006', module: 'multimedia', topic: '音频', difficulty: 1, points: ['multimedia|音频'],
      stem: '关于 MIDI 音频，下列说法正确的是（ ）。',
      options: ['直接记录声音波形的采样值，音质最好', '属于有损压缩的波形音频格式', '文件体积通常比未压缩的 WAV 更大', '记录音符、力度等演奏指令，文件体积小，不能直接记录人声'],
      answer: 3,
      explanation: 'MIDI 是乐器数字接口，保存的是"按哪个键、多大力、持续多久"等指令，由音源合成声音，因此文件极小、便于编辑，但无法记录人声等真实波形；WAV 才是波形采样文件。',
      tags: ['概念', '易错']
    },
    {
      id: 'MM-007', module: 'multimedia', topic: '图像', difficulty: 1, points: ['multimedia|图像'],
      stem: '打印机分辨率为 600DPI，其含义是（ ）。',
      options: ['每英寸可打印 600 个点', '每平方英寸有 600 个像素', '每秒打印 600 页', '屏幕每行显示 600 个像素'],
      answer: 0,
      explanation: 'DPI（Dots Per Inch）表示每英寸的点数，用于衡量打印或扫描设备的输出精度；PPI 表示每英寸像素数，多用于显示器与图像分辨率。分辨率越高，输出越细腻。',
      tags: ['概念']
    },
    {
      id: 'MM-008', module: 'multimedia', topic: '图像', difficulty: 1, points: ['multimedia|图像'],
      stem: '关于矢量图，下列说法正确的是（ ）。',
      options: ['压缩时必然丢失细节', '用图形指令描述图形，放大后不失真，文件通常较小', '用像素点阵描述图形，放大后出现马赛克', '只能表示黑白两色'],
      answer: 1,
      explanation: '矢量图记录线条、圆、多边形等几何指令与填充属性，缩放时按数学公式重绘，边缘始终平滑，适合图标、工程图与字体；位图记录像素点，放大后出现锯齿或马赛克。',
      tags: ['概念']
    },
    {
      id: 'MM-009', module: 'multimedia', topic: '视频', difficulty: 3, points: ['multimedia|视频'],
      stem: '一段 640×480 的 24 位真彩色视频，帧率 25fps，时长 10 秒，未压缩时数据量约为（ ）。',
      options: ['约 22 MB', '约 2.2 GB', '约 220 MB', '约 880 MB'],
      answer: 2,
      explanation: '每帧 = 640 × 480 × 3 字节 = 921,600 字节；每秒 = 921,600 × 25 = 23,040,000 字节；10 秒 = 230,400,000 字节 ≈ 219.7 MB ≈ 220 MB。视频数据量极大，这正是需要 MPEG 等帧间压缩的原因。',
      tags: ['计算', '高频']
    },
    {
      id: 'MM-010', module: 'multimedia', topic: '视频', difficulty: 2, points: ['multimedia|视频'],
      stem: '视频压缩常把 RGB 色彩空间转换为 YUV，其主要依据是（ ）。',
      options: ['YUV 的每个像素占用的位数比 RGB 更多', 'YUV 只能表示黑白图像', 'YUV 是无损压缩专用格式', '人眼对亮度变化更敏感、对色度变化不敏感，可对色度分量降采样'],
      answer: 3,
      explanation: 'Y 表示亮度、U/V 表示色差。人眼对亮度细节敏感、对色度分辨力较弱，因此可对色度分量做 4:2:0 等降采样而不易察觉，同时保留了感知上最重要的亮度信息，显著降低数据量。',
      tags: ['概念', '高频']
    },

    eng('ENG-001', passage1, 1,
      ['framework', 'database', 'hardware', 'budget'],
      0,
      'process model provides a framework for the activities：过程模型为构建软件所需的各项活动提供"框架"。数据库、硬件、预算均与句意不符。', 2),
    eng('ENG-002', passage1, 2,
      ['harmful', 'stable', 'unknown', 'missing'],
      1,
      '瀑布模型要求需求在项目初期"稳定"（stable），这与后文迭代模型"允许需求随时间演进"形成对比。unknown / missing 与 works well 矛盾。', 2),
    eng('ENG-003', passage1, 3,
      ['freeze', 'ignore', 'evolve', 'delete'],
      2,
      'allow requirements to evolve over time：允许需求随时间"演进/变化"，这是迭代与增量模型的核心主张，与瀑布的"需求冻结"相反。', 2),
    eng('ENG-004', passage1, 4,
      ['network', 'memory', 'resource', 'configuration'],
      3,
      'configuration management（配置管理）用于控制软件配置项的变更，与后文 control changes to the software configuration 完全对应。', 3),
    eng('ENG-005', passage1, 5,
      ['acceptance', 'unit', 'random', 'regression'],
      0,
      'a final acceptance test is performed by the customer：由客户进行的是"验收"测试，用于判断软件是否满足约定的需求。单元测试由开发者完成，回归测试用于确认修改未引入新缺陷。', 2),

    eng('ENG-006', passage2, 1,
      ['repeating', 'interfering', 'agreeing', 'merging'],
      1,
      'without interfering with each other：并发事务之间互不"干扰"，这正是隔离性（isolation）要解决的问题。agree / merge / repeat 均不符合语义。', 2),
    eng('ENG-007', passage2, 2,
      ['creation', 'backup', 'retrieval', 'deletion'],
      2,
      'improves the speed of data retrieval operations：索引提升数据"检索"速度。后文 at the cost of additional writes 说明代价在写入侧，与 retrieval 呼应。', 2),
    eng('ENG-008', passage2, 3,
      ['security', 'integrity', 'authority', 'redundancy'],
      3,
      'normalization reduces data redundancy：规范化通过把属性组织到结构良好的关系中，减少数据"冗余"及由此带来的更新异常。', 3),
    eng('ENG-009', passage2, 4,
      ['table', 'user', 'password', 'network'],
      0,
      'based on table statistics：优化器依据"表"的统计信息（行数、列分布、索引选择性）选择执行计划。user / password / network 与优化器决策无关。', 3),
    eng('ENG-010', passage2, 5,
      ['rename', 'grant', 'delete', 'compress'],
      1,
      'grant different privileges to different users：数据库管理员通过 GRANT 把不同"权限"授予不同用户，对应 DCL 中的数据控制语句。', 2),

    eng('ENG-011', passage3, 1,
      ['encrypt', 'divide', 'synchronize', 'compress'],
      2,
      'a three-way handshake is performed to synchronize the sequence numbers：三次握手的目的是"同步"双方的初始序号，并确认收发能力。', 2),
    eng('ENG-012', passage3, 2,
      ['identify', 'duplicate', 'locate', 'overwhelm'],
      3,
      'a fast sender cannot overwhelm a slow receiver：滑动窗口的流量控制防止快速发送方"压垮"慢速接收方。overwhelm 意为淹没、使不堪承受。', 3),
    eng('ENG-013', passage3, 3,
      ['reduced', 'ignored', 'copied', 'isolated'],
      0,
      'the congestion window grows slowly at first and is reduced when the network becomes congested：拥塞时拥塞窗口被"减小"（ssthresh 减半），这是拥塞控制的必然方向。', 2),
    eng('ENG-014', passage3, 4,
      ['audio', 'topology', 'password', 'billing'],
      1,
      'OSPF exchanges topology information：链路状态协议交换的是"拓扑"信息，各路由器据此构建全网拓扑图并运行 Dijkstra 算法。', 2),
    eng('ENG-015', passage3, 5,
      ['offline', 'illegal', 'transparent', 'expensive'],
      2,
      'DNS translates names into IP addresses, which makes the network transparent to end users：DNS 把域名映射为 IP 地址，使网络对用户"透明"，用户无需记忆数字地址。', 3),

    eng('ENG-016', passage4, 1,
      ['storage', 'advance', 'decline', 'execution'],
      3,
      'A process is a program in execution：进程是"执行中"的程序，强调动态性；program in storage 指静态存放的程序，与进程定义不符。', 2),
    eng('ENG-017', passage4, 2,
      ['cheaper', 'slower', 'longer', 'heavier'],
      0,
      'context switching between threads is cheaper than between processes：线程共享地址空间，切换只需保存少量寄存器与栈信息，开销比进程切换"更小"。', 2),
    eng('ENG-018', passage4, 3,
      ['compress', 'fetch', 'delete', 'print'],
      1,
      'the operating system must fetch it from disk：缺页时操作系统需从磁盘"取回"该页装入内存，即页面调入（page-in）。', 2),
    eng('ENG-019', passage4, 4,
      ['noise', 'error', 'support', 'failure'],
      2,
      'the least recently used policy needs hardware support：LRU 需要记录每页的访问时间或维护访问栈，必须由硬件"支持"（如访问位、计数器），纯软件实现开销过大。', 3),
    eng('ENG-020', passage4, 5,
      ['buffering', 'indexing', 'compiling', 'thrashing'],
      3,
      'it spends most of its time paging, a situation known as thrashing：物理块不足导致频繁换页、CPU 利用率骤降，这种现象称为"抖动"（thrashing）。', 2),

    eng('ENG-021', passage5, 1,
      ['predict', 'ignore', 'delete', 'purchase'],
      0,
      'used to predict the output for new, unseen samples：监督学习训练好的模型用于对新样本"预测"输出，分类与回归都属于预测。', 2),
    eng('ENG-022', passage5, 2,
      ['billing', 'engineering', 'painting', 'farming'],
      1,
      'manual feature engineering：传统算法需要人工做"特征工程"，深度学习可自动学习层次化特征，从而减少这部分人工工作。', 3),
    eng('ENG-023', passage5, 3,
      ['routing', 'hashing', 'overfitting', 'sorting'],
      2,
      'fit the training data too closely and perform poorly on new data ... called overfitting：在训练集上表现过好、在新数据上表现差，即"过拟合"，可用正则化、Dropout、早停缓解。', 2),
    eng('ENG-024', passage5, 4,
      ['donate', 'repair', 'publish', 'steal'],
      3,
      'an attacker may try to steal or to poison：攻击者可能"窃取"模型参数或投毒训练数据，二者是 AI 系统面临的典型安全威胁。', 2),
    eng('ENG-025', passage5, 5,
      ['encryption', 'printing', 'storage', 'naming'],
      0,
      'enforce authentication and encryption of the traffic：对外提供 AI 服务时应启用身份认证与流量"加密"（如 TLS），防止数据与模型在传输中被窃听或篡改。', 3)
    ,
    {
      id: 'MM-017', module: 'multimedia', topic: '采样定理', difficulty: 2, points: ['multimedia|音频'],
      stem: '对最高频率为 20kHz 的声音进行采样，采样频率至少应为（ ）。',
      options: ['20kHz', '30kHz', '40kHz', '10kHz'],
      answer: 2,
      explanation: '奈奎斯特采样定理要求采样频率 ≥ 信号最高频率的 2 倍，即 ≥ 40kHz；直接取 20kHz 会混叠失真。',
      tags: ['计算', '易错']
    },
    {
      id: 'MM-018', module: 'multimedia', topic: '图像容量', difficulty: 2, points: ['multimedia|图像'],
      stem: '1024×768 像素、24 位真彩色图像的数据量约为（ ）。',
      options: ['786432B', '1.5MB', '1MB', '2.25MB'],
      answer: 3,
      explanation: '图像容量 = 像素数 × 颜色深度 / 8 = 1024×768×24/8 = 2359296B ≈ 2.25MB。忘记除以 8 会高估 8 倍。',
      tags: ['计算']
    },
    {
      id: 'MM-019', module: 'multimedia', topic: '视频容量', difficulty: 1, points: ['multimedia|视频'],
      stem: 'PAL 制 25fps、每帧 1MB，10 秒未压缩视频的数据量约为（ ）。',
      options: ['250MB', '25MB', '100MB', '1024MB'],
      answer: 0,
      explanation: '视频容量 = 帧率 × 每帧容量 × 时间 = 25 × 1MB × 10 = 250MB。PAL 为 25fps、NTSC 为 30fps、电影为 24fps。',
      tags: ['计算']
    },
    {
      id: 'MM-020', module: 'multimedia', topic: '压缩', difficulty: 2, points: ['multimedia|压缩'],
      stem: 'JPEG 有损压缩中主要丢弃的信息是（ ）。',
      options: ['相邻像素完全相同的空间冗余', '人眼不敏感的高频细节', '文件中的全部二进制位', '文件头和格式标记'],
      answer: 1,
      explanation: 'JPEG 基于 DCT 变换后量化，丢弃人眼不敏感的高频分量；空间冗余由行程编码/RLE 等无损方法处理，量化本身不可逆。',
      tags: ['概念', '易错']
    },
    eng('ENG-036',
      'Low-code platforms reduce the amount of hand-written programming by using visual configuration. Business users can assemble applications with drag-and-drop components, while developers still need to (1)______ the underlying logic when the built-in blocks are not sufficient.',
      1,
      ['ignore', 'delete', 'customize', 'memorize'],
      2,
      'built-in blocks are not sufficient → developers customize the underlying logic：内建模块不够时需要"定制"底层逻辑，故选 customize。', 2),
    eng('ENG-037',
      'The first version of the interface was slow; (1)______, the team decided to add an index to the most frequently queried column and measure the result again.',
      1,
      ['however', 'although', 'unless', 'therefore'],
      3,
      '分号后给出由上句原因导出的动作与结果，应为因果连接词 therefore；however 表转折、although 引导让步、unless 表条件。', 1)
  ]);
})(window.RK);
