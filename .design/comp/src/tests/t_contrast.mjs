import { launch, SP } from './cdp_fe.mjs';
import { writeFileSync } from 'node:fs';
const BASE = 'file:///C:/Users/User/vs%20code/HEAD%20projects/praktikum3-precourse-platform/AI-Praktikum-3.0-final.html';
const MODE = process.argv[2] || 'out';
const routes = MODE === 'in' ? ['#/dastur', '#/dars/1', '#/dars/2', '#/dars/3', '#/dars/4'] : ['#/dastur', '#/dars/1', '#/dars/2', '#/dars/3', '#/dars/0', '#/dars/1/amaliyot', '#/dars/1/amaliyot/01', '#/dars/1/amaliyot/03', '#/dars/2/amaliyot', '#/dars/4/amaliyot', '#/dars/4/amaliyot/07', '#/dars/1/vazifa', '#/dars/1/vazifa/promptlar', '#/dars/2/vazifa'];
const out = [];
for (const W of [1440, 390, 320]) {
  const b = await launch(W, W > 600 ? 900 : 844, W < 600);
  for (const L of ['uz', 'ru']) {
    await b.goto(`${BASE}?lang=${L}#/dastur`); await b.ev('localStorage.clear()'); await b.goto(`${BASE}?lang=${L}#/dastur`); await b.ev('S.setU4(true);render()');
    for (const r of routes) {
      await b.ev(`location.hash=${JSON.stringify(r)}`); await b.wait(900);
      const els = await b.ev(`(()=>{const MODE_IN=${MODE==='in'};const res=[];const root=document.querySelector('#s-app');
        root.querySelectorAll('.site *').forEach(e=>{ if(MODE_IN ? !e.closest('.folder,.gt') : e.closest('.folder,.gt,.s1,.nl,.nmenu,.toast,dialog,.sr-only,.pill-cta,.play,.endb,.lib-bar,.slv,.next-card')) return; if(e.classList.contains('sr-only'))return;
          if(![...e.childNodes].some(n=>n.nodeType===3&&n.nodeValue.trim())) return;
          const cs=getComputedStyle(e); if(cs.visibility==='hidden')return; const rg=document.createRange(); rg.selectNodeContents(e); const q=[...rg.getClientRects()].filter(x=>x.width>2&&x.height>2); if(!q.length)return;
          const x0=Math.min(...q.map(a=>a.left)),x1=Math.max(...q.map(a=>a.right)),y0=Math.min(...q.map(a=>a.top)),y1=Math.max(...q.map(a=>a.bottom));
          let op=1;for(let n=e;n&&n!==document.body;n=n.parentElement)op*=parseFloat(getComputedStyle(n).opacity);res.push({op,c:cs.color,t:e.textContent.trim().slice(0,28),cls:e.className,x0:x0+scrollX,x1:x1+scrollX,y0:y0+scrollY,y1:y1+scrollY,fs:cs.fontSize,fw:cs.fontWeight}); });
        return res})()`);
      await b.ev(`(()=>{const s=document.createElement('style');s.id='hidetxt';s.textContent='#s-app .site *{color:transparent!important;text-shadow:none!important;-webkit-text-fill-color:transparent!important;border-color:transparent!important} #s-app .site svg{visibility:hidden}';document.head.append(s)})()`);
      const name = `glow/c${MODE}_${L}_${r.replace(/[#\/]/g, '_')}_${W}`; await b.shot(name, true);
      await b.ev(`document.getElementById('hidetxt').remove()`);
      out.push({W, L, r, name, els});
    }
  }
  b.close();
}
writeFileSync(SP + '/glow/contrast_' + MODE + '.json', JSON.stringify(out));
