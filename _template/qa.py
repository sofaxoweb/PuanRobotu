#!/usr/bin/env python3
"""PuanRobotu statik QA: linkler, asset'ler, registry tutarlılığı."""
import os, re, json

DST = os.path.expanduser("~/workspace/puanrobotu")
errors, warnings = [], []

# Registry'yi oku
reg = open(f"{DST}/assets/js/tools.js").read()
tool_ids = set(re.findall(r'id: "([^"]+)",\s*cat:', reg))
tool_urls = {}
for m in re.finditer(r'id: "([^"]+)",\s*cat: "([^"]+)", ad: "([^"]+)", url: "([^"]+)"', reg):
    tool_urls[m.group(1)] = m.group(4)
cat_slugs = set(re.findall(r'slug: "([^"]+)"', reg))

def url_to_file(url):
    url = url.split("#")[0].split("?")[0]
    if not url.startswith("/") or url.startswith("//"):
        return None
    path = os.path.join(DST, url.lstrip("/"))
    if os.path.isdir(path):
        path = os.path.join(path, "index.html")
    return path

html_files = []
for root, _, files in os.walk(DST):
    if "_template" in root:
        continue
    for f in files:
        if f.endswith(".html"):
            html_files.append(os.path.join(root, f))

print(f"Kontrol edilen sayfa: {len(html_files)}")

for fp in html_files:
    rel = os.path.relpath(fp, DST)
    html = open(fp, encoding="utf-8").read()

    # 1. iç linkler
    for href in set(re.findall(r'href="(/[^"]*)"', html)):
        target = url_to_file(href)
        if target and not os.path.exists(target):
            errors.append(f"{rel}: kırık link {href}")

    # 2. asset'ler
    for src in set(re.findall(r'(?:src|href)="(/assets/[^"]*)"', html)):
        if not os.path.exists(os.path.join(DST, src.lstrip("/"))):
            errors.append(f"{rel}: kayıp asset {src}")

    # 3. data-arac id'leri registry'de mi?
    for tid in set(re.findall(r'data-arac="([^"]+)"', html)):
        if tid not in tool_ids:
            errors.append(f"{rel}: registry'de olmayan araç id: {tid}")

    # 4. temel SEO öğeleri
    if "<h1>" not in html and "<h1 " not in html:
        warnings.append(f"{rel}: H1 yok")
    if 'rel="canonical"' not in html:
        warnings.append(f"{rel}: canonical yok")

# 5. registry URL'lerinin hepsinin sayfası var mı? (henüz yapılmamış araçlar hariç - bilgi)
print("\n--- Henüz sayfası olmayan araçlar (builder'lar yapacak) ---")
for tid, url in sorted(tool_urls.items()):
    target = url_to_file(url)
    if not os.path.exists(target):
        print(f"  [YAPILACAK] {tid}: {url}")

print(f"\n--- HATA: {len(errors)} ---")
for e in errors[:30]:
    print("  " + e)
print(f"--- UYARI: {len(warnings)} ---")
for w in warnings[:15]:
    print("  " + w)
