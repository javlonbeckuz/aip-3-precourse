"""A CSV or JSON table from a private URL kept in .env (not in sources.toml).

Typical uses:
- a private Google Sheet served by a small Apps Script web app that checks a secret key
  (the sheet stays private; only the script URL with the key can read it);
- a 1C HTTP service the installer wrote that returns CSV or JSON;
- any other internal report link.

.env:
    NARX_URL=https://script.google.com/macros/s/AKfy.../exec?key=uzun-maxfiy-kalit

sources.toml:

    [[source]]
    name = "Narxlar (yopiq Google Sheet)"
    type = "url"
    url_env = "NARX_URL"
    # format = "csv"          # "csv", "json" or "auto" (default: from the answer)
    # json_path = "data.rows" # where the list of rows sits inside the JSON
    # refresh_minutes = 10
    # columns, check: as for type = "file"

Apps Script answers through a one-time redirect to script.googleusercontent.com, so redirects
are followed (developers.google.com/apps-script/guides/content, checked 2026-11-03).
"""

from __future__ import annotations

from pathlib import Path

from pilot.sources import Table, check_prices, decode_bytes, parse_csv_text, table_from_matrix

from ._common import TimedRefresh, finish, flatten, http_error, make_client, need_secret


class UrlSource(TimedRefresh):
    def __init__(self, spec: dict, app_dir: Path, client=None):
        self.name = spec["name"]
        self.app_dir = Path(app_dir)
        self.url_env = spec.get("url_env", "DATA_URL")
        self.format = spec.get("format", "auto")
        self.json_path = spec.get("json_path", "")
        self.columns = spec.get("columns")
        self.check = spec.get("check")
        self.refresh_minutes = float(spec.get("refresh_minutes", 10))
        self._client = client

    def load(self) -> Table:
        url = need_secret(self.url_env, self.app_dir, "ma’lumot havolasi")
        client = self._client or make_client()
        try:
            resp = client.get(url)
        finally:
            if self._client is None:
                client.close()
        if resp.status_code != 200:
            raise http_error(self.name, resp)
        kind = resp.headers.get("content-type", "").lower()
        fmt = self.format
        if fmt == "auto":
            fmt = "json" if "json" in kind else "csv"
        if resp.text.lstrip().startswith("ERROR:"):  # the Apps Script in the cookbook answers errors this way
            raise RuntimeError(f"{self.name}: {resp.text.strip()[:200]}")
        if "text/html" in kind:
            raise RuntimeError(f"{self.name}: havola jadval o‘rniga veb-sahifa qaytardi "
                               "(kalit noto‘g‘ri, ruxsat yo‘q yoki kirish sahifasi)")
        if fmt == "json":
            data = resp.json()
            for part in [p for p in self.json_path.split(".") if p]:
                data = data[int(part)] if isinstance(data, list) else data.get(part, [])
            if not isinstance(data, list):
                raise RuntimeError(f"{self.name}: JSON ichida ro‘yxat topilmadi (json_path ni tekshiring)")
            rows = [flatten(r) if isinstance(r, dict) else {"Qiymat": r} for r in data]
            return finish(self.name, rows, "URL (JSON)", self.columns, self.check, "havola bo‘sh ro‘yxat qaytardi")
        matrix = parse_csv_text(decode_bytes(resp.content))
        table = table_from_matrix(self.name, matrix, "URL (CSV)").keep_columns(self.columns)
        return check_prices(table, self.check or {})


def make(spec: dict, app_dir: Path) -> UrlSource:
    return UrlSource(spec, app_dir)
