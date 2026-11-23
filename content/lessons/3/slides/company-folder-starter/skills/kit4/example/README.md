# /kit4 namunasi: qanday takrorlash

> **Diqqat:** bu /kit4 ning oldingi ishga tushirishi: unda asosiy xodimlar Malika Rashidova va Zarina Abdullayeva.
> Kursning yakuniy Baraka hikoyasida asosiy xodim Madina Sattorova; yakuniy fayllar [`kits/namunalar/baraka-office/kit4-people/`](../../../namunalar/baraka-office/kit4-people/) papkasida.
> Bu namunadan buyruq qanday ishlashini ko‘rish uchun foydalaning, Baraka faktlarini esa yakuniy fayllardan oling.

Bu papka /kit4 ni «Baraka Office» kompaniya papkasida haqiqiy ishga tushirish natijasi.

1. `input/` ichidagi fayllarni kompaniya papkangizga xuddi shu yo‘llar bilan nusxalang (yoki o‘z fayllaringizni qo‘ying).
2. Claude Code’ni kompaniya papkasida oching.
3. `suhbat.md` dagi xabarlarni ketma-ket yozing: birinchisi buyruq, keyingilari Claude savollariga javob.
4. Natija `output/` dagi fayllarga o‘xshash bo‘lishi kerak; so‘zlar boshqacha bo‘lishi mumkin, tuzilma va hisoblar bir xil bo‘ladi.

## Fayllar

- `suhbat.md`: siz yozadigan xabarlar va Claude javoblari, to‘liq.
- `input/`: skill o‘qigan fayllar.
  - `input/CLAUDE.md`
  - `input/kit3-agent/form-a-steps.md`
  - `input/kit3-agent/form-b-agent.md`
  - `input/kit3-agent/instructions.md`
  - `input/kit1-interviews/malika-form-b.md`
  - `input/kit1-interviews/zarina-form-b.md`
- `output/`: skill yozgan yoki o‘zgartirgan fayllar.
  - `output/kit4-people/form-a-skills-map.md`
  - `output/kit4-people/malika-form-b.md`
  - `output/kit4-people/zarina-form-b.md`
  - `output/kit4-people/test-set.md`

Sinov to‘plami misollari kurs pilot shablonidagi test to‘plamiga mos (`pilot-template/evals/test-set.toml`).
Skill ikki real muammoni topdi: 1C fayli 42 kun eski, faylda tannarx ustuni bor; ikkalasi /kit3 istisno bilan yo‘riqnomaga qo‘shildi. input/CLAUDE.md dagi soatbay haq qatori kurs kanoniga moslangan (35 700 so‘m); /kit4 bu raqamni ishlatmaydi, natijaga ta’sir qilmaydi.
