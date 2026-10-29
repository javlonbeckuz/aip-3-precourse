import re
p=r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\index.html'
s=open(p,encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(s.count(old),old[:90])
    s=s.replace(old,new)
def dropline(prefix, cnt=1):
    global s
    lines=s.split('\n'); out=[]; n=0
    for l in lines:
        if l.startswith(prefix): n+=1; continue
        out.append(l)
    assert n==cnt,(n,prefix); s='\n'.join(out)

# ---------- 8 dead CSS
for pre in ['.panel{','.notch{','.notch::before,.notch::after{','.notch::before{','.notch::after{','.p-title{','.p-list .sz{','.circ-dark{','.circ-dark:hover{','.pill-field .pre{','.pill-field.is-error{','.lower{','.tags{','.cards{','.f-num{','  .panel{','  .notch{','  .p-title{','  .tags{','  .cards{','  .cards.two{','  .f-num{','  .lower{','.gt .p-label{']:
    dropline(pre)
rep("/* lilac media panel with inverted folder notch */\n","")
rep(".p-label{font:500 13px/1.3 var(--font-body);text-transform:uppercase;padding-right:calc(var(--nw) + 4px);min-height:calc(var(--nh) - 22px)}",".p-label{font:500 13px/1.3 var(--font-body);text-transform:uppercase}")
rep("/* ===== lower row: stacked tag pills + folder cards ===== */\n","/* ===== tag pill (the Shrift screen) ===== */\n")
rep("  .tag{height:calc(44 * var(--u));min-height:34px;padding:0 calc(33 * var(--u));font-size:max(12px,calc(15 * var(--u)))}\n","")  # desktop tag rule only mattered for the removed tag stack
rep("/* home hero (ux-audit H1 B): greeting, the live lesson as one big blue card, then the next step */","/* home hero (ux-audit H1 B): the progress ring, the live lesson as one big blue card, then the next step */")
# an empty container block may remain
s=re.sub(r"@container \(min-width:900px\)\{\n\}\n","",s)
rep(".gt-tab{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;padding:0 2px;",".gt-tab{display:flex;align-items:center;justify-content:center;padding:0 2px;")

# ---------- 1 panes stacked in one grid cell, body = tallest pane
rep("the folder; labels and content sit above it, unfiltered, so text stays crisp. Fixed body height: switching never jumps the page ===== */","the folder; labels and content sit above it, unfiltered, so text stays crisp. All panes share one grid cell (the inactive ones are inert + visibility:hidden), so the body is always as tall as the tallest pane: switching never jumps and nothing clips ===== */")
rep(".gt-body{position:relative;height:var(--bh);padding:22px 20px 24px;overflow:hidden}\n.gt-pane{height:100%;display:flex;flex-direction:column;justify-content:space-between;gap:16px}\n.gt-pane[hidden]{display:none}",
    ".gt-body{position:relative;display:grid;min-height:var(--bh);padding:22px 20px 24px;overflow:hidden}/* overflow only clips the pane swap animation */\n.gt-pane{grid-area:1/1;display:flex;flex-direction:column;justify-content:space-between;gap:16px}\n.gt-pane[inert]{visibility:hidden}")
rep("--bh:calc(max(480px,calc(512 * var(--u))) - var(--th));height:max(480px,calc(512 * var(--u)))}/* 480px floor: at ~900-1030px the 6-row exercise list would clip */","--bh:calc(max(480px,calc(512 * var(--u))) - var(--th))}/* the body grows with its tallest pane; 480px is the minimum */")
# panes: hidden -> inert in markup
rep('aria-labelledby="dg-t1" hidden>','aria-labelledby="dg-t1" inert>')
rep('aria-labelledby="dg-t2" hidden>','aria-labelledby="dg-t2" inert>')
# JS swap
rep("const old = panes.find(p => !p.hidden);","const old = panes.find(p => !p.inert);")
rep("panes.forEach((p, k) => { p.getAnimations().forEach(a => a.cancel()); p.hidden = k !== i; });","panes.forEach((p, k) => { p.getAnimations().forEach(a => a.cancel()); p.inert = k !== i; });")
rep("    if (i === cur) return;\n","    if (i === cur) { if (focus) tabs[i].focus(); return; }\n")
rep("""    const d = {ArrowRight:1, ArrowLeft:-1}[e.key]; if (!d) return;
    e.preventDefault(); show((cur + d + tabs.length) % tabs.length, true);""","""    const n = tabs.length, to = {ArrowRight:(cur + 1) % n, ArrowLeft:(cur - 1 + n) % n, Home:0, End:n - 1}[e.key]; if (to == null) return;
    e.preventDefault(); show(to, true);""")

# ---------- 2,3 exercise list + pane label
a=s.index('          <div class="gt-pane" role="tabpanel" id="dg-p1"')
b=s.index('          <div class="gt-pane" role="tabpanel" id="dg-p2"')
OK='<svg width="12" height="12" aria-hidden="true"><use href="#i-check"/></svg><span class="sr-only"> · bajarildi</span>'
ARR='<svg width="16" height="16" aria-hidden="true"><use href="#i-next"/></svg>'
def row(n,t,mark,note='',href='#',tag=False):
    sub=f'<small class="xo">{note}</small>' if note else ''
    tt=f'<span class="xtag">{t}</span>' if tag else t
    return f'<li class="lk"><a class="xr" href="{href}"><span class="n">{n}</span><span class="xt">{tt}{sub}</span><span class="xm">{mark}{ARR}</span></a></li>'
rows='\n              '.join([
  row('01','Yangi xodimga tayanch','2/4 prompt'),
  row('02','Mahsulotdan suhbatga',OK),
  row('03','Bittasini tanlang: A yoki B',OK,'03A bajarildi · 03B ixtiyoriy'),
  row('04','Marketing','','',tag=True),
  row('05','Takliflarni bir jadvalga','','qoʻshimcha'),
  row('06','Rahbar yoʻlda ham tushunsin','1/2 prompt','qoʻshimcha','#s-ex'),
])
pane=f'''          <div class="gt-pane" role="tabpanel" id="dg-p1" aria-labelledby="dg-t1" inert>
            <p class="p-label">Amaliyot · darsda qilinadi<br>Korxona bilimini ishga soling</p>
            <ol class="p-list">
              {rows}
            </ol>
            <p class="gt-meta">2/4 asosiy mashq bajarildi</p>
          </div>
'''
s=s[:a]+pane+s[b:]
rep(".xm{display:inline-flex;align-items:center;gap:8px;font:500 12px/1 var(--font-mono)}",".xm{display:inline-flex;align-items:center;gap:8px;font:500 12px/1 var(--font-mono)}\n.xtag{display:inline-block;padding:2px 10px;border:1px solid currentColor;border-radius:999px;font:500 12px/1.3 var(--font-body);text-transform:uppercase}/* \"04 Marketing\" is a 2.0 category tag, not a title: shown as a tag */")
# ex screen title
rep('<h1 class="headline ex-h">Rahbar uchun audio</h1>','<h1 class="headline ex-h">Rahbar yoʻlda ham tushunsin</h1>')
rep('4 · /aip/dars/1/amaliyot/06 · Mashq: promptlar (lilac roʻyxat)','4 · /aip/dars/1/amaliyot/06 · Mashq: promptlar (lilac roʻyxat) · 04 sarlavhasi = joy tutuvchi (2.0 maʼlumotida yoʻq)')

# ---------- 3.78
rep('<span class="gt-meta">78 slayd</span>','<span class="gt-meta">78 ta slayd · video</span>')

# ---------- 4 lesson 2 note, 9 Hozir note, 5 headings
rep('<span class="f-note"><svg width="14" height="14" aria-hidden="true"><use href="#i-check"/></svg>Bajarildi</span>','<span class="f-note"><svg width="14" height="14" aria-hidden="true"><use href="#i-check"/></svg>Bajarildi · 3/3 qadam</span>')
rep('<span class="dot" aria-hidden="true"></span>Hozir · 0/2 qadam','<span class="dot" aria-hidden="true"></span>Hozir davom etmoqda · 0/2 qadam')
rep('      <h1 class="sr-only">Dastur</h1>\n','')
rep('    <div class="page-head main-head">\n','    <div class="page-head main-head">\n      <h1 class="sr-only">Dastur</h1>\n')
rep('<ul class="grid3 lessons" aria-label="Dastur">','<ul class="grid3 lessons" aria-label="Darslar">')

# ---------- 7 login message
rep("ID’da 0, 1, I, L va O bo‘lmaydi. Xabardagi ID’ni qayta tekshiring.","ID’da 0, 1, I, L va O bo‘lmaydi. Qayta tekshiring.")
open(p,'w',encoding='utf-8').write(s)
print('ok')
