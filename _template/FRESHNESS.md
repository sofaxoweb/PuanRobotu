# PuanRobotu — Yıllık Tazelik (Freshness) Sistemi

Sınav sitelerinde tazelik = sıralama. Bu dosya, her yıl NE ZAMAN neyin güncelleneceğini söyler.

## Tetikleyici → Aksiyon Haritası

| Tetikleyici (gerçek dünya olayı) | Etkilenen sayfalar | Yapılacak |
|---|---|---|
| MEB LGS kılavuzu yayımlanır (~Nisan) | `/lgs/*`, `/rehber/lgs-basvuru-nasil-yapilir/`, `/rehber/lgs-nasil-calisilir/` | Başvuru tarihleri, sınav tarihi, katsayı değişikliği var mı? |
| LGS sonuçları açıklanır (~Haziran sonu) | `/lgs/puan-hesaplama/` | İstatistik bölümü (ortalama/SS) güncelle |
| LGS yerleştirme sonuçları (~Temmuz/Ağustos) | `/lgs/taban-puanlari/*` (81 il + hub) | Taban puan/dilim/2027 kontenjan verisini gir |
| ÖSYM YKS kılavuzu (~Şubat) | `/yks/*`, `/rehber/yks-basvuru-nasil-yapilir/` | Tarih, ücret, oturum kuralları |
| YKS sonuçları (~Temmuz) | `/yks/puan-hesaplama/`, `/yks/tercih-robotu/` | İstatistik + 2026 veri seti durumu |
| Üniversite yerleştirme (~Ağustos) | `/yks/taban-puanlari/` | Taban verisi (şu an "hazırlanıyor" — ilk veri girişi) |
| KPSS kılavuzu (~Mayıs) | `/kamu-sinavlari/kpss-puan-hesaplama/`, `/rehber/kpss-basvuru-nasil-yapilir/` | Tarih/ücret, MEB-AGS değişikliği takibi |
| KPSS sonuçları (~Ekim) | `/kamu-sinavlari/kpss-puan-hesaplama/` | Net–puan tablosu istatistikleri |
| ALES (yılda 3: ~Nisan/Temmuz/Kasım) | `/lisansustu/ales-puan-hesaplama/` | Tarih hatırlatmaları |
| DGS kılavuzu (~Mayıs), sınav (~Haziran) | `/lisansustu/dgs-puan-hesaplama/` | Tarih + kontenjan notları |
| YDS/YÖKDİL dönemleri | `/lisansustu/yds-puan-hesaplama/`, `/yokdil-puan-hesaplama/` | Tarih |
| Yıl dönümü (her Ocak) | TÜM sayfalar | `freshness-scan.py` çalıştır → yıl geçen iddiaları tara |

## Her güncellemede ZORUNLU

1. Sayfadaki "Son güncelleme" tarihini bugüne al.
2. Sitemap'teki `<lastmod>`'u güncelle.
3. Değişiklik tek cümleyle sayfaya işlensin (örn. "2026 verileri eklendi").
4. `qa.py` çalıştır, push et.

## freshness-scan.py kullanımı

```
python3 _template/freshness-scan.py
```

Yıl geçen (2024–2029) tüm içerik cümlelerini sayfa sayfa listeler.
Ocak ve her sınav sonucu sonrası çalıştırılır.
