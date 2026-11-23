"""Copy the results-sheet guide (natija-varagi.qollanma.md) into index.html as the in-page "Qo‘llanma".

Run after editing the guide:  python3 day-6/_build/build_guide.py
The .md stays the source; the page gets the same text between <!-- GUIDE:START --> and <!-- GUIDE:END -->.
Small Markdown subset: headings, paragraphs, lists, checkboxes, tables, quotes, images, **bold**, `code`.
Paths resolve relative to this file. Refuses em dashes.
"""
import html
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
RS = HERE.parent / "results-sheet"
SRC = RS / "natija-varagi.qollanma.md"
PAGE = RS / "index.html"


def inline(text: str) -> str:
    t = html.escape(text, quote=False)
    t = re.sub(r"`([^`]+)`", r"<code>\1</code>", t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    return t


def convert(md: str) -> str:
    lines = md.splitlines()
    out, para, i = [], [], 0

    def flush():
        if para:
            out.append("<p>" + inline(" ".join(s.strip() for s in para)) + "</p>")
            para.clear()

    while i < len(lines):
        line = lines[i]
        s = line.strip()
        if not s:
            flush(); i += 1; continue
        if s.startswith("# "):  # page title: the app bar already shows it
            flush(); out.append("<h2>Qo‘llanma: qanday ishlatish</h2>"); i += 1; continue
        if s.startswith("Praktikum 3.0 ·") and i < 4:
            i += 1; continue
        m = re.match(r"^(#{2,3})\s+(.*)", s)
        if m:
            flush(); out.append(f"<h3>{inline(m.group(2))}</h3>"); i += 1; continue
        m = re.match(r"^!\[(.*?)\]\((.*?)\)", s)
        if m:
            flush(); out.append(f'<p><img src="{html.escape(m.group(2))}" alt="{html.escape(m.group(1))}" style="max-width:100%;border:1px solid #d9dce3;border-radius:6px" loading="lazy"></p>'); i += 1; continue
        if s.startswith("|"):
            flush()
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-{2,}:?", c) for c in cells):
                    rows.append(cells)
                i += 1
            head, body = rows[0], rows[1:]
            out.append("<table><tr>" + "".join(f"<th>{inline(c)}</th>" for c in head) + "</tr>" + "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in body) + "</table>")
            continue
        if s.startswith(">"):
            flush()
            q = []
            while i < len(lines) and lines[i].strip().startswith(">"):
                q.append(lines[i].strip().lstrip(">").strip()); i += 1
            out.append("<blockquote style=\"border-left:3px solid #d9dce3;margin:8px 0;padding:4px 12px;color:#4a505e\">" + inline(" ".join(q)) + "</blockquote>")
            continue
        m = re.match(r"^(- |\d+\. )", s)
        if m:
            flush()
            ordered = s[0].isdigit()
            items = []
            while i < len(lines) and lines[i].strip():
                t = lines[i]
                st = t.strip()
                mm = re.match(r"^(- \[ \] |- |\d+\. )(.*)", st)
                if mm and not t.startswith("   "):
                    box = "☐ " if mm.group(1) == "- [ ] " else ""
                    items.append(box + mm.group(2))
                else:
                    items[-1] += " " + st
                i += 1
            tag = "ol" if ordered else "ul"
            out.append(f"<{tag}>" + "".join(f"<li>{inline(x)}</li>" for x in items) + f"</{tag}>")
            continue
        para.append(s); i += 1
    flush()
    return "\n".join(out)


def main() -> int:
    md = SRC.read_text(encoding="utf-8")
    if "\u2014" in md:
        print("em dash in guide, fix it first"); return 1
    body = convert(md)
    page = PAGE.read_text(encoding="utf-8")
    start, end = "<!-- GUIDE:START -->", "<!-- GUIDE:END -->"
    a, b = page.index(start) + len(start), page.index(end)
    PAGE.write_text(page[:a] + "\n" + body + "\n" + page[b:], encoding="utf-8")
    print(f"guide: {len(body)} chars into {PAGE.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
