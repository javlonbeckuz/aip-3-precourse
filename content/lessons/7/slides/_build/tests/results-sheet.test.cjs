// Tests for the Day 6 results sheet: parser (real Kit 5 files) and Kit 5 formulas.
// Run: node --test content/lessons/7/slides/_build/tests/results-sheet.test.cjs   (paths resolve relative to this file)
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const DAY6 = path.resolve(__dirname, '..', '..');
// calc.js / parse.js are browser UMD scripts; the repo is "type": "module", so require() would load them as ESM. Run them with a CommonJS `module` instead.
const umd = (f) => { const m = { exports: {} }; new Function('module', 'exports', fs.readFileSync(path.join(DAY6, 'results-sheet', 'assets', f), 'utf8'))(m, m.exports); return m.exports; };
const calc = umd('calc.js');
const parse = umd('parse.js');
const fx = (name) => fs.readFileSync(path.join(__dirname, 'fixtures', name), 'utf8');
const namuna = (name) => fs.readFileSync(path.join(DAY6, 'exercises', 'namuna', 'kompaniya', 'kit5-pilot', name), 'utf8');
const near = (a, b, tol = 0.5) => assert.ok(Math.abs(a - b) <= tol, `${a} != ${b} (tol ${tol})`);

test('parseNumber handles Uzbek and bot formats', () => {
  assert.equal(parse.parseNumber('1 250 000'), 1250000);
  assert.equal(parse.parseNumber('1 250 000 so‘m'), 1250000);
  assert.equal(parse.parseNumber('1,7'), 1.7);
  assert.equal(parse.parseNumber('0.02'), 0.02);
  assert.equal(parse.parseNumber('282,3'), 282.3);
  assert.equal(parse.parseNumber('-0,36'), -0.36);
  assert.equal(parse.parseNumber('+22,7 (+8,0%)'), 22.7);
  assert.equal(parse.parseNumber('25 000 (CLAUDE.md)'), 25000);
  assert.equal(parse.parseNumber('0 (+540 000 [?])'), 0);
  for (const empty of ['', ' ', '-', '[?]', 'qo‘lda', "qo'lda", 'qoʻlda']) assert.equal(parse.parseNumber(empty), null, empty);
});

test('Baraka worked example numbers.md (the canon Kit 5 Form B) parses fully', () => {
  const p = parse.parseAny(namuna('numbers.md'));
  assert.equal(p.kind, 'numbers');
  assert.equal(p.weeks.length, 3);
  assert.deepEqual([p.weeks[0].B1, p.weeks[0].B2, p.weeks[0].B3, p.weeks[0].B4, p.weeks[0].B5, p.weeks[0].B7, p.weeks[0].B8], [120, 6, 9, 15, 100, 0, 2]);
  assert.equal(p.weeks[0].B6, undefined);
  assert.deepEqual([p.weeks[1].B1, p.weeks[1].B2, p.weeks[1].B3, p.weeks[1].B4, p.weeks[1].B5, p.weeks[1].B7, p.weeks[1].B8, p.weeks[1].B14], [132, 2.5, 7, 12, 104, 4.5, 2, 0]);
  assert.deepEqual([p.weeks[2].B1, p.weeks[2].B2, p.weeks[2].B3, p.weeks[2].B4, p.weeks[2].B5, p.weeks[2].B7, p.weeks[2].B8, p.weeks[2].B14], [138, 2, 3, 8, 121, 2, 1, 680000]);
  assert.equal(p.rate.work, 35700);
  assert.equal(p.costs.B9, 234651);
  assert.equal(p.costs.B10, 1885000);
  assert.equal(p.costs.B11, 232050);
  assert.equal(p.costs.B12, 2351701);
  assert.equal(p.money.length, 3);
  assert.deepEqual(p.money.map((m) => m.proven), [true, false, false]);
  assert.equal(p.money[0].amount, 680000);
  assert.equal(p.errorsLogged, 10);
  assert.equal(p.decision, 'davom');
  assert.match(p.reason, /mezoni/);
  assert.match(p.meta.process, /narx, qoldiq/);
  assert.match(p.meta.process, /‘/, 'keeps the Uzbek apostrophe as written');
});

test('Baraka example: Kit 5 formulas give the canon numbers (BARAKA-CANON.md "Kit 5 numbers")', () => {
  let { state } = parse.mergeIntoState(parse.blankState(), parse.parseAny(namuna('numbers.md')));
  ({ state } = parse.mergeIntoState(state, parse.parseAny(namuna('plan.md'))));
  state.weeks.forEach((w) => { w.days = 6; });
  const r = calc.compute(state);
  assert.ok(r.baselineOk);
  near(r.b15[1], 3.2, 0.001);
  near(r.b15Last, 7.2, 0.001);
  near(r.monthlyRun, 504500, 1);
  near(r.B9, 234651, 1);
  near(r.B11, 232050, 0.01);
  near(r.B12, 2351701, 1);
  near(r.B16agent, 10452, 1);
  near(r.B16agentRun, 2074, 1);
  near(r.B16human, 3570, 0.01);
  near(r.errorRateBase, 7.5, 0.001);
  near(r.errorRateLast, 300 / 138, 0.001);
  near(r.volumeRatio, 1.15, 0.001);
  near(r.moneyProvenTotal, 680000, 0);
  near(r.moneyUnprovenTotal, 5400000, 0);
  near(r.moneyMonthly, 1462000, 0.5);
  near(r.timeValueMonthly, 1105272, 0.5);
  near(r.hardNetMonthly, 957500, 1);
  near(r.paybackHard, 1885000 / 957500, 0.001);
  assert.equal(r.decisionLabel, 'Davom etish');
  assert.match(state.criteria.success, /2 yoki kam/);
  assert.match(state.criteria.stop, /bitta holat ham/);
  assert.match(state.meta.pilotLead, /^Malika Rashidova/);
  assert.match(r.answer, /6 daqiqadan 2 daqiqaga tushdi/);
  assert.match(r.answer, /680\u00a0000 so‘m topildi/);
  assert.ok(!r.warnings.some((w) => w.level === 'stop'));
});

test('monthly money figures are labelled as estimates, never as proven (playtest D6-01)', () => {
  const app = fs.readFileSync(path.join(DAY6, 'results-sheet', 'assets', 'app.js'), 'utf8');
  assert.ok(app.includes('Topilgan pul, oyiga taxmin'));
  assert.ok(!app.includes("'Topilgan pul, isbotlangan'"));
  const nums = namuna('numbers.md');
  assert.ok(/Oyiga taxmin: 680 000 \/ 2 × 4,3 = 1 462 000/.test(nums));
  assert.ok(!/isbotlangan: 680 000 \/ 2/.test(nums));
});

test('kits blank template: no baseline, no pilot, stop warnings', () => {
  const p = parse.parseAny(fx('kits-template-numbers.md'));
  assert.equal(p.kind, 'numbers');
  const { state } = parse.mergeIntoState(parse.blankState(), p);
  const r = calc.compute(state);
  assert.equal(r.baselineOk, false);
  assert.equal(r.verdict, 'NV');
  assert.ok(r.warnings.filter((w) => w.level === 'stop').length >= 2);
});

test('pilot bot weekly export (qo‘lda cells, Oxirgi 7 kun column)', () => {
  const p = parse.parseAny(fx('bot-export-kit5-raqamlar.md'));
  assert.equal(p.kind, 'numbers');
  assert.equal(p.weeks.length, 2);
  assert.equal(p.weeks[0].B1, 120);
  assert.equal(p.weeks[0].B6, undefined);
  assert.equal(p.weeks[1].label, 'Oxirgi 7 kun');
  assert.deepEqual([p.weeks[1].B1, p.weeks[1].B3, p.weeks[1].B5], [5, 1, 2]);
  assert.equal(p.weeks[1].B2, undefined, 'qo‘lda is not a number');
  assert.equal(p.costs.B9, undefined, 'the $0.02 in the B.9 text is not taken as so‘m');
  assert.equal(p.errorsLogged, 1);
  assert.equal(p.meta.agent, 'Savdo yordamchisi');
  const r = calc.compute(parse.mergeIntoState(parse.blankState(), p).state);
  assert.ok(r.warnings.some((w) => /B\.7/.test(w.text)) || r.b15Last === null);
});

test('numbers.md written by /kit5 in the kits skill test (mixed cells)', () => {
  const p = parse.parseAny(fx('kit5-skill-oydin-numbers.md'));
  assert.equal(p.weeks.length, 3);
  assert.equal(p.weeks[0].B1, 282.3);
  assert.equal(p.weeks[0].B2, 2.1);
  assert.equal(p.weeks[2].B14, 0);
  assert.equal(p.rate.work, 25000);
  assert.equal(p.costs.B9, 226124);
  assert.equal(p.costs.B10, 250000);
  assert.equal(p.costs.B12, 663624);
  const proven = p.money.filter((m) => m.proven);
  assert.equal(proven.length, 1);
  assert.equal(proven[0].amount, 260000);
  assert.equal(p.errorsLogged, 1);
  const r = calc.compute(parse.mergeIntoState(parse.blankState(), p).state);
  near(r.b15Last, (2.1 - 0.9) * 305 / 60 - 3.0, 1e-9);
  near(r.moneyProvenTotal, 260000, 0);
  near(r.moneyUnprovenTotal, 540000, 0);
  near(r.B16human, 2.1 / 60 * 25000, 1e-9);
});

test('Day 2 baseline.md loads as the Agentgacha column only', () => {
  const p = parse.parseAny(fx('day2-baraka-baseline.md'));
  assert.equal(p.weeks.length, 1);
  assert.deepEqual([p.weeks[0].B1, p.weeks[0].B2, p.weeks[0].B4, p.weeks[0].B8], [120, 6, 15, 2]);
  assert.equal(p.weeks[0].B6, undefined);
});

test('plan.md parses A.2, A.6, A.7 and the pilot lead', () => {
  const p = parse.parseAny(namuna('plan.md'));
  assert.equal(p.kind, 'plan');
  assert.match(p.goal, /6 daqiqadan 2 daqiqagacha/);
  assert.match(p.success, /^B\.3: 5 yoki kam$/m);
  assert.match(p.stop, /tannarx/);
  assert.ok(!/Nega shunday/.test(p.success + p.stop), 'quoted margin notes are dropped');
  assert.match(p.meta.pilotLead, /Malika/);
});

test('bad example: numbers without a baseline cannot show a change', () => {
  const st = parse.blankState();
  st.weeks = [{ label: 'Agentgacha', days: 6 }, { label: '1-hafta', days: 6, B1: 130, B2: 2.5, B7: 4 }, { label: '2-hafta', days: 6, B1: 140, B2: 2 }];
  st.rate.work = 35700;
  st.money = [{ date: '', what: 'oyiga 10 mln foyda', amount: 10000000, proven: true, how: '' }];
  st.signoff.verdict = 'V';
  const r = calc.compute(st);
  assert.equal(r.baselineOk, false);
  assert.equal(r.verdict, 'NV', 'a mentor cannot verify a sheet without a baseline');
  assert.equal(r.change.B2, null);
  assert.equal(r.b15Last, null);
  assert.equal(r.moneyProvenTotal, 0, 'an amount without a source is not proven');
  assert.equal(r.moneyUnprovenTotal, 10000000);
  assert.ok(r.warnings.some((w) => w.level === 'stop'));
  assert.ok(r.warnings.some((w) => /manbasi yozilmagan/.test(w.text)));
  assert.match(r.answer, /agentgacha raqami yo‘q/);
});

test('negative saved time and volume guard are reported, not hidden', () => {
  const st = parse.blankState();
  st.weeks = [{ label: 'Agentgacha', days: 6, B1: 100, B2: 3, B3: 2 }, { label: '1-hafta', days: 6, B1: 40, B2: 2.5, B3: 1, B7: 3 }];
  st.rate.work = 30000;
  const r = calc.compute(st);
  near(r.b15Last, (3 - 2.5) * 40 / 60 - 3, 1e-9);
  assert.ok(r.b15Last < 0);
  assert.ok(r.warnings.some((w) => /manfiy/.test(w.text)));
  assert.ok(r.warnings.some((w) => /0,7-1,3/.test(w.text)));
  assert.ok(r.warnings.some((w) => /Faqat 1 hafta/.test(w.text)));
});

test('Uzbek number formatting', () => {
  assert.equal(calc.fmt(1250000), '1 250 000');
  assert.equal(calc.fmt(7.2, 1), '7,2');
  assert.equal(calc.fmt(7.0, 1), '7');
  assert.equal(calc.fmt(-0.36, 2), '-0,36');
  assert.equal(calc.som(1105272), '1 105 000');
  assert.equal(calc.som(680000, true), '680 000');
  assert.equal(calc.pct(2.1739), '2,2%');
  assert.equal(calc.mln(2062772), '2,1 mln');
});

test('course payback bar stays off unless switched on', () => {
  const st = parse.blankState();
  st.weeks = [{ label: 'Agentgacha', B1: 120, B2: 6 }, { label: '1-hafta', B1: 130, B2: 2, B7: 2 }];
  st.rate.work = 35700;
  let r = calc.compute(st);
  assert.equal(r.courseBar, undefined);
  st.course.on = true;
  r = calc.compute(st);
  near(r.courseBar, 3000000, 0);
});

test('B.14 row without the detail table is not counted as proven money', () => {
  const st = parse.blankState();
  st.weeks = [{ label: 'Agentgacha', B1: 120, B2: 6, B14: 0 }, { label: '1-hafta', B1: 130, B2: 2, B7: 2, B14: 10000000 }];
  st.rate.work = 35700;
  const r = calc.compute(st);
  assert.equal(r.moneyProvenTotal, 0);
  assert.equal(r.moneyUnprovenTotal, 10000000);
  assert.ok(r.warnings.some((w) => /tafsiloti yo‘q/.test(w.text)));
});

test('embedded page examples are the current worked-example files (run make_examples.py after editing them)', () => {
  const src = fs.readFileSync(path.join(DAY6, 'results-sheet', 'assets', 'examples.js'), 'utf8');
  const json = JSON.parse(src.slice(src.indexOf('=') + 1).trim().replace(/;$/, ''));
  assert.equal(json.baraka.files[0], namuna('numbers.md'));
  assert.equal(json.baraka.files[1], namuna('plan.md'));
  assert.equal(json.yomon.files[0], fs.readFileSync(path.join(DAY6, 'results-sheet', 'namuna', 'yomon-numbers.md'), 'utf8'));
});

test('no em dash anywhere in the results sheet sources', () => {
  for (const f of ['index.html', 'assets/app.js', 'assets/calc.js', 'assets/parse.js', 'assets/sheet.css', 'natija-varagi.qollanma.md']) {
    assert.ok(!fs.readFileSync(path.join(DAY6, 'results-sheet', f), 'utf8').includes('\u2014'), f);
  }
});

test('comma or dot thousands: money cells read as so‘m, other cells keep decimals', () => {
  assert.equal(parse.parseNumber('1,250,000'), 1250000);
  assert.equal(parse.parseNumber('1.250.000'), 1250000);
  assert.equal(parse.parseNumber('680,000', { money: true }), 680000);
  assert.equal(parse.parseNumber('680.000', { money: true }), 680000);
  assert.equal(parse.parseNumber('680,000'), 680, 'outside money cells a single group stays a decimal');
  assert.equal(parse.parseNumber('1,7', { money: true }), 1.7);
  assert.equal(parse.parseNumber('0.02'), 0.02);
  assert.equal(parse.parseNumber('11 941,65', { money: true }), 11941.65);
  const p = parse.parseNumbers('| Ko‘rsatkich | Agentgacha | 1-hafta | O‘zgarish |\n|---|---|---|---|\n| B.1 So‘rovlar | 120 | 130 | |\n| B.14 Topilgan pul, so‘m | 0 | 680,000 | |\n');
  assert.equal(p.weeks[1].B14, 680000);
});

test('tiny so‘m amounts are flagged (a likely thousands typo)', () => {
  const st = parse.blankState();
  st.weeks = [{ label: 'Agentgacha', B1: 120, B2: 6 }, { label: '1-hafta', B1: 130, B2: 2, B7: 2 }];
  st.rate.work = 680;
  st.money = [{ date: '23.12', what: 'x', amount: 680, proven: true, how: 'hujjat' }];
  const r = calc.compute(st);
  assert.ok(r.warnings.some((w) => /Juda kichik so‘m/.test(w.text)));
});

test('deck data loads and every slide has a time, a layout and instructor notes', () => {
  const vm = require('node:vm');
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(DAY6, 'deck', 'assets', 'slides_data.js'), 'utf8'), ctx);
  const slides = ctx.window.SLIDES_DATA;
  assert.equal(slides.length, 50);
  slides.forEach((s, i) => {
    assert.ok(s.seg && s.layout, `slide ${i + 1}`);
    assert.ok(s.notes && typeof s.notes.do === 'string', `slide ${i + 1} notes`);
  });
});
