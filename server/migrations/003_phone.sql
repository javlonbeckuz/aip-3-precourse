-- Phone number + nullable group (the CRM creates students without a group). SQLite cannot drop NOT NULL in place,
-- so students is rebuilt; migrate() runs this file with foreign_keys OFF and checks foreign_key_check afterwards.
CREATE TABLE students_new (
  id            TEXT PRIMARY KEY,
  full_name     TEXT NOT NULL,
  first_name    TEXT NOT NULL,
  grp           TEXT CHECK (grp IS NULL OR grp IN ('shanba', 'yakshanba')),
  mentor        TEXT NOT NULL DEFAULT '',
  active        INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
  created_at    TEXT NOT NULL,
  created_by    INTEGER,
  last_login_at TEXT,
  review        INTEGER NOT NULL DEFAULT 0 CHECK (review IN (0, 1)),
  phone         TEXT
);
INSERT INTO students_new (id, full_name, first_name, grp, mentor, active, created_at, created_by, last_login_at, review)
  SELECT id, full_name, first_name, grp, mentor, active, created_at, created_by, last_login_at, review FROM students;
DROP TABLE students;
ALTER TABLE students_new RENAME TO students;
CREATE UNIQUE INDEX students_phone ON students (phone) WHERE phone IS NOT NULL;
