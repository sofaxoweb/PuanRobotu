'use strict';
/* =====================================================================
   PuanRobotu — Harf Notu hesaplama motoru
   100'lük notu harf karşılığına çevirir. Aralıklar üniversiteye göre
   değişir; bu yüzden bantlar yapılandırılabilir (önayar + elle düzenleme).
   Bant gösterimi: [{ harf: 'AA', min: 90 }, ...] (min'e göre azalan sıra).
   Tüm hesaplama tarayıcıda yapılır; veri gönderilmez.
   ===================================================================== */

/* Üniversitelerden doğrulanmış örnek aralıklar (araştırma raporu §3). */
var BANT_ONAYARLAR = {
  yaygin: {
    ad: 'Yaygın Örnek (AA 90+, BA 85–89, BB 80–84)',
    bantlar: [
      { harf: 'AA', min: 90 }, { harf: 'BA', min: 85 }, { harf: 'BB', min: 80 },
      { harf: 'CB', min: 75 }, { harf: 'CC', min: 70 }, { harf: 'DC', min: 65 },
      { harf: 'DD', min: 60 }, { harf: 'FD', min: 50 }, { harf: 'FF', min: 0 }
    ]
  },
  kent: {
    ad: 'Kent Üniversitesi Örneği',
    bantlar: [
      { harf: 'AA', min: 90 }, { harf: 'BA', min: 85 }, { harf: 'BB', min: 80 },
      { harf: 'CB', min: 70 }, { harf: 'CC', min: 60 }, { harf: 'DC', min: 55 },
      { harf: 'DD', min: 50 }, { harf: 'FF', min: 0 }
    ]
  },
  gtu: {
    ad: 'GTÜ Örneği',
    bantlar: [
      { harf: 'AA', min: 90 }, { harf: 'BA', min: 85 }, { harf: 'BB', min: 80 },
      { harf: 'CB', min: 75 }, { harf: 'CC', min: 70 }, { harf: 'DC', min: 65 },
      { harf: 'DD', min: 60 }, { harf: 'FD', min: 50 }, { harf: 'FF', min: 0 }
    ]
  },
  aydin: {
    ad: 'İstanbul Aydın Üniversitesi Örneği',
    bantlar: [
      { harf: 'AA', min: 90 }, { harf: 'BA', min: 85 }, { harf: 'BB', min: 80 },
      { harf: 'CB', min: 75 }, { harf: 'CC', min: 70 }, { harf: 'DC', min: 60 },
      { harf: 'DD', min: 50 }, { harf: 'FD', min: 40 }, { harf: 'FF', min: 0 }
    ]
  },
  sakarya: {
    ad: 'Sakarya Üniversitesi Örneği (bağıl)',
    bantlar: [
      { harf: 'AA', min: 90 }, { harf: 'BA', min: 85 }, { harf: 'BB', min: 80 },
      { harf: 'CB', min: 75 }, { harf: 'CC', min: 65 }, { harf: 'DC', min: 58 },
      { harf: 'DD', min: 50 }, { harf: 'FF', min: 0 }
    ]
  }
};

function _sirala(bantlar) {
  return bantlar.slice().sort(function (a, b) { return b.min - a.min; });
}

/* not: 0–100. Döner: harf ('AA' … 'FF') ya da null (geçersiz girdi). */
function harfBul(not, bantlar) {
  var n = Number(not);
  if (!Number.isFinite(n) || n < 0 || n > 100) return null;
  var sirali = _sirala(bantlar || BANT_ONAYARLAR.yaygin.bantlar);
  for (var i = 0; i < sirali.length; i++) {
    if (n >= sirali[i].min) return sirali[i].harf;
  }
  return 'FF';
}

/* Bantların tutarlılığını denetler: alt sınırlar 0–100 aralığında olmalı ve
   iki harf aynı alt sınıra sahip olmamalı (harfBul min'e göre sıralar). */
function bantDogrula(bantlar) {
  var gorulen = {};
  for (var i = 0; i < bantlar.length; i++) {
    var m = Number(bantlar[i].min);
    if (!Number.isFinite(m) || m < 0 || m > 100) {
      return { ok: false, mesaj: bantlar[i].harf + ' için 0–100 arasında bir alt sınır gir.' };
    }
    if (gorulen[m]) {
      return { ok: false, mesaj: 'İki harf aynı alt sınıra sahip olamaz (' + m + ').' };
    }
    gorulen[m] = true;
  }
  return { ok: true };
}

var API = {
  BANT_ONAYARLAR: BANT_ONAYARLAR,
  harfBul: harfBul,
  bantDogrula: bantDogrula
};

if (typeof window !== 'undefined') { window.PR_harfnotu = API; }
if (typeof module !== 'undefined' && module.exports) { module.exports = API; }

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var onayarEl = document.getElementById('bant-onayar');
    var notEl = document.getElementById('not100');
    var bantAlani = document.getElementById('bant-duzenle');
    var sonucEl = document.getElementById('sonuc-deger');
    var altEl = document.getElementById('sonuc-alt');

    Object.keys(BANT_ONAYARLAR).forEach(function (k) {
      var o = document.createElement('option');
      o.value = k; o.textContent = BANT_ONAYARLAR[k].ad;
      onayarEl.appendChild(o);
    });

    function aktifBantlar() {
      var bantlar = [];
      Array.prototype.forEach.call(bantAlani.querySelectorAll('input[data-harf]'), function (inp) {
        bantlar.push({ harf: inp.getAttribute('data-harf'), min: Number(inp.value) });
      });
      return bantlar;
    }

    function bantlariCiz(secili) {
      bantAlani.innerHTML = '';
      BANT_ONAYARLAR[secili].bantlar.forEach(function (b) {
        var d = document.createElement('div');
        d.className = 'form-alan form-alan-dar';
        d.innerHTML = '<label>' + b.harf + ' alt sınır</label>' +
          '<input type="number" min="0" max="100" value="' + b.min + '" data-harf="' + b.harf + '" aria-label="' + b.harf + ' alt sınırı">';
        bantAlani.appendChild(d);
      });
      Array.prototype.forEach.call(bantAlani.querySelectorAll('input'), function (inp) {
        inp.addEventListener('input', hesapla);
      });
    }

    function hesapla() {
      var bantlar = aktifBantlar();
      var dogrulama = bantDogrula(bantlar);
      if (!dogrulama.ok) {
        sonucEl.textContent = '—';
        altEl.textContent = dogrulama.mesaj;
        return;
      }
      var harf = harfBul(notEl.value, bantlar);
      if (harf === null) {
        sonucEl.textContent = '—';
        altEl.textContent = '0–100 arasında bir not gir.';
        return;
      }
      sonucEl.textContent = harf;
      altEl.textContent = 'Seçili aralığa göre ' + notEl.value + ' puan = ' + harf +
        '. (Bu bir örnektir; okulunun gerçek harf aralıklarını öğrenci işlerinden öğren.)';
    }

    onayarEl.addEventListener('change', function () {
      bantlariCiz(onayarEl.value);
      hesapla();
    });
    notEl.addEventListener('input', hesapla);

    bantlariCiz('yaygin');
    hesapla();
  });
}
