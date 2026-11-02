/* 数据结构与算法 —— 18 题 */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'DS-001', module: 'ds-algorithm', topic: '二叉树性质', difficulty: 1,
      stem: '某二叉树中有 10 个度为 2 的结点，则该二叉树的叶子结点数为（ ）。',
      options: ['11', '10', '9', '无法确定'],
      answer: 0,
      explanation: '二叉树性质：n0 = n2 + 1。度为 2 的结点有 10 个，则叶子结点 n0 = 11。该性质与度为 1 的结点数无关，是必考送分题。',
      tags: ['计算', '必背']
    },
    {
      id: 'DS-002', module: 'ds-algorithm', topic: '二叉树性质', difficulty: 2,
      stem: '一棵有 1000 个结点的完全二叉树的高度为（ ）。',
      options: ['10', '9', '11', '12'],
      answer: 0,
      explanation: '完全二叉树高度 h = ⌈log2(n+1)⌉ = ⌈log2(1001)⌉。因 2^9=512 < 1001 ≤ 2^10=1024，故 h = 10。',
      tags: ['计算']
    },
    {
      id: 'DS-003', module: 'ds-algorithm', topic: '二叉树遍历', difficulty: 3,
      stem: '某二叉树先序遍历为 ABDECF，中序遍历为 DBEAFC，则其后序遍历为（ ）。',
      options: ['DEBFCA', 'DEBCFA', 'EDBFCA', 'DBEFCA'],
      answer: 0,
      explanation: '先序首元素 A 为根；中序中 A 左侧 DBE 为左子树、右侧 FC 为右子树。左子树先序 BDE、中序 DBE → 根 B，左 D 右 E；右子树先序 CF、中序 FC → 根 C，左 F。整棵树后序为 D、E、B、F、C、A。',
      tags: ['计算', '高频']
    },
    {
      id: 'DS-004', module: 'ds-algorithm', topic: '哈夫曼树', difficulty: 3,
      stem: '对权值集合 {5, 7, 8, 11, 15, 25} 构造哈夫曼树，其带权路径长度 WPL 为（ ）。',
      options: ['244', '232', '256', '220'],
      answer: 0,
      explanation: '每次合并最小的两个：5+7=12，8+11=19，12+15=27，19+25=44，27+44=71。深度：5、7、8、11 为 4 层，15、25 为 3 层。WPL = (5+7+8+11)×4 + (15+25)×3 = 124 + 120 = 244。',
      tags: ['计算', '难点']
    },
    {
      id: 'DS-005', module: 'ds-algorithm', topic: '二叉排序树', difficulty: 1,
      stem: '对二叉排序树进行（ ）遍历，可以得到按关键字递增排列的序列。',
      options: ['中序', '先序', '后序', '层序'],
      answer: 0,
      explanation: '二叉排序树满足左子树 < 根 < 右子树，中序遍历（左-根-右）恰好得到递增有序序列。这是判断二叉排序树是否合法的常用方法。',
      tags: ['概念', '高频']
    },
    {
      id: 'DS-006', module: 'ds-algorithm', topic: '图', difficulty: 2,
      stem: '用邻接矩阵存储无向图，矩阵第 i 行中非零元素的个数等于（ ）。',
      options: ['顶点 i 的度', '顶点 i 的入度', '图的边数', '顶点 i 的出度'],
      answer: 0,
      explanation: '无向图邻接矩阵对称，第 i 行非零元素个数即与顶点 i 相邻的顶点数，也就是顶点 i 的度。有向图中第 i 行非零个数为出度，第 i 列为入度。',
      tags: ['概念']
    },
    {
      id: 'DS-007', module: 'ds-algorithm', topic: '最小生成树', difficulty: 2,
      stem: '对于边稠密的图，求最小生成树更适合采用（ ）。',
      options: ['Prim 算法', 'Kruskal 算法', 'Floyd 算法', 'Dijkstra 算法'],
      answer: 0,
      explanation: 'Prim 时间复杂度 O(n²)，与边数无关，适合稠密图；Kruskal 为 O(e log e)，适合稀疏图。Floyd 求全源最短路径，Dijkstra 求单源最短路径。',
      tags: ['概念', '高频']
    },
    {
      id: 'DS-008', module: 'ds-algorithm', topic: '最短路径', difficulty: 2,
      stem: 'Dijkstra 算法不能正确处理含有（ ）的图。',
      options: ['负权边', '环', '多条边', '孤立顶点'],
      answer: 0,
      explanation: 'Dijkstra 采用贪心策略，一旦确定某顶点最短距离便不再更新；若存在负权边，后续可能出现更短路径，导致结果错误。含负权边应使用 Bellman-Ford 或 SPFA。',
      tags: ['概念', '易错']
    },
    {
      id: 'DS-009', module: 'ds-algorithm', topic: '拓扑排序', difficulty: 2,
      stem: '对有向图进行拓扑排序，若排序过程结束后仍有顶点未输出，说明该图（ ）。',
      options: ['存在环', '是连通图', '是稀疏图', '存在孤立顶点'],
      answer: 0,
      explanation: '拓扑排序每次取入度为 0 的顶点并删除其出边。若最终仍有顶点剩余，说明这些顶点互相依赖形成环，即该 AOV 网不可拓扑排序，工程上表示存在循环依赖。',
      tags: ['概念']
    },
    {
      id: 'DS-010', module: 'ds-algorithm', topic: '关键路径', difficulty: 2,
      stem: '在 AOE 网中，完成整个工程的最短时间取决于（ ）。',
      options: ['关键路径的长度', '最短路径的长度', '顶点数最多的路径', '边数最多的路径'],
      answer: 0,
      explanation: 'AOE 网中关键路径是从源点到汇点的最长路径，其长度即工程最短工期。关键路径上的活动时间余量为 0，任何延误都会直接推迟工期。',
      tags: ['概念', '高频']
    },
    {
      id: 'DS-011', module: 'ds-algorithm', topic: '查找', difficulty: 2,
      stem: '对长度为 1000 的有序表进行二分查找，最多需要比较（ ）次。',
      options: ['10', '9', '11', '500'],
      answer: 0,
      explanation: '二分查找的最大比较次数为 ⌈log2(n+1)⌉ = ⌈log2(1001)⌉ = 10。等价于判定树的高度。',
      tags: ['计算']
    },
    {
      id: 'DS-012', module: 'ds-algorithm', topic: '散列表', difficulty: 2,
      stem: '散列表的装填因子 α 定义为（ ），α 越大则（ ）。',
      options: ['表中记录数 / 散列表长度，冲突可能性越大', '散列表长度 / 表中记录数，冲突可能性越大', '表中记录数 / 散列表长度，查找效率越高', '已用空间 / 总空间，查找效率越高'],
      answer: 0,
      explanation: 'α = n/m，n 为已存记录数、m 为表长。α 越大表越拥挤，冲突概率上升，平均查找长度增大。开放定址法一般要求 α ≤ 0.75。',
      tags: ['概念']
    },
    {
      id: 'DS-013', module: 'ds-algorithm', topic: '排序', difficulty: 1,
      stem: '下列排序算法中，属于稳定排序的是（ ）。',
      options: ['归并排序', '快速排序', '堆排序', '希尔排序'],
      answer: 0,
      explanation: '稳定排序：插入、冒泡、归并、基数。不稳定排序：选择、希尔、快速、堆。稳定性指关键字相同的记录排序前后相对次序不变。',
      tags: ['记忆', '必背']
    },
    {
      id: 'DS-014', module: 'ds-algorithm', topic: '排序', difficulty: 2,
      stem: '快速排序在最坏情况下的时间复杂度为（ ），此时待排序列通常（ ）。',
      options: ['O(n²)，基本有序', 'O(n log n)，基本有序', 'O(n²)，完全随机', 'O(n log n)，完全逆序'],
      answer: 0,
      explanation: '快排以首元素为枢轴时，若序列基本有序，每次划分极不均衡，递归深度达 n，退化为 O(n²)。平均与最好情况为 O(n log n)。随机化取枢轴可缓解。',
      tags: ['概念', '易错']
    },
    {
      id: 'DS-015', module: 'ds-algorithm', topic: '排序', difficulty: 2,
      stem: '对 n 个元素进行堆排序，初始建堆的时间复杂度为（ ）。',
      options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n²)'],
      answer: 0,
      explanation: '自底向上建堆的总代价为 O(n)（等比级数求和），之后每次调整 O(log n)，共 n-1 次，故堆排序整体为 O(n log n)。建堆本身是 O(n)。',
      tags: ['概念']
    },
    {
      id: 'DS-016', module: 'ds-algorithm', topic: '队列', difficulty: 2,
      stem: '循环队列容量为 m（数组下标 0~m-1），front 指向队头元素、rear 指向队尾元素的下一个位置，则队列中元素个数为（ ）。',
      options: ['(rear - front + m) % m', '(front - rear + m) % m', 'rear - front', 'rear - front + 1'],
      answer: 0,
      explanation: '循环队列中 rear 可能小于 front，需加 m 再取模。队空条件 front == rear，队满条件 (rear+1)%m == front（牺牲一个存储单元）。',
      tags: ['计算', '高频']
    },
    {
      id: 'DS-017', module: 'ds-algorithm', topic: '串', difficulty: 2,
      stem: 'KMP 算法相比朴素的 BF 模式匹配算法，其主要改进是（ ）。',
      options: ['利用已匹配信息避免主串指针回溯，时间复杂度 O(n+m)', '通过哈希把复杂度降到 O(1)', '要求主串必须有序', '把模式串排序后再匹配'],
      answer: 0,
      explanation: 'KMP 通过 next（部分匹配）数组记录模式串自身的最长公共前后缀，失配时只移动模式串、主串指针不回退，时间复杂度 O(n+m)；BF 为 O(n×m)。',
      tags: ['概念']
    },
    {
      id: 'DS-018', module: 'ds-algorithm', topic: '复杂度', difficulty: 1,
      stem: '下列时间复杂度按从低到高排列正确的是（ ）。',
      options: ['O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)', 'O(1) < O(n) < O(log n) < O(n²) < O(n log n) < O(2ⁿ)', 'O(log n) < O(1) < O(n) < O(n²) < O(n log n) < O(n!)', 'O(1) < O(log n) < O(n log n) < O(n) < O(n²) < O(2ⁿ)'],
      answer: 0,
      explanation: '常见复杂度递增顺序：O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)。判断算法是否可行通常以 O(n log n) 或 O(n²) 为界。',
      tags: ['记忆', '必背']
    }
  ]);
})(window.RK);
