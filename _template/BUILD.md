# PuanRobotu — Build Kılavuzu (builder agent'lar için)

## Mimari

- **Kayıt defteri:** `assets/js/tools.js` — tüm araçlar burada tanımlı. Anasayfa arama,
  kenar çubuğu ve "ilgili hesaplayıcılar" bu listeden otomatik beslenir.
  Yeni araç eklemiyorsan bu dosyaya DOKUNMA.
- **Davranış:** `assets/js/site.js` — arama, sidebar doldurma, ilgili araçlar, mobil menü.
  Sayfalar sadece placeholder koyar: `<aside id="kenar-cubugu" data-arac="<id>">`
  ve `<section id="ilgili-araclar" data-arac="<id>">`. Doldurma otomatiktir.
- **Stil:** `assets/css/style.css` — tüm ortak bileşenler hazır
  (`.hesap-kart`, `.form-satir`, `.form-alan`, `.sonuc-kutusu`, `.tahmin-notu`,
  `.sss`, `.arac-kartlari`, `.kenarcubugu`, `.arama-kutu`).

## Sayfa oluşturma

1. `_template/tool-template.html` dosyasını kopyala:
   `KATEGORI-SLUG/arac-slug/index.html`
2. `DEĞİŞTİR` yazan her yeri doldur. `ARAC-ID` = registry'deki `id`
   (örn. `yks-puan`, `not-vizefinal`, `kpss`).
3. URL'ler her zaman `/` ile başlar ve `/` ile biter (örn. `/yks/puan-hesaplama/`).
4. Asset yolları her zaman kök-absolut: `/assets/css/style.css`, `/assets/js/...`.

## Hesaplayıcı kuralları (çok önemli)

- Matematik **mutlak doğru** olmalı. Formül, araştırma raporundaki resmi
  formülle birebir uyuşmalı. Emin olmadığın katsayıyı uydurma —
  raporda "UNVERIFIED" yazan şeyi sayfada "yaklaşık" diye işaretle.
- ÖSYM/MEB'in gerçek puanı sınav-sonrası istatistikle hesapladığı her yerde
  sonuç **"tahmini"** olarak etiketlenir + `.tahmin-notu` kutusu ZORUNLUDUR.
- Hesap mantığı **pure fonksiyon** olarak yazılır ve `window.PR_<id>` altında
  dışa açılır. Örn: `window.PR_ykspuan = { netHesapla: fn, puanHesapla: fn }`.
- Her araç için `tests/<id>.test.js` yazılır: node ile çalışan, `assert` kullanan,
  en az 3 test (çalışılmış örnek + 2 sınır durumu: hepsi boş, hepsi doğru gibi).
  Sayfadaki "Çalışılmış Örnek" ile testteki örnek BİREBİR aynı sayılar olmalı.
- Test komutu: `node tests/<id>.test.js` → sıfır hata ile bitmeli.

## İçerik kuralları

- Dil: sade Türkçe. Tek H1 (hedef anahtar kelime), tek sayfada 1 araç.
- Bölümler: Hesaplayıcı → Nasıl Hesaplanır? → Çalışılmış Örnek → İpuçları → SSS.
- SSS: en az 5 soru; sayfadaki `<details>` listesi ile JSON-LD'deki
  `mainEntity` BİREBİR aynı soru/cevapları içermeli.
- İç link: rehber metninde aynı kategoriden en az 2 araca doğal cümleyle link ver.

## Yasaklar

- Registry'yi (`tools.js`) ve `site.js`'i değiştirme (hata varsa rapor et, kendin düzeltme).
- Harici font, harici JS kütüphanesi, görsel placeholder kullanma.
- "Kesin puan", "garantili" gibi vaatler YASAK — her sonuç tahmini.
