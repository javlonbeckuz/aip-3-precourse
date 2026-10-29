// distinct font-size / family pairs over every route: node t_scale.mjs <width>
import { launch } from './cdp_fe.mjs';
const W = +process.argv[2] || 1440, U = 'http://localhost:8765/comp/index.html?solo';
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
await b.goto(U + '#/dastur'); await b.ev('localStorage.removeItem("aip3.demo.v1")'); await b.goto(U + '#/dastur'); await b.ev('S.setU4(true); render()'); await b.wait(300);
const set = new Map();
for (const r of await b.ev('ROUTES()')) {
  if (r === '#/kirish' || r === '#/shrift') continue;
  await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(120);
  const pairs = await b.ev(`(()=>{const o=new Set(),w=document.createTreeWalker(document.querySelector('#s-app'),NodeFilter.SHOW_TEXT);for(let n;(n=w.nextNode());){if(!n.nodeValue.trim())continue;const e=n.parentElement;if(e.closest('[hidden],[inert],.sr-only,svg,.screen-tag'))continue;const c=getComputedStyle(e);o.add(parseFloat(c.fontSize).toFixed(1).replace(/\.0$/,'')+' '+c.fontFamily.split(',')[0].replace(/["']/g,''))}return [...o]})()`);
  pairs.forEach(p => set.set(p, (set.get(p) || 0) + 1));
}
const by = {}; [...set.keys()].forEach(k => { const [s, ...f] = k.split(' '); (by[f.join(' ')] ??= []).push(+s); });
let total = 0; for (const f in by) { by[f].sort((a, c) => a - c); total += by[f].length; console.log(f + ':', by[f].join(', ')); }
console.log('W', W, 'distinct size/family pairs:', total); b.close(); process.exit(0);
