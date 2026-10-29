import { launch } from './cdp_sc.mjs';
const B = 'http://localhost:3057';
for (const [w,h,m] of [[390,844,true],[1440,900,false]]) {
  const b = await launch(w,h,m);
  await b.goto(B+'/aip/'); await b.wait(500);
  await b.click('#gid'); await b.type('XM'); await b.ev(`document.getElementById('gate-form').requestSubmit()`); await b.wait(2200);
  await b.ev(`setLang('ru')`); await b.wait(1200);
  for (const [n,r] of [['ex','#/dars/1/amaliyot'],['ex01','#/dars/1/amaliyot/01'],['lib','#/dars/2/amaliyot'],['sect','#/dars/2/amaliyot/01-biznes-goyalar'],['hermes','#/dars/4/amaliyot'],['sheet','#/dars/1/vazifa/promptlar']]) {
    await b.ev(`navTo(${JSON.stringify(r)})`); await b.wait(600);
    const o = await b.ev(`JSON.stringify({lede:document.querySelector('.ex-wrap .lede')?.textContent.slice(0,70),tagged:[...document.querySelectorAll('#s-app [lang="uz-Latn"]')].length,rule:(document.querySelector('.rules li')||{}).innerHTML?.slice(0,90),sw:document.documentElement.scrollWidth<=document.documentElement.clientWidth})`);
    console.log(w, n, o); await b.shot(`ru-${w}-${n}`, true);
  }
  console.log(w,'lang cookie', await b.ev(`document.cookie.includes('aip_lang=ru')`), 'logs', b.logs.filter(l=>!/clip/.test(l)));
  b.close();
}
