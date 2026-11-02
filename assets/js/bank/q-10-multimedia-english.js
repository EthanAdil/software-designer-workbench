/* 多媒体基础（4 题）+ 专业英语（8 题） */
(function (RK) {
  var passage1 =
    'Software engineering is the application of a systematic, disciplined, quantifiable approach to the development, operation and maintenance of software. ' +
    'A software process model provides a (1)______ for the activities required to build a software product. ' +
    'The waterfall model follows a strictly sequential flow, which works well when requirements are (2)______ at the beginning of the project. ' +
    'In contrast, iterative and incremental models deliver software in small releases and allow requirements to (3)______ over time. ' +
    'Regardless of which model is chosen, (4)______ management is essential to control changes to the software configuration.';

  var passage2 =
    'A database management system provides concurrency control so that multiple transactions can execute simultaneously without (1)______ with each other. ' +
    'The ACID properties guarantee that every transaction is processed reliably. ' +
    'An index is a data structure that improves the speed of data (2)______ operations at the cost of additional writes and storage space. ' +
    'Normalization reduces data (3)______ by organizing attributes into well-structured relations. ' +
    'When a query joins several tables, the optimizer chooses an execution plan based on (4)______ statistics.';

  RK.registerQuestions([
    {
      id: 'MM-001', module: 'multimedia', topic: '音频', difficulty: 2,
      stem: '对 CD 音质的立体声信号（采样频率 44.1kHz、量化位数 16 位、双声道）录制 1 分钟，未压缩的数据量约为（ ）。',
      options: ['10.1 MB', '5.05 MB', '20.2 MB', '84.7 MB'],
      answer: 0,
      explanation: '数据量 = 采样频率 × 量化位数 × 声道数 × 时间 / 8 = 44100 × 16 × 2 × 60 / 8 = 10,584,000 字节 ≈ 10.1 MB。单声道则减半为 5.05 MB。',
      tags: ['计算', '高频']
    },
    {
      id: 'MM-002', module: 'multimedia', topic: '图像', difficulty: 2,
      stem: '一幅 1024×768 的 24 位真彩色图像，未压缩时占用的存储空间约为（ ）。',
      options: ['2.25 MB', '18 MB', '0.75 MB', '2.25 KB'],
      answer: 0,
      explanation: '容量 = 水平像素 × 垂直像素 × 颜色深度 / 8 = 1024 × 768 × 24 / 8 = 2,359,296 字节 ≈ 2.25 MB。24 位即每个像素 3 字节。',
      tags: ['计算', '高频']
    },
    {
      id: 'MM-003', module: 'multimedia', topic: '格式', difficulty: 1,
      stem: '下列图像格式中，支持动画且最多只能表示 256 种颜色的是（ ）。',
      options: ['GIF', 'JPEG', 'BMP', 'PNG'],
      answer: 0,
      explanation: 'GIF 采用 8 位调色板（256 色），支持多帧动画与透明背景，适合图标与简单动图；JPEG 有损压缩适合照片；BMP 无损但体积大；PNG 无损且支持 alpha 透明，但不支持动画（APNG 除外）。',
      tags: ['记忆']
    },
    {
      id: 'MM-004', module: 'multimedia', topic: '压缩', difficulty: 2,
      stem: '下列关于压缩编码的说法，正确的是（ ）。',
      options: ['JPEG 对静态图像采用有损压缩，MPEG 对运动图像利用了时间冗余', 'JPEG 与 MPEG 均为无损压缩', 'MP3 属于无损音频压缩', '哈夫曼编码属于有损压缩'],
      answer: 0,
      explanation: 'JPEG 基于 DCT 的有损压缩，利用空间冗余与视觉冗余；MPEG 在此基础上还利用帧间的时间冗余（运动补偿）。哈夫曼、RLE、LZW 均为无损压缩。',
      tags: ['概念']
    },

    {
      id: 'ENG-001', module: 'english', topic: '专业英语', difficulty: 2,
      stem: passage1 + '\n\n第 (1) 空应填入（ ）。',
      options: ['framework', 'database', 'hardware', 'budget'],
      answer: 0,
      explanation: 'process model provides a framework for the activities：过程模型为开发活动提供"框架"。数据库、硬件、预算均与句意不符。',
      tags: ['英语']
    },
    {
      id: 'ENG-002', module: 'english', topic: '专业英语', difficulty: 2,
      stem: passage1 + '\n\n第 (2) 空应填入（ ）。',
      options: ['stable', 'unknown', 'missing', 'harmful'],
      answer: 0,
      explanation: '瀑布模型要求需求在项目初期"稳定"（stable），这与后文迭代模型"允许需求随时间演进"形成对比。unknown/missing 与 works well 矛盾。',
      tags: ['英语']
    },
    {
      id: 'ENG-003', module: 'english', topic: '专业英语', difficulty: 2,
      stem: passage1 + '\n\n第 (3) 空应填入（ ）。',
      options: ['evolve', 'delete', 'freeze', 'ignore'],
      answer: 0,
      explanation: 'allow requirements to evolve over time：允许需求随时间"演进/变化"。这是敏捷与迭代模型的核心主张。',
      tags: ['英语']
    },
    {
      id: 'ENG-004', module: 'english', topic: '专业英语', difficulty: 3,
      stem: passage1 + '\n\n第 (4) 空应填入（ ）。',
      options: ['configuration', 'network', 'memory', 'resource'],
      answer: 0,
      explanation: 'configuration management（配置管理）用于控制软件配置项的变更，与后文 control changes to the software configuration 完全对应。',
      tags: ['英语']
    },
    {
      id: 'ENG-005', module: 'english', topic: '专业英语', difficulty: 2,
      stem: passage2 + '\n\n第 (1) 空应填入（ ）。',
      options: ['interfering', 'agreeing', 'merging', 'repeating'],
      answer: 0,
      explanation: 'without interfering with each other：并发事务之间互不"干扰"。这正是隔离性（isolation）要解决的问题，merge/repeat 均不符合语义。',
      tags: ['英语']
    },
    {
      id: 'ENG-006', module: 'english', topic: '专业英语', difficulty: 2,
      stem: passage2 + '\n\n第 (2) 空应填入（ ）。',
      options: ['retrieval', 'deletion', 'creation', 'backup'],
      answer: 0,
      explanation: 'improves the speed of data retrieval operations：索引提升数据"检索"速度。后文 at the cost of additional writes 说明代价在写入侧，与 retrieval 呼应。',
      tags: ['英语']
    },
    {
      id: 'ENG-007', module: 'english', topic: '专业英语', difficulty: 3,
      stem: passage2 + '\n\n第 (3) 空应填入（ ）。',
      options: ['redundancy', 'security', 'integrity', 'authority'],
      answer: 0,
      explanation: 'normalization reduces data redundancy：规范化减少数据"冗余"，通过把属性组织到结构良好的关系中来消除重复存储与更新异常。',
      tags: ['英语']
    },
    {
      id: 'ENG-008', module: 'english', topic: '专业英语', difficulty: 3,
      stem: passage2 + '\n\n第 (4) 空应填入（ ）。',
      options: ['table', 'user', 'password', 'network'],
      answer: 0,
      explanation: 'based on table statistics：优化器依据"表"的统计信息（行数、列分布、索引选择性）选择执行计划。user/password/network 与优化器决策无关。',
      tags: ['英语']
    }
  ]);
})(window.RK);
