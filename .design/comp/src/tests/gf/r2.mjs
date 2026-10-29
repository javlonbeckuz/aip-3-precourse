import { launch } from './lib.mjs';
const U = 'http://localhost:8765/comp/design-glass.html?solo';
const key = async (b, k, code, vk, text) => { await b.send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, windowsVirtualKeyCode: vk, text }); await b.send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk }); };
const bf = `(()=>{const out=[];for(const e of document.querySelectorAll('*')){const cs=getComputedStyle(e);const f=cs.backdropFilter||cs.webkitBackdropFilter;if(f&&f!=='none'){const r=e.getBoundingClientRect();if(r.width&&r.height&&r.bottom>0&&r.top<innerHeight&&e.offsetParent!==null||cs.position==='fixed')out.push((e.className||e.tagName)+'')}}return out})()`;
// 0 selftest
{ const b = await launch(1440, 900); await b.goto(U + '&view=ex&selftest', 2500); console.log('SELFTEST', await b.ev('document.body.dataset.test')); b.close(); }
// 1 keyboard, count, RO, fast switching
{ const b = await launch(1440, 900); await b.goto(U + '&view=dastur&newlesson', 3000);
  await b.ev(`__gl.cells[1].scrollIntoView({block:'center'})`); await b.wait(1500);
  console.log('backdrop (closed, popup visible):', JSON.stringify(await b.ev(bf)));
  await b.ev(`__gl.folders[1].el.querySelector('.gf-hit').focus()`);
  await key(b, 'Enter', 'Enter', 13, '\r'); await b.wait(1500);
  console.log('backdrop (section open, popup visible):', JSON.stringify(await b.ev(bf)));
  await key(b, 'Escape', 'Escape', 27); await b.wait(800);
  console.log('Esc ->', await b.ev(`JSON.stringify({cur:__gl.cur, active:document.activeElement.className})`));
  // fast A -> B while A closes
  await b.ev(`__gl.folders[0].set(true)`); await b.wait(1500);
  await b.ev(`document.querySelector('#gls0 .gl-close').click()`); await b.wait(90);
  const t0 = await b.ev(`__gl.cells[3].getBoundingClientRect().top`);
  await b.ev(`__gl.folders[3].el.querySelector('.gf-hit').click()`); await b.wait(40);
  const t1 = await b.ev(`__gl.cells[3].getBoundingClientRect().top`);
  await b.wait(1400);
  console.log('A->B jump px:', Math.round(t1 - t0), JSON.stringify(await b.ev(`({cur:__gl.cur, h0:__gl.secs[0].hidden, h3:__gl.secs[3].hidden})`)));
  // resize while open: RO / focus
  await b.size(800, 900); await b.wait(700); await b.size(1440, 900); await b.wait(700);
  console.log('after resize', JSON.stringify(await b.ev(`({cur:__gl.cur, active:document.activeElement.id, prev:__gl.secs[3].previousElementSibling.className.slice(0,20)})`)));
  console.log('logs', JSON.stringify(b.logs.filter(l => !l.includes('favicon')))); b.close(); }
// 2 flick during scroll spring
{ const b = await launch(1440, 700); await b.goto(U + '&view=dastur', 3000);
  await b.ev(`scrollTo(0, 560)`); await b.wait(400);
  await b.ev(`__gl.folders[4].el.querySelector('.gf-hit').click()`);
  await b.wait(160); const y1 = await b.ev('scrollY');
  await b.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 700, y: 300, deltaX: 0, deltaY: -40 });
  await b.wait(60); const y2 = await b.ev('scrollY'); await b.wait(1200); const y3 = await b.ev('scrollY');
  console.log('flick: y@160ms', Math.round(y1), 'after wheel', Math.round(y2), 'settled', Math.round(y3), '(settled should be ~y2 +/- wheel, not the spring target)'); b.close(); }
// 3 navigation cancels scroll
{ const b = await launch(1440, 700); await b.goto(U + '&view=dastur', 3000);
  await b.ev(`scrollTo(0, 560)`); await b.wait(300);
  await b.ev(`__gl.folders[4].el.querySelector('.gf-hit').click(); go('dars')`); await b.wait(900);
  console.log('nav: scrollY after go(dars)', Math.round(await b.ev('scrollY'))); b.close(); }
