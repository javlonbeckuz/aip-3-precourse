import { launch } from './cdp_fe.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const b = await launch(1440, 900, false);
await b.goto(`${BASE}?lang=uz#/kirish`); await b.wait(1200);
await b.send('Performance.enable');
const g = (p, n) => p.find(x => x.name === n).value;
const variants = {
  current: '',
  'steps(10)': '.wm-g{animation-timing-function:steps(10)!important}',
  'steps(20)': '.wm-g{animation-timing-function:steps(20)!important}',
  'no animation': '.wm-g{animation:none!important}',
  'no animation, no ghost': '.wm-g{animation:none!important}.wm-l::after{display:none}',
};
for (const [k, css] of Object.entries(variants)) {
  await b.ev(`(()=>{let s=document.getElementById('vt');if(!s){s=document.createElement('style');s.id='vt';document.head.append(s)}s.textContent=${JSON.stringify(css)}})()`); await b.wait(500);
  const p0 = (await b.send('Performance.getMetrics')).result.metrics; await b.wait(3000); const p1 = (await b.send('Performance.getMetrics')).result.metrics;
  console.log(k.padEnd(26), 'task', ((g(p1, 'TaskDuration') - g(p0, 'TaskDuration')) / 3).toFixed(3), 's/s  layout', ((g(p1, 'LayoutDuration') - g(p0, 'LayoutDuration')) / 3).toFixed(3), 'recalc', ((g(p1, 'RecalcStyleDuration') - g(p0, 'RecalcStyleDuration')) / 3).toFixed(3), 'layouts/s', ((g(p1, 'LayoutCount') - g(p0, 'LayoutCount')) / 3).toFixed(0));
}
b.close();
