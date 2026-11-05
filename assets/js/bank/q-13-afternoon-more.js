/* ==========================================================================
 * 下午卷（应用技术）案例题库 · 扩充包 —— 9 道，每题 15 分，自评模式
 * 与 q-11-afternoon.js 合计 24 道：dfd / uml / db / algo / java / cpp 各 4 道
 * ========================================================================== */
(function (RK) {
  RK.registerAfternoon([
    /* ------------------------------ DFD ------------------------------ */
    {
      id: 'AF-DFD-04', module: 'software-engineering', type: 'dfd', topic: '数据流图',
      title: '网上书店订单系统数据流图', points: 15,
      background:
        '某网上书店系统中：读者注册登录后浏览"图书库"，提交订单时系统先查"库存库"确认可发货数量，' +
        '再调用外部支付平台完成付款，付款成功后把订单写入"订单库"并扣减库存；' +
        '仓库管理员依据"订单库"发货并回填物流单号，读者收货后可对订单发表评价；' +
        '管理员维护"图书库"与"会员库"，并按月从"订单库"生成销售报表。',
      questions: [
        { q: '（1）指出该系统的全部外部实体。（4 分）', score: 4, answer: '读者、仓库管理员、管理员、外部支付平台。外部支付平台是系统之外、与本系统交换数据的外部系统，同样属于外部实体；不能因为它是软件就画成加工。' },
        { q: '（2）给出 0 层图（顶层分解）中至少 4 个加工，并写出各自的主要输入、输出数据流。（6 分）', score: 6, answer: '① 订单处理：输入"订单请求""库存查询结果"，输出"订单信息""付款请求"；② 支付处理：输入"付款请求""支付平台回执"，输出"支付结果""订单确认"；③ 发货处理：输入"订单信息"，输出"物流单号""发货通知"；④ 库存维护：输入"订单确认""入库单"，输出"库存更新"；⑤ 报表生成：输入"订单库查询"，输出"销售报表"。加工名应为动宾结构，且每个加工至少有一个输入流和一个输出流。' },
        { q: '（3）"付款成功"后系统为什么要同时写"订单库"和"库存库"？若把"库存扣减"画到顶层图之外，会违反什么原则？（5 分）', score: 5, answer: '付款成功是同一业务事务，必须同时生成订单（记录交易）与扣减库存（防止超卖），只写一处会造成数据不一致。库存扣减由系统内部加工完成，必须画在 DFD 内部；把它放到系统边界之外等于把内部数据存储/加工当成外部实体。子图与父图还要保持数据流平衡：跨越加工边界的输入、输出流集合必须与父图一致，子图内部允许增加局部数据流与局部存储。' }
      ],
      tips: ['外部实体还包括"外部支付平台"，漏答是本类题最常见的失分点。', '加工命名用"动词 + 名词"，不要写成"订单""库存"这类名词，那样实际是数据存储。', '父子图平衡必须写"输入流集合一致、输出流集合一致"两句。']
    },

    /* ------------------------------ UML ------------------------------ */
    {
      id: 'AF-UML-04', module: 'oo-uml', type: 'uml', topic: 'UML 建模',
      title: '在线支付系统的用例图与类图', points: 15,
      background:
        '某在线支付系统中，参与者"用户"执行用例"下单支付"；"下单支付"必须包含"身份认证"，' +
        '并可在满足条件时扩展"使用优惠券"。系统中有类：用户、订单、支付方式、支付记录；' +
        '支付方式有支付宝、微信支付、银行卡三种，三者的扣款流程不同但对外接口一致。' +
        '一个用户可有多个订单；一个订单在支付成功后生成且仅生成一条支付记录。',
      questions: [
        { q: '（1）说明 include 与 extend 的区别，并指出本题中哪些用例属于 include、哪些属于 extend，写出理由。（5 分）', score: 5, answer: 'include 是被包含用例必然执行、不可省略的公共行为，箭头由基用例指向被包含用例；extend 是在特定条件（扩展点）下才发生的可选行为，箭头由扩展用例指向基用例。本题"下单支付" include "身份认证"（每次支付都必须验身份），"使用优惠券" extend "下单支付"（仅当用户持有且满足门槛时执行）。' },
        { q: '（2）"支付方式"及其三种具体实现应如何建模？说明关系类型与多重度。（5 分）', score: 5, answer: '把"支付方式"建模为抽象类（或接口），定义抽象方法 pay(金额)；支付宝、微信支付、银行卡与它是泛化（generalization，空心三角实线）关系，各自重写 pay。泛化不写多重度（是 is-a 关系，不是关联）。用户与订单是 1 : 0..* 的关联；订单与支付记录是 1 : 0..1 或 1 : 1 的关联。' },
        { q: '（3）为什么"支付记录"要独立成类，而不能只作为"订单"的一个属性？说明该设计对应的类图关系。（5 分）', score: 5, answer: '支付记录有自身的多值属性（支付流水号、渠道、金额、时间、第三方回执、状态）和独立生命周期，且退款、对账都围绕它展开；若压成订单的一个属性会产生多值/复合属性，违反第一范式，也无法记录一次订单多次支付尝试。订单与支付记录是关联关系（可进一步用组合强调强生命周期依赖），多重度 1 : 0..1。' }
      ],
      tips: ['include 箭头指向"被包含"，extend 箭头指向"被扩展"，方向画反直接扣分。', '泛化（is-a）不要标多重度，多重度只用于关联。', '答"独立成类"必须落到"属性多值 / 生命周期 / 范式"其中一条理由。']
    },

    /* ------------------------------ 数据库设计 ------------------------------ */
    {
      id: 'AF-DB-04', module: 'database', type: 'db', topic: '数据库设计',
      title: '电商订单数据库设计', points: 15,
      background:
        '某电商系统有：客户(客户号, 姓名, 手机号)、商品(商品号, 名称, 单价, 库存量)、' +
        '订单(订单号, 客户号, 下单日期, 状态)、订单明细(订单号, 商品号, 数量, 成交单价)。' +
        '一个订单可包含多种商品，一种商品可出现在多个订单中；下单时需扣减对应商品的库存量。' +
        '商品调价后，历史订单仍须按当时的成交价结算。',
      questions: [
        { q: '（1）写出各关系模式的主键与外键，并说明"成交单价"为何必须保存在订单明细中。（6 分）', score: 6, answer: '客户(客户号 PK)；商品(商品号 PK)；订单(订单号 PK, 客户号 FK→客户)；订单明细(订单号 PK+FK→订单, 商品号 PK+FK→商品, 数量, 成交单价)。订单与商品是带属性的 m:n 联系，必须独立成表，主键为两端主键组合。成交单价是成交当时的历史价格，会随商品调价变化；若只存商品表单价，历史订单金额会被改写，导致结算与对账错误，因此属于有意保留的、业务上必要的冗余。' },
        { q: '（2）用 SQL 查询"订单明细金额合计不低于 1000 元"的客户号、客户姓名与合计金额，按合计金额降序排列。（5 分）', score: 5, answer: 'SELECT o.客户号, c.姓名, SUM(d.数量 * d.成交单价) AS 合计金额 FROM 订单 o JOIN 客户 c ON o.客户号 = c.客户号 JOIN 订单明细 d ON o.订单号 = d.订单号 GROUP BY o.客户号, c.姓名 HAVING SUM(d.数量 * d.成交单价) >= 1000 ORDER BY 合计金额 DESC;' },
        { q: '（3）下单时"写订单明细"与"扣减库存"应如何保证一致性？说明并发下可能出现的两类问题及应对措施。（4 分）', score: 4, answer: '两步必须放在同一事务中，要么全部提交要么全部回滚（原子性），并由事务的隔离性避免并发干扰。典型问题：① 丢失更新——两个事务同时读同一库存再写回，后写覆盖先写；② 超卖/读脏数据——读到未提交的扣减结果。措施：对库存行加排他锁（SELECT … FOR UPDATE）或使用带条件的原子更新（UPDATE 商品 SET 库存量 = 库存量 - ? WHERE 商品号 = ? AND 库存量 >= ?），并配合唯一约束与合理隔离级别。' }
      ],
      tips: ['订单明细的主键是 (订单号, 商品号) 组合，写单主键失分。', '聚合条件必须用 HAVING，不能写 WHERE；GROUP BY 要带上 SELECT 中的非聚合列。', '"历史价格"这类冗余是有意设计，答题要写清"防止历史金额被改写"。']
    },

    /* ------------------------------ 算法设计（分治） ------------------------------ */
    {
      id: 'AF-ALG-04', module: 'ds-algorithm', type: 'algo', topic: '分治',
      title: '分治法统计数组逆序对', points: 15,
      background:
        '数组 a[0..n-1] 中的逆序对是指满足 i < j 且 a[i] > a[j] 的二元组 (i, j)。' +
        '采用分治法：把数组均分两半，分别递归排序并统计各半内部的逆序对；' +
        '在合并两个有序子序列时，若 a[i] <= a[j] 则取左半元素，否则说明左半中从 i 到 mid 的元素都大于 a[j]，' +
        '一次性累加跨越两半的逆序对。\n\n' +
        '参考代码（C 语言）：\n' +
        'int mergeCount(int a[], int tmp[], int left, int mid, int right) {\n' +
        '    int i = left, j = mid + 1, k = left, cnt = 0;\n' +
        '    while (i <= mid && j <= right) {\n' +
        '        if (a[i] <= a[j]) tmp[k++] = a[i++];\n' +
        '        else { cnt += ______(1)______; tmp[k++] = a[j++]; }\n' +
        '    }\n' +
        '    while (i <= mid) tmp[k++] = a[i++];\n' +
        '    while (j <= right) tmp[k++] = a[j++];\n' +
        '    for (i = left; i <= right; i++) a[i] = tmp[i];\n' +
        '    return cnt;\n' +
        '}',
      questions: [
        { q: '（1）写出 (1) 处应填的表达式，并说明为什么是这个值。（6 分）', score: 6, answer: '填 mid - i + 1。因为左半 a[left..mid] 已经有序，当 a[i] > a[j] 时，a[i..mid] 全部大于 a[j]，且它们在原数组中的下标都小于 j，所以与 a[j] 构成逆序对的元素恰有 mid - i + 1 个，可以一次累加而不必逐个比较。' },
        { q: '（2）写出该算法的时间复杂度与空间复杂度，并说明比较时为何用 <= 而不是 <。（5 分）', score: 5, answer: '时间复杂度 O(n log n)（递推 T(n)=2T(n/2)+O(n)），空间复杂度 O(n)（辅助数组 tmp；递归栈另需 O(log n)）。用 <= 保证相等元素优先取左半：相等元素不构成逆序对（要求严格大于），同时也使归并排序保持稳定；若写成 <，相等时会走 else 分支，错误地累加 mid-i+1 个逆序对。' },
        { q: '（3）对数组 [3, 1, 2] 求逆序对数量，并写出分治过程的关键步骤。（4 分）', score: 4, answer: '共 2 个：(3,1)、(3,2)。mid=1，左半 a[0..1]=[3,1] 递归：其左右各为 [3]、[1]，合并时 3 > 1，累加 mid-i+1 = 1 个，得到有序 [1,3]；右半 [2] 返回 0。顶层合并 [1,3] 与 [2]：1 <= 2 取 1；接着 3 > 2，累加 1-1+1 = 1 个；合计 1 + 0 + 1 = 2。' }
      ],
      tips: ['分治统计逆序对的关键是"有序子序列 + 一次累加 mid-i+1"，不要写成逐个比较。', '复杂度写 O(n log n)，空间 O(n)，别漏辅助数组与递归栈。', '相等元素不算逆序对，<= 同时保证排序稳定性。']
    },

    /* ------------------------------ Java ------------------------------ */
    {
      id: 'AF-JAVA-03', module: 'oo-uml', type: 'java', topic: '设计模式代码',
      title: '工厂方法模式：日志器创建', points: 15,
      background:
        '某系统需要把日志写到文件或控制台，且未来可能新增"远程日志"。' +
        '采用工厂方法模式，使客户端只依赖抽象接口（Java）：\n\n' +
        'interface Logger { void log(String msg); }\n' +
        'class FileLogger implements Logger { public void log(String msg) { /* 写文件 */ } }\n' +
        'class ConsoleLogger implements Logger { public void log(String msg) { /* 输出控制台 */ } }\n\n' +
        'interface LoggerFactory { Logger create(); }\n' +
        'class FileLoggerFactory implements LoggerFactory {\n' +
        '    public ______(1)______ create() { return new ______(2)______(); }\n' +
        '}\n\n' +
        'class App {\n' +
        '    public static void main(String[] args) {\n' +
        '        LoggerFactory f = new FileLoggerFactory();\n' +
        '        Logger log = ______(3)______;\n' +
        '        log.log("start");\n' +
        '    }\n' +
        '}',
      questions: [
        { q: '（1）写出 (1)、(2)、(3) 处的代码。（6 分）', score: 6, answer: '(1) Logger\n(2) FileLogger\n(3) f.create()\n工厂方法的返回类型必须声明为抽象接口 Logger，不能写具体类 FileLogger，否则客户端会依赖实现。' },
        { q: '（2）与"简单工厂（一个工厂类用 switch 按参数创建）"相比，工厂方法模式的优势是什么？（5 分）', score: 5, answer: '简单工厂在新增产品时必须修改工厂类的分支判断，违反开闭原则；工厂方法把创建延迟到子类，新增"远程日志"只需新增 RemoteLogger 与 RemoteLoggerFactory 两个类，客户端与已有工厂代码均不改。同时每种产品的创建逻辑内聚在各自工厂中，避免工厂类随产品数量膨胀。' },
        { q: '（3）指出该设计体现的两条面向对象设计原则，并说明客户端依赖的是抽象还是具体类。（4 分）', score: 4, answer: '① 开闭原则：对扩展开放（新增产品与工厂）、对修改关闭；② 依赖倒置原则：App 只依赖抽象 Logger 与 LoggerFactory，不依赖 FileLogger 等具体类。若答"单一职责"需说明每个工厂只负责一种产品的创建。' }
      ],
      tips: ['填空 (1) 的返回类型写 Logger 接口，写具体类会丢掉多态意义。', '开闭原则题要写清"新增什么、不需要改什么"。', '工厂方法 = 一个产品对应一个工厂；抽象工厂 = 一个工厂生产一族产品，别混。']
    },
    {
      id: 'AF-JAVA-04', module: 'oo-uml', type: 'java', topic: '设计模式代码',
      title: '装饰器模式：数据流增强', points: 15,
      background:
        '某系统写数据时，需要在不改变原有文件写入类的前提下，按需叠加"加密"与"压缩"功能，' +
        '并支持多层组合。采用装饰器模式实现（Java）：\n\n' +
        'interface DataSource { void write(String data); }\n' +
        'class FileDataSource implements DataSource {\n' +
        '    public void write(String data) { /* 写文件 */ }\n' +
        '}\n\n' +
        'abstract class DataSourceDecorator implements DataSource {\n' +
        '    protected ______(1)______ wrappee;\n' +
        '    public DataSourceDecorator(DataSource wrappee) { this.wrappee = wrappee; }\n' +
        '    public void write(String data) { ______(2)______; }\n' +
        '}\n\n' +
        'class EncryptDecorator extends DataSourceDecorator {\n' +
        '    public EncryptDecorator(DataSource d) { ______(3)______; }\n' +
        '    public void write(String data) { super.write(encrypt(data)); }\n' +
        '    private String encrypt(String s) { /* 加密 */ return s; }\n' +
        '}',
      questions: [
        { q: '（1）写出 (1)、(2)、(3) 处的代码。（6 分）', score: 6, answer: '(1) DataSource\n(2) wrappee.write(data)\n(3) super(d)\n抽象装饰类必须实现被包装接口并持有该接口类型的引用，才能保证装饰后的对象仍是 DataSource，可继续被下一层包装。' },
        { q: '（2）与"用继承为每种组合派生子类"相比，装饰器模式的优势是什么？（5 分）', score: 5, answer: '功能组合由运行时对象嵌套决定，可任意叠加与调整顺序（先加密再压缩、或反之），新增一种增强只需新增一个装饰类；用继承则要为每个组合派生子类（FileEncrypt、FileCompress、FileEncryptCompress …），造成类爆炸，且组合顺序在编译期写死。装饰器同样满足开闭原则与合成复用原则。' },
        { q: '（3）抽象装饰类 DataSourceDecorator 为什么要"既实现 DataSource 又持有 DataSource"？（4 分）', score: 4, answer: '实现接口保证装饰者与被装饰者类型一致（透明性），客户端无需区分拿到的是原始对象还是装饰后的对象；持有接口引用则把请求转发给被包装对象，形成一条可无限延伸的调用链，具体装饰类只需在转发前后加入自己的增强逻辑。' }
      ],
      tips: ['填空 (2) 必须是转发调用 wrappee.write(data)，不是递归调用 this.write(data)。', '答"类爆炸 + 运行时组合 + 顺序可调"三点。', '装饰器与适配器区别：装饰器不改变接口、只加职责；适配器是转换接口。']
    },

    /* ------------------------------ C++ ------------------------------ */
    {
      id: 'AF-CPP-02', module: 'oo-uml', type: 'cpp', topic: '设计模式代码',
      title: '单例模式：全局配置对象', points: 15,
      background:
        '系统需要一个全局唯一的配置对象。采用单例模式实现（C++）：\n\n' +
        'class Config {\n' +
        'private:\n' +
        '    Config() {}\n' +
        '    static Config* instance;\n' +
        'public:\n' +
        '    static Config* getInstance() {\n' +
        '        if (______(1)______ == NULL) instance = new Config();\n' +
        '        return ______(2)______;\n' +
        '    }\n' +
        '    void set(const std::string& k, const std::string& v) { /* 保存配置 */ }\n' +
        '};\n' +
        '______(3)______;',
      questions: [
        { q: '（1）写出 (1)、(2)、(3) 处的代码。（6 分）', score: 6, answer: '(1) instance\n(2) instance\n(3) Config* Config::instance = NULL;\n静态数据成员在类内只是声明，必须在类外（.cpp 中）定义并初始化一次，否则链接时报未定义符号。' },
        { q: '（2）构造函数为什么要私有？上述懒汉式实现在多线程下有什么问题，如何改进？（5 分）', score: 5, answer: '私有构造函数禁止外部 new，保证全局只有一个实例，创建入口统一由 getInstance 控制。问题：if 判空与 new 不是原子操作，两个线程可能同时进入，创建出多个实例或产生内存泄漏。改进：① C++11 起用函数内局部静态对象（static Config inst; return &inst;），语言保证初始化线程安全；② 双重检查锁定并配 mutex/atomic；③ 饿汉式在程序启动时即初始化。' },
        { q: '（3）说明单例模式的两个主要缺点，并指出还应禁用哪些成员函数。（4 分）', score: 4, answer: '缺点：① 引入全局状态，模块间产生隐藏耦合，单元测试难以替换与隔离；② 生命周期与销毁顺序不受控，多线程/动态库场景易出问题；此外单例职责容易膨胀。还应把拷贝构造函数与赋值运算符声明为私有或 = delete，防止通过拷贝产生第二个实例。' }
      ],
      tips: ['(3) 是静态成员的"类外定义"，写成 static Config* ... 或漏写 Config:: 都不得分。', '多线程题要点出"判空与创建非原子"，改进写 C++11 局部静态最简。', '别忘拷贝构造与赋值也要禁用，这是单例真题的高频追问。']
    },
    {
      id: 'AF-CPP-03', module: 'oo-uml', type: 'cpp', topic: '设计模式代码',
      title: '适配器模式：复用旧打印接口', points: 15,
      background:
        '新系统统一通过抽象接口 NewPrinter 打印，但已有旧类 OldPrinter 只提供 printText 方法，' +
        '且旧类源码不可修改。采用适配器模式复用旧类（C++）：\n\n' +
        'class OldPrinter {\n' +
        'public:\n' +
        '    void printText(const std::string& s) { /* 旧接口 */ }\n' +
        '};\n\n' +
        'class NewPrinter {\n' +
        'public:\n' +
        '    virtual void print(const std::string& s) = 0;\n' +
        '    virtual ~NewPrinter() {}\n' +
        '};\n\n' +
        'class PrinterAdapter : ______(1)______ {\n' +
        'private:\n' +
        '    OldPrinter* old;\n' +
        'public:\n' +
        '    PrinterAdapter(OldPrinter* p) : old(p) {}\n' +
        '    void ______(2)______(const std::string& s) {\n' +
        '        ______(3)______;\n' +
        '    }\n' +
        '};',
      questions: [
        { q: '（1）写出 (1)、(2)、(3) 处的代码。（6 分）', score: 6, answer: '(1) public NewPrinter\n(2) print\n(3) old->printText(s);\n适配器必须公有继承目标接口，才能被当作 NewPrinter* 使用；重写纯虚函数 print 后把调用转换为旧接口 printText。' },
        { q: '（2）类适配器与对象适配器有何区别？本题属于哪一种，优势是什么？（5 分）', score: 5, answer: '类适配器用多继承同时继承目标接口与被适配类，编译期静态绑定，要求被适配类可继承且不能适配其子类；对象适配器用组合持有被适配对象，运行期转发。本题属于对象适配器：只需一个 OldPrinter 指针，不依赖其继承体系，可适配 OldPrinter 及其派生类，耦合更低，也更符合合成复用原则。' },
        { q: '（3）简述适配器与装饰器、代理模式在意图上的区别。（4 分）', score: 4, answer: '适配器是"转换接口"，让原本接口不兼容的类能协同工作，接口会变；装饰器是"增加职责"，接口不变、可多层嵌套；代理是"控制访问"，接口不变，用于延迟加载、权限校验、远程访问等。三者结构相似（都持有引用并转发），判题看意图而不是类图。' }
      ],
      tips: ['(1) 必须写 public 继承，C++ 缺省是 private 继承，会导致无法向上转型。', '对象适配器 = 组合，类适配器 = 多继承，答题先定性再给理由。', '三者结构像，区别只在"换接口 / 加职责 / 控访问"。']
    },
    {
      id: 'AF-CPP-04', module: 'oo-uml', type: 'cpp', topic: '设计模式代码',
      title: '虚函数与运行时多态：排序策略', points: 15,
      background:
        '某系统运行时切换快速排序与归并排序，把排序算法抽象为策略（C++）：\n\n' +
        'class SortStrategy {\n' +
        'public:\n' +
        '    virtual void sort(int* a, int n) = 0;\n' +
        '    virtual ______(1)______ {}\n' +
        '};\n\n' +
        'class QuickSort : ______(2)______ SortStrategy {\n' +
        'public:\n' +
        '    void sort(int* a, int n) { /* 快速排序 */ }\n' +
        '};\n\n' +
        'class Sorter {\n' +
        'private:\n' +
        '    SortStrategy* strategy;\n' +
        'public:\n' +
        '    Sorter(SortStrategy* s) : strategy(s) {}\n' +
        '    void doSort(int* a, int n) { ______(3)______; }\n' +
        '};',
      questions: [
        { q: '（1）写出 (1)、(2)、(3) 处的代码。（6 分）', score: 6, answer: '(1) ~SortStrategy()\n(2) public\n(3) strategy->sort(a, n);\n(1) 是虚析构函数；(2) 必须是 public 继承才能通过基类指针使用派生类；(3) 通过基类指针调用虚函数，触发动态绑定。' },
        { q: '（2）为什么含有虚函数的基类必须把析构函数声明为 virtual？不这样做会有什么后果？（5 分）', score: 5, answer: '当通过基类指针删除派生类对象（delete SortStrategy* 实际指向 QuickSort）时，若析构非虚，则只调用基类析构函数，派生类部分不被析构，其持有的内存、句柄等资源泄漏，C++ 标准中还属于未定义行为。虚析构保证析构调用沿虚函数表从派生类到基类逐级完成。' },
        { q: '（3）写出实现运行时多态的三个必要条件，并指出该设计体现的设计原则。（4 分）', score: 4, answer: '条件：① 存在继承关系；② 派生类重写基类的虚函数（函数签名一致）；③ 通过基类指针或引用调用该虚函数。该设计体现开闭原则（新增算法只需新增策略类）与依赖倒置原则（Sorter 依赖抽象 SortStrategy，不依赖具体算法），即策略模式。' }
      ],
      tips: ['(1) 填的是虚析构 ~SortStrategy()，不是普通析构，也不是纯虚。', '"通过基类指针 delete 派生对象"是虚析构题的标准答题场景。', '多态三条件缺一不可，尤其别漏"基类指针/引用调用"。']
    }
  ]);
})(window.RK);
