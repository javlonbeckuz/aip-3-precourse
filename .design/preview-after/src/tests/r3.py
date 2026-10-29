import re
p=r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\index.html'
s=open(p,encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(s.count(old),old[:80])
    s=s.replace(old,new)

# ---------- CSS
# 6B: state = calm note bottom-right (>=14px); pills gone
rep(".f-note{font:500 12px/1.3 var(--font-body);text-transform:uppercase;display:inline-flex;align-items:center;gap:6px}",".f-note{margin-left:auto;font:500 14px/1.3 var(--font-body);text-transform:uppercase;display:inline-flex;align-items:center;gap:6px}")
rep("  .f-note{font-size:max(11px,calc(13 * var(--u)))}\n  .st{font-size:max(12px,calc(14 * var(--u)));min-height:max(30px,calc(34 * var(--u)))}\n","  .f-note{font-size:max(14px,calc(15 * var(--u)))}\n")
a=s.index("/* state pill (ux-audit M1)")
b=s.index("button.folder{")
s=s[:a]+s[b:]
# 5B tabs: single-line tabs, tick only on finished ones; taller body for the exercise list
rep(".gt{--th:58px;--bh:400px;--i:0;--n:3;",".gt{--th:46px;--bh:460px;--i:0;--n:3;")
rep(".gt-tab .ts{display:inline-flex;align-items:center;gap:3px;font:400 11px/1 var(--font-mono);letter-spacing:0;text-transform:none}\n",".gt-tab .ok{display:inline-flex;align-items:center;gap:5px}\n")
rep("  .gt{--th:max(58px,calc(72 * var(--u)));--bh:calc(max(400px,calc(512 * var(--u))) - var(--th));height:max(400px,calc(512 * var(--u)))}/* 400px floor: at ~900-1030px the slides pane would clip */",
    "  .gt{--th:max(44px,calc(56 * var(--u)));--bh:calc(max(480px,calc(512 * var(--u))) - var(--th));height:max(480px,calc(512 * var(--u)))}/* 480px floor: at ~900-1030px the 6-row exercise list would clip */")
rep(".gt-tab .ts{font-size:max(11px,calc(13 * var(--u)))}","")
# exercise list rows
rep(".p-list .n{font:500 12px/1 var(--font-mono)}",""".p-list .n{font:500 12px/1 var(--font-mono)}
.p-list li.lk{display:block;min-height:0;padding:0}/* a row that is one link: number, title, mark, arrow (ux-audit H5 B) */
.xr{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:12px;align-items:center;min-height:48px;padding:6px 0;font-size:inherit;line-height:1.3}
.xr:hover .xt{text-decoration:underline;text-underline-offset:3px}
.xo{display:block;font:400 12px/1.3 var(--font-body);color:#2E2440}
.xm{display:inline-flex;align-items:center;gap:8px;font:500 12px/1 var(--font-mono)}""")
# lower row of dars removed
rep("/* lower row of the lesson screen: only the result card, aligned under the hero's text column */\n@container (min-width:900px){.lower-solo{grid-template-columns:calc(636 * var(--u));padding:calc(40 * var(--u)) calc(66 * var(--u)) calc(56 * var(--u))}}\n","")
# dars header line
rep("/* ===== section heading (list / grid screens) ===== */","""/* lesson header: back link + one meta line with the lesson's progress (ux-audit H4 A) */
.dl-h{display:grid;gap:10px;justify-items:start}
.dl-m{font:500 13px/1.3 var(--font-body);text-transform:uppercase;letter-spacing:.02em}
@container (min-width:900px){.dl-h{margin-bottom:calc(20 * var(--u))}.dl-h .eyebrow{margin-bottom:0}.dl-m{font-size:max(12px,calc(15 * var(--u)))}}
/* ===== section heading (list / grid screens) ===== */""")
# ring note
rep(".ps{font:400 17px/1.35 var(--font-body)}",".ps{font:400 17px/1.35 var(--font-body)}\n.pn{display:inline-flex;align-items:center;gap:6px;font:500 14px/1.3 var(--font-body);color:var(--yellow)}")
rep("  .pl{font-size:max(12px,calc(15 * var(--u)))}.ps{font-size:max(15px,calc(24 * var(--u)))}","  .pl{font-size:max(12px,calc(15 * var(--u)))}.ps{font-size:max(15px,calc(24 * var(--u)))}.pn{font-size:max(14px,calc(17 * var(--u)))}")
# login 3B: white text + dark halo, red only on the line and the icon
rep(".mx-help.err{display:flex;gap:8px;padding:4px 10px;background:rgb(0 0 0 / .78);font:500 14px/1.35 var(--font-body);color:var(--danger)}/* 2 lines must fit the 50px gap above the button */.mx-help.err svg{margin-top:1px}",
    ".mx-help.err{display:flex;gap:8px;font:500 14px/1.4 var(--font-body);color:#fff;text-shadow:0 1px 2px #000,0 0 8px #000,0 0 16px rgb(0 0 0 / .9),0 0 28px rgb(0 0 0 / .8)}/* no box: halo like the label; 2 lines (39px) fit the 50px gap above the button */\n.mx-help.err svg{margin-top:1px;color:var(--danger);filter:drop-shadow(0 1px 2px #000)}") if ".mx-help.err{display:flex;gap:8px;padding:4px 10px;background:rgb(0 0 0 / .78);font:500 14px/1.35 var(--font-body);color:var(--danger)}/* 2 lines must fit the 50px gap above the button */.mx-help.err svg{margin-top:1px}" in s else None
open(p,'w',encoding='utf-8').write(s)
print('css ok')
