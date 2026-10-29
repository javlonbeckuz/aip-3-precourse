import { launch } from './cdp_sc.mjs';
const B = 'http://localhost:3056';
for (const [w,h,m] of [[390,844,true],[1440,900,false]]) {
  const b = await launch(w,h,m);
  await b.goto(B+'/aip/'); await b.wait(600);
  await b.click('#gid'); await b.type('XM'); await b.ev(`document.getElementById('gate-form').requestSubmit()`); await b.wait(2300);
  await b.ev(`navTo('#/dars/1')`); await b.wait(500);
  console.log(w,'tabs', await b.ev(`[...document.querySelectorAll('.gt-tab')].map(t=>t.textContent.trim()+(t.querySelector('.lkd')?' (locked)':''))`));
  await b.ev(`document.querySelectorAll('.gt-tab')[2].click()`); await b.wait(600);
  console.log(w,'vazifa pane', await b.ev(`document.querySelector('.gt-pane:not([inert])').innerText.split(String.fromCharCode(10)).join(' | ')`));
  await b.shot(`app5-lesson1-vz-locked-${w}`, true);
  // locked part route -> lesson page tab
  await b.ev(`navTo('#/dars/1/vazifa')`); await b.wait(500); console.log(w,'/vazifa ->', await b.ev('location.pathname+location.search'));
  // language switch
  await b.ev(`navTo('#/dars/1')`); await b.wait(400);
  const before = await b.ev(`document.querySelector('.lsub').textContent`);
  await b.ev(`setLang('ru')`); await b.wait(900);
  console.log(w,'lang', await b.ev(`JSON.stringify({sub:document.querySelector('.lsub').textContent,cookie:document.cookie.includes('aip_lang=ru'),htmlLang:document.documentElement.lang,url:location.pathname})`), 'was', before);
  await b.ev(`navTo('#/dars/0')`); await b.wait(500);
  console.log(w,'prep ru', await b.ev(`document.querySelector('.lede').textContent.slice(0,90)+' | '+document.querySelector('.ef-nm').textContent+' | '+document.querySelector('.ef-row').getAttribute('href')`));
  await b.shot(`app5-prep-ru-${w}`, true);
  await b.ev(`setLang('uz')`); await b.wait(600);
  // logout
  await b.ev(`document.querySelector('.nav-name, .menu-btn').click()`); await b.wait(300);
  console.log(w,'menu', await b.ev(`document.getElementById('nm-name').textContent+' | '+document.getElementById('nm-id').textContent+' | '+document.getElementById('nm-group').textContent+' | '+document.getElementById('nm-mentor').textContent+' | '+document.getElementById('nm-course').textContent`));
  await b.shot(`app5-menu-${w}`);
  await b.click('#logout'); await b.wait(700);
  console.log(w,'after logout', await b.ev('location.pathname+" view="+document.body.dataset.view+" marker="+document.cookie'));
  const me = await b.ev(`fetch('/api/aip/me').then(r=>r.status)`); console.log(w,'/me after logout', me);
  b.close();
}
