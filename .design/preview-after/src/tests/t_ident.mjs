import { launch } from './cdp_fe.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
for (const W of [1440, 390, 320]) {
  const b = await launch(W, W > 600 ? 900 : 844, W < 600);
  await b.goto(`${BASE}?lang=uz#/dastur`); await b.ev('localStorage.clear()'); await b.goto(`${BASE}?lang=uz#/dastur`); await b.wait(500);
  const cols = () => b.ev(`[...document.querySelectorAll('.lessons .folder, .now-card')].map(f=>getComputedStyle(f).backgroundColor+'|'+getComputedStyle(f).color)`);
  console.log(W, 'seed', JSON.stringify(await cols()));
  await b.ev(`S.d.t['f:am2']=0; delete S.d.t['f:am2']; render()`); await b.wait(500);
  console.log(W, 'lesson2 untick notes', JSON.stringify(await b.ev(`[...document.querySelectorAll('.f-note')].map(n=>n.textContent.trim())`)), JSON.stringify(await cols()));
  await b.shot(`glow/id_home_unticked_${W}`, true);
  await b.ev('S.setU4(true);render()'); await b.wait(300);
  console.log(W, 'unlocked', JSON.stringify(await cols()));
  await b.shot(`glow/id_home_unlocked_${W}`, true);
  for (const n of [1, 2, 3, 4]) { await b.ev(`location.hash='#/dars/${n}'`); await b.wait(900); await b.shot(`glow/id_dars${n}_${W}`, true); }
  console.log(W, 'console', JSON.stringify(b.logs.filter(l => !/favicon/.test(l))));
  b.close();
}
