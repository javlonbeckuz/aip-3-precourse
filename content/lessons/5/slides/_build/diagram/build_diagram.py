"""Build the Day 4 domain / DNS / HTTPS diagram from one SVG source.

    uv run --with playwright python3 day-4/_build/diagram/build_diagram.py

Writes, relative to this file:
  ../../demos/03-domen-dns-https/diagramma.html  standalone page, fonts inlined, works offline
  ../../demos/03-domen-dns-https/diagramma.png   1600x880 render (fallback, print)
  ../../deck/assets/diagram_dns.js               the same diagram redrawn light and larger for the deck (labels 30 px or more on stage; fonts come from the deck)
Uses the installed Google Chrome through Playwright (no browser download).
"""

from __future__ import annotations

import base64
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
DAY4 = HERE.parent.parent
SVG = (HERE / "dns.svg").read_text(encoding="utf-8")
FONTS = DAY4 / "deck" / "assets" / "fonts"
DEMO = DAY4 / "demos" / "03-domen-dns-https"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def font_face(family: str, file: str, weight: str) -> str:
    data = base64.b64encode((FONTS / file).read_bytes()).decode()
    return (f"@font-face{{font-family:'{family}';src:url(data:font/woff2;base64,{data}) format('woff2');"
            f"font-weight:{weight};font-display:block;}}")


def page() -> str:
    faces = "\n".join([font_face("OVDInter", "InterVariable-latin.woff2", "100 900"),
                       font_face("OVDMono", "GeistMono-Regular.woff2", "400")])
    return f"""<!DOCTYPE html>
<html lang="uz"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Domen, DNS va HTTPS - 4-dars</title>
<style>
{faces}
html, body {{ margin: 0; background: #000; color: #f4f4f6; font-family: 'OVDInter', system-ui, sans-serif; }}
main {{ max-width: 1600px; margin: 0 auto; padding: 24px 16px 32px; }}
h1 {{ font-size: clamp(22px, 3vw, 34px); font-weight: 650; margin: 0 0 6px; letter-spacing: -0.01em; }}
p {{ color: #b4b4bc; font-size: clamp(15px, 1.6vw, 19px); margin: 0 0 18px; line-height: 1.45; }}
.fig {{ overflow-x: auto; -webkit-overflow-scrolling: touch; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; background: #050507; }}
svg {{ width: 100%; height: auto; display: block; }}
.hint {{ display: none; color: #6e6e78; font-size: 14px; margin: 8px 0 0; }}
@media (max-width: 760px) {{ svg {{ min-width: 980px; }} .hint {{ display: block; }} }}
</style></head>
<body><main>
<h1>Domen, DNS va HTTPS: bitta rasmda</h1>
<p>Ko‘k yo‘l - sayt (domen kerak). Yashil yo‘l - assistent (Telegram, domen shart emas). Kulrang - Siz serverga kirasiz.</p>
<div class="fig">{SVG}</div>
<p class="hint">Rasmni barmoq bilan chapga-o‘ngga suring.</p>
</main></body></html>
"""


# The deck runs on the shared light engine (deck-engine/): white tile, Inter, Geist Mono, green / blue / grey paths.
# The deck copy is drawn here on its own canvas (1780 x 846, the size of the slide tile) so that every label is at
# least 30 px on stage; dns.svg and the dark standalone demo page stay as they are. The words are the words of
# dns.svg: deck_svg() stops if a text of dns.svg is missing or a word was added. Only line breaks differ.
INK, BODY, GREY, BLUE, GREEN = "#0B0B0D", "#3A3A40", "#6A6A72", "#2F5FE0", "#1F7A36"
H, LB, B = 36, 33, 31  # px: box title, inner title, body / small / mono

DECK_HEAD = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1780 846" role="img" aria-labelledby="t d">
<title id="t">Domen, DNS, HTTPS va bot: bitta rasmda</title>
<desc id="d">Mijoz telefoni DNS dan IP manzilni so‘raydi, keyin serverdagi Caddy ga HTTPS bilan ulanadi. Bot serverdan Telegram ga o‘zi ulanadi, noutbuk serverga SSH kalit bilan kiradi.</desc>
<defs>
<marker id="aB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="@BLUE"/></marker>
<marker id="aG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="@GREEN"/></marker>
<marker id="aW" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#7C7C84"/></marker>
</defs>
<style>
.t { font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif; fill: @INK; }
.h { font-size: @Hpx; font-weight: 600; letter-spacing: -0.02em; }
.lb { font-size: @LBpx; font-weight: 600; letter-spacing: -0.015em; }
.b { font-size: @Bpx; fill: @BODY; }
.s { font-size: @Bpx; fill: @GREY; }
.m { font-family: 'Geist Mono', ui-monospace, Menlo, Consolas, monospace; font-size: @Bpx; fill: @INK; font-variant-ligatures: none; }
.box { fill: #F2F2F5; } .acc { fill: #E4ECFF; } .ok { fill: #DCEFD9; }
.vps { fill: #FAFAFB; stroke: #B9B9C0; stroke-width: 2; stroke-dasharray: 8 6; }
.lnB { fill: none; stroke: @BLUE; stroke-width: 3.5; }
.lnG { fill: none; stroke: @GREEN; stroke-width: 3.5; }
.lnW { fill: none; stroke: #7C7C84; stroke-width: 3; stroke-dasharray: 7 7; }
</style>"""


def _t(x, y, text, cls, fill=None, anchor=None):
    extra = (f' style="fill:{fill}"' if fill else "") + (f' text-anchor="{anchor}"' if anchor else "")
    return f'<text class="t {cls}" x="{x}" y="{y}"{extra}>{text}</text>'


def _box(cls, x, y, w, h, lines, pad=26, first=50, step=42):
    """A rounded box with lines [(class, text), ...]; returns SVG."""
    out = [f'<rect class="{cls}" x="{x}" y="{y}" width="{w}" height="{h}" rx="30"/>']
    yy = y + first
    for c, text in lines:
        out.append(_t(x + pad, yy, text, c))
        yy += step
    return "\n".join(out)


def deck_svg() -> str:
    head = DECK_HEAD
    for k, v in (("@BLUE", BLUE), ("@GREEN", GREEN), ("@INK", INK), ("@BODY", BODY), ("@GREY", GREY),
                 ("@LB", str(LB)), ("@H", str(H)), ("@B", str(B))):
        head = head.replace(k, v)
    parts = [head]
    # column 1: people
    parts.append(_box("box", 0, 44, 440, 166, [("h", "Mijoz telefoni"), ("b", "brauzerda yozadi:"), ("m", "forma.barakaoffice.uz")], pad=22))
    parts.append(_box("box", 0, 338, 440, 166, [("h", "Noutbukingiz"), ("b", "Claude Code"), ("b", "kalit: ~/.ssh")]))
    parts.append(_box("box", 0, 628, 440, 166, [("h", "Sizning telefoningiz"), ("b", "Telegram: savol,"), ("b", "/stop, /hisobot")]))
    # column 2: DNS and Telegram
    parts.append(_box("acc", 680, 0, 380, 262, [("h", "DNS = telefon kitobi"), ("b", "ism → raqam (A yozuvi)")]))
    parts.append('<rect x="700" y="116" width="340" height="124" rx="20" fill="#FFFFFF"/>')
    parts.append(_t(722, 164, "forma  A", "m"))
    parts.append(_t(722, 210, "→ 203.0.113.10", "m"))
    parts.append(_box("ok", 680, 604, 380, 190, [("h", "Telegram"), ("b", "xabarlarni saqlab"), ("b", "turadi; bot ularni"), ("b", "o‘zi olib ketadi")]))
    # Let's Encrypt and the server
    parts.append(_box("box", 1180, 0, 600, 166, [("h", "Let’s Encrypt"), ("b", "bepul sertifikat = qulf belgisi"), ("s", "90 kun; Caddy o‘zi yangilaydi")]))
    parts.append('<rect class="vps" x="1090" y="232" width="688" height="612" rx="34"/>')
    parts.append(_t(1114, 282, "Server (VPS) · 203.0.113.10", "h"))
    parts.append(_t(1114, 324, "kecha-kunduz yoqiq ·", "s"))
    parts.append(_t(1114, 364, "firewall: faqat 22, 80, 443", "s"))
    parts.append(_box("acc", 1110, 388, 648, 162, [("lb", "Caddy · qabulxona · 80, 443"), ("b", "kelganni sahifaga yo‘naltiradi"), ("s", "sayt: /var/www/sayt")], pad=24, first=48))
    parts.append(_box("ok", 1110, 584, 648, 244, [("lb", "pilot-bot · shaxsiy AI assistent"), ("b", "systemd: yiqilsa 5 soniyada,"), ("b", "server qayta yuklansa ham qaytadi"), ("s", "kalitlar: /opt/pilot/.env"), ("s", "(faqat bot o‘qiydi)")], pad=24, first=48))
    # website path (blue)
    parts.append('<path class="lnB" d="M440,96 L672,96" marker-end="url(#aB)"/>')
    parts.append(_t(452, 80, "1. qayerda?", "s"))
    parts.append('<path class="lnB" d="M680,178 L448,178" marker-end="url(#aB)"/>')
    parts.append(_t(452, 162, "2. 203.0.113.10", "s"))
    parts.append('<path class="lnB" d="M440,204 C 600,300 840,468 1102,468" marker-end="url(#aB)"/>')
    parts.append(_t(770, 336, "3. https:// + qulf", "lb", fill=BLUE))
    parts.append('<path class="lnB" d="M1720,166 L1720,380" marker-end="url(#aB)"/>')
    parts.append(_t(1700, 212, "sertifikat", "s", anchor="end"))
    # SSH (grey dashed)
    parts.append('<path class="lnW" d="M440,420 C 700,420 860,567 1082,567" marker-end="url(#aW)"/>')
    parts.append(_t(452, 572, "SSH 22 · kalit bilan · deploy.py", "s"))
    # bot path (green)
    parts.append('<path class="lnG" d="M1110,760 L1068,760" marker-end="url(#aG)"/>')
    parts.append('<path class="lnG" d="M680,684 L448,684" marker-end="url(#aG)"/>')
    parts.append('<path class="lnG" d="M440,744 L672,744" marker-end="url(#aG)"/>')
    parts.append(_t(400, 840, "bot o‘zi so‘raydi: serverda ochiq port kerak emas", "s"))
    svg = "\n".join(parts) + "\n</svg>"
    # same words as dns.svg
    import re
    texts = lambda x: [" ".join(t.split()) for t in re.findall(r"<text[^>]*>(.*?)</text>", x, flags=re.S)]
    old, new = " ".join(texts(SVG)).split(), " ".join(texts(svg)).split()
    if sorted(old) != sorted(new):
        raise SystemExit(f"deck diagram: words differ from dns.svg: {sorted(set(old) ^ set(new))}")
    return svg


def main() -> None:
    DEMO.mkdir(parents=True, exist_ok=True)
    html = DEMO / "diagramma.html"
    html.write_text(page(), encoding="utf-8")
    (DAY4 / "deck" / "assets" / "diagram_dns.js").write_text(
        "/* Generated by _build/diagram/build_diagram.py (deck_svg: the words of _build/diagram/dns.svg, drawn light and large). Do not edit. */\n"
        f"window.DIAGRAM_DNS = {json.dumps(deck_svg(), ensure_ascii=False)};\n", encoding="utf-8")
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME)
        pg = b.new_page(viewport={"width": 1600, "height": 880})
        pg.goto(html.as_uri())
        pg.wait_for_timeout(300)
        pg.locator("svg").screenshot(path=str(DEMO / "diagramma.png"))
        for w in (1440, 390):
            pg.set_viewport_size({"width": w, "height": 900})
            pg.wait_for_timeout(150)
            pg.screenshot(path=str(HERE / f"diagramma-{w}.png"), full_page=True)
        b.close()
    print("diagram built")


if __name__ == "__main__":
    main()
