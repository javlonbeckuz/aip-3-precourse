p=r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\index.html'
s=open(p,encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(s.count(old),old[:70])
    s=s.replace(old,new)
ARR='<svg width="20" height="20" aria-hidden="true"><use href="#i-next"/></svg>'
# tab buttons: Slaydlar, Amaliyot, Vazifa
rep('''          <button class="gt-tab" role="tab" type="button" id="dg-t1" aria-controls="dg-p1" aria-selected="false" tabindex="-1">Vazifa<span class="ts">5/8</span></button>
          <button class="gt-tab" role="tab" type="button" id="dg-t2" aria-controls="dg-p2" aria-selected="false" tabindex="-1">Amaliyot<span class="ts">2/4</span></button>''','''          <button class="gt-tab" role="tab" type="button" id="dg-t1" aria-controls="dg-p1" aria-selected="false" tabindex="-1">Amaliyot<span class="ts">2/4</span></button>
          <button class="gt-tab" role="tab" type="button" id="dg-t2" aria-controls="dg-p2" aria-selected="false" tabindex="-1">Vazifa<span class="ts">5/8</span></button>''')
a=s.index('          <div class="gt-pane" role="tabpanel" id="dg-p0"')
b=s.index('    <div class="lower lower-solo">')
panes=f'''          <div class="gt-pane" role="tabpanel" id="dg-p0" aria-labelledby="dg-t0">
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
            <p class="p-label">Amaliyot · darsda qilinadi<br>Korxona bilimini ishga soling</p>
            <div><p class="p-num">2/4</p><p class="p-sub">asosiy mashq bajarildi</p></div>
            <div class="gt-foot end"><a class="play on-light" href="#s-ex"><span>Davom etish<br>01 · P3 Vaziyatli test</span><span class="play-circ">{ARR}</span></a></div>
          </div>
          <div class="gt-pane" role="tabpanel" id="dg-p2" aria-labelledby="dg-t2" hidden>
            <p class="p-label">Vazifa · uyda<br>«Ravon Uy» keysi</p>
            <div><p class="p-num">5/8</p><p class="p-sub">prompt bajarildi. NotebookLMʼda birma-bir.</p></div>
            <div class="gt-foot end"><a class="play on-light" href="#"><span>Davom etish<br>Vazifa · P6</span><span class="play-circ">{ARR}</span></a></div>
          </div>
        </div>
      </div>
    </div>
'''
s=s[:a]+panes+s[b:]
rep(".gt-foot{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}",".gt-foot{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}.gt-foot.end{justify-content:flex-end}\n.gt .play{justify-content:flex-end;gap:14px;font-size:16px;line-height:1.3;text-align:right}/* action = words, then the circle: the whole link is the target */")
rep(".gt .circ-dark{width:48px;height:48px;flex:none}\n","")
rep("  .gt .circ-dark{width:max(44px,calc(52 * var(--u)));height:max(44px,calc(52 * var(--u)))}\n","")
rep("?view=dars&tabtest=0..2 opens that tab","?view=dars&tabtest=0..2 opens that tab (0 Slaydlar, 1 Amaliyot, 2 Vazifa)")
open(p,'w',encoding='utf-8').write(s)
print('ok')
