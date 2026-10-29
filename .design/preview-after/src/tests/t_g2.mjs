import { launch, URL } from './cdp.mjs';
for (const W of [1440, 390, 320]) {
  const b = await launch(W, W > 600 ? 878 : 844, W < 600);
  await b.goto(URL + '?solo&view=gate');
  await b.ev(`(()=>{const g=document.getElementById('gid');g.value='KKKKKK';g.dispatchEvent(new Event('input'))})()`);
  await b.wait(300);
  console.log(W, await b.ev(`(()=>{const R=s=>{const r=document.querySelector(s).getBoundingClientRect();return [Math.round(r.top),Math.round(r.bottom),Math.round(r.width)]};return JSON.stringify({help:R('.mx-help'),btn:R('.mx-btn'),drop:R('.mx-drop'),group:R('.mx-group')})})()`));
  b.close();
}
