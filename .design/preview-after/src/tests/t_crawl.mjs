import { launch, SP } from './cdp_fe.mjs';
const W = +process.argv[2] || 1440, TARGET = process.argv[3] || 'http://localhost:8765/comp/index.html?solo', SHOT = process.argv[4];
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
await b.goto(TARGET + '#/dastur'); await b.wait(400);
await b.ev('localStorage.removeItem("aip3.demo.v1")'); await b.goto(TARGET + '#/dastur'); await b.wait(300);
await b.ev('S.setU4(true); render()'); await b.wait(200);
const routes = await b.ev('ROUTES()');
const seen = new Set(), bad = [], ext = new Set(), deadHash = [], overflow = [], noH1 = [];
for (const r of routes) {
  if (r === '#/kirish' || r === '#/shrift') continue;
  await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(160);
  const info = await b.ev(`(()=>{const hs=[...document.querySelectorAll('#s-app a[href]')].map(a=>a.getAttribute('href'));return {view:document.body.dataset.view,h1:!!document.querySelector('#s-app h1'),hs,sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,dead:[...document.querySelectorAll('#s-app a')].filter(a=>!a.getAttribute('href')||a.getAttribute('href')==='#').length,title:document.title,hash:location.hash}})()`);
  if (info.view !== 'app' || !info.h1) noH1.push(r + ' view=' + info.view + ' h1=' + info.h1);
  if (info.hash !== r) bad.push('redirected ' + r + ' -> ' + info.hash);
  if (info.sw > info.cw) overflow.push(r + ' ' + info.sw + '>' + info.cw);
  if (info.dead) deadHash.push(r + ' dead:' + info.dead);
  info.hs.forEach(h => (h.startsWith('#/') ? seen.add(h) : ext.add(h)));
  if (SHOT && ['#/dastur', '#/dars/0', '#/dars/1', '#/dars/2', '#/dars/3', '#/dars/4', '#/dars/1/amaliyot', '#/dars/1/amaliyot/01', '#/dars/1/amaliyot/03', '#/dars/1/amaliyot/04', '#/dars/1/vazifa', '#/dars/1/vazifa/promptlar', '#/dars/2/vazifa', '#/dars/2/amaliyot', '#/dars/4/amaliyot', '#/dars/4/amaliyot/07', '#/dars/4/amaliyot/04', '#/dars/4/kitob', '#/dars/1/slayd/1', '#/dars/3/slayd/14', '#/fayl/prep-uz-pdf'].includes(r)) { await b.wait(300); await b.shot(`${SHOT}_${r.replace(/[#\/?]/g, '_')}_${W}`, true); }
}
// every collected target must resolve to a real screen
const unresolved = [];
for (const h of seen) {
  const ok = await b.ev(`(()=>{const raw=${JSON.stringify(h)}.replace(/^#\\/?/,'');const [p,qs]=raw.split('?');const res=resolve({parts:p.split('/').filter(Boolean).map(decodeURIComponent),q:new URLSearchParams(qs||'')});return !!res})()`);
  if (!ok) unresolved.push(h);
}
console.log(W, 'routes', routes.length, '| distinct internal link targets', seen.size, '| external', JSON.stringify([...ext]));
console.log('unresolved targets:', JSON.stringify(unresolved));
console.log('redirects/missing h1:', JSON.stringify(bad), JSON.stringify(noH1));
console.log('href="#"/empty anchors:', JSON.stringify(deadHash));
console.log('overflow:', JSON.stringify(overflow));
console.log('console:', JSON.stringify(b.logs.filter(l => !/favicon/.test(l))));
b.close();
