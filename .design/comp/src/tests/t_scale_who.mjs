import { launch } from './cdp_fe.mjs';
const W = +process.argv[2] || 1440, U = 'http://localhost:8765/comp/index.html?solo';
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
await b.goto(U + '#/dastur'); await b.ev('localStorage.removeItem("aip3.demo.v1")'); await b.goto(U + '#/dastur'); await b.ev('S.setU4(true); render()'); await b.wait(300);
const who = {};
for (const r of await b.ev('ROUTES()')) {
  if (r === '#/kirish' || r === '#/shrift') continue;
  await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(100);
  const rows = await b.ev(`(()=>{const o=[],w=document.createTreeWalker(document.querySelector('#s-app'),NodeFilter.SHOW_TEXT);for(let n;(n=w.nextNode());){if(!n.nodeValue.trim())continue;const e=n.parentElement;if(e.closest('[hidden],[inert],.sr-only,svg,.screen-tag'))continue;const c=getComputedStyle(e);o.push([parseFloat(c.fontSize).toFixed(1).replace(/\.0$/,'')+' '+c.fontFamily.split(',')[0].replace(/["']/g,''), e.tagName.toLowerCase()+'.'+[...e.classList].join('.')+(e.parentElement?' < '+String(e.parentElement.getAttribute('class')||'').split(' ')[0]:'')])}return o})()`);
  rows.forEach(([k, s]) => { (who[k] ??= new Set()).add(s); });
}
for (const k of Object.keys(who).sort()) console.log(k, '=>', [...who[k]].slice(0, 8).join(' | '));
b.close(); process.exit(0);
