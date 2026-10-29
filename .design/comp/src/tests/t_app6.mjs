import { launch } from './cdp_sc.mjs';
const B = 'http://localhost:3055';
const b = await launch(390,844,true);
await b.goto(B+'/aip/'); await b.wait(600);
await b.click('#gid'); await b.type('XM'); await b.ev(`document.getElementById('gate-form').requestSubmit()`); await b.wait(2200);
for (const [n,r] of [['vz','#/dars/1/vazifa'],['sheet','#/dars/1/vazifa/promptlar'],['ex','#/dars/1/amaliyot/02'],['lib','#/dars/2/amaliyot'],['sect','#/dars/2/amaliyot/01-biznes-goyalar'],['l3vz','#/dars/3?tab=vz'],['slide','#/dars/2/slayd/3'],['prep','#/dars/0'],['les2','#/dars/2']]) {
  await b.ev(`navTo(${JSON.stringify(r)})`); await b.wait(700);
  const t = await b.ev(`document.querySelector('#s-app').innerText.slice(0,260).split(String.fromCharCode(10)).join(' | ')`);
  console.log(n, t.slice(0,230)); await b.shot('app6-'+n, true);
}
console.log('logs', b.logs.filter(l=>!/clip/.test(l)));
b.close();
