import { launch } from './lib.mjs';
const U = 'http://localhost:8765/comp/design-glass.html?solo';
const bf = `(()=>{const out=[];for(const e of document.querySelectorAll('*')){const cs=getComputedStyle(e);const f=cs.backdropFilter||cs.webkitBackdropFilter;if(f&&f!=='none'&&cs.display!=='none'&&!e.hidden){const r=e.getBoundingClientRect();if(r.width&&r.height&&r.bottom>0&&r.top<innerHeight)out.push((e.className||e.tagName)+'')}}return out})()`;
for (const w of [1440, 390]) {
  const b = await launch(w, 900); await b.size(w, 900, w < 700);
  await b.goto(U + '&view=dastur&newlesson', 3000);
  await b.ev(`__gl.cells[0].scrollIntoView({block:'center'})`); await b.wait(1200);
  await b.ev(`__gl.folders[0].set(true)`); await b.wait(1600);
  await b.ev(`document.querySelector('#gls0 .gl-close').click()`); await b.wait(90);
  const r = await b.ev(`(()=>{const a=__gl.cells[3].getBoundingClientRect().top; __gl.folders[3].el.querySelector('.gf-hit').click(); const c=__gl.cells[3].getBoundingClientRect().top; return [a,c]})()`);
  console.log(w, 'A->B jump (same task):', Math.round(r[1] - r[0]));
  await b.wait(1500);
  console.log(w, 'backdrop live (section open + popup):', JSON.stringify(await b.ev(bf)), 'logs', JSON.stringify(b.logs.filter(l => !l.includes('favicon'))));
  b.close();
}
{ const b = await launch(1440, 900); await b.goto(U + '&view=dars', 3000); console.log('dars backdrop:', JSON.stringify(await b.ev(bf))); b.close(); }
{ const b = await launch(1440, 900); await b.goto(U + '&view=ex', 3000); console.log('ex backdrop:', JSON.stringify(await b.ev(bf))); b.close(); }
