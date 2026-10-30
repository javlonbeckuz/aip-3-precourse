---
name: kit5
description: "Kit 5: pilot raqamlari. Baseline (agentgacha raqamlar), pilot rejasi (A shakli), haftalik ustunlar, xarajatlar, topilgan pul va yakuniy qaror. Foydalanuvchi /kit5 baseline, /kit5 reja, /kit5 hafta N yoki /kit5 qaror deb yozganda ishlating."
---

# /kit5: baseline dan qarorgacha

Siz kompaniya papkasida (`kompaniya/`) ishlaysiz. Hamma fayl `kit5-pilot/` ichida. Foydalanuvchi qaysi rejimni aytsa, faqat shuni bajaring. Rejim aytilmagan boʻlsa, soʻrang.

Hamma rejimda bitta qoida: raqamni faqat fayldan yoki foydalanuvchining javobidan oling. Har raqam yonida manbasi va hisoblash usuli boʻlsin. Hisoblab boʻlmaydigan katakni boʻsh qoldiring va sababini yozing.

## Rejim: baseline

Ikkinchi darsdan keyin. Natija: Kit 5 B ning "Agentgacha" ustuni.

1. `CLAUDE.md` dan pilot jarayonni oling.
2. Foydalanuvchi koʻrsatgan tarix fayllarini oʻqing: Telegram chat eksporti (JSON), Excel, CRM eksporti.
3. Oxirgi 2-4 hafta boʻyicha hisoblang: B.1 bajarilgan murojaatlar, B.2 oʻrtacha vaqt (daqiqa), B.3 xatolar, B.4 takroriy murojaatlar. Bir haftalik raqamga keltiring va qanday keltirganingizni yozing.
4. Tarixda yoʻq raqamni "tarixda yoʻq" deb belgilang.
5. Saqlang: `kit5-pilot/baseline.md`.
6. Tarixda yoʻq raqamlar uchun `kit5-pilot/baseline-live.md` da 5 ish kunlik jadval tayyorlang: sana va faqat shu raqamlar. 5-kun tugagach, oʻrtachani `baseline.md` ga qoʻshing.

## Rejim: reja

Toʻrtinchi darsda. Natija: Kit 5 A, `kit5-pilot/plan.md`.

1. `CLAUDE.md`, `kit3-agent/instructions.md`, `kit5-pilot/baseline.md` ni oʻqing.
2. A.1-A.9 qoralamasini tuzing:
   - A.1 jarayon va agent;
   - A.2 maqsad, bitta raqamda, baseline dan kelib chiqsin ("... dan ... gacha");
   - A.3 sanalar, 2-4 hafta;
   - A.4 qamrov: qaysi mijozlar, murojaatlar yoki buyurtmalar;
   - A.5 chegaralar: agent qila oladi va qila olmaydi, `instructions.md` dagi B.4 va B.5 dan. Birinchi hafta agent faqat qoralama tayyorlaydi, har natijani inson tasdiqlaydi;
   - A.6 muvaffaqiyat mezonlari;
   - A.7 toʻxtash sharti: "agar ... boʻlsa, darhol toʻxtatamiz";
   - A.8 agent javoblarini kim va qanchalik tez-tez tekshiradi;
   - A.9 haftalik koʻrib chiqish: kun, vaqt, kim qatnashadi.
3. Bilmagan bandni toʻldirmang: foydalanuvchiga savol bering.
4. Oxirida eslating: reja ishga tushirishdan oldin boʻlim boshligʻi bilan kelishiladi, Kit 4 suhbatlari agent yoqilishidan oldin boʻladi.

## Rejim: hafta N

Natija: `kit5-pilot/results.md` dagi N-hafta ustuni (Kit 5 B).

1. `results.md` yoʻq boʻlsa, uni Kit 5 B jadvali bilan yarating va Agentgacha ustunini `baseline.md` dan koʻchiring.
2. Foydalanuvchi koʻrsatgan manbalardan (serverdagi agent loglari, jadvallar) N-hafta raqamlarini baseline bilan bir xil usulda hisoblang.
3. B.7 tekshirish soatlarini foydalanuvchidan soʻrang.
4. `kit5-pilot/errors.md` (B.13) ni oʻqing. "Nimani oʻzgartirdik" boʻsh qolgan yozuvlarni roʻyxat qiling.
5. Agentgacha va oldingi haftalar bilan yonma-yon jadval koʻrsating.

## Rejim: xarajat

1. B.9 obunalar (oylik), B.10 integratsiya va sozlash: foydalanuvchidan soʻrang.
2. B.11 = B.7 soatlari × soatlik stavka. Stavkani foydalanuvchidan soʻrang.
3. B.12 = B.9 + B.10 + B.11.
4. Topilgan pul: loglar va `errors.md` dan pilot pul olib kelgan yoki saqlab qolgan holatlarni toping: zarar qilishidan oldin ushlangan xatolar, endi yoʻqolmayotgan murojaatlar, tezroq yigʻilgan pul. Har holatga sana, dalil, summa. Summa nomaʼlum boʻlsa, "summa aniqlanmagan" deb yozing.

## Rejim: qaror

Oltinchi darsda. Natija: `kit5-pilot/results.md` yakuni va `kit5-pilot/decision.md`.

1. `plan.md` va `results.md` ni oʻqing.
2. Oʻzgarish ustuni: oxirgi toʻldirilgan hafta va Agentgacha orasidagi farq.
3. Bitta vazifa narxi. Agent: B.12 ÷ pilotdagi B.5 jami. Inson: Agentgacha B.2 / 60 × soatlik stavka. Bir martalik sozlash xarajatini alohida izohlang.
4. A.6 va A.7 bilan band-band solishtiring. Jadval: mezon, rejadagi qiymat, haqiqiy qiymat, bajarildimi.
5. Bitta variantni dangal tavsiya qiling: davom ettirish, oʻzgartirish yoki toʻxtatish. Sababi bir gapda. Oʻzgartirish boʻlsa, aynan nimani.

## Hech qachon

- Fayllarda va foydalanuvchi javobida yoʻq raqam, summa yoki stavka qoʻshmang.
- Boʻsh katakni taxmin bilan toʻldirmang.
- Mijozlarning ism va telefonlarini natija fayllariga koʻchirmang.
- Kit 3 va Kit 4 fayllarini oʻzgartirmang.
