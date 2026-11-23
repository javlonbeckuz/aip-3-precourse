# Kit 1 live demo: script (2:10-2:45)

Instructor-facing, English, with the Uzbek lines to say marked UZ.
Slides 35-40.
The Kit 1 forms, prompts, team message, consent text and the recommended written commitment belong to the kits agent: `ROOT/kits/KIT_01_Ish_qayerga_ketyapti_UZ_LATN.md` (and `.pdf`), skill in `ROOT/kits/skills/kit1/`.
This folder only holds what the live demo needs on top of the kit.

| File | Use |
| --- | --- |
| `jonli-suhbat-ssenariysi.md` | This script |
| `fallback-transkript.md` | Raw transcript with one misheard number, for when the live recording or Wi-Fi fails |
| `namuna-form-b.md` | What a good Kit 1 prompt result looks like for the fallback transcript, before and after the employee corrects it |
| `juftlik-mashqi.md` (+ `.html`, `.pdf`) | One-page Uzbek card for the pairs exercise (2:29-2:43) |

The kits agent's canonical Baraka Office Kit 1 example (Malika Rashidova, B04) is the reference for the whole course: `ROOT/kits/namunalar/baraka-office/kit1-interviews/` (`malika-transcript.md` with the «34 marta» and «1 300 000» traps, `malika-form-a.md`, corrected `malika-form-b.md`), and the real `/kit1` run is `ROOT/kits/skills/kit1/example/suhbat.md`.
Use it as the main fallback; `fallback-transkript.md` here is a shorter 5-minute version with one trap for when time is tight.

## Before class

- At the break, a mentor picks a willing participant (or briefs a mentor as plan B) and tells them:
  "Describe your real job for 5 minutes. Say at least one amount the way you naturally would, as a range: «bir uch-to‘rt yuz ming», «besh-olti kun», «kuniga yigirma-o‘ttizta»."
  No customer names, no colleague names; if a customer or patient name, phone or diagnosis slips out, replace it with «[mijoz]» in the transcript before it goes to Claude (homework step 3).
- On the instructor phone: voice recorder ready, airplane mode off, Do Not Disturb on.
- On the laptop: gemini.google.com open and logged in; a new Claude chat open; the two Kit 1 prompts copied from the kit file into a text note.
- Test once in rehearsal that the phone recording reaches the laptop in under a minute (AirDrop, Telegram "Saved Messages", or a cable).

## 2:10-2:14 Why map work first (slides 35-36)

UZ: "Agentga vazifa berishdan oldin, ish qayerga ketyapganini bilishimiz kerak. Buni xodimlaringiz biladi, siz emas."
UZ: "Odamlar qo‘rqsa, ishni yashiradi. Shuning uchun birinchi suhbatdan oldin jamoaga o‘zingiz aytasiz: maqsad ishni xaritaga tushirish, odamlarni almashtirish emas."
Show the "Jamoaga xabar" text at the end of the kit for 20 seconds; it is homework step 1.
The kit also has a recommended written commitment; mention it in one sentence ("tavsiya etiladi") and move on; it is not required by the curriculum.

## 2:14-2:17 Consent in pairs (slide 37)

Pairs read the consent text from Kit 1 form A to each other, once each.
UZ: "Rozilik so‘ralganda «Rozimisiz?» demang: boshliqqa «yo‘q» deyish qiyin. «Yozib olaymi yoki qo‘lda yozaymi?» deb so‘rang."
Mentors listen for "Rozimisiz?" and correct it.

## 2:17-2:23 Live interview (slide 38)

1. Volunteer sits facing the room; the instructor reads the consent, word for word, and the volunteer chooses "yozib oling".
2. Start the recorder and ask four questions from form A, short versions:
   - A.1 "Odatdagi bir ish kuningiz qanday o‘tadi?"
   - A.2 "Hafta davomida eng ko‘p vaqtingizni oladigan uchta vazifa qaysi? Har biriga taxminan necha daqiqa ketadi?"
   - A.5 "Eng ko‘p xatolar qayerda bo‘ladi? Bu xatolar qanchaga tushadi?"
   - A.7 "Agar ertaga sizga yordamchi berishsa, birinchi bo‘lib qaysi vazifani topshirardingiz?"
3. Always ask for one real example ("Oxirgi marta qachon bo‘ldi? Ko‘rsating").
4. Stop at 5 minutes even if the story is good.

## 2:23-2:29 Transcript, prompt, Form B, the wrong number (slides 38-39)

1. Send the audio to the laptop; upload it to gemini.google.com with the kit's transcription prompt ("Audioni matnga aylantirish uchun so‘rov").
   The free Gemini plan accepts up to 10 minutes of audio per prompt (F18); 5 minutes fits.
   Tell the room how to handle the 20-30 minute homework interviews: stop the recorder after A.2, after A.5 or every 8 minutes, whichever comes first, and start a new one, so each part stays under 10 minutes (homework step 2).
2. Copy the transcript into the Claude chat after the kit's "AI chat uchun so‘rov".
3. Show the two parts of the answer: the number-check table first, then Form B (B.1-B.8, B.9 left empty for the owner).
4. Find the spoken range in the number table.
   If the transcript wrote it wrongly, this is the moment; if it wrote it correctly (the kit's transcription prompt asks for numbers in words), show the same moment from `fallback-transkript.md`, where a plain transcription turned «bir uch-to‘rt yuz ming» into 1 300 000.
5. UZ: "Mana: u «bir uch-to‘rt yuz ming» dedi, ya’ni taxminan 300-400 ming. Transkriptda 1 300 000 chiqdi. AI xatoni qizil qilmaydi. Har bir raqamni audio bilan solishtiring."
6. Ask the volunteer two [?] questions from the end of Claude's answer and correct the table live: that is what the employee does at home in step 4 of the kit.
7. Point at B.9: "Buni siz to‘ldirasiz: agent, robot, inson yoki birga. Keyingi hafta shu jadvaldan jarayon tanlaymiz."

## 2:29-2:43 Pairs (slide 40)

Hand out `juftlik-mashqi.pdf`.
Each pair: one interviews for 5 minutes (A.1, A.2, A.5, A.7), transcribes, runs the prompt, corrects at least one number by hand; swap if time.
Mentors check: consent read aloud, numbers checked against the recording, no real colleague names in the chat.

## 2:43-2:45 Check

Hands up: who has a Form B with at least one number corrected by hand.
Mentors note code 1.8 in `mentor-handbook/day-1.md`.

## Language and tone (from the change-management review)

- "ishni yengillashtirish", never "optimizatsiya"; "tejalgan vaqt", never "bo‘shatilgan vaqt".
- Never a joke about firing.
  If an owner makes one: "Hazilligini bilaman. Xodimlaringiz buni reja deb eshitadi. Raqamga qaytamiz."
- On screen and in show-and-tell: the process, not the person; no names.
  If someone names an employee: "Keling, ismni qoldiraylik: jarayon nima qilyapti?"

## Fallbacks

| What fails | Do this |
| --- | --- |
| Nobody volunteers | Interview the briefed mentor about their real job |
| Recording does not reach the laptop | Use the kits' `malika-transcript.md` (two traps) or, if short of time, `fallback-transkript.md`; say honestly that it was prepared |
| Gemini is down or slow | Same; say honestly that this transcript was prepared |
| Claude is down | Show the kits' corrected `malika-form-b.md` (or `namuna-form-b.md` for the short fallback) |
| The room runs late | Skip the swap in pairs; the Form B check moves to the Day 2 mentor check |
