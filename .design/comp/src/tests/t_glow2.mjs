import { launch, URL } from './cdp_fe.mjs';
const an = `(b64,regions)=>new Promise(res=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(i,0,0);const lin=v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)};const L=(r,g,b)=>.2126*lin(r)+.7152*lin(g)+.0722*lin(b);const out=regions.map(r=>{const X=Math.max(0,Math.floor(r.x)),Y=Math.max(0,Math.floor(r.y)),W=Math.max(1,Math.min(c.width-X,Math.ceil(r.w))),H=Math.max(1,Math.min(c.height-Y,Math.ceil(r.h)));const d=x.getImageData(X,Y,W,H).data;let mx=0,mxc;for(let k=0;k<d.length;k+=4){const l=L(d[k],d[k+1],d[k+2]);if(l>mx){mx=l;mxc=[d[k],d[k+1],d[k+2]]}}const cr=(l)=>(Math.max(l,mx)+.05)/(Math.min(l,mx)+.05);return {name:r.name,brightest:mxc,t2:+cr(L(166,166,166)).toFixed(2),t3:+cr(L(138,138,144)).toFixed(2),white:+(1.05/(mx+.05)).toFixed(1),locked:+cr(L(22,22,22)).toFixed(2),lilac:+cr(L(180,161,209)).toFixed(2),grey:+cr(L(224,224,224)).toFixed(1),yellow:+cr(L(253,201,89)).toFixed(1),blue:+cr(L(10,20,252)).toFixed(2)}});res(out)};i.src='data:image/png;base64,'+b64})`;
for (const W of [1440, 390, 320]) {
  const b = await launch(W, W > 600 ? 900 : 844, W < 600);
  for (const view of ['dastur', 'dars', 'ex']) {
    await b.goto(URL + '?solo&view=' + view); await b.wait(500);
    // ring of background around each card / folder: 16px band outside it
    const regions = await b.ev(`(()=>{const out=[];const add=(name,el,pad=14)=>{if(!el)return;const r=el.getBoundingClientRect();if(!r.width)return;const x=r.left+scrollX,y=r.top+scrollY;out.push({name,x:Math.max(0,x-pad),y:Math.max(0,y-pad),w:r.width+2*pad,h:r.height+2*pad})};add('whole top 700',{getBoundingClientRect:()=>({left:0,top:0,width:innerWidth,height:Math.min(700,document.body.scrollHeight),width:innerWidth})},0);document.querySelectorAll('.folder').forEach((e,i)=>add('folder'+i+' '+e.className.replace(/folder|flatc/g,'').trim(),e));const g=document.querySelector('.gt');add('dars folder',g);return out})()`);
    await b.ev(`(()=>{const s=document.createElement('style');s.textContent='.frame *{visibility:hidden!important}.frame .site{visibility:visible!important}';document.head.append(s)})()`);
    await b.wait(100);
    const m = await b.send('Page.getLayoutMetrics'); const cs = m.result.cssContentSize;
    const shot = await b.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: cs.width, height: cs.height, scale: 1 } });
    const r = await b.ev(`(${an})(${JSON.stringify(shot.result.data)},${JSON.stringify(regions)})`);
    for (const o of r) if (o.name !== 'whole top 700' || view === 'ex') console.log(W, view.padEnd(6), o.name.padEnd(22), 'brightest bg', JSON.stringify(o.brightest), '| text-2', o.t2, 'text-3', o.t3, 'white', o.white, '| vs locked', o.locked, 'lilac', o.lilac, 'grey', o.grey, 'yellow', o.yellow, 'blue', o.blue);
  }
  b.close();
}
