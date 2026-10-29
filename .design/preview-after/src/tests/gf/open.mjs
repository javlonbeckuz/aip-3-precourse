import { launch } from './lib.mjs';
const w = +process.argv[2] || 1440, h = +process.argv[3] || 900;
const b = await launch(w, h);
await b.goto('http://localhost:8765/comp/glass-options.html', 2500);
const rect = async sel => b.ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return {x:r.left,y:r.top,w:r.width,h:r.height}})()`);
const idx = (+process.argv[4]) || 0;
await b.ev(`document.querySelectorAll('#lessons .gf-root')[${idx}].scrollIntoView({block:'center'})`); await b.wait(2500);
const r = await b.ev(`(()=>{const e=document.querySelectorAll('#lessons .gf-root')[${idx}];const r=e.getBoundingClientRect();return {x:r.left,y:r.top,w:r.width,h:r.height}})()`);
// click the hit area
await b.mouse('mouseMoved', r.x + r.w / 2, r.y + r.h * .8);
await b.wait(1200);
await b.shot(`hover_${w}_${idx}`);
await b.mouse('mousePressed', r.x + r.w / 2, r.y + r.h * .8); await b.mouse('mouseReleased', r.x + r.w / 2, r.y + r.h * .8);
await b.wait(1800);
await b.shot(`open_${w}_${idx}`);
console.log(JSON.stringify(r), await b.ev(`document.querySelectorAll('#lessons .gf-root')[${idx}].hasAttribute('data-open')`), JSON.stringify(b.logs.slice(0,5)));
b.close();
