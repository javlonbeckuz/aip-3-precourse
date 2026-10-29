import { launch } from './cdp_sc.mjs';
const B = 'http://localhost:3056';
for (const [w,h,m] of [[1440,900,false],[390,844,true]]) {
  const b = await launch(w,h,m);
  await b.goto(B+'/aip/'); await b.wait(600);
  await b.click('#gid'); await b.type('XM'); await b.ev(`document.getElementById('gate-form').requestSubmit()`); await b.wait(2200);
  await b.shot(`fin-${w}-home`, true);
  for (const [n,r] of [['prep','#/dars/0'],['lesson1','#/dars/1'],['vazifa','#/dars/1/vazifa'],['ex','#/dars/1/amaliyot/01'],['lib','#/dars/2/amaliyot'],['hermes','#/dars/4/amaliyot/04'],['l4','#/dars/4?tab=kt'],['slide','#/dars/1/slayd/2']]) {
    await b.ev(`navTo(${JSON.stringify(r)})`); await b.wait(700); await b.shot(`fin-${w}-${n}`, true);
    if (n === 'l4') console.log(w, 'kitob pane', await b.ev(`document.querySelector('.gt-pane:not([inert])').innerText.split(String.fromCharCode(10)).join(' | ')`));
  }
  console.log(w, 'live', await b.ev(`liveLesson()`), 'logs', b.logs.filter(l=>!/clip/.test(l)));
  b.close();
}
