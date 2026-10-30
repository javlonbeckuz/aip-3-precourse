import { test } from 'node:test';
import assert from 'node:assert/strict';
import { openDb, putProgress, createStudent, findStudents, getStudent } from './db.js';
import { createContent } from './content.js';
import { handleUpdate, makeBot, createApi } from './bot.js';
import { REAL_CONTENT, tmpCopy } from './testutil.js';

const ADMIN = 111, OTHER = 222, CHAT = 5000;
const msg = (text, from = ADMIN) => ({ update_id: 1, message: { message_id: 1, from: { id: from, username: 'u' + from }, chat: { id: from, type: 'private' }, text } });
const press = (data, from = ADMIN) => ({ update_id: 2, callback_query: { id: 'cb1', from: { id: from }, data, message: { message_id: 77, chat: { id: from, type: 'private' } } } });

function setup(extra = {}) {
  const db = openDb(':memory:', { seedDemo: true });
  const content = createContent({ dir: REAL_CONTENT });
  const ctx = { db, content, adminIds: new Set([ADMIN]), portalUrl: 'https://portal.example/aip/', state: new Map(), ...extra };
  const calls = [];
  const api = async (method, params) => { calls.push({ method, params }); return method === 'getUpdates' ? (api.queue?.shift() ?? []) : true; };
  return { db, ctx, calls, api, bot: makeBot({ api, ctx, pollSeconds: 1 }) };
}
const texts = (calls) => calls.filter((c) => c.method === 'sendMessage').map((c) => c.params.text);

test('bot: non-admins are refused politely and logged', async (t) => {
  const { ctx, calls, bot } = setup();
  const warn = t.mock.method(console, 'warn', () => {});
  await bot.onUpdate(msg('/new', OTHER));
  await bot.onUpdate(press('g:shanba', OTHER));
  assert.equal(calls.length, 2);
  assert.match(calls[0].params.text, /faqat administratorlar/);
  assert.equal(calls[1].method, 'answerCallbackQuery');
  assert.equal(warn.mock.callCount(), 2);
  assert.match(warn.mock.calls[0].arguments[0], /refused user 222/);
  assert.equal(ctx.state.size, 0);
  assert.equal(ctx.db.prepare('SELECT COUNT(*) AS c FROM students').get().c, 1); // only XM
  assert.deepEqual(handleUpdate({ edited_message: {} }, ctx), []);
});

test('bot: /start and /help list the commands', () => {
  const { ctx } = setup();
  for (const c of ['/start', '/help', '/help@aip_bot']) {
    const out = handleUpdate(msg(c), ctx);
    assert.equal(out.length, 1);
    assert.match(out[0].params.text, /\/new[\s\S]*\/find[\s\S]*\/list/);
  }
  assert.match(handleUpdate(msg('/blah'), ctx)[0].params.text, /Nomaʼlum/);
});

test('bot: /new flow end to end with button mentor', async () => {
  const { db, calls, bot } = setup();
  await bot.onUpdate(msg('/new'));
  assert.match(texts(calls)[0], /toʻliq ismini/);
  await bot.onUpdate(msg('  Dilshod   Rahimov '));
  assert.match(texts(calls).at(-1), /telefon/);
  await bot.onUpdate(msg('(90) 123-45-67'));
  const g = calls.at(-1).params;
  assert.match(g.text, /Dilshod Rahimov/);
  assert.deepEqual(g.reply_markup.inline_keyboard[0].map((b) => b.text), ['Shanba', 'Yakshanba']);
  await bot.onUpdate(press(g.reply_markup.inline_keyboard[0][1].callback_data));
  assert.match(g.reply_markup.inline_keyboard[0][1].callback_data, /^g:yakshanba:[0-9a-f]{8}$/);
  assert.equal(calls.at(-2).method, 'answerCallbackQuery');
  const m = calls.at(-1).params;
  assert.deepEqual(m.reply_markup.inline_keyboard.map((r) => r[0].text), ['Xurshid Maroziqov']); // previous mentors as buttons
  calls.length = 0;
  await bot.onUpdate(press(m.reply_markup.inline_keyboard[0][0].callback_data));
  const s = db.prepare("SELECT * FROM students WHERE full_name = 'Dilshod Rahimov'").get();
  assert.match(s.id, /^AIP-[2-9A-HJKMNP-Z]{6}$/);
  assert.deepEqual([s.grp, s.mentor, s.first_name, s.created_by, s.active], ['yakshanba', 'Xurshid Maroziqov', 'Dilshod', ADMIN, 1]);
  const sent = texts(calls);
  assert.equal(sent.length, 2);
  assert.ok(sent[0].includes(`<code>${s.id}</code>`));
  assert.ok(sent[1].includes('https://portal.example/aip/') && sent[1].includes(s.id) && sent[1].includes('Dilshod'));
  assert.ok(calls.filter((c) => c.method === 'sendMessage').every((c) => c.params.parse_mode === 'HTML'));
  // flow is over: plain text no longer creates anything
  await bot.onUpdate(msg('Yana nimadir'));
  assert.equal(db.prepare('SELECT COUNT(*) AS c FROM students').get().c, 2);
});

test('bot: /new flow with typed new mentor, escaping, cancel and validation', async () => {
  const { db, calls, bot } = setup();
  await bot.onUpdate(msg('/new'));
  await bot.onUpdate(msg('x'));
  assert.match(texts(calls).at(-1), /2-80/);
  await bot.onUpdate(msg('Ali <b>Valiyev</b>'));
  await bot.onUpdate(msg('12345')); // bad phone: asked again
  assert.match(texts(calls).at(-1), /notoʻgʻri/);
  await bot.onUpdate(msg('+998 91 000 00 01'));
  const kb = calls.at(-1).params.reply_markup;
  await bot.onUpdate(msg('hello')); // typing instead of pressing a group button
  assert.match(texts(calls).at(-1), /tugmalar/);
  await bot.onUpdate(press(kb.inline_keyboard[0][0].callback_data));
  await bot.onUpdate(msg('Yangi Mentor & Co'));
  const s = db.prepare("SELECT * FROM students WHERE mentor = 'Yangi Mentor & Co'").get();
  assert.equal(s.full_name, 'Ali <b>Valiyev</b>'); // stored raw, escaped only when shown
  const out = texts(calls);
  assert.ok(out.at(-2).includes('Ali &lt;b&gt;Valiyev&lt;/b&gt;') && out.at(-2).includes('Yangi Mentor &amp; Co'));
  // cancel mid-flow, stale buttons
  await bot.onUpdate(msg('/new'));
  await bot.onUpdate(msg('/cancel'));
  calls.length = 0;
  await bot.onUpdate(press('g:shanba:deadbeef'));
  assert.match(calls.at(-1).params.text, /eskirgan/);
  assert.equal(db.prepare('SELECT COUNT(*) AS c FROM students').get().c, 2);
});

test('bot: /find by name and ID, with progress line', async (t) => {
  const { db, calls, bot } = setup({ content: createContent({ dir: tmpCopy(t) }) }); // fixture lessons: lesson 3 has 40 slides
  const s = createStudent(db, { fullName: 'Dilshod Rahimov', grp: 'shanba', mentor: 'Xurshid Maroziqov', createdBy: ADMIN });
  createStudent(db, { fullName: 'Sardor Karimov', grp: 'yakshanba' });
  db.prepare('UPDATE students SET last_login_at = ? WHERE id = ?').run('2026-09-12T05:30:00.000Z', s.id);
  for (const k of ['prep:0', 'prep:1', 'prep:2']) putProgress(db, s.id, k, 1);
  putProgress(db, s.id, 'sl:3', 40);
  await bot.onUpdate(msg('/find dilshod'));
  const card = texts(calls).at(-1);
  assert.ok(card.includes('Dilshod Rahimov') && card.includes(`<code>${s.id}</code>`));
  assert.match(card, /Guruh: Shanba/);
  assert.match(card, /Mentor: Xurshid Maroziqov/);
  assert.match(card, /Yaratilgan: \d{4}-\d\d-\d\d/);
  assert.match(card, /Oxirgi kirish: 2026-09-12 10:30/);
  assert.match(card, /Tayyorgarlik 3\/4 \| darslar 1\/6 bajarilgan/); // lesson 3 = its 40 slides; Kirish is not numbered, so /6
  assert.ok(!card.includes('Sardor'));
  await bot.onUpdate(msg(`/find ${s.id.toLowerCase()}`));
  assert.ok(texts(calls).at(-1).includes(s.id));
  await bot.onUpdate(msg('/find xm'));
  assert.match(texts(calls).at(-1), /hali kirmagan/);
  await bot.onUpdate(msg('/find nobodyhere'));
  assert.equal(texts(calls).at(-1), 'Hech narsa topilmadi.');
  await bot.onUpdate(msg('/find'));
  assert.match(texts(calls).at(-1), /Qidirish/);
  assert.equal(findStudents(db, "Sardor'").length, 1); // apostrophes are ignored when matching
});

test('bot: /list is paginated and filters by group', async () => {
  const { db, calls, bot } = setup();
  for (let i = 1; i <= 12; i++) createStudent(db, { fullName: `Talaba ${String(i).padStart(2, '0')}`, grp: i % 2 ? 'shanba' : 'yakshanba' });
  await bot.onUpdate(msg('/list'));
  let m = calls.at(-1).params;
  assert.match(m.text, /13 ta/);
  assert.equal(m.text.split('\n').filter((l) => /^\d+\. /.test(l)).length, 10);
  assert.deepEqual(m.reply_markup.inline_keyboard[0].map((b) => b.callback_data), ['l:all:1']);
  await bot.onUpdate(press('l:all:1'));
  m = calls.at(-1);
  assert.equal(m.method, 'editMessageText');
  assert.deepEqual([m.params.message_id, m.params.chat_id], [77, ADMIN]);
  assert.equal(m.params.text.split('\n').filter((l) => /^\d+\. /.test(l)).length, 3);
  assert.deepEqual(m.params.reply_markup.inline_keyboard[0].map((b) => b.callback_data), ['l:all:0']);
  await bot.onUpdate(msg('/list yakshanba'));
  assert.match(calls.at(-1).params.text, /Yakshanba\)<\/b>: 6 ta/);
  await bot.onUpdate(msg('/list friday'));
  assert.match(calls.at(-1).params.text, /Foydalanish/);
});

test('bot: pollOnce reads updates through the API and advances the offset', async () => {
  const { db, calls, api, bot } = setup();
  api.queue = [[{ ...msg('/help'), update_id: 40 }, { ...msg('/find xm'), update_id: 41 }], []];
  assert.equal(await bot.pollOnce(), 2);
  await bot.pollOnce();
  const polls = calls.filter((c) => c.method === 'getUpdates');
  assert.deepEqual(polls.map((p) => p.params.offset), [0, 42]);
  assert.equal(texts(calls).length, 2);
  assert.ok(db);
});

test('bot: the token never shows up in errors', async () => {
  const api = createApi('123:SECRET', async () => { throw Object.assign(new Error('fetch failed https://api.telegram.org/bot123:SECRET/x'), { cause: { code: 'ECONNRESET' } }); });
  await assert.rejects(api('getMe'), (e) => !e.message.includes('SECRET') && /ECONNRESET/.test(e.message));
  const bad = createApi('t', async () => ({ status: 401, json: async () => ({ ok: false, error_code: 401, description: 'Unauthorized' }) }));
  await assert.rejects(bad('getMe'), { code: 401 });
});

test('bot: /new phone step validates, and a duplicate shows the existing card (also one made by the API)', async () => {
  const { db, calls, bot } = setup();
  const old = createStudent(db, { fullName: 'Karim Aliyev', phone: '+998901234567', grp: 'shanba' }); // as the CRM endpoint would
  await bot.onUpdate(msg('/new_user')); // alias
  await bot.onUpdate(msg('Yangi Odam'));
  await bot.onUpdate(msg('8 90 123 45 67'));
  assert.match(texts(calls).at(-1), /notoʻgʻri/);
  await bot.onUpdate(msg('90 123 45 67')); // same number, other spelling
  const dup = texts(calls).at(-1);
  assert.match(dup, /^⚠️ Bu talaba allaqachon roʻyxatda\./);
  assert.ok(dup.includes('Karim Aliyev') && dup.includes(old.id) && dup.includes('+998901234567'));
  assert.match(dup, /Qaytadan boshlash: \/new$/);
  assert.equal(db.prepare('SELECT COUNT(*) AS c FROM students').get().c, 2);
  await bot.onUpdate(msg('Yana')); // the flow ended
  assert.match(texts(calls).at(-1), /\/help/);
});

test('bot: /new success message has the 2.0 shape with the phone', async () => {
  const { db, calls, bot } = setup();
  await bot.onUpdate(msg('/new'));
  await bot.onUpdate(msg('Dilshod Rahimov'));
  await bot.onUpdate(msg('+998 90 123 45 67'));
  await bot.onUpdate(press(calls.at(-1).params.reply_markup.inline_keyboard[0][0].callback_data));
  calls.length = 0;
  await bot.onUpdate(msg('Mentor Bir'));
  const s = db.prepare("SELECT * FROM students WHERE full_name = 'Dilshod Rahimov'").get();
  assert.equal(s.phone, '+998901234567');
  const [a, b] = texts(calls);
  assert.equal(a, `✅ Talaba yaratildi\n\nIsm: Dilshod Rahimov\nTelefon: +998901234567\nGuruh: Shanba\nMentor: Mentor Bir\n\nID: <code>${s.id}</code>\nPortal: https://portal.example/aip/`);
  assert.ok(b.includes('Assalomu alaykum, Dilshod!') && b.includes(s.id));
});

test('bot: /find also searches by phone; the card shows phone and "Guruh yoʻq"', async () => {
  const { db, calls, bot } = setup();
  const s = createStudent(db, { fullName: 'Karim Aliyev', phone: '+998901234567' });
  await bot.onUpdate(msg('/find 90 123 45 67'));
  const card = texts(calls).at(-1);
  assert.ok(card.includes(s.id) && card.includes('Telefon: +998901234567') && card.includes('Guruh yoʻq'));
  await bot.onUpdate(msg('/find +998901234567'));
  assert.ok(texts(calls).at(-1).includes(s.id));
  await bot.onUpdate(msg('/find 555 55'));
  assert.equal(texts(calls).at(-1), 'Hech narsa topilmadi.');
});

test('bot: /edit changes name, phone, group and mentor; mentor - clears; errors are explained', async () => {
  const { db, calls, bot } = setup();
  const a = createStudent(db, { fullName: 'Karim Aliyev', phone: '+998901234567', mentor: 'Bir' });
  const b = createStudent(db, { fullName: 'Vali Karimov', phone: '+998901234568' });
  const say2 = async (t) => { await bot.onUpdate(msg(t)); return texts(calls).at(-1); };
  assert.match(await say2('/edit'), /Foydalanish/);
  assert.match(await say2(`/edit ${a.id} rang qizil`), /Foydalanish/);
  assert.match(await say2('/edit AIP-NOPE22 ism Ali Veli'), /topilmadi/);
  assert.match(await say2(`/edit ${a.id.toLowerCase()} ism Karim  Aliyev Jr`), /✅ Yangilandi[\s\S]*Karim Aliyev Jr/);
  assert.equal(getStudent(db, a.id).first_name, 'Karim');
  assert.match(await say2(`/edit ${a.id} guruh Yakshanba`), /Guruh: Yakshanba/);
  assert.match(await say2(`/edit ${a.id} guruh friday`), /Xatolik/);
  assert.match(await say2(`/edit ${a.id} telefon 99 111 22 33`), /Telefon: \+998991112233/);
  assert.match(await say2(`/edit ${a.id} telefon 90 123 45 68`), new RegExp(`Bu telefon boshqa talabada: <code>${b.id}</code>`));
  assert.match(await say2(`/edit ${a.id} telefon 12`), /Xatolik/);
  assert.match(await say2(`/edit ${a.id} mentor Yangi Mentor`), /Mentor: Yangi Mentor/);
  assert.match(await say2(`/edit ${a.id} mentor -`), /Mentor: -/);
  assert.equal(getStudent(db, a.id).mentor, '');
});

test('bot: announce DMs every admin with group buttons; a button sets the group and edits the card', async () => {
  const { db, ctx, calls, bot } = setup();
  ctx.adminIds.add(333);
  const s = createStudent(db, { fullName: 'Karim <Aliyev>', phone: '+998901234567' });
  await bot.announce(s);
  const sent = calls.filter((c) => c.method === 'sendMessage');
  assert.deepEqual(sent.map((c) => c.params.chat_id), [ADMIN, ADMIN, 333, 333]);
  const card = sent[0].params;
  assert.ok(card.text.startsWith('✅ Talaba yaratildi (CRM)') && card.text.includes('Karim &lt;Aliyev&gt;') && card.text.includes('Guruh yoʻq') && !card.text.includes('Guruh: yoʻq'));
  const btns = card.reply_markup.inline_keyboard[0];
  assert.deepEqual(btns.map((x) => [x.text, x.callback_data]), [['Shanba', `sg:${s.id}:shanba`], ['Yakshanba', `sg:${s.id}:yakshanba`]]);
  assert.ok(sent[1].params.text.includes('Assalomu alaykum, Karim!') && !sent[1].params.reply_markup);
  // the second admin presses a button
  calls.length = 0;
  await bot.onUpdate(press(btns[1].callback_data, 333));
  assert.equal(getStudent(db, s.id).grp, 'yakshanba');
  assert.equal(calls[0].method, 'answerCallbackQuery');
  assert.match(calls[0].params.text, /Yakshanba/);
  const ed = calls[1];
  assert.equal(ed.method, 'editMessageText');
  assert.deepEqual([ed.params.chat_id, ed.params.message_id, ed.params.reply_markup], [333, 77, { inline_keyboard: [] }]);
  assert.ok(ed.params.text.includes('Guruh: Yakshanba') && ed.params.text.startsWith('✅ Talaba yaratildi (CRM)'));
  // the other button later: already set, nothing changes
  calls.length = 0;
  await bot.onUpdate(press(btns[0].callback_data));
  assert.match(calls[0].params.text, /allaqachon/);
  assert.equal(getStudent(db, s.id).grp, 'yakshanba');
  // unknown student
  calls.length = 0;
  await bot.onUpdate(press('sg:AIP-ZZZZZZ:shanba'));
  assert.match(calls[0].params.text, /topilmadi/);
});

test('bot: a stranger cannot press the group button', async (t) => {
  const { db, bot } = setup();
  t.mock.method(console, 'warn', () => {});
  const s = createStudent(db, { fullName: 'Karim Aliyev', phone: '+998901234567' });
  await bot.onUpdate(press(`sg:${s.id}:shanba`, OTHER));
  assert.equal(getStudent(db, s.id).grp, null);
});

test('bot: a failed announce send is only logged, with the ID and no phone', async (t) => {
  const { db, ctx } = setup();
  const err = t.mock.method(console, 'error', () => {});
  const s = createStudent(db, { fullName: 'Karim Aliyev', phone: '+998901234567' });
  const bot = makeBot({ api: async () => { throw new Error('telegram sendMessage: chat not found'); }, ctx });
  await bot.announce(s);
  assert.equal(err.mock.callCount(), 1);
  const line = err.mock.calls[0].arguments[0];
  assert.match(line, /announce #\d+ to admin/);
  assert.ok(!line.includes('90123') && !line.includes(s.id) && !line.includes('AIP-'));
});

test('bot: /list shows a missing group and /list yangi filters to those', async () => {
  const { db, calls, bot } = setup();
  const a = createStudent(db, { fullName: 'Bez Guruh' });
  createStudent(db, { fullName: 'Bor Guruh', grp: 'shanba' });
  await bot.onUpdate(msg('/list'));
  assert.match(calls.at(-1).params.text, /Bez Guruh - <code>AIP-[A-Z0-9]{6}<\/code> \(guruh yoʻq\)/);
  await bot.onUpdate(msg('/list yangi'));
  const t = calls.at(-1).params.text;
  assert.match(t, /guruhsiz\)<\/b>: 1 ta/);
  assert.ok(t.includes(a.id) && !t.includes('Bor Guruh'));
  await bot.onUpdate(msg('/list nope'));
  assert.match(calls.at(-1).params.text, /yangi/);
});

test('bot: announce shows group buttons only while there is no group', async () => {
  const { db, calls, bot } = setup();
  const s = createStudent(db, { fullName: 'Karim Aliyev', phone: '+998901234567', grp: 'shanba' });
  await bot.announce(s);
  const sent = calls.filter((c) => c.method === 'sendMessage');
  assert.equal(sent.length, 2);
  assert.ok(sent[0].params.text.includes('Guruh: Shanba'));
  assert.equal(sent[0].params.reply_markup, undefined);
});

test('bot: announce with a note (repeat payment) is a plain card: deactivated, or the CRM name', async () => {
  const { db, calls, bot } = setup();
  const s = createStudent(db, { fullName: 'Karim Aliyev', phone: '+998901234567' });
  await bot.announce(s, { inactive: true, crmName: 'Boshqa <i>Odam</i>\u202e' });
  const sent = calls.filter((c) => c.method === 'sendMessage');
  assert.equal(sent.length, 1); // no forwardable message, no buttons
  const t = sent[0].params.text;
  assert.ok(t.startsWith('⚠️ Bu telefon bilan qayta toʻlov keldi'));
  assert.ok(t.includes('faol emas') && t.includes('CRM boshqa ism yubordi: Boshqa &lt;i&gt;Odam&lt;/i&gt;') && !t.includes('\u202e'));
  assert.ok(t.includes('Karim Aliyev') && t.includes(s.id));
  assert.equal(sent[0].params.reply_markup, undefined);
});

test('bot: a shared Telegram contact answers the phone step', async () => {
  const { db, calls, bot } = setup();
  await bot.onUpdate(msg('/new'));
  await bot.onUpdate(msg('Kontakt Odam'));
  await bot.onUpdate({ update_id: 3, message: { message_id: 3, from: { id: ADMIN }, chat: { id: ADMIN, type: 'private' }, contact: { phone_number: '998901234567', first_name: 'K' } } });
  const kb = calls.at(-1).params.reply_markup;
  assert.match(calls.at(-1).params.text, /Guruhni tanlang/);
  await bot.onUpdate(press(kb.inline_keyboard[0][0].callback_data));
  await bot.onUpdate(msg('Mentor'));
  assert.equal(db.prepare("SELECT phone FROM students WHERE full_name = 'Kontakt Odam'").get().phone, '+998901234567');
});

test('bot: errors from db.js are shown in Uzbek', async () => {
  const { db, calls, bot } = setup();
  const a = createStudent(db, { fullName: 'Karim Aliyev', phone: '+998901234567' });
  await bot.onUpdate(msg(`/edit ${a.id} guruh friday`));
  assert.equal(texts(calls).at(-1), 'Xatolik: Guruh shanba yoki yakshanba boʻlishi kerak.');
  await bot.onUpdate(msg(`/edit ${a.id} telefon 12`));
  assert.equal(texts(calls).at(-1), 'Xatolik: Telefon raqami notoʻgʻri.');
  await bot.onUpdate(msg(`/edit ${a.id} ism A`));
  assert.match(texts(calls).at(-1), /^Xatolik: Ism 2-80 belgidan/);
  await bot.onUpdate(msg(`/edit ${a.id} mentor ${'m'.repeat(81)}`));
  assert.match(texts(calls).at(-1), /^Xatolik: Mentor ismi/);
  assert.ok(!texts(calls).some((x) => /must be|Group must|Full name/.test(x)));
});

test('bot: Telegram "message is not modified" is not logged as an error', async (t) => {
  const { db, ctx } = setup();
  const err = t.mock.method(console, 'error', () => {});
  const s = createStudent(db, { fullName: 'Karim Aliyev', phone: '+998901234567' });
  const bot = makeBot({ api: async () => { throw new Error('telegram editMessageText: Bad Request: message is not modified'); }, ctx });
  await bot.onUpdate(press(`sg:${s.id}:shanba`));
  assert.equal(err.mock.callCount(), 0);
  const bot2 = makeBot({ api: async () => { throw new Error('telegram editMessageText: Bad Request: chat not found'); }, ctx });
  await bot2.onUpdate(press(`sg:${s.id}:yakshanba`));
  assert.ok(err.mock.callCount() >= 1);
});

test('bot: /new checks the name and the mentor when they are typed and asks again in place', async () => {
  const { db, calls, bot } = setup();
  await bot.onUpdate(msg('/new'));
  await bot.onUpdate(msg('Ali\u0007Valiyev')); // a control character
  assert.match(texts(calls).at(-1), /maxsus belgilarsiz/);
  await bot.onUpdate(msg('Ali Valiyev')); // still on the name step, so this works
  await bot.onUpdate(msg('+998 90 123 45 67'));
  await bot.onUpdate(press(calls.at(-1).params.reply_markup.inline_keyboard[0][0].callback_data));
  await bot.onUpdate(msg('Mentor\u0007'));
  assert.match(texts(calls).at(-1), /Mentor ismini/);
  assert.equal(db.prepare("SELECT COUNT(*) AS c FROM students WHERE full_name = 'Ali Valiyev'").get().c, 0);
  await bot.onUpdate(msg('Mentor Bir'));
  assert.equal(db.prepare("SELECT mentor FROM students WHERE full_name = 'Ali Valiyev'").get().mentor, 'Mentor Bir');
});
