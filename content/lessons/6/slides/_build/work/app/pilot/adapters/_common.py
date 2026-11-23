"""Shared helpers for the cookbook adapters: secrets from .env, time-bucket refresh,
an HTTP client tests can replace, and masking of phones, cards and e-mails.

Nothing here talks to the network by itself; every API adapter calls `make_client()`,
which tests replace with an httpx.MockTransport.
"""

from __future__ import annotations

import os
import re
import time
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

import httpx
from dotenv import dotenv_values

from pilot.sources import Table, check_prices

TZ = ZoneInfo("Asia/Tashkent")


# ------------------------------------------------------------------ secrets


def secret(name: str, app_dir: Path) -> str:
    """A key from the process environment, else from the bot's .env file.

    The bot itself reads .env into its Config, not into os.environ, so adapters look in
    the same file: PILOT_ENV_FILE (set on the server by systemd) or app_dir/.env.
    """
    value = (os.environ.get(name) or "").strip()
    if value:
        return value
    env_file = Path(os.environ.get("PILOT_ENV_FILE") or Path(app_dir) / ".env")
    if env_file.exists():
        value = (dotenv_values(env_file).get(name) or "").strip()
    return value


def need_secret(name: str, app_dir: Path, what: str) -> str:
    value = secret(name, app_dir)
    if not value:
        raise RuntimeError(f"{name} .env faylida yo‘q ({what}). Qatorni .env ga qo‘shing, serverda: deploy.py env")
    return value


# ------------------------------------------------------------------ HTTP


def make_client() -> httpx.Client:
    """One place to build the HTTP client, so tests can swap in a MockTransport."""
    return httpx.Client(timeout=30.0, follow_redirects=True)


def http_error(system: str, resp: httpx.Response) -> RuntimeError:
    """Turn an HTTP error into one plain Uzbek sentence (no tokens, no URLs with secrets)."""
    code = resp.status_code
    if code in (401, 403):
        why = "kalit (token) noto‘g‘ri, muddati tugagan yoki huquq yetmaydi"
    elif code == 402:
        why = "tizimdagi obuna (tarif) to‘lanmagan"
    elif code == 404:
        why = "manzil topilmadi: domen yoki sozlamadagi nomni tekshiring"
    elif code in (429, 503):
        why = "so‘rovlar juda ko‘p, tizim vaqtincha chekladi; keyingi safar yana urinadi"
    elif code >= 500:
        why = "tizim serverida xato, keyinroq yana urinadi"
    else:
        why = "kutilmagan javob"
    return RuntimeError(f"{system}: HTTP {code}, {why}")


class TimedRefresh:
    """API sources are re-read at most once per `refresh_minutes` (DataStore asks `version()`)."""

    refresh_minutes: float = 30

    def version(self):
        return int(time.time() // (max(self.refresh_minutes, 1) * 60))


# ------------------------------------------------------------------ table helpers


def finish(name: str, rows: list[dict], origin: str, columns: list[str] | None,
           check: dict | None, empty_note: str) -> Table:
    """Rows -> Table, then the same privacy filter and price check the built-in reader uses."""
    table = Table.from_rows(name, rows, origin=origin)
    if not rows:
        table.problem = f"{name}: {empty_note}"
        return table
    table.keep_columns(columns)
    return check_prices(table, check or {})


def flatten(obj: dict, prefix: str = "") -> dict:
    """{"a": {"b": 1}} -> {"a/b": 1}; lists of scalars are joined with ", "."""
    out: dict = {}
    for key, value in obj.items():
        path = f"{prefix}{key}"
        if isinstance(value, dict):
            out.update(flatten(value, path + "/"))
        elif isinstance(value, list):
            if all(not isinstance(v, (dict, list)) for v in value):
                out[path] = ", ".join("" if v is None else str(v) for v in value)
        else:
            out[path] = value
    return out


def local_time(ts: float | int | str | None, with_time: bool = True) -> str:
    """Unix seconds (or milliseconds) -> 'YYYY-MM-DD HH:MM' in Tashkent time."""
    if ts in (None, "", 0, "0"):
        return ""
    value = float(ts)
    if value > 1e11:  # milliseconds
        value /= 1000
    moment = datetime.fromtimestamp(value, tz=timezone.utc).astimezone(TZ)
    return moment.strftime("%Y-%m-%d %H:%M" if with_time else "%Y-%m-%d")


def money(raw, divisor: float = 1) -> str:
    """'7650000' (minor units) with divisor 100 -> '76 500'; keeps blanks blank."""
    if raw in (None, ""):
        return ""
    try:
        value = float(str(raw).replace(" ", "").replace(",", ".")) / (divisor or 1)
    except ValueError:
        return str(raw)
    if value.is_integer():
        return f"{int(value):,}".replace(",", " ")
    return f"{value:,.2f}".replace(",", " ")


# ------------------------------------------------------------------ masking personal data

_CODES = "20|33|50|55|61|62|65|66|67|69|70|71|72|73|74|75|76|77|78|79|88|90|91|93|94|95|97|98|99"
_PHONE = re.compile(
    r"(?<![\d+])(?:\+?998[\s\-()]*)?\(?(?:" + _CODES + r")\)?[\s\-]*\d{3}[\s\-]*\d{2}[\s\-]*\d{2}(?!\d)"
)
_PHONE_998 = re.compile(r"(?<![\d+])\+?998[\s\-()]*\d{2}\)?[\s\-]*\d{3}[\s\-]*\d{2}[\s\-]*\d{2}(?!\d)")
_CARD = re.compile(r"(?<!\d)(?:\d{4}[\s\-]?){3}\d{4}(?!\d)")
_EMAIL = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+")


def mask(text: str) -> str:
    """Hide phone numbers, card numbers and e-mails in free text.

    Names written inside messages cannot be found reliably; the guides say so.
    """
    if not text:
        return text
    text = _CARD.sub("[karta]", text)
    text = _EMAIL.sub("[email]", text)
    text = _PHONE_998.sub("[telefon]", text)
    return _PHONE.sub("[telefon]", text)


class Pseudonyms:
    """Same real name -> same label ('Mijoz 1', 'Mijoz 2', ...) within one load."""

    def __init__(self, label: str):
        self.label = label
        self.ids: dict[str, str] = {}

    def __call__(self, key: str) -> str:
        if key not in self.ids:
            self.ids[key] = f"{self.label} {len(self.ids) + 1}"
        return self.ids[key]
