/* Natija varag‘i (results sheet): all calculations.
   Formulas follow Kit 5 Form B exactly (kits/skills/kit5/SKILL.md, "Formulalar"):
     B.11 = sum of B.7 x hourly rate
     B.12 = B.9 + B.10 + B.11
     B.15 = (B.2 agentgacha - B.2 sinovda) x B.1 sinovda / 60 - B.7 sinovda
     B.16 agent = B.12 / sum of B.5 in the pilot weeks; inson = B.2 agentgacha / 60 x hourly rate
     monthly = weekly x 4,3; monthly comparison = B.15 x rate x 4,3 + monthly money found, against monthly cost
   Additions (no new codes): error rate = B.3 / B.1, volume per working day, payback months,
   and hard money kept apart from the time value (time is not cash).
   Used by index.html (browser global ResultsCalc) and by the node tests (module.exports). */
(function (root) {
  'use strict';

  var WEEKS_PER_MONTH = 4.3;
  var METRICS = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B14', 'B8'];
  var DECISIONS = { davom: 'Davom etish', ozgartirish: 'O‘zgartirish', toxtatish: 'To‘xtatish' };

  function isNum(v) { return typeof v === 'number' && isFinite(v); }
  function sum(list) { var s = 0; for (var i = 0; i < list.length; i++) if (isNum(list[i])) s += list[i]; return s; }
  function round(v, d) { var f = Math.pow(10, d || 0); return Math.round(v * f) / f; }

  /* ---------- Uzbek number formatting: 1 250 000 and 7,2 ---------- */
  var NB = ' ';
  function group(intStr) { return intStr.replace(/\B(?=(\d{3})+(?!\d))/g, NB); }
  function fmt(v, d) {
    if (!isNum(v)) return '-';
    d = d === undefined ? 0 : d;
    var neg = v < 0;
    var s = Math.abs(v).toFixed(d);
    var parts = s.split('.');
    var out = group(parts[0]) + (parts[1] && /[1-9]/.test(parts[1]) ? ',' + parts[1].replace(/0+$/, '') : '');
    return (neg && out !== '0' ? '-' : '') + out;
  }
  /* so'm: entered amounts exact; derived amounts rounded to 1 000 when large */
  function som(v, exact) {
    if (!isNum(v)) return '-';
    var r = exact ? Math.round(v) : (Math.abs(v) >= 100000 ? Math.round(v / 1000) * 1000 : Math.round(v / 100) * 100);
    return fmt(r, 0);
  }
  function mln(v) {
    if (!isNum(v)) return '-';
    if (Math.abs(v) >= 1e6) return fmt(round(v / 1e6, 1), 1) + NB + 'mln';
    if (Math.abs(v) >= 1e3) return fmt(Math.round(v / 1e3), 0) + NB + 'ming';
    return fmt(Math.round(v), 0);
  }
  function pct(v, d) { return isNum(v) ? fmt(round(v, d === undefined ? 1 : d), d === undefined ? 1 : d) + '%' : '-'; }
  function signed(v, d) { if (!isNum(v)) return '-'; return (v > 0 ? '+' : '') + fmt(v, d); }

  /* ---------- core ---------- */
  function hasData(w) {
    if (!w) return false;
    for (var i = 0; i < METRICS.length; i++) if (isNum(w[METRICS[i]])) return true;
    return false;
  }

  function compute(state) {
    var st = state || {};
    var weeks = st.weeks || [];
    var base = weeks[0] || {};
    var pilot = weeks.slice(1).filter(hasData);
    var last = pilot.length ? pilot[pilot.length - 1] : null;
    var r = { warnings: [], pilotWeeks: pilot.length, base: base, last: last, pilot: pilot };
    var W = function (level, text) { r.warnings.push({ level: level, text: text }); };

    var rate = st.rate || {};
    var work = isNum(rate.work) && rate.work > 0 ? rate.work : null;
    var check = isNum(rate.check) && rate.check > 0 ? rate.check : work;
    r.rateWork = work; r.rateCheck = check;

    r.baselineOk = isNum(base.B1) && isNum(base.B2);
    if (!r.baselineOk) {
      W('stop', 'Agentgacha (boshlang‘ich) raqami yo‘q: B.1 va B.2 bo‘lmasa, o‘zgarishni hisoblab bo‘lmaydi. Bu natija emas, taassurot.');
    }
    if (!pilot.length) W('stop', 'Sinov haftalarining raqami yo‘q: kamida 1-hafta ustunini to‘ldiring.');
    else if (pilot.length === 1) W('warn', 'Faqat 1 hafta raqami bor: natija oraliq emas, ishonch past.');

    /* change column: last pilot week minus baseline */
    r.change = {};
    METRICS.forEach(function (m) {
      if (last && isNum(base[m]) && isNum(last[m])) {
        var abs = last[m] - base[m];
        r.change[m] = { abs: abs, pct: base[m] !== 0 ? abs / base[m] * 100 : null };
      } else r.change[m] = null;
    });

    /* per working day and error rate */
    r.perDay = weeks.map(function (w) { return w && isNum(w.B1) && isNum(w.days) && w.days > 0 ? w.B1 / w.days : null; });
    r.errorRate = weeks.map(function (w) { return w && isNum(w.B3) && isNum(w.B1) && w.B1 > 0 ? w.B3 / w.B1 * 100 : null; });
    var lastIdx = last ? weeks.indexOf(last) : -1;
    r.errorRateBase = r.errorRate[0];
    r.errorRateLast = lastIdx >= 0 ? r.errorRate[lastIdx] : null;
    r.volumeRatio = (lastIdx >= 0 && isNum(r.perDay[0]) && isNum(r.perDay[lastIdx]) && r.perDay[0] > 0) ? r.perDay[lastIdx] / r.perDay[0] : null;
    if (isNum(r.volumeRatio) && (r.volumeRatio < 0.7 || r.volumeRatio > 1.3)) {
      W('warn', 'Ish hajmi kuniga ' + fmt(round(r.volumeRatio, 2), 2) + ' baravar o‘zgargan (me’yor 0,7-1,3): «Yana nima o‘zgardi» qatoriga sababini yozing.');
    }
    if (last && isNum(last.days) && isNum(base.days) && last.days !== base.days) {
      W('info', 'Ish kunlari soni har xil (' + fmt(base.days) + ' va ' + fmt(last.days) + '): hajmni «kuniga» qatoridan solishtiring.');
    }

    /* B.15 saved time per pilot week */
    var missingB7 = false;
    r.b15 = weeks.map(function (w, i) {
      if (i === 0 || !hasData(w) || !isNum(base.B2) || !isNum(w.B2) || !isNum(w.B1)) return null;
      if (!isNum(w.B7)) missingB7 = true;
      return (base.B2 - w.B2) * w.B1 / 60 - (isNum(w.B7) ? w.B7 : 0);
    });
    if (missingB7) W('warn', 'B.7 (tekshirish soati) yozilmagan hafta bor: tejalgan vaqt bo‘rttirilgan bo‘lishi mumkin.');
    var b15s = r.b15.filter(isNum);
    r.b15Last = lastIdx >= 0 && isNum(r.b15[lastIdx]) ? r.b15[lastIdx] : null;
    r.b15Min = b15s.length ? Math.min.apply(null, b15s) : null;
    r.b15Max = b15s.length ? Math.max.apply(null, b15s) : null;
    if (isNum(r.b15Last) && r.b15Last < 0) W('warn', 'Tejalgan vaqt manfiy: tekshirish tejalgan daqiqalardan ko‘p vaqt olyapti. Bu halol natija, yashirmang.');

    r.hoursBase = isNum(base.B2) && isNum(base.B1) ? base.B2 * base.B1 / 60 : null;
    r.hoursLast = last && isNum(last.B2) && isNum(last.B1) ? last.B2 * last.B1 / 60 + (isNum(last.B7) ? last.B7 : 0) : null;

    /* costs */
    var costs = st.costs || {};
    var monthlyLines = (costs.monthly || []).filter(function (c) { return c && isNum(c.amount); });
    var setupLines = (costs.setup || []).filter(function (c) { return c && isNum(c.amount); });
    r.monthlyRun = sum(monthlyLines.map(function (c) { return c.amount; }));
    r.B10 = sum(setupLines.map(function (c) { return c.amount; }));
    r.B9 = r.monthlyRun * pilot.length / WEEKS_PER_MONTH;
    r.sumB7 = sum(pilot.map(function (w) { return w.B7; }));
    r.B11 = check ? r.sumB7 * check : null;
    r.B12 = isNum(r.B11) ? r.B9 + r.B10 + r.B11 : null;
    r.sumB5 = sum(pilot.map(function (w) { return w.B5; }));
    r.B16agent = isNum(r.B12) && r.sumB5 > 0 ? r.B12 / r.sumB5 : null;
    r.B16agentRun = isNum(r.B11) && r.sumB5 > 0 ? (r.B9 + r.B11) / r.sumB5 : null;
    r.B16human = isNum(base.B2) && work ? base.B2 / 60 * work : null;
    if (!work) W('warn', 'Soatbay haq yozilmagan: vaqtni so‘mga aylantirib bo‘lmaydi (oklad / oylik ish soati).');
    var small = [];
    if (work && work < 1000) small.push('soatbay haq');
    if (rate.check && rate.check < 1000) small.push('tekshiruvchi haqi');
    ((st.costs || {}).monthly || []).concat((st.costs || {}).setup || []).forEach(function (c) { if (c && isNum(c.amount) && c.amount > 0 && c.amount < 1000) small.push(c.name || 'xarajat'); });
    (st.money || []).forEach(function (e) { if (e && isNum(e.amount) && e.amount > 0 && e.amount < 1000) small.push('topilgan pul (' + (e.date || 'sana yo‘q') + ')'); });
    if (small.length) W('warn', 'Juda kichik so‘m summasi: ' + small.join(', ') + '. «680,000» kabi yozilganmi? Mingliklarni bo‘sh joy bilan yozing: 680 000.');
    if (!monthlyLines.length) W('warn', 'Oylik xarajat yozilmagan (server, model, obuna): vositaning narxi ko‘rinmaydi.');

    /* money found (B.14) */
    var entries = (st.money || []).filter(function (e) { return e && isNum(e.amount) && e.amount !== 0; });
    var proven = entries.filter(function (e) { return e.proven && String(e.how || '').trim().length > 0; });
    var unproven = entries.filter(function (e) { return proven.indexOf(e) < 0; });
    r.moneyEntries = entries;
    r.moneyProven = proven;
    r.moneyUnproven = unproven;
    r.moneyProvenTotal = sum(proven.map(function (e) { return e.amount; }));
    r.moneyUnprovenTotal = sum(unproven.map(function (e) { return e.amount; }));
    var b14Row = sum(pilot.map(function (w) { return w.B14; }));
    r.moneyFromRow = b14Row;
    if (!entries.length && b14Row > 0) {
      r.moneyUnprovenTotal = b14Row;
      W('warn', 'B.14 da ' + som(b14Row, true) + ' so‘m bor, lekin tafsiloti yo‘q: manbasiz summa hisobga olinmaydi. Har bir holatni sana, summa va hisobi bilan yozing.');
    } else if (entries.length && b14Row > 0 && Math.abs(b14Row - r.moneyProvenTotal) > 1) {
      W('warn', 'B.14 qatori (' + som(b14Row, true) + ') isbotlangan holatlar yig‘indisiga (' + som(r.moneyProvenTotal, true) + ') teng emas: bittasini tuzating.');
    }
    if (unproven.some(function (e) { return e.proven; })) {
      W('warn', '«Isbotlangan» deb belgilangan, lekin manbasi yozilmagan summa bor: u isbotlanmaganlar qatoriga o‘tkazildi.');
    }
    if (proven.length > 0 && proven.length < 3) {
      W('info', 'Topilgan pul ' + proven.length + ' ta holatdan: oylik taxmin ishonchsiz, keyingi haftalarda qayta tekshiring.');
    }

    /* monthly comparison (x 4,3) */
    var n = pilot.length;
    r.moneyMonthly = n ? r.moneyProvenTotal / n * WEEKS_PER_MONTH : 0;
    r.timeValueMonthly = isNum(r.b15Last) && work ? r.b15Last * work * WEEKS_PER_MONTH : null;
    r.hardNetMonthly = r.moneyMonthly - r.monthlyRun;
    r.totalMonthly = isNum(r.timeValueMonthly) ? r.hardNetMonthly + r.timeValueMonthly : r.hardNetMonthly;
    r.paybackHard = r.B10 > 0 && r.hardNetMonthly > 0 ? r.B10 / r.hardNetMonthly : null;
    r.paybackTotal = r.B10 > 0 && r.totalMonthly > 0 ? r.B10 / r.totalMonthly : null;

    var course = st.course || {};
    if (course.on && isNum(course.price) && course.price > 0) {
      var months = isNum(course.months) && course.months > 0 ? course.months : 12;
      r.courseBar = course.price / months;
      r.courseCoverage = r.totalMonthly / r.courseBar;
      r.coursePayback = r.totalMonthly > 0 ? course.price / r.totalMonthly : null;
    }

    /* decision */
    var d = st.decision || {};
    r.decisionLabel = DECISIONS[d.choice] || '';
    if (!d.choice) W('warn', 'Qaror belgilanmagan: davom etish, o‘zgartirish yoki to‘xtatish.');
    else if (!String(d.reason || '').trim()) W('warn', 'Qarorning sababi yozilmagan (bitta gap).');

    /* verdict: no baseline means not verifiable */
    var v = (st.signoff || {}).verdict || '';
    r.verdict = r.baselineOk ? v : 'NV';
    r.answer = answerSentence(st, r);
    return r;
  }

  function word(abs) { return abs < 0 ? 'tushdi' : (abs > 0 ? 'oshdi' : 'o‘zgarmadi'); }

  function answerSentence(st, r) {
    var meta = st.meta || {};
    var proc = String(meta.process || 'Jarayon').trim();
    var hide = !!st.stageMode;
    if (!r.baselineOk) return proc + ': agentgacha raqami yo‘q, shuning uchun nima o‘zgarganini aytib bo‘lmaydi.';
    if (!r.last) return proc + ': sinov raqamlari hali yo‘q.';
    var b = r.base, l = r.last, parts = [];
    if (isNum(b.B2) && isNum(l.B2)) {
      parts.push(l.B2 === b.B2
        ? 'bitta so‘rovga ketadigan vaqt ' + fmt(b.B2, 1) + ' daqiqada qoldi'
        : 'bitta so‘rovga ketadigan vaqt ' + fmt(b.B2, 1) + ' daqiqadan ' + fmt(l.B2, 1) + ' daqiqaga ' + word(l.B2 - b.B2));
    }
    if (isNum(r.errorRateBase) && isNum(r.errorRateLast)) {
      parts.push('xato javoblar ulushi ' + pct(r.errorRateBase) + ' dan ' + pct(r.errorRateLast) + ' ga ' + word(r.errorRateLast - r.errorRateBase));
    }
    var s = proc + ': ' + parts.join(', ') + '.';
    if (isNum(r.b15Last)) {
      s += r.b15Last >= 0
        ? ' Tekshirish vaqtini ayirganda haftasiga ' + fmt(round(r.b15Last, 1), 1) + ' soat tejaldi.'
        : ' Tekshirish tejalgan vaqtdan ko‘p oldi: haftasiga ' + fmt(round(-r.b15Last, 1), 1) + ' soat ortiqcha.';
    }
    if (!hide) {
      s += r.moneyProvenTotal > 0
        ? ' Sinovda ' + som(r.moneyProvenTotal, true) + ' so‘m topildi (isbotlangan).'
        : ' Isbotlangan topilgan pul yo‘q.';
    }
    if (r.decisionLabel) s += ' Qaror: ' + r.decisionLabel.toLowerCase() + '.';
    return s;
  }

  var api = {
    WEEKS_PER_MONTH: WEEKS_PER_MONTH, METRICS: METRICS, DECISIONS: DECISIONS,
    compute: compute, fmt: fmt, som: som, mln: mln, pct: pct, signed: signed, round: round, isNum: isNum
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ResultsCalc = api;
})(this);
