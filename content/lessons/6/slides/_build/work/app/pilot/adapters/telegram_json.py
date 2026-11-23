"""Telegram Desktop chat export (result.json, "Machine-readable JSON") as a table.

sources.toml:

    [[source]]
    name = "Telegram savdo chatlari"
    type = "telegram_json"
    path = "data/telegram-savdo.json"   # result.json, renamed
    days = 30                 # only the last 30 days of the file (counted back from its newest message)
    max_messages = 1500       # keep the newest N messages
    # chats = ["Baraka savdo guruhi"]   # only these chats (names as in Telegram)
    # our_names = ["Baraka Office"]     # in groups: senders who are "us" (shown as "Xodim")
    # anonymize = true          # default: customers become "Mijoz 1", "Mijoz 2", staff "Xodim"
    # mask = true               # default: phones, cards, e-mails become [telefon], [karta], [email]

Works for a one-chat export and for the full account export (chats.list).
Columns: Sana, Chat, Kimdan, Matn.  Format facts: core.telegram.org/import-export (checked 2026-11-03).
"""

from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

from pilot.sources import FileSource, Table, check_prices

from ._common import TZ, Pseudonyms, local_time, mask

PERSONAL = {"personal_chat"}
GROUPS = {"private_group", "private_supergroup", "public_supergroup"}
DEFAULT_TYPES = PERSONAL | GROUPS
MEDIA = {
    "voice_message": "ovozli xabar", "video_message": "video xabar", "video_file": "video",
    "audio_file": "audio", "animation": "GIF", "sticker": "stiker",
}


def message_text(msg: dict) -> str:
    """Plain text of a message: text_entities if present (always a list), else text (str or list)."""
    parts = msg.get("text_entities")
    if isinstance(parts, list) and parts:
        return "".join(p.get("text", "") for p in parts if isinstance(p, dict))
    raw = msg.get("text", "")
    if isinstance(raw, str):
        return raw
    return "".join(p if isinstance(p, str) else p.get("text", "") for p in raw)


def media_note(msg: dict) -> str:
    kind = msg.get("media_type")
    if kind in MEDIA:
        note = MEDIA[kind]
        secs = msg.get("duration_seconds")
        if kind == "sticker" and msg.get("sticker_emoji"):
            note += f" {msg['sticker_emoji']}"
        elif secs:
            note += f", {int(secs) // 60}:{int(secs) % 60:02d}"
        return f"[{note}]"
    if "photo" in msg:
        return "[rasm]"
    if "file" in msg:
        suffix = Path(str(msg.get("file_name") or msg.get("file") or "")).suffix
        return f"[fayl{(' ' + suffix) if suffix else ''}]"
    if "contact_information" in msg:
        return "[kontakt]"
    if "location_information" in msg:
        return "[joylashuv]"
    if "poll" in msg:
        return f"[so‘rovnoma: {msg['poll'].get('question', '')}]"
    return ""


def chats_of(data: dict) -> list[dict]:
    if isinstance(data.get("chats"), dict):  # full account export
        return list(data["chats"].get("list", []))
    if "messages" in data:  # one-chat export
        return [data]
    raise ValueError("bu Telegram eksporti emas: 'messages' yoki 'chats' topilmadi")


class TelegramExportSource(FileSource):
    def __init__(self, name: str, path: Path, columns=None, max_age_hours=None, check=None, *,
                 days=None, max_messages=1500, chats=None, chat_types=None, our_names=None,
                 anonymize=True, mask_data=True):
        super().__init__(name, path, columns=columns, max_age_hours=max_age_hours, check=check)
        self.days = days
        self.max_messages = int(max_messages or 0)
        self.chats = set(chats or [])
        self.chat_types = set(chat_types or DEFAULT_TYPES)
        self.our_names = set(our_names or [])
        self.anonymize = anonymize
        self.mask_data = mask_data

    def load(self) -> Table:
        path = self.path
        if not path.exists():
            return Table(name=self.name, origin=path.name, loaded_at=datetime.now(),
                         problem=f"{self.name}: fayl topilmadi ({path.name})")
        try:
            data = json.loads(path.read_bytes().decode("utf-8-sig"))
            chats = chats_of(data)
        except (UnicodeDecodeError, json.JSONDecodeError, ValueError) as exc:
            return Table(name=self.name, origin=path.name, loaded_at=datetime.now(),
                         problem=f"{self.name}: JSON o‘qilmadi ({exc}). Eksportda «Machine-readable JSON» tanlang")
        owner_id = ""
        info = data.get("personal_information") if isinstance(data, dict) else None
        if isinstance(info, dict) and info.get("user_id"):
            owner_id = f"user{info['user_id']}"
        raw: list[tuple] = []  # (time, kind, title, peer, sender_id, sender, ours, text)
        for chat in chats:
            kind = chat.get("type", "")
            title = chat.get("name") or ""
            if kind not in self.chat_types or (self.chats and title not in self.chats):
                continue
            peer = f"user{chat.get('id')}" if kind in PERSONAL else ""
            for msg in chat.get("messages", []):
                if msg.get("type") != "message":
                    continue
                body = message_text(msg).strip()
                note = media_note(msg)
                text = f"{note} {body}".strip() if note else body
                if not text:
                    continue
                ts = int(msg.get("date_unixtime") or 0)
                if not ts and msg.get("date"):
                    ts = int(datetime.fromisoformat(msg["date"]).replace(tzinfo=TZ).timestamp())
                sender_id = str(msg.get("from_id") or "")
                sender = msg.get("from") or ""
                ours = bool(sender in self.our_names or (owner_id and sender_id == owner_id) or (
                    kind in PERSONAL and sender_id and sender_id != peer))
                raw.append((ts, kind, title, peer, sender_id, sender, ours, text))
        raw.sort(key=lambda r: r[0])
        if raw and self.days:
            newest = raw[-1][0]
            raw = [r for r in raw if r[0] >= newest - float(self.days) * 86400]
        if self.max_messages and len(raw) > self.max_messages:
            raw = raw[-self.max_messages:]
        # Labels are given in time order, so "Mijoz 1" is the first customer in the period.
        customers = Pseudonyms("Mijoz")
        others = Pseudonyms("Ishtirokchi")
        rows: list[tuple[int, dict]] = []
        for ts, kind, title, peer, sender_id, sender, ours, text in raw:
            if not self.anonymize:
                who, chat_label = sender or "?", title
            elif kind in PERSONAL:
                chat_label = customers(peer or title)
                who = "Xodim" if ours else chat_label
            else:
                chat_label = title
                who = "Xodim" if ours else others(sender_id or sender or "?")
            rows.append((ts, {
                "Sana": local_time(ts),
                "Chat": chat_label,
                "Kimdan": who,
                "Matn": mask(text) if self.mask_data else text,
            }))
        table = Table.from_rows(self.name, [r for _, r in rows], origin=path.name)
        if not rows:
            table.problem = f"{self.name}: tanlangan chatlarda matnli xabar yo‘q"
            return table
        table.keep_columns(self.columns)
        return check_prices(table, self.check or {})


def make(spec: dict, app_dir: Path) -> TelegramExportSource:
    path = Path(spec["path"])
    return TelegramExportSource(
        spec["name"], path if path.is_absolute() else app_dir / path,
        columns=spec.get("columns"), max_age_hours=spec.get("max_age_hours"), check=spec.get("check"),
        days=spec.get("days"), max_messages=spec.get("max_messages", 1500), chats=spec.get("chats"),
        chat_types=spec.get("chat_types"), our_names=spec.get("our_names"),
        anonymize=spec.get("anonymize", True), mask_data=spec.get("mask", True),
    )
