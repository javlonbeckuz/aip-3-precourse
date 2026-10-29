p='t_fit3.mjs'; s=open(p,encoding='utf-8').read()
a=s.index("  for(let i=0;i<bx.length;i++)for(let j=i+1"); b=s.index("  const txt=root.innerText;")
new="""  const ov=()=>{for(let i=0;i<bx.length;i++)for(let j=i+1;j<bx.length;j++){const a=bx[i],c=bx[j];if(a.e.contains(c.e)||c.e.contains(a.e))continue;
    for(const q of a.b.rs)for(const p of c.b.rs){const w=Math.min(q.right,p.right)-Math.max(q.left,p.left),h=Math.min(q.bottom,p.bottom)-Math.max(q.top,p.top);if(w>3&&h>3)return 'OVERLAP "'+a.e.textContent.trim().slice(0,22)+'" x "'+c.e.textContent.trim().slice(0,22)+'"';}}return ''};
  const o=ov(); if(o) out.push(o);
"""
s=s[:a]+new+s[b:]
open(p,'w',encoding='utf-8').write(s)
