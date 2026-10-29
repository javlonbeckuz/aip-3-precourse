import { launch } from './cdp_fe.mjs'; const U = 'http://localhost:8765/comp/index.html?solo';
for (const [W, lang] of [[320, 'ru'], [390, 'uz']]) {
  const b = await launch(W, 700, true);
  await b.goto(U + '#/dars/1/slayd/78'); await b.ev('S.setU4(true); render()'); if (lang !== 'uz') await b.ev(`setLang('${lang}')`); await b.wait(700);
  await b.shot(`blk4-slide-${W}-${lang}`);
  console.log(W, await b.ev("document.documentElement.scrollWidth+'/'+innerWidth"));
  await b.goto(U + '#/kirish'); await b.wait(500); if (lang !== 'uz') await b.ev(`setLang('${lang}')`);
  await b.ev("document.querySelector('.mx-btn').focus()"); await b.key('Tab'); await b.key('Tab', 'Tab'); await b.ev("document.querySelector('.mx-btn').focus()"); await b.wait(300);
  await b.shot(`blk5-login-${W}-${lang}`);
  console.log(JSON.stringify(b.logs.filter(l => !/favicon/.test(l)))); b.close();
}
process.exit(0);
