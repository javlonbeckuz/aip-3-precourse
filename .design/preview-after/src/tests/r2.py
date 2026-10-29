import re
p=r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\index.html'
s=open(p,encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(s.count(old),old[:80])
    s=s.replace(old,new)

# ---- 15 dead code
rep(""".f-list{border-top:1px solid rgb(0 0 0 / .25)}
.f-list a{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:48px;border-bottom:1px solid rgb(0 0 0 / .25);font-size:15px;line-height:1.3}
.f-list a:hover span{text-decoration:underline;text-underline-offset:3px}
""","")
rep("/* rows inside a card (progress card, ux-audit H4 B) */\n","")
rep("  .f-list a{min-height:max(44px,calc(52 * var(--u)));font-size:max(14px,calc(17 * var(--u)))}\n","")
rep(".ef-h{font:400 13px/1.4 var(--font-body);color:#8A8A90}\n","")
rep('<li class="" data-i="1">','<li data-i="1">')
rep('<div class="gt" id="dg" style="--n:3">','<div class="gt" id="dg">')

# ---- 11 menu css, 12 comp chrome offset
rep(".nmenu{z-index:35;padding:20px;",".nmenu{z-index:35;max-height:calc(100dvh - 24px);overflow:auto;padding:20px;")
rep("@media (min-width:900px){.nl{top:16px;left:24px;right:auto;width:380px}.nmenu{left:auto;right:var(--mr,24px);width:340px}}",
"""@media (min-width:900px){.nl{top:16px;left:24px;right:auto;width:380px}.nmenu{left:auto;right:var(--mr,24px);width:340px}}
/* outside ?solo the comp bar and the screen padding sit above the nav: keep the popup below them, clear of the comp buttons and the nav */
body:not(.solo) .nl{top:calc(133px + env(safe-area-inset-top))}
@media (min-width:481px){body:not(.solo) .nl{top:141px}}
@media (min-width:900px){body:not(.solo) .nl{top:calc(77px + min(120px,8.34vw))}}""")

# ---- 13 language links
LANG='''<nav class="%s" aria-label="Til"><a href="#" aria-current="true" lang="uz">UZ<span class="sr-only"> · Oʻzbekcha</span></a><a href="#" lang="ru">RU<span class="sr-only"> · Русский</span></a><a href="#" lang="en">EN<span class="sr-only"> · English</span></a></nav>'''
old_g=re.search(r'<nav class="gate-lang"[^\n]*</nav>',s).group(0)
s=s.replace(old_g,LANG%'gate-lang')
old_m=re.search(r'<nav class="nm-lang"[^\n]*</nav>',s).group(0)
s=s.replace(old_m,LANG%'nm-lang')

# ---- go(): toast, popup
rep("closeMenu(); if (v === 'gate') document.getElementById('nl').hidden = true;","closeMenu(); document.getElementById('toast').hidden = true; // (elements by id: go() can run before the consts below exist)\n  if (v === 'gate') document.getElementById('nl').hidden = true;")
# link handler: opening a lesson from home counts as seen
rep("  if (document.body.dataset.view === 'all') sec.scrollIntoView(); else go(sec.dataset.screen, true);\n});",
"  if (sec.dataset.screen === 'dars' && a.closest('#s-dastur,#nl')) hideNewLesson(); // a lesson opened from home or from the popup = seen\n  if (document.body.dataset.view === 'all') sec.scrollIntoView(); else go(sec.dataset.screen, true);\n});")

# ---- gate js
a=s.index("// Gate: takes")
b=s.index("// Deep link for review:")
gate='''// Gate: takes "7KQ2XM" or "AIP-7KQ2XM" (any case, spaces and hyphens ignored, typed or pasted, even inside a copied message) and auto-submits on a
// complete valid code, like 2.0. 2.0 also has short hand-assigned IDs (XM = demo mentor): they log in on Enter / KIRISH, never on auto-submit.
// ponytail: "not found" is faked (KKKKKK, and any short ID except XM); in production it is the server's answer, plus its rate-limit and offline messages (ux-audit H3).
const gid = document.getElementById('gid'), gh = document.getElementById('gid-h'), gpill = gid.closest('.pill-field');
const helpText = gh.textContent, ID_RE = /^[2-9A-HJKMNP-Z]{6}$/, ID_CHARS = /^[2-9A-HJKMNP-Z]+$/, SHORT_IDS = ['XM'];
const idCode = v => v.toUpperCase().replace(/[\\s\\-\\u2010-\\u2015]/g, '').replace(/^AIP/, ''); // no valid code starts with AIP (I is not in the alphabet)
function gateMsg(text, state){
  if (state === 'err') { gh.innerHTML = '<svg width="18" height="18" aria-hidden="true"><use href="#i-alert"/></svg><span></span>'; gh.lastChild.textContent = text; }
  else gh.textContent = text;
  gh.classList.toggle('err', state === 'err'); gh.classList.toggle('ok', state === 'ok');
  gpill.classList.toggle('is-error', state === 'err');
  state === 'err' ? gid.setAttribute('aria-invalid', 'true') : gid.removeAttribute('aria-invalid');
}
function tryLogin(){
  if (gid.readOnly) return; // the loader is showing: one login only
  const c = idCode(gid.value);
  if (c.length > 6) return gateMsg('ID 6 ta belgidan iborat. Xabardagi ID’ni qayta tekshiring.', 'err');
  if (c && !ID_CHARS.test(c)) return gateMsg('ID’da 0, 1, I, L va O bo‘lmaydi. Xabardagi ID’ni qayta tekshiring.', 'err');
  if (c.length < 2) return gateMsg(`Yana ${6 - c.length} ta belgi kiriting.`, 'err');
  if (c.length < 6 && !SHORT_IDS.includes(c)) return gateMsg('Bu ID topilmadi. Xabardagi ID’ni to‘liq yozing.', 'err');
  if (c === 'KKKKKK') return gateMsg('Bu ID topilmadi. Mentoringizdan tekshirib oling.', 'err');
  gid.value = c; gid.readOnly = true;
  gateMsg('Xush kelibsiz, Dilshod!', 'ok');
  const ldr = document.getElementById('gate-loader');
  ldr.hidden = false;
  setTimeout(() => { go('dastur', true); ldr.hidden = true; gid.value = ''; gid.readOnly = false; gateMsg(helpText); showNewLesson(); }, 1800);
}
function onGidInput(e){
  if (e?.isComposing || gid.readOnly) return; // IME: wait for compositionend, never rewrite mid-composition
  const v = gid.value;
  if (/^\\s*AIP|[\\s\\-]/i.test(v)) { // the field already shows "AIP-"; spaces and hyphens never stay
    const pos = gid.selectionStart, next = idCode(v).slice(0, 10);
    gid.value = next;
    if (pos < v.length) { const np = Math.min(idCode(v.slice(0, pos)).length, next.length); gid.setSelectionRange(np, np); } // mid-string edit: keep the caret
  }
  gateMsg(helpText); if (idCode(gid.value).length === 6) tryLogin();
}
gid.addEventListener('input', onGidInput);
gid.addEventListener('compositionend', () => onGidInput());
gid.addEventListener('paste', e => { // maxlength would cut "  aip-7kq2xm " or "ID: AIP-7KQ2XM" before we could clean it
  const t = (e.clipboardData || window.clipboardData)?.getData('text'); if (t == null || gid.readOnly) return;
  e.preventDefault();
  const m = t.match(/AIP[\\s\\-\\u2010-\\u2015]*([2-9A-HJKMNP-Z]{6})/i); // an ID inside a message
  if (m) gid.value = m[1].toUpperCase();
  else if (/^\\s*AIP/i.test(t)) gid.value = idCode(t);
  else gid.setRangeText(idCode(t), gid.selectionStart, gid.selectionEnd, 'end');
  gid.value = gid.value.slice(0, 10); gid.dispatchEvent(new Event('input'));
});
document.getElementById('gate-form').addEventListener('submit', e => { e.preventDefault(); tryLogin(); });
'''
s=s[:a]+gate+s[b:]

# ---- toast
rep("""toast.addEventListener('focusin', () => clearTimeout(toastTimer));
toast.addEventListener('focusout', () => { toastTimer = setTimeout(hideToast, 5000); });""","""const armToast = () => { clearTimeout(toastTimer); toastTimer = setTimeout(hideToast, 5000); };
['focusin', 'mouseenter'].forEach(ev => toast.addEventListener(ev, () => clearTimeout(toastTimer))); // paused while hovered or focused
['focusout', 'mouseleave'].forEach(ev => toast.addEventListener(ev, () => { if (!toast.hidden && !toast.matches(':hover, :focus-within')) armToast(); }));""")
rep("  clearTimeout(toastTimer); toastTimer = setTimeout(hideToast, 5000);\n}","  armToast();\n}")
rep("(fresh ? ' Bajarildi. Bekor qilish tugmasi bor.' : ' Bajarildi.')","(fresh ? ' Bajarildi. Bekor qilish: «Bajarildi» tugmasi.' : ' Bajarildi.')")

# ---- 14 selftest
rep("""if (q.has('selftest')) {
  const copied = []; navigator.clipboard.writeText = async t => { copied.push(t); };""","""if (q.has('selftest') && !navigator.clipboard) document.body.dataset.test = 'skipped: no navigator.clipboard (non-secure origin)';
else if (q.has('selftest')) {
  const copied = []; navigator.clipboard.writeText = async t => { copied.push(t); };""")

# ---- 8 localStorage, 4 esc, 10, 11
rep("const nlSeen = () => { try { return JSON.parse(localStorage.getItem(NL_KEY)) || []; } catch { return []; } };","const nlSeen = () => { try { const v = JSON.parse(localStorage.getItem(NL_KEY)); return Array.isArray(v) ? v : []; } catch { return []; } };")
rep("nl.querySelector('.nl-go').addEventListener('click', hideNewLesson); // the in-page link handler then opens #s-dars\n","")
rep("m.style.setProperty('--mr', `${Math.max(16, Math.round(innerWidth - r.right))}px`);","m.style.setProperty('--mr', `${Math.max(16, Math.round(document.documentElement.clientWidth - r.right))}px`);")
rep("""  if (!m.hidden) { closeMenu(); m._from?.focus(); } else if (!nl.hidden) hideNewLesson();
});
if (q.has('newlesson')) showNewLesson(true);""","""  if (!m.hidden) { closeMenu(); m._from?.focus(); } // Esc on the menu never reaches the popup
  else if (!nl.hidden && nl.contains(document.activeElement)) nl.querySelector('.nl-x').click(); // the popup closes by Esc only while focus is in it
});
// 3: Tab / Shift+Tab out of the menu closes it (the trigger is excluded so its toggle keeps working)
const nmenu = document.getElementById('nmenu');
nmenu.addEventListener('focusout', e => { const t = e.relatedTarget; if (t && !nmenu.contains(t) && !t.closest('[aria-controls="nmenu"]')) closeMenu(); });
if (q.has('newlesson') && document.body.dataset.view !== 'gate') showNewLesson(true);""")
open(p,'w',encoding='utf-8').write(s)
print('ok')
