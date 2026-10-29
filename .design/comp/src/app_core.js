// ===================== APP: routes (History API under /aip), login and logout, language, slides, boot =====================
// Appended to the shared templates by build_app.py. Route strings inside the code keep the prototype's "#/dars/1" form; only these helpers know the real URLs.
const ROUTE = () => '#' + (location.pathname.replace(/^\/aip(?=\/|$)/, '').replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/') + location.search;
const normRoute = r => r.length > 2 ? r.replace(/\/+(?=\?|$)/, '') : r;           // "#/dars/1/" is "#/dars/1"
const urlOf = r => { r = normRoute(r); return BASE + (r.length > 2 ? r.slice(1) : '/'); };   // "#/dars/1?p=P1" -> "/aip/dars/1?p=P1"
const replaceRoute = r => history.replaceState({aip: 1}, '', urlOf(r));
const goReplace = r => { replaceRoute(r); render(); };
function navTo(r){ if (urlOf(r) === location.pathname + location.search) return render(); history.pushState({aip: 1}, '', urlOf(r)); render(); }
function seedHistory(r){   // a cold entry on a deep route: the parent goes under it, so the system Back button stays inside the app
  const par = parentOf(r);
  if (par && !history.state) { history.replaceState({aip: 1}, '', urlOf(par)); history.pushState({aip: 1}, '', urlOf(r)); } else if (!history.state) history.replaceState({aip: 1}, '', urlOf(r));
}
function convertLinks(root){   // every in-app link keeps its route in data-r and gets a real href (open in a new tab, copy the address)
  root.querySelectorAll('a[href^="#/"]').forEach(a => { const r = a.getAttribute('href'); a.dataset.r = r; a.setAttribute('href', urlOf(r)); });
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-r]'); if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return;
  e.preventDefault(); navTo(a.dataset.r);
});
window.addEventListener('popstate', () => render());

// ---- the name menu: the student's own data, and Chiqish (all as text nodes, never HTML)
function fillMenu(){
  if (!SESS) return;
  const s = SESS.student, $ = id => document.getElementById(id);
  $('nm-name').textContent = s.fullName; $('nm-id').textContent = s.id;
  $('nm-group').textContent = t('menu.group_' + (s.group || 'none'));
  $('nm-course').textContent = LESSONS[1].d ? t('menu.course_range', {n: SESS.schedule.sessions, from: lessonDate(1), to: lessonDate(LN().at(-1))}) : t('menu.course_tba');
  okina($('nmenu'));
}
async function logout(){
  closeMenu();
  try { await api('POST', '/logout', {}); } catch {}
  marker(false); location.replace('/aip/');   // a full reload: nothing of the old student stays in memory
}
document.addEventListener('click', e => { if (e.target.closest('#logout')) logout(); });

// ---- the account: the UI language for platform text plus Uzbek for course material; retried when the language changed while it loaded
let langSeq = 0;
async function loadMe(first){
  for (;;) {
    const seq = langSeq;
    const r = first ? [first, LANG === 'uz' ? first : await api('GET', '/me?lang=uz')] : await fetchMe();
    first = null;
    if (seq === langSeq) return r;
  }
}

// ---- login: the real POST /login; the error codes use the gate's own messages
async function doLogin(c){
  const ldr = document.getElementById('gate-loader');
  gid.value = c; gid.readOnly = true;
  try {
    const [j] = await Promise.all([api('POST', '/login', {id: c}), sleep(350)]);
    const [me, uz] = await loadMe(j);
    applyMe(me, uz);
    const lt = ldr.querySelector('.ldr-txt'); lt.dataset.i18nP = JSON.stringify({name: me.student.firstName}); applyStatic(ldr); okina(ldr);
    gateMsg(['gate.welcome', {name: me.student.firstName}], 'ok'); ldr.hidden = false;
    await sleep(700);
    document.body.append(ldr); gid.value = ''; gid.readOnly = false; gateMsg(['gate.help']);   // the loader leaves the sign-in screen: it fades out over the finished home
    const r = ROUTE();
    if (/^#\/(kirish)?$/.test(r)) replaceRoute('#/dastur'); else seedHistory(r);
    render(); fillMenu(); endLoader(ldr);
  } catch (e) {
    ldr.hidden = true; gid.readOnly = false;
    if (e.code === 'invalid_id') gateMsg(c.length < 6 ? ['gate.err.unknown_short', {n: 6 - c.length, pl: 6 - c.length}] : ['gate.err.notfound'], 'err');   // a short ID the server does not know is most likely incomplete
    else if (e.code === 'bad_id') gateMsg(['gate.err.badchars'], 'err');
    else if (e.code === 'rate_limited') gateMsg(['gate.err.rate', {n: Math.max(1, Math.ceil((e.info.retryAfter || 60) / 60))}], 'err');
    else gateMsg(['gate.err.offline'], 'err');
  }
}

// ---- language: the cookie the API reads, then a refetch (platform text comes translated), no reload
function cookieLang(){ const m = /(?:^|; )aip_lang=(uz|ru|en)/.exec(document.cookie); return m ? m[1] : 'uz'; }   // a function declaration: LANG reads it before this file's own lines run
async function setLang(l){
  if (!LANGS.includes(l) || l === LANG) return;
  const old = LANG, seq = ++langSeq, r0 = ROUTE(), st = langSnapshot();
  const use = x => { LANG = x; document.cookie = `aip_lang=${x}; Path=/; Max-Age=31536000; SameSite=Lax`; updateLangUI(); applyStatic(); okina(document.body); gateRelang(); };
  use(l);
  if (!AUTH) return;
  try { const [j, uz] = await loadMe(); if (seq !== langSeq) return; applyMe(j, uz); }
  catch (e) { if (e.status === 401 || seq !== langSeq) return; use(old); flashToast('toast.lang_failed'); return; }   // the switch failed: the old language stays, and the cookie with it
  fillMenu(); render(true);
  if (ROUTE() === r0) langRestore(st);   // only when we are still on the same page
}

// ---- keep the session honest: the page may come back from the back-forward cache, and a part may have opened meanwhile
async function recheck(){ try { const [j, uz] = await loadMe(); applyMe(j, uz); fillMenu(); } catch (e) { if (e.status !== 401) return; } render(true); }   // a 401 already sent the app back to the gate
window.addEventListener('pageshow', e => { if (e.persisted && AUTH) recheck(); });
let lastSeen = 0;
document.addEventListener('visibilitychange', () => { if (!document.hidden && AUTH && Date.now() - lastSeen > 10000) { lastSeen = Date.now(); recheck(); } });

// ---- slides: the real still (and the clip of a video lesson on top of it; when the clip is missing the still stays)
const NOCLIP = {};   // ponytail: lessons whose first clip answered 404 get no more clip requests (they would only fill the console); stills carry the slides. Reset by a reload once clips exist
function slideStage(n, i){
  const base = `${API}/lesson/${n}`, vid = LESSONS[n].kind === 'video' && !NOCLIP[n];
  if (i < LESSONS[n].slides) new Image().src = `${base}/slide/${i + 1}`;   // the next still is on its way before the tap
  const L = LESSONS[n], topic = t(`lesson.${n}.t${Math.min(L.topics - 1, Math.floor((i - 1) / L.slides * L.topics))}`);
  // loading: the placeholder layout (number and topic) stays under the image, which fades in on load; error: a message with a retry
  return `<div class="slv-ph"><span class="slv-num">${num2(i)}</span><span class="slv-t">${T('sl.topic', {n, topic})}</span></div>
    <div class="slv-media" role="img" aria-label="${esc(t('sl.img', {i, topic}))}" data-src="${base}/slide/${i}"><img src="${base}/slide/${i}" alt="" draggable="false">${vid ? `<video src="${base}/clip/${i}?q=1080" muted playsinline autoplay loop disablepictureinpicture></video>` : ''}</div>
    <div class="slv-err" hidden role="alert"><span>${T('sl.error')}</span><button type="button" class="slv-retry">${T('sl.retry')}</button></div>`;
}
document.addEventListener('load', e => { const im = e.target; if (im.tagName === 'IMG' && im.closest('.slv-media')) im.closest('.slv-media').classList.add('ready'); }, true);
document.addEventListener('error', async e => {   // a still that failed: a 401 means the session ended (gate), anything else gets the retry message
  const im = e.target; if (!im || im.tagName !== 'IMG' || !im.closest('.slv-media')) return;
  const box = im.closest('.slv-stage');
  try { const r = await fetch(im.src, {credentials: 'same-origin'}); if (r.status === 401) return onUnauthorized(); } catch {}
  box.querySelector('.slv-err').hidden = false; box.querySelector('.slv-media').classList.add('failed');
}, true);
document.addEventListener('click', e => {
  const b = e.target.closest('.slv-retry'); if (!b) return; e.stopPropagation();
  const box = b.closest('.slv-stage'), im = box.querySelector('.slv-media img'); box.querySelector('.slv-err').hidden = true; box.querySelector('.slv-media').classList.remove('failed');
  im.src = box.querySelector('.slv-media').dataset.src + '?r=' + Date.now();
}, true);
document.addEventListener('error', e => { const v = e.target; if (v && v.tagName === 'VIDEO' && v.closest('.slv-media')) { NOCLIP[+/lesson\/(\d)/.exec(v.src)[1]] = true; v.remove(); } }, true);   // 404 clip: keep the still
document.addEventListener('contextmenu', e => { if (e.target.closest('.slv-stage')) e.preventDefault(); });
// a slide is blurred while the window is not in front (not a security measure: the server gates by time and session)
window.addEventListener('blur', () => document.documentElement.classList.add('hid'));
window.addEventListener('focus', () => document.documentElement.classList.toggle('hid', document.hidden));
let swipe = null;   // a horizontal swipe on the stage = previous / next slide (the tap zones keep working)
document.addEventListener('pointerdown', e => { const st = e.isPrimary && e.target.closest('.slv-stage'); swipe = st ? {x: e.clientX, y: e.clientY, st} : null; });
document.addEventListener('pointerup', e => {
  if (!swipe) return; const {x, y, st} = swipe; swipe = null;
  const dx = e.clientX - x, dy = e.clientY - y, to = +st.dataset.sl + (dx < 0 ? 1 : -1);
  if (Math.abs(dx) < 50 || Math.abs(dx) < 1.5 * Math.abs(dy) || to < 1 || to > +st.dataset.max) return;
  const stop = ev => { ev.stopPropagation(); ev.preventDefault(); };   // the click that follows the swipe must not also turn the page
  document.addEventListener('click', stop, {capture: true, once: true}); setTimeout(() => document.removeEventListener('click', stop, true), 400);
  goReplace(`#/dars/${st.dataset.n}/slayd/${to}`);
});

// ---- the prep guide PDF of the current language comes from the API
function prepFileRow(){
  const name = `prep-${LANG}.pdf`;
  return `<li><a class="ef-row" href="${API}/prep/pdf?lang=${LANG}" target="_blank" rel="noopener noreferrer"><span><span class="sr-only">${T('common.sr_download')}</span><span class="ef-nm">${T('prep.guide_name')}</span><span class="ef-mt">${name} · ${T('prep.pdf')}</span></span><span class="ef-dl">${I('down', 18)}</span></a></li>`;
}

// ===================== boot =====================
(async function boot(){
  document.documentElement.lang = HTML_LANG[LANG]; applyStatic(); okina(document.body); updateLangUI();
  // the session cookie is HttpOnly, so a plain marker cookie says "worth asking": a signed-out visitor makes no request that is bound to answer 401
  if (/(?:^|; )aip_in=1/.test(document.cookie)) { try { const [j, uz] = await loadMe(); applyMe(j, uz); fillMenu(); } catch { AUTH = false; } }
  if (/^\/aip\/index\.html$/.test(location.pathname)) history.replaceState(null, '', '/aip/' + location.search);   // /aip/index.html is /aip/
  if (AUTH) seedHistory(ROUTE());
  document.body.removeAttribute('data-booting');
  render();
})();
