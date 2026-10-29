CREATE TABLE students (
  id            TEXT PRIMARY KEY,
  full_name     TEXT NOT NULL,
  first_name    TEXT NOT NULL,
  grp           TEXT NOT NULL CHECK (grp IN ('shanba', 'yakshanba')),
  mentor        TEXT NOT NULL DEFAULT '',
  active        INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
  created_at    TEXT NOT NULL,
  created_by    INTEGER,
  last_login_at TEXT
);

CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES students (id),
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX sessions_expires ON sessions (expires_at);

CREATE TABLE progress (
  student_id TEXT NOT NULL REFERENCES students (id),
  key        TEXT NOT NULL,
  value      INTEGER NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (student_id, key)
) WITHOUT ROWID;
