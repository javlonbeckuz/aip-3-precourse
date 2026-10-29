import { launch } from './cdp_fe.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const out = [];
for (const W of [1440, 390, 320]) {
  const b = await launch(W, W > 600 ? 900 : 844, W < 600);
  for (const L of ['uz', 'ru', 'en']) {
    await b.goto(`${BASE}?lang=${L}#/kirish`);
    const base = await b.ev(`({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth})`);
    if (base.sw > base.cw) out.push(`${W} ${L} gate HSCROLL`);
    for (const v of ['7KQ2X0', 'K', 'XMZZ', '7KQ2XMAB', 'KKKKKK']) {
      await b.ev(`(()=>{const g=document.getElementById('gid');g.value=${JSON.stringify(v)};g.dispatchEvent(new Event('input'));document.getElementById('gate-form').requestSubmit()})()`); await b.wait(80);
      const r = await b.ev(`(()=>{const h=document.querySelector('.mx-help'),r=h.getBoundingClientRect(),lh=parseFloat(getComputedStyle(h).lineHeight)||18;const btn=document.querySelector('.mx-btn').getBoundingClientRect();return {txt:h.textContent.trim(),lines:Math.round(r.height/lh),h:Math.round(r.height),bot:Math.round(r.bottom),btnTop:Math.round(btn.top),sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,inv:document.getElementById('gid').getAttribute('aria-invalid')}})()`);
      if (r.sw > r.cw) out.push(`${W} ${L} ${v} HSCROLL`);
      if (r.bot > r.btnTop + 1) out.push(`${W} ${L} ${v} error overlaps button ${r.bot}>${r.btnTop}`);
      if (W === 320 || v === '7KQ2XMAB') out.push(`${W} ${L} ${v}: lines=${r.lines} h=${r.h} inv=${r.inv} "${r.txt}"`);
    }
    await b.goto(`${BASE}?lang=${L}#/shrift`);
    const ty = await b.ev(`({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth})`);
    if (ty.sw > ty.cw) out.push(`${W} ${L} type HSCROLL ${ty.sw}`);
  }
  out.push(`${W} console ${JSON.stringify(b.logs.filter(l => !/favicon/.test(l)))}`);
  b.close();
}
console.log(out.join('\n'));
