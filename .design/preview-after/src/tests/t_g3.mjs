import { launch, URL } from './cdp_fe.mjs';
for (const W of [320, 360, 390]) {
  const b = await launch(W, 844, true);
  await b.goto(URL + '?solo&view=gate');
  const m = async (name, fn) => {
    await b.ev(`(()=>{const g=document.getElementById('gid');g.value='';g.focus()})()`);
    await fn(); await b.wait(250);
    const r = await b.ev(`(()=>{const R=s=>{const r=document.querySelector(s).getBoundingClientRect();return [Math.round(r.top),Math.round(r.bottom)]};return JSON.stringify({help:R('.mx-help'),btnTop:document.querySelector('.mx-drop').getBoundingClientRect().top|0,txt:document.getElementById('gid-h').textContent})})()`);
    console.log(W, name.padEnd(12), r);
    await b.shot(`g3_${name}_${W}`);
  };
  await m('invalid', () => b.type('7KQ2X0'));
  await m('short1', async () => { await b.type('7'); await b.click('.mx-btn'); });
  await m('shortunk', async () => { await b.type('7KQ2'); await b.click('.mx-btn'); });
  await m('notfound', () => b.type('KKKKKK'));
  await m('toolong', () => b.ev(`(()=>{const g=document.getElementById('gid');const dt=new DataTransfer();dt.setData('text','7KQ2XMAB');g.dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,cancelable:true,bubbles:true}))})()`));
  await m('xm', async () => { await b.type('XM'); await b.click('.mx-btn'); });
  b.close();
}
