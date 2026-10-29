import { launch } from './cdp_sc.mjs';
const B = 'http://localhost:3056';
for (const [w,h,m] of [[1440,900,false],[390,844,true]]) {
  const b = await launch(w,h,m);
  await b.goto(B+'/aip/dars/2?tab=vz'); await b.wait(700);
  console.log(w,'signed out deep link ->', await b.ev('location.pathname+" view="+document.body.dataset.view'));
  // wrong id
  await b.click('#gid'); await b.type('ZZ'); await b.ev(`document.getElementById('gate-form').requestSubmit()`); await b.wait(900);
  if (w === 1440) {} 
  console.log(w,'wrong id msg:', await b.ev(`document.getElementById('gid-h').textContent`));
  if (w === 390) {  // the rate-limit check burns this client's budget: last
    for (let i = 0; i < 10; i++) { await b.ev(`fetch('/api/aip/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:'ZZ'+${i}})})`); }
    await b.ev(`gid.value='';gid.readOnly=false`); await b.click('#gid'); await b.type('XM'); await b.ev(`document.getElementById('gate-form').requestSubmit()`); await b.wait(900);
    console.log(w,'rate msg:', await b.ev(`document.getElementById('gid-h').textContent`)); await b.shot('app4-rate');
    b.close(); continue;
  }
  await b.ev(`gid.value='';gid.readOnly=false;gid.dispatchEvent(new Event('input'))`); await b.click('#gid'); await b.type('XM'); await b.ev(`document.getElementById('gate-form').requestSubmit()`); await b.wait(2400);
  console.log(w,'after login lands on the deep link:', await b.ev('location.pathname+" view="+document.body.dataset.view'));
  console.log(w,'home locked cards:', await b.ev(`[...document.querySelectorAll('.lessons .f-note')].map(e=>e.textContent.trim().slice(0,30))`));
  await b.ev(`navTo('#/dars/1')`); await b.wait(500);
  console.log(w,'lesson 1 reachable?', await b.ev(`location.pathname+' | sheet '+document.getElementById('lock-sheet').open+' | '+document.getElementById('ls-t').textContent`));
  await b.ev(`document.getElementById('lock-sheet').close()`);
  const f = await b.ev(`fetch('/api/aip/lesson/1/doc/hw-kompaniya').then(async r=>r.status+' '+(await r.json()).error.code)`);
  console.log(w,'locked file ->', f);
  console.log(w,'prep ok:', await b.ev(`fetch('/api/aip/prep/pdf?lang=uz').then(r=>r.status)`));
  await b.shot('app4-locked-home', true);
  console.log(w,'logs', b.logs.slice(0,4));
  b.close();
}
