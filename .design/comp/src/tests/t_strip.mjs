// frame strip of a tab switch (animations paused at t ms): node t_strip.mjs <width>
import { launch } from './cdp_fe.mjs'; import { writeFileSync } from 'node:fs';
const W = +process.argv[2] || 390, SP = process.env.SHOT_DIR, U = 'http://localhost:8765/comp/index.html?solo';
const b = await launch(W, 900, W < 600);
await b.goto(U + '#/dars/1'); await b.ev('S.setU4(true); render()'); await b.wait(600);
const rect = await b.ev("(()=>{const r=document.querySelector('.gt-tabs').getBoundingClientRect();return {x:r.x,y:r.y+scrollY,w:r.width,h:r.height+60}})()");
for (const t of [0, 50, 100, 150, 200, 260]) {
  await b.ev("location.hash='#/dars/1'; render(); 0"); await b.wait(500);
  await b.ev(`(()=>{document.querySelectorAll('.gt-tab')[2].click();document.getAnimations().forEach(a=>{a.pause();a.currentTime=${t}});})()`);
  const r = await b.send('Page.captureScreenshot', { format: 'png', clip: { x: rect.x - 4, y: rect.y - 4, width: rect.w + 8, height: rect.h, scale: 2 } });
  writeFileSync(`${SP}/strip-${W}-${String(t).padStart(3, '0')}.png`, Buffer.from(r.result.data, 'base64'));
}
console.log('ok'); b.close(); process.exit(0);
