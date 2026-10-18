Research complete. All four exams verified against official ÖSYM kılavuzları (dokuman.osym.gov.tr), cross-checked with secondary sources. Here is the full report.

---

# OFFICIAL SCORING FORMULAS — YDS / YÖKDİL / TUS / DUS
*Sources: ÖSYM 2026 kılavuzları (YDS/1, e-YDS, YÖKDİL/2, TUS 2. Dönem, DUS 2. Dönem). Formulas below are from the kılavuz "Değerlendirme" sections.*

## 1. YDS / e-YDS

- **Questions:** 80, multiple-choice (official: *"çoktan seçmeli 80 sorudan oluşan testler kullanılır"*). 180 minutes, 10:15 start.
- **Wrong-answer penalty:** NONE — CONFIRMED official (kılavuz 3.8: *"Değerlendirme sırasında yalnız doğru cevaplar dikkate alınacak, yanlış cevaplar dikkate alınmayacaktır."*). e-YDS kılavuzu 3.6: identical wording.
- **Formula:** `Puan = Doğru Sayısı × 1.25` (equivalently `Doğru / 80 × 100`). Official: *"Adayların doğru cevap sayıları toplanarak 100 üzerinden YDS puanları hesaplanacaktır."*
- **Score range:** 0–100. Official levels: A = 90–100, B = 80–89, C = 70–79, D = 60–69, E = 50–59.
- **Validity:** ÖSYM sets no single universal validity. Official rules found: TUS/DUS/EUS placement requires the foreign-language result to be within **5 years** of the exam date (YDS kılavuzu 1.5); doçentlik minimum 55, doktora minimum 55 (kılavuzu 1.2). Dil tazminatı practice: 5 years.
- **Nuance:** e-YDS includes unscored pilot ("deneme") questions not counted in scoring (official e-YÖKDİL/e-YDS kılavuzları).
- **Worked example:** 52 doğru, 20 yanlış, 8 boş → penalty none → Puan = 52 × 1.25 = **65.00** (D seviyesi).
- **Calculator implication:** Fully deterministic — client-side tool gives the EXACT score.

## 2. YÖKDİL (incl. e-YÖKDİL)

- **Questions:** 80, 180 minutes (official: *"Sınavda soru sayısı 80, sınav süresi 180 dakika olacaktır."*). Single session, 10:15.
- **Fields:** English → Fen / Sağlık / Sosyal (candidate picks one per session); German/Arabic/French → Social only (official 1.1–1.2, 1.4).
- **Does field affect scoring?** NO. Scoring identical across fields — field only changes reading-text content (cross-checked: ankaradil, remzihoca, vaktime, hazirtest all agree).
- **Wrong-answer penalty:** NONE — CONFIRMED official (2026-YÖKDİL/2 kılavuzu 3.8: *"Değerlendirme sırasında yalnız doğru cevaplar dikkate alınacak, yanlış cevaplar dikkate alınmayacaktır."*; *"doğru cevap sayıları toplanarak 100 üzerinden sınav puanları hesaplanacaktır."*)
- **Formula:** `Puan = Doğru Sayısı × 1.25`, range 0–100.
- **Validity (official, kılavuz 1.7):** **5 years** for lisansüstü education and prep-class exemption; **permanent (sürekli)** for teaching-staff appointments and doçentlik applications.
- **Worked example:** 64 doğru → 64 × 1.25 = **80.00**.
- **Calculator implication:** Fully deterministic — EXACT score client-side.

## 3. TUS (Tıpta Uzmanlık)

- **Sessions (official 1.3):** Temel Tıp Bilimleri Testi (TTBT) — 100 questions, 10:15, 135 min; Klinik Tıp Bilimleri Testi (KTBT) — 100 questions, 14:45, 135 min. Total 200 questions. (Note: older format was 120+120; current 100+100 confirmed in 2026 kılavuzu.)
- **Wrong-answer penalty:** YES — `Ham Puan = Doğru − Yanlış/4`, per test (official 4.2).
- **Standardization:** each test's ham puan → standard score, mean 50, SD 10 (official 4.2): `SP = 50 + 10 × (Ham − X_test) / S_test`.
- **Session weights (official 4.2, tıp fakültesi graduates):**
  - `Ağırlıklı K = 0.4 × SP_TTBT + 0.6 × SP_KTBT` (clinical-weighted)
  - `Ağırlıklı T = 0.6 × SP_TTBT + 0.4 × SP_KTBT` (basic-sciences-weighted)
  - `Ağırlıklı A = 1.0 × SP_KTBT` (only for contracted family-physician applicants, on request)
  - Non-medical graduates: `Ağırlıklı T = 1.0 × SP_TTBT` (they take TTBT only)
- **Final conversion (official, kılavuz p.28 — verified by rendering the PDF page as image):**
  `Sınav Puanı = 55 + 30 × [7(AP − X) − S] / [7(EBAP − X) − S]`
  where AP = candidate's weighted score, EBAP = highest weighted score, X = mean, S = SD. Top scorer → exactly **85**. **Maximum score: 85** (official: *"en yükseği 85 olan K, T ve A puanları"*).
- **Threshold:** 45 — below 45 in the relevant score type = excluded from placement (official 1.2, 5.5).
- **OBP/diploma component:** NONE (score is 100% exam performance).
- **Foreign language:** YDS ≥ 50 (or equivalent), result within 5 years, required for placement (official 1.4).
- **Score range:** 0–85 official max; theoretical minimum UNVERIFIED (formula has no explicit floor; empirical floor ~40).
- **Worked example** (session statistics ASSUMED — marked as illustration only):
  - Inputs: TTBT 70D/20Y → ham = 70 − 5 = 65. KTBT 60D/30Y → ham = 60 − 7.5 = 52.5.
  - Assume TTBT session mean ham 45, SD 12 → SP_TTBT = 50 + 10×(65−45)/12 = **66.67**.
  - Assume KTBT session mean ham 40, SD 11 → SP_KTBT = 50 + 10×(52.5−40)/11 = **61.36**.
  - Ağırlıklı K = 0.4×66.67 + 0.6×61.36 = **63.49**. Ağırlıklı T = 0.6×66.67 + 0.4×61.36 = **64.55**.
  - Assume weighted K stats: EBAP = 78, X = 50, S = 8.5 → K Puanı = 55 + 30×[7×(63.49−50) − 8.5] / [7×(78−50) − 8.5] = 55 + 30×85.93/187.5 = **68.75**.
- **Calculator implication:** Exact final score is NOT computable client-side (needs that session's X, S, EBAP). Tool should show per-test net (ham puan) + weighted estimate labeled "tahmini".

## 4. DUS (Diş Hekimliğinde Uzmanlık)

- **Sessions (official):** SINGLE session, 10:15, **150 minutes**.
- **Questions (official Tablo 1):** **120 total** = Temel Bilimler Testi (TBT) **40** [Anatomi 6, Histoloji-Embriyoloji 4, Fizyoloji 6, Biyokimya 6, Mikrobiyoloji 6, Patoloji 4, Farmakoloji 4, Biyoloji-Genetik 4] + Klinik Bilimler Testi (KBT) **80** [8 clinical fields × 10: Restoratif, Protetik, Cerrahi, Radyoloji, Periodontoloji, Ortodonti, Endodonti, Çocuk Diş].
- **Wrong-answer penalty:** YES — `Ham Puan = Doğru − Yanlış/4`, per test (official 4.2).
- **Standardization:** per test, mean 50, SD 10 (official 4.2).
- **Session weights (official 4.2):** `K Puanı = 0.4 × SP_TBT + 0.6 × SP_KBT`; `T Puanı = 0.6 × SP_TBT + 0.4 × SP_KBT`.
- **Which score is used:** Oral Patoloji → T puanı; ALL other branches → K puanı (official 4.2).
- **85-cap conversion:** NONE — verified absent (no "dönüşüm"/"85" anywhere in the DUS kılavuz). DUS Puanı = weighted standard score directly (official 5.5: *"Yerleştirmede esas alınacak Ağırlıklı Mesleki Bilgi Sınavı Puanı"*).
- **Threshold:** 45 (official 5.5: below 45 excluded from placement).
- **OBP component:** NONE. **Foreign language:** YDS ≥ 50 within 5 years (official 1.6).
- **Score range:** standard-score scale; no official min/max published → theoretical min/max UNVERIFIED (empirical taban puanları 2026: ~60–68, e.g. Ortodonti 67.76).
- **"En az 30 net" claim** (boenstitu blog): NOT in the kılavuz → UNVERIFIED.
- **Worked example** (session stats ASSUMED):
  - Inputs: TBT 28D/8Y → ham = 28 − 2 = 26. KBT 55D/20Y → ham = 55 − 5 = 50.
  - Assume TBT mean 22, SD 6 → SP_TBT = 50 + 10×(26−22)/6 = **56.67**.
  - Assume KBT mean 42, SD 10 → SP_KBT = 50 + 10×(50−42)/10 = **58.00**.
  - K Puanı = 0.4×56.67 + 0.6×58 = **57.47** → DUS puanı ≈ **57.47** (≥ 45, tercih yapabilir).
- **Calculator implication:** same as TUS — show per-test net + weighted estimate labeled "tahmini"; no 85-cap.

## Conflicting/outdated sources found (do NOT use)
- tusmer.com, tr.wikipedia.org/wiki/Tus, istanbulticaretgazetesi.com cite OLD TUS weights (K: 0.5/0.5, T: 0.7/0.3, "TTBT-1/TTBT-2") — superseded by current kılavuz (0.4/0.6, 0.6/0.4).
- boenstitu.com's YDS page describes net-minus-penalty + standardization for YDS — contradicts the official kılavuz (no penalty, direct scoring).
- rehberpanda.com's DUS "200 soru, 250 dakika" — outdated; current official: 120 soru, 150 dakika.
- tuskocu.com's "18 net baraj" / per-net point values are session-specific empirical estimates, not official formulas.

## Source URLs
1. https://dokuman.osym.gov.tr/pdfdokuman/2026/YDS-1/kilavuz_yd1d18022026.pdf — 2026-YDS/1 Başvuru Kılavuzu (80 soru, no penalty, levels, validity)
2. https://dokuman.osym.gov.tr/web//2026/8/2026-elektronik-yabanci-dil-sinavi-2026-e-yds-kilavuzu-1zhshr-05113115.pdf — 2026 e-YDS Kılavuzu
3. https://dokuman.osym.gov.tr/web//2026/7/basvuru-kilavuzu-k4uy69-30101755.pdf — 2026-YÖKDİL/2 Kılavuzu (80 soru/180 dk, no penalty, 5-yıl/sürekli validity, fields)
4. https://dokuman.osym.gov.tr/pdfdokuman/2024/e-YOKDIL/kilavuz_ykd18042024.pdf — e-YÖKDİL Kılavuzu (deneme sorular note)
5. https://dokuman.osym.gov.tr/web//2026/7/basvuru-kilavuzu-rn15c8-30102957.pdf — 2026-TUS 2. Dönem Başvuru Kılavuzu (100+100 soru, D−Y/4, weights, 85-cap formula p.28, 45 baraj)
6. https://dokuman.osym.gov.tr/web//2026/9/basvuru-kilavuzu-e1esxj-16163038.pdf — 2026-DUS 2. Dönem Başvuru Kılavuzu (120 soru Tablo 1, D−Y/4, weights, 45 baraj, no conversion)
7. https://www.ankaradil.com/yds/28-yds-puan-hesaplama?d=54 — cross-check YDS/YÖKDİL 1.25 formula
8. https://vaktime.com/blog/yokdi-l-kac-dakika-2026-sinav-suresi-soru-sayisi-ve-tam-takvim — cross-check YÖKDİL
9. https://www.remzihoca.com/yokdil-sinavi-hakkinda-bilgiler — cross-check YÖKDİL
10. https://sinavbul.net/tus — cross-check TUS format/weights (cites ÖSYM kılavuzu)
11. https://tusai.app/tus-tercih-robotu — cross-check TUS weights + 45 threshold
12. https://www.hazirtest.com/indir/HazirTest-Kullanim-Kilavuzu.pdf — cross-check YDS/YÖKDİL "yanlış doğruyu götürmez, her doğru 1.25"

**Bottom line for the build:** YDS/YÖKDİL calculators can show EXACT scores (deterministic). TUS/DUS calculators must show ham puan (net) per session plus a clearly-labeled estimated (tahmini) final score, since the official final score depends on session statistics (X, S, EBAP) only ÖSYM knows.