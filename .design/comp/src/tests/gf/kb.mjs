import { launch } from './lib.mjs';
const b = await launch(1440, 900);
await b.goto('http://localhost:8765/comp/glass-options.html', 2500);
await b.ev(`document.querySelectorAll('#lessons .gf-root')[1].scrollIntoView({block:'center'})`); await b.wait(2000);
await b.ev(`document.querySelectorAll('#lessons .gf-hit')[1].focus()`);
await b.key('Enter'); await b.wait(900);
console.log('open after Enter', await b.ev(`document.querySelectorAll('#lessons .gf-root')[1].hasAttribute('data-open')`), 'inert', await b.ev(`document.querySelectorAll('#lessons .gf-files')[1].hasAttribute('inert')`), 'expanded', await b.ev(`document.querySelectorAll('#lessons .gf-hit')[1].getAttribute('aria-expanded')`));
await b.key('Tab'); console.log('focus after Tab:', await b.ev(`document.activeElement.className+' '+document.activeElement.textContent.slice(0,30)`));
await b.shot('kb_open');
await b.key('Escape'); await b.wait(600);
console.log('open after Esc', await b.ev(`document.querySelectorAll('#lessons .gf-root')[1].hasAttribute('data-open')`), 'inert', await b.ev(`document.querySelectorAll('#lessons .gf-files')[1].hasAttribute('inert')`), 'focus', await b.ev(`document.activeElement.className`));
// outside press
await b.ev(`document.querySelectorAll('#lessons .gf-hit')[1].click()`); await b.wait(400);
await b.mouse('mousePressed', 20, 200); await b.mouse('mouseReleased', 20, 200); await b.wait(300);
console.log('open after outside press', await b.ev(`document.querySelectorAll('#lessons .gf-root')[1].hasAttribute('data-open')`));
// locked
await b.ev(`document.querySelectorAll('#lessons .gf-hit')[4].click()`); await b.wait(300);
console.log('locked sheets focusable?', await b.ev(`document.querySelectorAll('#lessons .gf-files')[4].hasAttribute('inert') + ' ' + document.querySelectorAll('#lessons .gf-files')[4].querySelectorAll('a,button').length`));
// sheet link attrs
console.log(await b.ev(`[...document.querySelectorAll('#lessons .gf-root')[1].querySelectorAll('a.gf-sheet')].map(a=>a.getAttribute('href')+' '+a.getAttribute('target')).join(' | ')`));
console.log(JSON.stringify(b.logs));
b.close();
