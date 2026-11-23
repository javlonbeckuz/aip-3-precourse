"""Scheduled business jobs (5-dars): "every day at 9:00, send me ... from the data".

Jobs live in agent/schedule.toml. Each job is a question the agent answers from the same
data and instructions as for staff, at a fixed time, and the answer goes to the owner
(or to another chat, in working hours only). Example:

    [[job]]
    name = "Kam qolgan mahsulotlar"
    time = "09:00"
    days = "1-6"            # 1 = Monday ... 7 = Sunday
    prompt = "Ombor qoldig'idan tayyor mahsulot soni 15 donadan kam mahsulotlarni ro'yxat qil."
    sources = ["Ombor qoldig‘i (1C eksport)"]   # pilot check warns if this source is gone
    # send_to = 5002223344  # optional; default: the owner

Run one job now, without waiting:  uv run pilot job "Kam qolgan mahsulotlar" --send
"""

from __future__ import annotations

import tomllib
from dataclasses import dataclass
from datetime import time
from pathlib import Path


@dataclass
class Job:
    name: str
    at: time
    days: frozenset[int]
    prompt: str
    send_to: int | None = None
    sources: tuple[str, ...] = ()  # source names from sources.toml the job needs (checked by pilot check)


def _days(raw) -> frozenset[int]:
    if raw is None or str(raw).strip() == "":
        return frozenset(range(1, 8))
    out: set[int] = set()
    for part in str(raw).split(","):
        part = part.strip()
        if "-" in part:
            a, b = part.split("-", 1)
            out.update(range(int(a), int(b) + 1))
        elif part:
            out.add(int(part))
    if not out or not all(1 <= d <= 7 for d in out):
        raise ValueError("schedule.toml: days must be numbers 1-7, e.g. \"1-6\"")
    return frozenset(out)


def load_jobs(app_dir: Path) -> list[Job]:
    path = app_dir / "agent" / "schedule.toml"
    if not path.exists():
        return []
    raw = tomllib.loads(path.read_text(encoding="utf-8"))
    jobs, names = [], set()
    for item in raw.get("job", []):
        for key in ("name", "time", "prompt"):
            if key not in item:
                raise ValueError(f"schedule.toml: every [[job]] needs '{key}'")
        if item["name"] in names:
            raise ValueError(f"schedule.toml: job name '{item['name']}' is used twice")
        names.add(item["name"])
        try:
            hh, mm = str(item["time"]).split(":")
            at = time(int(hh), int(mm))
        except ValueError:
            raise ValueError(f"schedule.toml: time '{item['time']}' must look like 09:00") from None
        jobs.append(Job(name=item["name"], at=at, days=_days(item.get("days")),
                        prompt=item["prompt"].strip(), send_to=item.get("send_to"),
                        sources=tuple(item.get("sources", ()))))
    return jobs
