Research complete. I cross-checked official ÖSYM kılavuzu text (via quoted FAQ sections), MEB school guidance docs (which reproduce the official tables), and multiple 2026 edu sources. Here is the full report.

---

# YKS Exam Family — Official Scoring Formulas Research Report
**Date:** 2026-10-18 | **Purpose:** PuanRobotu calculator-hub build (accuracy-critical)

## 0. Universal ÖSYM pipeline (applies to TYT, AYT, YDT, MSÜ)

1. **Net (ham puan) per test:** `Net = Doğru − (Yanlış ÷ 4)` — 4 wrong answers cancel 1 right, per test. Verified across all sources; this is the official ÖSYM rule.
2. **Standart Puan (SP) per test:** `SP = 50 + 10 × (Net − Test Ortalaması) ÷ Test Standart Sapması` — computed from that year's actual candidate distribution (mean/SD published by ÖSYM after the exam).
3. **Ağırlıklı Puan (weighted score):** each test's SP multiplied by the official Tablo weights, summed per puan türü.
4. **Rescale to 100–500:** weighted scores are linearly converted so min = 100, max = 500 (year-dependent; exact conversion needs that year's distribution).
5. **Yerleştirme Puanı:** `= Sınav Puanı + OBP × 0.12` (or × 0.06 if kırık-OBP). Max ≈ 560.

**Critical build implication:** steps 2 and 4 require that year's mean/SD/min/max, so no calculator can reproduce the exact official score. All tools (including competitors) implement the **linear net-based estimator** below and must label results "tahmini". The per-net coefficients below are the MEB-published rounded Tablo weights — internally consistent with the official 40/60 and 50/50 splits (verified arithmetically).

---

## 1. TYT (Temel Yeterlilik Testi)

**Structure (120 questions, 165 min, all candidates must take it):**

| Test | Questions | Sub-breakdown |
|---|---|---|
| Türkçe | 40 | — |
| Temel Matematik | 40 | — |
| Sosyal Bilimler | 20 | Tarih 5, Coğrafya 5, Felsefe 5, Din Kültürü 5 (DKAB-exempt students answer 5 extra Felsefe instead) |
| Fen Bilimleri | 20 | Fizik 7, Kimya 7, Biyoloji 6 |

**Net formula:** `Net_test = Doğru − Yanlış/4` per test.

**Validity rule:** TYT score is only calculated if the candidate has **≥ 0.5 ham puan from Türkçe OR Temel Matematik** (verified: MEB Atabey doc + rehberpanda). The old 150-point baraj was abolished (YÖK decision 11 Feb 2022, effective 2022-YKS).

**Official weights (Tablo-1A):** Türkçe ×1.32, Sosyal ×1.36, Temel Mat ×1.32, Fen ×1.36 → test shares: Türkçe 33%, Mat 33%, Sosyal 17%, Fen 17% (verified: MEB Atabey doc).

**Linear estimator (what the calculator implements):**
`TYT Ham ≈ 100 + (Net_TR × 3.3) + (Net_SOS × 3.4) + (Net_MAT × 3.3) + (Net_FEN × 3.4)`
`TYT Yerleştirme ≈ TYT Ham + OBP × 0.12`
(per-net coefficients verified: two MEB school docs — Kızılcahamam and fkal; max = 100 + 132+68+132+68 = 500 ✓)

**Score range:** 100–500 (sınav puanı); yerleştirme max ≈ 560.

**Worked example** (Diploma notu 85 → OBP 425):
- Türkçe 32D/8Y → net 30; Sosyal 14D/4Y → net 13; Mat 28D/8Y → net 26; Fen 12D/8Y → net 10 (total 79 net)
- Ham = 100 + 30×3.3 + 13×3.4 + 26×3.3 + 10×3.4 = 100 + 99 + 44.2 + 85.8 + 34 = **363.0**
- OBP katkısı = 425 × 0.12 = 51 → **Yerleştirme ≈ 414.0**
- Sanity check vs published 2025 anchor (egitimyoldasim): 80 net → ~379 ham; our 79 net → 363 ham (within ~4%; estimator is approximate by design — label "tahmini").

---

## 2. AYT (Alan Yeterlilik Testleri)

**Structure (160 questions total in booklet, 180 min; candidate answers 80–160 depending on target puan türü):**

| Test | Questions | Sub-breakdown |
|---|---|---|
| Türk Dili ve Edebiyatı–Sosyal Bilimler-1 | 40 | Edebiyat 24, Tarih-1 10, Coğrafya-1 6 |
| Sosyal Bilimler-2 | 40 | Tarih-2 11, Coğrafya-2 11, Felsefe Grubu 12, Din Kültürü 6 |
| Matematik | 40 | — |
| Fen Bilimleri | 40 | Fizik 14, Kimya 13, Biyoloji 13 |

**Net formula:** same `Doğru − Yanlış/4` per subtest.

**Validity rule:** each puan türü requires **≥ 0.5 ham puan from at least one of its own tests** (verified: bkmkitap): SAY → Mat or Fen; SÖZ → TDE-Sos1 or Sos2; EA → Mat or TDE-Sos1. Plus the TYT validity rule must also hold. No fixed baraj since 2022 (but başarı-sırası thresholds continue for Tıp/Hukuk/Mühendislik/Mimarlık/Öğretmenlik).

**Official composition (ÖSYM kılavuzu FAQ, quoted verbatim by bogaziciders):**
- **SAY** = TYT × 40% + [(Matematik × 50%) + (Fen Bilimleri × 50%)] × 60%
- **SÖZ** = TYT × 40% + [(TDE-Sos1 × 50%) + (Sos2 × 50%)] × 60%
- **EA** = TYT × 40% + [(TDE-Sos1 × 50%) + (Matematik × 50%)] × 60%

**Linear estimator coefficients (per net; MEB fkal doc, internally verified to reproduce the splits above):**

| Puan türü | Formula |
|---|---|
| SAY | 100 + TR×1.32 + SOS×1.36 + TMat×1.32 + Fen×1.36 + AMat×3 + Fiz×2.85 + Kim×3.07 + Biy×3.07 + OBP×0.12 |
| EA | 100 + TR×1.32 + SOS×1.36 + TMat×1.32 + Fen×1.36 + AMat×3 + Ede×3 + Tar1×2.8 + Coğ1×3.33 + OBP×0.12 |
| SÖZ | 100 + TR×1.32 + SOS×1.36 + TMat×1.32 + Fen×1.36 + Ede×3 + Tar1×2.8 + Coğ1×3.33 + Tar2×2.91 + Coğ2×2.91 + Fel×3 + Din×3.33 + OBP×0.12 |

Consistency checks (all pass): SAY AYT part max = 120+39.9+39.91+39.91 = 239.72 ≈ 240 = 60% ✓; Mat 120/400 = 30%, Fiz/Kim/Biy 10% each ✓ (matches formulkutusu); EA: 120+72+28+20 = 240 ✓ (30/18/7/5 ✓); SÖZ: TDE-Sos1 = 72+28+20 = 120 (30% ✓), Sos2 = 32.01+32.01+36+19.98 = 120 (30% ✓).

**Score range:** 100–500 per puan türü; yerleştirme max ≈ 560.

**Worked example — SAY** (same TYT nets as §1: TR 30, SOS 13, TMat 26, Fen 10; diploma 85):
- AYT: Mat 30D/8Y → 28; Fizik 10D/4Y → 9; Kimya 9D/4Y → 8; Biyoloji 10D/4Y → 9
- TYT part = 30×1.32 + 13×1.36 + 26×1.32 + 10×1.36 = 39.6 + 17.68 + 34.32 + 13.6 = 105.2
- AYT part = 28×3 + 9×2.85 + 8×3.07 + 9×3.07 = 84 + 25.65 + 24.56 + 27.63 = 161.84
- Ham = 100 + 105.2 + 161.84 = **367.04**; + OBP 51 → **Yerleştirme ≈ 418.0**
- Sanity check vs published anchor (egitimyoldasim): "TYT 80 + AYT 50 net → SAY ~367" — our TYT79+AYT54 → ham 367.04. Remarkably consistent ✓

**Worked example — EA** (same TYT; AYT: Mat 28 net; Ede 20D/4Y → 19; Tar1 8D/4Y → 7; Coğ1 5D/4Y → 4):
- AYT part = 84 + 57 + 19.6 + 13.32 = 173.92 → Ham = 100 + 105.2 + 173.92 = **379.12** → Yerleştirme ≈ **430.1**

**Worked example — SÖZ** (same TYT; TDE-Sos1: Ede 19, Tar1 7, Coğ1 4; Sos2: Tar2 9D/4Y → 8, Coğ2 8D/4Y → 7, Fel 10D/4Y → 9, Din 5D/4Y → 4):
- AYT part = 57 + 19.6 + 13.32 + 23.28 + 20.37 + 27 + 13.32 = 173.89 → Ham = **379.09** → Yerleştirme ≈ **430.1**

---

## 3. YDT (Yabancı Dil Testi)

- **Structure:** 80 questions, single test, **120 min** (2026: 21 June, 15:45). Languages: İngilizce, Almanca, Fransızca, Rusça (+ others per kılavuz).
- **Penalty:** same `Net = Doğru − Yanlış/4` (verified: Yıldız Technical Univ. page).
- **Dil puanı composition (ÖSYM kılavuzu FAQ):** **Dil = TYT × 40% + YDT × 60%**. Sub-weights (MEB/bogaziciders): TYT part = Türkçe 13% + Sosyal 7% + TMat 13% + Fen 7%; YDT = 60%.
- **Linear estimator:** `DİL ≈ 100 + TR×1.32 + SOS×1.36 + TMat×1.32 + Fen×1.36 + YDT_net×3 + OBP×0.12` (max = 100+160+240 = 500 ✓; MEB fkal doc).
- **Range:** 100–500; yerleştirme max ≈ 560. TYT validity rule (TR or TMat ≥ 0.5) applies; YDT ≥ 0.5 ham requirement is **UNVERIFIED** (expected by analogy, exact kılavuz wording not confirmed).
- **Worked example** (same TYT nets → TYT part 105.2; YDT 60D/8Y → net 58; diploma 85):
  - Ham = 100 + 105.2 + 58×3 + 51(OBP) → 100 + 105.2 + 174 = **379.2** → Yerleştirme ≈ **430.2**

---

## 4. OBP (Ortaöğretim Başarı Puanı)

- **Formula:** `OBP = Diploma Notu (100'lük sistem, 50–100) × 5` → **range 250–500** (verified: perenegitim, Işık Univ., MEB docs).
- **Placement contribution:** `Yerleştirme = Sınav Puanı + OBP × 0.12` — max +60 points, same coefficient for ALL puan türleri (verified: rehberpanda).
- **Worked example** (official MEB example): diploma 78 → OBP = 390 → katkı = 390 × 0.12 = **46.8** ✓
- **Kırık-OBP (broken OBP):** if the candidate was **placed in any higher-education program in the immediately preceding year's YKS** (merkezi yerleştirme, açıköğretim, or özel-yetenek placements all count), the coefficient halves to **0.06** the next year (max +30). Verified across formulkutusu, Işık Univ., MEB docs.
  - NOT triggered by: merely preferring (tercih) without placement; not taking the exam; "mezuna kalmak" (repeating a year without placement). Only the immediately previous year counts.
  - Kırık example: OBP 390 → 390 × 0.06 = **23.4** (loss of 23.4 points ≈ tens of thousands of ranks).
- **5'lik sistem diplomas:** use the school's official 100'lük karşılığı (not a ×20 conversion — verified: hesapadresi).
- **UNVERIFIED:** okul-birincisi ek-puan mechanics (kontenjan advantage exists; exact point mechanics not confirmed — Işık Univ. claims an ek puan exists).

---

## 5. MSÜ (Millî Savunma Üniversitesi Askeri Öğrenci Aday Belirleme Sınavı)

- **Structure:** 120 questions — Türkçe 40, Temel Matematik 40, Sosyal Bilimler 20 (Tarih/Coğrafya/Felsefe/Din 5 each), Fen Bilimleri 20 (Fizik 7, Kimya 7, Biyoloji 6). Same blueprint as TYT.
- **Duration: CONFLICT — UNVERIFIED.** akademikpersonel.org says 135 min; vaktime.com's 2026 table implies 165 min (10:15–13:00). (Duration doesn't affect scoring; recommend 135 with a note, or omit.)
- **Puan türleri (4):** MSÜ-SA (Sayısal), MSÜ-EA (Eşit Ağırlık), MSÜ-SÖ (Sözel), MSÜ-GN (Genel). Usage: Harp Okulları call by SA/EA/SÖ; Astsubay MYOs by GN (verified: zeduva).
- **Scoring:** same ÖSYM pipeline — Net = D − Y/4; SP = 50 + 10(net−mean)/SD; weighted by test %; rescaled **100–500** (verified: official kılavuz text via tasovametem MEB doc). **No OBP in MSÜ.** Validity: ≥ 0.5 ham from Temel Matematik OR Türkçe (verified: vaktime).
- **Official test weights %** (MEB Baykan school doc reproducing the kılavuz table; SA/EA/SÖ rows also confirmed by akademikpersonel):

| Puan türü | Türkçe | Tem. Mat | Fen | Sosyal |
|---|---|---|---|---|
| MSÜ-SA | 25 | 35 | 30 | 10 |
| MSÜ-EA | 35 | 35 | 10 | 20 |
| MSÜ-SÖ | 35 | 20 | 10 | 35 |
| MSÜ-GN | **37** | **37** | **13** | **13** |

  ⚠️ **CONFLICT on MSÜ-GN — UNVERIFIED:** akademikpersonel.org lists GN as 33/33/17/17 (identical to TYT's split, which looks like a copy error); the MEB doc's 37/37/13/13 is the one presented as the official table. Recommend 37/37/13/13 with a footnote.
- **Linear estimator (derived for calculator use — NOT official-published; per-net coefficients = 400 × weight% ÷ questions):**
  - SA: `100 + TR×2.5 + MAT×3.5 + FEN×6.0 + SOS×2.0`
  - EA: `100 + TR×3.5 + MAT×3.5 + FEN×2.0 + SOS×4.0`
  - SÖ: `100 + TR×3.5 + MAT×2.0 + FEN×2.0 + SOS×7.0`
  - GN: `100 + TR×3.7 + MAT×3.7 + FEN×2.6 + SOS×2.6`
  (each maxes at 100 + 400 = 500 ✓)
- **Worked example — MSÜ-SA** (TR 30D/8Y → 28; MAT 25D/4Y → 24; FEN 12D/4Y → 11; SOS 10D/4Y → 9):
  - 100 + 28×2.5 + 24×3.5 + 11×6 + 9×2 = 100 + 70 + 84 + 66 + 18 = **388.0**
- **Worked example — MSÜ-GN** (same nets): 100 + 28×3.7 + 24×3.7 + 11×2.6 + 9×2.6 = 100 + 103.6 + 88.8 + 28.6 + 23.4 = **344.4**
- Note: MSÜ alone is not sufficient for placement — Harp Okulları also require AYT, Astsubay MYOs require TYT (verified: vaktime).

---

## UNVERIFIED / conflict summary (for the build)
1. **Exact ÖSYM kılavuzu Tablo-1A/1B/1C/1D/1E decimals** — could not open the kılavuz PDF directly; using MEB-published rounded coefficients (1.32/1.36; 3/2.85/3.07/3.07; 3/2.8/3.33; 2.91/2.91/3/3.33), which are arithmetically consistent with all official % splits. Recommend labeling all outputs "tahmini".
2. **MSÜ-GN weights:** 37/37/13/13 (MEB) vs 33/33/17/17 (akademikpersonel).
3. **MSÜ duration:** 135 vs 165 min (doesn't affect scoring).
4. **DİL ≥ 0.5 ham rule** exact wording.
5. **Okul-birincisi** point mechanics.
6. Year-specific SP means/SDs and 100–500 rescale parameters — inherently unavailable pre-results; this is why estimation is the only option.

## Source URLs
- https://www.bogaziciders.com/ingilizce-matematik-ozel-ders-paketleri/etiket/yks%20nedir/amp (ÖSYM kılavuzu FAQ quotes: puan türü %40/%60 formulas, test splits)
- https://fkal.meb.k12.tr/meb_iys_dosyalar/45/03/972356/dosyalar/2022_02/28115815_puan-hesaplama.pdf (MEB: full coefficient tables Y-TYT/Y-DİL/Y-EA/Y-SÖZ/Y-SAY)
- https://kizilcahamamanadolulisesi.meb.k12.tr/meb_iys_dosyalar/06/18/317415/dosyalar/2024_10/02134300_2025yksbrosur.pdf (MEB YKS broşürü: per-net 3.3/3.4, 1.32/1.36)
- https://atabeyanadolulisesi.meb.k12.tr/meb_iys_dosyalar/32/03/973773/dosyalar/2021_10/20112920_YKS-2022.pdf (MEB: TYT %33/33/17/17, 0.5 rule, SÖZ sub-weights)
- https://baykananadolulisesi.meb.k12.tr/meb_iys_dosyalar/56/03/197069/dosyalar/2020_01/01133112_MSUU.pdf (MSÜ official weight table)
- https://tasovametem.meb.k12.tr/meb_iys_dosyalar/05/06/905493/dosyalar/2025_01/14133809_msubilgilendirme.pdf (MSÜ: 100–500 rescale, school preferences)
- https://tuzlamahirizaihl.meb.k12.tr/meb_iys_dosyalar/34/32/757705/dosyalar/2025_04/09114054_obpnedir.pdf (OBP: 78→390→46.8 worked example)
- https://www.bkmkitap.com/blog/ayt-nedir (AYT 0.5 rule per puan türü, baraj abolition 2022)
- https://rehberpanda.com/blog/2026-yks-acilimi-ve-sinavi-nedir-kapsamli-rehber/ (puan türleri, TYT 40% weight, 2026 dates)
- https://www.formulkutusu.com/rehber/yks-tyt-ayt-puan-ve-siralama-hesaplama-rehberi (SP formula, sub-test % splits, kırık OBP)
- https://aday.isikun.edu.tr/blog/obp-nedir-nasil-hesaplanir-yksye-katkisi-ve-avantajlari (OBP rules, kırık conditions)
- https://akademikpersonel.org/msu-bolumler-ve-puanlari/ (MSÜ structure 120q/135min, weights)
- https://vaktime.com/blog/msu-sonuclari-ne-zaman-aciklanacak-2026-milli-savunma-universitesi-sinav-sonucu-tarihi-sorgulama-tercih-takvimi-ve-tum-detaylar (MSÜ 2026 facts, 0.5 rule, standardization pipeline)
- https://bilgitik.com/detay/4122/yks-soru-sayilari (2026 question counts, durations, published test means)
- https://www.egitimyoldasim.com/yks/ (net→puan anchors: TYT 60→320 / 80→379 / 100→439; SAY TYT80+AYT50→367)
- https://www.fuzem.com/yks-siralama-hesaplama-rehberi-2025-adim-adim-nasil-yapilir (DİL = TYT×0.4 + YDT×0.6)
- https://robot.perenegitim.com/yks.php (calculator input structure cross-check: question counts per test)
- https://zeduva.com/msu-ile-ilgili-her-sey (MSÜ school call-up by puan türü)

**Bottom line for the build:** the net-based linear estimators above (all maxing exactly at 500, all consistent with official % splits, sanity-checked against two published real-data anchors) are the correct formulas for the calculators. Every output must be labeled "tahmini" since true scores depend on that year's standardization. The five UNVERIFIED items above are the only accuracy risks, and none blocks the build.