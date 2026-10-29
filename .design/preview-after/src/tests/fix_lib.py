p='proto_app.js'; s=open(p,encoding='utf-8').read()
old="""`<section class="s1" aria-labelledby="pr-t"><div class="lib-bar"><p class="s1-eyebrow" id="pr-t">${T('lib.k')}</p>
        <details class="lib-rules"><summary>${T('ex.rule')} <span class="s1-sub">${T('lib.rules')}</span></summary><ol class="rules">${Array.from({length: 4}, (_, i) => `<li>${T('ns.rule', {n: i + 1})}${NSTAG()}</li>`).join('')}</ol></details>
        <label class="sr-only\""""
assert old in s
new="""`<section class="s1" aria-labelledby="pr-t"><p class="s1-eyebrow" id="pr-t">${T('lib.k')}</p>
      <details class="lib-rules"><summary>${T('ex.rule')} <span class="s1-sub">${T('lib.rules')}</span></summary><ol class="rules">${Array.from({length: 4}, (_, i) => `<li>${T('ns.rule', {n: i + 1})}${NSTAG()}</li>`).join('')}</ol></details>
      <div class="lib-bar">
        <label class="sr-only\""""
s=s.replace(old,new)
open(p,'w',encoding='utf-8').write(s)
a=open('assemble_post.py',encoding='utf-8').read()
a=a.replace(".s1 .lib-bar .s1-eyebrow{margin:0}\n","")
a=a.replace(".s1 .lib-bar{position:sticky;top:0;z-index:5;margin:0 -16px;padding:12px 16px;max-width:none;background:var(--lilac);border-bottom:1.5px solid var(--ink)}",".s1 .lib-bar{position:sticky;top:0;z-index:5;margin:12px -16px 0;padding:10px 16px;max-width:none;background:var(--lilac);border-bottom:1.5px solid var(--ink);border-top:1.5px solid var(--ink)}")
a=a.replace("@media (min-width:700px){.s1 .lib-bar{margin:0 calc(-1 * 66px);padding:12px 66px}}","@media (min-width:700px){.s1 .lib-bar{margin:12px calc(-1 * 66px) 0;padding:10px 66px}}")
open('assemble_post.py','w',encoding='utf-8').write(a)
