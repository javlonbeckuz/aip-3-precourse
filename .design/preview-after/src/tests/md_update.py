import sys
p = sys.argv[1]
s = open(p, encoding='utf8').read()


def rep(old, new):
    global s
    assert s.count(old) == 1, old[:70]
    s = s.replace(old, new)


rep('| a visual prefix. The code requires exactly 6 characters, so the short ID `XM` gets "Yana 4 ta belgi kiriting." | ⚠️ It contradicts the 3.0 rule that short IDs still log in. | 6 |',
    '| a visual prefix. ~~The code requires exactly 6 characters, so `XM` is refused.~~ **STALE (re-audit):** short IDs now log in on Enter/KIRISH. | ✅ now. Real IDs are `AIP-` + 6, so the prefix tells the truth. | 6 |')
rep('Replace "3 ta qadam qoldi" with the 3 remaining steps by name: "Qoldi: Amaliyot 01 · Amaliyot 04 · Vazifa". Each is a link (48px rows) or a plain line.',
    'Replace "3 ta qadam qoldi" with the 3 remaining steps by name, as **one plain line**: "Qoldi: Amaliyot 01, Amaliyot 04, Vazifa".\n'
    '  - Not link rows (re-audit): the tabs above already hold "Davom etish" for each, so rows with → would be a second style of the same action.')
rep('### #6 ⚠️ Login: the placeholder looks typed, and "AIP-" shuts out short IDs',
    '### #6 ⚠️ Login: the placeholder looks typed (the short-ID half is STALE)')
rep('''  - Drop the fixed "AIP-" prefix: the field already accepts it typed or pasted.
  - Short IDs submit on Enter (2.0 rule: "Enter for short IDs"). The error "Yana N ta belgi kiriting." shows only after Enter, and only if the server rejects the ID.''',
    '''  - Keep the "AIP-" prefix (re-audit: it was only a problem while short IDs failed).
  - ~~Short IDs submit on Enter.~~ **Done in the comp:** `XM` logs in on Enter/KIRISH, never on auto-submit.''')
rep('''  - A student with a hand-assigned ID like `XM` cannot log in at all.
- **2.0 check:** fails today. It contradicts "short IDs like XM still log in" (blueprint §4).''',
    '''  - ~~A student with `XM` cannot log in.~~ Stale.
- **2.0 check:** passes now (blueprint §4: short IDs log in on Enter).''')
rep('''  - The pane follows the other two: label "78 ta slayd · video", a big numeral, "Hammasi koʻrildi." and the action "Qaytadan koʻrish ▶".
  - For a lesson in progress, show "14 / 40" + "Davom etish · 14-slayd".''',
    '''  - The pane follows the other two: label "Slaydlar · video", the big "78" with its unit under it ("ta slayd, hammasi koʻrildi."), and the action "Qaytadan koʻrish ▶". The count appears once (re-audit: the first draft had "78" in the label and in the numeral).
  - For a lesson in progress, show "14/40" + "Davom etish · 14-slayd". **Size note:** five characters at the 120px phone numeral are about 340px, wider than the about 260px pane at 320, so a 5-character value needs a smaller numeral (about 72px).''')
rep('''  - `tokens.md` already names "Mark-done = native checkbox, `accent-color: ink`" for prompt cards.''',
    '''  - `tokens.md` already names "Mark-done = native checkbox, `accent-color: ink`" for prompt cards.
  - The same control everywhere a prompt is marked (re-audit: the #3 panel first showed the old chip as its fix, so the page proposed two different done marks).''')
rep('- **Fix:** make real. Yellow while prep is unfinished ("3/4 tayyor"); grey once it is 4/4, like done lesson 2.',
    '- **Fix:** make real. Yellow while prep is unfinished ("Ochiq · 3/4 qadam"); grey once it is 4/4, with the same pill as done lesson 2: **"Bajarildi · 4/4 qadam"**.\n'
    '  - Re-audit: the first draft kept "Tayyor · 4/4" on the grey card. That gave "done" two words on one screen ("Tayyor" next to lesson 2\'s "Bajarildi"), and the only fraction with no unit.')

REAUDIT = open(sys.argv[2], encoding='utf8').read()
rep('## Could not decide / for the user', REAUDIT + '\n## Could not decide / for the user')
open(p, 'w', encoding='utf8').write(s)
print('ok')
