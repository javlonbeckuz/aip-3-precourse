// cost of the background paths over 5s at 4x CPU: node t_bgp_perf.mjs <width> <on|off>
import { launch } from './cdp_fe.mjs';
const [W, MODE] = [+process.argv[2] || 1440, process.argv[3] || 'on'], U = 'http://localhost:8765/comp/index.html?solo';
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
await b.goto(U + '#/dastur'); await b.wait(1200); await b.ev('S.setU4(true); render()'); await b.wait(500);
if (MODE === 'off') await b.ev("document.querySelector('.bgp').style.display='none'");
await b.send('Emulation.setCPUThrottlingRate', { rate: 4 }); await b.send('Performance.enable'); await b.wait(500);
await b.ev("window.__f=0;(function t(){window.__f++;requestAnimationFrame(t)})()");
const m = async () => Object.fromEntries((await b.send('Performance.getMetrics')).result.metrics.map(x => [x.name, x.value]));
const a = await m(); await b.wait(5000); const z = await m(); const f = await b.ev('window.__f');
console.log(`W ${W} ${MODE}: fps ${(f / 5).toFixed(1)} | main-thread task ${((z.TaskDuration - a.TaskDuration) / 5 * 100).toFixed(1)}% | script ${((z.ScriptDuration - a.ScriptDuration) / 5 * 100).toFixed(1)}% | layout ${((z.LayoutDuration - a.LayoutDuration) / 5 * 100).toFixed(1)}% | style recalc ${((z.RecalcStyleDuration - a.RecalcStyleDuration) / 5 * 100).toFixed(1)}%`);
b.close(); process.exit(0);
