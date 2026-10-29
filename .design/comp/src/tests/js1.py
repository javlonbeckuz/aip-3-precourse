p=r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\index.html'
s=open(p,encoding='utf-8').read()
def rep(old,new,cnt=1):
    global s
    assert s.count(old)==cnt,(s.count(old),old[:70])
    s=s.replace(old,new)

# go(): close menu, hide popup on sign-out
rep("""function go(v, focus){
  document.body.dataset.view = v;""","""function closeMenu(){
  const m = document.getElementById('nmenu'); if (m.hidden) return;
  m.hidden = true; document.querySelectorAll('[aria-controls="nmenu"]').forEach(b => b.setAttribute('aria-expanded', 'false'));
}
function go(v, focus){
  closeMenu(); if (v === 'gate') document.getElementById('nl').hidden = true;
  document.body.dataset.view = v;""")

# gate js
a=s.index("// Gate: auto-submits at 6 characters")
b=s.index("// Deep link for review:")
gate="""// Gate: takes "7KQ2XM" or "AIP-7KQ2XM" (any case, spaces and hyphens ignored, typed or pasted) and auto-submits on a complete valid code, like 2.0.
// ponytail: "not found" is faked (KKKKKK); in production it is the server's answer, plus its rate-limit and offline messages (ux-audit H3).
const gid = document.getElementById('gid'), gh = document.getElementById('gid-h'), gpill = gid.closest('.pill-field');
const helpText = gh.textContent, ID_RE = /^[2-9A-HJKMNP-Z]{6}$/;
const idCode = v => v.toUpperCase().replace(/[\\s\\-\\u2010-\\u2015]/g, '').replace(/^AIP/, ''); // no valid code starts with AIP (I is not in the alphabet)
function gateMsg(text, state){
  if (state === 'err') { gh.innerHTML = '<svg width="18" height="18" aria-hidden="true"><use href="#i-alert"/></svg><span></span>'; gh.lastChild.textContent = text; }
  else gh.textContent = text;
  gh.classList.toggle('err', state === 'err'); gh.classList.toggle('ok', state === 'ok');
  gpill.classList.toggle('is-error', state === 'err');
  state === 'err' ? gid.setAttribute('aria-invalid', 'true') : gid.removeAttribute('aria-invalid');
}
function tryLogin(){
  const c = idCode(gid.value);
  if (c.length < 6) return gateMsg(`Yana ${6 - c.length} ta belgi kiriting.`, 'err');
  if (c.length > 6) return gateMsg('ID 6 ta belgidan iborat (AIP- dan keyin). Xabardagi ID’ni qayta tekshiring.', 'err');
  if (!ID_RE.test(c)) return gateMsg('ID’da 0, 1, I, L va O bo‘lmaydi. Xabardagi ID’ni qayta tekshiring.', 'err');
  if (c === 'KKKKKK') return gateMsg('Bu ID topilmadi. Mentoringizdan tekshirib oling.', 'err');
  gid.value = c;
  gateMsg('Xush kelibsiz, Dilshod!', 'ok');
  const ldr = document.getElementById('gate-loader');
  ldr.hidden = false;
  setTimeout(() => { go('dastur', true); ldr.hidden = true; gid.value = ''; gateMsg(helpText); showNewLesson(); }, 1800);
}
gid.addEventListener('input', () => {
  if (/^\\s*AIP/i.test(gid.value)) gid.value = idCode(gid.value).slice(0, 10); // the field already shows "AIP-"
  gateMsg(helpText); if (idCode(gid.value).length === 6) tryLogin();
});
gid.addEventListener('paste', e => { // maxlength would cut "  aip-7kq2xm " before we could clean it
  const t = (e.clipboardData || window.clipboardData)?.getData('text'); if (t == null) return;
  e.preventDefault();
  /^\\s*AIP/i.test(t) ? gid.value = idCode(t) : gid.setRangeText(idCode(t), gid.selectionStart, gid.selectionEnd, 'end');
  gid.value = gid.value.slice(0, 10); gid.dispatchEvent(new Event('input'));
});
document.getElementById('gate-form').addEventListener('submit', e => { e.preventDefault(); tryLogin(); });
"""
s=s[:a]+gate+s[b:]

# copy section + selftest
a=s.index("// Lilac prompt section: copy = done")
b=s.index("// Dars folder tabs:")
ex="""// Lilac prompt section: copy = done, with undo (ux-spec 3.1): the "Bajarildi" chip is a toggle, and a 5 s toast offers "Bekor qilish"
const toast = document.getElementById('toast'), toastT = document.getElementById('toast-t');
let undoLi = null, toastTimer = 0;
const CHECK = '<svg width="12" height="12" aria-hidden="true"><use href="#i-check"/></svg>';
function setDone(li, on){
  li.classList.toggle('done', on);
  const c = li.querySelector('.chip'); c.classList.toggle('off', !on);
  c.innerHTML = on ? CHECK + 'Bajarildi' : 'Bajarildi deb belgilash';
  c.setAttribute('aria-label', on ? 'Bajarildi, bekor qilish uchun bosing' : 'Bajarildi deb belgilash');
}
function hideToast(){ clearTimeout(toastTimer); toast.hidden = true; undoLi = null; }
function showToast(li){
  undoLi = li; toastT.textContent = `${li.querySelector('.no').textContent} bajarildi`; toast.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(hideToast, 5000);
}
toast.addEventListener('focusin', () => clearTimeout(toastTimer));
toast.addEventListener('focusout', () => { toastTimer = setTimeout(hideToast, 5000); });
document.getElementById('toast-undo').addEventListener('click', () => {
  const li = undoLi; if (!li) return;
  setDone(li, false); hideToast(); li.querySelector('.cp').focus();
  live.textContent = `${li.querySelector('.no').textContent} bajarildi belgisi olib tashlandi.`;
});
document.addEventListener('click', async e => {
  const chip = e.target.closest('.s1 .chip');
  if (chip) {
    const li = chip.closest('li'), on = !li.classList.contains('done'), no = li.querySelector('.no').textContent;
    setDone(li, on); on ? showToast(li) : undoLi === li && hideToast();
    live.textContent = on ? `${no} bajarildi.` : `${no} bajarildi belgisi olib tashlandi.`;
    return;
  }
  const b = e.target.closest('.s1 .cp'); if (!b) return;
  const li = b.closest('li');
  const ok = await copy(li.querySelector('.tx').textContent.replace(/\\u2018/g,'\\u02BB').replace(/\\u2019/g,'\\u02BC'));
  if (!ok) { live.textContent = 'Nusxa olinmadi. Matnni qo\\u2018lda belgilang.'; return; }
  const fresh = !li.classList.contains('done');
  if (fresh) { setDone(li, true); showToast(li); }
  b.classList.add('flash'); b.querySelector('use').setAttribute('href', '#i-check'); b.querySelector('.cpl').textContent = 'Nusxalandi';
  live.textContent = `Nusxalandi: ${li.querySelector('.tt').textContent.trim()}.` + (fresh ? ' Bajarildi. Bekor qilish tugmasi bor.' : ' Bajarildi.');
  clearTimeout(b._t); b._t = setTimeout(() => { b.classList.remove('flash'); b.querySelector('use').setAttribute('href', '#i-copy'); b.querySelector('.cpl').textContent = 'Nusxalash'; }, 2000);
});
// ?selftest (with ?view=ex): stub the clipboard (headless has none), click P2 copy, then undo, and record the result
if (q.has('selftest')) {
  const copied = []; navigator.clipboard.writeText = async t => { copied.push(t); };
  const li = document.querySelector('.s1 li[data-i="1"]');
  li.querySelector('.cp').click();
  setTimeout(() => {
    const r = `p2done=${li.classList.contains('done')} chip=${!!li.querySelector('.chip:not(.off)')} label=${li.querySelector('.cpl').textContent} toast="${toast.hidden ? '' : toastT.textContent}" raw-okina=${copied[0]?.includes('\\u02BB')} live="${live.textContent}"`;
    toast.querySelector('button').click();
    document.body.dataset.test = r + ` undone=${!li.classList.contains('done') && !!li.querySelector('.chip.off') && toast.hidden}`;
  }, 400);
}

// New-lesson popup (top-left). Demo: shown after a login, or with ?newlesson (forces it). Production: the SERVER decides "a lesson opened since the
// last visit" (ux-spec 1.1); localStorage here only remembers which lesson's popup was dismissed. It never takes focus; #live announces it.
const nl = document.getElementById('nl'), NL_KEY = 'aip3.nl.seen', NL_LESSON = '3';
const nlSeen = () => { try { return JSON.parse(localStorage.getItem(NL_KEY)) || []; } catch { return []; } };
function showNewLesson(force){
  if (!force && nlSeen().includes(NL_LESSON)) return;
  nl.hidden = false; live.textContent = 'Yangi dars ochildi: 3-dars, Skill va agentlar.';
}
function hideNewLesson(){
  nl.hidden = true;
  try { localStorage.setItem(NL_KEY, JSON.stringify([...new Set([...nlSeen(), NL_LESSON])])); } catch {}
}
nl.querySelector('.nl-x').addEventListener('click', () => { hideNewLesson(); const h = document.querySelector('.screen.is-on h1'); if (h) { h.tabIndex = -1; h.focus({preventScroll:true}); } });
nl.querySelector('.nl-go').addEventListener('click', hideNewLesson); // the in-page link handler then opens #s-dars

// Name menu (ID, group, mentor, dates, language, Chiqish) and the locked-lesson sheet
document.addEventListener('click', e => {
  const m = document.getElementById('nmenu'), t = e.target.closest('.nav-name,.menu-btn');
  if (t) {
    if (!m.hidden) return closeMenu();
    const r = t.getBoundingClientRect();
    m.style.top = `${Math.round(r.bottom + 8)}px`; m.style.setProperty('--mr', `${Math.max(16, Math.round(innerWidth - r.right))}px`);
    m.hidden = false; m._from = t; t.setAttribute('aria-expanded', 'true'); m.focus();
  } else if (!m.hidden && !e.target.closest('#nmenu')) closeMenu();
  const sh = e.target.closest('[data-sheet]'); if (sh) document.getElementById(sh.dataset.sheet).showModal();
});
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape' || document.querySelector('dialog[open]')) return;
  const m = document.getElementById('nmenu');
  if (!m.hidden) { closeMenu(); m._from?.focus(); } else if (!nl.hidden) hideNewLesson();
});
if (q.has('newlesson')) showNewLesson(true);
"""
s=s[:a]+ex+s[b:]
rep("""// Deep link for review: index.html?view=dastur | dars | ex | all ; ?id=XXXXXX runs the login""","""// Deep link for review: index.html?view=dastur | dars | ex | all ; ?id=XXXXXX runs the login ; ?newlesson shows the popup""")
rep("""  if (q.has('tabtest')) tabs[+q.get('tabtest')]?.click();""","""  if (q.has('tabtest')) tabs[+q.get('tabtest')]?.click();""")
rep("?view=dars&tabtest=0..3 opens that tab","?view=dars&tabtest=0..2 opens that tab")
open(p,'w',encoding='utf-8').write(s)
print('ok')
