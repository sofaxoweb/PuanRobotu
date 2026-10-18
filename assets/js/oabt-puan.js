'use strict';
/* =====================================================================
   PuanRobotu — ÖABT / MEB-AGS-P2 Hesaplama motoru
   KRİTİK 2026 DEĞİŞİKLİĞİ: ÖABT artık KPSS'nin parçası DEĞİL (P121 tarih
   oldu). Öğretmen adayları MEB-AGS'ye girer; ÖABT oturumu (50 soru) ile
   MEB-AGS-P2 = AGS × %50 + ÖABT × %50 hesaplanır.
   ÖABT'nin 100'lük puana dönüşümü ÖSYM'in sınav-sonrası standardizasyonuna
   bağlıdır; bu motor neti ŞEFFAF doğrusal bir modelle 100 ölçeğine taşır.
   Tüm sonuçlar "tahmini"dir.
   ===================================================================== */

var OABT_SORU = 50;

/* MEB-AGS alt test ağırlıkları (kılavuzdaki güncel değerler; toplam 100).
   NOT: ÖSYM, 2026 puanlamasında 2025 alt test ağırlıklarının yanlış
   uygulandığını duyurmuştu — güncel MEB-AGS kılavuzunu teyit edin. */
var AGS_ALT_TESTLER = [
  { ad: 'Sözel Yetenek', agirlik: 20 },
  { ad: 'Sayısal Yetenek', agirlik: 20 },
  { ad: 'Tarih', agirlik: 15 },
  { ad: 'Türkiye Coğrafyası', agirlik: 10 },
  { ad: "Eğitimin Temelleri ve Türk Millî Eğitim Sistemi", agirlik: 25 },
  { ad: 'Mevzuat', agirlik: 10 }
];

/* Eski sistem (2026 öncesi, tarihsel bilgi): KPSS P121 =
   GY %15 + GK %15 + Eğitim Bilimleri %20 + ÖABT %50 (100'lük standart puanlar). */
var P121_TARIHSEL = { gy: 0.15, gk: 0.15, egitimBilimleri: 0.20, oabt: 0.50 };

function oabtYuvarla(n) {
  return Math.round(n * 100) / 100;
}

/* Net = Doğru − (Yanlış ÷ 4). Negatif net 0'a sabitlenir. */
function netHesapla(dogru, yanlis) {
  var net = dogru - yanlis / 4;
  if (net < 0) net = 0;
  return oabtYuvarla(net);
}

/* ÖABT netini 100'lük ölçeğe taşıyan şeffaf doğrusal model:
   0 net → 20 puan, 50 net → 100 puan. Gerçek dönüşüm ÖSYM'in
   sınav-sonrası standardizasyonuyla belirlenir; bu değer yaklaşıktır. */
function oabtPuanTahmini(net) {
  var p = 20 + 1.6 * net;
  if (p > 100) p = 100;
  if (p < 0) p = 0;
  return oabtYuvarla(p);
}

/* MEB-AGS-P2 = AGS × 0,50 + ÖABT × 0,50 (her ikisi de 100'lük ölçekte). */
function p2Hesapla(agsPuani, oabtNet) {
  var oabtPuan = oabtPuanTahmini(oabtNet);
  return {
    oabtNet: oabtYuvarla(oabtNet),
    oabtPuan: oabtPuan,
    p2: oabtYuvarla(0.5 * agsPuani + 0.5 * oabtPuan)
  };
}

function girdiyiDogrula(agsPuani, dogru, yanlis) {
  if (!Number.isFinite(agsPuani)) {
    return { ok: false, mesaj: 'AGS puanı için sayı gir.' };
  }
  if (agsPuani < 0 || agsPuani > 100) {
    return { ok: false, mesaj: 'AGS puanı 0 ile 100 arasında olmalı.' };
  }
  if (!Number.isFinite(dogru) || !Number.isFinite(yanlis)) {
    return { ok: false, mesaj: 'ÖABT için doğru/yanlış sayılarını gir.' };
  }
  if (!Number.isInteger(dogru) || !Number.isInteger(yanlis)) {
    return { ok: false, mesaj: 'ÖABT doğru/yanlış tam sayı olmalı (örn. 40).' };
  }
  if (dogru < 0 || yanlis < 0) {
    return { ok: false, mesaj: 'ÖABT için negatif değer giremezsin.' };
  }
  if (dogru + yanlis > OABT_SORU) {
    return { ok: false, mesaj: 'ÖABT doğru + yanlış, 50 soruyu geçemez.' };
  }
  return { ok: true };
}

function hesapla(agsPuani, dogru, yanlis) {
  var v = girdiyiDogrula(agsPuani, dogru, yanlis);
  if (!v.ok) return { ok: false, mesaj: v.mesaj };
  var net = netHesapla(dogru, yanlis);
  var s = p2Hesapla(agsPuani, net);
  return {
    ok: true,
    agsPuani: oabtYuvarla(agsPuani),
    oabtDogru: dogru,
    oabtYanlis: yanlis,
    oabtNet: s.oabtNet,
    oabtPuan: s.oabtPuan,
    p2: s.p2
  };
}

function trSayi(n, basamak) {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: basamak,
    maximumFractionDigits: basamak
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    OABT_SORU: OABT_SORU,
    AGS_ALT_TESTLER: AGS_ALT_TESTLER,
    P121_TARIHSEL: P121_TARIHSEL,
    netHesapla: netHesapla,
    oabtPuanTahmini: oabtPuanTahmini,
    p2Hesapla: p2Hesapla,
    girdiyiDogrula: girdiyiDogrula,
    hesapla: hesapla
  };
}
if (typeof window !== 'undefined') {
  window.PR_oabt = {
    netHesapla: netHesapla,
    oabtPuanTahmini: oabtPuanTahmini,
    p2Hesapla: p2Hesapla,
    hesapla: hesapla
  };
}

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var hataKutusu = document.getElementById('form-hata');
    var alanlar = ['ags-puan', 'oabt-dogru', 'oabt-yanlis'].map(function (id) {
      return document.getElementById(id);
    });

    function deger(id) {
      var v = document.getElementById(id).value.trim();
      return v === '' ? 0 : Number(v);
    }

    function guncelle() {
      hataKutusu.hidden = true;
      var s = hesapla(deger('ags-puan'), deger('oabt-dogru'), deger('oabt-yanlis'));
      var kutu = document.getElementById('sonuc-tablo');
      if (!s.ok) {
        hataKutusu.textContent = s.mesaj;
        hataKutusu.hidden = false;
        kutu.innerHTML = '<p class="sonuc-alt">Değerleri düzeltip tekrar dene.</p>';
        return;
      }
      kutu.innerHTML =
        '<table class="sonuc-tablosu"><tbody>' +
        '<tr><th scope="row">ÖABT Net</th><td>' + trSayi(s.oabtNet, 2) + ' / 50</td></tr>' +
        '<tr><th scope="row">ÖABT Tahmini Puan (100\'lük)</th><td>' + trSayi(s.oabtPuan, 2) + '</td></tr>' +
        '<tr><th scope="row">AGS Puanın</th><td>' + trSayi(s.agsPuani, 2) + '</td></tr>' +
        '<tr><th scope="row">Tahmini MEB-AGS-P2</th><td><strong>' + trSayi(s.p2, 2) + '</strong></td></tr>' +
        '</tbody></table>' +
        '<p class="sonuc-alt">P2 = AGS × %50 + ÖABT × %50. Yabancı dil branşlarında P3 = AGS × %50 + YDS × %50 kullanılır.</p>';
    }

    alanlar.forEach(function (el) {
      if (el) el.addEventListener('input', guncelle);
    });
    var btn = document.getElementById('btn-hesapla');
    if (btn) btn.addEventListener('click', guncelle);
    var temizle = document.getElementById('btn-temizle');
    if (temizle) temizle.addEventListener('click', function () {
      alanlar.forEach(function (el) { if (el) el.value = ''; });
      hataKutusu.hidden = true;
      document.getElementById('sonuc-tablo').innerHTML =
        '<p class="sonuc-alt">AGS puanını ve ÖABT doğru–yanlışlarını gir.</p>';
    });
    guncelle();
  });
}
