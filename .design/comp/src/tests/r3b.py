import re
p=r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\index.html'
s=open(p,encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(s.count(old),old[:80])
    s=s.replace(old,new)
TAB='<span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span>'
NE='<svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg>'
CK='<svg width="14" height="14" aria-hidden="true"><use href="#i-check"/></svg>'
LK='<svg width="14" height="14" aria-hidden="true"><use href="#i-lock"/></svg>'

# ---- ring (4A wording)
a=s.index('      <div class="prog" role="progressbar"')
b=s.index('      <h1 class="sr-only">')
s=s[:a]+'''      <div class="prog" role="progressbar" aria-label="Toʻliq bajarilgan darslar" aria-valuemin="0" aria-valuemax="4" aria-valuenow="1" aria-valuetext="4 darsdan 1 tasi toʻliq bajarilgan. Tayyorgarlik bajarilgan.">
        <span class="ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="rt" cx="50" cy="50" r="42"/><circle class="rp" cx="50" cy="50" r="42" pathLength="100"/></svg><span class="pv">1/4</span></span>
        <span class="pt"><span class="pl">Sizning natijangiz</span><span class="ps">Toʻliq bajarilgan darslar</span><span class="pn">'''+CK+'''Tayyorgarlik</span></span>
      </div>
'''+s[b:]

# ---- lesson cards (6B)
a=s.index('    <ul class="grid3 lessons" aria-label="Dastur">')
b=s.index('    </ul>',a)+len('    </ul>')
cards=f'''    <ul class="grid3 lessons" aria-label="Dastur">
      <li><a class="folder c-yellow" href="#">
        {TAB}
        <span class="f-top"><span class="f-label">0-dars · tayyorgarlik</span>{NE}</span>
        <span class="f-row"><span class="f-title">Oʻrnatish va<br>tayyorgarlik</span><span class="f-note">{CK}Tayyor · 4/4</span></span>
      </a></li>
      <li><a class="folder c-grey" href="#s-dars">
        {TAB}
        <span class="f-top"><span class="f-label">1-dars · 12-sentabr</span>{NE}</span>
        <span class="f-row"><span class="f-title">Kirish</span><span class="f-note">Ochiq · 3/6 qadam</span></span>
      </a></li>
      <li><a class="folder c-grey" href="#">
        {TAB}
        <span class="f-top"><span class="f-label">2-dars · 19-sentabr</span>{NE}</span>
        <span class="f-row"><span class="f-title">Claude<br>va Code</span><span class="f-note">{CK}Bajarildi</span></span>
      </a></li>
      <li><a class="folder c-grey" href="#s-dars">
        {TAB}
        <span class="f-top"><span class="f-label">3-dars · 26-sentabr</span>{NE}</span>
        <span class="f-row"><span class="f-title">Skill va<br>agentlar</span><span class="f-note">Hozir · 0/2 qadam</span></span>
      </a></li>
      <li><button class="folder c-dark" type="button" aria-haspopup="dialog" data-sheet="lock-sheet">
        {TAB}
        <span class="f-top"><span class="f-label">4-dars · 3-oktabr</span></span>
        <span class="f-row"><span><span class="f-title">Agent va<br>alternativalar</span><span class="f-sub">10 ta Hermes kartasi va kitob: «Biznesda AIʼni qoʻllash» (lotin va kirill)</span></span><span class="f-note">{LK}3-oktabrda ochiladi</span></span>
      </button></li>
    </ul>'''
s=s[:a]+cards+s[b:]

# ---- dars header (4A) + remove result card
rep('''        <a class="eyebrow" href="#s-dastur"><svg width="16" height="16" aria-hidden="true"><use href="#i-back"/></svg>Dastur · 12-sentabr · ochiq</a>
        <h1 class="headline"><span class="ln">01-dars</span>''','''        <div class="dl-h"><a class="eyebrow" href="#s-dastur"><svg width="16" height="16" aria-hidden="true"><use href="#i-back"/></svg>Dastur</a><p class="dl-m">1-dars · 12-sentabr · 3/6 qadam</p></div>
        <h1 class="headline"><span class="ln">1-dars</span>''')
a=s.index('    <div class="lower lower-solo">')
b=s.index('  </div></div>\n</section>',a)
s=s[:a]+s[b:]

# ---- tabs + panes (5B)
a=s.index('        <div class="gt-tabs" role="tablist"')
b=s.index('          <div class="gt-pane" role="tabpanel" id="dg-p2"')
OK='<svg width="12" height="12" aria-hidden="true"><use href="#i-check"/></svg>'
ARR='<svg width="16" height="16" aria-hidden="true"><use href="#i-next"/></svg>'
def row(n,t,mark,note='',href='#'):
    sub=f'<small class="xo">{note}</small>' if note else ''
    return f'<li class="lk"><a class="xr" href="{href}"><span class="n">{n}</span><span class="xt">{t}{sub}</span><span class="xm">{mark}{ARR}</span></a></li>'
rows='\n              '.join([
  row('01','Yangi xodimga tayanch','2/4 prompt'),
  row('02','Mahsulotdan suhbatga',OK),
  row('03','Bittasini tanlang: A yoki B',OK),
  row('04','Marketing',''),
  row('05','Takliflarni bir jadvalga','','qoʻshimcha'),
  row('06','Rahbar uchun audio','1/2 prompt','qoʻshimcha','#s-ex'),
])
tabs=f'''        <div class="gt-tabs" role="tablist" aria-label="Dars boʻlimlari">
          <button class="gt-tab" role="tab" type="button" id="dg-t0" aria-controls="dg-p0" aria-selected="true"><span class="ok">{OK}Slaydlar<span class="sr-only"> · koʻrildi</span></span></button>
          <button class="gt-tab" role="tab" type="button" id="dg-t1" aria-controls="dg-p1" aria-selected="false" tabindex="-1">Amaliyot</button>
          <button class="gt-tab" role="tab" type="button" id="dg-t2" aria-controls="dg-p2" aria-selected="false" tabindex="-1">Vazifa</button>
        </div>
        <div class="gt-body">
          <div class="gt-pane" role="tabpanel" id="dg-p0" aria-labelledby="dg-t0">
            <p class="p-label">Slaydlar · video<br>Koʻrildi</p>
            <ol class="p-list">
              <li><span class="n">01</span><span>AI va modellar</span><span></span></li>
              <li><span class="n">02</span><span>Context nima va u qayerda tugaydi</span><span></span></li>
              <li><span class="n">03</span><span>RAG: hujjatlarga tayangan javob</span><span></span></li>
              <li><span class="n">04</span><span>NotebookLM bilan ishlash</span><span></span></li>
            </ol>
            <div class="gt-foot"><span class="gt-meta">78 slayd</span><a class="play on-light" href="#"><span>Slaydlarni<br>koʻrish</span><span class="play-circ"><svg width="18" height="18" aria-hidden="true"><use href="#i-play"/></svg></span></a></div>
          </div>
          <div class="gt-pane" role="tabpanel" id="dg-p1" aria-labelledby="dg-t1" hidden>
            <p class="p-label">Amaliyot · darsda qilinadi<br>2 / 4 asosiy mashq bajarildi</p>
            <ol class="p-list">
              {rows}
            </ol>
          </div>
'''
s=s[:a]+tabs+s[b:]
# vazifa pane keeps content; fix its id/labelledby (already dg-p2 / dg-t2)
open(p,'w',encoding='utf-8').write(s)
print('html ok')
