import { launch } from './lib.mjs';
const w = +process.argv[2], view = process.argv[3], extra = process.argv[4] || '', mobile = w < 700;
const b = await launch(w, 900); await b.size(w, 900, mobile);
await b.goto(`http://localhost:8765/comp/design-glass.html?solo&view=${view}${extra}`, 3000);
const H = await b.ev('document.documentElement.scrollHeight'); await b.size(w, H, mobile); await b.wait(3500);
await b.fullshot(`G_${view}_${w}${extra.replace(/[^a-z0-9]/gi,'')}`);
console.log(view, w, 'H', H, 'sw', await b.ev('document.documentElement.scrollWidth'), JSON.stringify(b.logs.filter(l=>!l.includes('favicon'))));
b.close();
