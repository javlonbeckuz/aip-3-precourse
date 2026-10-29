import { launch } from './cdp_sc.mjs';
const B = 'http://localhost:3058';
for (const [w,h,m] of [[1440,900,false],[390,844,true]]) for (const lang of ['uz','ru']) {
  const b = await launch(w,h,m);
  await b.goto(B+'/aip/'); await b.wait(500);
  await b.click('#gid'); await b.type('XM'); await b.ev(`document.getElementById('gate-form').requestSubmit()`); await b.wait(2300);
  if (lang !== 'uz') { await b.ev(`setLang('${lang}')`); await b.wait(1500); }
  const routes = await b.ev('ROUTES().filter(r => r !== "#/kirish" && r !== "#/shrift")');
  const bad = [];
  for (const r of routes) {
    await b.ev(`navTo(${JSON.stringify(r)})`); await b.wait(180);
    const o = JSON.parse(await b.ev(`JSON.stringify({p:location.pathname+location.search,h1:!!document.querySelector('#s-app h1'),ok:document.documentElement.scrollWidth<=document.documentElement.clientWidth,view:document.body.dataset.view})`));
    if (!o.h1 || !o.ok || o.view !== 'app' || o.p !== '/aip' + r.slice(1)) bad.push([r, o]);
  }
  await b.ev(`navTo('#/dars/1/amaliyot/01')`); await b.wait(400); await b.shot(`r2-${w}-${lang}-ex01`, true);
  await b.ev(`navTo('#/dars/4/amaliyot/02')`); await b.wait(400); await b.shot(`r2-${w}-${lang}-hermes02`, true);
  console.log(w, lang, 'routes', routes.length, 'bad', JSON.stringify(bad).slice(0, 300), 'logs', b.logs.filter(l => !/clip/.test(l)));
  b.close();
}
