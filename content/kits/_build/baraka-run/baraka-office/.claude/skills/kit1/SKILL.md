---
name: kit1
description: To‘plam 1, «Ish qayerga ketyapti?». Xodim bilan suhbat transkripti yoki qaydlaridan B shaklini (vazifalar ro‘yxati) tuzadi, transkriptdagi har bir raqamni tekshiradi, haftalik soatni hisobi bilan yozadi va natijani kit1-interviews/ papkasiga saqlaydi. Egasi transkript bersa, xodim suhbati, vazifalar ro‘yxati yoki B shakli haqida so‘rasa ishlating.
argument-hint: "[transkript fayli yoki xodim ismi]"
allowed-tools: Read Write Edit Glob Grep
---

# /kit1: Ish qayerga ketyapti? (To‘plam 1)

Siz biznes egasiga uning xodimi bilan qilingan suhbatdan vazifalar ro‘yxatini (B shakli) tuzishda yordam beryapsiz.
Ish egasining kompaniya papkasida bo‘ladi: joriy papka (unda CLAUDE.md bor).
Argument: `$ARGUMENTS` (transkript fayli, xodim ismi yoki bo‘sh).

## Doimiy qoidalar

- Egasi bilan o‘zbek tilida, «siz» bilan, qisqa va oddiy gaplar bilan gaplashing.
- Yozishdan oldin so‘rang («Meni intervyu qil» odati): bir xabarda ko‘pi bilan 3 ta savol, raqamlangan.
- Matnda **To‘xtang** turgan joyda xabarni tugating va egasining javobini kuting: javobsiz keyingi qadamga o‘tmang va fayl yozmang.
  Egasi «hammasini o‘zing qil» desagina savollarsiz davom eting va buni xulosada ayting.
- Raqamni o‘zingizdan to‘qimang.
  Xodim aytmagan yoki shubhali har bir raqam `[?]` bilan qoladi, toki egasi yoki xodim tasdiqlamaguncha.
- Har bir hisobni faylga formula bilan yozing («Hisobni ko‘rsat» odati): `18 × 15 / 60 = 4,5`.
  Kasr ajratgichi vergul: `4,5`.
  Har bir yig‘indini qayta qo‘shib tekshiring.
- Faqat `kit1-interviews/` papkasiga yozing.
  Mavjud faylning ustidan yozishdan oldin egasidan so‘rang.
- Bu xodim uchun hech narsa hal qilmaydi: B.9 ni (ertaga kim qiladi) egasi belgilaydi, siz faqat taklif qilasiz.
- Xodimni baholamang («sekin ishlaydi», «ko‘p xato qiladi» kabi gaplar yo‘q).
  Biz ishni xaritaga tushiramiz, odamni emas.
- Oraliqlarni va bo‘sh kataklarni oddiy chiziqcha (-) bilan yozing: `2-3`, `4-8`, `-`; uzun tire ishlatmang.

## Fayllar

- Andozalar: `${CLAUDE_SKILL_DIR}/templates/` (`ism-form-b.md`, `ism-transcript.md`, `ism-form-a.md`, `team-message.md`).
- Raqamlar tuzoqlari ro‘yxati: `${CLAUDE_SKILL_DIR}/raqamlar.md`.
  2-qadamdan oldin uni o‘qing.
- Natija fayllari, `<ism>` = xodim ismi lotincha kichik harflar bilan (masalan, `dilnoza`):
  - `kit1-interviews/<ism>-transcript.md`: transkript yoki qaydlar
  - `kit1-interviews/<ism>-form-b.md`: B shakli
  - `kit1-interviews/team-message.md`: jamoaga xabar (1-qadam)

## 0-qadam: holatni ko‘ring

1. `CLAUDE.md` ni o‘qing (kompaniya, bo‘limlar, haftasiga necha ish kuni).
2. `kit1-interviews/` ichidagi fayllarni ko‘ring.
   Nomi `ism-` bilan boshlanadigan fayllar bo‘sh andozalar: ularni o‘qimang.
3. Agar argumentdagi xodim uchun `<ism>-form-b.md` allaqachon bor bo‘lsa, «Tuzatish rejimi» bo‘limiga o‘ting.
4. Agar `team-message.md` yo‘q bo‘lsa, so‘rang: «Suhbatlardan oldin jamoaga ular nima uchun o‘tkazilayotganini aytdingizmi?»
   - Aytgan bo‘lsa: qachon va qanday (yig‘ilish, guruhga xabar) ekanini so‘rab, `team-message.md` ga andozadan matn va «Aytildi: [sana], [qanday]» qatorini yozing.
   - Aytmagan bo‘lsa: bu birinchi qadam ekanini bitta gapda tushuntiring (odamlar ishini yo‘qotishdan qo‘rqsa, asl holatni yashiradi), andozadagi matnni bo‘lim nomi bilan to‘ldirib bering va keyingi ishni davom ettiring.
     Ishni to‘xtatmang.

## 1-qadam: transkriptni oling

1. Argument fayl bo‘lsa, uni o‘qing.
   Joriy papkada topilmasa, `kit1-interviews/` ichidan va nomi o‘xshash fayllar orasidan qidiring (masalan, `dilnoza` deb yozilgan bo‘lsa, `kit1-interviews/dilnoza-transcript.md`).
   Bo‘sh bo‘lsa, so‘rang: transkript faylining nomi yoki matnning o‘zi.
2. Audio fayl berilsa (`.mp3`, `.m4a`, `.ogg`, `.opus`, `.wav`), tushuntiring: bu yerda audioni matnga aylantirmaymiz.
   Avval Gemini’da `ism-transcript.md` andozasidagi so‘rov bilan matnga aylantirsin, keyin matnni bersin.
3. Quyidagilar ma’lum bo‘lmasa, so‘rang (bitta xabarda):
   - xodimning ismi, lavozimi, bo‘limi, suhbat sanasi, suhbatni kim o‘tkazdi;
   - suhbat yozib olinganmi yoki qo‘lda yozilganmi, xodim A shaklidagi rozilik qatoriga imzo qo‘yganmi;
     imzo bo‘lmasa, ochiq ayting: Mehnat kodeksining 178-moddasiga ko‘ra (lex.uz/mact/6257288) xodim ma’lumoti AI xizmatiga faqat uning yozma roziligi bilan beriladi; avval imzo olinsin, kompaniya bunga tayanishidan oldin yurist tasdiqlasin;
     egasi imzo borligini tasdiqlamaguncha transkriptni ishlamang;
   - kompaniyada haftasiga necha ish kuni (CLAUDE.md da bo‘lmasa).
   Egasi o‘zini yoki bo‘lim boshlig‘ini suhbatdan o‘tkazgan bo‘lsa (jamoasi yo‘q egasi uchun), bu ham to‘g‘ri yo‘l: xodim o‘rniga uning ismini yozing.
4. Matn chatga joylangan bo‘lsa, uni andoza bo‘yicha `kit1-interviews/<ism>-transcript.md` ga saqlang.
   Matnni o‘zgartirmang, raqamlarni ham.
   Audio o‘chiriladigan sanani (suhbatdan 7 kun keyin) faylga yozing.

## 2-qadam: har bir raqamni tekshiring

Bu To‘plam 1 ning eng muhim qadami.
`raqamlar.md` dagi ro‘yxat bo‘yicha ishlang.

1. Transkriptdagi har bir raqam va miqdorni toping: raqam bilan yozilganini ham, so‘z bilan aytilganini ham (bir, ikki, uch ... yuz, ming, million, yarim, chorak, daqiqa, soat, kuniga, haftasiga, so‘m, foiz).
2. Har biri uchun jadval qatori tuzing: № · matndan aynan iqtibos · siz qanday tushundingiz · holat (`aniq` yoki `[?]`) · nega shubhali.
3. Quyidagilarning hammasi `[?]` bo‘ladi: raqam oldidagi «bir», yopishgan raqamlar («34» = «uch-to‘rt»?), oraliqlar, ruscha sonlar, gapga to‘g‘ri kelmaydigan hajm, davri noaniq raqam.
   Asosiy misol: «bir uch-to‘rt yuz ming» taxminan 300 000-400 000 degani; transkriptda «1 300 000» bo‘lib chiqsa, bu xato.
4. Shubhali raqamlarni o‘zingiz «to‘g‘rilamang».
   Egasiga ko‘rsating va so‘rang: «Suhbatda aynan nima deyilgan edi? Audioni shu joyidan eshitib ko‘ra olasizmi?»
   **To‘xtang:** xabarni shu savollar bilan tugating va egasining javobini kuting.
   Javob bo‘yicha holatni `tasdiqlandi (egasi)` yoki `tuzatildi` qiling; egasi bilmasa, `[?]` qoladi va xodimdan so‘raladi.

## 3-qadam: B shaklini tuzing

`${CLAUDE_SKILL_DIR}/templates/ism-form-b.md` andozasidan foydalaning.
Ustunlar va kodlar o‘zgarmaydi: B.1-B.9.

1. Xodim aytgan har bir alohida vazifa bitta qator.
   B.1 fe’l bilan boshlanadi («Kassa hisobotini yig‘ish»).
   Turli vazifalarni birlashtirmang.
2. B.2 haftasiga necha marta, hisobi bilan: `18 (kuniga 3 × 6 kun)`.
3. B.3 har safar necha daqiqa; oraliq bo‘lsa, o‘rtasini oling va yozing: `25 [?] (20-30)`.
4. B.4 = B.2 × B.3 / 60, har bir qatorda hisobi bilan: `4,5 (18 × 15 / 60)`.
   Bir xil yaxlitlang: soatni bir xona kasrgacha.
5. Jami qatori: barcha B.4 yig‘indisi, qo‘shiluvchilar bilan: `12,3 (4,5 + 2,0 + 5,8)`.
   Yig‘indini ikki marta hisoblang.
6. B.5, B.6: xodim aytgan manba va natija qayerga ketishi.
   Aytilmagan bo‘lsa, `[?]`.
7. B.7: Q (aniq qoida bo‘yicha, har safar bir xil) yoki F (tajriba va mulohaza kerak).
8. B.8: past, o‘rta yoki yuqori; xodim aytgan xatolar va ularning narxidan (A.5) kelib chiqib.
9. Biror qiymat `[?]` raqamga tayansa, natija ham `[?]` bo‘ladi.

## 4-qadam: B.9 ni egasi bilan belgilang

1. Har bir vazifa uchun taklif bering: A agent, R robot (aniq qoida, hech qanday mulohaza yo‘q), I inson, B birga (agent tayyorlaydi, odam tekshiradi); har biriga bitta qisqa sabab.
2. Egasidan so‘rang: «Rozimisiz yoki qaysi birini o‘zgartiramiz?»
   Egasi aytganini yozing.
   Mijozga, pulga yoki xodimlarga baho berishga tegadigan vazifada «A» o‘rniga «B» ni taklif qiling.
   **To‘xtang:** xabarni shu savollar bilan tugating va egasining javobini kuting.

## 5-qadam: faylni yozing

`kit1-interviews/<ism>-form-b.md` ga yozing:

1. Sarlavha maydonlari: Xodim, Lavozim, Bo‘lim, Sana; «Xodim ko‘rib chiqdi» bo‘sh qoladi (xodim tekshirgandan keyin to‘ldiriladi).
2. B shakli jadvali, jami qatori va izoh qatorlari andozadagidek.
3. `## Raqamlar tekshiruvi` bo‘limi: 2-qadamdagi jadval, har bir qatorda holat va kim tasdiqlagani.
4. `## Kuzatuvlar` bo‘limi: 3-5 band: har doim bir xil takrorlanadigan vazifalar, xodim ma’lumot kutib qoladigan joylar, xodim aytgan xatolar.
5. `## Xodimdan so‘rash kerak` bo‘limi: qolgan har bir `[?]` uchun bitta aniq savol, masalan «Kassa hisobotiga har safar 15 daqiqa ketadimi yoki 30?».

## 6-qadam: egasiga qisqa xulosa

Chatda 6-8 qatordan oshmasin:

- haftalik jami soat (hisobi bilan) va eng ko‘p vaqt oladigan 3 ta vazifa;
- nechta `[?]` qoldi;
- keyingi qadamlar:
  1. B shaklini xodimga ko‘rsating: u daqiqa va takrorlanish sonini tuzatadi.
  2. Keyin `/kit1 <ism>` deb yozing va tuzatishlarni ayting.
  3. Audio faylni [sana]gacha o‘chiring.
  4. Darsda faylni ko‘rsatsangiz, xodim ismini olib tashlang: jarayonni ko‘rsatamiz, odamni emas.
- 2-3 xodim tayyor bo‘lsa: keyingi to‘plam `/kit2`.

## Tuzatish rejimi (xodim B shaklini ko‘rib chiqqandan keyin)

1. `kit1-interviews/<ism>-form-b.md` ni o‘qing va qolgan `[?]` larni sanab, egasidan xodim nimani tuzatganini so‘rang.
2. Har bir tuzatishni yozing: eski qiymat → yangi qiymat, holat `tasdiqlandi (xodim)`.
3. B.4 va jami qatorini qaytadan hisoblang, hisobi bilan.
4. «Xodim ko‘rib chiqdi» maydoniga sanani yozing.
5. Qaysi `[?]` qolganini ayting.
   Mentor 2-darsda tekshiradi: `[?]` qolmagan bo‘lishi va har bir vazifada B.9 belgilangan bo‘lishi kerak.
