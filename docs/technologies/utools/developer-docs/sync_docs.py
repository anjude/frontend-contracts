#!/usr/bin/env python3
"""Fetch the public uTools developer documentation into the local KB."""

from __future__ import annotations

import html
import hashlib
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import deque
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parent
PAGES = ROOT / "pages"
STARTS = [
    "https://www.u-tools.cn/docs/developer/docs.html",
    "https://www.u-tools.cn/docs/developer/basic/getting-started.html",
]
PREFIX = "https://www.u-tools.cn/docs/developer/"
HEADERS = {"User-Agent": "bean-workbench-docs-mirror/1.0 (manual sync)"}


def fetch(url: str) -> str:
    request = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8", "replace")


class PageParser(HTMLParser):
    """Extract the rendered VitePress article as Markdown and discover links."""

    BLOCKS = {"p", "div", "section", "ul", "ol", "li", "blockquote", "table", "tr", "pre", "hr"}
    VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

    def __init__(self, page_url: str) -> None:
        super().__init__(convert_charrefs=True)
        self.page_url = page_url
        self.depth = 0
        self.active = False
        self.skip = 0
        self.parts: list[str] = []
        self.links: list[str] = []
        self.anchor: list[str] | None = None
        self.anchor_url = ""
        self.list_stack: list[tuple[str, int]] = []
        self.in_pre = False
        self.pre_text: list[str] = []
        self.images: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        a = dict(attrs)
        classes = (a.get("class") or "").split()
        if not self.active and tag == "div" and "vp-doc" in classes:
            self.active = True
            self.depth = 1
            return
        if not self.active:
            return
        if tag not in self.VOID:
            self.depth += 1
        if tag in {"script", "style", "button", "svg"} or (tag == "a" and "header-anchor" in classes):
            self.skip += 1
            return
        if self.skip:
            self.skip += 1
            return
        if tag == "a":
            self.anchor = []
            self.anchor_url = a.get("href") or ""
            resolved = urllib.parse.urldefrag(urllib.parse.urljoin(self.page_url, self.anchor_url)).url
            if resolved.startswith(PREFIX) and resolved.endswith(".html"):
                self.links.append(resolved)
        elif tag == "img":
            self.images.append((a.get("src") or a.get("data-src") or "", a.get("alt") or ""))
            src = a.get("src") or a.get("data-src") or ""
            alt = a.get("alt") or "图片"
            self._emit(f"![{alt}]({src})")
        elif tag == "pre":
            self.in_pre = True
            self.pre_text = []
        elif tag == "ul":
            self.list_stack.append(("ul", 0))
        elif tag == "ol":
            self.list_stack.append(("ol", 0))
        elif tag == "li":
            if self.list_stack:
                kind, n = self.list_stack[-1]
                n += 1
                self.list_stack[-1] = (kind, n)
                self._emit((f"{n}. " if kind == "ol" else "- "))
        elif tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self._emit("\n" + "#" * int(tag[1]) + " ")
        elif tag == "blockquote":
            self._emit("\n> ")
        elif tag == "br":
            self._emit("  \n")
        elif tag == "hr":
            self._emit("\n---\n")
        elif tag == "th" or tag == "td":
            self._emit(" | ")
        elif tag == "tr":
            self._emit("\n|")
        elif tag == "code" and not self.in_pre:
            self._emit("`")

    def handle_endtag(self, tag: str) -> None:
        if not self.active:
            return
        if self.skip:
            self.skip -= 1
        elif tag == "a" and self.anchor is not None:
            label = "".join(self.anchor).strip()
            if self.anchor_url and not self.anchor_url.startswith("#"):
                resolved = urllib.parse.urljoin(self.page_url, self.anchor_url)
                parsed = urllib.parse.urlparse(resolved)
                if parsed.netloc == "www.u-tools.cn" and parsed.path.startswith("/docs/developer/") and parsed.path.endswith(".html"):
                    target = safe_name(resolved) + ".md"
                    target += ("#" + parsed.fragment) if parsed.fragment else ""
                    self._emit(f"[{label}]({target})")
                else:
                    self._emit(f"[{label}]({self.anchor_url})")
            else:
                self._emit(label)
            self.anchor = None
            self.anchor_url = ""
        elif tag == "pre" and self.in_pre:
            code = "".join(self.pre_text).strip("\n")
            self.parts.append("\n```\n" + code + "\n```\n")
            self.in_pre = False
        elif tag in {"ul", "ol"} and self.list_stack:
            self.list_stack.pop()
            self.parts.append("\n")
        elif tag in self.BLOCKS:
            self.parts.append("\n")
        elif tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self.parts.append("\n")
        elif tag == "code" and not self.in_pre:
            self._emit("`")
        if tag not in self.VOID:
            self.depth -= 1
            if self.depth <= 0:
                self.active = False

    def handle_data(self, data: str) -> None:
        if not self.active or self.skip:
            return
        if self.in_pre:
            self.pre_text.append(data)
        elif self.anchor is not None:
            self.anchor.append(data)
        else:
            self._emit(data)

    def _emit(self, value: str) -> None:
        if self.in_pre:
            self.pre_text.append(value)
        else:
            self.parts.append(value)

    def markdown(self) -> str:
        text = "".join(self.parts)
        text = html.unescape(text)
        text = re.sub(r"[ \t]+\n", "\n", text)
        text = re.sub(r"\n[ \t]+", "\n", text)
        text = re.sub(r"\n{3,}", "\n\n", text)
        return text.strip() + "\n"


def safe_name(url: str) -> str:
    path = urllib.parse.urlparse(url).path
    name = path.removeprefix("/docs/developer/").replace("/", "__")
    return name.removesuffix(".html") or "index"


def localize_images() -> None:
    assets = ROOT / "assets"
    assets.mkdir(exist_ok=True)
    pattern = re.compile(r"!\[([^\]]*)\]\(([^)]+)\)")
    for page in PAGES.glob("*.md"):
        text = page.read_text(encoding="utf-8")

        def replace(match: re.Match[str]) -> str:
            alt, raw_url = match.groups()
            if raw_url.startswith("../assets/"):
                return match.group(0)
            url = urllib.parse.urljoin("https://www.u-tools.cn/docs/developer/", raw_url)
            parsed = urllib.parse.urlparse(url)
            if parsed.scheme not in {"http", "https"}:
                return match.group(0)
            basename = Path(parsed.path).name or "image"
            suffix = Path(basename).suffix
            filename = hashlib.sha256(url.encode()).hexdigest()[:10] + "-" + basename
            target = assets / filename
            if not target.exists():
                try:
                    request = urllib.request.Request(url, headers=HEADERS)
                    with urllib.request.urlopen(request, timeout=30) as response:
                        target.write_bytes(response.read())
                except Exception:
                    return match.group(0)
            return f"![{alt}](../assets/{filename})"

        page.write_text(pattern.sub(replace, text), encoding="utf-8")


def main() -> None:
    PAGES.mkdir(parents=True, exist_ok=True)
    queue = deque(STARTS)
    seen: set[str] = set()
    failed: list[tuple[str, str]] = []
    records: list[tuple[str, str, str]] = []

    while queue:
        url = queue.popleft()
        url = urllib.parse.urldefrag(url).url
        if url in seen or not url.startswith(PREFIX):
            continue
        seen.add(url)
        try:
            source = fetch(url)
        except Exception as exc:  # Keep an explicit error report for manual review.
            failed.append((url, str(exc)))
            continue
        # Read navigation links from the whole VitePress page as well as article links.
        for href in re.findall(r'href=["\']([^"\']+)["\']', source, re.I):
            resolved = urllib.parse.urldefrag(urllib.parse.urljoin(url, html.unescape(href))).url
            if resolved.startswith(PREFIX) and resolved.endswith(".html") and resolved not in seen:
                queue.append(resolved)
        parser = PageParser(url)
        parser.feed(source)
        title_match = re.search(r"<title>(.*?)</title>", source, re.I | re.S)
        title = html.unescape(re.sub(r"<.*?>", "", title_match.group(1))).strip() if title_match else safe_name(url)
        body = parser.markdown()
        rel = safe_name(url) + ".md"
        page_file = PAGES / rel
        page_file.write_text(
            f"---\ntitle: {title}\nsource: {url}\nfetched: {time.strftime('%Y-%m-%d')}\n---\n\n"
            f"> 来源：[{title}]({url})\n\n{body}",
            encoding="utf-8",
        )
        records.append((title, url, rel))
        for link in parser.links:
            clean = urllib.parse.urldefrag(link).url
            if clean.startswith(PREFIX) and clean not in seen:
                queue.append(clean)
        print(f"{len(seen):3d} {rel}")

    records.sort(key=lambda row: row[2])
    current_pages = {path for _, _, path in records}
    for old in PAGES.glob("*.md"):
        if old.name not in current_pages and "\nsource: https://www.u-tools.cn/docs/developer/" in old.read_text(encoding="utf-8"):
            old.unlink()
    localize_images()
    index = [
        "# uTools 开发者文档本地副本",
        "",
        "本目录保存公开开发者文档的 Markdown 本地副本和文档图片。原文与版权归 uTools 及相应权利人所有；每页保留官方来源链接。",
        "",
        f"最近抓取：{time.strftime('%Y-%m-%d')}",
        "",
        "## 手动更新",
        "",
        "收到更新需求时，在 `frontend-contracts` 仓库根目录执行 `python3 docs/technologies/utools/developer-docs/sync_docs.py`。脚本只在手动运行时访问官方站点，不创建定时任务。",
        "",
        "## 页面索引",
        "",
    ]
    index.extend(f"- [{title}](pages/{path}) — [官方页面]({url})" for title, url, path in records)
    index += ["", "## 抓取结果", "", f"- 成功：{len(records)} 页", f"- 失败：{len(failed)} 页"]
    if failed:
        index += ["", "### 失败页面", ""]
        index.extend(f"- [{url}]({url})：{error}" for url, error in failed)
    (ROOT / "README.md").write_text("\n".join(index) + "\n", encoding="utf-8")
    print(f"DONE pages={len(records)} failures={len(failed)}")
    if failed:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
