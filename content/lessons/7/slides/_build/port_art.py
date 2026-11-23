"""One-off port helper (2026-11-20): drops the old `flow` backgrounds and attaches clay objects to the day 6 slides.
Design fields only; every replacement must match exactly once. Kept for the record; re-running on ported data fails by design.
Run: python3 day-6/_build/port_art.py
"""
import re
from pathlib import Path

P = Path(__file__).resolve().parent.parent / "deck" / "assets" / "slides_data.js"
s = P.read_text(encoding="utf-8")
s, n = re.subn(r"\n  flow: \{[^}]*\},", "", s)
assert n == 7, n

R = [
 # 3 cards
 ("body: ['Bitta A4: oldin va keyin', 'Soat, so‘m, xato ulushi', 'Mentor imzosi bilan'] }", "body: ['Bitta A4: oldin va keyin', 'Soat, so‘m, xato ulushi', 'Mentor imzosi bilan'], art: 'clipboard' }"),
 ("body: ['Davom etish, o‘zgartirish yoki to‘xtatish', 'Sababi bitta gapda'] }", "body: ['Davom etish, o‘zgartirish yoki to‘xtatish', 'Sababi bitta gapda'], art: 'scale' }"),
 ("body: ['Matritsangizdan 2-jarayon', 'Kim bilan suhbat qilasiz'] }", "body: ['Matritsangizdan 2-jarayon', 'Kim bilan suhbat qilasiz'], art: 'map' }"),
 # 5 catch3
 ("v: '2 barobar',", "art: 'bars', v: '2 barobar',"),
 ("v: 'B.7 bo‘sh',", "art: 'magnifier', v: 'B.7 bo‘sh',"),
 ("v: '10 mln',", "art: 'd6-coins', v: '10 mln',"),
 # 6 chain
 ("{ k: 'Agentgacha', t: '6 daqiqa',", "{ art: 'd6-clock', k: 'Agentgacha', t: '6 daqiqa',"),
 ("{ k: '2-hafta', t: '2,0 daqiqa',", "{ art: 'bolt', k: '2-hafta', t: '2,0 daqiqa',"),
 ("{ k: '× 138 savol ÷ 60',", "{ art: 'calculator', k: '× 138 savol ÷ 60',"),
 ("{ k: '− tekshirish (B.7)',", "{ art: 'magnifier', k: '− tekshirish (B.7)',"),
 ("{ k: 'B.15', t:", "{ art: 'check', k: 'B.15', t:"),
 # 11 catch3: the third box loses tone 'warn' (the engine strikes a warn value through; a stop decision is not an error)
 ("{ k: 'Davom etish', tone: 'ok',", "{ art: 'check', k: 'Davom etish', tone: 'ok',"),
 ("{ k: 'O‘zgartirish', v:", "{ art: 'wrench', k: 'O‘zgartirish', v:"),
 ("{ k: 'To‘xtatish', tone: 'warn', v:", "{ art: 'warning', k: 'To‘xtatish', v:"),
 # 16 vs
 ("{ k: 'Boshqa respondentlar', n:", "{ art: 'wrench', k: 'Boshqa respondentlar', n:"),
 ("{ k: 'Yuqori natijalilar', tone: 'ok', n:", "{ art: 'loop', k: 'Yuqori natijalilar', tone: 'ok', n:"),
 # 17 flow
 ("{ k: 'Odam', t: 'Savolni aniqlashtirish',", "{ art: 'chat', k: 'Odam', t: 'Savolni aniqlashtirish',"),
 ("{ k: 'Agent: 6 qadam',", "{ art: 'model', k: 'Agent: 6 qadam',"),
 ("{ k: 'Odam', t: '5% dan katta chegirma',", "{ art: 'scale', k: 'Odam', t: '5% dan katta chegirma',"),
 ("{ k: 'Odam', t: 'Mijozga aytish',", "{ art: 'megaphone', k: 'Odam', t: 'Mijozga aytish',"),
 # 23 steps side
 ("body: ['4-mashq: 30 kunlik reja', 'Mentor oyi davomida yordam beradi'] }", "body: ['4-mashq: 30 kunlik reja', 'Mentor oyi davomida yordam beradi'], art: 'calendar' }"),
 # 25 cards
 ("'Oylik: server, model, obuna'] }", "'Oylik: server, model, obuna'], art: 'wrench' }"),
 ("'Oylik narxi va chiqish yo‘li aniq'] }", "'Oylik narxi va chiqish yo‘li aniq'], art: 'd6-tag' }"),
 ("'Claude Code bilan moslaysiz'] }", "'Claude Code bilan moslaysiz'], art: 'openbox' }"),
 # 26 statement
 ("  source: 'McKinsey, The state of AI in 2026, 8-bet',", "  art: 'terminal',\n  source: 'McKinsey, The state of AI in 2026, 8-bet',"),
 # 27 cards
 ("'Ma’lumot qaysi davlatga borishini tekshiring'] }", "'Ma’lumot qaysi davlatga borishini tekshiring'], art: 'vault' }"),
 ("'O‘z serveringizda ishlashi mumkin'] }", "'O‘z serveringizda ishlashi mumkin'], art: 'server' }"),
 # 32 cards
 ("'Claude: 20 $ + 12% QQS'] }", "'Claude: 20 $ + 12% QQS'], art: 'server' }"),
 ("body: ['Oylik narx', '12 oylik jami', 'Kod va ma’lumot kimniki'] }", "body: ['Oylik narx', '12 oylik jami', 'Kod va ma’lumot kimniki'], art: 'calculator' }"),
 # 36 cards
 ("'1 ta savol, 1 daqiqa'] }", "'1 ta savol, 1 daqiqa'], art: 'd6-clock' }"),
 ("body: ['Xodim ismi', 'Transkript', 'Mijoz ma’lumoti'] }", "body: ['Xodim ismi', 'Transkript', 'Mijoz ma’lumoti'], art: 'lockfolder' }"),
 ("'Soat va xatolar soni kifoya'] }", "'Soat va xatolar soni kifoya'], art: 'd6-coins' }"),
 # 42 cards
 ("'«Ertaga o‘zimda takrorlardim»'] }", "'«Ertaga o‘zimda takrorlardim»'], art: 'd6-trophy' }"),
 ("'{{bitta gapda sababi}}'] }", "'{{bitta gapda sababi}}'], art: 'scale' }"),
 # 44 steps side
 ("'Bajarilganda bitiruv sertifikati'] }", "'Bajarilganda bitiruv sertifikati'], art: 'd6-gradcap' }"),
 # 45 cards
 ("'31-dekabr - 3-yanvar dam olish'] }", "'31-dekabr - 3-yanvar dam olish'], art: 'figures' }"),
 ("'P57.UZ, umrbod'] }", "'P57.UZ, umrbod'], art: 'book' }"),
 ("'Yopiq guruh, so‘rov bilan kirish'] }", "'Yopiq guruh, so‘rov bilan kirish'], art: 'table' }"),
 # 46, 48, 49 statements
 ("  sub: 'Mentoringiz har biringizga topshiradi. Keyin stol bilan bitta surat.',", "  sub: 'Mentoringiz har biringizga topshiradi. Keyin stol bilan bitta surat.',\n  art: 'certificate',"),
 ("  sub: '4-5 haftalik raqam bilan. Hamkoringizni va sinovda ishlagan xodimingizni olib keling.',", "  sub: '4-5 haftalik raqam bilan. Hamkoringizni va sinovda ishlagan xodimingizni olib keling.',\n  art: 'calendar',"),
 ("  big: 'Bugun 21:00 gacha mentoringiz [[sizga shaxsan]] yozadi.',", "  art: 'chat',\n  big: 'Bugun 21:00 gacha mentoringiz [[sizga shaxsan]] yozadi.',"),
 # 47 steps side
 ("'Ular sizning biznesingiz uchun'] }", "'Ular sizning biznesingiz uchun'], art: 'stairs' }"),
]
for a, b in R:
    assert s.count(a) == 1, (a, s.count(a))
    s = s.replace(a, b)
s = s.replace("/* Praktikum 3.0, lesson 6 deck content.", "/* Praktikum 3.0, lesson 6 deck content. Runs on the shared engine (../../../deck-engine/README.md lists layouts and fields).", 1)
P.write_text(s, encoding="utf-8")
print("ok", len(R), "replacements")
