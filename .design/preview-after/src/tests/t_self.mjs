import { launch } from './cdp_fe.mjs';
const b = await launch(1440, 900, false);
for (const l of ['uz', 'en']) {
  await b.goto(`http://localhost:8765/comp/index.html?solo&lang=${l}#/dastur`); await b.ev('localStorage.removeItem("aip3.demo.v1")');
  await b.goto(`http://localhost:8765/comp/index.html?solo&selftest&lang=${l}#/dars/1/amaliyot/01`); await b.wait(2500);
  console.log(l, await b.ev('document.body.dataset.test'));
}
console.log(b.logs.filter(l => !/favicon/.test(l))); b.close();
