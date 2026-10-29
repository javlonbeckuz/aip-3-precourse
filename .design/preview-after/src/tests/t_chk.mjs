import { launch } from './cdp_sc.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const EMPTY = '{"t":{},"sl":{"1":0,"2":0,"3":0,"4":0},"u4":0}';
const routes = {prep:'#/dars/0', prompts:'#/dars/1/amaliyot/01', dark:'#/dars/2/vazifa', more:'#/dars/1/vazifa/promptlar'};
for (const [w,h,m] of [[390,844,true],[1440,900,false]]) {
  const b = await launch(w,h,m);
  for (const st of ['empty','seed']) {
    await b.goto(BASE+'?lang=uz#/dastur');
    await b.ev(st==='empty' ? `localStorage.setItem('aip3.demo.v1', ${JSON.stringify(EMPTY)})` : `localStorage.removeItem('aip3.demo.v1')`);
    for (const [n,r] of Object.entries(routes)) {
      await b.goto(BASE+'?lang=uz'+r); await b.ev('location.reload()'); await b.wait(1300);
      if (n==='more') await b.ev(`document.querySelector('.s1-more').open=true`);
      const i = await b.ev(`JSON.stringify({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,chip:(()=>{const c=document.querySelector('.s1 .chip,.prep .chip');if(!c)return null;const r=c.getBoundingClientRect(),a=getComputedStyle(c,'::after');return [Math.round(r.height),a.inset]})(),endb:document.querySelector('.endb')?.textContent})`);
      console.log(w,st,n,i);
      await b.ev(`(document.querySelector('.s1-end, .endb') || document.body).scrollIntoView({block:'center'})`).catch(()=>{}); await b.wait(150);
      await b.shot(`chk-${w}-${st}-${n}`, true);
    }
  }
  console.log('console', b.logs); b.close();
}
