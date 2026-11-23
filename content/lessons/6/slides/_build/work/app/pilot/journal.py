"""The work journal (ish jurnali): one line of JSON per event, one file per day.

runtime/journal/2026-12-15.jsonl holds every question, answer, hand-over, ✅/❌ mark
and approval of that day. Kit 5 numbers and the error log (B.13) are counted from here.
Plain text on purpose: Claude Code can read it and explain what happened.

Event types:
- exchange: a question and what the bot did with it (status: answered, escalated,
  draft, error, budget, limit)
- feedback: ✅ or ❌ pressed under an answer (and a note about what was wrong)
- review: a reviewer approved, rejected or rewrote a draft (approve mode)
- relay: a person answered a hand-over by replying to the bot's message
- system: start, stop, alerts, reports sent
"""

from __future__ import annotations

import json
import secrets
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Iterator
from zoneinfo import ZoneInfo


class Journal:
    def __init__(self, runtime_dir: Path, tz: ZoneInfo, clock=None):
        self.dir = Path(runtime_dir) / "journal"
        self.tz = tz
        self._clock = clock or (lambda: datetime.now(tz))

    def now(self) -> datetime:
        return self._clock()

    @staticmethod
    def new_id() -> str:
        return secrets.token_hex(4)

    def _file(self, day: date) -> Path:
        return self.dir / f"{day.isoformat()}.jsonl"

    def write(self, event: dict) -> dict:
        now = self.now()
        event = {"ts": now.isoformat(timespec="seconds"), **event}
        self.dir.mkdir(parents=True, exist_ok=True)
        with self._file(now.date()).open("a", encoding="utf-8") as fh:
            fh.write(json.dumps(event, ensure_ascii=False) + "\n")
        return event

    def events(self, start: date, end: date) -> Iterator[dict]:
        """All events from `start` to `end`, both days included."""
        day = start
        while day <= end:
            path = self._file(day)
            if path.exists():
                with path.open(encoding="utf-8") as fh:
                    for line in fh:
                        line = line.strip()
                        if not line:
                            continue
                        try:
                            yield json.loads(line)
                        except json.JSONDecodeError:
                            continue  # a half-written line after a crash: skip it
            day += timedelta(days=1)

    def find_exchange(self, exchange_id: str, days_back: int = 14) -> dict | None:
        today = self.now().date()
        found = None
        for ev in self.events(today - timedelta(days=days_back), today):
            if ev.get("type") == "exchange" and ev.get("id") == exchange_id:
                found = ev
        return found

    def cleanup(self, keep_days: int) -> list[Path]:
        """Delete day files older than `keep_days` (data minimisation)."""
        if not self.dir.exists():
            return []
        cutoff = self.now().date() - timedelta(days=keep_days)
        removed = []
        for path in sorted(self.dir.glob("*.jsonl")):
            try:
                day = date.fromisoformat(path.stem)
            except ValueError:
                continue
            if day < cutoff:
                path.unlink()
                removed.append(path)
        return removed
