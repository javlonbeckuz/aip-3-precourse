// SQLite (node:sqlite), file migrations, students, progress.
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { randomInt } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const MIGRATIONS = path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations');
export const ID_ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
export const GROUPS = ['shanba', 'yakshanba'];
const FULL_ID = new RegExp(`^AIP-[${ID_ALPHABET}]{6}$`);

export class HttpError extends Error {
  constructor(status, code, message, extra) { super(message); this.status = status; this.code = code; this.extra = extra; }
}

export function openDb(dataDir, { seedDemo = false } = {}) {
  const file = dataDir === ':memory:' ? ':memory:' : path.join(dataDir, 'aip.db');
  if (dataDir !== ':memory:') fs.mkdirSync(dataDir, { recursive: true });
  const db = new DatabaseSync(file);
  db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;');
  migrate(db);
  seed(db, seedDemo);
  return db;
}

function migrate(db) {
  const done = db.prepare('PRAGMA user_version').get().user_version;
  const files = fs.readdirSync(MIGRATIONS).filter((f) => /^\d+_.+\.sql$/.test(f)).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  for (const f of files) {
    const v = parseInt(f, 10);
    if (v <= done) continue;
    // foreign_keys cannot change inside a transaction; OFF lets a file rebuild a referenced table (003), then we verify
    db.exec('PRAGMA foreign_keys = OFF');
    db.exec('BEGIN');
    try {
      db.exec(fs.readFileSync(path.join(MIGRATIONS, f), 'utf8'));
      const bad = db.prepare('PRAGMA foreign_key_check').all();
      if (bad.length) throw new Error(`foreign_key_check: ${bad.length} broken reference(s)`);
      db.exec(`PRAGMA user_version = ${v}`); db.exec('COMMIT');
    } catch (e) { try { db.exec('ROLLBACK'); } catch { /* no transaction left to roll back */ } e.message = `migration ${f} failed: ${e.message}`; throw e; }
    finally { db.exec('PRAGMA foreign_keys = ON'); }
  }
}

// The 2.0 demo mentor account XM (a 2-letter ID is a guessable door). Seeds it only with SEED_DEMO=1 (re-activating it) and otherwise switches an existing XM row off.
function seed(db, seedDemo) {
  if (seedDemo) {
    db.prepare(`INSERT INTO students (id, full_name, first_name, grp, mentor, created_at)
                VALUES ('XM', 'Student', 'Student', 'shanba', 'Xurshid Maroziqov', ?)
                ON CONFLICT (id) DO UPDATE SET active = 1, full_name = 'Student', first_name = 'Student'`).run(new Date().toISOString()); // students see "Student", not a real person's name

  } else db.prepare("UPDATE students SET active = 0, review = 0 WHERE id = 'XM'").run();
}

// ---- students
export function randomId(rand = randomInt) {
  let s = 'AIP-';
  for (let i = 0; i < 6; i++) s += ID_ALPHABET[rand(ID_ALPHABET.length)];
  return s;
}

// '+998 99 303 89 99', '998993038999', '993038999', '(99) 303-89-99' -> '+998993038999'; a foreign number needs '+' and 8-15 digits. null = junk.
export function normPhone(raw) {
  const t = String(raw ?? '').trim();
  if (!/^\+?[\d\s().-]+$/.test(t)) return null;
  const d = t.replace(/\D/g, ''), plus = t.startsWith('+');
  if (d.startsWith('998') && (plus || d.length > 9)) return d.length === 12 ? '+' + d : null;
  if (plus) return /^[1-9]\d{7,14}$/.test(d) ? '+' + d : null;
  return /^[1-9]\d{8}$/.test(d) ? '+998' + d : null;
}

// Invisible format characters (zero-width, bidi marks, BOM) and lone surrogates are stripped, not refused: a copied name must never
// bounce a paid buyer. Control characters left after that are refused. Uzbek ʻ ʼ and Cyrillic are letters and stay.
export const squash = (raw) => String(raw ?? '').replace(/[\p{Cf}\p{Cs}]/gu, '').trim().replace(/\s+/g, ' ');
const CTRL = /\p{Cc}/u;
export function cleanName(raw) {
  const v = squash(raw);
  if (v.length < 2 || v.length > 80 || CTRL.test(v)) throw new HttpError(400, 'bad_name', 'Full name must be 2-80 characters, no control characters');
  return v;
}
export function cleanMentor(raw) {
  const v = squash(raw);
  if (v.length > 80 || CTRL.test(v)) throw new HttpError(400, 'bad_mentor', 'Mentor must be at most 80 characters, no control characters');
  return v;
}

// Shared by create and update: validates (and normalises) the fields present in o; full = all of them are required
function clean(o, full) {
  const out = {}, has = (k) => full || k in o;
  if (has('fullName')) out.fullName = cleanName(o.fullName);
  if (has('grp')) {
    out.grp = o.grp ?? null;
    if (out.grp !== null && !GROUPS.includes(out.grp)) throw new HttpError(400, 'bad_group', 'Group must be shanba or yakshanba');
  }
  if (has('mentor')) out.mentor = cleanMentor(o.mentor);
  if (has('phone')) {
    const raw = o.phone ?? '';
    out.phone = String(raw).trim() === '' ? null : normPhone(raw);
    if (out.phone === null && String(raw).trim() !== '') throw new HttpError(400, 'bad_phone', 'Phone number is not valid');
  }
  return out;
}

const dupPhone = (db, phone, except = null) => {
  const o = phone && getStudentByPhone(db, phone);
  if (o && o.id !== except) throw new HttpError(409, 'duplicate_phone', 'This phone number is already registered', { id: o.id });
};

export function createStudent(db, { fullName, grp = null, mentor = '', phone = null, createdBy = null, id = null, allowShort = false }, rand = randomInt) {
  const c = clean({ fullName, grp, mentor, phone }, true);
  if (id && !allowShort && !FULL_ID.test(String(id).toUpperCase())) throw new HttpError(400, 'bad_id', 'Only AIP-XXXXXX ids can be created');
  dupPhone(db, c.phone);
  const ins = db.prepare('INSERT INTO students (id, full_name, first_name, grp, mentor, phone, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  const row = (sid) => {
    try { ins.run(sid, c.fullName, c.fullName.split(' ')[0], c.grp, c.mentor, c.phone, new Date().toISOString(), createdBy); }
    catch (e) { if (/students\.phone/.test(e.message)) dupPhone(db, c.phone); throw e; } // lost a race on the phone
  };
  if (id) { row(id.toUpperCase()); return getStudent(db, id.toUpperCase()); }
  for (let i = 0; i < 20; i++) { // collisions are ~1 in 887M per pair; retry anyway
    const sid = randomId(rand);
    try { row(sid); return getStudent(db, sid); } catch (e) { if (!/UNIQUE|PRIMARY/i.test(e.message) || !/students\.id/.test(e.message)) throw e; }
  }
  throw new Error('could not generate a unique student id');
}

// patch: any of {fullName, phone, grp, mentor}; returns the fresh row
export function updateStudent(db, id, patch) {
  const cur = getStudent(db, id);
  if (!cur) throw new HttpError(404, 'not_found', 'No such student');
  const c = clean(patch, false);
  if ('phone' in c) dupPhone(db, c.phone, id);
  const col = { fullName: 'full_name', grp: 'grp', mentor: 'mentor', phone: 'phone' };
  const keys = Object.keys(c);
  if (!keys.length) return cur;
  if (c.fullName) { keys.push('first'); c.first = c.fullName.split(' ')[0]; col.first = 'first_name'; }
  db.prepare(`UPDATE students SET ${keys.map((k) => col[k] + ' = ?').join(', ')} WHERE id = ?`).run(...keys.map((k) => c[k]), id);
  return getStudent(db, id);
}

export const getStudentByPhone = (db, phone) => db.prepare('SELECT * FROM students WHERE phone = ?').get(phone) ?? null;
export const getStudent = (db, id) => db.prepare('SELECT * FROM students WHERE id = ?').get(id) ?? null;
export const touchLogin = (db, id) => db.prepare('UPDATE students SET last_login_at = ? WHERE id = ?').run(new Date().toISOString(), id);
export const publicStudent = (s) => ({ id: s.id, fullName: s.full_name, firstName: s.first_name, mentor: s.mentor, group: s.grp });

// log-safe reference to a student: the SQLite rowid. The ID is a login credential, so no part of it goes to the logs.
export const studentRef = (db, id) => `#${db.prepare('SELECT rowid AS r FROM students WHERE id = ?').get(id)?.r ?? '?'}`;
export const fold = (s) => String(s).toLowerCase().replace(/[ʻʼ'`’‘]/g, '');
// ponytail: loads all rows and filters in JS (handles Cyrillic and apostrophes); fine up to a few thousand students
export function findStudents(db, text, limit = 10) {
  const q = fold(text).trim();
  if (!q) return [];
  const digits = String(text).replace(/\D/g, ''); // 4+ digits also match the phone
  return db.prepare('SELECT * FROM students ORDER BY created_at DESC').all()
    .filter((s) => fold(s.full_name).includes(q) || s.id.toLowerCase().includes(q) || (digits.length >= 4 && s.phone?.includes(digits))).slice(0, limit);
}

// grp: a group, 'none' (no group yet) or falsy (everyone)
export function listStudents(db, grp, limit, offset) {
  const where = grp === 'none' ? 'WHERE grp IS NULL' : grp ? 'WHERE grp = ?' : '';
  const args = grp && grp !== 'none' ? [grp] : [];
  const total = db.prepare(`SELECT COUNT(*) AS c FROM students ${where}`).get(...args).c;
  const rows = db.prepare(`SELECT * FROM students ${where} ORDER BY created_at DESC, id LIMIT ? OFFSET ?`).all(...args, limit, offset);
  return { total, rows };
}

export const mentorList = (db, limit = 6) =>
  db.prepare("SELECT mentor FROM students WHERE mentor <> '' GROUP BY mentor ORDER BY COUNT(*) DESC, MAX(created_at) DESC LIMIT ?").all(limit).map((r) => r.mentor);

// ---- progress: ticks `t`, slide high-water marks `sl`, (shapes of the prototype's aip3.demo.v1)
const TICK_RE = /^(prep:(?:0|[1-9]\d?)|p:[a-z0-9]{1,8}:[A-Za-z0-9]{1,8}|[xf]:[a-z0-9]{1,8})$/;
const MAX_KEYS = 600;

export function checkProgress(key, value) {
  if (typeof key !== 'string' || key.length > 40) throw new HttpError(400, 'bad_key', 'Unknown progress key');
  const sl = /^sl:([1-9])$/.exec(key); // any single digit: db.js does not know LESSON_COUNT (content.js imports db.js); the content decides what counts
  if (sl) {
    if (!Number.isInteger(value) || value < 0 || value > 1000) throw new HttpError(400, 'bad_value', 'Slide mark must be an integer 0-1000');
    return { kind: 'sl', value };
  }
  if (!TICK_RE.test(key)) throw new HttpError(400, 'bad_key', 'Unknown progress key');
  if (![1, 0, true, false, null].includes(value)) throw new HttpError(400, 'bad_value', 'Value must be 1, 0 or null');
  return { kind: 'tick', value: value ? 1 : 0 };
}

export function putProgress(db, sid, key, value) {
  const c = checkProgress(key, value);
  const now = new Date().toISOString();
  if (c.kind === 'tick' && !c.value) { db.prepare('DELETE FROM progress WHERE student_id = ? AND key = ?').run(sid, key); return; }
  const have = db.prepare('SELECT value FROM progress WHERE student_id = ? AND key = ?').get(sid, key);
  if (!have && db.prepare('SELECT COUNT(*) AS c FROM progress WHERE student_id = ?').get(sid).c >= MAX_KEYS)
    throw new HttpError(400, 'too_many_keys', 'Too many progress keys');
  db.prepare(`INSERT INTO progress (student_id, key, value, updated_at) VALUES (?, ?, ?, ?)
              ON CONFLICT (student_id, key) DO UPDATE SET value = ${c.kind === 'sl' ? 'MAX(value, excluded.value)' : 'excluded.value'}, updated_at = excluded.updated_at`)
    .run(sid, key, c.value, now);
}

export function getProgress(db, sid) {
  const p = { t: {}, sl: {} };
  for (const r of db.prepare('SELECT key, value FROM progress WHERE student_id = ?').all(sid)) {
    if (r.key.startsWith('sl:')) p.sl[r.key.slice(3)] = r.value;
    else p.t[r.key] = 1;
  }
  return p;
}
