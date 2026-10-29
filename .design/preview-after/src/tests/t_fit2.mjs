import { launch, URL } from './cdp_fe.mjs';
const stress = f => `(()=>{if(${f}>1){document.querySelectorAll('#dg *').forEach(e=>{const fs=parseFloat(getComputedStyle(e).fontSize);e.style.fontSize=(fs*${f})+'px'})}})()`;
for (const [W, H, mob, f] of [[1440, 900, false, 1], [1000, 900, false, 1], [390, 844, true, 1], [320, 700, true, 1], [320, 700, true, 1.5], [320, 700, true, 2]]) {
  const b = await launch(W, H, mob);
  const out = [];
  for (const i of [0, 1, 2]) {
    await b.goto(URL + `?solo&view=dars&tabtest=${i}`); await b.wait(700);
    if (f > 1) { await b.ev(stress(f)); await b.wait(200); }
    out.push(await b.ev(`(()=>{const body=document.querySelector('.gt-body');const br=body.getBoundingClientRect();const p=[...document.querySelectorAll('#dg [role=tabpanel]')].find(x=>!x.inert);const rows=[...p.querySelectorAll('.xr')];const lastRow=rows.length?rows[rows.length-1].getBoundingClientRect().bottom:null;const items=[...p.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().height);const maxBottom=Math.max(...items.map(e=>e.getBoundingClientRect().bottom));const cs=getComputedStyle(body);return {t:${i},bodyH:Math.round(br.height),clipped:Math.round(maxBottom-(br.bottom-parseFloat(cs.paddingBottom)))>1,lastRowIn:lastRow==null?'-':Math.round(br.bottom-lastRow),inertOthers:[...document.querySelectorAll('#dg [role=tabpanel]')].filter(x=>x!==p).every(x=>x.inert&&getComputedStyle(x).visibility==='hidden'),sw:document.documentElement.scrollWidth}})()`));
  }
  console.log(W, 'x', f, JSON.stringify(out.map(o => `t${o.t} h${o.bodyH} clip:${o.clipped} lastRowGap:${o.lastRowIn} inert:${o.inertOthers} sw${o.sw}`)));
  b.close();
}
// keyboard: Home / End
const b = await launch(1440, 900, false);
await b.goto(URL + '?solo&view=dars'); await b.ev('document.getElementById("dg-t0").focus()');
for (const k of ['End', 'Home', 'ArrowRight']) { await b.key(k); await b.wait(450); console.log(k, await b.ev('[...document.querySelectorAll("#dg [role=tab]")].findIndex(x=>x.getAttribute("aria-selected")=="true")+" focus="+document.activeElement.id')); }
console.log('logs', JSON.stringify(b.logs.filter(l => !/favicon/.test(l))));
b.close();
