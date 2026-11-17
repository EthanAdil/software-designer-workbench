#!/usr/bin/env node
/**
 * docs/**\/*.md -> 同目录同名 .html（UTF-8，零依赖）
 *
 * 目的：浏览器直接打开 .md 时，部分环境会按系统 GBK 猜测编码，导致中文乱码。
 * 这里生成带 <meta charset="utf-8"> 的静态 HTML，复用站点样式（assets/css/main.css）。
 *
 * 用法：node tools/build-docs.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');

/* ------------------------------ 行内渲染 ------------------------------ */

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* 指数写法（2^(n-1) / 2^k / x^4 / O(n^1.3)）转上标，仅用于展示，语义不变 */
const SUP_RE = /\^(-?\([^()\n]*\)|\{[^{}\n]*\}|[A-Za-z0-9]+(?:\.[0-9]+)?)/g;

function toSup(html) {
  return html.replace(SUP_RE, function (m, exp) {
    const inner = exp.charAt(0) === '{' ? exp.slice(1, -1) : exp;
    return '<sup>' + inner + '</sup>';
  });
}

function inlineText(s) {
  return toSup(esc(s))
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a class="doc-link" href="$2" target="_blank" rel="noopener">$1</a>');
}

function inline(s) {
  const re = /`([^`]+)`/g;
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(s)) !== null) {
    out += inlineText(s.slice(last, m.index));
    out += '<code>' + toSup(esc(m[1])) + '</code>';
    last = re.lastIndex;
  }
  out += inlineText(s.slice(last));
  return out;
}

function plain(s) {
  return s.replace(/`/g, '').replace(/\*\*/g, '');
}

/* ------------------------------ 表格辅助 ------------------------------ */

function cells(row) {
  let r = row.trim();
  if (r.charAt(0) === '|') r = r.slice(1);
  if (r.charAt(r.length - 1) === '|') r = r.slice(0, -1);
  return r.split('|').map(function (c) { return c.trim(); });
}

function isSeparator(line) {
  return /\|/.test(line) && /^\|?[\s:|-]*-{3,}[\s:|-]*\|?$/.test(line.trim());
}

function isTableStart(lines, i) {
  return /^\s*\|/.test(lines[i]) && i + 1 < lines.length && isSeparator(lines[i + 1]);
}

function alignOf(sep) {
  return cells(sep).map(function (c) {
    const l = c.charAt(0) === ':';
    const r = c.charAt(c.length - 1) === ':';
    if (l && r) return 'center';
    if (r) return 'right';
    if (l) return 'left';
    return '';
  });
}

/* ------------------------------ 块级渲染 ------------------------------ */

function startsBlock(lines, i) {
  const l = lines[i];
  if (/^\s*$/.test(l)) return true;
  if (/^```/.test(l)) return true;
  if (/^#{1,6}\s+/.test(l)) return true;
  if (/^>\s?/.test(l)) return true;
  if (/^[-*]\s+/.test(l)) return true;
  if (/^\d+\.\s+/.test(l)) return true;
  if (/^(---|\*\*\*|___)\s*$/.test(l)) return true;
  if (isTableStart(lines, i)) return true;
  return false;
}

function convert(md) {
  const lines = md.replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    /* 空行 */
    if (/^\s*$/.test(line)) { i++; continue; }

    /* 围栏代码块 */
    let m = line.match(/^```\s*([\w+#.-]*)\s*$/);
    if (m) {
      const lang = m[1];
      const buf = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++;
      const cls = lang ? ' class="language-' + lang.replace(/[^\w-]/g, '') + '"' : '';
      out.push('<pre><code' + cls + '>' + toSup(esc(buf.join('\n'))) + '</code></pre>');
      continue;
    }

    /* 分隔线 */
    if (/^(---|\*\*\*|___)\s*$/.test(line)) { out.push('<hr />'); i++; continue; }

    /* 标题 */
    m = line.match(/^(#{1,6})\s+(.*)$/);
    if (m) {
      const level = m[1].length;
      out.push('<h' + level + '>' + inline(m[2].trim()) + '</h' + level + '>');
      i++;
      continue;
    }

    /* 表格 */
    if (isTableStart(lines, i)) {
      const align = alignOf(lines[i + 1]);
      const head = cells(line);
      i += 2;
      const body = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) { body.push(cells(lines[i])); i++; }

      let t = '<div class="doc-table"><table><thead><tr>';
      head.forEach(function (c, idx) {
        t += '<th' + (align[idx] ? ' style="text-align:' + align[idx] + '"' : '') + '>' + inline(c) + '</th>';
      });
      t += '</tr></thead><tbody>';
      body.forEach(function (row) {
        t += '<tr>';
        row.forEach(function (c, idx) {
          const span = idx < head.length ? '' : ' class="doc-extra-cell"';
          t += '<td' + span + (align[idx] ? ' style="text-align:' + align[idx] + '"' : '') + '>' + inline(c) + '</td>';
        });
        t += '</tr>';
      });
      t += '</tbody></table></div>';
      out.push(t);
      continue;
    }

    /* 引用 */
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push('<blockquote><p>' + buf.map(inline).join('<br />') + '</p></blockquote>');
      continue;
    }

    /* 列表（含任务清单） */
    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const itemRe = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
      const startNum = ordered ? parseInt(line.match(/^(\d+)\./)[1], 10) : 1;
      const items = [];

      while (i < lines.length) {
        if (itemRe.test(lines[i])) {
          items.push(lines[i].replace(itemRe, ''));
          i++;
          continue;
        }
        if (/^\s{2,}\S/.test(lines[i]) && items.length) {
          items[items.length - 1] += '\n' + lines[i].trim();
          i++;
          continue;
        }
        break;
      }

      const task = !ordered && items.every(function (t) { return /^\[[ xX]\]\s+/.test(t); });
      const tag = ordered ? 'ol' : 'ul';
      const attrs = ordered && startNum !== 1 ? ' start="' + startNum + '"' : '';
      let list = '<' + tag + (task ? ' class="task-list"' : '') + attrs + '>';
      items.forEach(function (t) {
        if (!ordered) {
          const tm = t.match(/^\[([ xX])\]\s+([\s\S]*)$/);
          if (tm) {
            list += '<li class="task"><input type="checkbox" disabled' +
              (tm[1].toLowerCase() === 'x' ? ' checked' : '') + ' /> <span>' +
              tm[2].split('\n').map(inline).join('<br />') + '</span></li>';
            return;
          }
        }
        list += '<li>' + t.split('\n').map(inline).join('<br />') + '</li>';
      });
      list += '</' + tag + '>';
      out.push(list);
      continue;
    }

    /* 段落 */
    const buf = [];
    while (i < lines.length && !startsBlock(lines, i)) { buf.push(lines[i]); i++; }
    out.push('<p>' + buf.map(inline).join('<br />') + '</p>');
  }

  return out.join('\n');
}

/* 把正文里 `xx-yy.md` 形式的同目录引用指向生成的 HTML（文本不变） */
function linkDocs(html, dir) {
  return html.replace(/(?<!<pre>)<code>([^<]*?\.md)<\/code>/g, function (m, name) {
    const href = path.basename(name, '.md') + '.html';
    if (!fs.existsSync(path.join(dir, href))) return m;
    return '<a class="doc-link" href="' + encodeURI(href) + '"><code>' + name + '</code></a>';
  });
}

/* ------------------------------ 页面模板 ------------------------------ */

function page(title, body, prefix, crumb) {
  return '<!DOCTYPE html>\n' +
    '<html lang="zh-CN">\n' +
    '<head>\n' +
    '<meta charset="utf-8" />\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1" />\n' +
    '<meta name="color-scheme" content="light dark" />\n' +
    '<title>' + esc(title) + '</title>\n' +
    '<link rel="icon" type="image/svg+xml" href="' + prefix + 'assets/img/favicon.svg" />\n' +
    '<link rel="icon" type="image/png" sizes="32x32" href="' + prefix + 'assets/img/favicon-32x32.png" />\n' +
    '<link rel="icon" href="' + prefix + 'favicon.ico" sizes="any" />\n' +
    '<link rel="apple-touch-icon" sizes="180x180" href="' + prefix + 'assets/img/apple-touch-icon.png" />\n' +
    '<link rel="stylesheet" href="' + prefix + 'assets/css/main.css" />\n' +
    '<link rel="stylesheet" href="' + prefix + 'assets/css/doc.css" />\n' +
    '</head>\n' +
    '<body class="doc-body">\n' +
    '<header class="doc-topbar">\n' +
    '  <a class="doc-back" href="' + prefix + 'index.html">← 返回工作台</a>\n' +
    '  <span class="doc-crumb">' + esc(crumb) + '</span>\n' +
    '</header>\n' +
    '<main class="doc">\n' + body + '\n</main>\n' +
    '<footer class="doc-footer">本文档由同名 Markdown 生成（UTF-8 编码）；内容修改请改 .md 后重新运行 <code>node tools/build-docs.js</code>。</footer>\n' +
    '</body>\n' +
    '</html>\n';
}

/* ------------------------------ 构建 + 自检 ------------------------------ */

function walk(dir, acc) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (e) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.md$/i.test(e.name)) acc.push(p);
  });
  return acc;
}

function stats(md, html) {
  const lines = md.replace(/\r\n?/g, '\n').split('\n');
  let tables = 0;
  let tableRows = 0;
  let fences = 0;
  let headings = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/^#{1,6}\s+/.test(lines[i])) headings++;
    if (/^```/.test(lines[i])) fences++;
    if (i + 1 < lines.length && isTableStart(lines, i)) {
      tables++;
      let j = i + 2;
      while (j < lines.length && /^\s*\|/.test(lines[j])) { tableRows++; j++; }
    }
  }
  return {
    h: headings,
    tr: (html.match(/<tr>/g) || []).length,
    trExpect: tableRows + tables,
    rows: tableRows,
    pre: (html.match(/<pre>/g) || []).length,
    f: Math.floor(fences / 2)
  };
}

function main() {
  const files = walk(DOCS, []);
  let ok = true;

  files.forEach(function (file) {
    const md = fs.readFileSync(file, 'utf8');
    const dir = path.dirname(file);
    const html = linkDocs(convert(md), dir);
    const relFromRoot = path.relative(dir, ROOT).split(path.sep).join('/');
    const prefix = relFromRoot ? relFromRoot + '/' : '';
    const relDir = path.dirname(path.relative(DOCS, file));
    const crumb = relDir === '.' ? 'docs' : 'docs / ' + relDir.split(path.sep).join(' / ');
    const h1 = (md.match(/^#\s+(.*)$/m) || [null, path.basename(file, '.md')])[1];
    const title = plain(h1).trim() + ' · 软件设计师';

    const outFile = file.replace(/\.md$/i, '.html');
    const outHtml = page(title, html, prefix, crumb);
    fs.writeFileSync(outFile, outHtml, 'utf8');

    const s = stats(md, html);
    const problems = [];
    if (!/<meta charset="utf-8" \/>/.test(outHtml)) problems.push('缺少 charset 声明');
    if (s.tr !== s.trExpect) problems.push('表格行数不符 ' + s.tr + '/' + s.trExpect);
    if (s.pre !== s.f) problems.push('代码块数量不符 ' + s.pre + '/' + s.f);
    if (/\uFFFD/.test(outHtml)) problems.push('含替换字符');
    if (/\*\*[^*\n]+\*\*/.test(html)) problems.push('残留 ** 标记');
    if (/\|\s*-{3,}\s*\|/.test(html)) problems.push('残留表格分隔行');
    if (problems.length) ok = false;

    console.log(
      (problems.length ? '× ' : '√ ') +
      path.relative(ROOT, outFile).padEnd(46, ' ') +
      ' 表' + s.rows + '行  块' + s.pre + '  标题' + s.h +
      (problems.length ? '  → ' + problems.join('；') : '')
    );
  });

  console.log('\n共 ' + files.length + ' 篇，' + (ok ? '全部通过' : '存在异常，请检查上面的 × 行'));
  if (!ok) process.exitCode = 1;
}

main();
