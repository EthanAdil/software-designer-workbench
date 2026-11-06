/* 题型与难度配比补齐 —— 150 题（381 → 531）
 * 2026-11-05：按 docs/06 3.3.1 配额，每模块新增 2×权重：CS 14、OS 12、DS 16、PL 10、SE 24、
 * OO 18、DB 14、NET 12、SEC 6、LAW 6、MM 4、ENG 10、TECH 4；合计 150。
 * 约束：新增题一律不打「概念」「记忆」标签；难度 1/2/3 = 58/39/53；答案位置 0/1/2/3 = 37/38/38/37；
 *       解析不出现「选项 A/B/C/D」式引用（运行时选项会乱序）。
 * 存量 381 题的 tags / difficulty / answer 一律不动。 */
(function (RK) {
  var passage6 =
    'Software architecture describes the high-level (1)______ of a system: its components, their responsibilities, and the way they interact. ' +
    'A monolithic application packages all functions into a single deployable unit, which is simple to develop but hard to (2)______ as the code base grows. ' +
    'Microservices split the system into small, independently deployable services that communicate over the network, so each service can be developed, tested and (3)______ on its own. ' +
    'This flexibility has a cost: distributed systems must deal with partial failure, network latency and data (4)______ across services, which is much harder than a single transaction inside a monolith. ' +
    'Therefore, architects usually start with a monolith and split out a service only when a clear (5)______ boundary appears.';

  var passage7 =
    'Security is a cross-cutting concern that cannot be added to a system as an afterthought. ' +
    'The first step is to identify the assets to be protected and the threats they face, which is usually done by a threat (1)______ exercise. ' +
    'Encryption protects data in transit, but it is useless if the key is stored next to the data or if the application itself is (2)______. ' +
    'Many breaches start with a simple phishing email that tricks an employee into revealing a password, which is why security awareness (3)______ is as important as technical controls. ' +
    'Developers should validate all input on the server side, because client-side checks can be bypassed; this practice prevents injection attacks and reduces the risk of data (4)______. ' +
    'Finally, systems should be monitored continuously so that abnormal behaviour is detected early, and every incident should be recorded and (5)______ so that the same mistake is not repeated.';

  function eng(id, passage, no, options, answer, difficulty, explanation) {
    return {
      id: id, module: 'english', topic: '专业英语', difficulty: difficulty, points: ['english|高频题材', 'english|解题方法'],
      stem: passage + '\n\n第 (' + no + ') 空应填入（ ）。',
      options: options,
      answer: answer,
      explanation: explanation,
      tags: ['英语']
    };
  }

  RK.registerQuestions([
    /* ---------------- 计算机组成与体系结构 +14（5/4/5） ---------------- */
    {
      id: 'CS-036', module: 'computer-system', topic: '运算方法', difficulty: 1, points: ['computer-system|数据表示与运算'],
      stem: '对补码表示的定点数执行算术右移一位，其效果是（ ）。',
      options: ['保持符号位不变、其余位右移并补符号位，相当于除以 2 并向负无穷取整', '符号位一并右移，相当于除以 2 后截断小数', '左移一位，相当于乘以 2', '循环右移，最低位移入符号位'],
      answer: 0,
      explanation: '算术右移时符号位不动，高位补符号位。正数右移等价于除以 2 取整；负数因补码表示，右移等价于向下取整，例如 -3（11111101）右移一位得 -2（11111110）。',
      tags: ['计算', '易错']
    },
    {
      id: 'CS-037', module: 'computer-system', topic: '运算方法', difficulty: 3, points: ['computer-system|数据表示与运算'],
      stem: '采用双符号位（变形补码）进行加法运算，若结果的两个符号位为 01，则说明（ ）。',
      options: ['结果正确，无需处理', '发生正溢出，即两个正数相加超出可表示范围', '发生负溢出，即两个负数相加超出可表示范围', '结果的符号位需要取反后使用'],
      answer: 1,
      explanation: '双符号位 00 表示正数、11 表示负数；01 为正溢出、10 为负溢出。01 说明真实和超过了最大正数，需按溢出处理。',
      tags: ['分析', '高频']
    },
    {
      id: 'CS-038', module: 'computer-system', topic: 'CPU', difficulty: 1, points: ['computer-system|CPU 与体系结构'],
      stem: 'CPU 中程序计数器（PC）的作用是（ ）。',
      options: ['保存当前指令的运算结果', '保存当前指令的操作码', '保存下一条待执行指令的地址', '保存内存数据的读写地址'],
      answer: 2,
      explanation: 'PC 存放的是下一条待执行指令的地址，取指后自动加「指令长度」。操作码由指令寄存器 IR 保存，运算结果在累加器或通用寄存器中。',
      tags: ['理解']
    },
    {
      id: 'CS-039', module: 'computer-system', topic: 'CPU', difficulty: 2, points: ['computer-system|CPU 与体系结构'],
      stem: '指令从主存取到 CPU 后，先暂存于（ ），再由控制器译码。',
      options: ['通用寄存器', '程序计数器', '状态寄存器', '指令寄存器'],
      answer: 3,
      explanation: '取指后指令送入指令寄存器 IR，控制器对 IR 中的操作码译码并产生控制信号。PC 只提供地址，通用寄存器存放数据，状态寄存器存放标志位。',
      tags: ['理解']
    },
    {
      id: 'CS-040', module: 'computer-system', topic: 'I/O 方式', difficulty: 2, points: ['computer-system|总线、I/O 与可靠性'],
      stem: '与中断驱动方式相比，DMA 方式的主要优点是（ ）。',
      options: ['数据传送由 DMA 控制器完成，CPU 只在传送开始和结束时介入', '每传送一个字节都由 CPU 执行一次中断服务程序', '不需要进行总线控制权转移', '只能用于字符设备，不能用于块设备'],
      answer: 0,
      explanation: 'DMA 由控制器直接在内存与外设之间成块传送数据，CPU 仅做初始化与结束处理，适合磁盘等高速块设备；中断方式每传送一个数据单位都要打断 CPU。',
      tags: ['理解', '高频']
    },
    {
      id: 'CS-041', module: 'computer-system', topic: 'I/O 方式', difficulty: 3, points: ['computer-system|总线、I/O 与可靠性'],
      stem: '下列关于中断的叙述中，正确的是（ ）。',
      options: ['中断响应可以发生在一条指令执行过程中，随时打断', '中断响应发生在当前指令执行完毕之后，断点保存的是下一条指令的地址', '中断服务程序执行期间一定屏蔽所有中断', '中断方式下数据传送完全不需要 CPU 参与'],
      answer: 1,
      explanation: '中断在指令边界响应，保证当前指令的完整性；断点为下一条待执行指令的地址。中断可分级嵌套，高优先级中断可打断低优先级服务程序；中断方式仍需 CPU 执行服务程序完成传送。',
      tags: ['分析', '易错']
    },
    {
      id: 'CS-042', module: 'computer-system', topic: '存储系统', difficulty: 2, points: ['computer-system|存储系统'],
      stem: '某系统 Cache 存取周期为 2ns，主存存取周期为 20ns，命中率为 95%。只考虑这两级存储，平均存取时间约为（ ）。',
      options: ['2.0 ns', '2.5 ns', '3.0 ns', '20 ns'],
      answer: 2,
      explanation: '平均存取时间 = 2 + (1 - 0.95) × 20 = 2 + 1 = 3 ns。未命中时需先查 Cache 再访问主存，因此按「命中时间 + 缺失率 × 缺失代价」估算。',
      tags: ['计算', '高频']
    },
    {
      id: 'CS-043', module: 'computer-system', topic: '存储系统', difficulty: 3, points: ['computer-system|存储系统'],
      stem: 'Cache 与虚拟存储器都依据程序访问的局部性原理，二者的主要区别是（ ）。',
      options: ['Cache 由操作系统管理，虚拟存储器完全由硬件管理', 'Cache 解决容量问题，虚拟存储器解决速度问题', '两者都由硬件自动完成地址转换，与操作系统无关', 'Cache 对程序员透明、由硬件实现；虚拟存储器需要操作系统与硬件共同完成地址转换和页面调度'],
      answer: 3,
      explanation: 'Cache 由硬件自动管理、对程序员透明，解决速度匹配；虚拟存储器由硬件（MMU、TLB）与操作系统（页表、缺页处理、置换）共同管理，解决容量与地址空间隔离。两者的目标与实现层次都不同。',
      tags: ['分析', '难点']
    },
    {
      id: 'CS-044', module: 'computer-system', topic: '总线', difficulty: 1, points: ['computer-system|总线、I/O 与可靠性'],
      stem: '某总线数据线宽度为 32 位，时钟频率 100MHz，每个时钟周期传送一次数据，则总线带宽为（ ）。',
      options: ['400 MB/s', '100 MB/s', '3200 MB/s', '800 MB/s'],
      answer: 0,
      explanation: '32 位 = 4 字节，带宽 = 4 字节 × 100M 次/秒 = 400 MB/s。误把位数当字节数会得到 3200 MB/s，把频率当带宽会得到 100 MB/s。',
      tags: ['计算']
    },
    {
      id: 'CS-045', module: 'computer-system', topic: '可靠性', difficulty: 2, points: ['computer-system|总线、I/O 与可靠性'],
      stem: '三个部件串联组成系统，各部件可靠度均为 0.9，系统可靠度为（ ）。',
      options: ['0.9', '0.729', '0.999', '0.3'],
      answer: 1,
      explanation: '串联系统可靠度等于各部件可靠度之积：0.9³ = 0.729。并联系统可靠度为 1 - (1-0.9)³ = 0.999，两者不要混淆。',
      tags: ['计算']
    },
    {
      id: 'CS-046', module: 'computer-system', topic: '性能指标', difficulty: 1, points: ['computer-system|性能指标'],
      stem: '某程序共 100 万条指令，平均 CPI 为 2，时钟频率 1GHz，执行时间约为（ ）。',
      options: ['1 ms', '0.5 ms', '2 ms', '20 ms'],
      answer: 2,
      explanation: '执行时间 = 指令数 × CPI / 时钟频率 = 10⁶ × 2 / 10⁹ s = 2×10⁻³ s = 2 ms。CPI 是每条指令平均时钟周期数，不要漏乘指令条数。',
      tags: ['计算', '高频']
    },
    {
      id: 'CS-047', module: 'computer-system', topic: '数据表示', difficulty: 1, points: ['computer-system|数据表示与运算'],
      stem: '8 位补码所能表示的整数范围是（ ）。',
      options: ['-127 ~ +127', '0 ~ 255', '-128 ~ +128', '-128 ~ +127'],
      answer: 3,
      explanation: 'n 位补码范围为 -2^(n-1) ~ 2^(n-1)-1，8 位即 -128 ~ +127。原码与反码为 -127 ~ +127，多出的负数端是补码的「-0」位置。',
      tags: ['理解', '必会']
    },
    {
      id: 'CS-048', module: 'computer-system', topic: '校验码', difficulty: 3, points: ['computer-system|数据表示与运算'],
      stem: '信息位为 8 位，采用海明码进行一位纠错，至少需要（ ）位校验位。',
      options: ['4', '3', '5', '8'],
      answer: 0,
      explanation: '校验位 r 需满足 2^r ≥ 8 + r + 1。r = 3 时 8 < 12 不成立，r = 4 时 16 ≥ 13 成立，故至少 4 位。',
      tags: ['计算', '高频']
    },
    {
      id: 'CS-049', module: 'computer-system', topic: '体系结构', difficulty: 3, points: ['computer-system|CPU 与体系结构'],
      stem: '5 段流水线各段耗时均为 1ns，连续执行 100 条指令（不考虑相关与冲突），完成时间为（ ）。',
      options: ['100 ns', '104 ns', '105 ns', '500 ns'],
      answer: 1,
      explanation: '完成时间 = (k + n - 1) × Δt = (5 + 100 - 1) × 1 = 104 ns。前 4 条指令用于填满流水线，之后每个周期产出一条结果；按 k×n 计算会得到 500 ns。',
      tags: ['计算', '高频']
    },

    /* ---------------- 操作系统 +12（5/3/4） ---------------- */
    {
      id: 'OS-031', module: 'os', topic: '文件管理', difficulty: 1, points: ['os|文件与设备管理'],
      stem: '在 UNIX 类文件系统中，索引节点（inode）中通常不包含（ ）。',
      options: ['文件长度与访问权限', '文件数据块的地址', '文件名', '文件的链接数'],
      answer: 2,
      explanation: 'inode 记录文件类型、权限、长度、时间戳、数据块索引与链接数，但不含文件名；文件名与 inode 编号的对应关系保存在目录项中，因此一个文件可以有多个名字（硬链接）。',
      tags: ['理解', '易错']
    },
    {
      id: 'OS-032', module: 'os', topic: '文件管理', difficulty: 2, points: ['os|文件与设备管理'],
      stem: '字长 32 位，物理块号从 0 开始编号，则块号 130 在位示图中对应的字号与位号分别是（ ）。',
      options: ['字号 5、位号 2', '字号 4、位号 3', '字号 4、位号 4', '字号 4、位号 2'],
      answer: 3,
      explanation: '每个字号对应 32 个块：字号 = 130 ÷ 32 = 4，位号 = 130 mod 32 = 2。若块号从 1 开始编号，才需要先减 1 再换算，本题已说明从 0 开始。',
      tags: ['计算']
    },
    {
      id: 'OS-033', module: 'os', topic: '设备管理', difficulty: 1, points: ['os|文件与设备管理'],
      stem: 'SPOOLing 技术的主要作用是（ ）。',
      options: ['把独占设备改造为可共享的虚拟设备', '提高 CPU 主频', '实现设备与内存之间的直接数据传送', '减少磁盘容量占用'],
      answer: 0,
      explanation: 'SPOOLing 利用磁盘上的输入井、输出井和缓冲区，把打印机等独占设备虚拟成多台可并发使用的共享设备，从而提高设备利用率；直接内存传送是 DMA 的作用。',
      tags: ['理解']
    },
    {
      id: 'OS-034', module: 'os', topic: '设备管理', difficulty: 2, points: ['os|文件与设备管理'],
      stem: '磁头当前位于 100 号磁道，请求序列为 55、58、39、18、90、160、150、38、184，采用最短寻道时间优先（SSTF），第一个被服务的磁道是（ ）。',
      options: ['55', '90', '150', '184'],
      answer: 1,
      explanation: 'SSTF 每次选择距当前磁头最近的请求：|100-90| = 10 最小，故先服务 90 号磁道；随后依次在剩余请求中继续找最近者。',
      tags: ['计算']
    },
    {
      id: 'OS-035', module: 'os', topic: '死锁', difficulty: 1, points: ['os|进程管理'],
      stem: '下列不属于死锁必要条件的是（ ）。',
      options: ['互斥条件', '请求并保持条件', '资源可剥夺', '环路等待条件'],
      answer: 2,
      explanation: '死锁四个必要条件是互斥、请求并保持、不可剥夺、环路等待。「不可剥夺」才是必要条件，资源可剥夺恰好是破坏死锁的手段之一。',
      tags: ['理解', '易错']
    },
    {
      id: 'OS-036', module: 'os', topic: '死锁', difficulty: 3, points: ['os|进程管理'],
      stem: '银行家算法判定某时刻存在安全序列，这说明（ ）。',
      options: ['系统当前处于不安全状态', '必须立即回收所有已分配资源', '安全序列唯一，可由算法唯一确定', '系统处于安全状态，按该序列推进可保证不发生死锁'],
      answer: 3,
      explanation: '安全状态的定义是「存在至少一个安全序列」，按该序列分配资源后每个进程都能完成，因此不会死锁。安全序列通常不唯一，算法找到一个即可；不安全状态只是「可能」死锁，并非已经死锁。',
      tags: ['分析', '难点']
    },
    {
      id: 'OS-037', module: 'os', topic: 'PV 操作', difficulty: 1, points: ['os|进程管理'],
      stem: '某信号量当前值为 -2，表示（ ）。',
      options: ['有 2 个进程正在等待该资源', '还有 2 个资源可以使用', '有 2 个进程正在使用该资源', '信号量的初值为 2'],
      answer: 0,
      explanation: '信号量值小于 0 时，其绝对值等于在该信号量队列上等待的进程数，故有 2 个进程被阻塞等待；等于 0 表示资源恰好用完且无人等待。',
      tags: ['理解', '高频']
    },
    {
      id: 'OS-038', module: 'os', topic: 'PV 操作', difficulty: 3, points: ['os|进程管理'],
      stem: '生产者-消费者问题中，若生产者先执行 P(mutex) 再执行 P(empty)，当缓冲区满时可能出现（ ）。',
      options: ['只影响效率，不会出错', '生产者持锁等待空缓冲区，消费者无法进入临界区，形成死锁', '缓冲区被写满后自动扩容', '信号量初值被自动修正'],
      answer: 1,
      explanation: '缓冲区满时生产者在 P(empty) 上阻塞，但已持有互斥锁；消费者需要 P(mutex) 才能取产品，于是双方互相等待，形成死锁。正确顺序是先 P(empty) 再 P(mutex)。',
      tags: ['分析', '难点']
    },
    {
      id: 'OS-039', module: 'os', topic: '调度算法', difficulty: 2, points: ['os|作业与进程调度'],
      stem: '高响应比优先调度算法中，响应比的计算方式是（ ）。',
      options: ['服务时间 / 等待时间', '等待时间 × 服务时间', '(等待时间 + 服务时间) / 服务时间', '服务时间 / (等待时间 + 服务时间)'],
      answer: 2,
      explanation: '响应比 = (等待时间 + 要求服务时间) / 要求服务时间。等待时间越长响应比越高，兼顾了先来先服务与短作业优先，长作业等待足够久后也能获得调度。',
      tags: ['理解']
    },
    {
      id: 'OS-040', module: 'os', topic: '调度算法', difficulty: 3, points: ['os|作业与进程调度'],
      stem: '三个作业同时到达，服务时间分别为 3、5、7，采用短作业优先（SJF），平均周转时间为（ ）。',
      options: ['5', '7.67', '9', '8.67'],
      answer: 3,
      explanation: '按 3、5、7 顺序执行，完成时间分别为 3、8、15，周转时间之和为 26，平均 26/3 ≈ 8.67。若误用 FCFS 且顺序为 5、3、7，则平均为 (5+8+15)/3 = 9.33。',
      tags: ['计算', '高频']
    },
    {
      id: 'OS-041', module: 'os', topic: '存储管理', difficulty: 1, points: ['os|存储管理'],
      stem: '页面大小为 4KB，逻辑地址 8196 对应的页号是（ ）。',
      options: ['2', '1', '4', '8196'],
      answer: 0,
      explanation: '8196 ÷ 4096 = 2 余 4，页号为 2，页内偏移为 4。页号从 0 开始编号，地址正好落在第 3 个页面的起始处。',
      tags: ['计算']
    },
    {
      id: 'OS-042', module: 'os', topic: '页面置换', difficulty: 3, points: ['os|存储管理'],
      stem: '系统分配 3 个物理块，页面引用串为 1,2,3,4,1,2,5,1,2,3,4,5，采用 LRU 置换算法，缺页次数为（ ）。',
      options: ['7', '10', '9', '12'],
      answer: 1,
      explanation: '逐次模拟：装入 1、2、3 缺页 3 次；4 淘汰 1，1 淘汰 2，2 淘汰 3，5 淘汰 4，累计 7 次；随后访问 1、2 均命中；3 淘汰 5、4 淘汰 1、5 淘汰 2，再缺 3 次，共 10 次。12 次引用中命中 2 次，故缺页 10 次。',
      tags: ['计算', '难点']
    },

    /* ---------------- 数据结构与算法 +16（6/4/6） ---------------- */
    {
      id: 'DS-041', module: 'ds-algorithm', topic: '串', difficulty: 1, points: ['ds-algorithm|线性结构'],
      stem: '朴素（Brute-Force）串匹配算法在最坏情况下的时间复杂度为（ ）。',
      options: ['O(n)', 'O(m)', 'O(n×m)', 'O(n+m)'],
      answer: 2,
      explanation: '主串长 n、模式串长 m 时，最坏情况下每个起点都要比较 m 个字符，共 O(n×m)；KMP 通过 next 数组把匹配阶段降到 O(n+m)。',
      tags: ['理解']
    },
    {
      id: 'DS-042', module: 'ds-algorithm', topic: '栈', difficulty: 2, points: ['ds-algorithm|线性结构'],
      stem: '入栈序列为 1、2、3、4，下列不可能的出栈序列是（ ）。',
      options: ['1,2,3,4', '4,3,2,1', '2,3,4,1', '3,1,2,4'],
      answer: 3,
      explanation: '若先弹出 3，说明 1、2 已依次入栈且 2 在 1 之上，此时只能先弹出 2 再弹出 1，不可能出现 3 之后紧跟 1。其余三个序列都可由合法的入栈出栈交替完成。',
      tags: ['分析']
    },
    {
      id: 'DS-043', module: 'ds-algorithm', topic: '线性表', difficulty: 1, points: ['ds-algorithm|线性结构'],
      stem: '在单链表中指针 p 所指结点之后插入结点 s，正确的操作序列是（ ）。',
      options: ['s->next = p->next; p->next = s;', 'p->next = s; s->next = p->next;', 's->next = p; p->next = s;', 'p->next = s->next; s->next = p;'],
      answer: 0,
      explanation: '必须先让 s 接管 p 原来的后继，再让 p 指向 s，否则 p 原来的后继链会丢失。颠倒两步会让 s->next 指向 s 自身，形成断链或自环。',
      tags: ['理解', '易错']
    },
    {
      id: 'DS-044', module: 'ds-algorithm', topic: 'B树', difficulty: 3, points: ['ds-algorithm|树与二叉树'],
      stem: '一棵 5 阶 B 树，除根结点外，每个非叶结点至少含有的关键字个数为（ ）。',
      options: ['1', '2', '3', '4'],
      answer: 1,
      explanation: 'm 阶 B 树除根外每个结点至少有 ⌈m/2⌉ 棵子树，即 ⌈5/2⌉ - 1 = 2 个关键字，最多 m - 1 = 4 个。根结点若不为叶结点，至少有 1 个关键字。',
      tags: ['理解', '难点']
    },
    {
      id: 'DS-045', module: 'ds-algorithm', topic: '二叉排序树', difficulty: 1, points: ['ds-algorithm|树与二叉树'],
      stem: '对二叉排序树进行（ ）遍历，可得到按关键字递增的有序序列。',
      options: ['先序', '后序', '中序', '层序'],
      answer: 2,
      explanation: '二叉排序树满足左子树 < 根 < 右子树，中序遍历按「左-根-右」访问，正好得到递增序列。先序与后序都不能保证有序。',
      tags: ['理解']
    },
    {
      id: 'DS-046', module: 'ds-algorithm', topic: '二叉排序树', difficulty: 3, points: ['ds-algorithm|树与二叉树'],
      stem: '依次插入 1、2、3、4、5 构造二叉排序树，查找成功的平均查找长度为（ ）。',
      options: ['2.2', '2.5', '1.5', '3'],
      answer: 3,
      explanation: '依次插入递增序列使树退化为单支树，5 个结点的查找长度分别为 1、2、3、4、5，平均 (1+2+3+4+5)/5 = 3。这说明插入顺序会影响二叉排序树的形态与效率。',
      tags: ['计算', '易错']
    },
    {
      id: 'DS-047', module: 'ds-algorithm', topic: '哈夫曼树', difficulty: 2, points: ['ds-algorithm|树与二叉树'],
      stem: '对权值集合 {2,3,4,5} 构造哈夫曼树，其带权路径长度（WPL）为（ ）。',
      options: ['28', '33', '24', '30'],
      answer: 0,
      explanation: '每次合并最小的两个权值：2+3=5，再 4+5=9，最后 5+9=14；WPL 等于所有合并结果之和 5+9+14 = 28，也可按 (2+3+4+5)×2 = 28 验算。',
      tags: ['计算', '高频']
    },
    {
      id: 'DS-048', module: 'ds-algorithm', topic: '哈夫曼树', difficulty: 1, points: ['ds-algorithm|树与二叉树'],
      stem: '关于哈夫曼编码，下列说法正确的是（ ）。',
      options: ['哈夫曼编码是定长编码', '哈夫曼编码是前缀编码，任一编码都不是其他编码的前缀', '同一组权值构造的哈夫曼编码唯一', '哈夫曼树中权值越大的叶结点离根越远'],
      answer: 1,
      explanation: '哈夫曼编码从根到叶的路径对应编码，任一编码都不会是另一编码的前缀，因此解码无歧义；它是变长编码，权值大的字符编码短、离根近；左右子树约定不同会产生不同的等价编码。',
      tags: ['理解']
    },
    {
      id: 'DS-049', module: 'ds-algorithm', topic: '最短路径', difficulty: 2, points: ['ds-algorithm|图'],
      stem: 'Dijkstra 算法不能正确处理（ ）的图。',
      options: ['无向图', '有向图', '含负权边的图', '稠密图'],
      answer: 2,
      explanation: 'Dijkstra 基于贪心，假定已确定的最短路径不会再被更短的路径取代；存在负权边时该假定不成立，应改用 Bellman-Ford 或 Floyd 算法。',
      tags: ['理解', '易错']
    },
    {
      id: 'DS-050', module: 'ds-algorithm', topic: '最短路径', difficulty: 3, points: ['ds-algorithm|图'],
      stem: '采用 Floyd 算法求每对顶点之间的最短路径，时间复杂度为（ ）。',
      options: ['O(n)', 'O(n²)', 'O(e log n)', 'O(n³)'],
      answer: 3,
      explanation: 'Floyd 以每个顶点作为中间点，三重循环更新距离矩阵，时间复杂度 O(n³)、空间 O(n²)，适合稠密图与需要全部顶点对最短路径的场景。',
      tags: ['理解']
    },
    {
      id: 'DS-051', module: 'ds-algorithm', topic: '最小生成树', difficulty: 1, points: ['ds-algorithm|图'],
      stem: '关于最小生成树，下列说法正确的是（ ）。',
      options: ['一个连通图的最小生成树可能不唯一，但各棵的权值之和相同', '最小生成树一定唯一', '生成树的边数等于顶点数', 'Prim 算法只适合稀疏图'],
      answer: 0,
      explanation: '当图中存在权值相同的边时，最小生成树可能有多棵，但最小权值和唯一；生成树边数为 n-1；Prim 适合稠密图，Kruskal 适合稀疏图。',
      tags: ['理解']
    },
    {
      id: 'DS-052', module: 'ds-algorithm', topic: '最小生成树', difficulty: 3, points: ['ds-algorithm|图'],
      stem: 'Kruskal 算法的时间复杂度主要取决于（ ）。',
      options: ['顶点数', '边数及对边排序的开销，约为 O(e log e)', '顶点数的平方', '图的直径'],
      answer: 1,
      explanation: 'Kruskal 先对所有边按权值排序（O(e log e)），再用并查集判断是否成环（接近 O(e)），因此主要开销在排序，适合稀疏图；Prim 的复杂度取决于顶点数。',
      tags: ['分析']
    },
    {
      id: 'DS-053', module: 'ds-algorithm', topic: '拓扑排序', difficulty: 2, points: ['ds-algorithm|图'],
      stem: '一个有向图能够进行拓扑排序的充要条件是（ ）。',
      options: ['图是连通图', '每个顶点的入度都大于 0', '图中不存在回路，即是有向无环图', '边数小于顶点数'],
      answer: 2,
      explanation: '存在回路时有向图中会留下入度不为 0 的顶点，无法输出全部顶点；因此拓扑排序可行当且仅当图是有向无环图（DAG）。',
      tags: ['理解']
    },
    {
      id: 'DS-054', module: 'ds-algorithm', topic: '关键路径', difficulty: 3, points: ['ds-algorithm|图'],
      stem: '某活动的最早开始时间为 6，最迟开始时间为 9，则该活动的总时差为（ ）。',
      options: ['15', '6', '9', '3'],
      answer: 3,
      explanation: '总时差 = 最迟开始时间 - 最早开始时间 = 9 - 6 = 3。总时差为 0 的活动位于关键路径上，其延误将直接推迟整个工期。',
      tags: ['计算']
    },
    {
      id: 'DS-055', module: 'ds-algorithm', topic: '复杂度', difficulty: 3, points: ['ds-algorithm|算法设计与复杂度'],
      stem: '递归式 T(n) = 2T(n/2) + O(n) 的解为（ ）。',
      options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
      answer: 0,
      explanation: '由主定理，a = 2、b = 2、f(n) = O(n)，n^(log_b a) = n，属于 Θ(n log n)；该式正是归并排序与二分归并类算法的复杂度。',
      tags: ['分析', '难点']
    },
    {
      id: 'DS-056', module: 'ds-algorithm', topic: '算法设计', difficulty: 1, points: ['ds-algorithm|算法设计与复杂度'],
      stem: '求 0-1 背包问题的最优解通常采用（ ）。',
      options: ['贪心算法', '动态规划', '分治算法', '广度优先搜索'],
      answer: 1,
      explanation: '0-1 背包的物品不可分割，按单位价值贪心可能剩下空间浪费，不能保证最优；动态规划用状态 dp[i][j] 逐件决策，可在伪多项式时间内得到最优解。',
      tags: ['理解', '高频']
    },

    /* ---------------- 程序设计语言与编译 +10（4/2/4） ---------------- */
    {
      id: 'PL-026', module: 'programming-language', topic: '参数传递', difficulty: 1, points: ['programming-language|语言基础'],
      stem: '采用传值调用（call by value）时，形参在函数体内的修改（ ）。',
      options: ['会改变实参的值', '会改变实参的存储地址', '不会影响实参的值', '会改变所有全局变量的值'],
      answer: 2,
      explanation: '传值把实参的值复制给形参，形参与实参是两块不同的存储单元，函数内修改形参不影响实参；若需要修改实参，应使用传地址或传引用。',
      tags: ['理解']
    },
    {
      id: 'PL-027', module: 'programming-language', topic: '参数传递', difficulty: 3, points: ['programming-language|语言基础'],
      stem: '传名调用（call by name）的特点是（ ）。',
      options: ['先把实参求值一次再传入', '传入实参的地址而不是值', '形参只在函数返回时求值一次', '形参在函数体每次出现时都重新对实参求值'],
      answer: 3,
      explanation: '传名调用本质是文本替换，形参每被引用一次就重新求值一次，因此若实参是含副作用的表达式，可能被多次求值并得到与传值不同的结果。',
      tags: ['分析', '难点']
    },
    {
      id: 'PL-028', module: 'programming-language', topic: '正规式', difficulty: 2, points: ['programming-language|文法与自动机'],
      stem: '正规式 (a|b)* 所描述的语言是（ ）。',
      options: ['由 a、b 组成的任意串，包含空串', '至少含一个 a 的串', '必须以 a 开头的串', '长度为偶数的串'],
      answer: 0,
      explanation: '* 表示闭包，允许重复 0 次，因此包含空串；每个位置可以是 a 或 b，所以是 {a,b} 上的全集。若要排除空串，应写作 (a|b)+。',
      tags: ['理解']
    },
    {
      id: 'PL-029', module: 'programming-language', topic: '有限自动机', difficulty: 3, points: ['programming-language|文法与自动机'],
      stem: '与 NFA 相比，DFA 的特点是（ ）。',
      options: ['允许 ε 转移', '每个状态对每个输入符号至多有一条转移', '可以识别上下文无关语言', '状态数一定少于对应的 NFA'],
      answer: 1,
      explanation: 'DFA 的转移是确定的：同一状态同一输入至多一个后继，且无 ε 转移；NFA 允许同一输入多条转移和 ε 转移。二者识别能力相同（正规语言），NFA 转 DFA 后状态数可能指数增长。',
      tags: ['理解', '易错']
    },
    {
      id: 'PL-030', module: 'programming-language', topic: '文法', difficulty: 1, points: ['programming-language|文法与自动机'],
      stem: '上下文无关文法对应乔姆斯基文法体系中的（ ）。',
      options: ['0 型', '1 型', '2 型', '3 型'],
      answer: 2,
      explanation: '0 型为短语文法（图灵机），1 型为上下文有关文法（线性界限自动机），2 型为上下文无关文法（下推自动机），3 型为正规文法（有限自动机）。',
      tags: ['理解', '必会']
    },
    {
      id: 'PL-031', module: 'programming-language', topic: '中间代码', difficulty: 2, points: ['programming-language|编译过程'],
      stem: '与三元式相比，四元式的特点是（ ）。',
      options: ['不产生临时变量', '用序号引用中间结果', '不能表示赋值运算', '显式给出结果变量，便于优化与指令重排'],
      answer: 3,
      explanation: '四元式形如 (运算符, 操作数1, 操作数2, 结果)，结果用变量显式表示；三元式用序号引用中间结果，一旦调整指令次序就要修改所有引用序号，不利于优化。',
      tags: ['理解']
    },
    {
      id: 'PL-032', module: 'programming-language', topic: '中间代码', difficulty: 3, points: ['programming-language|编译过程'],
      stem: '表达式 a*(b+c)-d 的后缀式（逆波兰式）为（ ）。',
      options: ['a b c + * d -', 'a b c * + d -', '- * a + b c d', 'a b + c * d -'],
      answer: 0,
      explanation: '先算括号内 b+c → b c +，再与 a 相乘 → a b c + *，最后减 d → a b c + * d -。后缀式中运算符位于两个操作数之后，无需括号即可唯一确定运算顺序。',
      tags: ['计算', '高频']
    },
    {
      id: 'PL-033', module: 'programming-language', topic: '编译过程', difficulty: 1, points: ['programming-language|编译过程'],
      stem: '词法分析阶段的主要任务是（ ）。',
      options: ['检查语法结构是否符合文法', '把源程序分解为单词符号（token）序列', '生成目标代码', '进行类型检查'],
      answer: 1,
      explanation: '词法分析按构词规则扫描字符流，输出单词符号（关键字、标识符、常数、界符）及其属性；语法结构检查在语法分析阶段，类型检查在语义分析阶段。',
      tags: ['理解']
    },
    {
      id: 'PL-034', module: 'programming-language', topic: '表达式', difficulty: 3, points: ['programming-language|表达式与程序结构'],
      stem: '文法 G：E → E + T | T 的主要问题是（ ）。',
      options: ['不含左递归，无法进行自顶向下分析', '是二义性文法', '含直接左递归，必须先消除左递归才能进行自顶向下分析', '不是上下文无关文法'],
      answer: 2,
      explanation: 'E → E + T 的第一个候选式以非终结符 E 开头，属于直接左递归；递归下降等自顶向下分析器会无限递归，因此需先改写为 E → T E′、E′ → + T E′ | ε。',
      tags: ['分析', '难点']
    },
    {
      id: 'PL-035', module: 'programming-language', topic: '语言基础', difficulty: 1, points: ['programming-language|语言基础'],
      stem: '与解释方式相比，编译方式的特点是（ ）。',
      options: ['逐句翻译并立即执行', '不生成目标代码', '执行效率低但可移植性好', '先整体翻译为目标代码再执行，执行效率高'],
      answer: 3,
      explanation: '编译方式先整体翻译成目标代码，运行时无需再翻译，故执行效率高，但目标代码与平台相关、可移植性差；解释方式逐句翻译执行，灵活但效率低。',
      tags: ['理解']
    },

    /* ---------------- 软件工程 +24（9/6/9） ---------------- */
    {
      id: 'SE-061', module: 'software-engineering', topic: '内聚', difficulty: 1, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '下列内聚类型中，内聚度最高的是（ ）。',
      options: ['功能内聚', '逻辑内聚', '时间内聚', '偶然内聚'],
      answer: 0,
      explanation: '内聚度由低到高为偶然、逻辑、时间、过程、通信、顺序、功能。功能内聚中所有元素共同完成一个且仅一个功能，内聚度最高。',
      tags: ['理解', '必会']
    },
    {
      id: 'SE-062', module: 'software-engineering', topic: '内聚', difficulty: 2, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '模块内各处理元素使用同一输入数据或产生同一输出数据，这种内聚是（ ）。',
      options: ['逻辑内聚', '通信内聚', '过程内聚', '顺序内聚'],
      answer: 1,
      explanation: '通信内聚指模块内各元素操作同一数据集（同一输入或同一输出）；顺序内聚要求前一部分的输出是后一部分的输入，过程内聚只要求处理顺序相关而不共享数据。',
      tags: ['理解']
    },
    {
      id: 'SE-063', module: 'software-engineering', topic: '内聚', difficulty: 3, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '按内聚度由低到高排列，正确的是（ ）。',
      options: ['功能、顺序、通信、偶然', '偶然、功能、逻辑、时间', '偶然、逻辑、时间、通信、顺序、功能', '时间、逻辑、通信、功能、顺序'],
      answer: 2,
      explanation: '标准次序为偶然 < 逻辑 < 时间 < 过程 < 通信 < 顺序 < 功能，题干中的序列省略了过程内聚，但相对高低关系仍成立。',
      tags: ['分析']
    },
    {
      id: 'SE-064', module: 'software-engineering', topic: '模块化', difficulty: 2, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '设计良好的软件结构通常要求（ ）。',
      options: ['扇入大、扇出也大', '扇入小、扇出小', '扇入小、扇出大', '扇入大、扇出小，上层模块扇出适中'],
      answer: 3,
      explanation: '扇入大说明模块被多处复用、价值高；扇出小说明模块控制的下级少、结构清晰。顶层模块扇出可略大，但一般控制在 3~7 个以内。',
      tags: ['理解']
    },
    {
      id: 'SE-065', module: 'software-engineering', topic: '模块化', difficulty: 3, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '软件结构的「深度」是指（ ）。',
      options: ['模块调用的最大层数', '同一层中模块的最大个数', '模块的总数', '一个模块直接调用的下级模块个数'],
      answer: 0,
      explanation: '深度表示调用层次的最大值，宽度表示同一层模块数的最大值；一个模块的直接下级个数是扇出，模块总数是规模。',
      tags: ['理解', '易错']
    },
    {
      id: 'SE-066', module: 'software-engineering', topic: '过程改进', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: 'CMMI 中，过程已量化管理、可用统计方法控制对应（ ）等级。',
      options: ['已管理级（2 级）', '已量化管理级（4 级）', '已定义级（3 级）', '优化级（5 级）'],
      answer: 1,
      explanation: 'CMMI 阶段式 5 级为：初始级、已管理级、已定义级、已量化管理级、优化级。4 级强调对过程性能的定量理解与统计控制，5 级强调持续优化。',
      tags: ['理解']
    },
    {
      id: 'SE-067', module: 'software-engineering', topic: '过程改进', difficulty: 3, points: ['software-engineering|维护与项目管理'],
      stem: '关于 CMMI 阶段式表示法，下列说法正确的是（ ）。',
      options: ['各过程域可独立评级，不要求整体成熟度', '共分 3 个成熟度等级', '成熟度等级由低到高为初始、已管理、已定义、已量化管理、优化', '第 2 级要求所有过程域达到量化管理'],
      answer: 2,
      explanation: '阶段式表示法用 5 个成熟度等级衡量组织整体能力，逐级提升；连续式表示法才允许对各过程域独立评级。量化管理出现在第 4 级，而非第 2 级。',
      tags: ['分析']
    },
    {
      id: 'SE-068', module: 'software-engineering', topic: '软件质量', difficulty: 1, points: ['software-engineering|维护与项目管理'],
      stem: '下列选项中，不属于 ISO/IEC 9126 软件质量特性的是（ ）。',
      options: ['功能性', '可靠性', '可维护性', '经济性'],
      answer: 3,
      explanation: 'ISO/IEC 9126 的六个质量特性是功能性、可靠性、易用性、效率、可维护性、可移植性；经济性不是其中的质量特性。',
      tags: ['理解', '易错']
    },
    {
      id: 'SE-069', module: 'software-engineering', topic: '软件质量', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '某程序流图有 10 条边、8 个结点、3 个判定结点，其 McCabe 环路复杂度为（ ）。',
      options: ['4', '3', '2', '5'],
      answer: 0,
      explanation: 'V(G) = E - N + 2 = 10 - 8 + 2 = 4，也可用判定结点数 + 1 = 4 验证。环路复杂度等于独立路径数，是白盒测试需覆盖的基本路径条数。',
      tags: ['计算']
    },
    {
      id: 'SE-070', module: 'software-engineering', topic: '详细设计', difficulty: 1, points: ['software-engineering|详细设计与复杂度'],
      stem: '下列详细设计工具中，不能表示程序控制结构的是（ ）。',
      options: ['程序流程图', '数据流图', 'N-S 图', 'PAD 图'],
      answer: 1,
      explanation: '数据流图描述数据在系统中的流动与加工，属于需求分析阶段的结构化分析工具；程序流程图、N-S 图、PAD 图都用于表示详细设计的控制结构。',
      tags: ['理解', '易错']
    },
    {
      id: 'SE-071', module: 'software-engineering', topic: '详细设计', difficulty: 2, points: ['software-engineering|详细设计与复杂度'],
      stem: '判定表最适合描述（ ）。',
      options: ['顺序执行的处理过程', '数据的静态结构', '多个条件组合对应不同动作的加工逻辑', '模块之间的调用关系'],
      answer: 2,
      explanation: '判定表用条件桩与动作桩列出条件组合及其对应动作，特别适合条件多、组合多、逻辑复杂的加工说明；条件少时可用判定树替代。',
      tags: ['理解']
    },
    {
      id: 'SE-072', module: 'software-engineering', topic: '软件维护', difficulty: 1, points: ['software-engineering|维护与项目管理'],
      stem: '为适应操作系统升级、外部设备变化而修改软件，属于（ ）。',
      options: ['正确性维护', '预防性维护', '完善性维护', '适应性维护'],
      answer: 3,
      explanation: '适应性维护是让软件适应变化的外部环境（操作系统、硬件、数据格式）；完善性维护是增加新功能或改进性能，正确性维护是修缺陷，预防性维护是提高未来可维护性。',
      tags: ['理解', '高频']
    },
    {
      id: 'SE-073', module: 'software-engineering', topic: '软件维护', difficulty: 3, points: ['software-engineering|维护与项目管理'],
      stem: '在软件维护的四类工作中，通常工作量占比最高的是（ ）。',
      options: ['完善性维护', '正确性维护', '适应性维护', '预防性维护'],
      answer: 0,
      explanation: '统计表明完善性维护约占维护工作量的一半左右，因为用户在使用中不断提出功能增强与性能改进需求；正确性维护约占两成，其余为适应性与预防性维护。',
      tags: ['理解']
    },
    {
      id: 'SE-074', module: 'software-engineering', topic: '项目管理', difficulty: 1, points: ['software-engineering|维护与项目管理'],
      stem: '位于关键路径上的活动，其总浮动时间为（ ）。',
      options: ['大于 0', '0', '小于 0', '等于总工期'],
      answer: 1,
      explanation: '关键路径是总工期最长的路径，路径上活动的总时差为 0，任何延误都会直接推迟项目完成时间；非关键活动的总时差大于 0。',
      tags: ['理解']
    },
    {
      id: 'SE-075', module: 'software-engineering', topic: '项目管理', difficulty: 3, points: ['software-engineering|维护与项目管理'],
      stem: '采用 PERT 三点估算，乐观 4 天、最可能 6 天、悲观 14 天，期望工期为（ ）。',
      options: ['6 天', '8 天', '7 天', '24 天'],
      answer: 2,
      explanation: '期望工期 = (乐观 + 4 × 最可能 + 悲观) / 6 = (4 + 24 + 14) / 6 = 7 天。三点估算用加权平均降低单一估计的偏差，括号内不能简单取平均。',
      tags: ['计算']
    },
    {
      id: 'SE-076', module: 'software-engineering', topic: '耦合', difficulty: 1, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '下列耦合类型中，耦合度最低的是（ ）。',
      options: ['公共耦合', '控制耦合', '标记耦合', '非直接耦合'],
      answer: 3,
      explanation: '耦合度由低到高为：非直接耦合、数据耦合、标记耦合、控制耦合、外部耦合、公共耦合、内容耦合。两个模块之间没有直接关系时耦合最低。',
      tags: ['理解', '必会']
    },
    {
      id: 'SE-077', module: 'software-engineering', topic: '耦合', difficulty: 3, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '一个模块直接访问另一个模块的内部数据，这种耦合是（ ）。',
      options: ['内容耦合', '公共耦合', '外部耦合', '数据耦合'],
      answer: 0,
      explanation: '内容耦合指一个模块直接访问另一模块的内部数据或转入其内部，耦合度最高，应尽量避免；公共耦合是多个模块共享全局数据区，数据耦合只通过参数传递简单数据。',
      tags: ['理解', '高频']
    },
    {
      id: 'SE-078', module: 'software-engineering', topic: '需求工程', difficulty: 1, points: ['software-engineering|需求工程'],
      stem: '需求分析阶段的主要成果是（ ）。',
      options: ['可行性研究报告', '软件需求规格说明书', '概要设计说明书', '测试计划'],
      answer: 1,
      explanation: '需求分析的输出是软件需求规格说明书（SRS），作为设计与验收的依据；可行性研究在需求分析之前，概要设计说明书属于设计阶段。',
      tags: ['理解']
    },
    {
      id: 'SE-079', module: 'software-engineering', topic: '需求工程', difficulty: 3, points: ['software-engineering|需求工程'],
      stem: '用户无法清楚描述需求、需求频繁变化时，最适合的开发模型是（ ）。',
      options: ['瀑布模型', 'V 模型', '原型模型', '净室模型'],
      answer: 2,
      explanation: '原型模型通过快速构建可运行原型帮助用户澄清需求，适合需求不明确的项目；瀑布与 V 模型要求需求在早期稳定，净室模型强调形式化与零缺陷，不适合需求探索。',
      tags: ['分析']
    },
    {
      id: 'SE-080', module: 'software-engineering', topic: '开发模型', difficulty: 1, points: ['software-engineering|开发模型'],
      stem: '螺旋模型以（ ）为核心。',
      options: ['文档驱动', '代码复用', '快速交付', '风险分析'],
      answer: 3,
      explanation: '螺旋模型每轮迭代都包含制定计划、风险分析、实施工程、客户评估四个象限，其中风险分析是区别于其他模型的核心，适合大型高风险项目。',
      tags: ['理解']
    },
    {
      id: 'SE-081', module: 'software-engineering', topic: '开发模型', difficulty: 3, points: ['software-engineering|开发模型'],
      stem: '关于增量模型，下列说法正确的是（ ）。',
      options: ['分批交付可运行的产品，先交付核心功能', '需求必须一次确定，之后不能变更', '每个增量都必须完整通过全部测试后才能开始下一个增量', '只适用于小型系统'],
      answer: 0,
      explanation: '增量模型把系统按功能分批构造与交付，首批通常实现核心功能，用户可尽早使用并反馈；它允许需求逐步明确，但要求良好的体系结构以支持后续增量集成。',
      tags: ['分析']
    },
    {
      id: 'SE-082', module: 'software-engineering', topic: '软件测试', difficulty: 2, points: ['software-engineering|软件测试'],
      stem: '下列覆盖标准中，覆盖强度最高的是（ ）。',
      options: ['语句覆盖', '路径覆盖', '判定覆盖', '条件覆盖'],
      answer: 1,
      explanation: '路径覆盖要求执行程序中所有可能的路径，强度最高；语句覆盖最弱，判定覆盖与条件覆盖强于语句覆盖但弱于路径覆盖（条件组合覆盖介于其间）。',
      tags: ['理解']
    },
    {
      id: 'SE-083', module: 'software-engineering', topic: '软件测试', difficulty: 3, points: ['software-engineering|软件测试'],
      stem: '输入范围为 1 ≤ x ≤ 100 的整数，采用边界值分析，至少应选取的测试数据是（ ）。',
      options: ['50', '1、100', '0、1、100、101', '1、2、99、100'],
      answer: 2,
      explanation: '边界值分析取边界及其邻近值：下界 1 与刚好越界的 0，上界 100 与刚好越界的 101，共 4 个；只取端点会漏掉越界检查，取 1、2、99、100 则缺少越界值。',
      tags: ['分析', '高频']
    },
    {
      id: 'SE-084', module: 'software-engineering', topic: '敏捷开发', difficulty: 1, points: ['software-engineering|开发模型'],
      stem: '敏捷开发强调（ ）。',
      options: ['详尽的文档优先于可工作的软件', '严格遵循计划优先于响应变化', '合同谈判优先于客户合作', '可工作的软件优先于详尽的文档'],
      answer: 3,
      explanation: '敏捷宣言的四条价值观是：个体与交互高于流程与工具、可工作的软件高于详尽的文档、客户合作高于合同谈判、响应变化高于遵循计划。',
      tags: ['理解']
    },

    /* ---------------- 面向对象与 UML +18（7/5/6） ---------------- */
    {
      id: 'OO-046', module: 'oo-uml', topic: '面向对象基础', difficulty: 1, points: ['oo-uml|面向对象基础'],
      stem: '同一消息被不同对象接收后产生不同的行为，这体现了面向对象的（ ）。',
      options: ['多态', '封装', '继承', '抽象'],
      answer: 0,
      explanation: '多态指同一消息（方法调用）在不同对象上表现出不同实现，依赖动态绑定；封装隐藏实现细节，继承复用父类结构与行为，抽象提取共性。',
      tags: ['理解', '必会']
    },
    {
      id: 'OO-047', module: 'oo-uml', topic: '面向对象基础', difficulty: 2, points: ['oo-uml|面向对象基础'],
      stem: '关于重载（overload）与重写（override），下列说法正确的是（ ）。',
      options: ['重载发生在子类与父类之间，且为运行期绑定', '重载是同名不同参数、编译期绑定；重写是子类覆盖父类同签名方法、运行期绑定', '两者都在编译期完成绑定', '重写要求参数列表与父类不同'],
      answer: 1,
      explanation: '重载在同一个类中按参数列表区分，编译期确定调用哪个版本；重写要求方法签名相同，通过父类引用调用子类实现，运行期动态绑定。',
      tags: ['理解', '高频']
    },
    {
      id: 'OO-048', module: 'oo-uml', topic: '用例图', difficulty: 1, points: ['oo-uml|UML 图'],
      stem: '用例图中，参与者与用例之间的关系是（ ）。',
      options: ['泛化', '包含', '关联', '扩展'],
      answer: 2,
      explanation: '参与者与用例之间用关联（实线）连接，表示参与者参与了该用例；包含与扩展用于用例之间，泛化用于参与者之间或用例之间。',
      tags: ['理解']
    },
    {
      id: 'OO-049', module: 'oo-uml', topic: '用例图', difficulty: 2, points: ['oo-uml|UML 图'],
      stem: '若用例 B 是用例 A 在特定条件下才发生的可选行为，A 与 B 之间应使用（ ）关系。',
      options: ['包含（include）', '泛化', '关联', '扩展（extend）'],
      answer: 3,
      explanation: '扩展关系表示在满足扩展条件时才插入的可选行为，箭头由扩展用例指向基用例；包含关系表示基用例每次执行都必须调用的公共行为。',
      tags: ['理解', '易错']
    },
    {
      id: 'OO-050', module: 'oo-uml', topic: '用例图', difficulty: 3, points: ['oo-uml|UML 图'],
      stem: '关于用例图中的 include 关系，下列说法正确的是（ ）。',
      options: ['被包含用例是基用例每次执行都必须执行的公共行为', '被包含用例只在特定条件下才执行', 'include 与 extend 可以互换使用', 'include 表示参与者之间的继承关系'],
      answer: 0,
      explanation: 'include 提取多个用例共有的必执行行为，基用例执行时必然调用被包含用例；extend 才是条件触发的可选行为，两者语义不同，不能互换。',
      tags: ['分析']
    },
    {
      id: 'OO-051', module: 'oo-uml', topic: '类图关系', difficulty: 1, points: ['oo-uml|UML 图'],
      stem: '整体与部分具有相同生命周期、部分不能脱离整体独立存在，这种关系是（ ）。',
      options: ['聚合', '组合', '依赖', '泛化'],
      answer: 1,
      explanation: '组合（强聚合）中部分随整体创建与销毁，生命周期一致，用实心菱形表示；聚合中部分可独立存在，用空心菱形表示。',
      tags: ['理解', '高频']
    },
    {
      id: 'OO-052', module: 'oo-uml', topic: '类图关系', difficulty: 2, points: ['oo-uml|UML 图'],
      stem: '类图中「1 个订单包含 1 个或多个订单项」，订单与订单项之间的多重度应标注为（ ）。',
      options: ['1 对 1', '1 对 0..1', '1 对 1..*', '1 对 *..1'],
      answer: 2,
      explanation: '「1 个或多个」写作 1..*，表示下界为 1、上界不限；0..1 表示可选的一个，*..1 不是合法的多重度写法。',
      tags: ['理解']
    },
    {
      id: 'OO-053', module: 'oo-uml', topic: '类图关系', difficulty: 3, points: ['oo-uml|UML 图'],
      stem: '类 A 的方法以类 B 的对象作为参数并在方法体内使用，A 与 B 之间最合适的关系是（ ）。',
      options: ['泛化', '组合', '聚合', '依赖'],
      answer: 3,
      explanation: 'A 只是在方法执行期间临时使用 B，B 不是 A 的成员，也不存在整体-部分关系，应建模为依赖（虚线箭头）；若 B 是 A 的成员变量且生命周期独立，才考虑聚合。',
      tags: ['分析', '易错']
    },
    {
      id: 'OO-054', module: 'oo-uml', topic: 'OOA', difficulty: 2, points: ['oo-uml|面向对象分析与设计'],
      stem: '面向对象分析中，用于表示系统与外部交互界面的类是（ ）。',
      options: ['边界类', '实体类', '控制类', '工具类'],
      answer: 0,
      explanation: '边界类负责系统与参与者之间的交互（界面、接口），实体类表示业务数据，控制类协调用例的执行流程。三类合称分析类。',
      tags: ['理解']
    },
    {
      id: 'OO-055', module: 'oo-uml', topic: 'OOA', difficulty: 1, points: ['oo-uml|面向对象分析与设计'],
      stem: '面向对象分析阶段建立的分析模型，其核心是（ ）。',
      options: ['数据库表结构', '问题域中的对象及其关系', '程序流程图', '模块调用关系'],
      answer: 1,
      explanation: 'OOA 从问题域中识别对象、属性、行为与关系，形成以类图和交互图为核心的分析模型；数据库表结构与程序流程图属于设计阶段的产物。',
      tags: ['理解']
    },
    {
      id: 'OO-056', module: 'oo-uml', topic: 'OOA', difficulty: 3, points: ['oo-uml|面向对象分析与设计'],
      stem: '顺序图与通信图（协作图）的共同点是（ ）。',
      options: ['都强调对象的内部状态变化', '都描述类之间的静态结构', '都描述对象之间的消息交互，二者语义等价', '都只能表示同步消息'],
      answer: 2,
      explanation: '两者都属于交互图，描述对象之间按消息协作完成用例，语义等价、可相互转换：顺序图强调时间顺序，通信图强调对象间的链接关系。',
      tags: ['理解']
    },
    {
      id: 'OO-057', module: 'oo-uml', topic: '设计原则', difficulty: 1, points: ['oo-uml|面向对象分析与设计'],
      stem: '一个类只负责一项职责，这符合（ ）原则。',
      options: ['开闭原则', '里氏替换原则', '依赖倒置原则', '单一职责原则'],
      answer: 3,
      explanation: '单一职责原则要求一个类只有一个引起它变化的原因；职责过多会导致类臃肿、耦合增加，修改一处容易影响其他功能。',
      tags: ['理解']
    },
    {
      id: 'OO-058', module: 'oo-uml', topic: '设计原则', difficulty: 2, points: ['oo-uml|面向对象分析与设计'],
      stem: '「对扩展开放、对修改关闭」指的是（ ）原则。',
      options: ['开闭原则', '接口隔离原则', '合成复用原则', '迪米特法则'],
      answer: 0,
      explanation: '开闭原则要求通过新增代码扩展功能，而不是修改已有稳定代码，常借助抽象与多态实现；迪米特法则强调最少知识，接口隔离强调拆分胖接口。',
      tags: ['理解', '高频']
    },
    {
      id: 'OO-059', module: 'oo-uml', topic: '设计原则', difficulty: 3, points: ['oo-uml|面向对象分析与设计'],
      stem: '子类对象能够替换父类对象而不改变程序的正确性，这体现的是（ ）原则。',
      options: ['依赖倒置原则', '里氏替换原则', '单一职责原则', '接口隔离原则'],
      answer: 1,
      explanation: '里氏替换原则要求子类可以扩展父类功能但不能改变父类原有语义，否则以父类类型编写的代码在替换为子类后会出现错误。',
      tags: ['理解']
    },
    {
      id: 'OO-060', module: 'oo-uml', topic: 'UML 图', difficulty: 3, points: ['oo-uml|UML 图'],
      stem: '描述一个对象在生命周期内的状态变化及触发事件的 UML 图是（ ）。',
      options: ['类图', '用例图', '状态图', '部署图'],
      answer: 2,
      explanation: '状态图以状态与迁移为核心，描述单个对象在事件驱动下的状态变迁；活动图描述业务流程或操作的控制流，两者容易混淆。',
      tags: ['理解', '易错']
    },
    {
      id: 'OO-061', module: 'oo-uml', topic: 'UML 图', difficulty: 3, points: ['oo-uml|UML 图'],
      stem: '部署图用于描述（ ）。',
      options: ['类的属性与方法', '用例与参与者之间的关系', '对象之间的消息时序', '软件构件在物理节点上的部署关系'],
      answer: 3,
      explanation: '部署图描述运行时的物理节点（服务器、设备）及部署其上的构件，反映系统的物理架构；构件图描述构件的组织与依赖。',
      tags: ['理解']
    },
    {
      id: 'OO-062', module: 'oo-uml', topic: '设计模式', difficulty: 1, points: ['oo-uml|设计模式（按目的分三类）'],
      stem: '保证一个类仅有一个实例并提供全局访问点，这种设计模式是（ ）。',
      options: ['单例模式', '工厂方法模式', '观察者模式', '适配器模式'],
      answer: 0,
      explanation: '单例模式把构造器私有化，通过静态方法返回唯一实例；工厂方法用于创建对象，观察者用于一对多通知，适配器用于接口转换。',
      tags: ['理解', '高频']
    },
    {
      id: 'OO-063', module: 'oo-uml', topic: '设计模式', difficulty: 1, points: ['oo-uml|设计模式（按目的分三类）'],
      stem: '观察者模式属于（ ）型设计模式。',
      options: ['创建', '行为', '结构', '架构'],
      answer: 1,
      explanation: '观察者模式定义对象间一对多的依赖，主题状态变化时自动通知观察者，属于行为型模式；创建型关注对象创建，结构型关注类与对象的组合。',
      tags: ['理解']
    },

    /* ---------------- 数据库系统 +14（5/4/5） ---------------- */
    {
      id: 'DB-036', module: 'database', topic: '事务', difficulty: 1, points: ['database|事务与并发'],
      stem: '事务的（ ）特性保证事务一旦提交，其结果被永久保存。',
      options: ['原子性', '一致性', '持久性', '隔离性'],
      answer: 2,
      explanation: '持久性（Durability）由日志与检查点机制保证，提交后的修改即使系统故障也不会丢失；原子性保证全做或全不做，隔离性保证并发事务互不干扰。',
      tags: ['理解', '必会']
    },
    {
      id: 'DB-037', module: 'database', topic: '事务', difficulty: 3, points: ['database|事务与并发'],
      stem: '要避免「不可重复读」现象，事务隔离级别至少应为（ ）。',
      options: ['READ UNCOMMITTED', 'READ COMMITTED', 'SERIALIZABLE 以下的任意级别', 'REPEATABLE READ'],
      answer: 3,
      explanation: 'READ UNCOMMITTED 会出现脏读，READ COMMITTED 解决脏读但仍有不可重复读，REPEATABLE READ 通过保持读锁或快照解决不可重复读，SERIALIZABLE 进一步解决幻读。',
      tags: ['理解', '高频']
    },
    {
      id: 'DB-038', module: 'database', topic: '索引', difficulty: 1, points: ['database|SQL'],
      stem: '为表建立索引后，通常会出现（ ）。',
      options: ['查询速度加快，但插入、删除与存储开销增加', '所有操作都变快', '查询速度下降', '数据冗余被自动消除'],
      answer: 0,
      explanation: '索引以额外的存储空间和维护代价换取查询效率：查询可减少扫描，但插入、删除、更新需要同步维护索引结构，写操作变慢。',
      tags: ['理解']
    },
    {
      id: 'DB-039', module: 'database', topic: '索引', difficulty: 3, points: ['database|SQL'],
      stem: '关系数据库中最常用的索引结构是（ ），其叶结点通过指针相连以支持范围查询。',
      options: ['散列表', 'B+ 树', '二叉排序树', '位图'],
      answer: 1,
      explanation: 'B+ 树所有数据都在叶结点、叶结点按键值有序并相互链接，既支持等值查询也支持范围扫描；散列索引只适合等值查询，二叉排序树高度大、磁盘 I/O 多。',
      tags: ['理解']
    },
    {
      id: 'DB-040', module: 'database', topic: '关系代数', difficulty: 2, points: ['database|关系代数与规范化'],
      stem: '关系代数中，从关系中选出满足条件的元组的运算是（ ）。',
      options: ['投影', '笛卡尔积', '选择', '连接'],
      answer: 2,
      explanation: '选择（σ）按条件筛选行，投影（π）按属性筛选列，笛卡尔积把两个关系组合，连接按条件合并两个关系的元组。',
      tags: ['理解']
    },
    {
      id: 'DB-041', module: 'database', topic: '关系代数', difficulty: 3, points: ['database|关系代数与规范化'],
      stem: '关系 R 有 4 个属性，关系 S 有 3 个属性，二者有一个公共属性，则 R 与 S 自然连接的属性个数为（ ）。',
      options: ['7', '4', '3', '6'],
      answer: 3,
      explanation: '自然连接在公共属性上做等值比较并去掉重复的公共属性列，属性数 = 4 + 3 - 1 = 6；若直接做笛卡尔积则为 7 个属性。',
      tags: ['计算']
    },
    {
      id: 'DB-042', module: 'database', topic: '数据库体系结构', difficulty: 2, points: ['database|数据库体系结构'],
      stem: '数据库的（ ）保证了数据的物理独立性。',
      options: ['模式/内模式映像', '外模式/模式映像', '数据字典', '日志文件'],
      answer: 0,
      explanation: '模式/内模式映像使内模式的改变（如存储结构、索引调整）不影响模式，从而实现物理独立性；外模式/模式映像保证逻辑独立性。',
      tags: ['理解', '高频']
    },
    {
      id: 'DB-043', module: 'database', topic: '数据库体系结构', difficulty: 1, points: ['database|数据库体系结构'],
      stem: '数据库三级模式结构中，描述全体数据逻辑结构的是（ ）。',
      options: ['外模式', '模式', '内模式', '存储模式'],
      answer: 1,
      explanation: '模式（概念模式）描述全体数据的逻辑结构与联系，外模式是面向用户的局部视图，内模式描述物理存储结构。',
      tags: ['理解']
    },
    {
      id: 'DB-044', module: 'database', topic: '备份与恢复', difficulty: 2, points: ['database|备份与恢复'],
      stem: '数据库恢复时，利用日志文件可以（ ）。',
      options: ['提高查询速度', '减少存储空间占用', '撤销未提交的事务，重做已提交但尚未写入磁盘的事务', '自动优化执行计划'],
      answer: 2,
      explanation: '恢复遵循「先反向扫描撤销（UNDO）未提交事务，再正向扫描重做（REDO）已提交事务」的流程，保证原子性与持久性。',
      tags: ['理解']
    },
    {
      id: 'DB-045', module: 'database', topic: '备份与恢复', difficulty: 3, points: ['database|备份与恢复'],
      stem: '与全量备份相比，增量备份的特点是（ ）。',
      options: ['每次备份时间最长、恢复最快', '每次都备份全部数据', '恢复时只需最近一次备份文件', '只备份自上次备份以来变化的数据，恢复时需按顺序应用多个备份'],
      answer: 3,
      explanation: '增量备份数据量小、备份快，但恢复时必须先恢复最近一次全量备份，再依次应用其后所有增量；差量备份则只备份自上次全量以来变化的数据。',
      tags: ['理解', '易错']
    },
    {
      id: 'DB-046', module: 'database', topic: '规范化', difficulty: 1, points: ['database|关系代数与规范化'],
      stem: '关系模式满足 1NF 是指（ ）。',
      options: ['每个属性都是不可再分的原子值', '不存在非主属性对码的部分函数依赖', '不存在传递函数依赖', '每个决定因素都包含码'],
      answer: 0,
      explanation: '1NF 要求属性不可再分（无重复组、无嵌套表）；在此基础上消除部分函数依赖得 2NF，消除传递函数依赖得 3NF，每个决定因素含码为 BCNF。',
      tags: ['理解', '必会']
    },
    {
      id: 'DB-047', module: 'database', topic: '规范化', difficulty: 2, points: ['database|关系代数与规范化'],
      stem: '关系模式 R(学号, 课程号, 成绩, 课程名)，码为（学号, 课程号），则 R 至少违反了（ ）。',
      options: ['1NF', '2NF', '3NF', 'BCNF 但满足 2NF'],
      answer: 1,
      explanation: '课程名只依赖于课程号（码的一部分），存在非主属性对码的部分函数依赖，因此不满足 2NF；拆分为 R1(课程号, 课程名) 与 R2(学号, 课程号, 成绩) 后可达 2NF。',
      tags: ['分析', '高频']
    },
    {
      id: 'DB-048', module: 'database', topic: 'ER 模型', difficulty: 3, points: ['database|ER 模型与关系转换'],
      stem: '一个 m:n 联系转换为关系模式时，该关系模式的码为（ ）。',
      options: ['任一端实体的码', '两端实体码的并集去掉公共属性', '两端实体码的组合', '联系自身生成的编号'],
      answer: 2,
      explanation: 'm:n 联系必须单独转换为一个关系模式，其码由参与联系的各实体码组合而成，联系的属性作为该关系的非主属性；1:n 联系可并入 n 端。',
      tags: ['理解', '高频']
    },
    {
      id: 'DB-049', module: 'database', topic: 'SQL', difficulty: 1, points: ['database|SQL'],
      stem: '对分组后的结果进行筛选，应使用（ ）子句。',
      options: ['WHERE', 'ORDER BY', 'GROUP BY', 'HAVING'],
      answer: 3,
      explanation: 'WHERE 在分组前过滤元组，HAVING 在 GROUP BY 之后过滤分组结果，可直接使用聚合函数；ORDER BY 只负责排序。',
      tags: ['理解', '高频']
    },

    /* ---------------- 计算机网络 +12（5/3/4） ---------------- */
    {
      id: 'NET-031', module: 'network', topic: '传输层', difficulty: 1, points: ['network|分层模型'],
      stem: '与 TCP 相比，UDP 的特点是（ ）。',
      options: ['无连接、开销小、不保证可靠交付', '提供可靠传输与流量控制', '面向连接并提供拥塞控制', '保证数据按序到达'],
      answer: 0,
      explanation: 'UDP 无连接、不确认、不重传、不排序，首部仅 8 字节，适合实时音视频、DNS 等场景；TCP 才提供可靠传输、流量控制与拥塞控制。',
      tags: ['理解', '高频']
    },
    {
      id: 'NET-032', module: 'network', topic: '传输层', difficulty: 2, points: ['network|分层模型'],
      stem: 'TCP 三次握手中，第二次报文（SYN+ACK）的作用是（ ）。',
      options: ['客户端请求建立连接', '确认客户端的序号并同步服务器自己的序号', '确认连接已经释放', '通告接收窗口为零'],
      answer: 1,
      explanation: '第二次报文同时完成两件事：ACK 确认客户端的 SYN 序号，SYN 同步服务器自己的初始序号；第三次报文再对服务器序号进行确认。',
      tags: ['理解']
    },
    {
      id: 'NET-033', module: 'network', topic: '传输层', difficulty: 3, points: ['network|分层模型'],
      stem: 'TCP 慢开始阶段，拥塞窗口的变化规律是（ ）。',
      options: ['线性增长', '保持不变', '按指数增长，直到达到慢开始门限', '每收到一个确认就减半'],
      answer: 2,
      explanation: '慢开始阶段每经过一个 RTT 拥塞窗口翻倍（指数增长），达到慢开始门限后转入拥塞避免，改为每个 RTT 加 1（线性增长）；拥塞发生时窗口减半并重新进入慢开始。',
      tags: ['理解', '难点']
    },
    {
      id: 'NET-034', module: 'network', topic: '传输介质', difficulty: 1, points: ['network|传输介质与编码'],
      stem: '下列关于光纤的叙述中，正确的是（ ）。',
      options: ['易受电磁干扰，只适合短距离传输', '只能传输模拟信号', '成本最低，适合桌面布线', '抗电磁干扰能力强、传输距离远，但施工与接续较复杂'],
      answer: 3,
      explanation: '光纤以光信号传输，不受电磁干扰、带宽大、衰减小，适合骨干网与长距离；缺点是接续需熔接设备、施工要求高，桌面布线通常仍用双绞线。',
      tags: ['理解']
    },
    {
      id: 'NET-035', module: 'network', topic: '传输介质', difficulty: 3, points: ['network|传输介质与编码'],
      stem: '采用 4B/5B 编码时，编码效率为（ ）。',
      options: ['80%', '50%', '100%', '125%'],
      answer: 0,
      explanation: '4B/5B 把每 4 位数据映射为 5 位码元，保证足够的跳变以便接收方提取时钟，编码效率 = 4/5 = 80%；100BASE-TX 等采用该编码。',
      tags: ['计算', '易错']
    },
    {
      id: 'NET-036', module: 'network', topic: '路由协议', difficulty: 2, points: ['network|应用层与网络管理'],
      stem: '关于 RIP 与 OSPF，下列说法正确的是（ ）。',
      options: ['RIP 是链路状态协议，OSPF 是距离向量协议', 'RIP 以跳数为度量、最大 15 跳；OSPF 是链路状态协议', '两者都属于外部网关协议', 'OSPF 只能用于小型网络'],
      answer: 1,
      explanation: 'RIP 是距离向量协议，以跳数为度量，16 跳视为不可达，只适合小型网络；OSPF 是链路状态协议，用 Dijkstra 计算最短路径，支持分区域与大型网络。',
      tags: ['理解', '高频']
    },
    {
      id: 'NET-037', module: 'network', topic: '路由协议', difficulty: 3, points: ['network|应用层与网络管理'],
      stem: 'BGP 属于（ ）。',
      options: ['自治系统内部的链路状态协议', '以跳数为度量的距离向量协议', '外部网关协议，用于自治系统之间交换路由', '局域网内的生成树协议'],
      answer: 2,
      explanation: 'BGP 是外部网关协议（EGP），在自治系统之间交换可达性信息，基于路径向量并考虑策略；OSPF、RIP 属于内部网关协议。',
      tags: ['理解']
    },
    {
      id: 'NET-038', module: 'network', topic: 'CIDR', difficulty: 2, points: ['network|IP 地址与子网'],
      stem: '将 192.168.0.0/24 与 192.168.1.0/24 进行路由聚合，结果为（ ）。',
      options: ['192.168.0.0/24', '192.168.1.0/23', '192.168.0.0/22', '192.168.0.0/23'],
      answer: 3,
      explanation: '两个 /24 的第三字节分别为 0 与 1，二进制前 7 位相同、第 8 位不同，故前缀可缩短 1 位得到 /23；192.168.0.0/23 覆盖 0.0~1.255，恰好包含两个子网。',
      tags: ['计算', '高频']
    },
    {
      id: 'NET-039', module: 'network', topic: 'CIDR', difficulty: 3, points: ['network|IP 地址与子网'],
      stem: '一个 /26 的子网，可分配给主机的地址数为（ ）。',
      options: ['62', '64', '30', '126'],
      answer: 0,
      explanation: '主机位为 32 - 26 = 6 位，共 2⁶ = 64 个地址，去掉网络地址与广播地址后可用 62 个；/27 为 30 个，/25 为 126 个。',
      tags: ['计算', '高频']
    },
    {
      id: 'NET-040', module: 'network', topic: 'IP 地址', difficulty: 1, points: ['network|IP 地址与子网'],
      stem: '下列 IP 地址中属于私有地址的是（ ）。',
      options: ['8.8.8.8', '192.168.1.1', '172.32.0.1', '203.0.113.1'],
      answer: 1,
      explanation: '私有地址段为 10.0.0.0/8、172.16.0.0/12、192.168.0.0/16。172.32.0.1 已超出 172.16~172.31 范围，属于公网地址。',
      tags: ['理解', '易错']
    },
    {
      id: 'NET-041', module: 'network', topic: '应用层', difficulty: 1, points: ['network|应用层与网络管理'],
      stem: '默认情况下，HTTPS 使用的传输层端口号是（ ）。',
      options: ['80', '53', '443', '25'],
      answer: 2,
      explanation: 'HTTPS 默认端口 443，HTTP 为 80，DNS 为 53，SMTP 为 25。HTTPS 在 HTTP 与 TCP 之间加入 TLS/SSL 层。',
      tags: ['理解', '必会']
    },
    {
      id: 'NET-042', module: 'network', topic: '分层模型', difficulty: 1, points: ['network|分层模型'],
      stem: '下列设备中，工作在数据链路层的是（ ）。',
      options: ['路由器', '中继器', '网关', '交换机'],
      answer: 3,
      explanation: '交换机根据 MAC 地址转发帧，工作在数据链路层；路由器工作在网络层，中继器与集线器在物理层，网关可工作在高层。',
      tags: ['理解', '高频']
    },

    /* ---------------- 信息安全 +6（2/2/2） ---------------- */
    {
      id: 'SEC-016', module: 'security', topic: '哈希', difficulty: 2, points: ['security|密码学基础'],
      stem: '下列应用中，最适合使用哈希函数的是（ ）。',
      options: ['校验文件完整性', '加密大容量文件以保密', '在不安全信道上交换密钥', '生成数字证书的签名密钥'],
      answer: 0,
      explanation: '哈希把任意长度数据压缩为定长摘要，且单向、抗碰撞，适合完整性校验；加密保密需要对称或非对称加密算法，密钥交换需要密钥协商协议。',
      tags: ['理解', '高频']
    },
    {
      id: 'SEC-017', module: 'security', topic: 'PKI', difficulty: 2, points: ['security|认证与签名'],
      stem: '数字证书的主要作用是（ ）。',
      options: ['加密本地磁盘数据', '绑定公钥与持有者身份，并由 CA 签名保证可信', '压缩待传输的数据', '生成会话使用的对称密钥'],
      answer: 1,
      explanation: '数字证书由 CA 用自己的私钥签名，把主体身份与其公钥绑定，验证方用 CA 公钥验签即可确认公钥归属，是 PKI 信任链的基础。',
      tags: ['理解']
    },
    {
      id: 'SEC-018', module: 'security', topic: '恶意代码', difficulty: 1, points: ['security|网络攻击与防护'],
      stem: '伪装成正常软件、诱导用户安装并窃取信息的恶意代码是（ ）。',
      options: ['蠕虫', '病毒', '木马', '逻辑炸弹'],
      answer: 2,
      explanation: '木马以看似正常的程序诱骗用户运行，在后台开启后门或窃取数据，通常不自我复制；蠕虫可独立传播，病毒需寄生宿主，逻辑炸弹在特定条件触发。',
      tags: ['理解', '高频']
    },
    {
      id: 'SEC-019', module: 'security', topic: 'MAC', difficulty: 3, points: ['security|认证与签名'],
      stem: '消息认证码（MAC）与数字签名的主要区别是（ ）。',
      options: ['MAC 使用公钥，数字签名使用私钥', '两者都能提供不可否认性', 'MAC 只能用于加密，不能用于认证', 'MAC 使用共享密钥、无法提供不可否认性；数字签名使用私钥、可提供不可否认性'],
      answer: 3,
      explanation: 'MAC 由收发双方共享的密钥计算，任何一方都能生成，因此无法向第三方证明消息来源；数字签名用发送方私钥生成、公钥验证，具备不可否认性。',
      tags: ['分析', '难点']
    },
    {
      id: 'SEC-020', module: 'security', topic: '密码学', difficulty: 3, points: ['security|密码学基础'],
      stem: '既要保证传输数据的机密性，又要提供不可否认性，通常采用（ ）。',
      options: ['对称加密传输数据，并用非对称签名提供不可否认性', '仅使用对称加密', '仅对数据计算哈希', '仅使用 Base64 编码'],
      answer: 0,
      explanation: '对称加密速度快，适合加密大量数据；不可否认性需要只有发送方掌握私钥的数字签名。二者结合是 HTTPS、电子合同等场景的常见做法。',
      tags: ['分析', '高频']
    },
    {
      id: 'SEC-021', module: 'security', topic: '安全体系', difficulty: 1, points: ['security|安全体系与管理'],
      stem: '由系统按安全标签强制实施、用户无法自主决定的访问控制是（ ）。',
      options: ['自主访问控制（DAC）', '强制访问控制（MAC）', '基于角色的访问控制（RBAC）', '访问控制列表（ACL）'],
      answer: 1,
      explanation: 'MAC 由系统根据主体与客体的安全级别标签强制判定，用户不能自行转授权限；DAC 由资源所有者自主授权，RBAC 通过角色分配权限。',
      tags: ['理解']
    },

    /* ---------------- 标准化与知识产权 +6（2/3/1） ---------------- */
    {
      id: 'LAW-016', module: 'standard-law', topic: '商标', difficulty: 1, points: ['standard-law|专利与商标'],
      stem: '注册商标有效期满需要继续使用的，应当在期满前（ ）内申请续展。',
      options: ['1 个月', '3 个月', '12 个月', '6 个月'],
      answer: 2,
      explanation: '商标法规定应在期满前 12 个月内办理续展；未能在此期间办理的可有 6 个月宽展期，宽展期满仍未办理则注销注册商标。',
      tags: ['理解']
    },
    {
      id: 'LAW-017', module: 'standard-law', topic: '软件著作权', difficulty: 2, points: ['standard-law|著作权'],
      stem: '自然人的软件著作权，其保护期截止于（ ）。',
      options: ['首次发表后第 50 年', '永久保护', '首次发表后第 25 年', '自然人死亡后第 50 年的 12 月 31 日'],
      answer: 3,
      explanation: '自然人的软件著作权保护期为自然人终生及死亡后 50 年，截止于死亡后第 50 年的 12 月 31 日；法人或其他组织的软件著作权保护期为 50 年，截止于首次发表后第 50 年的 12 月 31 日。',
      tags: ['理解', '易错']
    },
    {
      id: 'LAW-018', module: 'standard-law', topic: '商业秘密', difficulty: 2, points: ['standard-law|专利与商标'],
      stem: '下列选项中，不属于商业秘密受保护条件的是（ ）。',
      options: ['已向专利局申请专利', '不为公众所知悉', '具有商业价值', '权利人采取了相应保密措施'],
      answer: 0,
      explanation: '商业秘密的构成要件是不为公众所知悉、具有商业价值、权利人采取保密措施；一旦申请专利就必须公开技术方案，与商业秘密的保密性要求相冲突。',
      tags: ['理解', '易错']
    },
    {
      id: 'LAW-019', module: 'standard-law', topic: '著作权', difficulty: 2, points: ['standard-law|著作权'],
      stem: '主要利用单位物质技术条件创作、由单位承担责任的工程设计图，其著作权（署名权除外）归（ ）。',
      options: ['创作者个人', '单位', '国家', '创作者与单位共有'],
      answer: 1,
      explanation: '此类职务作品作者仅享有署名权，著作权的其他权利由单位享有；一般职务作品则归作者，单位在其业务范围内有优先使用权。',
      tags: ['理解', '难点']
    },
    {
      id: 'LAW-020', module: 'standard-law', topic: '专利', difficulty: 3, points: ['standard-law|专利与商标'],
      stem: '发明专利权的保护期限为（ ），自申请日起计算。',
      options: ['10 年', '15 年', '20 年', '永久'],
      answer: 2,
      explanation: '发明专利保护期 20 年，实用新型 10 年，外观设计 15 年，均自申请日起算；专利权需按年缴纳年费维持，否则终止。',
      tags: ['理解', '必会']
    },
    {
      id: 'LAW-021', module: 'standard-law', topic: '标准化', difficulty: 1, points: ['standard-law|标准化'],
      stem: '我国标准代号中，GB/T 表示（ ）。',
      options: ['强制性国家标准', '行业标准', '企业标准', '推荐性国家标准'],
      answer: 3,
      explanation: 'GB 为强制性国家标准，GB/T 为推荐性国家标准；行业标准如 SJ、HB，地方标准为 DB，企业标准以 Q 开头。',
      tags: ['理解', '必会']
    },

    /* ---------------- 多媒体基础 +4（1/1/2） ---------------- */
    {
      id: 'MM-013', module: 'multimedia', topic: '格式', difficulty: 1, points: ['multimedia|压缩'],
      stem: '下列图像文件格式中，支持无损压缩且支持透明通道的是（ ）。',
      options: ['PNG', 'JPEG', 'BMP', 'GIF'],
      answer: 0,
      explanation: 'PNG 采用无损压缩并支持 Alpha 透明通道，适合网页图形；JPEG 为有损压缩、不支持透明；BMP 通常不压缩；GIF 支持简单透明但仅 256 色。',
      tags: ['理解', '高频']
    },
    {
      id: 'MM-014', module: 'multimedia', topic: '格式', difficulty: 3, points: ['multimedia|压缩'],
      stem: '关于视频文件格式，下列说法正确的是（ ）。',
      options: ['MP4 只能封装 H.264 编码的视频', 'MP4、AVI 是容器格式，可封装不同编码的音视频流', 'AVI 一定采用无损压缩', '容器格式决定压缩比，与内部编码无关'],
      answer: 1,
      explanation: 'MP4、AVI、MKV 属于容器，负责组织音视频轨道与元数据，内部可封装 H.264、H.265、AAC 等不同编码；压缩比由编码方式决定，与容器无关。',
      tags: ['分析', '易错']
    },
    {
      id: 'MM-015', module: 'multimedia', topic: '图像', difficulty: 2, points: ['multimedia|图像'],
      stem: '一幅 1024×768 的 256 色图像，未压缩时数据量约为（ ）。',
      options: ['2.25 MB', '1.18 MB', '0.75 MB', '3 MB'],
      answer: 2,
      explanation: '256 色即 8 位/像素（1 字节），1024 × 768 × 1 = 786,432 字节 = 768 KB = 0.75 MB；按 24 位真彩色计算才会得到 2.25 MB。',
      tags: ['计算', '高频']
    },
    {
      id: 'MM-016', module: 'multimedia', topic: '音频', difficulty: 3, points: ['multimedia|音频'],
      stem: '采样频率 16kHz、量化位数 16 位、双声道、时长 10 秒的音频，未压缩数据量约为（ ）。',
      options: ['1.25 MB', '312 KB', '2.5 MB', '625 KB'],
      answer: 3,
      explanation: '数据量 = 16000 × 16 × 2 × 10 / 8 = 640,000 字节 ≈ 625 KB。漏乘声道数得 312 KB，把位与字节混淆会得到 1.25 MB 或 2.5 MB。',
      tags: ['计算', '高频']
    },

    /* ---------------- 新技术应用 +4（3/0/1） ---------------- */
    {
      id: 'TECH-015', module: 'tech', topic: '物联网', difficulty: 1, points: ['tech|物联网、区块链与新兴应用'],
      stem: '物联网体系结构通常划分为（ ）。',
      options: ['感知层、网络层、应用层', '物理层、数据链路层、网络层', '基础设施层、平台层、软件层', '前端、后端、数据库'],
      answer: 0,
      explanation: '物联网三层架构为感知层（传感器、RFID、摄像头采集数据）、网络层（NB-IoT、LoRa、5G 等传输）、应用层（智能家居、车联网等业务）。',
      tags: ['理解', '必会']
    },
    {
      id: 'TECH-016', module: 'tech', topic: '区块链', difficulty: 1, points: ['tech|物联网、区块链与新兴应用'],
      stem: '区块链保证数据难以篡改的主要手段是（ ）。',
      options: ['数据库主从复制', '哈希链与分布式共识机制', '集中式权限控制', '定期全量备份'],
      answer: 1,
      explanation: '每个区块记录前一区块的哈希，形成哈希链，修改任一区块会使其后所有哈希失效；配合共识机制让多数节点认可同一账本，从而实现去中心化的防篡改。',
      tags: ['理解', '高频']
    },
    {
      id: 'TECH-017', module: 'tech', topic: '5G', difficulty: 3, points: ['tech|物联网、区块链与新兴应用'],
      stem: '5G 网络切片的主要作用是（ ）。',
      options: ['把频谱固定分配给不同运营商', '提高终端发射功率', '在同一物理网络上划分出多个满足不同业务需求的逻辑网络', '替代光纤传输'],
      answer: 2,
      explanation: '网络切片基于 SDN/NFV 把同一套物理网络划分为多个隔离的逻辑网络，各自配置带宽、时延与可靠性，分别服务 eMBB、uRLLC、mMTC 等场景。',
      tags: ['理解', '难点']
    },
    {
      id: 'TECH-018', module: 'tech', topic: '大数据', difficulty: 1, points: ['tech|云计算与大数据'],
      stem: '大数据 4V 特征中，强调数据种类多样的是（ ）。',
      options: ['Volume', 'Velocity', 'Value', 'Variety'],
      answer: 3,
      explanation: '4V 指 Volume（体量大）、Velocity（速度快）、Variety（类型多）、Value（价值密度低）。Variety 强调结构化、半结构化与非结构化数据并存。',
      tags: ['理解']
    },

    /* ---------------- 专业英语 +10（2 篇 × 5 空；4/2/4） ---------------- */
    eng('ENG-026', passage6, 1,
      ['structure', 'syntax', 'color', 'budget'],
      0, 1,
      'Software architecture describes the high-level structure of a system：架构描述系统的"高层结构"，即构件、职责及其交互方式，而非语法或预算。'),
    eng('ENG-027', passage6, 2,
      ['compress', 'maintain', 'translate', 'print'],
      1, 1,
      'hard to maintain as the code base grows：单体应用随代码规模增长会变得难以"维护"，这是拆分微服务的主要动因。'),
    eng('ENG-028', passage6, 3,
      ['measured', 'deleted', 'deployed', 'encrypted'],
      2, 1,
      'developed, tested and deployed on its own：每个微服务可独立开发、测试与"部署"，对应 independently deployable services。'),
    eng('ENG-029', passage6, 4,
      ['compression', 'encryption', 'indexing', 'consistency'],
      3, 3,
      'data consistency across services：跨服务的数据"一致性"比单体中的单个事务难得多，需要分布式事务或最终一致性方案。'),
    eng('ENG-030', passage6, 5,
      ['domain', 'temporal', 'random', 'visual'],
      0, 3,
      'a clear domain boundary：只有出现清晰的"领域"边界时才拆分服务，对应领域驱动设计中的限界上下文概念。'),
    eng('ENG-031', passage7, 1,
      ['marketing', 'modeling', 'printing', 'cooking'],
      1, 3,
      'a threat modeling exercise：威胁"建模"用于系统识别资产、威胁与脆弱点，是安全设计的第一步。'),
    eng('ENG-032', passage7, 2,
      ['profitable', 'invisible', 'vulnerable', 'portable'],
      2, 1,
      'if the application itself is vulnerable：应用自身存在"漏洞"时，传输加密无法阻止攻击者直接入侵服务器。'),
    eng('ENG-033', passage7, 3,
      ['painting', 'billing', 'routing', 'training'],
      3, 2,
      'security awareness training：安全意识"培训"让员工识别钓鱼邮件，与技术控制同等重要。'),
    eng('ENG-034', passage7, 4,
      ['compression', 'leakage', 'compilation', 'duplication'],
      1, 2,
      'reduces the risk of data leakage：服务端校验输入可防止注入攻击，同时降低数据"泄露"风险。'),
    eng('ENG-035', passage7, 5,
      ['deleted', 'ignored', 'reviewed', 'encrypted'],
      2, 3,
      'every incident should be recorded and reviewed：安全事件需记录并"复盘"，避免同类错误重复发生。')
  ]);
})(window.RK);
