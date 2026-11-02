/* 计算机网络 —— 12 题 */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'NET-001', module: 'network', topic: '分层模型', difficulty: 1,
      stem: '路由器工作在 OSI 参考模型的（ ），交换机通常工作在（ ）。',
      options: ['网络层，数据链路层', '数据链路层，网络层', '传输层，网络层', '网络层，物理层'],
      answer: 0,
      explanation: '路由器根据 IP 地址转发，属网络层设备；交换机根据 MAC 地址转发，属数据链路层；集线器/中继器工作在物理层；网关可工作在高层。',
      tags: ['概念', '必背']
    },
    {
      id: 'NET-002', module: 'network', topic: '传输层', difficulty: 1,
      stem: '下列协议中，工作在传输层且提供可靠传输的是（ ）。',
      options: ['TCP', 'UDP', 'IP', 'ICMP'],
      answer: 0,
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
      options: ['30', '32', '14', '62'],
      answer: 0,
      explanation: '224 = 11100000，主机位剩 5 位，共 2⁵ = 32 个地址，扣除网络地址与广播地址，可用 30 个。掩码位数与前缀的换算要熟练。',
      tags: ['计算']
    },
    {
      id: 'NET-005', module: 'network', topic: 'IP 地址', difficulty: 1,
      stem: '下列地址中，属于私有地址的是（ ）。',
      options: ['192.168.10.5', '172.32.10.5', '11.0.0.1', '224.0.0.1'],
      answer: 0,
      explanation: '私有地址三段：10.0.0.0/8、172.16.0.0/12（172.16~172.31）、192.168.0.0/16。172.32.x.x 已超出 172.16~31 范围，属公网地址；224.0.0.1 为组播地址。',
      tags: ['概念', '易错']
    },
    {
      id: 'NET-006', module: 'network', topic: 'CIDR', difficulty: 3,
      stem: '将 192.168.0.0/24 与 192.168.1.0/24 进行路由聚合，结果是（ ）。',
      options: ['192.168.0.0/23', '192.168.0.0/22', '192.168.1.0/23', '192.168.0.0/25'],
      answer: 0,
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
      options: ['保证最后一个 ACK 能到达对方，并让旧连接的报文在网络中消失', '等待对方重新建立连接', '释放本地端口以便立即重用', '防止拥塞窗口过大'],
      answer: 0,
      explanation: '2MSL 有两个作用：一是若最后 ACK 丢失，可重发并再次收到对方的 FIN；二是让本次连接的残留报文在网络中超时消失，避免影响新连接。',
      tags: ['概念', '易错']
    },
    {
      id: 'NET-009', module: 'network', topic: 'TCP', difficulty: 2,
      stem: 'TCP 慢开始阶段，拥塞窗口的增长方式是（ ）。',
      options: ['每经过一个 RTT 翻倍（指数增长），直到达到慢开始门限', '每个 RTT 加 1（线性增长）', '始终保持 1 个报文段', '随机增长'],
      answer: 0,
      explanation: '慢开始：cwnd 从 1 开始，每经过一个 RTT 翻倍（指数增长），到达 ssthresh 后转入拥塞避免（每 RTT 加 1，线性增长）。发生超时则 ssthresh 减半、cwnd 重置为 1。',
      tags: ['概念', '高频']
    },
    {
      id: 'NET-010', module: 'network', topic: '应用层', difficulty: 1,
      stem: 'DNS 查询通常采用的传输层协议是（ ）。',
      options: ['UDP', 'TCP', 'ICMP', 'ARP'],
      answer: 0,
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
      options: ['距离向量算法', '链路状态算法', '最短路径优先算法', '路径向量算法'],
      answer: 0,
      explanation: 'RIP 基于距离向量（Bellman-Ford），以跳数为度量，15 跳为不可达；OSPF 基于链路状态（Dijkstra）；BGP 基于路径向量，用于自治系统之间。',
      tags: ['概念']
    }
  ]);
})(window.RK);
