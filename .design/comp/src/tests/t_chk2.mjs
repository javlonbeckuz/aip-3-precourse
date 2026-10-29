import { launch } from './cdp_sc.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const EMPTY = '{"t":{},"sl":{"1":0,"2":0,"3":0,"4":0},"u4":0}';
for (const [w,h,m] of [[390,844,true],[1440,900,false]]) {
  const b = await launch(w,h,m);
  await b.goto(BASE+'?lang=uz&today=2026-10-12#/dastur'); await b.ev(`localStorage.setItem('aip3.demo.v1', ${JSON.stringify(EMPTY)})`);
  await b.goto(BASE+'?lang=uz&today=2026-10-12#/dars/1/vazifa/promptlar'); await b.ev('location.reload()'); await b.wait(1300);
  await b.ev(`Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{}},configurable:true})`);
  console.log(w,'chips on sheet:', await b.ev(`document.querySelectorAll('.s1 .chip').length`));
  await b.shot(`chk2-${w}-sheet`, true);
  await b.click('li[data-pid=P1] .cp'); await b.wait(400);
  console.log(w,'after copy', await b.ev(`JSON.stringify({done:document.querySelector('li[data-pid=P1]').classList.contains('done'),key:JSON.parse(localStorage.getItem('aip3.demo.v1')).t,toast:document.getElementById('toast').hidden?'':document.getElementById('toast-t').textContent,cnt:document.querySelector('[data-cnt=vz1k]').textContent})`));
  await b.click('#toast-undo'); await b.wait(300);
  console.log(w,'after undo', await b.ev(`JSON.stringify({done:document.querySelector('li[data-pid=P1]').classList.contains('done'),key:JSON.parse(localStorage.getItem('aip3.demo.v1')).t,cnt:document.querySelector('[data-cnt=vz1k]').textContent})`));
  // hermes copy with hidden numeral
  await b.ev(`S.setU4(true)`); await b.goto(BASE+'?lang=uz&today=2026-10-12#/dars/4/amaliyot/06'); await b.wait(500);
  await b.ev(`Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{}},configurable:true})`);
  await b.click('li[data-pid=P1] .cp'); await b.wait(400);
  console.log(w,'hermes toast', await b.ev(`document.getElementById('toast-t').textContent+' | caution: '+!!document.querySelector('.caution')`)); await b.shot(`chk2-${w}-hermes06`, true);
  await b.ev(`location.hash='#/dars/4/amaliyot/02'`); await b.wait(300); console.log(w,'card 02 caution:', await b.ev(`!!document.querySelector('.caution')`)); await b.shot(`chk2-${w}-hermes02`, true);
  await b.ev(`location.hash='#/dars/1/amaliyot/01'`); await b.wait(300); await b.shot(`chk2-${w}-ex01`, true);
  for (const old of ['#/dars/2/vazifa','#/dars/3/vazifa','#/dars/4/kitob']) { await b.ev(`location.hash=${JSON.stringify(old)}`); await b.wait(500); console.log(w,old,'->',await b.ev(`location.hash+' | tab: '+document.querySelector('.gt-tab[aria-selected=true]').dataset.l`)); await b.shot(`chk2-${w}-${old.replace(/[#/]/g,'_')}`, true); }
  await b.ev(`history.back()`); await b.wait(400); console.log(w,'back ->', await b.ev('location.hash'));
  await b.goto(BASE+'?lang=uz&today=2026-10-12#/dars/2?tab=vz'); await b.wait(500);
  await b.click('.gt-pane:not([inert]) .endb'); await b.wait(200);
  console.log(w,'vazifa mark', await b.ev(`JSON.stringify({pressed:document.querySelector('.gt-pane .endb').getAttribute('aria-pressed'),tabOk:!!document.querySelector('.gt-tab[aria-selected=true] .ok'),stored:JSON.parse(localStorage.getItem('aip3.demo.v1')).t})`));
  console.log('sw', await b.ev(`document.documentElement.scrollWidth+'/'+document.documentElement.clientWidth`), 'console', b.logs); b.close();
}
