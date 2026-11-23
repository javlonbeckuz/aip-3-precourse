"""The Telegram side: read messages, answer, log, send reports.

One simple loop (long polling): ask Telegram for new messages, handle them one by one,
then do the scheduled jobs (daily/weekly report, held messages, journal cleanup).
No webhook, no web server, no open ports: the bot only makes outgoing requests.
"""

from __future__ import annotations

import logging
import re
import time as _time
from datetime import datetime, time, timedelta

from . import kit5, texts
from .assistant import Answer, Assistant
from .budget import Budget
from .config import Config
from .approval import ApprovalRules, load_rules, needs_approval
from .jobs import Job, load_jobs
from .journal import Journal
from .sources import DataStore
from .state import State
from .telegram import Telegram, TelegramError

log = logging.getLogger(__name__)

USER_COMMANDS = [
    ("start", "Boshlash"),
    ("yordam", "Qanday foydalaniladi"),
    ("yangi", "Yangi mavzu"),
    ("id", "Telegram ID raqamim"),
]
ADMIN_COMMANDS = {"/stop", "/davom", "/hisobot", "/hafta", "/xatolar", "/xarajat", "/holat", "/ruxsat", "/taqiq",
                  "/eslab_qol", "/xotira", "/unut", "/jadval", "/jadval_ochir", "/eslat", "/darhol"}
TIME_ARG = re.compile(r"^([01]?\d|2[0-3]):([0-5]\d)\s+(.+)$", re.S)
HISTORY_IDLE = timedelta(minutes=30)
NOTE_WAIT = timedelta(minutes=10)
KEEP_RELAYS = timedelta(days=14)


def daily_report_text(cfg, journal, state, budget, store, now, day=None) -> str:
    """Yesterday's numbers (or `day`), with the owner's "Diqqat" notes."""
    day = day or now.date() - timedelta(days=1)
    _, month = budget.spent(now)
    notes = kit5.owner_notes(state["paused"], budget.month_share(now), store.problems())
    return kit5.daily_report(cfg, journal, day, month, notes)


class FatalBotError(Exception):
    """The token is wrong or revoked: restarting will not help."""


def normalize_word(word: str) -> str:
    """'Yo‘q' -> "yo'q", 'Chegirma' -> 'chegirma' (any apostrophe, any case)."""
    from .sources import normalize

    return normalize(word.strip())


def display_name(user: dict) -> str:
    name = " ".join(p for p in (user.get("first_name"), user.get("last_name")) if p)
    return name or user.get("username") or str(user.get("id"))


class Bot:
    def __init__(self, cfg: Config, tg: Telegram, assistant: Assistant, journal: Journal,
                 state: State, store: DataStore, budget: Budget, llm=None, clock=None):
        self.cfg = cfg
        self.tg = tg
        self.assistant = assistant
        self.journal = journal
        self.state = state
        self.store = store
        self.budget = budget
        self.llm = llm
        self.clock = clock or journal.now
        self.history: dict[int, list[dict]] = {}
        self.history_seen: dict[int, datetime] = {}
        self.waiting_note: dict[int, tuple[str, datetime]] = {}
        self.file_jobs: list[Job] = load_jobs(cfg.app_dir)
        self.rules: ApprovalRules = load_rules(cfg.app_dir)
        self._backoff = 1.0

    # ================================================================ lifecycle

    def start(self) -> None:
        try:
            me = self.tg.get_me()
            self.tg.delete_webhook()
        except TelegramError as exc:
            if exc.code in (401, 404):
                raise FatalBotError("TELEGRAM_BOT_TOKEN noto‘g‘ri yoki bekor qilingan") from None
            raise
        self.tg.set_commands(USER_COMMANDS)
        log.info("bot @%s started, model %s, mode %s", me.get("username"), self.cfg.model, self.cfg.reply_mode)
        self.journal.write({"type": "system", "kind": "start", "detail": self.cfg.model})
        self._init_report_marks()
        from .__main__ import sample_leftovers

        leftovers = [f for f in sample_leftovers(self.cfg.app_dir) if f != "kit5-baseline.toml"]
        if leftovers and not self.cfg.demo_sample:
            self.alert_owner("sample", texts.SAMPLE_ALERT.format(files=", ".join(leftovers)),
                             every=timedelta(hours=12))
        self.alert_owner(
            "started",
            texts.STARTED.format(agent=self.cfg.agent_name, model=self.cfg.model, mode=self.approval_text()),
            every=timedelta(hours=6),
        )

    def run_forever(self) -> None:
        self.start()
        while True:
            self.poll_once()

    def poll_once(self, timeout: int = 25) -> None:
        try:
            updates = self.tg.get_updates(self.state["offset"], timeout=timeout)
            self._backoff = 1.0
        except TelegramError as exc:
            if exc.code in (401, 404):
                raise FatalBotError("TELEGRAM_BOT_TOKEN noto‘g‘ri yoki bekor qilingan") from None
            if exc.code == 409:
                log.error("409 Conflict: another program polls this bot token")
                self.alert_owner("conflict", texts.CONFLICT_ALERT, every=timedelta(hours=6))
            else:
                log.warning("getUpdates failed: %s", exc)
            _time.sleep(self._backoff)
            self._backoff = min(self._backoff * 2, 60.0)
            updates = []
        for update in updates:
            try:
                self.handle_update(update)
            except Exception:
                log.exception("update %s failed", update.get("update_id"))
            finally:
                # Move on even if handling failed, so one bad message cannot block the bot.
                self.state["offset"] = update["update_id"] + 1
        try:
            self.tick()
        except Exception:
            log.exception("scheduled jobs failed")

    # ================================================================ sending

    def _send(self, chat_id: int, text: str, buttons=None, reply_to=None) -> dict | None:
        """Send a message. The client already retried what was safe to retry; if it still fails,
        the failure is written to the journal (shown in /holat and the daily report), not lost silently."""
        try:
            return self.tg.send_message(chat_id, text, buttons=buttons, reply_to=reply_to)
        except TelegramError as exc:
            self._send_failed(chat_id, exc)
            return None

    def _send_file(self, chat_id: int, filename: str, content: bytes, caption: str = "") -> dict | None:
        try:
            return self.tg.send_document(chat_id, filename, content, caption)
        except TelegramError as exc:
            self._send_failed(chat_id, exc)
            return None

    def _send_failed(self, chat_id: int, exc: TelegramError) -> None:
        log.error("message to %s not delivered: %s", chat_id, exc.description)
        self.journal.write({"type": "system", "kind": "send_failed",
                            "detail": f"chat {chat_id}: {exc.code} {exc.description}"[:300]})

    def send_failures(self, hours: int = 24) -> int:
        now = self.clock()
        since = now - timedelta(hours=hours)
        return sum(1 for ev in self.journal.events(since.date(), now.date())
                   if ev.get("kind") == "send_failed" and datetime.fromisoformat(ev["ts"]) >= since)

    # ================================================================ routing

    def handle_update(self, update: dict) -> None:
        if "callback_query" in update:
            self.on_button(update["callback_query"])
            return
        msg = update.get("message")
        if not msg or msg.get("chat", {}).get("type") != "private":
            return  # groups are ignored in this template
        user = msg.get("from") or {}
        uid = user.get("id")
        chat_id = msg["chat"]["id"]
        text = msg.get("text")

        if text and text.startswith("/"):
            self.on_command(msg, text.strip())
            return
        reply_to = msg.get("reply_to_message")
        if reply_to and text and f"{chat_id}:{reply_to['message_id']}" in self.state["relays"]:
            self.on_relay(msg, text)
            return
        if not self.may_use(uid):
            self._send(chat_id, texts.NOT_ALLOWED.format(company=self.cfg.company_name, id=uid))
            return
        if uid in self.waiting_note and text:
            self.save_note(msg, text)
            return
        if msg.get("document") and self.cfg.is_admin(uid):
            self.on_upload(msg)
            return
        if not text:
            self._send(chat_id, texts.NON_TEXT)
            return
        self.on_question(msg, text.strip())

    # ================================================================ fresh export from the phone

    def on_upload(self, msg: dict) -> None:
        """The owner sends a fresh export (e.g. the 1C stock file) to the bot: check it, then use it.
        The file goes to runtime/data/ and wins over the deployed copy while it is newer."""
        import copy
        import os
        import shutil

        from .sources import file_sources

        chat_id = msg["chat"]["id"]
        doc = msg["document"]
        name = os.path.basename(doc.get("file_name") or "")
        targets = file_sources(self.store.sources)
        if name not in targets:
            self._send(chat_id, texts.UPLOAD_UNKNOWN.format(name=name or "?", names=", ".join(targets) or "-"))
            return
        if (doc.get("file_size") or 0) > 20 * 1024 * 1024:
            self._send(chat_id, texts.UPLOAD_TOO_BIG)
            return
        content = self.tg.download(self.tg.get_file(doc["file_id"])["file_path"])
        src = targets[name]
        incoming = self.cfg.runtime_dir / "data" / ".incoming"
        incoming.mkdir(parents=True, exist_ok=True)
        tmp = incoming / name
        tmp.write_bytes(content)
        # Check the upload with the source's own reader (adapters subclass FileSource, e.g. for
        # .xls web exports or Telegram JSON): a shallow copy pointed at the uploaded file.
        probe = copy.copy(src)
        probe.release_path, probe.overlay = tmp, None
        table = probe.load()
        problems = [p for p in (table.problem, *table.warnings) if p]
        if problems:
            tmp.unlink(missing_ok=True)
            self._send(chat_id, texts.UPLOAD_REJECTED.format(
                source=src.name, details="\n".join(f"• {p}" for p in problems[:10])))
            self.journal.write({"type": "system", "kind": "upload_rejected", "detail": name})
            return
        shutil.move(str(tmp), str(self.cfg.runtime_dir / "data" / name))
        size = "hujjat" if table.is_document else f"{len(table.rows)} qator"
        self._send(chat_id, texts.UPLOAD_OK.format(source=src.name, size=size))
        self.journal.write({"type": "system", "kind": "upload", "detail": name})

    def may_use(self, uid: int | None) -> bool:
        if uid is None:
            return False
        if self.cfg.is_admin(uid):
            return True
        if uid in self.state["removed_users"]:
            return False
        if self.cfg.access_mode == "public":
            return True
        return uid in self.cfg.allowed_ids or str(uid) in self.state["extra_users"]

    # ================================================================ questions

    def on_question(self, msg: dict, text: str) -> None:
        chat_id = msg["chat"]["id"]
        user = msg["from"]
        uid = user["id"]
        name = display_name(user)
        if len(text) > self.cfg.max_question_chars:
            self._send(chat_id, texts.TOO_LONG.format(limit=self.cfg.max_question_chars))
            return
        base = {"type": "exchange", "id": self.journal.new_id(), "chat_id": chat_id,
                "user_id": uid, "user_name": name, "question": text}

        if self.state["paused"]:
            self.journal.write({**base, "status": "paused"})
            self._send(chat_id, texts.PAUSED)
            return
        if self.cfg.access_mode == "public" and not self.cfg.is_admin(uid) and self._over_public_limit(uid):
            self.journal.write({**base, "status": "limit"})
            self._send(chat_id, texts.PUBLIC_LIMIT)
            return

        self.tg.send_typing(chat_id)
        mode, direct_topics = self.approval_mode()
        answer = self.assistant.answer(text, self._history(chat_id),
                                       topics=self.rules.prompt_topics(direct_topics) if mode == "topics" else None)
        event = {**base, **self._answer_fields(answer)}
        # One line per question in the server log; no names or message text there.
        log.info("exchange %s: %s, $%.4f, %d ms", event["id"], answer.status,
                 event["cost_usd"], answer.latency_ms)

        approve = mode == "approve"
        if mode == "topics" and answer.status == "answered":
            approve, why = needs_approval(direct_topics, self.rules.keywords, answer.topic, text, answer.text)
            event["topic"], event["approval_reason"] = answer.topic, why
        approve = approve and self.cfg.reviewer_chat_id is not None and not self.cfg.is_admin(uid)
        if answer.status == "answered" and approve:
            event["status"] = "draft"
            self.journal.write(event)
            self._send(chat_id, texts.WAIT_APPROVAL)
            self._ask_reviewer(event)
        elif answer.status == "answered":
            self.journal.write(event)
            buttons = None
            if self.cfg.feedback_buttons:
                buttons = [[(texts.BTN_OK, f"ok:{event['id']}"), (texts.BTN_BAD, f"no:{event['id']}")]]
            self._send(chat_id, answer.text, buttons=buttons)
            self._remember(chat_id, text, answer.text)
        else:
            self.journal.write(event)
            self._hand_over(event, answer)
        self._check_budget_alerts(answer)

    @staticmethod
    def _answer_fields(a: Answer) -> dict:
        r = a.reply
        return {
            "status": a.status, "answer": a.text, "reason": a.reason, "sources": a.sources,
            "model": r.model if r else None, "tokens_in": r.tokens_in if r else 0,
            "tokens_out": r.tokens_out if r else 0, "cost_usd": round(r.cost_usd, 6) if r else 0.0,
            "latency_ms": a.latency_ms,
        }

    def _over_public_limit(self, uid: int) -> bool:
        today = self.clock().date()
        used = sum(1 for ev in self.journal.events(today, today)
                   if ev.get("type") == "exchange" and ev.get("user_id") == uid)
        return used >= self.cfg.public_daily_limit

    # ---------------------------------------------------------------- hand-over

    def _hand_over(self, event: dict, answer: Answer) -> None:
        """Send the case to a person (Kit 3 B.6) so no request is lost."""
        target = self.cfg.escalation_chat_id
        notice = texts.ESCALATION_NOTICE.format(
            id=event["id"], name=event["user_name"], question=event["question"], reason=answer.reason)
        relay = {"chat_id": event["chat_id"], "id": event["id"], "kind": "handover"}
        later = False
        if target is not None:
            later = self._send_or_hold(target, notice, relay)
        if answer.status == "escalated":
            user_text = texts.ESCALATED_LATER if later else texts.ESCALATED
        else:
            user_text = texts.TECH_PROBLEM
        self._send(event["chat_id"], user_text)

    def _send_or_hold(self, chat_id: int, text: str, relay: dict | None = None,
                      buttons: list | None = None) -> bool:
        """Staff get bot messages only in working hours; the owner gets them at once.
        Returns True if the message was held until working hours."""
        if chat_id != self.cfg.owner_chat_id and not self.in_work_hours(self.clock()):
            outbox = self.state["outbox"]
            outbox.append({"chat_id": chat_id, "text": text, "relay": relay, "buttons": buttons})
            self.state["outbox"] = outbox
            return True
        sent = self._send(chat_id, text, buttons=buttons)
        if relay and sent:
            self._add_relay(chat_id, sent["message_id"], relay)
        return False

    def _add_relay(self, chat_id: int, message_id: int, relay: dict) -> None:
        relays = self.state["relays"]
        relays[f"{chat_id}:{message_id}"] = {**relay, "ts": self.clock().isoformat()}
        self.state["relays"] = relays

    def in_work_hours(self, now: datetime) -> bool:
        return now.isoweekday() in self.cfg.work_days and self.cfg.work_start <= now.time() < self.cfg.work_end

    # ---------------------------------------------------------------- approve mode

    def _ask_reviewer(self, event: dict) -> None:
        pending = self.state["pending"]
        pending[event["id"]] = {k: event[k] for k in ("chat_id", "user_name", "question", "answer")}
        self.state["pending"] = pending
        text = texts.APPROVAL_REQUEST.format(id=event["id"], name=event["user_name"],
                                             question=event["question"], answer=event["answer"])
        buttons = [[(texts.BTN_SEND, f"ap:{event['id']}"), (texts.BTN_REJECT, f"rj:{event['id']}")]]
        relay = {"chat_id": event["chat_id"], "id": event["id"], "kind": "draft"}
        self._send_or_hold(self.cfg.reviewer_chat_id, text, relay, buttons)

    # ---------------------------------------------------------------- buttons

    def on_button(self, cq: dict) -> None:
        data = cq.get("data") or ""
        user = cq.get("from") or {}
        uid = user.get("id")
        msg = cq.get("message") or {}
        chat_id = msg.get("chat", {}).get("id")
        kind, _, ex_id = data.partition(":")

        if kind in ("ok", "no"):
            if not self.may_use(uid):
                self.tg.answer_callback(cq["id"])
                return
            verdict = "ok" if kind == "ok" else "bad"
            self.journal.write({"type": "feedback", "id": ex_id, "verdict": verdict,
                                "by_id": uid, "by_name": display_name(user)})
            self.tg.answer_callback(cq["id"], texts.FEEDBACK_THANKS)
            if chat_id and msg.get("message_id"):
                self.tg.remove_buttons(chat_id, msg["message_id"])
            if verdict == "bad":
                self.waiting_note[uid] = (ex_id, self.clock() + NOTE_WAIT)
                self._send(chat_id, texts.FEEDBACK_ASK_NOTE)
            return

        if kind in ("ap", "rj"):
            if not (self.cfg.is_admin(uid) or uid == self.cfg.reviewer_chat_id):
                self.tg.answer_callback(cq["id"], texts.ADMIN_ONLY)
                return
            pending = self.state["pending"]
            item = pending.pop(ex_id, None)
            self.state["pending"] = pending
            self.tg.answer_callback(cq["id"], None if item else texts.ALREADY_HANDLED)
            if chat_id and msg.get("message_id"):
                self.tg.remove_buttons(chat_id, msg["message_id"])
            if not item:
                return
            if kind == "ap":
                if chat_id and msg.get("message_id"):  # a later reply to this draft must not send it twice
                    relays = self.state["relays"]
                    relays.pop(f"{chat_id}:{msg['message_id']}", None)
                    self.state["relays"] = relays
                self._send(item["chat_id"], item["answer"])
                self._remember(item["chat_id"], item["question"], item["answer"])
                self.journal.write({"type": "review", "id": ex_id, "action": "approved",
                                    "by_id": uid, "by_name": display_name(user)})
                self._send(chat_id, texts.APPROVED.format(id=ex_id))
            else:
                self.journal.write({"type": "review", "id": ex_id, "action": "rejected",
                                    "by_id": uid, "by_name": display_name(user)})
                self._send(chat_id, texts.REJECTED.format(id=ex_id))
            return
        self.tg.answer_callback(cq["id"])

    def save_note(self, msg: dict, text: str) -> None:
        uid = msg["from"]["id"]
        ex_id, until = self.waiting_note.pop(uid)
        if self.clock() > until:
            self.on_question(msg, text)  # too late: treat it as a normal question
            return
        self.journal.write({"type": "feedback_note", "id": ex_id, "note": text[:1000],
                            "by_name": display_name(msg["from"])})
        self._send(msg["chat"]["id"], texts.FEEDBACK_NOTE_SAVED)

    # ---------------------------------------------------------------- a person answers

    def on_relay(self, msg: dict, text: str) -> None:
        chat_id = msg["chat"]["id"]
        relays = self.state["relays"]
        relay = relays.pop(f"{chat_id}:{msg['reply_to_message']['message_id']}")
        self.state["relays"] = relays
        by = display_name(msg.get("from") or {})
        if relay["kind"] == "draft":
            pending = self.state["pending"]
            item = pending.pop(relay["id"], None)
            self.state["pending"] = pending
            self._send(relay["chat_id"], text)
            self.journal.write({"type": "review", "id": relay["id"], "action": "edited",
                                "by_id": msg["from"]["id"], "by_name": by, "text": text[:2000],
                                "was_pending": item is not None})
        else:
            self._send(relay["chat_id"], texts.FROM_STAFF.format(text=text))
            self.journal.write({"type": "relay", "id": relay["id"], "by_name": by, "text": text[:2000]})
        self._send(chat_id, texts.EDITED_SENT.format(id=relay["id"]))

    # ================================================================ commands

    def on_command(self, msg: dict, text: str) -> None:
        chat_id = msg["chat"]["id"]
        user = msg.get("from") or {}
        uid = user.get("id")
        cmd, _, arg = text.partition(" ")
        cmd = cmd.split("@")[0].lower()
        arg = arg.strip()
        admin = self.cfg.is_admin(uid)
        send = lambda t: self._send(chat_id, t)  # noqa: E731

        if cmd == "/id":
            send(texts.YOUR_ID.format(id=uid))
            return
        if not self.may_use(uid):
            send(texts.NOT_ALLOWED.format(company=self.cfg.company_name, id=uid))
            return
        if cmd == "/start":
            tmpl = texts.START_PUBLIC if self.cfg.access_mode == "public" else texts.START
            send(tmpl.format(agent=self.cfg.agent_name, company=self.cfg.company_name))
        elif cmd in ("/yordam", "/help"):
            send(texts.HELP + (texts.HELP_ADMIN if admin else ""))
        elif cmd == "/yangi":
            self.history.pop(chat_id, None)
            send(texts.NEW_CHAT)
        elif cmd == "/bekor":
            if self.waiting_note.pop(uid, None):
                send(texts.FEEDBACK_NOTE_SKIPPED)
        elif cmd not in ADMIN_COMMANDS:
            send(texts.HELP + (texts.HELP_ADMIN if admin else ""))
        elif not admin:
            send(texts.ADMIN_ONLY)
        elif cmd == "/stop":
            self.state["paused"] = True
            self.journal.write({"type": "system", "kind": "stop", "detail": display_name(user)})
            send(texts.STOPPED)
        elif cmd == "/davom":
            self.state["paused"] = False
            self.journal.write({"type": "system", "kind": "resume", "detail": display_name(user)})
            send(texts.RESUMED)
        elif cmd == "/hisobot":
            today = self.clock().date()
            send(self.daily_report(today))
        elif cmd == "/hafta":
            self.send_weekly(chat_id)
        elif cmd == "/xatolar":
            today = self.clock().date()
            send(kit5.error_list(self.journal, today - timedelta(days=13), today))
        elif cmd == "/xarajat":
            send(self.spend_text())
        elif cmd == "/holat":
            send(self.status_text())
        elif cmd == "/ruxsat":
            parts = arg.split(maxsplit=1)
            if not parts or not parts[0].isdigit():
                send(texts.ALLOW_USAGE)
                return
            new_id, new_name = parts[0], (parts[1] if len(parts) > 1 else "")
            extra = self.state["extra_users"]
            extra[new_id] = new_name
            self.state["extra_users"] = extra
            self.state["removed_users"] = [u for u in self.state["removed_users"] if u != int(new_id)]
            send(texts.ALLOWED.format(id=new_id, name=new_name or "-"))
        elif cmd == "/taqiq":
            if not arg.isdigit():
                send(texts.REMOVE_USAGE)
                return
            extra = self.state["extra_users"]
            extra.pop(arg, None)
            self.state["extra_users"] = extra
            self.state["removed_users"] = sorted(set(self.state["removed_users"]) | {int(arg)})
            send(texts.REMOVED.format(id=arg))
        else:
            send(self.assistant_command(cmd, arg, chat_id))

    # ================================================================ the owner's assistant (from the phone)

    @property
    def jobs(self) -> list[Job]:
        """Jobs from agent/schedule.toml plus the ones the owner added from the phone."""
        phone = [Job(name=j["name"], at=time.fromisoformat(j["time"]), days=self.cfg.work_days,
                     prompt=j["prompt"]) for j in self.state["phone_jobs"]]
        return self.file_jobs + phone

    def _memory_path(self):
        return self.cfg.runtime_dir / "memory.md"

    def _memory_lines(self) -> list[str]:
        path = self._memory_path()
        if not path.exists():
            return []
        return [line for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]

    def _approval_base(self) -> str:
        """What .env and approval.toml say now; a phone setting made on top of another base is stale."""
        return f"{self.cfg.reply_mode}:{self.rules.fingerprint}"

    def approval_mode(self) -> tuple[str, list[str]]:
        """(mode, topics that go direct). The phone setting (/darhol) wins until .env or approval.toml
        changes; then the files win again (the newer setting wins)."""
        override = self.state.data.get("approval")
        if override and override.get("base") != self._approval_base():
            self.state.data.pop("approval", None)
            self.state.save()
            self.journal.write({"type": "system", "kind": "approval", "detail": "files changed, phone setting dropped"})
            override = None
        if override:
            return override["mode"], list(override.get("direct", []))
        return self.cfg.reply_mode, list(self.rules.direct_topics)

    def approval_text(self) -> str:
        mode, direct = self.approval_mode()
        if mode == "topics":
            rest = [t for t in self.rules.topics if t not in direct] + ["boshqa"]
            return texts.APPROVAL_TOPICS.format(direct=", ".join(direct) or "-", rest=", ".join(rest))
        return texts.MODE_LABELS[mode]

    def assistant_command(self, cmd: str, arg: str, chat_id: int) -> str:
        """Memory, phone jobs and reminders: what makes the bot the owner's always-on assistant."""
        now = self.clock()
        if cmd == "/darhol":
            words = [normalize_word(w) for w in arg.replace(",", " ").split()]
            if words == ["standart"]:
                self.state.data.pop("approval", None)
                self.state.save()
            elif words in (["hammasi"], ["yoq"], ["yo'q"], ["hech"]):
                mode = "direct" if words == ["hammasi"] else "approve"
                self.state["approval"] = {"mode": mode, "base": self._approval_base()}
            elif words:
                unknown = [w for w in words if w not in self.rules.topics]
                if unknown or not self.rules.topics:
                    return texts.APPROVAL_USAGE.format(topics=", ".join(self.rules.topics) or "-")
                self.state["approval"] = {"mode": "topics", "direct": words, "base": self._approval_base()}
            if words:
                self.journal.write({"type": "system", "kind": "approval", "detail": self.approval_text()})
            return texts.APPROVAL_NOW.format(mode=self.approval_text())
        if cmd == "/eslab_qol":
            if not arg:
                return texts.MEMORY_USAGE
            path = self._memory_path()
            path.parent.mkdir(parents=True, exist_ok=True)
            lines = self._memory_lines() + [f"- {now.date().isoformat()}: {' '.join(arg.split())}"]
            path.write_text("\n".join(lines) + "\n", encoding="utf-8")
            return texts.MEMORY_SAVED
        if cmd == "/xotira":
            lines = self._memory_lines()
            if not lines:
                return texts.MEMORY_EMPTY
            return texts.MEMORY_LIST + "\n" + "\n".join(f"{i}. {line[2:]}" for i, line in enumerate(lines, 1))
        if cmd == "/unut":
            lines = self._memory_lines()
            if not arg.isdigit() or not 1 <= int(arg) <= len(lines):
                return texts.FORGET_USAGE
            removed = lines.pop(int(arg) - 1)
            self._memory_path().write_text("\n".join(lines) + ("\n" if lines else ""), encoding="utf-8")
            return texts.FORGOTTEN.format(text=removed[2:])
        if cmd == "/jadval":
            if not arg:
                lines = [f"• {j.at:%H:%M} - {j.name}" for j in self.file_jobs]
                lines += [f"{i}. {j['time']} - {j['prompt'][:80]}" for i, j in enumerate(self.state["phone_jobs"], 1)]
                return texts.JOBS_LIST + ("\n" + "\n".join(lines) if lines else "\n" + texts.JOBS_EMPTY)
            m = TIME_ARG.match(arg)
            if not m:
                return texts.JOB_USAGE
            at = time(int(m.group(1)), int(m.group(2)))
            prompt = " ".join(m.group(3).split())
            existing = {j.name for j in self.jobs}
            name, n = prompt[:40], 2
            while name in existing:
                name, n = f"{prompt[:40]} ({n})", n + 1
            phone = self.state["phone_jobs"]
            phone.append({"name": name, "time": at.strftime("%H:%M"), "prompt": prompt})
            self.state["phone_jobs"] = phone
            done = self.state.data.setdefault("jobs_done", {})
            if now.time() >= at:  # today's time already passed: start tomorrow
                done[name] = now.date().isoformat()
            self.state.save()
            return texts.JOB_ADDED.format(time=at.strftime("%H:%M"), prompt=prompt)
        if cmd == "/jadval_ochir":
            phone = self.state["phone_jobs"]
            if not arg.isdigit() or not 1 <= int(arg) <= len(phone):
                return texts.JOB_REMOVE_USAGE
            removed = phone.pop(int(arg) - 1)
            self.state["phone_jobs"] = phone
            return texts.JOB_REMOVED.format(prompt=removed["prompt"][:80])
        if cmd == "/eslat":
            m = TIME_ARG.match(arg)
            if not m:
                return texts.REMIND_USAGE
            at = now.replace(hour=int(m.group(1)), minute=int(m.group(2)), second=0, microsecond=0)
            if at <= now:
                at += timedelta(days=1)
            reminders = self.state["reminders"]
            reminders.append({"at": at.isoformat(), "chat_id": chat_id, "text": " ".join(m.group(3).split())})
            self.state["reminders"] = reminders
            day = "bugun" if at.date() == now.date() else "ertaga"
            return texts.REMIND_SET.format(day=day, time=at.strftime("%H:%M"))
        return texts.HELP + texts.HELP_ADMIN

    def _send_reminders(self, now: datetime) -> None:
        due = [r for r in self.state["reminders"] if datetime.fromisoformat(r["at"]) <= now]
        if not due:
            return
        self.state["reminders"] = [r for r in self.state["reminders"] if r not in due]
        for r in due:
            try:
                self._send(r["chat_id"], texts.REMINDER.format(text=r["text"]))
            except TelegramError as exc:
                log.warning("reminder failed: %s", exc)

    # ================================================================ owner texts

    def spend_text(self) -> str:
        today, month = self.budget.spent(self.clock())
        text = texts.SPEND.format(today=today, month=month, daily=self.cfg.daily_budget_usd,
                                  monthly=self.cfg.monthly_budget_usd)
        info = self.llm.key_info() if self.llm else None
        if info:
            remaining = info.get("limit_remaining")
            text += texts.SPEND_KEY.format(
                usage_monthly=float(info.get("usage_monthly") or 0.0),
                remaining=f"${remaining:.2f}" if isinstance(remaining, (int, float)) else "cheksiz (limit qo‘ying!)",
            )
        return text

    def status_text(self) -> str:
        lines = []
        for t in self.store.refresh():
            size = "hujjat" if t.is_document else f"{len(t.rows)} qator"
            stamp = t.loaded_at.strftime("%d.%m %H:%M") if t.loaded_at else "?"
            lines.append(f"• {t.name}: {size}, {stamp}"
                         + "".join(f"\n  ⚠️ {p}" for p in (t.problem, t.stale, *t.warnings) if p))
        access = ("hamma (public)" if self.cfg.access_mode == "public"
                  else f"{len(self.cfg.allowed_ids) + len(self.state['extra_users'])} xodim")
        failed = self.send_failures()
        text = texts.STATUS.format(
            agent=self.cfg.agent_name, state="to‘xtatilgan" if self.state["paused"] else "ishlayapti",
            model=self.cfg.model, tier=self.cfg.model_tier, mode=self.approval_text(),
            access=access, sources="\n".join(lines) or "• ulanmagan",
        )
        if failed:
            text += "\n" + texts.NOTE_SEND_FAILED.format(n=failed)
        return text

    def daily_report(self, day) -> str:
        return daily_report_text(self.cfg, self.journal, self.state, self.budget, self.store, self.clock(), day)

    def send_weekly(self, chat_id: int) -> None:
        today = self.clock().date()
        md_path, csv_path = kit5.write_exports(self.cfg, self.journal, today)
        weeks = kit5.pilot_weeks(self.cfg, today)
        caption = texts.WEEKLY_CAPTION.format(start=weeks[0][1].isoformat(), end=weeks[-1][2].isoformat())
        self._send_file(chat_id, md_path.name, md_path.read_bytes(), caption)
        self._send_file(chat_id, csv_path.name, csv_path.read_bytes())

    def alert_owner(self, key: str, text: str, every: timedelta) -> None:
        """Send an owner alert at most once per `every`."""
        if self.cfg.owner_chat_id is None:
            return
        now = self.clock()
        alerts = self.state["alerts"]
        last = alerts.get(key)
        if last and now - datetime.fromisoformat(last) < every:
            return
        if self._send(self.cfg.owner_chat_id, text) is None:
            return  # not delivered: try again next time instead of marking it sent
        alerts[key] = now.isoformat()
        self.state["alerts"] = alerts
        self.journal.write({"type": "system", "kind": "alert", "detail": key})

    def _check_budget_alerts(self, answer: Answer) -> None:
        now = self.clock()
        if answer.status == "budget":
            which = self.budget.exceeded(now) or "daily"
            today, month = self.budget.spent(now)
            spent, cap = ((today, self.cfg.daily_budget_usd) if which == "daily"
                          else (month, self.cfg.monthly_budget_usd))
            self.alert_owner(f"budget-{which}", texts.BUDGET_ALERT.format(
                which="kunlik" if which == "daily" else "oylik", spent=spent, cap=cap), every=timedelta(hours=12))
            return
        share = self.budget.month_share(now)
        if share >= 80:
            _, month = self.budget.spent(now)
            self.alert_owner(f"budget-80-{now:%Y-%m}", texts.BUDGET_WARN.format(
                pct=share, spent=month, cap=self.cfg.monthly_budget_usd), every=timedelta(days=40))

    # ================================================================ history

    def _history(self, chat_id: int) -> list[dict]:
        seen = self.history_seen.get(chat_id)
        if seen and self.clock() - seen > HISTORY_IDLE:
            self.history.pop(chat_id, None)
        return list(self.history.get(chat_id, []))

    def _remember(self, chat_id: int, question: str, answer: str) -> None:
        if self.cfg.history_turns <= 0:
            return
        turns = self.history.setdefault(chat_id, [])
        turns += [{"role": "user", "content": question}, {"role": "assistant", "content": answer}]
        del turns[: max(0, len(turns) - 2 * self.cfg.history_turns)]
        self.history_seen[chat_id] = self.clock()

    # ================================================================ scheduled jobs

    def _init_report_marks(self) -> None:
        """First start ever: do not send a report about the day before the bot existed."""
        today = self.clock().date()
        if self.state["last_daily"] is None:
            self.state["last_daily"] = today.isoformat()
        if self.state["last_weekly"] is None:
            iso = today.isocalendar()
            self.state["last_weekly"] = f"{iso[0]}-W{iso[1]:02d}"
        done = self.state.data.setdefault("jobs_done", {})
        now = self.clock()
        for job in self.jobs:  # a job whose time already passed today waits for tomorrow
            if job.name not in done and now.time() >= job.at:
                done[job.name] = today.isoformat()
        self.state.save()

    def tick(self) -> None:
        now = self.clock()
        self._flush_outbox(now)
        self._maybe_reports(now)
        self._maybe_jobs(now)
        self._send_reminders(now)
        self._daily_cleanup(now)
        problems = self.store.problems()
        if problems:  # e.g. the 1C export arrived empty: tell the owner instead of answering with zeros
            self.alert_owner("data", texts.DATA_ALERT.format(detail="; ".join(problems)),
                             every=timedelta(hours=12))

    def _flush_outbox(self, now: datetime) -> None:
        outbox = self.state["outbox"]
        if not outbox or not self.in_work_hours(now):
            return
        self.state["outbox"] = []
        for item in outbox:
            try:
                sent = self._send(item["chat_id"], item["text"], buttons=item.get("buttons"))
                if sent and item.get("relay"):
                    self._add_relay(item["chat_id"], sent["message_id"], item["relay"])
            except TelegramError as exc:
                log.warning("held message failed: %s", exc)

    def _maybe_reports(self, now: datetime) -> None:
        if self.state["last_daily"] is None:
            self._init_report_marks()
        at = self.cfg.daily_report_time
        if at is None or self.cfg.owner_chat_id is None or now.time() < at:
            return
        today = now.date()
        if self.state["last_daily"] != today.isoformat():
            self.state["last_daily"] = today.isoformat()
            self._send(self.cfg.owner_chat_id, self.daily_report(today - timedelta(days=1)))
            self.journal.write({"type": "system", "kind": "report", "detail": "daily"})
        iso = today.isocalendar()
        week_key = f"{iso[0]}-W{iso[1]:02d}"
        if self.cfg.weekly_report_day == today.isoweekday() and self.state["last_weekly"] != week_key:
            self.state["last_weekly"] = week_key
            self.send_weekly(self.cfg.owner_chat_id)
            self.journal.write({"type": "system", "kind": "report", "detail": "weekly"})

    def _maybe_jobs(self, now: datetime) -> None:
        if not self.jobs:
            return
        if self.state["last_daily"] is None:
            self._init_report_marks()
        done = self.state.data.setdefault("jobs_done", {})
        today = now.date().isoformat()
        for job in self.jobs:
            if now.isoweekday() in job.days and now.time() >= job.at and done.get(job.name) != today:
                done[job.name] = today
                self.state.save()
                self.run_job(job)

    def run_job(self, job: Job) -> str:
        """Answer the job's question from the data and send it (owner by default)."""
        answer = self.assistant.answer(job.prompt, [])
        if answer.status == "answered":
            text = f"⏰ {job.name}\n\n{answer.text}"
        else:
            text = texts.JOB_FAILED.format(name=job.name, reason=answer.reason)
        fields = self._answer_fields(answer)
        self.journal.write({"type": "job", "name": job.name, **{k: fields[k] for k in (
            "status", "answer", "reason", "model", "tokens_in", "tokens_out", "cost_usd", "latency_ms")}})
        log.info("job %s: %s, $%.4f", job.name, answer.status, fields["cost_usd"])
        target = job.send_to or self.cfg.owner_chat_id
        if target is not None:
            self._send_or_hold(int(target), text)
        self._check_budget_alerts(answer)
        return text

    def _daily_cleanup(self, now: datetime) -> None:
        key = f"cleanup-{now.date().isoformat()}"
        if self.state["alerts"].get("cleanup") == key:
            return
        removed = self.journal.cleanup(self.cfg.log_retention_days)
        if removed:
            log.info("journal cleanup removed %d day files", len(removed))
        cutoff = now - KEEP_RELAYS
        relays = {k: v for k, v in self.state["relays"].items()
                  if datetime.fromisoformat(v["ts"]) > cutoff}
        self.state["relays"] = relays
        for uid, (_, until) in list(self.waiting_note.items()):
            if now > until:
                self.waiting_note.pop(uid, None)
        alerts = self.state["alerts"]
        alerts["cleanup"] = key
        self.state["alerts"] = alerts
