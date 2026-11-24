/* 软件工程 —— 60 题（上午卷第一大模块） */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'SE-001', module: 'software-engineering', topic: '开发模型', difficulty: 1, points: ['software-engineering|开发模型'],
      stem: '适用于需求明确、稳定且开发团队熟悉领域的小型项目，采用严格串行阶段的开发模型是（ ）。',
      options: ['螺旋模型', '喷泉模型', '瀑布模型', '原型模型'],
      answer: 2,
      explanation: '瀑布模型阶段严格串行、文档驱动，优点是规范、便于管理，缺点是难以适应需求变更，因此适合需求明确稳定的项目。',
      tags: ['概念', '必背']
    },
    {
      id: 'SE-002', module: 'software-engineering', topic: '开发模型', difficulty: 2, points: ['software-engineering|开发模型'],
      stem: '螺旋模型与增量模型相比，最显著的额外特征是（ ）。',
      options: ['强调文档驱动', '采用自顶向下设计', '要求需求完全确定', '引入风险分析'],
      answer: 3,
      explanation: '螺旋模型 = 增量 + 原型 + 风险分析，每一圈都包含"制定计划、风险分析、实施工程、客户评估"，适合大型、高风险项目。风险分析是其核心标志。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-003', module: 'software-engineering', topic: '开发模型', difficulty: 2, points: ['software-engineering|开发模型'],
      stem: '在 V 模型中，与"概要设计"相对应的测试级别是（ ）。',
      options: ['系统测试', '单元测试', '集成测试', '验收测试'],
      answer: 0,
      explanation: 'V 模型左侧开发、右侧测试一一对应：需求分析↔验收测试，概要设计↔系统测试，详细设计↔集成测试，编码↔单元测试。口诀"需求验、概系、详集、编码单"。',
      tags: ['概念', '易错']
    },
    {
      id: 'SE-004', module: 'software-engineering', topic: '敏捷开发', difficulty: 2, points: ['software-engineering|开发模型'],
      stem: '在 Scrum 框架中，负责维护产品待办列表（Product Backlog）并确定优先级的是（ ）。',
      options: ['项目经理', 'Product Owner', 'Scrum Master', '开发团队'],
      answer: 1,
      explanation: 'Scrum 三种角色：Product Owner 负责需求与优先级、对产品价值负责；Scrum Master 负责流程与障碍清除；开发团队负责交付增量。项目经理不是 Scrum 的标准角色。',
      tags: ['概念']
    },
    {
      id: 'SE-005', module: 'software-engineering', topic: '开发模型', difficulty: 2, points: ['software-engineering|开发模型'],
      stem: 'RUP（统一过程）的四个阶段依次是（ ）。',
      options: ['需求、设计、实现、测试', '计划、分析、设计、实施', '初始、细化、构建、交付', '初始、构建、细化、交付'],
      answer: 2,
      explanation: 'RUP 四阶段：Inception（初始）→ Elaboration（细化）→ Construction（构建）→ Transition（交付）。其三大特点是用例驱动、以架构为中心、迭代与增量。',
      tags: ['记忆']
    },
    {
      id: 'SE-006', module: 'software-engineering', topic: '需求工程', difficulty: 1, points: ['software-engineering|需求工程'],
      stem: '数据流图（DFD）中不包含下列哪种元素（ ）。',
      options: ['外部实体', '加工', '数据存储', '控制流'],
      answer: 3,
      explanation: 'DFD 四要素为外部实体、加工（处理）、数据存储、数据流。DFD 描述数据流动，不描述控制流；控制流由状态图或流程图表达。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-007', module: 'software-engineering', topic: '需求工程', difficulty: 2, points: ['software-engineering|需求工程'],
      stem: '数据字典中，符号 "{ }" 表示（ ）。',
      options: ['重复', '可选', '选择', '顺序'],
      answer: 0,
      explanation: '数据字典常用符号：= 表示"定义为"，+ 表示顺序连接，[ | ] 表示选择其一，{ } 表示重复（至少一次或零次视约定），( ) 表示可选。',
      tags: ['记忆']
    },
    {
      id: 'SE-008', module: 'software-engineering', topic: '耦合', difficulty: 2, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '两个模块之间仅通过参数传递简单数据值，这种耦合属于（ ）。',
      options: ['公共耦合', '数据耦合', '标记耦合', '控制耦合'],
      answer: 1,
      explanation: '数据耦合：模块间只传简单数据参数，耦合度低（仅次于非直接耦合），是设计追求的目标。标记耦合传的是数据结构（如整个记录），控制耦合传的是控制信息（如标志位）。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-009', module: 'software-engineering', topic: '耦合', difficulty: 1, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '一个模块直接访问另一个模块的内部数据或代码，这种耦合是（ ），应尽量避免。',
      options: ['外部耦合', '控制耦合', '内容耦合', '公共耦合'],
      answer: 2,
      explanation: '耦合由低到高：非直接 < 数据 < 标记 < 控制 < 外部 < 公共 < 内容。内容耦合是最高（最差）的耦合，如直接修改其他模块的内部变量或通过 GOTO 跳入另一模块。',
      tags: ['概念', '必背']
    },
    {
      id: 'SE-010', module: 'software-engineering', topic: '内聚', difficulty: 1, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '模块内所有处理元素共同完成一个单一功能，且缺一不可，这种内聚是（ ）。',
      options: ['顺序内聚', '通信内聚', '逻辑内聚', '功能内聚'],
      answer: 3,
      explanation: '内聚由高到低：功能 > 顺序 > 通信 > 过程 > 时间 > 逻辑 > 偶然。功能内聚最高，模块只做一件事且各元素协同完成该功能。',
      tags: ['概念', '必背']
    },
    {
      id: 'SE-011', module: 'software-engineering', topic: '模块化', difficulty: 2, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '关于模块的扇入与扇出，下列说法正确的是（ ）。',
      options: ['扇入越大越好，说明该模块复用程度高', '扇出越大越好，说明该模块功能强大', '扇入指一个模块调用的下级模块数', '扇出指调用该模块的上级模块数'],
      answer: 0,
      explanation: '扇入 = 被多少个上级模块调用（越大越好，复用度高）；扇出 = 调用多少个下级模块（宜控制在 3~4，过大则模块过于复杂）。把扇入说成"调用下级"、把扇出说成"被上级调用"的说法，都是把两个定义写反了。',
      tags: ['概念', '易错']
    },
    {
      id: 'SE-012', module: 'software-engineering', topic: '详细设计', difficulty: 2, points: ['software-engineering|详细设计与复杂度'],
      stem: '某程序流程图中有 5 个判定结点，则其 McCabe 环形复杂度为（ ）。',
      options: ['7', '6', '5', '4'],
      answer: 1,
      explanation: 'V(G) = 判定结点数 + 1 = 5 + 1 = 6。等价公式：V(G) = 边数 - 结点数 + 2 = 区域数。V(G) 也代表达到基本路径覆盖所需的最少测试用例数。',
      tags: ['计算', '高频']
    },
    {
      id: 'SE-013', module: 'software-engineering', topic: '软件测试', difficulty: 1, points: ['software-engineering|软件测试'],
      stem: '对输入数据的边界及其附近取值设计测试用例，属于（ ）。',
      options: ['因果图法', '错误推测法', '边界值分析', '等价类划分'],
      answer: 2,
      explanation: '大量缺陷出现在输入范围的边界上，故取 min-1、min、min+1、max-1、max、max+1 等值。边界值分析常与等价类划分配合使用，属黑盒测试方法。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-014', module: 'software-engineering', topic: '软件测试', difficulty: 2, points: ['software-engineering|软件测试'],
      stem: '下列测试方法中，属于白盒测试的是（ ）。',
      options: ['等价类划分', '边界值分析', '正交试验设计', '语句覆盖'],
      answer: 3,
      explanation: '白盒测试（结构测试）关注程序内部逻辑：语句覆盖、判定覆盖、条件覆盖、判定/条件覆盖、条件组合覆盖、路径覆盖、基本路径测试。其余三项均为黑盒方法。',
      tags: ['概念']
    },
    {
      id: 'SE-015', module: 'software-engineering', topic: '软件测试', difficulty: 2, points: ['software-engineering|软件测试'],
      stem: '下列覆盖准则中，覆盖强度最高的是（ ）。',
      options: ['路径覆盖', '条件组合覆盖', '判定/条件覆盖', '语句覆盖'],
      answer: 0,
      explanation: '由弱到强：语句 < 判定 < 条件 < 判定/条件 < 条件组合 < 路径覆盖。路径覆盖要求执行程序中所有可能的路径，强度最高但用例数可能爆炸。',
      tags: ['记忆', '必背']
    },
    {
      id: 'SE-016', module: 'software-engineering', topic: '软件测试', difficulty: 2, points: ['software-engineering|软件测试'],
      stem: '进行单元测试时，为模拟被测试模块所调用的下层模块而编写的辅助模块称为（ ）。',
      options: ['测试桩件', '桩模块', '驱动模块', '测试用例'],
      answer: 1,
      explanation: '驱动模块（driver）模拟上层调用者，桩模块（stub）模拟被调用的下层模块。单元测试需要二者配合才能独立运行被测模块。',
      tags: ['概念', '易错']
    },
    {
      id: 'SE-017', module: 'software-engineering', topic: '软件测试', difficulty: 2, points: ['software-engineering|软件测试'],
      stem: '采用自顶向下增量式集成测试时，需要编写的辅助模块是（ ）。',
      options: ['接口模块', '数据模块', '桩模块', '驱动模块'],
      answer: 2,
      explanation: '自顶向下从主控模块开始，下层模块尚未编写，需用桩模块模拟；自底向上则需驱动模块模拟上层调用。三明治集成两者都用。',
      tags: ['概念']
    },
    {
      id: 'SE-018', module: 'software-engineering', topic: '软件测试', difficulty: 1, points: ['software-engineering|软件测试'],
      stem: '修改软件后重新运行原有测试用例，以确认修改未引入新缺陷，这种测试称为（ ）。',
      options: ['冒烟测试', '验收测试', '负载测试', '回归测试'],
      answer: 3,
      explanation: '回归测试针对修改后的软件重跑既有用例，防止"改一处坏一片"。冒烟测试是快速验证基本功能是否可用，属于构建后的准入检查。',
      tags: ['概念']
    },
    {
      id: 'SE-019', module: 'software-engineering', topic: '软件维护', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '在软件维护的四种类型中，工作量占比通常最大的是（ ）。',
      options: ['改善性（完善性）维护', '改正性维护', '适应性维护', '预防性维护'],
      answer: 0,
      explanation: '改善性维护（新增功能、优化性能）通常占维护工作量的一半以上；改正性维护修缺陷，适应性维护应对环境变化，预防性维护提高可维护性。',
      tags: ['记忆', '易错']
    },
    {
      id: 'SE-020', module: 'software-engineering', topic: '项目管理', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '关于关键路径，下列说法正确的是（ ）。',
      options: ['关键路径上的活动资源占用最少', '关键路径是耗时最长的路径，其上的活动总时差为 0', '关键路径是耗时最短的路径，其上的活动可以延迟', '关键路径只有一条，且一定经过全部活动'],
      answer: 1,
      explanation: '关键路径是网络图中最长的路径，决定项目最短工期；其上活动总时差为 0，任何延误都会推迟整个项目。关键路径可能不止一条。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-021', module: 'software-engineering', topic: '项目管理', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '与 PERT 图相比，Gantt 图的主要缺点是（ ）。',
      options: ['不能表示任务的持续时间', '不能用于进度控制', '不能清晰表达任务之间的依赖关系', '不能表示任务的起止时间'],
      answer: 2,
      explanation: 'Gantt 图以横道表示任务时间，直观易读，但难以表达任务间的依赖与关键路径；PERT 网络图能表达依赖关系并计算关键路径。',
      tags: ['概念']
    },
    {
      id: 'SE-022', module: 'software-engineering', topic: '过程改进', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: 'CMMI 模型中，"已定义级"是第（ ）级，其标志是（ ）。',
      options: ['2 级，项目已建立基本管理过程', '4 级，过程已量化管理', '5 级，持续过程优化', '3 级，组织已建立标准过程并据此裁剪项目过程'],
      answer: 3,
      explanation: 'CMMI 五级：1 初始级、2 已管理级（项目级管理）、3 已定义级（组织标准过程）、4 量化管理级、5 优化级。注意 2 级是"已管理"，3 级才是"已定义"。',
      tags: ['记忆', '易错']
    },
    {
      id: 'SE-023', module: 'software-engineering', topic: '软件质量', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '下列不属于软件可维护性子特性的是（ ）。',
      options: ['易用性', '可理解性', '可测试性', '可修改性'],
      answer: 0,
      explanation: '可维护性包含易分析性、易改变性（可修改性）、稳定性、易测试性，以及可理解性。易用性属于"易用性（可用性）"质量特性，与可维护性并列。',
      tags: ['记忆']
    },
    {
      id: 'SE-024', module: 'software-engineering', topic: '项目管理', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: 'COCOMO 模型主要用于（ ）。',
      options: ['软件过程能力评估', '软件成本（工作量）估算', '软件可靠性预测', '软件复杂度度量'],
      answer: 1,
      explanation: 'COCOMO（构造性成本模型）依据代码行数（KLOC）与成本驱动因子估算工作量和进度，分基本、中间、详细三个层次。复杂度度量常用 McCabe，过程能力用 CMMI。',
      tags: ['概念']
    },
    {
      id: 'SE-025', module: 'software-engineering', topic: '开发模型', difficulty: 1, points: ['software-engineering|开发模型'],
      stem: '把软件划分为若干增量、按优先级分批开发并分批交付可用版本的开发模型是（ ）。',
      options: ['V 模型', '净室模型', '增量模型', '瀑布模型'],
      answer: 2,
      explanation: '增量模型每次交付一个可运行的部分功能，用户能较早获得可用软件并逐步反馈，降低一次性交付的风险；瀑布模型要求一次交付完整系统；V 模型强调开发与测试的对应关系。',
      tags: ['概念']
    },
    {
      id: 'SE-026', module: 'software-engineering', topic: '开发模型', difficulty: 1, points: ['software-engineering|开发模型'],
      stem: '当用户需求模糊、难以一次说清楚时，最适合先采用（ ）。',
      options: ['瀑布模型', 'V 模型', '净室模型', '原型模型'],
      answer: 3,
      explanation: '原型模型先快速构建一个可运行的简化版本交给用户试用，通过反馈逐步澄清需求，再据此开发正式系统。瀑布与 V 模型都要求需求在早期基本确定。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-027', module: 'software-engineering', topic: '开发模型', difficulty: 2, points: ['software-engineering|开发模型'],
      stem: '喷泉模型最突出的特点是（ ）。',
      options: ['面向对象开发，各阶段相互迭代、无缝衔接', '阶段严格串行、以文档驱动', '以风险分析为核心', '开发与测试一一对应'],
      answer: 0,
      explanation: '喷泉模型面向对象，具有迭代性与无间隙性，各阶段可以反复交替进行，不像瀑布那样有明确的阶段边界。以风险分析为核心是螺旋模型，开发与测试对应是 V 模型。',
      tags: ['概念']
    },
    {
      id: 'SE-028', module: 'software-engineering', topic: '敏捷开发', difficulty: 2, points: ['software-engineering|开发模型'],
      stem: '下列做法属于极限编程（XP）核心实践的是（ ）。',
      options: ['按季度一次性交付全部功能', '结对编程与测试驱动开发', '在项目初期完成全部详细设计文档', '只在项目末期集中进行测试'],
      answer: 1,
      explanation: 'XP 的典型实践包括结对编程、测试驱动开发（TDD）、持续集成、小版本发布、简单设计、重构与现场客户。它反对重文档与前期大设计，强调短周期反馈。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-029', module: 'software-engineering', topic: '敏捷开发', difficulty: 2, points: ['software-engineering|开发模型'],
      stem: '敏捷宣言强调的价值观是（ ）。',
      options: ['详尽的文档高于可工作的软件', '严格的合同谈判高于客户合作', '个体与交互高于流程与工具', '流程与工具高于个体与交互'],
      answer: 2,
      explanation: '敏捷宣言四条：个体与交互高于流程与工具；可工作的软件高于详尽的文档；客户合作高于合同谈判；响应变化高于遵循计划。注意其表述是"右项也有价值，但更看重左项"。',
      tags: ['记忆']
    },
    {
      id: 'SE-030', module: 'software-engineering', topic: '开发模型', difficulty: 2, points: ['software-engineering|开发模型'],
      stem: '螺旋模型的每一轮迭代都包含的四个活动是（ ）。',
      options: ['需求、设计、编码、测试', '初始、细化、构建、交付', '计划、执行、检查、改进', '制定计划、风险分析、实施工程、客户评估'],
      answer: 3,
      explanation: '螺旋模型沿螺旋线每转一圈都经历"制定计划 → 风险分析 → 实施工程 → 客户评估"，其中风险分析是区别于其他模型的核心环节，适合大型高风险项目。RUP 的四阶段是初始、细化、构建、交付，与本模型无关。',
      tags: ['记忆']
    },
    {
      id: 'SE-031', module: 'software-engineering', topic: '需求工程', difficulty: 1, points: ['software-engineering|需求工程'],
      stem: '下列需求中，属于非功能需求的是（ ）。',
      options: ['系统在 95% 请求下的响应时间不超过 2 秒', '系统应支持按订单号查询物流状态', '系统应允许管理员新增用户', '系统应能导出月度销售报表'],
      answer: 0,
      explanation: '非功能需求描述系统的质量约束与设计约束，如性能、可靠性、安全性、可用性、可移植性；功能需求描述系统"做什么"。其余三项都是具体的功能行为。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-032', module: 'software-engineering', topic: '需求工程', difficulty: 2, points: ['software-engineering|需求工程'],
      stem: '分层数据流图中，父图与子图必须保持（ ）。',
      options: ['外部实体完全一致', '输入输出数据流一致（平衡）', '加工个数相同', '数据存储个数相同'],
      answer: 1,
      explanation: 'DFD 分层要求"平衡"：子图的输入输出数据流必须与父图中对应加工的输入输出一致，否则说明分解时遗漏或凭空增加了数据流。加工、存储可以进一步细化，数量不必相同。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-033', module: 'software-engineering', topic: '需求工程', difficulty: 2, points: ['software-engineering|需求工程'],
      stem: '联合应用开发（JAD）主要用于（ ）。',
      options: ['度量软件的环形复杂度', '估算项目的代码行数', '把用户、管理者与开发人员集中起来研讨，快速获取需求', '自动生成程序代码'],
      answer: 2,
      explanation: 'JAD 通过结构化会议把利益相关方集中在一起，借助白板、原型等工具当场澄清分歧，缩短需求获取周期。它属于需求获取方法，与访谈、问卷、观察、原型并列。',
      tags: ['概念']
    },
    {
      id: 'SE-034', module: 'software-engineering', topic: '需求工程', difficulty: 2, points: ['software-engineering|需求工程'],
      stem: '需求变更申请通常应提交给（ ）审查并决定是否批准。',
      options: ['开发组内的程序员', '最终用户个人', '质量检验部门', '变更控制委员会（CCB）'],
      answer: 3,
      explanation: '变更控制委员会由用户代表、开发方与配置管理人员组成，负责评估变更的影响、成本与风险并作出批准或拒绝的决定。任何变更都需走"申请 → 评估 → 审批 → 实施 → 验证"流程。',
      tags: ['概念']
    },
    {
      id: 'SE-035', module: 'software-engineering', topic: '需求工程', difficulty: 2, points: ['software-engineering|需求工程'],
      stem: '需求跟踪矩阵的主要作用是（ ）。',
      options: ['建立需求与设计、代码、测试用例之间的可追溯关系', '记录项目成员的每日工时', '统计程序的代码行数', '存放需求文档的电子副本'],
      answer: 0,
      explanation: '需求跟踪分正向跟踪（需求 → 设计/代码/测试）与逆向跟踪（下游产物 → 需求来源）。矩阵用于确认每条需求都被实现并被测试覆盖，变更时也能快速定位受影响的工作产品。',
      tags: ['概念']
    },
    {
      id: 'SE-036', module: 'software-engineering', topic: '需求工程', difficulty: 1, points: ['software-engineering|需求工程'],
      stem: '结构化分析方法的核心模型是（ ）。',
      options: ['判定表 + 判定树', '数据流图 + 数据字典', '类图 + 顺序图', '状态图 + 活动图'],
      answer: 1,
      explanation: '结构化分析（SA）以数据流图描述系统的功能与数据流动，用数据字典精确定义数据流、数据项与数据存储，必要时辅以判定表/判定树描述加工逻辑。类图与顺序图属于面向对象分析。',
      tags: ['概念']
    },
    {
      id: 'SE-037', module: 'software-engineering', topic: '耦合', difficulty: 2, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '两个模块之间传递整个记录（数据结构）而不是单个数据项，这种耦合属于（ ）。',
      options: ['控制耦合', '内容耦合', '标记耦合', '数据耦合'],
      answer: 2,
      explanation: '数据耦合只传简单数据值，耦合度最低；标记耦合传递的是数据结构（记录、数组、对象），双方需约定结构，耦合度更高。设计时应尽量把标记耦合降为数据耦合。',
      tags: ['概念', '易错']
    },
    {
      id: 'SE-038', module: 'software-engineering', topic: '耦合', difficulty: 2, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '一个模块向另一个模块传递"处理标志位"，由后者据此选择不同处理逻辑，这种耦合属于（ ）。',
      options: ['数据耦合', '公共耦合', '非直接耦合', '控制耦合'],
      answer: 3,
      explanation: '控制耦合传递的是控制信息（标志、开关、命令），被调模块的执行路径受调用者支配，耦合度高于标记耦合。可将两个分支拆成两个独立模块来消除控制耦合。',
      tags: ['概念', '易错']
    },
    {
      id: 'SE-039', module: 'software-engineering', topic: '内聚', difficulty: 2, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '把系统初始化所需的各项操作集中放在同一个模块中，这种内聚属于（ ）。',
      options: ['时间内聚', '功能内聚', '顺序内聚', '逻辑内聚'],
      answer: 0,
      explanation: '时间内聚指模块内的处理元素必须在同一时间段内执行（如初始化、收尾），内聚度较低；顺序内聚要求前一部分的输出是后一部分的输入；功能内聚只完成单一功能，内聚度最高。',
      tags: ['概念']
    },
    {
      id: 'SE-040', module: 'software-engineering', topic: '模块化', difficulty: 2, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '软件结构的"深度"与"宽度"分别指（ ）。',
      options: ['模块的扇出与扇入', '控制层次的最大层数与同一层中模块数的最大值', '模块的调用数与被调用数', '模块内语句的行数与分支数'],
      answer: 1,
      explanation: '深度表示控制层次（调用层级）的最大层数，反映系统的复杂程度；宽度表示同一层中模块数的最大值，反映系统的规模。顶层扇出宜小、中间层扇出宜 3~4、底层扇入宜大。',
      tags: ['概念']
    },
    {
      id: 'SE-041', module: 'software-engineering', topic: '详细设计', difficulty: 2, points: ['software-engineering|详细设计与复杂度'],
      stem: '关于 N-S 图（盒图），下列说法正确的是（ ）。',
      options: ['只能描述数据流，不能描述控制结构', '主要用于数据库的概念设计', '取消了流程线的随意跳转，只能用顺序、选择、循环三种结构组合', '用带箭头的流程线表示控制流向，与流程图完全等价'],
      answer: 2,
      explanation: 'N-S 图用嵌套的矩形框表示程序结构，不画流程箭头，因此天然排除 GOTO 造成的随意跳转，强制使用结构化控制结构，功能域明确、便于转换为代码。',
      tags: ['概念']
    },
    {
      id: 'SE-042', module: 'software-engineering', topic: '详细设计', difficulty: 2, points: ['software-engineering|详细设计与复杂度'],
      stem: 'PAD 图（问题分析图）的主要特点是（ ）。',
      options: ['用椭圆表示加工、用箭头表示数据流', '用横道表示任务的起止时间', '用菱形表示实体之间的联系', '自左向右展开层次，用二维树形结构表示程序逻辑'],
      answer: 3, 
      explanation: 'PAD 图从最左侧开始按层次自左向右展开，用竖线与横线构成二维树形结构，直观表示顺序、选择、循环与过程调用，既可描述程序逻辑也可用于详细设计文档。',
      tags: ['概念']
    },
    {
      id: 'SE-043', module: 'software-engineering', topic: '详细设计', difficulty: 3, points: ['software-engineering|详细设计与复杂度'],
      stem: '某程序流图中有 10 个结点、12 条边，则其 McCabe 环形复杂度为（ ）。',
      options: ['4', '3', '5', '6'],
      answer: 0,
      explanation: 'V(G) = 边数 - 结点数 + 2 = 12 - 10 + 2 = 4，也等于判定结点数 + 1 = 区域数。V(G) 同时表示达到基本路径覆盖所需的最少测试用例数。',
      tags: ['计算', '高频']
    },
    {
      id: 'SE-044', module: 'software-engineering', topic: '详细设计', difficulty: 2, points: ['software-engineering|详细设计与复杂度'],
      stem: '当程序中存在多个条件、不同条件组合需要执行不同动作时，最适合用（ ）来描述处理逻辑。',
      options: ['状态迁移图', '判定表', '数据流图', 'E-R 图'],
      answer: 1,
      explanation: '判定表把条件与动作列成矩阵，能穷举所有条件组合，避免遗漏与冗余；条件较少时可用判定树代替，更直观但易遗漏组合。DFD 描述数据流，ER 图描述数据关系。',
      tags: ['概念']
    },
    {
      id: 'SE-045', module: 'software-engineering', topic: '软件测试', difficulty: 1, points: ['software-engineering|软件测试'],
      stem: '等价类划分法把程序的输入域划分为（ ）。',
      options: ['正常路径与异常路径', '基本块与判定结点', '有效等价类与无效等价类', '上边界与下边界'],
      answer: 2,
      explanation: '有效等价类指符合规格说明的合理输入，无效等价类指不合理或非法的输入。每类中任取一个代表值即可，能大幅减少用例数量，且必须同时覆盖有效与无效等价类。',
      tags: ['概念', '高频']
    },
    {
      id: 'SE-046', module: 'software-engineering', topic: '软件测试', difficulty: 2, points: ['software-engineering|软件测试'],
      stem: '判定覆盖（分支覆盖）要求（ ）。',
      options: ['每个条件的所有可能取值至少各出现一次', '每条语句至少执行一次', '覆盖程序中所有可能的执行路径', '每个判定的"真"与"假"分支至少各执行一次'],
      answer: 3,
      explanation: '语句覆盖只要求每条语句执行一次；判定覆盖要求每个判定取真、取假各至少一次；条件覆盖关注每个条件的取值；路径覆盖要求覆盖所有路径，强度最高。',
      tags: ['概念', '必背']
    },
    {
      id: 'SE-047', module: 'software-engineering', topic: '软件测试', difficulty: 3, points: ['software-engineering|软件测试'],
      stem: '关于条件覆盖与判定覆盖的关系，下列说法正确的是（ ）。',
      options: ['条件覆盖不一定满足判定覆盖', '条件覆盖一定能满足判定覆盖', '两者完全等价', '判定覆盖一定能满足条件覆盖'],
      answer: 0,
      explanation: '条件覆盖只要求每个条件取真、取假各一次，可能两个用例中判定的结果都为真，从而未覆盖"假"分支，故不蕴含判定覆盖。判定/条件覆盖才同时要求两者，条件组合覆盖更强。',
      tags: ['概念', '难点']
    },
    {
      id: 'SE-048', module: 'software-engineering', topic: '软件测试', difficulty: 2, points: ['software-engineering|软件测试'],
      stem: '由用户在真实使用环境中进行、开发者通常不在现场的验收测试称为（ ）。',
      options: ['回归测试', 'β 测试', 'α 测试', '单元测试'],
      answer: 1,
      explanation: 'α 测试在开发场所由用户参与、开发者在场记录问题；β 测试由用户在实际使用环境中独立进行，反馈更真实但问题定位更难。回归测试用于确认修改未引入新缺陷。',
      tags: ['概念']
    },
    {
      id: 'SE-049', module: 'software-engineering', topic: '软件测试', difficulty: 1, points: ['software-engineering|软件测试'],
      stem: '下列属于静态测试的是（ ）。',
      options: ['压力测试', '冒烟测试', '代码审查', '边界值分析'],
      answer: 2,
      explanation: '静态测试不运行程序，通过代码审查、走查、静态分析工具检查代码与文档；其余三项都需要实际执行程序，属于动态测试。',
      tags: ['概念']
    },
    {
      id: 'SE-050', module: 'software-engineering', topic: '软件测试', difficulty: 2, points: ['software-engineering|软件测试'],
      stem: '让系统在超过额定负载的条件下运行，观察其性能退化与恢复能力的测试是（ ）。',
      options: ['功能测试', '兼容性测试', '安装测试', '压力测试'],
      answer: 3,
      explanation: '压力测试（强度测试）把负载加到极限甚至超出设计容量，检验系统的稳定性与失效后的恢复能力；容量测试确定系统可承受的最大负载；两者常结合使用。',
      tags: ['概念']
    },
    {
      id: 'SE-051', module: 'software-engineering', topic: '软件测试', difficulty: 2, points: ['software-engineering|软件测试'],
      stem: '因果图法主要用于（ ）。',
      options: ['处理输入条件之间的组合关系，并据此导出判定表与测试用例', '统计程序中各模块的调用次数', '度量代码的环形复杂度', '评估项目的开发成本'],
      answer: 0,
      explanation: '因果图把"输入条件（因）"与"输出结果（果）"的约束关系画成图，再转换为判定表，从而系统覆盖各种条件组合，避免遗漏。它属于黑盒测试方法。',
      tags: ['概念']
    },
    {
      id: 'SE-052', module: 'software-engineering', topic: '软件维护', difficulty: 1, points: ['software-engineering|维护与项目管理'],
      stem: '为修复软件运行中暴露的错误而进行的维护是（ ）。',
      options: ['预防性维护', '改正性维护', '适应性维护', '改善性维护'],
      answer: 1,
      explanation: '改正性维护修正在使用中发现的缺陷；适应性维护应对运行环境变化；改善性（完善性）维护增加功能或提升性能，占比最大；预防性维护为提高可维护性、预防未来问题。',
      tags: ['概念']
    },
    {
      id: 'SE-053', module: 'software-engineering', topic: '软件维护', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '操作系统由 32 位升级到 64 位后，为让软件在新环境下正常运行而修改代码，属于（ ）。',
      options: ['预防性维护', '改善性维护', '适应性维护', '改正性维护'],
      answer: 2,
      explanation: '外部运行环境（操作系统、硬件、编译器、数据格式）发生变化引起的修改属适应性维护。它与改正性维护的区别在于：前者软件本身没错，只是环境变了。',
      tags: ['概念', '易错']
    },
    {
      id: 'SE-054', module: 'software-engineering', topic: '软件维护', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '为提高软件的可维护性、为将来的改进与调试打基础而进行的维护是（ ）。',
      options: ['改正性维护', '适应性维护', '改善性维护', '预防性维护'],
      answer: 3,
      explanation: '预防性维护面向未来，例如重构、补充注释与文档、把老旧模块改造为可复用的结构，以延缓软件老化、降低后续维护成本。',
      tags: ['概念']
    },
    {
      id: 'SE-055', module: 'software-engineering', topic: '项目管理', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '某活动的最早开始时间为第 5 天，最迟开始时间为第 8 天，持续时间为 3 天，则其总时差为（ ）。',
      options: ['3 天', '5 天', '8 天', '0 天'],
      answer: 0,
      explanation: '总时差 = 最迟开始 - 最早开始 = 8 - 5 = 3 天，也等于最迟完成 - 最早完成。总时差为 0 的活动是关键活动，其延误将直接推迟整个工期。',
      tags: ['计算', '高频']
    },
    {
      id: 'SE-056', module: 'software-engineering', topic: '项目管理', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '通过购买保险把可能的风险损失转由第三方承担，属于风险应对策略中的（ ）。',
      options: ['风险接受', '风险转移', '风险规避', '风险减轻'],
      answer: 1,
      explanation: '风险应对四类：规避（改变方案消除风险源）、转移（保险、外包、担保）、减轻（降低发生概率或影响）、接受（预留应急储备）。购买保险是典型的转移策略。',
      tags: ['概念']
    },
    {
      id: 'SE-057', module: 'software-engineering', topic: '项目管理', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '软件配置管理中的"基线"指（ ）。',
      options: ['开发人员本地的最新版本', '项目的最终交付版本', '已通过评审、作为后续工作基准的配置项集合，其变更必须走变更控制流程', '项目开始时的初始代码'],
      answer: 2,
      explanation: '基线是经过正式评审并被批准的一组配置项，成为后续开发与修改的共同基准。常见基线有功能基线、分配基线、产品基线；基线化后任何修改都必须经变更控制委员会批准。',
      tags: ['概念']
    },
    {
      id: 'SE-058', module: 'software-engineering', topic: '过程改进', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: 'CMMI 模型中处于最高级（第 5 级）的是（ ）。',
      options: ['已定义级', '量化管理级', '已管理级', '优化级'],
      answer: 3,
      explanation: 'CMMI 五级由低到高：1 初始级、2 已管理级、3 已定义级、4 量化管理级、5 优化级。优化级强调基于度量的持续过程改进与缺陷预防。',
      tags: ['记忆']
    },
    {
      id: 'SE-059', module: 'software-engineering', topic: '软件质量', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '下列各项中，不属于 ISO 9126 软件质量特性的是（ ）。',
      options: ['可扩展性', '功能性', '可靠性', '可移植性'],
      answer: 0,
      explanation: 'ISO 9126（GB/T 25000 系列沿用）规定六个质量特性：功能性、可靠性、易用性、效率、可维护性、可移植性。可扩展性不是其中的一级特性，常被归入可维护性或设计原则讨论。',
      tags: ['记忆', '易错']
    },
    {
      id: 'SE-060', module: 'software-engineering', topic: '项目管理', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '在不缩减项目范围的前提下压缩工期，常用的两种方法是（ ）。',
      options: ['降低质量要求与减少人员', '赶工与快速跟进', '削减测试与减少文档', '增加会议与延长评审'],
      answer: 1,
      explanation: '赶工（crashing）通过增加资源、加班来缩短关键活动工期，成本上升；快速跟进（fast tracking）把原本串行的活动改为并行，可能增加返工风险。两者都不能改变范围。',
      tags: ['概念']
    }
    ,
    {
      id: 'SE-085', module: 'software-engineering', topic: '软件过程模型', difficulty: 1, points: ['software-engineering|开发模型'],
      stem: '需求明确稳定、强调阶段串行与文档驱动的开发模型是（ ）。',
      options: ['原型模型', '螺旋模型', '敏捷方法', '瀑布模型'],
      answer: 3,
      explanation: '瀑布模型阶段严格串行、文档驱动，适合需求明确稳定的项目；原型适合需求不清，螺旋以风险分析为核心，敏捷强调迭代与响应变化。',
      tags: ['理解']
    },
    {
      id: 'SE-086', module: 'software-engineering', topic: '增量模型', difficulty: 1, points: ['software-engineering|开发模型'],
      stem: '分批交付可用版本、每个增量都能独立运行与使用的开发模型是（ ）。',
      options: ['增量模型', '瀑布模型', 'V 模型', '喷泉模型'],
      answer: 0,
      explanation: '增量模型把系统拆成多个增量分批交付，每个增量都是可运行的版本；V 模型强调开发与测试一一对应，喷泉模型面向对象、迭代无缝。',
      tags: ['理解']
    },
    {
      id: 'SE-087', module: 'software-engineering', topic: '敏捷方法', difficulty: 1, points: ['software-engineering|开发模型'],
      stem: 'Scrum 中每天举行的短时间同步会议是（ ）。',
      options: ['迭代评审会', '每日站会', '迭代回顾会', '计划会议'],
      answer: 1,
      explanation: 'Scrum 的每日站会（Daily Standup）同步进度与障碍；评审会在迭代末演示成果，回顾会总结过程改进，计划会确定本迭代待办。',
      tags: ['理解']
    },
    {
      id: 'SE-088', module: 'software-engineering', topic: '数据流图', difficulty: 2, points: ['software-engineering|需求工程'],
      stem: '分层 DFD 中父图与子图保持平衡，是指（ ）。',
      options: ['加工数量相同', '数据存储数量相同', '输入输出数据流一致', '外部实体名称一致'],
      answer: 2,
      explanation: '父子图平衡指被分解加工与其子图之间的输入、输出数据流必须一致；子图内部加工数量可以继续分解，不必与父图相同。',
      tags: ['概念', '易错']
    },
    {
      id: 'SE-089', module: 'software-engineering', topic: '模块内聚', difficulty: 2, points: ['software-engineering|结构化设计（耦合与内聚）'],
      stem: '下列内聚类型中，程度最高（最理想）的是（ ）。',
      options: ['偶然内聚', '逻辑内聚', '时间内聚', '功能内聚'],
      answer: 3,
      explanation: '内聚由高到低为功能、顺序、通信、过程、时间、逻辑、偶然。功能内聚指模块只完成单一功能，是设计追求的目标。',
      tags: ['概念']
    },
    {
      id: 'SE-090', module: 'software-engineering', topic: '白盒测试', difficulty: 2, points: ['software-engineering|软件测试'],
      stem: '白盒测试中覆盖强度最弱的覆盖标准是（ ）。',
      options: ['语句覆盖', '判定覆盖', '条件组合覆盖', '路径覆盖'],
      answer: 0,
      explanation: '覆盖强度链：语句 < 判定 < 条件 < 判定/条件 < 条件组合 < 路径。语句覆盖只要求每条语句至少执行一次，最弱。',
      tags: ['概念']
    },
    {
      id: 'SE-091', module: 'software-engineering', topic: '软件风险', difficulty: 2, points: ['software-engineering|维护与项目管理'],
      stem: '风险管理流程的正确顺序是（ ）。',
      options: ['监控→识别→应对→预测', '识别→预测→应对→监控', '应对→识别→预测→监控', '预测→监控→识别→应对'],
      answer: 1,
      explanation: '风险管理依次为风险识别、风险预测（概率与影响）、风险应对（规避/转移/减轻/接受）、风险监控，属于项目管理高频记忆点。',
      tags: ['概念']
    },
    {
      id: 'SE-092', module: 'software-engineering', topic: '沟通路径', difficulty: 3, points: ['software-engineering|维护与项目管理'],
      stem: '5 人项目团队若两两之间均可沟通，沟通路径共有（ ）。',
      options: ['5 条', '15 条', '10 条', '20 条'],
      answer: 2,
      explanation: '沟通路径数 = n(n−1)/2，n=5 时为 10 条。人数增加会使沟通成本非线性上升，这是项目沟通与组织结构的常考计算。',
      tags: ['计算']
    }
  ]);
})(window.RK);
