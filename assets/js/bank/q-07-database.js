/* 数据库系统 —— 35 题 */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'DB-001', module: 'database', topic: '数据库体系结构', difficulty: 1,
      stem: '数据库三级模式中，面向具体用户、描述用户所看到的数据视图的是（ ）。',
      options: ['模式', '内模式', '存储模式', '外模式'],
      answer: 3,
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
      options: ['不需要转换，ER 图可直接实现', '必须单独建立一个关系模式，主键为教师号与课程号的组合', '可合并到教师关系中，加入课程号作为外键', '可合并到课程关系中，加入教师号作为外键'],
      answer: 1,
      explanation: 'm:n 联系必须独立成表，主键为两端实体主键的组合，并可附加联系的属性（如课时）。1:n 才可把 1 端主键放入 n 端作外键。',
      tags: ['概念', '高频']
    },
    {
      id: 'DB-004', module: 'database', topic: '关系代数', difficulty: 2,
      stem: '关系代数中，从关系中选取满足条件的元组（行）的运算是（ ）。',
      options: ['连接（⋈）', '除（÷）', '选择（σ）', '投影（π）'],
      answer: 2,
      explanation: 'σ 选择按条件筛选行；π 投影选取指定列并去重；⋈ 连接按条件合并两表；÷ 除法用于表达"对所有…"的语义。',
      tags: ['概念', '必背']
    },
    {
      id: 'DB-005', module: 'database', topic: '规范化', difficulty: 3,
      stem: '关系 R(A,B,C)，函数依赖集 F={A→B, B→C}，则 R 的候选键是（ ）。',
      options: ['B', 'C', 'AB', 'A'],
      answer: 3,
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
      options: ['存在非主属性对候选键的部分依赖', '存在主属性对候选键的部分或传递依赖', '存在非主属性对候选键的传递依赖', '属性不是原子的'],
      answer: 1,
      explanation: '3NF 允许主属性对码的传递依赖（决定因素不是候选键但被依赖者是主属性）。BCNF 要求所有非平凡函数依赖的决定因素都必须是候选键，条件更严。B、D 都是 2NF/3NF 已排除的情况。',
      tags: ['概念', '难点']
    },
    {
      id: 'DB-008', module: 'database', topic: '规范化', difficulty: 3,
      stem: '关系 R 分解为 R1 与 R2，判定该分解具有无损连接性的条件是（ ）。',
      options: ['R1 与 R2 没有公共属性', 'R1 与 R2 都满足 3NF', 'R1∩R2 → R1-R2 或 R1∩R2 → R2-R1 成立', 'R1∪R2 = R 即可'],
      answer: 2,
      explanation: '无损连接判定：公共属性集能函数决定其中一个子关系的全部属性。若公共属性是 R1 或 R2 的候选键，则可还原原关系。保持函数依赖需另行验证。',
      tags: ['概念', '难点']
    },
    {
      id: 'DB-009', module: 'database', topic: 'SQL', difficulty: 2,
      stem: '在 SQL 中，对分组后的结果进行筛选应使用（ ）子句。',
      options: ['WHERE', 'GROUP BY', 'ORDER BY', 'HAVING'],
      answer: 3,
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
      options: ['隔离性', '持久性', '原子性', '一致性'],
      answer: 1,
      explanation: '原子性（全做或全不做）、一致性（从一个一致状态到另一个一致状态）、隔离性（并发事务互不干扰）、持久性（提交后永久生效，靠日志与检查点保证）。',
      tags: ['概念', '必背']
    },
    {
      id: 'DB-012', module: 'database', topic: '并发控制', difficulty: 3,
      stem: '要避免"读脏数据"，事务隔离级别至少应设置为（ ）。',
      options: ['REPEATABLE READ', 'SERIALIZABLE', 'READ COMMITTED', 'READ UNCOMMITTED'],
      answer: 2,
      explanation: 'READ UNCOMMITTED 允许脏读；READ COMMITTED 只能读已提交数据，避免脏读但可能出现不可重复读；REPEATABLE READ 避免不可重复读；SERIALIZABLE 避免幻读。',
      tags: ['概念', '高频']
    },
    {
      id: 'DB-013', module: 'database', topic: '并发控制', difficulty: 2,
      stem: '两段锁协议（2PL）要求事务的封锁分两个阶段，即（ ）。',
      options: ['扩展阶段只能解锁，收缩阶段只能加锁', '两个阶段都可加锁和解锁', '只在开始时加锁，结束时解锁', '扩展阶段只能加锁，收缩阶段只能解锁'],
      answer: 3,
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
    },
    {
      id: 'DB-015', module: 'database', topic: '数据库体系结构', difficulty: 1,
      stem: '描述数据库物理存储结构与存取方式的模式是（ ）。',
      options: ['用户模式', '内模式', '外模式', '概念模式'],
      answer: 1,
      explanation: '三级模式：外模式（用户视图，可有多个）、模式/概念模式（全体数据的逻辑结构，只有一个）、内模式/存储模式（物理存储结构与存取方法，只有一个）。',
      tags: ['概念', '必背']
    },
    {
      id: 'DB-016', module: 'database', topic: '数据库体系结构', difficulty: 2,
      stem: '数据模型的三要素是（ ）。',
      options: ['实体、属性、联系', '外模式、模式、内模式', '数据结构、数据操作、完整性约束', '表、视图、索引'],
      answer: 2,
      explanation: '数据结构描述数据的组织方式与联系；数据操作包括查询与更新；完整性约束规定数据必须满足的语义规则。实体/属性/联系是 ER 模型的三要素，三级模式是体系结构而非数据模型要素。',
      tags: ['记忆', '高频']
    },
    {
      id: 'DB-017', module: 'database', topic: 'ER 模型', difficulty: 2,
      stem: '若一个班级有多名教师、每名教师只属于一个班级，转换为关系模式时应（ ）。',
      options: ['在班级关系中增加教师号作为外键', '单独建立一个班级-教师关系表', '把教师与班级合并为一个关系', '在教师关系中增加班级号作为外键'],
      answer: 3,
      explanation: '班级与教师是 1:n 联系，1 端为班级、n 端为教师。转换规则是把 1 端主键放入 n 端作外键，即在教师表中加班级号。m:n 联系才必须单独建表。',
      tags: ['概念', '高频']
    },
    {
      id: 'DB-018', module: 'database', topic: 'ER 模型', difficulty: 2,
      stem: 'ER 图中员工拥有多个电话号码这一多值属性，转换为关系模式时应（ ）。',
      options: ['单独建立一个关系模式，包含员工号与电话号码', '作为员工关系的一个属性直接保留', '拆分为多个员工关系', '删除该属性以保证 1NF'],
      answer: 0,
      explanation: '多值属性违反 1NF（属性需原子），转换时单独建表：主键为（员工号, 电话号码）的组合，员工号为外键。派生属性则可计算得到，一般不必存储。',
      tags: ['概念', '易错']
    },
    {
      id: 'DB-019', module: 'database', topic: 'ER 模型', difficulty: 3,
      stem: '关于弱实体，下列说法正确的是（ ）。',
      options: ['弱实体与强实体之间只能是 1:1 联系', '弱实体不能独立存在，其主键必须包含所依赖的强实体主键', '弱实体可以独立存在，主键与强实体无关', '弱实体不能参与任何联系'],
      answer: 1,
      explanation: '弱实体的存在依赖于强实体（如"订单明细"依赖于"订单"），在 ER 图中用双线矩形表示，与强实体的联系用双线菱形。其主键由强实体主键加上自身的部分键构成。',
      tags: ['概念', '难点']
    },
    {
      id: 'DB-020', module: 'database', topic: 'ER 模型', difficulty: 2,
      stem: '把多个分 ER 图合并时，同一对象在不同分图中使用了不同名称，这类冲突属于（ ）。',
      options: ['结构冲突', '类型冲突', '命名冲突', '属性冲突'],
      answer: 2,
      explanation: 'ER 合并冲突分三类：属性冲突（类型、取值范围、单位不一致）、命名冲突（同名异义或异名同义）、结构冲突（同一对象在不同图中分别被抽象为实体和属性，或联系类型不同）。',
      tags: ['概念']
    },
    {
      id: 'DB-021', module: 'database', topic: 'ER 模型', difficulty: 2,
      stem: '1:1 联系转换为关系模式时，较常见的做法是（ ）。',
      options: ['必须单独建立一个关系模式', '把两端主键都删除', '拆分为两张新表', '合并到任一端的关系模式中，把另一端主键作为外键'],
      answer: 3,
      explanation: '1:1 联系可以合并到任一端（通常选参与度更完全的一端以减少空值），也可独立成表。m:n 联系必须独立成表且主键为两端主键的组合，这是三者转换规则的关键差别。',
      tags: ['概念']
    },
    {
      id: 'DB-022', module: 'database', topic: '关系代数', difficulty: 1,
      stem: '关系代数中投影运算的结果（ ）。',
      options: ['自动去除重复元组', '保留重复元组', '只保留第一行', '一定按主键排序'],
      answer: 0,
      explanation: '关系是元组的集合，投影 π 取指定列后若出现重复元组会被合并，因此结果仍是集合。选择 σ 按条件筛行，不改变元组内容。',
      tags: ['概念']
    },
    {
      id: 'DB-023', module: 'database', topic: '关系代数', difficulty: 2,
      stem: '关系代数中的除法运算常用于表达（ ）语义。',
      options: ['"两表笛卡儿积"', '"对所有…"（如选修了全部课程的学生）', '"存在某个…"', '"按条件筛选行"'],
      answer: 1,
      explanation: '除法 R÷S 的结果是那些"与 S 中所有元组都相关"的 R 中属性值，用于"全部/所有"类查询。SQL 中通常用 NOT EXISTS 双重否定来实现同样的语义。',
      tags: ['概念']
    },
    {
      id: 'DB-024', module: 'database', topic: '规范化', difficulty: 3,
      stem: '关系 R(A,B,C,D)，函数依赖集 F={AB→C, C→D, D→A}，则 R 的候选键是（ ）。',
      options: ['只有 BC', 'AB 与 CD', 'AB 与 BC', '只有 AB'],
      answer: 2,
      explanation: '(AB)+ = {A,B,C,D}（AB→C，再由 C→D）；(BC)+ = {A,B,C,D}（C→D 得 D，D→A 得 A）。两者都不能再约简，故候选键为 AB 与 BC。CD 的闭包为 {A,C,D}，不含 B，不是键。',
      tags: ['计算', '难点']
    },
    {
      id: 'DB-025', module: 'database', topic: '索引', difficulty: 2,
      stem: '关于聚簇索引（聚集索引），下列说法正确的是（ ）。',
      options: ['一个表可以建立任意多个聚簇索引', '它只能建立在非主键列上', '它与数据的物理存储顺序无关', '它决定表中数据行的物理存储顺序，一个表最多只能有一个'],
      answer: 3,
      explanation: '聚簇索引的索引项顺序与数据行的物理顺序一致，因此一张表只能有一个（数据只能按一种顺序存放）；非聚簇索引可有多个，索引项另存且指向数据行。',
      tags: ['概念', '易错']
    },
    {
      id: 'DB-026', module: 'database', topic: 'SQL', difficulty: 2,
      stem: 'SQL 中 LEFT OUTER JOIN 的结果是（ ）。',
      options: ['保留左表全部行，右表无匹配时对应列补 NULL', '只保留两表都能匹配的行', '保留右表全部行', '返回两表的笛卡儿积'],
      answer: 0,
      explanation: '左外连接以左表为基准，右表无匹配记录时右表列取 NULL；右外连接反之；内连接（INNER JOIN）只保留匹配成功的行；全外连接两侧都保留。',
      tags: ['概念', '高频']
    },
    {
      id: 'DB-027', module: 'database', topic: 'SQL', difficulty: 3,
      stem: '关于 EXISTS 子查询，下列说法正确的是（ ）。',
      options: ['它等价于 NOT IN', '它是相关子查询，对外表的每一行执行一次，只判断是否返回行', '它是非相关子查询，整个查询只执行一次', '它必须返回具体的数据值'],
      answer: 1,
      explanation: 'EXISTS 只关心子查询是否至少返回一行，不返回值本身；子查询中引用外表的列使其成为相关子查询，逻辑上对外表每行执行一次。NOT EXISTS 常用于实现"全部"语义，与 NOT IN 在含 NULL 时行为不同。',
      tags: ['概念', '难点']
    },
    {
      id: 'DB-028', module: 'database', topic: 'SQL', difficulty: 1,
      stem: '语句 SELECT dept, COUNT(*) FROM emp GROUP BY dept 的功能是（ ）。',
      options: ['按部门排序输出全部员工', '删除重复的部门记录', '按部门分组，统计每个部门的员工人数', '统计员工总人数'],
      answer: 2,
      explanation: 'GROUP BY 按 dept 把行分成若干组，COUNT(*) 统计每组行数，结果为"部门—人数"两列。若只要总人数则不加 GROUP BY；排序需 ORDER BY。',
      tags: ['概念']
    },
    {
      id: 'DB-029', module: 'database', topic: 'SQL', difficulty: 1,
      stem: 'SQL 中的 GRANT 与 REVOKE 语句属于（ ）。',
      options: ['数据定义（DDL）', '数据操纵（DML）', '事务控制', '数据控制（DCL）'],
      answer: 3,
      explanation: 'DDL 含 CREATE/ALTER/DROP；DML 含 SELECT/INSERT/UPDATE/DELETE；DCL 含 GRANT/REVOKE，用于授权与收回权限；事务控制含 COMMIT/ROLLBACK/SAVEPOINT。',
      tags: ['概念', '必背']
    },
    {
      id: 'DB-030', module: 'database', topic: '事务', difficulty: 3,
      stem: '同一事务内两次执行相同的查询，第二次返回的行数比第一次多，这种现象称为（ ）。',
      options: ['幻读', '脏读', '不可重复读', '丢失更新'],
      answer: 0,
      explanation: '幻读指同一查询因其他事务插入或删除记录而返回不同的行集合；不可重复读指读取同一行数据得到不同值；脏读指读到未提交的数据；丢失更新指两个事务的修改相互覆盖。',
      tags: ['概念', '难点']
    },
    {
      id: 'DB-031', module: 'database', topic: '并发控制', difficulty: 2,
      stem: '要避免幻读，事务隔离级别应设置为（ ）。',
      options: ['READ UNCOMMITTED', 'SERIALIZABLE', 'REPEATABLE READ', 'READ COMMITTED'],
      answer: 1,
      explanation: '标准四级隔离：READ UNCOMMITTED 允许脏读；READ COMMITTED 避免脏读；REPEATABLE READ 避免不可重复读；SERIALIZABLE 通过范围锁等机制避免幻读。级别越高并发度越低。',
      tags: ['概念', '高频']
    },
    {
      id: 'DB-032', module: 'database', topic: '并发控制', difficulty: 2,
      stem: '关于共享锁 S 与排他锁 X 的兼容性，下列说法正确的是（ ）。',
      options: ['X 锁与 X 锁兼容', '所有锁之间都兼容', 'S 锁与 S 锁兼容，X 锁与任何锁都不兼容', 'S 锁与 X 锁兼容'],
      answer: 2,
      explanation: '共享锁用于读，多个事务可同时持有同一数据的 S 锁；排他锁用于写，与任何其他锁（包括 S 锁）都不兼容。这种相容矩阵是两段锁协议与并发控制的基础。',
      tags: ['概念', '易错']
    },
    {
      id: 'DB-033', module: 'database', topic: '备份与恢复', difficulty: 2,
      stem: '动态转储（热备份）在数据库运行状态下进行，为保证恢复的正确性必须配合（ ）。',
      options: ['重新编译数据库', '清空缓冲区', '重建全部索引', '日志文件'],
      answer: 3,
      explanation: '动态转储期间可能有事务正在修改数据，转储得到的副本可能不一致，必须同时转储这段时间的日志，恢复时用日志重做（REDO）已提交事务、撤销（UNDO）未完成事务。静态转储则要求转储期间不允许运行事务。',
      tags: ['概念', '高频']
    },
    {
      id: 'DB-034', module: 'database', topic: '备份与恢复', difficulty: 1,
      stem: '增量转储是指（ ）。',
      options: ['只转储上次转储之后发生变化的数据', '每次转储数据库的全部数据', '只转储索引文件', '只转储日志文件'],
      answer: 0,
      explanation: '按转储范围分为海量转储（全量）与增量转储：前者每次都备份全部数据，恢复简单但耗时；后者只备份变化部分，速度快但恢复需"最近一次全量 + 若干增量 + 日志"。',
      tags: ['概念']
    },
    {
      id: 'DB-035', module: 'database', topic: '备份与恢复', difficulty: 2,
      stem: '数据库恢复中引入检查点（Checkpoint）技术的主要目的是（ ）。',
      options: ['替代日志文件的作用', '减少故障恢复时需要扫描日志的范围，缩短恢复时间', '提高查询的并发度', '自动压缩数据文件'],
      answer: 1,
      explanation: '检查点把内存中的脏页刷到磁盘并记录当时活跃的事务表，恢复时只需从最近检查点开始处理日志，不必从头扫描。事务故障用 UNDO 回滚，介质故障则需装入副本并用日志 REDO。',
      tags: ['概念']
    }
  ]);
})(window.RK);
