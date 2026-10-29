import { launch } from './cdp_fe.mjs';
const T = process.argv[2] || 'http://localhost:8765/comp/index.html?solo', W = +process.argv[3] || 1440;
const b = await launch(W, 900, false);
await b.goto(T + '#/dastur'); await b.ev('localStorage.clear()'); await b.goto(T + '#/dastur'); await b.ev('S.setU4(true);render()');
const routes = await b.ev('ROUTES()'); const bad = [];
for (const r of routes) { if (r === '#/kirish' || r === '#/shrift') continue; await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(120);
  const o = await b.ev(`({txt:document.querySelector('#s-app').innerText.includes('⟦'), miss:[...MISSING]})`); if (o.txt || o.miss.length) bad.push(r + ' ' + JSON.stringify(o.miss)); }
// the states that only show on interaction: gate messages, toast, live texts, popup
await b.goto(T + '#/kirish');
for (const v of ['7KQ2X0', 'K', 'XMZZ', '7KQ2XMAB', 'KKKKKK']) { await b.ev(`(()=>{const g=document.getElementById('gid');g.value=${JSON.stringify(v)};document.getElementById('gate-form').requestSubmit()})()`); await b.wait(60); }
await b.ev(`['gate.welcome','toast.done','live.copied','live.copied_new','live.copy_failed','live.marked','live.unmarked','popup.live','toast.notfound','lock.title','lock.desc'].forEach(k=>t(k,{no:'P1',title:'x',name:'x'}))`);
const stats = await b.ev(`({keys:Object.keys(I18N.uz).length, content:Object.keys(I18N.uz).filter(k=>k.startsWith('c.')).length, used:[...USED].length, missing:[...MISSING], unused:Object.keys(I18N.uz).filter(k=>!USED.has(k))})`);
console.log('routes audited', routes.length, '| pages with a missing key:', JSON.stringify(bad));
console.log('dictionary keys:', stats.keys, '(c.* content:', stats.content + ')', '| used while crawling:', stats.used, '| MISSING:', JSON.stringify(stats.missing));
console.log('keys never used (check):', JSON.stringify(stats.unused));
console.log('console:', JSON.stringify(b.logs.filter(l => !/favicon/.test(l))));
b.close();
