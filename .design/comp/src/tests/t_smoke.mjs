import { launch } from './cdp_fe.mjs';
const b = await launch(390, 844, true);
for (const lang of ['uz', 'ru', 'en']) {
  await b.goto(`http://localhost:8765/comp/index.html?solo&lang=${lang}#/dastur`);
  await b.ev('localStorage.removeItem("aip3.demo.v1")'); await b.goto(`http://localhost:8765/comp/index.html?solo&lang=${lang}#/dastur`);
  await b.ev('S.setU4(true); render()');
  const routes = await b.ev('ROUTES()');
  let bad = [];
  for (const r of routes) { if (r === '#/kirish') continue; await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(80);
    const o = await b.ev(`({v:document.body.dataset.view, h1:!!document.querySelector('.screen.is-on h1'), leak:/⟦|#one|\{\w+\}|&amp;|&#39;|&lt;/.test(document.querySelector('.screen.is-on').innerText), langs:document.querySelectorAll('[lang="uz-Latn"]').length})`);
    if (!o.h1 || o.leak) bad.push(r + JSON.stringify(o)); if (r === '#/dars/1/amaliyot/01') console.log(lang, 'uz-spans on ex01:', o.langs); }
  console.log(lang, routes.length, 'routes; bad:', JSON.stringify(bad), '| logs:', JSON.stringify(b.logs));
}
b.close();
