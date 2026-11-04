# progress/ · 学习进度归档

存放站内「成绩分析 → 导出备份（JSON）」产生的进度快照，一次导出一个文件，纳入 Git 便于回溯、对比与跨设备迁移。

## 一、目录结构

```
progress/
├── README.md                 本说明
├── 2026/
│   └── 2026-11-04.json       2026 年的快照
└── 2027/
    └── 2027-01-10-stage1.json
```

- **按年份分目录**：整个备考期 29 周约 30 份文件，分年后单目录不超过 10 个，浏览和 diff 都不费劲。
- **文件名 = 导出日期**（本地时区，`YYYY-MM-DD.json`），与文件内 `exportedAt`（UTC）对应。
- 关键节点加后缀：`-stage1` / `-stage2` / `-stage3` / `-mock08`，便于一眼找到阶段测评与模考当天的状态。

## 二、文件内容

| 字段 | 含义 |
| --- | --- |
| `exportedAt` | 导出时间，ISO 8601（UTC，比北京时间早 8 小时） |
| `answers` | 每题累计作答：`right` / `wrong` / `last`（最近一次是否答对）/ `ts` |
| `wrong` | 错题记录：`count`、`choice`（当时选项下标）、`order`（当时选项顺序）、`resolved`、`cause`、`conclusion` |
| `exams` | 阶段测评与模考成绩 |
| `tasks` | 计划打卡，任务 id → `true` |

## 三、采集与归档

1. 打开 `index.html` → 「成绩分析」→ 导出备份（JSON）；
2. 把下载得到的 `ruankao-sd-backup-YYYY-MM-DD.json` 重命名为 `YYYY-MM-DD.json`，放进当年目录；
3. 提交：

```bash
git add progress
git commit -m "chore(progress): 归档 2026-11-04 学习进度"
```

**节奏**：每周日复盘时导出一次；阶段测评、模考当天各额外导出一次并加后缀。

## 四、维护约定

- **只增不改**：历史快照保留原样，即使发现当天数据有误也不回改，用下一次导出覆盖"当前状态"即可。
- **不要手工编辑 JSON**：`wrong.order` 与题库选项顺序绑定，手改容易和界面显示错位；需要修正请在界面里重做该题后重新导出。
- 单文件约 3~10KB，无需压缩，也不必进 LFS。
- 本目录不参与站点构建，`index.html` 不引用其中任何文件。

## 五、恢复说明

当前版本只有导出入口，**界面没有导入按钮**。JSON 与浏览器 `localStorage` 同构（键前缀 `rk_sd_`），换设备或清缓存后可在开发者工具控制台手工回填：

```js
const d = /* 粘贴 JSON 内容 */;
localStorage.setItem('rk_sd_tasks', JSON.stringify(d.tasks || {}));
localStorage.setItem('rk_sd_answers', JSON.stringify(d.answers || {}));
localStorage.setItem('rk_sd_wrong', JSON.stringify(d.wrong || {}));
localStorage.setItem('rk_sd_exams', JSON.stringify(d.exams || []));
```

写入后刷新页面即可看到打卡、错题本与成绩趋势恢复。注意 `rk_sd_theme`（主题）不在备份范围内。
