import { launch, URL } from './cdp_fe.mjs';
const cases = {
  invalid: b => b.type('7KQ2X0'),
  short1: async b => { await b.type('7'); await b.click('.mx-btn'); },
  shortunk: async b => { await b.type('7KQ2'); await b.click('.mx-btn'); },
  notfound: b => b.type('KKKKKK'),
  toolong: async b => { await b.ev(`(()=>{const g=document.getElementById('gid');const dt=new DataTransfer();dt.setData('text','7KQ2XMAB');g.dispatchEvent(new ClipboardEvent('paste',{clipboardData:dt,cancelable:true,bubbles:true}))})()`); await b.click('.mx-btn'); },
};
// glyph pixels = where the white-text render is much brighter than the text-transparent render (same halo, same photo); contrast = white vs the background under those pixels
const analyse = `(a64,b64)=>new Promise(res=>{const load=s=>new Promise(r=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const x=c.getContext('2d');x.drawImage(i,0,0);r(x.getImageData(0,0,c.width,c.height).data)};i.src='data:image/png;base64,'+s});Promise.all([load(a64),load(b64)]).then(([bg,tx])=>{const lin=v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)};const lum=(d,k)=>.2126*lin(d[k])+.7152*lin(d[k+1])+.0722*lin(d[k+2]);const crs=[];for(let k=0;k<bg.length;k+=4){const lb=lum(bg,k),lt=lum(tx,k);if(lt>.8&&lt-lb>.5*(1-lb)){crs.push(1.05/(lb+.05))}}crs.sort((a,b)=>a-b);res({n:crs.length,min:+crs[0].toFixed(2),p1:+crs[Math.floor(crs.length*.01)].toFixed(2),p5:+crs[Math.floor(crs.length*.05)].toFixed(2),median:+crs[Math.floor(crs.length/2)].toFixed(1)})})})`;
const style = (b, on) => b.ev(`(()=>{let s=document.getElementById('__t');if(!s){s=document.createElement('style');s.id='__t';document.head.append(s)}s.textContent=${on ? "'#gid-h span{-webkit-text-fill-color:transparent}#gid-h svg{visibility:hidden}'" : "''"}})()`);
for (const W of [1440, 390, 320]) {
  const b = await launch(W, W > 600 ? 878 : 844, W < 600);
  await b.goto(URL + '?solo&view=gate');
  for (const [name, fn] of Object.entries(cases)) {
    await b.ev(`(()=>{const g=document.getElementById('gid');g.value='';g.focus()})()`);
    await fn(b); await b.wait(250);
    await b.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 2, y: 2 }); await b.wait(150);
    const r = JSON.parse(await b.ev(`(()=>{const sp=document.querySelector('#gid-h span');const r=document.createRange();r.selectNodeContents(sp);const rs=[...r.getClientRects()];const x=Math.min(...rs.map(a=>a.left)),y=Math.min(...rs.map(a=>a.top)),R=Math.max(...rs.map(a=>a.right)),B=Math.max(...rs.map(a=>a.bottom));return JSON.stringify({x,y,w:R-x,h:B-y,btn:document.querySelector('.mx-drop').getBoundingClientRect().top})})()`));
    const clip = { x: r.x, y: r.y, width: r.w, height: r.h, scale: 1 };
    const withText = await b.send('Page.captureScreenshot', { format: 'png', clip });
    await style(b, true); await b.wait(120);
    const noText = await b.send('Page.captureScreenshot', { format: 'png', clip });
    await style(b, false);
    const a = await b.ev(`(${analyse})(${JSON.stringify(noText.result.data)},${JSON.stringify(withText.result.data)})`);
    console.log(W, name.padEnd(9), 'lines', r.h > 30 ? 2 : 1, 'textBottom', Math.round(r.y + r.h), 'btnTop', Math.round(r.btn), '| glyph px', a.n, 'CR min', a.min, 'p1', a.p1, 'p5', a.p5, 'median', a.median);
    await b.shot(`b3_${name}_${W}`);
  }
  b.close();
}
