Research complete. Here is the structured report.

---

# Official Scoring Formulas: KPSS / ÖABT / DGS / ALES — Research Report

## 1. KPSS (Lisans GY-GK)

**Test structure (lisans, ön lisans, ortaöğretim — all identical format):**
- 120 questions total, 130 minutes, single session
- Genel Yetenek (GY): 60 questions = Türkçe 30 + Matematik 30
- Genel Kültür (GK): 60 questions = Tarih ~27 + Coğrafya ~18 + Vatandaşlık ~9 + Güncel Bilgiler ~6

**Net formula (penalty: YES):** Net = Doğru − (Yanlış ÷ 4). 4 yanlış = 1 doğruyu götürür. Blanks don't count. Each test's net is computed separately.

**Standardization:** Each test's net → standard score (mean 50, sd 10) using that year's cohort stats. ÖSYM does NOT weight individual questions — same net in the same test = same standard score.

**Score-type weights (ASP = weighted standard score):**
| Puan türü | GY | GK | Used for |
|---|---|---|---|
| P1 (lisans) | 0.70 | 0.30 | A-group posts per institution announcement |
| P2 (lisans) | 0.60 | 0.40 | A-group posts per institution announcement |
| P3 (lisans) | 0.50 | 0.50 | B-group central placement (lisans) |
| P93 (ön lisans) | 0.50 | 0.50 | B-group central placement (ön lisans) |
| P94 (ortaöğretim) | 0.50 | 0.50 | B-group central placement (ortaöğretim) |

**Official final formula:** KPSS Puanı = 70 + 30 × [2(ASP − X) − S] ÷ [2(B − X) − S], where X = ASP mean, S = ASP sd, B = max ASP. Max score = 100 by construction.

**Validity condition:** In every test used by the score type, the candidate must have marked at least one answer (correct or wrong); otherwise that score type is not computed.

**2026 change (confirmed):** No Eğitim Bilimleri test, no P10, no P121 in the 2026 KPSS Lisans kılavuzu. Teacher candidates now take **MEB-AGS** instead. KPSS still covers: B-group (P1/P2/P3/P93/P94) + A-group (P4–P48, computed with alan bilgisi tests; the institution's announcement names the score type).

**Blog error flagged:** One rehberpanda.com page lists P1 as "GY %30 + GK %30 + Eğitim Bilimleri %40" and P3 as "GY %40 + GK %60" — this contradicts the ÖSYM kılavuz and all other sources (70/30, 60/40, 50/50). Do not use that page's table.

**Worked example (P3, illustrative cohort stats):**
- Inputs: GY 42 doğru / 13 yanlış / 5 boş; GK 35 doğru / 18 yanlış / 7 boş
- Nets: GY = 42 − 13/4 = 38.75; GK = 35 − 18/4 = 30.50; total 69.25
- Illustrative SPs (assume): GY SP = 62, GK SP = 58 → ASP = 0.5×62 + 0.5×58 = 60.0
- Final (assume X=50, S=10, B=80): P3 = 70 + 30×[2(60−50)−10]/[2(80−50)−10] = 70 + 30×10/50 = **76.0** (illustrative — real X/S/B are ÖSYM-internal)
- Sanity check vs published estimates: 70 net ≈ 81.2 P3 (rehberpanda net-puan table, 2025 stats) — consistent ballpark.

**Min/max:** Max 100 (formula). No official minimum published — **UNVERIFIED** exact floor (formula-defined per cohort).

---

## 2. ÖABT

**Status change (critical for the calculator):** ÖABT is **no longer part of KPSS** as of 2026. It now runs under MEB-AGS.

**Old system (pre-2026, KPSS P121)** — confirmed by two academic sources (KEFAD journal via academia.edu; bilimsenligi.com evaluation report):
- P121 = GY %15 + GK %15 + Eğitim Bilimleri %20 + ÖABT %50 (weights sum to 100)
- ÖABT itself: 75 questions (2019+; 50 before 2019), net = Doğru − Yanlış/4, SPs weighted 0.50 into ASP, then the same 70+30 conversion to 100-scale.

**New system (2026, MEB-AGS):**
- AGS session: 80 questions; sub-test weights — Sözel Yetenek 20, Sayısal Yetenek 20, Tarih 15, Türkiye Coğrafyası 10, Eğitimin Temelleri ve Türk Millî Eğitim Sistemi 25, Mevzuat 10 (sums to 100). *Caveat: ÖSYM admitted a 2026 scoring incident where 2025 sub-test weights were mistakenly applied — these are the stated 2026 weights; treat as current but re-verify against the 2026 MEB-AGS kılavuzu at build time.*
- ÖABT session: 50 questions (down from 75).
- **MEB-AGS-P2** (branş with ÖABT) = AGS %50 + ÖABT %50
- MEB-AGS-P3 (foreign-language branches) = AGS %50 + YDS/e-YDS %50
- Branches with neither: AGS score alone.

**Calculator implication:** An "ÖABT puan hesaplama" tool in 2026 should compute **MEB-AGS-P2 = 0.5×AGS + 0.5×ÖABT** (both on 100-scale), not the obsolete P121. Keep the old P121 formula only as a historical note.

**Worked example (MEB-AGS-P2):**
- Inputs: AGS puanı 78.5 (from 80-question test), ÖABT net 38.75/50 → illustrative ÖABT puanı 82.0
- MEB-AGS-P2 = 0.5×78.5 + 0.5×82.0 = **80.25** (illustrative — real sub-scores need ÖSYM standardization)

---

## 3. DGS

**Test structure:** 100 questions (50 Sayısal + 50 Sözel), 135 minutes, single session. Sayısal = math/geometry/reasoning; Sözel = Turkish meaning/inference/verbal logic (NOT grammar).

**Net formula (penalty: YES):** Per section: Net = Doğru − (Yanlış ÷ 4). Wrongs cancel only their own section's correct answers. Blanks neutral.

**Standardization:** Each section's net → standard score (mean 50, sd 10).

**Puan türleri + exact coefficients** (confirmed verbatim from the official ÖSYM DGS kılavuz PDF):
| Puan türü | Sayısal SP | Sözel SP | ÖBP |
|---|---|---|---|
| DGS-SAY | **3** | **0.6** | **0.6** |
| DGS-SÖZ | **0.6** | **3** | **0.6** |
| DGS-EA | **1.8** | **1.8** | **0.6** |

DGS puanı = (Sayısal SP × k1) + (Sözel SP × k2) + (ÖBP × 0.6). **No 70+30 transformation — it is a direct weighted sum, NOT on a 100-scale.**

**ÖBP:** ÖBP = akademik not ortalaması × 0.8. Averages below 50 count as 50 → **ÖBP range 40–80**. (Edge cases: programs with <5 graduates and no historical stats → 50; unreported averages → 30; non-TRNC foreign programs → 50.)

**Kırık ÖBP:** Candidates placed via DGS in the previous year get ÖBP coefficient **0.45** instead of 0.6 in all three score types.

**Validity condition:** At least 1 ham puan in each of the two tests required.

**Blog error flagged:** One rehberpanda.com page states "DGSP = (Sayısal × 0.6) + (Sözel × 0.4)" — no such official DGS score type exists. Use only SAY/SÖZ/EA with the table above.

**Worked example (fully computable — no cohort stats needed):**
- Inputs: Sayısal 30 doğru / 5 yanlış → net 28.75; Sözel 28 doğru / 4 yanlış → net 27.0; diploma ortalaması 85 → ÖBP = 85×0.8 = 68
- Assume SPs (illustrative): Sayısal SP = 60, Sözel SP = 55
- DGS-SAY = 3×60 + 0.6×55 + 0.6×68 = 180 + 33 + 40.8 = **253.8**
- DGS-SÖZ = 0.6×60 + 3×55 + 0.6×68 = 36 + 165 + 40.8 = **241.8**
- DGS-EA = 1.8×60 + 1.8×55 + 0.6×68 = 108 + 99 + 40.8 = **247.8**
- Sanity check: published 2026 taban puanları (e.g., Çocuk Gelişimi EA 259–284, Okul Öncesi SÖZ 293–324) sit in this range. ✓

**Min/max:** No official cap published. By formula mechanics (SP ≈ 20–80 plausible band, ÖBP 40–80): typical range ≈ 150–350. Exact official min/max: **UNVERIFIED** (ÖSYM publishes no fixed floor/ceiling for DGS).

---

## 4. ALES

**Test structure:** 100 questions (50 Sayısal + 50 Sözel), 150 minutes. Held 3× per year; score valid 5 years. (Pre-2017 format was 4 tests/160 questions — obsolete.)

**Net formula (penalty: YES):** Net = Doğru − (Yanlış ÷ 4) per test. SPs: mean 50, sd 10.

**Puan türleri + weights (current 2-test format):**
| Puan türü | Sayısal SP | Sözel SP |
|---|---|---|
| ALES-SAY | **0.75** | **0.25** |
| ALES-SÖZ | **0.25** | **0.75** |
| ALES-EA | **0.50** | **0.50** |

*Attribution note: these are the figures explicitly published for the current format (kariyer.net, widely repeated across Turkish prep sites). Caveat: the 2017 YÖK reform announcement said SAY/SÖZ weights were "unchanged" from the old 4-test scheme (which mapped to 0.70/0.30 and 0.20/0.80) while EA was changed to 50/50 — a mild discrepancy with the 75/25 figure. Recommend final verification against the current ÖSYM ALES kılavuzu; 75/25 is the working figure used by all major calculators.*

**Official final formula** (from ÖSYM ALES kılavuzu): ALES Puanı = 70 + 30 × [2(AP − X) − S] ÷ [2(B − X) − S], where AP = weighted score above. Max = 100.

**Reference points:** Doktora applications commonly require ≥80 ALES (per university senates); tezli yüksek lisans counts ALES ≥50% of admission score.

**Worked example (illustrative cohort stats):**
- Inputs: Sayısal 32 doğru / 8 yanlış → net 30; Sözel 36 doğru / 4 yanlış → net 35
- Assume SPs: Sayısal SP = 58, Sözel SP = 64
- AP-SAY = 0.75×58 + 0.25×64 = 43.5 + 16 = 59.5; AP-SÖZ = 0.25×58 + 0.75×64 = 14.5 + 48 = 62.5; AP-EA = 0.5×58 + 0.5×64 = 61.0
- Final SAY (assume X=50, S=10, B=80): 70 + 30×[2(59.5−50)−10]/[2(80−50)−10] = 70 + 30×9/50 = **75.4** (illustrative)

**Min/max:** Max 100 (formula). No official minimum published — **UNVERIFIED** exact floor.

---

## Cross-cutting notes for the build

1. **All four exams penalize wrong answers** (4 yanlış = 1 doğru). No exceptions found.
2. **KPSS/ALES/ÖABT share the identical 70+30 conversion** to a 100-scale; **DGS is the outlier** (raw weighted sum, ~150–350 typical band).
3. **Exact final scores are never computable from nets alone** — X, S, B are cohort-internal to ÖSYM. Every calculator must label outputs "tahmini" and ideally anchor to published net–puan tables (as the LGS tool does).
4. **2026 structural breaks to encode:** teachers → MEB-AGS (not KPSS); ÖABT 75→50 questions and now feeds MEB-AGS-P2; P10/P121/Eğitim Bilimleri gone from KPSS.

## Sources

- http://www.osym.gov.tr/Eklenti/3002,2005dgskilavuztumpdf.pdf?0 — ÖSYM DGS kılavuz (official coefficient table: SAY 3/0.6/0.6, SÖZ 0.6/3/0.6, EA 1.8/1.8/0.6)
- http://www.osym.gov.tr/Eklenti/2226,2012-ales-sonbahar-kilavuzupdf.pdf?0 — ÖSYM 2012 ALES kılavuz (official: net formula, SP standardization, old 4-test weights, 70+30 conversion formula)
- https://rehberpanda.com/blog/2026-kpss-kac-net-kac-puan/ — KPSS weights P1/P2/P3/P93/P94, formula, 2026 teacher change (cross-checked vs 3 other pages)
- https://rehberpanda.com/blog/2026-kpss-kac-net-kac-puan-getirir-lisans-onlisans/ — KPSS structure 120q/130min, net-puan table
- https://istanbulticaretgazetesi.com/kpss-puan-turleri-kpss-p1-p2-p3-nedir — independent confirmation of P1/P2/P3 weights
- https://bilgitik.com/detay/4183/kpss-puan-hesaplama — net formula, ASP→100 conversion, validity condition
- https://rehberpanda.com/blog/2026-dgs-nasil-olacak-sinav-formati-degisiklikler-takvim/ — DGS coefficients, ÖBP formula (40–80), kırık ÖBP 0.45, worked example
- https://www.sorubak.com/dgs-onlisans-basari-puaninin-hesaplanmasi_472.html — ÖBP edge cases (50/30 rules)
- https://tr.wikipedia.org/wiki/Dikey_Ge%C3%A7i%C5%9F_S%C4%B1nav%C4%B1 — DGS 100q/135min, per-section penalty
- https://rehberpanda.com/blog/2026-dgs-gecis-bolumleri-nelerdir-hangi-bolumler-gecis-yapar/ — DGS taban puan aralıkları (sanity check on score scale)
- https://www.kariyer.net/kariyer-rehberi/?p=17431 — ALES current weights 75/25, 25/75, 50/50 (explicit)
- https://www.iienstitu.com/tr/blog/ales-sinavi-nedir — ALES per 2019/1 kılavuz: net formula, SP process, 100q/150min, 3×/year, 5-year validity
- https://www.iyigunler.net/aleste-koklu-degisiklik/305611/ + https://www.memleket.com.tr/aleste-koklu-degisiklik-1206381h.htm — 2017 YÖK reform: 4-test→2-test, EA→50/50
- https://www.academia.edu/89581468/ (KEFAD journal) — old P121 = GY %15 + GK %15 + EB %20 + ÖABT %50
- https://www.bilimsenligi.com/ogretmenlik-alan-bilgisi-testi-degerlendirme-raporu.html/ — ÖABT net formula, SP×0.50 ASP weighting
- https://www.osymli.com/meb/akademi-giris-sinavi-ags-ne-zaman.html — MEB-AGS structure, P2 = AGS %50 + ÖABT %50, ÖABT now 50 questions
- https://rehberpanda.com/blog/2026-kpss-p1-p2-p3-puan-farklari-kadro-eslestirme/ — MEB-AGS-P1 sub-weights 20/20/15/10/25/10, P2/P3 formulas
- https://bilgitik.com/detay/3399/osym-erisim-engellendi — 2026 MEB-AGS scoring incident (2025 weights mistakenly used; caveat on sub-test weights)
- https://www.egitimuzem.com/blog/icerik/kpss-oabt-uzaktan-egitim — old ÖABT 75 questions, P121 ÖABT weight 50%
- https://www.editoryayinevi.net/ogrenci-icerikleri/dgs-3-deneme-sinavi/dgs-3-deneme-sinavi.pdf — DGS booklet: 100q/135min, per-test penalty rule (primary-source-style confirmation)

**Items marked UNVERIFIED:** exact score floors for KPSS/ALES (no official minimum published); DGS official min/max (no cap published — typical band derived from formula mechanics); ALES 75/25 vs 70/30 mapping discrepancy (working figure 75/25 — verify against current ÖSYM ALES kılavuzu); 2026 MEB-AGS sub-test weights (stated 20/20/15/10/25/10 — re-verify against 2026 MEB-AGS kılavuzu given the scoring incident).