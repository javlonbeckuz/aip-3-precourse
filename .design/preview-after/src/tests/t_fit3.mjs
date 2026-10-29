import { launch } from './cdp_fe.mjs';
const LANG = process.argv[2], W = +process.argv[3], REVIEW = process.argv[4] === 'review', SHOT = process.argv[5];
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const url = h => `${BASE}?lang=${LANG}${REVIEW ? '&review' : ''}${h}`;
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
await b.goto(url('#/dastur')); await b.ev('localStorage.clear()'); await b.goto(url('#/dastur')); await b.ev('S.setU4(true);render()');
const routes = (await b.ev('ROUTES()')).filter(r => r !== '#/kirish' && r !== '#/shrift');
const probe = `(()=>{
  const root=document.querySelector('#s-app'), cw=document.documentElement.clientWidth, out=[];
  const txtEls=[...root.querySelectorAll('.site *')].filter(e=>{if(e.closest('.sr-only,[inert],[hidden],.gt-goo,dialog,.lib-chips,.slv-grid'))return false;if(e.classList.contains('sr-only'))return false;return [...e.childNodes].some(n=>n.nodeType===3&&n.nodeValue.trim())});
  const box=e=>{const r=document.createRange();r.selectNodeContents(e);const rs=[...r.getClientRects()].filter(q=>q.width>1&&q.height>1);if(!rs.length)return null;return {l:Math.min(...rs.map(q=>q.left)),r:Math.max(...rs.map(q=>q.right)),t:Math.min(...rs.map(q=>q.top)),b:Math.max(...rs.map(q=>q.bottom)),rs}};
  const bx=txtEls.map(e=>({e,b:box(e)})).filter(x=>x.b);
  bx.forEach(({e,b})=>{ if(b.r>cw+1||b.l<-1) out.push('OFFSCREEN '+e.className+' "'+e.textContent.trim().slice(0,30)+'" '+Math.round(b.l)+'..'+Math.round(b.r));
    const cs=getComputedStyle(e); if(!e.classList.contains('wordmark')&&(cs.overflowX!=='visible'||cs.whiteSpace==='nowrap')&&e.scrollWidth>e.clientWidth+1&&e.clientWidth>0) out.push('TEXTCLIP '+e.className+' "'+e.textContent.trim().slice(0,30)+'" '+e.scrollWidth+'>'+e.clientWidth); });
  // overlap between text of different elements (neither contains the other)
  const ov=()=>{for(let i=0;i<bx.length;i++)for(let j=i+1;j<bx.length;j++){const a=bx[i],c=bx[j];if(a.e.contains(c.e)||c.e.contains(a.e))continue;
    for(const q of a.b.rs)for(const p of c.b.rs){const w=Math.min(q.right,p.right)-Math.max(q.left,p.left),qh=(q.bottom-q.top)*.25,ph=(p.bottom-p.top)*.25,h=Math.min(q.bottom-qh,p.bottom-ph)-Math.max(q.top+qh,p.top+ph);if(w>3&&h>2)return 'OVERLAP "'+a.e.textContent.trim().slice(0,22)+'" x "'+c.e.textContent.trim().slice(0,22)+'"';}}return ''};
  const o=ov(); if(o) out.push(o);
  const txt=root.innerText;
  if(/\\{\\w+\\}/.test(txt)||/#(one|few|many|other)\\b/.test(txt)||txt.includes('⟦')) out.push('LEAK '+(txt.match(/\\{\\w+\\}|#(one|few|many|other)\\b|⟦[^⟧]*⟧/)||[''])[0]);
  const dead=[...root.querySelectorAll('a')].filter(a=>!a.getAttribute('href')||a.getAttribute('href')==='#').length; if(dead)out.push('DEAD '+dead);
  if(document.documentElement.scrollWidth>cw) out.push('HSCROLL '+document.documentElement.scrollWidth+'>'+cw);
  const miss=document.querySelectorAll('#s-app .i18n-miss'); if(miss.length) out.push('MISS '+[...miss].slice(0,3).map(x=>x.textContent.trim().slice(0,24)).join(' | ')+' ('+miss.length+')');
  return out.slice(0,5)})()`;
const issues = [];
for (const r of routes) {
  await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(130);
  const bad = await b.ev(probe); if (bad.length) issues.push(r + ' -> ' + bad.join(' ;; '));
  if (SHOT && ['#/dastur', '#/dars/1', '#/dars/1/amaliyot/01'].includes(r)) { await b.wait(250); await b.shot(`${SHOT}_${LANG}_${r.replace(/[#\/]/g, '_')}_${W}`, true); }
}
console.log(`${LANG} ${W}${REVIEW ? ' review' : ''}: routes ${routes.length}, issues ${issues.length}`); issues.forEach(i => console.log('  ' + i.slice(0, 420)));
console.log('  console:', JSON.stringify(b.logs.filter(l => !/favicon/.test(l))));
b.close();
