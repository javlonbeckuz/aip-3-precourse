"""Small facts the bot must remember across restarts, in runtime/state.json.

paused        - /stop was pressed
extra_users   - staff added with /ruxsat (on top of ALLOWED_USER_IDS in .env)
removed_users - staff removed with /taqiq
last_daily / last_weekly - which reports were already sent (no duplicates, catch up after downtime)
pending       - drafts waiting for a reviewer (approve mode)
relays        - bot messages a person can reply to (hand-overs and drafts)
outbox        - messages to staff held until working hours
alerts        - when each owner alert was last sent (no spam)
offset        - last Telegram update handled (no double answers after a restart)
jobs_done     - the day each scheduled job (agent/schedule.toml) last ran
phone_jobs    - daily jobs the owner added from the phone (/jadval 09:00 ...)
reminders     - one-time reminders for the owner (/eslat 15:00 ...)
"""

from __future__ import annotations

import json
import os
from pathlib import Path

DEFAULTS = {
    "paused": False,
    "extra_users": {},
    "removed_users": [],
    "last_daily": None,
    "last_weekly": None,
    "pending": {},
    "relays": {},
    "outbox": [],
    "alerts": {},
    "offset": None,
    "jobs_done": {},
    "phone_jobs": [],
    "reminders": [],
}


class State:
    def __init__(self, runtime_dir: Path):
        self.path = Path(runtime_dir) / "state.json"
        self.data = json.loads(json.dumps(DEFAULTS))
        if self.path.exists():
            try:
                self.data.update(json.loads(self.path.read_text(encoding="utf-8")))
            except json.JSONDecodeError:
                # A broken file must not stop the bot; keep a copy for inspection.
                self.path.replace(self.path.with_suffix(".broken.json"))

    def __getitem__(self, key):
        return self.data[key]

    def __setitem__(self, key, value):
        self.data[key] = value
        self.save()

    def save(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        tmp = self.path.with_suffix(".tmp")
        tmp.write_text(json.dumps(self.data, ensure_ascii=False, indent=1), encoding="utf-8")
        os.replace(tmp, self.path)  # atomic: never a half-written state file
