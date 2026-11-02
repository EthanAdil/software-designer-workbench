/* 计算机组成与体系结构 —— 15 题 */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'CS-001', module: 'computer-system', topic: '数据表示', difficulty: 1,
      stem: '某机器字长为 8 位，采用补码表示整数，则其能表示的数值范围是（ ）。',
      options: ['-128 ~ +127', '-127 ~ +127', '-128 ~ +128', '0 ~ 255'],
      answer: 0,
      explanation: 'n 位补码的表示范围为 -2^(n-1) ~ 2^(n-1)-1，n=8 时即 -128 ~ +127。负端比正端多一个数，因为 0 只有一种表示，10000000 被用作 -128。',
      tags: ['计算', '必背']
    },
    {
      id: 'CS-002', module: 'computer-system', topic: '数据表示', difficulty: 2,
      stem: '8 位补码 10000000 所表示的真值是（ ）。',
      options: ['-128', '-127', '0', '+128'],
      answer: 0,
      explanation: '补码 10000000 按位取反加 1 得 10000000（自身），其绝对值为 128，符号位为 1，故真值为 -128。这是补码表示中最特殊的一个数，没有对应的正数。',
      tags: ['计算']
    },
    {
      id: 'CS-003', module: 'computer-system', topic: '浮点数', difficulty: 1,
      stem: '在浮点数表示中，决定数值表示范围与精度的是（ ）。',
      options: ['阶码位数决定范围，尾数位数决定精度', '阶码位数决定精度，尾数位数决定范围', '阶码与尾数都只决定精度', '阶码与尾数都只决定范围'],
      answer: 0,
      explanation: '阶码控制小数点位置，位数越多可表示的指数范围越大，即数值范围越大；尾数决定有效数字位数，位数越多精度越高。',
      tags: ['概念', '必背']
    },
    {
      id: 'CS-004', module: 'computer-system', topic: '浮点数', difficulty: 2,
      stem: 'IEEE 754 单精度浮点数的位划分为（ ）。',
      options: ['1 位符号 + 8 位阶码 + 23 位尾数', '1 位符号 + 7 位阶码 + 24 位尾数', '1 位符号 + 11 位阶码 + 52 位尾数', '8 位符号 + 8 位阶码 + 16 位尾数'],
      answer: 0,
      explanation: '单精度共 32 位：1 位符号、8 位阶码（移码，偏移量 127）、23 位尾数（隐含最高位 1）。双精度共 64 位：1 + 11 + 52。',
      tags: ['记忆', '必背']
    },
    {
      id: 'CS-005', module: 'computer-system', topic: '运算方法', difficulty: 2,
      stem: '采用双符号位（变形补码）进行加法运算，若运算结果为 01，则表示（ ）。',
      options: ['正溢出', '负溢出', '结果正确', '发生下溢'],
      answer: 0,
      explanation: '双符号位为 00 表示结果为正且无溢出，11 表示结果为负且无溢出，01 表示正溢出（结果超过最大值），10 表示负溢出（结果小于最小值）。',
      tags: ['概念']
    },
    {
      id: 'CS-006', module: 'computer-system', topic: '校验码', difficulty: 2,
      stem: '对 8 位信息位采用海明码进行检错纠错，至少需要的校验位个数是（ ）。',
      options: ['4', '3', '5', '8'],
      answer: 0,
      explanation: '海明码需满足 2^k ≥ n + k + 1，其中 n 为信息位、k 为校验位。n=8 时，k=4 得 16 ≥ 13 成立；k=3 时 8 ≥ 12 不成立。故至少 4 位。',
      tags: ['计算', '高频']
    },
    {
      id: 'CS-007', module: 'computer-system', topic: '校验码', difficulty: 2,
      stem: '用生成多项式 G(x)=x³+x+1 对信息码做 CRC 校验，需在信息码后补（ ）个 0。',
      options: ['3', '2', '4', '1'],
      answer: 0,
      explanation: 'CRC 中补 0 的个数等于生成多项式的最高次幂。G(x)=x³+x+1 最高次为 3，故补 3 个 0，再用模 2 除法求余数作为校验位（校验位也是 3 位）。',
      tags: ['计算']
    },
    {
      id: 'CS-008', module: 'computer-system', topic: '指令流水线', difficulty: 2,
      stem: '某指令流水线分为 5 段，每段耗时 1 个时钟周期。连续执行 100 条指令（无冲突）所需时钟周期数为（ ）。',
      options: ['104', '100', '105', '500'],
      answer: 0,
      explanation: 'k 段流水线执行 n 条指令所需周期数 = k + (n-1) = 5 + 99 = 104。首条指令需 k 个周期填满流水线，之后每周期完成一条。',
      tags: ['计算', '高频']
    },
    {
      id: 'CS-009', module: 'computer-system', topic: '指令流水线', difficulty: 3,
      stem: '接上题，该流水线相对于顺序执行（每条指令均需 5 个周期）的加速比约为（ ）。',
      options: ['约 4.81', '约 5.00', '约 1.04', '约 100'],
      answer: 0,
      explanation: '顺序执行需 5 × 100 = 500 个周期，流水执行需 104 个周期，加速比 S = 500 / 104 ≈ 4.81。理论上限为段数 k=5，段数越多、指令越多越接近上限。',
      tags: ['计算']
    },
    {
      id: 'CS-010', module: 'computer-system', topic: 'Cache', difficulty: 3,
      stem: '某计算机主存容量 1MB，按字节编址，Cache 容量 4KB，块大小 32B，采用直接映射方式。则主存地址中"标记（tag）"字段的位数为（ ）。',
      options: ['8', '7', '5', '12'],
      answer: 0,
      explanation: '主存 1MB = 2^20，地址共 20 位。块内地址 = log2(32) = 5 位；Cache 行数 = 4KB / 32B = 128 = 2^7，行号 7 位；标记 = 20 - 7 - 5 = 8 位。',
      tags: ['计算', '难点']
    },
    {
      id: 'CS-011', module: 'computer-system', topic: 'Cache', difficulty: 3,
      stem: '某系统 Cache 存取时间为 2ns，主存存取时间为 20ns，命中率为 95%。若未命中时需先访问 Cache 再访问主存，则平均访问时间约为（ ）。',
      options: ['3.0 ns', '2.9 ns', '11 ns', '2.0 ns'],
      answer: 0,
      explanation: '平均访问时间 = 0.95 × 2 + 0.05 × (2 + 20) = 1.9 + 1.1 = 3.0 ns。注意未命中路径包含查 Cache 的 2ns，不能只算 20ns。',
      tags: ['计算', '易错']
    },
    {
      id: 'CS-012', module: 'computer-system', topic: '体系结构', difficulty: 1,
      stem: '下列特征中，属于 RISC 体系结构的是（ ）。',
      options: ['指令长度固定、寻址方式少、以寄存器操作为主', '指令数量多、长度可变、寻址方式丰富', '采用微程序控制、便于实现复杂指令', '指令执行周期长短差异大、大量访问内存'],
      answer: 0,
      explanation: 'RISC 强调指令精简、定长、寻址方式少、Load/Store 结构（只有取数和存数访问内存）、硬布线控制、流水线效率高。其余三项均为 CISC 特征。',
      tags: ['概念', '高频']
    },
    {
      id: 'CS-013', module: 'computer-system', topic: '体系结构', difficulty: 2,
      stem: '按 Flynn 分类，多处理机系统（各处理器执行不同指令、处理不同数据）属于（ ）。',
      options: ['MIMD', 'SIMD', 'SISD', 'MISD'],
      answer: 0,
      explanation: 'Flynn 分类按指令流与数据流的多倍性划分：SISD 为单处理器顺序执行；SIMD 为阵列处理机/向量机；MISD 实际少见；MIMD 为多处理机、多计算机，各处理器独立执行不同指令流。',
      tags: ['概念']
    },
    {
      id: 'CS-014', module: 'computer-system', topic: '可靠性', difficulty: 2,
      stem: '某系统由 3 个部件串联组成，各部件可靠度均为 0.9，则系统可靠度为（ ）。',
      options: ['0.729', '0.9', '0.999', '0.27'],
      answer: 0,
      explanation: '串联系统可靠度等于各部件可靠度之积：0.9³ = 0.729。并联系统为 1-(1-R)^n，可靠性显著更高，这也是冗余设计的依据。',
      tags: ['计算']
    },
    {
      id: 'CS-015', module: 'computer-system', topic: '性能指标', difficulty: 2,
      stem: '某处理器主频为 2GHz，执行某程序的平均 CPI 为 2，则该处理器的 MIPS 值为（ ）。',
      options: ['1000', '2000', '4000', '500'],
      answer: 0,
      explanation: 'MIPS = 主频(MHz) / CPI = 2000 / 2 = 1000。也可理解为每秒执行 2×10^9 / 2 = 10^9 条指令，即 1000 MIPS。',
      tags: ['计算']
    }
  ]);
})(window.RK);
