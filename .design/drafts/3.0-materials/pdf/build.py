"""Build the printable Kit handouts (A4 PDF) for Praktikum 3.0.

Run:  python build.py          -> writes <name>.html and <name>.pdf next to this file
Each PDF's page count must equal its number of sections; a mismatch means a page overflowed.
Prompts and the consent text are read from ../kit-*.json so they stay identical to the drafts.
"""
import json, re, subprocess, sys
from html import escape
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE.parent
CHROME = r"C:/Program Files/Google/Chrome/Application/chrome.exe"


def kit_json(n):
    return json.loads((SRC / f"kit-{n}.json").read_text(encoding="utf-8"))["kit"]


def prompt(n, pid, title=None):
    for g in kit_json(n)["groups"]:
        for p in g.get("prompts", []):
            if p["id"] == pid and (title is None or p["title"] == title):
                return p
    raise KeyError((n, pid, title))


CONSENT = re.search(r'"(Suhbatimizni.*?Rozimisiz\?)"', kit_json(1)["groups"][1]["note"]).group(1)

CSS = """
@page { size: A4; margin: 14mm }
@page land { size: A4 landscape; margin: 14mm }
* { box-sizing: border-box }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact }
body { margin: 0; font-family: "Segoe UI", Arial, sans-serif; font-size: 10pt; line-height: 1.35; color: #000; background: #fff }
.page { height: 266mm; display: flex; flex-direction: column; break-after: page }
.page:last-child { break-after: auto }
.page.land { page: land; height: 179mm }
.foot { margin-top: auto; padding-top: 1.5mm; border-top: .3mm solid #000; font-size: 8pt }
p { margin: 0 0 2mm }
.kicker { font-size: 9pt; font-weight: 600; letter-spacing: .04em; text-transform: uppercase }
h1 { font-size: 24pt; line-height: 1.1; margin: 1mm 0 3mm }
.lead { font-size: 12pt; margin-bottom: 4mm }
ol.steps { margin: 0 0 3mm; padding-left: 6mm }
ol.steps li { margin-bottom: 2mm; padding-left: 1mm }
.done { margin: 0 0 3mm }
.box { border: .5mm solid #000; padding: 2.5mm 3.5mm; margin-bottom: 3mm }
.box .bh { font-size: 8.5pt; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; margin-bottom: 1.5mm }
.box pre { margin: 0; white-space: pre-wrap; font-family: inherit; font-size: 9.5pt; line-height: 1.35 }
.cc { font-size: 9pt }
.fhead { display: flex; justify-content: space-between; align-items: baseline; border-bottom: .6mm solid #000; padding-bottom: 1.5mm; margin-bottom: 2.5mm }
.fhead h2 { font-size: 16pt; margin: 0 }
.fhead span { font-size: 9pt }
.intro { font-size: 9pt; margin-bottom: 2.5mm }
table { width: 100%; border-collapse: collapse }
.fields { margin-bottom: 3mm; table-layout: fixed }
.fields:has(+ .fields) { margin-bottom: 0 }
.fields + .fields td { border-top: 0 }
.fields td { border: .3mm solid #000; height: 10mm; vertical-align: top; padding: .6mm 1.5mm; font-size: 7.5pt }
.grid th, .grid td { border: .3mm solid #000; padding: .8mm 1.2mm; vertical-align: top; text-align: left }
.grid th { font-size: 7.5pt; font-weight: 600; line-height: 1.2; border-bottom: .6mm solid #000 }
.grid th b { display: block; font-size: 8pt }
.grid td.n { width: 6mm; text-align: center; font-size: 8pt }
.grid td.q { font-size: 9pt }
.legend { font-size: 8.5pt; margin-top: 2mm }
.legend ul { margin: 0; padding-left: 4.5mm }
.legend li { margin-bottom: .6mm }
.cols { display: flex; gap: 6mm }
.cols > * { flex: 1 }
.fld { margin-bottom: 2mm }
.fld .lbl { font-size: 9pt; font-weight: 600 }
.fld .lbl small { font-weight: 400 }
.ln { height: 7.2mm; border-bottom: .25mm solid #555 }
h3 { font-size: 10pt; margin: 3mm 0 1.5mm; text-transform: uppercase; letter-spacing: .04em }
.small { font-size: 8.5pt }
.check { font-size: 11pt; display: flex; gap: 10mm; margin: 1mm 0 2mm }
.check span::before { content: ""; display: inline-block; width: 4.5mm; height: 4.5mm; border: .4mm solid #000; margin-right: 2mm; vertical-align: -1mm }
"""

state = {"page": 0}


def page(body, land=False):
    state["page"] += 1
    cls = "page land" if land else "page"
    return (f'<section class="{cls}">{body}<div class="foot">'
            f'Tuzuvchi: Xurshid Maroziqov. Praktikum 3.0, sahifa {state["page"]}</div></section>')


def fields(*rows):
    """Each arg is one row of field labels; each row is its own fixed-layout table."""
    return "".join('<table class="fields"><tr>' + "".join(f"<td>{n}</td>" for n in r) + "</tr></table>"
                   for r in rows)


def grid(heads, rows, row_h, widths=None, first=None):
    """heads: list of (code, label). rows: int (empty numbered rows) or list of lists (prefilled cells)."""
    widths = widths or [None] * len(heads)
    th = "".join(
        f'<th{f" style=width:{w}" if w else ""}>{f"<b>{c}</b>" if c else ""}{l}</th>'
        for (c, l), w in zip(heads, widths))
    body = []
    if isinstance(rows, int):
        rows = [[str(i + 1)] + [""] * (len(heads) - 1) for i in range(rows)]
    for r in rows:
        tds = "".join(f'<td class="{"n" if i == 0 and first == "n" else ("q" if v else "")}">{v}</td>'
                      for i, v in enumerate(r))
        body.append(f'<tr style="height:{row_h}">{tds}</tr>')
    return f'<table class="grid"><thead><tr>{th}</tr></thead><tbody>{"".join(body)}</tbody></table>'


def fld(label, n=1, note=""):
    lines = '<div class="ln"></div>' * n
    note = f'<div class="small">{note}</div>' if note else ""
    return f'<div class="fld"><div class="lbl">{label}</div>{note}{lines}</div>'


def legend(items):
    return '<div class="legend"><ul>' + "".join(f"<li>{i}</li>" for i in items) + "</ul></div>"


def prompt_box(p, label=None):
    t = p["title"]
    label = label or (f'{t} ({p["target"]})' if "prompt" in t.lower() else f'Prompt: {t} ({p["target"]})')
    return f'<div class="box"><div class="bh">{escape(label)}</div><pre>{escape(p["text"])}</pre></div>'


def instr(kit, name, lead, steps, done, boxes, cc=""):
    ol = "".join(f"<li>{s}</li>" for s in steps)
    cc = f'<p class="cc"><b>Claude Code.</b> {cc}</p>' if cc else ""
    return page(f'<div class="kicker">Praktikum 3.0</div><h1>{kit}: {name}</h1>'
                f'<p class="lead">{lead}</p><ol class="steps">{ol}</ol>'
                f'<p class="done"><b>Tayyor, agar:</b> {done}</p>{"".join(boxes)}{cc}')


def fhead(title, kit):
    return f'<div class="fhead"><h2>{title}</h2><span>{kit}</span></div>'


def consent_box():
    return (f'<div class="box"><div class="bh">Yozishdan oldin ovoz chiqarib oʻqing</div>'
            f'<pre>"{CONSENT}"</pre></div>')


# ---------------------------------------------------------------- Kit 1
def kit1():
    K = "Kit 1/5: Ish qayerga ketadi"
    p1 = instr("Kit 1/5", "Ish qayerga ketadi",
        "AIʼga vazifa berishdan oldin xodimlaringiz haftasiga qaysi ishga qancha vaqt sarflashini aniq toping.",
        [
            "<b>Jamoaga sababini ayting.</b> Birinchi intervyudan oldin rahbar butun jamoaga bitta xabar yozadi yoki qisqa yigʻilish qiladi. Maqsadni dangal ayting: ishni xaritaga tushirish, odamlarni almashtirish emas. Odamlar ishini yoʻqotishdan qoʻrqsa, haqiqiy jarayonni yashiradi. Har intervyu boshida buni yana ayting.",
            "<b>Intervyu, A shakli.</b> Darsda hamkasb bilan 5 daqiqalik mashq qiling. Uyda bitta boʻlimdan 2-3 xodim bilan 20-30 daqiqa suhbatlashing. Yozishdan oldin rozilik matnini ovoz chiqarib oʻqing, telefonda yozishni faqat xodim rozi boʻlgandan keyin boshlang. A.1 dan A.7 gacha savollarni ketma-ket bering, har biriga aniq hayotiy misol soʻrang. Yakka ishlaydigan egalar va jamoasi yoʻq rahbarlar oʻzini yoki boʻlim boshligʻini intervyu qiladi.",
            "<b>Transkripsiya.</b> Audioni Geminiʼga yuklang va transkripsiya promptini qoʻying. Matnni bir marta oʻqing, ism va raqamlarni toʻgʻrilang. Matndagi har raqamni audio bilan solishtiring: transkripsiya oʻzbekcha raqamlarda adashadi, \"bir uch-toʻrt yuz ming\" 1 300 000 boʻlib qoladi. Matnni kit1-&lt;ism&gt;-transkript.md nomi bilan saqlang.",
            "<b>B shakli.</b> Kit 1 prompti intervyu matnidan B shakli jadvalini tuzadi. Jadvalni xodimga koʻrsating: daqiqa va chastotani u tuzatsin, [?] belgilari qolmasin.",
            "<b>Soat va belgi.</b> Haftalik soatlarni jamlang: B.4 = B.2 × B.3 / 60. Har vazifaga B.9 belgisini qoʻying: A agent, R robot (AIʼsiz avtomatika: formula, skript yoki oddiy bot), I inson, B birgalikda. Har xodimni alohida .md faylga saqlang, masalan kit1-dilnoza.md, va ikkinchi darsga olib keling.",
        ],
        "kamida 2 ta B shakli .md faylda va ularda [?] qolmagan.",
        [consent_box(), prompt_box(prompt(1, "K1P1")), prompt_box(prompt(1, "K1P2"))],
        "Ikkinchi darsdan /kit1 skilli Kit 1 promptini har safar bir xil bajaradi va natijani kit1-interviews papkasiga saqlaydi.")

    qs = [
        ("A.1", "Odatdagi bir ish kuningiz qanday oʻtadi, ishga kelganingizdan to ketguningizgacha aytib bering."),
        ("A.2", "Hafta davomida eng koʻp vaqtingizni oladigan uchta vazifa qaysi? Har biriga taxminan necha daqiqa ketadi?"),
        ("A.3", "Qaysi vazifalarni har doim bir xil bajarasiz? Menga oxirgisini koʻrsating."),
        ("A.4", "Qayerda maʼlumot kutib qolasiz yoki bir narsani boshqalardan qayta-qayta soʻraysiz?"),
        ("A.5", "Eng koʻp xatolar qayerda boʻladi? Ularni kim sezadi va bu xatolar qanchaga tushadi?"),
        ("A.6", "Qaysi ishingiz sizning tajribangizni talab qiladi, yaʼni yangi kelgan xodim uni birinchi oyida eplay olmaydi?"),
        ("A.7", "Agar ertaga sizga yordamchi berishsa, birinchi boʻlib qaysi vazifani unga topshirardingiz?"),
    ]
    p2 = page(
        fhead("A shakli: xodim bilan suhbat", K)
        + '<p class="intro">Bitta xodim bilan 20-30 daqiqa. Yettita savolni ketma-ket bering va har doim aniq hayotiy misol soʻrang. '
          'Birinchi intervyudan oldin rahbar butun jamoaga sababini aytgan boʻlsin: maqsad ishni xaritaga tushirish, odamlarni almashtirish emas. '
          'Yakka ishlaydigan egalar va jamoasi yoʻq rahbarlar oʻzini yoki boʻlim boshligʻini intervyu qiladi.</p>'
        + fields(["Xodim", "Lavozim", "Boʻlim", "Sana"],
                 ["Suhbat oldi", "Jamoaga sababi aytilgan sana", "Yozib olishga rozilik olindi (ha / yoʻq)"])
        + consent_box()
        + '<p class="small">Telefonda yozishni faqat xodim rozi boʻlgandan keyin boshlang. Keyin maqsadni yana bir marta ayting: ishni xaritaga tushirish, odamlarni almashtirish emas.</p>'
        + grid([("#", ""), ("", "Savol"), ("", "Qisqa qayd")],
               [[c, q, ""] for c, q in qs], "19.5mm", ["9mm", "45%", None], first="n")
        + '<div class="legend"><b>Suhbatdan keyin</b><ol style="margin:.5mm 0 0;padding-left:5mm">'
          '<li>Audioni Geminiʼda oʻzbek tilida soʻzma-soʻz matnga aylantiring.</li>'
          '<li>Matnni bir marta oʻqing, ism va raqamlarni toʻgʻrilang.</li>'
          '<li>Har raqamni audio bilan solishtiring. Transkripsiya oʻzbekcha raqamlarda adashadi: "bir uch-toʻrt yuz ming" 1 300 000 boʻlib qoladi.</li>'
          '<li>Matnni Kit 1 prompti bilan B shakliga aylantiring.</li>'
          '<li>Matnni kit1-&lt;ism&gt;-transkript.md nomi bilan saqlang.</li></ol></div>')

    p3 = page(
        fhead("B shakli: vazifalar roʻyxati", K)
        + fields(["Xodim", "Lavozim", "Boʻlim", "Sana"])
        + grid([("#", ""), ("B.1", "Vazifa (feʼl bilan)"), ("B.2", "Haftasiga, marta"), ("B.3", "Daqiqa, bir safar"),
                ("B.4", "Haftalik soat"), ("B.5", "Maʼlumot qayerdan keladi"), ("B.6", "Natija kimga ketadi"),
                ("B.7", "Q / F"), ("B.8", "Xatoning narxi"), ("B.9", "Ertaga A / R / I / B")],
               [[str(i + 1)] + [""] * 9 for i in range(10)]
               + [["", '<b style="font-size:8pt">Haftasiga jami soat (B.4 yigʻindisi)</b>', "", "", "", "", "", "", "", ""]],
               "7.2mm", ["6mm", "24%", "7%", "7%", "7%", "14%", "14%", "5%", "7%", "7%"], first="n")
        + '<div class="cols">'
        + legend(["Bitta xodim, bitta shakl. Jadvalni Kit 1 prompti transkriptdan tuzadi, keyin xodim daqiqa va chastotani tuzatadi.",
                  "Har qatorga bitta vazifa. Vazifani feʼl bilan yozing, masalan \"Buyurtmani 1C ga kiritish\".",
                  "B.2: haftasiga necha marta. Kunlik yoki oylik vazifani haftaga aylantiring.",
                  "B.4 = B.2 × B.3 / 60.",
                  "B.7: Q qoida (har safar bir xil), F fikr (tajriba kerak).",
                  "B.8: past, oʻrta, yuqori.",
                  "B.9: A agent, R robot (AIʼsiz avtomatika: formula, skript yoki oddiy bot), I inson, B birgalikda.",
                  "Taxmin qilingan raqam yonida [?] turadi. Xodim tuzatgandan keyin [?] ni oʻchiring.",
                  "Faylni kit1-&lt;ism&gt;.md nomi bilan saqlang, masalan kit1-dilnoza.md. Ikkinchi darsda u kompaniya/kit1-interviews/ papkasiga tushadi."])
        + '<div><h3 style="margin-top:2mm">Tekshirilgan raqamlar</h3>'
          '<p class="small">Audio bilan solishtirilgan har raqam: transkriptda nima yozilgan, aslida nima.</p>'
        + grid([("", "Vazifa #"), ("", "Transkriptda"), ("", "Aslida"), ("", "Kim tuzatdi")], [[""] * 4] * 3, "7mm",
               ["16%", None, None, None])
        + '<div style="height:2mm"></div>' + fld("Xodim tasdiqladi (ism, sana):") + "</div></div>",
        land=True)
    return [p1, p2, p3]


# ---------------------------------------------------------------- Kit 2
SCALE = [
    ("A.2 Takrorlanishi", "oyda bir marta", "kunda koʻp marta"),
    ("A.3 Ketadigan vaqt", "haftasiga bir necha daqiqa", "haftasiga 10 soatdan koʻp"),
    ("A.4 Aniq qoidasi bor", "har bir holat har xil", "har doim bir xil qadamlar"),
    ("A.5 Maʼlumot raqamli", "qogʻozda yoki odamlar yodida", "allaqachon tizim yoki jadvalda"),
    ("A.6 Xatosi arzon", "xato pul yoki ishonchni yoʻqotadi", "sezish va toʻgʻrilash oson"),
    ("A.7 Mijoz sezadi", "faqat ichki jarayon", "mijoz buni kutib turadi"),
]


def matrix_svg():
    s, L, T = 9.2, 14, 3  # mm per point, left gutter, top gutter
    W = 12 * s
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {L + W + 3} {T + W + 14}" '
           f'style="width:{L + W + 3}mm;height:{T + W + 14}mm" font-family="Segoe UI, Arial, sans-serif">']
    for i in range(13):
        v, x, y = 3 + i, L + i * s, T + W - i * s
        sw = .6 if v == 9 or i in (0, 12) else .2
        out.append(f'<line x1="{x}" y1="{T}" x2="{x}" y2="{T + W}" stroke="#000" stroke-width="{sw}"/>')
        out.append(f'<line x1="{L}" y1="{y}" x2="{L + W}" y2="{y}" stroke="#000" stroke-width="{sw}"/>')
        out.append(f'<text x="{x}" y="{T + W + 4}" font-size="3" text-anchor="middle">{v}</text>')
        out.append(f'<text x="{L - 1.5}" y="{y + 1}" font-size="3" text-anchor="end">{v}</text>')
    q = [(L + W / 4, T + 5, "Foydali, puxta reja kerak", 400), (L + 3 * W / 4, T + 5, "Birinchi sinov", 700),
         (L + W / 4, T + W / 2 + 5, "Hozircha tegmang", 400), (L + 3 * W / 4, T + W / 2 + 5, "Oson, lekin foydasi kichik", 400)]
    for x, y, t, w in q:
        out.append(f'<text x="{x}" y="{y}" font-size="3.4" font-weight="{w}" text-anchor="middle" '
                   f'stroke="#fff" stroke-width="1.6" paint-order="stroke">{t}</text>')
    out.append(f'<text x="{L + W / 2}" y="{T + W + 10}" font-size="3.6" font-weight="600" text-anchor="middle">Ease (A.9)</text>')
    out.append(f'<text x="4" y="{T + W / 2}" font-size="3.6" font-weight="600" text-anchor="middle" '
               f'transform="rotate(-90 4 {T + W / 2})">Value (A.8)</text>')
    return "".join(out) + "</svg>"


def kit2():
    K = "Kit 2/5: Qaysi jarayondan boshlaymiz"
    p1 = instr("Kit 2/5", "Qaysi jarayondan boshlaymiz",
        "Jarayonlarni bir xil mezonlarda baholang va birinchi pilot uchun bittasini tanlang: qiymati yuqori, boshlash oson, xatosi arzon.",
        [
            "<b>Jarayonlar, A shakli.</b> Kit 1 fayllaridan 8 tagacha jarayonni A shakliga yozing. Jarayon: boshlanishi va natijasi bor vazifalar zanjiri, masalan \"mijoz soʻrovidan to yozilgan sinov darsigacha\".",
            "<b>Baholash.</b> Kit 1 B fayllarini kit1-interviews papkasiga, A shaklini kit2-scoring papkasiga qoʻying va Claude Codeʼda Kit 2 promptini yoki /kit2 ni ishga tushiring. Har jarayon A.2-A.7 boʻyicha 1 dan 5 gacha baholanadi, shkala jadval ostida. Har bahoni manbasi bilan tekshiring va rozi boʻlmaganini tuzating.",
            "<b>Value va Ease.</b> Value = A.2 + A.3 + A.7, Ease = A.4 + A.5 + A.6. Har biri 3 dan 15 gacha boʻladi.",
            "<b>Matritsa, B shakli.</b> Har jarayonni panjaraga bitta nuqta qilib tushiring: gorizontal oʻq Ease, vertikal oʻq Value. Nuqta yoniga jarayon raqamini yozing. Claude Codeʼdan matritsani kit2-scoring/matrix.html qilib yasashni soʻrang va brauzerda oching.",
            "<b>Tanlov.</b> Uyda baholarni boʻlim boshligʻi bilan koʻrib chiqing: egalar odatda maʼlumot qanchalik tartibsizligini kam baholaydi. Yuqori oʻng kvadratdan bitta jarayon tanlang, B.1-B.3 ni toʻldiring va tanlovni CLAUDE.md ga yozing. Bu jarayon Kit 3 ga oʻtadi.",
            "<b>Baseline, Kit 5 B.</b> Tanlangan jarayon boʻyicha toʻrt raqamni yozing: B.1 bajarilgan murojaatlar, B.2 oʻrtacha daqiqa, B.3 xatolar, B.4 takroriy murojaatlar. Tarix bor joyda oxirgi 2-4 haftani Claude Code bilan oling: Telegram chat eksporti, Excel, CRM. Tarixi yoʻq raqamni 5 ish kuni jonli yozing. Natijani Kit 5 B ning Agentgacha ustuniga bir haftalik raqam qilib yozing.",
        ],
        "B.1-B.3 toʻldirilgan va boʻlim boshligʻi bilan kelishilgan, kit5-pilot/baseline.md da toʻrt raqam va har birining manbasi bor.",
        [prompt_box(prompt(3, "K2P1"))],
        "/kit2 baholash jadvalini tuzadi. Uyda /kit5 baseline bilan Agentgacha raqamlarini yigʻasiz.")

    scale = grid([("", "Mezon"), ("", "1"), ("", "5")], [list(r) for r in SCALE], "5.5mm", ["32%", None, None])
    p2 = page(
        fhead("A shakli: jarayonlarni baholash", K)
        + '<p class="intro">Jarayonlarni bir xil mezonlarda baholang va birinchi pilot uchun bittasini tanlang: qiymati yuqori, boshlash oson, xatosi arzon.</p>'
        + fields(["Boʻlim", "Baholadi", "Sana"])
        + grid([("#", ""), ("A.1", "Jarayon (boshlanishi - natija)"), ("A.2", "Takrorlanishi"), ("A.3", "Ketadigan vaqt"),
                ("A.4", "Aniq qoidasi bor"), ("A.5", "Maʼlumot raqamli"), ("A.6", "Xatosi arzon"), ("A.7", "Mijoz sezadi"),
                ("A.8", "Value"), ("A.9", "Ease"), ("", "Manba (Kit 1 fayli, qator)")],
               8, "9.5mm", ["6mm", "25%", "7%", "7%", "7%", "7%", "7%", "7%", "6%", "6%", None], first="n")
        + '<div class="cols" style="margin-top:2mm"><div style="flex:1.6"><h3 style="margin-top:0">Shkala</h3>' + scale + "</div>"
        + legend(["Har baho yoniga manbasini yozing: qaysi Kit 1 fayli, qaysi qator.",
                  "A.8 Value (qiymat) = A.2 + A.3 + A.7.",
                  "A.9 Ease (osonlik) = A.4 + A.5 + A.6.",
                  "Har biri 3 dan 15 gacha boʻladi.",
                  "Baholarni boʻlim boshligʻi bilan koʻrib chiqing: biznes egasi odatda maʼlumot qanchalik tartibsiz ekanini kam baholaydi.",
                  "Faylni kompaniya/kit2-scoring/ papkasiga saqlang. Claude Code toʻldirgan jadval kit2-scoring/scoring.md boʻladi."])
        + "</div>", land=True)

    p3 = page(
        fhead("B shakli: Value/Ease matritsasi", K)
        + '<div class="cols"><div style="flex:0 0 140mm">'
        + '<p class="intro">Har jarayonni panjaraga bitta nuqta qilib tushiring. Gorizontal oʻq: Ease (A.9). Vertikal oʻq: Value (A.8). '
          'Ikkala oʻq 3 dan 15 gacha, panjaraning oʻrtasi 9. Nuqta yoniga jarayon raqamini yozing.</p>'
        + matrix_svg()
        + '<p class="small">Matritsani Claude Code bitta HTML sahifa qilib chizadi: kit2-scoring/matrix.html.</p>'
        + '<p class="small">Tanlangan jarayonni CLAUDE.md ga ham yozing. Bu jarayon Kit 3 ga oʻtadi.</p></div><div>'
        + fields(["Boʻlim", "Sana"])
        + grid([("#", ""), ("", "Jarayon (A.1)"), ("", "Value (A.8)"), ("", "Ease (A.9)"), ("", "Kvadrat")],
               8, "6.6mm", ["6mm", None, "14%", "14%", "20%"], first="n")
        + '<h3 style="margin-top:2mm">Tanlov</h3><p class="small">Yuqori oʻng kvadratdan bitta jarayon tanlang.</p>'
        + fld("B.1 Tanlangan jarayon") + fld("B.2 Nega aynan shu", 2) + fld("B.3 Hozir nimani qilmaymiz", 2)
        + fld("Boʻlim boshligʻi bilan kelishildi (ism, sana)")
        + "</div></div>", land=True)
    return [p1, p2, p3]


# ---------------------------------------------------------------- Kit 3
def kit3():
    K = "Kit 3/5: Ishni qayta taqsimlash"
    p1 = instr("Kit 3/5", "Ishni qayta taqsimlash",
        "Tanlangan jarayonni qadamma-qadam yozing, ertaga har qadamni kim bajarishini belgilang va agent koʻrsatmalarini tuzing.",
        [
            "<b>Qadamlar, A shakli.</b> Kit 2 da tanlangan jarayonni boshidan oxirigacha yozing, bir qatorda bitta harakat. A.3 ga uni bugun kim qilishini yozing.",
            "<b>Ertaga kim.</b> A.4 ga ertaga kim qilishini belgilang: A agent, R robot (AIʼsiz avtomatika: formula, skript yoki oddiy bot), I inson. A.5-A.7 ga kim tekshirishi, kim qaror qilishi va kim javobgarligini yozing. Bitta katak boʻsh boʻlsa, jarayon hali tayyor emas. Agent oʻz qadamini oʻzi tekshirmaydi.",
            "<b>Haqiqiy holat.</b> Oʻtgan haftadagi bitta haqiqiy holatni jadval boʻyicha boshidan oxirigacha yuritib chiqing. Hech qaysi qadam tushib qolmaganini tekshiring.",
            "<b>Koʻrsatmalar, B shakli.</b> A shaklida agentga (A) berilgan qadamlarni B ga yigʻing va B.1-B.10 ni toʻldiring. B.3 dagi har manbaga ulanish yoʻlini belgilang: API, MCP, eksport fayli yoki qoʻlda qadam. Toʻldirilgan A va B ni kit3-agent papkasiga saqlang, Claude Codeʼda Kit 3 promptini yoki /kit3 ni ishga tushiring. Topilgan egasiz qadamlar va istisno holatlarni koʻrib chiqing, kerakligini B ga qoʻshing.",
            "<b>Xodimlar tekshiruvi va imzo.</b> instructions.md ni agent bilan ishlaydigan xodimlarga koʻrsating: istisno holatlarni ular biladi. Ular aytgan har istisnoni B.6 ga qoʻshing: holat, kimga, qanday. B.10 ga imzo, sana va keyingi koʻrib chiqish sanasini qoʻying.",
            "<b>Namunalar.</b> Jarayon natijasining 3 ta yaxshi va 3 ta yomon haqiqiy namunasini yigʻing: ular Kit 4 B.4 va agentning test toʻplami boʻladi.",
        ],
        "A da boʻsh katak yoʻq, bitta haqiqiy holat yuritilgan, B imzolangan va xodimlar aytgan istisnolar B.6 da turibdi.",
        [prompt_box(prompt(4, "K3P1"))],
        "Toʻldirilgan B shakli agentning system prompti boʻladi. /kit3 A va B ni tekshiradi va B dan kit3-agent/instructions.md ni yozadi.")

    p2 = page(
        fhead("A shakli: jarayon qadamlari, bugun va ertaga", K)
        + '<p class="intro">Kit 2 da tanlangan jarayonni qadamma-qadam yozing va ertaga har qadamni kim qilishini hal qiling.</p>'
        + fields(["Jarayon", "Boshlanadi", "Tugaydi", "Jarayon egasi"])
        + grid([("#", ""), ("A.1", "Qadam (bitta harakat)"), ("A.2", "Maʼlumot"), ("A.3", "Bugun: kim"),
                ("A.4", "Ertaga A / R / I"), ("A.5", "Kim tekshiradi"), ("A.6", "Kim qaror qiladi"),
                ("A.7", "Kim javobgar"), ("A.8", "Izoh: kutish, xatolar")],
               10, "9.2mm", ["6mm", "24%", "12%", "9%", "7%", "9%", "9%", "9%", None], first="n")
        + '<div class="cols">'
        + legend(["Jarayonni boshidan oxirigacha yozing, bir qatorda bitta harakat.",
                  "A.3: bu qadamni bugun kim qiladi.",
                  "A.4: ertaga kim qiladi. A agent, R robot (AIʼsiz avtomatika: formula, skript yoki oddiy bot), I inson.",
                  "A.5-A.7: kim tekshiradi, kim qaror qiladi, kim javobgar. Bitta katak boʻsh qolsa, jarayon hali tayyor emas."])
        + legend(["Oʻtgan haftadagi bitta haqiqiy holatni jadval boʻyicha boshidan oxirigacha yuritib chiqing. Hech qaysi qadam tushib qolmaganini tekshiring.",
                  "<b>Agent hech qachon oʻz qadamini oʻzi tekshirmaydi.</b>",
                  "Faylni kompaniya/kit3-agent/ papkasiga saqlang."])
        + "</div>" + fld("Yuritib chiqilgan haqiqiy holat (sana, qisqacha):"), land=True)

    p3 = page(
        fhead("B shakli: agent koʻrsatmalari", K)
        + '<p class="intro">A shaklida agentga (A) berilgan qadamlarni shu koʻrsatmaga yigʻing: agent nima qila oladi, nimani umuman qilmaydi va qachon ishni odamga oʻtkazadi. '
          'Toʻldirilgan B shakli agentning system prompti boʻladi. Claude Code uni kit3-agent/instructions.md qilib qayta yozadi.</p>'
        + fields(["Agent nomi", "Jarayon"])
        + fld("B.1 Rol: agent nima uchun kerak, bitta gapda", 1)
        + fld("B.2 Javobgar rahbar", 1)
        + fld("B.3 Foydalanishi mumkin boʻlgan manbalar (hujjatlar, narxlar, CRM, jadval)", 0,
              "Har manbaga ulanish yoʻli kerak: API, MCP, eksport fayli yoki qoʻlda qadam. Qaysi biri ekanini belgilang.")
        + grid([("", "Manba"), ("", "Nima uchun kerak"), ("", "Ulanish: API / MCP / eksport / qoʻlda")], [[""] * 3] * 3, "7mm")
        + '<div style="height:2mm"></div>'
        + fld("B.4 Oʻzi mustaqil qila oladigan harakatlar", 2)
        + fld("B.5 Hech qachon qilmaydigan ishlar", 2, "Masalan: pul oʻtkazmaydi, mijozga sizning nomingizdan yozmaydi, maʼlumot oʻchirmaydi.")
        + fld("B.6 Qachon odamga oʻtkazadi", 0, "Agent bilan ishlaydigan xodimlar aytgan har istisnoni shu jadvalga qoʻshing.")
        + grid([("", "Holat"), ("", "Kimga"), ("", "Qanday (kanal)")], [[""] * 3] * 4, "7mm", ["50%", None, None])
        + '<div style="height:2mm"></div>'
        + fld("B.7 Har harakatdan keyin nimani yozib qoʻyadi", 1)
        + fld("B.8 Ohang va til", 1)
        + fld("B.9 Sifat mezoni: yaxshi javob bu ...", 1)
        + fld("B.10 Tasdiqladi, sana, keyingi koʻrib chiqish sanasi", 1))
    return [p1, p2, p3]


# ---------------------------------------------------------------- Kit 4
def kit4():
    K = "Kit 4/5: Yangi rollar"
    p1 = instr("Kit 4/5", "Yangi rollar",
        "Har xodimning eng kuchli koʻnikmasini yangi ish taqsimotidagi mos joyga qoʻying va \"AIʼni oʻrgan\" oʻrniga aniq tekshiriladigan vazifa bering.",
        [
            "<b>Xodimlar, A shakli.</b> Kit 3 jarayonida ishi oʻzgarayotgan har xodimni A.1 ga yozing. A.2 ga eng kuchli koʻnikmasini uning oʻz ishidan haqiqiy misol bilan yozing.",
            "<b>Yangi joy.</b> A.3-A.6 ni toʻldiring: bugungi ishi, yangi roli, yangi tekshirish vazifasi, kerakli oʻqish. Mijozning chalkash gapidan asosiy ehtiyojni ajrata oladigan sotuvchi agentga toʻgʻri topshiriq bera oladi. Ehtiyotkor muharrir agent yozgan matnni tekshira oladi. Uyda xaritani boʻlim boshligʻi bilan tekshiring.",
            "<b>Oʻquv vazifasi, B shakli.</b> Har xodim uchun bitta B shaklini toʻldiring: nimani tekshiradi, qaysi mezonlar boʻyicha, qaysi namunalar ustida. B.4 ga uchinchi darsdan keyin yigʻilgan 3 ta yaxshi va 3 ta yomon haqiqiy namunani manbasi bilan yozing. Ular agentning test toʻplami ham. Kit 4 promptini ishga tushiring.",
            "<b>Muddat va oʻlchov.</b> B.5-B.7 da muddat, oʻsish oʻlchovi va natijani kim koʻrib chiqishini kelishing. Ikki haftadan keyin natijani xodim bilan koʻrib chiqing, kerak boʻlsa B.3 mezonlarini oʻzgartiring.",
            "<b>Kit 4 suhbati.</b> Pilot taʼsir qiladigan har xodim bilan 15 daqiqa gaplashing. Ayting: nima oʻzgaradi, nima oʻzgarmaydi, xodim endi nimani tekshiradi. Savol va xavotirlarini B.8 ga, nima deb kelishganingizni B.9 ga yozing. Shundan keyingina agentni cheklangan ruxsatlar bilan yoqing.",
        ],
        "har xodimga A da bitta qator va mezonlari, 2 haftalik oʻlchovi bor oʻquv vazifasi bor, suhbat oʻtgan, B.8 va B.9 toʻldirilgan.",
        ['<div class="box"><div class="bh">Tartib</div><pre>Avval Kit 4 suhbati, keyin agent yoqiladi. Hech qachon aksincha emas.</pre></div>',
         prompt_box(prompt(5, "K4P1"))],
        "/kit4 koʻnikmalar xaritasi va oʻquv vazifalarini kit4-people papkasiga yozadi. Koʻnikma va misollarni sizdan soʻraydi, oʻzi toʻqimaydi.")

    p2 = page(
        fhead("A shakli: koʻnikmalar xaritasi", K)
        + '<p class="intro">Har xodimning eng kuchli koʻnikmasini yangi ish taqsimotidagi mos joyga qoʻying va "AIʼni oʻrgan" oʻrniga aniq tekshiriladigan vazifa bering.</p>'
        + fields(["Boʻlim", "Jarayon", "Sana"])
        + grid([("#", ""), ("A.1", "Xodim"), ("A.2", "Eng kuchli koʻnikmasi (haqiqiy misol)"), ("A.3", "Bugungi ishi"),
                ("A.4", "Yangi roli"), ("A.5", "Yangi tekshirish vazifasi"), ("A.6", "Kerakli oʻqish")],
               8, "12mm", ["6mm", "13%", "25%", "15%", "14%", "17%", None], first="n")
        + legend(["Kit 3 jarayonida ishi oʻzgarayotgan har xodimni yozing.",
                  "A.2: eng kuchli koʻnikmasi, uning oʻz ishidan haqiqiy misol bilan.",
                  "A.4: bu koʻnikma ertaga qayerda ishlaydi. Mijozning chalkash gapidan asosiy ehtiyojni ajrata oladigan sotuvchi agentga toʻgʻri topshiriq bera oladi. Ehtiyotkor muharrir agent yozgan matnni tekshira oladi.",
                  "Xaritani boʻlim boshligʻi bilan tekshiring.",
                  "Faylni kompaniya papkasida kit4-people/skills-map.md nomi bilan saqlang."]),
        land=True)

    p3 = page(
        fhead("B shakli: oʻquv vazifasi", K)
        + '<p class="intro">Bitta xodim, bitta shakl. Xodim qanday natijani, qaysi mezonlar boʻyicha va qaysi namunalar ustida tekshirishini yozing.</p>'
        + fields(["Xodim", "Menejer", "Sana"])
        + fld("B.1 Nimani tekshiradi (qanday natijani)", 1)
        + fld("B.2 Nega aynan u: qaysi koʻnikma ishlatiladi", 1)
        + fld("B.3 Mezonlar: toʻgʻri natija bu ... / xato natija bu ...", 2)
        + fld("B.4 Namunalar: 3 ta yaxshi va 3 ta yomon, manbasi", 0,
              "B.4 dagi namunalar agentning test toʻplami ham. Har oʻzgarishdan keyin agent shu namunalarda qayta sinaladi.")
        + grid([("", "#"), ("", "Yaxshi yoki yomon"), ("", "Namuna (fayl yoki qisqa tavsif)"), ("", "Manba"), ("", "Nega yaxshi yoki yomon")],
               [[str(i + 1), "yaxshi" if i < 3 else "yomon", "", "", ""] for i in range(6)], "8mm",
               ["6mm", "13%", "33%", "17%", None], first="n")
        + '<div style="height:2mm"></div>'
        + fld("B.5 Muddat", 1)
        + fld("B.6 Oʻsishni qanday oʻlchaymiz", 2, "Ikki haftadan keyin natijani xodim bilan koʻrib chiqing. Kerak boʻlsa, mezonlarni oʻzgartiring.")
        + fld("B.7 Natijani kim koʻrib chiqadi", 1)
        + fld("B.8 Suhbatdan: uning savollari va xavotirlari", 2,
              "B.8 va B.9: 15 daqiqalik suhbatdan keyin. Suhbat agent yoqilishidan oldin boʻladi, hech qachon keyin emas.")
        + fld("B.9 Nima deb kelishdik", 2)
        + '<p class="small">Faylni kompaniya papkasida kit4-people/&lt;ism&gt;-training.md nomi bilan saqlang.</p>')
    return [p1, p2, p3]


# ---------------------------------------------------------------- Kit 5
def kit5():
    K = "Kit 5/5: Pilot va hisob-kitob"
    p1 = instr("Kit 5/5", "Pilot va hisob-kitob",
        "Cheklangan, muddati belgilangan 2-4 haftalik pilot oʻtkazing va faqat agentning tezligini emas, pul va vaqtda nima oʻzgarganini hisoblang.",
        [
            "<b>Baseline.</b> Ikkinchi darsdan keyin B shaklining Agentgacha ustuniga B.1-B.4 ni bir haftalik raqam qilib yozing. Tarix bor joyda oxirgi 2-4 haftani Claude Code bilan oling: Telegram chat eksporti, Excel, CRM. Tarixi yoʻq raqamni 5 ish kuni jonli yozing. Baseline boʻlmasa, demo kunida faqat taassurot qoladi.",
            "<b>Reja, A shakli.</b> Agent ishlay boshlashidan oldin A shaklini boʻlim boshligʻi bilan toʻldiring. A.2 maqsadi bitta raqam boʻlsin va baselinedan chiqsin, masalan \"kuniga 60 daqiqadan 10 daqiqaga\". A.7 toʻxtash shartini aniq yozing. A.5 ga yozing: birinchi hafta agent faqat qoralama tayyorlaydi, har natijani inson tasdiqlaydi. Avval Kit 4 suhbatlari, keyin agent yoqiladi.",
            "<b>Xatolar jurnali, B.13.</b> Agentning har xatosini shu kuni yozing: sana, nima boʻldi, kim topdi, nimani oʻzgartirdik. Har yozuvni instructions.md dagi oʻzgarishga va yangi testga aylantiring. \"Nimani oʻzgartirdik\" ustuniga aynan qaysi qoida oʻzgarganini yozing.",
            "<b>Haftalik ustun.</b> Har hafta bitta ustunni baseline bilan bir xil usulda, B.7 bilan birga toʻldiring. Raqam yetmasa, katakni boʻsh qoldiring. 1-haftadan keyin B.7 ni koʻring va mentor bilan qaror qiling: agent hali faqat qoralama tayyorlaydi yoki bitta qadamda ruxsat kengayadi. Faqat kelishilgan oʻzgarishni qoʻllang va uni A.5 ga yozing.",
            "<b>Xarajat va topilgan pul.</b> B.9 obunalar, B.10 sozlash, B.11 tekshirish soatlari × soatlik stavka, B.12 = B.9 + B.10 + B.11. Topilgan pul jadvaliga har holatni sana, dalil va summa bilan yozing. Summa nomaʼlum boʻlsa, \"summa aniqlanmagan\" deb yozing.",
            "<b>Qaror.</b> Oʻzgarish ustunini va bitta vazifa narxini hisoblang. Natijani A.6 muvaffaqiyat mezonlari va A.7 toʻxtash sharti bilan solishtiring. Bitta qarorni belgilang: davom ettirish, oʻzgartirish yoki toʻxtatish. Sababini bir gapda yozing va qarorni boʻlim boshligʻi bilan koʻrib chiqing.",
        ],
        "Kit 5 B dagi qaror belgilangan va sababi bir gapda yozilgan.",
        [prompt_box(prompt(7, "K5P1"))],
        "/kit5 baseline, /kit5 reja, /kit5 hafta 1 va /kit5 qaror pilotning har bosqichida shu ishni bajaradi.")

    p2 = page(
        fhead("A shakli: pilot rejasi", K)
        + '<p class="intro">Pilot: cheklangan, muddati belgilangan haqiqiy sinov, 2-4 hafta. Agent ishlay boshlashidan oldin A shaklini boʻlim boshligʻi bilan toʻldiring.</p>'
        + fields(["Jarayon", "Pilot egasi", "Sana"])
        + legend(["Baseline ikkinchi darsdan keyin yozilgan: Kit 5 B ning \"Agentgacha\" ustuni. Maqsad shu raqamdan kelib chiqsin.",
                  "Tartib: avval Kit 4 suhbatlari, keyin agent yoqiladi."])
        + '<div style="height:2mm"></div>'
        + fld("A.1 Jarayon va agent", 1)
        + fld("A.2 Maqsad, bitta raqamda (... dan ... gacha)", 1, "Masalan: \"kuniga 60 daqiqadan 10 daqiqaga\".")
        + fld("A.3 Sanalar: boshlanishi - tugashi (2-4 hafta)", 1)
        + fld("A.4 Qamrov: qaysi mijozlar, murojaatlar yoki buyurtmalar", 2)
        + fld("A.5 Chegaralar: agent qila oladi / qila olmaydi", 3, "Birinchi hafta agent faqat qoralama tayyorlaydi, har natijani inson tasdiqlaydi.")
        + fld("A.6 Muvaffaqiyat mezonlari", 2)
        + fld("A.7 Toʻxtash sharti: agar ... boʻlsa, darhol toʻxtatamiz", 2,
              "Aniq shart, masalan: \"boshliq hisobotida ikkita notoʻgʻri raqam chiqsa, toʻxtatamiz\".")
        + fld("A.8 Agent javoblarini kim va qanchalik tez-tez tekshiradi", 1)
        + fld("A.9 Haftalik koʻrib chiqish: kun, vaqt, kim qatnashadi", 1)
        + fld("Boʻlim boshligʻi bilan kelishildi (ism, sana)", 1)
        + '<p class="small">Faylni kompaniya papkasida kit5-pilot/plan.md nomi bilan saqlang.</p>')

    metrics = ["B.1 Bajarilgan murojaatlar", "B.2 Oʻrtacha vaqt, daqiqa", "B.3 Xato javoblar", "B.4 Takroriy murojaatlar",
               "B.5 Toʻliq hal qilingan murojaatlar", "B.6 Yopilgan bitim yoki buyurtmalar",
               "B.7 Tekshirishga ketgan xodim soati", "Topilgan pul, soʻm (Topilgan pul jadvalidan)", "B.8 Mijoz shikoyatlari"]
    p3 = page(
        fhead("B shakli: pilot raqamlari (1/3)", K)
        + '<p class="intro">Pilot faqat agentning tezligini emas, pul va vaqtda nima oʻzgarganini koʻrsatishi kerak.</p>'
        + fields(["Jarayon", "Pilot sanalari"])
        + "<h3 style='margin-top:0'>Metrikalar</h3>"
        + grid([("", "Metrika"), ("", "Agentgacha"), ("", "1-hafta"), ("", "2-hafta"), ("", "3-hafta"), ("", "4-hafta"), ("", "Oʻzgarish")],
               [[m] + [""] * 6 for m in metrics], "10mm", ["29%", None, None, None, None, None, None])
        + '<p class="small" style="margin-top:1.5mm">B.1-B.4 baseline uchun majburiy. Jarayoningizda "murojaat" oʻrniga boshqa birlik boʻlsa (hisobot, buyurtma), shuni yozing.</p>'
        + legend(["<b>Agentgacha</b> ustuni: baseline. Ikkinchi darsdan keyin boshlanadi. Tarix bor joyda (Telegram chat eksporti, Excel, CRM) oxirgi 2-4 haftani Claude Code bilan oling. Tarixi yoʻq raqamni 5 ish kuni jonli yozing. Haftalik ustunlar bilan solishtirish uchun bir haftalik raqam yozing.",
                  "Baseline boʻlmasa, demo kunida faqat taassurot qoladi. Har hafta bitta ustunni baseline bilan bir xil usulda toʻldiring.",
                  "<b>Oʻzgarish</b>: oxirgi toʻldirilgan hafta va Agentgacha ustuni orasidagi farq.",
                  "Raqam yetmasa, katakni boʻsh qoldiring. Toʻqimang. Bu jadval kompaniya papkasida kit5-pilot/results.md boʻladi."]),
        land=True)

    p4 = page(
        fhead("B shakli: pilot raqamlari (2/3)", K)
        + "<h3 style='margin-top:0'>Xarajatlar</h3>"
        + grid([("", "#"), ("", "Xarajat"), ("", "Summa, soʻm"), ("", "Qanday hisoblandi")],
               [["B.9", "Obuna (Claude, OpenRouter, VPS, domen va boshqalar, oylik)", "", ""],
                ["B.10", "Integratsiya va sozlash", "", ""],
                ["B.11", "Tekshirish soati × soatlik stavka (B.7 × stavka)", "", ""],
                ["B.12", "Jami = B.9 + B.10 + B.11", "", ""]], "9mm", ["9mm", "42%", "17%", None], first="n")
        + '<div class="cols" style="margin-top:2mm">'
        + fld("Bitta vazifa narxi, agent: B.12 ÷ pilot davomidagi B.5 jami =", 1)
        + fld("Bitta vazifa narxi, inson: Agentgacha B.2 / 60 × soatlik stavka =", 1) + "</div>"
        + "<h3>Topilgan pul</h3>"
        + '<p class="small">Pilot olib kelgan yoki saqlab qolgan pul: zarar qilishidan oldin ushlangan xatolar, endi yoʻqolmayotgan murojaatlar, tezroq yigʻilgan pul. Summa nomaʼlum boʻlsa, "summa aniqlanmagan" deb yozing.</p>'
        + grid([("", "Sana"), ("", "Holat"), ("", "Dalil"), ("", "Summa, soʻm")], [[""] * 4] * 8, "9mm",
               ["12%", "38%", "32%", None])
        + '<p class="small" style="margin-top:1mm">Jami summani Metrikalar jadvalidagi "Topilgan pul" qatoriga yozing.</p>',
        land=True)

    p5 = page(
        fhead("B shakli: pilot raqamlari (3/3)", K)
        + "<h3 style='margin-top:0'>B.13 Xatolar jurnali</h3>"
        + '<p class="small">Agentning har xatosini shu kuni yozing. Kompaniya papkasida bu kit5-pilot/errors.md.</p>'
        + grid([("", "Sana"), ("", "Nima boʻldi"), ("", "Kim topdi"), ("", "Nimani oʻzgartirdik")], [[""] * 4] * 10, "9.5mm",
               ["12%", "38%", "15%", None])
        + "<h3>Qaror</h3>"
        + '<p class="small">Natijani Kit 5 A dagi A.6 muvaffaqiyat mezonlari va A.7 toʻxtash sharti bilan solishtiring.</p>'
        + '<div class="check"><span>Davom ettirish</span><span>Oʻzgartirish</span><span>Toʻxtatish</span></div>'
        + fld("Sababi (bir gap):", 1),
        land=True)
    return [p1, p2, p3, p4, p5]


# ---------------------------------------------------------------- Sotuvchi cheklisti
def vendor():
    p1 = page(
        '<div class="kicker">Praktikum 3.0</div><h1>Sotuvchi cheklisti</h1>'
        '<p class="lead">Kimdir sizga "AI agent qurib beraman" yoki "shaxsiy Jarvis" taklif qilganda ishlating. Oʻzbekistondagi bozor narxi: 2 000-5 000 dollar.</p>'
        '<ol class="steps">'
        '<li>Sakkizta savolni sotuvchiga yozma bering va javobni yozma oling.</li>'
        '<li>Har javobni "Yaxshi javob" va "Xavfli belgi" ustunlari bilan solishtiring.</li>'
        '<li>Maʼlumot qaysi mamlakatda saqlanishini yozma oling.</li>'
        '<li>Taklif matnini cheklist bilan birga pastdagi prompt orqali tekshiring.</li>'
        '<li>Qaror va sababini cheklist oxiriga yozing.</li></ol>'
        '<p class="done"><b>Tayyor, agar:</b> sakkizta savolning har biriga yozma javob bor.</p>'
        + prompt_box(prompt(7, "K7P1")))
    rows = [
        ("Qaysi jarayon va uning baseline raqamlari qanday?", "Aniq jarayon, raqamlari bilan", "\"Butun kompaniya uchun AI\""),
        ("Muvaffaqiyatni qanday oʻlchaymiz va qachon toʻxtatamiz?", "Kit 5 dagidek maqsad va toʻxtash sharti", "Raqam yoʻq, faqat demo"),
        ("Qaysi modellar ishlatiladi, ularni almashtirsa boʻladimi?", "Modellar nomi aytilgan, almashtirsa boʻladi, oddiy qadamlar uchun open-weight model ham koʻrib chiqilgan", "Bitta qulflangan model"),
        ("Tizimlarimizga API yoki MCP orqali ulanadimi?", "Ha, tizimlar nomi bilan", "Faqat nusxa koʻchirish yoki skrinshot"),
        ("Maʼlumotimiz qayerda saqlanadi, uni kim koʻradi?", "Aniq javob, yozma, mamlakati bilan", "Noaniq javob"),
        ("Agent ishini kim va qanday tekshiradi?", "Inson tekshiruvi va loglar", "\"U xato qilmaydi\""),
        ("Ochiq kodli variant bormi?", "Koʻrib chiqilgan va solishtirilgan", "Bu haqda eshitmagan"),
        ("Ishga tushgandan keyin oyiga qancha turadi?", "Obuna, xizmat koʻrsatish va tekshirish vaqti", "Faqat oʻrnatish narxi"),
    ]
    p2 = page(
        fhead("Sotuvchi cheklisti", "Praktikum 3.0")
        + '<p class="intro">Savollarni sotuvchiga yozma bering va javobni yozma oling. Har javobni "Yaxshi javob" va "Xavfli belgi" ustunlari bilan solishtiring.</p>'
        + fields(["Sotuvchi", "Taklif", "Narx", "Sana"])
        + grid([("", "#"), ("", "Savol"), ("", "Yaxshi javob"), ("", "Xavfli belgi"), ("", "Sotuvchi javobi")],
               [[str(i + 1), *r, ""] for i, r in enumerate(rows)], "14.5mm", ["6mm", "21%", "21%", "15%", None], first="n")
        + '<div style="height:2mm"></div>' + fld("Qaror va sababi:", 2),
        land=True)
    return [p1, p2]


DOCS = [
    ("Kit1_Ish_qayerga_ketadi", "Kit 1/5: Ish qayerga ketadi", kit1),
    ("Kit2_Qaysi_jarayondan_boshlaymiz", "Kit 2/5: Qaysi jarayondan boshlaymiz", kit2),
    ("Kit3_Ishni_qayta_taqsimlash", "Kit 3/5: Ishni qayta taqsimlash", kit3),
    ("Kit4_Yangi_rollar", "Kit 4/5: Yangi rollar", kit4),
    ("Kit5_Pilot_va_hisob-kitob", "Kit 5/5: Pilot va hisob-kitob", kit5),
    ("Sotuvchi_cheklisti", "Sotuvchi cheklisti", vendor),
]

# Writing-rule check: wrong apostrophes, em/en dashes, middle dots.
BAD = re.compile(r"[oOgG]['‘’`]|[A-Za-z]['’][a-z]|[—–·]")


def main():
    failed = False
    for name, title, fn in DOCS:
        state["page"] = 0
        pages = fn()
        html = (f'<!doctype html><html lang="uz-Latn"><head><meta charset="utf-8"><title>{escape(title)}</title>'
                f"<style>{CSS}</style></head><body>{''.join(pages)}</body></html>")
        text = re.sub(r"<style>.*?</style>|<[^>]+>", " ", html, flags=re.S)
        for m in BAD.finditer(text):
            print(f"{name}: bad char near {text[max(0, m.start() - 20):m.end() + 20]!r}")
            failed = True
        src = HERE / f"{name}.html"
        out = HERE / f"{name}.pdf"
        src.write_text(html, encoding="utf-8")
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                        f"--print-to-pdf={out}", src.as_uri()], check=True, capture_output=True)
        try:
            import pymupdf
            doc = pymupdf.open(out)
            n = doc.page_count
            # Chrome silently shrinks the whole document if anything is too big; the 8pt footer catches that.
            sizes = {round(s["size"], 1) for pg in doc for b in pg.get_text("dict")["blocks"]
                     for l in b.get("lines", []) for s in l["spans"] if s["text"].startswith("Tuzuvchi")}
        except ImportError:
            n, sizes = None, {8.0}
        ok = (n is None or n == len(pages)) and sizes == {8.0}
        if sizes != {8.0}:
            print(f"{name}: footer sizes {sizes}, page content was scaled")
        failed |= not ok
        print(f"{out.name}: {n} pages (expected {len(pages)}), {out.stat().st_size // 1024} KB{'' if ok else '  OVERFLOW'}")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
