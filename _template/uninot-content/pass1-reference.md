# PASS 1 REFERENCE — Üniversite Notları (7 pages)
Research: 3 child agents, 2026-10-18. All info-gain items trace to gap lists; competitor names recorded.

## LOCKED WORKED EXAMPLES (must stay identical to tests/*.test.js)
1. vize-final: vize 50, hedef 50, %40/%60 → final **50**
2. gano: 4kr BA + 3kr BB + 2kr FF → 23/9 = **2,56**
3. harf: 84 → **BB**, 92 → **AA** (default band)
4. can-egrisi: X=70, μ=55, σ=10 → z=**1,5**, T=**65** → AA (örnek bant)
5. aof: ara 60, final 80 → **74**
6. donusum: 3,50 → **88,33**

## COMPETITOR URLS PER PAGE
### vize-final ("vize final hesaplama")
- tamliste.tr/vize-final-hesaplama/ (emerging, tool YES generic, ~2500-3000w; no FAQ; omits FD; "CC 60-65" wrong; no >100 edge cases; filler sections)
- turkiyesigorta.com.tr/blog/yasam-diger/vize-final-ve-but-ortalama-hesaplamasi-nasil-yapilir (giant, no tool, ~1100-1300w)
- forumsitesi.com.tr/threads/… (emerging spam; ERROR: US scale A-F)
- yandex.com.tr/yacevap Q&A threads (giant; question mine: "vize 0 olursa?", "35 olursa geçilir mi?")
- edebiyat.erciyes.edu.tr PDF (giant official; buçuklu→tam sayı rounding rule)
### gano ("gano hesaplama")
- gunceloku.com/agno-nasil-hesaplanir (emerging, no tool; SEVERE: US scale B=2.67, "CAGR" finance term, büt averaged wrong)
- iienstitu.com/tr/blog/gano-hesaplama-... (giant-ish, no tool; ERRORS: A=4,B=3,C=2; raw-score×credit; GANO=YANO confusion; "Genel Akademik" misnomer)
- turkiyesigorta (giant, no tool; omits FD; fuzzy GANO/AGNO)
- tamliste.tr Sec 5 (emerging, linked tools; GANÖ/AGNO/GNO soup; omits FD)
- pratikhesaplama.com/kategori/eğitim (emerging, tool YES, zero guide)
### harf ("harf notu hesaplama")
- vodafone.com.tr/insan-kaynaklari/blog/universite-harf-notlari (giant, no tool, ~850w; coefficients ONLY, no 100'lük bands)
- tamliste.tr (emerging; ERROR: 3 letters only, CC 60-65 wrong)
- turkiyesigorta (giant, no tool; zero bands; no FD)
- ozgurcyaman.com/2020/11/java-harf-notu-hesaplama.html (emerging; ERROR: boundary bugs 85→FF; nonstandard bands)
- kamufinans.com (emerging; 2018 stale; self-contradictory)
### can-egrisi ("çan eğrisi hesaplama")
- vodafone.com.tr/insan-kaynaklari/blog/can-egrisi-nedir (giant, no tool, ~850w; NO FORMULA ever; ERRORS: Gauss claim, A-F letters, unverifiable namedrops)
- tamliste.tr Sec 3 (emerging; ~150w, formula-free)
- eksisozluk.com/entry/85445503 (giant UGC; ERROR: wrong max-min method)
- yandex.com.tr/yacevap (giant; ERRORS: contradictory bands, CB 60-64 wrong, lise rules)
- OMU yönerge PDF yesilyurtmyo.omu.edu.tr (giant official, not opened; 7-düzey table, Z formula, T=50+10Z, n≥30)
### aof ("aöf not hesaplama")
- tamliste.tr/vize-final-hesaplama/ (emerging, generic tool only; no AÖF split/baraj)
- onedio.com/haber/aof-ders-gecme-notu-kac-2022 (giant, no tool; 2022 stale; SELF-CONTRADICTS 35-baraj vs DD 33-39)
- kamufinans.com/aof-harf-notlari... (emerging, no tool; CONTRADICTS CB vs CC unconditional pass; 4:1 stated never applied)
- vodafone.com.tr/.../universite-harf-notlari (giant, no tool; lists FD 0.50 — not in AÖF system)
- turkiyesigorta.com.tr/blog/... (giant, no tool; generic only)
### donusum ("not dönüşümü hesaplama")
- bilgibirikimi.net/not-donusum-tablosu-... (emerging, 2012 stale, no tool; "YÖK table" no version)
- oidb.trakya.edu.tr/pages/4-luk-not-sistemine (giant official, no tool; own table w/o context)
- yandex.com.tr/yacevap/t/ortalama (giant; WRONG FORMULA (x-2)*20+60: 2.0→60 vs official 53.33)
- PDFs: OMÜ (2.00→62.50), GOP, Munzur, ODTÜ-labeled (snippet only; disagree)
### hub ("üniversite not hesaplama")
- tamliste.tr (emerging; link-list only, no hub page)
- turkiyesigorta (giant; no tool)
- vodafone çan page (giant; concept only)
- sorumatik.co/t/ders-ortalama... (emerging; INTENT MISMATCH lise; self-contradictory example)
- saglikbeslenme.com.tr (emerging; skips CB/DC/FD; non-standard bands)
- pratikhesaplama.com/kategori/eğitim (emerging; tools, zero guide)

## ANGLES (1 line each)
1. vize-final: Çift-yönlü hesaplayıcı + ağırlık normalizasyonu + imkânsız-hedef playbook'u + büt kuralları — tamliste.tr'de FAQ yok, edge case yok, dolgu bölümler var.
2. gano: Doğru AA–FF katsayı tablosu (FD dahil — rakiplerin çoğu hatalı/eksik) + YANO/GANO/AGNO ayrım tablosu + ders-tekrarı ve hariç notlar — iienstitu ve gunceloku formülde hatalı.
3. harf: Seçilebilir üniversite bant presetli dönüştürücü + bant karşılaştırma tablosu + tamamlanmış örnekler — rakipler ya bant vermiyor (vodafone) ya yanlış bant veriyor (tamliste.tr, ozgurcyaman).
4. can-egrisi: Türkçe'deki tek interaktif çan hesaplayıcısı + gerçek formüllerle tam çalışılmış sınıf örneği + OMU 7-düzey tablosunun sade anlatımı — vodafone formül bile yazmıyor, ekşi yanlış yöntem anlatıyor.
5. aof: AÖF'ye özel hesaplayıcı (30/70 + 35 baraj + 4:1 ceza) + 35-baraj tuzağının sayısal ispatı + Anadolu/ATA/AUZEF karşılaştırması — rakipler metin-only ve çelişkili (onedio, kamufinans).
6. donusum: Tek interaktif çift-yönlü dönüştürücü + "hangi tablo sana uygun" ayrımı + yanlış formülün hata tablosuyla çürütülmesi — rakipler statik tablo/PDF, yandex yanlış formül yayımlıyor.
7. hub: Kategorinin tek gerçek hub'ı (6 araç + rehber, tek topic map) + bağıl-mutlak karar akışı + eşik master-map — pratikhesaplama'da içerik yok, tamliste.tr'de hub yok.

## INFO-GAIN ITEMS (≥3 per page, with competitor names)
### vize-final
1. Ağırlık normalizasyonu walkthrough (≠100) — yok: tamliste.tr, turkiyesigorta, forumsitesi
2. Çoklu ara-sınav ortalaması + buçuklu→tam sayı yuvarlama — yok: hepsi (sadece erciyes PDF'de kural var)
3. Büt giriş kuralları + harf tavanı — yok: tamliste.tr, turkiyesigorta ("final yerine geçer"den öteye gitmez)
4. İmkânsız-hedef playbook (>100 → hedef revize/büt/yaz okulu) — yok: tamliste.tr (stres paragrafı only), turkiyesigorta
### gano
1. YÖK 100'lük→4'lük dönüşüm tablosu + çalışılmış çevrim — yok: iienstitu (atlıyor), turkiyesigorta, gunceloku, tamliste.tr
2. Ders tekrarı politikası — yok: tüm içerik rakipleri
3. Hariç notlar listesi (MU, G, İZ, DS) — yok: tüm rakipler
4. YANO/GANO/AGNO/GNO/GANÖ ayrım tablosu — yok: tamliste.tr (en kötü), turkiyesigorta (muğlak)
5. Koşullu-geçme (DC/DD+2.00) çalışılmış GANO örneği — yok: iienstitu, gunceloku, turkiyesigorta
6. Yatay geçiş birleşik formülü ((Giriş×0.7)+(GANO×0.3)) — sadece sbu.edu.tr PDF'de; öğrenci sayfalarında yok
### harf
1. Presetli harf dönüştürücü — yok: tamliste (harf dönüşümü yok), vodafone, turkiyesigorta (metin-only)
2. Üniversite bant karşılaştırma tablosu — yok: 5 rakibin tamamı tek tabloyu evrensel sunuyor
3. Tamamlanmış örnekler (76 → mutlak CB / Trakya BB) — yok: turkiyesigorta (76'da duruyor), vodafone (bant yok)
4. Özel harfler + koşullu geçme mekaniği — yok: açılan sayfaların hiçbiri
### can-egrisi
1. Türkçe interaktif çan hesaplayıcısı — yok: tamamı (calculatorshub EN-only A-F)
2. Tam çalışılmış sayısal sınıf örneği — yok: vodafone (sözel adım), tamliste (matematik yok)
3. OMU 7-düzey dağılım tablosu (sade dil) — sadece resmi PDF'de; SEO rakibinde yok
4. Alt limit + sınıf mevcudu + final-baraj etkileşimi — yok: vodafone, tamliste, ekşi
### aof
1. AÖF'ye özel interaktif hesaplayıcı — yok: 5 rakibin tamamı (tamliste.tr generic only)
2. 35-baraj tuzağı çalışılmış örnekleri — yok: onedio (çelişiyor), kamufinans (örneksiz)
3. 4:1 ceza sayısal uygulaması — yok: kamufinans (söylüyor, uygulamıyor) + diğerleri
4. Anadolu/ATA/AUZEF karşılaştırması — yok: tamamı
5. Koşullu-geçme GNO senaryosu — yok: tamamı
### donusum
1. Çift-yönlü interaktif dönüştürücü — yok: tamamı (bilgibirikimi, trakya, yandex, PDF'ler)
2. "Hangi tablo" ayrımı + sayısal anlaşmazlık ispatı — yok: tamamı
3. Yanlış formül çürütme (hata tablosu) — yandex yanlış formülü yayımlıyor; diğerleri görmezden geliyor
4. Başvuru senaryoları — yok: tamamı
5. SSS bloğu — yok: tamamı
### hub
1. Gerçek hub sayfası — yok: tamliste.tr (link listesi), pratikhesaplama (içeriksiz)
2. Bağıl-vs-mutlak karar akışı — yok: vodafone, tamliste.tr (kavram only)
3. İnteraktif çan simülatörü — yok: tüm web (sadece SABISCalculator eklentisi)
4. Katsayı-varyans tablosu (FD kullanan/kullanmayan) — yok: tamliste.tr, turkiyesigorta
5. Eşik master-map — yok: turkiyesigorta (eşiksiz liste)

## LSI INVENTORIES (FIT section / DROP/LINK)
### vize-final
- "finalden kaç almalıyım" → FIT (Nasıl çalışır + FAQ)
- "geçme notu hesaplama" → FIT (Nedir)
- "büt hesaplama" → FIT (Büt kuralları)
- "vize 0 olursa ne olur" → FIT (Sınırlamalar)
- "ders geçme notu 50 mi 60 mı" → FIT (Sonuç okuma)
- "ağırlıklı ortalama nedir" → FIT (Nedir)
- "yaz okulu not hesaplama" → DROP/LINK (distinct intent; link once)
- "aöf vize final" → DROP/LINK (own page; link once)
### gano
- "agno hesaplama" → FIT (ayrım tablosu)
- "üniversite ortalama hesaplama" → FIT (Nedir)
- "yano nedir" → FIT (ayrım)
- "ders tekrarı gano" → FIT (tekrar bölümü)
- "şartlı geçme gano 2.00" → FIT (SSS)
- "onur belgesi gano kaç" → FIT (Sonuç okuma)
- "yatay geçiş gano hesaplama" → DROP/LINK (distinct formula; link once)
- "transkript gano" → FIT (Sınırlamalar)
### harf
- "aa ba bb not" → FIT (Sonuç tablosu)
- "100lük not harf karşılığı" → FIT (Nedir + örnek)
- "harf notu aralıkları" → FIT (karşılaştırma)
- "üniversite geçme notu kaç" → FIT (SSS)
- "şartlı geçme nedir" → FIT (koşullu geçme)
- "fd notu ne demek" → FIT (özel harfler)
- "çan eğrisi harf notu" → DROP/LINK (own page; link once)
- "aöf harf notu" → DROP/LINK (own page; link once)
### can-egrisi
- "bağıl değerlendirme" → FIT (Nedir)
- "çan eğrisi not hesaplama" → FIT (lede)
- "z puanı nedir" → FIT (Nasıl çalışır)
- "t puanı hesaplama" → FIT (Nasıl çalışır)
- "sınıf ortalaması harf notu" → FIT (7-düzey)
- "derste çan eğrisi var mı" → FIT (SSS)
- "standart sapma not" → FIT (Nasıl çalışır)
- "aöf çan eğrisi" → DROP/LINK (own page; link once)
### aof
- "aöf geçme notu kaç" → FIT (Sonuç okuma)
- "aöf harf notu hesaplama" → FIT (Sonuç okuma)
- "açıköğretim vize final ağırlık" → FIT (Nasıl çalışır)
- "aöf bütünleme nasıl hesaplanır" → FIT (FAQ)
- "aöf koşullu geçme nedir" → FIT (koşullu geçme)
- "ata aöf not sistemi" / "auzef geçme notu" → FIT (karşılaştırma)
- "aöf ders geçme sistemi" → FIT (Nedir)
- "aöf yaz okulu" → DROP/LINK (distinct intent; link once)
- "aöf sınav itirazı" → DROP (off-task)
### donusum
- "yök not dönüşüm tablosu" → FIT (Nasıl çalışır)
- "gano 100lük karşılık" → FIT (Senaryolar)
- "4.00 kaç olur" / "2.00 kaç puan" → FIT (FAQ)
- "diploma notu 100lük çevirme" → FIT (Senaryolar)
- "transkript not dönüşümü" → FIT (Sınırlamalar)
- "üniversite not dönüşüm tablosu farkları" → FIT (karşılaştırma)
- "kpss diploma notu hesaplama" → DROP/LINK (distinct intent; link once)
- "e-okul not dönüşümü" → DROP (off-topic: lise)
### hub
- "üniversite not ortalaması hesaplama" → FIT (lede)
- "ders geçme notu hesaplama" → FIT (hangi araç)
- "bağıl değerlendirme nedir" → FIT (karar akışı)
- "üniversite harf notu sistemi" → FIT (hangi araç)
- "gano kaç olmalı" → FIT (eşik haritası)
- "lise not hesaplama" → DROP (intent mismatch; don't target)
