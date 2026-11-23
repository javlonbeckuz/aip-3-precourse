#!/usr/bin/env bash
# Puts a small static website on your own subdomain with HTTPS, on the same server as the pilot bot.
# Uses Caddy (https://caddyserver.com): it gets the certificate from Let's Encrypt by itself and renews it.
# sayt.py runs this for you. By hand, as root on the server:
#   bash sayt-sozlash.sh forma.barakaoffice.uz /tmp/sayt.tar.gz
#   bash sayt-sozlash.sh forma.barakaoffice.uz /tmp/sayt.tar.gz --test-local   (no public DNS: Caddy's own test certificate)
# Safe to run again: it replaces the site files and the Caddy config, nothing else.
set -euo pipefail

say() { printf '\n==> %s\n' "$*"; }
warn() { printf 'DIQQAT: %s\n' "$*"; }

DOMAIN="${1:-}"
TARBALL="${2:-}"
TEST_LOCAL=0
for arg in "${@:3}"; do
  case "$arg" in
    --test-local) TEST_LOCAL=1 ;;
    *) echo "Noma'lum parametr: $arg"; exit 2 ;;
  esac
done

[[ $EUID -eq 0 ]] || { echo "root sifatida ishga tushiring (sayt.py buni o'zi qiladi)"; exit 1; }
if [[ -z "$DOMAIN" || -z "$TARBALL" ]]; then
  echo "Foydalanish: bash sayt-sozlash.sh SUBDOMEN SAYT.tar.gz [--test-local]"; exit 2
fi
# Lower-case letters, digits, hyphens and dots only, at least one dot: forma.barakaoffice.uz
if ! [[ "$DOMAIN" =~ ^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$ ]]; then
  echo "Domen noto'g'ri yozilgan: '$DOMAIN'. Namuna: forma.barakaoffice.uz (https:// va / belgisisiz)"; exit 2
fi
[[ -f "$TARBALL" ]] || { echo "Sayt arxivi topilmadi: $TARBALL"; exit 2; }

SITE_DIR="/var/www/sayt"
CADDYFILE="/etc/caddy/Caddyfile"

say "1/5 Caddy (veb-server, HTTPS sertifikatini o'zi oladi)"
if ! command -v caddy >/dev/null 2>&1; then
  export DEBIAN_FRONTEND=noninteractive
  # Official Debian/Ubuntu instructions: https://caddyserver.com/docs/install (checked 2026-11-03)
  apt-get update -q
  apt-get install -y -q debian-keyring debian-archive-keyring apt-transport-https curl gnupg >/dev/null
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
    | gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    > /etc/apt/sources.list.d/caddy-stable.list
  chmod o+r /usr/share/keyrings/caddy-stable-archive-keyring.gpg /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -q
  apt-get install -y -q caddy >/dev/null
fi
caddy version

say "2/5 Firewall: 80 va 443 portlarini ochamiz (sayt uchun); SSH avvalgidek ochiq"
if command -v ufw >/dev/null 2>&1 && ufw status 2>/dev/null | grep -q "Status: active"; then
  ufw allow 80/tcp >/dev/null
  ufw allow 443/tcp >/dev/null
  ufw status | grep -E "^(80|443|OpenSSH|22)" || true
else
  warn "ufw yoqilmagan yoki yo'q. Avval: deploy.py setup"
fi

say "3/5 Sayt fayllari: $SITE_DIR"
TMP_DIR="$(mktemp -d)"
tar -xzf "$TARBALL" -C "$TMP_DIR"
if [[ ! -f "$TMP_DIR/index.html" ]]; then
  rm -rf "$TMP_DIR"
  echo "Arxivda index.html yo'q: sayt papkasida bosh sahifa index.html bo'lishi kerak."; exit 3
fi
install -d -m 755 "$SITE_DIR"
find "$SITE_DIR" -mindepth 1 -delete
cp -R "$TMP_DIR"/. "$SITE_DIR"/
rm -rf "$TMP_DIR" "$TARBALL"
chmod -R a+rX "$SITE_DIR"
echo "$(find "$SITE_DIR" -type f | wc -l) ta fayl joylandi."

say "4/5 Caddy sozlamasi: $DOMAIN"
if [[ -f "$CADDYFILE" && ! -f "$CADDYFILE.asl" ]]; then cp "$CADDYFILE" "$CADDYFILE.asl"; fi
{
  echo "# sayt-sozlash.sh yozgan. Asl fayl: $CADDYFILE.asl"
  if [[ $TEST_LOCAL -eq 1 ]]; then
    printf '{\n\tskip_install_trust\n}\n\n'
  fi
  echo "$DOMAIN {"
  if [[ $TEST_LOCAL -eq 1 ]]; then printf '\ttls internal\n'; fi
  printf '\troot * %s\n' "$SITE_DIR"
  printf '\tencode zstd gzip\n'
  printf '\tfile_server\n'
  echo "}"
} > "$CADDYFILE.yangi"
if ! caddy validate --config "$CADDYFILE.yangi" --adapter caddyfile >/dev/null 2>&1; then
  caddy validate --config "$CADDYFILE.yangi" --adapter caddyfile || true
  rm -f "$CADDYFILE.yangi"
  echo "Caddy sozlamasi xato: hech narsa o'zgarmadi."; exit 4
fi
mv "$CADDYFILE.yangi" "$CADDYFILE"
systemctl enable caddy >/dev/null 2>&1
systemctl reload caddy 2>/dev/null || systemctl restart caddy
systemctl is-active caddy

say "5/5 Tekshiruv: DNS va HTTPS"
SERVER_IPS="$(hostname -I 2>/dev/null || true)"
DNS_IP="$(getent ahostsv4 "$DOMAIN" 2>/dev/null | awk 'NR==1 {print $1}' || true)"
PUBLIC_IP=""
if [[ $TEST_LOCAL -eq 0 && ( -z "$DNS_IP" || " $SERVER_IPS " != *" $DNS_IP "* ) ]]; then
  # Only when needed: some providers put the public address behind NAT, so ask once from outside.
  PUBLIC_IP="$(curl -4 -s --max-time 5 https://api.ipify.org 2>/dev/null || true)"
fi
DNS_OK=0
if [[ $TEST_LOCAL -eq 1 ]]; then
  echo "Test rejimi: DNS tekshirilmaydi, sertifikat Caddy'ning o'zidan (brauzer uni tanimaydi)."
  DNS_OK=1
elif [[ -z "$DNS_IP" ]]; then
  warn "$DOMAIN hali hech qaysi IP manzilga qaramayapti (DNS yozuvi yo'q yoki hali tarqalmagan)."
  echo "Domen panelida A yozuvi qo'shing: nom = $(echo "$DOMAIN" | cut -d. -f1), qiymat = ${PUBLIC_IP:-serveringiz IP manzili}."
elif [[ " $SERVER_IPS $PUBLIC_IP " == *" $DNS_IP "* ]]; then
  echo "DNS: $DOMAIN -> $DNS_IP (shu server). To'g'ri."
  DNS_OK=1
else
  warn "$DOMAIN boshqa manzilga qarayapti: $DNS_IP. Bu serverning manzili: ${PUBLIC_IP:-$SERVER_IPS}"
  echo "Domen panelidagi A yozuvini tuzating."
fi

CODE="000"
if [[ $DNS_OK -eq 1 ]]; then
  CURL=(curl -s -o /dev/null -w '%{http_code}' --max-time 10)
  if [[ $TEST_LOCAL -eq 1 ]]; then CURL+=(-k --resolve "$DOMAIN:443:127.0.0.1"); fi
  for _ in $(seq 1 12); do
    CODE="$("${CURL[@]}" "https://$DOMAIN/" || true)"
    [[ "$CODE" == "200" ]] && break
    sleep 5
  done
fi

if [[ "$CODE" == "200" && $TEST_LOCAL -eq 1 ]]; then
  say "Tayyor (test rejimi): sayt HTTPS bilan javob beryapti, lekin sertifikat faqat sinov uchun."
  echo "Haqiqiy domen bilan --test-local siz qayta ishga tushiring: shunda Let's Encrypt sertifikati olinadi."
elif [[ "$CODE" == "200" ]]; then
  say "Tayyor: https://$DOMAIN ochiladi (HTTPS, qulf belgisi bilan)."
  echo "Sertifikatni Caddy o'zi yangilab turadi. Telefoningizda ham oching."
else
  say "Caddy sozlandi, lekin https://$DOMAIN hali ochilmadi."
  echo "DNS tayyor bo'lishi bilan Caddy sertifikatni o'zi oladi: qayta ishga tushirish shart emas."
  echo "Bir necha soatdan keyin brauzerda oching. Holat: journalctl -u caddy -n 30 --no-pager"
fi
