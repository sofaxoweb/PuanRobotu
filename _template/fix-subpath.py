#!/usr/bin/env python3
"""Subpath-safe paths: rewrite root-absolute href="/..." / src="/..." in every
HTML page to relative paths, so the site works both under a subpath
(e.g. sofaxoweb.github.io/PuanRobotu/) and on a root domain.
Absolute canonicals / og:url (https://...) are left untouched."""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ATTR_RE = re.compile(r'((?:href|src)=")(/[^"/][^"]*|/)(")')


def rel_link(page_dir, target):
    """Target like '/lgs/puan-hesaplama/' -> relative path from page_dir."""
    t = target.lstrip("/")
    if not t:
        rel = os.path.relpath(".", page_dir) if page_dir != "." else "."
    else:
        rel = os.path.relpath(t, page_dir) if page_dir != "." else t
    rel = rel.replace(os.sep, "/")
    # directory targets keep trailing slash
    if target.endswith("/") and not rel.endswith("/"):
        rel += "/"
    return rel


def fix_file(path):
    rel_path = os.path.relpath(path, ROOT)
    page_dir = os.path.dirname(rel_path)
    if page_dir == "":
        page_dir = "."
    with open(path, encoding="utf-8") as f:
        html = f.read()

    def repl(m):
        prefix, target, suffix = m.group(1), m.group(2), m.group(3)
        return prefix + rel_link(page_dir, target) + suffix

    new_html = ATTR_RE.sub(repl, html)
    if new_html != html:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_html)
        return True
    return False


def main():
    changed = 0
    total_refs = 0
    for dirpath, _dirs, files in os.walk(ROOT):
        if "_template" in dirpath:
            continue
        for fn in files:
            if fn.endswith(".html"):
                p = os.path.join(dirpath, fn)
                with open(p, encoding="utf-8") as f:
                    total_refs += len(ATTR_RE.findall(f.read()))
                if fix_file(p):
                    changed += 1
    print(f"rewrote {changed} pages; remaining root-absolute refs:")
    left = 0
    for dirpath, _dirs, files in os.walk(ROOT):
        if "_template" in dirpath:
            continue
        for fn in files:
            if fn.endswith(".html"):
                with open(os.path.join(dirpath, fn), encoding="utf-8") as f:
                    left += len(ATTR_RE.findall(f.read()))
    print(f"  {left} (hedef: 0)")


if __name__ == "__main__":
    main()
