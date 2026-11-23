# Demo 03: domain, DNS and HTTPS in one picture (0:36-0:41)

Curriculum Day 4 demo 3: "Point a subdomain at the VPS and get HTTPS."
Deck slides 16 (the diagram) and 17 (four words).
The diagram is `diagramma.html` (standalone, fonts inlined, works offline) and `diagramma.png`; the source is `../../_build/diagram/dns.svg`, built by `_build/diagram/build_diagram.py`.
Instructor notes in English; lines marked UZ are said to the room.

## Before class (Thursday or Friday, 20 minutes plus DNS time)

1. In your registrar panel add an A record for a demo subdomain, e.g. `forma` → the demo server’s IP.
   Do it at least a day ahead: DNS can take hours to reach every resolver.
2. Check: `nslookup forma.<demo-domain> 1.1.1.1` returns the IP.
3. From the demo `app/` folder (the domain tools copied into `app/deploy/`, exercise 03):

   ```text
   uv run python deploy/sayt.py forma.<demo-domain> sayt
   ```

   The last line must be `==> Tayyor: https://forma.<demo-domain> ochiladi (HTTPS, qulf belgisi bilan).`
4. Open the address on your phone over mobile data (not the venue Wi-Fi) and confirm the padlock.
   Keep that tab open for the class day.

## On stage

1. Slide 16, walk the colours in this order (2 minutes):
   - **Blue, the website:** the customer types a name; 1. the phone asks DNS "where is it?"; 2. DNS answers with the number; 3. the phone connects to Caddy on the server, with the padlock; Caddy got the certificate from Let’s Encrypt by itself.
   - **Green, the assistant:** the bot goes to Telegram by itself and takes its messages; no open port, no domain.
   - **Grey, you:** the laptop logs in with a key (SSH 22) and deploys.

   UZ: "Domen - serverning ismi. DNS - telefon kitobi: ism va raqam. Mijoz ismni yozadi, kitob raqamni beradi, brauzer serverga qulf bilan ulanadi. Bot esa bu yo‘ldan yurmaydi: u Telegram’ga o‘zi boradi. Shuning uchun assistent uchun domen shart emas."

2. Phone on screen: open `https://forma.<demo-domain>`, tap the padlock, show "Let’s Encrypt".
   UZ: "Qulfsiz formaga mijoz telefon raqamini yozmaydi."

3. Slide 17, optional 60 seconds, the habit of the day ("Explain like I am 5") in Claude:

   ```text
   Nginx nima? Besh yoshli bolaga tushuntir, 3 gapda. Caddy bilan farqi nima?
   ```

## Facts used (checked 2026-11-03)

- Caddy obtains and renews certificates automatically when the domain’s A/AAAA records point to the server and ports 80 and 443 are reachable; if issuance fails it retries with backoff (up to a day between attempts, for 30 days): https://caddyserver.com/docs/automatic-https
- Let’s Encrypt certificates are 90 days today; the default moves to 64 days on 10 Feb 2027 and 45 days on 16 Feb 2028: https://letsencrypt.org/2025/12/02/from-90-to-45/
- Caddy official Debian/Ubuntu install (the commands `sayt-sozlash.sh` runs): https://caddyserver.com/docs/install
- In testing, the tool ran on fresh Ubuntu 24.04 and 26.04 containers and served the Day 3 lead form over HTTPS with Caddy’s internal test certificate (`--test-local`), survived a restart, and printed the "DNS not ready" guidance when the name did not resolve (`../../exercises/namuna/natijalar/10-sayt-test.txt`, `10b-sayt-dns-tayyor-emas.txt`).
  A real Let’s Encrypt certificate was not obtained in testing (no public domain in a container).

## Fallback

- DNS or the demo site fails on the day: show the diagram only and say the padlock part is in exercise 03; it is an extension, not core.
- Projector cannot render the deck: open `diagramma.html` directly; on a phone it scrolls sideways.
