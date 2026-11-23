/* Natija varag‘i: page logic. Needs calc.js, parse.js and examples.js loaded first. */
(function () {
  'use strict';
  var C = window.ResultsCalc, P = window.ResultsParse, EX = window.RS_EXAMPLES || {};
  var STORE = 'praktikum3-natija-varagi-v1';
  var state = P.blankState();

  var METRIC_ROWS = [
    ['B1', 'Bajarilgan so‘rovlar'], ['B2', 'O‘rtacha vaqt, daqiqa'], ['B3', 'Xato javoblar'], ['B4', 'Takroriy so‘rovlar'],
    ['B5', 'To‘liq hal qilingan'], ['B6', 'Bitimlar yoki buyurtmalar'], ['B7', 'Tekshirish vaqti, soat'], ['B14', 'Topilgan pul, so‘m'], ['B8', 'Mijoz shikoyatlari']
  ];
  var VERDICT = { V: 'Mentor tekshirdi', VC: 'Tekshirildi, izoh bilan', NV: 'Tekshirilmagan', '': 'Mentor hali tekshirmagan' };
  var CONSENT = { ism: 'ismi bilan', anonim: 'soha bo‘yicha, ismsiz', yoq: 'yo‘q', '': '-' };
  var MET = { ha: 'Bajarildi', qisman: 'Qisman', yoq: 'Bajarilmadi', '': 'Belgilanmagan' };

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s === undefined || s === null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function isNum(v) { return C.isNum(v); }
  function numIn(v) { return isNum(v) ? C.fmt(v, v % 1 ? 2 : 0) : ''; }
  function get(path) { return path.split('.').reduce(function (o, k) { return o === undefined || o === null ? undefined : o[k]; }, state); }
  function set(path, val) {
    var ks = path.split('.'), o = state;
    for (var i = 0; i < ks.length - 1; i++) { if (o[ks[i]] === undefined || o[ks[i]] === null) o[ks[i]] = {}; o = o[ks[i]]; }
    o[ks[ks.length - 1]] = val;
  }

  /* ---------- storage (per-viewer convenience only) ---------- */
  function save() { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) { /* private mode */ } }
  function restore() {
    try { var raw = localStorage.getItem(STORE); if (raw) { var s = JSON.parse(raw); if (s && s.weeks) state = Object.assign(P.blankState(), s); } } catch (e) { /* ignore */ }
  }

  /* ---------- messages ---------- */
  function showMessages(list, title) {
    var box = $('msgs');
    if (!list || !list.length) { box.innerHTML = ''; return; }
    box.innerHTML = '<div class="msg" role="status"><b>' + esc(title || 'Fayl o‘qildi') + '</b><ul>' + list.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ul></div>';
  }

  /* ---------- examples ---------- */
  function deepAssign(target, src) {
    Object.keys(src || {}).forEach(function (k) {
      var v = src[k];
      if (v && typeof v === 'object' && !Array.isArray(v) && target[k] && typeof target[k] === 'object') deepAssign(target[k], v);
      else target[k] = v;
    });
  }
  var BACKUP = STORE + '-zaxira';
  function hasOwnData(st) {
    if (!st || (st.fromExample && st.pristine)) return false;
    var m = st.meta || {};
    if (m.company || m.process) return true;
    if ((st.money || []).length) return true;
    return (st.weeks || []).some(function (w) { return C.METRICS.some(function (k) { return isNum(w[k]); }); });
  }
  function backupOwn() { try { localStorage.setItem(BACKUP, JSON.stringify(state)); } catch (e) { /* ignore */ } }
  function hasBackup() { try { return !!localStorage.getItem(BACKUP); } catch (e) { return false; } }
  function restoreBackup() {
    try { var raw = localStorage.getItem(BACKUP); if (raw) { state = Object.assign(P.blankState(), JSON.parse(raw)); renderForm(); update(); showMessages(['Zaxiradagi o‘z ma’lumotingiz qaytarildi.'], 'Zaxira'); } } catch (e) { /* ignore */ }
  }
  function loadExample(key, silent) {
    var ex = EX[key];
    if (!ex) return;
    if (hasOwnData(state)) {
      if (!silent && !window.confirm('Namuna ochilsinmi? Siz kiritgan ma’lumot zaxiraga saqlanadi va «Zaxiradan tiklash» tugmasi bilan qaytariladi.')) return;
      backupOwn();
    }
    var st = P.blankState();
    ex.files.forEach(function (txt) { st = P.mergeIntoState(st, P.parseAny(txt)).state; });
    var o = JSON.parse(JSON.stringify(ex.overrides));
    var days = o.days; delete o.days;
    deepAssign(st, o);
    if (o.costs) st.costs = o.costs;
    if (days) st.weeks.forEach(function (w, i) { w.days = days[i] === undefined ? w.days : days[i]; });
    st.fromExample = key; st.pristine = true;
    state = st;
    renderForm(); update();
    showMessages(key === 'baraka'
      ? ['«Baraka Office» namunasi ochildi: To‘plam 5 fayllari (numbers.md, plan.md) va ish kunlari. Natijani A4 varaqda o‘qing (kompyuterda o‘ngda, telefonda pastda); qo‘llanmaning 6-bo‘limi uni qanday o‘qishni tushuntiradi.'].concat(hasBackup() ? ['O‘z ma’lumotingiz bo‘lsa, u zaxirada: «Zaxiradan tiklash».'] : [])
      : ['Yomon namuna ochildi: boshlang‘ich raqamsiz natija. Varaqdagi qizil ogohlantirishni va «Tekshirilmagan» belgisini ko‘ring. Nima xatoligi qo‘llanmaning 8-bo‘limida.'], 'Namuna');
  }

  /* ---------- files ---------- */
  function loadTexts(texts) {
    var msgs = [];
    if (state.fromExample) {
      if (!state.pristine) backupOwn();
      state = P.blankState();
      msgs.push('Namuna yopildi: fayllaringiz bo‘sh varaqqa o‘qildi' + (hasBackup() ? '; namunaga kiritgan o‘zgarishlaringiz zaxirada.' : '.'));
    }
    texts.forEach(function (t) {
      var res = P.mergeIntoState(state, P.parseAny(t.text));
      state = res.state;
      msgs.push(t.name + ':');
      res.messages.forEach(function (m) { msgs.push(m); });
    });
    renderForm(); update();
    showMessages(msgs, 'Fayl o‘qildi');
  }
  function readFiles(fileList) {
    var files = Array.prototype.slice.call(fileList || []);
    if (!files.length) return;
    var out = [], left = files.length;
    files.forEach(function (f, i) {
      var rd = new FileReader();
      rd.onload = function () { out[i] = { name: f.name, text: String(rd.result || '') }; if (--left === 0) loadTexts(out); };
      rd.onerror = function () { out[i] = { name: f.name, text: '' }; if (--left === 0) loadTexts(out); };
      rd.readAsText(f, 'utf-8');
    });
  }

  /* ---------- form ---------- */
  function field(path, label, opts) {
    opts = opts || {};
    var v = get(path);
    var cls = 'f' + (opts.wide ? ' wide' : '');
    if (opts.area) return '<label class="' + cls + '">' + esc(label) + '<textarea data-path="' + path + '" rows="' + (opts.rows || 2) + '" placeholder="' + esc(opts.ph || '') + '">' + esc(v) + '</textarea></label>';
    if (opts.select) {
      return '<label class="' + cls + '">' + esc(label) + '<select data-path="' + path + '">' + opts.select.map(function (o) {
        return '<option value="' + esc(o[0]) + '"' + (String(v || '') === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
      }).join('') + '</select></label>';
    }
    if (opts.num) return '<label class="' + cls + '">' + esc(label) + '<input type="text" inputmode="decimal" class="num" data-num="1"' + (opts.money ? ' data-money="1"' : '') + ' data-path="' + path + '" value="' + esc(numIn(v)) + '" placeholder="' + esc(opts.ph || '') + '"></label>';
    return '<label class="' + cls + '">' + esc(label) + '<input type="text" data-path="' + path + '" value="' + esc(v) + '" placeholder="' + esc(opts.ph || '') + '"></label>';
  }

  function metricsTable() {
    var weeks = state.weeks;
    var head = '<tr><th>Ko‘rsatkich</th>' + weeks.map(function (w, i) {
      return '<th class="c">' + esc(i === 0 ? 'Agentgacha' : (w.label || (i + '-hafta'))) + (i > 2 && i === weeks.length - 1 ? ' <button class="x" title="Haftani olib tashlash" data-act="delweek">×</button>' : '') + '</th>';
    }).join('') + '</tr>';
    var days = '<tr class="days"><td class="lbl">Ish kunlari</td>' + weeks.map(function (w, i) {
      return '<td><input type="text" inputmode="numeric" class="num' + (isNum(w.days) ? '' : ' empty-need') + '" data-num="1" data-path="weeks.' + i + '.days" value="' + esc(numIn(w.days)) + '" placeholder="6" aria-label="Ish kunlari, ' + esc(w.label) + '"></td>';
    }).join('') + '</tr>';
    var rows = METRIC_ROWS.map(function (m) {
      return '<tr><td class="lbl"><code>' + m[0].replace('B', 'B.') + '</code>' + esc(m[1]) + '</td>' + weeks.map(function (w, i) {
        return '<td><input type="text" inputmode="decimal" class="num" data-num="1"' + (m[0] === 'B14' ? ' data-money="1"' : '') + ' data-path="weeks.' + i + '.' + m[0] + '" value="' + esc(numIn(w[m[0]])) + '" aria-label="' + esc(m[1] + ', ' + (w.label || '')) + '"></td>';
      }).join('') + '</tr>';
    }).join('');
    return '<div class="mtable-wrap"><table class="mt"><colgroup><col class="lblc">' + weeks.map(function () { return '<col>'; }).join('') + '</colgroup>' + head + days + rows + '</table></div>';
  }

  function listRows(kind) {
    return (state.costs[kind] || []).map(function (c, i) {
      return '<div class="li"><input type="text" data-path="costs.' + kind + '.' + i + '.name" value="' + esc(c.name) + '" aria-label="Nomi">' +
        '<input type="text" inputmode="numeric" class="num" data-num="1" data-money="1" data-path="costs.' + kind + '.' + i + '.amount" value="' + esc(numIn(c.amount)) + '" placeholder="so‘m" aria-label="So‘m">' +
        '<button class="x" data-act="del" data-list="costs.' + kind + '" data-i="' + i + '" title="O‘chirish">×</button></div>';
    }).join('');
  }

  function moneyRows() {
    return (state.money || []).map(function (m, i) {
      var p = 'money.' + i;
      return '<div class="money-li">' +
        '<label class="f">Sana<input type="text" data-path="' + p + '.date" value="' + esc(m.date) + '" placeholder="2026-12-23"></label>' +
        '<label class="f what">Nima bo‘ldi<input type="text" data-path="' + p + '.what" value="' + esc(m.what) + '"></label>' +
        '<label class="f">Summa, so‘m<input type="text" inputmode="numeric" class="num" data-num="1" data-money="1" data-path="' + p + '.amount" value="' + esc(numIn(m.amount)) + '"></label>' +
        '<label class="f full">Qanday hisobladik va manbasi (hujjat, kim tasdiqladi)<input type="text" data-path="' + p + '.how" value="' + esc(m.how) + '"></label>' +
        '<div class="foot"><label class="check"><input type="checkbox" data-path="' + p + '.proven" data-bool="1"' + (m.proven ? ' checked' : '') + '> Isbotlangan (manbasi bor)</label>' +
        '<button class="x" data-act="del" data-list="money" data-i="' + i + '" title="O‘chirish">×</button></div></div>';
    }).join('');
  }

  function renderForm() {
    var dec = state.decision || {};
    $('form').innerHTML =
      '<details class="box" open><summary>1. To‘plam 5 faylini oching <small>yoki qo‘lda to‘ldiring</small></summary><div class="box-body">' +
        '<div class="drop" id="drop">Fayllarni shu yerga tashlang yoki <label for="file-in">kompyuterdan tanlang</label>: <code>kit5-pilot/numbers.md</code> va <code>plan.md</code>.<br><span class="hint">Bot yuborgan haftalik fayl (<code>kit5-raqamlar-….md</code>) ham bo‘ladi.</span></div>' +
        '<details><summary class="hint" style="cursor:pointer">Fayl ochilmasa: matnni nusxalab shu yerga qo‘ying</summary><div style="display:flex;flex-direction:column;gap:8px;margin-top:8px"><textarea id="paste" rows="4" placeholder="numbers.md ichidagi hamma matn"></textarea><div class="row-actions"><button class="btn small" data-act="paste">Matndan o‘qish</button></div></div></details>' +
      '</div></details>' +

      '<details class="box" open><summary>2. Kompaniya va sinov</summary><div class="box-body"><div class="grid2">' +
        field('meta.company', 'Kompaniya') + field('meta.process', 'Jarayon (To‘plam 2, B.1)') +
        field('meta.agent', 'Agent yoki vosita') + field('meta.pilotLead', 'Loyiha yetakchisi (xodim)') +
        field('meta.department', 'Bo‘lim va boshlig‘i') + field('meta.date', 'Sana', { ph: '27.12.2026' }) +
        field('meta.baselinePeriod', 'Agentgacha davr (qayerdan)', { ph: '02.11-28.11, Telegram tarixi' }) + field('meta.pilotPeriod', 'Sinov davri', { ph: '14.12-26.12' }) +
      '</div></div></details>' +

      '<details class="box" open><summary>3. Raqamlar <small>To‘plam 5 B, haftasiga</small></summary><div class="box-body">' +
        '<p class="hint">Har bir raqam bitta haftaniki. B.2 - bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz; tekshirish B.7 da, butun vazifa uchun soatda. Bilmagan katakni bo‘sh qoldiring.</p>' +
        metricsTable() +
        '<div class="row-actions"><button class="btn small" data-act="addweek"' + (state.weeks.length >= 5 ? ' disabled' : '') + '>+ hafta qo‘shish</button></div>' +
      '</div></details>' +

      '<details class="box" open><summary>4. Pul <small>soatbay haq, xarajat, topilgan pul</small></summary><div class="box-body">' +
        '<div class="grid2">' + field('rate.work', 'Soatbay haq, so‘m (ishni bajaradiganlar)', { num: true, money: true, ph: '35 700' }) + field('rate.check', 'Tekshiruvchi soatbay haqi (boshqa bo‘lsa)', { num: true, money: true, ph: 'bo‘sh: o‘sha' }) + '</div>' +
        '<p class="hint">Soatbay haq = oylik oklad / oyiga ish soati (masalan, Baraka menejeri: 4 500 000 / 200 = 22 500). Tekshiruvchi boshqa odam bo‘lsa, uning haqini alohida yozing. Buxgalterdan oling.</p>' +
        '<b style="font-size:14px">Oylik xarajat (vosita ishlab turishi uchun, so‘m/oy)</b><div class="list">' + listRows('monthly') + '</div>' +
        '<div class="row-actions"><button class="btn small" data-act="add" data-list="costs.monthly">+ oylik xarajat</button></div>' +
        '<b style="font-size:14px">Bir martalik sozlash (B.10), so‘m</b><div class="list">' + listRows('setup') + '</div>' +
        '<div class="row-actions"><button class="btn small" data-act="add" data-list="costs.setup">+ sozlash xarajati</button></div>' +
        '<b style="font-size:14px">Topilgan pul (B.14): har bir holat alohida</b>' +
        '<p class="hint">Oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul. Manbasi yozilmagan summa hisobga olinmaydi.</p>' +
        '<div class="list">' + moneyRows() + '</div>' +
        '<div class="row-actions"><button class="btn small" data-act="add" data-list="money">+ holat qo‘shish</button></div>' +
      '</div></details>' +

      '<details class="box" open><summary>5. Qaror</summary><div class="box-body">' +
        field('criteria.success', 'Muvaffaqiyat mezoni (To‘plam 5, A.6)', { area: true, wide: true }) +
        '<div class="grid2">' + field('criteria.successMet', 'Mezon bajarildimi?', { select: [['', 'tanlang'], ['ha', 'Ha'], ['qisman', 'Qisman'], ['yoq', 'Yo‘q']] }) +
        field('criteria.stopHit', 'To‘xtatish sharti yuz berdimi?', { select: [['', 'tanlang'], ['yoq', 'Yo‘q'], ['ha', 'Ha']] }) + '</div>' +
        field('criteria.stop', 'To‘xtatish sharti (A.7)', { area: true, wide: true }) +
        '<div class="radios" role="radiogroup" aria-label="Qaror">' + [['davom', 'Davom etish'], ['ozgartirish', 'O‘zgartirish'], ['toxtatish', 'To‘xtatish']].map(function (o) {
          return '<label><input type="radio" name="dec" data-path="decision.choice" value="' + o[0] + '"' + (dec.choice === o[0] ? ' checked' : '') + '> ' + o[1] + '</label>';
        }).join('') + '</div>' +
        field('decision.reason', 'Sababi, bitta gapda', { area: true, wide: true }) +
        field('notes.notProven', 'Hali isbotlanmagan narsalar', { area: true, wide: true }) +
        field('notes.otherChanges', 'Shu haftalarda yana nima o‘zgardi (mavsum, yangi xodim, narx)', { area: true, wide: true }) +
      '</div></details>' +

      '<details class="box"><summary>6. Keyingi qadam va imzo</summary><div class="box-body"><div class="grid2">' +
        field('next.process', 'Keyingi jarayon (To‘plam 2 matritsasidan)', { wide: true }) +
        field('next.interviewees', 'To‘plam 1 suhbatdoshlari', { wide: true }) +
        field('next.start', 'Qachon boshlanadi') + field('next.review', 'Keyingi tekshiruv') +
        field('signoff.owner', 'Egasi') + field('signoff.pilotLead', 'Loyiha yetakchisi (raqamlarga rozi)') +
        field('signoff.mentor', 'Mentor') + field('signoff.date', 'Mentor tekshirgan sana') +
        field('signoff.verdict', 'Mentor xulosasi', { select: [['', 'hali tekshirilmagan'], ['V', 'Tekshirildi'], ['VC', 'Tekshirildi, izoh bilan'], ['NV', 'Tekshirilmagan']] }) +
        field('signoff.consent', 'Natijani kursda ko‘rsatishga rozilik', { select: [['', 'tanlang'], ['ism', 'Ismi bilan'], ['anonim', 'Soha bo‘yicha, ismsiz'], ['yoq', 'Yo‘q']] }) +
      '</div></div></details>' +

      '<details class="box"><summary>7. Ko‘rinish</summary><div class="box-body">' +
        '<label class="check"><input type="checkbox" data-path="stageMode" data-bool="1"' + (state.stageMode ? ' checked' : '') + '> Sahna rejimi: so‘m summalari va xodim ismi yashiriladi (zalda raqobatchi bo‘lishi mumkin)</label>' +
        '<label class="check"><input type="checkbox" data-path="course.on" data-bool="1"' + (state.course && state.course.on ? ' checked' : '') + '> Kurs to‘lovi qancha vaqtda qoplanishini ham ko‘rsatish (faqat o‘zingiz uchun)</label>' +
        '<div class="grid2">' + field('course.price', 'Kurs narxi, so‘m', { num: true, money: true }) + field('course.months', 'Necha oyda qoplansin', { num: true }) + '</div>' +
      '</div></details>' +

      '<div class="box" style="background:var(--panel);border:1px solid var(--rule);border-radius:10px;padding:14px 18px"><b style="font-size:15px">Tekshiruv</b><div class="warnlist" id="warnlist" style="margin-top:8px"></div></div>';
    bindDrop();
  }

  /* ---------- sheet ---------- */
  function cell(v, d) { return isNum(v) ? C.fmt(C.round(v, d === undefined ? 1 : d), d === undefined ? 1 : d) : '-'; }
  function chg(base, last, d, betterDown, noPct) {
    if (!isNum(base) || !isNum(last)) return '<td class="chg">-</td>';
    var abs = last - base, p = base !== 0 && !noPct ? ' (' + C.signed(C.round(abs / base * 100, 0), 0) + '%)' : '';
    var good = abs === 0 ? '' : ((abs < 0) === !!betterDown ? ' good' : ' bad');
    if (betterDown === null) good = '';
    return '<td class="chg' + good + '">' + C.signed(C.round(abs, d === undefined ? 1 : d), d === undefined ? 1 : d) + p + '</td>';
  }

  function numbersTable(r) {
    var weeks = state.weeks.filter(function (w, i) { return i === 0 || r.pilot.indexOf(w) >= 0; });
    var idx = weeks.map(function (w) { return state.weeks.indexOf(w); });
    var base = state.weeks[0], last = r.last;
    var th = '<tr><th></th>' + weeks.map(function (w, i) { return '<th>' + esc(i === 0 ? 'Agentgacha' : w.label) + '</th>'; }).join('') + '<th>O‘zgarish</th></tr>';
    function row(label, code, fn, d, betterDown, cls, noPct) {
      var vals = weeks.map(function (w, k) { return fn(w, idx[k]); });
      return '<tr' + (cls ? ' class="' + cls + '"' : '') + '><td>' + (code ? '<code>' + code + '</code> ' : '') + esc(label) + '</td>' +
        vals.map(function (v) { return '<td>' + cell(v, d) + '</td>'; }).join('') +
        (last ? chg(vals[0], vals[vals.length - 1], d, betterDown, noPct) : '<td>-</td>') + '</tr>';
    }
    var hide = state.stageMode;
    var rows = [
      row('So‘rovlar, haftasiga', 'B.1', function (w) { return w.B1; }, 0, null),
      r.perDay.some(isNum) ? row('kuniga', '', function (w, i) { return r.perDay[i]; }, 1, null, 'sub') : '',
      row('Vaqt, daqiqa/so‘rov', 'B.2', function (w) { return w.B2; }, 1, true),
      row('Xato javoblar', 'B.3', function (w) { return w.B3; }, 0, true),
      row('ulushi, %', '', function (w, i) { return r.errorRate[i]; }, 1, true, 'sub', true),
      row('Takroriy so‘rovlar', 'B.4', function (w) { return w.B4; }, 0, true),
      row('To‘liq hal qilingan', 'B.5', function (w) { return w.B5; }, 0, false),
      state.weeks.some(function (w) { return isNum(w.B6); }) ? row('Bitimlar', 'B.6', function (w) { return w.B6; }, 0, false) : '',
      row('Tekshirish, soat', 'B.7', function (w) { return w.B7; }, 1, null),
      row('Mijoz shikoyatlari', 'B.8', function (w) { return w.B8; }, 0, true),
      hide ? '' : row('Topilgan pul, so‘m', 'B.14', function (w) { return w.B14; }, 0, false)
    ].join('');
    var b15 = '<tr class="key"><td><code>B.15</code> Tejalgan vaqt, soat</td>' + weeks.map(function (w, k) { return '<td>' + (k === 0 ? '' : cell(r.b15[idx[k]], 1)) + '</td>'; }).join('') + '<td></td></tr>';
    return '<table class="st">' + th + rows + b15 + '</table>';
  }

  function bridge(r) {
    var items = [
      { lab: 'Topilgan pul, oyiga taxmin', sub: r.pilotWeeks + ' haftada isbotlangan ' + C.som(r.moneyProvenTotal, true) + ' so‘m ÷ ' + r.pilotWeeks + ' × 4,3', v: r.moneyMonthly, cls: '' },
      { lab: 'Vosita xarajati (obunalar)', sub: 'server, model, obuna', v: -r.monthlyRun, cls: 'neg' },
      { lab: 'Pul hisobida natija (taxmin)', sub: '', v: r.hardNetMonthly, cls: 'tot' + (r.hardNetMonthly < 0 ? ' neg' : '') },
      { lab: 'Tejalgan vaqt qiymati (shartli)', sub: isNum(r.b15Last) && r.rateWork ? C.fmt(C.round(r.b15Last, 1), 1) + ' soat × ' + C.som(r.rateWork, true) + ' × 4,3; naqd pul emas' : 'soatbay haq yoki B.15 yo‘q', v: r.timeValueMonthly, cls: 'cond' },
      { lab: 'Vaqt bilan birga (taxmin)', sub: '', v: r.totalMonthly, cls: 'tot' + (r.totalMonthly < 0 ? ' neg' : '') }
    ];
    var max = Math.max.apply(null, items.map(function (i) { return isNum(i.v) ? Math.abs(i.v) : 0; }).concat([1]));
    var html = items.map(function (i) {
      var w = isNum(i.v) ? Math.max(1.5, Math.abs(i.v) / max * 100) : 0;
      var cls = i.cls + (isNum(i.v) && Math.round(i.v) === 0 ? ' zero' : '');
      return '<div class="br ' + cls + '"><div class="lab"><span>' + esc(i.lab) + (i.sub ? ' <span class="muted">· ' + esc(i.sub) + '</span>' : '') + '</span><div class="bar"><i style="width:' + w.toFixed(1) + '%"></i></div></div>' +
        '<div class="val">' + (isNum(i.v) ? (i.v > 0 ? '+' : '') + C.som(i.v) : '-') + '</div></div>';
    }).join('');
    var pay;
    if (!(r.B10 > 0)) pay = 'Sozlash xarajati (B.10) yozilmagan.';
    else if (isNum(r.paybackHard)) pay = 'Sozlash (' + C.som(r.B10, true) + ' so‘m) <b>' + C.fmt(C.round(r.paybackHard, 1), 1) + ' oyda</b> qoplanadi, faqat pul hisobida (taxmin)' + (isNum(r.paybackTotal) ? '; vaqt bilan ' + C.fmt(C.round(r.paybackTotal, 1), 1) + ' oyda (shartli).' : '.');
    else if (isNum(r.paybackTotal)) pay = 'Pul hisobida sozlash (' + C.som(r.B10, true) + ' so‘m) <b>qoplanmaydi</b>; tejalgan vaqt bilan ' + C.fmt(C.round(r.paybackTotal, 1), 1) + ' oyda (shartli: vaqt boshqa ishga ketsa).';
    else pay = 'Sozlash (' + C.som(r.B10, true) + ' so‘m) <b>qoplanmaydi</b>: oylik xarajat natijadan katta.';
    var course = '';
    if (isNum(r.courseBar)) {
      course = '<div class="note">Kurs to‘lovi: ' + C.som(state.course.price, true) + ' / ' + C.fmt(state.course.months || 12) + ' oy = oyiga ' + C.som(r.courseBar) + ' so‘m kerak; hozirgi natija uning ' + C.fmt(C.round(Math.max(0, r.courseCoverage) * 100, 0)) + '% ini qoplaydi' + (isNum(r.coursePayback) ? ' (to‘liq ' + C.fmt(C.round(r.coursePayback, 1), 1) + ' oyda)' : '') + '.</div>';
    }
    return '<div class="bridge">' + html + '</div><div class="pay">' + pay + '</div>' + course;
  }

  function costs(r) {
    return '<table class="st">' +
      '<tr><td><code>B.9</code> Obuna, sinov davrida</td><td>' + C.som(r.B9, true) + '</td></tr>' +
      '<tr class="sub"><td>oyiga</td><td>' + C.som(r.monthlyRun, true) + '</td></tr>' +
      '<tr><td><code>B.10</code> Sozlash, bir martalik</td><td>' + C.som(r.B10, true) + '</td></tr>' +
      '<tr><td><code>B.11</code> Tekshirish: ' + C.fmt(C.round(r.sumB7, 1), 1) + ' soat × ' + (r.rateCheck ? C.som(r.rateCheck, true) : '-') + '</td><td>' + C.som(r.B11, true) + '</td></tr>' +
      '<tr class="key"><td><code>B.12</code> Jami</td><td>' + C.som(r.B12, true) + '</td></tr>' +
      '<tr><td><code>B.16</code> Bitta bajarilgan ish: agent</td><td>' + C.som(r.B16agent, true) + '</td></tr>' +
      '<tr class="sub"><td>agent, sozlashsiz</td><td>' + C.som(r.B16agentRun, true) + '</td></tr>' +
      '<tr><td><code>B.16</code> inson (agentgacha)</td><td>' + C.som(r.B16human, true) + '</td></tr>' +
      '</table>';
  }

  function decision(r) {
    var d = state.decision || {}, cr = state.criteria || {};
    var boxes = [['davom', 'Davom etish'], ['ozgartirish', 'O‘zgartirish'], ['toxtatish', 'To‘xtatish']].map(function (o) {
      return '<span class="' + (d.choice === o[0] ? 'on' : '') + '"><i></i>' + o[1] + '</span>';
    }).join('');
    var met = cr.successMet || '', hit = cr.stopHit || '';
    return '<div class="dec">' + boxes + '</div>' +
      '<div class="reason">' + (d.reason ? esc(d.reason) : '<span class="muted">Sababi yozilmagan.</span>') + '</div>' +
      '<div class="crit"><div><b>Muvaffaqiyat mezoni (A.6):</b> ' + (cr.success ? esc(oneLine(cr.success)) : '<span class="muted">yozilmagan</span>') + '</div><span class="pill ' + (met || 'none') + '">' + MET[met] + '</span>' +
      '<div><b>To‘xtatish sharti (A.7):</b> ' + (cr.stop ? esc(oneLine(cr.stop)) : '<span class="muted">yozilmagan</span>') + '</div><span class="pill ' + (hit === 'ha' ? 'stop-bad' : (hit === 'yoq' ? 'stop-ok' : 'none')) + '">' + (hit === 'ha' ? 'Yuz berdi' : (hit === 'yoq' ? 'Yuz bermadi' : 'Belgilanmagan')) + '</span></div>';
  }
  function cap(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
  function oneLine(s) { return String(s).replace(/^\s*-\s*/gm, '').replace(/\s*\n\s*/g, '; ').replace(/;\s*;/g, ';'); }

  function kpis(r) {
    var hide = state.stageMode, base = state.weeks[0] || {}, last = r.last || {};
    var t1 = '<div class="kpi ' + (!isNum(r.b15Last) ? '' : (r.b15Last < 0 ? 'warn' : 'ok')) + '"><div class="k">Tejalgan vaqt</div><div class="v">' + cell(r.b15Last, 1) + ' <small>soat/hafta</small></div><div class="d">' +
      (isNum(r.b15Min) && r.pilotWeeks > 1 ? 'oraliq ' + C.fmt(C.round(r.b15Min, 1), 1) + '-' + C.fmt(C.round(r.b15Max, 1), 1) + '; ' : '') + 'tekshirish ayirilgan (B.15)</div></div>';
    var t2 = hide
      ? '<div class="kpi acc"><div class="k">Topilgan pul</div><div class="v">' + r.moneyProven.length + ' <small>ta holat</small></div><div class="d">summa sahnada ko‘rsatilmaydi</div></div>'
      : '<div class="kpi acc"><div class="k">Topilgan pul</div><div class="v">' + C.som(r.moneyProvenTotal, true) + ' <small>so‘m</small></div><div class="d">' + r.moneyProven.length + ' ta hujjatli holat, ' + r.pilotWeeks + ' haftada' + (r.moneyUnprovenTotal > 0 ? '; ' + C.mln(r.moneyUnprovenTotal) + ' isbotlanmagan, qo‘shilmadi' : '') + '</div></div>';
    var t3 = '<div class="kpi ' + (!(isNum(r.errorRateLast) && isNum(r.errorRateBase)) ? '' : (r.errorRateLast > r.errorRateBase ? 'warn' : 'ok')) + '"><div class="k">Xato javoblar ulushi</div><div class="v">' + C.pct(r.errorRateBase) + ' <small>→</small> ' + C.pct(r.errorRateLast) + '</div><div class="d">B.3 / B.1, agentgacha va oxirgi hafta</div></div>';
    var t4;
    if (hide) t4 = '<div class="kpi"><div class="k">Bitta so‘rov vaqti</div><div class="v">' + cell(base.B2, 1) + ' <small>→</small> ' + cell(last.B2, 1) + ' <small>daq</small></div><div class="d">odam vaqti, tekshirishsiz (B.2)</div></div>';
    else if (isNum(r.paybackHard)) t4 = '<div class="kpi"><div class="k">Sozlash qoplanadi</div><div class="v">' + C.fmt(C.round(r.paybackHard, 1), 1) + ' <small>oyda</small></div><div class="d">pul hisobida, taxmin; oyiga ' + (r.hardNetMonthly > 0 ? '+' : '') + C.mln(r.hardNetMonthly) + ' so‘m</div></div>';
    else if (isNum(r.paybackTotal)) t4 = '<div class="kpi amber"><div class="k">Sozlash qoplanadi</div><div class="v">' + C.fmt(C.round(r.paybackTotal, 1), 1) + ' <small>oyda</small></div><div class="d">faqat tejalgan vaqt bilan (shartli); pul hisobida qoplanmaydi</div></div>';
    else t4 = '<div class="kpi warn"><div class="k">Sozlash qoplanadi</div><div class="v">yo‘q</div><div class="d">' + (r.B10 > 0 ? 'oylik xarajat natijadan katta' : 'sozlash xarajati yozilmagan') + '</div></div>';
    return '<div class="s-kpis">' + t1 + t2 + t3 + t4 + '</div>';
  }

  function renderSheet(r) {
    var m = state.meta || {}, s = state.signoff || {}, n = state.next || {}, notes = state.notes || {};
    var hide = state.stageMode;
    var v = r.verdict || '';
    var stops = r.warnings.filter(function (w) { return w.level === 'stop'; });
    var lead = hide ? (m.pilotLead ? 'xodim (ismsiz)' : '') : m.pilotLead;
    var html =
      '<div class="s-head"><div><div class="s-kicker">Natija varag‘i · AI sinovi · Praktikum 3.0</div><div class="s-title">' + esc(m.company || 'Kompaniya nomi') + '</div><div class="s-sub">' + esc(m.process || 'Jarayon') + (m.agent ? ' · ' + esc(m.agent) : '') + '</div></div>' +
      '<div class="s-right"><span class="badge ' + (v || 'none') + '">' + esc(VERDICT[v] || VERDICT['']) + '</span><span class="s-date">' + esc(m.date || '') + '</span></div></div>' +
      '<div class="s-meta"><div><span>Loyiha yetakchisi</span>' + esc(lead || '-') + '</div><div><span>Bo‘lim</span>' + esc(m.department || '-') + '</div><div><span>Agentgacha davr</span>' + esc(m.baselinePeriod || '-') + '</div><div><span>Sinov davri</span>' + esc(m.pilotPeriod || '-') +
        (r.pilotWeeks ? ' · ' + r.pilotWeeks + ' hafta' : '') + '</div></div>' +
      stops.map(function (w) { return '<div class="s-alert">' + esc(w.text) + '</div>'; }).join('') +
      '<div class="s-answer">' + esc(cap(r.answer)) + '</div>' +
      kpis(r) +
      '<div class="s-row r1"><div class="sec"><h4>Oldin va keyin <em>To‘plam 5 B, haftasiga</em></h4>' + numbersTable(r) + '</div>' +
        '<div class="sec"><h4>' + (hide ? 'Vaqt' : 'Oyiga pul hisobi') + ' <em>' + (hide ? 'sahna rejimi' : '× 4,3') + '</em></h4>' +
        (hide ? '<div class="txt">Sahna rejimi: so‘m summalari yashirilgan. Agentgacha ' + cell(r.hoursBase, 1) + ' soat/hafta, oxirgi haftada ' + cell(r.hoursLast, 1) + ' soat (tekshirish bilan).</div>' : bridge(r)) + '</div></div>' +
      '<div class="s-row r2"><div class="sec"><h4>Qaror <em>muvaffaqiyat va to‘xtatish sharti bilan</em></h4>' + decision(r) + '</div>' +
        '<div class="sec"><h4>Sinov xarajati <em>so‘m</em></h4>' + (hide ? '<div class="txt">Sahna rejimida ko‘rsatilmaydi.</div>' : costs(r)) + '</div></div>' +
      '<div class="s-row r3">' +
        '<div class="sec"><h4>Hali isbotlanmagan</h4><div class="txt">' + (notes.notProven ? esc(notes.notProven) : '<span class="muted">yozilmagan</span>') + '</div></div>' +
        '<div class="sec"><h4>Yana nima o‘zgardi</h4><div class="txt">' + (notes.otherChanges ? esc(notes.otherChanges) : '<span class="muted">yozilmagan</span>') +
          (isNum(r.volumeRatio) ? '\nHajm kuniga: ' + C.fmt(C.round(r.volumeRatio, 2), 2) + ' baravar' : '') + (isNum(state.errorsLogged) ? '\nXatolar jurnali: ' + state.errorsLogged + ' yozuv' : '') + '</div></div>' +
        '<div class="sec"><h4>Keyingi qadam</h4><div class="txt">' + (n.process ? '<b>' + esc(n.process) + '</b>' : '<span class="muted">2-jarayon tanlanmagan</span>') + (n.interviewees ? '\nSuhbat: ' + esc(n.interviewees) : '') + (n.start ? '\n' + esc(n.start) : '') + (n.review ? '\nTekshiruv: ' + esc(n.review) : '') + '</div></div>' +
      '</div>' +
      '<div class="s-sign"><div><span>Egasi</span><div class="line">' + esc(s.owner || '') + '</div></div><div><span>Loyiha yetakchisi (rozi)</span><div class="line">' + esc(hide ? '' : (s.pilotLead || '')) + '</div></div>' +
        '<div><span>Mentor · sana</span><div class="line">' + esc([s.mentor, s.date].filter(Boolean).join(' · ')) + '</div></div><div><span>Ko‘rsatishga rozilik</span><div class="line">' + esc(CONSENT[s.consent || '']) + '</div></div></div>' +
      '<div class="s-foot"><span>Formulalar To‘plam 5 B bo‘yicha: B.15 = (B.2 agentgacha - B.2 sinovda) × B.1 / 60 - B.7; oylik = haftalik × 4,3; B.16 = B.12 / B.5 yig‘indisi. Tejalgan vaqt qiymati naqd pul emas.</span><span>Praktikum 3.0 · 6-dars</span></div>';
    $('sheet').innerHTML = html;
  }

  function renderWarnings(r) {
    var el = $('warnlist');
    if (!el) return;
    el.innerHTML = r.warnings.length ? r.warnings.map(function (w) { return '<div class="w ' + w.level + '">' + esc(w.text) + '</div>'; }).join('') : '<div class="w info">Hammasi to‘ldirilgan. Mentor bilan tekshiring va chop eting.</div>';
  }

  var timer = null;
  function update() {
    var rb = $('restore-btn'); if (rb) rb.hidden = !hasBackup();
    var r = C.compute(state);
    renderSheet(r); renderWarnings(r); fitSheet(); save();
  }
  function later() { clearTimeout(timer); timer = setTimeout(update, 120); }

  function fitSheet() {
    var wrap = document.querySelector('.paper-wrap'), sheet = $('sheet');
    if (!wrap || !sheet) return;
    var avail = wrap.parentElement.clientWidth;
    var w = sheet.offsetWidth, h = sheet.offsetHeight;
    var k = Math.min(1, avail / w);
    sheet.style.transform = 'scale(' + k + ')';
    wrap.style.width = Math.floor(w * k) + 'px';
    wrap.style.height = Math.floor(h * k) + 'px';
  }

  /* ---------- events ---------- */
  function onInput(e) {
    var el = e.target, path = el.getAttribute('data-path');
    if (!path) return;
    var val;
    if (el.getAttribute('data-bool')) val = el.checked;
    else if (el.type === 'radio') { if (!el.checked) return; val = el.value; }
    else if (el.getAttribute('data-num')) { val = P.parseNumber(el.value, { money: !!el.getAttribute('data-money') }); el.classList.toggle('empty-need', /\.days$/.test(path) && val === null); }
    else val = el.value;
    set(path, val);
    if (state.fromExample) state.pristine = false;
    later();
  }
  function onClick(e) {
    var b = e.target.closest('[data-act]');
    if (!b) return;
    var act = b.getAttribute('data-act');
    if (act === 'example') { loadExample(b.getAttribute('data-ex')); return; }
    if (act === 'print') { update(); window.print(); return; }
    if (act === 'clear') {
      if (!window.confirm('Hamma maydon tozalansinmi?')) return;
      if (hasOwnData(state)) backupOwn();
      state = P.blankState(); renderForm(); update(); showMessages(hasBackup() ? ['Tozalandi. Avvalgi ma’lumot zaxirada: «Zaxiradan tiklash».'] : []); return;
    }
    if (act === 'restore') { restoreBackup(); return; }
    if (act === 'guide') { var g = $('qollanma'); if (g) g.scrollIntoView({ behavior: 'smooth' }); return; }
    if (act === 'paste') { var t = $('paste').value; if (t.trim()) loadTexts([{ name: 'Qo‘yilgan matn', text: t }]); return; }
    if (act === 'addweek') { if (state.weeks.length < 5) state.weeks.push({ label: state.weeks.length + '-hafta', days: null }); renderForm(); update(); return; }
    if (act === 'delweek') { if (state.weeks.length > 2) state.weeks.pop(); renderForm(); update(); return; }
    if (act === 'add') {
      var list = get(b.getAttribute('data-list'));
      if (b.getAttribute('data-list') === 'money') list.push({ date: '', what: '', amount: null, how: '', proven: false });
      else list.push({ name: '', amount: null });
      renderForm(); update(); return;
    }
    if (act === 'del') { get(b.getAttribute('data-list')).splice(+b.getAttribute('data-i'), 1); renderForm(); update(); }
  }
  function bindDrop() {
    var d = $('drop');
    if (!d) return;
    ['dragenter', 'dragover'].forEach(function (ev) { d.addEventListener(ev, function (e) { e.preventDefault(); d.classList.add('over'); }); });
    ['dragleave', 'drop'].forEach(function (ev) { d.addEventListener(ev, function (e) { e.preventDefault(); d.classList.remove('over'); }); });
    d.addEventListener('drop', function (e) { readFiles(e.dataTransfer && e.dataTransfer.files); });
  }

  document.addEventListener('input', onInput);
  document.addEventListener('change', onInput);
  document.addEventListener('click', onClick);
  window.addEventListener('resize', fitSheet);
  window.addEventListener('beforeprint', function () { var s = $('sheet'); if (s) s.style.transform = 'none'; });
  window.addEventListener('afterprint', fitSheet);
  $('file-in').addEventListener('change', function (e) { readFiles(e.target.files); e.target.value = ''; });
  document.addEventListener('dragover', function (e) { e.preventDefault(); });
  document.addEventListener('drop', function (e) { if (!e.target.closest('#drop')) { e.preventDefault(); readFiles(e.dataTransfer && e.dataTransfer.files); } });

  restore();
  var q = new URLSearchParams(window.location.search).get('namuna');
  if (q && EX[q]) loadExample(q, true);
  else { renderForm(); update(); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitSheet);
  window.RS_APP = { state: function () { return state; }, loadExample: loadExample, loadTexts: loadTexts, update: update };
})();
