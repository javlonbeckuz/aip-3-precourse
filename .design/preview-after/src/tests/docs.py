base=r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design'
p=base+r'\ux-spec.md'
s=open(p,encoding='utf-8').read()
def rep(old,new):
    global s
    assert s.count(old)==1,(s.count(old),old[:60])
    s=s.replace(old,new)

rep('''3. **Progress line:** "1 / 4 dars toʻliq bajarildi" (lessons 1–4 only; prep is separate). Per-lesson fractions live on the rows below.''','''3. **Progress ring, top-left of the content, before the greeting:** a radial ring (yellow arc on a thin track) with "1/4" inside, the label "Kurs progressi" and the line "1 / 4 dars toʻliq bajarildi" (lessons 1–4 only; prep is separate). `role="progressbar"`, `aria-valuetext` = the line. Per-lesson fractions live on the rows below.''')
rep('''**Name button**, which opens a sheet with:
  - group ("Shanba guruhi"),
  - mentor,
  - ID,''','''**Name button**, which opens a sheet with (home no longer shows the group, mentor, dates or ID as tags, and "Chiqish" is never in the back-arrow slot):
  - group ("Shanba guruhi"),
  - mentor,
  - course dates ("4 dars · 12 sen – 3 okt"),
  - ID,''')
rep('''- The menu is a sheet, not a route.''','''- The menu is a sheet, not a route.
- **Global links:** "Dastur" and "Amaliyot" only. **"Kitob" has no global link:** the book lives in lesson 4 (its home card and its lesson page), and lessons 0–3 never mention it.

### 1.1 New-lesson popup (replaces the old Telegram notice)
A student learns that a lesson opened from an on-screen popup the first time they open the portal after it opened.
- **When:** the SERVER decides "a lesson opened since this student's last visit" (it knows the last-seen lesson per student). The comp fakes it: it shows after a login and with `?view=dastur&newlesson`, and remembers a dismissal per lesson in `localStorage` (`aip3.nl.seen`). Production stores "seen" server-side.
- **Content:** eyebrow "Yangi dars ochildi", title "3-dars · Skill va agentlar", primary "Darsni ochish" (goes to the lesson), secondary "Yopish".
- **Placement:** fixed, top-left. Desktop: 380px wide, 16px from the top and 24px from the left, over the nav links, so the progress ring and the greeting stay clear. Phones: full width minus 16px gutters, 72px from the top (below the nav). It never fills the screen.
- **Behaviour:**
  - It fades and slides in (≈350ms, eased); with reduced motion it just appears.
  - It does NOT take focus.
  - It is announced through the polite live region: "Yangi dars ochildi: 3-dars, Skill va agentlar."
  - It stays until dismissed, with no timer, because a student may miss it.
  - It closes with "Yopish" (focus goes to the page heading), with Esc, or when the lesson is opened. Closing or opening records it as seen.
  - Signing out hides it without recording.
- **Look:** a flat white card, black text, a 1px black ring, 15px radius. White is the only colour that stands out on black and on every card colour (blue, grey, yellow, lilac).''')

rep('''| 1 | slides + Vazifa + core exercises 01, 02, 03A **or** 03B, 04 = **6** (05 and 06 are extra and not counted) |
| 2 | slides + Vazifa + Amaliyot = **3** |''','''| 1 | slides + core exercises 01, 02, 03A **or** 03B, 04 + Vazifa = **6** (05 and 06 are extra and not counted) |
| 2 | slides + Amaliyot + Vazifa = **3** |''')
rep('''**State chips:**

| State | Chip text | Notes |
|---|---|---|
| prep | "12-sentabrgacha · 3/4" before lesson 1, then "3/4 tayyor" | |
| done | "Bajarildi" | |
| live | "Davom etmoqda" | the only animated element on the page |
| open | "Ochiq · 3/6" | |
| locked | the date, "3-oktabr" | |''','''**State chips** (in the comp: an outline pill inside the big folder card, `.st`, with the unit written out):

| State | Chip text | Notes |
|---|---|---|
| prep | "Tayyor · 4/4" | |
| done | "Bajarildi · 3/3 qadam" | |
| live | "Davom etmoqda" | the live lesson is the big blue card at the top of home; in the list its card turns grey with a FILLED pill "Hozir · 0/2 qadam", so it is not shown twice as an equal card |
| open | "Ochiq · 3/6 qadam" | |
| locked | "3-oktabrda ochiladi" + what opens ("Amaliyot kartalari va kurs kitobi dars kuni shu yerda chiqadi") | tappable: opens the §3.2 sheet |''')
rep('''| Slaydlar | "78 ta slayd · video" | "Koʻrildi" |
| Vazifa | "Ravon Uy — NotebookLM mashqi" | "5/8" |
| Amaliyot | "Korxona bilimini ishga soling." | "2/4 mashq" |
| Kitob | lesson 4 only | |''','''| Slaydlar | "78 ta slayd · video" | "Koʻrildi" |
| Amaliyot | "Korxona bilimini ishga soling." | "2/4 mashq" |
| Vazifa | "Ravon Uy — NotebookLM mashqi" | "5/8" |
| Kitob | lesson 4 only | |

**Order everywhere: Slaydlar · Amaliyot · Vazifa (· Kitob in lesson 4).** In the comp these are the three tabs of the gooey folder, each with a status line ("✓ koʻrildi", "2/4", "5/8"). A pane's action is words first, then the circle ("Davom etish · 01 · P3 Vaziyatli test" ◯→), and the whole link is the target. Lessons 1–3 have no Kitob tab, tag or row.''')
rep('''2. **Undo:**
   - the toast "P3 bajarildi · **Bekor qilish**" stays 5 s;''','''2. **Undo:**
   - the comp's control is a circle + the word "Nusxalash" (one button), and the done mark is a chip under the title: filled "Bajarildi" when marked, outline "Bajarildi deb belgilash" when not. The chip is the toggle.
   - the toast "P3 bajarildi · **Bekor qilish**" stays 5 s (pauses while it has focus);''')
open(p,'w',encoding='utf-8').write(s)

p=base+r'\tokens.md'
s=open(p,encoding='utf-8').read()
s+='''
## Patterns added 2026-10-16 (UX audit pass; canonical CSS in `comp/index.html`)
- **State pill `.st`** (lesson cards): the tag pill drawn in the card's ink: `currentColor` 1px outline, radius 999, min-height 30 (desktop `max(30px, 34u)`), Golos 500 13px UPPERCASE, `margin-top:10`. `.st.now` is the filled variant (`--f-ink` fill, `--f-bg` text), used only for the live lesson's repeat in the list. The date stays in the plain label above it ("1-dars · 12-sentabr").
- **Hero card (home)**: the live lesson as a flat blue card `.folder.flatc.c-blue.now-card` under the greeting, with a bigger title (26px, desktop 44u). **Blue appears once per screen** (the hero), so in the list the live lesson is grey with a filled pill. Desktop: the card sits right (560u), the greeting left.
- **Progress ring `.prog`**: SVG circle r=42 in a 100 box, `pathLength=100`. Track: `rgb(255 255 255 / .12)`, stroke 4. Arc: `--yellow`, stroke 9, round caps, from 12 o'clock clockwise. It animates `stroke-dasharray` 0 → value in .9s `--ease`; reduced motion shows the final value. Centre: display 500, "1/4". Beside it: a muted 13px label and a 17px line. Ring 88px on phones, `max(96px, 150u)` on desktop. Flat: no glow.
- **Project background** (dastur, dars and ex `.site`, not the sign-in photo): a 1px grid of `rgb(255 255 255 / .05)` (cells 48x32 on phones, 96u x 64u on desktop), a violet glow from the top right (`rgb(130 104 214 / .24)` fading to transparent over 5 stops, so it does not band), and a floor that goes from black at 40% to `#0b0830` and `#140c47`. Cards are opaque, so the grid shows only on the canvas.
- **Copy control + done chip** (lilac prompt list): circle 48 (desktop 56) + the word "Nusxalash" (Golos 500 11px UPPERCASE) in ONE button; after a copy the word reads "Nusxalandi" for 2s. Done chip `.chip`: 24px high, radius 999, filled black with lilac text "Bajarildi" ✓, or outline "Bajarildi deb belgilash"; a 44px hit area via `::after`. "Qayerga:" is Golos 500 15px, black, with a 600 label.
- **Undo toast `.toast`**: fixed bottom-centre, max 420, black, 1px `--hair`, radius 999, min-height 48. Text "01 bajarildi" + a "Bekor qilish" button (44px high, underlined). It stays 5s and pauses on focus. It is announced through the live region, not through its own `role`.
- **New-lesson popup `.nl`**: a flat white card, 1px black ring, radius 15, padding 18. Eyebrow Golos 500 12px UPPERCASE `#595959`, title display 500 17px UPPERCASE, a black pill "Darsni ochish ›" and an outline pill "Yopish" (both 44px). Fixed top-left: desktop top 16 / left 24 / width 380, phones full width minus 16px at 72px from the top. Enter: opacity + 12px slide, .35s. Behaviour: `ux-spec.md` §1.1.
- **Name menu `.nmenu`**: a black card with a 1px `--hair` border, radius 15, fixed under the trigger (desktop 340px wide, right-aligned; phones full width minus 16px). It holds the name, a definition list (ID in Martian, group, mentor, dates), UZ/RU/EN, and an outline pill "Chiqish".
- **Locked sheet `.sheet`**: a native `<dialog>`, a bottom sheet on phones (radius 24 24 0 0) and centred from 700px, `--dark` fill, backdrop `rgb(0 0 0 / .6)`, a 48px outline "Yopish" pill.
- **Login error strip** `.mx-help.err`: Golos 500 14px `--danger` on `rgb(0 0 0 / .78)`, with a ⚠ icon. It is out of flow under the field, so the button never moves.
- **File row `.ef-row`**: the whole row is the link (min 60px); the name is white, the meta is Martian 12px `#8A8A90`, and a 40px outline download circle sits at the right.
- **Pane action** (lilac folder panes): words first, then the 44px circle, right-aligned, Golos 16px; the whole link is the target.
'''
rep2=s.replace("Card colours carry meaning: blue = now, yellow = you, grey = material, dark = locked.","Card colours carry meaning: blue = now (once per screen), yellow = you / prep, grey = material, dark = locked.")
s=rep2
open(p,'w',encoding='utf-8').write(s)
print('ok')
