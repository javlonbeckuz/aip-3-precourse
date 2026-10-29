import { launch } from './cdp_fe.mjs';
import { writeFileSync } from 'node:fs';
const grab = async (url) => { const b = await launch(1440, 900, false); await b.goto(url + '#/dastur'); await b.ev('localStorage.clear()'); await b.goto(url + '#/dastur'); await b.ev('S.setU4(true);render()');
  const routes = await b.ev('ROUTES()'); const out = {};
  for (const r of routes) { if (r === '#/kirish' || r === '#/shrift') continue; await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(110); out[r] = (await b.ev(`document.querySelector('#s-app').innerText`)).split('\n').map(x => x.trim()).filter(Boolean); }
  b.close(); return out; };
const oldT = await grab('file:///C:/Users/User/AppData/Local/Temp/claude/C--Users-User-vs-code-HEAD-projects-praktikum3-precourse-platform/d552fe71-64f5-44b0-80fb-64ee4d82d435/scratchpad/old_export.html?solo');
const newT = await grab('http://localhost:8765/comp/index.html?solo');
let total = 0; const lines = [];
for (const r of Object.keys(oldT)) { const a = oldT[r], c = newT[r]; const sa = new Set(a), sc = new Set(c); const gone = a.filter(x => !sc.has(x)), added = c.filter(x => !sa.has(x));
  if (gone.length || added.length) { total++; lines.push(`${r}\n   - ${gone.join(' | ').slice(0, 300)}\n   + ${added.join(' | ').slice(0, 300)}`); } }
console.log('routes with a text difference:', total, 'of', Object.keys(oldT).length); console.log(lines.join('\n'));
writeFileSync('diff_uz.txt', lines.join('\n'));
