/* 新技术应用 —— 12 题（上午 2 题权重，覆盖云计算/大数据/AI/物联网/区块链/5G） */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'TECH-001', module: 'tech', topic: '云计算', difficulty: 1,
      stem: '某公司直接通过浏览器使用在线文档与邮件服务，无需采购服务器、也无需管理运行环境。这种服务模式属于（ ）。',
      options: ['DaaS（桌面即服务）', 'SaaS（软件即服务）', 'PaaS（平台即服务）', 'IaaS（基础设施即服务）'],
      answer: 1,
      explanation: 'SaaS 直接交付可用的软件，用户只使用功能，不接触服务器与平台；PaaS 提供开发运行环境与中间件，用户部署自己的应用；IaaS 提供虚拟机、存储、网络等基础设施，用户自行安装操作系统与应用。',
      tags: ['概念', '必背']
    },
    {
      id: 'TECH-002', module: 'tech', topic: '云计算', difficulty: 2,
      stem: '下列各项中，不属于云计算基本特征的是（ ）。',
      options: ['资源池化与多租户共享', '服务可计量（按使用量计费）', '数据在任意时刻保持强一致', '按需自服务与快速弹性'],
      answer: 2,
      explanation: '云计算五个基本特征为按需自服务、广泛网络接入、资源池化、快速弹性、服务可计量。强一致性是分布式数据管理的设计取舍，并非云计算的必备特征，许多云服务默认提供最终一致性。',
      tags: ['概念', '易错']
    },
    {
      id: 'TECH-003', module: 'tech', topic: '云计算', difficulty: 2,
      stem: '与虚拟机相比，容器技术的主要特点是（ ）。',
      options: ['每个容器都包含完整的客户操作系统', '隔离性强于虚拟机，安全边界更硬', '只能运行在物理机上，不能在云环境使用', '共享宿主机内核，启动快、资源开销小'],
      answer: 3,
      explanation: '容器共享宿主机内核，只打包应用及其依赖，因此启动秒级、开销小、密度高；虚拟机通过 Hypervisor 虚拟硬件并运行完整 Guest OS，隔离性更强但更重。容器的隔离性弱于虚拟机，这是其安全短板。',
      tags: ['概念', '高频']
    },
    {
      id: 'TECH-004', module: 'tech', topic: '大数据', difficulty: 1,
      stem: '大数据"4V"特征中，"Value"（价值）一项的准确含义是（ ）。',
      options: ['单位数据的价值密度低，需要从海量数据中挖掘', '数据完全没有价值', '数据处理速度要求低', '数据总量巨大'],
      answer: 0,
      explanation: '4V 为 Volume（体量大）、Velocity（速度快）、Variety（多样）、Value（价值密度低）。价值密度低指单条数据价值有限，必须依靠大规模汇聚与分析才能提炼价值，并非"没有价值"。',
      tags: ['概念', '易错']
    },
    {
      id: 'TECH-005', module: 'tech', topic: '大数据', difficulty: 2,
      stem: 'Hadoop 的 HDFS 中，负责维护文件系统命名空间、记录数据块位置等元数据的是（ ）。',
      options: ['NodeManager', 'NameNode', 'DataNode', 'ResourceManager'],
      answer: 1,
      explanation: 'HDFS 采用主从结构：NameNode 管理命名空间与块映射等元数据，DataNode 实际存储数据块并定期发送心跳与块报告；ResourceManager 与 NodeManager 属于 YARN 的资源调度组件。',
      tags: ['概念', '记忆']
    },
    {
      id: 'TECH-006', module: 'tech', topic: '大数据', difficulty: 2,
      stem: '某系统需要对持续到达的传感器数据在毫秒级完成统计与告警，最适合采用（ ）。',
      options: ['HDFS 离线存储', 'Hive 批量查询', 'Flink 等流处理框架', 'MapReduce 批处理'],
      answer: 2,
      explanation: '流处理面向无界、持续到达的数据，按事件逐条或微批计算，延迟低，适合实时监控与告警；MapReduce、Hive 属于批处理，需先落地存储再整批计算，延迟高。',
      tags: ['概念', '高频']
    },
    {
      id: 'TECH-007', module: 'tech', topic: '人工智能', difficulty: 1,
      stem: '在没有人工标注标签的情况下，把样本按相似性自动划分为若干组，这种学习方式属于（ ）。',
      options: ['监督学习', '强化学习', '半监督学习', '无监督学习'],
      answer: 3,
      explanation: '无监督学习不使用标签，典型任务是聚类（如 K-means）与降维（如 PCA）；监督学习依赖带标签样本做分类或回归；强化学习通过环境奖励试错；半监督学习同时使用少量标签与大量无标签数据。',
      tags: ['概念', '必背']
    },
    {
      id: 'TECH-008', module: 'tech', topic: '人工智能', difficulty: 2,
      stem: '利用卷积核提取局部特征、在图像分类与目标检测中最为经典的深度学习模型是（ ）。',
      options: ['卷积神经网络 CNN', '长短期记忆网络 LSTM', '主成分分析 PCA', 'K 近邻 KNN'],
      answer: 0,
      explanation: 'CNN 通过卷积与池化提取图像的局部纹理、边缘与层级特征，是图像任务的主流结构；LSTM 处理序列数据，PCA 是降维方法，KNN 是传统分类算法且不进行特征学习。',
      tags: ['概念', '高频']
    },
    {
      id: 'TECH-009', module: 'tech', topic: '物联网', difficulty: 1,
      stem: '在物联网三层架构中，温度传感器、RFID 标签、摄像头等设备属于（ ）。',
      options: ['平台层', '感知层', '网络层', '应用层'],
      answer: 1,
      explanation: '感知层负责数据采集与识别，包括传感器、RFID、二维码、摄像头等；网络层负责传输（NB-IoT、LoRa、5G 等）；应用层面向具体业务；平台层是四层架构中承上启下的设备与数据管理平台。',
      tags: ['概念', '必背']
    },
    {
      id: 'TECH-010', module: 'tech', topic: '区块链', difficulty: 3,
      stem: '联盟链中节点数量有限且要求拜占庭容错，兼顾吞吐量与确定性的共识机制是（ ）。',
      options: ['PoS（权益证明）', 'FCFS（先来先服务）', 'PBFT（实用拜占庭容错）', 'PoW（工作量证明）'],
      answer: 2,
      explanation: 'PBFT 通过多轮投票在已知节点集合内达成共识，无需挖矿、交易确认有确定性，适合节点受控的联盟链；PoW/PoS 面向开放公有链，PoW 能耗高、确认概率性；FCFS 是调度算法，不是共识机制。',
      tags: ['概念', '难点']
    },
    {
      id: 'TECH-011', module: 'tech', topic: '5G', difficulty: 2,
      stem: '5G 的三大应用场景中，面向远程手术、车联网等低时延高可靠业务的是（ ）。',
      options: ['eMBB', 'mMTC', 'NB-IoT', 'uRLLC'],
      answer: 3,
      explanation: '5G 三大场景：eMBB 增强移动宽带（高速率，如 4K/8K 视频）、mMTC 海量机器类通信（高连接密度，如传感器）、uRLLC 低时延高可靠（如工业控制、远程医疗、车联网）。NB-IoT 是窄带物联网技术，不属于 5G 三大场景。',
      tags: ['概念', '高频']
    },
    {
      id: 'TECH-012', module: 'tech', topic: '边缘计算', difficulty: 2,
      stem: '边缘计算的主要价值在于（ ）。',
      options: ['把计算与存储下沉到靠近数据源一侧，降低时延与回传带宽', '完全替代云计算中心', '提升单个 CPU 的主频', '把所有数据集中到云端长期保存'],
      answer: 0,
      explanation: '边缘计算在数据产生侧就近处理，减少网络往返时延与回传流量，适合工业控制、视频分析等实时场景；它与云计算是协同关系（云边协同），而非替代关系。',
      tags: ['概念', '易错']
    }
  ]);
})(window.RK);
