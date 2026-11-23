"""Rebuild the Day 4 sandbox: a participant's company folder with the pilot bot in app/, as it looks on Day 4 morning.

    python3 day-4/_build/sandbox/make_sandbox.py

Copies ../../../pilot-template (read only, never edited) into work/kompaniya/app/ the way Day 3 ships it,
then adds the two Day 4 domain tools to app/deploy/, exactly where exercise 03 tells owners to put them.
Run run_day4.py afterwards. Paths resolve relative to this file.
"""

from __future__ import annotations

import shutil
from pathlib import Path

HERE = Path(__file__).resolve().parent
DAY4 = HERE.parent.parent
ROOT = DAY4.parent
TEMPLATE = ROOT / "pilot-template"
APP = HERE / "work" / "kompaniya" / "app"
SKIP = shutil.ignore_patterns("_build", ".venv", ".pytest_cache", "__pycache__", "runtime", ".env", ".git")


def main() -> None:
    if APP.exists():
        shutil.rmtree(APP)
    shutil.copytree(TEMPLATE, APP, ignore=SKIP)
    for name in ("sayt.py", "sayt-sozlash.sh"):
        shutil.copy(DAY4 / "exercises" / "vositalar" / name, APP / "deploy" / name)
    print(f"Sandbox ready: {APP.relative_to(DAY4)}")


if __name__ == "__main__":
    main()
