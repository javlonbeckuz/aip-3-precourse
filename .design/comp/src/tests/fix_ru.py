import json
p='i18n_ru.json'; d=json.load(open(p,encoding='utf-8'))
print('old:', d['gate.err.toolong'])
d['gate.err.toolong']='ID состоит из 6 символов. Проверьте его ещё раз.'
json.dump(d,open(p,'w',encoding='utf-8'),ensure_ascii=False,indent=1)
a=open('assemble_post.py',encoding='utf-8').read()
a=a.replace(".slv-bar{flex-wrap:wrap}.slv-all{white-space:nowrap}",".slv-bar{flex-wrap:wrap}.slv-all{white-space:nowrap;margin-left:auto}")
open('assemble_post.py','w',encoding='utf-8').write(a)
