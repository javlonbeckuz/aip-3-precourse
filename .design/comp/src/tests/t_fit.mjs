import { launch, URL } from './cdp_fe.mjs';
for (const [W, H, mob] of [[1440, 900, false], [1000, 900, false], [900, 900, false], [390, 844, true], [320, 700, true]]) {
  const b = await launch(W, H, mob);
  const out = [];
  for (const i of [0, 1, 2]) {
    await b.goto(URL + `?solo&view=dars&tabtest=${i}`); await b.wait(700);
    out.push(await b.ev(`(()=>{const p=[...document.querySelectorAll('#dg [role=tabpanel]')].find(x=>!x.inert);const body=document.querySelector('.gt-body');const cs=getComputedStyle(body);const last=[...p.children].pop().getBoundingClientRect();return {tab:${i},pane:p.id,sh:p.scrollHeight,ch:p.clientHeight,bodyH:Math.round(body.getBoundingClientRect().height),lastBottom:Math.round(last.bottom-body.getBoundingClientRect().top),padB:cs.paddingBottom,rows:[...p.querySelectorAll('.xr')].map(r=>Math.round(r.getBoundingClientRect().height)).join(',')}})()`));
  }
  console.log(W, JSON.stringify(out));
  b.close();
}
