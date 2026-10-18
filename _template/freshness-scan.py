#!/usr/bin/env python3
"""Scan all pages for year-specific claims needing yearly review.
Run every January and after each exam result announcement.
See FRESHNESS.md for the trigger->action map."""
import os, re
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
report = defaultdict(list)

for dp, dn, fns in os.walk(ROOT):
    if '_template' in dp or '.git' in dp:
        continue
    for fn in fns:
        if not fn.endswith('.html'):
            continue
        p = os.path.join(dp, fn)
        rel = os.path.relpath(p, ROOT)
        h = open(p, encoding='utf-8').read()
        # content only: strip head/scripts/styles
        t = re.sub(r'<head.*?</head>', '', h, flags=re.S)
        t = re.sub(r'<script.*?</script>', '', t, flags=re.S)
        t = re.sub(r'<style.*?</style>', '', t, flags=re.S)
        # split into sentences, keep ones with years
        text = re.sub(r'<[^>]+>', ' ', t)
        text = re.sub(r'\s+', ' ', text)
        for sent in re.split(r'(?<=[.!?])\s+', text):
            years = set(re.findall(r'\b(202[4-9])\b', sent))
            # skip the byline itself and nav/footer boilerplate
            if years and 'Son güncelleme' not in sent and 'Ana Sayfa' not in sent and len(sent.strip()) > 30:
                report[rel].append((sorted(years), sent.strip()[:140]))

print(f"sayfa: {len(report)} | yıl geçen cümle toplam: {sum(len(v) for v in report.values())}\n")
for rel in sorted(report):
    print(f"== {rel} ({len(report[rel])})")
    for years, sent in report[rel][:6]:
        print(f"   [{','.join(years)}] {sent}…")
    if len(report[rel]) > 6:
        print(f"   … +{len(report[rel]) - 6} daha")
