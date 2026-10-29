import { launch } from './cdp_fe.mjs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const W = +process.argv[2] || 390;
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
const R = (k, v) => console.log(k.padEnd(34), typeof v === 'string' ? v : JSON.stringify(v));
const act = `(()=>{const a=document.activeElement;return a? (a.dataset.lang?'lang:'+a.dataset.lang+(a.closest('#nmenu')?'(menu)':'(gate)'):a.tagName+'#'+a.id+'.'+a.className):null})()`;
// 1. gate with error
await b.goto(BASE + '?lang=uz#/kirish'); await b.ev('localStorage.clear()'); await b.goto(BASE + '?lang=uz#/kirish');
await b.ev(`(()=>{const g=document.getElementById('gid');g.value='KKKKKK';g.dispatchEvent(new Event('input'));document.getElementById('gate-form').requestSubmit()})()`); await b.wait(100);
await b.click('.gate-lang [data-lang="ru"]'); await b.wait(250);
R('1 gate: err/invalid/focus/url', await b.ev(`[document.querySelector('.mx-help').textContent, document.getElementById('gid').getAttribute('aria-invalid'), document.querySelector('.mx-group').classList.contains('err')||document.querySelector('.mx-help').className, ${act}, location.search, document.getElementById('gid').value]`));
await b.click('.gate-lang [data-lang="en"]'); await b.wait(200);
R('1b gate EN', await b.ev(`[document.querySelector('.mx-help').textContent, ${act}, location.search, document.getElementById('live').textContent]`));
// 2. library
await b.ev(`localStorage.clear()`); await b.goto(BASE + '?lang=uz#/dars/2/amaliyot');
await b.click('#lib-q'); await b.type('qimmat'); await b.wait(100);
await b.click('.lib-chip[data-sect="s"]'); await b.wait(100);
const before = await b.ev(`({n:document.getElementById('lib-n').textContent, vis:[...document.querySelectorAll('#lib-list>li')].filter(l=>!l.hidden).map(l=>l.dataset.n)})`);
await b.ev(`openAcc(document.querySelector('#lib-list>li:not([hidden])'),true)`);
await b.click(W<700?'.menu-btn':'.nav-name'); await b.wait(200); await b.ev('scrollTo(0,300)'); await b.wait(100);
const y0 = await b.ev('scrollY');

await b.click('.nm-lang [data-lang="ru"]'); await b.wait(300);
R('2 lib before', before);
R('2 lib after: q/chips/acc/menu/focus', await b.ev(`({q:document.getElementById('lib-q').value, chips:[...document.querySelectorAll('.lib-chip[aria-pressed=true]')].map(c=>c.dataset.sect), n:document.getElementById('lib-n').textContent, vis:[...document.querySelectorAll('#lib-list>li')].filter(l=>!l.hidden).map(l=>l.dataset.n), acc:[...document.querySelectorAll('.acc[aria-expanded=true]')].length, menuOpen:!document.getElementById('nmenu').hidden, focus:${act}, y:scrollY, lang:document.documentElement.lang, ph:document.getElementById('lib-q').placeholder})`));
R('2 y before', y0);
// 3. dars tab 2
await b.goto(BASE + '?lang=uz#/dars/1'); 
await b.click('.gt-tab:nth-child(2)'); await b.wait(900);
R('3 tab before', await b.ev(`[...document.querySelectorAll('.gt-tab')].findIndex(x=>x.getAttribute('aria-selected')==='true')`));
await b.click(W<700?'.menu-btn':'.nav-name'); await b.wait(200); await b.click('.nm-lang [data-lang="en"]'); await b.wait(500);
R('3 tab after / focus / inert', await b.ev(`[[...document.querySelectorAll('.gt-tab')].findIndex(x=>x.getAttribute('aria-selected')==='true'), ${act}, [...document.querySelectorAll('.gt-pane')].map(p=>p.inert), !document.getElementById('nmenu').hidden, document.querySelector('.gt-tab[aria-selected=true]').textContent]`));
// 4. menu open on home, scrolled
await b.goto(BASE + '?lang=uz#/dastur'); await b.click(W<700?'.menu-btn':'.nav-name'); await b.wait(200);
R('4 menu before', await b.ev(`!document.getElementById('nmenu').hidden`));
await b.click('.nm-lang [data-lang="ru"]'); await b.wait(300);
R('4 menu after/focus/expanded', await b.ev(`[!document.getElementById('nmenu').hidden, ${act}, document.querySelector('.nav-name').getAttribute('aria-expanded'), document.querySelector('.nm-out').textContent, document.querySelector('#nmenu dd:last-child')&&[...document.querySelectorAll('#nmenu dd')].map(d=>d.textContent)]`));
// 5. toast pending
await b.goto(BASE + '?lang=uz#/dars/1/amaliyot/01'); await b.ev('localStorage.clear()'); await b.goto(BASE + '?lang=uz#/dars/1/amaliyot/01');
await b.ev(`document.querySelector('li[data-pid=P3] .chip').click()`); await b.wait(150);
R('5 toast before', await b.ev(`[document.getElementById('toast').hidden, document.getElementById('toast-t').textContent]`));
await b.click(W<700?'.menu-btn':'.nav-name'); await b.wait(150); await b.click('.nm-lang [data-lang="en"]'); await b.wait(300);
R('5 toast after', await b.ev(`[document.getElementById('toast').hidden, document.getElementById('toast-t').textContent, document.getElementById('toast-undo').textContent, document.getElementById('live').textContent]`));
R('console', b.logs.filter(l => !/favicon/.test(l)));
b.close();
