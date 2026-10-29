p=r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\index.html'
s=open(p,encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(s.count(old),old[:70])
    s=s.replace(old,new)

# remove yellow card
a=s.index('      <li><div class="folder c-yellow" style="justify-content:flex-start">')
b=s.index('    </ul>',a)
s=s[:a]+s[b:]

# ring markup
rep('''    <div class="page-head main-head">
      <h1 class="headline">''','''    <div class="page-head main-head">
      <div class="prog" role="progressbar" aria-label="Kurs progressi" aria-valuemin="0" aria-valuemax="4" aria-valuenow="1" aria-valuetext="4 darsdan 1 tasi toʻliq bajarildi">
        <span class="ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="rt" cx="50" cy="50" r="42"/><circle class="rp" cx="50" cy="50" r="42" pathLength="100"/></svg><span class="pv">1/4</span></span>
        <span class="pt"><span class="pl">Kurs progressi</span><span class="ps">1 / 4 dars toʻliq bajarildi</span></span>
      </div>
      <h1 class="headline">''')

# css
rep('''.main-head{grid-template-areas:"h" "c" "p"}
.main-head>.headline{grid-area:h}''','''.main-head{grid-template-areas:"r" "h" "c" "p"}
.main-head>.prog{grid-area:r}.main-head>.headline{grid-area:h}''')
rep('''  .main-head{grid-template-columns:minmax(0,1fr) calc(560 * var(--u));grid-template-areas:"h c" "p c";gap:0 calc(40 * var(--u));align-items:stretch}
  .main-head>.headline{align-self:start}.main-head>.next{align-self:end;margin-top:0}''','''  .main-head{grid-template-columns:minmax(0,1fr) calc(560 * var(--u));grid-template-rows:auto auto 1fr;grid-template-areas:"r c" "h c" "p c";gap:0 calc(40 * var(--u));align-items:stretch}
  .main-head>.headline{align-self:start;margin-top:calc(32 * var(--u))}.main-head>.next{align-self:end;margin-top:calc(40 * var(--u))}
  .prog{gap:calc(28 * var(--u))}.ring{width:max(96px,calc(150 * var(--u)))}.pv{font-size:max(24px,calc(38 * var(--u)))}
  .pl{font-size:max(12px,calc(15 * var(--u)))}.ps{font-size:max(15px,calc(22 * var(--u)))}''')
rep('''/* home hero (ux-audit H1 B)''','''/* course progress ring: thin track, thick flat arc from 12 o'clock, round caps; draws itself in on first show (no motion: final value) */
.prog{display:flex;align-items:center;gap:16px;justify-self:start}
.ring{position:relative;flex:none;width:88px;aspect-ratio:1}
.ring svg{display:block;width:100%;height:100%;transform:rotate(-90deg);fill:none}
.rt,.rp{fill:none}
.rt{stroke:rgb(255 255 255 / .12);stroke-width:4}
.rp{stroke:var(--yellow);stroke-width:9;stroke-linecap:round;stroke-dasharray:25 100;animation:ring-in .9s var(--ease) .15s both}
@keyframes ring-in{from{stroke-dasharray:0 100}}
.pv{position:absolute;inset:0;display:grid;place-items:center;font:500 22px/1 var(--font-display);font-stretch:125%}
.pt{display:grid;gap:4px}
.pl{font:500 13px/1.3 var(--font-body);text-transform:uppercase;color:var(--muted)}
.ps{font:400 17px/1.35 var(--font-body)}
/* home hero (ux-audit H1 B)''')
rep("@media (min-width:900px){.nl{top:140px;left:24px;","@media (min-width:900px){.nl{top:16px;left:24px;")

# input normalise
rep("if (/^\\s*AIP/i.test(gid.value)) gid.value = idCode(gid.value).slice(0, 10); // the field already shows \"AIP-\"","if (/^\\s*AIP|[\\s\\-]/i.test(gid.value)) gid.value = idCode(gid.value).slice(0, 10); // the field already shows \"AIP-\"; spaces and hyphens never stay")
open(p,'w',encoding='utf-8').write(s)
print('ok')
