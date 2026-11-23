""""Any "Excel" file, read by what is really inside it, with a header and totals fix.

The built-in `type = "file"` reader refuses .xls and takes the first row with two filled
cells as the header. This reader (`type = "excel"`, alias `"xls"`) also handles:

- an HTML table with an .xls name (Bitrix24 "Excel" export, many web cabinets and bank portals);
- "XML Spreadsheet 2003" (SpreadsheetML), from older 1C and accounting programs;
- a CSV or tab-separated text with an .xls name;
- a real .xlsx renamed to .xls.
A real old binary .xls (Excel 97-2003) needs the xlrd library, which the bot does not ship;
the owner is told to open it in Excel and "Save as" .xlsx.

It also fixes two things 1C reports often do:
- parameter rows above the table ("Период: | 01.08.2026 - 31.10.2026") that look like a header:
  `header = "Номенклатура"` names a cell of the real header row;
- "Итого" / "Всего" / "Jami" total rows that would be read as products: dropped by default.

sources.toml:

    [[source]]
    name = "Bitrix24 bitimlar"
    type = "excel"
    path = "data/bitrix-bitimlar.xls"
    # header = "Название сделки"   # a cell text of the real header row
    # table = 2          # HTML only: which table on the page (1, 2, ...); default: the largest one
    # sheet = "Лист1"    # xlsx / SpreadsheetML: which sheet; default: the first one
    # drop_rows_with = ["Итого", "Jami"]   # default: Итого, Всего, Jami, Обороты, Остаток, Сальдо...; [] keeps every row
    # columns, check, max_age_hours: as for type = "file"
"""

from __future__ import annotations

import io
import xml.etree.ElementTree as ET
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path

from pilot.sources import FileSource, Table, check_prices, decode_bytes, parse_csv_text, table_from_matrix

SS = "{urn:schemas-microsoft-com:office:spreadsheet}"


class _Tables(HTMLParser):
    """Collect every <table> as a list of rows of cell texts (colspan repeated as empty cells)."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tables: list[list[list[str]]] = []
        self._stack: list[list[list[str]]] = []
        self._cell: list[str] | None = None
        self._span = 1

    def handle_starttag(self, tag, attrs):
        if tag == "table":
            self._stack.append([])
        elif tag == "tr" and self._stack:
            self._stack[-1].append([])
        elif tag in ("td", "th") and self._stack:
            if not self._stack[-1]:
                self._stack[-1].append([])
            self._cell = []
            try:
                self._span = max(1, int(dict(attrs).get("colspan") or 1))
            except ValueError:
                self._span = 1
        elif tag == "br" and self._cell is not None:
            self._cell.append(" ")

    def handle_endtag(self, tag):
        if tag in ("td", "th") and self._cell is not None and self._stack:
            text = " ".join("".join(self._cell).split())
            self._stack[-1][-1].extend([text] + [""] * (self._span - 1))
            self._cell = None
        elif tag == "table" and self._stack:
            self.tables.append(self._stack.pop())

    def handle_data(self, data):
        if self._cell is not None:
            self._cell.append(data)


def html_tables(text: str) -> list[list[list[str]]]:
    parser = _Tables()
    parser.feed(text)
    parser.close()
    return [t for t in parser.tables if t]


def spreadsheetml_rows(text: str, sheet: str | None) -> list[list[str]]:
    root = ET.fromstring(text.encode("utf-8"))
    sheets = root.findall(f"{SS}Worksheet")
    if not sheets:
        raise ValueError("XML ichida Worksheet yo‘q")
    ws = next((s for s in sheets if s.get(f"{SS}Name") == sheet), sheets[0]) if sheet else sheets[0]
    out = []
    for row in ws.iter(f"{SS}Row"):
        cells: list[str] = []
        for cell in row.findall(f"{SS}Cell"):
            index = cell.get(f"{SS}Index")
            if index and index.isdigit():
                cells.extend([""] * (int(index) - 1 - len(cells)))
            data = cell.find(f"{SS}Data")
            text = "".join(data.itertext()) if data is not None else ""
            span = int(cell.get(f"{SS}MergeAcross") or 0)
            cells.extend([text.strip()] + [""] * span)
        out.append(cells)
    return out


TOTALS = ["итого", "всего", "jami", "жами", "total", "обороты", "остаток", "сальдо", "входящий", "исходящий",
          "kirish qoldig", "chiqish qoldig"]


def prepare_matrix(matrix: list[list], header: str | None, drop_rows_with: list[str]) -> list[list]:
    """Start at the row that holds `header`; drop total rows (first filled cell starts with a word)."""
    def text(c) -> str:
        return "" if c is None else str(c).strip().lower()

    rows = [list(r) for r in matrix]
    if header:
        want = header.strip().lower()
        at = next((i for i, r in enumerate(rows) if any(text(c) == want for c in r)), None)
        if at is None:
            raise ValueError(f"ustun nomlari qatori topilmadi: «{header}» katakchasi yo‘q")
        rows = rows[at:]
    if drop_rows_with:
        words = [w.lower() for w in drop_rows_with]
        keep = rows[:1]
        for r in rows[1:]:
            first = next((text(c) for c in r if text(c)), "")
            if not any(first.startswith(w) for w in words):
                keep.append(r)
        rows = keep
    return rows


class ExcelSource(FileSource):
    def __init__(self, name: str, path: Path, columns=None, sheet=None, max_age_hours=None, check=None, *,
                 table_index=None, header=None, drop_rows_with=None):
        super().__init__(name, path, columns=columns, sheet=sheet, max_age_hours=max_age_hours, check=check)
        self.table_index = table_index
        self.header = header
        self.drop_rows_with = TOTALS if drop_rows_with is None else list(drop_rows_with)

    def _problem(self, text: str) -> Table:
        return Table(name=self.name, origin=self.path.name, loaded_at=datetime.now(), problem=f"{self.name}: {text}")

    def load(self) -> Table:
        path = self.path
        if not path.exists():
            return self._problem(f"fayl topilmadi ({path.name})")
        raw = path.read_bytes()
        origin = path.name
        if raw.startswith(b"\xd0\xcf\x11\xe0"):
            matrix = self._biff(raw)
            if matrix is None:
                return self._problem("bu haqiqiy eski Excel (.xls). Faylni Excel’da oching va "
                                     "«Сохранить как» - «Книга Excel (.xlsx)» qilib saqlang")
        elif raw.startswith(b"PK"):
            from openpyxl import load_workbook

            wb = load_workbook(io.BytesIO(raw), read_only=True, data_only=True)
            try:
                ws = wb[self.sheet] if self.sheet else wb.worksheets[0]
                matrix = [list(r) for r in ws.iter_rows(values_only=True)]
            finally:
                wb.close()
        else:
            text = decode_bytes(raw)
            head = text[:2048].lower()
            if "urn:schemas-microsoft-com:office:spreadsheet" in text[:4096]:
                try:
                    matrix = spreadsheetml_rows(text, self.sheet)
                except (ET.ParseError, ValueError) as exc:
                    return self._problem(f"XML jadval o‘qilmadi ({exc})")
            elif "<table" in text.lower():
                tables = html_tables(text)
                if not tables:
                    return self._problem("HTML ichida jadval topilmadi")
                if self.table_index:
                    if not 1 <= int(self.table_index) <= len(tables):
                        return self._problem(f"table = {self.table_index}, lekin faylda {len(tables)} ta jadval bor")
                    matrix = tables[int(self.table_index) - 1]
                else:
                    matrix = max(tables, key=len)
            elif "<html" in head or "<!doctype" in head:
                return self._problem("fayl ichida jadval emas, veb-sahifa bor (kirish sahifasi bo‘lishi mumkin)")
            else:
                matrix = parse_csv_text(text)
        try:
            matrix = prepare_matrix(matrix, self.header, self.drop_rows_with)
        except ValueError as exc:
            return self._problem(str(exc))
        table = table_from_matrix(self.name, matrix, origin).keep_columns(self.columns)
        return check_prices(table, self.check or {})

    @staticmethod
    def _biff(raw: bytes):
        try:
            import xlrd  # optional: uv add xlrd
        except ImportError:
            return None
        book = xlrd.open_workbook(file_contents=raw)
        sheet = book.sheet_by_index(0)
        return [sheet.row_values(i) for i in range(sheet.nrows)]


def make(spec: dict, app_dir: Path) -> ExcelSource:
    path = Path(spec["path"])
    return ExcelSource(
        spec["name"], path if path.is_absolute() else app_dir / path,
        columns=spec.get("columns"), sheet=spec.get("sheet"), max_age_hours=spec.get("max_age_hours"),
        check=spec.get("check"), table_index=spec.get("table"), header=spec.get("header"),
        drop_rows_with=spec.get("drop_rows_with"),
    )
