// main-thread task time of opening #/dars/1/amaliyot/01 at 4x CPU: node t_route_task.mjs [width]
import { launch } from './cdp_fe.mjs';
const W = +process.argv[2] || 390, U = 'http://localhost:8765/comp/index.html?solo';
const b = await launch(W, 844, W < 600);
await b.goto(U + '#/dastur'); await b.ev('S.setU4(true); render()'); await b.wait(500);
await b.send('Emulation.setCPUThrottlingRate', { rate: 4 }); await b.send('Performance.enable');
const m = async () => Object.fromEntries((await b.send('Performance.getMetrics')).result.metrics.map(x => [x.name, x.value]));
const out = [];
for (let i = 0; i < 12; i++) {
  await b.ev("location.hash='#/dastur'"); await b.wait(700);
  const a = await m(); await b.ev("location.hash='#/dars/1/amaliyot/01'"); await b.wait(900); const z = await m();
  out.push(Math.round((z.TaskDuration - a.TaskDuration) * 1000));
}
console.log('W', W, 'task ms per run (4x CPU):', out.join(', '), '| median', out.slice(4).sort((p, q) => p - q)[4]); b.close(); process.exit(0);
