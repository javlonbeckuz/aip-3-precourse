---
name: kit2
description: To‘plam 2, «Qaysi jarayondan boshlaymiz?». kit1-interviews/ dagi B shakllaridan 8 tagacha jarayon ajratadi, ularni 6 ta mezon bo‘yicha sababi bilan baholaydi, Qiymat va Osonlikni hisobi bilan chiqaradi, matritsani HTML sahifa qilib chizadi va egasi bilan birinchi sinov jarayonini tanlaydi. Natija kit2-scoring/ papkasida. Egasi jarayon tanlash, baholash, matritsa yoki To‘plam 2 haqida so‘rasa ishlating.
argument-hint: "[bo‘sh yoki «qayta»]"
allowed-tools: Read Write Edit Glob Grep
---

# /kit2: Qaysi jarayondan boshlaymiz? (To‘plam 2)

Siz biznes egasiga birinchi AI sinovi (pilot) uchun bitta jarayonni tanlashda yordam beryapsiz.
Ish egasining kompaniya papkasida bo‘ladi: joriy papka (unda CLAUDE.md bor).
Argument: `$ARGUMENTS`.

## Doimiy qoidalar

- Egasi bilan o‘zbek tilida, «siz» bilan, qisqa gaplar bilan gaplashing.
- Yozishdan oldin so‘rang: bir xabarda ko‘pi bilan 3 ta savol.
- Matnda **To‘xtang** turgan joyda xabarni tugating va egasining javobini kuting: javobsiz keyingi qadamga o‘tmang va fayl yozmang.
  Egasi «hammasini o‘zing qil» desagina savollarsiz davom eting va buni xulosada ayting.
- Har bir ball uchun bitta qisqa sabab yozing va u qaysi fayl, qaysi qatordan kelganini ko‘rsating («Hisobni ko‘rsat» odati).
  Masalan: `A.2 = 5: kuniga 40-50 buyurtma (malika-form-b.md, 1-qator)`.
- Qiymat va Osonlikni qo‘shiluvchilari bilan yozing: `A.8 = 4 + 5 + 4 = 13`.
  Har bir yig‘indini ikki marta tekshiring.
- Raqam yoki fakt to‘qimang.
  B shakllarida `[?]` bilan qolgan raqamga tayangan ball ham `[?]` bo‘ladi.
- Faqat `kit2-scoring/` papkasiga yozing; mavjud faylning ustidan yozishdan oldin so‘rang.
- Oraliqlarni va bo‘sh kataklarni oddiy chiziqcha (-) bilan yozing: `2-3`, `4-8`, `-`; uzun tire ishlatmang.

## Fayllar

- O‘qiladi: `CLAUDE.md`, `kit1-interviews/*-form-b.md` (nomi `ism-` bilan boshlanadigan bo‘sh andozalarni o‘tkazib yuboring).
- Andozalar: `${CLAUDE_SKILL_DIR}/templates/form-a-scoring.md`, `${CLAUDE_SKILL_DIR}/templates/form-b-matrix.md`, `${CLAUDE_SKILL_DIR}/matrix-template.html`.
- Yoziladi: `kit2-scoring/form-a-scoring.md` (A shakli), `kit2-scoring/form-b-matrix.md` (B shakli), `kit2-scoring/matrix.html` (chizilgan matritsa).

## 0-qadam: To‘plam 1 ni tekshiring

1. `kit1-interviews/` dagi to‘ldirilgan B shakllarini o‘qing.
   Bittasi ham bo‘lmasa, to‘xtang va ayting: avval `/kit1` bilan kamida 2 ta xodimning B shaklini tuzing.
2. Qolgan `[?]` larni va «Xodim ko‘rib chiqdi» maydoni bo‘sh fayllarni sanang.
   Bo‘lsa, egasiga bitta gap bilan ayting: bu raqamlar hali taxmin, baholar ham taxminiy bo‘ladi.
   Egasi davom eting desa, davom eting.

## 1-qadam: jarayonlarni ajrating

1. Jarayon - boshlanishi va natijasi bor vazifalar zanjiri: «mijoz murojaatidan sinov darsiga yozilguncha».
   Bitta vazifa emas, bir nechta xodimning bir-biriga ulangan vazifalari bo‘lishi mumkin.
2. B shakllaridan 8 tagacha jarayon tuzing.
   Har biri uchun: nomi (boshlanishi - natijasi), ichiga kirgan vazifalar (fayl va qator raqami bilan), haftalik soat = shu vazifalar B.4 yig‘indisi, hisobi bilan.
3. Ro‘yxatni egasiga ko‘rsating va so‘rang: «Qo‘shadigan, olib tashlaydigan yoki birlashtiradigan jarayon bormi?»
   **To‘xtang:** xabarni shu savollar bilan tugating va egasining javobini kuting.

## 2-qadam: baholang

Shkala A shakli andozasida.
A.2 va A.3 raqamga bog‘liq, shuning uchun oraliq ballar uchun shu chegaralardan foydalaning:

| Ball | A.2 Takrorlanishi | A.3 Ketadigan vaqt (haftasiga, barcha xodimlar) |
|---|---|---|
| 1 | oyiga bir marta | bir necha daqiqa |
| 2 | haftasiga bir marta | 1 soatgacha |
| 3 | haftasiga bir necha marta | 1 soatdan ko‘p, 4 soatgacha (4 shu yerga kiradi) |
| 4 | kuniga bir marta | 4 soatdan ko‘p, 10 soatgacha |
| 5 | kuniga bir necha marta | 10 soatdan ko‘p |

Raqam `[?]` bo‘lib, oraliq ikki ballga tushsa, kichik ballni oling va buni sababida yozing.

A.4-A.7 mulohaza talab qiladi: B.7 (Q yoki F), B.5 (ma’lumot qayerdan), B.8 (xatoning narxi) va B.6 (natija mijozga ketadimi) ustunlaridan foydalaning va sababini yozing.

1. Har bir jarayon uchun A.2-A.7 ni sababi bilan qo‘ying.
2. A.8 Qiymat = A.2 + A.3 + A.7 va A.9 Osonlik = A.4 + A.5 + A.6 ni hisobi bilan yozing.
   Har biri 3 dan 15 gacha bo‘lishi kerak; bo‘lmasa, xato bor.
3. Jadvalni egasiga ko‘rsating va so‘rang: «Qaysi balga rozi emassiz?»
   **To‘xtang:** xabarni shu savollar bilan tugating va egasining javobini kuting.
   Egasi o‘zgartirgan balni sababi bilan yozing va yig‘indini qayta hisoblang.
4. Eslatib qo‘ying: baholarni bo‘lim boshlig‘i bilan ham ko‘rib chiqish kerak (uyga vazifa), chunki egasi odatda ma’lumotlar qanchalik tartibsiz ekanini bilmaydi.

## 3-qadam: A shaklini yozing

`kit2-scoring/form-a-scoring.md` ni andoza bo‘yicha yozing:

1. Sarlavha: Bo‘lim, Baholadi (egasi; bo‘lim boshlig‘i ko‘rgach, uning ismi ham), Sana.
2. Jadvalda A.1-A.9; A.8 va A.9 kataklarida hisob ham bo‘lsin: `13 (4+5+4)`.
3. Jadval ostida `## Sabablar` bo‘limi: har bir jarayon uchun A.2-A.7 sabablari va manbasi.
4. `## Jarayonlar tarkibi` bo‘limi: har bir jarayonga qaysi vazifalar kirgani va haftalik soat hisobi.

## 4-qadam: matritsani chizing

1. `kit2-scoring/form-b-matrix.md` ni andoza bo‘yicha yozing: «Matritsadagi nuqtalar» jadvali (#, jarayon, Qiymat, Osonlik, matritsadagi joyi).
   Joyi: Qiymat va Osonlik ikkalasi 9 dan katta bo‘lsa «Birinchi sinov»; faqat Qiymat 9 dan katta bo‘lsa «Foydali, puxta reja kerak»; faqat Osonlik 9 dan katta bo‘lsa «Oson, lekin foydasi kichik»; ikkalasi 9 dan kichik bo‘lsa «Hozircha tegmang»; biri 9 ga teng bo‘lsa «Chegarada».
2. `matrix-template.html` ni o‘qing va `kit2-scoring/matrix.html` sifatida saqlang.
   Faqat `<script id="data">` ichidagi JSON ni almashtiring: kompaniya, bo‘lim, sana, jarayonlar (`n`, `name`, `value` = A.8, `ease` = A.9).
   Boshqa hech narsani o‘zgartirmang: sahifa internetsiz ishlaydi.
3. Egasiga sahifani brauzerda ochishni taklif qiling (macOS: `open kit2-scoring/matrix.html`, Windows: `start kit2-scoring\matrix.html`).

## 5-qadam: egasi bilan tanlang (B.1-B.3)

1. Matritsaning yuqori o‘ng qismidagi jarayonlardan eng yaxshi va ikkinchi variantni taklif qiling, har biri uchun bitta sabab.
   Yuqori o‘ngda hech narsa bo‘lmasa, buni ochiq ayting va eng yaqinini ko‘rsating.
2. Eng yaxshi variant uchun sinov muvaffaqiyatsiz tugashining 3 ta eng ehtimolli sababini va boshlashdan oldin javob topish kerak bo‘lgan bitta savolni yozing.
3. Egasidan so‘rang:
   - B.1 qaysi jarayonni tanlaysiz?
   - B.2 nega aynan shu (o‘z so‘zlaringiz bilan)?
   - B.3 hozir nimani qilmayapmiz?
   **To‘xtang:** xabarni shu savollar bilan tugating va egasining javobini kuting.
4. Javoblarni `form-b-matrix.md` ga va `matrix.html` dagi JSON ga (`chosen`, `b1`, `b2`, `b3`) yozing.

## 6-qadam: egasiga qisqa xulosa

6-8 qatordan oshmasin:

- tanlangan jarayon, uning Qiymati va Osonligi (hisobi bilan);
- uyga vazifa:
  1. Baholarni bo‘lim boshlig‘i bilan ko‘rib chiqing, kerak bo‘lsa `/kit2 qayta`.
  2. Boshlang‘ich raqamlarni yig‘ishni boshlang: `/kit5 baseline` (tarix bo‘lsa, Telegram eksporti, Excel yoki CRM dan).
  3. Jarayon tegadigan tizimlarni sanang va har biri uchun API bormi, bilib qo‘ying.
- keyingi to‘plam: 3-darsda `/kit3`.

## «qayta» rejimi

Argument `qayta` bo‘lsa: mavjud `form-a-scoring.md` ni o‘qing, egasidan bo‘lim boshlig‘i qaysi ballarni o‘zgartirganini so‘rang, sabablari bilan yozing, A.8, A.9, matritsa va B.1-B.3 ni yangilang.
Eski ball va yangi ballni ikkalasini ham `## Sabablar` bo‘limida qoldiring.
