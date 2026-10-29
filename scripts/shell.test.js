// The built SPA (public/aip, from `python .design/comp/src/build.py --app`) must satisfy the portal's CSP and must not carry course content:
// public/ is served WITHOUT login, so a lesson string in the bundle would bypass the gating of the API.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public', 'aip');
const have = fs.existsSync(path.join(pub, 'index.html'));
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);

test('SPA shell: no inline script, no inline handlers, no third-party fonts or scripts', { skip: !have && 'public/aip is not built' }, () => {
  const html = fs.readFileSync(path.join(pub, 'index.html'), 'utf8');
  assert.deepEqual([...html.matchAll(/<script\b([^>]*)>/g)].map(m => m[1].trim()), ['src="/aip/app.js" defer'], 'one external script only');
  assert.doesNotMatch(html, /<script[^>]*>[^<]/, 'a script tag with a body');
  assert.doesNotMatch(html, /\son[a-z]+\s*=/i, 'an inline event handler');
  assert.deepEqual(html.match(/https?:\/\/(?!www\.w3\.org\/)[^\s"')]+/g) || [], [], 'a remote URL in the shell (www.w3.org is only the svg namespace)');
  const css = fs.readFileSync(path.join(pub, 'app.css'), 'utf8');
  assert.deepEqual(css.match(/https?:\/\/(?!www\.w3\.org\/)[^\s"')]+/g) || [], [], 'a remote URL in the css');
  for (const m of css.matchAll(/url\((?:fonts\/)([^)]+)\)/g)) assert.ok(fs.existsSync(path.join(pub, 'fonts', m[1])), 'missing font file ' + m[1]);
});

test('SPA bundle holds no course content (every lesson string of every language is searched in public/)', { skip: !have && 'public/aip is not built' }, () => {
  const strings = function* (o) { if (typeof o === 'string') yield o; else if (o && typeof o === 'object') for (const v of Object.values(o)) yield* strings(v); };
  const norm = s => s.replace(/[ʻʼ]/g, "'");
  const bundle = norm(walk(path.join(root, 'public')).filter(f => /\.(js|html|css|json)$/.test(f)).map(f => fs.readFileSync(f, 'utf8')).join('\n'));
  // platform sentences that happen to use the same words as a 2.0 lesson sentence: UI text, not content
  const ui = new Set(['Open the section that fits your task', 'Vaqt qolsa yoki uyda ishlash uchun', "Vazifangizga mos bo'limni oching"]);   // (compared without the final full stop)
  const found = new Set();
  for (const lesson of fs.readdirSync(path.join(root, 'content', 'lessons'))) {
    const dir = path.join(root, 'content', 'lessons', lesson);
    for (const f of fs.readdirSync(dir).filter(x => /^lesson\..+\.json$/.test(x)))
      for (let s of strings(JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))) {
        s = norm(s.trim()).replace(/[\s.,;:!?…"')\]»]+$/, '');   // a trailing full stop or quote must not hide a match
        if (ui.has(s) || /^https?:\/\//.test(s)) continue;
        if (s.length >= 18 && bundle.includes(s)) found.add(s.slice(0, 80));
        if (s.length >= 40 && bundle.includes(s.slice(0, 30))) found.add(s.slice(0, 80));   // a long text that is only partly in the bundle (a changed ending) still counts
      }
  }
  assert.deepEqual([...found], [], 'lesson text found in public/');
});

test('SPA bundle parses (a stray comment once swallowed the rest of a line and blanked the portal)', { skip: !have && 'public/aip is not built' }, () => {
  const src = fs.readFileSync(path.join(pub, 'app.js'), 'utf8');
  assert.doesNotThrow(() => new vm.Script(src, { filename: 'app.js' }));
});
