/* r-explain-2023c.js —— 2023 上半年真题三段解析（43~75） */
(function (RK) {
  RK.real.registerExplanations({
    'ZR-2023-05-043': {
      idea: 'UML 包是模型元素的组织单元，包内元素须名称唯一，一个元素只能被一个包拥有。',
      derivation: '包可以拥有类、接口、构件、节点，也可嵌套其他包，且同一包内元素不能重名。但一个模型元素只能归属一个包，不能同时被多个包拥有，故「一个元素可以被多个包拥有」不正确。',
      selfComposed: true
    },
    'ZR-2023-05-046': {
      idea: '同一需求有多种实现方式（不同定价策略），且需要能灵活替换，适合用策略模式。',
      derivation: '根据季节、节假日推出不同的定价算法（淡季打折、一口价等），本质是一组可互换的算法，希望彼此独立、便于切换扩展，正是策略模式的应用场景。状态模式强调随内部状态改变行为，观察者用于通知，命令封装请求。选「策略模式」。',
      selfComposed: true
    },
    'ZR-2023-05-047': {
      idea: '策略模式的意图是把一系列算法封装起来并使它们可相互替换。',
      derivation: '策略模式定义一族算法，各自封装成类，客户可按需要选择并互换，使算法变化独立于使用它的客户。A 是命令模式意图，B 是观察者，C 是状态模式。选「定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换」。',
      selfComposed: true
    },
    'ZR-2023-05-048': {
      idea: 'Python 内置函数 type() 返回对象的类型。',
      derivation: 'type(x) 返回对象 x 的类型；str() 转字符串，id() 返回对象内存地址标识，object() 创建基础对象。故选 type()。',
      selfComposed: true
    },
    'ZR-2023-05-049': {
      idea: 'Python 中单元素元组必须在元素后加逗号，(1) 只是带括号的整数。',
      derivation: '(1,2,1,2) 是元组；1,2,1,2 以逗号分隔也是元组；tuple() 创建空元组；而 (1) 中括号仅作分组，结果是整数 1，不是元组。故 (1) 不能定义元组。',
      selfComposed: true
    },
    'ZR-2023-05-050': {
      idea: 'Python 没有 switch...case 语句（3.10 前的传统说法），选择结构用 if...elif...else。',
      derivation: 'for 可迭代序列、for/while 后可接 else、支持嵌套循环均是 Python 特性。传统 Python 不提供 switch...case 语句，选择结构用 if 系列表示。故「可以用 if...else 和 switch...case」的说法不正确。',
      selfComposed: true
    },
    'ZR-2023-05-051': {
      idea: '数据库三级模式抽象层次从高到低为：视图层（外模式）→ 逻辑层（概念模式）→ 物理层（内模式）。',
      derivation: '视图层是最高抽象、面向用户；逻辑层描述整体逻辑结构，比视图层低一层；物理层描述存储细节，层次最低。故「物理层是比逻辑层更高一层的抽象」错误，物理层应更低。',
      selfComposed: true
    },
    'ZR-2023-05-052': {
      idea: 'Armstrong 公理的自反律：若 Y⊆X⊆U，则 X→Y 成立。',
      derivation: '自反律指属性集 X 必然函数决定其任意子集 Y（Y⊆X）。B 是传递律，C 是分解规则，D 是合并规则。选「若 Y⊆X⊆U，则 X→Y 为 F 所蕴含」。',
      selfComposed: true
    },
    'ZR-2023-05-053': {
      idea: '候选码是能决定全部属性的最小属性集，通过求属性闭包判断。',
      derivation: '对 F={AB→C, CD→B}：ABD 的闭包，由 AB→C 得 ABC，含 D 后由 CD→B 已满足，闭包含全部 ABCD；ACD 的闭包，由 CD→B 得 B，再由 AB→C 满足，闭包也含全部。且二者都是最小集，故有 ABD 和 ACD 两个候选码。选该项。',
      selfComposed: true
    },
    'ZR-2023-05-054': {
      idea: '主属性指出现在任意候选码中的属性，其余为非主属性。',
      derivation: '由上一题候选码为 ABD 和 ACD，A、B、C、D 四个属性都至少出现在一个候选码中，故主属性 4 个，非主属性 0 个。选「4 和 0」。',
      selfComposed: true
    },
    'ZR-2023-05-055': {
      idea: 'SQL 授权语法为 GRANT 权限 ON 对象 TO 用户。',
      derivation: '授予插入权限须写 INSERT 并紧跟 ON 指明对象表：GRANT INSERT ON TABLE Students TO User1。空一应填「INSERT ON」。选该项。',
      selfComposed: true
    },
    'ZR-2023-05-056': {
      idea: 'GRANT ... WITH GRANT OPTION 表示被授权者可以把该权限再授予他人。',
      derivation: '按题意应允许 User1 转授权限，标准语法是在 GRANT 语句末尾加 WITH GRANT OPTION；WITH CHECK OPTION 用于视图约束，PUBLIC 指所有用户。按标准语义此处应为 WITH GRANT OPTION。',
      selfComposed: true
    },
    'ZR-2023-05-057': {
      idea: '用栈求值算术表达式时，操作数栈的深度取决于表达式嵌套的最深待结合层次。',
      derivation: '对 10*(40-30/5)+20：先压 10、40、30、5，此时栈深 4；算 30/5=6 得 10、40、6；再算 40-6=34 得 10、34；算 10*34=340 得 340；压 20 得 340、20；最后相加。栈最大深度为 4，故容量至少 4。选 4。',
      selfComposed: true
    },
    'ZR-2023-05-058': {
      idea: '哈夫曼编码是前缀编码：任一码字都不能是另一码字的前缀。',
      derivation: '检查各方案的码字是否为前缀关系：D 中 11 是 110、111 式结构需看具体——{11,10,011,010,000} 中 10 是 100/101 的前缀但此处无；真正问题是 11 与后续无前缀冲突，而 0 开头有 011、010、000 无前缀。按标准判定，D 中「11」与「1」无关但存在 01 前缀于 011/010 的情况，构成非前缀码，故不可能。选 D。',
      selfComposed: true
    },
    'ZR-2023-05-059': {
      idea: '邻接表上广度优先遍历每访问一个顶点扫描其边表一次，复杂度为顶点数加弧数。',
      derivation: 'BFS 中每个顶点入队出队一次（O(n)），每条弧在扫描邻接表时各被检查一次（有向图 e 条弧，O(e)），总时间复杂度 O(n+e)。选 O(n+e)。',
      selfComposed: true
    },
    'ZR-2023-05-060': {
      idea: '折半查找每次把查找区间对半分，比较的关键字序列必须对应同一棵判定树上自根向下的路径。',
      derivation: '序列 90,85,61,77,42：先在 90 比较后转左半区，再 85 后继续左半区到 61，接着却出现 77——它位于 61 的右侧而超出当前区间约束，判定树路径不可能这样跳转。其余序列都符合逐次折半的区间收缩。选 C。',
      selfComposed: true
    },
    'ZR-2023-05-061': {
      idea: '森林转二叉树用左孩子—右兄弟表示法：第一棵树为根，其余树成为根的右孩子链。',
      derivation: '转换后二叉树的根是第一棵树；其右子树由第二、第三棵树依次作为右兄弟串成，包含第二棵树的 n2 个结点和第三棵树的 n3 个结点，共 n2+n3。选该项。',
      selfComposed: true
    },
    'ZR-2023-05-062': {
      idea: '常见 O(nlogn) 排序算法中，稳定的是归并排序。',
      derivation: '归并排序时间复杂度 O(nlogn) 且稳定（相等元素相对次序不变）。堆排序与快速排序虽也是 O(nlogn) 但不稳定，直接插入排序稳定但为 O(n²)。故选归并排序。',
      selfComposed: true
    },
    'ZR-2023-05-063': {
      idea: '要求 O(nlogn) 且原地（辅助空间 O(1)）的排序是堆排序。',
      derivation: '堆排序时间复杂度 O(nlogn)，只需常数辅助空间，属于原地排序。归并排序需 O(n) 辅助数组，快速排序平均需 O(logn) 递归栈，均不满足空间 O(1)。选堆排序。',
      selfComposed: true
    },
    'ZR-2023-05-066': {
      idea: 'WWW（万维网）以 HTTP 作为其应用层控制与传输协议。',
      derivation: '浏览器与 Web 服务器之间用 HTTP 请求/响应交互，故 WWW 的控制协议是 HTTP。FTP 用于文件传输，SSL 是安全层，DNS 做域名解析。选 HTTP。',
      selfComposed: true
    },
    'ZR-2023-05-067': {
      idea: 'Linux 下常用的 Web 服务器是 Apache（IIS 是 Windows 平台的）。',
      derivation: 'Apache 是 Linux 上最典型的 Web 服务器；IIS 属于 Windows，NFS 是网络文件系统，MySQL 是数据库。选 Apache。',
      selfComposed: true
    },
    'ZR-2023-05-068': {
      idea: '按本题来源口径，Apache 的默认 Web 目录记为 /home/httpd。',
      derivation: '四个备选项中，/etc/httpd 是配置目录、/var/log/httpd 是日志目录、/etc/home 非标准路径，本题登记的默认 Web 文档目录为 /home/httpd。选该项（不同发行版默认路径有差异，考试按题面给定口径）。',
      selfComposed: true
    },
    'ZR-2023-05-069': {
      idea: 'SNMP（简单网络管理协议）在传输层使用 UDP。',
      derivation: 'SNMP 基于 UDP 工作，管理站与代理之间用无连接的报文交换（默认端口 161/162），开销小。TCP/IP/ICMP 都不是其传输层协议。选 UDP。',
      selfComposed: true
    },
    'ZR-2023-05-070': {
      idea: '网页打不开但即时聊天正常，说明网络连接与 IP 正常，问题在域名解析。',
      derivation: '即时聊天软件使用正常表明 IP 连通性、网卡、链路都正常；网页需先把域名解析为 IP，若 DNS 配置错误则域名无法解析，导致打不开网页。选「DNS 配置错误」。',
      selfComposed: true
    },
    'ZR-2023-05-071': {
      idea: '英语填空：低代码通过可视化（visual）构件块自动生成代码。',
      derivation: '后文举例 drag-and-drop、pull-down menu interfaces 都是可视化操作，故填 visual building blocks（可视化构件块）。component-based/object-oriented/structural 均不能概括拖拽下拉的可视特征。选 visual。',
      selfComposed: true
    },
    'ZR-2023-05-072': {
      idea: '英语填空：这种自动化（automation）让低代码用户专注于差异化部分。',
      derivation: '空格指代前文「通过可视化构件块自动代码生成」这一机制，This automation allows users to focus on the differentiator 语义连贯。block/function/method 不能概括前文整段机制。选 automation。',
      selfComposed: true
    },
    'ZR-2023-05-073': {
      idea: '英语填空：无代码完全依赖可视化工具，采取彻底「放手（hands-off）」的方式。',
      derivation: '前半句说低代码仍有脚本或手工编码的「handholding」，用 while 对比，无代码则 completely hands-off（完全不需手工介入），与 100% dependence on visual tools 呼应。选 hands-off。',
      selfComposed: true
    },
    'ZR-2023-05-074': {
      idea: '英语填空：IDE 带有内置（built-in）特性，如 API、代码模板、可复用插件。',
      derivation: '所列举的 APIs、code templates、reusable plug-in modules 是 IDE 自带的内置功能，用 built-in features 表达最准确。reusable 只能形容插件，不能概括全部。选 built-in。',
      selfComposed: true
    },
    'ZR-2023-05-075': {
      idea: '英语填空：低代码让专业开发者把精力转向「最后一公里」的开发（development）。',
      derivation: '句意为低代码主要用于自动化通用编码环节，从而把精力重新投向最后 mile 的 development（真正的开发难点）。the last mile of development 是常见表达，与前文 redirect effort 呼应。选 development。',
      selfComposed: true
    }
  });
})(window.RK);
