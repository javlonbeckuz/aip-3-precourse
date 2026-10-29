import { launch } from './cdp_fe.mjs';
const T = process.argv[2] || 'http://localhost:8765/comp/index.html', W = +process.argv[3] || 1440;
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
const R = (k, v) => console.log(k.padEnd(44), typeof v === 'string' ? v : JSON.stringify(v));
const reset = async () => { await b.goto(T + '?solo#/dastur'); await b.ev('localStorage.clear()'); await b.goto(T + '?solo#/dastur'); };
const home = () => b.ev(`JSON.stringify({ring:document.querySelector('.pv')?.textContent,notes:[...document.querySelectorAll('.lessons .f-note')].map(n=>n.textContent.trim().replace(/\\s+/g,' ')),next:document.querySelector('.next small')?.textContent||null,hero:document.querySelector('.now-card .f-sub')?.textContent})`);
await reset();
R('home initial', await home());
// hooks
await b.goto(T + '?solo&view=ex&selftest'); await b.wait(900); R('?view=ex&selftest', await b.ev('document.body.dataset.test'));
await b.goto(T + '?solo&view=dars&tabtest=2'); await b.wait(600); R('?view=dars&tabtest=2', await b.ev('document.querySelector("#dg [aria-selected=true]")?.textContent'));
await b.goto(T + '?solo&view=dastur&newlesson'); await b.wait(400); R('?view=dastur&newlesson popup', await b.ev('!document.getElementById("nl").hidden'));
await b.goto(T + '?solo&view=all'); await b.wait(500); R('?view=all screens', await b.ev('[...document.querySelectorAll(".screen.is-on")].map(s=>s.dataset.screen).join(",")'));
await b.goto(T + '?solo&wmtest=690,60'); await b.wait(500); R('?wmtest blurred letters', await b.ev('[...document.querySelectorAll(".wm-l")].filter(s=>s.style.filter).length'));
// login -> dastur
await b.goto(T + '?solo&id=AIP-7KQ2XM'); await b.wait(2800); R('login -> hash/view/popup', await b.ev('[location.hash,document.body.dataset.view,!document.getElementById("nl").hidden,document.activeElement.tagName]'));
// deep link + back button
await b.goto(T + '?solo#/dars/1/amaliyot/03a'); await b.wait(300); R('deep link 03a h1', await b.ev('document.querySelector("#s-app h1").textContent.trim()'));
await reset(); await b.ev('location.hash="#/dars/1"'); await b.wait(150); await b.ev('location.hash="#/dars/1/amaliyot/01"'); await b.wait(150); await b.ev('location.hash="#/dars/1/amaliyot/03"'); await b.wait(150);
await b.ev('history.back()'); await b.wait(200); const h1 = await b.ev('location.hash'); await b.ev('history.back()'); await b.wait(200); const h2 = await b.ev('location.hash'); await b.ev('history.back()'); await b.wait(200);
R('back x3 from 03', [h1, h2, await b.ev('location.hash')]);
R('parent back link on 03a', await (async () => { await b.ev('location.hash="#/dars/1/amaliyot/03a"'); await b.wait(150); return b.ev('document.querySelector("#s-app .dl-h .eyebrow").getAttribute("href")+" | "+document.querySelector("#s-app .dl-h .eyebrow").textContent.trim()'); })());
// locked lesson 4
await reset(); await b.ev('location.hash="#/dars/4"'); await b.wait(300); R('locked deep link -> hash, sheet open', await b.ev('[location.hash,document.getElementById("lock-sheet").open]')); await b.key('Escape'); await b.wait(150);
await b.click('[data-sheet]'); await b.wait(200); R('card 4 click opens sheet', await b.ev('document.getElementById("lock-sheet").open')); await b.key('Escape'); await b.wait(150);
await b.ev('document.getElementById("u4").click()'); await b.wait(300); R('unlock toggle -> card 4', await b.ev('JSON.stringify([...document.querySelectorAll(".lessons .f-note")].pop().textContent.trim())+" "+document.querySelector(".lessons li:last-child a")?.getAttribute("href")'));
await b.ev('document.getElementById("u4").click()');
// jump menu
await b.ev('(()=>{const j=document.getElementById("jump");j.value="#/dars/2/amaliyot";j.dispatchEvent(new Event("change"))})()'); await b.wait(250); R('jump menu -> lib', await b.ev('[location.hash,document.querySelector("#s-app h1").textContent.trim()]'));
// library: search qimmat, 27
await b.ev('(()=>{const q=document.getElementById("lib-q");q.value="qimmat";q.dispatchEvent(new Event("input"))})()'); await b.wait(200);
R('library "qimmat"', await b.ev('[...document.querySelectorAll("#lib-list>li:not([hidden])")].map(l=>l.dataset.n).join(",")+" | "+document.getElementById("lib-n").textContent'));
await b.ev('(()=>{const q=document.getElementById("lib-q");q.value="zzzz";q.dispatchEvent(new Event("input"))})()'); await b.wait(100); R('library empty state', await b.ev('!document.getElementById("lib-empty").hidden'));
// progress consistency: finish lesson 1 by ticking
await reset();
const tick = async (hash, pids) => { await b.ev(`location.hash=${JSON.stringify(hash)}`); await b.wait(200); for (const p of pids) { await b.click(`li[data-pid="${p}"] .chip`); await b.wait(120); } };
R('lesson 1 before', await b.ev('JSON.stringify([lProg(1),lProg(2),lProg(3)])'));
await tick('#/dars/1/amaliyot/01', ['P3', 'P4']); await tick('#/dars/1/amaliyot/04', ['P1', 'P2', 'P3']); await tick('#/dars/1/vazifa/promptlar', ['P6', 'P7', 'P8']);
R('lesson 1 after ticks', await b.ev('JSON.stringify([lProg(1),ring()])'));
await b.ev('location.hash="#/dastur"'); await b.wait(300); R('home after lesson 1 done', await home());
await b.ev('location.hash="#/dars/1"'); await b.wait(300); R('lesson 1 page header + tabs', await b.ev('document.querySelector(".dl-m").textContent+" | "+[...document.querySelectorAll(".gt-tab")].map(t=>t.textContent.trim().replace(/\\s+/g," ")).join(" / ")'));
await b.ev('document.getElementById("rst").click()'); await b.wait(300); await b.ev('location.hash="#/dastur"'); await b.wait(200); R('home after Reset demo', await home());
// persistence after reload
await tick('#/dars/1/amaliyot/04', ['P1']); await b.goto(T + '?solo#/dars/1/amaliyot/04'); await b.wait(300); R('tick persists after reload', await b.ev('document.querySelector("li[data-pid=P1]").classList.contains("done")'));
await reset();
// slide viewer: keyboard + last slide = Koʻrildi
await b.ev('location.hash="#/dars/3/slayd/14"'); await b.wait(250); await b.key('ArrowRight'); await b.wait(200); R('slides arrow right', await b.ev('[location.hash,document.querySelector(".slv-ct").textContent]'));
await b.ev('location.hash="#/dars/3/slayd/39"'); await b.wait(200); await b.key('ArrowRight'); await b.wait(200); R('slide 40 seen mark', await b.ev('[location.hash,document.querySelector(".slv-seen").textContent.trim(),slDone(3),JSON.stringify(lProg(3))]'));
R('console', b.logs.filter(l => !/favicon/.test(l)));
b.close();
