import { launch } from './cdp_sc.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
for (const [w,h,m] of [[1440,900,false],[390,844,true]]) for (const lang of ['uz','ru']) {
  const b = await launch(w,h,m);
  for (const [n,r] of [['lesson1','#/dars/1'],['vazifa','#/dars/1/vazifa']]) {
    await b.goto(BASE+'?lang='+lang+'#/dastur'); await b.goto(BASE+'?lang='+lang+r); await b.ev('location.reload()'); await b.wait(1500);
    console.log(w,lang,n,await b.ev(`JSON.stringify({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,sub:document.querySelector('.lsub')?.textContent,notes:[...document.querySelectorAll('.grp > .ef-hint')].map(e=>e.textContent.slice(0,40))})`));
    await b.shot(`sub-${w}-${lang}-${n}`, true);
  }
  if (w===1440&&lang==='uz') { await b.goto(BASE+'#/dars/0'); await b.ev(`document.querySelector('[data-pdf]').click()`); await b.wait(500); }
  console.log('console', b.logs); b.close();
}
