import { launch } from './lib2.mjs';
import { pathToFileURL } from 'node:url';
const w = +process.argv[2];
const b = await launch(Math.max(w, 500), 900);
await b.size(Math.max(w + 20, 500), 900, false);
await b.goto('http://localhost:8765/comp/no-such-page-for-wrapper', 800);
const wrap = (await import('node:fs')).readFileSync(`wrap_${w}.html`, 'utf8');
await b.ev(`document.open();document.write(${JSON.stringify(wrap)});document.close();1`);
await b.wait(4000);
// grow the iframe to its document height, then wait for fonts + glass art to paint
const H = await b.ev(`(async()=>{const f=document.getElementById('f');await new Promise(r=>setTimeout(r,1500));const d=f.contentDocument;await d.fonts.ready;const h=d.documentElement.scrollHeight;f.style.height=h+'px';return h})()`);
await b.size(Math.max(w + 20, 500), H, false); await b.wait(6000);
const info = await b.ev(`(()=>{const d=document.getElementById('f').contentDocument;return JSON.stringify({sw:d.documentElement.scrollWidth,cw:d.documentElement.clientWidth,arts:d.querySelectorAll('canvas.g-art[data-ready]').length,gx:d.querySelectorAll('.gx').length,fb:d.querySelectorAll('.gx.fallback').length,over:[...d.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.right>d.documentElement.clientWidth+1&&!e.closest('.stage')}).map(e=>e.className||e.tagName).slice(0,8)})})()`);
await b.shot(`../ca/co_${w}`, { x: 0, y: 0, width: w, height: H });
console.log(w, 'H', H, info, JSON.stringify(b.logs.filter(l => !/favicon|GPU stall/.test(l))));
b.close();
