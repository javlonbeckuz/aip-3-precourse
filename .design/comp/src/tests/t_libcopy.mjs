import { launch } from './cdp_sc.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const EMPTY = '{"t":{},"sl":{"1":0,"2":0,"3":0,"4":0},"u4":0}';
for (const [w,h,m] of [[390,844,true],[1440,900,false]]) {
  const b = await launch(w,h,m);
  await b.goto(BASE+'?lang=uz&today=2026-10-12#/dastur'); await b.ev(`localStorage.setItem('aip3.demo.v1', ${JSON.stringify(EMPTY)})`);
  await b.goto(BASE+'?lang=uz&today=2026-10-12#/dars/2/amaliyot/01-biznes-goyalar'); await b.ev('location.reload()'); await b.wait(1300);
  await b.ev(`Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{}},configurable:true})`);
  const marks = `JSON.stringify({done:document.querySelector('#L01').classList.contains('done'),before:['.tt::before','.acc::before'].map(s=>{const[e,p]=s.split('::');return getComputedStyle(document.querySelector('#L01 '+e),'::'+p).content}),h3H:document.querySelector('#L01 .tt').getBoundingClientRect().height})`;
  await b.click('#L01 .cp'); await b.wait(400); console.log(w,'copied',await b.ev(marks)); await b.shot(`libcopy-${w}-copied`);
  await b.click('#toast-undo'); await b.wait(300); console.log(w,'undone',await b.ev(marks));
  await b.click('#L01 .cp'); await b.wait(400); console.log(w,'re-copied',await b.ev(marks)); await b.shot(`libcopy-${w}-recopied`);
  console.log('console',b.logs); b.close();
}
