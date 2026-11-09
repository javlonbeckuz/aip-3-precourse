// A file used by several lessons (Kit 5: lessons 3, 5, 6, 7) is copied into each lesson's files/,
// because the server serves a doc only from its own lesson (gated by that lesson's time). The copies must not drift.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const lessons = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'content', 'lessons');

test('content: same-named files in different lessons are identical', () => {
  const byName = new Map(); // name -> [{ lesson, bytes }]
  for (const n of fs.readdirSync(lessons)) {
    const dir = path.join(lessons, n, 'files');
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      const bytes = fs.readFileSync(path.join(dir, name));
      byName.set(name, [...(byName.get(name) ?? []), { lesson: n, bytes }]);
    }
  }
  const drift = [...byName].filter(([, c]) => c.some((x) => !x.bytes.equals(c[0].bytes)))
    .map(([name, c]) => `${name} differs between lessons ${c.map((x) => x.lesson).join(', ')}: edit every copy`);
  assert.deepEqual(drift, []);
});
