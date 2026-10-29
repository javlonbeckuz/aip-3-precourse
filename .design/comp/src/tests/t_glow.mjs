import { launch, URL } from './cdp_fe.mjs';
const an = `(b64)=>new Promise(res=>{const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(i,0,0);const d=x.getImageData(0,0,c.width,c.height).data;const lin=v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)};let mx=0,mxc;for(let k=0;k<d.length;k+=4){const l=.2126*lin(d[k])+.7152*lin(d[k+1])+.0722*lin(d[k+2]);if(l>mx){mx=l;mxc=[d[k],d[k+1],d[k+2]]}}const cr=l=>(Math.max(l,mx)+.05)/(Math.min(l,mx)+.05);const L2=.2126*lin(166)+.7152*lin(166)+.0722*lin(166),L3=.2126*lin(138)+.7152*lin(138)+.0722*lin(144),Ll=.2126*lin(180)+.7152*lin(161)+.0722*lin(209);res({brightest:mxc,textMuted:+cr(L2).toFixed(2),text3:+cr(L3).toFixed(2),white:+((1.05)/(mx+.05)).toFixed(2),lilacEdge:+cr(Ll).toFixed(2)})};i.src='data:image/png;base64,'+b64})`;
for (const W of [1440, 390, 320]) {
  const b = await launch(W, W > 600 ? 900 : 844, W < 600);
  for (const view of ['dastur', 'dars', 'ex']) {
    await b.goto(URL + '?solo&view=' + view); await b.wait(500);
    await b.ev(`(()=>{const s=document.createElement('style');s.textContent='.frame *{visibility:hidden!important}.frame .site{visibility:visible!important}';document.head.append(s)})()`);
    await b.wait(100);
    const clip = W > 600 ? { x: 0, y: 0, width: W, height: 700, scale: 1 } : { x: 0, y: 0, width: W, height: 500, scale: 1 };
    const shot = await b.send('Page.captureScreenshot', { format: 'png', clip });
    const r = await b.ev(`(${an})(${JSON.stringify(shot.result.data)})`);
    console.log(W, view.padEnd(7), 'brightest bg', JSON.stringify(r.brightest), '| text-2 on it', r.textMuted, 'text-3', r.text3, 'white', r.white, '| lilac fill vs it', r.lilacEdge);
  }
  b.close();
}
