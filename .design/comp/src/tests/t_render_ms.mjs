import { launch } from './cdp_fe.mjs';
const W = +process.argv[2] || 390, U = 'http://localhost:8765/comp/index.html?solo';
const b = await launch(W, 844, W < 600);
await b.goto(U + '#/dastur'); await b.ev('S.setU4(true); render()'); await b.wait(500);
await b.send('Emulation.setCPUThrottlingRate', { rate: 4 });
const out = [];
for (let i = 0; i < 12; i++) {
  await b.ev("history.replaceState(null,'','#/dastur'); render(); 0"); await b.wait(300);
  out.push(await b.ev("(()=>{history.replaceState(null,'','#/dars/1/amaliyot/01');const t=performance.now();render();void document.body.offsetHeight;return Math.round(performance.now()-t)})()"));
}
console.log('W', W, 'render+layout ms @4x:', out.join(', '), '| median(last 8)', out.slice(4).sort((p, q) => p - q)[4]); b.close(); process.exit(0);
