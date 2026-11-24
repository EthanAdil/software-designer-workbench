/* 数据结构与算法 —— 40 题 */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'DS-001', module: 'ds-algorithm', topic: '二叉树性质', difficulty: 1, points: ['ds-algorithm|树与二叉树'],
      stem: '某二叉树中有 10 个度为 2 的结点，则该二叉树的叶子结点数为（ ）。',
      options: ['无法确定', '11', '10', '9'],
      answer: 1,
      explanation: '二叉树性质：n0 = n2 + 1。度为 2 的结点有 10 个，则叶子结点 n0 = 11。该性质与度为 1 的结点数无关，是必考送分题。',
      tags: ['计算', '必背']
    },
    {
      id: 'DS-002', module: 'ds-algorithm', topic: '二叉树性质', difficulty: 2, points: ['ds-algorithm|树与二叉树'],
      stem: '一棵有 1000 个结点的完全二叉树的高度为（ ）。',
      options: ['11', '12', '10', '9'],
      answer: 2,
      explanation: '完全二叉树高度 h = ⌈log2(n+1)⌉ = ⌈log2(1001)⌉。因 2^9=512 < 1001 ≤ 2^10=1024，故 h = 10。',
      tags: ['计算']
    },
    {
      id: 'DS-003', module: 'ds-algorithm', topic: '二叉树遍历', difficulty: 3, points: ['ds-algorithm|树与二叉树'],
      stem: '某二叉树先序遍历为 ABDECF，中序遍历为 DBEAFC，则其后序遍历为（ ）。',
      options: ['DEBCFA', 'EDBFCA', 'DBEFCA', 'DEBFCA'],
      answer: 3,
      explanation: '先序首元素 A 为根；中序中 A 左侧 DBE 为左子树、右侧 FC 为右子树。左子树先序 BDE、中序 DBE → 根 B，左 D 右 E；右子树先序 CF、中序 FC → 根 C，左 F。整棵树后序为 D、E、B、F、C、A。',
      tags: ['计算', '高频']
    },
    {
      id: 'DS-004', module: 'ds-algorithm', topic: '哈夫曼树', difficulty: 3, points: ['ds-algorithm|树与二叉树'],
      stem: '对权值集合 {5, 7, 8, 11, 15, 25} 构造哈夫曼树，其带权路径长度 WPL 为（ ）。',
      options: ['173', '160', '183', '244'],
      answer: 0,
      explanation: '每次合并最小的两个：5+7=12，8+11=19，12+15=27，19+25=44，27+44=71。叶子深度：5、7、8、11 为 3，15、25 为 2。WPL = (5+7+8+11)×3 + (15+25)×2 = 93+80 = 173。也可用"全部非叶结点权值之和"验算：12+19+27+44+71=173。',
      tags: ['计算', '难点']
    },
    {
      id: 'DS-005', module: 'ds-algorithm', topic: '二叉排序树', difficulty: 1, points: ['ds-algorithm|树与二叉树'],
      stem: '对二叉排序树进行（ ）遍历，可以得到按关键字递增排列的序列。',
      options: ['层序', '中序', '先序', '后序'],
      answer: 1,
      explanation: '二叉排序树满足左子树 < 根 < 右子树，中序遍历（左-根-右）恰好得到递增有序序列。这是判断二叉排序树是否合法的常用方法。',
      tags: ['概念', '高频']
    },
    {
      id: 'DS-006', module: 'ds-algorithm', topic: '图', difficulty: 2, points: ['ds-algorithm|图'],
      stem: '用邻接矩阵存储无向图，矩阵第 i 行中非零元素的个数等于（ ）。',
      options: ['图的边数', '顶点 i 的出度', '顶点 i 的度', '顶点 i 的入度'],
      answer: 2,
      explanation: '无向图邻接矩阵对称，第 i 行非零元素个数即与顶点 i 相邻的顶点数，也就是顶点 i 的度。有向图中第 i 行非零个数为出度，第 i 列为入度。',
      tags: ['概念']
    },
    {
      id: 'DS-007', module: 'ds-algorithm', topic: '最小生成树', difficulty: 2, points: ['ds-algorithm|图'],
      stem: '对于边稠密的图，求最小生成树更适合采用（ ）。',
      options: ['Kruskal 算法', 'Floyd 算法', 'Dijkstra 算法', 'Prim 算法'],
      answer: 3,
      explanation: 'Prim 时间复杂度 O(n²)，与边数无关，适合稠密图；Kruskal 为 O(e log e)，适合稀疏图。Floyd 求全源最短路径，Dijkstra 求单源最短路径。',
      tags: ['概念', '高频']
    },
    {
      id: 'DS-008', module: 'ds-algorithm', topic: '最短路径', difficulty: 2, points: ['ds-algorithm|图'],
      stem: 'Dijkstra 算法不能正确处理含有（ ）的图。',
      options: ['负权边', '环', '多条边', '孤立顶点'],
      answer: 0,
      explanation: 'Dijkstra 采用贪心策略，一旦确定某顶点最短距离便不再更新；若存在负权边，后续可能出现更短路径，导致结果错误。含负权边应使用 Bellman-Ford 或 SPFA。',
      tags: ['概念', '易错']
    },
    {
      id: 'DS-009', module: 'ds-algorithm', topic: '拓扑排序', difficulty: 2, points: ['ds-algorithm|图'],
      stem: '对有向图进行拓扑排序，若排序过程结束后仍有顶点未输出，说明该图（ ）。',
      options: ['存在孤立顶点', '存在环', '是连通图', '是稀疏图'],
      answer: 1,
      explanation: '拓扑排序每次取入度为 0 的顶点并删除其出边。若最终仍有顶点剩余，说明这些顶点互相依赖形成环，即该 AOV 网不可拓扑排序，工程上表示存在循环依赖。',
      tags: ['概念']
    },
    {
      id: 'DS-010', module: 'ds-algorithm', topic: '关键路径', difficulty: 2, points: ['ds-algorithm|图'],
      stem: '在 AOE 网中，完成整个工程的最短时间取决于（ ）。',
      options: ['顶点数最多的路径', '边数最多的路径', '关键路径的长度', '最短路径的长度'],
      answer: 2,
      explanation: 'AOE 网中关键路径是从源点到汇点的最长路径，其长度即工程最短工期。关键路径上的活动时间余量为 0，任何延误都会直接推迟工期。',
      tags: ['概念', '高频']
    },
    {
      id: 'DS-011', module: 'ds-algorithm', topic: '查找', difficulty: 2, points: ['ds-algorithm|查找'],
      stem: '对长度为 1000 的有序表进行二分查找，最多需要比较（ ）次。',
      options: ['9', '11', '500', '10'],
      answer: 3,
      explanation: '二分查找的最大比较次数为 ⌈log2(n+1)⌉ = ⌈log2(1001)⌉ = 10。等价于判定树的高度。',
      tags: ['计算']
    },
    {
      id: 'DS-012', module: 'ds-algorithm', topic: '散列表', difficulty: 2, points: ['ds-algorithm|查找'],
      stem: '散列表的装填因子 α 定义为（ ），α 越大则（ ）。',
      options: ['表中记录数 / 散列表长度，冲突可能性越大', '散列表长度 / 表中记录数，冲突可能性越大', '表中记录数 / 散列表长度，查找效率越高', '已用空间 / 总空间，查找效率越高'],
      answer: 0,
      explanation: 'α = n/m，n 为已存记录数、m 为表长。α 越大表越拥挤，冲突概率上升，平均查找长度增大。开放定址法一般要求 α ≤ 0.75。',
      tags: ['概念']
    },
    {
      id: 'DS-013', module: 'ds-algorithm', topic: '排序', difficulty: 1, points: ['ds-algorithm|排序'],
      stem: '下列排序算法中，属于稳定排序的是（ ）。',
      options: ['希尔排序', '归并排序', '快速排序', '堆排序'],
      answer: 1,
      explanation: '稳定排序：插入、冒泡、归并、基数。不稳定排序：选择、希尔、快速、堆。稳定性指关键字相同的记录排序前后相对次序不变。',
      tags: ['记忆', '必背']
    },
    {
      id: 'DS-014', module: 'ds-algorithm', topic: '排序', difficulty: 2, points: ['ds-algorithm|排序'],
      stem: '快速排序在最坏情况下的时间复杂度为（ ），此时待排序列通常（ ）。',
      options: ['O(n²)，完全随机', 'O(n log n)，完全逆序', 'O(n²)，基本有序', 'O(n log n)，基本有序'],
      answer: 2,
      explanation: '快排以首元素为枢轴时，若序列基本有序，每次划分极不均衡，递归深度达 n，退化为 O(n²)。平均与最好情况为 O(n log n)。随机化取枢轴可缓解。',
      tags: ['概念', '易错']
    },
    {
      id: 'DS-015', module: 'ds-algorithm', topic: '排序', difficulty: 2, points: ['ds-algorithm|排序'],
      stem: '对 n 个元素进行堆排序，初始建堆的时间复杂度为（ ）。',
      options: ['O(n log n)', 'O(log n)', 'O(n²)', 'O(n)'],
      answer: 3,
      explanation: '自底向上建堆的总代价为 O(n)（等比级数求和），之后每次调整 O(log n)，共 n-1 次，故堆排序整体为 O(n log n)。建堆本身是 O(n)。',
      tags: ['概念']
    },
    {
      id: 'DS-016', module: 'ds-algorithm', topic: '队列', difficulty: 2, points: ['ds-algorithm|线性结构'],
      stem: '循环队列容量为 m（数组下标 0~m-1），front 指向队头元素、rear 指向队尾元素的下一个位置，则队列中元素个数为（ ）。',
      options: ['(rear - front + m) % m', '(front - rear + m) % m', 'rear - front', 'rear - front + 1'],
      answer: 0,
      explanation: '循环队列中 rear 可能小于 front，需加 m 再取模。队空条件 front == rear，队满条件 (rear+1)%m == front（牺牲一个存储单元）。',
      tags: ['计算', '高频']
    },
    {
      id: 'DS-017', module: 'ds-algorithm', topic: '串', difficulty: 2, points: ['ds-algorithm|线性结构'],
      stem: 'KMP 算法相比朴素的 BF 模式匹配算法，其主要改进是（ ）。',
      options: ['把模式串排序后再匹配', '利用已匹配信息避免主串指针回溯，时间复杂度 O(n+m)', '通过哈希把复杂度降到 O(1)', '要求主串必须有序'],
      answer: 1,
      explanation: 'KMP 通过 next（部分匹配）数组记录模式串自身的最长公共前后缀，失配时只移动模式串、主串指针不回退，时间复杂度 O(n+m)；BF 为 O(n×m)。',
      tags: ['概念']
    },
    {
      id: 'DS-018', module: 'ds-algorithm', topic: '复杂度', difficulty: 1, points: ['ds-algorithm|算法设计与复杂度'],
      stem: '下列时间复杂度按从低到高排列正确的是（ ）。',
      options: ['O(log n) < O(1) < O(n) < O(n²) < O(n log n) < O(n!)', 'O(1) < O(log n) < O(n log n) < O(n) < O(n²) < O(2ⁿ)', 'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)', 'O(1) < O(n) < O(log n) < O(n²) < O(n log n) < O(2ⁿ)'],
      answer: 2,
      explanation: '常见复杂度递增顺序：O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)。判断算法是否可行通常以 O(n log n) 或 O(n²) 为界。',
      tags: ['记忆', '必背']
    },
    {
      id: 'DS-019', module: 'ds-algorithm', topic: '栈', difficulty: 1, points: ['ds-algorithm|线性结构'],
      stem: '下列应用场景中，最适合使用栈的是（ ）。',
      options: ['操作系统的作业等待队列', '图的广度优先遍历', '磁盘读写缓冲区', '表达式求值与括号匹配'],
      answer: 3,
      explanation: '栈后进先出，适合处理嵌套与回溯：表达式求值、括号匹配、递归调用、函数调用栈。作业排队与 BFS 需要先进先出，应使用队列；磁盘缓冲区只要求按序流转。',
      tags: ['概念', '必背']
    },
    {
      id: 'DS-020', module: 'ds-algorithm', topic: '线性表', difficulty: 2, points: ['ds-algorithm|线性结构'],
      stem: '在长度为 n 的顺序表第 i 个位置（1 ≤ i ≤ n+1）插入一个元素，平均需要移动的元素个数为（ ）。',
      options: ['n/2', 'n', '(n+1)/2', 'n-1'],
      answer: 0,
      explanation: '插入位置共有 n+1 种，在第 i 个位置插入需移动 n-i+1 个元素，等概率平均为 (1/(n+1))·Σ(n-i+1) = n/2。删除操作平均移动 (n-1)/2 个元素。链表插入本身不需移动元素。',
      tags: ['计算', '高频']
    },
    {
      id: 'DS-021', module: 'ds-algorithm', topic: '队列', difficulty: 1, points: ['ds-algorithm|线性结构'],
      stem: '循环队列容量为 m（牺牲一个单元区分队空与队满），front 指向队头元素、rear 指向队尾元素的下一个位置，则队满的条件是（ ）。',
      options: ['rear == m-1', '(rear+1) % m == front', 'rear == front', '(front+1) % m == rear'],
      answer: 1,
      explanation: '队空条件为 front == rear；为与队空区分，队满时保留一个空闲单元，条件为 (rear+1) % m == front，此时实际最多存放 m-1 个元素。元素个数为 (rear-front+m) % m。',
      tags: ['概念', '易错']
    },
    {
      id: 'DS-022', module: 'ds-algorithm', topic: '二叉树性质', difficulty: 2, points: ['ds-algorithm|树与二叉树'],
      stem: '一棵有 100 个结点的完全二叉树，其叶子结点数为（ ）。',
      options: ['51', '25', '50', '49'],
      answer: 2,
      explanation: '完全二叉树中度为 1 的结点最多 1 个。n 为偶数时不存在度为 1 的结点，n0 = n/2 = 50；n 为奇数时存在 1 个度为 1 的结点，n0 = (n+1)/2。也可由 n0 = n2+1 且 n0+n2 = n 推出。',
      tags: ['计算', '高频']
    },
    {
      id: 'DS-023', module: 'ds-algorithm', topic: '二叉树性质', difficulty: 1, points: ['ds-algorithm|树与二叉树'],
      stem: '高度为 5 的二叉树最多有（ ）个结点。',
      options: ['32', '16', '25', '31'],
      answer: 3,
      explanation: '高度为 h 的二叉树结点数最多为满二叉树情形，即 2^h - 1 = 2^5 - 1 = 31。第 i 层最多 2^(i-1) 个结点，五层相加 1+2+4+8+16 = 31。',
      tags: ['计算']
    },
    {
      id: 'DS-024', module: 'ds-algorithm', topic: '二叉树性质', difficulty: 1, points: ['ds-algorithm|树与二叉树'],
      stem: '对含 n 个结点的完全二叉树从 1 开始按层序编号，则编号为 i 的结点的左孩子编号为（ ）。',
      options: ['2i（当 2i ≤ n 时）', '2i+1（当 2i+1 ≤ n 时）', '⌊i/2⌋', 'i+1'],
      answer: 0,
      explanation: '从 1 编号时，结点 i 的左孩子为 2i、右孩子为 2i+1、双亲为 ⌊i/2⌋；若 2i > n 则无左孩子，若 2i+1 > n 则无右孩子。这是顺序存储完全二叉树与堆的基础。',
      tags: ['记忆', '必背']
    },
    {
      id: 'DS-025', module: 'ds-algorithm', topic: '二叉树遍历', difficulty: 3, points: ['ds-algorithm|树与二叉树'],
      stem: '某二叉树的后序遍历为 DABEC，中序遍历为 DEBAC，则其先序遍历为（ ）。',
      options: ['CEDAB', 'CEDBA', 'CDEAB', 'CABED'],
      answer: 1,
      explanation: '后序末元素 C 为根；中序中 C 左侧 DEBA 为左子树。左子树后序 DABE 的末元素 E 为其根，中序 DEBA 中 E 左侧为 D、右侧 BA；BA 的后序为 AB，根为 B，中序 BA 说明 A 是 B 的右孩子。整棵树先序为 C、E、D、B、A。',
      tags: ['计算', '难点']
    },
    {
      id: 'DS-026', module: 'ds-algorithm', topic: 'B树', difficulty: 2, points: ['ds-algorithm|树与二叉树'],
      stem: '与 B 树相比，B+ 树的主要特点是（ ）。',
      options: ['叶子结点之间没有联系，只能逐层查找', '只支持等值查询，不支持范围查询', '所有数据都存放在叶子结点，叶子结点用链表相连，适合范围查询', '非叶结点也存放数据记录，查询可在任意层结束'],
      answer: 2,
      explanation: 'B+ 树的非叶结点只作索引，全部数据在叶子层且叶子按关键字顺序链接成链表，因此范围查询只需沿叶子链扫描；同时非叶结点可容纳更多索引项，树更矮。B 树的非叶结点也存数据，查询可能在中间层结束。',
      tags: ['概念', '高频']
    },
    {
      id: 'DS-027', module: 'ds-algorithm', topic: '哈夫曼树', difficulty: 3, points: ['ds-algorithm|树与二叉树'],
      stem: '对权值集合 {1, 2, 3, 4} 构造哈夫曼树，其带权路径长度 WPL 为（ ）。',
      options: ['20', '18', '21', '19'],
      answer: 3,
      explanation: '依次合并最小两个权值：1+2=3；再合并 3 与原有的 3 得 6；最后 4+6=10。叶子深度为 1→3、2→3、3→2、4→1，WPL = 1×3 + 2×3 + 3×2 + 4×1 = 19。用"非叶结点权值之和"验算：3+6+10 = 19。',
      tags: ['计算', '难点']
    },
    {
      id: 'DS-028', module: 'ds-algorithm', topic: '图', difficulty: 2, points: ['ds-algorithm|图'],
      stem: '采用邻接表存储含 n 个顶点、e 条边的图，深度优先遍历的时间复杂度为（ ）。',
      options: ['O(n+e)', 'O(n²)', 'O(e log e)', 'O(n×e)'],
      answer: 0,
      explanation: '邻接表存储时每个顶点被访问一次、每条边被检查两次（无向图），故为 O(n+e)；邻接矩阵存储时需检查 n×n 的矩阵，为 O(n²)。稠密图两种存储的复杂度相当，稀疏图邻接表更优。',
      tags: ['概念']
    },
    {
      id: 'DS-029', module: 'ds-algorithm', topic: '拓扑排序', difficulty: 1, points: ['ds-algorithm|图'],
      stem: '拓扑排序适用于（ ）。',
      options: ['用边表示活动的 AOE 网', '用顶点表示活动、边表示活动先后关系的有向无环图（AOV 网）', '带权无向图', '存在环的有向图'],
      answer: 1,
      explanation: 'AOV 网中顶点表示活动、有向边表示先后约束，拓扑排序给出满足全部约束的活动执行顺序，要求图无环。AOE 网用边表示活动，用于求关键路径，不用于拓扑排序。',
      tags: ['概念']
    },
    {
      id: 'DS-030', module: 'ds-algorithm', topic: '最短路径', difficulty: 2, points: ['ds-algorithm|图'],
      stem: '求图中每一对顶点之间的最短路径，最常用的算法及其时间复杂度是（ ）。',
      options: ['Prim 算法，O(n²)', 'Kruskal 算法，O(e log e)', 'Floyd 算法，O(n³)', 'Dijkstra 算法，O(n²)'],
      answer: 2,
      explanation: 'Floyd 用三重循环逐步允许中间顶点，求全源最短路径，时间 O(n³)、空间 O(n²)，可处理负权边（不能有负权回路）。Dijkstra 求单源最短路径，对每个顶点各跑一次也是 O(n³)，但实现更复杂。',
      tags: ['概念', '高频']
    },
    {
      id: 'DS-031', module: 'ds-algorithm', topic: '查找', difficulty: 1, points: ['ds-algorithm|查找'],
      stem: '二分查找要求线性表（ ）。',
      options: ['采用链式存储且按关键字有序', '只要求按关键字有序，存储结构不限', '采用散列存储', '采用顺序存储且按关键字有序'],
      answer: 3,
      explanation: '二分查找需要按下标随机访问中间元素，因此必须顺序存储；同时要求关键字有序才能根据比较结果缩小范围。链表无法随机定位中间结点，只能顺序查找。',
      tags: ['概念', '易错']
    },
    {
      id: 'DS-032', module: 'ds-algorithm', topic: '散列表', difficulty: 2, points: ['ds-algorithm|查找'],
      stem: '散列表采用链地址法处理冲突时，散列地址相同的记录（ ）。',
      options: ['链接在同一个单链表中', '按线性探测依次存入相邻单元', '被重新散列到其他地址', '必须删除后重新插入'],
      answer: 0,
      explanation: '链地址法把散列地址相同的所有记录组织成一条链表，冲突时不占用其他地址、删除方便，装填因子可以大于 1；开放定址法（线性探测、二次探测）则在同表中寻找下一个空单元。',
      tags: ['概念']
    },
    {
      id: 'DS-033', module: 'ds-algorithm', topic: '散列表', difficulty: 2, points: ['ds-algorithm|查找'],
      stem: '某散列表长度为 100，已存入 75 条记录，则其装填因子为（ ）。',
      options: ['0.25', '0.75', '1.33', '75'],
      answer: 1,
      explanation: '装填因子 α = 表中记录数 / 散列表长度 = 75/100 = 0.75。α 越大冲突越多、平均查找长度越大；开放定址法通常要求 α ≤ 0.75，链地址法可允许更大的 α。',
      tags: ['计算']
    },
    {
      id: 'DS-034', module: 'ds-algorithm', topic: '查找', difficulty: 3, points: ['ds-algorithm|查找'],
      stem: '对长度为 10 的顺序表进行顺序查找，查找成功时的平均查找长度为（ ）。',
      options: ['10', '6', '5.5', '5'],
      answer: 2,
      explanation: '等概率下第 i 个元素需比较 i 次，ASL = (1+2+…+10)/10 = 55/10 = 5.5，即 (n+1)/2。查找失败时需比较 n 次（或 n+1 次，取决于是否设哨兵）。',
      tags: ['计算']
    },
    {
      id: 'DS-035', module: 'ds-algorithm', topic: '排序', difficulty: 1, points: ['ds-algorithm|排序'],
      stem: '归并排序的空间复杂度为（ ）。',
      options: ['O(1)', 'O(log n)', 'O(n²)', 'O(n)'],
      answer: 3,
      explanation: '归并排序需要一个与原序列等长的辅助数组存放合并结果，空间复杂度 O(n)。相较之下堆排序为 O(1)，快速排序为 O(log n)（递归栈），基数排序为 O(n+r)。',
      tags: ['概念']
    },
    {
      id: 'DS-036', module: 'ds-algorithm', topic: '排序', difficulty: 2, points: ['ds-algorithm|排序'],
      stem: '下列排序算法中，空间复杂度为 O(1) 的是（ ）。',
      options: ['堆排序', '归并排序', '快速排序', '基数排序'],
      answer: 0,
      explanation: '堆排序在原数组上建堆并反复调整，只需常数级辅助空间；归并需 O(n)，快排需 O(log n) 递归栈，基数排序需 O(n+r) 的桶空间。',
      tags: ['记忆']
    },
    {
      id: 'DS-037', module: 'ds-algorithm', topic: '排序', difficulty: 2, points: ['ds-algorithm|排序'],
      stem: '对 10 个元素进行简单选择排序，无论初始序列如何，比较次数都是（ ）。',
      options: ['10', '45', '90', '55'],
      answer: 1,
      explanation: '第 i 趟需在剩余 n-i+1 个元素中选出最小者，比较 n-i 次，总比较次数为 n(n-1)/2 = 10×9/2 = 45，与初始序列无关。移动次数则与初始序列有关，最少 0 次、最多 3(n-1) 次。',
      tags: ['计算']
    },
    {
      id: 'DS-038', module: 'ds-algorithm', topic: '算法设计', difficulty: 1, points: ['ds-algorithm|算法设计与复杂度'],
      stem: '下列算法中，采用分治策略的是（ ）。',
      options: ['活动安排的贪心解法', 'N 皇后问题的回溯解法', '归并排序', '0-1 背包的动态规划解法'],
      answer: 2,
      explanation: '分治法把问题划分为规模更小的同类子问题，分别求解后合并，典型有归并排序、快速排序、二分查找、大整数乘法。动态规划强调重叠子问题，贪心法每步取局部最优，回溯法深度优先搜索解空间树。',
      tags: ['概念', '高频']
    },
    {
      id: 'DS-039', module: 'ds-algorithm', topic: '算法设计', difficulty: 2, points: ['ds-algorithm|算法设计与复杂度'],
      stem: '动态规划算法适用的两个基本要素是（ ）。',
      options: ['贪心选择性质与最优子结构', '随机化与并行性', '有界性与确定性', '最优子结构与重叠子问题'],
      answer: 3,
      explanation: '最优子结构指问题的最优解包含子问题的最优解；重叠子问题指递归求解时会反复遇到相同子问题，因此可用表格保存中间结果避免重复计算。贪心选择性质是贪心法的前提，不是动态规划的必要条件。',
      tags: ['概念', '必背']
    },
    {
      id: 'DS-040', module: 'ds-algorithm', topic: '算法设计', difficulty: 2, points: ['ds-algorithm|算法设计与复杂度'],
      stem: '用回溯法求解 N 皇后问题，其搜索方式是（ ）。',
      options: ['按深度优先搜索解空间树，发现不满足约束即回退', '按广度优先逐层扩展所有结点', '每次选择当前最优的列，不再回退', '把所有解存入表格后自底向上递推'],
      answer: 0,
      explanation: '回溯法以深度优先方式搜索解空间树，用约束函数与限界函数剪枝，某结点不可行时回退到上一层，最坏情况为指数级复杂度。N 皇后常用"逐行放置 + 列/对角线冲突检测"实现。',
      tags: ['概念']
    }
    ,
    {
      id: 'DS-057', module: 'ds-algorithm', topic: '树的性质', difficulty: 3, points: ['ds-algorithm|树与二叉树'],
      stem: '某树度为 4，其中有 5 个度 4、8 个度 3、6 个度 2、10 个度 1 的结点，叶子结点数为（ ）。',
      options: ['38', '36', '40', '42'],
      answer: 0,
      explanation: '任意树满足边数 = 结点数 − 1 = Σ度数。总度数 = 5×4+8×3+6×2+10×1 = 66，故结点数 67；非叶结点 29 个，叶子 = 67−29 = 38。不能套 n0=n2+1（仅二叉树成立）。',
      tags: ['计算', '易错']
    },
    {
      id: 'DS-058', module: 'ds-algorithm', topic: '树与哈夫曼', difficulty: 2, points: ['ds-algorithm|树与二叉树'],
      stem: '关于哈夫曼树，下列叙述正确的是（ ）。',
      options: ['权值相同的叶子一定位于同一层', '权值相同的叶子路径长度可能不同', '叶子结点越多 WPL 一定越大', '哈夫曼编码是唯一的'],
      answer: 1,
      explanation: '哈夫曼树只保证 WPL 最小；同权值叶子因合并次序不同可能处于不同深度，编码也不唯一（左右子树可交换）。"权值相同则路径长度相同"是真题常见错误说法。',
      tags: ['概念', '易错']
    },
    {
      id: 'DS-059', module: 'ds-algorithm', topic: '图存储', difficulty: 1, points: ['ds-algorithm|图'],
      stem: '对于稀疏图，更节省空间且常采用的存储结构是（ ）。',
      options: ['邻接矩阵', '十字链表', '邻接表', '顺序数组'],
      answer: 2,
      explanation: '邻接表只为实际存在的边分配结点，空间 O(n+e)，适合稀疏图；邻接矩阵固定 O(n²)，适合稠密图且便于快速判断两点是否相邻。',
      tags: ['理解']
    },
    {
      id: 'DS-060', module: 'ds-algorithm', topic: '图的矩阵表示', difficulty: 2, points: ['ds-algorithm|图'],
      stem: '无向图的邻接矩阵中，第 i 行非零元素的个数等于（ ）。',
      options: ['顶点 i 的入度', '顶点 i 的出度', '图的边总数', '顶点 i 的度'],
      answer: 3,
      explanation: '无向图邻接矩阵是对称矩阵，第 i 行（或第 i 列）1 的个数就是顶点 i 的度；有向图第 i 行为出度、第 i 列为入度。',
      tags: ['理解']
    },
    {
      id: 'DS-061', module: 'ds-algorithm', topic: '折半查找', difficulty: 1, points: ['ds-algorithm|查找'],
      stem: '对 9 个元素的有序表 (1,2,…,9) 做折半查找，首次比较的关键字是（ ）。',
      options: ['5', '4', '6', '1'],
      answer: 0,
      explanation: '取 mid = ⌊(low+high)/2⌋ = ⌊(1+9)/2⌋ = 5，故首次必与第 5 个元素比较。给定比较序列时先核对首元素，可快速排除不可能项。',
      tags: ['概念', '易错']
    },
    {
      id: 'DS-062', module: 'ds-algorithm', topic: '查找复杂度', difficulty: 2, points: ['ds-algorithm|查找'],
      stem: '对长度为 1000 的有序顺序表折半查找，最多比较次数约为（ ）。',
      options: ['9', '10', '11', '100'],
      answer: 1,
      explanation: '折半查找最多比较 ⌈log2(n+1)⌉ = ⌈log2(1001)⌉ = 10 次，等于判定树的高度；不是顺序查找的 (n+1)/2。',
      tags: ['计算']
    },
    {
      id: 'DS-063', module: 'ds-algorithm', topic: '排序复杂度', difficulty: 2, points: ['ds-algorithm|排序'],
      stem: '对 n 个元素做简单选择排序，总的比较次数为（ ）。',
      options: ['O(n)', 'O(n log n)', 'n(n−1)/2', 'n'],
      answer: 2,
      explanation: '第 i 趟在剩余 n−i+1 个元素中选最小者，需比较 n−i 次，总计 n(n−1)/2，与初始是否有序无关；移动次数才是 0~3(n−1)。',
      tags: ['计算']
    },
    {
      id: 'DS-064', module: 'ds-algorithm', topic: '算法策略', difficulty: 1, points: ['ds-algorithm|算法设计与复杂度'],
      stem: '快速排序采用的算法设计策略是（ ）。',
      options: ['动态规划', '贪心法', '回溯法', '分治法'],
      answer: 3,
      explanation: '快排以枢轴把序列分成左右子序列再递归求解，属于分治；归并排序、二分查找也是分治。贪心对应哈夫曼与最小生成树，回溯对应 N 皇后。',
      tags: ['理解']
    }
  ]);
})(window.RK);
