/* 程序设计语言与编译原理 —— 10 题 */
(function (RK) {
  RK.registerQuestions([
    {
      id: 'PL-001', module: 'programming-language', topic: '语言基础', difficulty: 1,
      stem: '与解释方式相比，编译方式执行程序的特点是（ ）。',
      options: ['执行效率高，但可移植性较差', '执行效率低，但可移植性好', '边翻译边执行，便于调试', '不需要生成目标代码'],
      answer: 0,
      explanation: '编译方式先把源程序整体翻译为目标代码再执行，运行时无翻译开销，故效率高；但目标代码与平台相关，换平台需重新编译。解释方式逐句翻译执行，跨平台性好但效率低。',
      tags: ['概念', '高频']
    },
    {
      id: 'PL-002', module: 'programming-language', topic: '参数传递', difficulty: 2,
      stem: '在 C 语言中定义 void swap(int a, int b)，调用 swap(x, y) 后 x、y 的值（ ）。',
      options: ['不变，因为形参是实参的副本', '互换，因为传递的是地址', '不变，因为形参是常量', '互换，因为 C 默认传引用'],
      answer: 0,
      explanation: 'C 语言默认按值传递，形参 a、b 是实参的副本，函数内交换不影响实参。若要交换需传指针（传地址）。这是"传值 vs 传地址"最经典的考法。',
      tags: ['概念', '易错']
    },
    {
      id: 'PL-003', module: 'programming-language', topic: '正规式', difficulty: 2,
      stem: '正规式 (a|b)*abb 所描述的语言是（ ）。',
      options: ['由 a、b 组成且以 abb 结尾的所有串', '由 a、b 组成且以 abb 开头的所有串', '只含 a、b 且长度为 3 的串', '由 a、b 组成且不含 abb 的串'],
      answer: 0,
      explanation: '(a|b)* 表示任意个 a 或 b 的任意组合，后接固定的 abb，故该正规式描述"以 abb 结尾的 a、b 串"。正规式是词法分析中描述 token 的工具。',
      tags: ['概念']
    },
    {
      id: 'PL-004', module: 'programming-language', topic: '有限自动机', difficulty: 2,
      stem: '关于确定的有限自动机（DFA），下列说法正确的是（ ）。',
      options: ['对每个状态和每个输入符号，最多有一条转移', '对每个状态和每个输入符号，可以有多条转移', '允许 ε 转移', 'DFA 不能识别正规集'],
      answer: 0,
      explanation: 'DFA 的"确定性"体现在：每个状态对每个输入符号至多一条出边，且不含 ε 转移。NFA 允许多条转移与 ε 转移。两者识别能力等价，都可识别正规集。',
      tags: ['概念', '易错']
    },
    {
      id: 'PL-005', module: 'programming-language', topic: '文法', difficulty: 2,
      stem: '按乔姆斯基分类，程序设计语言的语法结构通常用（ ）描述。',
      options: ['上下文无关文法（2 型）', '正规文法（3 型）', '上下文有关文法（1 型）', '短语文法（0 型）'],
      answer: 0,
      explanation: '0 型短语文法 > 1 型上下文有关 > 2 型上下文无关 > 3 型正规文法。程序语言的语法（如 if、while 的嵌套结构）用上下文无关文法描述，词法则用正规文法/正规式。',
      tags: ['概念', '必背']
    },
    {
      id: 'PL-006', module: 'programming-language', topic: '表达式', difficulty: 2,
      stem: '中缀表达式 a+b*(c-d) 对应的后缀表达式是（ ）。',
      options: ['abcd-*+', 'ab+cd-*', 'abc-d*+', 'abcd*-+'],
      answer: 0,
      explanation: '先算括号 c-d → cd-；再算 b*… → bcd-*；最后 a+… → abcd-*+。转后缀时运算符按优先级出栈，括号内优先。',
      tags: ['计算', '高频']
    },
    {
      id: 'PL-007', module: 'programming-language', topic: '表达式', difficulty: 1,
      stem: '后缀表达式 3 4 + 5 * 的值为（ ）。',
      options: ['35', '23', '27', '60'],
      answer: 0,
      explanation: '从左到右扫描：3、4 入栈；遇 + 弹出 4 和 3 相加得 7 入栈；5 入栈；遇 * 弹出 5 和 7 相乘得 35。后缀表达式求值用栈即可完成。',
      tags: ['计算']
    },
    {
      id: 'PL-008', module: 'programming-language', topic: '编译过程', difficulty: 2,
      stem: '检查"变量是否已声明""运算类型是否匹配"属于编译过程中（ ）阶段的任务。',
      options: ['语义分析', '词法分析', '语法分析', '代码优化'],
      answer: 0,
      explanation: '词法分析识别单词（token）；语法分析检查结构是否符合文法；语义分析进行静态语义检查，包括类型匹配、变量声明、作用域等。这是最常考的职责划分题。',
      tags: ['概念', '高频']
    },
    {
      id: 'PL-009', module: 'programming-language', topic: '中间代码', difficulty: 1,
      stem: '下列不属于中间代码表示形式的是（ ）。',
      options: ['源代码注释', '四元式', '三元式', '逆波兰式'],
      answer: 0,
      explanation: '常见中间代码形式：四元式（运算符、操作数1、操作数2、结果）、三元式、逆波兰式（后缀式）、树形表示。注释不参与编译，显然不是中间代码。',
      tags: ['概念']
    },
    {
      id: 'PL-010', module: 'programming-language', topic: '语言基础', difficulty: 1,
      stem: '下列语言中，属于静态类型（编译期进行类型检查）的是（ ）。',
      options: ['Java', 'Python', 'JavaScript', 'Ruby'],
      answer: 0,
      explanation: 'Java、C、C++ 为静态类型语言，变量类型在编译期确定并检查；Python、JavaScript、Ruby 为动态类型语言，类型在运行期确定。',
      tags: ['概念']
    }
  ]);
})(window.RK);
