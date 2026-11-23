/* Natija varag‘i: reads Kit 5 files into the sheet's state.
   Accepts, as plain text (file input, drag-drop or paste; fetch does not work from file://):
   - kit5-pilot/numbers.md written by hand or by /kit5 (kits template: "| B.1 Bajarilgan so‘rovlar | 120 | ...")
   - the pilot bot's weekly export kit5-raqamlar-*.md ("| B.1 | Bajarilgan so‘rovlar | 120 | 5 | ...", "qo‘lda" cells)
   - kit5-pilot/plan.md (Form A: A.2, A.6, A.7, header lines)
   Numbers: "1 250 000", "1,7", "0.02", "[?]", "-", "qo‘lda". Apostrophes ' ‘ ’ ʻ ʼ are treated alike.
   Browser global ResultsParse; node module.exports. */
(function (root) {
  'use strict';

  var APOS = /[‘’ʻʼ`']/g;
  function norm(s) { return String(s || '').replace(APOS, "'").replace(/ | | /g, ' ').trim(); }

  /* First number in a cell.
     Thousands: "1 250 000", "1,250,000", "1.250.000"; decimals: "1,7", "0.02".
     A single 3-digit group after one separator ("680,000", "680.000") is read as thousands only
     for money cells (opts.money), because a money amount is never a fraction of a so'm. */
  var NUM_ALT = [
    { re: /^[-+]?\d{1,3}(?: \d{3})+(?:[.,]\d+)?/, conv: function (t) { return t.replace(/ /g, '').replace(',', '.'); } },
    { re: /^[-+]?\d{1,3}(?:,\d{3}){2,}(?:\.\d+)?/, conv: function (t) { return t.replace(/,/g, ''); } },
    { re: /^[-+]?\d{1,3}(?:\.\d{3}){2,}(?:,\d+)?/, conv: function (t) { return t.replace(/\./g, '').replace(',', '.'); } },
    { re: /^[-+]?\d{1,3}[.,]\d{3}(?![\d.,])/, conv: function (t) { return t.replace(/[.,]/, ''); }, money: true },
    { re: /^[-+]?\d+(?:[.,]\d+)?/, conv: function (t) { return t.replace(',', '.'); } }
  ];
  function parseNumber(cell, opts) {
    var s = norm(cell);
    if (!s || s === '-' || /^qo'lda$/i.test(s) || /^\[\?\]$/.test(s)) return null;
    var at = s.search(/[-+]?\d/);
    if (at < 0) return null;
    var rest = s.slice(at);
    for (var i = 0; i < NUM_ALT.length; i++) {
      var a = NUM_ALT[i];
      if (a.money && !(opts && opts.money)) continue;
      var m = rest.match(a.re);
      if (m) { var v = parseFloat(a.conv(m[0])); return isFinite(v) ? v : null; }
    }
    return null;
  }
  function unsure(cell) { return /\[\?\]/.test(String(cell || '')); }

  function splitRow(line) {
    var t = line.trim();
    if (t.charAt(0) !== '|') return null;
    t = t.replace(/^\|/, '').replace(/\|\s*$/, '');
    return t.split('|').map(function (c) { return c.trim(); });
  }
  function isRule(cells) { return cells.every(function (c) { return /^:?-{2,}:?$/.test(c) || c === ''; }); }

  /* group consecutive table lines: [{header: [...], rows: [[...]], before: 'heading text'}] */
  function tables(text) {
    var lines = String(text).split(/\r?\n/);
    var out = [], cur = null, lastHeading = '';
    lines.forEach(function (line) {
      var cells = splitRow(line);
      if (cells) {
        if (!cur) { cur = { header: cells, rows: [], before: lastHeading }; out.push(cur); }
        else if (isRule(cells)) { /* separator */ }
        else cur.rows.push(cells);
      } else {
        cur = null;
        if (/^#{1,6}\s/.test(line)) lastHeading = norm(line.replace(/^#+\s*/, ''));
      }
    });
    return out;
  }

  function codeOf(cells) {
    for (var i = 0; i < Math.min(2, cells.length); i++) {
      var m = norm(cells[i]).match(/^B\.(\d{1,2})\b/);
      if (m) return 'B' + m[1];
    }
    return null;
  }

  /* "- Jarayon: ..." header lines; matched apostrophe-insensitively, returned as written */
  function headerValue(text, label) {
    var pat = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "[\u2018\u2019\u02BB\u02BC`']");
    var re = new RegExp('^\\s*-\\s*' + pat + '\\s*:[ \\t]*(.*)$', 'im');
    var m = String(text || '').match(re);
    return m ? m[1].replace(/\u00a0/g, ' ').trim() : '';
  }

  /* "### A.6 Muvaffaqiyat mezonlari" ... up to the next heading.
     Quotes ("> Nega shunday") and comments are dropped. If the section has a list, the list items are
     returned; else if it has a table, "first cell: last cell" per row; else the plain text. */
  function sectionText(text, code) {
    var lines = String(text).replace(/<!--[\s\S]*?-->/g, '').split(/\r?\n/), body = [], on = false;
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i];
      if (/^#{2,6}\s/.test(l)) {
        if (on) break;
        if (norm(l).indexOf(code + ' ') >= 0 || norm(l).replace(/^#+\s*/, '').indexOf(code) === 0) { on = true; continue; }
      } else if (on && l.trim() && !/^\s*>/.test(l) && !/^\s*---\s*$/.test(l)) body.push(l);
    }
    var clean = function (x) { return x.replace(/\*\*/g, '').replace(/`/g, '').trim(); };
    var items = [];
    body.forEach(function (l) {
      var m = l.match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/);
      if (m) items.push(clean(m[1]));
      else if (items.length && /^\s{2,}\S/.test(l)) items[items.length - 1] += ' ' + clean(l);
    });
    if (items.length) return items.join('\n');
    var rows = body.map(splitRow).filter(Boolean).filter(function (c) { return !isRule(c); });
    if (rows.length > 1) return rows.slice(1).map(function (c) {
      var first = clean(c[0]), code = norm(first).match(/^([A-Z]\.\d{1,2})\b/);
      return (code ? code[1] : first) + ': ' + clean(c[c.length - 1]);
    }).join('\n');
    return clean(body.join('\n'));
  }

  function detectKind(text) {
    var t = norm(text);
    if (/^#{2,6}\s*A\.6\b/m.test(t) && /^#{2,6}\s*A\.7\b/m.test(t)) return 'plan';
    if (/Agentgacha/.test(t) && /\|\s*B\.1\b/.test(t)) return 'numbers';
    if (/A\.6\b/.test(t) && /A\.7\b/.test(t)) return 'plan';
    return 'unknown';
  }

  function parseNumbers(text) {
    var res = { kind: 'numbers', meta: {}, rate: {}, weeks: [], costs: {}, money: [], errorsLogged: null, notes: [] };
    var t = norm(text);

    res.meta.process = headerValue(text, 'Jarayon');
    res.meta.pilotPeriod = headerValue(text, 'Sinov sanalari');
    var titleAgent = t.match(/^#\s*Sinov raqamlari:\s*(.+)$/m);
    if (titleAgent) res.meta.agent = titleAgent[1].trim();
    var davr = t.match(/^Davr:\s*(.+?)\.?\s*$/m);
    if (davr && !res.meta.pilotPeriod) res.meta.pilotPeriod = davr[1].trim();
    var rate = headerValue(text, "Soatbay haq, so'm");
    if (rate) {
      var segs = rate.split(';');
      var rv = parseNumber(segs[0], { money: true });
      if (rv) res.rate.work = rv;
      if (segs[1]) { var rc = parseNumber(segs[1], { money: true }); if (rc) res.rate.check = rc; }
    }

    tables(text).forEach(function (tb) {
      var head = tb.header.map(norm);
      var iBase = head.findIndex(function (h) { return /^Agentgacha/i.test(h); });
      var baselineOnly = false;
      if (iBase < 0 && /^Ko'rsatkich/i.test(head[0] || '')) {
        /* kit5-pilot/baseline.md: | Ko‘rsatkich | Haftasiga | Hisob | Manba | ... */
        iBase = head.findIndex(function (h) { return /^Haftasiga$/i.test(h); });
        baselineOnly = iBase >= 0;
      }
      var iChange = head.findIndex(function (h) { return /^O'zgarish/i.test(h); });
      var iSumma = head.findIndex(function (h) { return /^Summa/i.test(h); });

      if (iBase >= 0 && res.weeks.length === 0) {
        var end = baselineOnly ? iBase + 1 : (iChange > iBase ? iChange : head.length);
        var labels = head.slice(iBase, end);
        var cols = labels.map(function (h, k) {
          var days = h.match(/\((\d+)\s*kun\)/i);
          return { label: k === 0 ? 'Agentgacha' : h.replace(/\s*\(.*\)\s*$/, ''), partialDays: days ? +days[1] : null, values: {}, unsure: [] };
        });
        tb.rows.forEach(function (cells) {
          var code = codeOf(cells);
          if (!code) return;
          for (var k = 0; k < cols.length; k++) {
            var cell = cells[iBase + k];
            var v = parseNumber(cell, { money: code === 'B14' });
            if (v !== null) { cols[k].values[code] = v; if (unsure(cell) && code !== 'B14') cols[k].unsure.push(code); }
          }
        });
        cols.forEach(function (c, k) {
          var hasAny = Object.keys(c.values).length > 0;
          if (k === 0 || hasAny) {
            var w = { label: c.label };
            Object.keys(c.values).forEach(function (code) { w[code] = c.values[code]; });
            if (c.partialDays) { w.partialDays = c.partialDays; res.notes.push(c.label + ' tugamagan: ' + c.partialDays + ' kun.'); }
            if (c.unsure.length) res.notes.push(c.label + ': [?] belgili raqam (' + c.unsure.join(', ').replace(/B/g, 'B.') + ') - tasdiqlang.');
            res.weeks.push(w);
          }
        });
        return;
      }

      if (iSumma >= 0) {
        var iWhat = head.findIndex(function (h) { return /^Nima/i.test(h); });
        var iHow = head.findIndex(function (h) { return /^Qanday/i.test(h); });
        tb.rows.forEach(function (cells) {
          var first = norm(cells[0]);
          if (/^Jami/i.test(first)) return;
          var summa = cells[iSumma] || '';
          var amount = parseNumber(summa, { money: true });
          var what = iWhat >= 0 ? (cells[iWhat] || '').trim() : '';
          if (amount === null && !what) return;
          var how = iHow >= 0 ? (cells[iHow] || '').trim() : '';
          var notCounted = /\[\?\]|qo'shilmaydi|isbotlanmagan/i.test(norm(summa));
          res.money.push({ date: first, what: what, amount: amount, how: how, proven: !notCounted && amount !== null && amount !== 0 });
        });
        return;
      }

      /* costs: | B.9 Obuna | ... | or | B.9 | Obuna | ... | */
      var costCodes = tb.rows.map(codeOf).filter(Boolean);
      if (costCodes.indexOf('B9') >= 0 && costCodes.indexOf('B12') >= 0) {
        tb.rows.forEach(function (cells) {
          var code = codeOf(cells);
          if (!code) return;
          var cell = cells[cells.length - 1];
          var jami = norm(cell).match(/jami\s+([-\d][\d ,.]*\d)/i);
          var v = jami ? parseNumber(jami[1], { money: true }) : parseNumber(cell, { money: true });
          if (/qo'lda/i.test(norm(cell)) && !jami) v = null;
          if (v !== null) res.costs[code] = v;
        });
        return;
      }

      /* error log B.13 */
      if (/^B\.13/.test(head[0] || '') || /Xatolar jurnali/i.test(tb.before)) {
        if (res.errorsLogged === null) res.errorsLogged = 0;
        tb.rows.forEach(function (cells) {
          var c0 = norm(cells[0]);
          if (c0 && c0 !== '-' && norm(cells[1] || '') && !/xato belgilanmagan/i.test(norm(cells[1] || ''))) res.errorsLogged++;
        });
      }
    });

    /* decision */
    var dm = t.match(/^\s*-\s*\[[xX]\]\s*(Davom etish|O'zgartirish|To'xtatish)/m);
    if (dm) res.decision = { 'davom etish': 'davom', "o'zgartirish": 'ozgartirish', "to'xtatish": 'toxtatish' }[dm[1].toLowerCase()];
    var reason = String(text).match(/^Sababi:[ \t]*(.*)$/m);
    if (reason && reason[1].trim()) res.reason = reason[1].trim();
    return res;
  }

  function parsePlan(text) {
    return {
      kind: 'plan',
      meta: { process: headerValue(text, 'Jarayon'), pilotLead: headerValue(text, 'Loyiha yetakchisi') || headerValue(text, 'Sinov egasi'), owner: headerValue(text, 'Sinov egasi'), department: headerValue(text, "Bo'lim boshlig'i") },
      goal: sectionText(text, 'A.2'),
      dates: sectionText(text, 'A.3'),
      success: sectionText(text, 'A.6'),
      stop: sectionText(text, 'A.7')
    };
  }

  function parseAny(text) {
    var kind = detectKind(text);
    if (kind === 'numbers') return parseNumbers(text);
    if (kind === 'plan') return parsePlan(text);
    return { kind: 'unknown' };
  }

  /* ---------- parsed file -> sheet state ---------- */
  function blankState() {
    return {
      meta: { company: '', process: '', agent: '', pilotLead: '', department: '', baselinePeriod: '', pilotPeriod: '', date: '' },
      rate: { work: null, check: null },
      weeks: [{ label: 'Agentgacha', days: null }, { label: '1-hafta', days: null }, { label: '2-hafta', days: null }],
      costs: { monthly: [{ name: 'Server (VPS)', amount: null }, { name: 'Model (OpenRouter)', amount: null }, { name: 'Claude obunasi', amount: null }], setup: [{ name: 'Sozlash: egasining soatlari', amount: null }] },
      money: [],
      criteria: { goal: '', success: '', successMet: '', stop: '', stopHit: '' },
      decision: { choice: '', reason: '' },
      notes: { notProven: '', otherChanges: '' },
      next: { process: '', interviewees: '', start: '', review: '' },
      signoff: { owner: '', pilotLead: '', mentor: '', verdict: '', date: '', consent: '' },
      stageMode: false,
      course: { on: false, price: 36000000, months: 12 },
      errorsLogged: null
    };
  }

  var WEEKS_PER_MONTH = 4.3;
  function mergeIntoState(state, parsed) {
    var st = state || blankState();
    var msgs = [];
    if (!parsed || parsed.kind === 'unknown') { msgs.push('Fayl taniqmadi: bu To‘plam 5 ning numbers.md yoki plan.md fayli emas.'); return { state: st, messages: msgs }; }
    function setIf(obj, key, val) { if (val !== undefined && val !== null && String(val).trim() !== '') obj[key] = val; }

    var tidy = function (v) { return String(v || '').replace(/`[^`]*`/g, '').replace(/\(\s*[,;]?\s*\)/g, '').replace(/\s+/g, ' ').trim(); };
    var noParen = function (v) { return tidy(v).replace(/\s*\([^()]*\)\s*$/, ''); };
    if (parsed.kind === 'plan') {
      if (!String(st.meta.process || '').trim()) setIf(st.meta, 'process', noParen(parsed.meta.process));
      setIf(st.meta, 'pilotLead', tidy(parsed.meta.pilotLead));
      setIf(st.meta, 'department', tidy(parsed.meta.department));
      setIf(st.criteria, 'goal', parsed.goal);
      setIf(st.criteria, 'success', parsed.success);
      setIf(st.criteria, 'stop', parsed.stop);
      msgs.push('plan.md o‘qildi: maqsad (A.2), muvaffaqiyat mezoni (A.6) va to‘xtatish sharti (A.7).');
      return { state: st, messages: msgs };
    }

    setIf(st.meta, 'process', noParen(parsed.meta.process));
    setIf(st.meta, 'agent', parsed.meta.agent);
    setIf(st.meta, 'pilotPeriod', parsed.meta.pilotPeriod);
    if (parsed.rate && parsed.rate.work) st.rate.work = parsed.rate.work;
    if (parsed.rate && parsed.rate.check) st.rate.check = parsed.rate.check;

    if (parsed.weeks.length) {
      var old = st.weeks || [];
      st.weeks = parsed.weeks.map(function (w, i) {
        var copy = {};
        Object.keys(w).forEach(function (k) { copy[k] = w[k]; });
        copy.label = i === 0 ? 'Agentgacha' : (w.label || (i + '-hafta'));
        copy.days = old[i] && old[i].days ? old[i].days : null;
        return copy;
      });
      if (st.weeks.length === 1) st.weeks.push({ label: '1-hafta', days: null });
    }
    var nPilot = Math.max(0, parsed.weeks.length - 1);
    if (parsed.costs && typeof parsed.costs.B9 === 'number' && nPilot > 0) {
      st.costs.monthly = [{ name: 'B.9 obuna (Kit 5 faylidan, oyiga aylantirildi)', amount: Math.round(parsed.costs.B9 / nPilot * WEEKS_PER_MONTH) }];
    }
    if (parsed.costs && typeof parsed.costs.B10 === 'number') {
      st.costs.setup = [{ name: 'B.10 sozlash (Kit 5 faylidan)', amount: parsed.costs.B10 }];
    }
    if (parsed.money && parsed.money.length) st.money = parsed.money.slice();
    if (parsed.decision) st.decision.choice = parsed.decision;
    if (parsed.reason) st.decision.reason = parsed.reason;
    if (typeof parsed.errorsLogged === 'number') st.errorsLogged = parsed.errorsLogged;

    msgs.push('numbers.md o‘qildi: ' + parsed.weeks.length + ' ta ustun (agentgacha va ' + nPilot + ' hafta), ' + (parsed.money || []).length + ' ta topilgan pul yozuvi.');
    msgs.push('Ish kunlarini (har ustun uchun) qo‘lda yozing: faylda ular yo‘q.');
    if (!(parsed.rate && parsed.rate.work)) msgs.push('Soatbay haq faylda topilmadi: qo‘lda yozing.');
    (parsed.notes || []).forEach(function (n) { msgs.push(n); });
    return { state: st, messages: msgs };
  }

  var api = { parseNumber: parseNumber, tables: tables, parseNumbers: parseNumbers, parsePlan: parsePlan, parseAny: parseAny, detectKind: detectKind, norm: norm, blankState: blankState, mergeIntoState: mergeIntoState };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ResultsParse = api;
})(this);
