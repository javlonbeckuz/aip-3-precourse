import { launch } from './cdp_fe.mjs';
const b = await launch(1440, 900); await b.goto('http://localhost:8765/comp/index.html?solo#/dars/1/amaliyot/01'); await b.wait(1200);
console.log(await b.ev(`(()=>{const e=document.querySelector('.s1-end');const c=getComputedStyle(e);return JSON.stringify({w:e.getBoundingClientRect().width,disp:c.display,wrap:c.flexWrap,jc:c.justifyContent,mt:c.marginTop,bt:c.borderTopWidth,kids:[...e.children].map(k=>k.tagName+'.'+k.className+':'+Math.round(k.getBoundingClientRect().width)+'x'+Math.round(k.getBoundingClientRect().height)+'@'+Math.round(k.getBoundingClientRect().x)+','+Math.round(k.getBoundingClientRect().y))})})()`));
b.close(); process.exit(0);
