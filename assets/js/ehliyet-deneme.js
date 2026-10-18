'use strict';
/* =====================================================================
   PuanRobotu — Ehliyet Deneme Sınavı
   200 soruluk bankadan (assets/js/ehliyet-sorular.js) ders dağılımına göre
   tekrarsız 50 soru seçer: Trafik 23, İlk Yardım 12, Araç Tekniği 9,
   Trafik Adabı 6. Şıklar her soruda karıştırılır; doğru cevap takibi
   karıştırmadan SONRA harf üzerinden yapılır. 45:00 geri sayım; süre
   bitince sınav otomatik bitirilir. Sonuçta toplam doğru, puan (×2),
   GEÇTİ/KALDI, ders bazında tablo ve yanlışların doğru cevap +
   açıklama listesi gösterilir. "Tekrar Dene" yeni 50 soru çeker.
   NOT: Bu sorular MEB müfredatına uygun özgün pratik sorularıdır;
   gerçek MEB e-Sınav soruları değildir.
   ===================================================================== */

var DENEME_DAGILIM = [
  { ders: 'trafik',     adet: 23 },
  { ders: 'ilkyardim',  adet: 12 },
  { ders: 'aracteknik', adet: 9 },
  { ders: 'adab',       adet: 6 }
];
var DENEME_TOPLAM_SORU = 50;
var DENEME_SURE_SANIYE = 45 * 60;
var DENEME_SORU_PUAN = 2;
var DENEME_BARAJ = 70;
var DENEME_HARFLER = ['A', 'B', 'C', 'D'];
var DENEME_DERS_AD = {
  trafik: 'Trafik ve Çevre',
  ilkyardim: 'İlk Yardım',
  aracteknik: 'Araç Tekniği',
  adab: 'Trafik Adabı'
};

/* Fisher–Yates karıştırma (yerinde). */
function denemeKaristir(dizi) {
  for (var i = dizi.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = dizi[i];
    dizi[i] = dizi[j];
    dizi[j] = t;
  }
  return dizi;
}

/* Bankadan ders dağılımına göre tekrarsız soru seçimi.
   Her dersten o dersin soruları arasından rastgele seçim yapılır,
   böylece aynı soru asla iki kez gelmez. */
function denemeSoruSec(banka) {
  var secilen = [];
  for (var i = 0; i < DENEME_DAGILIM.length; i++) {
    var kural = DENEME_DAGILIM[i];
    var havuz = [];
    for (var j = 0; j < banka.length; j++) {
      if (banka[j].d === kural.ders) havuz.push(banka[j]);
    }
    denemeKaristir(havuz);
    for (var t = 0; t < kural.adet && t < havuz.length; t++) {
      secilen.push(havuz[t]);
    }
  }
  denemeKaristir(secilen); /* dersler karışık sırada gelir */
  return secilen;
}

/* Bir sorunun şıklarını karıştır; doğru cevabı yeni harfle takip et. */
function denemeSoruyuHazirla(soru) {
  var sira = denemeKaristir([0, 1, 2, 3]);
  var dogruHarf = '';
  for (var i = 0; i < sira.length; i++) {
    if (sira[i] === soru.c) dogruHarf = DENEME_HARFLER[i];
  }
  return { soru: soru, sira: sira, dogruHarf: dogruHarf };
}

function denemeSureYaz(kalan) {
  var dk = Math.floor(kalan / 60);
  var sn = kalan % 60;
  return (dk < 10 ? '0' + dk : '' + dk) + ':' + (sn < 10 ? '0' + sn : '' + sn);
}

function denemeEsc(metin) {
  return String(metin)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DENEME_DAGILIM: DENEME_DAGILIM,
    DENEME_SURE_SANIYE: DENEME_SURE_SANIYE,
    denemeKaristir: denemeKaristir,
    denemeSoruSec: denemeSoruSec,
    denemeSoruyuHazirla: denemeSoruyuHazirla
  };
}

/* =====================================================================
   DOM bağlantısı (yalnızca tarayıcıda çalışır)
   ===================================================================== */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var baslangic = document.getElementById('deneme-baslangic');
    var aktif = document.getElementById('deneme-aktif');
    var sonucAlani = document.getElementById('deneme-sonuc');
    var sorularAlani = document.getElementById('deneme-sorular');
    var sureAlani = document.getElementById('deneme-sure');
    var baslaBtn = document.getElementById('deneme-basla');
    var bitirBtn = document.getElementById('deneme-bitir');
    var bitirAltBtn = document.getElementById('deneme-bitir-alt');

    var hazirSorular = []; /* [{soru, sira, dogruHarf}] */
    var kalanSure = DENEME_SURE_SANIYE;
    var zamanlayici = null;
    var bitti = false;

    function bankayiAl() {
      if (typeof EHLIYET_SORULAR === 'undefined' || !EHLIYET_SORULAR || !EHLIYET_SORULAR.length) {
        return null;
      }
      return EHLIYET_SORULAR;
    }

    function sorulariCiz() {
      var html = '';
      for (var i = 0; i < hazirSorular.length; i++) {
        var h = hazirSorular[i];
        var q = h.soru;
        html += '<div class="deneme-soru" id="dsoru-' + i + '">' +
          '<p class="deneme-soru-baslik"><span class="soru-no">' + (i + 1) + '.</span> ' +
          '<span class="soru-ders">' + denemeEsc(DENEME_DERS_AD[q.d] || q.d) + '</span></p>' +
          '<p class="deneme-soru-metni">' + denemeEsc(q.s) + '</p>' +
          '<div class="deneme-siklar" role="radiogroup" aria-label="Soru ' + (i + 1) + ' şıkları">';
        for (var k = 0; k < 4; k++) {
          var harf = DENEME_HARFLER[k];
          var metin = q.o[h.sira[k]];
          html += '<label class="deneme-sik"><input type="radio" name="dsoru-' + i +
            '" value="' + harf + '"> <span class="sik-harf">' + harf + ')</span> ' +
            denemeEsc(metin) + '</label>';
        }
        html += '</div></div>';
      }
      sorularAlani.innerHTML = html;
    }

    function sayaciBaslat() {
      kalanSure = DENEME_SURE_SANIYE;
      sureAlani.textContent = denemeSureYaz(kalanSure);
      zamanlayici = setInterval(function () {
        kalanSure--;
        if (kalanSure <= 0) {
          kalanSure = 0;
          sureAlani.textContent = denemeSureYaz(0);
          bitir(true); /* süre doldu: otomatik bitir */
          return;
        }
        sureAlani.textContent = denemeSureYaz(kalanSure);
        if (kalanSure <= 300) sureAlani.classList.add('sure-az');
      }, 1000);
    }

    function sayaciDurdur() {
      if (zamanlayici) {
        clearInterval(zamanlayici);
        zamanlayici = null;
      }
    }

    function basla() {
      var banka = bankayiAl();
      if (!banka) {
        baslangic.innerHTML = '<p class="form-hata" role="alert">Soru bankası yüklenemedi. Sayfayı yenileyip tekrar deneyin.</p>';
        return;
      }
      var secilen = denemeSoruSec(banka);
      hazirSorular = [];
      for (var i = 0; i < secilen.length; i++) {
        hazirSorular.push(denemeSoruyuHazirla(secilen[i]));
      }
      bitti = false;
      sonucAlani.hidden = true;
      sonucAlani.innerHTML = '';
      baslangic.hidden = true;
      aktif.hidden = false;
      sorulariCiz();
      sureAlani.classList.remove('sure-az');
      sayaciBaslat();
      window.scrollTo(0, aktif.offsetTop - 20);
    }

    function kullaniciCevabi(i) {
      var secili = document.querySelector('input[name="dsoru-' + i + '"]:checked');
      return secili ? secili.value : '';
    }

    function bitir(otomatik) {
      if (bitti) return;
      bitti = true;
      sayaciDurdur();

      var toplamDogru = 0;
      var toplamBos = 0;
      var dersIstatistik = {};
      for (var d = 0; d < DENEME_DAGILIM.length; d++) {
        dersIstatistik[DENEME_DAGILIM[d].ders] = { dogru: 0, yanlis: 0, bos: 0, toplam: 0 };
      }
      var yanlislar = [];

      for (var i = 0; i < hazirSorular.length; i++) {
        var h = hazirSorular[i];
        var q = h.soru;
        var cevap = kullaniciCevabi(i);
        var ist = dersIstatistik[q.d];
        ist.toplam++;
        if (cevap === '') {
          toplamBos++;
          ist.bos++;
          yanlislar.push({ no: i + 1, h: h, cevap: '', durum: 'boş' });
        } else if (cevap === h.dogruHarf) {
          toplamDogru++;
          ist.dogru++;
        } else {
          ist.yanlis++;
          yanlislar.push({ no: i + 1, h: h, cevap: cevap, durum: 'yanlış' });
        }
      }

      var puan = toplamDogru * DENEME_SORU_PUAN;
      var gecti = puan >= DENEME_BARAJ;
      var rozet = gecti
        ? '<span class="rozet rozet-guvenli">GEÇTİ</span>'
        : '<span class="rozet rozet-zorlu">KALDI</span>';

      var html = '<div class="deneme-sonuc-ozet">' +
        '<h3>Sınav Sonucun ' + (otomatik ? '(süre doldu)' : '') + '</h3>' +
        '<p class="deneme-puan-buyuk">' + puan + ' / 100 ' + rozet + '</p>' +
        '<p>Doğru: <strong>' + toplamDogru + '</strong> · Yanlış: <strong>' +
        (hazirSorular.length - toplamDogru - toplamBos) + '</strong> · Boş: <strong>' +
        toplamBos + '</strong></p>' +
        (gecti
          ? '<p>Baraj 70 puandır. Bu sonuçla teorik sınavı geçerdin.</p>'
          : '<p>Baraj 70 puandır (35 doğru). Geçmen için ' + (35 - toplamDogru) + ' doğru daha gerekliydi.</p>') +
        '<button type="button" id="deneme-tekrar" class="btn btn-primary">Tekrar Dene — Yeni 50 Soru</button>' +
        '</div>';

      html += '<h3>Ders Bazında Sonuç</h3><div class="tablo-kaydir"><table class="bilgi-tablosu">' +
        '<thead><tr><th scope="col">Ders</th><th scope="col">Doğru</th><th scope="col">Yanlış</th>' +
        '<th scope="col">Boş</th><th scope="col">Başarı</th></tr></thead><tbody>';
      for (var s = 0; s < DENEME_DAGILIM.length; s++) {
        var dersKodu = DENEME_DAGILIM[s].ders;
        var st = dersIstatistik[dersKodu];
        var yuzde = st.toplam ? Math.round(st.dogru / st.toplam * 100) : 0;
        html += '<tr><td>' + denemeEsc(DENEME_DERS_AD[dersKodu]) + '</td><td>' + st.dogru +
          '</td><td>' + st.yanlis + '</td><td>' + st.bos + '</td><td>%' + yuzde + '</td></tr>';
      }
      html += '</tbody></table></div>';

      if (yanlislar.length) {
        html += '<h3>Yanlış ve Boş Bıraktığın Sorular (' + yanlislar.length + ')</h3>';
        for (var y = 0; y < yanlislar.length; y++) {
          var yl = yanlislar[y];
          var soru = yl.h.soru;
          var kullaniciMetni = yl.cevap === '' ? '— (boş)' : yl.cevap + ') ' + denemeEsc(soru.o[yl.h.sira[DENEME_HARFLER.indexOf(yl.cevap)]]);
          var dogruMetni = yl.h.dogruHarf + ') ' + denemeEsc(soru.o[soru.c]);
          html += '<div class="deneme-yanlis">' +
            '<p><strong>Soru ' + yl.no + '</strong> <span class="soru-ders">' +
            denemeEsc(DENEME_DERS_AD[soru.d]) + '</span></p>' +
            '<p>' + denemeEsc(soru.s) + '</p>' +
            '<p>Senin cevabın: <strong>' + kullaniciMetni + '</strong> <span class="rozet rozet-zorlu">' + yl.durum + '</span></p>' +
            '<p>Doğru cevap: <strong>' + dogruMetni + '</strong></p>' +
            '<p class="deneme-aciklama">' + denemeEsc(soru.a) + '</p>' +
            '</div>';
        }
      } else {
        html += '<p><strong>Tebrikler!</strong> 50 sorunun tamamını doğru cevapladın.</p>';
      }

      sonucAlani.innerHTML = html;
      sonucAlani.hidden = false;
      aktif.hidden = true;
      window.scrollTo(0, sonucAlani.offsetTop - 20);
    }

    if (baslaBtn) baslaBtn.addEventListener('click', basla);
    if (bitirBtn) bitirBtn.addEventListener('click', function () { bitir(false); });
    if (bitirAltBtn) bitirAltBtn.addEventListener('click', function () { bitir(false); });

    /* "Tekrar Dene" butonu sonuç alanında oluşturulur; delege et */
    sonucAlani.addEventListener('click', function (e) {
      if (e.target && e.target.id === 'deneme-tekrar') basla();
    });
  });
}
