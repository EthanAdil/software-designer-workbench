/* ==========================================================================
 * views-practice.js —— 刷题练习：自选模块组合 / 随机 / 按模块 / 错题重做
 * ========================================================================== */
(function (RK) {
  var U = RK.U;
  var LETTERS = U.letters;
  var session = null;

  var SCALES = [20, 30, 40, 75];   /* 自选模块练习的总题量档位 */
  var SEL_KEY = 'practice_sel';    /* 勾选模块与档位记忆，前缀 rk_sd_ 由 RK.store 统一加 */

  /**
   * 自选模块练习的题量分配：
   * - 本次题量 = round(档位 × 勾选模块权重和 / 75)，即一份「缩小版上午卷」；全选 13 模块时权重和正好 75，
   *   各模块题数等于该模块上午卷权重
   * - 最大余数法取整：先取 floor，余额给小数部分最大的模块，同余数按权重降序
   * - 档位够分（总题量 ≥ 勾选模块数）时保证每个模块至少 1 题，从「超出理想值最多」的模块挪
   * - 某模块题库不够时按权重从高到低把余量补给仍有余量的模块，保证总数不缩水
   * 返回 { total, items: [{ key, count }] }，各模块题数不会超出该模块题库。
   */
  function planCombined(mods, scale) {
    if (!mods || !mods.length) return { total: 0, items: [] };
    var wsum = 0;
    mods.forEach(function (m) { wsum += m.weight; });
    var total = Math.max(1, Math.round(scale * wsum / 75));

    var want = {};
    var ideal = {};
    var used = 0;
    var raw = mods.map(function (m) {
      var v = total * m.weight / wsum;
      want[m.key] = Math.floor(v);
      ideal[m.key] = v;
      used += want[m.key];
      return { key: m.key, weight: m.weight, v: v };
    });
    raw.slice().sort(function (a, b) {
      return (b.v - Math.floor(b.v)) - (a.v - Math.floor(a.v)) || b.weight - a.weight;
    }).forEach(function (r) {
      if (used < total) { want[r.key] += 1; used += 1; }
    });

    if (total >= mods.length) {
      mods.forEach(function (m) {
        if (want[m.key] > 0) return;
        var donor = null;
        mods.forEach(function (d) {
          if (d.key === m.key || want[d.key] <= 1) return;
          var surplus = want[d.key] - ideal[d.key];
          if (!donor || surplus > donor.surplus) donor = { key: d.key, surplus: surplus };
        });
        if (donor) { want[donor.key] -= 1; want[m.key] = 1; }
      });
    }

    var cap = {};
    var got = 0;
    mods.forEach(function (m) {
      cap[m.key] = Math.min(want[m.key], (RK.byModule[m.key] || []).length);
      got += cap[m.key];
    });

    var deficit = total - got;
    var order = mods.slice().sort(function (a, b) { return b.weight - a.weight; });
    while (deficit > 0) {
      var moved = false;
      for (var i = 0; i < order.length && deficit > 0; i++) {
        var key = order[i].key;
        if (cap[key] < (RK.byModule[key] || []).length) {
          cap[key] += 1; deficit -= 1; moved = true;
        }
      }
      if (!moved) break;
    }

    var items = [];
    var sum = 0;
    mods.forEach(function (m) {
      if (cap[m.key] > 0) { items.push({ key: m.key, count: cap[m.key] }); sum += cap[m.key]; }
    });
    return { total: sum, items: items };
  }

  function combinedList(keys, scale) {
    var mods = [];
    keys.forEach(function (k) { if (RK.MODULE_MAP[k]) mods.push(RK.MODULE_MAP[k]); });
    var picked = [];
    planCombined(mods, scale).items.forEach(function (it) {
      picked = picked.concat(U.sample(RK.byModule[it.key] || [], it.count));
    });
    return U.shuffle(picked);
  }

  function savedSelection() {
    var saved = RK.store.get(SEL_KEY, null);
    var keys;
    var scale = 30;
    if (saved && Object.prototype.toString.call(saved.c) === '[object Array]') {
      /* 存过就照存：全不选也保留为空，刷新后不擅自回填全部模块 */
      keys = saved.c.filter(function (k) { return !!RK.MODULE_MAP[k]; });
    } else {
      keys = RK.MODULES.map(function (m) { return m.key; });
    }
    if (saved && SCALES.indexOf(Number(saved.n)) >= 0) scale = Number(saved.n);
    return { keys: keys, scale: scale };
  }

  function saveSelection(keys, scale) {
    RK.store.set(SEL_KEY, { c: keys || [], n: Number(scale) || 30 });
  }

  function buildList(params) {
    if (params.w) {
      var wrong = RK.record.wrongAll();
      var ids = Object.keys(wrong).filter(function (id) { return !wrong[id].resolved; });
      return ids.map(function (id) { return RK.getQuestion(id); }).filter(Boolean);
    }
    if (params.m && RK.byModule[params.m]) {
      return U.shuffle(RK.byModule[params.m]);
    }
    if (params.c) {
      return combinedList(params.c.split(','), Number(params.n) || 30);
    }
    var n = Number(params.r) || 30;
    return U.sample(RK.bank.morning, n);
  }

  function signature(params) {
    return [params.m || '', params.r || '', params.w || '', params.c || '', params.n || ''].join('|');
  }

  function ensureSession(params) {
    var sig = signature(params);
    if (session && session.sig === sig) return session;
    /* 本次练习内每题固定一套乱序选项，重绘/回看不会变 */
    var list = buildList(params).map(RK.variant);
    var mode = params.w ? 'w' : (params.m ? 'm' : (params.c ? 'c' : 'r'));
    var title = '随机练习';
    if (mode === 'w') title = '错题重做';
    else if (mode === 'm') title = RK.moduleName(params.m) + ' · 专项练习';
    else if (mode === 'c') {
      var keys = params.c.split(',').filter(function (k) { return !!RK.MODULE_MAP[k]; });
      title = '自选模块练习 · ' + keys.length + ' 个模块 · ' + (Number(params.n) || 30) + ' 题档';
    }
    session = {
      sig: sig,
      mode: mode,
      list: list,
      idx: 0,
      picked: {},
      correct: 0,
      wrong: 0,
      done: false,
      title: title
    };
    return session;
  }

  /* ---------------- 题目区渲染 ---------------- */
  function renderBox() {
    var s = session;
    if (!s.list.length) {
      var tip = '';
      if (s.mode === 'w') tip = '先去刷题积累错题，或错题已全部掌握。';
      else if (s.mode === 'c') tip = '勾选的模块题库为空，换一组模块试试。';
      return '<div class="empty">当前没有可练的题目。' + tip + '</div>';
    }
    if (s.done) return renderSummary();

    var q = s.list[s.idx];
    var picked = s.picked[s.idx];
    var answered = picked !== undefined;
    var mod = RK.MODULE_MAP[q.module];
    var h = '';

    h += '<div class="q-head">';
    h += '<span class="badge" style="background:' + (mod ? mod.color : '#666') + ';color:#fff">' + U.esc(mod ? mod.short : q.module) + '</span>';
    if (q.topic) h += '<span class="badge badge-plain">' + U.esc(q.topic) + '</span>';
    if (q.difficulty) h += '<span class="badge badge-plain">难度 ' + q.difficulty + '/3</span>';
    h += '<span class="spacer"></span><span class="q-index">' + q.id + '</span>';
    h += '</div>';

    h += '<div class="q-stem">' + U.esc(q.stem) + '</div>';
    h += '<div class="opts">';
    q.options.forEach(function (opt, i) {
      var cls = 'opt';
      if (answered) {
        if (i === q.answer) cls += ' is-correct';
        else if (i === picked) cls += ' is-wrong';
        else cls += ' is-dim';
      }
      h += '<div class="' + cls + '" data-opt="' + i + '">' +
        '<span class="opt-key">' + LETTERS[i] + '</span><span>' + U.esc(opt) + '</span></div>';
    });
    h += '</div>';

    if (answered) {
      var ok = picked === q.answer;
      h += '<div class="explain"><div class="ex-title ' + (ok ? 'ok' : 'bad') + '">' +
        (ok ? '回答正确' : '回答错误，正确答案 ' + LETTERS[q.answer]) + '</div>' + U.esc(q.explanation) + '</div>';
    }

    h += '<div class="q-toolbar">';
    h += '<button class="btn btn-ghost" data-act="prev"' + (s.idx === 0 ? ' disabled' : '') + '>上一题</button>';
    if (answered) {
      if (s.idx === s.list.length - 1) {
        h += '<button class="btn" data-act="finish">完成练习，查看小结</button>';
      } else {
        h += '<button class="btn" data-act="next">下一题</button>';
      }
    } else {
      h += '<span class="dim" style="font-size:12.5px">选择一个答案后立即判题</span>';
    }
    h += '<span class="spacer"></span>';
    h += '<button class="btn btn-sm btn-ghost" data-act="reset">重新开始</button>';
    h += '</div>';

    return h;
  }

  function renderSummary() {
    var s = session;
    var total = s.list.length;
    var answeredCount = Object.keys(s.picked).length;
    var rate = answeredCount ? s.correct / answeredCount : 0;
    var h = '<div class="card-head"><h2>练习小结</h2><span class="hint">' + U.esc(s.title) + '</span></div>';
    h += '<div class="grid grid-3">' +
      '<div class="kpi"><span class="kpi-label">已答</span><span class="kpi-value">' + answeredCount + ' <small>/ ' + total + '</small></span></div>' +
      '<div class="kpi"><span class="kpi-label">正确率</span><span class="kpi-value">' + U.pct(rate) + '</span></div>' +
      '<div class="kpi"><span class="kpi-label">错题</span><span class="kpi-value">' + s.wrong + ' <small>题</small></span></div>' +
      '</div>';
    h += '<div class="mt-16">' + RK.ui.bar(rate) + '</div>';

    var wrongList = [];
    Object.keys(s.picked).forEach(function (i) {
      var q = s.list[Number(i)];
      if (q && s.picked[i] !== q.answer) wrongList.push(q);
    });
    if (wrongList.length) {
      h += '<div class="divider"></div><div class="dim" style="font-size:12.5px;margin-bottom:6px">本次错题（已自动进入错题本）</div>';
      wrongList.forEach(function (q) {
        h += '<div class="task"><span class="task-text">' + U.esc(q.stem.slice(0, 46)) + '… <span class="dim">（' + q.id + '）</span></span></div>';
      });
    }
    h += '<div class="row mt-16">' +
      '<button class="btn" data-act="reset">再练一遍</button>' +
      '<a class="btn btn-ghost" href="#/practice">返回练习首页</a>' +
      '<a class="btn btn-ghost" href="#/review">查看错题本</a>' +
      '</div>';
    return h;
  }

  function renderCounters() {
    var s = session;
    var answered = Object.keys(s.picked).length;
    var rate = answered ? s.correct / answered : null;
    return '<span class="mono">第 ' + Math.min(s.idx + 1, s.list.length) + ' / ' + s.list.length + ' 题</span>' +
      '<span class="spacer"></span>' +
      '<span class="badge badge-ok">正确 ' + s.correct + '</span>' +
      '<span class="badge badge-bad">错误 ' + s.wrong + '</span>' +
      '<span class="badge badge-plain">正确率 ' + (rate === null ? '—' : U.pct(rate)) + '</span>';
  }

  /* ---------------- 自选模块练习（首页勾选器） ---------------- */
  function renderComboCard() {
    var sel = savedSelection();
    var h = '<div class="card mt-16"><div class="card-head"><h2>自选模块练习</h2>' +
      '<span class="hint">只练已学完的模块，题量按上午卷权重折算</span></div>';
    h += '<p class="dim" style="font-size:12.5px;margin-bottom:10px;line-height:1.75">' +
      '题量 = 档位 × 勾选模块权重合计 ÷ 75，相当于一份「缩小版上午卷」：' +
      '例如只勾组成原理(7)+操作系统(6)+数据结构(8)，权重合计 21，30 题档出 8 题（3 / 2 / 3）。</p>';
    h += '<div class="mod-pick">';
    RK.MODULES.forEach(function (m) {
      var on = sel.keys.indexOf(m.key) >= 0;
      var pool = (RK.byModule[m.key] || []).length;
      h += '<label class="mod-pick-item' + (on ? ' is-on' : '') + '">' +
        '<input type="checkbox" data-mod="' + m.key + '"' + (on ? ' checked' : '') + '>' +
        '<i class="dot" style="background:' + m.color + '"></i>' +
        '<span>' + U.esc(m.short) + '</span>' +
        '<span class="mod-pick-meta">' + m.weight + '/卷 · 题库 ' + pool + '</span>' +
        '</label>';
    });
    h += '</div>';
    h += '<div class="row mt-8" style="gap:8px">' +
      '<span class="dim" style="font-size:12.5px">选择模块</span>' +
      '<span class="spacer"></span>' +
      '<button type="button" class="btn btn-sm btn-ghost" data-act="combo-all">全选</button>' +
      '<button type="button" class="btn btn-sm btn-ghost" data-act="combo-none">全不选</button>' +
      '</div>';
    h += '<div class="row mt-16" style="flex-wrap:wrap;gap:12px">' +
      '<span class="dim" style="font-size:12.5px">题量档</span><div class="seg" id="combo-scale">';
    SCALES.forEach(function (n) {
      h += '<button type="button" class="seg-btn' + (sel.scale === n ? ' is-on' : '') + '" data-scale="' + n + '">' + n + ' 题</button>';
    });
    h += '</div><span class="spacer"></span>' +
      '<button type="button" class="btn" data-act="combo-start">开始练习</button></div>';
    h += '<div class="mt-8" id="combo-preview" style="font-size:12.5px;color:var(--text-2);line-height:1.75"></div>';
    h += '</div>';
    return h;
  }

  function pickedKeys(el) {
    var out = [];
    var inputs = el.querySelectorAll('.mod-pick input[data-mod]');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) out.push(inputs[i].getAttribute('data-mod'));
    }
    return out;
  }

  function pickedScale(el) {
    var on = el.querySelector('#combo-scale .seg-btn.is-on');
    return on ? Number(on.getAttribute('data-scale')) : 30;
  }

  function previewCombined(el) {
    var box = el.querySelector('#combo-preview');
    if (!box) return;
    var keys = pickedKeys(el);
    if (!keys.length) {
      box.innerHTML = '未勾选模块：至少勾选 1 个模块才能开始。';
      return;
    }
    var mods = [];
    keys.forEach(function (k) { if (RK.MODULE_MAP[k]) mods.push(RK.MODULE_MAP[k]); });
    var plan = planCombined(mods, pickedScale(el));
    var parts = plan.items.map(function (it) {
      return U.esc(RK.MODULE_MAP[it.key].short) + ' ' + it.count;
    });
    box.innerHTML = '本次将抽 <strong>' + plan.total + '</strong> 题：' + parts.join(' · ');
  }

  function mountHome(el) {
    previewCombined(el);

    el.addEventListener('change', function (e) {
      var input = e.target.closest ? e.target.closest('.mod-pick input[data-mod]') : null;
      if (!input) return;
      if (input.parentNode && input.parentNode.classList) {
        input.parentNode.classList.toggle('is-on', input.checked);
      }
      saveSelection(pickedKeys(el), pickedScale(el));
      previewCombined(el);
    });

    el.addEventListener('click', function (e) {
      var bulk = e.target.closest ? e.target.closest('[data-act="combo-all"],[data-act="combo-none"]') : null;
      if (bulk) {
        var check = bulk.getAttribute('data-act') === 'combo-all';
        var boxes = el.querySelectorAll('.mod-pick input[data-mod]');
        for (var j = 0; j < boxes.length; j++) {
          boxes[j].checked = check;
          if (boxes[j].parentNode && boxes[j].parentNode.classList) {
            boxes[j].parentNode.classList.toggle('is-on', check);
          }
        }
        saveSelection(pickedKeys(el), pickedScale(el));
        previewCombined(el);
        return;
      }

      var seg = e.target.closest ? e.target.closest('#combo-scale .seg-btn') : null;
      if (seg) {
        var btns = el.querySelectorAll('#combo-scale .seg-btn');
        for (var i = 0; i < btns.length; i++) btns[i].classList.remove('is-on');
        seg.classList.add('is-on');
        saveSelection(pickedKeys(el), pickedScale(el));
        previewCombined(el);
        return;
      }

      var start = e.target.closest ? e.target.closest('[data-act="combo-start"]') : null;
      if (!start) return;
      var keys = pickedKeys(el);
      if (!keys.length) { RK.toast('请至少勾选 1 个模块'); return; }
      var scale = pickedScale(el);
      saveSelection(keys, scale);
      RK.router.go('/practice?c=' + keys.join(',') + '&n=' + scale);
    });
  }

  /* ---------------- 视图 ---------------- */
  RK.router.add('practice', {
    title: '刷题练习',
    sub: '点击选项立即判题并显示解析，答错自动进入错题本',
    render: function (params) {
      var isSession = params.m || params.r || params.w || params.c;

      if (!isSession) {
        var h = '';
        var wrong = RK.record.wrongAll();
        var unresolved = Object.keys(wrong).filter(function (id) { return !wrong[id].resolved; }).length;

        h += '<div class="grid grid-3">';
        h += '<div class="card"><div class="card-head"><h2>随机练习</h2></div>' +
          '<p class="dim" style="font-size:13px">从全部题库中随机抽 30 题，适合碎片时间保持手感。</p>' +
          '<a class="btn mt-8" href="#/practice?r=30">开始 30 题</a></div>';
        h += '<div class="card"><div class="card-head"><h2>错题重做</h2></div>' +
          '<p class="dim" style="font-size:13px">当前待攻克错题 <strong>' + unresolved + '</strong> 题（答对后自动标记为已掌握）。</p>' +
          '<a class="btn mt-8" href="#/practice?w=1"' + (unresolved ? '' : ' style="opacity:.5;pointer-events:none"') + '>开始重做</a></div>';
        h += '<div class="card"><div class="card-head"><h2>当前总量</h2></div>' +
          '<div class="kpi"><span class="kpi-value">' + RK.bank.morning.length + ' <small>题</small></span>' +
          '<span class="dim" style="font-size:12px">覆盖 ' + RK.MODULES.length + ' 个模块，按考点权重分布</span></div></div>';
        h += '</div>';

        h += renderComboCard();

        var mastery = RK.mastery();
        h += '<div class="card mt-16"><div class="card-head"><h2>按模块练习</h2><span class="hint">题目数量与上午卷权重一致</span></div>';
        h += '<div class="grid grid-3">';
        RK.MODULES.forEach(function (m) {
          var count = (RK.byModule[m.key] || []).length;
          var s = mastery[m.key];
          h += '<div class="card module-card" style="box-shadow:none;background:var(--surface-2)">' +
            '<div class="mod-top"><span class="mod-name"><i class="dot" style="background:' + m.color + '"></i> ' + U.esc(m.name) + '</span>' +
            '<span class="mod-weight">' + m.weight + ' 题/卷</span></div>' +
            '<div class="row" style="justify-content:space-between;font-size:12px;color:var(--text-3)">' +
            '<span>题库 ' + count + ' 题</span><span>' + (s.rate === null ? '未练' : U.pct(s.rate)) + '</span></div>' +
            RK.ui.bar(s.rate) +
            '<div class="row-wrap"><a class="btn btn-sm btn-soft" href="#/practice?m=' + m.key + '">开始练习</a>' +
            '<a class="btn btn-sm btn-ghost" href="#/knowledge?m=' + m.key + '">看要点</a></div>' +
            '</div>';
        });
        h += '</div></div>';
        return h;
      }

      var s = ensureSession(params);
      return '<div class="card">' +
        '<div class="row" id="prac-counters" style="margin-bottom:14px">' + renderCounters() + '</div>' +
        '<div id="qbox">' + renderBox() + '</div>' +
        '</div>';
    },

    mount: function (el, params) {
      /* 首页：绑定勾选器、题量档与开始按钮 */
      if (!params.c && !params.m && !params.r && !params.w) {
        mountHome(el);
        return;
      }
      if (!session) return;

      el.addEventListener('click', function (e) {
        var s = session;
        if (!s) return;

        var opt = e.target.closest('[data-opt]');
        if (opt && !s.done) {
          var i = Number(opt.getAttribute('data-opt'));
          if (s.picked[s.idx] !== undefined) return;
          var q = s.list[s.idx];
          s.picked[s.idx] = i;
          var ok = i === q.answer;
          if (ok) s.correct += 1; else s.wrong += 1;
          RK.record.answer(q.id, ok, i, q.order);
          el.querySelector('#qbox').innerHTML = renderBox();
          var counters = el.querySelector('#prac-counters');
          if (counters) counters.innerHTML = renderCounters();
          return;
        }

        var actEl = e.target.closest('[data-act]');
        if (!actEl) return;
        var act = actEl.getAttribute('data-act');

        if (act === 'next') {
          if (s.idx < s.list.length - 1) s.idx += 1;
          el.querySelector('#qbox').innerHTML = renderBox();
        } else if (act === 'prev') {
          if (s.idx > 0) s.idx -= 1;
          el.querySelector('#qbox').innerHTML = renderBox();
        } else if (act === 'finish') {
          s.done = true;
          el.querySelector('#qbox').innerHTML = renderBox();
        } else if (act === 'reset') {
          session = null;
          RK.router.render();
          return;
        }
        var row = el.querySelector('#prac-counters');
        if (row) row.innerHTML = renderCounters();
      });
    }
  });
})(window.RK);
