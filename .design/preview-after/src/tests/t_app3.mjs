import { launch } from './cdp_sc.mjs';
const B = 'http://localhost:3055';
const b = await launch(390,844,true);
await b.goto(B+'/aip/'); await b.wait(600);
await b.click('#gid'); await b.type('XM'); await b.ev(`document.getElementById('gate-form').requestSubmit()`); await b.wait(2200);
await b.ev(`navTo('#/dars/1/amaliyot/01')`); await b.wait(500);
await b.ev(`Object.defineProperty(navigator,'clipboard',{value:{writeText:async()=>{}},configurable:true})`);
await b.click('li[data-pid=P1] .cp'); await b.wait(500);
await b.click('.endb'); await b.wait(300);
await b.ev(`navTo('#/dars/0')`); await b.wait(500);
await b.click('#pc0 .chip'); await b.wait(400);
await b.ev(`navTo('#/dars/1/slayd/5')`); await b.wait(900);
const prog = async () => b.ev(`fetch('/api/aip/progress').then(r=>r.json()).then(j=>JSON.stringify(j.progress))`);
console.log('server progress', await prog());
await b.goto(B+'/aip/dars/1/amaliyot/01'); await b.wait(1200);
console.log('reload url', await b.ev('location.pathname'), 'P1 done', await b.ev(`document.querySelector('li[data-pid=P1]').classList.contains('done')`), 'endb', await b.ev(`document.querySelector('.endb').getAttribute('aria-pressed')`));
await b.ev(`navTo('#/dars/0')`); await b.wait(400); console.log('prep done cards', await b.ev(`document.querySelectorAll('.pc.done').length`));
await b.ev(`navTo('#/dars/1')`); await b.wait(400); console.log('slides pane', await b.ev(`document.querySelector('#dg-p0').innerText.split(String.fromCharCode(10)).join(' | ')`));
// undo
await b.ev(`navTo('#/dars/1/amaliyot/01')`); await b.wait(400);
await b.click('.endb'); await b.wait(400); console.log('server after untick', await prog());
// rollback: break the session cookie -> 401 -> gate
await b.ev(`document.cookie='aip_session=x; Path=/'`); 
console.log('logs', b.logs);
b.close();
