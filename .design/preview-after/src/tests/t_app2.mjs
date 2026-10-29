import { launch } from './cdp_sc.mjs';
const B = 'http://localhost:3055';
for (const [w,h,m] of [[1440,900,false],[390,844,true]]) {
  const b = await launch(w,h,m);
  await b.goto(B+'/aip/'); await b.wait(600);
  await b.click('#gid'); await b.type('XM'); await b.ev(`document.getElementById('gate-form').requestSubmit()`); await b.wait(2200);
  const routes = await b.ev('ROUTES().filter(r => r !== "#/kirish" && r !== "#/shrift")');
  const bad = [];
  for (const r of routes) {
    await b.ev(`navTo(${JSON.stringify(r)})`); await b.wait(220);
    const i = await b.ev(`JSON.stringify({p:location.pathname+location.search,h1:!!document.querySelector('#s-app h1'),sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,view:document.body.dataset.view,imgs:[...document.querySelectorAll('.slv-media img')].map(i=>i.complete&&i.naturalWidth>0)})`);
    const o = JSON.parse(i); if (!o.h1 || o.sw > o.cw || o.view !== 'app' || o.p !== '/aip' + r.slice(1)) bad.push([r, o]);
  }
  console.log(w, 'routes', routes.length, 'bad', JSON.stringify(bad).slice(0,600), 'logs', b.logs.slice(0,6));
  b.close();
}
