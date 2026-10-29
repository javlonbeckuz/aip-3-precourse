import { launch, URL } from './cdp_fe.mjs';
const b = await launch(1440, 900, false);
const R = (k, v) => console.log(k.padEnd(34), typeof v === 'string' ? v : JSON.stringify(v));
// popup: login -> shows; Esc closes + remembers; relogin -> not shown; ?newlesson forces
await b.goto(URL + '?solo&view=gate&id=AIP-7KQ2XM'); await b.wait(2600);
R('after login view', await b.ev('document.body.dataset.view'));
R('popup visible', await b.ev('!document.getElementById("nl").hidden'));
R('focus not in popup', await b.ev('!document.getElementById("nl").contains(document.activeElement)'));
R('live', await b.ev('document.getElementById("live").textContent'));
R('popup rect', await b.ev('(()=>{const r=document.getElementById("nl").getBoundingClientRect();return [r.left,r.top,r.width,r.height].map(Math.round)})()'));
await b.key('Escape'); await b.wait(200);
R('Esc closes', await b.ev('document.getElementById("nl").hidden'));
R('stored', await b.ev('localStorage.getItem("aip3.nl.seen")'));
await b.goto(URL + '?solo&view=gate&id=7KQ2XM'); await b.wait(2600);
R('2nd login popup hidden', await b.ev('document.getElementById("nl").hidden'));
await b.goto(URL + '?solo&view=dastur&newlesson'); await b.wait(500);
R('?newlesson forces', await b.ev('!document.getElementById("nl").hidden'));
await b.click('.nl-x'); await b.wait(200);
R('Yopish closes', await b.ev('document.getElementById("nl").hidden'));
R('focus after close', await b.ev('document.activeElement.tagName'));
await b.goto(URL + '?solo&view=dastur&newlesson'); await b.wait(400);
await b.click('.nl-go'); await b.wait(300);
R('Darsni ochish -> view', await b.ev('document.body.dataset.view'));
R('popup after open', await b.ev('document.getElementById("nl").hidden'));
// menu: open, Esc, Chiqish
await b.goto(URL + '?solo&view=dastur'); await b.click('.nav-name'); await b.wait(200);
R('menu open', await b.ev('!document.getElementById("nmenu").hidden'));
await b.key('Escape'); await b.wait(100);
R('menu Esc', await b.ev('document.getElementById("nmenu").hidden'));
await b.click('.nav-name'); await b.click('.nm-out'); await b.wait(300);
R('Chiqish -> view', await b.ev('document.body.dataset.view'));
// sheet
await b.goto(URL + '?solo&view=dastur'); await b.click('[data-sheet]'); await b.wait(200);
R('sheet open', await b.ev('document.getElementById("lock-sheet").open'));
await b.key('Escape'); await b.wait(100);
R('sheet Esc', await b.ev('!document.getElementById("lock-sheet").open'));
// tabs
await b.goto(URL + '?solo&view=dars'); await b.click('#dg-t0'); await b.ev('document.getElementById("dg-t0").focus()');
for (const k of ['ArrowRight', 'ArrowRight', 'ArrowRight']) { await b.key(k); await b.wait(500); R('tab after ' + k, await b.ev('(()=>{const t=[...document.querySelectorAll("#dg [role=tab]")];return t.findIndex(x=>x.getAttribute("aria-selected")=="true")+" panes visible:"+[...document.querySelectorAll("#dg [role=tabpanel]")].filter(p=>!p.inert).length+" i="+getComputedStyle(document.getElementById("dg")).getPropertyValue("--i")})()')); }
await b.goto(URL + '?solo&view=dars&tabtest=2'); await b.wait(600);
R('tabtest=2 selected', await b.ev('document.querySelector("#dg [aria-selected=true]").textContent'));
// undo flow with chip
await b.goto(URL + '?solo&view=ex'); await b.ev('navigator.clipboard.writeText=async()=>{}');
await b.click('.s1 li[data-i="1"] .cp'); await b.wait(300);
R('toast shown', await b.ev('[!document.getElementById("toast").hidden, document.getElementById("toast-t").textContent]'));
await b.click('#toast-undo'); await b.wait(200);
R('after undo', await b.ev('[document.querySelector(".s1 li[data-i=\\"1\\"]").className, document.getElementById("toast").hidden, document.querySelector(".s1 li[data-i=\\"1\\"] .chip").textContent]'));
await b.click('.s1 li[data-i="1"] .chip'); await b.wait(200);
R('manual mark -> toast', await b.ev('[document.querySelector(".s1 li[data-i=\\"1\\"]").className, !document.getElementById("toast").hidden]'));
await b.click('.s1 li[data-i="0"] .chip'); await b.wait(200);
R('unmark 01', await b.ev('document.querySelector(".s1 li[data-i=\\"0\\"]").className'));
await b.wait(5200);
R('toast auto-hides 5s', await b.ev('document.getElementById("toast").hidden'));
// wordmark
await b.goto(URL + '?solo&view=gate&wmtest=690,60'); await b.wait(500);
R('wordmark blur', await b.ev('[...document.querySelectorAll(".wm-l")].map(s=>s.style.filter).filter(Boolean).length'));
// reduced motion ring
R('logs', b.logs.filter(l => !/favicon/.test(l)));
b.close();
