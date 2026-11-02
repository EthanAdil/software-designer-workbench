/* 数据库系统 —— 14 题 */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'DB-001', module: 'database', topic: '数据库体系结构', difficulty: 1,
      stem: '数据库三级模式中，面向具体用户、描述用户所看到的数据视图的是（ ）。',
      options: ['外模式', '模式', '内模式', '存储模式'],
      answer: 0,
      explanation: '外模式（子模式/用户模式）对应用户视图，可有多个；模式（概念模式）是全体数据的逻辑结构，只有一个；内模式（存储模式）描述物理存储结构。',
      tags: ['概念', '必背']
    },
    {
      id: 'DB-002', module: 'database', topic: '数据库体系结构', difficulty: 2,
      stem: '当数据库的物理存储结构改变时，只需修改模式/内模式映像，从而保证（ ）。',
      options: ['物理独立性', '逻辑独立性', '并发一致性', '完整性'],
      answer: 0,
      explanation: '模式/内模式映像保证物理独立性（存储变、逻辑不变）；外模式/模式映像保证逻辑独立性（逻辑结构变、用户视图不变）。两者方向不要记反。',
      tags: ['概念', '易错']
    },
    {
      id: 'DB-003', module: 'database', topic: 'ER 模型', difficulty: 2,
      stem: 'ER 图中，教师与课程之间为 m:n 的联系"讲授"，转换为关系模式时（ ）。',
      options: ['必须单独建立一个关系模式，主键为教师号与课程号的组合', '可合并到教师关系中，加入课程号作为外键', '可合并到课程关系中，加入教师号作为外键', '不需要转换，ER 图可直接实现'],
      answer: 0,
      explanation: 'm:n 联系必须独立成表，主键为两端实体主键的组合，并可附加联系的属性（如课时）。1:n 才可把 1 端主键放入 n 端作外键。',
      tags: ['概念', '高频']
    },
    {
      id: 'DB-004', module: 'database', topic: '关系代数', difficulty: 2,
      stem: '关系代数中，从关系中选取满足条件的元组（行）的运算是（ ）。',
      options: ['选择（σ）', '投影（π）', '连接（⋈）', '除（÷）'],
      answer: 0,
      explanation: 'σ 选择按条件筛选行；π 投影选取指定列并去重；⋈ 连接按条件合并两表；÷ 除法用于表达"对所有…"的语义。',
      tags: ['概念', '必背']
    },
    {
      id: 'DB-005', module: 'database', topic: '规范化', difficulty: 3,
      stem: '关系 R(A,B,C)，函数依赖集 F={A→B, B→C}，则 R 的候选键是（ ）。',
      options: ['A', 'B', 'C', 'AB'],
      answer: 0,
      explanation: '求闭包：A+ = {A,B,C}（由 A→B、B→C 推出全部属性），且 A 不能由其他属性推出，故 A 为唯一候选键。B 的闭包为 {B,C}，不含 A。',
      tags: ['计算', '难点']
    },
    {
      id: 'DB-006', module: 'database', topic: '规范化', difficulty: 2,
      stem: '若关系模式属于 2NF，则它必须（ ）。',
      options: ['消除非主属性对候选键的部分函数依赖', '消除非主属性对候选键的传递函数依赖', '每个属性都不可再分', '所有决定因素都是候选键'],
      answer: 0,
      explanation: '1NF：属性原子；2NF：在 1NF 基础上消除非主属性对码的部分依赖；3NF：再消除传递依赖；BCNF：每个决定因素都包含候选键。',
      tags: ['概念', '必背']
    },
    {
      id: 'DB-007', module: 'database', topic: '规范化', difficulty: 3,
      stem: '某关系模式已满足 3NF 但不满足 BCNF，其可能的原因是（ ）。',
      options: ['存在主属性对候选键的部分或传递依赖', '存在非主属性对候选键的传递依赖', '属性不是原子的', '存在非主属性对候选键的部分依赖'],
      answer: 0,
      explanation: '3NF 允许主属性对码的传递依赖（决定因素不是候选键但被依赖者是主属性）。BCNF 要求所有非平凡函数依赖的决定因素都必须是候选键，条件更严。B、D 都是 2NF/3NF 已排除的情况。',
      tags: ['概念', '难点']
    },
    {
      id: 'DB-008', module: 'database', topic: '规范化', difficulty: 3,
      stem: '关系 R 分解为 R1 与 R2，判定该分解具有无损连接性的条件是（ ）。',
      options: ['R1∩R2 → R1-R2 或 R1∩R2 → R2-R1 成立', 'R1∪R2 = R 即可', 'R1 与 R2 没有公共属性', 'R1 与 R2 都满足 3NF'],
      answer: 0,
      explanation: '无损连接判定：公共属性集能函数决定其中一个子关系的全部属性。若公共属性是 R1 或 R2 的候选键，则可还原原关系。保持函数依赖需另行验证。',
      tags: ['概念', '难点']
    },
    {
      id: 'DB-009', module: 'database', topic: 'SQL', difficulty: 2,
      stem: '在 SQL 中，对分组后的结果进行筛选应使用（ ）子句。',
      options: ['HAVING', 'WHERE', 'GROUP BY', 'ORDER BY'],
      answer: 0,
      explanation: 'WHERE 在分组前过滤行，不能用于聚合函数；HAVING 在 GROUP BY 之后过滤分组，可配合 COUNT/SUM 等聚合条件。执行顺序：FROM→WHERE→GROUP BY→HAVING→SELECT→ORDER BY。',
      tags: ['概念', '高频']
    },
    {
      id: 'DB-010', module: 'database', topic: 'SQL', difficulty: 1,
      stem: '下列关于视图的说法，错误的是（ ）。',
      options: ['视图在数据库中物理存储了完整数据，因此查询更快', '视图可以简化复杂查询', '视图可以提供列级安全性', '视图是虚表，数据仍来自基表'],
      answer: 0,
      explanation: '视图是从一个或多个基表导出的虚表，数据库中只存定义不存数据（物化视图除外），因此不保证查询更快。其价值在于简化查询、控制访问粒度、屏蔽表结构变化。',
      tags: ['概念', '易错']
    },
    {
      id: 'DB-011', module: 'database', topic: '事务', difficulty: 1,
      stem: '事务的 ACID 特性中，"事务一旦提交，其结果永久保存"指的是（ ）。',
      options: ['持久性', '原子性', '一致性', '隔离性'],
      answer: 0,
      explanation: '原子性（全做或全不做）、一致性（从一个一致状态到另一个一致状态）、隔离性（并发事务互不干扰）、持久性（提交后永久生效，靠日志与检查点保证）。',
      tags: ['概念', '必背']
    },
    {
      id: 'DB-012', module: 'database', topic: '并发控制', difficulty: 3,
      stem: '要避免"读脏数据"，事务隔离级别至少应设置为（ ）。',
      options: ['READ COMMITTED', 'READ UNCOMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'],
      answer: 0,
      explanation: 'READ UNCOMMITTED 允许脏读；READ COMMITTED 只能读已提交数据，避免脏读但可能出现不可重复读；REPEATABLE READ 避免不可重复读；SERIALIZABLE 避免幻读。',
      tags: ['概念', '高频']
    },
    {
      id: 'DB-013', module: 'database', topic: '并发控制', difficulty: 2,
      stem: '两段锁协议（2PL）要求事务的封锁分两个阶段，即（ ）。',
      options: ['扩展阶段只能加锁，收缩阶段只能解锁', '扩展阶段只能解锁，收缩阶段只能加锁', '两个阶段都可加锁和解锁', '只在开始时加锁，结束时解锁'],
      answer: 0,
      explanation: '两段锁协议：扩展阶段只能申请锁不能释放，收缩阶段只能释放锁不能申请。遵守 2PL 的事务并发调度一定是可串行化的，但可能发生死锁。',
      tags: ['概念', '易错']
    },
    {
      id: 'DB-014', module: 'database', topic: '索引', difficulty: 1,
      stem: '在表上建立索引后，通常会出现（ ）。',
      options: ['查询速度提高，插入与更新速度下降', '查询与更新速度都提高', '查询速度下降，更新速度提高', '对查询和更新均无影响'],
      answer: 0,
      explanation: '索引以空间和写性能换读性能：查询可走索引减少扫描；但插入/更新/删除需同步维护索引，代价上升。因此不宜在更新频繁、基数低的列上滥建索引。',
      tags: ['概念']
    }
  ]);
})(window.RK);
