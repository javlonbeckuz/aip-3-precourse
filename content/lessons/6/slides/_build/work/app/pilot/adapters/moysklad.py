"""MoySklad stock report (JSON API 1.2, /report/stock/all), read only, as a table.

.env:
    MOYSKLAD_TOKEN=...      # token of a separate integration employee (a new token cancels that
                            # employee's older tokens, so never use the owner's own login)

sources.toml:

    [[source]]
    name = "Ombor qoldig‘i (MoySklad)"
    type = "moysklad"
    # include_zero = true    # also items with zero stock (default: only items in stock)
    # include_cost = false   # cost price ("Tannarx") is internal; default: hidden
    # money_divisor = 100    # API money is in hundredths ("в копейках"); check one known price
    # refresh_minutes = 15
    # max_pages = 10         # 1000 rows per page

API facts (dev.moysklad.ru/doc/api/remap/1.2, checked 2026-11-03): Bearer token,
"Accept-Encoding: gzip" is mandatory (415 without it), stock report costs 5 rate-limit units.
"""

from __future__ import annotations

from pathlib import Path

from ._common import TimedRefresh, finish, http_error, make_client, money, need_secret

BASE = "https://api.moysklad.ru/api/remap/1.2"


class MoySkladStockSource(TimedRefresh):
    def __init__(self, spec: dict, app_dir: Path, client=None):
        self.name = spec["name"]
        self.app_dir = Path(app_dir)
        self.token_env = spec.get("token_env", "MOYSKLAD_TOKEN")
        self.include_zero = bool(spec.get("include_zero", False))
        self.include_cost = bool(spec.get("include_cost", False))
        self.divisor = float(spec.get("money_divisor", 100))
        self.columns = spec.get("columns")
        self.check = spec.get("check")
        self.refresh_minutes = float(spec.get("refresh_minutes", 15))
        self.max_pages = int(spec.get("max_pages", 10))
        self._client = client

    def load(self):
        token = need_secret(self.token_env, self.app_dir, "MoySklad tokeni")
        headers = {"Authorization": f"Bearer {token}", "Accept-Encoding": "gzip"}
        params = {"limit": 1000}
        if self.include_zero:
            params["filter"] = "stockMode=all;quantityMode=all"
        client = self._client or make_client()
        rows, offset = [], 0
        try:
            for _ in range(self.max_pages):
                resp = client.get(f"{BASE}/report/stock/all", params={**params, "offset": offset}, headers=headers)
                if resp.status_code != 200:
                    raise http_error("MoySklad", resp)
                data = resp.json()
                for r in data.get("rows", []):
                    row = {
                        "Kod": r.get("code", ""),
                        "Artikul": r.get("article", ""),
                        "Nomi": r.get("name", ""),
                        "Qoldiq": r.get("stock", ""),
                        "Rezerv": r.get("reserve", ""),
                        "Yo‘lda": r.get("inTransit", ""),
                        "Mavjud": r.get("quantity", ""),
                        "Birlik": (r.get("uom") or {}).get("name", ""),
                        "Sotuv narxi": money(r.get("salePrice"), self.divisor),
                    }
                    if self.include_cost:
                        row["Tannarx"] = money(r.get("price"), self.divisor)
                    rows.append(row)
                size = int((data.get("meta") or {}).get("size", 0))
                offset += params["limit"]
                if offset >= size:
                    break
        finally:
            if self._client is None:
                client.close()
        return finish(self.name, rows, "MoySklad API", self.columns, self.check,
                      "MoySklad qoldiq hisoboti bo‘sh")


def make(spec: dict, app_dir: Path) -> MoySkladStockSource:
    return MoySkladStockSource(spec, app_dir)
