/* ==========================================================================
 * views-review.js —— 错题本 + 成绩分析
 * ========================================================================== */
(function (RK) {
  var U = RK.U;
  var LETTERS = U.letters;

  /* 导出/模板字段：与 docs/05-个人错题本模板 的前五列保持一致，后面是自动附带的元信息 */
  var CSV_COLUMNS = ['题号', '题目', '我的答案', '正确答案', '错因', '一句话结论', '模块', '考点', '错误次数', '状态', '最近错误时间'];
  var TEMPLATE_COLUMNS = ['题号', '题目', '我的答案', '正确答案', '错因', '一句话结论'];
  var TEMPLATE_EXAMPLE = ['CS-001', '8 位补码的表示范围', 'B（-127 ~ +127）', 'A（-128 ~ +127）', '公式记错',
    '补码负端比正端多一个 -2^(n-1)：先写 -2^(n-1) ~ 2^(n-1)-1，再代入 n=8'];

  /* CSV 单元格统一加引号并转义，避免逗号、引号、换行破坏列 */
  function csvCell(v) {
    return '"' + String(v === undefined || v === null ? '' : v).replace(/"/g, '""') + '"';
  }

  function optionText(q, order, idx, text) {
    /* 有作答时保存的文本就优先用它，选项重排后仍能显示当时选的内容 */
    if (text !== undefined && text !== null && text !== '') {
      var letter = (idx === undefined || idx === null || idx < 0) ? '' : LETTERS[idx] + '. ';
      return letter + text;
    }
    if (idx === undefined || idx === null || idx < 0) return '';
    var opt = q.options[order ? order[idx] : idx];
    if (opt === undefined) return '';
    return LETTERS[idx] + '. ' + opt;
  }

  /* 每题的错因下拉 + 一句话结论输入；值直接落在 wrong 记录上 */
  function noteRow(qid, info) {
    var cause = info.cause || '';
    var opts = '<option value="">未归因</option>';
    RK.CAUSES.forEach(function (c) {
      opts += '<option value="' + U.esc(c) + '"' + (cause === c ? ' selected' : '') + '>' + U.esc(c) + '</option>';
    });
    return '<div class="note-row">' +
      '<label class="note-field"><span class="note-label">错因</span>' +
      '<select data-note="cause" data-qid="' + U.esc(qid) + '">' + opts + '</select></label>' +
      '<label class="note-field"><span class="note-label">一句话结论</span>' +
      '<input type="text" data-note="conclusion" data-qid="' + U.esc(qid) + '" maxlength="80" ' +
      'placeholder="下次怎么做？如：先写满 n 位再换算" value="' + U.esc(info.conclusion || '') + '" /></label>' +
      '</div>';
  }

  function copyText(text, okMsg) {
    /* 先用同步 execCommand，file:// 与旧浏览器也能立刻给出反馈；失败再试剪贴板 API */
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    if (ok) { RK.toast(okMsg); return; }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { RK.toast(okMsg); },
        function () { RK.toast('复制失败，请手动选中表格文本'); });
    } else {
      RK.toast('复制失败，请手动选中表格文本');
    }
  }

  /* 导出期间禁用按钮并显示进度，避免连点导出两份 */
  function withLoading(btn, busyText, done) {
    if (!btn || btn.getAttribute('data-busy') === '1') return;
    var old = btn.textContent;
    btn.setAttribute('data-busy', '1');
    btn.disabled = true;
    btn.textContent = busyText;
    setTimeout(function () {
      try { done(); } finally {
        btn.textContent = old;
        btn.disabled = false;
        btn.removeAttribute('data-busy');
      }
    }, 260);
  }

  function exportRows() {
    var wrong = RK.record.wrongAll();
    var ids = Object.keys(wrong).sort(function (a, b) {
      var ra = wrong[a].resolved ? 1 : 0;
      var rb = wrong[b].resolved ? 1 : 0;
      if (ra !== rb) return ra - rb;          /* 待攻克在前 */
      return (wrong[b].ts || 0) - (wrong[a].ts || 0); /* 组内最近错误优先 */
    });
    var rows = [];
    ids.forEach(function (id) {
      var q = RK.getQuestion(id);
      var info = wrong[id];
      if (!q) return;
      var order = (info.order && info.order.length === q.options.length) ? info.order : null;
      var answerIdx = order ? order.indexOf(q.answer) : q.answer;
      rows.push([
        q.id,
        q.stem,
        optionText(q, order, info.choice, info.choiceText),
        optionText(q, order, answerIdx),
        info.cause || '未归因',
        info.conclusion || '未填写',
        RK.moduleName(q.module),
        q.topic || '',
        info.count || 0,
        info.resolved ? '已掌握' : '待攻克',
        info.ts ? U.fmtDateTime(info.ts) : ''
      ]);
    });
    return rows;
  }

  function exportCsv() {
    var rows = exportRows();
    if (!rows.length) {
      RK.toast('当前没有可导出的错题');
      return;
    }
    var lines = [CSV_COLUMNS.map(csvCell).join(',')];
    rows.forEach(function (r) { lines.push(r.map(csvCell).join(',')); });
    var content = '\uFEFF' + lines.join('\r\n');   /* BOM：Excel 直接识别 UTF-8 中文 */
    var blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = '错题本-' + U.today() + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    RK.toast('已导出 ' + rows.length + ' 题（CSV，UTF-8）');
  }

  function openTemplate() {
    var head = TEMPLATE_COLUMNS.map(function (c) { return '<th>' + U.esc(c) + '</th>'; }).join('');
    var example = TEMPLATE_EXAMPLE.map(function (c) { return '<td>' + U.esc(c) + '</td>'; }).join('');
    var html =
      '<p class="dim" style="font-size:12.5px;margin:0 0 10px">' +
      '一题一行，只写题干关键词；错因从标签中选一个；一句话结论写成下次可执行的动作。' +
      '示例行仅说明写法，复制后可删除。</p>' +
      '<div class="tpl-table"><table class="table"><thead><tr>' + head + '</tr></thead>' +
      '<tbody><tr>' + example + '</tr><tr><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table></div>' +
      '<div class="dim mt-8" style="font-size:12px">导出的 CSV 与上表列一致，另附模块、考点、错误次数、状态、最近错误时间。</div>' +
      '<div class="row-wrap mt-16"><a class="btn btn-sm btn-ghost" href="' +
      encodeURI('docs/05-个人错题本模板.html') + '" target="_blank" rel="noopener">打开完整模板页</a>' +
      '<span class="dim" style="font-size:12px">复制后可直接粘贴到 Excel / WPS</span></div>';
    RK.modal({
      title: '个人错题本模板',
      html: html,
      okText: '复制模板',
      cancelText: '关闭',
      onMount: function (mask) {
        var box = mask.querySelector('.modal');
        if (box) box.classList.add('modal-wide');
      },
      onOk: function () {
        copyText(TEMPLATE_COLUMNS.join('\t') + '\n' + TEMPLATE_EXAMPLE.join('\t'), '已复制模板表头与示例');
        return false;   /* 保持弹层打开，方便继续粘贴或查看 */
      }
    });
    RK.toast('模板已加载');
  }

  /* 备份导入：结构校验通过后弹窗确认，确认后才覆盖 localStorage */
  function isPlainObject(v) {
    return !!v && typeof v === 'object' && !Array.isArray(v);
  }

  function importBackup(text) {
    var data;
    try { data = JSON.parse(text); } catch (e) {
      RK.toast('导入失败：不是合法的 JSON 文件');
      return;
    }
    if (!isPlainObject(data)) {
      RK.toast('导入失败：备份根节点应为对象');
      return;
    }
    if (!isPlainObject(data.answers) || !isPlainObject(data.wrong) ||
        !Array.isArray(data.exams) || !isPlainObject(data.tasks)) {
      RK.toast('导入失败：缺少 answers / wrong / exams / tasks 字段');
      return;
    }

    var counts = {
      answers: Object.keys(data.answers).length,
      wrong: Object.keys(data.wrong).length,
      exams: data.exams.length,
      tasks: Object.keys(data.tasks).length
    };
    var when = '';
    if (data.exportedAt) {
      var ts = Date.parse(data.exportedAt);
      if (!isNaN(ts)) when = U.fmtDateTime(ts);
    }
    var html = '<p class="muted">将用备份覆盖本机现有数据，覆盖后无法撤销。</p>' +
      '<p>作答 ' + counts.answers + ' 题 · 错题 ' + counts.wrong + ' 条 · 成绩 ' +
      counts.exams + ' 次 · 打卡 ' + counts.tasks + ' 项</p>' +
      (when ? '<p class="dim" style="font-size:12px">备份导出时间：' + U.esc(when) + '</p>' : '');

    RK.modal({
      title: '确认导入备份？',
      html: html,
      okText: '覆盖导入',
      onOk: function () {
        RK.store.set('answers', data.answers);
        RK.store.set('wrong', data.wrong);
        RK.store.set('exams', data.exams);
        RK.store.set('tasks', data.tasks);
        RK.toast('已导入备份');
        RK.router.render();
        return true;
      }
    });
  }

  /* ============================ 错题本 ============================ */
  RK.router.add('review', {
    title: '错题本',
    sub: '答错自动收录，重做答对后标记为已掌握；支持一键打开错题本模板与导出 CSV',
    render: function () {
      var wrong = RK.record.wrongAll();
      var ids = Object.keys(wrong);
      var unresolved = ids.filter(function (id) { return !wrong[id].resolved; });
      var resolved = ids.filter(function (id) { return wrong[id].resolved; });

      var h = '';
      h += '<div class="grid grid-3">' +
        '<div class="card"><div class="kpi"><span class="kpi-label">待攻克</span>' +
        '<span class="kpi-value">' + unresolved.length + ' <small>题</small></span></div></div>' +
        '<div class="card"><div class="kpi"><span class="kpi-label">已掌握</span>' +
        '<span class="kpi-value">' + resolved.length + ' <small>题</small></span></div></div>' +
        '<div class="card"><div class="kpi"><span class="kpi-label">收录总数</span>' +
        '<span class="kpi-value">' + ids.length + ' <small>题</small></span></div></div>' +
        '</div>';

      if (!ids.length) {
        h += '<div class="card mt-16">' + RK.ui.empty('错题本还是空的。先去刷题或做一套模考，答错的题会自动收录。') +
          '<div class="row-wrap center mt-16" style="justify-content:center"><a class="btn" href="#/practice">去刷题</a>' +
          '<button class="btn btn-ghost" type="button" data-act="template">打开模板</button>' +
          '<button class="btn btn-ghost" type="button" data-act="export-csv" disabled title="暂无错题可导出">导出 CSV</button>' +
          '</div></div>';
        return h;
      }

      /* 按模块分组 */
      var groups = {};
      unresolved.concat(resolved).forEach(function (id) {
        var q = RK.getQuestion(id);
        if (!q) return;
        var key = q.module;
        (groups[key] = groups[key] || []).push({ q: q, info: wrong[id], resolved: wrong[id].resolved });
      });

      h += '<div class="card mt-16"><div class="card-head"><h2>待攻克清单</h2>' +
        '<div class="row-wrap" style="justify-content:flex-end">' +
        '<a class="btn btn-sm btn-soft" href="#/practice?w=1">全部重做</a>' +
        '<button class="btn btn-sm btn-ghost" type="button" data-act="template">打开模板</button>' +
        '<button class="btn btn-sm btn-ghost" type="button" data-act="export-csv" ' +
        'title="导出全部错题为 CSV：题号、题目、我的答案、正确答案、错因、一句话结论、模块、考点、错误次数、状态、最近错误时间">导出 CSV</button>' +
        '</div></div>';
      if (!unresolved.length) {
        h += RK.ui.empty('待攻克清单已清空，保持住');
      }

      Object.keys(groups).forEach(function (key) {
        var list = groups[key].filter(function (x) { return !x.resolved; });
        if (!list.length) return;
        h += '<div class="point-block"><h4><i class="dot" style="background:' + RK.moduleColor(key) + '"></i> ' +
          U.esc(RK.moduleName(key)) + '（' + list.length + '）</h4>';
        list.forEach(function (item) {
          var q = item.q;
          var info = item.info;
          /* 按作答时记录的选项顺序回放；旧记录没有 order 则用题库原顺序 */
          var order = (info.order && info.order.length === q.options.length) ? info.order : null;
          var opts = order ? order.map(function (i) { return q.options[i]; }) : q.options;
          var answerIdx = order ? order.indexOf(q.answer) : q.answer;
          var pickedIdx = (info.choice === undefined || info.choice === null) ? -1 : info.choice;
          /* 有文本就按文本定位：旧 order 失效时仍能标在当时所选的那一项上 */
          if (info.choiceText) {
            var found = opts.indexOf(info.choiceText);
            if (found >= 0) pickedIdx = found;
          }
          h += '<details style="border-bottom:1px solid var(--border);padding:8px 0">' +
            '<summary style="cursor:pointer;font-size:13.5px">' + U.esc(q.stem.slice(0, 58)) + '… ' +
            '<span class="badge badge-bad">错 ' + info.count + ' 次</span>' +
            '<span class="badge ' + (info.cause ? 'badge-warn' : 'badge-plain') + '" data-cause-badge>' +
            U.esc(info.cause || '未归因') + '</span></summary>' +
            '<div class="q-stem mt-8" style="font-size:13.5px">' + U.esc(q.stem) + '</div>' +
            '<div class="opts">';
          opts.forEach(function (opt, i) {
            var cls = 'opt is-dim';
            if (i === answerIdx) cls = 'opt is-correct';
            else if (i === pickedIdx) cls = 'opt is-wrong';
            h += '<div class="' + cls + '"><span class="opt-key">' + LETTERS[i] + '</span><span>' + U.esc(opt) + '</span></div>';
          });
          h += '</div>';
          h += '<div class="explain"><div class="ex-title ok">正确答案 ' + LETTERS[answerIdx] + '</div>' + U.esc(q.explanation) + '</div>';
          h += noteRow(q.id, info);
          h += '<div class="row mt-8"><a class="btn btn-sm btn-ghost" href="#/knowledge?m=' + q.module + '">看该模块要点</a>' +
            '<button class="btn btn-sm btn-ghost" data-remove="' + q.id + '">移除</button></div>';
          h += '</details>';
        });
        h += '</div>';
      });
      h += '</div>';

      if (resolved.length) {
        h += '<div class="card mt-16"><div class="card-head"><h2>已掌握</h2>' +
          '<span class="hint">答对后自动标记，可再次移除</span></div>';
        resolved.forEach(function (id) {
          var q = RK.getQuestion(id);
          if (!q) return;
          h += '<div class="task"><span class="task-text">' + U.esc(q.stem.slice(0, 60)) + '… <span class="dim">(' + q.id + ')</span></span>' +
            '<span class="badge badge-ok">已掌握</span>' +
            '<button class="btn btn-sm btn-ghost" data-remove="' + q.id + '">移除</button></div>';
        });
        h += '</div>';
      }

      return h;
    },
    mount: function (el) {
      el.addEventListener('click', function (e) {
        /* 工具栏：打开模板 / 导出 CSV，先进入按钮加载态再做动作 */
        var actBtn = e.target.closest('[data-act]');
        if (actBtn) {
          var act = actBtn.getAttribute('data-act');
          if (act === 'template') {
            withLoading(actBtn, '加载中…', openTemplate);
            return;
          }
          if (act === 'export-csv') {
            withLoading(actBtn, '导出中…', exportCsv);
            return;
          }
        }

        var btn = e.target.closest('[data-remove]');
        if (!btn) return;
        RK.record.removeWrong(btn.getAttribute('data-remove'));
        RK.toast('已从错题本移除');
        RK.router.render();
      });

      /* 错因 / 结论：change 时落库，不打断输入 */
      el.addEventListener('change', function (e) {
        var field = e.target.closest('[data-note]');
        if (!field) return;
        var qid = field.getAttribute('data-qid');
        var kind = field.getAttribute('data-note');
        var value = String(field.value || '').trim();
        var patch = {};
        patch[kind] = value;
        RK.record.setNote(qid, patch);

        if (kind === 'cause') {
          var badge = e.target.closest('details');
          badge = badge && badge.querySelector('[data-cause-badge]');
          if (badge) {
            badge.textContent = value || '未归因';
            badge.className = 'badge ' + (value ? 'badge-warn' : 'badge-plain');
          }
          RK.toast(value ? '错因已记录：' + value : '已清除错因');
        } else {
          RK.toast(value ? '结论已保存' : '已清除结论');
        }
      });
    }
  });

  /* ============================ 成绩分析 ============================ */
  RK.router.add('stats', {
    title: '成绩分析',
    sub: '历次测评与模考成绩趋势、模块掌握度、数据备份',
    render: function () {
      var exams = RK.record.examsAll();
      var mastery = RK.mastery();
      var h = '';

      h += '<div class="card"><div class="card-head"><h2>成绩趋势</h2>' +
        '<span class="hint">虚线为合格线 45 分（按 75 分制换算）</span></div>';
      if (exams.length < 2) {
        h += RK.ui.empty('至少完成两次测评或模考后才能看到趋势图');
      } else {
        h += '<div class="chart-wrap"><canvas class="chart" id="score-chart"></canvas></div>';
      }
      h += '</div>';

      h += '<div class="card mt-16"><div class="card-head"><h2>成绩记录</h2>' +
        '<span class="hint">共 ' + exams.length + ' 次</span></div>';
      if (!exams.length) {
        h += RK.ui.empty('还没有成绩记录');
      } else {
        h += '<table class="table"><thead><tr><th>日期</th><th>试卷</th><th>类型</th><th>得分</th><th>用时</th><th>结果</th></tr></thead><tbody>';
        exams.slice().reverse().forEach(function (e) {
          var pass = e.score >= (e.passScore || 45);
          h += '<tr><td class="dim nowrap">' + U.fmtDateTime(e.ts) + '</td>' +
            '<td>' + U.esc(e.name) + '</td>' +
            '<td class="dim">' + (e.kind === 'mock' ? '全真模考' : e.kind === 'stage' ? '阶段测评' : '下午卷') + '</td>' +
            '<td class="mono"><strong>' + e.score + '</strong> / ' + e.total + '</td>' +
            '<td class="dim">' + (e.usedSec ? U.fmtDuration(e.usedSec) : '—') + '</td>' +
            '<td>' + (pass ? RK.ui.badge('达标', 'badge-ok') : RK.ui.badge('未达标', 'badge-bad')) + '</td></tr>';
        });
        h += '</tbody></table>';
      }
      h += '</div>';

      h += '<div class="card mt-16"><div class="card-head"><h2>模块掌握度</h2>' +
        '<span class="hint">基于全部作答记录（练习 + 考试）</span></div>';
      h += '<table class="table"><thead><tr><th>模块</th><th style="width:80px">权重</th><th style="width:80px">作答</th><th style="width:120px">正确率</th><th style="width:90px">评价</th></tr></thead><tbody>';
      RK.MODULES.forEach(function (m) {
        var s = mastery[m.key];
        h += '<tr><td><i class="dot" style="background:' + m.color + '"></i> ' + U.esc(m.name) + '</td>' +
          '<td class="mono">' + m.weight + '</td>' +
          '<td class="mono">' + s.total + '</td>' +
          '<td>' + RK.ui.bar(s.rate) + '<span class="dim" style="font-size:12px">' + (s.rate === null ? '未练' : U.pct(s.rate)) + '</span></td>' +
          '<td>' + (s.rate === null ? '<span class="dim">—</span>' :
            s.rate >= 0.75 ? RK.ui.badge('扎实', 'badge-ok') :
              s.rate >= 0.55 ? RK.ui.badge('待巩固', 'badge-warn') : RK.ui.badge('薄弱', 'badge-bad')) + '</td></tr>';
      });
      h += '</tbody></table></div>';

      h += '<div class="card mt-16"><div class="card-head"><h2>数据管理</h2>' +
        '<span class="hint">数据仅存于本机浏览器，换设备需手动备份</span></div>';
      h += '<div class="row-wrap">' +
        '<button class="btn btn-ghost" data-act="export">导出备份（JSON）</button>' +
        '<button class="btn btn-ghost" data-act="import">导入备份（JSON）</button>' +
        '<button class="btn btn-ghost" data-act="clear">清空全部记录</button>' +
        '<input type="file" id="import-file" accept=".json,application/json" hidden />' +
        '</div>';
      h += '<div class="dim mt-8" style="font-size:12px">导入会用备份覆盖本机现有数据，覆盖前先确认；清空后计划打卡、错题本与成绩记录都会丢失，操作不可撤销。</div>';
      h += '</div>';

      return h;
    },

    mount: function (el) {
      var exams = RK.record.examsAll();
      var canvas = el.querySelector('#score-chart');
      if (canvas && exams.length >= 2) {
        RK.drawLine(canvas, exams.map(function (e) {
          return e.total ? Math.round(e.score / e.total * 75) : e.score;
        }), { max: 75, passLine: 45, height: 220 });
      }

      el.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-act]');
        if (!btn) return;
        var act = btn.getAttribute('data-act');

        if (act === 'import') {
          var fileInput = el.querySelector('#import-file');
          if (fileInput) fileInput.click();
          return;
        }

        if (act === 'export') {
          var payload = {
            exportedAt: new Date().toISOString(),
            answers: RK.record.answersAll(),
            wrong: RK.record.wrongAll(),
            exams: RK.record.examsAll(),
            tasks: RK.tasks.all()
          };
          var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'ruankao-sd-backup-' + U.today() + '.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          RK.toast('已导出备份文件');
        }

        if (act === 'clear') {
          RK.modal({
            title: '确认清空全部记录？',
            html: '<p class="muted">将删除计划打卡、错题本、作答统计与成绩记录，且无法恢复。建议先导出备份。</p>',
            okText: '确认清空',
            onOk: function () {
              RK.record.clearAll();
              RK.toast('已清空');
              RK.router.render();
              return true;
            }
          });
        }
      });

      var importInput = el.querySelector('#import-file');
      if (importInput) {
        importInput.addEventListener('change', function () {
          var file = importInput.files && importInput.files[0];
          importInput.value = '';   /* 允许连续选择同一个文件 */
          if (!file) return;
          if (file.size > 5 * 1024 * 1024) {
            RK.toast('文件过大，备份通常不超过 1MB');
            return;
          }
          var reader = new FileReader();
          reader.onload = function () { importBackup(String(reader.result || '')); };
          reader.onerror = function () { RK.toast('读取文件失败'); };
          reader.readAsText(file, 'utf-8');
        });
      }
    }
  });
})(window.RK);
