import { launch } from './lib.mjs';
const w = +process.argv[2] || 390;
const b = await launch(w, 900);
await b.size(w, 900, w < 700);
await b.goto('http://localhost:8765/comp/glass-options.html', 2500);
const H = await b.ev('document.documentElement.scrollHeight');
await b.size(w, H, w < 700); await b.wait(5000);
const clip = async (sel, name) => { const r = await b.ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});const r=e.getBoundingClientRect();return {x:0,y:r.top+scrollY-10,width:document.documentElement.clientWidth,height:r.height+20}})()`); await b.shot(name, r); };
await clip('#list-a', `pa_${w}`); 
// A: copy P2
await b.ev(`document.querySelectorAll('#list-a .cp')[1].click()`); await b.wait(500);
await clip('#list-a', `pa_${w}_copied`);
console.log(await b.ev(`JSON.stringify({done:[...document.querySelectorAll('#list-a .pg')].map(e=>e.classList.contains('done')),lbl:document.querySelectorAll('#list-a .cpl')[1].textContent, sw:document.documentElement.scrollWidth})`));
// B: open + select
await b.ev(`document.querySelector('#b-folder .gf-hit').click()`); await b.wait(1500);
await b.ev(`document.querySelectorAll('#b-folder .gf-sheet')[1].click()`); await b.wait(1500);
const bb = await b.ev(`(()=>{const r=document.querySelector('.bwrap').getBoundingClientRect();return {x:0,y:r.top+scrollY-130,width:document.documentElement.clientWidth,height:r.height+150}})()`);
await b.shot(`pb_${w}`, bb);
console.log(JSON.stringify(b.logs.slice(0,6)));
b.close();
