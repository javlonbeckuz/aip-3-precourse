import { launch } from './cdp_sc.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
for (const [w,h,m] of [[1440,900,false],[390,844,true]]) {
  const b = await launch(w,h,m);
  await b.goto(BASE+'?lang=uz#/dars/2/amaliyot'); await b.ev('location.reload()'); await b.wait(1500);
  const q = `JSON.stringify({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,cards:[...document.querySelectorAll('.sc')].map(c=>c.textContent.replace(/\s+/g,' ').slice(0,70)),cols:getComputedStyle(document.querySelector('.sects')).gridTemplateColumns})`;
  console.log(w,'index',await b.ev(q)); await b.shot(`lib-${w}-index`,true);
  await b.click('#lib-q'); await b.type('narx'); await b.wait(300);
  console.log(w,'search',await b.ev(`JSON.stringify({n:document.getElementById('lib-n').textContent,cardsHidden:document.getElementById('lib-cards').hidden,resHidden:document.getElementById('lib-res').hidden,grps:[...document.querySelectorAll('.lib-grp:not([hidden])')].map(g=>g.dataset.sect)})`)); await b.shot(`lib-${w}-search`,true);
  await b.click('#lib-clear').catch(()=>{}); await b.ev(`document.getElementById('lib-q').value='';document.getElementById('lib-q').dispatchEvent(new Event('input'))`); await b.wait(200);
  console.log(w,'cleared',await b.ev(`document.getElementById('lib-cards').hidden+' '+document.getElementById('lib-res').hidden`));
  await b.click('.sc'); await b.wait(500);
  console.log(w,'section',await b.ev(`location.hash+' | '+document.querySelector('h1').textContent+' | '+document.querySelectorAll('#s-app .s1 li[data-i]').length+' | '+document.querySelector('.play.on-light').textContent.replace(/\s+/g,' ')+' | sw '+document.documentElement.scrollWidth`)); await b.shot(`lib-${w}-section`,true);
  await b.ev(`history.back()`); await b.wait(500); console.log(w,'back',await b.ev('location.hash'));
  console.log('console',b.logs); b.close();
}
