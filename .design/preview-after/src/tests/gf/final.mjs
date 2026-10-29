import { launch } from './lib.mjs';
// desktop
{
  const b = await launch(1440, 1000);
  await b.goto('http://localhost:8765/comp/glass-options.html', 2500);
  const H = await b.ev('document.documentElement.scrollHeight');
  await b.size(1440, H); await b.wait(4500);
  const clip = async (sel, name, pad = 130) => { const r = await b.ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});const r=e.getBoundingClientRect();return {x:0,y:Math.max(0,r.top+scrollY-10),width:1440,height:r.height+20}})()`); await b.shot(name, r); };
  await clip('.stage:has(#lessons)', 'D_closed');
  await b.ev(`document.querySelectorAll('#lessons .gf-hit')[0].click()`); await b.wait(2200);
  await clip('.stage:has(#lessons)', 'D_open00');
  await b.ev(`document.querySelectorAll('#lessons .gf-hit')[4].click()`); await b.wait(2200);
  await clip('.stage:has(#lessons)', 'D_open04');
  await b.close();
}
for (const w of [390, 320]) {
  const b = await launch(w, 800); await b.size(w, 800, true);
  await b.goto('http://localhost:8765/comp/glass-options.html', 2500);
  const open = async (i, name) => {
    await b.ev(`document.querySelectorAll('#lessons .gf-root')[${i}].scrollIntoView({block:'center'})`); await b.wait(1800);
    const r = await b.ev(`(()=>{const r=document.querySelectorAll('#lessons .gf-root')[${i}].getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height*.8}})()`);
    await b.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: r.x, y: r.y }] }); await b.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await b.wait(2000); await b.shot(name);
    // tap outside closes
    await b.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 4, y: 300 }] }); await b.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await b.wait(500);
    return b.ev(`document.querySelectorAll('#lessons .gf-root')[${i}].hasAttribute('data-open')`);
  };
  console.log(w, 'closed after outside tap:', !(await open(1, `P${w}_open01`)));
  await open(4, `P${w}_open04`);
  console.log(w, 'scrollW', await b.ev('document.documentElement.scrollWidth'), JSON.stringify(b.logs.filter(l => !l.includes('favicon'))));
  b.close();
}
