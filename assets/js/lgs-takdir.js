'use strict';
/* =====================================================================
   PuanRobotu — Takdir / Teşekkür Belgesi hesaplama motoru
   Resmi kaynak: MEB Ortaöğretim Kurumları Yönetmeliği, Madde 160.
   Tüm koşullar sağlanmalı: (a) özürsüz devamsızlık ≤ 5 gün,
   (b) tüm derslerden başarılı, (c) dönem ağırlıklı ortalaması ≥ 70,00,
   (d) davranış puanı 100 (disiplin cezası yok).
   85,00+ → Takdir; 70,00–84,99 → Teşekkür; koşul sağlanmazsa belge yok.
   NOT: Madde 160 Ortaöğretim yönetmeliğindendir; ortaokul (5–8. sınıf)
   için eşiklerin aynı olduğu yaygın kabul görür ancak ikinci el bilgidir.
   Tüm hesaplama tarayıcıda yapılır; veri gönderilmez.
   ===================================================================== */

var BELGE_ADLARI = {
  takdir: 'Takdir Belgesi',
  tesekkur: 'Teşekkür Belgesi',
  yok: 'Belge Yok'
};

/* ---------- Saf fonksiyon ---------- */

/* degerlendir(ort, zayifVar, devamsizlik, disiplin)
   disiplin: 'yok' | 'kinama' | 'uzaklastirma'
   döner: { belge: 'takdir'|'tesekkur'|'yok', kosullar: [{id, ad, tamam, detay}] } */
function degerlendir(ort, zayifVar, devamsizlik, disiplin) {
  var ortGecerli = typeof ort === 'number' && isFinite(ort) && ort >= 0 && ort <= 100;
  var devGecerli = typeof devamsizlik === 'number' && isFinite(devamsizlik) && devamsizlik >= 0;

  var kosullar = [
    {
      id: 'ortalama',
      ad: 'Dönem ağırlıklı ortalaması en az 70,00',
      tamam: ortGecerli && ort >= 70,
      detay: ortGecerli
        ? 'Ortalaman: ' + ort.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : 'Geçerli bir ortalama girilmedi.'
    },
    {
      id: 'zayif',
      ad: 'Tüm derslerden başarılı (zayıf ders yok)',
      tamam: !zayifVar,
      detay: zayifVar
        ? 'Zayıf dersin var — koşul sağlanmadı.'
        : 'Zayıf ders yok — koşul sağlandı.'
    },
    {
      id: 'devamsizlik',
      ad: 'Özürsüz devamsızlık 5 günden fazla değil',
      tamam: devGecerli && devamsizlik <= 5,
      detay: devGecerli
        ? ('Özürsüz devamsızlık: ' + devamsizlik + ' gün' + (devamsizlik <= 5 ? ' — koşul sağlandı.' : ' — koşul sağlanmadı.'))
        : 'Geçerli bir devamsızlık günü girilmedi.'
    },
    {
      id: 'disiplin',
      ad: 'Disiplin cezası yok (davranış puanı 100)',
      tamam: disiplin === 'yok',
      detay: disiplin === 'yok'
        ? 'Disiplin cezası yok — koşul sağlandı.'
        : 'Disiplin cezan var (' + disiplinAdi(disiplin) + ') — koşul sağlanmadı.'
    }
  ];

  var hepsiTamam = kosullar.every(function (k) { return k.tamam; });

  var belge = 'yok';
  if (hepsiTamam) {
    belge = ort >= 85 ? 'takdir' : 'tesekkur';
  }

  return { belge: belge, kosullar: kosullar };
}

function disiplinAdi(kod) {
  if (kod === 'kinama') return 'kınama';
  if (kod === 'uzaklastirma') return 'okuldan uzaklaştırma';
  return 'yok';
}

/* Dışa aktarım: tarayıcıda window.PR_takdir, Node testinde module.exports. */
var PR_TAKDIR_API = {
  BELGE_ADLARI: BELGE_ADLARI,
  degerlendir: degerlendir,
  disiplinAdi: disiplinAdi
};

if (typeof window !== 'undefined') {
  window.PR_takdir = PR_TAKDIR_API;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PR_TAKDIR_API;
}

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('takdir-form');
    if (!form) return;
    var hataKutusu = document.getElementById('form-hata');

    function trOrt(n) {
      return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function guncelle() {
      var ort = parseFloat(document.getElementById('ort').value.replace(',', '.'));
      var zayif = document.getElementById('zayif').value === 'evet';
      var dev = parseInt(document.getElementById('devamsizlik').value, 10);
      var disiplin = document.getElementById('disiplin').value;

      if (isNaN(ort) || isNaN(dev)) {
        hataKutusu.textContent = 'Lütfen ortalamanı ve devamsızlık gününü gir.';
        hataKutusu.hidden = false;
        return;
      }
      hataKutusu.hidden = true;

      var s = degerlendir(ort, zayif, dev, disiplin);

      document.getElementById('sonuc-bos').hidden = true;
      document.getElementById('sonuc-dolu').hidden = false;

      var belgeEl = document.getElementById('s-belge');
      belgeEl.textContent = BELGE_ADLARI[s.belge];
      belgeEl.className = 'vurgu belge-' + s.belge;

      var liste = document.getElementById('kosul-listesi');
      liste.innerHTML = '';
      s.kosullar.forEach(function (k) {
        var li = document.createElement('li');
        li.className = k.tamam ? 'kosul-tamam' : 'kosul-eksik';
        var isaret = document.createElement('span');
        isaret.className = 'kosul-isaret';
        isaret.textContent = k.tamam ? '✓' : '✗';
        isaret.setAttribute('aria-hidden', 'true');
        var metin = document.createElement('span');
        var baslik = document.createElement('strong');
        baslik.textContent = k.ad;
        metin.appendChild(baslik);
        metin.appendChild(document.createElement('br'));
        metin.appendChild(document.createTextNode(k.detay));
        li.appendChild(isaret);
        li.appendChild(metin);
        liste.appendChild(li);
      });
    }

    form.addEventListener('input', guncelle);
    form.addEventListener('change', guncelle);
    document.getElementById('btn-hesapla').addEventListener('click', guncelle);

    document.getElementById('btn-temizle').addEventListener('click', function () {
      form.reset();
      hataKutusu.hidden = true;
      document.getElementById('sonuc-bos').hidden = false;
      document.getElementById('sonuc-dolu').hidden = true;
    });
  });
}
