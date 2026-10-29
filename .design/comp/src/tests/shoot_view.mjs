// viewport screenshots scrolled to an element: node shoot_view.mjs <width> <lang> <tag>
import { launch } from './cdp_fe.mjs';
const [W, LANG, TAG] = [+process.argv[2] || 390, process.argv[3] || 'uz', process.argv[4] || 'v'];
const b = await launch(W, W > 600 ? 900 : 844, W < 600), U = 'http://localhost:8765/comp/index.html?solo';
await b.goto(U + '#/dastur'); await b.ev('localStorage.removeItem("aip3.demo.v1")'); await b.goto(U + '#/dastur'); await b.wait(1200); await b.ev('S.setU4(true); render()'); if (LANG !== 'uz') await b.ev(`setLang('${LANG}')`); await b.wait(400);
const go = async (r, sel, name, pre) => { await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(700); if (pre) { await b.ev(pre); await b.wait(300); }
  await b.ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});if(e){e.scrollIntoView({block:'center'})}else scrollTo(0,0)})()`); await b.wait(500); await b.shot(`${TAG}-${W}-${LANG}-${name}`); };
await go('#/dastur', 'body', 'home');
await go('#/dars/1/amaliyot/01', '.s1-end', 'ex01-end');
await go('#/dars/0', '.prep', 'prep');
await go('#/dars/2/amaliyot', '#lib-q', 'lib-empty', "(()=>{const q=document.getElementById('lib-q');q.value='zzzzq';q.dispatchEvent(new Event('input'))})()");
await go('#/dars/4/amaliyot/10', '.s1 .tx', 'h10');
await go('#/dars/1/amaliyot', '.p-list, .xr', 'am-index');
console.log('overflow', await b.ev("document.documentElement.scrollWidth+'/'+innerWidth"), 'console', JSON.stringify(b.logs.filter(l => !/favicon/.test(l)))); b.close(); process.exit(0);
