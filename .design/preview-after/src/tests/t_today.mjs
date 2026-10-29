import { launch } from './cdp_sc.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const EMPTY = '{"t":{},"sl":{"1":0,"2":0,"3":0,"4":0},"u4":0}';
const hero = `JSON.stringify({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,hero:document.querySelector('.now-card')?.innerText.split(String.fromCharCode(10)).join(' | '),cta:document.querySelector('.play.next')?.innerText.split(String.fromCharCode(10)).join(' | '),ring:document.querySelector('.pv')?.textContent,cards:[...document.querySelectorAll('.lessons .f-note')].map(e=>e.textContent.trim().slice(0,40))})`;
for (const [w,h,m] of [[1440,900,false],[390,844,true]]) for (const lang of ['uz','ru']) {
  const b = await launch(w,h,m);
  for (const [name,q,st] of [['pre','&today=2026-09-05','empty'],['story','','seed']]) {
    await b.goto(BASE+'?lang='+lang+q+'#/dastur');
    await b.ev(st==='empty' ? `localStorage.setItem('aip3.demo.v1', ${JSON.stringify(EMPTY)})` : `localStorage.removeItem('aip3.demo.v1')`);
    await b.ev('location.reload()'); await b.wait(1600);
    console.log(w,lang,name,await b.ev(hero)); await b.shot(`today-${w}-${lang}-${name}`, true);
  }
  if (w===1440 && lang==='uz') {
    await b.goto(BASE+'?lang=uz&today=2026-09-05#/dastur'); await b.ev(`localStorage.setItem('aip3.demo.v1', ${JSON.stringify(EMPTY)})`);
    for (const r of ['#/dars/1','#/dars/3/slayd/1','#/dars/2/amaliyot','#/dars/4']) { await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(400); console.log(' locked',r,'->',await b.ev(`location.hash+' | sheet open: '+document.getElementById('lock-sheet').open+' | '+document.getElementById('ls-t').textContent`)); await b.ev(`document.getElementById('lock-sheet').close()`); }
    for (const p of ['day1','story','over']) { await b.ev(`setToday(${JSON.stringify(p)})`); await b.ev(`location.hash='#/dastur'`); await b.wait(300); console.log(' preset',p,await b.ev(hero)); await b.shot(`today-1440-uz-${p}`, true); }
    await b.ev(`setToday('before')`);
    await b.goto(BASE+'?lang=uz&today=2026-09-12#/dastur'); await b.ev(`localStorage.setItem('aip3.demo.v1', ${JSON.stringify(EMPTY)})`); await b.ev('location.reload()'); await b.wait(1500);
    console.log(' day1 empty',await b.ev(hero)); await b.ev(`location.hash='#/dars/1'`); await b.wait(300); console.log(' lesson1 cta',await b.ev(`document.querySelector('.pill-cta')?.innerText`));
  }
  console.log('console', b.logs); b.close();
}
