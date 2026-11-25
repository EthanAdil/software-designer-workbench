/* ==========================================================================
 * views-review.js —— 错题本 + 成绩分析
 * ========================================================================== */
(function (RK) {
  var U = RK.U;
  var LETTERS = U.letters;

  /* 导出/速记表字段：与 docs/05-错题周次归档 的前五列保持一致，后面是自动附带的元信息 */
  var CSV_COLUMNS = ['题号', '题目', '我的答案', '正确答案', '错因', '一句话结论', '模块', '考点', '错误次数', '状态', '最近错误时间'];
  var TEMPLATE_COLUMNS = ['题号', '题目', '我的答案', '正确答案', '错因', '一句话结论'];
  var TEMPLATE_EXAMPLE = ['CS-001', '8 位补码的表示范围', 'B（-127 ~ +127）', 'A（-128 ~ +127）', '公式记错',
    '补码负端比正端多一个 -2^(n-1)：先写 -2^(n-1) ~ 2^(n-1)-1，再代入 n=8'];

  /* CSV 单元格统一加引号并转义，避免逗号、引号、换行破坏列 */
  function csvCell(v) {
    return '"' + String(v === undefined || v === null ? '' : v).replace(/"/g, '""') + '"';
  }

  /* 导出文件统一走 Blob → 临时链接 → 自动回收 */
  function downloadBlob(text, mime, filename) {
    var blob = new Blob([text], { type: mime });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  /* 选项乱序后对齐正确答案与当时所选，两组错题详情共用 */
  function choiceDisplay(q, info) {
    var order = (info.order && info.order.length === q.options.length) ? info.order : null;
    var opts = order ? order.map(function (i) { return q.options[i]; }) : q.options;
    var answerIdx = order ? order.indexOf(q.answer) : q.answer;
    var pickedIdx = (info.choice === undefined || info.choice === null) ? -1 : info.choice;
    if (info.choiceText) {
      var found = opts.indexOf(info.choiceText);
      if (found >= 0) pickedIdx = found;
    }
    return { opts: opts, answerIdx: answerIdx, pickedIdx: pickedIdx };
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

  /* ---------------- 真题错题：错因整理、三态复习、统计 ---------------- */
  var realFilter = { stage: 'all', cause: 'all' };

  /* 真题错题的错因下拉 + 自由结论，附按错因自动生成的结论建议 */
  function realNoteRow(qid, info) {
    var cause = info.cause || '';
    var opts = '<option value="">未归因</option>';
    RK.CAUSES.forEach(function (c) {
      opts += '<option value="' + U.esc(c) + '"' + (cause === c ? ' selected' : '') + '>' + U.esc(c) + '</option>';
    });
    var advice = cause ? RK.causeAdvice(cause) : '';
    return '<div class="note-row">' +
      '<label class="note-field"><span class="note-label">错因</span>' +
      '<select data-note="cause" data-note-src="real" data-qid="' + U.esc(qid) + '">' + opts + '</select></label>' +
      '<label class="note-field"><span class="note-label">一句话结论</span>' +
      '<input type="text" data-note="conclusion" data-note-src="real" data-qid="' + U.esc(qid) + '" maxlength="80" ' +
      'placeholder="写下这次的具体动作，可覆盖下方建议" value="' + U.esc(info.conclusion || '') + '" /></label>' +
      '</div>' +
      '<div class="ex-suggest" data-advice>' + (advice ?
        '<span class="ex-label">结论建议</span><span>' + U.esc(advice) + '</span>' :
        '<span class="dim">选择错因后自动生成一条可执行的结论建议；上面的自由结论可覆盖它。</span>') + '</div>';
  }

  /* 三态复习标记：待复习 / 复习中 / 已掌握，切换即落库并同步旧 resolved */
  function stageRow(qid, stage) {
    var h = '<div class="row-wrap mt-8 stage-row">';
    RK.real.STAGES.forEach(function (s) {
      h += '<button type="button" class="btn btn-sm ' + (s === stage ? '' : 'btn-ghost') +
        '" data-stage="' + s + '" data-qid="' + U.esc(qid) + '">' +
        U.esc(RK.real.STAGE_LABELS[s]) + '</button>';
    });
    return h + '</div>';
  }

  /* 统计条：按计数降序显示，分母为本组总数 */
  function statBars(counts, total, emptyText) {
    var keys = Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a] || String(a).localeCompare(String(b));
    });
    if (!keys.length) return '<div class="dim" style="font-size:12.5px">' + U.esc(emptyText) + '</div>';
    var h = '<div class="stat-list">';
    keys.forEach(function (k) {
      h += '<div class="stat-row"><span class="stat-name">' + U.esc(k) + '</span>' +
        '<span class="stat-bar">' + RK.ui.bar(total ? counts[k] / total : 0) + '</span>' +
        '<span class="mono stat-count">' + counts[k] + '</span></div>';
    });
    return h + '</div>';
  }

  function moduleCountMap(wrong, getModule) {
    var out = {};
    Object.keys(wrong).forEach(function (id) {
      var m = getModule(id);
      out[m] = (out[m] || 0) + 1;
    });
    return out;
  }

  function selfCauseCounts(wrong) {
    var out = {};
    Object.keys(wrong).forEach(function (id) {
      var c = wrong[id].cause || '未归因';
      out[c] = (out[c] || 0) + 1;
    });
    return out;
  }

  /* 错因筛选：自定义下拉，触发器与弹层同宽，复用工作台 token（原生 select 弹层无法定制） */
  function causeSelectHtml(realStats) {
    var values = ['all'].concat(RK.CAUSES);
    if (realStats.causes['未归因'] || !Object.keys(realStats.causes).length) values.push('未归因');
    var label = realFilter.cause === 'all' ? '全部错因' : realFilter.cause;
    var h = '<div class="cause-select" data-cause-select>' +
      '<button type="button" class="cause-trigger" data-cause-toggle aria-haspopup="listbox" aria-expanded="false" ' +
      'title="按错因筛选真题错题"><span class="cause-trigger-text">' + U.esc(label) + '</span>' +
      '<span class="cause-caret" aria-hidden="true"></span></button>' +
      '<div class="cause-menu" role="listbox" aria-label="错因筛选">';
    values.forEach(function (v) {
      var on = realFilter.cause === v;
      h += '<button type="button" class="cause-option' + (on ? ' is-selected' : '') +
        '" role="option" aria-selected="' + (on ? 'true' : 'false') +
        '" data-cause-value="' + U.esc(v) + '">' + U.esc(v === 'all' ? '全部错因' : v) + '</button>';
    });
    return h + '</div></div>';
  }

  /* 错因统计：真题单独一组并置顶，自编一组对照 */
  function attributionCard(realStats, selfWrong) {
    var realModules = {};
    Object.keys(realStats.modules).forEach(function (k) {
      var name = RK.moduleName(k);
      realModules[name] = (realModules[name] || 0) + realStats.modules[k];
    });
    var selfTotal = Object.keys(selfWrong).length;
    var h = '<div class="card mt-16"><div class="card-head"><h2>错因统计</h2>' +
      '<span class="hint">真题单独一组置顶；两组互不混算，真题作为独立类别进入 v2 备份</span></div>' +
      '<div class="stat-grid">';
    h += '<div class="stat-group"><h3>真题错题（' + realStats.total + '）</h3>' +
      '<div class="dim" style="font-size:12px;margin-bottom:6px">按错因</div>' +
      statBars(realStats.causes, realStats.total, '暂无真题错题') +
      '<div class="dim" style="font-size:12px;margin:10px 0 6px">按模块</div>' +
      statBars(realModules, realStats.total, '暂无真题错题') + '</div>';
    h += '<div class="stat-group"><h3>自编错题（' + selfTotal + '）</h3>' +
      '<div class="dim" style="font-size:12px;margin-bottom:6px">按错因</div>' +
      statBars(selfCauseCounts(selfWrong), selfTotal, '暂无自编错题') +
      '<div class="dim" style="font-size:12px;margin:10px 0 6px">按模块</div>' +
      statBars(moduleCountMap(selfWrong, function (id) {
        var q = RK.getQuestion(id);
        return q ? RK.moduleName(q.module) : 'unknown';
      }), selfTotal, '暂无自编错题') + '</div>';
    return h + '</div></div>';
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
    downloadBlob(content, 'text/csv;charset=utf-8', '错题本-' + U.today() + '.csv');
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
      encodeURI('docs/05-错题周次归档.html') + '" target="_blank" rel="noopener">打开错题周次归档</a>' +
      '<span class="dim" style="font-size:12px">复制后可直接粘贴到 Excel / WPS</span></div>';
    RK.modal({
      title: '错题速记表',
      html: html,
      okText: '复制表头',
      cancelText: '关闭',
      onMount: function (mask) {
        var box = mask.querySelector('.modal');
        if (box) box.classList.add('modal-wide');
      },
      onOk: function () {
        copyText(TEMPLATE_COLUMNS.join('\t') + '\n' + TEMPLATE_EXAMPLE.join('\t'), '已复制表头与示例');
        return false;   /* 保持弹层打开，方便继续粘贴或查看 */
      }
    });
    RK.toast('速记表已加载');
  }

  /* ---------------- 导出备份：版本、分类与结构说明 ----------------
   * v1（旧备份）：仅 exportedAt + answers / wrong / exams / tasks，继续兼容导入。
   * v2：新增 _meta（format / version / mode / categories / schema），根字段按需包含 8 类；
   *     _meta.categories 决定恢复时覆盖哪些类别，未包含的类别保持本机不变。
   */
  var BACKUP_FORMAT = 'ruankao-sd-backup';
  var BACKUP_VERSION = 2;
  var BACKUP_CATEGORIES = [
    { key: 'answers', label: '自编作答', store: 'answers', type: 'object',
      desc: '题号 → { right, wrong, last, ts }：累计答对/答错次数、最近是否答对、时间戳',
      read: function () { return RK.record.answersAll(); } },
    { key: 'wrong', label: '自编错题（含错因/结论）', store: 'wrong', type: 'object',
      desc: '题号 → { count, choice, choiceText, order, resolved, cause, conclusion, ts }；cause / conclusion 即用户笔记',
      read: function () { return RK.record.wrongAll(); } },
    { key: 'exams', label: '成绩记录', store: 'exams', type: 'array',
      desc: '数组，每次测评/模拟考试一条：{ paperId, name, kind, score, total, passScore, ts, usedSec }',
      read: function () { return RK.record.examsAll(); } },
    { key: 'tasks', label: '计划打卡', store: 'tasks', type: 'object',
      desc: '任务 id → true',
      read: function () { return RK.tasks.all(); } },
    { key: 'realAnswers', label: '真题作答', store: 'real_answers', type: 'object',
      desc: '真题 id → { right, wrong, last, ts }，与自编作答相互独立',
      read: function () { return RK.realRecord.answersAll(); } },
    { key: 'realWrong', label: '真题错题（含复习状态）', store: 'real_wrong', type: 'object',
      desc: '真题 id → { count, choice, choiceText, order, resolved, stage, cause, conclusion, reviewTs, ts }；stage 为 todo / doing / done',
      read: function () { return RK.realRecord.wrongAll(); } },
    { key: 'realSel', label: '真题筛选记忆', store: 'real_sel', type: 'object',
      desc: '{ y, t, m, n }：年份、上下午、模块与题量',
      read: function () { return RK.store.get('real_sel', {}); } },
    { key: 'practiceSel', label: '练习筛选记忆', store: 'practice_sel', type: 'object',
      desc: '{ c, n }：已选模块 key 数组与题量档位',
      read: function () { return RK.store.get('practice_sel', {}); } }
  ];

  function isPlainObject(v) {
    return !!v && typeof v === 'object' && !Array.isArray(v);
  }

  function backupCat(key) {
    for (var i = 0; i < BACKUP_CATEGORIES.length; i++) {
      if (BACKUP_CATEGORIES[i].key === key) return BACKUP_CATEGORIES[i];
    }
    return null;
  }

  function validBackupValue(cat, value) {
    return cat.type === 'array' ? Array.isArray(value) : isPlainObject(value);
  }

  function buildBackup(keys) {
    var iso = new Date().toISOString();
    var schema = {};
    var payload = {
      _meta: {
        format: BACKUP_FORMAT,
        version: BACKUP_VERSION,
        exportedAt: iso,
        mode: keys.length === BACKUP_CATEGORIES.length ? 'full' : 'selected',
        categories: keys.slice(),
        schema: schema
      },
      exportedAt: iso
    };
    keys.forEach(function (key) {
      var cat = backupCat(key);
      var value = cat.read();
      if (!validBackupValue(cat, value)) throw new Error('「' + cat.label + '」数据格式异常，已停止导出');
      payload[key] = value;
      schema[key] = { label: cat.label, storage: 'rk_sd_' + cat.store, type: cat.type, desc: cat.desc };
    });
    return payload;
  }

  function backupCounts(data, keys) {
    return keys.map(function (key) {
      var cat = backupCat(key);
      var value = data[key];
      return {
        label: cat ? cat.label : key,
        count: Array.isArray(value) ? value.length : Object.keys(value).length
      };
    });
  }

  function setBackupProgress(el, text, failed) {
    var box = el && el.querySelector('#backup-progress');
    if (!box) return;
    box.textContent = text;
    box.style.color = failed ? 'var(--danger)' : '';
  }

  /* 三步反馈 + 全程异常兜底：任何一步失败都保留按钮可用并给出明确提示 */
  function runExport(el, btn, keys) {
    if (btn && btn.getAttribute('data-busy') === '1') return;
    if (!keys.length) { RK.toast('请至少勾选一类数据'); return; }
    if (btn) { btn.setAttribute('data-busy', '1'); btn.disabled = true; }
    setBackupProgress(el, '1/3 正在读取本机数据…');
    setTimeout(function () {
      var payload;
      try {
        payload = buildBackup(keys);
      } catch (e) {
        setBackupProgress(el, '导出失败：' + (e && e.message ? e.message : '数据读取异常'), true);
        RK.toast('导出失败：数据校验未通过');
        if (btn) { btn.disabled = false; btn.removeAttribute('data-busy'); }
        return;
      }
      setBackupProgress(el, '2/3 数据校验完成，正在生成文件…');
      setTimeout(function () {
        try {
          var text = JSON.stringify(payload, null, 2);
          downloadBlob(text, 'application/json;charset=utf-8', 'ruankao-sd-backup-' + U.today() + '.json');
          setBackupProgress(el, '3/3 导出完成：' + keys.length + ' 类数据 · ' +
            (text.length / 1024).toFixed(1) + ' KB');
          RK.toast('已导出' + (payload._meta.mode === 'full' ? '完整' : '选择性') +
            '备份（v' + BACKUP_VERSION + '）');
        } catch (e) {
          setBackupProgress(el, '导出失败：' + (e && e.message ? e.message : '无法生成文件'), true);
          RK.toast('导出失败，请重试');
        } finally {
          if (btn) { btn.disabled = false; btn.removeAttribute('data-busy'); }
        }
      }, 30);
    }, 30);
  }

  /* 备份导入：结构校验通过后弹窗确认，确认后才覆盖 localStorage */

  /* 解析时只认 _meta.categories 列出的类别；旧备份无 _meta，按 v1 四字段处理 */
  function parseBackup(text) {
    var data;
    try { data = JSON.parse(text); } catch (e) { return { error: '不是合法的 JSON 文件' }; }
    if (!isPlainObject(data)) return { error: '备份根节点应为对象' };

    var meta = data._meta;
    var keys;
    if (meta !== undefined) {
      if (!isPlainObject(meta)) return { error: '_meta 格式不正确' };
      if (meta.format !== BACKUP_FORMAT) return { error: '不是本系统的备份文件' };
      if (meta.version !== BACKUP_VERSION) {
        return { error: '备份版本 v' + U.esc(meta.version) + ' 不支持，当前为 v' + BACKUP_VERSION };
      }
      if (!Array.isArray(meta.categories) || !meta.categories.length) {
        return { error: '_meta.categories 缺失或为空' };
      }
      keys = meta.categories.slice();
    } else {
      keys = ['answers', 'wrong', 'exams', 'tasks'];
    }

    for (var i = 0; i < keys.length; i++) {
      var cat = backupCat(keys[i]);
      if (!cat) return { error: '包含未知的数据类别：' + keys[i] };
      if (!validBackupValue(cat, data[keys[i]])) return { error: '字段格式不正确：' + keys[i] };
    }
    return { data: data, keys: keys, meta: meta };
  }

  function importBackup(text) {
    var parsed = parseBackup(text);
    if (parsed.error) { RK.toast('导入失败：' + parsed.error); return; }

    var counts = backupCounts(parsed.data, parsed.keys);
    var summary = counts.map(function (c) { return c.label + ' ' + c.count + ' 条'; }).join(' · ');
    var exportedAt = (parsed.meta && parsed.meta.exportedAt) || parsed.data.exportedAt;
    var when = '';
    if (exportedAt) {
      var ts = Date.parse(exportedAt);
      if (!isNaN(ts)) when = U.fmtDateTime(ts);
    }
    var version = parsed.meta ? BACKUP_VERSION : 1;
    var html = '<p class="muted">备份中的 ' + counts.length + ' 类数据将覆盖本机对应内容；' +
      '未包含的类别保持本机不变，覆盖后不可撤销。</p>' +
      '<p>' + U.esc(summary) + '</p>' +
      (when ? '<p class="dim" style="font-size:12px">导出时间：' + U.esc(when) +
        ' · 版本 v' + version + '</p>' : '');

    RK.modal({
      title: '确认导入备份？',
      html: html,
      okText: '覆盖导入',
      onOk: function () {
        var originals = {};
        var failed = '';
        try {
          parsed.keys.forEach(function (key) {
            var cat = backupCat(key);
            originals[key] = RK.store.get(cat.store, cat.type === 'array' ? [] : {});
            RK.store.set(cat.store, parsed.data[key]);
          });
          parsed.keys.forEach(function (key) {
            var cat = backupCat(key);
            if (JSON.stringify(RK.store.get(cat.store, null)) !== JSON.stringify(parsed.data[key])) {
              failed = cat.label;
            }
          });
        } catch (e) { failed = e && e.message ? e.message : '写入异常'; }

        if (failed) {
          Object.keys(originals).forEach(function (key) {
            RK.store.set(backupCat(key).store, originals[key]);
          });
          RK.toast('导入失败：' + failed + ' 未能写入，已还原本机数据');
          return false;
        }
        RK.toast('已导入 ' + parsed.keys.length + ' 类数据');
        RK.router.render();
        return true;
      }
    });
  }

  /* ============================ 错题本 ============================ */
  RK.router.add('review', {
    title: '错题本',
    sub: '真题错题置顶重点管理（错因 + 建议 + 三态复习）；自编错题沿用原流程',
    render: function () {
      var wrong = RK.record.wrongAll();
      var ids = Object.keys(wrong);
      var unresolved = ids.filter(function (id) { return !wrong[id].resolved; });
      var resolved = ids.filter(function (id) { return wrong[id].resolved; });
      var realWrong = RK.realRecord.wrongAll();
      var realStats = RK.realRecord.stats();

      var h = '';

      /* ---------- 真题错题：置顶、独立存储、重点管理 ---------- */
      h += '<div class="card" id="real-wrong-top"><div class="card-head"><h2>真题错题 · 重点管理</h2>' +
        '<div class="row-wrap" style="justify-content:flex-end">' +
        '<a class="btn btn-sm btn-soft" href="#/real?w=1">重做待复习真题</a>' +
        '<a class="btn btn-sm btn-ghost" href="#/real">回真题题库</a></div></div>';
      h += '<p class="dim" style="font-size:12.5px;line-height:1.75;margin-bottom:10px">' +
        '真题优先级高于自编模拟题，故置顶展示。作答仍独立存 `rk_sd_real_wrong`，作为 v2 备份的 `realWrong` 类别单独导出；' +
        '错因、结论建议与复习状态随真题记录保存，两组错题互不混算。</p>';
      h += '<div class="grid grid-4">' +
        '<div class="kpi"><span class="kpi-label">待复习</span><span class="kpi-value">' + realStats.stages.todo + ' <small>题</small></span></div>' +
        '<div class="kpi"><span class="kpi-label">复习中</span><span class="kpi-value">' + realStats.stages.doing + ' <small>题</small></span></div>' +
        '<div class="kpi"><span class="kpi-label">已掌握</span><span class="kpi-value">' + realStats.stages.done + ' <small>题</small></span></div>' +
        '<div class="kpi"><span class="kpi-label">真题合计</span><span class="kpi-value">' + realStats.total + ' <small>题</small></span></div>' +
        '</div>';

      h += '<div class="row-wrap mt-16" style="gap:8px"><span class="dim" style="font-size:12.5px">筛选</span>' +
        '<div class="seg" id="real-stage-filter">';
      [['all', '全部'], ['todo', '待复习'], ['doing', '复习中'], ['done', '已掌握']].forEach(function (pair) {
        h += '<button type="button" class="seg-btn' + (realFilter.stage === pair[0] ? ' is-on' : '') +
          '" data-filter-stage="' + pair[0] + '">' + pair[1] + '</button>';
      });
      h += '</div>' + causeSelectHtml(realStats);
      if (realFilter.stage !== 'all' || realFilter.cause !== 'all') {
        h += '<button type="button" class="btn btn-sm btn-ghost" data-filter-reset>清空筛选</button>';
      }
      h += '</div>';

      var realGroups = {};
      Object.keys(realWrong).forEach(function (id) {
        var q = RK.real.get(id);
        if (!q) return;
        var st = RK.real.stageOf(realWrong[id]);
        if (realFilter.stage !== 'all' && st !== realFilter.stage) return;
        if (realFilter.cause !== 'all' && (realWrong[id].cause || '未归因') !== realFilter.cause) return;
        (realGroups[q.module] = realGroups[q.module] || []).push({ q: q, info: realWrong[id], stage: st });
      });
      var realShown = Object.keys(realGroups).reduce(function (n, k) { return n + realGroups[k].length; }, 0);

      if (!realStats.total) {
        h += RK.ui.empty('暂无真题错题。到「真题题库」做一套卷，答错的题会自动收录到这里。');
      } else if (!realShown) {
        h += RK.ui.empty('当前筛选没有匹配题目，点「清空筛选」查看全部。');
      } else {
        Object.keys(realGroups).forEach(function (key) {
          var list = realGroups[key];
          h += '<div class="point-block"><h4><i class="dot" style="background:' + RK.moduleColor(key) + '"></i> ' +
            U.esc(RK.moduleName(key)) + '（' + list.length + '）</h4>';
          list.forEach(function (item) {
            var q = item.q;
            var info = item.info;
            var d = choiceDisplay(q, info);
            var opts = d.opts;
            var answerIdx = d.answerIdx;
            var pickedIdx = d.pickedIdx;
            var ex = RK.real.explanationFor(q);
            h += '<details style="border-bottom:1px solid var(--border);padding:8px 0">' +
              '<summary style="cursor:pointer;font-size:13.5px">' + U.esc(q.stem.slice(0, 58)) + '… ' +
              '<span class="badge badge-plain">真题 · 原题 ' + U.esc(q.no) + '</span>' +
              (q.group > 1 ? '<span class="badge badge-plain">第 ' + q.blank + ' / ' + q.group + ' 空</span>' : '') +
              '<span class="badge badge-bad">错 ' + U.esc(info.count || 0) + ' 次</span>' +
              '<span class="badge badge-ok" data-stage-badge>' + U.esc(RK.real.STAGE_LABELS[item.stage]) + '</span>' +
              '<span class="badge ' + (info.cause ? 'badge-warn' : 'badge-plain') + '" data-cause-badge>' +
              U.esc(info.cause || '未归因') + '</span></summary>' +
              '<div class="q-stem mt-8" style="font-size:13.5px">' + U.esc(q.stem) + '</div>' +
              '<div class="row-wrap mt-8 tag-row">' +
              '<span class="badge badge-plain">' + U.esc(RK.moduleName(q.module)) + '</span>' +
              '<span class="badge badge-plain">' + U.esc(q.year || '未知') + ' 年</span>' +
              (q.paper && RK.real.paperMap[q.paper] ? '<span class="badge badge-plain">' + U.esc(RK.real.paperMap[q.paper].label) + '</span>' : '') +
              '</div>' +
              (q.group > 1 ? '<div class="opts-hint">以下选项仅对应题干第 ' + q.blank + ' / ' + q.group + ' 空</div>' : '') +
              '<div class="opts">';
            opts.forEach(function (opt, i) {
              var cls = 'opt is-dim';
              if (i === answerIdx) cls = 'opt is-correct';
              else if (i === pickedIdx) cls = 'opt is-wrong';
              h += '<div class="' + cls + '"><span class="opt-key">' + LETTERS[i] + '</span><span>' + U.esc(opt) + '</span></div>';
            });
            h += '</div>';
            h += '<div class="explain"><div class="ex-title ok">正确答案 ' + U.esc(ex.answer) + '</div>' +
              '<div class="ex-sec"><span class="ex-label">解题思路</span><span>' + U.esc(ex.idea) + '</span></div>' +
              '<div class="ex-sec"><span class="ex-label">推导过程</span><span>' + U.esc(ex.derivation) + '</span></div>' +
              '<div class="ex-source">解析来源：' + U.esc(ex.source) + '</div></div>';
            h += realNoteRow(q.id, info);
            h += stageRow(q.id, item.stage);
            h += '<div class="row mt-8"><a class="btn btn-sm btn-ghost" href="#/real?q=' + encodeURIComponent(q.id) + '">单题重做</a>' +
              '<a class="btn btn-sm btn-ghost" href="#/knowledge?m=' + encodeURIComponent(q.module) + '">看该模块要点</a>' +
              '<button class="btn btn-sm btn-ghost" data-remove-real="' + U.esc(q.id) + '">移除</button></div>';
            h += '</details>';
          });
          h += '</div>';
        });
      }
      h += '</div>';

      /* ---------- 错因统计：真题单独一组置顶 ---------- */
      h += attributionCard(realStats, wrong);

      /* ---------- 自编错题：原流程保留 ---------- */
      h += '<div class="grid grid-3">' +
        '<div class="card"><div class="kpi"><span class="kpi-label">自编待攻克</span>' +
        '<span class="kpi-value">' + unresolved.length + ' <small>题</small></span></div></div>' +
        '<div class="card"><div class="kpi"><span class="kpi-label">自编已掌握</span>' +
        '<span class="kpi-value">' + resolved.length + ' <small>题</small></span></div></div>' +
        '<div class="card"><div class="kpi"><span class="kpi-label">自编收录</span>' +
        '<span class="kpi-value">' + ids.length + ' <small>题</small></span></div></div>' +
        '</div>';

      if (!ids.length) {
        h += '<div class="card mt-16">' + RK.ui.empty('自编错题本还是空的。先去刷题或做一套模拟考试，答错的题会自动收录。') +
          '<div class="row-wrap center mt-16" style="justify-content:center"><a class="btn" href="#/practice">去刷题</a>' +
          '<button class="btn btn-ghost" type="button" data-act="template">打开速记表</button>' +
          '<button class="btn btn-ghost" type="button" data-act="export-csv" disabled title="暂无自编错题可导出">导出 CSV</button>' +
          '</div></div>';
        return h;
      }

      var groups = {};
      unresolved.concat(resolved).forEach(function (id) {
        var q = RK.getQuestion(id);
        if (!q) return;
        var key = q.module;
        (groups[key] = groups[key] || []).push({ q: q, info: wrong[id], resolved: wrong[id].resolved });
      });

      h += '<div class="card mt-16"><div class="card-head"><h2>自编待攻克清单</h2>' +
        '<div class="row-wrap" style="justify-content:flex-end">' +
        '<a class="btn btn-sm btn-soft" href="#/practice?w=1">全部重做</a>' +
        '<button class="btn btn-sm btn-ghost" type="button" data-act="template">打开速记表</button>' +
        '<button class="btn btn-sm btn-ghost" type="button" data-act="export-csv" ' +
        'title="导出全部错题为 CSV：题号、题目、我的答案、正确答案、错因、一句话结论、模块、考点、错误次数、状态、最近错误时间">导出 CSV</button>' +
        '</div></div>';
      if (!unresolved.length) {
        h += RK.ui.empty('自编待攻克清单已清空，保持住');
      }

      Object.keys(groups).forEach(function (key) {
        var list = groups[key].filter(function (x) { return !x.resolved; });
        if (!list.length) return;
        h += '<div class="point-block"><h4><i class="dot" style="background:' + RK.moduleColor(key) + '"></i> ' +
          U.esc(RK.moduleName(key)) + '（' + list.length + '）</h4>';
        list.forEach(function (item) {
          var q = item.q;
          var info = item.info;
          var d = choiceDisplay(q, info);
          var opts = d.opts;
          var answerIdx = d.answerIdx;
          var pickedIdx = d.pickedIdx;
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
        h += '<div class="card mt-16"><div class="card-head"><h2>自编已掌握</h2>' +
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
      function closeCauseMenu() {
        var wrap = el.querySelector('[data-cause-select]');
        if (!wrap) return;
        wrap.classList.remove('is-open');
        var toggle = wrap.querySelector('[data-cause-toggle]');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
      function onDocClick(e) {
        var wrap = el.querySelector('[data-cause-select]');
        if (!wrap || !wrap.classList.contains('is-open')) return;
        if (e.target && e.target.closest && e.target.closest('[data-cause-select]')) return;
        closeCauseMenu();
      }
      function onKeyDown(e) {
        if (e.key === 'Escape' || e.keyCode === 27) closeCauseMenu();
      }
      document.addEventListener('click', onDocClick);
      document.addEventListener('keydown', onKeyDown);

      el.addEventListener('click', function (e) {
        /* 错因自定义下拉：展开 / 收起 */
        var toggle = e.target.closest('[data-cause-toggle]');
        if (toggle) {
          var wrap = toggle.closest('[data-cause-select]');
          var open = !wrap.classList.contains('is-open');
          wrap.classList.toggle('is-open', open);
          toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
          return;
        }
        var causeOpt = e.target.closest('[data-cause-value]');
        if (causeOpt) {
          realFilter.cause = causeOpt.getAttribute('data-cause-value') || 'all';
          RK.router.render();
          return;
        }

        /* 真题筛选：三态快捷切换 */
        var fs = e.target.closest('[data-filter-stage]');
        if (fs) {
          realFilter.stage = fs.getAttribute('data-filter-stage');
          RK.router.render();
          return;
        }
        if (e.target.closest('[data-filter-reset]')) {
          realFilter.stage = 'all';
          realFilter.cause = 'all';
          RK.router.render();
          return;
        }

        /* 真题三态复习标记：手动切换即落库 */
        var st = e.target.closest('[data-stage]');
        if (st) {
          var sid = st.getAttribute('data-qid');
          var sv = st.getAttribute('data-stage');
          if (RK.realRecord.setNote(sid, { stage: sv })) {
            RK.toast('复习状态：' + RK.real.STAGE_LABELS[sv]);
            RK.router.render();
          }
          return;
        }

        var rr = e.target.closest('[data-remove-real]');
        if (rr) {
          RK.realRecord.removeWrong(rr.getAttribute('data-remove-real'));
          RK.toast('已从真题错题移除');
          RK.router.render();
          return;
        }

        /* 工具栏：打开速记表 / 导出 CSV，先进入按钮加载态再做动作 */
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

        if (field.getAttribute('data-note-src') === 'real') {
          var patch = {};
          patch[kind] = value;
          RK.realRecord.setNote(qid, patch);
          var box = e.target.closest('details');
          if (kind === 'cause' && box) {
            var badge = box.querySelector('[data-cause-badge]');
            if (badge) {
              badge.textContent = value || '未归因';
              badge.className = 'badge ' + (value ? 'badge-warn' : 'badge-plain');
            }
            var adviceBox = box.querySelector('[data-advice]');
            if (adviceBox) {
              adviceBox.innerHTML = value ?
                '<span class="ex-label">结论建议</span><span>' + U.esc(RK.causeAdvice(value)) + '</span>' :
                '<span class="dim">选择错因后自动生成一条可执行的结论建议；上面的自由结论可覆盖它。</span>';
            }
            RK.toast(value ? '真题错因已记录：' + value : '已清除真题错因');
          } else {
            RK.toast(value ? '真题结论已保存' : '已清除真题结论');
          }
          return;
        }

        var selfPatch = {};
        selfPatch[kind] = value;
        RK.record.setNote(qid, selfPatch);
        if (kind === 'cause') {
          var sBadge = e.target.closest('details');
          sBadge = sBadge && sBadge.querySelector('[data-cause-badge]');
          if (sBadge) {
            sBadge.textContent = value || '未归因';
            sBadge.className = 'badge ' + (value ? 'badge-warn' : 'badge-plain');
          }
          RK.toast(value ? '错因已记录：' + value : '已清除错因');
        } else {
          RK.toast(value ? '结论已保存' : '已清除结论');
        }
      });

      return function () {
        document.removeEventListener('click', onDocClick);
        document.removeEventListener('keydown', onKeyDown);
      };
    }
  });

  /* ============================ 成绩分析 ============================ */
  RK.router.add('stats', {
    title: '成绩分析',
    sub: '历次测评与模拟考试成绩趋势、模块掌握度、数据备份',
    render: function () {
      var exams = RK.record.examsAll();
      var mastery = RK.mastery();
      var h = '';

      h += '<div class="card"><div class="card-head"><h2>成绩趋势</h2>' +
        '<span class="hint">虚线为合格线 45 分（按 75 分制换算）</span></div>';
      if (exams.length < 2) {
        h += RK.ui.empty('至少完成两次测评或模拟考试后才能看到趋势图');
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
            '<td class="dim">' + (e.kind === 'mock' ? '模拟考试' : e.kind === 'stage' ? '阶段测评' : '下午卷') + '</td>' +
            '<td class="mono"><strong>' + e.score + '</strong> / ' + e.total + '</td>' +
            '<td class="dim">' + (e.usedSec ? U.fmtDuration(e.usedSec) : '—') + '</td>' +
            '<td>' + (pass ? RK.ui.badge('达标', 'badge-ok') : RK.ui.badge('未达标', 'badge-bad')) + '</td></tr>';
        });
        h += '</tbody></table>';
      }
      h += '</div>';

      h += '<div class="card mt-16"><div class="card-head"><h2>模块掌握度雷达</h2>' +
        '<span class="hint">13 个模块累计正确率，网格每圈 25%；未练模块记 0</span></div>';
      h += '<div class="chart-wrap"><canvas class="chart" id="radar-chart"></canvas></div>';
      h += '<div class="dim mt-8" style="font-size:12px">与下方「模块掌握度」表同源：按全部作答记录（练习 + 考试）计算正确率；无作答记录的模块落在圆心。</div>';
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

      var weeks = RK.weeklyHours();
      var doneHours = 0, activeWeeks = 0;
      weeks.forEach(function (wk) {
        doneHours += wk.hours;
        if (wk.hours > 0) activeWeeks += 1;
      });
      h += '<div class="card mt-16"><div class="card-head"><h2>每周已完成计划时长</h2>' +
        '<span class="hint">共 ' + weeks.length + ' 周 · 累计 ' + doneHours + ' 小时 / ' + activeWeeks + ' 周有打卡</span></div>';
      if (!weeks.length) {
        h += RK.ui.empty('学习计划数据未加载');
      } else {
        h += '<div class="chart-wrap"><canvas class="chart" id="weekly-chart"></canvas></div>';
      }
      h += '<div class="dim mt-8" style="font-size:12px">口径：按任务所属计划周汇总「已打卡任务的计划 hours」，未打卡不计。打卡记录没有时间戳，这不是实测学习用时；与「学习计划 → 累计投入」同源。</div>';
      h += '</div>';

      h += '<div class="card mt-16"><div class="card-head"><h2>数据管理</h2>' +
        '<span class="hint">数据仅存于本机浏览器，换设备需手动备份</span></div>';
      h += '<div class="row-wrap" style="align-items:center">' +
        '<label style="display:inline-flex;align-items:center;gap:6px;font-size:13px">' +
        '<input type="radio" name="backup-mode" value="full" checked /> 完整导出</label>' +
        '<label style="display:inline-flex;align-items:center;gap:6px;font-size:13px">' +
        '<input type="radio" name="backup-mode" value="selected" /> 选择性导出</label></div>';
      h += '<div id="backup-cats" style="display:none;margin-top:10px;padding:10px;border:1px solid rgba(128,128,128,.35);border-radius:8px">' +
        '<div class="dim" style="font-size:12px;margin-bottom:6px">勾选要包含的数据类别（默认全选）：</div>' +
        '<div class="row-wrap">' + BACKUP_CATEGORIES.map(function (c) {
          return '<label style="display:inline-flex;align-items:center;gap:5px;font-size:13px">' +
            '<input type="checkbox" data-backup-key="' + c.key + '" checked /> ' + U.esc(c.label) + '</label>';
        }).join('') + '</div></div>';
      h += '<div id="backup-progress" class="dim mt-8" style="font-size:12px;min-height:18px" role="status" aria-live="polite"></div>';
      h += '<div class="row-wrap">' +
        '<button class="btn btn-ghost" data-act="export">导出备份（JSON · v' + BACKUP_VERSION + '）</button>' +
        '<button class="btn btn-ghost" data-act="import">导入备份（JSON）</button>' +
        '<button class="btn btn-ghost" data-act="clear">清空全部记录</button>' +
        '<input type="file" id="import-file" accept=".json,application/json" hidden />' +
        '</div>';
      h += '<div class="dim mt-8" style="font-size:12px">完整导出含全部 ' + BACKUP_CATEGORIES.length +
        ' 类数据；选择性导出仅含勾选类别，导入时未包含的类别保持本机不变。备份内 _meta 记录版本、模式、类别与各字段说明；旧版四字段备份仍可导入。</div>';
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

      var radar = el.querySelector('#radar-chart');
      if (radar) {
        var mastery = RK.mastery();
        RK.drawRadar(radar, RK.MODULES.map(function (m) {
          var s = mastery[m.key] || { rate: null };
          return { label: m.short, value: s.rate === null ? 0 : s.rate, color: m.color };
        }));
      }

      var weekly = el.querySelector('#weekly-chart');
      if (weekly) {
        RK.drawBars(weekly, RK.weeklyHours().map(function (wk) {
          return { label: wk.label, value: wk.hours };
        }), { height: 200 });
      }

      var modeRadios = el.querySelectorAll('input[name="backup-mode"]');
      Array.prototype.forEach.call(modeRadios, function (radio) {
        radio.addEventListener('change', function () {
          if (!radio.checked) return;
          var box = el.querySelector('#backup-cats');
          if (box) box.style.display = radio.value === 'selected' ? 'block' : 'none';
          setBackupProgress(el, radio.value === 'full' ?
            '完整导出：将包含全部 ' + BACKUP_CATEGORIES.length + ' 类数据' :
            '选择性导出：仅包含勾选的数据类别');
        });
      });

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
          var checked = el.querySelector('input[name="backup-mode"]:checked');
          var keys;
          if (checked && checked.value === 'selected') {
            keys = [];
            Array.prototype.forEach.call(el.querySelectorAll('[data-backup-key]'), function (cb) {
              if (cb.checked) keys.push(cb.getAttribute('data-backup-key'));
            });
          } else {
            keys = BACKUP_CATEGORIES.map(function (c) { return c.key; });
          }
          runExport(el, btn, keys);
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
