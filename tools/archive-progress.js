#!/usr/bin/env node
/**
 * 学习进度自动归档：把「成绩分析 → 导出备份」的 JSON 放进 progress/YYYY/。
 *
 * 用法：
 *   node tools/archive-progress.js <备份 JSON> [后缀] [--dry-run]
 *   例：node tools/archive-progress.js ruankao-sd-backup-2026-11-05.json
 *       node tools/archive-progress.js backup.json stage1
 *
 * 规则：
 * - 日期取 exportedAt 的本地日期；缺失时取文件名里的 YYYY-MM-DD
 * - 目标 progress/YYYY/YYYY-MM-DD[-后缀].json，已存在则不覆盖（只增不改）
 * - 只落盘与打印 git 命令，不自动提交
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PROGRESS = path.join(ROOT, 'progress');

function fail(msg) {
  console.error('× ' + msg);
  process.exit(1);
}

function isPlainObject(v) {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

function pad(n) { return n < 10 ? '0' + n : '' + n; }

function dateFromExportedAt(value) {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

function dateFromName(file) {
  const m = path.basename(file).match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : null;
}

function main() {
  const dryRun = process.argv.indexOf('--dry-run') >= 0;
  const args = process.argv.slice(2).filter(function (a) { return a !== '--dry-run'; });
  if (!args.length) {
    fail('用法：node tools/archive-progress.js <备份 JSON> [后缀] [--dry-run]');
  }

  const src = path.resolve(args[0]);
  const suffix = args[1] ? '-' + String(args[1]).replace(/^-+/, '') : '';

  if (!fs.existsSync(src)) fail('找不到备份文件：' + src);

  const raw = fs.readFileSync(src, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    fail('不是合法的 JSON：' + src);
  }
  if (!isPlainObject(data)) fail('备份根节点应为对象');
  ['answers', 'wrong', 'tasks'].forEach(function (k) {
    if (!isPlainObject(data[k])) fail('缺少或格式不正确的字段：' + k);
  });
  if (!Array.isArray(data.exams)) fail('缺少或格式不正确的字段：exams');

  const date = dateFromExportedAt(data.exportedAt) || dateFromName(src);
  if (!date) fail('无法确定导出日期：exportedAt 无效且文件名不含 YYYY-MM-DD');

  const dir = path.join(PROGRESS, date.slice(0, 4));
  const dest = path.join(dir, date + suffix + '.json');
  const rel = path.relative(ROOT, dest).split(path.sep).join('/');

  if (fs.existsSync(dest)) {
    fail('目标已存在，按「只增不改」不覆盖：' + rel);
  }

  if (!dryRun) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dest, raw, 'utf8');
  }

  console.log((dryRun ? '（预览）' : '√ ') + '已归档：' + rel);
  console.log('');
  console.log('提交命令：');
  console.log('  git add "' + rel + '"');
  console.log('  git commit -m "chore(progress): 归档 ' + date + suffix + ' 学习进度"');
}

main();
