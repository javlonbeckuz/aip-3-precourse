import { launch } from './cdp_sc.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const routes = {'vz-sheet':'#/dars/1/vazifa/promptlar','am1':'#/dars/1/amaliyot','ex02':'#/dars/1/amaliyot/02','lesson2':'#/dars/2','lib':'#/dars/2/amaliyot','vz3':'#/dars/3/vazifa','h-idx':'#/dars/4/amaliyot','h04':'#/dars/4/amaliyot/04','h08':'#/dars/4/amaliyot/08'};
for (const [w,h,m] of [[1440,900,false],[390,844,true]]) {
  const b = await launch(w,h,m);
  await b.goto(BASE+'#/dastur'); await b.ev('S.setU4(true)');
  for (const [n,r] of Object.entries(routes)) {
    await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(300);
    const i = await b.ev(`JSON.stringify({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,ns:[...document.querySelectorAll('#s-app .ns')].length})`);
    console.log(w,n,i); await b.shot(`fill-${w}-${n}`, true);
  }
  console.log('console', b.logs); b.close();
}
