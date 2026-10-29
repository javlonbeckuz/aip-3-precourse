import { launch, SP } from './cdp_fe.mjs';
const TAG = process.argv[2];
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const routes = {home: '#/dastur', dars1: '#/dars/1', dars2: '#/dars/2', ex: '#/dars/1/amaliyot/01'};
for (const W of [1440, 390, 320]) {
  const b = await launch(W, W > 600 ? 900 : 844, W < 600);
  for (const L of ['uz', 'en']) {
    await b.goto(`${BASE}?lang=${L}#/dastur`); await b.ev('localStorage.clear()'); await b.goto(`${BASE}?lang=${L}#/dastur`); await b.ev('S.setU4(false);render()');
    for (const [n, r] of Object.entries(routes)) {
      if (L === 'en' && n !== 'home') continue;
      await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(900); await b.ev('document.activeElement&&document.activeElement.blur&&document.activeElement.blur()');
      await b.shot(`glow/${TAG}_${L}_${n}_${W}`, true);
    }
  }
  b.close();
}
