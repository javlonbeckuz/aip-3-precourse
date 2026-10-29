p=r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\index.html'
s=open(p,encoding='utf-8').read()
a=s.index(".s1 li{display:grid;grid-template-columns:minmax(0,1fr) 48px;")
b=s.index("/* ===== type check ===== */")
new=""".s1 li{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:14px 16px;padding:26px 0 30px;border-bottom:1px solid rgb(0 0 0 / .3)}
.s1 .no{grid-row:1;grid-column:1;font:400 40px/.85 var(--font-display);font-stretch:125%;letter-spacing:-.02em;transition:opacity .2s}
.s1 .done .no{opacity:.3}
.s1 .body{grid-row:2;grid-column:1/-1;display:grid;gap:8px;min-width:0}
.s1 .cpw{grid-row:1;grid-column:2}
.s1 .tt{font:500 17px/1.25 var(--font-display);font-stretch:125%;text-transform:uppercase}
.s1 .to{font:400 14px/1.4 var(--font-body);color:#2E2440}
.s1 .to.strong{font-size:15px;font-weight:500;color:var(--black)}.s1 .to b{font-weight:600}
.s1 .tx{margin-top:8px;font:400 17px/1.6 var(--font-body);max-width:62ch}
.s1 .ph{font-weight:600;text-decoration:underline 1.5px;text-underline-offset:4px}
/* copy control = circle + word (ux-audit H2 B); the whole column is the button */
.s1 .cp{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:56px;color:var(--black)}
.s1 .cp-c{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;border:1.5px solid var(--black);transition:background .15s,color .15s}
.s1 .cp:hover .cp-c,.s1 .cp.flash .cp-c{background:var(--black);color:var(--lilac)}
.s1 .cpl{font:500 11px/1 var(--font-body);text-transform:uppercase;letter-spacing:.02em}
/* done chip = the undo toggle: filled "Bajarildi" / outline "Bajarildi deb belgilash" */
.s1 .chip{position:relative;justify-self:start;display:inline-flex;align-items:center;gap:5px;height:24px;padding:0 9px;border:1.5px solid var(--black);border-radius:999px;background:var(--black);color:var(--lilac);font:500 11px/1 var(--font-body);text-transform:uppercase}
.s1 .chip::after{content:"";position:absolute;inset:-10px -4px}/* 44px hit area */
.s1 .chip.off{background:none;color:var(--black)}
.s1-pdf{display:inline-flex;align-items:center;gap:8px;min-height:44px;margin-top:20px;font:500 15px/1.3 var(--font-body);text-decoration:underline;text-underline-offset:4px}
.s1 :focus-visible{outline-color:var(--black)}
@container (min-width:700px){
  .s1 li{grid-template-columns:150px minmax(0,1fr) auto;align-items:start;gap:0 32px;padding:36px 0 40px}
  .s1 .body{grid-row:1;grid-column:2}
  .s1 .cpw{grid-column:3}
  .s1 .no{font-size:96px}
  .s1 .tt{font-size:21px}
  .s1 .to.strong{font-size:16px}
  .s1 .tx{font-size:20px}
  .s1 .cp-c{width:56px;height:56px}
}
@container (min-width:900px){
  .ex-wrap{padding:calc(62 * var(--u)) calc(66 * var(--u)) calc(48 * var(--u))}
  .ex-h{font-size:calc(56 * var(--u))}
  .s1{padding:calc(64 * var(--u)) calc(66 * var(--u)) calc(80 * var(--u))}
}
"""
s=s[:a]+new+s[b:]

comp=""":is([data-screen="dastur"],[data-screen="dars"],[data-screen="ex"]) .site{}
"""
comp=r"""/* ===== project background (dastur, dars, ex; not the sign-in photo): faint grid, a violet glow from the top right and a deep blue-violet floor.
   Cards are opaque, so the grid only shows on the canvas. The glow runs through many stops so it doesn't band ===== */
:is([data-screen="dastur"],[data-screen="dars"],[data-screen="ex"]) .site{
  background:
    linear-gradient(to right,rgb(255 255 255 / .05) 1px,transparent 1px) 0 0/48px 32px,
    linear-gradient(to bottom,rgb(255 255 255 / .05) 1px,transparent 1px) 0 0/48px 32px,
    radial-gradient(circle 420px at 100% 140px,rgb(130 104 214 / .24),rgb(110 90 200 / .16) 30%,rgb(80 66 170 / .09) 55%,rgb(50 40 120 / .035) 78%,transparent),
    radial-gradient(125% 125% at 50% 10%,#000 40%,#0b0830 78%,#140c47);
}
@container (min-width:900px){
  :is([data-screen="dastur"],[data-screen="dars"],[data-screen="ex"]) .site{
    background:
      linear-gradient(to right,rgb(255 255 255 / .05) 1px,transparent 1px) 0 0/calc(96 * var(--u)) calc(64 * var(--u)),
      linear-gradient(to bottom,rgb(255 255 255 / .05) 1px,transparent 1px) 0 0/calc(96 * var(--u)) calc(64 * var(--u)),
      radial-gradient(circle calc(800 * var(--u)) at 100% calc(200 * var(--u)),rgb(130 104 214 / .24),rgb(110 90 200 / .16) 30%,rgb(80 66 170 / .09) 55%,rgb(50 40 120 / .035) 78%,transparent),
      radial-gradient(125% 125% at 50% 10%,#000 40%,#0b0830 78%,#140c47);
  }
}

/* ===== overlays (body level, so .frame does not clip them): new-lesson popup, name menu, undo toast, locked sheet ===== */
.nl,.nmenu{position:fixed;display:grid;left:16px;right:16px;top:calc(72px + env(safe-area-inset-top));animation:nl-in .35s var(--ease)}
.nl[hidden],.nmenu[hidden],.toast[hidden]{display:none}
@keyframes nl-in{from{opacity:0;transform:translateY(-12px)}}
.nl{z-index:30;gap:14px;padding:18px;background:var(--white);color:var(--black);border:1px solid var(--black);border-radius:15px}
.nl-k{font:500 12px/1.3 var(--font-body);text-transform:uppercase;letter-spacing:.02em;color:#595959}
.nl-t{margin-top:4px;font:500 17px/1.3 var(--font-display);font-stretch:125%;text-transform:uppercase}
.nl-a{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.nl-go,.nl-x{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 18px;border:1px solid var(--black);border-radius:999px;font:500 15px/1 var(--font-body)}
.nl-go{background:var(--black);color:var(--white)}
.nl :focus-visible,.toast :focus-visible{outline-color:currentColor}
.nmenu{z-index:35;padding:20px;background:var(--black);border:1px solid var(--hair);border-radius:15px;animation-duration:.2s}
.nmenu:focus{outline:0}
.nm-name{font:500 17px/1.3 var(--font-display);font-stretch:125%;text-transform:uppercase}
.nm-list{margin-top:12px;border-top:1px solid var(--hair)}
.nm-list div{display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid var(--hair);font-size:15px;line-height:1.3}
.nm-list dt{color:var(--muted)}.nm-list dd{text-align:right}.nm-list .mono{font:500 14px/1.3 var(--font-mono)}
.nm-lang{display:flex;gap:4px;margin-top:8px}
.nm-lang a{display:grid;place-items:center;min-width:44px;min-height:44px;font:500 14px/1 var(--font-body);color:var(--muted)}.nm-lang a[aria-current]{color:var(--white);text-decoration:underline;text-underline-offset:5px}
.nm-out{display:flex;align-items:center;justify-content:center;min-height:48px;margin-top:8px;border:1px solid var(--white);border-radius:999px;font:500 16px/1 var(--font-body)}
.nm-out:hover{background:#111}
@media (min-width:900px){.nl{top:140px;left:24px;right:auto;width:380px}.nmenu{left:auto;right:var(--mr,24px);width:340px}}
.toast{position:fixed;z-index:40;left:16px;right:16px;bottom:16px;margin:0 auto;max-width:420px;display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:48px;padding:0 6px 0 18px;border:1px solid var(--hair);border-radius:999px;background:var(--black);color:#fff;font-size:15px;animation:toast-in .25s var(--ease)}
@keyframes toast-in{from{opacity:0;transform:translateY(8px)}}
.toast button{min-height:44px;padding:0 12px;font-weight:500;text-decoration:underline;text-underline-offset:4px}
.sheet{margin:auto auto 0;width:min(100%,480px);max-width:100%;padding:28px 16px calc(24px + env(safe-area-inset-bottom));border:0;border-radius:24px 24px 0 0;background:var(--dark);color:#fff}
.sheet::backdrop{background:rgb(0 0 0 / .6)}
.sheet-t{font:500 19px/1.36 var(--font-display);font-stretch:125%;text-transform:uppercase}
.sheet-d{margin-top:10px;color:var(--dark-ink);font-size:16px}
.sheet-x{display:flex;align-items:center;justify-content:center;width:100%;min-height:48px;margin-top:24px;border:1px solid #fff;border-radius:999px;font:500 16px/1 var(--font-body)}
@media (min-width:700px){.sheet{margin:auto;border-radius:24px}}

"""
m="@media (prefers-reduced-motion:reduce)"
i=s.index(m)
s=s[:i]+comp+s[i:]
open(p,'w',encoding='utf-8').write(s)
print('ok')
