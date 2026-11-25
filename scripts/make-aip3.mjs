// node scripts/make-aip3.mjs public/aip <out dir>: the repo's SPA -> the live /aip3 build on ai.birfoizbilim.uz.
// Same edits the live release carries (base path, API path, language cookie), plus ?v=<hash> on app.js/app.css:
// Cloudflare gives those files a 4 h browser cache, the HTML is never cached, so a new hash reaches every student at once.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const [src, out] = process.argv.slice(2);
fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(src, out, { recursive: true });

function edit(file, rules) {
  const p = path.join(out, file);
  let s = fs.readFileSync(p, 'utf8');
  for (const [from, to, count] of rules) {
    const n = s.split(from).length - 1;
    if (n !== count) throw new Error(`${file}: expected ${count}x ${JSON.stringify(from)}, found ${n}`);
    s = s.split(from).join(to);
  }
  fs.writeFileSync(p, s);
  return s;
}

edit('app.js', [
  ["const API = '/api/aip', BASE = '/aip';", "const API = '/api/aip3', BASE = '/aip3';", 1],
  ["location.pathname.replace(/^\\/aip(?=\\/|$)/, '')", "location.pathname.replace(/^\\/aip3(?=\\/|$)/, '')", 1],
  ['// "#/dars/1?p=P1" -> "/aip/dars/1?p=P1"', '// "#/dars/1?p=P1" -> "/aip3/dars/1?p=P1"', 1],
  ["location.replace('/aip/');", "location.replace(BASE + '/');", 1],
  ['/(?:^|; )aip_lang=(uz|ru)/', '/(?:^|; )aip3_lang=(uz|ru)/', 1],
  ['document.cookie = `aip_lang=${x};', 'document.cookie = `aip3_lang=${x};', 1],
  ['`/aip/deck/${n}/', '`/aip3/deck/${n}/', 3],   // the Slaydlar preview, the viewer iframe and its PDF download
  ["if (/^\\/aip\\/index\\.html$/.test(location.pathname)) history.replaceState(null, '', '/aip/' + location.search);   // /aip/index.html is /aip/",
   "if (/^\\/aip3\\/index\\.html$/.test(location.pathname)) history.replaceState(null, '', BASE + '/' + location.search);   // /aip3/index.html is /aip3/", 1],
]);
const left = fs.readFileSync(path.join(out, 'app.js'), 'utf8').match(/['"`]\/aip\/|aip_lang/g);
if (left) throw new Error('app.js still has /aip/ or aip_lang: ' + left.join(', '));

const v = (f) => crypto.createHash('sha256').update(fs.readFileSync(path.join(out, f))).digest('hex').slice(0, 10);
edit('index.html', [
  ['href="/aip/app.css"', `href="/aip3/app.css?v=${v('app.css')}"`, 1],
  ['src="/aip/login-pin.webp"', 'src="/aip3/login-pin.webp"', 1],
  ['src="/aip/app.js"', `src="/aip3/app.js?v=${v('app.js')}"`, 1],
]);
console.log('aip3 build ready:', out, '| app.js', v('app.js'), '| app.css', v('app.css'));
