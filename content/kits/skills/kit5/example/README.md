# /kit5 namunasi: qanday takrorlash

> **Diqqat:** bu /kit5 ning oldingi ishga tushirishi: undagi raqamlar (masalan, 1-hafta B.1 115 savol, B.14 1 500 000 so‘m, soatbay haq 22 600 so‘m) kursning yakuniy raqamlariga mos emas.
> Yakuniy raqamlar [`kits/namunalar/baraka-office/kit5-pilot/numbers.md`](../../../namunalar/baraka-office/kit5-pilot/numbers.md) faylida (soatbay haq 35 700 so‘m).
> Bu namunadan buyruq qanday ishlashini ko‘rish uchun foydalaning, raqamlarni esa yakuniy fayldan oling.

Bu papka /kit5 ni «Baraka Office» kompaniya papkasida haqiqiy ishga tushirish natijasi.

1. `input/` ichidagi fayllarni kompaniya papkangizga xuddi shu yo‘llar bilan nusxalang (yoki o‘z fayllaringizni qo‘ying).
2. Claude Code’ni kompaniya papkasida oching.
3. `suhbat.md` dagi xabarlarni ketma-ket yozing: birinchisi buyruq, keyingilari Claude savollariga javob.
4. Natija `output/` dagi fayllarga o‘xshash bo‘lishi kerak; so‘zlar boshqacha bo‘lishi mumkin, tuzilma va hisoblar bir xil bo‘ladi.

## Fayllar

- `suhbat.md`: siz yozadigan xabarlar va Claude javoblari, to‘liq.
- `input/`: skill o‘qigan fayllar.
  - `input/CLAUDE.md`
  - `input/kit2-scoring/form-b-matrix.md`
  - `input/kit3-agent/instructions.md`
  - `input/kit3-agent/form-b-agent.md`
  - `input/kit4-people/test-set.md`
- `output/`: skill yozgan yoki o‘zgartirgan fayllar.
  - `output/kit5-pilot/baseline.md`
  - `output/kit5-pilot/briefing.md`
  - `output/kit5-pilot/plan.md`
  - `output/kit5-pilot/numbers.md`
  - `output/kit5-pilot/announcement.md`
  - `output/kit3-agent/instructions.md`
  - `output/kit4-people/test-set.md`

Raqamlar kurs pilot shabloniga mos: «Agentgacha» `pilot-template/kit5-baseline.toml`, 1-2-hafta bot jurnali `pilot-template/samples/kit5-2-hafta.md`; bot o‘lchay olmaydigan B.2, B.4, B.7, B.8 va pul qatorlarini egasi o‘zi bergan.
1-hafta sessiyasi xatolar jurnali va yo‘riqnomani tuzatish (xato rejimi) bilan birga o‘tgan.
Yakuniy qaror: o‘zgartirish.
