---
name: kit3
description: "Kit 3: jarayon qadamlari (A) va agent koʻrsatmalari (B) ni tekshiradi, B dan agentning system promptini kit3-agent/instructions.md qilib yozadi. Agent koʻrsatmalarini tuzishda yoki foydalanuvchi /kit3 deb yozganda ishlating."
---

# /kit3: qadamlar va koʻrsatmalardan system promptgacha

Siz kompaniya papkasida (`kompaniya/`) ishlaysiz. Vazifa: Kit 3 A va B ni tekshirish va B ni agent uchun system prompt qilib qayta yozish.

## Nimani oʻqish

1. `CLAUDE.md`: pilot jarayon.
2. `kit2-scoring/scoring.md`: B.1-B.3, tanlangan jarayon.
3. `kit3-agent/kit3-a-qadamlar.md`: A shakli.
4. `kit3-agent/kit3-b-korsatmalar.md`: B shakli.

Fayl topilmasa, foydalanuvchidan yoʻlini soʻrang.

## Tekshiruv

Har topilmani A dagi qadam raqami yoki B dagi band raqami bilan yozing.

1. A dagi boʻsh kataklar.
2. Egasiz qadamlar: A.7 boʻsh.
3. Agent oʻzini oʻzi tekshiradigan qadamlar: A.4 = A va A.5 da ham agent yoki boʻsh. Agent hech qachon oʻz qadamini oʻzi tekshirmaydi.
4. B.3 dagi har manba uchun ulanish yoʻli belgilanganmi: API, MCP, eksport yoki qoʻlda. Belgilanmaganini [?] bilan koʻrsating.
5. Xavfli ruxsatlar: B.4 da pul oʻtkazish, mijozga yozish yoki maʼlumot oʻchirish boʻlsa. B.5 da ular yoʻq boʻlsa, shuni ham yozing.
6. A dan chiqadigan, lekin B.6 da yoʻq istisno holatlar: kutish, xato, maʼlumot yoʻq, odam qarori kerak boʻlgan joylar (A.6, A.8).
7. B.10 boʻsh boʻlsa: "B imzolanmagan".

Tekshiruv natijasini foydalanuvchiga koʻrsating. Keyingi qadamga oʻtishdan oldin u tuzatishlarni aytsin.

## System prompt

`kit3-agent/instructions.md` ni yozing. Boʻlimlar:

1. Rol (B.1) va javobgar rahbar (B.2).
2. Manbalar (B.3): manba, nima uchun, ulanish yoʻli.
3. Qila oladi (B.4).
4. Hech qachon qilmaydi (B.5).
5. Odamga oʻtkazish (B.6): holat, kimga, qaysi kanal orqali. Shart aniq boʻlsin: agent qaysi belgidan holatni taniydi.
6. Har harakatdan keyin nimani yozib boradi (B.7).
7. Ohang va til (B.8).
8. Sifat mezoni (B.9).
9. Versiya: B.10 dagi tasdiq va sanalar.

Faqat B dagi qoidalarni yozing. Tekshiruvda topilgan va sizning takliflaringiz alohida "Takliflar" roʻyxatida tursin, foydalanuvchi tasdiqlagandan keyingina koʻrsatmaga qoʻshiladi.

`instructions.md` bor boʻlsa, yangisini yozishdan oldin nima oʻzgarishini koʻrsating.

## Keyin

Foydalanuvchi xodimlar aytgan istisnolarni bersa, har birini B.6 ga va `instructions.md` ga qoʻshing: holat, kimga, qanday. Nima oʻzgarganini roʻyxat qiling.

## Hech qachon

- B da yoʻq qoida, manba yoki ruxsat qoʻshmang.
- Kalit, token yoki parolni `instructions.md` ga yozmang. Ular faqat `.env` da.
- A va B shakllarini foydalanuvchi soʻramaguncha oʻzgartirmang.
