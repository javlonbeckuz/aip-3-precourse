"""Command line: `uv run pilot <command>`.

  run       start the bot (this is what the server runs 24/7)
  check     check .env, agent files and data sources (add --online to test the keys)
  ask       ask one question in the terminal, no Telegram ("pilot ask 'Optima necha pul?'")
  eval      run the test set in evals/test-set.toml
  report    print yesterday's daily report (--send: send it to the owner in Telegram)
  kit5      write the Kit 5 weekly numbers to runtime/exports (--send: send the files)
  job       run one scheduled job from agent/schedule.toml now (--send: send it to the owner)
  cleanup   delete journal days older than LOG_RETENTION_DAYS
"""

from __future__ import annotations

import argparse
import logging
import os
import signal
import sys
import time
from datetime import date, datetime, timedelta
from pathlib import Path

from .assistant import Assistant
from .budget import Budget
from .config import Config, ConfigError, load_config
from .journal import Journal
from .llm import OpenRouter
from .sources import DataStore, load_sources
from .state import State

EX_CONFIG = 78  # systemd does not restart on this code (RestartPreventExitStatus=78)


def force_utf8() -> None:
    """Always write UTF-8. On Windows, Python writes to a pipe (Claude Code, Warp) in the ANSI code
    page (cp1251/cp1252), where ✅, ⚠️ and o‘ do not exist and printing them would crash."""
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass  # replaced or closed stream (e.g. under a test runner): leave it


def setup_logging() -> None:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
    # httpx logs every request URL at INFO, and Telegram URLs contain the bot token.
    for noisy in ("httpx", "httpcore"):
        logging.getLogger(noisy).setLevel(logging.WARNING)


class App:
    """All the parts, wired together once."""

    def __init__(self, cfg: Config, tg=None, llm=None, clock=None):
        self.cfg = cfg
        self.clock = clock or (lambda: datetime.now(cfg.timezone))
        self.journal = Journal(cfg.runtime_dir, cfg.timezone, self.clock)
        self.state = State(cfg.runtime_dir)
        try:
            self.store = DataStore(load_sources(cfg.app_dir, cfg.runtime_dir), cfg.data_max_chars)
        except ValueError as exc:  # includes TOML syntax errors
            raise ConfigError(f"agent/sources.toml: {exc}") from None
        self.budget = Budget(self.journal, cfg.daily_budget_usd, cfg.monthly_budget_usd)
        self._tg = tg
        self._llm = llm

    @property
    def llm(self):
        if self._llm is None:
            self._llm = OpenRouter(self.cfg.openrouter_key, self.cfg.openrouter_base_url,
                                   app_title=f"{self.cfg.company_name} pilot")
        return self._llm

    @property
    def tg(self):
        if self._tg is None:
            from .telegram import Telegram

            self._tg = Telegram(self.cfg.telegram_token, self.cfg.telegram_api_base)
        return self._tg

    @property
    def assistant(self) -> Assistant:
        return Assistant(self.cfg, self.llm, self.store, self.budget, self.clock)

    def bot(self):
        from .bot import Bot
        from .jobs import load_jobs

        from .approval import load_rules

        try:
            load_jobs(self.cfg.app_dir)
        except ValueError as exc:
            raise ConfigError(f"agent/schedule.toml: {exc}") from None
        try:
            load_rules(self.cfg.app_dir)
        except ValueError as exc:  # includes TOML syntax errors
            raise ConfigError(f"agent/approval.toml: {exc}") from None
        return Bot(self.cfg, self.tg, self.assistant, self.journal, self.state, self.store,
                   self.budget, llm=self.llm, clock=self.clock)


# ------------------------------------------------------------------ commands


def env_txt_trap(app_dir: Path) -> bool:
    """Notepad and TextEdit like to save `.env` as `.env.txt`; then no setting is read."""
    env_file = Path(os.environ.get("PILOT_ENV_FILE") or app_dir / ".env")
    return not env_file.exists() and (env_file.parent / ".env.txt").exists()


def cmd_run(app: App, args) -> int:
    from .bot import FatalBotError

    if env_txt_trap(app.cfg.app_dir):
        print("`.env.txt` topildi, `.env` yo‘q: faylni `.env` deb qayta nomlang (env.qollanma.md)", file=sys.stderr)
    blocking = app.cfg.blocking_problems()
    for p in app.cfg.problems():
        # Missing OWNER_CHAT_ID is only a warning: the first run is how the owner learns
        # their ID (send /start or /id to the bot, it replies with the number).
        (logging.error if p in blocking else logging.warning)("config: %s", p)
    if blocking:
        return EX_CONFIG
    # systemd stops services with SIGTERM: exit cleanly (journal and state are already on disk).
    signal.signal(signal.SIGTERM, lambda *_: sys.exit(0))
    from .telegram import TelegramError

    bot = app.bot()
    try:
        bot.run_forever()
    except FatalBotError:
        print("Telegram tokeni noto‘g‘ri yoki bekor qilingan: .env dagi TELEGRAM_BOT_TOKEN ni tekshiring "
              "(BotFather, /token), keyin: uv run pilot check --online", file=sys.stderr)
        return EX_CONFIG
    except TelegramError:
        # Venue Wi-Fi down, VPN, firewall: one Uzbek line, not an English traceback.
        # On the server systemd simply starts the bot again in 5 seconds.
        print("Telegram’ga ulanib bo‘lmadi: internetni (Wi-Fi, VPN) yoki tokenni tekshiring, "
              "keyin: uv run pilot check --online", file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        logging.info("stopped")
    return 0


def cmd_check(app: App, args) -> int:
    cfg = app.cfg
    ok = True
    print("Sozlamalar tekshiruvi\n")
    if env_txt_trap(cfg.app_dir):
        print("❌ `.env.txt` topildi, `.env` yo‘q: faylni `.env` deb qayta nomlang (env.qollanma.md)")
        ok = False
    for p in cfg.problems():
        print(f"❌ {p}")
        ok = False
    print(f"• Model: {cfg.model} ({cfg.model_tier})")
    from .texts import MODE_LABELS

    access = "faqat xodimlar" if cfg.access_mode == "staff" else "hamma (public)"
    print(f"• Javob rejimi: {MODE_LABELS[cfg.reply_mode]}; kirish: {access}")
    from .approval import load_rules

    try:
        rules = load_rules(cfg.app_dir)
        if cfg.reply_mode == "topics":
            rest = ", ".join([t for t in rules.topics if t not in rules.direct_topics] + ["boshqa"])
            print(f"• Darhol boradigan mavzular: {', '.join(rules.direct_topics) or '- (hech biri)'}; "
                  f"tasdiqqa: {rest}")
            if not rules.topics:
                print("⚠️ REPLY_MODE=topics, lekin agent/approval.toml yo‘q yoki bo‘sh: hamma javob tasdiqqa boradi")
    except ValueError as exc:
        print(f"❌ agent/approval.toml: {exc}")
        ok = False
    print(f"• Limit: kuniga ${cfg.daily_budget_usd:.2f}, oyiga ${cfg.monthly_budget_usd:.2f}")
    report_at = cfg.daily_report_time.strftime("%H:%M") if cfg.daily_report_time else "o‘chiq"
    print(f"• Kunlik hisobot: {report_at}, ish vaqti {cfg.work_start:%H:%M}-{cfg.work_end:%H:%M}")
    for name in ("instructions.md", "examples.md", "memory.md"):
        path = cfg.agent_dir / name
        size = len(path.read_text(encoding="utf-8")) if path.exists() else 0
        mark = "✅" if size else ("❌" if name == "instructions.md" else "•")
        print(f"{mark} agent/{name}: {size} belgi")
        if name == "instructions.md" and not size:
            ok = False
    tables = app.store.refresh()
    if not tables:
        print("• Ma’lumot manbasi yo‘q (agent/sources.toml)")
    for t in tables:
        size = "hujjat" if t.is_document else f"{len(t.rows)} qator, ustunlar: {', '.join(t.columns)}"
        print(f"{'❌' if t.warnings else '⚠️' if (t.problem or t.stale) else '✅'} {t.name}: {size}")
        for p in (t.problem, t.stale):
            if p:
                print(f"   {p}")
        for w in t.warnings:  # e.g. a price typo: the deploy gate must stop here
            print(f"   ❌ {w}")
            ok = False
    from .jobs import load_jobs

    source_names = {t.name for t in tables}
    try:
        for job in load_jobs(cfg.app_dir):
            days = ",".join(str(d) for d in sorted(job.days))
            missing = [s for s in job.sources if s not in source_names]
            if missing:
                # e.g. the Baraka low-stock job left behind after the owner swapped in their own data
                print(f"❌ Jadval: «{job.name}» yo‘q manbani ishlatadi: {', '.join(missing)}. "
                      "Ishni agent/schedule.toml dan o‘chiring yoki o‘z manbangizga moslang")
                ok = False
            else:
                print(f"✅ Jadval: «{job.name}» soat {job.at:%H:%M}, kunlar {days}")
    except ValueError as exc:
        print(f"❌ agent/schedule.toml: {exc}")
        ok = False
    sample_blocks = False
    leftovers = sample_leftovers(cfg.app_dir)
    if leftovers and cfg.demo_sample:
        print("⚠️ Baraka demo rejimi (DEMO_SAMPLE=on): namuna fayllari ataylab qoldirilgan")
    elif leftovers:
        hard = [f for f in leftovers if f != "kit5-baseline.toml"]
        if hard:
            # Blocks the deploy: a bot with Baraka's instructions and prices must not reach staff.
            print("❌ Baraka Office namunasi hali bor: " + ", ".join(hard))
            print("   Ularni o‘zingiznikiga almashtiring (PARTICIPANT_GUIDE.uz.md, 1.3-qadam).")
            ok = False
            sample_blocks = True
        if "kit5-baseline.toml" in leftovers:
            print("⚠️ kit5-baseline.toml da hali Baraka raqamlari: 4-darsgacha o‘zingiznikiga almashtiring")
    block, _ = app.store.context_for("")
    print(f"• Ma’lumot bloki: {len(block)} belgi (chegara {cfg.data_max_chars})")
    if args.online and not cfg.problems():
        try:
            me = app.tg.get_me()
            print(f"✅ Telegram bot: @{me.get('username')}")
        except Exception as exc:  # noqa: BLE001
            print(f"❌ Telegram: {exc}")
            ok = False
        info = app.llm.key_info()
        if info is None:
            print("❌ OpenRouter kaliti ishlamadi")
            ok = False
        else:
            limit = info.get("limit")
            print(f"✅ OpenRouter kaliti: limit {'$' + format(limit, '.2f') if limit else 'YO‘Q - limit qo‘ying!'}")
    if ok:
        print("\nTayyor.")
    elif sample_blocks:
        print("\nHali tayyor emas: Baraka namunasi bor (1.3-qadam).")
    else:
        print("\nTuzatish kerak.")
    return 0 if ok else 1


# Text that exists only in the shipped Baraka Office sample. If it is still there in a real
# pilot, the owner gets Baraka answers, Baraka jobs and Baraka baseline numbers.
SAMPLE_MARKERS = {
    "agent/instructions.md": "«Baraka Office» MChJ, kursning shartli demo kompaniyasi",
    "agent/examples.md": "Optima stolidan 8 ta kerak",
    "agent/memory.md": "«140 lik stol»",
    "agent/schedule.toml": "Kam qolgan mahsulotlar",
    "kit5-baseline.toml": "\"Baraka Office\" savdo bo'limi (shartli)",
    "evals/test-set.toml": "ulgurji-optima-8",
    "data/narxlar.csv": "«Optima» ergonomik stol",
    "data/qoidalar.md": "«Baraka Office» prays-listi",
    "data/ombor-1c.csv": "Senator Lux",
}


def sample_leftovers(app_dir: Path) -> list[str]:
    from .sources import decode_bytes

    found = []
    for rel, marker in SAMPLE_MARKERS.items():
        path = app_dir / rel
        if path.exists() and marker in decode_bytes(path.read_bytes()):
            found.append(rel)
    return found


def cmd_ask(app: App, args) -> int:
    answer = app.assistant.answer(args.question, [], tier=args.tier)
    print(answer.text or f"[{answer.status}] {answer.reason}")
    cost = answer.reply.cost_usd if answer.reply else 0.0
    app.journal.write({"type": "tool", "command": "ask", "cost_usd": round(cost, 6)})  # counts toward budget
    print(f"\n--- holat: {answer.status}, model: {app.cfg.model_for(args.tier)}, "
          f"xarajat: ${cost:.5f}, manbalar: {', '.join(answer.sources) or '-'}")
    return 0


def cmd_eval(app: App, args) -> int:
    from . import evals

    path = Path(args.file) if args.file else app.cfg.app_dir / "evals" / "test-set.toml"
    cases = evals.load_cases(path)
    if args.only:
        wanted = {x.strip() for x in args.only.split(",")}
        cases = [c for c in cases if c.id in wanted]
    judge_model = app.cfg.model_for("strong") if args.judge else None
    results, cost = evals.run(app.assistant, cases, tier=args.tier,
                              judge_llm=app.llm if args.judge else None, judge_model=judge_model)
    print(evals.console_table(results))
    app.journal.write({"type": "tool", "command": "eval", "cost_usd": round(cost, 6)})  # counts toward budget
    now = app.clock()
    out = app.cfg.runtime_dir / "evals"
    out.mkdir(parents=True, exist_ok=True)
    report = out / f"eval-{now:%Y-%m-%d-%H%M}.md"
    report.write_text(evals.report_markdown(results, app.cfg.model_for(args.tier), cost, now), encoding="utf-8")
    print(f"Xarajat: ${cost:.4f}. Hisobot: {report}")
    return 0 if all(r.passed for r in results) else 1


def cmd_report(app: App, args) -> int:
    from .bot import daily_report_text

    day = date.fromisoformat(args.date) if args.date else app.clock().date() - timedelta(days=1)
    text = daily_report_text(app.cfg, app.journal, app.state, app.budget, app.store, app.clock(), day)
    print(text)
    if args.send:
        app.tg.send_message(app.cfg.owner_chat_id, text)
        app.journal.write({"type": "system", "kind": "report", "detail": f"daily {day} (manual)"})
        print("\nYuborildi.")
    return 0


def cmd_kit5(app: App, args) -> int:
    from . import kit5

    md_path, csv_path = kit5.write_exports(app.cfg, app.journal, app.clock().date())
    print(md_path.read_text(encoding="utf-8"))
    print(f"Fayllar: {md_path}\n         {csv_path}")
    if args.send:
        app.bot().send_weekly(app.cfg.owner_chat_id)
        print("Yuborildi.")
    return 0


def cmd_job(app: App, args) -> int:
    from .jobs import load_jobs

    jobs = {j.name: j for j in load_jobs(app.cfg.app_dir)}
    if args.name not in jobs:
        print("Bunday ish yo‘q. agent/schedule.toml dagi nomlar: " + (", ".join(jobs) or "(bo‘sh)"))
        return 1
    if args.send:
        print(app.bot().run_job(jobs[args.name]))
        print("\nYuborildi.")
    else:
        answer = app.assistant.answer(jobs[args.name].prompt, [])
        print(answer.text or f"[{answer.status}] {answer.reason}")
        cost = answer.reply.cost_usd if answer.reply else 0.0
        app.journal.write({"type": "tool", "command": "job", "cost_usd": round(cost, 6)})
    return 0


def cmd_cleanup(app: App, args) -> int:
    removed = app.journal.cleanup(app.cfg.log_retention_days)
    print(f"{len(removed)} ta eski jurnal fayli o‘chirildi (saqlash muddati {app.cfg.log_retention_days} kun).")
    return 0


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="pilot", description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="command", required=True)
    sub.add_parser("run")
    c = sub.add_parser("check")
    c.add_argument("--online", action="store_true", help="also test the Telegram token and OpenRouter key")
    a = sub.add_parser("ask")
    a.add_argument("question")
    a.add_argument("--tier", choices=["cheap", "balanced", "strong"])
    e = sub.add_parser("eval")
    e.add_argument("--tier", choices=["cheap", "balanced", "strong"])
    e.add_argument("--only", help="comma-separated test ids")
    e.add_argument("--file", help="another test file")
    e.add_argument("--judge", action="store_true", help="check 'mezon' rules with the strong model")
    r = sub.add_parser("report")
    r.add_argument("--date", help="YYYY-MM-DD (default: yesterday)")
    r.add_argument("--send", action="store_true")
    k = sub.add_parser("kit5")
    k.add_argument("--send", action="store_true")
    j = sub.add_parser("job")
    j.add_argument("name", help="job name from agent/schedule.toml")
    j.add_argument("--send", action="store_true")
    sub.add_parser("cleanup")
    return p


COMMANDS = {"run": cmd_run, "check": cmd_check, "ask": cmd_ask, "eval": cmd_eval,
            "report": cmd_report, "kit5": cmd_kit5, "job": cmd_job, "cleanup": cmd_cleanup}


def main(argv: list[str] | None = None) -> int:
    force_utf8()
    setup_logging()
    args = build_parser().parse_args(argv)
    try:
        cfg = load_config()
    except ConfigError as exc:
        logging.error(".env: %s", exc)
        if args.command == "run":
            time.sleep(2)
        return EX_CONFIG
    needs_llm = args.command in ("ask", "eval", "job")
    if needs_llm and not cfg.openrouter_key:
        print("OPENROUTER_API_KEY yo‘q: .env faylini to‘ldiring.")
        return EX_CONFIG
    if args.command in ("report", "kit5", "job") and args.send and (not cfg.telegram_token or cfg.owner_chat_id is None):
        print("TELEGRAM_BOT_TOKEN yoki OWNER_CHAT_ID yo‘q.")
        return EX_CONFIG
    try:
        return COMMANDS[args.command](App(cfg), args)
    except ConfigError as exc:  # a broken agent/*.toml: say which file and line, do not crash-loop
        logging.error("%s", exc)
        print(f"Xato: {exc}")
        return EX_CONFIG


if __name__ == "__main__":
    sys.exit(main())
