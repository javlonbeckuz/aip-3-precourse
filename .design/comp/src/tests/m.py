import subprocess, sys
from PIL import Image
d = sys.argv[1]; views = sys.argv[2:]
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
for v in views:
    q = 'solo' if v == 'gate' else f'solo&view={v}'
    h = 844 if v == 'gate' else 2600
    open(f'{d}/wrap.html', 'w').write(f'<body style="margin:0;background:#888"><iframe src="http://localhost:8765/comp/index.html?{q}" style="border:0;width:390px;height:{h}px;display:block"></iframe>')
    subprocess.run([chrome, '--headless=new', '--disable-gpu', '--hide-scrollbars', f'--window-size=600,{h}', '--virtual-time-budget=3000', f'--screenshot={d}/m-{v}.png', f'file:///{d}/wrap.html'], capture_output=True)
    im = Image.open(f'{d}/m-{v}.png').convert('RGB').crop((0, 0, 390, h)); px = im.load(); bg = px[5, h-5]; last = h
    for y in range(h-1, 0, -4):
        if any(abs(sum(px[x, y]) - sum(bg)) > 30 for x in range(0, 390, 6)): last = min(h, y+20); break
    im.crop((0, 0, 390, last)).save(f'{d}/m-{v}.png'); print(v, last)
