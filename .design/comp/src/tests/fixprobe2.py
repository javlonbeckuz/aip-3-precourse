p='t_fit3.mjs'; s=open(p,encoding='utf-8').read()
s=s.replace("const h=Math.min(q.bottom,p.bottom)-Math.max(q.top,p.top);if(w>3&&h>3)","const qh=(q.bottom-q.top)*.25,ph=(p.bottom-p.top)*.25,h=Math.min(q.bottom-qh,p.bottom-ph)-Math.max(q.top+qh,p.top+ph);if(w>3&&h>2)") if "const h=Math.min(q.bottom,p.bottom)-Math.max(q.top,p.top);if(w>3&&h>3)" in s else s
s=s.replace("h=Math.min(q.bottom,p.bottom)-Math.max(q.top,p.top);if(w>3&&h>3)return","qh=(q.bottom-q.top)*.25,ph=(p.bottom-p.top)*.25,h=Math.min(q.bottom-qh,p.bottom-ph)-Math.max(q.top+qh,p.top+ph);if(w>3&&h>2)return")
s=s.replace("if((cs.overflowX!=='visible'","if(!e.classList.contains('wordmark')&&(cs.overflowX!=='visible'")
open(p,'w',encoding='utf-8').write(s)
