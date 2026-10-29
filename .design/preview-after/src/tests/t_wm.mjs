import { launch, SP } from './cdp_fe.mjs';
import { writeFileSync } from 'node:fs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
for (const W of [1440, 390]) {
  const b = await launch(W, W > 600 ? 900 : 844, W < 600);
  await b.goto(`${BASE}?lang=uz#/kirish`); await b.wait(1200);
  console.log(W, 'name/label/font', JSON.stringify(await b.ev(`(()=>{const a=document.querySelector('#s-gate .wordmark');return {label:a.getAttribute('aria-label'),text:a.textContent,hidden:[...a.children].every(c=>c.getAttribute('aria-hidden')==='true'),fontsLoaded:document.fonts.check('500 16px "Mona Sans"'),family:getComputedStyle(a).fontFamily.slice(0,30), stretch:getComputedStyle(a).fontStretch}})()`)));
  await b.ev(`window.__lt=[];new PerformanceObserver(l=>l.getEntries().forEach(e=>__lt.push(Math.round(e.duration)))).observe({entryTypes:['longtask']})`);
  const rects = [];
  const r0 = await b.ev(`(()=>{const r=document.querySelector('#s-gate .wordmark').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}})()`);
  for (let k = 0; k < 6; k++) {
    const m = await b.ev(`(()=>{const a=document.querySelector('#s-gate .wordmark'),r=a.getBoundingClientRect();return {x:+r.x.toFixed(2),y:+r.y.toFixed(2),w:+r.width.toFixed(2),h:+r.height.toFixed(2),ws:[...a.querySelectorAll('.wm-g')].map(g=>Math.round(parseFloat(getComputedStyle(g).fontWeight))),L:[...a.querySelectorAll('.wm-l')].map(l=>Math.round(l.getBoundingClientRect().x))}})()`);
    rects.push(m);
    await b.send('Page.captureScreenshot', { format: 'png', clip: { x: Math.max(0, r0.x - 20), y: Math.max(0, r0.y - 14), width: Math.min(W, r0.w + 40), height: r0.h + 28, scale: W > 600 ? 1.5 : 2 } }).then(r => writeFileSync(`${SP}/wm/f_${W}_${k}.png`, Buffer.from(r.result.data, 'base64')));
    await b.wait(430);
  }
  console.log(W, 'rect per frame', JSON.stringify(rects.map(m => [m.x, m.y, m.w, m.h])));
  console.log(W, 'letter x identical across frames:', rects.every(m => JSON.stringify(m.L) === JSON.stringify(rects[0].L)));
  rects.forEach((m, k) => console.log(W, 'frame', k, 'weights', m.ws.join(' ')));
  console.log(W, 'long tasks', JSON.stringify(await b.ev('__lt')), 'console', JSON.stringify(b.logs.filter(l => !/favicon/.test(l))));
  // main-thread cost: frames over 2s
  await b.send('Performance.enable'); const p0 = (await b.send('Performance.getMetrics')).result.metrics; await b.wait(2000); const p1 = (await b.send('Performance.getMetrics')).result.metrics;
  const g = (p, n) => p.find(x => x.name === n).value;
  console.log(W, 'over 2s: TaskDuration', (g(p1, 'TaskDuration') - g(p0, 'TaskDuration')).toFixed(3) + 's', 'LayoutDuration', (g(p1, 'LayoutDuration') - g(p0, 'LayoutDuration')).toFixed(3) + 's', 'LayoutCount', g(p1, 'LayoutCount') - g(p0, 'LayoutCount'));
  b.close();
}
// reduced motion
const b = await launch(1440, 900, false);
await b.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await b.goto(`${BASE}?lang=uz#/kirish`); await b.wait(800);
console.log('reduced motion weights', JSON.stringify(await b.ev(`[...document.querySelectorAll('#s-gate .wm-g')].map(g=>[getComputedStyle(g).animationName,getComputedStyle(g).fontWeight].join(':')).slice(0,4)`)));
b.close();
