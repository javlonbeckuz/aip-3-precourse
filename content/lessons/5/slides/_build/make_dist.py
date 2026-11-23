"""Pack the files owners get in the table chat on Wednesday before lesson 4.

    python3 day-4/_build/make_dist.py

Writes _build/dist/4-dars-materiallar.zip (paths relative to this file):
  vositalar/sayt.py, vositalar/sayt-sozlash.sh, vositalar/sayt.qollanma.md   (domain tool, exercise 03)
  pdf/*.pdf                                                                  (handouts, exercises, homework)
Run build_docs.py first so the PDFs are current.
"""

from __future__ import annotations

import zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
DAY4 = HERE.parent
OUT = HERE / "dist" / "4-dars-materiallar.zip"


def main() -> None:
    files = [(DAY4 / "exercises" / "vositalar" / n, f"vositalar/{n}")
             for n in ("sayt.py", "sayt-sozlash.sh", "sayt.qollanma.md")]
    files += [(p, f"pdf/{p.name}") for p in sorted((DAY4 / "handouts" / "pdf").glob("*.pdf"))]
    missing = [str(src) for src, _ in files if not src.exists()]
    if missing:
        raise SystemExit("missing: " + ", ".join(missing))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        for src, arc in files:
            info = zipfile.ZipInfo.from_file(src, arc)
            if arc.endswith(".sh"):
                info.external_attr = 0o755 << 16
            with src.open("rb") as fh:
                z.writestr(info, fh.read(), zipfile.ZIP_DEFLATED)
    print(f"{OUT.relative_to(DAY4)}: {len(files)} files, {OUT.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
