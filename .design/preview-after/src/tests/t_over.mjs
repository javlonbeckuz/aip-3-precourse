import { launch } from './cdp_fe.mjs';
const LANG = process.argv[2], W = +process.argv[3] || 320, SHOT = process.argv[4];
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const b = await launch(W, W > 600 ? 900 : 844, W < 600);
const bad = [], R = (k, v) => { const s = JSON.stringify(v); console.log('  ' + k.padEnd(34), s.slice(0, 240)); };
const go = async h => { await b.goto(`${BASE}?lang=${LANG}${h}`); await b.ev('localStorage.setItem("aip3.lang","' + LANG + '")'); await b.wait(350); };
await go('#/kirish'); await b.ev('localStorage.removeItem("aip3.demo.v1")');
// 1 login errors: lines, clearance above the button
const errs = [['7KQ2X0', 'badchars'], ['K', 'short'], ['XMZZ', 'unknown_short'], ['7KQ2XMAB', 'toolong'], ['KKKKKK', 'notfound']];
const res = [];
for (const [v, name] of errs) { await b.ev(`(()=>{const g=document.getElementById('gid');g.value=${JSON.stringify(v)};document.getElementById('gate-form').requestSubmit()})()`); await b.wait(120);
  await b.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 2, y: 2 });
  const m = await b.ev(`(()=>{const h=document.querySelector('.mx-help'),r=h.getBoundingClientRect(),btn=document.querySelector('.mx-drop').getBoundingClientRect(),lh=parseFloat(getComputedStyle(h).lineHeight);return {lines:Math.round(r.height/lh),gap:Math.round(btn.top-r.bottom),txt:h.textContent.trim().slice(0,60)}})()`);
  res.push(`${name}: ${m.lines}L gap ${m.gap}px`); if (m.lines > 2 || m.gap < 2) bad.push('login ' + name + ' ' + JSON.stringify(m));
  if (SHOT && name === 'badchars') await b.shot(`${SHOT}_login_${LANG}_${W}`); }
R('login errors', res);
R('gate controls', await b.ev('({submit:document.querySelector(".mx-btn").textContent, scroll:document.querySelector(".mx-btn").scrollWidth<=document.querySelector(".mx-btn").clientWidth, label:document.querySelector(".mx-group label").textContent, h1:document.querySelector(".mx h1").innerText.replace(/\\n/g," / ")})'));
// 2 home
await go('#/dastur'); await b.ev('S.reset();render()'); await b.wait(300);
const home = await b.ev(`(()=>{const f=[...document.querySelectorAll('.f-note')].map(n=>({t:n.innerText.replace(/\\n/g,' '),h:Math.round(n.getBoundingClientRect().height),w:Math.round(n.getBoundingClientRect().width)}));const ps=document.querySelector('.ps');const next=document.querySelector('.next small');return {notes:f.map(x=>x.t+' ('+x.h+')'),ring:[document.querySelector('.pl').innerText,document.querySelector('.ps').innerText,document.querySelector('.pn')?.innerText],next:next?.innerText,cardsOverflow:[...document.querySelectorAll('.folder')].filter(c=>c.scrollWidth>c.clientWidth+1).length}})()`);
R('home notes/ring', home);
if (SHOT) await b.shot(`${SHOT}_home_${LANG}_${W}`, true);
// 3 tabs on lesson 1 and 2
for (const h of ['#/dars/1', '#/dars/2', '#/dars/3']) { await b.ev(`location.hash=${JSON.stringify(h)}`); await b.wait(300);
  const tabs = await b.ev(`[...document.querySelectorAll('.gt-tab')].map(t=>{const s=t.querySelector('.ok')||t;const r=document.createRange();r.selectNodeContents(t);const rr=r.getBoundingClientRect(),tr=t.getBoundingClientRect();return t.innerText.trim().replace(/\\s+/g,' ')+' '+(rr.left>=tr.left-1&&rr.right<=tr.right+1?'fits':'CLIPPED '+Math.round(rr.width)+'>'+Math.round(tr.width))})`);
  R('tabs ' + h, tabs); if (tabs.some(x => /CLIPPED/.test(x))) bad.push('tabs ' + h + ' ' + tabs.join(' | ')); }
if (SHOT) { await b.ev('location.hash="#/dars/1"'); await b.wait(300); await b.shot(`${SHOT}_lesson1_${LANG}_${W}`, true); await b.ev('location.hash="#/dars/1/amaliyot/01"'); await b.wait(300); await b.shot(`${SHOT}_ex01_${LANG}_${W}`, true); }
// 4 panes of lesson 1: every row/link inside its box
for (const t of [0, 1, 2]) { await b.ev(`location.hash="#/dars/1"`); await b.wait(200); await b.ev(`document.querySelectorAll('#dg .gt-tab')[${t}].click()`); await b.wait(500);
  const o = await b.ev(`(()=>{const p=document.querySelector('#dg .gt-pane:not([inert])'),pr=p.getBoundingClientRect(),out=[];p.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&(r.right>pr.right+1||r.left<pr.left-1))out.push(e.className+' '+e.textContent.trim().slice(0,20))});return out.slice(0,3)})()`);
  if (o.length) bad.push('pane ' + t + ' ' + o.join('|')); }
// 5 popup, menu, lock sheet, toast
await go('#/dastur'); await b.ev('S.reset();render();showNewLesson(true)'); await b.wait(500);
const pop = await b.ev(`(()=>{const p=document.getElementById('nl'),r=p.getBoundingClientRect(),cw=document.documentElement.clientWidth,btns=[...p.querySelectorAll('a,button')].map(x=>{const q=x.getBoundingClientRect();return Math.round(q.width)+'x'+Math.round(q.height)+(q.right<=r.right+1?'':' OUT')});return {inView:r.left>=0&&r.right<=cw,h:Math.round(r.height),w:Math.round(r.width),btns,k:p.querySelector('.nl-k').innerText,t:p.querySelector('.nl-t').innerText}})()`);
R('popup', pop); if (!pop.inView || pop.btns.some(x => /OUT/.test(x))) bad.push('popup ' + JSON.stringify(pop));
if (SHOT) await b.shot(`${SHOT}_popup_${LANG}_${W}`);
await b.click('.nl-x'); await b.click(W > 600 ? '.nav-name' : '.menu-btn'); await b.wait(300);
const menu = await b.ev(`(()=>{const m=document.getElementById('nmenu'),mr=m.getBoundingClientRect();const rows=[...m.querySelectorAll('dl > div')].map(d=>{const a=d.querySelector('dt').getBoundingClientRect(),c=d.querySelector('dd').getBoundingClientRect();return (a.right<=c.left+1||a.bottom<=c.top+1)?'ok':'TIGHT '+d.innerText.replace(/\\n/g,' ')});return {inView:mr.right<=document.documentElement.clientWidth+1&&mr.left>=-1,rows,logout:m.querySelector('.nm-out').innerText}})()`);
R('menu', menu); if (!menu.inView || menu.rows.some(x => x !== 'ok')) bad.push('menu ' + JSON.stringify(menu));
await b.key('Escape'); await b.ev('document.querySelector("[data-sheet]").click()'); await b.wait(300);
R('lock sheet', await b.ev(`(()=>{const d=document.getElementById('lock-sheet'),r=d.getBoundingClientRect();return {open:d.open,inView:r.right<=document.documentElement.clientWidth+1,title:d.querySelector('.sheet-t').innerText,h:Math.round(r.height)}})()`));
await b.key('Escape');
// 6 slide bar, library chips
await b.ev('location.hash="#/dars/1/slayd/5"'); await b.wait(300);
const sl = await b.ev(`(()=>{const bar=document.querySelector('.slv-bar'),br=bar.getBoundingClientRect();return {h:Math.round(br.height),items:[...bar.children].map(c=>{const r=c.getBoundingClientRect();return Math.round(r.left)+'..'+Math.round(r.right)}),all:document.querySelector('.slv-all').innerText,seen:document.querySelector('.slv-note').innerText.length}})()`);
R('slide bar', sl); if (sl.items.some(x => +x.split('..')[1] > W + 1)) bad.push('slide bar ' + JSON.stringify(sl));
await b.ev('location.hash="#/dars/2/amaliyot"'); await b.wait(300);
const chips = await b.ev(`[...document.querySelectorAll('.lib-chip')].map(c=>c.innerText.trim()+' '+(c.scrollWidth<=c.clientWidth+1?'ok':'CLIP')+' '+Math.round(c.getBoundingClientRect().width))`);
R('library chips', chips); if (chips.some(x => /CLIP/.test(x))) bad.push('chips');
console.log(`${LANG} ${W}: ${bad.length ? 'PROBLEMS ' + JSON.stringify(bad) : 'all overlay/fit checks pass'}`);
b.close();
