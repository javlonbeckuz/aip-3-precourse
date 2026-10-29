import { launch } from './cdp_fe.mjs';
const W = +process.argv[2] || 390, T = 'http://localhost:8765/comp/index.html?solo';
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
await b.goto(T + '#/dastur'); await b.ev('localStorage.removeItem("aip3.demo.v1")'); await b.goto(T + '#/dastur'); await b.ev('S.setU4(true);render()');
const routes = await b.ev('ROUTES()'); const issues = [];
for (const r of routes) { if (r === '#/kirish' || r === '#/shrift') continue;
  await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(140);
  const bad = await b.ev(`(()=>{const cw=document.documentElement.clientWidth;const out=[];document.querySelectorAll('#s-app .site *').forEach(e=>{if(e.closest('.lib-chips,.slv-grid,.sr-only,dialog,.gt-pane[inert],[hidden]'))return;if(getComputedStyle(e).position==='absolute'&&e.closest('.gt-goo'))return;const r=e.getBoundingClientRect();if(!r.width||!r.height)return;if(r.right>cw+1||r.left<-1)out.push(e.tagName+'.'+(e.className||'').toString().slice(0,24)+' '+Math.round(r.left)+'..'+Math.round(r.right)+' "'+e.textContent.trim().slice(0,24)+'"')});const t=[...document.querySelectorAll('#s-app .site h1,#s-app .site .ef-nm,#s-app .site .tt')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>'TEXTCLIP '+e.className+' '+e.textContent.trim().slice(0,30));return out.slice(0,4).concat(t.slice(0,3))})()`);
  if (bad.length) issues.push(r + ' -> ' + bad.join(' | ')); }
console.log(W, 'routes checked', routes.length, 'issues', issues.length); issues.forEach(i => console.log(' ', i.slice(0, 260)));
b.close();
