import { launch } from './lib.mjs';
const w = +process.argv[2] || 1440, idx = +process.argv[3] ?? 1, mobile = w < 700;
const b = await launch(w, 900); await b.size(w, 900, mobile);
if (mobile) await b.send('Emulation.setTouchEmulationEnabled', { enabled: true });
await b.goto('http://localhost:8765/comp/design-glass.html?solo&view=dastur', 3000);
console.log('errors', JSON.stringify(b.logs.filter(l=>!l.includes('favicon'))));
await b.ev(`__gl.cells[${idx}].scrollIntoView({block:'center'})`); await b.wait(2200);
await b.shot(`G_home_${w}_closed`);
const r = await b.ev(`(()=>{const r=__gl.cells[${idx}].getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height*.8}})()`);
if (mobile) { await b.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: r.x, y: r.y }] }); await b.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); }
else { await b.mouse('mouseMoved', r.x, r.y); await b.mouse('mousePressed', r.x, r.y); await b.mouse('mouseReleased', r.x, r.y); }
await b.wait(120); await b.shot(`G_home_${w}_${idx}_mid`);
await b.wait(1800);
await b.shot(`G_home_${w}_${idx}_open`);
console.log(await b.ev(`JSON.stringify({cur:__gl.cur, ae:document.activeElement.className+'|'+document.activeElement.id, exp:__gl.folders[${idx}].el.querySelector('.gf-hit').getAttribute('aria-expanded'), secH:__gl.secs[${idx}].getBoundingClientRect().height, sy:scrollY, sw:document.documentElement.scrollWidth})`));
console.log('errors', JSON.stringify(b.logs.filter(l=>!l.includes('favicon'))));
b.close();
