'use strict';
/* =====================================================================
   PuanRobotu — Çan Eğrisi (bağıl değerlendirme) motoru
   z = (X − μ) / σ ;  T = 10 × z + 50   (İnönü Üniversitesi resmî modeli)
   T→harf aralıkları üniversite senatosunca belirlenir; bu yüzden
   bantlar sabit DEĞİL, kullanıcı tarafından düzenlenebilir.
   Tüm hesaplama tarayıcıda yapılır; veri gönderilmez.
   ===================================================================== */

/* Örnek aralıklar (uluslararası yaygın kullanım; Türkiye'de resmî tek tablo YOK).
   z ≥ 1,5 → T ≥ 65 vb. */
var VARSAYILAN_BANTLAR = [
  { harf: 'AA', minT: 65 },
  { harf: 'BB', minT: 55 },
  { harf: 'CC', minT: 45 },
  { harf: 'DD', minT: 35 },
  { harf: 'FF', minT: -Infinity }
];

function _sirala(bantlar) {
  return bantlar.slice().sort(function (a, b) { return b.minT - a.minT; });
}

function zHesapla(not, ortalama, sapma) {
  var x = Number(not), mu = Number(ortalama), s = Number(sapma);
  if (![x, mu, s].every(Number.isFinite)) throw new Error('Lütfen tüm alanlara sayı gir.');
  if (s <= 0) throw new Error('Standart sapma 0’dan büyük olmalı.');
  return (x - mu) / s;
}

function tHesapla(z) {
  if (!Number.isFinite(Number(z))) throw new Error('Geçersiz z değeri.');
  return 10 * Number(z) + 50;
}

function harfBul(t, bantlar) {
  var tv = Number(t);
  if (!Number.isFinite(tv)) return null;
  var sirali = _sirala(bantlar || VARSAYILAN_BANTLAR);
  for (var i = 0; i < sirali.length; i++) {
    if (tv >= sirali[i].minT) return sirali[i].harf;
  }
  return 'FF';
}

/* z değerinin göreli konumunu sade Türkçe ile açıklar. */
function konumAciklama(z) {
  if (z >= 1.5) return 'Sınıfın en üst dilimindesin: notun, ortalamanın 1,5 standart sapmadan fazla üzerinde.';
  if (z >= 0.5) return 'Ortalamanın belirgin şekilde üzerindesin: sınıfın üst grubundasın.';
  if (z >= -0.5) return 'Sınıf ortalamasına yakınsın: tipik bir konumdasın.';
  if (z >= -1.5) return 'Ortalamanın belirgin şekilde altındasın: sınıfın alt grubundasın.';
  return 'Sınıfın en alt dilimindesin: notun, ortalamanın 1,5 standart sapmadan fazla altında.';
}

/* Tek çağrıda tam sonuç. Döner: { z, t, harf, aciklama } ya da { hata }. */
function hesapla(not, ortalama, sapma, bantlar) {
  try {
    var z = zHesapla(not, ortalama, sapma);
    var t = tHesapla(z);
    return { z: z, t: t, harf: harfBul(t, bantlar), aciklama: konumAciklama(z) };
  } catch (e) {
    return { hata: e.message };
  }
}

var API = {
  VARSAYILAN_BANTLAR: VARSAYILAN_BANTLAR,
  zHesapla: zHesapla,
  tHesapla: tHesapla,
  harfBul: harfBul,
  konumAciklama: konumAciklama,
  hesapla: hesapla
};

if (typeof window !== 'undefined') { window.PR_canegrisi = API; }
if (typeof module !== 'undefined' && module.exports) { module.exports = API; }

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var notEl = document.getElementById('not'), ortEl = document.getElementById('ortalama'),
        sapmaEl = document.getElementById('sapma'), bantAlani = document.getElementById('bant-duzenle');
    var zEl = document.getElementById('sonuc-z'), tEl = document.getElementById('sonuc-t'),
        harfEl = document.getElementById('sonuc-harf'), altEl = document.getElementById('sonuc-alt');

    function tr(n, b) {
      return n.toLocaleString('tr-TR', { minimumFractionDigits: b, maximumFractionDigits: b });
    }

    function aktifBantlar() {
      var bantlar = [];
      Array.prototype.forEach.call(bantAlani.querySelectorAll('input[data-harf]'), function (inp) {
        var v = inp.value.trim() === '' ? -Infinity : Number(inp.value);
        bantlar.push({ harf: inp.getAttribute('data-harf'), minT: v });
      });
      return bantlar;
    }

    function bantlariCiz() {
      bantAlani.innerHTML = '';
      VARSAYILAN_BANTLAR.filter(function (b) { return b.harf !== 'FF'; }).forEach(function (b) {
        var d = document.createElement('div');
        d.className = 'form-alan form-alan-dar';
        d.innerHTML = '<label>' + b.harf + ' alt T sınırı</label>' +
          '<input type="number" step="0.5" value="' + b.minT + '" data-harf="' + b.harf + '" aria-label="' + b.harf + ' alt T sınırı">';
        bantAlani.appendChild(d);
      });
      Array.prototype.forEach.call(bantAlani.querySelectorAll('input'), function (inp) {
        inp.addEventListener('input', guncelle);
      });
    }

    function guncelle() {
      var r = hesapla(notEl.value, ortEl.value, sapmaEl.value, aktifBantlar());
      if (r.hata) {
        zEl.textContent = '—'; tEl.textContent = '—'; harfEl.textContent = '—';
        altEl.textContent = r.hata;
        return;
      }
      zEl.textContent = tr(r.z, 2);
      tEl.textContent = tr(r.t, 1);
      harfEl.textContent = r.harf + ' (örnek)';
      altEl.textContent = r.aciklama + ' Harf aralığı örnektir; okulunun senato kararındaki gerçek aralıkları kullan.';
    }

    [notEl, ortEl, sapmaEl].forEach(function (el) { el.addEventListener('input', guncelle); });
    bantlariCiz();
    guncelle();
  });
}
