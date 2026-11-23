# 5-mashq. To‘plam 4: xodimlarni yangi rolga tayyorlash (2:26-2:37, 11 daqiqa)

**Natija:** `kompaniya/kit4-people/form-a-skills-map.md` (har bir ishi o‘zgarayotgan xodim) va har biri uchun `kit4-people/<ism>-form-b.md` (mashg‘ulot vazifasi va 15 daqiqalik suhbat rejasi).
Suhbatning o‘zi - uy vazifasi: bot xodimlar uchun yoqilishidan **oldin**.

## Nega kerak

Xodim botni rahbardan emas, tasodifan bilib qolsa, «meni almashtirishyapti» deb o‘ylaydi va haqiqiy ishini yashiradi.
Shunda sinov raqamlari yolg‘on chiqadi.
To‘plam 4 uchta savolga javob beradi: kim nimani eng yaxshi qiladi, ertaga u nimani tekshiradi, bu haqda unga qanday aytamiz.
Biz odamni almashtirmaymiz, kuchaytiramiz: bo‘shagan emas, **tejalgan** vaqt yuqoriroq qiymatli ishga ketadi.

## Boshlashdan oldin kerak

| Nima | Qayerda |
|---|---|
| Jarayon qadamlari: bugun kim, ertaga kim, kim tekshiradi | `kit3-agent/form-a-steps.md` (A.3, A.4, A.5) |
| 3 ta yaxshi va 3 ta yomon real misol | `kit4-people/test-set.md` (3-dars uy vazifasi) |
| Har bir xodimning To‘plam 1 dagi vazifalar ro‘yxati | `kit1-interviews/<ism>-form-b.md` |
| Sinov rejasi | `kit5-pilot/plan.md` (4-mashq) |

## Qadamlar

### 1. Namunani ko‘ring (2 daqiqa)

- Yaxshi: `namuna/kompaniya/kit4-people/form-a-skills-map.md` va `madina-form-b.md`.
- Yomon: `namuna/yomon/kit4-yomon.md` - har qatorda nima xato, sherigingiz bilan bir-ikki misol ayting.

### 2. A va B shakllari (9 daqiqa, uyda tugatasiz)

Warp’da `kompaniya` papkasini oching, `claude` deb yozing va yuboring:

```text
/kit4
```

Skill avval ishi o‘zgarayotgan xodimlar ro‘yxatini To‘plam 3 dan topib, tasdiqlatadi.
Keyin har biri uchun bittadan so‘raydi: eng kuchli qobiliyati va **real misol** (qachon, nima bo‘ldi).
Misolni o‘zingiz aytasiz: Claude uni to‘qimaydi; esingizda bo‘lmasa, `[?]` qoladi va uyda to‘ldirasiz.

`/kit4` ishlamasa, shu topshiriq matnini yuboring:

```text
kit3-agent/form-a-steps.md, kit4-people/test-set.md va kit1-interviews/ dagi B shakllarini o'qi.
1. Ishi o'zgarayotgan xodimlar ro'yxatini menga ko'rsat va tasdiqlat.
2. Har bir xodim uchun mendan so'ra: eng kuchli qobiliyati va bitta real misol (sana va voqea). Misolni o'zing to'qima.
3. kit4-people/form-a-skills-map.md ni To'plam 4 A shakli bo'yicha yoz (A.1-A.6).
4. Har bir xodim uchun kit4-people/<ism>-form-b.md yoz: B.1-B.7, B.3 ni bir daqiqalik 4-6 ta ha/yo'q savol qil,
   B.4 ga test-set.md dagi 6 misolni qo'y. B.8 va B.9 ni bo'sh qoldir: ular suhbatdan keyin to'ldiriladi.
5. Har bir B shakli oxiriga 15 daqiqalik suhbat rejasini qo'sh: nima o'zgaradi, nima o'zgarmaydi (maosh va lavozim),
   endi nimani tekshiradi, qanday to'xtatiladi, xavotirlarini so'rash, kelishuv.
Xodimlarga aytiladigan matnda "optimizatsiya", "qisqartirish", "o'rnini bosadi", "bo'shagan vaqt", "nazorat" so'zlarini ishlatma.
Har doim "siz" va ism bilan "aka" yoki "opa".
```

### 3. Yozma majburiyatni yangilang (uyda, 5 daqiqa)

1-darsda imzolagan yozma majburiyatingizda (`kit1-interviews/team-message.md`) ikkita joy hali umumiy: 4 va 5-bandlar.
Suhbatlardan oldin ularni aniq qiling va har bir xodimga yangi nusxani bering:

```text
4. [Loyiha yetakchisi ismi] va men yordamchini istalgan payt telefondan /stop buyrug'i bilan to'xtata olamiz.
   Yordamchi zarar yetkazayotganini ko'rgan har kim [ism]ga aytsin; buning uchun hech kim jazolanmaydi.
5. Yordamchi tejagan vaqt [nimaga] ketadi; bu shu ishdagi odamlar bilan birga hal qilingan.
   U qo'shimcha haqsiz ish bilan to'ldirilmaydi. Kimningdir vazifasi o'zgarsa, avval yozma kelishamiz.
```

Baraka namunasi: «4. Malika Rashidova va men ... /stop ...», «5. ... showroomdagi mijozlar va ofis o‘lchovlariga ketadi».

## Har bir maydon qayerdan keladi

| Maydon | Qayerdan | Odatiy xato |
|---|---|---|
| A.1 | To‘plam 3 A.3 (bugun kim) va A.5 (kim tekshiradi) | Ishi o‘zgarayotgan odamni unutish (masalan, savollarga javob beradigan omborchi) |
| A.2 | Sizning xotirangiz: oxirgi marta qachon ko‘rdingiz? | Sifat so‘zi, misolsiz («mas’uliyatli») |
| A.3 | To‘plam 1 B shakli | Lavozim nomi, ish emas |
| A.4 | A.2 ni jarayondagi joyga bog‘lash | «AI’ni o‘rganadi» |
| A.5 | To‘plam 3 A.5 | «Nazorat qiladi», natijasiz |
| B.3 | `instructions.md` B.4, B.5 | «To‘g‘ri bo‘lsin» |
| B.4 | `test-set.md` | Faqat yaxshi misollar |
| B.8, B.9 | Suhbatdan keyin, xodimning so‘zlari | Suhbatdan oldin egasi yozgan |

## Tayyor bo‘ldi, agar

- [ ] A shaklida har bir ishi o‘zgarayotgan xodim bor va A.2 da real misol (yoki `[?]`, uyda to‘ldiriladi).
- [ ] Har bir xodim uchun B shakli: B.3 - 4-6 ta ha/yo‘q savol, B.4 - 6 misol, oxirida suhbat rejasi.
- [ ] B.8 va B.9 bo‘sh: suhbatdan keyin to‘ldiriladi.
- [ ] Har bir xodim bilan suhbat kuni va soati yozilgan, bot yoqiladigan vaqtdan **oldin**.
- [ ] Mentor ko‘rdi: kodlar 4.10 va 4.11.
