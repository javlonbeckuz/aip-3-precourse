p='proto_app.js'; s=open(p,encoding='utf-8').read()
old="t('row.mark', {d: exCount(k)[0], t: exCount(k)[1]})"
assert old in s
s=s.replace(old,"t('row.mark', {d: exCount(k)[0], t: exCount(k)[1], pl: exCount(k)[1]})")
open(p,'w',encoding='utf-8').write(s)
