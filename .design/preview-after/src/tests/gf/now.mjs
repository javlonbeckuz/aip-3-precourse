import { launch } from './lib.mjs';
const w = +process.argv[2];
const b = await launch(w, 900); await b.size(w, 900, true);
await b.goto('http://localhost:8765/comp/glass-options.html', 3500);
const H = await b.ev('document.documentElement.scrollHeight'); await b.size(w, H, true); await b.wait(3000);
const r = await b.ev(`(()=>{const a=document.getElementById('now-home').getBoundingClientRect();return {x:0,y:a.top+scrollY-40,width:innerWidth,height:Math.min(1100,a.height+80)}})()`);
await b.shot(`now_${w}`, r);
console.log(await b.ev(`document.getElementById('now-home').style.height+' '+document.getElementById('now-ex').style.height+' sw='+document.documentElement.scrollWidth`));
b.close();
