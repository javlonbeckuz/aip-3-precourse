P = r'C:\Users\User\vs code\HEAD projects\praktikum3-precourse-platform\.design\comp\src\assemble_post.py'
s = open(P, encoding='utf-8').read()
def rep(old, new, cnt=1):
    global s
    assert s.count(old) == cnt, (s.count(old), old[:100])
    s = s.replace(old, new)

# gateMsg takes a message as [key, params] so the error can be re-rendered when the language changes
rep("""\"gateMsg(t('gate.err.toolong')\"""", """\"gateMsg(['gate.err.toolong']\"""")
rep("""\"gateMsg(t('gate.err.badchars')\"""", """\"gateMsg(['gate.err.badchars']\"""")
rep("""\"gateMsg(t('gate.err.short', {n: 6 - c.length, pl: 6 - c.length})\"""", """\"gateMsg(['gate.err.short', {n: 6 - c.length, pl: 6 - c.length}]\"""")
rep("""\"gateMsg(t('gate.err.unknown_short')\"""", """\"gateMsg(['gate.err.unknown_short']\"""")
rep("""\"gateMsg(t('gate.err.notfound')\"""", """\"gateMsg(['gate.err.notfound']\"""")
rep("""\"gateMsg(t('gate.welcome', {name: STUDENT_FIRST}), 'ok');\")""", """\"gateMsg(['gate.welcome', {name: STUDENT_FIRST}], 'ok');\")
    GATE_OLD = \"\"\"function gateMsg(text, state){
  if (state === 'err') {\"\"\"
    rep(GATE_OLD, \"\"\"let gateCur = null;   // the message on screen as {m: [key, params], state}: re-rendered when the language changes (the error stays, in the new language)
function gateRelang(){ if (gateCur) gateMsg(gateCur.m, gateCur.state); }
function gateMsg(m, state){
  gateCur = Array.isArray(m) ? {m, state} : null;
  const text = Array.isArray(m) ? t(m[0], m[1]) : m;
  if (state === 'err') {\"\"\")""")
open(P, 'w', encoding='utf-8').write(s)
