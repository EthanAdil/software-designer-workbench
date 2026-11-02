/* 软件工程 —— 24 题（上午卷第一大模块） */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'SE-001', module: 'software-engineering', topic: '开发模型', difficulty: 1,
      stem: '适用于需求明确、稳定且开发团队熟悉领域的小型项目，采用严格串行阶段的开发模型是（ ）。',
      options: ['瀑布模型', '原型模型', '螺旋模型', '喷泉模型'],
      answer: 0,
      explanation: '瀑布模型阶段严格串行、文档驱动，优点是规范、便于管理，缺点是难以适应需求变更，因此适合需求明确稳定的项目。',
      tags: ['概念', '必背']
    },
    {
      id: 'SE-002', module: 'software-engineering', topic: '开发模型', difficulty: 2,
      stem: '螺旋模型与增量模型相比，最显著的额外特征是（ ）。',
      options: ['引入风险分析', '强调文档驱动', '采用自顶向下设计', '要求需求完全确定'],
      answer: 0,
      explanation: '螺旋模型 = 增量 + 原型 + 风险分析，每一圈都包含"制定计划、风险分析、实施工程、客户评估"，适合大型、高风险项目。风险分析是其核心标志。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-003', module: 'software-engineering', topic: '开发模型', difficulty: 2,
      stem: '在 V 模型中，与"概要设计"相对应的测试级别是（ ）。',
      options: ['系统测试', '单元测试', '集成测试', '验收测试'],
      answer: 0,
      explanation: 'V 模型左侧开发、右侧测试一一对应：需求分析↔验收测试，概要设计↔系统测试，详细设计↔集成测试，编码↔单元测试。口诀"需求验、概系、详集、编码单"。',
      tags: ['概念', '易错']
    },
    {
      id: 'SE-004', module: 'software-engineering', topic: '敏捷开发', difficulty: 2,
      stem: '在 Scrum 框架中，负责维护产品待办列表（Product Backlog）并确定优先级的是（ ）。',
      options: ['Product Owner', 'Scrum Master', '开发团队', '项目经理'],
      answer: 0,
      explanation: 'Scrum 三种角色：Product Owner 负责需求与优先级、对产品价值负责；Scrum Master 负责流程与障碍清除；开发团队负责交付增量。项目经理不是 Scrum 的标准角色。',
      tags: ['概念']
    },
    {
      id: 'SE-005', module: 'software-engineering', topic: '开发模型', difficulty: 2,
      stem: 'RUP（统一过程）的四个阶段依次是（ ）。',
      options: ['初始、细化、构建、交付', '初始、构建、细化、交付', '需求、设计、实现、测试', '计划、分析、设计、实施'],
      answer: 0,
      explanation: 'RUP 四阶段：Inception（初始）→ Elaboration（细化）→ Construction（构建）→ Transition（交付）。其三大特点是用例驱动、以架构为中心、迭代与增量。',
      tags: ['记忆']
    },
    {
      id: 'SE-006', module: 'software-engineering', topic: '需求工程', difficulty: 1,
      stem: '数据流图（DFD）中不包含下列哪种元素（ ）。',
      options: ['控制流', '外部实体', '加工', '数据存储'],
      answer: 0,
      explanation: 'DFD 四要素为外部实体、加工（处理）、数据存储、数据流。DFD 描述数据流动，不描述控制流；控制流由状态图或流程图表达。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-007', module: 'software-engineering', topic: '需求工程', difficulty: 2,
      stem: '数据字典中，符号 "{ }" 表示（ ）。',
      options: ['重复', '可选', '选择', '顺序'],
      answer: 0,
      explanation: '数据字典常用符号：= 表示"定义为"，+ 表示顺序连接，[ | ] 表示选择其一，{ } 表示重复（至少一次或零次视约定），( ) 表示可选。',
      tags: ['记忆']
    },
    {
      id: 'SE-008', module: 'software-engineering', topic: '耦合', difficulty: 2,
      stem: '两个模块之间仅通过参数传递简单数据值，这种耦合属于（ ）。',
      options: ['数据耦合', '标记耦合', '控制耦合', '公共耦合'],
      answer: 0,
      explanation: '数据耦合：模块间只传简单数据参数，耦合度低（仅次于非直接耦合），是设计追求的目标。标记耦合传的是数据结构（如整个记录），控制耦合传的是控制信息（如标志位）。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-009', module: 'software-engineering', topic: '耦合', difficulty: 1,
      stem: '一个模块直接访问另一个模块的内部数据或代码，这种耦合是（ ），应尽量避免。',
      options: ['内容耦合', '公共耦合', '外部耦合', '控制耦合'],
      answer: 0,
      explanation: '耦合由低到高：非直接 < 数据 < 标记 < 控制 < 外部 < 公共 < 内容。内容耦合是最高（最差）的耦合，如直接修改其他模块的内部变量或通过 GOTO 跳入另一模块。',
      tags: ['概念', '必背']
    },
    {
      id: 'SE-010', module: 'software-engineering', topic: '内聚', difficulty: 1,
      stem: '模块内所有处理元素共同完成一个单一功能，且缺一不可，这种内聚是（ ）。',
      options: ['功能内聚', '顺序内聚', '通信内聚', '逻辑内聚'],
      answer: 0,
      explanation: '内聚由高到低：功能 > 顺序 > 通信 > 过程 > 时间 > 逻辑 > 偶然。功能内聚最高，模块只做一件事且各元素协同完成该功能。',
      tags: ['概念', '必背']
    },
    {
      id: 'SE-011', module: 'software-engineering', topic: '模块化', difficulty: 2,
      stem: '关于模块的扇入与扇出，下列说法正确的是（ ）。',
      options: ['扇入越大越好，说明该模块复用程度高', '扇出越大越好，说明该模块功能强大', '扇入指一个模块调用的下级模块数', '扇出指调用该模块的上级模块数'],
      answer: 0,
      explanation: '扇入 = 被多少个上级模块调用（越大越好，复用度高）；扇出 = 调用多少个下级模块（宜控制在 3~4，过大则模块过于复杂）。选项 C、D 把定义写反了。',
      tags: ['概念', '易错']
    },
    {
      id: 'SE-012', module: 'software-engineering', topic: '详细设计', difficulty: 2,
      stem: '某程序流程图中有 5 个判定结点，则其 McCabe 环形复杂度为（ ）。',
      options: ['6', '5', '4', '7'],
      answer: 0,
      explanation: 'V(G) = 判定结点数 + 1 = 5 + 1 = 6。等价公式：V(G) = 边数 - 结点数 + 2 = 区域数。V(G) 也代表达到基本路径覆盖所需的最少测试用例数。',
      tags: ['计算', '高频']
    },
    {
      id: 'SE-013', module: 'software-engineering', topic: '软件测试', difficulty: 1,
      stem: '对输入数据的边界及其附近取值设计测试用例，属于（ ）。',
      options: ['边界值分析', '等价类划分', '因果图法', '错误推测法'],
      answer: 0,
      explanation: '大量缺陷出现在输入范围的边界上，故取 min-1、min、min+1、max-1、max、max+1 等值。边界值分析常与等价类划分配合使用，属黑盒测试方法。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-014', module: 'software-engineering', topic: '软件测试', difficulty: 2,
      stem: '下列测试方法中，属于白盒测试的是（ ）。',
      options: ['语句覆盖', '等价类划分', '边界值分析', '正交试验设计'],
      answer: 0,
      explanation: '白盒测试（结构测试）关注程序内部逻辑：语句覆盖、判定覆盖、条件覆盖、判定/条件覆盖、条件组合覆盖、路径覆盖、基本路径测试。其余三项均为黑盒方法。',
      tags: ['概念']
    },
    {
      id: 'SE-015', module: 'software-engineering', topic: '软件测试', difficulty: 2,
      stem: '下列覆盖准则中，覆盖强度最高的是（ ）。',
      options: ['路径覆盖', '条件组合覆盖', '判定/条件覆盖', '语句覆盖'],
      answer: 0,
      explanation: '由弱到强：语句 < 判定 < 条件 < 判定/条件 < 条件组合 < 路径覆盖。路径覆盖要求执行程序中所有可能的路径，强度最高但用例数可能爆炸。',
      tags: ['记忆', '必背']
    },
    {
      id: 'SE-016', module: 'software-engineering', topic: '软件测试', difficulty: 2,
      stem: '进行单元测试时，为模拟被测试模块所调用的下层模块而编写的辅助模块称为（ ）。',
      options: ['桩模块', '驱动模块', '测试用例', '测试桩件'],
      answer: 0,
      explanation: '驱动模块（driver）模拟上层调用者，桩模块（stub）模拟被调用的下层模块。单元测试需要二者配合才能独立运行被测模块。',
      tags: ['概念', '易错']
    },
    {
      id: 'SE-017', module: 'software-engineering', topic: '软件测试', difficulty: 2,
      stem: '采用自顶向下增量式集成测试时，需要编写的辅助模块是（ ）。',
      options: ['桩模块', '驱动模块', '接口模块', '数据模块'],
      answer: 0,
      explanation: '自顶向下从主控模块开始，下层模块尚未编写，需用桩模块模拟；自底向上则需驱动模块模拟上层调用。三明治集成两者都用。',
      tags: ['概念']
    },
    {
      id: 'SE-018', module: 'software-engineering', topic: '软件测试', difficulty: 1,
      stem: '修改软件后重新运行原有测试用例，以确认修改未引入新缺陷，这种测试称为（ ）。',
      options: ['回归测试', '冒烟测试', '验收测试', '负载测试'],
      answer: 0,
      explanation: '回归测试针对修改后的软件重跑既有用例，防止"改一处坏一片"。冒烟测试是快速验证基本功能是否可用，属于构建后的准入检查。',
      tags: ['概念']
    },
    {
      id: 'SE-019', module: 'software-engineering', topic: '软件维护', difficulty: 2,
      stem: '在软件维护的四种类型中，工作量占比通常最大的是（ ）。',
      options: ['改善性（完善性）维护', '改正性维护', '适应性维护', '预防性维护'],
      answer: 0,
      explanation: '改善性维护（新增功能、优化性能）通常占维护工作量的一半以上；改正性维护修缺陷，适应性维护应对环境变化，预防性维护提高可维护性。',
      tags: ['记忆', '易错']
    },
    {
      id: 'SE-020', module: 'software-engineering', topic: '项目管理', difficulty: 2,
      stem: '关于关键路径，下列说法正确的是（ ）。',
      options: ['关键路径是耗时最长的路径，其上的活动总时差为 0', '关键路径是耗时最短的路径，其上的活动可以延迟', '关键路径只有一条，且一定经过全部活动', '关键路径上的活动资源占用最少'],
      answer: 0,
      explanation: '关键路径是网络图中最长的路径，决定项目最短工期；其上活动总时差为 0，任何延误都会推迟整个项目。关键路径可能不止一条。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-021', module: 'software-engineering', topic: '项目管理', difficulty: 2,
      stem: '与 PERT 图相比，Gantt 图的主要缺点是（ ）。',
      options: ['不能清晰表达任务之间的依赖关系', '不能表示任务的起止时间', '不能表示任务的持续时间', '不能用于进度控制'],
      answer: 0,
      explanation: 'Gantt 图以横道表示任务时间，直观易读，但难以表达任务间的依赖与关键路径；PERT 网络图能表达依赖关系并计算关键路径。',
      tags: ['概念']
    },
    {
      id: 'SE-022', module: 'software-engineering', topic: '过程改进', difficulty: 2,
      stem: 'CMMI 模型中，"已定义级"是第（ ）级，其标志是（ ）。',
      options: ['3 级，组织已建立标准过程并据此裁剪项目过程', '2 级，项目已建立基本管理过程', '4 级，过程已量化管理', '5 级，持续过程优化'],
      answer: 0,
      explanation: 'CMMI 五级：1 初始级、2 已管理级（项目级管理）、3 已定义级（组织标准过程）、4 量化管理级、5 优化级。注意 2 级是"已管理"，3 级才是"已定义"。',
      tags: ['记忆', '易错']
    },
    {
      id: 'SE-023', module: 'software-engineering', topic: '软件质量', difficulty: 2,
      stem: '下列不属于软件可维护性子特性的是（ ）。',
      options: ['易用性', '可理解性', '可测试性', '可修改性'],
      answer: 0,
      explanation: '可维护性包含易分析性、易改变性（可修改性）、稳定性、易测试性，以及可理解性。易用性属于"易用性（可用性）"质量特性，与可维护性并列。',
      tags: ['记忆']
    },
    {
      id: 'SE-024', module: 'software-engineering', topic: '项目管理', difficulty: 2,
      stem: 'COCOMO 模型主要用于（ ）。',
      options: ['软件成本（工作量）估算', '软件可靠性预测', '软件复杂度度量', '软件过程能力评估'],
      answer: 0,
      explanation: 'COCOMO（构造性成本模型）依据代码行数（KLOC）与成本驱动因子估算工作量和进度，分基本、中间、详细三个层次。复杂度度量常用 McCabe，过程能力用 CMMI。',
      tags: ['概念']
    }
  ]);
})(window.RK);
