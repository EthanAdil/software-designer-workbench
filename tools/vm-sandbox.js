/* 校验脚本共用：构造浏览器沙箱、加载脚本、遍历题库目录、汇总结果 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');

function fakeEl() {
  return {
    innerHTML: '',
    textContent: '',
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    style: {},
    setAttribute() {}, getAttribute() { return null; },
    appendChild() {}, removeChild() {}, addEventListener() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    closest() { return null; }
  };
}

/* dom: true 时提供渲染冒烟测试所需的 document / URL / Blob / window 扩展 */
function createSandbox(dom) {
  const memory = {};
  const sandbox = {
    console,
    Math,
    Date,
    JSON,
    setTimeout,
    clearTimeout,
    localStorage: {
      getItem(k) { return Object.prototype.hasOwnProperty.call(memory, k) ? memory[k] : null; },
      setItem(k, v) { memory[k] = String(v); },
      removeItem(k) { delete memory[k]; }
    }
  };
  if (dom) {
    sandbox.URL = { createObjectURL() { return 'blob:'; } };
    sandbox.Blob = function () {};
  }
  sandbox.document = {
    body: {
      setAttribute() {}, getAttribute() { return 'light'; },
      appendChild() {}, removeChild() {}
    },
    getElementById() { return dom ? fakeEl() : null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    createElement() { return dom ? fakeEl() : null; },
    addEventListener() {},
    readyState: 'loading'
  };
  sandbox.window = sandbox;
  sandbox.window.matchMedia = () => ({ matches: false });
  sandbox.window.addEventListener = () => {};
  sandbox.window.location = { hash: '' };
  if (dom) {
    sandbox.window.scrollTo = () => {};
    sandbox.window.getComputedStyle = () => ({ getPropertyValue: () => '#fff' });
  }
  sandbox.__memory = memory;
  vm.createContext(sandbox);
  return sandbox;
}

function load(sandbox, files) {
  files.forEach(rel => {
    vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), sandbox, { filename: rel });
  });
}

function jsFiles(dirRel) {
  return fs.readdirSync(path.join(root, dirRel)).filter(f => f.endsWith('.js')).sort()
    .map(f => dirRel + '/' + f);
}

/* 统一打印提示 / 错误并设置退出码；opts 用于保留各脚本原有标题与前缀 */
function report(errors, warnings, okMsg, opts) {
  opts = opts || {};
  if (warnings && warnings.length) {
    console.log(opts.warnTitle || '提示：');
    warnings.forEach(w => console.log((opts.warnMark || '  ! ') + w));
  }
  if (errors && errors.length) {
    if (opts.errTitle !== '') console.log(opts.errTitle || '错误：');
    errors.forEach(e => console.log((opts.errMark || '  × ') + e));
    process.exitCode = 1;
  } else {
    console.log(okMsg);
  }
}

module.exports = { root, createSandbox, load, jsFiles, report };
