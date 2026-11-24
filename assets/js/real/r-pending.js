/* ==========================================================================
 * r-pending.js —— 2025 / 2026 真题来源登记（暂未入库）
 * 这些套卷只有机构答案速对或零散回忆题，没有完整、可核对的题面与答案；
 * 按 docs/07 的口径只登记来源，不计入题量，也不出现在练习抽题池。
 * 2026-11-23 复核：希赛 2025 上仅给题面无答案、2025 下仅给 1~30 答案要点无题面、
 * 2026 上答案为空（需视频）且部分题缺图，均不满足「题面+答案可交叉核对」，维持待补。
 * ========================================================================== */
(function (RK) {
  RK.real.registerPaper({
    key: '2025-05', year: 2025, half: '上半年', label: '2025 年上半年',
    exam: '软件设计师（中级）· 上午卷（综合知识）', paperType: 'morning',
    total: 75, included: 0, pending: true, verified: 'pending',
    absent: '公开来源只有机构答案速对与零散回忆题，未提供完整 75 题题面。',
    excluded: '',
    source: 'https://www.educity.cn/rk/5540047.html',
    sourceLabel: '希赛 2020-2026 真题汇总',
    answerSource: '希赛答案速对',
    answerSourceUrl: 'https://www.educity.cn/rk/5540047.html',
    explanationSource: '未提供',
    sourceNote: '仅登记来源，未录入题目；需取得可校对题面后再按 r-YYYY-MM.js 格式补入。'
  });

  RK.real.registerPaper({
    key: '2025-11', year: 2025, half: '下半年', label: '2025 年下半年',
    exam: '软件设计师（中级）· 上午卷（综合知识）', paperType: 'morning',
    total: 75, included: 0, pending: true, verified: 'pending',
    absent: '公开来源只有 75 题答案速对，未提供完整题面。',
    excluded: '',
    source: 'https://www.educity.cn/rk/5433288.html',
    sourceLabel: '希赛 2025 下答案汇总',
    answerSource: '希赛答案速对',
    answerSourceUrl: 'https://www.educity.cn/rk/5433288.html',
    explanationSource: '未提供',
    sourceNote: '仅登记来源，未录入题目；答案速对不能代替题面，暂不生成练习。'
  });

  RK.real.registerPaper({
    key: '2026-05', year: 2026, half: '上半年', label: '2026 年上半年',
    exam: '软件设计师（中级）· 上午卷（综合知识）', paperType: 'morning',
    total: 75, included: 0, pending: true, verified: 'pending',
    absent: '公开来源只有考情分析与少量回忆题，未提供完整 75 题题面。',
    excluded: '',
    source: 'https://www.educity.cn/rk/5523387.html',
    sourceLabel: '希赛 2026 上考情',
    answerSource: '希赛/公众号回忆版',
    answerSourceUrl: 'https://www.educity.cn/rk/5523387.html',
    explanationSource: '未提供',
    sourceNote: '仅登记来源，未录入题目；待取得可校对题面与完整答案后补入。'
  });

  RK.real.registerPaper({
    key: '2026-11', year: 2026, half: '下半年', label: '2026 年下半年',
    exam: '软件设计师（中级）· 上午卷（综合知识）', paperType: 'morning',
    total: 75, included: 0, pending: true, verified: 'pending',
    absent: '公开来源只有机构考情/答案，未见完整题面。',
    excluded: '',
    source: 'https://www.educity.cn/rk/5540047.html',
    sourceLabel: '希赛 2020-2026 真题汇总',
    answerSource: '希赛答案速对',
    answerSourceUrl: 'https://www.educity.cn/rk/5540047.html',
    explanationSource: '未提供',
    sourceNote: '仅登记来源，未录入题目；后续取得可校对材料再补。'
  });
})(window.RK);
