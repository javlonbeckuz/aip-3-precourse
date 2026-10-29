import { launch } from './cdp_fe.mjs';
const T = process.argv[2] || 'http://localhost:8765/comp/index.html', W = +process.argv[3] || 390;
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
const R = (k, v) => console.log(k.padEnd(48), typeof v === 'string' ? v : JSON.stringify(v));
const fresh = async (h = '#/dastur') => { await b.goto(T + '?solo' + h); await b.ev(`S.reset();location.hash=${JSON.stringify(h)};render()`); await b.wait(150); };
await fresh();
// 3 back restores scroll + focus
await b.ev('scrollTo(0,300)'); await b.click('.lessons li:nth-child(2) a'); await b.wait(250); R('opened lesson 1', await b.ev('location.hash'));
await b.ev('history.back()'); await b.wait(300); R('back: hash / scrollY / focused link', await b.ev('[location.hash, Math.round(scrollY), document.activeElement.getAttribute("href")]'));
// 4 slides: buttons replace history, refocus, Space, no aria-live on the counter
await b.ev('location.hash="#/dars/3/slayd/14"'); await b.wait(250); const len0 = await b.ev('history.length');
await b.click('[data-slnav="next"]'); await b.wait(250); R('next button: hash / history grew? / focus', await b.ev(`[location.hash, history.length - ${len0}, document.activeElement.dataset.slnav]`));
await b.ev('document.activeElement.blur()'); await b.key(' ', 'Space'); await b.wait(250); R('Space = next', await b.ev('location.hash'));
R('counter aria-live', await b.ev('document.querySelector(".slv-ct").hasAttribute("aria-live")'));
// 5/6/7 router hardening
const unk = []; for (const h of ['#/dars/%E0%A4%A', '#/dars/1/slayd/abc', '#/fayl/__proto__', '#/dars/1/amaliyot/constructor', '#/dars/9', '#/dars/1/slayd/0', '#/nothing']) { await b.ev(`location.hash=${JSON.stringify(h)}`); await b.wait(150); unk.push(await b.ev('location.hash + " " + document.body.dataset.view')); }
R('unknown routes -> home', unk); R('not-found announced', await b.ev('document.getElementById("live").textContent'));
// 5 file back
await b.ev('location.hash="#/dars/1/amaliyot/01"'); await b.wait(150); await b.click('.ef-row'); await b.wait(200);
R('file page back link', await b.ev('document.querySelector(".dl-h .eyebrow").getAttribute("href")'));
await b.ev('location.hash="#/fayl/01-yoriqnoma-pdf"'); await b.wait(150); R('prevHash kept through file pages', await b.ev('prevHash'));
// 7 #/all unique ids
await b.ev('location.hash="#/all"'); await b.wait(300); R('#/all duplicate ids', await b.ev('(()=>{const ids=[...document.querySelectorAll("[id]")].map(e=>e.id);return ids.filter((x,i)=>ids.indexOf(x)!==i)})()'));
// 8 is-done on lesson 2; 12 ?p=Q3
await b.ev('location.hash="#/dars/2"'); await b.wait(200); R('lesson 2 folder grey (is-done)', await b.ev('document.querySelector("#dg").classList.contains("is-done")'));
await b.ev('location.hash="#/dars/1/vazifa/promptlar?p=Q3"'); await b.wait(300); R('?p=Q3 opens details + focuses', await b.ev('[document.querySelector(".s1-more").open, document.activeElement.closest("li")?.dataset.pid]'));
// library: acc, sticky
await b.ev('location.hash="#/dars/2/amaliyot"'); await b.wait(300);
R('library h3 holds a button, collapsed', await b.ev('[document.querySelector("#lib-list li h3.tt > button.acc").getAttribute("aria-expanded"), document.querySelector("#lb01").hidden]'));
await b.click('#L01 .acc'); R('acc opens', await b.ev('[document.querySelector("#L01 .acc").getAttribute("aria-expanded"), document.querySelector("#lb01").hidden]'));
await b.ev('scrollTo(0, document.querySelector("#lib-list li:nth-child(20)").getBoundingClientRect().top + scrollY)'); await b.wait(200);
R('lib-bar sticky: top of bar', await b.ev('Math.round(document.querySelector(".lib-bar").getBoundingClientRect().top)'));
R('qoidalar line + rules count', await b.ev('[document.querySelector(".lib-rules summary").textContent.trim(), document.querySelectorAll(".lib-rules li").length]'));
// 7 endb constant label
await b.ev('location.hash="#/dars/1/amaliyot/04"'); await b.wait(200); const eb = '.endb[data-end="x:04"]';
const l1 = await b.ev(`document.querySelector('${eb}').getAttribute("aria-label")`); await b.click(eb); await b.wait(100);
R('endb: aria-label fixed, aria-pressed flips, text switches', await b.ev(`[${JSON.stringify(l1)}, document.querySelector('${eb}').getAttribute("aria-label"), document.querySelector('${eb}').getAttribute("aria-pressed"), document.querySelector('${eb}').textContent]`));
// Hermes 10 meta, main landmark, language buttons are buttons
await b.ev('S.setU4(true);location.hash="#/dars/4/amaliyot/10"'); await b.wait(250); R('Hermes 10 meta', await b.ev('document.querySelector(".dl-m").textContent'));
R('<main> wraps the page; lang controls are buttons', await b.ev('[!!document.querySelector("#s-app main .ex-wrap"), [...document.querySelectorAll("[data-lang]")].every(e=>e.tagName==="BUTTON")]'));
// lock sheet focus
await fresh(); await b.click('[data-sheet]'); await b.wait(200); await b.key('Escape'); await b.wait(250); R('lock sheet close -> focus on card 4', await b.ev('document.activeElement.hasAttribute("data-sheet")'));
await b.ev('location.hash="#/dars/4"'); await b.wait(300); await b.key('Escape'); await b.wait(250); R('deep link sheet close -> focus', await b.ev('document.activeElement.tagName'));
// cold entry: parent goes under the deep link
await b.goto(T + '?solo#/dars/1/amaliyot/03a'); await b.wait(300); await b.ev('history.back()'); await b.wait(250);
R('cold entry 03a: Back -> parent (stays in app)', await b.ev('location.hash'));
await b.goto(T + '?solo#/dars/1/vazifa/promptlar'); await b.wait(300); await b.ev('history.back()'); await b.wait(250); R('cold entry promptlar: Back', await b.ev('location.hash'));
R('console', b.logs.filter(l => !/favicon/.test(l)));
b.close();
