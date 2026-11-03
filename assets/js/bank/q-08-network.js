/* 计算机网络 —— 30 题 */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'NET-001', module: 'network', topic: '分层模型', difficulty: 1,
      stem: '路由器工作在 OSI 参考模型的（ ），交换机通常工作在（ ）。',
      options: ['传输层，网络层', '网络层，物理层', '网络层，数据链路层', '数据链路层，网络层'],
      answer: 2,
      explanation: '路由器根据 IP 地址转发，属网络层设备；交换机根据 MAC 地址转发，属数据链路层；集线器/中继器工作在物理层；网关可工作在高层。',
      tags: ['概念', '必背']
    },
    {
      id: 'NET-002', module: 'network', topic: '传输层', difficulty: 1,
      stem: '下列协议中，工作在传输层且提供可靠传输的是（ ）。',
      options: ['UDP', 'IP', 'ICMP', 'TCP'],
      answer: 3,
      explanation: 'TCP 面向连接、可靠、有序、有流量与拥塞控制；UDP 无连接、不可靠但开销小；IP 与 ICMP 属网络层。',
      tags: ['概念']
    },
    {
      id: 'NET-003', module: 'network', topic: '子网划分', difficulty: 3,
      stem: '将 192.168.1.0/24 划分为 4 个等长子网，则子网掩码为（ ），每个子网可用主机地址数为（ ）。',
      options: ['255.255.255.192，62', '255.255.255.224，30', '255.255.255.128，126', '255.255.255.240，14'],
      answer: 0,
      explanation: '划分 4 个子网需借 2 位主机位（2²=4），前缀由 /24 变为 /26，掩码 255.255.255.192。剩余 6 位主机位，可用地址 2⁶-2 = 62。',
      tags: ['计算', '高频']
    },
    {
      id: 'NET-004', module: 'network', topic: '子网划分', difficulty: 2,
      stem: '某子网掩码为 255.255.255.224，该子网中可分配给主机的地址个数是（ ）。',
      options: ['62', '30', '32', '14'],
      answer: 1,
      explanation: '224 = 11100000，主机位剩 5 位，共 2⁵ = 32 个地址，扣除网络地址与广播地址，可用 30 个。掩码位数与前缀的换算要熟练。',
      tags: ['计算']
    },
    {
      id: 'NET-005', module: 'network', topic: 'IP 地址', difficulty: 1,
      stem: '下列地址中，属于私有地址的是（ ）。',
      options: ['11.0.0.1', '224.0.0.1', '192.168.10.5', '172.32.10.5'],
      answer: 2,
      explanation: '私有地址三段：10.0.0.0/8、172.16.0.0/12（172.16~172.31）、192.168.0.0/16。172.32.x.x 已超出 172.16~31 范围，属公网地址；224.0.0.1 为组播地址。',
      tags: ['概念', '易错']
    },
    {
      id: 'NET-006', module: 'network', topic: 'CIDR', difficulty: 3,
      stem: '将 192.168.0.0/24 与 192.168.1.0/24 进行路由聚合，结果是（ ）。',
      options: ['192.168.0.0/22', '192.168.1.0/23', '192.168.0.0/25', '192.168.0.0/23'],
      answer: 3,
      explanation: '两网段第三字节为 00000000 与 00000001，前 7 位相同，可合并为 /23，网络号为 192.168.0.0/23（覆盖 0.0~1.255）。聚合要求地址块连续且对齐。',
      tags: ['计算', '难点']
    },
    {
      id: 'NET-007', module: 'network', topic: 'TCP', difficulty: 2,
      stem: 'TCP 建立连接的三次握手过程中，第二次握手的报文段标志位是（ ）。',
      options: ['SYN=1, ACK=1', 'SYN=1, ACK=0', 'FIN=1, ACK=1', 'ACK=1, FIN=0'],
      answer: 0,
      explanation: '第一次：SYN=1（客户端请求）；第二次：SYN=1, ACK=1（服务器确认并同步自己的序号）；第三次：ACK=1（客户端确认）。三次握手用于同步双方序号并确认收发能力。',
      tags: ['概念', '高频']
    },
    {
      id: 'NET-008', module: 'network', topic: 'TCP', difficulty: 3,
      stem: 'TCP 连接释放时，主动关闭方进入 TIME_WAIT 状态并等待 2MSL，其主要目的是（ ）。',
      options: ['防止拥塞窗口过大', '保证最后一个 ACK 能到达对方，并让旧连接的报文在网络中消失', '等待对方重新建立连接', '释放本地端口以便立即重用'],
      answer: 1,
      explanation: '2MSL 有两个作用：一是若最后 ACK 丢失，可重发并再次收到对方的 FIN；二是让本次连接的残留报文在网络中超时消失，避免影响新连接。',
      tags: ['概念', '易错']
    },
    {
      id: 'NET-009', module: 'network', topic: 'TCP', difficulty: 2,
      stem: 'TCP 慢开始阶段，拥塞窗口的增长方式是（ ）。',
      options: ['始终保持 1 个报文段', '随机增长', '每经过一个 RTT 翻倍（指数增长），直到达到慢开始门限', '每个 RTT 加 1（线性增长）'],
      answer: 2,
      explanation: '慢开始：cwnd 从 1 开始，每经过一个 RTT 翻倍（指数增长），到达 ssthresh 后转入拥塞避免（每 RTT 加 1，线性增长）。发生超时则 ssthresh 减半、cwnd 重置为 1。',
      tags: ['概念', '高频']
    },
    {
      id: 'NET-010', module: 'network', topic: '应用层', difficulty: 1,
      stem: 'DNS 查询通常采用的传输层协议是（ ）。',
      options: ['TCP', 'ICMP', 'ARP', 'UDP'],
      answer: 3,
      explanation: 'DNS 常规查询使用 UDP 53 端口（开销小、速度快）；区域传送和响应报文超过 512 字节时使用 TCP 53。这是"UDP 也能可靠工作"的典型例子。',
      tags: ['概念']
    },
    {
      id: 'NET-011', module: 'network', topic: '应用层', difficulty: 1,
      stem: '下列默认端口号对应关系正确的是（ ）。',
      options: ['HTTP-80、HTTPS-443、FTP-21、SMTP-25', 'HTTP-8080、HTTPS-443、FTP-20、SMTP-110', 'HTTP-80、HTTPS-8443、FTP-23、SMTP-25', 'HTTP-80、HTTPS-443、FTP-22、SMTP-110'],
      answer: 0,
      explanation: '常用端口：HTTP 80、HTTPS 443、FTP 控制 21/数据 20、SSH 22、Telnet 23、SMTP 25、POP3 110、IMAP 143、DNS 53、SNMP 161。',
      tags: ['记忆', '必背']
    },
    {
      id: 'NET-012', module: 'network', topic: '路由协议', difficulty: 2,
      stem: 'RIP 协议规定最大跳数为 15，其采用的算法是（ ）。',
      options: ['路径向量算法', '距离向量算法', '链路状态算法', '最短路径优先算法'],
      answer: 1,
      explanation: 'RIP 基于距离向量（Bellman-Ford），以跳数为度量，15 跳为不可达；OSPF 基于链路状态（Dijkstra）；BGP 基于路径向量，用于自治系统之间。',
      tags: ['概念']
    },
    {
      id: 'NET-013', module: 'network', topic: '分层模型', difficulty: 1,
      stem: 'OSI 参考模型自下而上的第二层是（ ）。',
      options: ['传输层', '会话层', '数据链路层', '网络层'],
      answer: 2,
      explanation: 'OSI 七层自下而上为物理层、数据链路层、网络层、传输层、会话层、表示层、应用层。数据链路层负责相邻结点间的帧传输、差错控制与介质访问控制。',
      tags: ['记忆', '必背']
    },
    {
      id: 'NET-014', module: 'network', topic: '分层模型', difficulty: 2,
      stem: 'TCP/IP 模型中，传输层的数据单元称为（ ）。',
      options: ['帧', '分组（数据报）', '比特流', '报文段（TCP）或用户数据报（UDP）'],
      answer: 3,
      explanation: '各层数据单元：物理层比特、数据链路层帧、网络层分组（IP 数据报）、传输层报文段（TCP）/用户数据报（UDP）、应用层报文。封装时逐层加上本层首部。',
      tags: ['概念']
    },
    {
      id: 'NET-015', module: 'network', topic: '分层模型', difficulty: 2,
      stem: '关于交换机与集线器，下列说法正确的是（ ）。',
      options: ['交换机按 MAC 地址转发，能隔离冲突域但不隔离广播域', '交换机既能隔离冲突域也能隔离广播域', '集线器按 IP 地址转发数据', '交换机工作在网络层'],
      answer: 0,
      explanation: '集线器是物理层设备，所有端口共享同一冲突域与带宽；交换机是数据链路层设备，每个端口是独立冲突域，但广播帧仍会向所有端口转发，因此不隔离广播域。划分广播域需要 VLAN 或路由器。',
      tags: ['概念', '易错']
    },
    {
      id: 'NET-016', module: 'network', topic: '分层模型', difficulty: 1,
      stem: 'ARP 协议的作用是（ ）。',
      options: ['动态分配 IP 地址', '把 IP 地址解析为 MAC 地址', '把 MAC 地址解析为 IP 地址', '把域名解析为 IP 地址'],
      answer: 1,
      explanation: 'ARP 根据目标 IP 地址在局域网内广播询问，获得对应的 MAC 地址后写入 ARP 缓存；RARP 是反向解析；DNS 解析域名；DHCP 分配地址。ARP 属网络层协议。',
      tags: ['概念', '高频']
    },
    {
      id: 'NET-017', module: 'network', topic: 'IP 地址', difficulty: 1,
      stem: 'IP 地址 192.168.1.1 属于（ ）。',
      options: ['B 类地址', 'D 类地址', 'C 类地址', 'A 类地址'],
      answer: 2,
      explanation: '首字节决定类别：1~126 为 A 类、128~191 为 B 类、192~223 为 C 类、224~239 为 D 类（组播）、240~255 为 E 类。192 落在 C 类范围，其默认掩码为 255.255.255.0。',
      tags: ['记忆']
    },
    {
      id: 'NET-018', module: 'network', topic: '子网划分', difficulty: 3,
      stem: '网段 172.16.0.0/22 中可分配给主机的地址个数是（ ）。',
      options: ['1024', '510', '2046', '1022'],
      answer: 3,
      explanation: '/22 表示前 22 位为网络位，主机位为 32-22 = 10 位，共 2^10 = 1024 个地址，扣除网络地址与广播地址后可分配 1022 个。该网段覆盖 172.16.0.0~172.16.3.255。',
      tags: ['计算', '高频']
    },
    {
      id: 'NET-019', module: 'network', topic: 'CIDR', difficulty: 2,
      stem: '路由器查表时若有多条路由都匹配目的地址，应选择（ ）。',
      options: ['前缀最长的那条路由', '前缀最短的那条路由', '跳数最多的那条路由', '最先配置的那条路由'],
      answer: 0,
      explanation: '最长前缀匹配原则：网络前缀越长，地址块越小、描述越精确，因此优先选择。只有当最长前缀路由不可用时才回退到较短的聚合路由（默认路由 0.0.0.0/0 前缀最短）。',
      tags: ['概念', '高频']
    },
    {
      id: 'NET-020', module: 'network', topic: 'IP 地址', difficulty: 1,
      stem: 'IPv6 地址的长度为（ ）。',
      options: ['256 位', '128 位', '32 位', '64 位'],
      answer: 1,
      explanation: 'IPv6 地址为 128 位，采用冒号分隔的十六进制表示（8 组、每组 4 位十六进制），地址空间远大于 IPv4 的 32 位，并支持无状态地址自动配置与简化的首部格式。',
      tags: ['记忆']
    },
    {
      id: 'NET-021', module: 'network', topic: 'TCP', difficulty: 2,
      stem: 'UDP 首部的固定长度是（ ）。',
      options: ['12 字节', '16 字节', '8 字节', '20 字节'],
      answer: 2,
      explanation: 'UDP 首部仅 8 字节：源端口、目的端口、长度、校验和各 2 字节；TCP 首部固定部分 20 字节，加上选项最多 60 字节。首部越简单，开销越小、处理越快。',
      tags: ['记忆']
    },
    {
      id: 'NET-022', module: 'network', topic: 'TCP', difficulty: 2,
      stem: 'TCP 连接释放需要四次挥手，主要原因是（ ）。',
      options: ['TCP 首部长度不够', '释放时需要重新同步序号', '为了防止拥塞', 'TCP 是全双工的，两个方向需要分别关闭'],
      answer: 3,
      explanation: 'TCP 连接是全双工的，一方发送 FIN 只表示自己不再发送数据，仍可以接收；对方需先回 ACK，待其数据也发送完毕后再发自己的 FIN，因此需要四次交互。主动关闭方最后进入 TIME_WAIT 等待 2MSL。',
      tags: ['概念', '高频']
    },
    {
      id: 'NET-023', module: 'network', topic: 'TCP', difficulty: 2,
      stem: 'TCP 拥塞避免阶段，拥塞窗口的增长方式是（ ）。',
      options: ['每经过一个 RTT 加 1（线性增长）', '每经过一个 RTT 翻倍（指数增长）', '保持不变', '每收到一个 ACK 减半'],
      answer: 0,
      explanation: '慢开始阶段 cwnd 每 RTT 翻倍，达到慢开始门限 ssthresh 后进入拥塞避免，改为每 RTT 加 1 线性增长；出现超时则 ssthresh 减半、cwnd 重置为 1，出现三个重复 ACK 则执行快重传与快恢复。',
      tags: ['概念']
    },
    {
      id: 'NET-024', module: 'network', topic: '应用层', difficulty: 2,
      stem: 'DNS 中用于指定邮件服务器地址的记录类型是（ ）。',
      options: ['NS', 'MX', 'A', 'CNAME'],
      answer: 1,
      explanation: 'A 记录把域名映射到 IPv4 地址；AAAA 对应 IPv6；CNAME 为别名；MX 指定该域的邮件服务器及优先级；NS 指定授权域名服务器。',
      tags: ['记忆']
    },
    {
      id: 'NET-025', module: 'network', topic: '应用层', difficulty: 1,
      stem: 'DHCP 协议的主要作用是（ ）。',
      options: ['在链路层进行差错检测', '在路由器之间交换路由信息', '为主机动态分配 IP 地址及网关、DNS 等配置信息', '把域名解析为 IP 地址'],
      answer: 2,
      explanation: 'DHCP 通过 Discover-Offer-Request-ACK 四步交互为主机自动分配 IP 地址、子网掩码、默认网关与 DNS 服务器，减少手工配置错误，适合主机频繁移动的网络。',
      tags: ['概念']
    },
    {
      id: 'NET-026', module: 'network', topic: '路由协议', difficulty: 2,
      stem: 'OSPF 属于（ ）路由协议，计算最短路径采用（ ）算法。',
      options: ['距离向量，Bellman-Ford', '路径向量，Dijkstra', '链路状态，Bellman-Ford', '链路状态，Dijkstra'],
      answer: 3,
      explanation: 'OSPF 通过洪泛链路状态通告（LSA）让每个路由器掌握全网拓扑，再用 Dijkstra 算法计算最短路径树；RIP 是距离向量协议（Bellman-Ford，以跳数计）；BGP 是路径向量协议，用于 AS 之间。',
      tags: ['概念', '高频']
    },
    {
      id: 'NET-027', module: 'network', topic: '应用层', difficulty: 1,
      stem: 'FTP 工作时使用两条 TCP 连接，其中控制连接的默认端口是（ ）。',
      options: ['21', '20', '22', '23'],
      answer: 0,
      explanation: 'FTP 控制连接使用 21 端口传送命令与响应，数据连接使用 20 端口（主动模式）传送文件内容。20 为数据端口、21 为控制端口，不要记反。',
      tags: ['记忆', '易错']
    },
    {
      id: 'NET-028', module: 'network', topic: '传输介质', difficulty: 1,
      stem: '双绞线用于以太网时，其最大传输距离一般约为（ ）。',
      options: ['10 公里', '100 米', '500 米', '2 公里'],
      answer: 1,
      explanation: '双绞线成本低、易布线，但信号衰减快，链路长度一般不超过 100 米；同轴电缆可达数百米；多模光纤约 2 公里内；单模光纤可达数十公里。',
      tags: ['记忆']
    },
    {
      id: 'NET-029', module: 'network', topic: '传输介质', difficulty: 2,
      stem: '曼彻斯特编码的编码效率为（ ），其主要优点是（ ）。',
      options: ['100%，无冗余', '25%，抗干扰强', '50%，自带位同步信息', '80%，编码简单'],
      answer: 2,
      explanation: '曼彻斯特编码在每个比特中间跳变，既表示数据又提供时钟同步，因此每个比特需两个信号周期，效率仅 50%。4B/5B 效率 80%，8B/10B 效率 80%，高速以太网常用后者以降低带宽开销。',
      tags: ['记忆', '高频']
    },
    {
      id: 'NET-030', module: 'network', topic: '传输介质', difficulty: 2,
      stem: '与多模光纤相比，单模光纤的特点是（ ）。',
      options: ['纤芯粗、可传多种模式，适合短距离传输', '传输距离比双绞线还短', '只能用于局域网内部布线', '纤芯细、只传一种模式，传输距离远但光源与接插件成本较高'],
      answer: 3,
      explanation: '单模光纤纤芯直径小（约 9μm），只允许一种模式传播，色散小、损耗低，配合激光光源可传输数十公里，用于骨干与长途；多模光纤纤芯粗（50/62.5μm），用 LED 光源，适合楼内短距离。',
      tags: ['概念']
    }
  ]);
})(window.RK);
