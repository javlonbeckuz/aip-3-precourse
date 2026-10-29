import { launch } from './cdp_fe.mjs';
const U = 'http://localhost:8765/comp/index.html?solo';
for (const [name, js] of [['keep 4 paths', "[...document.querySelectorAll('.bgp path')].forEach((p,i)=>{if(i>3)p.remove()})"], ['dashoffset only (no dasharray/opacity anim)', "document.styleSheets[document.styleSheets.length-1];var s=document.createElement('style');s.textContent='@keyframes bgp2{from{stroke-dashoffset:0}to{stroke-dashoffset:-1}}.bgp path{animation-name:bgp2!important}';document.head.append(s)"], ['opacity only', "var s=document.createElement('style');s.textContent='@keyframes bgp3{from{opacity:.3}to{opacity:.6}}.bgp path{animation-name:bgp3!important}';document.head.append(s)"]]) {
  const b = await launch(1440, 900, false);
  await b.goto(U + '#/dastur'); await b.wait(1200); await b.ev('S.setU4(true); render()'); await b.wait(400); await b.ev(js);
  await b.send('Emulation.setCPUThrottlingRate', { rate: 4 }); await b.wait(500);
  await b.ev("window.__f=0;(function t(){window.__f++;requestAnimationFrame(t)})()"); await b.wait(4000);
  console.log(name, (await b.ev('window.__f') / 4).toFixed(1), 'fps'); b.close();
}
process.exit(0);
