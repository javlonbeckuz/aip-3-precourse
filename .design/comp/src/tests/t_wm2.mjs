import { launch } from './cdp_fe.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const b = await launch(1440, 900, false);
await b.goto(`${BASE}?lang=uz#/kirish`); await b.wait(1200);
const all = [];
for (let k = 0; k < 12; k++) { all.push(await b.ev(`[...document.querySelectorAll('#s-gate .wm-l')].map(l=>+l.getBoundingClientRect().width.toFixed(2))`)); await b.wait(230); }
const n = all[0].length;
for (let i = 0; i < n; i++) { const v = all.map(a => a[i]); console.log(i, Math.min(...v), Math.max(...v)); }
console.log(await b.ev(`(()=>{const l=document.querySelector('#s-gate .wm-l');const g=l.querySelector('.wm-g');return [getComputedStyle(l).display,getComputedStyle(g).justifySelf,getComputedStyle(l,'::after').fontWeight,getComputedStyle(l,'::after').visibility, g.getBoundingClientRect().width]})()`));
b.close();
