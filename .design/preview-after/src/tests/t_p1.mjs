import { launch } from './cdp_sc.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const EMPTY = '{"t":{},"sl":{"1":0,"2":0,"3":0,"4":0},"u4":0}';
const b = await launch(390,844,true);
await b.goto(BASE+'?lang=uz#/kirish'); await b.ev(`localStorage.setItem('aip3.demo.v1', ${JSON.stringify(EMPTY)}); localStorage.removeItem('aip3.nl.seen')`); await b.ev('location.reload()'); await b.wait(1500);
console.log('gate help:', await b.ev(`document.getElementById('gid-h').textContent+' | placeholder='+document.getElementById('gid').getAttribute('placeholder')`)); await b.shot('p1-00-gate');
await b.click('#gid'); await b.type('7KQ2XM'); await b.wait(1600);
console.log('after login', await b.ev(`location.hash+' | popup hidden='+document.getElementById('nl').hidden`)); await b.shot('p1-01-popup-home');
await b.ev(`location.hash='#/dars/1'`); await b.wait(400);
console.log('route change -> popup hidden', await b.ev(`document.getElementById('nl').hidden`));
await b.ev(`location.hash='#/dastur'`); await b.wait(300);
console.log('home again popup hidden (stays closed unless re-shown)', await b.ev(`document.getElementById('nl').hidden`));
// popup 'Darsni ochish'
await b.ev(`localStorage.removeItem('aip3.nl.seen'); showNewLesson(true)`); await b.wait(200);
await b.click('.nl-go'); await b.wait(500);
console.log('Darsni ochish ->', await b.ev(`location.hash+' | popup hidden='+document.getElementById('nl').hidden`)); await b.shot('p1-02-lesson3-after-popup');
// first-time Keyingi qadam
await b.ev(`location.hash='#/dastur'`); await b.wait(400);
console.log('home CTA', await b.ev(`document.querySelector('.play.next').textContent.trim().split(String.fromCharCode(10)).join(' | ')+' -> '+document.querySelector('.play.next').getAttribute('href')`));
await b.click('.play.next'); await b.wait(600);
console.log('landed', await b.ev(`location.hash+' scrollY='+scrollY`)); await b.shot('p1-03-nextstep-landing');
await b.ev(`location.hash='#/dars/1'`); await b.wait(500);
console.log('lesson1 pill', await b.ev(`document.querySelector('.pill-cta').innerText.split(String.fromCharCode(10)).join(' ')+' | slides pane: '+document.querySelector('#dg-p0 .play').innerText.split(String.fromCharCode(10)).join(' ')`)); await b.shot('p1-04-lesson1');
await b.ev(`location.hash='#/dars/1/amaliyot/03'`); await b.wait(400); await b.shot('p1-05-picker');
await b.ev(`location.hash='#/dars/1/slayd/78'`); await b.wait(400); await b.shot('p1-06-lastslide');
await b.ev(`S.u4 && 0; S.setU4(true)`); await b.ev(`location.hash='#/dars/4/amaliyot/04'`); await b.wait(400); await b.shot('p1-07-hermes04');
await b.ev(`location.hash='#/dars/0'`); await b.wait(500); await b.click('#pc1 .chip'); await b.wait(200);
console.log('prep chip on closed card', await b.ev(`JSON.stringify({open:[...document.querySelectorAll('.pc.open')].map(x=>x.id),done:document.querySelectorAll('.pc.done').length})`)); await b.shot('p1-08-prep');
console.log('overflow', await b.ev(`document.documentElement.scrollWidth+'/'+document.documentElement.clientWidth`), b.logs); b.close();
