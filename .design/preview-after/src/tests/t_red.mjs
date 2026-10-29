import { launch } from './cdp_sc.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const EMPTY = '{"t":{},"sl":{"1":0,"2":0,"3":0,"4":0},"u4":0}';
const tag = process.argv[2];
const shots = [['day0','?today=2026-09-05','#/dastur'],['live','?today=2026-09-26','#/dastur'],['lesson1','?today=2026-10-12','#/dars/1'],['hermes06','?today=2026-10-12','#/dars/4/amaliyot/06'],['prep-late','?today=2026-10-12','#/dars/0'],['home-late','?today=2026-10-12','#/dastur']];
const b = await launch(390,844,true);
for (const [n,q,r] of shots) {
  await b.goto(BASE+q+'#/dastur'); await b.ev(`localStorage.setItem('aip3.demo.v1', ${JSON.stringify(EMPTY)})`);
  await b.goto(BASE+q+r); await b.ev('location.reload()'); await b.wait(1300);
  console.log(n, await b.ev(`JSON.stringify({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,card0:document.querySelector('.lessons li .f-note')?.textContent.trim(),lede:document.querySelector('.ex-wrap .lede')?.textContent.slice(0,60)})`));
  await b.shot(`red-${tag}-${n}`, true);
}
console.log('console', b.logs); b.close();
