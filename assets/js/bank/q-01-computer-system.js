/* 计算机组成与体系结构 —— 35 题 */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'CS-001', module: 'computer-system', topic: '数据表示', difficulty: 1, points: ['computer-system|数据表示与运算'],
      stem: '某机器字长为 8 位，采用补码表示整数，则其能表示的数值范围是（ ）。',
      options: ['-128 ~ +127', '-127 ~ +127', '-128 ~ +128', '0 ~ 255'],
      answer: 0,
      explanation: 'n 位补码的表示范围为 -2^(n-1) ~ 2^(n-1)-1，n=8 时即 -128 ~ +127。负端比正端多一个数，因为 0 只有一种表示，10000000 被用作 -128。',
      tags: ['计算', '必背']
    },
    {
      id: 'CS-002', module: 'computer-system', topic: '数据表示', difficulty: 2, points: ['computer-system|数据表示与运算'],
      stem: '8 位补码 10000000 所表示的真值是（ ）。',
      options: ['+128', '-128', '-127', '0'],
      answer: 1,
      explanation: '补码 10000000 按位取反加 1 得 10000000（自身），其绝对值为 128，符号位为 1，故真值为 -128。这是补码表示中最特殊的一个数，没有对应的正数。',
      tags: ['计算']
    },
    {
      id: 'CS-003', module: 'computer-system', topic: '浮点数', difficulty: 1, points: ['computer-system|数据表示与运算'],
      stem: '在浮点数表示中，决定数值表示范围与精度的是（ ）。',
      options: ['阶码与尾数都只决定精度', '阶码与尾数都只决定范围', '阶码位数决定范围，尾数位数决定精度', '阶码位数决定精度，尾数位数决定范围'],
      answer: 2,
      explanation: '阶码控制小数点位置，位数越多可表示的指数范围越大，即数值范围越大；尾数决定有效数字位数，位数越多精度越高。',
      tags: ['概念', '必背']
    },
    {
      id: 'CS-004', module: 'computer-system', topic: '浮点数', difficulty: 2, points: ['computer-system|数据表示与运算'],
      stem: 'IEEE 754 单精度浮点数的位划分为（ ）。',
      options: ['1 位符号 + 7 位阶码 + 24 位尾数', '1 位符号 + 11 位阶码 + 52 位尾数', '8 位符号 + 8 位阶码 + 16 位尾数', '1 位符号 + 8 位阶码 + 23 位尾数'],
      answer: 3,
      explanation: '单精度共 32 位：1 位符号、8 位阶码（移码，偏移量 127）、23 位尾数（隐含最高位 1）。双精度共 64 位：1 + 11 + 52。',
      tags: ['记忆', '必背']
    },
    {
      id: 'CS-005', module: 'computer-system', topic: '运算方法', difficulty: 2, points: ['computer-system|数据表示与运算'],
      stem: '采用双符号位（变形补码）进行加法运算，若运算结果为 01，则表示（ ）。',
      options: ['正溢出', '负溢出', '结果正确', '发生下溢'],
      answer: 0,
      explanation: '双符号位为 00 表示结果为正且无溢出，11 表示结果为负且无溢出，01 表示正溢出（结果超过最大值），10 表示负溢出（结果小于最小值）。',
      tags: ['概念']
    },
    {
      id: 'CS-006', module: 'computer-system', topic: '校验码', difficulty: 2, points: ['computer-system|数据表示与运算'],
      stem: '对 8 位信息位采用海明码进行检错纠错，至少需要的校验位个数是（ ）。',
      options: ['8', '4', '3', '5'],
      answer: 1,
      explanation: '海明码需满足 2^k ≥ n + k + 1，其中 n 为信息位、k 为校验位。n=8 时，k=4 得 16 ≥ 13 成立；k=3 时 8 ≥ 12 不成立。故至少 4 位。',
      tags: ['计算', '高频']
    },
    {
      id: 'CS-007', module: 'computer-system', topic: '校验码', difficulty: 2, points: ['computer-system|数据表示与运算'],
      stem: '用生成多项式 G(x)=x³+x+1 对信息码做 CRC 校验，需在信息码后补（ ）个 0。',
      options: ['4', '1', '3', '2'],
      answer: 2,
      explanation: 'CRC 中补 0 的个数等于生成多项式的最高次幂。G(x)=x³+x+1 最高次为 3，故补 3 个 0，再用模 2 除法求余数作为校验位（校验位也是 3 位）。',
      tags: ['计算']
    },
    {
      id: 'CS-008', module: 'computer-system', topic: '指令流水线', difficulty: 2, points: ['computer-system|CPU 与体系结构'],
      stem: '某指令流水线分为 5 段，每段耗时 1 个时钟周期。连续执行 100 条指令（无冲突）所需时钟周期数为（ ）。',
      options: ['100', '105', '500', '104'],
      answer: 3,
      explanation: 'k 段流水线执行 n 条指令所需周期数 = k + (n-1) = 5 + 99 = 104。首条指令需 k 个周期填满流水线，之后每周期完成一条。',
      tags: ['计算', '高频']
    },
    {
      id: 'CS-009', module: 'computer-system', topic: '指令流水线', difficulty: 3, points: ['computer-system|CPU 与体系结构'],
      stem: '接上题，该流水线相对于顺序执行（每条指令均需 5 个周期）的加速比约为（ ）。',
      options: ['约 4.81', '约 5.00', '约 1.04', '约 100'],
      answer: 0,
      explanation: '顺序执行需 5 × 100 = 500 个周期，流水执行需 104 个周期，加速比 S = 500 / 104 ≈ 4.81。理论上限为段数 k=5，段数越多、指令越多越接近上限。',
      tags: ['计算']
    },
    {
      id: 'CS-010', module: 'computer-system', topic: 'Cache', difficulty: 3, points: ['computer-system|存储系统'],
      stem: '某计算机主存容量 1MB，按字节编址，Cache 容量 4KB，块大小 32B，采用直接映射方式。则主存地址中"标记（tag）"字段的位数为（ ）。',
      options: ['12', '8', '7', '5'],
      answer: 1,
      explanation: '主存 1MB = 2^20，地址共 20 位。块内地址 = log2(32) = 5 位；Cache 行数 = 4KB / 32B = 128 = 2^7，行号 7 位；标记 = 20 - 7 - 5 = 8 位。',
      tags: ['计算', '难点']
    },
    {
      id: 'CS-011', module: 'computer-system', topic: 'Cache', difficulty: 3, points: ['computer-system|存储系统'],
      stem: '某系统 Cache 存取时间为 2ns，主存存取时间为 20ns，命中率为 95%。若未命中时需先访问 Cache 再访问主存，则平均访问时间约为（ ）。',
      options: ['11 ns', '2.0 ns', '3.0 ns', '2.9 ns'],
      answer: 2,
      explanation: '平均访问时间 = 0.95 × 2 + 0.05 × (2 + 20) = 1.9 + 1.1 = 3.0 ns。注意未命中路径包含查 Cache 的 2ns，不能只算 20ns。',
      tags: ['计算', '易错']
    },
    {
      id: 'CS-012', module: 'computer-system', topic: '体系结构', difficulty: 1, points: ['computer-system|CPU 与体系结构'],
      stem: '下列特征中，属于 RISC 体系结构的是（ ）。',
      options: ['指令数量多、长度可变、寻址方式丰富', '采用微程序控制、便于实现复杂指令', '指令执行周期长短差异大、大量访问内存', '指令长度固定、寻址方式少、以寄存器操作为主'],
      answer: 3,
      explanation: 'RISC 强调指令精简、定长、寻址方式少、Load/Store 结构（只有取数和存数访问内存）、硬布线控制、流水线效率高。其余三项均为 CISC 特征。',
      tags: ['概念', '高频']
    },
    {
      id: 'CS-013', module: 'computer-system', topic: '体系结构', difficulty: 2, points: ['computer-system|CPU 与体系结构'],
      stem: '按 Flynn 分类，多处理机系统（各处理器执行不同指令、处理不同数据）属于（ ）。',
      options: ['MIMD', 'SIMD', 'SISD', 'MISD'],
      answer: 0,
      explanation: 'Flynn 分类按指令流与数据流的多倍性划分：SISD 为单处理器顺序执行；SIMD 为阵列处理机/向量机；MISD 实际少见；MIMD 为多处理机、多计算机，各处理器独立执行不同指令流。',
      tags: ['概念']
    },
    {
      id: 'CS-014', module: 'computer-system', topic: '可靠性', difficulty: 2, points: ['computer-system|总线、I/O 与可靠性'],
      stem: '某系统由 3 个部件串联组成，各部件可靠度均为 0.9，则系统可靠度为（ ）。',
      options: ['0.27', '0.729', '0.9', '0.999'],
      answer: 1,
      explanation: '串联系统可靠度等于各部件可靠度之积：0.9³ = 0.729。并联系统为 1-(1-R)^n，可靠性显著更高，这也是冗余设计的依据。',
      tags: ['计算']
    },
    {
      id: 'CS-015', module: 'computer-system', topic: '性能指标', difficulty: 2, points: ['computer-system|性能指标'],
      stem: '某处理器主频为 2GHz，执行某程序的平均 CPI 为 2，则该处理器的 MIPS 值为（ ）。',
      options: ['4000', '500', '1000', '2000'],
      answer: 2,
      explanation: 'MIPS = 主频(MHz) / CPI = 2000 / 2 = 1000。也可理解为每秒执行 2×10^9 / 2 = 10^9 条指令，即 1000 MIPS。',
      tags: ['计算']
    },
    {
      id: 'CS-016', module: 'computer-system', topic: '数据表示', difficulty: 1, points: ['computer-system|数据表示与运算'],
      stem: '某机器字长为 8 位，采用原码表示整数，则其能表示的数值范围是（ ）。',
      options: ['-128 ~ +127', '-128 ~ +128', '0 ~ 255', '-127 ~ +127'],
      answer: 3,
      explanation: 'n 位原码（1 位符号位 + n-1 位数值位）的表示范围为 -(2^(n-1)-1) ~ +(2^(n-1)-1)，n=8 时即 -127 ~ +127。原码中 0 有 +0、-0 两种形式，因此比补码少表示一个负数。',
      tags: ['计算', '易错']
    },
    {
      id: 'CS-017', module: 'computer-system', topic: '数据表示', difficulty: 2, points: ['computer-system|数据表示与运算'],
      stem: '8 位补码 00000000 对应的移码是（ ）。',
      options: ['10000000', '00000000', '11111111', '01111111'],
      answer: 0,
      explanation: '移码只把补码的符号位取反、数值位不变。0 的补码为 00000000，符号位取反后得 10000000。移码的数值大小顺序与其二进制编码顺序一致，因此常用于浮点数的阶码比较。',
      tags: ['计算', '易错']
    },
    {
      id: 'CS-018', module: 'computer-system', topic: '校验码', difficulty: 2, points: ['computer-system|数据表示与运算'],
      stem: 'CRC 校验中，生成多项式 G(x)=x⁴+x+1 对应的二进制位串是（ ）。',
      options: ['10001', '10011', '1011', '11001'],
      answer: 1,
      explanation: '按幂次从高到低取各项系数：x⁴ 系数 1、x³ 系数 0、x² 系数 0、x¹ 系数 1、常数项 1，即 10011。多项式最高次为 4，故校验位也是 4 位，信息码后需补 4 个 0。',
      tags: ['计算', '易错']
    },
    {
      id: 'CS-019', module: 'computer-system', topic: '校验码', difficulty: 2, points: ['computer-system|数据表示与运算'],
      stem: '海明码中，校验位应放置在编号为（ ）的位置上。',
      options: ['所有偶数位（2、4、6、8…）', '整个码字的最后 k 位', '2 的幂次位（1、2、4、8…）', '所有奇数位（1、3、5、7…）'],
      answer: 2,
      explanation: '海明码把校验位放在 2^0、2^1、2^2… 即第 1、2、4、8… 位，其余位置放信息位。第 i 个校验位负责校验所有编号二进制中第 i 位为 1 的数据位，出错时各校验结果组成出错位的二进制编号。',
      tags: ['记忆', '高频']
    },
    {
      id: 'CS-020', module: 'computer-system', topic: '体系结构', difficulty: 1, points: ['computer-system|CPU 与体系结构'],
      stem: '按 Flynn 分类，阵列处理机中所有处理单元在同一控制器指挥下、对不同数据执行同一条指令，这种结构属于（ ）。',
      options: ['SISD', 'MISD', 'MIMD', 'SIMD'],
      answer: 3,
      explanation: 'SIMD 为单指令流多数据流，典型代表是阵列处理机与向量处理机；SISD 是传统单处理器；MISD 在实际中极少见；MIMD 是多处理机，各处理器执行不同的指令流。',
      tags: ['概念']
    },
    {
      id: 'CS-021', module: 'computer-system', topic: 'CPU', difficulty: 1, points: ['computer-system|CPU 与体系结构'],
      stem: 'CPU 中用于存放"下一条将要执行的指令地址"的寄存器是（ ）。',
      options: ['程序计数器 PC', '指令寄存器 IR', '累加寄存器 AC', '状态寄存器 PSW'],
      answer: 0,
      explanation: 'PC 存放下一条待取指令的地址，每取一条指令自动加 1（转移时改写为目标地址）；IR 存放当前正在执行的指令；AC 用于暂存运算结果；PSW 保存进位、溢出等标志位。',
      tags: ['概念', '必背']
    },
    {
      id: 'CS-022', module: 'computer-system', topic: '指令流水线', difficulty: 2, points: ['computer-system|CPU 与体系结构'],
      stem: '关于指令流水线，下列说法正确的是（ ）。',
      options: ['流水段划分越细，性能一定越高', '理想情况下加速比的上限等于流水段数 k', '加速比随指令条数增加而无上限增长', '流水线能缩短单条指令的执行时间'],
      answer: 1,
      explanation: 'k 段流水线执行 n 条指令需 k+(n-1) 个周期，顺序执行需 nk 个周期，加速比 S = nk/(k+n-1)，n→∞ 时 S→k。所以段数决定理论上限；但段数过多会带来锁存器延迟、冲突与功耗开销，并非越细越好。',
      tags: ['概念', '易错']
    },
    {
      id: 'CS-023', module: 'computer-system', topic: '指令流水线', difficulty: 2, points: ['computer-system|CPU 与体系结构'],
      stem: '指令流水线中，由转移指令改变执行方向、导致已预取的指令作废，这类冲突属于（ ）。',
      options: ['数据冲突', '资源冲突', '控制冲突', '结构冲突'],
      answer: 2,
      explanation: '流水线三类冲突：结构冲突（多条指令争用同一硬件资源）、数据冲突（后条指令依赖前条指令的结果）、控制冲突（转移指令引起流水线断流）。控制冲突常用延迟槽、分支预测缓解。',
      tags: ['概念']
    },
    {
      id: 'CS-024', module: 'computer-system', topic: 'Cache', difficulty: 2, points: ['computer-system|存储系统'],
      stem: '在 Cache 直接映射方式下，主存地址被划分为（ ）三部分。',
      options: ['标记、页号、页内地址', '段号、段内地址、块内地址', '组号、标记、块内地址', '标记、行号（块号）、块内地址'],
      answer: 3,
      explanation: '直接映射中一个主存块只能装入唯一的 Cache 行，地址划分为 标记 | 行号 | 块内地址。组相联为 标记 | 组号 | 块内地址；全相联没有行号/组号字段，整个块号都参与标记比较。',
      tags: ['概念', '高频']
    },
    {
      id: 'CS-025', module: 'computer-system', topic: 'Cache', difficulty: 2, points: ['computer-system|存储系统'],
      stem: '与直接映射相比，全相联映射的特点是（ ）。',
      options: ['主存任一块可装入 Cache 任一行，冲突少但比较电路复杂、成本高', '主存块只能装入固定行，硬件最简单', '地址中仍保留行号字段用于定位', '命中率最低，只用于大容量 Cache'],
      answer: 0,
      explanation: '全相联映射允许任意块放入任意行，灵活、冲突最少、命中率最高，但需要把所有行的标记与地址并行比较，比较器多、成本高，因此通常只用于小容量 Cache（如 TLB）。',
      tags: ['概念']
    },
    {
      id: 'CS-026', module: 'computer-system', topic: '存储系统', difficulty: 1, points: ['computer-system|存储系统'],
      stem: '程序把同一段循环体重复执行多次，主要体现了（ ）。',
      options: ['数据局部性', '时间局部性', '空间局部性', '顺序局部性'],
      answer: 1,
      explanation: '刚被访问过的指令或数据很可能再次被访问，属于时间局部性（循环、重复使用变量）；空间局部性指相邻地址的数据很可能接着被访问（数组顺序访问、指令顺序存放）。Cache 与虚拟存储都建立在局部性原理之上。',
      tags: ['概念']
    },
    {
      id: 'CS-027', module: 'computer-system', topic: '存储系统', difficulty: 2, points: ['computer-system|存储系统'],
      stem: '某计算机按字节编址，地址线 20 根、数据线 8 根，则其最大寻址空间为（ ）。',
      options: ['2MB', '8MB', '1MB', '1KB'],
      answer: 2,
      explanation: '20 根地址线可产生 2^20 = 1M 个地址；按字节编址且数据线 8 根（每单元 1 字节），故容量为 1MB。若按字编址且字长 16 位，则为 1M × 2B = 2MB。',
      tags: ['计算']
    },
    {
      id: 'CS-028', module: 'computer-system', topic: 'Cache', difficulty: 3, points: ['computer-system|存储系统'],
      stem: '某系统 Cache 存取时间 1ns，主存存取时间 10ns，Cache 命中率 90%。若未命中时需先访问 Cache 再访问主存，则平均访问时间为（ ）。',
      options: ['1.9 ns', '11 ns', '1.1 ns', '2.0 ns'],
      answer: 3,
      explanation: '平均访问时间 = 0.9 × 1 + 0.1 × (1 + 10) = 0.9 + 1.1 = 2.0 ns。若题目说明"未命中的时间不计 Cache 访问"或"Cache 与主存同时访问"，则按 0.9×1 + 0.1×10 = 1.9 ns，务必看清前提。',
      tags: ['计算', '易错']
    },
    {
      id: 'CS-029', module: 'computer-system', topic: '总线', difficulty: 1, points: ['computer-system|总线、I/O 与可靠性'],
      stem: '计算机总线中，数据总线的宽度决定了（ ）。',
      options: ['一次能并行传输的数据位数', '可直接寻址的存储空间大小', '总线的最大传输距离', '中断源的优先级'],
      answer: 0,
      explanation: '数据总线宽度决定一次传输的位数（32 位总线一次传 4 字节）；地址总线宽度决定寻址空间（n 根地址线对应 2^n 个单元）；控制总线传输读写、中断、时钟等控制信号。',
      tags: ['概念', '必背']
    },
    {
      id: 'CS-030', module: 'computer-system', topic: '总线', difficulty: 2, points: ['computer-system|总线、I/O 与可靠性'],
      stem: '某计算机地址总线为 24 位，按字节编址，则可直接寻址的最大内存空间为（ ）。',
      options: ['32MB', '16MB', '8MB', '24MB'],
      answer: 1,
      explanation: '2^24 = 16 777 216 个地址，按字节编址即 16MB。地址线每增加 1 根，寻址空间翻倍：20 位对应 1MB，24 位对应 16MB，32 位对应 4GB。',
      tags: ['计算']
    },
    {
      id: 'CS-031', module: 'computer-system', topic: 'I/O 方式', difficulty: 2, points: ['computer-system|总线、I/O 与可靠性'],
      stem: '与中断方式相比，DMA 方式的主要特点是（ ）。',
      options: ['CPU 需不断查询设备状态寄存器', '传送过程不占用系统总线', '数据成块传送，CPU 只在传送开始和结束时干预', '每传送一个字节都要中断 CPU 一次'],
      answer: 2,
      explanation: '程序查询方式由 CPU 反复查询状态，串行且效率最低；中断方式每传一个数据便中断一次；DMA 由 DMA 控制器接管总线成块搬运数据，CPU 只在启动与结束时介入，适合磁盘等高速块设备。',
      tags: ['概念', '高频']
    },
    {
      id: 'CS-032', module: 'computer-system', topic: '可靠性', difficulty: 2, points: ['computer-system|总线、I/O 与可靠性'],
      stem: '某系统由 2 个部件并联组成，各部件可靠度均为 0.9，则系统可靠度为（ ）。',
      options: ['0.9', '0.81', '0.18', '0.99'],
      answer: 3,
      explanation: '并联系统只要有一个部件正常就能工作：R = 1 - (1-0.9)² = 1 - 0.01 = 0.99。若为串联则 R = 0.9 × 0.9 = 0.81。可见冗余并联能显著提高系统可靠性。',
      tags: ['计算']
    },
    {
      id: 'CS-033', module: 'computer-system', topic: '可靠性', difficulty: 2, points: ['computer-system|总线、I/O 与可靠性'],
      stem: '某部件失效率恒为 0.001/小时，则其平均无故障时间 MTBF 为（ ）。',
      options: ['1000 小时', '100 小时', '0.001 小时', '10000 小时'],
      answer: 0,
      explanation: '失效率恒定时寿命服从指数分布，MTBF = 1/λ = 1/0.001 = 1000 小时。其可靠度 R(t) = e^(-λt)，例如运行 1000 小时后的可靠度约为 e^-1 ≈ 0.368。',
      tags: ['计算']
    },
    {
      id: 'CS-034', module: 'computer-system', topic: '性能指标', difficulty: 3, points: ['computer-system|性能指标'],
      stem: '某程序共包含 10⁷ 条指令，平均 CPI 为 2，处理器主频为 2GHz，则执行该程序所需时间约为（ ）。',
      options: ['2 ms', '10 ms', '5 ms', '20 ms'],
      answer: 1,
      explanation: '执行时间 = 指令数 × CPI × 时钟周期 = 10⁷ × 2 / (2×10⁹) s = 0.01 s = 10 ms。也可先算 MIPS = 2000/2 = 1000，再由 10⁷ / 10⁹ = 0.01 s 得出结果。',
      tags: ['计算']
    },
    {
      id: 'CS-035', module: 'computer-system', topic: '性能指标', difficulty: 2, points: ['computer-system|性能指标'],
      stem: '某处理器主频为 1GHz，程序的平均 CPI 为 4，则该处理器的 MIPS 值为（ ）。',
      options: ['1000', '4000', '250', '500'],
      answer: 2,
      explanation: 'MIPS = 主频(MHz) / CPI = 1000 / 4 = 250。MIPS 只反映指令执行速率，不同指令集中一条指令完成的功能差异很大，跨体系结构直接比较 MIPS 并无实际意义。',
      tags: ['计算']
    }
  ]);
})(window.RK);
