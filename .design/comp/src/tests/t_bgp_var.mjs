import { launch } from './cdp_fe.mjs';
const W = +process.argv[2] || 1440, U = 'http://localhost:8765/comp/index.html?solo';
for (const [name, js] of [['animated', ''], ['static', "document.querySelectorAll('.bgp path').forEach(p=>p.style.animation='none')"], ['noanim-opaque-frame', "document.querySelectorAll('.bgp path').forEach(p=>p.style.animation='none');document.querySelector('.frame').style.background='#000'"], ['animated-opaque-frame', "document.querySelector('.frame').style.background='#000'"]]) {
  const b = await launch(W, 900, false);
  await b.goto(U + '#/dastur'); await b.wait(1200); await b.ev('S.setU4(true); render()'); await b.wait(400); if (js) await b.ev(js);
  await b.send('Emulation.setCPUThrottlingRate', { rate: 4 }); await b.wait(500);
  await b.ev("window.__f=0;(function t(){window.__f++;requestAnimationFrame(t)})()"); await b.wait(4000);
  console.log(name, (await b.ev('window.__f') / 4).toFixed(1), 'fps'); b.close();
}
process.exit(0);
