import { launch, SP } from './cdp_fe.mjs';
import { writeFileSync } from 'node:fs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
for (const W of [1440, 390, 320]) {
  const b = await launch(W, W > 600 ? 900 : 844, W < 600);
  for (const L of ['uz', 'ru', 'en']) {
    await b.goto(`${BASE}?lang=${L}#/dastur`); await b.ev('localStorage.clear()'); await b.goto(`${BASE}?lang=${L}#/dastur`); await b.wait(700);
    const q = () => b.ev(`(()=>{const h=document.querySelector('.home-btn'),w=document.querySelector('#s-app .wordmark'),m=document.querySelector('.menu-btn,.nav-name'),r=h.getBoundingClientRect(),wr=w.getBoundingClientRect(),mr=[...document.querySelectorAll('.menu-btn,.nav-name')].map(e=>e.getBoundingClientRect()).filter(x=>x.width)[0];
      return {label:h.getAttribute('aria-label'),title:h.getAttribute('title'),cur:h.getAttribute('aria-current'),size:[Math.round(r.width),Math.round(r.height)],x:Math.round(r.x),wordCenter:Math.round(wr.x+wr.width/2),vw:document.documentElement.clientWidth,wl:Math.round(wr.left),wr:Math.round(wr.right),hr:Math.round(r.right),mr:mr&&Math.round(mr.left),sw:document.documentElement.scrollWidth,bg:getComputedStyle(h).backgroundColor,h1:document.querySelector('#s-app h1').textContent}})()`);
    const home = await q();
    await b.ev(`location.hash='#/dars/1'`); await b.wait(500);
    const lesson = await b.ev(`document.querySelector('.home-btn').getAttribute('aria-current')`);
    await b.ev(`location.hash='#/dastur'`); await b.wait(500);
    // keyboard focus ring
    await b.ev(`document.activeElement.blur();document.querySelector('.home-btn').focus()`);
    const ring = await b.ev(`(()=>{const cs=getComputedStyle(document.querySelector('.home-btn'));return [cs.outlineStyle,cs.outlineWidth,cs.outlineColor, document.querySelector('.home-btn').matches(':focus-visible')]})()`);
    console.log(W, L, JSON.stringify(home), 'lesson-cur', lesson, 'focus', JSON.stringify(ring));
    if (L !== 'ru') await b.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: W, height: W > 600 ? 130 : 70, scale: 1 } }).then(r => writeFileSync(`${SP}/nav/n_${L}_${W}.png`, Buffer.from(r.result.data, 'base64')));
    await b.ev(`document.activeElement.blur()`);
    if (L === 'uz') { await b.ev(`(()=>{const h=document.querySelector('.home-btn');h.dispatchEvent(new MouseEvent('mouseover',{bubbles:true}))})()`); }
    // go to a non-home page to see the outline (not current) state
    await b.ev(`location.hash='#/dars/1'`); await b.wait(500);
    if (L === 'uz') await b.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: W, height: W > 600 ? 130 : 70, scale: 1 } }).then(r => writeFileSync(`${SP}/nav/n_lesson_${W}.png`, Buffer.from(r.result.data, 'base64')));
  }
  console.log(W, 'console', JSON.stringify(b.logs.filter(l => !/favicon/.test(l))));
  b.close();
}
