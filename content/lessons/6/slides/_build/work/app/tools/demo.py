"""Offline end-to-end run: the real bot process against fake Telegram and fake OpenRouter.

    uv run python -m tools.demo

What happens (no internet, no keys):
 1. A fake Telegram + OpenRouter server starts on 127.0.0.1.
 2. `pilot run` starts as a separate process, exactly as on the server.
 3. A staff member asks questions; the bot reads data/, answers, logs, hands over.
 4. The staff member presses ❌ and writes what was wrong (error log, Kit 5 B.13).
 5. The owner stops and resumes the bot (/stop, /davom).
 6. `pilot report --send`, the 08:30 business job (`pilot job ... --send`) and `pilot kit5 --send`
    run as the schedule would run them.
 7. `pilot eval` runs the test set against the fake model.
The transcript is printed and saved to _build/e2e-transcript.md.
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
import time
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

from .fake_services import FakeServices

APP_DIR = Path(__file__).resolve().parent.parent
# The demo always runs on the frozen Baraka sample, also after the owner swapped in their own data.
SAMPLE_APP = APP_DIR / "tests" / "fixtures" / "baraka-app"
OWNER, LEAD, STAFF = 1001, 1002, 2001
STRANGER = 9999


def run_demo(write_transcript: bool = True) -> dict:
    svc = FakeServices().start()
    tmp = Path(tempfile.mkdtemp(prefix="pilot-demo-"))
    runtime = tmp / "runtime"
    env_file = tmp / ".env"
    env_file.write_text("\n".join([
        "TELEGRAM_BOT_TOKEN=123456:FAKE-demo-token",
        "OPENROUTER_API_KEY=sk-or-fake-demo",
        f"OWNER_CHAT_ID={OWNER}",
        f"ADMIN_USER_IDS={LEAD}",
        f"ALLOWED_USER_IDS={STAFF}",
        "COMPANY_NAME=Baraka Office",
        "AGENT_NAME=Savdo yordamchisi",
        "DAILY_REPORT_TIME=",
        f"TELEGRAM_API_BASE={svc.url}",
        f"OPENROUTER_BASE_URL={svc.url}/api/v1",
        f"PILOT_RUNTIME_DIR={runtime}",
        "DEMO_SAMPLE=on",
    ]) + "\n", encoding="utf-8")
    env = {k: v for k, v in os.environ.items() if not k.startswith(("TELEGRAM_", "OPENROUTER_", "OWNER_"))}
    env.update({"PILOT_ENV_FILE": str(env_file), "PYTHONUNBUFFERED": "1", "PILOT_APP_DIR": str(SAMPLE_APP),
                # Child processes write UTF-8 on every OS (Windows would use cp1251/cp1252).
                "PYTHONUTF8": "1", "PYTHONIOENCODING": "utf-8"})
    utf8 = {"encoding": "utf-8", "errors": "replace"}
    cli = [sys.executable, "-m", "pilot"]
    lines: list[str] = []
    chat: list[dict] = []  # the same conversation, structured, for samples/ and screenshots
    who = {OWNER: "Rahbar", LEAD: "Loyiha yetakchisi", STAFF: "Menejer Bekzod", STRANGER: "Begona odam"}

    def say(user: int, text: str, **extra) -> None:
        chat.append({"chat": user, "from": "person", "text": text, "reply": bool(extra.get("reply_to"))})
        lines.append(f"\n**{who[user]} → bot:** {text}")
        svc.control("message", {"user_id": user, "first_name": who[user].split()[-1], "text": text, **extra})

    def press(user: int, data: str, message_id: int, label: str) -> None:
        chat.append({"chat": user, "from": "press", "text": label.split(" (")[0]})
        lines.append(f"\n**{who[user]} bosdi:** {label}")
        svc.control("button", {"user_id": user, "first_name": who[user].split()[-1], "data": data,
                               "message_id": message_id})

    seen = {"n": 0}

    def expect(chat_id: int, contains: str) -> dict:
        msg = svc.wait_for(lambda m: m["chat_id"] == chat_id and contains in m["text"]
                           and m["message_id"] > seen.get(chat_id, 0))
        seen[chat_id] = msg["message_id"]
        buttons = ""
        if msg.get("markup"):
            buttons = "  [" + "] [".join(b["text"] for row in msg["markup"]["inline_keyboard"] for b in row) + "]"
        text = msg["text"].replace("<b>", "**").replace("</b>", "**").replace("&lt;", "<").replace("&gt;", ">")
        chat.append({"chat": chat_id, "from": "bot", "text": text.replace("&amp;", "&"),
                     "buttons": [b["text"] for row in (msg.get("markup") or {}).get("inline_keyboard", [])
                                 for b in row]})
        lines.append(f"\n**bot → {who[chat_id]}:**\n\n> " + text.replace("\n", "\n> ") + buttons)
        return msg

    lines.append(f"# Offline end-to-end run\n\nDate: {datetime.now(ZoneInfo('Asia/Tashkent')):%Y-%m-%d %H:%M} "
                 "(Tashkent). Real `pilot run` process; fake Telegram and fake OpenRouter on 127.0.0.1.\n")
    check = subprocess.run(cli + ["check"], cwd=APP_DIR, env=env, capture_output=True, **utf8)
    lines.append("## 1. `pilot check`\n\n```\n" + check.stdout.strip() + "\n```")

    lines.append("\n## 2. The bot runs and people write to it")
    bot = subprocess.Popen(cli + ["run"], cwd=APP_DIR, env=env, stdout=subprocess.PIPE,
                           stderr=subprocess.STDOUT, **utf8)
    try:
        expect(OWNER, "ishga tushdi")
        say(STRANGER, "Salom, narxlar qancha?")
        expect(STRANGER, str(STRANGER))
        say(STAFF, "/start")
        expect(STAFF, "Assalomu alaykum")
        say(STAFF, "Optima stolidan 8 ta kerak, qancha bo'ladi?")
        ans = expect(STAFF, "15 120 000")
        say(STAFF, "Start stoli 2 dona necha pul?")
        wrong = expect(STAFF, "2 900 000")
        bad_data = wrong["markup"]["inline_keyboard"][0][1]["callback_data"]
        press(STAFF, bad_data, wrong["message_id"], "❌ Xato (for the demo: the manager disagrees)")
        expect(STAFF, "Nima noto‘g‘ri edi?")
        say(STAFF, "Mijoz 2 ta emas, 5 ta deb aytgan edi, ulgurji narx kerak")
        expect(STAFF, "Yozib qo‘ydim")
        say(STAFF, "Senator kreslo omborda nechta bor?")
        expect(STAFF, "CH-203-BR")
        say(STAFF, "Mijoz 35 millionlik buyurtmaga 15% chegirma so'rayapti, bera olamanmi?")
        expect(STAFF, "xodim beradi")
        notice = expect(OWNER, "Odamga uzatildi")
        say(OWNER, "5% gacha bering, qolganini men gaplashaman.", reply_to=notice["message_id"])
        expect(STAFF, "5% gacha bering")
        expect(OWNER, "yuborildi")
        say(LEAD, "/stop")
        expect(LEAD, "to‘xtatildi")
        say(STAFF, "ErgoPro necha pul?")
        expect(STAFF, "vaqtincha to‘xtatilgan")
        say(LEAD, "/davom")
        expect(LEAD, "yana ishlayapti")
        say(OWNER, "/eslab_qol Menejerlar «140 lik stol» deganda Optima stolini (WS-102) nazarda tutadi")
        expect(OWNER, "Eslab qoldim")
        say(OWNER, "/jadval 07:45 Ombordan 15 donadan kam qolgan mahsulotlar ro'yxatini yubor")
        expect(OWNER, "Har ish kuni")
        say(OWNER, "/eslat 15:00 Jamshid aka bilan tender bo'yicha gaplashish")
        expect(OWNER, "Eslataman")
        say(OWNER, "/holat")
        expect(OWNER, "Holat")
    finally:
        bot.terminate()
        try:
            bot_log = bot.communicate(timeout=10)[0]
        except subprocess.TimeoutExpired:
            bot.kill()
            bot_log = bot.communicate()[0]

    lines.append("\n## 3. Scheduled jobs, run by hand\n")
    today = datetime.now(ZoneInfo("Asia/Tashkent")).date().isoformat()
    rep = subprocess.run(cli + ["report", "--send", "--date", today], cwd=APP_DIR, env=env,
                         capture_output=True, **utf8)
    report_msg = expect(OWNER, "Kunlik hisobot")
    lines.append("\n`pilot job \"Kam qolgan mahsulotlar\" --send` (the 08:30 business job in agent/schedule.toml):")
    ask = subprocess.run(cli + ["ask", "Optima stolidan 8 ta kerak, qancha bo'ladi?"], cwd=APP_DIR, env=env,
                         capture_output=True, **utf8)
    job = subprocess.run(cli + ["job", "Kam qolgan mahsulotlar", "--send"], cwd=APP_DIR, env=env,
                         capture_output=True, **utf8)
    job_msg = expect(OWNER, "Kam qolgan mahsulotlar")
    k5 = subprocess.run(cli + ["kit5", "--send"], cwd=APP_DIR, env=env, capture_output=True, **utf8)
    time.sleep(0.3)
    docs = [d for d in svc.documents if d["chat_id"] == OWNER]
    lines.append("`pilot kit5 --send` sent: " + ", ".join(f"{d['filename']} ({d['bytes']} bytes)" for d in docs))
    kit5_md = next((runtime / "exports").glob("*.md")).read_text(encoding="utf-8")
    lines.append("\nThe weekly file (Kit 5 Form B):\n\n" + "\n".join("    " + l for l in kit5_md.splitlines()))

    lines.append("\n## 4. Test set (`pilot eval`) against the fake model\n")
    ev = subprocess.run(cli + ["eval"], cwd=APP_DIR, env=env, capture_output=True, **utf8)
    lines.append("```\n" + ev.stdout.strip() + "\n```")

    journal = [json.loads(l) for f in sorted((runtime / "journal").glob("*.jsonl"))
               for l in f.read_text(encoding="utf-8").splitlines() if l.strip()]
    kinds: dict[str, int] = {}
    for e in journal:
        kinds[e["type"]] = kinds.get(e["type"], 0) + 1
    lines.append("\n## 5. The journal\n\nEvents written: " + ", ".join(f"{k} {v}" for k, v in sorted(kinds.items())))
    first = next(e for e in journal if e["type"] == "exchange" and e.get("status") == "answered")
    lines.append("\nOne exchange line, as stored in `runtime/journal/<date>.jsonl`:\n\n```json\n"
                 + json.dumps(first, ensure_ascii=False, indent=1) + "\n```")
    log_tail = [l for l in bot_log.splitlines() if l.strip()][-6:]
    lines.append("\nLast lines of the bot's own log (what `journalctl -u pilot-bot` shows on the server):"
                 "\n\n```\n" + "\n".join(log_tail) + "\n```\n")

    svc.stop()
    transcript = "\n".join(lines)
    if write_transcript:
        out = APP_DIR / "_build" / "e2e-transcript.md"
        out.parent.mkdir(exist_ok=True)
        out.write_text(transcript, encoding="utf-8")
    return {"transcript": transcript, "check_rc": check.returncode, "report_rc": rep.returncode,
            "kit5_rc": k5.returncode, "eval_rc": ev.returncode, "eval_out": ev.stdout, "docs": docs,
            "journal": journal, "report": report_msg["text"], "bot_log": bot_log,
            "llm_requests": svc.llm_requests, "chat": chat, "who": who, "check_out": check.stdout,
            "kit5_md": kit5_md, "job_rc": job.returncode, "job": job_msg["text"],
            "ask_rc": ask.returncode, "ask_out": ask.stdout}


def run_topics_demo() -> dict:
    """Week two (canon): REPLY_MODE=topics; price goes direct, a discount answer waits for the pilot lead."""
    now = datetime.now(ZoneInfo("Asia/Tashkent"))
    if (now.hour, now.minute) == (23, 59):  # the one minute outside 00:00-23:59
        time.sleep(61)
    svc = FakeServices().start()
    tmp = Path(tempfile.mkdtemp(prefix="pilot-topics-"))
    env_file = tmp / ".env"
    env_file.write_text("\n".join([
        "TELEGRAM_BOT_TOKEN=123456:FAKE-demo-token",
        "OPENROUTER_API_KEY=sk-or-fake-demo",
        f"OWNER_CHAT_ID={OWNER}",
        f"ADMIN_USER_IDS={LEAD}",
        f"ALLOWED_USER_IDS={STAFF}",
        "REPLY_MODE=topics",
        f"REVIEWER_CHAT_ID={LEAD}",
        # The pilot lead is staff: outside working hours the bot holds drafts for her until morning.
        # Open all day here, so the run does not depend on the clock.
        "WORK_HOURS=00:00-23:59",
        "WORK_DAYS=1-7",
        "DAILY_REPORT_TIME=",
        f"TELEGRAM_API_BASE={svc.url}",
        f"OPENROUTER_BASE_URL={svc.url}/api/v1",
        f"PILOT_RUNTIME_DIR={tmp / 'runtime'}",
        "DEMO_SAMPLE=on",
    ]) + "\n", encoding="utf-8")
    env = {k: v for k, v in os.environ.items() if not k.startswith(("TELEGRAM_", "OPENROUTER_", "OWNER_"))}
    env.update({"PILOT_ENV_FILE": str(env_file), "PYTHONUNBUFFERED": "1", "PILOT_APP_DIR": str(SAMPLE_APP),
                "PYTHONUTF8": "1", "PYTHONIOENCODING": "utf-8"})
    utf8 = {"encoding": "utf-8", "errors": "replace"}
    cli = [sys.executable, "-m", "pilot"]
    chat: list[dict] = []
    seen: dict[int, int] = {}

    def say(user: int, text: str) -> None:
        chat.append({"chat": user, "from": "person", "text": text})
        svc.control("message", {"user_id": user, "first_name": "Test", "text": text})

    def expect(chat_id: int, contains: str) -> dict:
        msg = svc.wait_for(lambda m: m["chat_id"] == chat_id and contains in m["text"]
                           and m["message_id"] > seen.get(chat_id, 0))
        seen[chat_id] = msg["message_id"]
        chat.append({"chat": chat_id, "from": "bot", "text": msg["text"],
                     "buttons": [b["text"] for row in (msg.get("markup") or {}).get("inline_keyboard", [])
                                 for b in row]})
        return msg

    check = subprocess.run(cli + ["check"], cwd=APP_DIR, env=env, capture_output=True, **utf8)
    bot = subprocess.Popen(cli + ["run"], cwd=APP_DIR, env=env, stdout=subprocess.PIPE,
                           stderr=subprocess.STDOUT, **utf8)
    try:
        expect(OWNER, "ishga tushdi")
        say(STAFF, "Optima stolidan 8 ta kerak, qancha bo'ladi?")
        expect(STAFF, "15 120 000")
        say(STAFF, "Mijozga chegirma bersam bo'ladimi?")
        expect(STAFF, "qabul qilindi")
        draft = expect(LEAD, "Javob loyihasi")
        approve = draft["markup"]["inline_keyboard"][0][0]["callback_data"]
        svc.control("button", {"user_id": LEAD, "first_name": "Test", "data": approve,
                               "message_id": draft["message_id"]})
        expect(STAFF, "5% gacha")
        say(OWNER, "/darhol narx")
        expect(OWNER, "Javob rejimi")
    finally:
        bot.terminate()
        try:
            bot.communicate(timeout=10)
        except subprocess.TimeoutExpired:
            bot.kill()
            bot.communicate()
    journal = [json.loads(l) for f in sorted((tmp / "runtime" / "journal").glob("*.jsonl"))
               for l in f.read_text(encoding="utf-8").splitlines() if l.strip()]
    svc.stop()
    return {"check_rc": check.returncode, "check_out": check.stdout, "chat": chat, "journal": journal,
            "llm_requests": svc.llm_requests,
            "owner_texts": [c["text"] for c in chat if c["chat"] == OWNER and c["from"] == "bot"]}


if __name__ == "__main__":
    for stream in (sys.stdout, sys.stderr):
        stream.reconfigure(encoding="utf-8", errors="replace")
    result = run_demo()
    print(result["transcript"])
    print("\nSaved to _build/e2e-transcript.md")
