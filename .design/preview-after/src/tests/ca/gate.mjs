import { launch } from './lib2.mjs';
const b = await launch(390, 900); await b.size(390, 900, true);
await b.goto('http://localhost:8765/comp/design-option-2.html?solo&view=gate', 3000);
console.log(await b.ev(`(()=>{const st=document.querySelector('.gate-stage').getBoundingClientRect(),h=document.querySelector('.mx h1').getBoundingClientRect(),f=document.querySelector('.mx').getBoundingClientRect(),img=document.querySelector('.gate-bg img');
const s=Math.max(st.width/1984,st.height/2400),iw=1984*s,ih=2400*s,ox=(st.width-iw)*0.35,oy=(st.height-ih)*0.5;
return JSON.stringify({stage:[st.width,st.height],img:[iw,ih,ox,oy],h1:[h.left-st.left,h.top-st.top,h.width,h.height],form:[f.left-st.left,f.top-st.top,f.width,f.height]})})()`));
b.close();
