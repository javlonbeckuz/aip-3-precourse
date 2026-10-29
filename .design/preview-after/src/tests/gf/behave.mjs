import { launch } from './lib.mjs';
const key = async (b, k, code, vk, text) => { await b.send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, windowsVirtualKeyCode: vk, text }); await b.send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk }); };
// 1 selftest
{ const b = await launch(1440, 900); await b.goto('http://localhost:8765/comp/design-glass.html?solo&view=ex&selftest', 2500);
  console.log('SELFTEST:', await b.ev(`document.body.dataset.test`)); b.close(); }
// 2 keyboard + switching
{ const b = await launch(1440, 900); await b.goto('http://localhost:8765/comp/design-glass.html?solo&view=dastur', 3000);
  await b.ev(`__gl.cells[1].scrollIntoView({block:'center'})`); await b.wait(1500);
  await b.ev(`__gl.folders[1].el.querySelector('.gf-hit').focus()`);
  await key(b, 'Enter', 'Enter', 13, '\r'); await b.wait(1500);
  console.log('Enter ->', await b.ev(`JSON.stringify({cur:__gl.cur, exp:document.querySelector('#gl-grid .gf-hit[aria-controls=gls1]').getAttribute('aria-expanded'), active:document.activeElement.id, hidden:__gl.secs[1].hidden, region:__gl.secs[1].getAttribute('role')})`));
  await key(b, 'Escape', 'Escape', 27); await b.wait(900);
  console.log('Esc ->', await b.ev(`JSON.stringify({cur:__gl.cur, hidden:__gl.secs[1].hidden, active:document.activeElement.className, exp:document.querySelector('#gl-grid .gf-hit[aria-controls=gls1]').getAttribute('aria-expanded')})`));
  await key(b, ' ', 'Space', 32, ' '); await b.wait(1500);
  console.log('Space ->', await b.ev(`JSON.stringify({cur:__gl.cur, active:document.activeElement.id})`));
  // open another: previous closes
  await b.ev(`__gl.folders[3].el.querySelector('.gf-hit').click()`); await b.wait(1600);
  console.log('switch 1->3 ->', await b.ev(`JSON.stringify({cur:__gl.cur, h1:__gl.secs[1].hidden, h3:__gl.secs[3].hidden, openFolders:__gl.folders.map(f=>f.isOpen), docH:document.documentElement.scrollHeight})`));
  // close button
  await b.ev(`document.querySelector('#gls3 .gl-close').click()`); await b.wait(900);
  console.log('close btn ->', await b.ev(`JSON.stringify({cur:__gl.cur, h3:__gl.secs[3].hidden, active:document.activeElement.className})`));
  // row -> dars tab
  await b.ev(`__gl.folders[1].set(true)`); await b.wait(1500);
  await b.ev(`document.querySelector('#gls1 .gl-row[data-tab="1"]').click()`); await b.wait(1200);
  console.log('row ->', await b.ev(`JSON.stringify({view:document.body.dataset.view, sel:[...document.querySelectorAll('#dg [role=tab]')].map(t=>t.getAttribute('aria-selected'))})`));
  console.log('logs', JSON.stringify(b.logs.filter(l=>!l.includes('favicon')))); b.close(); }
// 3 reduced motion
{ const b = await launch(1440, 900); await b.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await b.goto('http://localhost:8765/comp/design-glass.html?solo&view=dastur', 2500);
  await b.ev(`__gl.cells[0].scrollIntoView({block:'center'}); __gl.folders[0].el.querySelector('.gf-hit').click()`);
  console.log('RM immediately ->', await b.ev(`JSON.stringify({cur:__gl.cur, anims:__gl.secs[0].getAnimations().length, h:Math.round(__gl.secs[0].getBoundingClientRect().height), title:document.activeElement.id})`));
  await b.ev(`document.querySelector('#gls0 .gl-close').click()`);
  console.log('RM close ->', await b.ev(`JSON.stringify({hidden:__gl.secs[0].hidden})`)); b.close(); }
