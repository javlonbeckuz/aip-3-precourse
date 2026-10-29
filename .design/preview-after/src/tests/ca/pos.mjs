import { launch } from './lib2.mjs';
const b = await launch(500, 900); await b.size(320, 900, true);
await b.goto('http://localhost:8765/comp/color-options.html', 2500);
console.log(await b.ev(`JSON.stringify(['f5','f7'].map(i=>Math.round(document.getElementById(i).getBoundingClientRect().top+scrollY)))`)); b.close();
