"""Offline live demo for Day 5: run the REAL `pilot eval` / `pilot ask` / `pilot check` commands
against the fake model, at one stage of the improvement loop, with no internet and no keys.

Run simulate.py once first (it builds day-5/_build/work/app and the v1/v2 agent snapshots), then:

    uv run --no-project --with httpx --with openpyxl --with python-dotenv --with tzdata \
        python day-5/_build/sim/live_eval.py v1 eval
    ... live_eval.py kp eval
    ... live_eval.py regressiya eval
    ... live_eval.py v2 eval
    ... live_eval.py v1 ask "Optima stolidan 5 ta kerak, narxi?"
    ... live_eval.py v2 eski-fayl ask "ErgoPro omborda bormi?"      (1C export 28 hours old: hand-over)
    ... live_eval.py v2 bosh-fayl ask "ErgoPro omborda nechta bor?" (empty 1C export: hand-over)

Stages: v1 (go-live agent with the KP source, the 4 new tests already added), kp (KP removed from
the sources + one memory.md line), regressiya (+ an over-broad B.4 rule), v2 (the fixed agent,
max_age_hours = 25). The output is what the participant's own terminal prints; only the model is a
set of rules (brain.py).
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import simulate as S  # noqa: E402  (paths, people, and the B.4 texts live there)

LOOP = S.NAMUNA / "yaxshilash"


def prepare(stage: str, empty_stock: bool, stale_hours: int = 0) -> Path:
    if not (S.APP / "pilot").exists() or not (LOOP / "agent-v1").exists():
        sys.exit("Avval simulate.py ni ishga tushiring.")
    live = S.WORK / "live" / "app"
    if live.parent.exists():
        shutil.rmtree(live.parent)
    shutil.copytree(S.APP, live, ignore=shutil.ignore_patterns("__pycache__", "agent"))
    src = LOOP / ("agent-v2" if stage == "v2" else "agent-v1")
    shutil.copytree(src, live / "agent")
    shutil.copy(LOOP / "test-set-v2.toml", live / "evals" / "test-set.toml")
    if stage in ("kp", "regressiya"):
        src_toml = live / "agent" / "sources.toml"
        src_toml.write_text(src_toml.read_text(encoding="utf-8").replace(S.KP_SOURCE.strip() + "\n\n", "")
                            .replace(S.KP_SOURCE, ""), encoding="utf-8")
        mem = live / "agent" / "memory.md"
        mem.write_text(mem.read_text(encoding="utf-8").rstrip() + "\n" + "\n".join(S.V2_MEMORY_LINES) + "\n",
                       encoding="utf-8")
    if stage == "regressiya":
        instr = live / "agent" / "instructions.md"
        text = instr.read_text(encoding="utf-8")
        old, form = S.b4_price_line(text)
        instr.write_text(text.replace(old, S.B4_OVERBROAD[form]), encoding="utf-8")
    from datetime import datetime, timedelta
    S.write_export(datetime.now(S.TZ) - timedelta(hours=stale_hours), {}, S.read_stock0(), empty=empty_stock,
                   path=live / "data" / "ombor-1c.csv")
    return live


def main() -> int:
    args = sys.argv[1:]
    if not args or args[0] not in ("v1", "kp", "regressiya", "v2"):
        print(__doc__)
        return 2
    stage = args.pop(0)
    empty, stale = False, 0
    if args and args[0] == "bosh-fayl":
        empty = True
        args.pop(0)
    elif args and args[0] == "eski-fayl":
        stale = 28
        args.pop(0)
    command = args or ["eval"]
    sys.path.insert(0, str(S.APP))
    from tools.fake_services import FakeServices, PRICE_IN, PRICE_OUT
    from brain import brain

    class Fakes(FakeServices):
        def chat(self, body):
            text = brain(body["messages"])
            p_tok = sum(len(m["content"]) for m in body["messages"]) // 3
            c_tok = len(text) // 3
            return {"id": "gen-fake", "model": body["model"],
                    "choices": [{"message": {"role": "assistant", "content": text}}],
                    "usage": {"prompt_tokens": p_tok, "completion_tokens": c_tok,
                              "cost": round(p_tok * PRICE_IN + c_tok * PRICE_OUT, 6)}}

    live = prepare(stage, empty, stale)
    svc = Fakes().start()
    try:
        tmp = Path(tempfile.mkdtemp(prefix="day5-live-"))
        env_file = tmp / ".env"
        env_file.write_text("\n".join([
            "TELEGRAM_BOT_TOKEN=7100000000:FAKE-day5-live-not-a-real-token",
            "OPENROUTER_API_KEY=sk-or-FAKE-day5-live-not-a-real-key",
            f"OWNER_CHAT_ID={S.OWNER}", "COMPANY_NAME=Baraka Office", "AGENT_NAME=Savdo yordamchisi",
            f"TELEGRAM_API_BASE={svc.url}", f"OPENROUTER_BASE_URL={svc.url}/api/v1",
            f"PILOT_RUNTIME_DIR={tmp / 'runtime'}",
        ]) + "\n", encoding="utf-8")
        env = {k: v for k, v in os.environ.items() if not k.startswith(("TELEGRAM_", "OPENROUTER_", "OWNER_"))}
        env.update({"PILOT_ENV_FILE": str(env_file), "PYTHONPATH": str(live), "PYTHONUNBUFFERED": "1"})
        if command[0] == "eval" and "--judge" not in command:
            command.append("--judge")
        note = ", bo‘sh 1C fayli" if empty else (f", 1C fayli {stale} soat eski" if stale else "")
        print(f"$ uv run pilot {' '.join(command)}   [bosqich: {stage}{note}]\n", flush=True)
        return subprocess.run([sys.executable, "-m", "pilot", *command], cwd=live, env=env).returncode
    finally:
        svc.stop()


if __name__ == "__main__":
    sys.exit(main())
