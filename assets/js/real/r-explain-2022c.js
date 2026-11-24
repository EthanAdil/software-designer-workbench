/* r-explain-2022c.js —— 2022 下半年真题三段解析（46~75） */
(function (RK) {
  RK.real.registerExplanations({
    'ZR-2022-11-046': {
      idea: '责任链模式适用于「能处理请求的对象集合在运行时应被动态指定」的场景。',
      derivation: '题干中日志处理对象按级别串联、可灵活增删调整处理者，处理请求的对象集合是动态决定的，符合责任链的适用情形。保存状态供恢复是备忘录模式，条件语句多分支可用策略模式替代。选「可处理一个请求的对象集合应被动态指定」。',
      selfComposed: true
    },
    'ZR-2022-11-047': {
      idea: '用一个统一接口把不同接口（驱动方法）转换为客户端期望的接口，是适配器模式的用途。',
      derivation: '电能与光能汽车驱动方法各异，客户端希望调用统一驱动接口。适配器模式把一个类的接口转换成客户希望的另一个接口，屏蔽差异；中介者降低对象间耦合，观察者实现发布订阅，访问者对元素增加新操作。选「适配器」。',
      selfComposed: true
    },
    'ZR-2022-11-048': {
      idea: 'Python 异常处理关键字是 try、except、else、finally，raise 用于主动抛出异常。',
      derivation: 'Python 用 except 捕获异常，不存在 catch 关键字（那是 Java/C++ 的用法）。try...except、try...except...finally、raise 都是合法结构。故选 try...catch... 不是合法异常处理结构。',
      selfComposed: true
    },
    'ZR-2022-11-049': {
      idea: '切片 [start:stop:step] 中 step 为负表示反向取，取到 stop（不含）为止。',
      derivation: 'list(range(11)) 为 [0..10]。[10:0:-2] 从下标 10 开始、步长 −2、到下标 0 之前停止，依次取下标 10、8、6、4、2，对应值 [10,8,6,4,2]；下标 0 因不含终点而被排除。选该项。',
      selfComposed: true
    },
    'ZR-2022-11-052': {
      idea: '候选键由能否唯一决定全部属性判断；非主属性对码的传递依赖会造成冗余与操作异常。',
      derivation: '教师号→（姓名、部门号、岗位、联系地址），再由岗位→薪资，故教师号的闭包包含全部属性，教师号是主键。薪资通过岗位间接依赖教师号，形成传递依赖，导致同一岗位的薪资重复存储、插入无教师岗位薪资困难、删除教师丢失薪资信息，即存在冗余及插入/删除异常。选该项。',
      selfComposed: true
    },
    'ZR-2022-11-053': {
      idea: '范式判定：有传递依赖且已消除部分依赖时最高达到 2NF。',
      derivation: '关系 T 的属性都完全依赖于单一主键教师号（无部分依赖），满足 2NF；但存在非主属性薪资对教师号的传递依赖（教师号→岗位→薪资），不满足 3NF。故最高达到 2NF。',
      selfComposed: true
    },
    'ZR-2022-11-056': {
      idea: '数据库故障分事务故障、系统故障、介质故障，按故障影响范围与原因区分。',
      derivation: '表达式 x/y 中 y=0 导致除零错误，是事务程序执行中因逻辑/输入错误引发的异常，只影响当前事务，撤销该事务即可恢复，属于事务故障。系统故障指宕机，介质故障指磁盘损坏。选「事务故障」。',
      selfComposed: true
    },
    'ZR-2022-11-058': {
      idea: '中序遍历顺序为左子树—根—右子树，据此判断两结点的先后。',
      derivation: '若中序遍历中 n 排在 m 之前，说明 m 位于 n 的右子树一侧（或在 n 右边），即 m 在 n 的右边。若 m 是 n 的左子孙则会排在 n 之前，与题意相反。选「m 在 n 的右边」。',
      selfComposed: true
    },
    'ZR-2022-11-059': {
      idea: '邻接矩阵用 n×n 的二维数组记录任意两顶点间是否相邻。',
      derivation: 'n 个顶点的图，邻接矩阵每个顶点对应一行一列，矩阵规模为 n×n = n²，与边数 e 无关。选 n²。',
      selfComposed: true
    },
    'ZR-2022-11-060': {
      idea: 'B- 树与 B+ 树的关键区别之一是叶子结点是否用指针串成有序链表。',
      derivation: 'B- 树根最多 m 棵子树、所有叶子在同一层、结点内关键字有序，这些都是正确性质。把叶子结点用指针链接成有序表是 B+ 树的特征，B- 树没有。选该项为错误说法。',
      selfComposed: true
    },
    'ZR-2022-11-061': {
      idea: '比较常见排序的辅助空间：归并 O(n)，快排 O(logn) 递归栈，堆排/冒泡 O(1)。',
      derivation: '归并排序需要与原数组等长的辅助数组，空间 O(n)；快速排序递归栈平均 O(logn)；堆排序与冒泡排序只需常数额外空间。故占用辅助空间最多的是归并排序。',
      selfComposed: true
    },
    'ZR-2022-11-062': {
      idea: '折半查找每次把查找区间减半并独立求解子问题，属于分治策略。',
      derivation: '折半查找把有序表分成两半，依据比较结果只在其中一半继续查找，是「分解—求解子问题」的分治思想（退化的分治，只解一个子问题）。动态规划、贪心、回溯均不符合。选「分治」。',
      selfComposed: true
    },
    'ZR-2022-11-063': {
      idea: '折半查找的平均比较次数由判定树各结点的层数求和得到。',
      derivation: '对 10 个元素构造折半查找判定树，成功查找各元素比较次数之和为 29，元素数 10，平均 29/10；失败查找对应外部结点（共 11 个）比较次数之和为 39，平均 39/11。选「29/10 和 39/11」。',
      selfComposed: true
    },
    'ZR-2022-11-064': {
      idea: 'Dijkstra 算法每一步在当前未确定集合中选取距离源点最近的顶点，是贪心选择。',
      derivation: 'Dijkstra 每次局部地选择当前最短距离的顶点并确定其最短路径，不做全局回溯，这种「每步取当前最优」的策略属于贪心算法。分治、动态规划、回溯均非其策略。选「贪心算法」。',
      selfComposed: true
    },
    'ZR-2022-11-066': {
      idea: 'VLAN 标签（802.1Q tag）被插入以太网 MAC 帧中，因此工作在第二层。',
      derivation: 'VLAN tag 是加在以太网帧首部的字段，用于标识帧所属虚拟局域网，由数据链路层设备（交换机）识别与处理，不涉及 IP 层。故在 OSI 的数据链路层实现。选「数据链路层」。',
      selfComposed: true
    },
    'ZR-2022-11-067': {
      idea: 'Telnet 是明文远程登录协议，传输层基于 TCP。',
      derivation: 'Telnet 使用 TCP 23 端口建立可靠连接进行远程终端登录；它是明文传输（不安全），属于 C/S 而非 B/S，也不是分布式协议。选「基于 TCP」。',
      selfComposed: true
    },
    'ZR-2022-11-068': {
      idea: 'HTTPS = HTTP + SSL/TLS，加密传输、默认 443；HTTP 明文、默认 80。',
      derivation: '电子支付涉及敏感信息，必须使用加密的 HTTPS 保护传输安全，使用 HTTP 会有被窃听篡改的风险，故「电子支付类网站应使用 HTTP」错误。其余关于加密与端口的叙述均正确。',
      selfComposed: true
    },
    'ZR-2022-11-069': {
      idea: '把域名转换为 IP 地址是域名系统 DNS 的功能。',
      derivation: 'DNS（域名系统）负责域名与 IP 地址之间的解析映射；IP 地址解析（ARP）是 IP 到 MAC，路由选择由路由协议完成，传输控制是 TCP。选「域名解析」。',
      selfComposed: true
    },
    'ZR-2022-11-070': {
      idea: 'IP 地址逻辑可复用（尤其私有地址），而 MAC 地址由厂商烧录、全球唯一。',
      derivation: 'MAC 地址由 IEEE 分配给厂商并烧入网卡，具有全球唯一性；IP 地址可按网络拓扑动态分配、重复使用，私有地址在不同内网可重复。故「MAC 地址不具有唯一性」的说法错误。选该项。',
      selfComposed: true
    },
    'ZR-2022-11-071': {
      idea: '英语填空考固定搭配：architecture style（架构风格）。',
      derivation: '句意「面向服务是一种架构风格，而 Web 服务是一种实现技术」。architectural style 是软件架构领域的标准术语，与后文 implementation technology 相对。选 style。',
      selfComposed: true
    },
    'ZR-2022-11-072': {
      idea: '英语填空与上一空呼应：Web 服务是一种实现技术（implementation technology）。',
      derivation: '前半句说面向服务是架构风格（architectural style），后半句对照说明 Web 服务是实现层面的技术，用 implementation technology 表达最恰当。选 technology。',
      selfComposed: true
    },
    'ZR-2022-11-073': {
      idea: '英语填空：服务是定义良好接口（well-defined interfaces）的独立进程。',
      derivation: '空格描述服务之间「communicate using local channels」，前面应为「well-defined interfaces（定义良好的接口）」，这是 SOA 中服务的典型特征。functions/logics/formats 均不合搭配。选 interfaces。',
      selfComposed: true
    },
    'ZR-2022-11-074': {
      idea: '英语填空：Web 服务非常适合作为面向服务环境的基础。',
      derivation: '句意「虽然 Web 服务非常适合作为面向服务环境的基础，但其定义并不要求体现 SOA 原则」。be well-suited as 表示「很适合作为」，符合语境。regarded 需搭配 as 但语义为「被认为」，不如 well-suited 贴切。选 well-suited。',
      selfComposed: true
    },
    'ZR-2022-11-075': {
      idea: '英语填空：无状态性（statelessness）常被视为 Web 服务的关键特征。',
      derivation: '后文「there is no technical reason that they should be stateless」明确提示本空主题是「无状态」，故填 statelessness，与后文 stateless 呼应。distribution/interconnection/dependence 均与后文不呼应。选 statelessness。',
      selfComposed: true
    }
  });
})(window.RK);
