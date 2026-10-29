// Admin-only Telegram bot (Uzbek UI): /new creates a student ID, /find and /list look students up.
// Students never talk to it. handleUpdate() is pure logic: update in, list of Bot API calls out.
import { randomBytes } from 'node:crypto';
import { createStudent, updateStudent, getStudent, getStudentByPhone, normPhone, findStudents, listStudents, mentorList, getProgress, HttpError, studentRef, cleanName, cleanMentor, GROUPS } from './db.js';
import { isoTashkent } from './content.js';
import { windowLimiter, idCandidates } from './auth.js';

const PAGE = 10;
const STATE_TTL = 30 * 60e3;
const GROUP_LABEL = Object.fromEntries(GROUPS.map((g) => [g, g[0].toUpperCase() + g.slice(1)]));
export const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const when = (iso) => (iso ? isoTashkent(Date.parse(iso)).slice(0, 16).replace('T', ' ') : null);

const HELP = [
  '<b>AI Praktikum 3.0 - admin bot</b>',
  '',
  '/new - yangi talaba ID si yaratish (ism, telefon, guruh, mentor)',
  '/find &lt;ism, ID yoki telefon&gt; - talabani qidirish',
  '/edit &lt;ID&gt; ism|telefon|guruh|mentor &lt;qiymat&gt; - talabani tuzatish (mentor uchun - belgisi mentorni oʻchiradi)',
  '/list [shanba|yakshanba|yangi] - talabalar roʻyxati (yangi: guruhsiz)',
  '/cancel - joriy amalni bekor qilish',
  '/help - shu yordam',
].join('\n');

const say = (chat, text, extra = {}) => ({ method: 'sendMessage', params: { chat_id: chat, text, parse_mode: 'HTML', ...extra } });
const keyboard = (rows) => ({ reply_markup: { inline_keyboard: rows } });
const btn = (text, data) => ({ text, callback_data: data });

// refusals are answered at most 3 times a minute per Telegram user (and logged as often): no log or reply flood from strangers
const refusals = windowLimiter(3, 60e3);

// Uzbek texts for the errors db.js throws (its own messages are English, for the API)
const ERR_UZ = { bad_phone: 'Telefon raqami notoʻgʻri.', bad_name: 'Ism 2-80 belgidan iborat boʻlsin, maxsus belgilarsiz.', bad_group: 'Guruh shanba yoki yakshanba boʻlishi kerak.',
  bad_mentor: 'Mentor ismi 80 belgigacha boʻlsin, maxsus belgilarsiz.', duplicate_phone: 'Bu telefon allaqachon roʻyxatda.', not_found: 'Talaba topilmadi.' };
const errUz = (e) => ERR_UZ[e.code] ?? 'Xatolik yuz berdi.';
const grpText = (s) => (s.grp ? `Guruh: ${GROUP_LABEL[s.grp]}` : 'Guruh yoʻq');

function studentCard(s, ctx) {
  const p = ctx.content.summary(getProgress(ctx.db, s.id));
  return [
    `<b>${esc(s.full_name)}</b>${s.active ? '' : ' (faol emas)'}`,
    `ID: <code>${esc(s.id)}</code> | ${grpText(s)} | Mentor: ${esc(s.mentor || '-')}`,
    `Telefon: ${esc(s.phone || '-')}`,
    `Yaratilgan: ${when(s.created_at)} | Oxirgi kirish: ${when(s.last_login_at) ?? 'hali kirmagan'}`,
    `Tayyorgarlik ${p.prep[0]}/${p.prep[1]} | darslar ${p.done}/4 bajarilgan`,
  ].join('\n');
}

function listPage(grp, page, db) {
  const { total, rows } = listStudents(db, grp, PAGE, page * PAGE);
  const head = `<b>Talabalar${grp ? ` (${grp === 'none' ? 'guruhsiz' : GROUP_LABEL[grp]})` : ''}</b>: ${total} ta`;
  if (!total) return { text: `${head}
Hozircha hech kim yoʻq.`, extra: {} };
  const lines = rows.map((s, i) => `${page * PAGE + i + 1}. ${esc(s.full_name)} - <code>${esc(s.id)}</code>${grp ? '' : ` (${s.grp ? GROUP_LABEL[s.grp] : 'guruh yoʻq'})`}`);
  const nav = [];
  if (page > 0) nav.push(btn('< Oldingi', `l:${grp ?? 'all'}:${page - 1}`));
  if ((page + 1) * PAGE < total) nav.push(btn('Keyingi >', `l:${grp ?? 'all'}:${page + 1}`));
  return { text: `${head}

${lines.join('\n')}`, extra: nav.length ? keyboard([nav]) : {} };
}

// "created" message (2.0 shape); head differs for /new and for the CRM announcement
const createdText = (head, s, ctx) => [head, '', `Ism: ${esc(s.full_name)}`, `Telefon: ${esc(s.phone || '-')}`, grpText(s), `Mentor: ${esc(s.mentor || '-')}`, '', `ID: <code>${s.id}</code>`, `Portal: ${esc(ctx.portalUrl || '(PORTAL_URL sozlanmagan)')}`].join('\n');
// the message the admin forwards to the student
const forwardText = (s, ctx) => [`Assalomu alaykum, ${esc(s.first_name)}!`, 'AI Praktikum 3.0 platformasiga kirish:', esc(ctx.portalUrl || '(PORTAL_URL sozlanmagan)'), '', `Sizning shaxsiy ID: <code>${s.id}</code>`].join('\n');
const dupText = (s, ctx) => `⚠️ Bu talaba allaqachon roʻyxatda.

${studentCard(s, ctx)}

Qaytadan boshlash: /new`;

function finish(ctx, from, chat, mentor) {
  const st = ctx.state.get(from);
  ctx.state.delete(from);
  let s;
  try { s = createStudent(ctx.db, { fullName: st.name, phone: st.phone, grp: st.grp, mentor, createdBy: from }); }
  catch (e) {
    if (e.code === 'duplicate_phone') return [say(chat, dupText(getStudent(ctx.db, e.extra.id), ctx))];
    if (e instanceof HttpError) return [say(chat, `Xatolik: ${errUz(e)} /new bilan qaytadan boshlang.`)];
    throw e;
  }
  return [say(chat, createdText('✅ Talaba yaratildi', s, ctx)), say(chat, forwardText(s, ctx))];
}

export function handleUpdate(update, ctx) {
  const cb = update.callback_query;
  const msg = update.message;
  const from = (cb ?? msg)?.from;
  const chatObj = cb ? cb.message?.chat : msg?.chat;
  const chat = chatObj?.id;
  if (!from || chat == null || chatObj.type !== 'private') return []; // private chats only: groups and channels are ignored

  if (!ctx.adminIds.has(from.id)) {
    if (refusals.wait(from.id) > 0) return [];
    refusals.add(from.id);
    console.warn(`bot: refused user ${from.id} (@${from.username ?? '-'}) chat ${chat}`);
    const text = 'Kechirasiz, bu bot faqat administratorlar uchun.';
    return [cb ? { method: 'answerCallbackQuery', params: { callback_query_id: cb.id, text } } : say(chat, text)];
  }

  let st = ctx.state.get(from.id);
  if (st && Date.now() - st.at > STATE_TTL) { ctx.state.delete(from.id); st = null; }

  if (cb) {
    const ack = (text) => ({ method: 'answerCallbackQuery', params: { callback_query_id: cb.id, ...(text ? { text } : {}) } });
    const d = cb.data ?? '';
    let m;
    // announce card (from the CRM): any admin sets the group once
    if ((m = /^sg:(AIP-[A-Z0-9]{6}):(shanba|yakshanba)$/.exec(d))) {
      const s = getStudent(ctx.db, m[1]);
      if (!s) return [ack('Talaba topilmadi.')];
      const edit = (x) => ({ method: 'editMessageText', params: { chat_id: chat, message_id: cb.message.message_id, text: createdText('✅ Talaba yaratildi (CRM)', x, ctx), parse_mode: 'HTML', reply_markup: { inline_keyboard: [] } } });
      if (s.grp) return [ack(`Guruh allaqachon belgilangan: ${GROUP_LABEL[s.grp]}`), edit(s)];
      const u = updateStudent(ctx.db, s.id, { grp: m[2] });
      return [ack(`Guruh: ${GROUP_LABEL[m[2]]}`), edit(u)];
    }
    // buttons of a flow carry its nonce: a button from an older /new is stale
    if ((m = /^g:(shanba|yakshanba):([0-9a-f]+)$/.exec(d)) && st?.step === 'group' && st.nonce === m[2]) {
      const mentors = mentorList(ctx.db);
      ctx.state.set(from.id, { ...st, step: 'mentor', grp: m[1], at: Date.now(), mentors });
      return [ack(), say(chat, `Guruh: ${GROUP_LABEL[m[1]]}. Endi mentorni tanlang yoki ismini yozing.`, mentors.length ? keyboard(mentors.map((x, i) => [btn(x, `m:${i}:${st.nonce}`)])) : {})];
    }
    if ((m = /^m:(\d+):([0-9a-f]+)$/.exec(d)) && st?.step === 'mentor' && st.nonce === m[2] && st.mentors[+m[1]] !== undefined) return [ack(), ...finish(ctx, from.id, chat, st.mentors[+m[1]])];
    if ((m = /^l:(all|none|shanba|yakshanba):(\d+)$/.exec(d))) {
      const p = listPage(m[1] === 'all' ? null : m[1], Math.min(+m[2], 1e4), ctx.db);
      return [ack(), { method: 'editMessageText', params: { chat_id: chat, message_id: cb.message.message_id, text: p.text, parse_mode: 'HTML', ...p.extra } }];
    }
    return [ack('Tugma eskirgan. /new ni qayta bosing.')];
  }

  const text = typeof msg.text === 'string' ? msg.text.trim() : ''; // photos, stickers, voice have no text
  const cmd = /^\/([a-z_]+)(?:@\w+)?(?:\s+([\s\S]*))?$/i.exec(text);
  if (cmd) {
    const arg = (cmd[2] ?? '').trim();
    switch (cmd[1].toLowerCase()) {
      case 'start': case 'help': ctx.state.delete(from.id); return [say(chat, HELP)];
      case 'cancel': ctx.state.delete(from.id); return [say(chat, 'Bekor qilindi.')];
      case 'new': case 'new_user':
        ctx.state.set(from.id, { step: 'name', at: Date.now(), nonce: randomBytes(4).toString('hex') });
        return [say(chat, 'Talabaning toʻliq ismini yozing (masalan: Dilshod Rahimov). Bekor qilish: /cancel')];
      case 'find': {
        if (!arg) return [say(chat, 'Qidirish: /find &lt;ism, ID yoki telefon&gt;')];
        const rows = findStudents(ctx.db, arg, PAGE + 1);
        if (!rows.length) return [say(chat, 'Hech narsa topilmadi.')];
        const more = rows.length > PAGE ? `\n\nFaqat dastlabki ${PAGE} ta koʻrsatildi, qidiruvni aniqroq yozing.` : '';
        return [say(chat, rows.slice(0, PAGE).map((s) => studentCard(s, ctx)).join('\n\n') + more)];
      }
      case 'edit': {
        const [id, field, ...rest] = arg.split(/\s+/), val = rest.join(' ').trim();
        const key = { ism: 'fullName', telefon: 'phone', guruh: 'grp', mentor: 'mentor' }[(field ?? '').toLowerCase()];
        if (!id || !key || !val) return [say(chat, 'Foydalanish: /edit &lt;ID&gt; ism|telefon|guruh|mentor &lt;qiymat&gt;')];
        const s = idCandidates(id).map((c) => getStudent(ctx.db, c)).find(Boolean);
        if (!s) return [say(chat, 'Bunday ID topilmadi.')];
        try {
          const u = updateStudent(ctx.db, s.id, { [key]: key === 'mentor' && val === '-' ? '' : key === 'grp' ? val.toLowerCase() : val });
          return [say(chat, `✅ Yangilandi\n\n${studentCard(u, ctx)}`)];
        } catch (e) {
          if (e.code === 'duplicate_phone') return [say(chat, `⚠️ Bu telefon boshqa talabada: <code>${esc(e.extra.id)}</code>`)];
          if (e instanceof HttpError) return [say(chat, `Xatolik: ${errUz(e)}`)];
          throw e;
        }
      }
      case 'list': {
        const g = arg.toLowerCase() === 'yangi' ? 'none' : arg.toLowerCase();
        if (g && g !== 'none' && !GROUP_LABEL[g]) return [say(chat, 'Foydalanish: /list yoki /list shanba, /list yakshanba, /list yangi')];
        const p = listPage(g || null, 0, ctx.db);
        return [say(chat, p.text, p.extra)];
      }
      default: return [say(chat, 'Nomaʼlum buyruq. /help')];
    }
  }

  if (st?.step === 'name') {
    let name;
    try { name = cleanName(text); } catch { return [say(chat, 'Ism matn bilan, 2-80 belgidan iborat, maxsus belgilarsiz boʻlsin. Qaytadan yozing.')]; } // the same check createStudent does
    ctx.state.set(from.id, { ...st, step: 'phone', name, at: Date.now() });
    return [say(chat, `Ism: ${esc(name)}. Endi telefon raqamini yozing (masalan: +998 90 123 45 67).`)];
  }
  if (st?.step === 'phone') {
    const phone = normPhone(text || msg.contact?.phone_number); // typed, or a shared Telegram contact
    if (!phone) return [say(chat, 'Telefon raqami notoʻgʻri. Raqamni matn bilan yozing, masalan: +998 90 123 45 67. Qaytadan yozing.')];
    const have = getStudentByPhone(ctx.db, phone);
    if (have) { ctx.state.delete(from.id); return [say(chat, dupText(have, ctx))]; }
    ctx.state.set(from.id, { ...st, step: 'group', phone, at: Date.now() });
    return [say(chat, `${esc(st.name)}, ${esc(phone)}. Guruhni tanlang:`, keyboard([GROUPS.map((g) => btn(GROUP_LABEL[g], `g:${g}:${st.nonce}`))]))];
  }
  if (st?.step === 'mentor') {
    let mentor;
    try { mentor = cleanMentor(text); } catch { mentor = ''; }
    if (!mentor) return [say(chat, 'Mentor ismini matn bilan yozing (80 belgigacha, maxsus belgilarsiz) yoki tugmani bosing.')];
    return finish(ctx, from.id, chat, mentor);
  }
  if (st?.step === 'group') return [say(chat, 'Guruhni yuqoridagi tugmalar bilan tanlang (Shanba yoki Yakshanba).')];
  return [say(chat, 'Buyruqni tanlang: /help')];
}

// ---- Bot API over fetch
export function createApi(token, fetchFn = fetch) {
  return async (method, params = {}, { signal } = {}) => {
    let r;
    try {
      r = await fetchFn(`https://api.telegram.org/bot${token}/${method}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(params), signal: signal ?? AbortSignal.timeout(15e3) });
    } catch (e) { throw Object.assign(new Error(`telegram ${method}: network error ${e.cause?.code ?? e.name}`), { code: 0 }); } // never print e: it can carry the URL with the token
    const j = await r.json().catch(() => ({}));
    if (!j.ok) throw Object.assign(new Error(`telegram ${method}: ${j.description ?? r.status}`), { code: j.error_code ?? r.status });
    return j.result;
  };
}

export function makeBot({ api, ctx, pollSeconds = 30 }) {
  let offset = 0, stopped = false;
  const ac = new AbortController();

  async function onUpdate(update) {
    let calls;
    try { calls = handleUpdate(update, ctx); }
    catch (e) {
      console.error('bot: handler failed:', e.message);
      const chat = (update.callback_query?.message ?? update.message)?.chat;
      calls = chat?.type === 'private' && ctx.adminIds.has((update.callback_query ?? update.message)?.from?.id) ? [say(chat.id, 'Xatolik yuz berdi. Keyinroq qayta urinib koʻring.')] : [];
    }
    for (const c of calls) {
      try { await api(c.method, c.params); } catch (e) { if (!/message is not modified/i.test(e.message)) console.error('bot:', e.message); } // a double press edits to the same text
    }
  }
  async function pollOnce() {
    const updates = await api('getUpdates', { offset, timeout: pollSeconds, allowed_updates: ['message', 'callback_query'] },
      { signal: AbortSignal.any([ac.signal, AbortSignal.timeout((pollSeconds + 15) * 1000)]) });
    for (const u of updates) { offset = u.update_id + 1; await onUpdate(u); }
    return updates.length;
  }
  async function run() {
    let wait = 1000;
    await api('setMyCommands', { commands: [['new', 'Yangi talaba'], ['find', 'Talabani qidirish'], ['edit', 'Talabani tuzatish'], ['list', 'Talabalar roʻyxati'], ['help', 'Yordam']].map(([command, description]) => ({ command, description })) }).catch((e) => console.error('bot:', e.message));
    while (!stopped) {
      try { await pollOnce(); wait = 1000; }
      catch (e) {
        if (stopped) break;
        if (e.code === 401 || e.code === 404) { console.error('bot: Telegram rejected BOT_TOKEN, bot stopped. Fix the token and restart.'); return; }
        console.error('bot: polling error:', e.message, `(retry in ${wait / 1000}s)`);
        await new Promise((r) => setTimeout(r, wait));
        wait = Math.min(wait * 2, 30000);
      }
    }
  }
  // used by the portal for security alerts (e.g. the login failure budget tripped)
  async function notifyAdmins(text) {
    for (const id of ctx.adminIds) await api('sendMessage', { chat_id: id, text }).catch((e) => console.error('bot:', e.message));
  }
  // A student from the CRM: card + group buttons (only while there is no group) + the forwardable message, to every admin.
  // note = {inactive, crmName} instead: the CRM reported another payment for a known phone that looks odd (deactivated, or another name); a plain card, no buttons.
  // No outbox: a failed send is only logged (masked ID).
  async function announce(s, note = null) {
    let card;
    if (note) {
      const why = [note.inactive ? 'Bu talaba faol emas (oʻchirilgan).' : null, note.crmName ? `CRM boshqa ism yubordi: ${esc(note.crmName.replace(/[\p{Cc}\p{Cf}\p{Cs}]/gu, ''))}` : null].filter(Boolean).join('\n');
      card = say(0, `⚠️ Bu telefon bilan qayta toʻlov keldi\n${why}\n\n${studentCard(s, ctx)}`);
    } else card = say(0, createdText('✅ Talaba yaratildi (CRM)', s, ctx), s.grp ? {} : keyboard([GROUPS.map((g) => btn(GROUP_LABEL[g], `sg:${s.id}:${g}`))]));
    for (const id of ctx.adminIds) {
      try {
        await api('sendMessage', { ...card.params, chat_id: id });
        if (!note) await api('sendMessage', say(id, forwardText(s, ctx)).params);
      } catch (e) { console.error(`bot: announce ${studentRef(ctx.db, s.id)} to admin ${id} failed: ${e.message}`); }
    }
  }
  return { onUpdate, pollOnce, run, notifyAdmins, announce, stop: () => { stopped = true; ac.abort(); } };
}

export function startBot({ cfg, db, content, fetchFn }) {
  if (!cfg.adminIds.size) console.warn('bot: ADMIN_TG_IDS is empty, nobody can use the bot');
  const bot = makeBot({ api: createApi(cfg.botToken, fetchFn), ctx: { db, content, adminIds: cfg.adminIds, portalUrl: cfg.portalUrl, state: new Map() } });
  bot.run().catch((e) => console.error('bot: stopped unexpectedly:', e.message));
  console.log('admin bot polling');
  return bot;
}
