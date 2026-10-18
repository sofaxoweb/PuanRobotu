'use strict';
/* =====================================================================
   PuanRobotu — KPSS Puan Hesaplama motoru
   Lisans GY (60 soru) + GK (60 soru). Net = Doğru − (Yanlış ÷ 4).
   Resmi son puan ÖSYM'in sınav-sonrası istatistikleriyle (ortalama, standart
   sapma, en yüksek ASP) hesaplanır; bu motor yayınlanmış net–puan
   dayanaklarına dayalı ŞEFFAF bir tahmin üretir. Tüm sonuçlar "tahmini"dir.
   ===================================================================== */

var KPSS_TESTLER = [
  { id: 'gy', ad: 'Genel Yetenek', kisa: 'GY', soru: 60 },
  { id: 'gk', ad: 'Genel Kültür',  kisa: 'GK', soru: 60 }
];

/* Puan türü ağırlıkları — ÖSYM KPSS kılavuzu (resmi).
   P93 (ön lisans) ve P94 (ortaöğretim) P3 ile aynı ağırlıktadır: %50/%50. */
var KPSS_AGIRLIK = {
  P1: { gy: 0.70, gk: 0.30 },
  P2: { gy: 0.60, gk: 0.40 },
  P3: { gy: 0.50, gk: 0.50 }
};

/* Yayınlanmış P3 net–puan dayanak noktaları: [toplam net, P3 puanı].
   Kaynak: rehberpanda.com 2026 KPSS sayfalarındaki net–puan tablosu
   (2025 KPSS istatistikleriyle hazırlanmış): 40 net → 69,87;
   60 net → 77,40; 80 net → 84,93; "80 puan için ≈ 66,9 net". */
var KPSS_P3_DAYANAK = [
  [40,   69.87],
  [60,   77.40],
  [66.9, 80.00],
  [80,   84.93]
];
var KPSS_EGIM_ALT = (77.40 - 69.87) / (60 - 40); /* 0,3765 */
var KPSS_EGIM_UST = (84.93 - 77.40) / (80 - 60); /* 0,3765 */

function kpssYuvarla(n) {
  return Math.round(n * 100) / 100;
}

/* Net = Doğru − (Yanlış ÷ 4). Negatif net 0'a sabitlenir. */
function netHesapla(dogru, yanlis) {
  var net = dogru - yanlis / 4;
  if (net < 0) net = 0;
  return kpssYuvarla(net);
}

/* Girdi doğrulama. ÖSYM geçerlilik koşulu: her testte en az 1 işaretleme. */
function girdiyiDogrula(dogru, yanlis, test) {
  if (!Number.isFinite(dogru) || !Number.isFinite(yanlis)) {
    return { ok: false, mesaj: test.kisa + ': lütfen sayı gir.' };
  }
  if (!Number.isInteger(dogru) || !Number.isInteger(yanlis)) {
    return { ok: false, mesaj: test.kisa + ': tam sayı gir (örn. 35).' };
  }
  if (dogru < 0 || yanlis < 0) {
    return { ok: false, mesaj: test.kisa + ': negatif değer giremezsin.' };
  }
  if (dogru + yanlis > test.soru) {
    return { ok: false, mesaj: test.kisa + ': doğru + yanlış, ' + test.soru + ' soruyu geçemez.' };
  }
  if (dogru + yanlis === 0) {
    return { ok: false, mesaj: test.kisa + ': ÖSYM, her testte en az 1 işaretleme ister. Bu test boş bırakılamaz.' };
  }
  return { ok: true };
}

/* Dayanak noktaları arasında doğrusal içdeğerleme; uçlarda doğrusal dışdeğerleme. */
function p3Enterpole(toplamNet) {
  var d = KPSS_P3_DAYANAK;
  var p;
  if (toplamNet <= d[0][0]) {
    p = d[0][1] - (d[0][0] - toplamNet) * KPSS_EGIM_ALT;
  } else if (toplamNet >= d[d.length - 1][0]) {
    var s = d[d.length - 1];
    p = s[1] + (toplamNet - s[0]) * KPSS_EGIM_UST;
  } else {
    for (var i = 0; i < d.length - 1; i++) {
      if (toplamNet >= d[i][0] && toplamNet <= d[i + 1][0]) {
        var oran = (toplamNet - d[i][0]) / (d[i + 1][0] - d[i][0]);
        p = d[i][1] + oran * (d[i + 1][1] - d[i][1]);
        break;
      }
    }
  }
  if (p > 100) p = 100;
  if (p < 0) p = 0;
  return kpssYuvarla(p);
}

/* Eşdeğer toplam net: puan türünün ağırlıklı netini P3 ölçeğine taşır.
   Gerekçe: standart puan nette doğrusal olduğundan (SP = 50 + 10·(net−μ)/σ),
   iki testin ortalaması ve sapması birbirine yakınsa ağırlıklı neti W olan
   adayın ASP'si, toplam neti 2W olan P3 adayınınkiyle aynı olur. */
function esdegerNet(netGY, netGK, agirlik) {
  return 2 * (agirlik.gy * netGY + agirlik.gk * netGK);
}

/* Üç puan türü için tahmini puanlar. */
function puanHesapla(netGY, netGK) {
  return {
    P1: p3Enterpole(esdegerNet(netGY, netGK, KPSS_AGIRLIK.P1)),
    P2: p3Enterpole(esdegerNet(netGY, netGK, KPSS_AGIRLIK.P2)),
    P3: p3Enterpole(netGY + netGK)
  };
}

/* Ana hesaplama: [{dogru, yanlis}, {dogru, yanlis}] → tam sonuç. */
function hesapla(girdiler) {
  var netler = [];
  for (var i = 0; i < KPSS_TESTLER.length; i++) {
    var v = girdiyiDogrula(girdiler[i].dogru, girdiler[i].yanlis, KPSS_TESTLER[i]);
    if (!v.ok) return { ok: false, mesaj: v.mesaj, testIndex: i };
    netler.push(netHesapla(girdiler[i].dogru, girdiler[i].yanlis));
  }
  var puanlar = puanHesapla(netler[0], netler[1]);
  return {
    ok: true,
    netGY: netler[0],
    netGK: netler[1],
    toplamNet: kpssYuvarla(netler[0] + netler[1]),
    P1: puanlar.P1,
    P2: puanlar.P2,
    P3: puanlar.P3
  };
}

function trSayi(n, basamak) {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: basamak,
    maximumFractionDigits: basamak
  });
}

/* Dışa aktarım: testler (node) + sayfa betiği (tarayıcı). */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    KPSS_TESTLER: KPSS_TESTLER,
    KPSS_AGIRLIK: KPSS_AGIRLIK,
    KPSS_P3_DAYANAK: KPSS_P3_DAYANAK,
    netHesapla: netHesapla,
    girdiyiDogrula: girdiyiDogrula,
    p3Enterpole: p3Enterpole,
    esdegerNet: esdegerNet,
    puanHesapla: puanHesapla,
    hesapla: hesapla
  };
}
if (typeof window !== 'undefined') {
  window.PR_kpss = {
    netHesapla: netHesapla,
    p3Enterpole: p3Enterpole,
    esdegerNet: esdegerNet,
    puanHesapla: puanHesapla,
    hesapla: hesapla
  };
}

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var hataKutusu = document.getElementById('form-hata');
    var alanlar = ['gy-dogru', 'gy-yanlis', 'gk-dogru', 'gk-yanlis'].map(function (id) {
      return document.getElementById(id);
    });

    function deger(id) {
      var v = document.getElementById(id).value.trim();
      return v === '' ? 0 : Number(v);
    }

    function guncelle() {
      hataKutusu.hidden = true;
      var s = hesapla([
        { dogru: deger('gy-dogru'), yanlis: deger('gy-yanlis') },
        { dogru: deger('gk-dogru'), yanlis: deger('gk-yanlis') }
      ]);
      var kutu = document.getElementById('sonuc-tablo');
      if (!s.ok) {
        hataKutusu.textContent = s.mesaj;
        hataKutusu.hidden = false;
        kutu.innerHTML = '<p class="sonuc-alt">Değerleri düzeltip tekrar dene.</p>';
        return;
      }
      kutu.innerHTML =
        '<table class="sonuc-tablosu"><tbody>' +
        '<tr><th scope="row">GY Net</th><td>' + trSayi(s.netGY, 2) + '</td></tr>' +
        '<tr><th scope="row">GK Net</th><td>' + trSayi(s.netGK, 2) + '</td></tr>' +
        '<tr><th scope="row">Toplam Net</th><td>' + trSayi(s.toplamNet, 2) + '</td></tr>' +
        '<tr><th scope="row">Tahmini P1</th><td><strong>' + trSayi(s.P1, 2) + '</strong></td></tr>' +
        '<tr><th scope="row">Tahmini P2</th><td><strong>' + trSayi(s.P2, 2) + '</strong></td></tr>' +
        '<tr><th scope="row">Tahmini P3</th><td><strong>' + trSayi(s.P3, 2) + '</strong></td></tr>' +
        '</tbody></table>' +
        '<p class="sonuc-alt">P93/P94, P3 ile aynı ağırlıktadır (%50/%50).</p>';
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
        '<p class="sonuc-alt">Değerleri gir, tahmini puanların burada görünsün.</p>';
    });
    guncelle();
  });
}
