#!/usr/bin/env python3
"""Invented Telegram Desktop export (JSON) for the Oydin Kitob test company: 3 weeks of the payments group.
Writes oydin-kitob/data/tolovlar-guruhi.json next to this script. Deterministic (fixed seed)."""
import datetime as dt
import json
import pathlib
import random

HERE = pathlib.Path(__file__).resolve().parent
random.seed(7)
msgs, mid, order = [], 1, 1000
day = dt.date(2026, 10, 12)  # Monday
while day <= dt.date(2026, 11, 1):
    if day.weekday() != 6:  # Sunday off, 6-day week
        n = random.randint(40, 50) + (6 if day.weekday() == 5 else 0)
        t = dt.datetime.combine(day, dt.time(10, 0))
        for _ in range(n):
            order += 1
            t += dt.timedelta(minutes=random.randint(4, 14))
            amount = random.choice([65, 85, 95, 120, 145, 185, 210, 260]) * 1000
            way = random.choice(["Click", "Payme"])
            r = random.random()
            if r < 0.05:
                text = f"#{order} {way} {amount:,} - to‘lov topilmadi, mijozdan chek so‘raldi".replace(",", " ")
            elif r < 0.07:
                text = f"#{order} {way} {amount:,} - summa mos emas, qayta tekshiraman".replace(",", " ")
            else:
                text = f"#{order} {way} {amount:,} tasdiqlandi".replace(",", " ")
            msgs.append({"id": mid, "type": "message", "date": t.isoformat(), "from": "Malika", "text": text}); mid += 1
            if r < 0.07 and random.random() < 0.5:
                t2 = t + dt.timedelta(minutes=random.randint(20, 90))
                msgs.append({"id": mid, "type": "message", "date": t2.isoformat(), "from": "Malika",
                             "text": f"#{order} qayta: chek keldi, tasdiqlandi"}); mid += 1
        if random.random() < 0.3:
            msgs.append({"id": mid, "type": "message", "date": dt.datetime.combine(day, dt.time(19, 30)).isoformat(),
                         "from": "Sardor", "text": "Mijoz shikoyat qildi: pul o‘tkazgan, buyurtma kelmagan. Tekshiring."}); mid += 1
    day += dt.timedelta(days=1)
msgs.sort(key=lambda m: m["date"])
out = {"name": "Oydin Kitob - to‘lovlar", "type": "private_group", "id": 4242, "messages": msgs}
(HERE / "oydin-kitob" / "data" / "tolovlar-guruhi.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
print(len(msgs), "messages")
