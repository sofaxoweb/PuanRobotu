'use strict';
/* =====================================================================
   PuanRobotu — Vize–Final hesaplama motoru
   Gerekli Final = (Hedef − Vize × wv) / wf   (ağırlıklar 0–1 aralığına normalize edilir)
   Varsayılan ağırlıklar: vize %40, final %60 (üniversiteye göre değişir).
   Tüm hesaplama tarayıcıda yapılır; veri gönderilmez.
   ===================================================================== */

function _sayi(x) {
  var n = Number(x);
  return Number.isFinite(n) ? n : NaN;
}

/* Ağırlıklı ortalama: vize×wv + final×wf (ağırlıklar yüzde olarak verilir). */
function agirlikliOrtalama(vize, final, agirlikVize, agirlikFinal) {
  var v = _sayi(vize), f = _sayi(final), wv = _sayi(agirlikVize), wf = _sayi(agirlikFinal);
  if ([v, f, wv, wf].some(isNaN)) return NaN;
  if (wv < 0 || wf < 0 || wv + wf <= 0) return NaN;
  var top = wv + wf;
  return v * (wv / top) + f * (wf / top);
}

/* Hedefe ulaşmak için finalden kaç gerekir?
   Döner: { durum, gerekli, mesaj }
   durum: 'gerekli' | 'gecti' (final 0 bile yetiyor) | 'imkansiz' | 'hata' */
function gerekliFinal(vize, hedef, agirlikVize, agirlikFinal) {
  var v = _sayi(vize), h = _sayi(hedef), wv = _sayi(agirlikVize), wf = _sayi(agirlikFinal);
  if ([v, h, wv, wf].some(isNaN)) {
    return { durum: 'hata', gerekli: null, mesaj: 'Lütfen tüm alanlara sayı gir.' };
  }
  if (v < 0 || v > 100 || h < 0 || h > 100) {
    return { durum: 'hata', gerekli: null, mesaj: 'Notlar 0–100 arasında olmalı.' };
  }
  if (wv < 0 || wf < 0 || wv + wf <= 0) {
    return { durum: 'hata', gerekli: null, mesaj: 'Ağırlıklar geçersiz: toplam 0 olamaz.' };
  }
  var top = wv + wf;
  var wvf = wv / top, wff = wf / top;
  var g = (h - v * wvf) / wff;
  var g2 = Math.round(g * 100) / 100;

  if (g <= 0) {
    return {
      durum: 'gecti', gerekli: 0,
      mesaj: 'Vizen hedefi tek başına karşılıyor: finalden 0 alsan bile ortalaman hedefe ulaşır. (Bazı okullarda final barajı olabilir — öğrenci işleri yönetmeliğini kontrol et.)'
    };
  }
  if (g > 100) {
    return {
      durum: 'imkansiz', gerekli: g2,
      mesaj: 'Bu ağırlıklarla hedefe ulaşmak mümkün değil: finalden ' + g2 + ' alman gerekirdi. Hedefini gözden geçir ya da bütünleme sınavına hazırlan.'
    };
  }
  return {
    durum: 'gerekli', gerekli: g2,
    mesaj: 'Dersten ' + h + ' ortalamayla geçmek için finalden en az ' + g2 + ' alman gerekiyor.'
  };
}

var API = {
  agirlikliOrtalama: agirlikliOrtalama,
  gerekliFinal: gerekliFinal
};

if (typeof window !== 'undefined') { window.PR_vizefinal = API; }
if (typeof module !== 'undefined' && module.exports) { module.exports = API; }

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var $ = function (id) { return document.getElementById(id); };
    var vizeEl = $('vize'), wvEl = $('agirlik-vize'), wfEl = $('agirlik-final'),
        hedefEl = $('hedef'), sonucEl = $('sonuc-deger'), altEl = $('sonuc-alt'),
        kutuEl = $('sonuc');

    function tr(n) {
      return n.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }

    function hesapla() {
      var r = gerekliFinal(vizeEl.value, hedefEl.value, wvEl.value, wfEl.value);
      kutuEl.classList.remove('sonuc-ok', 'sonuc-uyari', 'sonuc-hata');
      if (r.durum === 'hata') {
        sonucEl.textContent = '—';
        altEl.textContent = r.mesaj;
        kutuEl.classList.add('sonuc-hata');
        return;
      }
      if (r.durum === 'gerekli') {
        sonucEl.textContent = tr(r.gerekli);
        kutuEl.classList.add('sonuc-ok');
      } else if (r.durum === 'gecti') {
        sonucEl.textContent = '0';
        kutuEl.classList.add('sonuc-ok');
      } else {
        sonucEl.textContent = 'Mümkün değil';
        kutuEl.classList.add('sonuc-uyari');
      }
      altEl.textContent = r.mesaj;
    }

    ['vize', 'agirlik-vize', 'agirlik-final', 'hedef'].forEach(function (id) {
      $(id).addEventListener('input', hesapla);
    });
    hesapla();
  });
}
