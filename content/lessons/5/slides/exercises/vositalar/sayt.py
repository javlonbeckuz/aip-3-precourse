"""Put a small website on your own subdomain with HTTPS, on the same server as the bot.

Copy this file and sayt-sozlash.sh into your app/deploy/ folder (next to deploy.py), then:

    uv run python deploy/sayt.py forma.barakaoffice.uz examples/lead-form
    uv run python deploy/sayt.py forma.barakaoffice.uz examples/lead-form --test-local

The server comes from DEPLOY_HOST in .env (the same line deploy.py uses), so nobody has to open .env.
The folder must contain index.html. Hidden files (.env, .git, ...) are never uploaded.
Before you run it: add an A record for the subdomain in your domain panel (exercise 03).
--test-local uses Caddy's own test certificate: for practice without a real domain.
"""

from __future__ import annotations

import argparse
import io
import re
import shlex
import sys
import tarfile
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from deploy import APP_DIR, Server, read_deploy_host  # noqa: E402  (deploy.py sits next to this file)

DOMAIN_RE = re.compile(r"^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$")
MAX_BYTES = 20 * 1024 * 1024  # a landing page, not a file store


def clean_domain(raw: str) -> str:
    """'https://Forma.BarakaOffice.uz/' -> 'forma.barakaoffice.uz'; raises ValueError if it is not a domain."""
    d = raw.strip().lower()
    d = re.sub(r"^https?://", "", d).split("/")[0].rstrip(".")
    if not DOMAIN_RE.match(d):
        raise ValueError(f"'{raw}' domen emas. Namuna: forma.barakaoffice.uz")
    return d


def site_files(folder: Path) -> list[Path]:
    """Every file to upload: no hidden files or folders, no Python caches."""
    out = []
    for p in sorted(folder.rglob("*")):
        rel = p.relative_to(folder)
        if not p.is_file() or any(part.startswith(".") or part == "__pycache__" for part in rel.parts):
            continue
        out.append(p)
    return out


def pack(folder: Path) -> Path:
    files = site_files(folder)
    if not any(f.relative_to(folder).as_posix() == "index.html" for f in files):
        raise ValueError(f"{folder} ichida index.html yo'q: saytning bosh sahifasi shu nomda bo'lishi kerak.")
    total = sum(f.stat().st_size for f in files)
    if total > MAX_BYTES:
        raise ValueError(f"Sayt juda katta ({total // 1024 // 1024} MB). Bu vosita kichik sahifalar uchun.")
    buf = io.BytesIO()
    with tarfile.open(fileobj=buf, mode="w:gz") as tar:
        for f in files:
            tar.add(f, arcname=f.relative_to(folder).as_posix())
    out = Path(tempfile.gettempdir()) / "pilot-sayt.tar.gz"
    out.write_bytes(buf.getvalue())
    return out


def main(argv=None) -> int:
    sys.stdout.reconfigure(line_buffering=True)
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("domain", help="subdomain, e.g. forma.barakaoffice.uz")
    p.add_argument("folder", help="folder with index.html, e.g. examples/lead-form")
    p.add_argument("--test-local", action="store_true", help="Caddy's own test certificate, no DNS check")
    p.add_argument("--host", help="root@1.2.3.4 or an ~/.ssh/config alias (default: DEPLOY_HOST in .env)")
    p.add_argument("--port", type=int, help="SSH port if not 22")
    p.add_argument("--env-file", default=str(APP_DIR / ".env"))
    args = p.parse_args(argv)
    try:
        domain = clean_domain(args.domain)
        folder = Path(args.folder)
        if not folder.is_absolute():
            folder = (Path.cwd() / folder).resolve()
        if not folder.is_dir():
            raise ValueError(f"Papka topilmadi: {folder}")
        tarball = pack(folder)
    except ValueError as exc:
        print(exc)
        return 2
    host = args.host or read_deploy_host(Path(args.env_file))
    if not host:
        print("Qaysi server? .env ga DEPLOY_HOST=root@SERVER-IP qatorini qo'shing yoki --host bering.")
        return 2
    server = Server(host, args.port)
    print(f"==> {len(site_files(folder))} ta fayl, {tarball.stat().st_size // 1024} KB: {folder.name} -> https://{domain}")
    server.copy(tarball, "/tmp/pilot-sayt.tar.gz")
    tarball.unlink(missing_ok=True)
    server.copy(HERE / "sayt-sozlash.sh", "/tmp/pilot-sayt-sozlash.sh")
    flag = " --test-local" if args.test_local else ""
    rc = server.root(f"bash /tmp/pilot-sayt-sozlash.sh {shlex.quote(domain)} /tmp/pilot-sayt.tar.gz{flag}; "
                     "rc=$?; rm -f /tmp/pilot-sayt-sozlash.sh /tmp/pilot-sayt.tar.gz; exit $rc", check=False)
    return rc


if __name__ == "__main__":
    sys.exit(main())
