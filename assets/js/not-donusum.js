'use strict';
/* =====================================================================
   PuanRobotu — YÖK 4,00 ↔ 100 not dönüşüm motoru
   Resmî YÖK tablosundaki kilit satırlar gömülüdür; aradaki değerler
   doğrusal enterpolasyonla bulunur. İki yönlü çalışır.
   NOT: Bazı üniversiteler kendi tablolarını kullanır — sayfada belirtilir.
   Tüm hesaplama tarayıcıda yapılır; veri gönderilmez.
   ===================================================================== */

/* [4,00 ölçeği, 100 ölçeği] — artan sırada. Kaynak: YÖK tablosu. */
var TABLO = [
  [1.00, 30.00], [1.50, 41.66],
  [2.00, 53.33], [2.10, 55.66], [2.20, 58.00], [2.30, 60.33],
  [2.40, 62.66], [2.50, 65.00], [2.60, 67.33], [2.70, 69.66],
  [2.80, 72.00], [2.90, 74.33], [3.00, 76.66], [3.10, 79.00],
  [3.20, 81.33], [3.30, 83.66], [3.40, 86.00], [3.50, 88.33],
  [3.60, 90.66], [3.70, 93.00], [3.80, 95.33], [3.90, 97.66],
  [4.00, 100.00]
];
var MIN_4 = TABLO[0][0], MAKS_4 = TABLO[TABLO.length - 1][0];
var MIN_100 = TABLO[0][1], MAKS_100 = TABLO[TABLO.length - 1][1];

function _yuvarla2(n) {
  return Math.round(n * 100) / 100;
}

/* x değerini tablo sütunu `sutun` (0: 4'lük, 1: 100'lük) içinde bulup
   diğer sütuna doğrusal enterpolasyonla çevirir. */
function _cevir(x, sutun) {
  var diger = sutun === 0 ? 1 : 0;
  for (var i = 0; i < TABLO.length - 1; i++) {
    var xa = TABLO[i][sutun], xb = TABLO[i + 1][sutun];
    if (x >= xa && x <= xb) {
      var ya = TABLO[i][diger], yb = TABLO[i + 1][diger];
      if (xb === xa) return _yuvarla2(ya);
      return _yuvarla2(ya + (x - xa) * (yb - ya) / (xb - xa));
    }
  }
  return null;
}

/* 4,00 ölçeğinden 100'lük karşılığa. Döner: { deger } ya da { hata }. */
function dorteYuize(g) {
  var n = Number(g);
  if (!Number.isFinite(n)) return { deger: null, hata: 'Lütfen sayı gir.' };
  if (n < MIN_4 || n > MAKS_4) {
    return { deger: null, hata: 'YÖK tablosu ' + MIN_4.toFixed(2).replace('.', ',') +
      '–' + MAKS_4.toFixed(2).replace('.', ',') + ' aralığını kapsar; bu değer tablo dışında.' };
  }
  return { deger: _cevir(n, 0) };
}

/* 100'lükten 4,00 ölçeğine. Döner: { deger } ya da { hata }. */
function yuzeDorte(y) {
  var n = Number(y);
  if (!Number.isFinite(n)) return { deger: null, hata: 'Lütfen sayı gir.' };
  if (n < MIN_100 || n > MAKS_100) {
    return { deger: null, hata: 'YÖK tablosu ' + MIN_100.toFixed(2).replace('.', ',') +
      '–' + MAKS_100.toFixed(2).replace('.', ',') + ' aralığını kapsar; bu değer tablo dışında.' };
  }
  return { deger: _cevir(n, 1) };
}

var API = {
  TABLO: TABLO,
  dorteYuize: dorteYuize,
  yuzeDorte: yuzeDorte
};

if (typeof window !== 'undefined') { window.PR_donusum = API; }
if (typeof module !== 'undefined' && module.exports) { module.exports = API; }

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var dortEl = document.getElementById('not4');
    var yuzEl = document.getElementById('not100');
    var sonucEl = document.getElementById('sonuc-deger');
    var altEl = document.getElementById('sonuc-alt');
    var kutuEl = document.getElementById('sonuc');
    var kilit = false; /* iki yönlü girişte döngüyü engeller */

    function tr(n) {
      return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function goster(deger, yon) {
      kutuEl.classList.remove('sonuc-hata');
      if (deger === null) {
        sonucEl.textContent = '—';
        return;
      }
      sonucEl.textContent = tr(deger);
      altEl.textContent = yon + ' (YÖK resmi tablosu; bazı üniversiteler farklı tablo kullanır.)';
    }

    dortEl.addEventListener('input', function () {
      if (kilit) return;
      var r = dorteYuize(dortEl.value);
      kilit = true;
      if (r.deger === null) {
        kutuEl.classList.add('sonuc-hata');
        sonucEl.textContent = '—';
        altEl.textContent = r.hata;
      } else {
        yuzEl.value = r.deger;
        goster(r.deger, '4,00 → 100 karşılığı');
      }
      kilit = false;
    });

    yuzEl.addEventListener('input', function () {
      if (kilit) return;
      var r = yuzeDorte(yuzEl.value);
      kilit = true;
      if (r.deger === null) {
        kutuEl.classList.add('sonuc-hata');
        sonucEl.textContent = '—';
        altEl.textContent = r.hata;
      } else {
        dortEl.value = r.deger;
        goster(r.deger, '100 → 4,00 karşılığı');
      }
      kilit = false;
    });

    /* Kilit satırları tablo olarak çiz */
    var tablo = document.getElementById('yok-tablo');
    if (tablo) {
      var html = '<thead><tr><th scope="col">4,00 Ölçeği</th><th scope="col">100 Karşılığı</th></tr></thead><tbody>';
      TABLO.forEach(function (satir) {
        html += '<tr><td>' + tr(satir[0]) + '</td><td>' + tr(satir[1]) + '</td></tr>';
      });
      tablo.innerHTML = html + '</tbody>';
    }

    goster(dorteYuize(dortEl.value || 3).deger, '4,00 → 100 karşılığı');
  });
}
