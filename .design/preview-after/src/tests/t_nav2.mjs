import { launch, SP } from './cdp_fe.mjs';
import { writeFileSync } from 'node:fs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
for (const [W, hash] of [[1440, '#/dars/1'], [390, '#/dastur']]) {
  const b = await launch(W, W > 600 ? 900 : 844, W < 600);
  await b.goto(`${BASE}?lang=en${hash}`); await b.wait(600);
  await b.ev('document.body.focus()'); await b.key('Tab', 'Tab'); await b.wait(100);
  console.log(W, JSON.stringify(await b.ev(`(()=>{const a=document.activeElement,cs=getComputedStyle(a);return [a.className,a.matches(':focus-visible'),cs.outlineStyle,cs.outlineWidth,cs.outlineColor,cs.outlineOffset]})()`)));
  await b.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: Math.min(W, 700), height: W > 600 ? 130 : 70, scale: 2 } }).then(r => writeFileSync(`${SP}/nav/focus_${W}.png`, Buffer.from(r.result.data, 'base64')));
  b.close();
}
