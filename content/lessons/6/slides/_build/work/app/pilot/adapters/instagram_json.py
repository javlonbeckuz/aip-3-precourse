"""Instagram "Export your information" (JSON) direct messages as a table.

sources.toml:

    [[source]]
    name = "Instagram xabarlari"
    type = "instagram_json"
    path = "data/instagram-eksport.zip"   # the downloaded zip as it is, or the unzipped folder
    days = 30
    # our_names = ["Baraka Office"]   # the business account's display name; found by itself
    #                                 # when the export has 2+ conversations
    # anonymize = true, mask = true   # defaults, as in telegram_json

Meta stores text as UTF-8 bytes escaped as Latin-1 ("Ð°" instead of "а"); this reader repairs it.
Folder layout varies by year (messages/inbox/... or your_instagram_activity/messages/inbox/...),
so every messages/inbox/*/message_N.json in the zip or folder is read.
Columns: Sana, Chat, Kimdan, Matn.
"""

from __future__ import annotations

import json
import zipfile
from datetime import datetime
from pathlib import Path

from pilot.sources import FileSource, Table, check_prices

from ._common import Pseudonyms, local_time, mask


def fix_text(value: str) -> str:
    """Undo Meta's Latin-1 escaping of UTF-8; leave already-correct text alone."""
    if not value:
        return value
    try:
        return value.encode("latin-1").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        return value


def _thread_files(path: Path) -> list[tuple[str, bytes]]:
    def wanted(name: str) -> bool:
        parts = name.replace("\\", "/").split("/")
        return (len(parts) >= 3 and parts[-3] == "inbox" and "messages" in parts
                and parts[-1].startswith("message_") and parts[-1].endswith(".json"))

    if path.is_dir():
        return [(str(p.relative_to(path)), p.read_bytes()) for p in sorted(path.rglob("message_*.json"))
                if wanted(str(p.relative_to(path)))]
    with zipfile.ZipFile(path) as zf:
        return [(n, zf.read(n)) for n in sorted(zf.namelist()) if wanted(n)]


class InstagramExportSource(FileSource):
    def __init__(self, name: str, path: Path, columns=None, max_age_hours=None, check=None, *,
                 days=None, max_messages=1500, our_names=None, anonymize=True, mask_data=True):
        super().__init__(name, path, columns=columns, max_age_hours=max_age_hours, check=check)
        self.days = days
        self.max_messages = int(max_messages or 0)
        self.our_names = {fix_text(n) for n in (our_names or [])}
        self.anonymize = anonymize
        self.mask_data = mask_data

    def load(self) -> Table:
        path = self.path
        if not path.exists():
            return Table(name=self.name, origin=path.name, loaded_at=datetime.now(),
                         problem=f"{self.name}: fayl topilmadi ({path.name})")
        try:
            files = _thread_files(path)
            threads = [(name, json.loads(raw.decode("utf-8-sig"))) for name, raw in files]
        except (zipfile.BadZipFile, json.JSONDecodeError, UnicodeDecodeError, OSError) as exc:
            return Table(name=self.name, origin=path.name, loaded_at=datetime.now(),
                         problem=f"{self.name}: eksport o‘qilmadi ({exc}). JSON formatida eksport qiling")
        if not threads:
            return Table(name=self.name, origin=path.name, loaded_at=datetime.now(),
                         problem=f"{self.name}: messages/inbox topilmadi. Eksportda «Messages» va JSON tanlang")
        ours = set(self.our_names)
        if not ours:
            by_thread: dict[str, set[str]] = {}
            for name, data in threads:
                folder = name.replace("\\", "/").rsplit("/", 1)[0]
                by_thread.setdefault(folder, set()).update(
                    fix_text(p.get("name", "")) for p in data.get("participants", []))
            if len(by_thread) >= 2:
                ours = set.intersection(*by_thread.values())
        customers = Pseudonyms("Mijoz")
        rows: list[tuple[int, dict]] = []
        # Label conversations in time order: "Mijoz 1" is the one that started first.
        threads.sort(key=lambda t: min((int(m.get("timestamp_ms") or 0) for m in t[1].get("messages", [])), default=0))
        for name, data in threads:
            folder = name.replace("\\", "/").rsplit("/", 1)[0]
            people = [fix_text(p.get("name", "")) for p in data.get("participants", [])]
            peer = next((p for p in people if p not in ours), folder)
            chat_label = customers(folder) if self.anonymize else fix_text(data.get("title", "")) or peer
            for msg in data.get("messages", []):
                sender = fix_text(msg.get("sender_name", ""))
                text = fix_text(msg.get("content", "")).strip()
                if msg.get("photos"):
                    text = f"[rasm] {text}".strip()
                elif msg.get("audio_files"):
                    text = f"[ovozli xabar] {text}".strip()
                elif msg.get("videos"):
                    text = f"[video] {text}".strip()
                elif msg.get("share") and not text:
                    text = "[havola]"
                if not text:
                    continue
                if not self.anonymize:
                    who = sender
                elif sender in ours:
                    who = "Xodim"
                else:
                    who = chat_label
                ts = int(msg.get("timestamp_ms") or 0)
                rows.append((ts, {"Sana": local_time(ts), "Chat": chat_label, "Kimdan": who,
                                  "Matn": mask(text) if self.mask_data else text}))
        rows.sort(key=lambda r: r[0])
        if rows and self.days:
            newest = rows[-1][0]
            rows = [r for r in rows if r[0] >= newest - float(self.days) * 86400 * 1000]
        if self.max_messages and len(rows) > self.max_messages:
            rows = rows[-self.max_messages:]
        table = Table.from_rows(self.name, [r for _, r in rows], origin=path.name)
        if not rows:
            table.problem = f"{self.name}: matnli xabar topilmadi"
            return table
        table.keep_columns(self.columns)
        return check_prices(table, self.check or {})


def make(spec: dict, app_dir: Path) -> InstagramExportSource:
    path = Path(spec["path"])
    return InstagramExportSource(
        spec["name"], path if path.is_absolute() else app_dir / path,
        columns=spec.get("columns"), max_age_hours=spec.get("max_age_hours"), check=spec.get("check"),
        days=spec.get("days"), max_messages=spec.get("max_messages", 1500),
        our_names=spec.get("our_names"), anonymize=spec.get("anonymize", True),
        mask_data=spec.get("mask", True),
    )
