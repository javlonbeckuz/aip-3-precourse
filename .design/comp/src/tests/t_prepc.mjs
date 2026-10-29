import { launch } from './cdp_sc.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const EMPTY = '{"t":{},"sl":{"1":0,"2":0,"3":0,"4":0},"u4":0}';
for (const [w,h,m] of [[1440,900,false],[900,800,false],[390,844,true]]) for (const lang of ['uz','ru']) {
  const b = await launch(w,h,m);
  for (const st of ['seed','empty']) {
    await b.goto(BASE+'?lang='+lang+'#/dastur');
    await b.ev(st==='empty' ? `localStorage.setItem('aip3.demo.v1', ${JSON.stringify(EMPTY)})` : `localStorage.removeItem('aip3.demo.v1')`);
    await b.goto(BASE+'?lang='+lang+'#/dars/0'); await b.ev('location.reload()'); await b.wait(1800);
    const i = await b.ev(`JSON.stringify({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,open:[...document.querySelectorAll('.pc.open')].map(x=>x.id),done:document.querySelectorAll('.pc.done').length,cnt:document.querySelector('[data-cnt=prep]').textContent,ns:document.querySelectorAll('#s-app .ns').length,cols:getComputedStyle(document.querySelector('#deck')).gridTemplateColumns,pdf:document.querySelector('.ef-mt').textContent})`);
    console.log(w,lang,st,i); await b.shot(`prepc-${w}-${lang}-${st}`, true);
    if (w===1440 && lang==='uz' && st==='empty') {
      // tick 01 -> opens 02, focus moves, live text, home ring
      await b.click('#pc0 .chip'); await b.wait(300);
      console.log(' after tick', await b.ev(`JSON.stringify({open:[...document.querySelectorAll('.pc.open')].map(x=>x.id),focus:document.activeElement.id,live:document.getElementById('live').textContent,cnt:document.querySelector('[data-cnt=prep]').textContent,st:JSON.parse(localStorage.getItem('aip3.demo.v1')).t})`));
      for (const k of [1,2,3]) { await b.click(`#pc${k} .chip`); await b.wait(150); }
      await b.ev(`location.hash='#/dastur'`); await b.wait(400);
      console.log(' home after 4/4', await b.ev(`[...document.querySelectorAll('#s-app [aria-valuetext],#s-app [role=img]')].map(e=>e.getAttribute('aria-valuetext')||e.getAttribute('aria-label')).join(' | ')+' || '+document.querySelector('#s-app .c-yellow').textContent.trim().slice(0,90)`));
    }
  }
  console.log('console', b.logs); b.close();
}
