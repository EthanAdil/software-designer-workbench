/* ==========================================================================
 * views-docs.js —— 备考文档：docs/ 下 18 篇备考 HTML 的汇总入口
 * 工作台自身文档（docs/平台开发/）不在此列，只在本页提示位置。
 * ========================================================================== */
(function (RK) {
  var U = RK.U;

  var GROUPS = [
    {
      name: '备考总纲',
      hint: '先读这两篇，定节奏和目标',
      layout: 'list',
      items: [
        {
          title: '00 · 考试情报与备考策略',
          desc: '考试结构、上午卷分值分布、目标分数、常见失败模式',
          path: 'docs/00-考试情报与备考策略.html'
        },
        {
          title: '01 · 学习总计划',
          desc: '四阶段 29 周排布、每周交付物、周复盘模板',
          path: 'docs/01-学习总计划.html'
        }
      ]
    },
    {
      name: '知识精要（11 篇）',
      hint: '11 篇覆盖 13 个模块：09 同时含信息安全 + 标准化与知识产权，10 同时含多媒体 + 专业英语',
      layout: 'grid',
      items: [
        {
          title: '01 · 计算机组成与体系结构',
          desc: '补码与浮点、流水线、Cache 映射、可靠性公式',
          path: 'docs/02-知识点精要/01-计算机组成与体系结构.html'
        },
        {
          title: '02 · 操作系统',
          desc: '进程状态、PV 操作、存储管理、文件与设备',
          path: 'docs/02-知识点精要/02-操作系统.html'
        },
        {
          title: '03 · 数据结构与算法',
          desc: '二叉树性质、排序对比、图算法、查找',
          path: 'docs/02-知识点精要/03-数据结构与算法.html'
        },
        {
          title: '04 · 程序设计语言与编译原理',
          desc: '编译五阶段、文法与自动机、表达式转换',
          path: 'docs/02-知识点精要/04-程序设计语言与编译原理.html'
        },
        {
          title: '05 · 软件工程',
          desc: '开发模型、耦合与内聚、测试与项目管理',
          path: 'docs/02-知识点精要/05-软件工程.html'
        },
        {
          title: '06 · 面向对象与 UML',
          desc: '类图五种关系、UML 图分类、23 种设计模式',
          path: 'docs/02-知识点精要/06-面向对象与UML.html'
        },
        {
          title: '07 · 数据库系统',
          desc: '三级模式、ER 转换、关系代数、范式与 SQL',
          path: 'docs/02-知识点精要/07-数据库系统.html'
        },
        {
          title: '08 · 计算机网络',
          desc: '分层协议、IP 与子网、TCP/UDP、应用层端口',
          path: 'docs/02-知识点精要/08-计算机网络.html'
        },
        {
          title: '09 · 信息安全与知识产权',
          desc: '密码学、认证体系、标准化、知识产权年限',
          path: 'docs/02-知识点精要/09-信息安全与知识产权.html'
        },
        {
          title: '10 · 多媒体与专业英语',
          desc: '容量计算、格式与压缩、专业英语应试策略',
          path: 'docs/02-知识点精要/10-多媒体与专业英语.html'
        },
        {
          title: '11 · 新技术应用',
          desc: '云计算服务模式、大数据 4V、机器学习分类、物联网与区块链',
          path: 'docs/02-知识点精要/11-新技术应用.html'
        }
      ]
    },
    {
      name: '专项与技巧',
      hint: '下午题模板与上午卷避坑',
      layout: 'list',
      items: [
        {
          title: '03 · 下午题专项攻略',
          desc: 'DFD / UML / 数据库 / 算法 / 代码填空五类题型模板',
          path: 'docs/03-下午题专项攻略.html'
        },
        {
          title: '04 · 答题技巧与避坑清单',
          desc: '时间分配、答题顺序、蒙题原则、易混对比',
          path: 'docs/04-答题技巧与避坑清单.html'
        }
      ]
    },
    {
      name: '工具模板',
      hint: '错题归档用',
      layout: 'list',
      items: [
        {
          title: '05 · 错题周次归档',
          desc: 'W1 起按周归档：分类记录、原因分析、知识点归纳、改进措施，含错因标签口径',
          path: 'docs/05-错题周次归档.html'
        }
      ]
    },
    {
      name: '周复盘',
      hint: '每周日填一次，数据来自「错题本 → 数据管理 → 导出备份」',
      layout: 'list',
      items: [
        {
          title: '06 · 周复盘',
          desc: '按 01 第六节模板记录的 W1 起每周复盘：任务、刷题、错题、自评与下周动作',
          path: 'docs/06-周复盘.html'
        }
      ]
    },
    {
      name: '真题来源',
      hint: '按年份 / 模块查看已入库真题与来源',
      layout: 'list',
      items: [
        {
          title: '07 · 历年真题来源与考点索引',
          desc: '已入库 12 套历年真题（344 题，含 4 套单源回忆版）的年份、来源链接、许可说明与考点对照',
          path: 'docs/07-历年真题来源与考点索引.html'
        }
      ]
    }
  ];

  function item(d) {
    return '<a class="doc-item" href="' + encodeURI(d.path) + '" target="_blank" rel="noopener">' +
      '<span class="doc-item-title">' + U.esc(d.title) + '</span>' +
      '<span class="doc-item-desc">' + U.esc(d.desc) + '</span></a>';
  }

  RK.router.add('docs', {
    title: '备考文档',
    sub: 'docs 下 18 篇备考文档的 HTML 版本，按主题分组，点击在新标签打开；工作台开发文档在 docs/平台开发/，不在此列',
    render: function () {
      var total = 0;
      GROUPS.forEach(function (g) { total += g.items.length; });

      var h = '<div class="card"><div class="card-head"><h2>文档总览</h2>' +
        '<span class="hint">共 ' + total + ' 篇 · UTF-8 HTML</span></div>' +
        '<p class="dim" style="margin:0;font-size:13px">建议顺序：00 情报 → 01 计划 → 02 精要（随学习进度）→ 03 / 04 专项与技巧 → 05 错题归档 → 06 周复盘（每周日）→ 07 真题来源（W27）。</p>' +
        '<div class="row-wrap mt-8" style="font-size:12px;color:var(--text-3)">' +
        '<span>Markdown 为源文件</span><span>·</span>' +
        '<span>修改后运行 <span class="mono">node tools/build-docs.js</span> 重新生成 HTML</span>' +
        '</div></div>';

      GROUPS.forEach(function (g) {
        h += '<div class="card mt-16"><div class="card-head"><h2>' + U.esc(g.name) + '</h2>' +
          '<span class="hint">' + U.esc(g.hint) + '</span></div>';
        h += g.layout === 'grid'
          ? '<div class="grid grid-2">' + g.items.map(item).join('') + '</div>'
          : '<div class="doc-list">' + g.items.map(item).join('') + '</div>';
        h += '</div>';
      });

      return h;
    }
  });
})(window.RK);
