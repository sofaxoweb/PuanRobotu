'use strict';
/* =====================================================================
   PuanRobotu — AÖF (Anadolu Açıköğretim) not hesaplama motoru
   Resmî formül (Anadolu Üniversitesi Senato kararları):
     Başarı Notu = Ara Sınav × 0,30 + Dönem Sonu × 0,70
   Alt sınır: başarı notu < 35 → otomatik FF.
   35 ve üzeri: harf notu, dersin bağıl değerlendirmesine (çan eğrisi)
   göre belirlenir — tek bir ulusal tablo YOKTUR.
   Tüm hesaplama tarayıcıda yapılır; veri gönderilmez.
   ===================================================================== */

var AGIRLIK_ARA = 0.30;
var AGIRLIK_FINAL = 0.70;
var ALT_SINIR = 35;

/* Ham başarı notu (0–100). */
function basariNotu(ara, donemSonu) {
  var a = Number(ara), f = Number(donemSonu);
  if (![a, f].every(Number.isFinite)) return NaN;
  if (a < 0 || a > 100 || f < 0 || f > 100) return NaN;
  return a * AGIRLIK_ARA + f * AGIRLIK_FINAL;
}

/* Kaba tahmini aralık — RESMİ DEĞİL, yalnızca fikir verir.
   Gerçek harf, dersin eğrisine göre öğrenci bilgi sisteminde açıklanır. */
function tahminiAralik(basari) {
  if (basari >= 85) return 'AA–BA bandı civarı';
  if (basari >= 70) return 'BB–CB bandı civarı';
  if (basari >= 55) return 'CC–DC bandı civarı';
  if (basari >= 35) return 'DD–FD bandı civarı';
  return 'FF';
}

/* Döner: { basari, harf, durum, mesaj }
   durum: 'gecti' | 'kaldi' | 'hata' */
function degerlendir(ara, donemSonu) {
  var a = Number(ara), f = Number(donemSonu);
  if (![a, f].every(Number.isFinite)) {
    return { basari: NaN, harf: null, durum: 'hata', mesaj: 'Lütfen iki sınava da sayı gir.' };
  }
  if (a < 0 || a > 100 || f < 0 || f > 100) {
    return { basari: NaN, harf: null, durum: 'hata', mesaj: 'Notlar 0–100 arasında olmalı.' };
  }
  var bn = basariNotu(a, f);
  var bn2 = Math.round(bn * 100) / 100;
  if (bn < ALT_SINIR) {
    return {
      basari: bn2, harf: 'FF', durum: 'kaldi',
      mesaj: 'Başarı notun 35 barajının altında kaldığı için harf notun otomatik FF olur.'
    };
  }
  return {
    basari: bn2, harf: null, durum: 'gecti',
    mesaj: 'Harf notun, bu dersin çan eğrisine (bağıl değerlendirme) göre belirlenir; aynı puan farklı derste farklı harf getirebilir. ' +
           'Kaba tahmin: ' + tahminiAralik(bn2) + ' (resmi değil). Kesin harfi öğrenci bilgi sisteminden takip et.'
  };
}

var API = {
  AGIRLIK_ARA: AGIRLIK_ARA,
  AGIRLIK_FINAL: AGIRLIK_FINAL,
  ALT_SINIR: ALT_SINIR,
  basariNotu: basariNotu,
  tahminiAralik: tahminiAralik,
  degerlendir: degerlendir
};

if (typeof window !== 'undefined') { window.PR_aof = API; }
if (typeof module !== 'undefined' && module.exports) { module.exports = API; }

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var araEl = document.getElementById('ara'), finalEl = document.getElementById('donemsonu');
    var sonucEl = document.getElementById('sonuc-deger');
    var altEl = document.getElementById('sonuc-alt');
    var kutuEl = document.getElementById('sonuc');

    function tr(n) {
      return n.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }

    function guncelle() {
      var r = degerlendir(araEl.value, finalEl.value);
      kutuEl.classList.remove('sonuc-ok', 'sonuc-hata');
      if (r.durum === 'hata') {
        sonucEl.textContent = '—';
        altEl.textContent = r.mesaj;
        kutuEl.classList.add('sonuc-hata');
        return;
      }
      sonucEl.textContent = tr(r.basari);
      altEl.textContent = (r.harf ? 'Harf notu: ' + r.harf + '. ' : '') + r.mesaj;
      kutuEl.classList.add(r.durum === 'gecti' ? 'sonuc-ok' : 'sonuc-hata');
    }

    araEl.addEventListener('input', guncelle);
    finalEl.addEventListener('input', guncelle);
    guncelle();
  });
}
