/* 程序设计语言与编译原理 —— 25 题 */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'PL-001', module: 'programming-language', topic: '语言基础', difficulty: 1, points: ['programming-language|语言基础'],
      stem: '与解释方式相比，编译方式执行程序的特点是（ ）。',
      options: ['不需要生成目标代码', '执行效率高，但可移植性较差', '执行效率低，但可移植性好', '边翻译边执行，便于调试'],
      answer: 1,
      explanation: '编译方式先把源程序整体翻译为目标代码再执行，运行时无翻译开销，故效率高；但目标代码与平台相关，换平台需重新编译。解释方式逐句翻译执行，跨平台性好但效率低。',
      tags: ['概念', '高频']
    },
    {
      id: 'PL-002', module: 'programming-language', topic: '参数传递', difficulty: 2, points: ['programming-language|语言基础'],
      stem: '在 C 语言中定义 void swap(int a, int b)，调用 swap(x, y) 后 x、y 的值（ ）。',
      options: ['不变，因为形参是常量', '互换，因为 C 默认传引用', '不变，因为形参是实参的副本', '互换，因为传递的是地址'],
      answer: 2,
      explanation: 'C 语言默认按值传递，形参 a、b 是实参的副本，函数内交换不影响实参。若要交换需传指针（传地址）。这是"传值 vs 传地址"最经典的考法。',
      tags: ['概念', '易错']
    },
    {
      id: 'PL-003', module: 'programming-language', topic: '正规式', difficulty: 2, points: ['programming-language|文法与自动机'],
      stem: '正规式 (a|b)*abb 所描述的语言是（ ）。',
      options: ['由 a、b 组成且以 abb 开头的所有串', '只含 a、b 且长度为 3 的串', '由 a、b 组成且不含 abb 的串', '由 a、b 组成且以 abb 结尾的所有串'],
      answer: 3,
      explanation: '(a|b)* 表示任意个 a 或 b 的任意组合，后接固定的 abb，故该正规式描述"以 abb 结尾的 a、b 串"。正规式是词法分析中描述 token 的工具。',
      tags: ['概念']
    },
    {
      id: 'PL-004', module: 'programming-language', topic: '有限自动机', difficulty: 2, points: ['programming-language|文法与自动机'],
      stem: '关于确定的有限自动机（DFA），下列说法正确的是（ ）。',
      options: ['对每个状态和每个输入符号，最多有一条转移', '对每个状态和每个输入符号，可以有多条转移', '允许 ε 转移', 'DFA 不能识别正规集'],
      answer: 0,
      explanation: 'DFA 的"确定性"体现在：每个状态对每个输入符号至多一条出边，且不含 ε 转移。NFA 允许多条转移与 ε 转移。两者识别能力等价，都可识别正规集。',
      tags: ['概念', '易错']
    },
    {
      id: 'PL-005', module: 'programming-language', topic: '文法', difficulty: 2, points: ['programming-language|文法与自动机'],
      stem: '按乔姆斯基分类，程序设计语言的语法结构通常用（ ）描述。',
      options: ['短语文法（0 型）', '上下文无关文法（2 型）', '正规文法（3 型）', '上下文有关文法（1 型）'],
      answer: 1,
      explanation: '0 型短语文法 > 1 型上下文有关 > 2 型上下文无关 > 3 型正规文法。程序语言的语法（如 if、while 的嵌套结构）用上下文无关文法描述，词法则用正规文法/正规式。',
      tags: ['概念', '必背']
    },
    {
      id: 'PL-006', module: 'programming-language', topic: '表达式', difficulty: 2, points: ['programming-language|表达式与程序结构'],
      stem: '中缀表达式 a+b*(c-d) 对应的后缀表达式是（ ）。',
      options: ['abc-d*+', 'abcd*-+', 'abcd-*+', 'ab+cd-*'],
      answer: 2,
      explanation: '先算括号 c-d → cd-；再算 b*… → bcd-*；最后 a+… → abcd-*+。转后缀时运算符按优先级出栈，括号内优先。',
      tags: ['计算', '高频']
    },
    {
      id: 'PL-007', module: 'programming-language', topic: '表达式', difficulty: 1, points: ['programming-language|表达式与程序结构'],
      stem: '后缀表达式 3 4 + 5 * 的值为（ ）。',
      options: ['23', '27', '60', '35'],
      answer: 3,
      explanation: '从左到右扫描：3、4 入栈；遇 + 弹出 4 和 3 相加得 7 入栈；5 入栈；遇 * 弹出 5 和 7 相乘得 35。后缀表达式求值用栈即可完成。',
      tags: ['计算']
    },
    {
      id: 'PL-008', module: 'programming-language', topic: '编译过程', difficulty: 2, points: ['programming-language|编译过程'],
      stem: '检查"变量是否已声明""运算类型是否匹配"属于编译过程中（ ）阶段的任务。',
      options: ['语义分析', '词法分析', '语法分析', '代码优化'],
      answer: 0,
      explanation: '词法分析识别单词（token）；语法分析检查结构是否符合文法；语义分析进行静态语义检查，包括类型匹配、变量声明、作用域等。这是最常考的职责划分题。',
      tags: ['概念', '高频']
    },
    {
      id: 'PL-009', module: 'programming-language', topic: '中间代码', difficulty: 1, points: ['programming-language|编译过程'],
      stem: '下列不属于中间代码表示形式的是（ ）。',
      options: ['逆波兰式', '源代码注释', '四元式', '三元式'],
      answer: 1,
      explanation: '常见中间代码形式：四元式（运算符、操作数1、操作数2、结果）、三元式、逆波兰式（后缀式）、树形表示。注释不参与编译，显然不是中间代码。',
      tags: ['概念']
    },
    {
      id: 'PL-010', module: 'programming-language', topic: '语言基础', difficulty: 1, points: ['programming-language|语言基础'],
      stem: '下列语言中，属于静态类型（编译期进行类型检查）的是（ ）。',
      options: ['JavaScript', 'Ruby', 'Java', 'Python'],
      answer: 2,
      explanation: 'Java、C、C++ 为静态类型语言，变量类型在编译期确定并检查；Python、JavaScript、Ruby 为动态类型语言，类型在运行期确定。',
      tags: ['概念']
    },
    {
      id: 'PL-011', module: 'programming-language', topic: '参数传递', difficulty: 2, points: ['programming-language|语言基础'],
      stem: '若函数采用传地址（引用）方式传递参数，则（ ）。',
      options: ['形参是实参的副本，函数内修改不影响实参', '实参在函数调用时被复制两次', '只能在函数返回后同步修改实参', '形参与实参共享同一存储单元，函数内修改会影响实参'],
      answer: 3,
      explanation: '传地址（引用）把实参的地址传给形参，形参通过间接访问操作同一存储单元，函数内的修改直接作用于实参。传值方式下形参是副本，修改不会回传。C 语言要用指针显式实现传地址，C++ 用引用。',
      tags: ['概念', '高频']
    },
    {
      id: 'PL-012', module: 'programming-language', topic: '语言基础', difficulty: 1, points: ['programming-language|语言基础'],
      stem: '下列程序设计语言中，属于逻辑式语言的是（ ）。',
      options: ['Prolog', 'Lisp', 'Java', 'Pascal'],
      answer: 0,
      explanation: 'Prolog 是典型的逻辑式语言，以事实与规则、谓词逻辑和归结推理为基础；Lisp/Scheme 为函数式语言；Java 为面向对象语言；Pascal 为命令式（过程式）语言。',
      tags: ['记忆']
    },
    {
      id: 'PL-013', module: 'programming-language', topic: '语言基础', difficulty: 2, points: ['programming-language|语言基础'],
      stem: '若变量的作用域由程序文本的嵌套结构决定，与运行时调用顺序无关，则这种作用域规则称为（ ）。',
      options: ['类型推导', '静态作用域（词法作用域）', '动态作用域', '隐式声明'],
      answer: 1,
      explanation: '静态作用域在编译期由程序文本的嵌套层次确定变量可见范围（C、Java、Pascal 均采用）；动态作用域由运行时的调用链决定，同一变量可能因调用路径不同而绑定到不同实体。',
      tags: ['概念']
    },
    {
      id: 'PL-014', module: 'programming-language', topic: '语言基础', difficulty: 1, points: ['programming-language|语言基础'],
      stem: '关于编译程序与解释程序，下列说法正确的是（ ）。',
      options: ['解释程序先整体翻译再执行，效率更高', '编译程序逐句翻译，便于跨平台', '编译程序生成目标代码，解释程序不生成目标代码而直接执行', '两者都生成目标代码'],
      answer: 2,
      explanation: '编译程序把源程序整体翻译为目标代码，运行时无翻译开销，效率高但目标代码与平台相关；解释程序逐句翻译并立即执行，不生成独立目标代码，跨平台性好但效率低。',
      tags: ['概念']
    },
    {
      id: 'PL-015', module: 'programming-language', topic: '正规式', difficulty: 2, points: ['programming-language|文法与自动机'],
      stem: '正规式 a(a|b)* 所描述的语言是（ ）。',
      options: ['以 a 结尾、由 a 和 b 组成的任意串', '只含一个 a 的所有串', '长度至少为 2 的 a、b 串', '以 a 开头、由 a 和 b 组成的任意串'],
      answer: 3,
      explanation: 'a(a|b)* 表示首字符固定为 a，其后可以跟任意个 a 或 b，因此描述"以 a 开头"的全部串（包括单独的 a）。若要表达"以 a 结尾"应写 (a|b)*a。',
      tags: ['概念']
    },
    {
      id: 'PL-016', module: 'programming-language', topic: '有限自动机', difficulty: 2, points: ['programming-language|文法与自动机'],
      stem: '将非确定的有限自动机（NFA）转换为确定的有限自动机（DFA），常用的方法是（ ）。',
      options: ['子集构造法', '算符优先分析法', '递归下降分析法', 'LR 分析法'],
      answer: 0,
      explanation: '子集构造法把 NFA 中"从某状态出发经同一输入可达的状态集合"作为一个 DFA 状态，并处理 ε 闭包，从而消除非确定性与 ε 转移。其余三项属于语法分析方法。',
      tags: ['概念']
    },
    {
      id: 'PL-017', module: 'programming-language', topic: '文法', difficulty: 2, points: ['programming-language|文法与自动机'],
      stem: '若一个文法存在某个句子对应两棵不同的语法树，则该文法（ ）。',
      options: ['一定是正规文法', '是二义性的', '是上下文有关的', '无法生成任何句子'],
      answer: 1,
      explanation: '二义性指同一句子存在两棵不同的语法树（或两个不同的最左推导）。二义性文法无法唯一确定语义，通常需改写文法或增加优先级与结合性规则消除歧义；但存在无法消除二义性的上下文无关语言。',
      tags: ['概念', '易错']
    },
    {
      id: 'PL-018', module: 'programming-language', topic: '文法', difficulty: 3, points: ['programming-language|文法与自动机'],
      stem: '3 型文法（正规文法）的产生式形式为（ ）。',
      options: ['α → β，α 非空', 'S → ε 之外无限制', 'A → aB 或 A → a（右线性）', 'A → αBβ，α 非空'],
      answer: 2,
      explanation: '右线性文法产生式为 A→aB 或 A→a（A、B 为非终结符，a 为终结符），左线性为 A→Ba 或 A→a，二者等价于正规式与有限自动机。0 型为 α→β（α 非空），1 型为 αAβ→αγβ，2 型为 A→γ。',
      tags: ['记忆', '难点']
    },
    {
      id: 'PL-019', module: 'programming-language', topic: '编译过程', difficulty: 1, points: ['programming-language|编译过程'],
      stem: '词法分析阶段的输出是（ ）。',
      options: ['语法树', '四元式序列', '目标代码', '单词（token）序列'],
      answer: 3,
      explanation: '词法分析用正规式/有限自动机扫描字符流，识别出标识符、关键字、常数、运算符等 token 序列；语法分析据此构造语法树；语义分析后生成四元式等中间代码；最后由目标代码生成阶段产出机器指令。',
      tags: ['概念', '必背']
    },
    {
      id: 'PL-020', module: 'programming-language', topic: '编译过程', difficulty: 2, points: ['programming-language|编译过程'],
      stem: '编译过程中符号表的主要作用是（ ）。',
      options: ['记录标识符的类型、作用域、地址等信息，供各阶段查询与更新', '保存源程序的全部字符', '存放生成的目标代码', '记录语法树的结点编号'],
      answer: 0,
      explanation: '符号表贯穿编译全过程：词法分析时填入标识符，语法分析时检查使用是否合法，语义分析时填写类型与作用域，代码生成时提供地址信息。它也是查错与优化的依据。',
      tags: ['概念']
    },
    {
      id: 'PL-021', module: 'programming-language', topic: '中间代码', difficulty: 2, points: ['programming-language|编译过程'],
      stem: '把循环体内不随循环变量变化的表达式移到循环外计算，这种优化称为（ ）。',
      options: ['公共子表达式删除', '循环不变式外提', '强度削弱', '常量合并'],
      answer: 1,
      explanation: '循环优化包括不变式外提（把循环无关计算移出）、强度削弱（乘法换加法、乘 2 换移位）、删除归纳变量等；常量合并与公共子表达式删除属于基本块内的局部优化。',
      tags: ['概念']
    },
    {
      id: 'PL-022', module: 'programming-language', topic: '编译过程', difficulty: 2, points: ['programming-language|编译过程'],
      stem: '编译过程中，与具体硬件体系结构关系最密切的阶段是（ ）。',
      options: ['语法分析', '语义分析', '目标代码生成', '词法分析'],
      answer: 2,
      explanation: '目标代码生成需要依据目标机器的指令集、寄存器数量与寻址方式分配寄存器并选择指令，与硬件关系最密切。前三阶段主要依据源语言的词法、语法与语义规则，与具体机器基本无关。',
      tags: ['概念']
    },
    {
      id: 'PL-023', module: 'programming-language', topic: '表达式', difficulty: 3, points: ['programming-language|表达式与程序结构'],
      stem: '后缀表达式 3 4 5 * - 的值为（ ）。',
      options: ['17', '-7', '5', '-17'],
      answer: 3,
      explanation: '从左到右：3、4、5 依次入栈；遇 * 弹出 5 和 4 得 20 入栈；遇 - 弹出 20 和 3，计算 3-20 = -17。注意减法是"次栈顶 - 栈顶"，顺序写反会得到 +17。',
      tags: ['计算', '易错']
    },
    {
      id: 'PL-024', module: 'programming-language', topic: '表达式', difficulty: 3, points: ['programming-language|表达式与程序结构'],
      stem: '中缀表达式 a+b*(c-d) 对应的前缀（波兰式）表示为（ ）。',
      options: ['+ a * b - c d', 'a + b * c - d', '- + a * b c d', '+ a - b * c d'],
      answer: 0,
      explanation: '按"运算符在前、先高优先级后低优先级"改写：c-d → - c d；b*(…) → * b - c d；a+… → + a * b - c d。也可从中缀转后缀得 abcd-*+，再把后缀逆序并交换操作数位置得到前缀。',
      tags: ['计算', '高频']
    },
    {
      id: 'PL-025', module: 'programming-language', topic: '表达式', difficulty: 1, points: ['programming-language|表达式与程序结构'],
      stem: '把中缀表达式转换为后缀表达式时，栈主要用于（ ）。',
      options: ['记录表达式的长度', '暂存运算符与左括号，按优先级决定出栈顺序', '暂存操作数并直接输出', '保存最终结果'],
      answer: 1,
      explanation: '转换规则：操作数直接输出；运算符入栈前先弹出栈中优先级不低于它的运算符；遇右括号则连续出栈直到左括号。栈中只放运算符与括号，操作数不经过栈。',
      tags: ['概念']
    }
    ,
    {
      id: 'PL-036', module: 'programming-language', topic: 'Python基础', difficulty: 1, points: ['programming-language|语言基础'],
      stem: 'Python 中能正确定义单元素元组的语句是（ ）。',
      options: ['x = (1,)', 'x = (1)', 'x = [1]', 'x = {1}'],
      answer: 0,
      explanation: '单元素元组必须在元素后加逗号，(1) 只是带括号的整数；1,2 之类无括号的逗号表达式也是元组。',
      tags: ['概念', '易错']
    },
    {
      id: 'PL-037', module: 'programming-language', topic: 'Python异常', difficulty: 1, points: ['programming-language|语言基础'],
      stem: 'Python3 中合法的异常处理结构是（ ）。',
      options: ['try...catch...', 'try...except...finally', 'catch...finally', 'try...catch...finally'],
      answer: 1,
      explanation: 'Python 使用 try/except/else/finally，raise 主动抛出异常；catch 是 Java/C++ 的关键字，Python 中没有。',
      tags: ['概念', '易错']
    },
    {
      id: 'PL-038', module: 'programming-language', topic: 'Python切片', difficulty: 3, points: ['programming-language|表达式与程序结构'],
      stem: '表达式 list(range(11))[10:0:-2] 的值是（ ）。',
      options: ['[10,8,6,4,2,0]', '[10,9,8,7,6]', '[10,8,6,4,2]', '[0,2,4,6,8,10]'],
      answer: 2,
      explanation: '切片 [start:stop:step] 含头不含尾；step=-2 表示反向、每次减 2，从下标 10 取到下标 1（不含 0），故为 [10,8,6,4,2]。',
      tags: ['计算', '易错']
    },
    {
      id: 'PL-039', module: 'programming-language', topic: '程序语言成分', difficulty: 2, points: ['programming-language|语言基础'],
      stem: '程序设计语言的基本成分通常指（ ）。',
      options: ['变量、常量、函数、类', '编译、解释、汇编、链接', '顺序、选择、循环、GOTO', '数据、运算、控制、传输'],
      answer: 3,
      explanation: '语言基本成分分为数据成分、运算成分、控制成分和传输成分（函数调用、参数传递）；变量/函数是其具体实现，编译/解释属于语言处理而非语言成分。',
      tags: ['理解']
    },
    {
      id: 'PL-040', module: 'programming-language', topic: '编译与解释', difficulty: 1, points: ['programming-language|语言基础'],
      stem: '关于编译方式与解释方式，正确的是（ ）。',
      options: ['解释程序不生成独立目标代码，逐句翻译执行', '两者都生成独立目标代码', '编译程序逐句解释执行源程序', '解释方式的执行效率高于编译方式'],
      answer: 0,
      explanation: '编译生成可独立运行的目标代码，执行快但跨平台差；解释逐句翻译执行、不落盘，灵活可移植但效率低。真题常问"是否生成目标代码"。',
      tags: ['概念', '易错']
    },
    {
      id: 'PL-041', module: 'programming-language', topic: '语法分析', difficulty: 2, points: ['programming-language|编译过程'],
      stem: '编译过程中语法分析阶段主要使用的理论工具是（ ）。',
      options: ['正规式', '上下文无关文法', '谓词逻辑', '关系代数'],
      answer: 1,
      explanation: '词法分析用正规式与有限自动机（3 型文法），语法分析用上下文无关文法（2 型文法）；变量是否声明、类型是否匹配属语义分析。',
      tags: ['概念', '易错']
    },
    {
      id: 'PL-042', module: 'programming-language', topic: '运行时存储', difficulty: 2, points: ['programming-language|语言基础'],
      stem: 'C 语言函数调用时，局部变量与返回地址通常存放在（ ）。',
      options: ['静态存储区', '堆', '栈', '代码段'],
      answer: 2,
      explanation: '运行时存储分为静态区（全局/静态变量）、栈（活动记录、局部变量、返回地址）和堆（动态分配）；参数传递与作用域绑定都依赖栈帧展开。',
      tags: ['理解']
    }
  ]);
})(window.RK);
