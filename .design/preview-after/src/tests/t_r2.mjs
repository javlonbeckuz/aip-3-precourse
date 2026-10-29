import { launch } from './cdp_sc.mjs';
const OPEN = 'http://localhost:3058', LOCKED = 'http://localhost:3059';
const login = async (b, B, id) => { await b.goto(B+'/aip/'); await b.wait(600); await b.click('#gid'); await b.type(id); await b.ev(`document.getElementById('gate-form').requestSubmit()`); await b.wait(2400); };
const out = (k, v) => console.log(k.padEnd(34), typeof v === 'string' ? v : JSON.stringify(v));
// ---- A: XSS name (the id has 6 chars: auto-submits)
{ const b = await launch(390,844,true); await login(b, OPEN, '339P3W');
  out('xss: nav-name html', await b.ev(`document.querySelector('.nav-name').innerHTML`));
  out('xss: img injected / handler ran', await b.ev(`[document.querySelectorAll('.nav-name img').length, window.__xss === 1]`));
  await b.ev(`document.querySelector('.menu-btn,.nav-name').click()`); await b.wait(300);
  out('xss: menu mentor text', await b.ev(`document.getElementById('nm-mentor').innerHTML+' | '+document.getElementById('nm-name').innerHTML.slice(0,40)`)); b.close(); }
// ---- B: language-switch race
{ const b = await launch(390,844,true); await login(b, OPEN, 'XM');
  await b.ev(`navTo('#/dars/1')`); await b.wait(500);
  await b.ev(`setLang('ru'); setLang('en'); setLang('ru'); setLang('en')`); await b.wait(2500);
  out('race: LANG / cookie / html lang', await b.ev(`[LANG, ['uz','ru','en'].find(x => document.cookie.includes('aip_lang='+x)), document.documentElement.lang]`));
  out('race: lsub text (should be english)', await b.ev(`document.querySelector('.lsub').textContent`));
  out('race: dictionaries not crossed', await b.ev(`[I18N.ru['lesson.1.sub'], I18N.en['lesson.1.sub'], I18N.uz['lesson.1.sub']]`));
  // failure path: a /me that fails keeps the old language
  await b.ev(`window.__f = window.fetch; window.fetch = (u, o) => String(u).includes('/me') ? Promise.reject(new TypeError('x')) : window.__f(u, o)`);
  await b.ev(`setLang('ru')`); await b.wait(1200);
  out('failed switch: LANG / cookie / toast', await b.ev(`[LANG, ['uz','ru','en'].find(x => document.cookie.includes('aip_lang='+x)), document.getElementById('toast').hidden ? '' : document.getElementById('toast-t').textContent]`));
  await b.ev(`window.fetch = window.__f`); b.close(); }
// ---- C: progress writes (rollback, generation) + uz payload for course text under ru
{ const b = await launch(390,844,true); await login(b, OPEN, 'XM');
  await b.ev(`navTo('#/dars/1/amaliyot/01')`); await b.wait(400);
  await b.ev(`window.__f = window.fetch; window.__n = 0; window.fetch = (u, o) => (o && o.method === 'PUT' && ++window.__n === 1) ? Promise.resolve(new Response(JSON.stringify({error:{code:'boom'}}), {status: 500})) : window.__f(u, o)`);
  await b.ev(`S.tick('p:01:P4', true)`); await b.wait(800);
  out('rollback: key after failed put', await b.ev(`[S.has('p:01:P4'), document.getElementById('toast').hidden ? '' : document.getElementById('toast-t').textContent]`));
  await b.ev(`S.tick('x:01', true); S.tick('x:01', false); S.tick('x:01', true)`); await b.wait(900);
  out('generations: server has x:01', await b.ev(`fetch('/api/aip/progress').then(r=>r.json()).then(j=>!!j.progress.t['x:01'])`));
  await b.ev(`window.fetch = window.__f`); b.close(); }
// ---- D/E/F/G: open server: done flag, kitob variants, routes, logout
{ const b = await launch(1440,900,false); await login(b, OPEN, 'XM');
  await b.ev(`navTo('#/dars/4?tab=kt')`); await b.wait(700);
  out('kitob rows (variants from the API)', await b.ev(`[...document.querySelectorAll('.gt-pane:not([inert]) .xr')].map(a => a.textContent.trim().slice(0, 70) + ' -> ' + a.getAttribute('href'))`));
  out('trailing slash route', await b.ev(`navTo('#/dars/1/'), [location.pathname, document.body.dataset.view]`));
  await b.goto(OPEN+'/aip/index.html'); await b.wait(900); out('/aip/index.html ->', await b.ev('location.pathname'));
  // swipe + blur + preload
  await b.ev(`navTo('#/dars/2/slayd/3')`); await b.wait(600);
  await b.ev(`(() => { const st = document.querySelector('.slv-stage'); const ev = (t, x) => st.dispatchEvent(new PointerEvent(t, {bubbles: true, isPrimary: true, clientX: x, clientY: 300})); ev('pointerdown', 300); ev('pointerup', 120); })()`); await b.wait(500);
  out('swipe left -> next slide', await b.ev('location.pathname'));
  await b.ev(`window.dispatchEvent(new Event('blur'))`); out('blur filter on the slide', await b.ev(`getComputedStyle(document.querySelector('.slv-media')).filter`));
  await b.ev(`window.dispatchEvent(new Event('focus'))`);
  // logout
  await b.ev(`navTo('#/dastur')`); await b.wait(500);
  await b.ev(`document.querySelector('.nav-name').click()`); await b.wait(300); await b.click('#logout'); await b.wait(1200);
  out('logout ->', await b.ev(`[location.pathname, document.body.dataset.view, STUDENT, document.getElementById('nm-name').textContent]`)); b.close(); }
// ---- H: part locked on the other server: tab state, ring, done, recheck timer
{ const b = await launch(390,844,true); await login(b, LOCKED, 'XM');
  out('locked: tabs', await b.ev(`navTo('#/dars/1'), new Promise(r => setTimeout(() => r([...document.querySelectorAll('.gt-tab')].map(t => t.textContent.trim() + (t.querySelector('.lkd') ? ' (locked)' : ''))), 500))`));
  out('locked: lDone(1) with a locked part', await b.ev(`lDone(1)`));
  out('recheck timer armed / lock value', await b.ev(`[recheckT > 0, LESSONS[1].lock]`));
  out('partWhen guard', await b.ev(`[partWhen(null), partWhen('x'), partWhen('2026-09-12T13:00:00+05:00')]`));
  out('console', b.logs.filter(l => !/clip|40[13]|500|429/.test(l))); b.close(); }
