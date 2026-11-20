-- Analytics (stats dashboard): a small event log and the admin sessions of the /stats page. No IPs, no typed login values, no full User-Agent.
CREATE TABLE events (
  id         INTEGER PRIMARY KEY,
  ts         INTEGER NOT NULL,   -- ms since epoch
  student_id TEXT,               -- null for a failed login
  type       TEXT NOT NULL,      -- view, login_ok, login_fail, logout, lesson, download, err
  path       TEXT,               -- view: the route (/dars/1); err: the request path
  ref        TEXT,               -- lesson: n; download: n/slug or prep/pdf; login_fail, err: the HTTP status
  device     TEXT                -- m (phone) or d (desktop)
);
CREATE INDEX events_ts ON events (ts);
CREATE INDEX events_student ON events (student_id, ts);

CREATE TABLE stats_tokens (   -- /stats admin sessions
  token_hash TEXT PRIMARY KEY,   -- sha256(sha256(STATS_KEY) + cookie token), never the token itself
  expires_at INTEGER NOT NULL
);
