p=r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\index.html'
s=open(p,encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(s.count(old),old[:70])
    s=s.replace(old,new)

# nav buttons
rep('<button class="nav-name" type="button" aria-haspopup="menu">','<button class="nav-name" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="nmenu">',3)
rep('<button class="menu-btn" type="button" aria-label="Menyu">','<button class="menu-btn" type="button" aria-label="Menyu" aria-haspopup="dialog" aria-expanded="false" aria-controls="nmenu">',3)

# gate
rep('1 · /aip/ · Kirish (ID eshigi) · sinash uchun istalgan 6 belgini yozing','1 · /aip/ · Kirish (ID eshigi) · sinash uchun istalgan 6 belgi yoki AIP-XXXXXX yozing (KKKKKK = ID topilmadi)')
rep('''value="" maxlength="6" placeholder="7KQ2XM"''','''value="" maxlength="10" placeholder="7KQ2XM"''')
rep('''            <div class="mx-glow"></div>
          </div>
          <p class="mx-help help" id="gid-h" aria-live="polite"></p>''','''            <div class="mx-glow"></div>
            <p class="mx-help help" id="gid-h" aria-live="polite"></p>
          </div>''')

# dastur
a=s.index('    <div class="page-head main-head">')
b=s.index('<!-- ================= c · LESSON 01')
dastur='''    <div class="page-head main-head">
      <h1 class="headline"><span class="ln">Salom,</span><span class="ln"><span class="cluster" aria-hidden="true"><span class="b">01</span><span class="g">02</span><span class="y">03</span></span>Dilshod</span></h1>
      <a class="folder flatc c-blue now-card" href="#s-dars">
        <span class="f-top"><span class="f-label">Hozir davom etmoqda<br>3-dars · 26-sentabr</span><svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg></span>
        <span><span class="f-title">Skill va<br>agentlar</span><span class="f-sub">Slaydlar 14 / 40 · davom etish</span></span>
      </a>
      <a class="play next" href="#s-ex"><span class="play-circ ol"><svg width="18" height="18" aria-hidden="true"><use href="#i-next"/></svg></span><span>Keyingi qadam<small>1-dars · Amaliyot 01 · P3</small></span></a>
    </div>
    <ul class="grid3 lessons" aria-label="Dastur">
      <li><a class="folder c-yellow" href="#">
        <span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span>
        <span class="f-top"><span><span class="f-label">0-dars · tayyorgarlik</span><br><span class="st"><svg width="14" height="14" aria-hidden="true"><use href="#i-check"/></svg>Tayyor · 4/4</span></span><svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg></span>
        <span class="f-title">Oʻrnatish va<br>tayyorgarlik</span>
      </a></li>
      <li><a class="folder c-grey" href="#s-dars">
        <span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span>
        <span class="f-top"><span><span class="f-label">1-dars · 12-sentabr</span><br><span class="st">Ochiq · 3/6 qadam</span></span><svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg></span>
        <span><span class="f-title">Kirish</span><span class="f-sub">AI, modellar, Context, RAG, NotebookLM</span></span>
      </a></li>
      <li><a class="folder c-grey" href="#">
        <span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span>
        <span class="f-top"><span><span class="f-label">2-dars · 19-sentabr</span><br><span class="st"><svg width="14" height="14" aria-hidden="true"><use href="#i-check"/></svg>Bajarildi · 3/3 qadam</span></span><svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg></span>
        <span><span class="f-title">Claude<br>va Code</span><span class="f-sub">Claude, Code/Cowork, terminologiya</span></span>
      </a></li>
      <li><a class="folder c-grey" href="#s-dars">
        <span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span>
        <span class="f-top"><span><span class="f-label">3-dars · 26-sentabr</span><br><span class="st now">Hozir · 0/2 qadam</span></span><svg class="f-arrow" aria-hidden="true"><use href="#i-ne"/></svg></span>
        <span><span class="f-title">Skill va<br>agentlar</span><span class="f-sub">Skill, Plugin, Connector, Plan, agent teams, here.now</span></span>
      </a></li>
      <li><button class="folder c-dark" type="button" aria-haspopup="dialog" data-sheet="lock-sheet">
        <span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span>
        <span class="f-top"><span><span class="f-label">4-dars · 3-oktabr</span><br><span class="st"><svg width="14" height="14" aria-hidden="true"><use href="#i-lock"/></svg>3-oktabrda ochiladi</span></span></span>
        <span><span class="f-title">Agent va<br>alternativalar</span><span class="f-sub">Slaydlar va vazifa dars kuni shu yerda chiqadi</span></span>
      </button></li>
      <li><div class="folder c-yellow" style="justify-content:flex-start">
        <span class="tab"><svg class="ramp" aria-hidden="true"><use href="#i-ramp"/></svg></span>
        <span class="f-top"><span class="f-label">Sizning natijangiz<br>5 ta ish qoldi</span></span>
        <span class="f-list">
          <a href="#s-dars"><span>1-dars · Vazifa · P6–P8</span><svg width="18" height="18" aria-hidden="true"><use href="#i-next"/></svg></a>
          <a href="#s-ex"><span>1-dars · Amaliyot 01 va 04</span><svg width="18" height="18" aria-hidden="true"><use href="#i-next"/></svg></a>
          <a href="#s-dars"><span>3-dars · Slaydlar 14 / 40 va Vazifa</span><svg width="18" height="18" aria-hidden="true"><use href="#i-next"/></svg></a>
        </span>
      </div></li>
    </ul>
  </div></div>
</section>

'''
s=s[:a]+dastur+s[b:]

# dars: tabs
a=s.index('      <div class="gt" id="dg" style="--n:4">')
b=s.index('    <div class="lower lower-solo">')
dars='''      <div class="gt" id="dg" style="--n:3">
        <div class="gt-goo" aria-hidden="true"><span class="gt-ind"></span><span class="gt-pan"></span></div>
        <div class="gt-tabs" role="tablist" aria-label="Dars boʻlimlari">
          <button class="gt-tab" role="tab" type="button" id="dg-t0" aria-controls="dg-p0" aria-selected="true">Slaydlar<span class="ts"><svg width="12" height="12" aria-hidden="true"><use href="#i-check"/></svg>koʻrildi</span></button>
          <button class="gt-tab" role="tab" type="button" id="dg-t1" aria-controls="dg-p1" aria-selected="false" tabindex="-1">Vazifa<span class="ts">5/8</span></button>
          <button class="gt-tab" role="tab" type="button" id="dg-t2" aria-controls="dg-p2" aria-selected="false" tabindex="-1">Amaliyot<span class="ts">2/4</span></button>
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
            <div class="gt-foot"><a class="play on-light" href="#"><span class="play-circ"><svg width="18" height="18" aria-hidden="true"><use href="#i-play"/></svg></span><span>Slaydlarni<br>koʻrish</span></a><span class="gt-meta">78 slayd</span></div>
          </div>
          <div class="gt-pane" role="tabpanel" id="dg-p1" aria-labelledby="dg-t1" hidden>
            <p class="p-label">Vazifa · uyda<br>«Ravon Uy» keysi</p>
            <div><p class="p-num">5/8</p><p class="p-sub">prompt bajarildi. NotebookLMʼda birma-bir.</p></div>
            <a class="play on-light" href="#"><span class="play-circ"><svg width="20" height="20" aria-hidden="true"><use href="#i-next"/></svg></span><span>Davom etish<br>Vazifa · P6</span></a>
          </div>
          <div class="gt-pane" role="tabpanel" id="dg-p2" aria-labelledby="dg-t2" hidden>
            <p class="p-label">Amaliyot · darsda qilinadi<br>Korxona bilimini ishga soling</p>
            <div><p class="p-num">2/4</p><p class="p-sub">asosiy mashq bajarildi</p></div>
            <a class="play on-light" href="#s-ex"><span class="play-circ"><svg width="20" height="20" aria-hidden="true"><use href="#i-next"/></svg></span><span>Davom etish<br>01 · P3 Vaziyatli test</span></a>
          </div>
        </div>
      </div>
    </div>
'''
s=s[:a]+dars+s[b:]
rep('''<span class="f-label">Sizning natijangiz<br>01-dars</span></span>
        <span class="f-num" role="img" aria-label="Dars progressi: 71 foiz">71%</span>''','''<span class="f-label">Sizning natijangiz<br>1-dars · qadamlar</span></span>
        <span class="f-row"><span class="f-num" role="img" aria-label="1-dars progressi: 6 qadamdan 3 tasi bajarildi">3/6</span><span class="f-note">3 ta qadam qoldi</span></span>''')

# ex: files
a=s.index('      <section class="ex-files" aria-labelledby="ef-t">')
b=s.index('    <section class="s1"')
dl='<span class="ef-dl"><svg width="18" height="18" aria-hidden="true"><use href="#i-down"/></svg></span>'
def row(nm,mt,size): return f'<li><a class="ef-row" href="#"><span><span class="sr-only">Yuklab olish: </span><span class="ef-nm">{nm}</span><span class="ef-mt">{mt} · {size}</span></span>{dl}</a></li>'
files=f'''      <div class="ex-files">
        <section aria-labelledby="ef-1">
          <h2 class="ef-h" id="ef-1">1 · Avval oʻqing</h2>
          <ul>{row("06_Rahbar_audio.pdf","PDF","240 KB")}</ul>
        </section>
        <section aria-labelledby="ef-2">
          <h2 class="ef-h" id="ef-2">2 · NotebookLMʼga yuklang</h2>
          <ul>
            {row("Ravon_Uy_Q3_hisobot.pdf","PDF","1,2 MB")}
            {row("Savdo_jadvali_Q3.csv","CSV","48 KB")}
          </ul>
          <p class="ef-hint">Keyin pastdagi promptlardan nusxa oling.</p>
        </section>
      </div>
    </div>
'''
s=s[:a]+files+s[b:]

# ex: prompts
a=s.index('    <section class="s1"')
b=s.index('<!-- ================= f · TYPE CHECK')
CHK='<svg width="12" height="12" aria-hidden="true"><use href="#i-check"/></svg>'
def li(i,no,title,to,tx,done):
    chip=(f'<button class="chip" type="button" aria-label="Bajarildi, bekor qilish uchun bosing">{CHK}Bajarildi</button>' if done else '<button class="chip off" type="button" aria-label="Bajarildi deb belgilash">Bajarildi deb belgilash</button>')
    return f'''        <li class="{'done' if done else ''}" data-i="{i}">
          <span class="no" aria-hidden="true">{no}</span>
          <div class="body"><h3 class="tt">{title}</h3>{chip}<p class="to strong"><b>Qayerga:</b> {to}</p><p class="tx">{tx}</p></div>
          <div class="cpw"><button class="cp" type="button" aria-label="Nusxalash: {title}"><span class="cp-c"><svg width="20" height="20" aria-hidden="true"><use href="#i-copy"/></svg></span><span class="cpl">Nusxalash</span></button></div>
        </li>
'''
prompts='''    <section class="s1" aria-labelledby="pr-t">
      <p class="s1-eyebrow" id="pr-t">Promptlar · 2 ta</p>
      <ol>
'''+li(0,'01','Manbalarni tekshirish','NotebookLM → Chat','Yuklangan manbalar asosida «Ravon Uy» kompaniyasining oxirgi choragidagi 5 ta asosiy raqamini jadval qilib chiqar. Har bir raqam qaysi hujjatdan olinganini koʻrsat.',True)+li(1,'02','Audio-brifing sozlamasi','NotebookLM → Studio → Audio Overview → Customize','Rahbar uchun 10 daqiqalik brifing tayyorla. Avval eng muhim 3 ta muammo, keyin <span class="ph">[boʻlim nomi]</span> boʻyicha raqamlar. Ohang: qisqa va aniq, rasmiy emas. Oxirida bitta aniq tavsiya ber.',False)+'''      </ol>
      <a class="s1-pdf" href="#"><svg width="18" height="18" aria-hidden="true"><use href="#i-down"/></svg>PDF varianti: 06_Promptlar.pdf · 96 KB</a>
    </section>
  </div></div>
</section>

'''
s=s[:a]+prompts+s[b:]
rep('01-dars · Amaliyot · 06</a>','1-dars · Amaliyot · 06 · Qoʻshimcha</a>')

# overlays before live region
rep('<p class="sr-only" aria-live="polite" id="live"></p>','''<aside class="nl" id="nl" aria-label="Yangi dars" hidden>
  <div><p class="nl-k">Yangi dars ochildi</p><p class="nl-t">3-dars · Skill va agentlar</p></div>
  <div class="nl-a"><a class="nl-go" href="#s-dars">Darsni ochish<svg width="18" height="18" aria-hidden="true"><use href="#i-next"/></svg></a><button class="nl-x" type="button">Yopish</button></div>
</aside>
<div class="nmenu" id="nmenu" role="dialog" aria-label="Menyu" tabindex="-1" hidden>
  <p class="nm-name">Dilshod Rahimov</p>
  <dl class="nm-list">
    <div><dt>Shaxsiy ID</dt><dd class="mono">AIP-7KQ2XM</dd></div>
    <div><dt>Guruh</dt><dd>Shanba guruhi</dd></div>
    <div><dt>Mentor</dt><dd>X. Maroziqov</dd></div>
    <div><dt>Kurs</dt><dd>4 dars · 12 sen – 3 okt</dd></div>
  </dl>
  <nav class="nm-lang" aria-label="Til"><a href="#" aria-current="true" aria-label="Oʻzbekcha">UZ</a><a href="#" lang="ru" aria-label="Русский">RU</a><a href="#" lang="en" aria-label="English">EN</a></nav>
  <a class="nm-out" href="#s-gate">Chiqish</a>
</div>
<div class="toast" id="toast" hidden><span id="toast-t"></span><button type="button" id="toast-undo">Bekor qilish</button></div>
<dialog class="sheet" id="lock-sheet" aria-labelledby="ls-t">
  <p class="sheet-t" id="ls-t">4-dars 3-oktabr kuni ochiladi.</p>
  <p class="sheet-d">Slaydlar va vazifa dars kuni shu yerda chiqadi.</p>
  <form method="dialog"><button class="sheet-x">Yopish</button></form>
</dialog>
<p class="sr-only" aria-live="polite" id="live"></p>''')
open(p,'w',encoding='utf-8').write(s)
print('ok')
