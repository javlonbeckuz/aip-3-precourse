"""Run the whole Day 4 owner flow against a fresh Ubuntu container that stands in for the VPS.

    python3 day-4/_build/sandbox/make_sandbox.py
    uv run --project day-4/_build/sandbox/work/kompaniya/app python day-4/_build/sandbox/run_day4.py [--ubuntu 24.04] [--keep]

Needs Docker and internet inside the container (apt, uv, Caddy packages), like a real VPS.
Telegram and OpenRouter are the pilot template's fakes running on this computer: no keys, no paid calls.
Every command is run from the participant's app/ folder exactly as the exercises tell owners to type it,
and its output is saved to day-4/exercises/namuna/natijalar/, which the exercises quote as "what you should see".
Writes out/result-ubuntu-<version>.md with one PASS/FAIL line per check.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import time
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
DAY4 = HERE.parent.parent
APP = HERE / "work" / "kompaniya" / "app"
TEMPLATE_TEST = DAY4.parent / "pilot-template" / "_build" / "deploy-test" / "Dockerfile"
NAT = DAY4 / "exercises" / "namuna" / "natijalar"
OUT = HERE / "out"
sys.path.insert(0, str(APP))
from tools.fake_services import FakeServices  # noqa: E402

OWNER, STAFF = 1001, 2001
SSH_PORT = 2224
DOMAIN = "forma.barakaoffice.uz"
DEPLOY = ["uv", "run", "python", "deploy/deploy.py"]


def sh(cmd, check=True, timeout=1200, env=None, cwd=None, inp=None):
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout, env=env, cwd=cwd, input=inp)
    if check and r.returncode != 0:
        raise RuntimeError(f"{' '.join(map(str, cmd))}\n--- stdout\n{r.stdout}\n--- stderr\n{r.stderr}")
    return r


CONTAINER_HOST = {"name": ""}
APT_NOISE = ("Hit:", "Get:", "Ign:", "Fetched ", "Reading package lists", "debconf:", "Warning: Permanently added",
             "     CGroup:", " Invocation:", "             └─")


def scrub(text: str) -> str:
    """Make saved outputs read like a participant's: their paths, a documentation IP (203.0.113.10) and port 22
    instead of this computer's container port, a readable server name, and no apt download noise."""
    text = text.replace(str(APP), "~/kompaniya/app")
    text = re.sub(r"host\.docker\.internal:\d+", "api.telegram.org", text)
    text = text.replace(f"[127.0.0.1]:{SSH_PORT}", "203.0.113.10").replace("127.0.0.1", "203.0.113.10")
    text = text.replace("port 2299", "port 22")
    if CONTAINER_HOST["name"]:
        text = text.replace(CONTAINER_HOST["name"], "baraka-vps")
    return "\n".join(l for l in text.splitlines() if not l.startswith(APT_NOISE)) + ("\n" if text.endswith("\n") else "")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--ubuntu", default="24.04")
    ap.add_argument("--keep", action="store_true")
    ap.add_argument("--platform", default="",
                    help="container CPU type, e.g. linux/amd64 (Airnet is x86_64); empty = this computer's own type. "
                         "On Apple Silicon amd64 needs Docker's x86 emulation, which was not installed on 2026-11-03")
    ap.add_argument("--natijalar", help="write the participant-facing outputs here instead of exercises/namuna/natijalar "
                                        "(use for a second Ubuntu version so the exercises keep quoting 24.04)")
    args = ap.parse_args()
    global NAT
    if args.natijalar:
        NAT = Path(args.natijalar).resolve()
    NAT.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)
    name = f"praktikum-day4-{args.ubuntu.replace('.', '')}" + (f"-{args.platform.split('/')[-1]}" if args.platform else "")
    plat = ["--platform", args.platform] if args.platform else []
    tmp = Path(tempfile.mkdtemp(prefix="day4-"))
    key, other_key = tmp / "id_vps", tmp / "id_boshqa"
    sh(["ssh-keygen", "-q", "-t", "ed25519", "-N", "", "-f", str(key)])
    sh(["ssh-keygen", "-q", "-t", "ed25519", "-N", "", "-f", str(other_key)])
    (tmp / "Dockerfile").write_text(TEMPLATE_TEST.read_text())
    (tmp / "test_key.pub").write_text((tmp / "id_vps.pub").read_text())
    # Week 0 step 15 leaves owners with an ~/.ssh/config alias "vps"; test that form (DEPLOY_HOST=vps).
    cfg = tmp / "ssh_config"
    cfg.write_text(f"Host vps\n  HostName 127.0.0.1\n  Port {SSH_PORT}\n  User root\n  IdentityFile {key}\n"
                   "  IdentitiesOnly yes\n  StrictHostKeyChecking no\n  UserKnownHostsFile /dev/null\n  LogLevel ERROR\n")
    env = dict(os.environ, PILOT_SSH_OPTS=f"-F {cfg}")
    results: list[tuple[str, bool, str]] = []

    def record(step, ok, detail=""):
        results.append((step, bool(ok), str(detail).strip()))
        print(("PASS " if ok else "FAIL ") + step + (f"  ({str(detail).strip()[:160]})" if detail else ""), flush=True)

    def save(fname, cmd_line, r_or_text):
        body = r_or_text if isinstance(r_or_text, str) else (r_or_text.stdout + r_or_text.stderr)
        (NAT / fname).write_text(scrub(f"$ {cmd_line}\n\n{body}".rstrip() + "\n"), encoding="utf-8")

    def run(argv, fname=None, cmd_line=None, timeout=1200):
        r = sh(argv, check=False, env=env, cwd=APP, timeout=timeout)
        if fname:
            save(fname, cmd_line or " ".join(argv), r)
        return r

    def vps(command, check=True):
        return sh(["ssh", "-F", str(cfg), "vps", command], check=check)

    svc = FakeServices("127.0.0.1", 0).start()
    base_env = {
        "TELEGRAM_BOT_TOKEN": "123456:FAKE-day4-token",
        "OPENROUTER_API_KEY": "sk-or-fake-day4",
        "OWNER_CHAT_ID": str(OWNER),
        "ALLOWED_USER_IDS": str(OWNER),  # Day 4: only the owner, staff come after the Kit 4 talk
        "COMPANY_NAME": "Baraka Office",
        "AGENT_NAME": "Savdo yordamchisi",
        "REPLY_MODE": "direct",
        "TELEGRAM_API_BASE": f"http://host.docker.internal:{svc.port}",
        "OPENROUTER_BASE_URL": f"http://host.docker.internal:{svc.port}/api/v1",
        "DEPLOY_HOST": "vps",
    }

    def write_env(**over):
        values = dict(base_env, **over)
        (APP / ".env").write_text("".join(f"{k}={v}\n" for k, v in values.items()), encoding="utf-8")

    transcript: list[str] = []

    def say(user_id, text, expect, who="Siz", timeout=40, first_name="Rustamov"):
        n = len(svc.sent)
        transcript.append(f"[{who}] {text}")
        svc.control("message", {"user_id": user_id, "first_name": first_name, "text": text})
        msg = svc.wait_for(lambda m: m["chat_id"] == user_id and expect in m["text"] and svc.sent.index(m) >= n,
                           timeout=timeout)
        label = "[Bot]" if who == "Siz" else f"[Bot -> {who}]"
        for m in svc.sent[n:]:
            if m["chat_id"] == user_id:
                transcript.append(label + " " + m["text"].replace("\n", "\n      "))
        return msg

    def wait_ssh(limit=120):
        end = time.time() + limit
        while time.time() < end:
            if vps("true", check=False).returncode == 0:
                return
            time.sleep(2)
        raise RuntimeError("ssh did not come up")

    started = datetime.now()
    try:
        sh(["docker", "rm", "-f", name], check=False)
        sh(["docker", "build", "-q", *plat, "--build-arg", f"UBUNTU={args.ubuntu}", "-t", name, str(tmp)])
        sh(["docker", "run", "-d", *plat, "--name", name, "--privileged", "--cgroupns=host",
            "-v", "/sys/fs/cgroup:/sys/fs/cgroup:rw", "--add-host=host.docker.internal:host-gateway",
            "-p", f"127.0.0.1:{SSH_PORT}:22", name])
        wait_ssh()
        CONTAINER_HOST["name"] = vps("hostname").stdout.strip()
        r = vps("echo ok")
        save("00-ssh-ok.txt", "ssh vps echo ok", r)
        record("Week 0 alias works: ssh vps echo ok", r.stdout.strip() == "ok", r.stdout)

        # -------- failure: a laptop whose key is not on the server
        r = sh(["ssh", "-o", "BatchMode=yes", "-o", "StrictHostKeyChecking=no", "-o", "UserKnownHostsFile=/dev/null",
                "-o", "IdentitiesOnly=yes", "-i", str(other_key), "-p", str(SSH_PORT), "root@127.0.0.1", "echo ok"],
               check=False)
        save("x1-kalit-yoq.txt", "ssh root@203.0.113.10 echo ok", r)
        record("failure shown: key not on server -> Permission denied", "Permission denied" in r.stderr, r.stderr)
        r = sh(DEPLOY + ["status", "--host", "root@127.0.0.1", "--port", "2299"], check=False, cwd=APP,
               env=dict(os.environ, PILOT_SSH_OPTS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"))
        save("x6-server-ulanmaydi.txt", "uv run python deploy/deploy.py status", r)
        record("failure shown: wrong address or port -> Connection refused",
               "refused" in (r.stdout + r.stderr).lower(), r.stderr)

        # -------- step 1: setup (the Wednesday homework, safe to repeat in class)
        write_env()
        r = run(DEPLOY + ["setup"], "01-setup.txt", "uv run python deploy/deploy.py setup")
        record("deploy.py setup with DEPLOY_HOST=vps", r.returncode == 0 and "Server is ready" in r.stdout,
               r.stdout[-300:] + r.stderr[-300:])

        # -------- GitHub block: git on the laptop (pushed to a local bare repo; GitHub itself is not used)
        bare = tmp / "github-baraka-pilot.git"
        sh(["git", "init", "-q", "--bare", str(bare)])
        lines = []
        for c in (["git", "init", "-q", "-b", "main"], ["git", "add", "-A"],
                  ["git", "-c", "user.name=Rustamov", "-c", "user.email=owner@example.com", "commit", "-q",
                   "-m", "Savdo yordamchisi: 4-dars, serverga chiqishdan oldin"],
                  ["git", "remote", "add", "origin", str(bare)], ["git", "push", "-q", "-u", "origin", "main"],
                  ["git", "status", "--short", "--branch"]):
            rr = sh(c, check=False, cwd=APP)
            shown = [x for x in c if not x.startswith(("user.", "-c"))]
            lines.append("$ " + " ".join(f'"{x}"' if " " in x else x for x in shown) + f"\n{rr.stdout}{rr.stderr}")
        tracked = sh(["git", "ls-files"], cwd=APP).stdout.split()
        secrets = [f for f in tracked if f == ".env" or f.startswith("runtime/") or f.endswith(".env")]
        lines.append("$ git ls-files | grep -E '(^|/)\\.env$|^runtime/'\n" + ("\n".join(secrets) or "(bo'sh: kalit fayli repoda yo'q)"))
        lines.append(f"$ git ls-files | wc -l\n{len(tracked)}")
        save("11-git.txt", "git   # Claude Code 1-mashqda shu buyruqlarni bajaradi; GitHub o'rniga mahalliy nusxa", "\n".join(lines).replace(str(bare), "https://github.com/rustamov/baraka-pilot.git"))
        record("git: .env and runtime/ are never committed (template .gitignore)", not secrets and ".env.example" in tracked,
               f"{len(tracked)} files tracked")

        # -------- failure: deploy before the server has .env
        r = run(DEPLOY + ["deploy", "--skip-tests"], "x2-env-yoq.txt", "uv run python deploy/deploy.py")
        record("failure shown: deploy before env -> clear message", r.returncode != 0 and "deploy.py env" in r.stdout,
               r.stdout[-200:])

        # -------- step 2: env, step 3: deploy
        r = run(DEPLOY + ["env"], "02-env.txt", "uv run python deploy/deploy.py env")
        perm = vps("stat -c '%a %U' /opt/pilot/.env").stdout.strip()
        record(".env on server, 600, owned by pilot", r.returncode == 0 and perm == "600 pilot", perm)
        r = run(DEPLOY, "03-deploy.txt", "uv run python deploy/deploy.py")
        record("deploy.py: tests, upload, uv sync, check, start", r.returncode == 0 and "OK: pilot-bot is running" in r.stdout,
               r.stdout[-400:] + r.stderr[-200:])
        release1 = vps("basename $(readlink -f /opt/pilot/app)").stdout.strip()
        greet = svc.wait_for(lambda m: m["chat_id"] == OWNER and "ishga tushdi" in m["text"], timeout=40)
        transcript.append("[Bot] " + greet["text"].replace("\n", "\n      "))
        record("owner's phone gets the start message", True, greet["text"])

        # -------- step 4: the laptop test, from the owner's phone
        say(OWNER, "/start", "Savdo yordamchisi")
        m = say(OWNER, "Optima stolidan 8 ta kerak, qancha bo'ladi?", "15 120 000")
        record("owner question answered from the server", "ulgurji" in m["text"], m["text"])
        say(OWNER, "/holat", "ishlayapti")
        say(OWNER, "/hisobot", "hisobot")
        say(OWNER, "/stop", "to‘xtatildi")
        say(OWNER, "/davom", "yana ishlayapti")
        m = say(OWNER, "Senator kreslo omborda nechta bor?", "dona")
        record("owner controls the bot from the phone: /holat /hisobot /stop /davom", True, m["text"])
        # The always-on assistant part of the template (owner memory, phone jobs, reminders).
        say(OWNER, "/eslab_qol Menejerlar «140 lik stol» deganda Optima stolini (WS-102) nazarda tutadi", "Eslab qoldim")
        say(OWNER, "/xotira", "WS-102")
        say(OWNER, "/jadval 07:45 Ombordan 15 donadan kam qolgan mahsulotlar ro'yxatini yubor", "Har ish kuni")
        hh, mm, ss = (int(x) for x in vps("date +%H:%M:%S").stdout.strip().split(":"))
        total = hh * 60 + mm + (2 if ss > 40 else 1)
        at = f"{(total // 60) % 24:02d}:{total % 60:02d}"
        say(OWNER, f"/eslat {at} Jamshid aka bilan tender bo'yicha gaplashish", "Eslataman")
        rem = svc.wait_for(lambda m: m["chat_id"] == OWNER and "Eslatma:" in m["text"], timeout=180)
        transcript.append("[Bot] " + rem["text"])
        record("assistant from the phone: /eslab_qol, /xotira, /jadval, and an /eslat reminder fires on time",
               "tender" in rem["text"], rem["text"])
        (NAT / "04-telefon.txt").write_text(
            "Egasining telefoni, Telegram (noutbuk yopiq). Bot serverda ishlayapti.\n"
            "Soxta Telegram va soxta model bilan yozib olindi; haqiqiy model javobi so'z jihatdan boshqacha bo'ladi.\n\n"
            + "\n".join(transcript) + "\n", encoding="utf-8")
        transcript.clear()

        # -------- status and logs
        r = run(DEPLOY + ["status"], "05-status.txt", "uv run python deploy/deploy.py status")
        record("deploy.py status shows active (running)", "active (running)" in r.stdout, r.stdout[:300])
        r = run(DEPLOY + ["logs", "-n", "20"], "06-logs.txt", "uv run python deploy/deploy.py logs -n 20")
        clean = "FAKE-day4-token" not in r.stdout and "Optima" not in r.stdout and "exchange" in r.stdout
        record("logs: one line per question, no token, no message text", clean, r.stdout[-300:])

        # -------- demo: crash and reboot
        pid1 = vps("systemctl show -p MainPID --value pilot-bot").stdout.strip()
        vps(f"kill -9 {pid1}")
        time.sleep(8)
        pid2 = vps("systemctl show -p MainPID --value pilot-bot").stdout.strip()
        st = vps("systemctl status pilot-bot --no-pager --lines=4 | head -12", check=False).stdout
        save("07-qulash.txt", f"ssh vps 'kill -9 {pid1}'   # botni ataylab \"o'ldiramiz\"\n$ ssh vps 'systemctl status pilot-bot'", st)
        record("kill -9: systemd brings the bot back", pid2 not in ("0", pid1) and "active (running)" in st, f"{pid1} -> {pid2}")
        sh(["docker", "restart", name])
        wait_ssh()
        time.sleep(6)
        st = vps("systemctl is-active pilot-bot; systemctl show -p ActiveEnterTimestamp pilot-bot", check=False).stdout
        save("08-qayta-yuklash.txt", "ssh vps reboot   # server qayta yuklandi (konteynerda: docker restart)\n$ ssh vps 'systemctl is-active pilot-bot; systemctl show -p ActiveEnterTimestamp pilot-bot'", st)
        m = say(OWNER, "Start stoli 2 dona necha pul?", "2 900 000")
        record("after a reboot the bot is back by itself and answers", st.startswith("active"), st)
        m = say(OWNER, "/xotira", "WS-102")
        record("phone memory survives the reboot (kept in /opt/pilot/runtime)", "WS-102" in m["text"], m["text"])
        transcript.clear()

        # -------- failure: an impossible price (wholesale above retail): tests pass, `pilot check` on the server
        # refuses it and the running release is not touched. A plausible typo (1 890 000 -> 1 980 000) passes
        # both; that is what `pilot eval` (exact-price cases) and the staff ❌ button catch.
        price = APP / "data" / "narxlar.csv"
        good_price = price.read_text(encoding="utf-8")
        price.write_text(good_price.replace("2 150 000,1 890 000", "2 150 000,2 890 000"), encoding="utf-8")
        r = run(DEPLOY, "x7-narx-imkonsiz.txt", "uv run python deploy/deploy.py   # ulgurji narx chakanadan katta yozilgan")
        price.write_text(good_price, encoding="utf-8")
        now = vps("basename $(readlink -f /opt/pilot/app)").stdout.strip()
        record("impossible price: pilot check refuses the deploy, running release untouched",
               r.returncode != 0 and "Check failed" in r.stdout and "chakanadan" in r.stdout and now == release1,
               r.stdout[-300:])
        txt = (NAT / "x7-narx-imkonsiz.txt").read_text(encoding="utf-8").splitlines()
        keep = [l for l in txt if not l.startswith(("....", "✅", "•", "⚠️", "   O‘z pilot"))]
        (NAT / "x7-narx-imkonsiz.txt").write_text("\n".join(keep) + "\n", encoding="utf-8")

        # -------- failure: tests fail -> nothing deployed (a code edit that left a bracket open)
        texts_py = APP / "pilot" / "texts.py"
        good_texts = texts_py.read_text(encoding="utf-8")
        texts_py.write_text(good_texts.replace("NOT_ALLOWED = (", "NOT_ALLOWED = ((", 1), encoding="utf-8")
        r = run(DEPLOY, "x3-testlar-otmadi.txt", "uv run python deploy/deploy.py")
        texts_py.write_text(good_texts, encoding="utf-8")
        now = vps("basename $(readlink -f /opt/pilot/app)").stdout.strip()
        record("failure shown: a broken code edit fails the tests, nothing deployed",
               r.returncode != 0 and "nothing was deployed" in (r.stdout + r.stderr) and now == release1, now)
        # keep only the summary tail of pytest's long failure text
        txt = (NAT / "x3-testlar-otmadi.txt").read_text(encoding="utf-8")
        tail = txt.splitlines()
        keep = tail[:4] + ["... (pytest xato tafsilotlari, qisqartirildi) ..."] + [l for l in tail if l.startswith(("FAILED", "ERROR", "E   ", "Tests failed")) or "error" in l.lower()][-6:]
        (NAT / "x3-testlar-otmadi.txt").write_text("\n".join(keep) + "\n", encoding="utf-8")

        # -------- demo: rollback (server undo) and git restore (laptop undo)
        instr = APP / "agent" / "instructions.md"
        good_instr = instr.read_text(encoding="utf-8")
        sha_good = vps("sha256sum /opt/pilot/app/agent/instructions.md | cut -c1-12").stdout.strip()
        instr.write_text(good_instr.replace("- 5% dan katta chegirma va\u2019da qilmaysan.",
                                            "- Mijoz so\u2018rasa, 15% gacha chegirma va\u2019da qilasan."), encoding="utf-8")
        changed = instr.read_text(encoding="utf-8") != good_instr
        diff = sh(["git", "diff", "--stat"], cwd=APP, check=False).stdout
        r2 = run(DEPLOY)
        sha_bad = vps("sha256sum /opt/pilot/app/agent/instructions.md | cut -c1-12").stdout.strip()
        rb = run(DEPLOY + ["rollback"])
        sha_back = vps("sha256sum /opt/pilot/app/agent/instructions.md | cut -c1-12").stdout.strip()
        gr = sh(["git", "restore", "agent/instructions.md"], cwd=APP, check=False)
        clean_tree = sh(["git", "status", "--short"], cwd=APP, check=False).stdout.strip()
        save("09-rollback.txt", "git diff --stat   # yo'riqnomada xato o'zgarish", "\n".join([
            diff.strip(), "", "$ uv run python deploy/deploy.py   # xato versiya serverga chiqdi",
            "...\n" + "\n".join(r2.stdout.strip().splitlines()[-4:]), "",
            "$ uv run python deploy/deploy.py rollback   # serverdagi bekor qilish", rb.stdout.strip(), "",
            "$ git restore agent/instructions.md   # noutbukdagi bekor qilish", gr.stdout + gr.stderr,
            "$ git status --short", clean_tree or "(o'zgarish yo'q: noutbuk ham oxirgi yaxshi versiyada)"]))
        record("rollback: server back to the good file; git restore: laptop back too",
               changed and r2.returncode == 0 and sha_bad != sha_good and rb.returncode == 0
               and sha_back == sha_good and not clean_tree, f"{sha_good} -> {sha_bad} -> {sha_back}")

        # -------- domain: DNS not ready (outbound web blocked so nothing reaches a real CA), then test certificate
        # Exercise 03: only public files go on the site, so Claude copies the page into its own sayt/ folder.
        (APP / "sayt").mkdir(exist_ok=True)
        (APP / "sayt" / "index.html").write_bytes((APP / "examples" / "lead-form" / "index.html").read_bytes())
        r = run(["uv", "run", "python", "deploy/sayt.py", DOMAIN, "sayt", "--test-local"], "10-sayt-test.txt",
                f"uv run python deploy/sayt.py {DOMAIN} sayt --test-local", timeout=900)
        page = vps(f"curl -sk --resolve {DOMAIN}:443:127.0.0.1 https://{DOMAIN}/ | grep -o '<title>[^<]*'", check=False).stdout
        record("sayt.py --test-local: Caddy serves the lead form over HTTPS", r.returncode == 0 and "Baraka" in page,
               r.stdout[-300:] + page)
        ufw = vps("ufw status | grep -E '^(80|443)/tcp'", check=False).stdout
        record("firewall opened 80 and 443 for the site", "80/tcp" in ufw and "443/tcp" in ufw, ufw)
        vps("iptables -I OUTPUT -p tcp -m multiport --dports 80,443 -j REJECT", check=False)
        r = run(["uv", "run", "python", "deploy/sayt.py", DOMAIN, "sayt"], "10b-sayt-dns-tayyor-emas.txt",
                f"uv run python deploy/sayt.py {DOMAIN} sayt", timeout=900)
        record("DNS not ready: tool explains the A record and that Caddy retries by itself",
               "A yozuvi" in r.stdout and "o'zi oladi" in r.stdout, r.stdout[-400:])
        vps("iptables -D OUTPUT -p tcp -m multiport --dports 80,443 -j REJECT", check=False)
        run(["uv", "run", "python", "deploy/sayt.py", DOMAIN, "sayt", "--test-local"], timeout=900)
        sh(["docker", "restart", name])
        wait_ssh()
        time.sleep(6)
        both = vps(f"systemctl is-active caddy pilot-bot; curl -sk -o /dev/null -w '%{{http_code}}' --resolve {DOMAIN}:443:127.0.0.1 https://{DOMAIN}/",
                   check=False).stdout.split()
        record("after reboot: site and bot both back", both[:2] == ["active", "active"] and both[-1] == "200", " ".join(both))

        # -------- homework: after the Kit 4 talk, add staff from the phone, then approve mode
        transcript.clear()
        transcript.append("1) Kit 4 suhbatidan keyin: Madina botga yozadi, hali ruxsati yo'q.")
        m = say(STAFF, "Assalomu alaykum", "ID raqamingiz", who="Madina", first_name="Madina")
        transcript.append("\n2) Egasi telefondan Madinaga ruxsat beradi.")
        say(OWNER, f"/ruxsat {STAFF} Madina", "endi botdan foydalana oladi")
        m = say(STAFF, "Optima stolidan 8 ta kerak, qancha bo'ladi?", "15 120 000", who="Madina", first_name="Madina")
        record("homework: /ruxsat from the phone lets the employee in (no redeploy)", True, m["text"])
        write_env(REPLY_MODE="approve", PILOT_START_DATE="2026-12-14", ALLOWED_USER_IDS=str(OWNER))
        r = run(DEPLOY + ["env"], "12a-env-approve.txt", "uv run python deploy/deploy.py env   # REPLY_MODE=approve, PILOT_START_DATE=2026-12-14")
        time.sleep(6)
        transcript.append("\n3) .env da REPLY_MODE=approve: birinchi hafta har javobni odam tasdiqlaydi.")
        n0 = len(svc.sent)
        say(STAFF, "Start stoli 2 dona necha pul?", "tekshirib", who="Madina", first_name="Madina")
        draft = svc.wait_for(lambda m: m["chat_id"] == OWNER and "Javob loyihasi" in m["text"] and svc.sent.index(m) >= n0,
                             timeout=40)
        transcript.append("[Bot -> egasi] " + draft["text"].replace("\n", "\n      "))
        ex_id = re.search(r"#(\S+)", draft["text"]).group(1)
        n1 = len(svc.sent)
        transcript.append("[Egasi] «✅ Yuborish» tugmasini bosadi")
        svc.control("button", {"user_id": OWNER, "first_name": "Rustamov", "data": f"ap:{ex_id}",
                               "message_id": draft["message_id"]})
        got = svc.wait_for(lambda m: m["chat_id"] == STAFF and "2 900 000" in m["text"] and svc.sent.index(m) >= n1, timeout=40)
        transcript.append("[Bot -> Madina] " + got["text"])
        (NAT / "12-xodim-va-tasdiqlash.txt").write_text(
            "Uy vazifasi: Kit 4 suhbatidan keyin xodimni qo'shish va birinchi haftani «tasdiqlash» rejimida boshlash.\n"
            "Soxta Telegram va soxta model bilan yozib olindi.\n\n" + "\n".join(transcript) + "\n", encoding="utf-8")
        record("approve mode: draft goes to the owner, employee gets it only after ✅", True, got["text"])
        transcript.clear()

        # -------- failures: missing OWNER_CHAT_ID, empty token (status 78), then fix
        write_env(OWNER_CHAT_ID="")
        run(DEPLOY + ["env"])
        r = run(DEPLOY + ["deploy", "--skip-tests"], "x4-check-failed.txt", "uv run python deploy/deploy.py")
        record("failure shown: incomplete server .env -> Check failed, old release kept",
               r.returncode != 0 and "Check failed" in r.stdout, r.stdout[-300:])
        write_env(TELEGRAM_BOT_TOKEN="")
        run(DEPLOY + ["env"])
        time.sleep(10)
        r = run(DEPLOY + ["status"], "x5-token-xato.txt", "uv run python deploy/deploy.py status")
        record("failure shown: empty token -> service failed (78), no restart loop",
               "failed" in r.stdout or "inactive" in r.stdout, r.stdout[:300])
        write_env(REPLY_MODE="approve", PILOT_START_DATE="2026-12-14")
        r = run(DEPLOY + ["env"], "x5b-token-tuzatildi.txt", "uv run python deploy/deploy.py env   # .env tuzatildi")
        time.sleep(6)
        act = vps("systemctl is-active pilot-bot", check=False).stdout.strip()
        record("fixed .env: bot restarts by itself", "restarted" in r.stdout and act == "active", act)

        hard = vps("systemctl show pilot-bot -p User -p Restart -p ProtectSystem; ufw status | head -6; "
                   "systemctl is-active fail2ban; timedatectl show -p Timezone --value 2>/dev/null || cat /etc/timezone",
                   check=False).stdout
        save("13-xavfsizlik.txt", "ssh vps 'systemctl show pilot-bot ...; ufw status; fail2ban; vaqt mintaqasi'", hard)
        record("server safety state (as reported)", "User=pilot" in hard and "Restart=always" in hard, hard)
        return 0 if all(ok for _, ok, _ in results) else 1
    except Exception as exc:  # noqa: BLE001
        diag = ""
        try:
            diag = vps("systemctl status pilot-bot --no-pager | head -8; journalctl -u pilot-bot -n 30 --no-pager; "
                       "journalctl -u caddy -n 20 --no-pager", check=False).stdout
        except Exception:  # noqa: BLE001
            pass
        record("unexpected error", False, str(exc)[-1500:] + "\n" + diag[-2500:])
        print(diag)
        return 1
    finally:
        (APP / ".env").unlink(missing_ok=True)
        out = OUT / f"result-ubuntu-{args.ubuntu}.md"
        lines = [f"# Day 4 owner flow on Ubuntu {args.ubuntu}, {args.platform or 'native CPU (arm64 on this Mac)'} (Docker container as the VPS)", "",
                 f"Run: {started:%Y-%m-%d %H:%M} to {datetime.now():%H:%M}. Script: `run_day4.py`.",
                 "Fake Telegram and OpenRouter on the host (pilot-template `tools/fake_services.py`); no real keys, no real server.", "",
                 f"Result: {sum(ok for _, ok, _ in results)} / {len(results)} checks passed.", "",
                 "| | Check | Detail |", "|---|---|---|"]
        for step, ok, detail in results:
            d = " ".join(scrub(detail).split())[:260].replace("|", "/")
            lines.append(f"| {'PASS' if ok else 'FAIL'} | {step} | {d} |")
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")
        (OUT / f"result-ubuntu-{args.ubuntu}.json").write_text(json.dumps(results, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"\nWrote {out}")
        svc.stop()
        if not args.keep:
            sh(["docker", "rm", "-f", name], check=False)


if __name__ == "__main__":
    sys.exit(main())
