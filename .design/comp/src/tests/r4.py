import re
p=r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\index.html'
s=open(p,encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(s.count(old),old[:80])
    s=s.replace(old,new)

# ---- #10 tokens
a=s.index(':root{'); b=s.index('}',a)
root=s[a:b+1]
print(root)
new_root=''':root{
  /* brand palette */
  --black:#000; --white:#fff; --blue:#0A14FC; --grey:#E0E0E0; --yellow:#FDC959; --lilac:#B4A1D1; --danger:#FF6B5E;
  /* surfaces, text, lines: the only greys (see .design/tokens.md) */
  --surface-0:#000; --surface-1:#161616;
  --text-1:#FFF; --text-2:#A6A6A6; --text-3:#8A8A90;/* text-3 = data only (sizes, dates) */
  --line:#3F3F3F; --line-ui:#595959;
  --ink:#000; --ink-2:#2E2440;/* text on light fills / secondary text on lilac */
  /* state colours, one meaning each */
  --state-live:var(--blue); --state-open:var(--lilac); --state-done:var(--grey); --state-locked:var(--surface-1); --you:var(--yellow);
  --font-display:'Mona Sans','Roboto Flex',sans-serif;
  --font-body:'Golos Text',system-ui,-apple-system,'Segoe UI',sans-serif;
  --font-mono:'Martian Mono',ui-monospace,'SF Mono',Consolas,monospace;
  --ease:cubic-bezier(.2,0,0,1);
  color-scheme:dark;
}'''
s=s[:a]+new_root+s[b+1:]
for o,n in [('var(--hair)','var(--line)'),('var(--tag-line)','var(--line-ui)'),('var(--muted)','var(--text-2)'),('var(--dark-ink)','var(--text-2)'),('var(--dark)','var(--surface-1)')]:
    print(o,s.count(o)); s=s.replace(o,n)
# stray literals
for o,n in [('color:#D9D9DE','color:var(--text-1)'),('border-top:1px solid #1C1C1F','border-top:1px solid var(--line)'),('color:#8A8A90}','color:var(--text-3)}'),('color:#8a8a8a}','color:var(--text-3)}'),
            ('color:#2E2440','color:var(--ink-2)'),('letter-spacing:.02em;color:#595959}','letter-spacing:.02em;color:var(--ink-2)}'),('background:#111}','background:var(--surface-1)}'),('color:#555}','color:var(--line-ui)}')]:
    c=s.count(o); print(o,c); assert c>=1; s=s.replace(o,n)

# ---- folder colours = state tokens
rep(""".c-blue{--f-bg:var(--blue);--f-ink:var(--white)}
.c-grey{--f-bg:var(--grey);--f-ink:var(--black)}
.c-yellow{--f-bg:var(--yellow);--f-ink:var(--black)}
.c-dark{--f-bg:var(--surface-1);--f-ink:var(--text-2)}""",""".c-blue{--f-bg:var(--state-live);--f-ink:var(--white)}/* now: once per screen, white text only */
.c-lilac{--f-bg:var(--state-open);--f-ink:var(--ink)}/* work left */
.c-grey{--f-bg:var(--state-done);--f-ink:var(--ink)}/* finished: always with a check and "Bajarildi" */
.c-dark{--f-bg:var(--state-locked);--f-ink:var(--text-2)}/* not open yet: lock + date */""")
rep(".f-note{margin-left:auto;",".f-note .dot{width:8px;height:8px;border-radius:50%;background:currentColor;flex:none}/* quiet 'now' mark: never filled like a button */\n.f-note{margin-left:auto;")

# ---- dars tab folder fill by lesson state
rep("--i:0;--n:3;position:relative;color:var(--black)}","--i:0;--n:3;--gt-fill:var(--state-open);position:relative;color:var(--black)}\n.gt.is-done{--gt-fill:var(--state-done)}/* a finished lesson's folder turns grey (lesson 1 is open: lilac) */")
rep("transform:translateX(calc(var(--i) * 100%));transition:transform .4s cubic-bezier(.3,0,0,1)}","transform:translateX(calc(var(--i) * 100%));transition:transform .4s cubic-bezier(.3,0,0,1)}")
s=s.replace("height:var(--th);background:var(--lilac);transform","height:var(--th);background:var(--gt-fill);transform")
rep(".gt-pan{position:absolute;top:var(--th);left:0;right:0;bottom:0;background:var(--lilac)}",".gt-pan{position:absolute;top:var(--th);left:0;right:0;bottom:0;background:var(--gt-fill)}")

# ---- #6 done number, #9 placeholder + rule
rep(".s1 .done .no{opacity:.3}",".s1 .done .no{opacity:.55}")
rep(".s1 .ph{font-weight:600;text-decoration:underline 1.5px;text-underline-offset:4px}",".s1 .ph{font-weight:600}/* plain text: bold, with its brackets; no colour and no underline, so it does not look like a link */\n.s1-rule{margin-top:8px;font:400 15px/1.4 var(--font-body);color:var(--ink-2)}")
rep('      <p class="s1-eyebrow" id="pr-t">Promptlar · 2 ta</p>\n','      <p class="s1-eyebrow" id="pr-t">Promptlar · 2 ta</p>\n      <p class="s1-rule">[Qavslar] ichini oʻzingiz toʻldirasiz.</p>\n')

# ---- cards (2, 3.4)
a=s.index('    <ul class="grid3 lessons"'); b=s.index('    </ul>',a)
cards=s[a:b]
c0=cards.index('<li><a class="folder c-yellow" href="#">')
cards=cards.replace('<li><a class="folder c-yellow" href="#">','<li><a class="folder c-grey" href="#">',1)
cards=cards.replace('Tayyor · 4/4','Bajarildi · 4/4 qadam')
cards=cards.replace('<li><a class="folder c-grey" href="#s-dars">\n        '+'<span class="tab">','<li><a class="folder c-lilac" href="#s-dars">\n        <span class="tab">',2)   # lessons 1 and 3
cards=cards.replace('<span class="f-note">Hozir · 0/2 qadam</span>','<span class="f-note"><span class="dot" aria-hidden="true"></span>Hozir · 0/2 qadam</span>')
s=s[:a]+cards+s[b:]
open(p,'w',encoding='utf-8').write(s)
print('ok')
