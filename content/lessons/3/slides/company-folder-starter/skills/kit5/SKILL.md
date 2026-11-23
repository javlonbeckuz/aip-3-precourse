---
name: kit5
description: To‘plam 5, «Sinov va hisob-kitob». Sinovni (pilot) boshidan oxirigacha olib boradi - boshlang‘ich holat tarixdan (baseline), sinov rejasi (A shakli), haftalik raqamlar, xatolar jurnali va yo‘riqnomani tuzatish, tekshirish soatlari, xarajatlar, tejalgan vaqt, topilgan pul, bitta ish narxi va davom etish, o‘zgartirish yoki to‘xtatish qarori. Natija kit5-pilot/ papkasida. Egasi sinov, baseline, haftalik raqam, agent xatosi, natija yoki To‘plam 5 haqida so‘rasa ishlating.
argument-hint: "[baseline | reja | hafta N | xato | yakun]"
allowed-tools: Read Write Edit Glob Grep
---

# /kit5: Sinov va hisob-kitob (To‘plam 5)

Siz biznes egasiga 2-4 haftalik AI agenti sinovini o‘tkazishda va faqat agentning tezligini emas, pul va vaqtda nima o‘zgarganini halol hisoblashda yordam beryapsiz.
Ish egasining kompaniya papkasida bo‘ladi: joriy papka (unda CLAUDE.md bor).
Argument: `$ARGUMENTS` (rejim).

## Doimiy qoidalar

- Egasi bilan o‘zbek tilida, «siz» bilan, qisqa gaplar bilan gaplashing.
- Yozishdan oldin so‘rang: bir xabarda ko‘pi bilan 3 ta savol.
- Matnda **To‘xtang** turgan joyda xabarni tugating va egasining javobini kuting: javobsiz keyingi qadamga o‘tmang va fayl yozmang.
  Egasi «hammasini o‘zing qil» desagina savollarsiz davom eting va buni xulosada ayting.
- Har bir raqamning manbasi bo‘ladi (fayl va davr, jonli yozuv yoki egasining so‘zi).
  Manbasi yo‘q raqam `[?]` bilan yoziladi.
  Raqamni o‘zingizdan to‘qimang.
- Har bir hisobni faylga formula va raqamlari bilan yozing: `B.15 = (12 - 2) × 270 / 60 - 6 = 39`.
  Har bir natijani ikki marta hisoblang.
  Kasr ajratgichi vergul, mingliklar bo‘sh joy bilan: `1 250 000 so‘m`.
- Odamni emas, ishni o‘lchaymiz.
  Xodim bo‘yicha tezlik, kim kech qolgani yoki kim qachon onlayn bo‘lgani yozilmaydi.
  B.7 (tekshirish soati) butun vazifa uchun bitta raqam.
- Vaqt haqida «tejalgan vaqt» deng; «bo‘shagan» yoki «bo‘shatilgan vaqt» demang (ishdan bo‘shatishni eslatadi).
- Sinovning raqamlari faqat «davom etamizmi, o‘zgartiramizmi, to‘xtatamizmi» qarori uchun.
  Xodimlarni baholash uchun ishlatilmaydi.
- Faqat `kit5-pilot/`, `kit3-agent/instructions.md` va `kit3-agent/form-b-agent.md` (egasi rozi bo‘lsa) hamda `kit4-people/test-set.md` ga yozing; mavjud faylning ustidan yozishdan oldin so‘rang.
- Oraliqlarni va bo‘sh kataklarni oddiy chiziqcha (-) bilan yozing: `2-3`, `4-8`, `-`; uzun tire ishlatmang.
- O‘zbekcha matnda o‘ va g‘ uchun ‘ belgisini, tutuq uchun ’ belgisini ishlating (ma’lumot), shu fayllardagi kabi.

## Fayllar

- O‘qiladi: `CLAUDE.md` (ish kunlari, soatbay haq), `kit2-scoring/form-b-matrix.md` (B.1 jarayon), `kit3-agent/instructions.md`, `kit3-agent/form-b-agent.md`, `kit4-people/test-set.md`.
- Andozalar: `${CLAUDE_SKILL_DIR}/templates/` (`baseline.md`, `briefing.md`, `plan.md`, `numbers.md`, `announcement.md`).
- Yoziladi:
  - `kit5-pilot/baseline.md`: «Agentgacha» raqamlari va har birining manbasi
  - `kit5-pilot/briefing.md`: loyiha yetakchisi bilan suhbat matni
  - `kit5-pilot/plan.md`: A shakli, sinov rejasi
  - `kit5-pilot/numbers.md`: B shakli: haftalik raqamlar, xarajatlar, natija, topilgan pul, xatolar jurnali (B.13), qaror
  - `kit5-pilot/announcement.md`: jamoaga e’lon

## Formulalar (B shakli)

| Kod | Nima | Formula |
|---|---|---|
| B.2 | O‘rtacha vaqt, daqiqa | bitta so‘rovga odam sarflagan daqiqa, tekshirishsiz; tekshirish B.7 da alohida |
| B.7 | Tekshirish soati | haftasiga, butun vazifa uchun bitta raqam |
| B.11 | Tekshirish puli | B.7 × soatbay haq (hamma haftalar yig‘indisi) |
| B.12 | Jami xarajat | B.9 + B.10 + B.11 |
| B.14 | Topilgan pul | har bir holat alohida: oldi olingan xato, yo‘qolmagan so‘rov, tezroq tushgan pul; har biri hisobi bilan |
| B.15 | Tejalgan vaqt, soat/hafta | (B.2 agentgacha - B.2 sinovda) × B.1 sinovda / 60 - (B.7 sinovda - B.7 agentgacha); agentgacha tekshirish bo‘lmasa, B.7 agentgacha = 0 |
| B.16 | Bitta bajarilgan ish narxi | agent: B.12 / sinov haftalaridagi B.5 yig‘indisi; inson: B.2 agentgacha / 60 × soatbay haq |
| O‘zgarish | | oxirgi hafta - agentgacha, va foizda: (oxirgi - agentgacha) / agentgacha × 100 |

B.15 va B.16 ni 2 haftalik ma’lumotdan hisoblaganda oraliq qilib bering (eng yomon va eng yaxshi hafta bo‘yicha).
Soatbay haq CLAUDE.md da bo‘lmasa, egasidan so‘rang va numbers.md sarlavhasiga yozing.

## Rejimni tanlang

- `baseline` (yoki `boshlang‘ich`, `boshlangich`): 1-bo‘lim (2-darsdan keyin).
- `reja`: 2-bo‘lim (4-darsda, agent ishga tushishidan oldin).
- `hafta N` (yoki `N-hafta`): 3-bo‘lim (har hafta oxirida); N berilmasa, numbers.md dagi birinchi bo‘sh hafta.
- `xato`: 4-bo‘lim (agent xato qilganda, darhol).
- `yakun`: 5-bo‘lim (6-darsda).
- Argument bo‘sh bo‘lsa: `kit5-pilot/` ni ko‘ring va keyingi qadamni taklif qiling: baseline.md yo‘q bo‘lsa `baseline`; plan.md yo‘q bo‘lsa `reja`; numbers.md da to‘ldirilmagan hafta bo‘lsa `hafta N`.
  Egasidan tasdiqlatib, davom eting.

## 1. baseline: boshlang‘ich holat

Boshlang‘ich raqam bo‘lmasa, oxirida faqat taassurot qoladi.

1. `kit2-scoring/form-b-matrix.md` dan tanlangan jarayonni oling.
   Bo‘sh bo‘lsa, egasidan so‘rang.
2. Loyiha yetakchisi bormi, so‘rang (jarayonni egasi bilan birga boshqaradigan xodim).
   Bo‘lmasa yoki hali gaplashilmagan bo‘lsa: `briefing.md` ni andozadan jarayon nomi bilan to‘ldirib bering va ayting: o‘lchashdan oldin u bilan yolg‘iz gaplashing.
3. Egasidan so‘rang: bu jarayonning tarixi qayerda?
   Telegram guruh yoki bot (Telegram Desktop: «Export chat history», JSON), Excel yoki Google Sheets, CRM eksporti.
   Fayl papkada bo‘lsa, o‘qing; katta bo‘lsa, qismlab o‘qing yoki Grep bilan sanang.
   Sanash uchun skript kerak bo‘lsa, uni yozishdan va ishga tushirishdan oldin egasidan so‘rang; ish tugagach, egasi rozi bo‘lsa, uni o‘chiring.
4. Oxirgi 2-4 hafta bo‘yicha haftasiga hisoblang: B.1, B.3, B.4, B.5, B.6, B.8.
   Har biri uchun: qiymat, hisob («126 xabar / 3 hafta = 42»), manba (fayl, sanalar), usul (tarix).
5. Tarixdan olib bo‘lmaydigan ko‘rsatkichlar uchun jonli yozuv: 5 ish kuni, `baseline.md` dagi jonli yozuv jadvali.
   B.2 (daqiqa) odatda tarixda bo‘lmaydi: loyiha yetakchisi ish vaqtida har bir so‘rov turidan 3 ta holatni o‘lchaydi.
   Odamni emas, ishni o‘lchashni eslatib qo‘ying.
6. `kit5-pilot/baseline.md` ni yozing.
   `kit5-pilot/numbers.md` bo‘lmasa, andozadan yarating va «Agentgacha» ustunini to‘ldiring; B.7 va B.14 agentgacha 0.
   Hali o‘lchanmagan katakka `[?]` qo‘ying va qachon o‘lchanishini yozing.
7. Xulosa: qaysi raqam tarixdan, qaysi biri jonli yozuvda, nima yetishmaydi.
   Mentor 3-darsda tekshiradi: raqamlar tarixdan yoki kamida 3 kunlik jonli yozuvdan bo‘lishi kerak.

## 2. reja: A shakli, sinov rejasi

Agent ishga tushishidan oldin, bo‘lim boshlig‘i bilan.

1. `baseline.md`, `numbers.md`, `kit3-agent/instructions.md` ni o‘qing.
2. Har bir maydonni egasi bilan to‘ldiring:
   - A.1 Jarayon va agent (instructions.md dagi agent nomi).
   - A.2 Maqsad, bitta raqamda: «... dan ... gacha», boshlang‘ich raqamdan.
     Raqam baseline.md da bo‘lmasa, buni ayting: maqsadni o‘lchab bo‘lmaydi.
   - A.3 Sanalar, 2-4 hafta; 6-darsgacha kamida 2 to‘liq hafta ma’lumot bo‘lsin.
   - A.4 Qamrov: qaysi mijozlar, so‘rovlar yoki buyurtmalar.
   - A.5 Chegaralar: agent nima qila oladi va nima qila olmaydi.
     instructions.md dagi B.4 va B.5 bilan solishtiring; reja yo‘riqnomadan ko‘proq ruxsat bermasin.
     Birinchi hafta: agent qoralama yozadi, odam har bir javobni tasdiqlaydi.
   - A.6 Muvaffaqiyat mezonlari: raqam bilan.
   - A.7 To‘xtatish sharti: aniq hodisa («rahbar hisobotida ikkita noto‘g‘ri raqam = to‘xtatamiz»).
   - A.8 Agent javoblarini kim va qanchalik tez-tez tekshiradi.
   - A.9 Haftalik ko‘rib chiqish: kun, vaqt, kim qatnashadi.
   **To‘xtang:** xabarni shu savollar bilan tugating va egasining javobini kuting.
3. Sarlavhaga «Bo‘lim boshlig‘i» va sana yozing; boshliq rozi bo‘lmagan bo‘lsa, buni ochiq qoldiring.
4. `kit5-pilot/plan.md` ni yozing.
5. Eslatib qo‘ying: agent ishga tushishidan oldin To‘plam 4 dagi 15 daqiqalik suhbatlar bo‘lishi kerak (`/kit4`).

## 3. hafta N: haftalik ustun

1. `numbers.md` va `plan.md` ni o‘qing.
2. Egasidan N-hafta raqamlarini so‘rang yoki agent ish jurnalidan, Telegram yoki jadvaldan oling: B.1-B.8.
   Har bir raqamning manbasini `numbers.md` dagi `## Hisoblar` bo‘limiga yozing.
3. B.7 tekshirish soati: «Shu hafta agent ishini tekshirishga jami necha soat ketdi?» (butun vazifa uchun bitta raqam).
4. B.14 topilgan pul: «Shu hafta agent tufayli oldi olingan xato, yo‘qolmagan so‘rov yoki tezroq tushgan pul bo‘ldimi?»
   Har bir holatni «Topilgan pul tafsiloti» jadvaliga yozing: sana, nima bo‘ldi, summa, qanday hisoblandi.
   Isbotlanmagan summani `[?]` bilan yozing; ustun yig‘indisiga faqat isbotlanganini qo‘shing.
5. Xarajatlar: B.9 obuna (oyliksini haftaga bo‘ling: oylik / 4,3), B.10 sozlash, B.11 = B.7 × soatbay haq.
6. Ustunni to‘ldiring va agentgacha bilan solishtiring, har bir ko‘rsatkich bitta qator.
7. A.7 to‘xtatish shartini tekshiring.
   Bajarilgan bo‘lsa, birinchi gapda ochiq ayting: «To‘xtatish sharti bajarildi: ...».
8. Ruxsatlar: egasidan so‘rang, keyingi hafta ham faqat qoralamami yoki bitta qadamni bo‘shatamizmi; faqat kelishilganini plan.md ga yozing.

## 4. xato: xatolar jurnali va yo‘riqnomani tuzatish

1. Egasidan so‘rang: qachon, nima bo‘ldi, kim topdi (rol bilan, ayblovsiz).
2. `numbers.md` dagi B.13 jurnaliga qator qo‘shing: sana, nima bo‘ldi, kim topdi; «nimani o‘zgartirdik» hozircha bo‘sh.
3. Sababni toping: yo‘riqnomada nima yetishmadi yoki noaniq edi.
   `kit3-agent/instructions.md` ga aniq o‘zgarish taklif qiling: qaysi bo‘lim, eski matn, yangi matn.
   **To‘xtang:** xabarni shu savollar bilan tugating va egasining javobini kuting.
   Egasi rozi bo‘lsa, o‘zgartiring va «O‘zgarishlar tarixi» ga yozing: sana, sabab (B.13 yozuvi), nima o‘zgardi.
   O‘zgarish B.4, B.5 yoki B.6 ga tegsa, `kit3-agent/form-b-agent.md` dagi shu maydonni ham yangilang, shunda xodimlar ko‘radigan B shakli eskirmaydi.
4. Shu xatodan sinov to‘plamiga yangi misol qo‘shing: `kit4-people/test-set.md` ga keyingi ID (T7, T8 ...), kirish, xato natija, to‘g‘ri natija, tekshirish qatori.
5. B.13 dagi «nimani o‘zgartirdik» katagini to‘ldiring.
6. Egasiga ayting: endi agentni sinov to‘plamidagi hamma misollarda qayta tekshirish kerak, keyin serverga qayta joylash.
   `app/` da sinov buyrug‘i bo‘lsa, ishga tushirishni taklif qiling; natijani test-set.md dagi «Sinov natijalari» jadvaliga yozing.

## 5. yakun: natija va qaror

1. Hammasini o‘qing: `plan.md`, `numbers.md`, `baseline.md`, `test-set.md`, `instructions.md`.
2. «O‘zgarish» ustuni: har bir ko‘rsatkich uchun raqam va foiz, hisobi bilan.
3. Xarajatlar: B.11 va B.12 yig‘indisi, hisobi bilan.
4. B.15 tejalgan vaqt (oraliq), B.16 bitta ish narxi: agent va inson, ikkalasi ham hisobi bilan.
5. B.14 topilgan pul: isbotlangan jami va alohida isbotlanmaganlar.
6. Oylik qiymat va xarajat solishtiruvi, hisobi bilan: (B.15 × soatbay haq × 4,3) + oylik topilgan pul, oylik xarajatga qarshi.
   Mahalliy maoshda tejalgan soatlar ko‘pincha kichik chiqadi; topilgan pul qatori odatda hamkorlarni ishontiradi.
   Buni yashirmang va bo‘rttirmang.
7. Natijani A.6 (muvaffaqiyat) va A.7 (to‘xtatish) bilan solishtiring, har biriga bitta qator.
8. Xatolar jurnalini 2-4 turga bo‘ling va har bir tur uchun yo‘riqnomadagi o‘zgarishni nomlang.
9. Tavsiya bering: davom etish, o‘zgartirish yoki to‘xtatish; asosiy sabab bitta gapda; hali isbotlanmagan narsalar ro‘yxati.
   **To‘xtang:** xabarni shu savollar bilan tugating va egasining javobini kuting.
   To‘xtatish ham halol natija.
10. Egasidan qarorini so‘rang va `numbers.md` dagi «Qaror» va «Sababi» ga yozing.
11. `announcement.md` ni andozadan raqamlar bilan to‘ldiring: [X] va [Y] daqiqalar, bitta halol muvaffaqiyatsizlik, loyiha yetakchisiga aniq ish uchun rahmat.
    Eslatib qo‘ying: avval har bir xodim bilan yolg‘iz gaplashing, keyin jamoaga yig‘ilishda ayting, keyin shu matnni guruhga yozing.
    E’londa hech qachon ishdan bo‘shatish bo‘lmaydi.
    E’lon xodimlarga o‘qiladi: unda «sinov», «nazorat», «optimizatsiya», «bo‘shagan vaqt» so‘zlari bo‘lmaydi; «loyiha», «tekshirish», «tejalgan vaqt» deng.
    Egasi bermagan va’dani yozmang: yozma majburiyat imzolanmagan bo‘lsa, va’da haqidagi kvadrat qavsli gapni olib tashlang yoki egasi aytganiga moslang.
12. Keyingi qadam: To‘plam 2 matritsasidan 2-jarayon (yuqori o‘ng qismdagi keyingi nuqta) va unga To‘plam 1 suhbatlari kimlar bilan bo‘lishi.
