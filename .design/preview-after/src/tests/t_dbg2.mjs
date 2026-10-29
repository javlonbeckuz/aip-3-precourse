import { launch } from './cdp_fe.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const b = await launch(390, 844, true);
await b.goto(BASE + '?lang=uz#/dars/2/amaliyot'); await b.ev('localStorage.clear()'); await b.goto(BASE + '?lang=uz#/dars/2/amaliyot');
await b.ev(`scrollTo(0,500)`); await b.wait(100);
console.log('y', await b.ev('[scrollY, document.documentElement.scrollHeight]'));
console.log(await b.ev(`(()=>{const o=[]; const orig=window.scrollTo; window.scrollTo=function(...a){o.push('scrollTo '+a.join(',')+' h='+document.documentElement.scrollHeight); return orig.apply(this,a)}; setLang('ru'); o.push('after y='+scrollY+' h='+document.documentElement.scrollHeight); return o})()`));
await b.wait(300); console.log('later', await b.ev('scrollY'));
// with menu open
await b.ev(`scrollTo(0,500)`); await b.click('.menu-btn'); await b.wait(200);
console.log('menu y', await b.ev('[scrollY, !document.getElementById("nmenu").hidden]'));
await b.click('.nm-lang [data-lang="en"]'); await b.wait(300);
console.log('after', await b.ev('[scrollY, !document.getElementById("nmenu").hidden]'));
b.close();
