# Bakes login-art.jpg into an ASCII grid (login-ascii.json) + a PNG preview.
import sys, json
from PIL import Image, ImageFilter, ImageDraw, ImageFont
import numpy as np
COLS=int(sys.argv[1]) if len(sys.argv)>1 else 150
LINE_T=float(sys.argv[2]) if len(sys.argv)>2 else 0.06
src=Image.open('login-art.jpg').convert('RGB')
CELL_AR=0.6/1.15   # mono glyph width / line height
rows=round(COLS*src.height/src.width*CELL_AR)
g=src.convert('L')
def arr(im,box=True): return np.asarray(im.resize((COLS,rows),Image.BOX if box else Image.LANCZOS),float)/255
L=arr(g)
dog=np.asarray(g.filter(ImageFilter.GaussianBlur(1.5)),float)-np.asarray(g.filter(ImageFilter.GaussianBlur(18)),float)
dogI=Image.fromarray(np.clip(dog+128,0,255).astype('uint8')).filter(ImageFilter.MinFilter(5))
def blockmin(im):                              # min over each cell, so 1px pencil lines survive
  a=np.asarray(im,float)/255; H,W=a.shape
  ys=np.linspace(0,H,rows+1).astype(int); xs=np.linspace(0,W,COLS+1).astype(int)
  return np.array([[a[ys[j]:ys[j+1],xs[i]:xs[i+1]].min() for i in range(COLS)] for j in range(rows)])
D=blockmin(dogI)-128/255                       # negative = thin dark line
C=np.asarray(src.resize((COLS,rows),Image.BOX),float)
rgb=np.asarray(src,float); warmth=Image.fromarray(np.clip(rgb[...,0]-rgb[...,2],0,255).astype('uint8'))
W=1-blockmin(Image.fromarray(255-np.asarray(warmth)))*1   # block max of (r-b): catches small ochre paint dabs
white=Image.fromarray(np.clip((rgb.min(-1)-200)*4,0,255).astype('uint8'))
Wh=1-blockmin(Image.fromarray(255-np.asarray(white)))     # block max of near-white dabs
BG=arr(g.filter(ImageFilter.GaussianBlur(120)))
Lc=L-0.85*BG                                   # flatten the top-left light falloff, keep the shadow
lo,hi=np.percentile(Lc,3),np.percentile(Lc,97); T=np.clip((Lc-lo)/(hi-lo),0,1)
gy,gx=np.gradient(np.asarray(g.filter(ImageFilter.GaussianBlur(3)).resize((COLS,rows),Image.BOX),float))
ramp=" .:-=+*#%@"
chars=[];warm=[]
for y in range(rows):
  cl=[];wl=[]
  for x in range(COLS):
    r,gg,b=C[y,x]; w=(r-b)>38 and r>110
    edge=x<2 or y<2 or x>=COLS-2 or y>=rows-2
    dot=not edge and T[y,x]>0.2 and not w and (W[y,x]>0.33 or Wh[y,x]>0.5)
    if dot:                                    # painted network node
      cl.append('o' if W[y,x]>0.33 else '*'); wl.append('w' if W[y,x]>0.33 else 'l'); continue
    if not edge and D[y,x]<-LINE_T and T[y,x]>0.25:        # pencil line on the wall -> stroke glyph along the line
      a=(np.degrees(np.arctan2(gy[y,x],gx[y,x]))+180)%180   # gradient dir; line is perpendicular
      c='|' if a<22.5 or a>=157.5 else (chr(92) if a<67.5 else ('-' if a<112.5 else '/'))
      k='l'
    else:
      t=T[y,x]**1.4; c=ramp[min(9,int(t*10))]; k='w' if w else 'c'
    if w: k='w'
    cl.append(c); wl.append(k)
  chars.append(''.join(cl)); warm.append(''.join(wl))
json.dump({'cols':COLS,'rows':rows,'chars':chars,'kind':warm},open('login-ascii.json','w'),separators=(',',':'))
# preview
cw,ch=8,15; img=Image.new('RGB',(COLS*cw,rows*ch)); d=ImageDraw.Draw(img); f=ImageFont.truetype('consola.ttf',13)
col={'c':(232,226,211),'w':(214,160,80),'l':(255,255,255)}
for y in range(rows):
  for x in range(COLS):
    c=chars[y][x]
    if c==' ':continue
    k=warm[y][x]; base=col[k]; a=1 if k=='l' else 0.3+0.7*(ramp.index(c)/9 if c in ramp else 1)
    d.text((x*cw,y*ch),c,fill=tuple(int(v*a) for v in base),font=f)
img.save('ascii/preview.png'); print(COLS,rows)
