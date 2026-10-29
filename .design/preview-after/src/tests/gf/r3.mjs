import { launch } from './lib.mjs';
const U = 'http://localhost:8765/comp/design-glass.html?solo';
{ const b = await launch(1440, 900); await b.goto(U + '&view=dastur', 400);
  await b.ev(`window.__lt=[];new PerformanceObserver(l=>l.getEntries().forEach(e=>__lt.push(Math.round(e.duration)))).observe({entryTypes:['longtask']})`);
  await b.wait(3500);
  console.log('long tasks during load+paint (ms):', JSON.stringify(await b.ev('__lt')));
  await b.ev(`__gl.cells[1].scrollIntoView({block:'center'}); __lt.length=0`); await b.wait(800);
  // click on the back panel tab area of folder 1 (outside the front glass)
  const r = await b.ev(`(()=>{const e=__gl.cells[1].querySelector('.gf-root').getBoundingClientRect();return {x:e.left,y:e.top,w:e.width,k:e.width/340}})()`);
  const x = r.x + r.w * 0.72, y = r.y + (54 + 8) * r.k; // back panel tab, above the front glass
  await b.mouse('mouseMoved', x, y); await b.mouse('mousePressed', x, y); await b.mouse('mouseReleased', x, y); await b.wait(1600);
  console.log('click on back-panel tab opens:', await b.ev('__gl.cur'), 'long tasks while opening (ms):', JSON.stringify(await b.ev('__lt')));
  b.close(); }
