import { launch, URL } from './cdp_fe.mjs';
const W = +process.argv[2];
const SEL = {
  dastur: ['.folder .f-label', '.folder .f-title', '.folder .f-note', '.folder .f-sub', '.prog .pl', '.prog .ps', '.prog .pn', '.next span', '.next small'],
  'dars&tabtest=0': ['.gt-tab', '.gt-pane:not([inert]) .p-label', '.gt-pane:not([inert]) .p-list span', '.gt-pane:not([inert]) .gt-meta', '.gt-pane:not([inert]) .play span'],
  'dars&tabtest=1': ['.gt-tab', '.gt-pane:not([inert]) .p-label', '.xt', '.xo', '.xr .n', '.xm'],
  'dars&tabtest=2': ['.gt-tab', '.gt-pane:not([inert]) .p-label', '.gt-pane:not([inert]) .p-num', '.gt-pane:not([inert]) .p-sub', '.gt-pane:not([inert]) .play span'],
  ex: ['.s1-eyebrow', '.s1-rule', '.s1 .tt', '.s1 .to', '.s1 .tx', '.s1 .ph', '.s1 .cpl', '.s1 .no', '.s1-pdf', '.ef-h', '.ef-nm', '.ef-mt', '.ef-hint', '.lede'],
};
const gather = `(sels)=>{const lin=v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)};const out=[];for(const sel of sels){document.querySelectorAll(sel).forEach((el,idx)=>{if(!el.offsetParent&&getComputedStyle(el).position!=='fixed')return;const tn=[];const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);for(let n;(n=w.nextNode());)if(n.nodeValue.trim())tn.push(n);if(!tn.length)return;const rg=document.createRange();rg.setStartBefore(tn[0]);rg.setEndAfter(tn[tn.length-1]);const rs=[...rg.getClientRects()].filter(r=>r.width>1&&r.height>1);if(!rs.length)return;const x=Math.min(...rs.map(r=>r.left)),y=Math.min(...rs.map(r=>r.top))+scrollY,R=Math.max(...rs.map(r=>r.right)),B=Math.max(...rs.map(r=>r.bottom))+scrollY;const cs=getComputedStyle(tn[0].parentElement);const m=cs.color.match(/[\\d.]+/g).map(Number);let op=m[3]??1;for(let e=tn[0].parentElement;e&&e!==document.documentElement;e=e.parentElement)op*=parseFloat(getComputedStyle(e).opacity);out.push({sel,idx,txt:el.textContent.trim().slice(0,28),x,y,w:R-x,h:B-y,c:[m[0],m[1],m[2]],op,big:parseFloat(cs.fontSize)>=24||(parseFloat(cs.fontSize)>=18.66&&+cs.fontWeight>=700)})})}return out}`;
const analyse = `(b64,items)=>new Promise(res=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const x=c.getContext('2d');x.drawImage(i,0,0);const lin=v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)};const L=(r,g,b)=>.2126*lin(r)+.7152*lin(g)+.0722*lin(b);const out=items.map(it=>{const X=Math.max(0,Math.floor(it.x)),Y=Math.max(0,Math.floor(it.y)),Wd=Math.max(1,Math.min(c.width-X,Math.ceil(it.w))),H=Math.max(1,Math.min(c.height-Y,Math.ceil(it.h)));const d=x.getImageData(X,Y,Wd,H).data;const crs=[];for(let k=0;k<d.length;k+=4){const bg=[d[k],d[k+1],d[k+2]];const t=bg.map((b,j)=>it.c[j]*it.op+b*(1-it.op));const l1=L(...t),l2=L(...bg);crs.push((Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05))}crs.sort((a,b)=>a-b);return {...it,cr:+crs[Math.floor(crs.length*.05)].toFixed(2),bg:'rgb('+[...x.getImageData(X,Y,1,1).data].slice(0,3).join(',')+')'}});res(out)};i.src='data:image/png;base64,'+b64})`;
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
for (const [name, sels] of Object.entries(SEL)) {
  await b.goto(URL + '?solo&view=' + name); await b.wait(600);
  const items = await b.ev(`(${gather})(${JSON.stringify(sels)})`);
  await b.ev(`(()=>{const s=document.createElement('style');s.id='__h';s.textContent='*{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important}';document.head.append(s)})()`);
  await b.wait(150);
  const m = await b.send('Page.getLayoutMetrics'); const cs = m.result.cssContentSize;
  const shot = await b.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: cs.width, height: cs.height, scale: 1 } });
  const res = await b.ev(`(${analyse})(${JSON.stringify(shot.result.data)},${JSON.stringify(items)})`);
  const bySel = {};
  for (const r of res) { const need = r.big ? 3 : 4.5; (bySel[r.sel] ||= []).push(r); r.fail = r.cr < need; }
  if (name === 'dastur') for (const r of res.filter(r => r.sel === '.folder .f-note' || r.sel === '.folder .f-label')) console.log(W, 'card', r.sel.padEnd(16), r.cr, r.bg, JSON.stringify(r.txt));
  for (const [sel, arr] of Object.entries(bySel)) {
    const w = arr.reduce((a, r) => r.cr < a.cr ? r : a);
    console.log(W, name.padEnd(15), sel.padEnd(40), 'min', String(w.cr).padEnd(6), w.fail ? 'FAIL' : 'ok  ', JSON.stringify(w.txt), w.bg, 'op', w.op.toFixed(2));
  }
}
console.log('logs', JSON.stringify(b.logs.filter(l => !/favicon/.test(l))));
b.close();
