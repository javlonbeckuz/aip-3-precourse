a=open('assemble_post.py',encoding='utf-8').read()
a=a.replace("live.textContent = t(fresh ? 'live.copied_new' : 'live.copied', {title: li.querySelector('.tt').textContent.trim()});","live.textContent = t(fresh ? 'live.copied_new' : 'live.copied', {title: li.dataset.t || li.querySelector('.tt').textContent.trim()});")
# move the ?id hook into boot
a=a.replace("    rep(\"go('dastur', true); ldr.hidden = true;\"","    rep(\"if (q.get('id')) { gid.value = q.get('id'); gid.dispatchEvent(new Event('input')); }\n\", \"\")\n    rep(\"go('dastur', true); ldr.hidden = true;\"")
a=a.replace("  runSelftest();\n})();'''","  runSelftest();\n  if (q.get('id')) { gid.value = q.get('id'); gid.dispatchEvent(new Event('input')); }\n})();'''")
open('assemble_post.py','w',encoding='utf-8').write(a)
p='proto_app.js'; s=open(p,encoding='utf-8').read()
old='<li class="${done ? \'done\' : \'\'}" data-i="${o.i}" data-pid="${o.pid}" data-key="${o.key}"><span class="no"'
assert old in s
s=s.replace(old,'<li class="${done ? \'done\' : \'\'}" data-i="${o.i}" data-pid="${o.pid}" data-key="${o.key}" data-t="${esc(o.title)}"><span class="no"')
old='<li class="${done ? \'done\' : \'\'}" data-i="${i}" data-key="${key}"><span class="no" aria-hidden="true">${num2(i + 1)}</span>'
assert old in s
s=s.replace(old,'<li class="${done ? \'done\' : \'\'}" data-i="${i}" data-key="${key}" data-t="${esc(t(`prep.${i}.title`))}"><span class="no" aria-hidden="true">${num2(i + 1)}</span>')
old='data-sect="${p.sect}" data-n="${p.id}">'
assert old in s
s=s.replace(old,'data-sect="${p.sect}" data-n="${p.id}" data-t="${esc(title)}">')
open(p,'w',encoding='utf-8').write(s)
