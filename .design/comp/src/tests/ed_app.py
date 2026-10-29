import re
P = r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\src\proto_app.js'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    assert s.count(old) == cnt, (s.count(old), old[:100])
    s = s.replace(old, new)

# ---- helpers: esc moved to proto_i18n.js; HTML variants of the content helpers (lang="uz-Latn" on Uzbek content in ru/en)
rep("const esc = s => String(s).replace(/[&<>\"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#39;'}[c]));\n", "")
rep("// ---- text helpers (content = 2.0 Uzbek text, unless a translation was added on purpose; placeholders use ns.* UI keys)",
    "// ---- text helpers (content = 2.0 Uzbek text, unless a translation was added on purpose; placeholders use ns.* UI keys)\n"
    "// t() = plain text (textContent; esc() it before it goes into HTML or an attribute), T() = escaped HTML, cx() = content as plain text, cxh() = content as HTML with lang=\"uz-Latn\" when it is still Uzbek inside a ru/en page.\n"
    "// *H variants below return HTML; the plain ones are for search, aria, titles and the copy text.")
rep("""const exTagT = k => cx(`c.ex.${k}.tag`, EX[k].tag);
const exNoteT = k => EX[k].note ? cx(`c.ex.${k}.note`, EX[k].note) : t(EX[k].noteKey || 'ns.note');""",
"""const exTagT = k => cx(`c.ex.${k}.tag`, EX[k].tag);
const exTitleH = k => k === '03' ? esc(t('pick.title')) : EX[k].title ? cxh(`c.ex.${k}.title`, EX[k].title) : '';
const exTagH = k => cxh(`c.ex.${k}.tag`, EX[k].tag);
const exNoteH = k => EX[k].note ? cxh(`c.ex.${k}.note`, EX[k].note) : esc(t(EX[k].noteKey || 'ns.note'));""")
a = s.index("const pText = "); b = s.index("const hTitle = ")
s = s[:a] + """// h = true: the same value as escaped HTML (content gets lang="uz-Latn" in ru/en, ns.* placeholders are translated UI and get none)
const pText = (kind, page, p, h) => {
  if (p.text == null) { const x = t(p.qimmat ? 'ns.text_qimmat' : 'ns.text'); return h ? mark(esc(x)) : x; }
  const k = pBase[kind](page, p) + '.text'; return h ? cxh(k, p.text, x => mark(esc(x))) : cx(k, p.text);
};
const pWhere = (kind, page, p, h) => {
  if (p.where == null) { const x = t('ns.source'); return h ? esc(x) : x; }
  const k = pBase[kind](page, p) + '.where'; return h ? cxh(k, p.where) : cx(k, p.where);
};
const pTitle = (kind, page, p, i, h) => {
  if (p.title != null) { const k = pBase[kind](page, p) + '.title'; return h ? cxh(k, p.title) : cx(k, p.title); }
  if (kind === 'h') return pWhere(kind, page, p, h);
  const x = kind === 'vz' ? t('ns.q_title', {id: p.id}) : kind === 'lib' ? t('ns.prompt', {n: p.id}) : t('ns.prompt', {n: +p.id.replace(/\\D/g, '') || i + 1});
  return h ? esc(x) : x;
};
const pParts = (kind, page, p, i) => ({title: pTitle(kind, page, p, i), titleH: pTitle(kind, page, p, i, true), where: pWhere(kind, page, p), whereH: pWhere(kind, page, p, true), text: pText(kind, page, p), textH: pText(kind, page, p, true)});
""" + s[b:]
rep("const hTitle = h => cx(`c.h.${h.id}.title`, h.title);\nconst hNatija = h => h.natija ? cx(`c.h.${h.id}.natija`, h.natija) : t('ns.natija');",
    "const hTitle = h => cx(`c.h.${h.id}.title`, h.title);\nconst hTitleH = h => cxh(`c.h.${h.id}.title`, h.title);\nconst hNatijaH = h => h.natija ? cxh(`c.h.${h.id}.natija`, h.natija) : esc(t('ns.natija'));")

# ---- nextOf returns HTML (label/what): content parts are lang-tagged, everything else escaped
rep("const mk = (what, href) => ({what, label: `${t('lesson.n', {n})} · ${what}`, href});", "const mk = (what, href) => ({what, label: `${T('lesson.n', {n})} · ${what}`, href}); // what / label are HTML")
rep("return mk(t('next.pick', {num: EX[o].num, title: exTitleT(o)}), '#/dars/1/amaliyot/03'); }", "return mk(T('next.pick', {num: EX[o].num, title: HT(exTitleH(o))}), '#/dars/1/amaliyot/03'); }")
rep("return mk(p ? t('next.ex_prompt', {num: e.num, pid: p.id, title: pTitle('ex', k, p, 0)}) : t('next.ex', {num: e.num}), exHref(k, p?.id)); }",
    "return mk(p ? T('next.ex_prompt', {num: e.num, pid: p.id, title: HT(pTitle('ex', k, p, 0, true))}) : T('next.ex', {num: e.num}), exHref(k, p?.id)); }")
rep("return mk(t('next.vz', {pid: p.id}), `#/dars/1/vazifa/promptlar?p=${p.id}`); }", "return mk(T('next.vz', {pid: p.id}), `#/dars/1/vazifa/promptlar?p=${p.id}`); }")
rep("return mk(t('next.sl', {i: S.sl(1), total: LESSONS[1].slides}), slHref(1));", "return mk(T('next.sl', {i: S.sl(1), total: LESSONS[1].slides}), slHref(1));")
rep("return mk(u.label + (u.kind === 'sl' ? ` · ${S.sl(n)} / ${LESSONS[n].slides}` : ''), u.href);", "return mk(esc(u.label) + (u.kind === 'sl' ? ` · ${S.sl(n)} / ${LESSONS[n].slides}` : ''), u.href);")
rep("<span>${T('next.k')}<small>${esc(ns.label)}</small></span>", "<span>${T('next.k')}<small>${ns.label}</small></span>")
rep("cta = nx ? {href: nx.href, label: t('cta.continue', {what: nx.what})} : null;", "cta = nx ? {href: nx.href, label: T('cta.continue', {what: HT(nx.what)})} : null;")
rep("<span>${esc(cta.label)}</span><span class=\"pill-circ\">", "<span>${cta.label}</span><span class=\"pill-circ\">")

# ---- small helpers: escape every t() that lands in HTML or an attribute
rep("""<nav class="nav-links" aria-label="${t('nav.label')}">""", """<nav class="nav-links" aria-label="${esc(t('nav.label'))}">""")
rep("""aria-label="${t('menu.label')}" aria-haspopup""", """aria-label="${esc(t('menu.label'))}" aria-haspopup""")
rep("""<button class="chip" type="button" aria-label="${t('common.done_hint')}">""", """<button class="chip" type="button" aria-label="${esc(t('common.done_hint'))}">""")
rep("""<button class="chip off" type="button" aria-label="${t('common.mark_done')}">""", """<button class="chip off" type="button" aria-label="${esc(t('common.mark_done'))}">""")
a = s.index("function pli(o){"); b = s.index("const fsize = ")
s = s[:a] + """// o.title / o.text are plain (data-t, aria, copy); o.titleH / o.whereH / o.textH are the escaped HTML of the same values
function pli(o){
  const done = S.has(o.key);
  return `<li class="${done ? 'done' : ''}" data-i="${o.i}" data-pid="${o.pid}" data-key="${o.key}" data-t="${esc(o.title)}"><span class="no" aria-hidden="true">${o.no}</span>
    <div class="body"><h3 class="tt" tabindex="-1">${o.titleH}${o.ph ? NSTAG() : ''}</h3>${chipHTML(done)}${o.where ? `<p class="to strong"><b>${T(o.lbl)}</b> ${o.whereH}</p>` : ''}<p class="tx" data-raw="${esc(o.text)}">${o.textH}</p></div>
    <div class="cpw"><button class="cp" type="button" aria-label="${esc(t('common.copy_aria', {title: o.title}))}"><span class="cp-c">${I('copy', 20)}</span><span class="cpl">${T('common.copy')}</span></button></div></li>`;
}
""" + s[b:]
rep("""const fileRow = (f, extra) => `<li><a class="ef-row" href="#/fayl/${f.slug}"><span><span class="sr-only">${T('common.sr_download')}</span><span class="ef-nm">${esc(f.name)}${f.ph ? NSTAG() : ''}</span><span class="ef-mt">${extra ? esc(extra) + ' · ' : ''}${esc(fsize(f))}</span>""",
    """const fileRow = (f, extra) => `<li><a class="ef-row" href="#/fayl/${f.slug}"><span><span class="sr-only">${T('common.sr_download')}</span><span class="ef-nm">${esc(f.name)}${f.ph ? NSTAG() : ''}</span><span class="ef-mt">${extra ? (extra.html ?? esc(extra)) + ' · ' : ''}${esc(fsize(f))}</span>""")  # extra: plain text or HT(html)
rep("""const exMark = k => exDone(k) ? SRCHK() : (!EX[k].pick && exCount(k)[0] ? t('row.mark', {d: exCount(k)[0], t: exCount(k)[1], pl: exCount(k)[1]}) : '');""",
    """const exMark = k => exDone(k) ? SRCHK() : (!EX[k].pick && exCount(k)[0] ? esc(t('row.mark', {d: exCount(k)[0], t: exCount(k)[1], pl: exCount(k)[1]})) : '');""")
rep("""const exTitleHTML = k => EX[k].tagTitle ? `<span class="xtag">${esc(exTagT(k))}</span>` : esc(exTitleT(k));""",
    """const exTitleHTML = k => EX[k].tagTitle ? `<span class="xtag">${exTagH(k)}</span>` : exTitleH(k);""")

# ---- home
rep("""aria-label="${t('home.ring.label')}" aria-valuemin="0" aria-valuemax="${rt}" aria-valuenow="${rd}" aria-valuetext="${t('home.ring.valuetext', {d: rd, t: rt, pl: rt})}${prepCount() === 4 ? t('home.ring.prep') : ''}">""",
    """aria-label="${esc(t('home.ring.label'))}" aria-valuemin="0" aria-valuemax="${rt}" aria-valuenow="${rd}" aria-valuetext="${esc(t('home.ring.valuetext', {d: rd, t: rt, pl: rt}) + (prepCount() === 4 ? t('home.ring.prep') : ''))}">""")
rep("""<ul class="grid3 lessons" aria-label="${t('home.lessons')}">""", """<ul class="grid3 lessons" aria-label="${esc(t('home.lessons'))}">""")

# ---- lesson page
rep("""lk(`#/dars/2/amaliyot?s=${s.k}`, sectName(s), '',""", """lk(`#/dars/2/amaliyot?s=${s.k}`, esc(sectName(s)), '',""")
rep("""${HERMES.map(h => lk(`#/dars/4/amaliyot/${h.id}`, esc(hTitle(h)), h.bonus ? esc(t('common.bonus')) : '',""", """${HERMES.map(h => lk(`#/dars/4/amaliyot/${h.id}`, hTitleH(h), h.bonus ? esc(t('common.bonus')) : '',""")
rep("""role="tablist" aria-label="${t('tab.list')}">""", """role="tablist" aria-label="${esc(t('tab.list'))}">""")

# ---- exercise pages
rep("""const lis = (arr, off) => arr.map((p, i) => pli({i: off + i, pid: p.id, no: p.id, title: `${p.id} · ${pTitle('vz', 'v1', p, i).replace(/^P\\d+ /, '')}`, ph: p.ph, lbl: 'lbl.manba', where: pWhere('vz', 'v1', p), text: pText('vz', 'v1', p), key: pk('v1', p.id)})).join('');""",
    """const vt = (p, i, h) => `${p.id} · ` + (p.title != null ? pTitle('vz', 'v1', p, i, h) : (h ? esc : x => x)(pTitle('vz', 'v1', p, i).replace(/^P\\d+ /, '')));
  const lis = (arr, off) => arr.map((p, i) => pli({...pParts('vz', 'v1', p, i), i: off + i, pid: p.id, no: p.id, title: vt(p, i), titleH: vt(p, i, true), ph: p.ph, lbl: 'lbl.manba', key: pk('v1', p.id)})).join('');""")
rep("""${group(T('pick.group'), e.pick.map(k => rowLink(`#/dars/1/amaliyot/${k}`, `${EX[k].num} · ${esc(exTitleT(k))}`, `${esc(exTagT(k))}${exDone(k) ? t('pick.done_sfx') : ''}`, exMark(k))).join(''))}""",
    """${group(T('pick.group'), e.pick.map(k => rowLink(`#/dars/1/amaliyot/${k}`, `${EX[k].num} · ${exTitleH(k)}`, `${exTagH(k)}${exDone(k) ? esc(t('pick.done_sfx')) : ''}`, exMark(k))).join(''))}""")
rep("""const lis = e.prompts.map((p, i) => pli({i, pid: p.id, no: p.id, title: pTitle('ex', k, p, i), ph: p.ph, lbl: 'lbl.where', where: pWhere('ex', k, p), text: pText('ex', k, p), key: pk(k, p.id)})).join('');""",
    """const lis = e.prompts.map((p, i) => pli({...pParts('ex', k, p, i), i, pid: p.id, no: p.id, ph: p.ph, lbl: 'lbl.where', key: pk(k, p.id)})).join('');""")
rep("""<h1 class="headline ex-h">${e.tagTitle ? `<span class="xtag big">${esc(exTagT(k))}</span>` : esc(exTitleT(k))}</h1>
      <p class="lede">${esc(exNoteT(k))}${phNote ? NSTAG() : ''}</p>""", """<h1 class="headline ex-h">${e.tagTitle ? `<span class="xtag big">${exTagH(k)}</span>` : exTitleH(k)}</h1>
      <p class="lede">${exNoteH(k)}${phNote ? NSTAG() : ''}</p>""")
rep("""fileRow(e.brief, e.briefLabel ? cx(`c.ex.${k}.briefLabel`, e.briefLabel) : '')""", """fileRow(e.brief, e.briefLabel ? HT(cxh(`c.ex.${k}.briefLabel`, e.briefLabel)) : '')""")
rep("""${nx ? nextBlock(`#/dars/1/amaliyot/${nxK}`, 'ex.next', {num: nx.num, title: nx.tagTitle ? exTagT(nxK) : exTitleT(nxK)})""", """${nx ? nextBlock(`#/dars/1/amaliyot/${nxK}`, 'ex.next', {num: nx.num, title: HT(nx.tagTitle ? exTagH(nxK) : exTitleH(nxK))})""")

# ---- library
rep("""const done = S.has(pk('lib', p.id)), title = pTitle('lib', '', p, i); return""", """const done = S.has(pk('lib', p.id)), title = pTitle('lib', '', p, i), titleH = pTitle('lib', '', p, i, true); return""")
rep("""aria-controls="lb${p.id}">${esc(title)}${p.title == null ? NSTAG() : ''}</button></h3><div class="accp" id="lb${p.id}" hidden>${chipHTML(done)}<p class="tx">${mark(esc(pText('lib', '', p)))}</p></div></div>""",
    """aria-controls="lb${p.id}">${titleH}${p.title == null ? NSTAG() : ''}</button></h3><div class="accp" id="lb${p.id}" hidden>${chipHTML(done)}<p class="tx" data-raw="${esc(pText('lib', '', p))}">${pText('lib', '', p, true)}</p></div></div>""")
rep("""placeholder="${t('lib.search')}" autocomplete""", """placeholder="${esc(t('lib.search'))}" autocomplete""")
rep("""aria-label="${t('lib.sections')}">${SECT.map(s => `<button class="lib-chip" type="button" data-sect="${s.k}" aria-pressed="${sel === s.k}">${sectName(s)} · ${s.a}–${s.b}</button>`).join('')}""",
    """aria-label="${esc(t('lib.sections'))}">${SECT.map(s => `<button class="lib-chip" type="button" data-sect="${s.k}" aria-pressed="${sel === s.k}">${esc(sectName(s))} · ${s.a}–${s.b}</button>`).join('')}""")

# ---- Hermes
rep("""`${h.id} · ${esc(hTitle(h))}${h.bonus ? ' · ' + esc(t('common.bonus')) : ''}${h.natija ? '' : NSTAG()}`, esc(hNatija(h)),""", """`${h.id} · ${hTitleH(h)}${h.bonus ? ' · ' + esc(t('common.bonus')) : ''}${h.natija ? '' : NSTAG()}`, hNatijaH(h),""")
rep("""const lis = h.prompts.map((p, i) => pli({i, pid: p.id, no: h.id, title: pWhere('h', h.id, p), ph: p.ph, lbl: '', where: '', text: pText('h', h.id, p), key: pk('h' + h.id, p.id)})).join('');""",
    """const lis = h.prompts.map((p, i) => pli({...pParts('h', h.id, p, i), i, pid: p.id, no: h.id, ph: p.ph, lbl: '', where: '', key: pk('h' + h.id, p.id)})).join('');""")
rep("""<h1 class="headline ex-h">${esc(hTitle(h))}</h1><p class="lede goal">${esc(hNatija(h))}${h.natija ? '' : NSTAG()}</p>""", """<h1 class="headline ex-h">${hTitleH(h)}</h1><p class="lede goal">${hNatijaH(h)}${h.natija ? '' : NSTAG()}</p>""")
rep("""<b>${esc(cx(`c.h.${h.id}.note${i}.t`, x.t))}:</b> ${esc(cx(`c.h.${h.id}.note${i}.x`, x.x))}</p>""", """<b>${cxh(`c.h.${h.id}.note${i}.t`, x.t)}:</b> ${cxh(`c.h.${h.id}.note${i}.x`, x.x)}</p>""")
rep("""nextBlock(`#/dars/4/amaliyot/${nx.id}`, 'hc.next', {id: nx.id, title: hTitle(nx)})""", """nextBlock(`#/dars/4/amaliyot/${nx.id}`, 'hc.next', {id: nx.id, title: HT(hTitleH(nx))})""")

# ---- slides
rep("""data-slnav="prev" href="${prev}" aria-label="${t('sl.prev')}">""", """data-slnav="prev" href="${prev}" aria-label="${esc(t('sl.prev'))}">""")
rep("""data-slnav="next" href="${next}" aria-label="${t('sl.next')}">""", """data-slnav="next" href="${next}" aria-label="${esc(t('sl.next'))}">""")
rep("""<dialog class="sheet" id="slides-sheet" aria-label="${t('sl.all')}">""", """<dialog class="sheet" id="slides-sheet" aria-label="${esc(t('sl.all'))}">""")

# ---- mount: the caption is plain text
rep("""<p class="screen-tag">${page.tag}</p>""", """<p class="screen-tag">${esc(page.tag)}</p>""")

# ---- routes
rep("setTimeout(() => flashToast(t('toast.notfound')), 50);", "setTimeout(() => flashToast('toast.notfound'), 50);")
rep("function render(){\n  closeMenu(); toast.hidden = true;", "// keep = true (language switch): same page, same place: no scroll, no focus move; setLang puts the state back\nfunction render(keep){\n  closeMenu(); toast.hidden = true;")
rep("  if (target) { const dt = target.closest('details');", "  if (keep) {}\n  else if (target) { const dt = target.closest('details');")
rep("window.addEventListener('hashchange', render);", "window.addEventListener('hashchange', () => render());")

# ---- language switch
a = s.index("function setLang(l){")
b = s.index("document.addEventListener('click', e => { const b = e.target.closest('[data-lang]');")
s = s[:a] + """// a language switch re-renders the page, so everything the student changed on screen is saved first and put back after
function langSnapshot(){
  const ae = document.activeElement, lb = ae && ae.closest && ae.closest('[data-lang]'), m = document.getElementById('nmenu'), lq = app.querySelector('#lib-q');
  return {y: scrollY, nav: lb && lb.parentElement, menu: !m.hidden && m._from && (m._from.classList.contains('menu-btn') ? '.menu-btn' : '.nav-name'),
    lib: lq && lq.value, chips: [...app.querySelectorAll('.lib-chip[aria-pressed="true"]')].map(c => c.dataset.sect), acc: [...app.querySelectorAll('.acc[aria-expanded="true"]')].map(b => b.getAttribute('aria-controls')),
    tab: [...app.querySelectorAll('.gt-tab')].findIndex(b => b.getAttribute('aria-selected') === 'true'), det: [...app.querySelectorAll('details')].map(d => d.open), sheet: !!app.querySelector('dialog[open]'),
    toast: toast.hidden ? null : undoLi ? {key: undoLi.dataset.key} : {flash: toastKey}};
}
function langRestore(st){
  if (st.lib != null) { app.querySelectorAll('.lib-chip').forEach(c => c.setAttribute('aria-pressed', st.chips.includes(c.dataset.sect))); const lq = app.querySelector('#lib-q'); lq.value = st.lib; lq.dispatchEvent(new Event('input')); }
  st.acc.forEach(id => { const b = app.querySelector(`.acc[aria-controls="${id}"]`); if (b) openAcc(b.closest('li'), true); });
  const dg = app.querySelector('#dg'); if (dg && st.tab > 0) { dg.dataset.instant = '1'; dg.querySelectorAll('.gt-tab')[st.tab]?.click(); delete dg.dataset.instant; } // instant: no out/in animation
  app.querySelectorAll('details').forEach((d, i) => { d.open = !!st.det[i]; });
  if (st.sheet) app.querySelector('dialog')?.showModal();
  scrollTo(0, st.y);
  const trig = st.menu && app.querySelector(st.menu); if (trig) openMenu(trig);
  if (st.toast?.key) { const li = app.querySelector(`li[data-key="${CSS.escape(st.toast.key)}"]`); if (li) showToast(li); } else if (st.toast?.flash) flashToast(st.toast.flash);
  st.nav?.querySelector(`[data-lang="${LANG}"]`)?.focus({preventScroll: true});
  live.textContent = ''; // an announcement made in the old language must not be read out again
}
function setLang(l){
  if (!LANGS.includes(l) || l === LANG) return;
  const st = langSnapshot();
  LANG = l; try { localStorage.setItem(LANG_KEY, l); } catch {}
  const u = new URL(location.href); if (u.searchParams.has('lang')) { u.searchParams.set('lang', l); history.replaceState(history.state, '', u); } // a ?lang link keeps saying the language on screen
  updateLangUI(); applyStatic(); okina(document.body); gateRelang();
  if (document.body.dataset.view !== 'gate' || parseHash().parts.length) render(true);
  langRestore(st);
}
""" + s[b:]
open(P, 'w', encoding='utf-8').write(s)
print('ok')
