p='assemble.py'
L=open(p,encoding='utf-8').read().split('\n')
i=[k for k,l in enumerate(L) if l.startswith('s=s[:a]+t+"')][0]
j=[k for k in range(i,i+8) if L[k].endswith('+s[b:]')][0]
BS=chr(92)
L[i:j+1]=['s=s[:a]+t+"'+BS+'n"+i18n+"'+BS+'n"+data+"'+BS+'n"+app+"'+BS+'n"+s[b:]']
open(p,'w',encoding='utf-8').write('\n'.join(L))
print(L[i])
