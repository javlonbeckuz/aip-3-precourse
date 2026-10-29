a=open('assemble_post.py',encoding='utf-8').read()
old=".lib-rules>summary::-webkit-details-marker{display:none}.lib-rules .rules{color:var(--ink-2);margin:4px 0 8px}"
assert old in a
a=a.replace(old,old+"\n.s1 .lib-rules .rules li{display:list-item;padding:0;border:0;min-height:0;grid-template-columns:none}")
open('assemble_post.py','w',encoding='utf-8').write(a)
