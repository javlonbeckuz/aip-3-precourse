"""Settings: read once from `.env`, checked, then passed around as one object.

Secrets (bot token, OpenRouter key) live only in `.env`, never in code or chat.
Everything else has a safe default, so a new `.env` needs only a few lines.
"""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from datetime import date, time
from pathlib import Path
from typing import Mapping
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from dotenv import dotenv_values

# The app folder: the folder that holds pyproject.toml, agent/, data/.
APP_DIR = Path(__file__).resolve().parent.parent

# Model tiers. Prices per 1M tokens (input / output), read from
# https://openrouter.ai/api/v1/models on 2026-11-03. Prices change monthly:
# change the model in `.env`, not here.
DEFAULT_MODELS = {
    "cheap": "anthropic/claude-haiku-5.5",  # $0.10 / $0.50
    "balanced": "google/gemini-3.8-flash",  # $0.825 / $4.125
    "strong": "anthropic/claude-sonnet-5.5",  # $2.00 / $10.00
}
TIERS = tuple(DEFAULT_MODELS)


class ConfigError(ValueError):
    """A setting in `.env` is missing or has a wrong value."""


@dataclass
class Config:
    telegram_token: str = ""
    openrouter_key: str = ""

    owner_chat_id: int | None = None
    admin_ids: set[int] = field(default_factory=set)
    allowed_ids: set[int] = field(default_factory=set)
    access_mode: str = "staff"  # staff | public
    public_daily_limit: int = 20

    model_tier: str = "balanced"
    models: dict[str, str] = field(default_factory=lambda: dict(DEFAULT_MODELS))
    max_answer_tokens: int = 700
    temperature: float = 0.2
    daily_budget_usd: float = 1.0
    monthly_budget_usd: float = 15.0

    company_name: str = "Kompaniya"
    agent_name: str = "Yordamchi"
    reply_mode: str = "direct"  # direct | approve | topics (see pilot/approval.py)
    reviewer_chat_id: int | None = None
    escalation_chat_id: int | None = None
    feedback_buttons: bool = True
    demo_sample: bool = False  # the course's Baraka demo: sample files are allowed
    history_turns: int = 6
    max_question_chars: int = 2000
    data_max_chars: int = 12000

    timezone: ZoneInfo = field(default_factory=lambda: ZoneInfo("Asia/Tashkent"))
    daily_report_time: time | None = time(9, 0)
    weekly_report_day: int | None = 1  # 1 = Monday ... 7 = Sunday
    work_start: time = time(9, 0)
    work_end: time = time(18, 0)
    work_days: frozenset[int] = frozenset({1, 2, 3, 4, 5, 6})
    pilot_start_date: date | None = None
    log_retention_days: int = 60

    telegram_api_base: str = "https://api.telegram.org"
    openrouter_base_url: str = "https://openrouter.ai/api/v1"

    app_dir: Path = APP_DIR
    runtime_dir: Path = APP_DIR / "runtime"

    @property
    def agent_dir(self) -> Path:
        return self.app_dir / "agent"

    @property
    def model(self) -> str:
        return self.models[self.model_tier]

    def model_for(self, tier: str | None) -> str:
        if tier is None:
            return self.model
        if tier not in self.models:
            raise ConfigError(f"Unknown model tier '{tier}'. Use one of: {', '.join(TIERS)}.")
        return self.models[tier]

    def is_admin(self, user_id: int) -> bool:
        return user_id in self.admin_ids

    def blocking_problems(self) -> list[str]:
        """Without these the bot cannot start at all. The rest only limit who can use it."""
        return [p for p in self.problems() if p.startswith(("TELEGRAM_BOT_TOKEN", "OPENROUTER_API_KEY"))]

    def problems(self, need_secrets: bool = True) -> list[str]:
        """Plain-language list of what is missing. Empty list = ready."""
        out = []
        if need_secrets and not self.telegram_token:
            out.append("TELEGRAM_BOT_TOKEN yo‘q (BotFather bergan token).")
        if need_secrets and not self.openrouter_key:
            out.append("OPENROUTER_API_KEY yo‘q (openrouter.ai kaliti, limit bilan).")
        if self.owner_chat_id is None:
            out.append("OWNER_CHAT_ID yo‘q: hisobot va ogohlantirishlar kimga borishini bilmayman.")
        if self.access_mode == "staff" and not (self.allowed_ids or self.admin_ids):
            out.append("ALLOWED_USER_IDS bo‘sh: botdan hech kim foydalana olmaydi.")
        return out


# ---------------------------------------------------------------- parsing


def _ids(raw: str | None, key: str) -> set[int]:
    out = set()
    for part in (raw or "").replace(";", ",").split(","):
        part = part.strip()
        if not part:
            continue
        try:
            out.add(int(part))
        except ValueError:
            raise ConfigError(f"{key}: '{part}' is not a numeric Telegram ID.") from None
    return out


def _opt_int(raw: str | None, key: str) -> int | None:
    if raw is None or raw.strip() == "":
        return None
    try:
        return int(raw.strip())
    except ValueError:
        raise ConfigError(f"{key}: '{raw}' must be a whole number.") from None


def _int(raw: str | None, key: str, default: int, lo: int = 0) -> int:
    value = _opt_int(raw, key)
    if value is None:
        return default
    if value < lo:
        raise ConfigError(f"{key}: must be {lo} or more.")
    return value


def _float(raw: str | None, key: str, default: float) -> float:
    if raw is None or raw.strip() == "":
        return default
    try:
        value = float(raw.strip().replace(",", "."))
    except ValueError:
        raise ConfigError(f"{key}: '{raw}' must be a number like 1.50.") from None
    if value < 0:
        raise ConfigError(f"{key}: must not be negative.")
    return value


def _bool(raw: str | None, default: bool) -> bool:
    if raw is None or raw.strip() == "":
        return default
    return raw.strip().lower() in {"1", "true", "yes", "on", "ha"}


def _time(raw: str | None, key: str, default: time | None) -> time | None:
    if raw is None:
        return default
    raw = raw.strip()
    if raw == "" or raw.lower() in {"off", "no", "yoq"}:
        return None
    try:
        hh, mm = raw.split(":")
        return time(int(hh), int(mm))
    except ValueError:
        raise ConfigError(f"{key}: '{raw}' must look like 09:00.") from None


def _choice(raw: str | None, key: str, default: str, allowed: tuple[str, ...]) -> str:
    value = (raw or "").strip().lower() or default
    if value not in allowed:
        raise ConfigError(f"{key}: '{value}' must be one of: {', '.join(allowed)}.")
    return value


def _days(raw: str | None, key: str, default: frozenset[int]) -> frozenset[int]:
    if raw is None or raw.strip() == "":
        return default
    days: set[int] = set()
    for part in raw.split(","):
        part = part.strip()
        if "-" in part:
            a, b = part.split("-", 1)
            days.update(range(int(a), int(b) + 1))
        elif part:
            days.add(int(part))
    if not days or not all(1 <= d <= 7 for d in days):
        raise ConfigError(f"{key}: use day numbers 1-7 (1 = Monday), e.g. 1-6.")
    return frozenset(days)


def read_env_file(path: Path) -> dict[str, str]:
    if not path.exists():
        return {}
    return {k: v for k, v in dotenv_values(path).items() if v is not None}


def load_config(env: Mapping[str, str] | None = None, app_dir: Path | None = None) -> Config:
    """Build a Config from a mapping (tests) or from `.env` plus the process environment.

    PILOT_APP_DIR points the bot at another folder of agent/, data/ and evals/ files
    (the offline demo uses the frozen Baraka sample in tests/fixtures/baraka-app).
    """
    app_dir = app_dir or Path(os.environ.get("PILOT_APP_DIR") or APP_DIR)
    if env is None:
        env_file = Path(os.environ.get("PILOT_ENV_FILE") or app_dir / ".env")
        merged = read_env_file(env_file)
        merged.update({k: v for k, v in os.environ.items() if k.isupper()})
        env = merged
    g = env.get

    tz_name = (g("TIMEZONE") or "Asia/Tashkent").strip()
    try:
        tz = ZoneInfo(tz_name)
    except (ZoneInfoNotFoundError, ValueError):
        raise ConfigError(f"TIMEZONE: '{tz_name}' is not a known time zone.") from None

    models = dict(DEFAULT_MODELS)
    for tier in TIERS:
        value = (g(f"MODEL_{tier.upper()}") or "").strip()
        if value:
            models[tier] = value

    owner = _opt_int(g("OWNER_CHAT_ID"), "OWNER_CHAT_ID")
    admins = _ids(g("ADMIN_USER_IDS"), "ADMIN_USER_IDS")
    if owner is not None:
        admins.add(owner)

    work = (g("WORK_HOURS") or "09:00-18:00").strip()
    try:
        ws, we = work.split("-")
    except ValueError:
        raise ConfigError("WORK_HOURS: must look like 09:00-18:00.") from None

    start_raw = (g("PILOT_START_DATE") or "").strip()
    try:
        pilot_start = date.fromisoformat(start_raw) if start_raw else None
    except ValueError:
        raise ConfigError("PILOT_START_DATE: must look like 2026-12-14.") from None

    weekly = _opt_int(g("WEEKLY_REPORT_DAY"), "WEEKLY_REPORT_DAY")
    if weekly is not None and not 1 <= weekly <= 7:
        raise ConfigError("WEEKLY_REPORT_DAY: 1 = Monday ... 7 = Sunday, or empty for off.")

    runtime = g("PILOT_RUNTIME_DIR")
    cfg = Config(
        telegram_token=(g("TELEGRAM_BOT_TOKEN") or "").strip(),
        openrouter_key=(g("OPENROUTER_API_KEY") or "").strip(),
        owner_chat_id=owner,
        admin_ids=admins,
        allowed_ids=_ids(g("ALLOWED_USER_IDS"), "ALLOWED_USER_IDS"),
        access_mode=_choice(g("ACCESS_MODE"), "ACCESS_MODE", "staff", ("staff", "public")),
        public_daily_limit=_int(g("PUBLIC_DAILY_LIMIT_PER_USER"), "PUBLIC_DAILY_LIMIT_PER_USER", 20, 1),
        model_tier=_choice(g("MODEL_TIER"), "MODEL_TIER", "balanced", TIERS),
        models=models,
        max_answer_tokens=_int(g("MAX_ANSWER_TOKENS"), "MAX_ANSWER_TOKENS", 700, 50),
        temperature=_float(g("TEMPERATURE"), "TEMPERATURE", 0.2),
        daily_budget_usd=_float(g("DAILY_BUDGET_USD"), "DAILY_BUDGET_USD", 1.0),
        monthly_budget_usd=_float(g("MONTHLY_BUDGET_USD"), "MONTHLY_BUDGET_USD", 15.0),
        company_name=(g("COMPANY_NAME") or "Kompaniya").strip(),
        agent_name=(g("AGENT_NAME") or "Yordamchi").strip(),
        reply_mode=_choice(g("REPLY_MODE"), "REPLY_MODE", "direct", ("direct", "approve", "topics")),
        reviewer_chat_id=_opt_int(g("REVIEWER_CHAT_ID"), "REVIEWER_CHAT_ID") or owner,
        escalation_chat_id=_opt_int(g("ESCALATION_CHAT_ID"), "ESCALATION_CHAT_ID") or owner,
        # ✅/❌ buttons are for staff checking answers; customers (public mode) do not see them by default.
        feedback_buttons=_bool(g("FEEDBACK_BUTTONS"), (g("ACCESS_MODE") or "staff").strip().lower() == "staff"),
        history_turns=_int(g("HISTORY_TURNS"), "HISTORY_TURNS", 6),
        demo_sample=_bool(g("DEMO_SAMPLE"), False),
        max_question_chars=_int(g("MAX_QUESTION_CHARS"), "MAX_QUESTION_CHARS", 2000, 100),
        data_max_chars=_int(g("DATA_MAX_CHARS"), "DATA_MAX_CHARS", 12000, 500),
        timezone=tz,
        daily_report_time=_time(g("DAILY_REPORT_TIME"), "DAILY_REPORT_TIME", time(9, 0)),
        weekly_report_day=weekly if g("WEEKLY_REPORT_DAY") is not None else 1,
        work_start=_time(ws, "WORK_HOURS", time(9, 0)) or time(9, 0),
        work_end=_time(we, "WORK_HOURS", time(18, 0)) or time(18, 0),
        work_days=_days(g("WORK_DAYS"), "WORK_DAYS", frozenset({1, 2, 3, 4, 5, 6})),
        pilot_start_date=pilot_start,
        log_retention_days=_int(g("LOG_RETENTION_DAYS"), "LOG_RETENTION_DAYS", 60, 1),
        telegram_api_base=(g("TELEGRAM_API_BASE") or "https://api.telegram.org").rstrip("/"),
        openrouter_base_url=(g("OPENROUTER_BASE_URL") or "https://openrouter.ai/api/v1").rstrip("/"),
        app_dir=app_dir,
        runtime_dir=Path(runtime) if runtime else app_dir / "runtime",
    )
    return cfg
