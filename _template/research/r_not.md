All 8 topics researched. Here is the structured report.

---

# RESEARCH REPORT — Official Turkish Grade/Score Calculation Rules (Grades Cluster)

## 1. Vize–Final (university course grade)

**Standard model (modal default):** Başarı notu = Vize×0.40 + Final×0.60. (Yozgat Bozok University regulation, official PDF: "Vize sınavlarının not ortalamalarına katkısı %40; Final, Bütünleme ve Tek Ders-Üç Ders sınavlarının katkısı %60'dır.") Other common splits exist: %30/%70 and %50/%50 — **weights are set by each university's senate and vary**.

**"Finalden kaç almalıyım" formula:** Gerekli Final = (Hedef − Vize × wv) / wf, with wv=0.40, wf=0.60 as default.
**Worked example** (matches tamliste.tr): Vize=50, hedef=50 → (50 − 50×0.40)/0.60 = 30/0.60 = **50 final gerekir**. Second: Vize=80, hedef=60 → (60−32)/0.60 = **46.67**.

**Geçme notu:** typically **50** (final ≥50 AND average ≥50 in many regs); some universities use **60**. **Bütünleme (büt):** replaces the final with the same weight (%60) — it is a "final yerine geçen" rescue exam. **Final barajı:** some universities require a minimum final score regardless of the average — exact threshold is **university-dependent (UNVERIFIED as a single number)**.

## 2. GANO / AGNO (university GPA, 4.00 scale)

**Letter coefficients — CONFIRMED** (Nevşehir University official; Erciyes University regulation Madde 19): AA=4.00, BA=3.50, BB=3.00, CB=2.50, CC=2.00, DC=1.50, DD=1.00, FD=0.50, FF=0.00. (Note: some universities omit FD/DC/DD — e.g., Okan uses only AA–CC+FF.)

**Formula:** GANO = Σ(harf katsayısı × ders kredisi) / Σ(kredi). Failed courses (FF) count 0 in the numerator but their credits stay in the denominator.
**Worked example:** 4-kredi BA (3.50→14.0) + 3-kredi BB (3.00→9.0) + 2-kredi FF (0→0) = 23.0 / 9 kredi = **2.56**.
**Pass rule:** usually CC or above passes directly. **DC/DD conditional pass** (şartlı geçme, typically if GANO ≥ 2.00): **university-dependent — UNVERIFIED as a universal rule** (Erciyes' own table marks DC/DD as "Kalır"). **GANO vs AGNO:** GANO = all courses in the program; AGNO may additionally include prep/special-program courses (varies).

## 3. Harf notu (100 → letter bands)

**Bands vary by university senate — no single national table.** Confirmed examples:
- **Kent:** AA 90–100, BA 85–89, BB 80–84, CB 70–79, CC 60–69, DC 55–59, DD 50–54, FF 0–49
- **GTU:** AA 90–100, BA 85–89, BB 80–84, CB 75–79, CC 70–74, DC 65–69, DD 60–64, FD 50–59, FF ≤49
- **İstanbul Aydın:** AA 90–100 … CC 70–74, DC 60–69, DD 50–59, FD 40–49, FF 0–39
- **Sakarya (relative):** AA 90–100, BA 85–89, BB 80–84, CB 75–79, CC 65–74, DC 58–64, DD 50–57, FF ≤49

**Stable core:** AA=90+, BA=85–89, BB=80–84 are near-universal; the CC/DD/FD cutoffs are where universities differ. Calculator must label bands as "örnek/üniversiteye göre değişir" and ideally be configurable.

## 4. Çan eğrisi (relative / bell-curve grading)

**Standard T-score model (official — İnönü University):** z = (X − μ)/σ; **T = 10 × z + 50** (i.e., T = [(X−μ)/σ]×10 + 50). Class mean and SD are computed from all students' ham başarı notları.
**Sakarya variant** (published paper): T = s×(Xi − X̄)/S + BAO, where the instructor sets BAO (relative mean) and s = (ÜstDeğer − X̄)/(Xmax − X̄) stretches the top score to a chosen upper value.
**Generic z→letter mapping** (international standard, NOT Turkey-official): A: z≥1.5, B: 0.5–1.5, C: −0.5–0.5, D: −1.5–−0.5, F: <−1.5. **Exact T-score→letter bands are set per university senate — UNVERIFIED as a single table; do not hardcode.**
**Worked example:** Class μ=55, σ=10. Student X=70 → z=(70−55)/10=1.5 → T=10×1.5+50=**65** (top band). Same student if class μ=75: z=−0.5 → T=45 (middle-low band) — this demonstrates relativity. **AÖF alt limit:** başarı notu <35 → automatic FF regardless of curve (official AÖF esaslar).

## 5. AÖF (Anadolu Açıköğretim) grading — official

From Anadolu University Senate decisions (official PDFs):
- **Başarı Notu = Ara Sınav×0.30 + Dönem Sonu×0.70.** Exceptions: English-medium courses in English Teacher program: %40/%60; courses with homework: ara %30 + ödev %20 + dönem sonu %50; yaz okulu: %100.
- **Alt sınır:** başarı notu **<35 → automatic FF** (lab courses: 60; uygulama courses: 50).
- **Harf notu:** for scores ≥35, determined by **bağıl değerlendirme (relative grading)** per course — same raw score can yield different letters in different courses.
- **Worked example** (matches published examples): Ara=60 → 60×0.30=18; Dönem sonu=80 → 80×0.70=56; **Başarı notu = 74** → letter assigned by that course's curve. Note: a student with good ara who skips the final fails (final weight dominates).
- (Exam mechanics: 20 multiple-choice questions per course, 30 min each — context only.)

## 6. YÖK 4.0↔100 not dönüşüm tablosu — OFFICIAL values

From the YÖK-titled table (Uludağ University PDF; full 0.01-step text cross-checked at bilgibirikimi.net — values match). **Key rows (4.00-scale → 100-scale):**
4.00→100 | 3.90→97.66 | 3.80→95.33 | 3.70→93.00 | 3.60→90.66 | **3.50→88.33** | 3.40→86.00 | 3.30→83.66 | 3.20→81.33 | 3.10→79.00 | **3.00→76.66** | 2.90→74.33 | 2.80→72.00 | 2.70→69.66 | 2.60→67.33 | **2.50→65.00** | 2.40→62.66 | 2.30→60.33 | 2.20→58.00 | 2.10→55.66 | 2.00→53.33 | 1.50→41.66 | 1.00→30.00.
Finer: 3.99→99.76, 3.95→98.83, 3.55→89.50, 3.45→87.16, 2.75→70.83, 2.25→59.16, 1.75→47.50, 1.25→35.83. Step ≈ 0.23–0.24 per 0.01. **Caution:** some universities publish their own different tables (e.g., OMU: 3.50→90.00; Trakya: banded ranges) — label the calculator "YÖK resmi tablosu" and note institutional variants exist.

## 7. İOKBS (bursluluk sınavı) — official 2026 MEB kılavuz

- **Structure:** 100 questions, 120 minutes, single session (10:00). 4 tests × 25 questions: Türkçe/Türk Dili ve Edebiyatı, Matematik, Fen Bilimleri, Sosyal Bilgiler/Sosyal Bilimler (covers grades 5,6,7,8, hazırlık, 9,10,11).
- **Penalty:** **3 yanlış = 1 doğru** — per test: HP = Doğru − (Yanlış/3).
- **Weights:** all four tests have ağırlık katsayısı **3**.
- **Scoring:** per-test ham puan → standard score → weighted sum = **TASP** (Toplam Ağırlıklı Standart Puan) → rescaled to **100–500**: **PUAN = 100 + 400×(TASP − minTASP)/(maxTASP − minTASP)**.
- **Worked example:** Türkçe 20D/5Y → HP = 20 − 5/3 = **18.33**. Rescale: TASP=240, min=120, max=360 → PUAN = 100 + 400×(240−120)/(360−120) = 100+200 = **300**.
- **Eligibility (context):** income threshold per capita, prior-year success, no school-change disciplinary penalty; application free via school/e-Okul.
- **Conflict flagged:** a 2027-preview article claims 80 questions/100 min and "4 yanlış" penalty for lise — **contradicts the official 2026 kılavuz; treat 2026 kılavuz as authoritative and re-verify when the 2027 kılavuz publishes.**

## 8. Takdir / Teşekkür (MEB Ortaöğretim Kurumları Yönetmeliği, Madde 160) — official

All conditions must hold: **(a)** özürsüz devamsızlık ≤ **5 gün**; **(b)** **tüm derslerden başarılı** (no failed courses); **(c)** dönem puanlarının **ağırlıklı ortalaması ≥ 70.00**; **(d)** **davranış puanı 100** (not reduced by disciplinary penalty: kınama −10, uzaklaştırma −20, etc.).
- **70.00–84.99 → Teşekkür belgesi; 85.00+ → Takdir belgesi.** Üstün Başarı Belgesi: takdir in all terms of at least 3 school years.
- **Worked example:** averages 88.2, no failures, 3 unexcused absences, no discipline → **Takdir**. Average 84.95 → **Teşekkür** (boundary is sharp).
- **Corrections to common blog errors:** blogs claiming "teşekkür needs 85" or "takdir needs 90" are **wrong per the regulation** — 70/85 are the legal thresholds. **Türkçe-specific baraj: NOT FOUND in current regulation — UNVERIFIED** (only "tüm derslerden başarılı" applies). **No verified 2024–2026 rule changes found** — blog speculation about 2026 changes is unconfirmed. Note: Madde 160 cited is the *Ortaöğretim* (high school) regulation; middle-school (İlköğretim) text not directly opened — thresholds widely cited as identical but **flag as second-hand for grades 5–8**.

---

## Source URLs
1. https://tamliste.tr/vize-final-hesaplama/
2. https://www.turkiyesigorta.com.tr/blog/yasam-diger/vize-final-ve-but-ortalama-hesaplamasi-nasil-yapilir
3. https://bozok.edu.tr/upload/dosya/xv8r.pdf (Bozok Univ. regulation)
4. https://iktisat.nevsehir.edu.tr/en/student (letter coefficients)
5. http://edebiyat.erciyes.edu.tr/EditorUpload/Files/54d9b50e-3e2b-4615-8c6e-7e83dda6636a.pdf (Erciyes regulation)
6. https://www.kent.edu.tr/grading-tables-101406 (Kent bands)
7. https://abl.gtu.edu.tr/ects/?dil=en&menu=doktora_sinavolcmedegerlendirme&bolum=325366&tip=doktora&duzey=ucuncu (GTU bands)
8. https://ebs.aydin.edu.tr/?Page=SinavDegerlendirmeMetodlari&&BK=1733 (Aydın bands)
9. https://www.inonu.edu.tr/inuyos/menu/10109/sinav-degerlendirme (T-score formula)
10. https://www.researchgate.net/publication/304490192_Determining_Relative_Arithmetic_Mean_and_Upper_Bound_in_Sakarya_University_Relative_Grading_System_Using_Artificial_Neural_Network (Sakarya model)
11. https://www.vodafone.com.tr/insan-kaynaklari/blog/can-egrisi-nedir (çan eğrisi explainer)
12. https://www.anadolu.edu.tr/uploads/anadolu/ckfinder/aof/files/Senato%20Karari%20O%CC%88DS%20(1).pdf (AÖF official esaslar)
13. https://www.anadolu.edu.tr/uploads/anadolu/files/aof_kilavuz/62ff6fe3d97fd.pdf (AÖF senate decision)
14. https://uludag.edu.tr/dosyalar/saglikbilimleri/not%20donusumu%202025.pdf (YÖK table, official-titled)
15. https://www.bilgibirikimi.net/not-donusum-tablosu-4luk-sistemdeki-notlarin-100luk-sistemdeki-karsiliklari/ (full YÖK table text)
16. https://tr.wikipedia.org/wiki/%C4%B0lk%C3%B6%C4%9Fretim_ve_Orta%C3%B6%C4%9Fretim_Kurumlar%C4%B1_Bursluluk_S%C4%B1nav%C4%B1 (İOKBS overview)
17. https://cosbortaokulu.meb.k12.tr/meb_iys_dosyalar/59/02/714340/dosyalar/2026_02/6985f056a8620939697517_IOKBS_Basvuru_ve_Uygulama_Kilavuzu_2026.pdf (İOKBS 2026 kılavuz, official MEB)
18. https://ayrancianadolu.meb.k12.tr/meb_iys_dosyalar/06/06/964307/dosyalar/2019_10/07104420_MEB_ORTAOYRETYM_KURUMLARI_YONETMELYYY-_uyum_programY.pdf (MEB Ortaöğretim Yönetmeliği)
19. https://kadimhukuk.com.tr/makale/ogrenci-devamsizlik-sureleri/ (Madde 159–163 summary)

## Key calculator-design caveats (for the build)
- **Vize-final:** make weights configurable (default %40/%60); add optional final-barajı input.
- **Harf notu bands:** make bands configurable per university; ship Kent/GTU-style presets, default to the common core (AA 90+, BA 85–89, BB 80–84).
- **Çan eğrisi:** implement T = 10z + 50; do NOT hardcode T→letter bands — configurable.
- **YÖK table:** embed full 0.01-step official table (source #15 has complete text); label "YÖK resmi"; note some universities differ.
- **İOKBS:** implement HP = D − Y/3, weights ×3, 100–500 rescale formula; standard-score step needs cohort stats — calculator should estimate or ask.
- **Takdir/Teşekkür:** implement 70.00–84.99 / 85.00+ with the 4 conditions (devamsızlık ≤5, no failures, davranış=100); note middle-school regulation second-hand.