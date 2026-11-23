"""Offline tests for the Day 4 domain tool (exercises/vositalar/sayt.py and sayt-sozlash.sh).

Run:  uv run --with pytest python -m pytest day-4/_build/tests -q
sayt.py imports deploy.py from its own folder, exactly as in a participant's app/deploy/,
so each test builds that folder in a temp dir from the pilot-template copy in _build/sandbox.
"""

from __future__ import annotations

import importlib
import shutil
import subprocess
import sys
import tarfile
from pathlib import Path

import pytest

HERE = Path(__file__).resolve().parent
DAY4 = HERE.parent.parent
TOOLS = DAY4 / "exercises" / "vositalar"
TEMPLATE_DEPLOY = DAY4 / "_build" / "sandbox" / "work" / "kompaniya" / "app" / "deploy" / "deploy.py"


@pytest.fixture()
def sayt(tmp_path, monkeypatch):
    if not TEMPLATE_DEPLOY.exists():
        pytest.skip("run _build/sandbox/make_sandbox.py first (copies the pilot template)")
    deploy_dir = tmp_path / "app" / "deploy"
    deploy_dir.mkdir(parents=True)
    shutil.copy(TEMPLATE_DEPLOY, deploy_dir / "deploy.py")
    shutil.copy(TOOLS / "sayt.py", deploy_dir / "sayt.py")
    shutil.copy(TOOLS / "sayt-sozlash.sh", deploy_dir / "sayt-sozlash.sh")
    monkeypatch.syspath_prepend(str(deploy_dir))
    for name in ("sayt", "deploy"):
        sys.modules.pop(name, None)
    return importlib.import_module("sayt")


def make_site(root: Path, with_index=True) -> Path:
    site = root / "sayt"
    (site / "img").mkdir(parents=True)
    if with_index:
        (site / "index.html").write_text("<h1>Baraka Office</h1>", encoding="utf-8")
    (site / "img" / "logo.svg").write_text("<svg/>", encoding="utf-8")
    (site / ".env").write_text("TELEGRAM_BOT_TOKEN=secret", encoding="utf-8")
    (site / ".git").mkdir()
    (site / ".git" / "config").write_text("[core]", encoding="utf-8")
    (site / "__pycache__").mkdir()
    (site / "__pycache__" / "x.pyc").write_bytes(b"\0")
    return site


@pytest.mark.parametrize("raw,clean", [
    ("forma.barakaoffice.uz", "forma.barakaoffice.uz"),
    ("https://Forma.BarakaOffice.uz/", "forma.barakaoffice.uz"),
    (" http://bot.sodiqschool.uz/index.html ", "bot.sodiqschool.uz"),
    ("forma.barakaoffice.uz.", "forma.barakaoffice.uz"),
])
def test_clean_domain_accepts(sayt, raw, clean):
    assert sayt.clean_domain(raw) == clean


@pytest.mark.parametrize("raw", ["barakaoffice", "203.0.113.10", "forma barakaoffice.uz", "-forma.uz", "", "forma.uz;rm -rf /"])
def test_clean_domain_rejects(sayt, raw):
    with pytest.raises(ValueError):
        sayt.clean_domain(raw)


def test_site_files_skip_hidden_and_caches(sayt, tmp_path):
    site = make_site(tmp_path)
    names = [p.relative_to(site).as_posix() for p in sayt.site_files(site)]
    assert names == ["img/logo.svg", "index.html"]


def test_pack_contains_only_site_files(sayt, tmp_path):
    site = make_site(tmp_path)
    tarball = sayt.pack(site)
    with tarfile.open(tarball) as tar:
        members = sorted(m.name for m in tar.getmembers())
    tarball.unlink()
    assert members == ["img/logo.svg", "index.html"]


def test_pack_needs_index_html(sayt, tmp_path):
    site = make_site(tmp_path, with_index=False)
    with pytest.raises(ValueError, match="index.html"):
        sayt.pack(site)


def test_main_without_host_stops_with_a_clear_message(sayt, tmp_path, capsys):
    site = make_site(tmp_path)
    env = tmp_path / ".env"
    env.write_text("OWNER_CHAT_ID=1\n", encoding="utf-8")
    rc = sayt.main(["forma.barakaoffice.uz", str(site), "--env-file", str(env)])
    assert rc == 2
    assert "DEPLOY_HOST" in capsys.readouterr().out


def test_main_bad_domain_does_not_touch_the_server(sayt, tmp_path, monkeypatch, capsys):
    site = make_site(tmp_path)
    called = []
    monkeypatch.setattr(sayt, "Server", lambda *a, **k: called.append(a))
    rc = sayt.main(["https://", str(site), "--host", "vps"])
    assert rc == 2 and not called
    assert "domen emas" in capsys.readouterr().out


def test_main_uploads_and_runs_the_script(sayt, tmp_path, monkeypatch):
    site = make_site(tmp_path)
    log = []

    class FakeServer:
        def __init__(self, host, port):
            log.append(("host", host, port))

        def copy(self, local, remote):
            log.append(("copy", Path(local).name, remote))

        def root(self, command, check=True):
            log.append(("root", command, check))
            return 0

    monkeypatch.setattr(sayt, "Server", FakeServer)
    env = tmp_path / ".env"
    env.write_text("DEPLOY_HOST=vps\n", encoding="utf-8")
    rc = sayt.main(["Forma.BarakaOffice.uz", str(site), "--env-file", str(env), "--test-local"])
    assert rc == 0
    assert log[0] == ("host", "vps", None)
    assert ("copy", "pilot-sayt.tar.gz", "/tmp/pilot-sayt.tar.gz") in log
    assert ("copy", "sayt-sozlash.sh", "/tmp/pilot-sayt-sozlash.sh") in log
    cmd = log[-1][1]
    assert "bash /tmp/pilot-sayt-sozlash.sh forma.barakaoffice.uz /tmp/pilot-sayt.tar.gz --test-local" in cmd
    assert "rm -f /tmp/pilot-sayt-sozlash.sh" in cmd


def test_shell_script_parses():
    r = subprocess.run(["bash", "-n", str(TOOLS / "sayt-sozlash.sh")], capture_output=True, text=True)
    assert r.returncode == 0, r.stderr


def test_shell_script_refuses_non_root_and_bad_domain(tmp_path):
    if subprocess.run(["id", "-u"], capture_output=True, text=True).stdout.strip() == "0":
        pytest.skip("running as root")
    r = subprocess.run(["bash", str(TOOLS / "sayt-sozlash.sh"), "forma.barakaoffice.uz", "x.tar.gz"],
                       capture_output=True, text=True)
    assert r.returncode == 1 and "root" in r.stdout


@pytest.mark.skipif(shutil.which("shellcheck") is None, reason="shellcheck not installed")
def test_shellcheck_clean():
    r = subprocess.run(["shellcheck", str(TOOLS / "sayt-sozlash.sh")], capture_output=True, text=True)
    assert r.returncode == 0, r.stdout
