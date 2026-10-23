'use strict';
/* CHECKLIST BATARYASI v2 (2026-10-23) — sınır/geçersiz/boş-sıfır davranışları.
   Sert beklentiler FAIL verir; yoruma açık davranışlar RAPOR satırı basar. */
var assert = require('assert');
var fails = [], rapor = [], pass = 0;
function sert(ad, fn) { try { fn(); pass++; } catch (e) { fails.push(ad + ' -> ' + e.message); } }
function yumusak(ad, fn) { try { rapor.push(ad + ' -> ' + fn()); } catch (e) { rapor.push(ad + ' -> THROW: ' + e.message); } }
function red(s) { return s && s.ok === false; }
function sonlu(s) { return JSON.stringify(s, function (k, v) { return typeof v === 'number' ? (isFinite(v) ? v : 'NONFINITE') : v; }).indexOf('NONFINITE') === -1; }

/* Sınıf A: [{dogru,yanlis}] — tus, dus, kpss x3 (sıfır kuralı KPSS'de farklı) */
[['tus-puan.js','TUS_TESTLER',true],['dus-puan.js','DUS_TESTLER',true],
 ['kpss-puan.js','KPSS_TESTLER',false],['kpss-onlisans.js','P93_TESTLER',false],
 ['kpss-ortaogretim.js','P94_TESTLER',false]].forEach(function (c) {
  var M = require('../assets/js/' + c[0]);
  var sorular = M[c[1]].map(function (t) { return t.soru || t.soruSayisi || t.adet; });
  function g(fn) { return sorular.map(function (s, i) { return fn(s, i); }); }
  sert(c[0] + ': doğru>soru reddedilir', function () { assert.ok(red(M.hesapla(g(function (s, i) { return i === 0 ? { dogru: s + 1, yanlis: 0 } : { dogru: 0, yanlis: 0 }; })))); });
  sert(c[0] + ': doğru+yanlış>soru reddedilir', function () { assert.ok(red(M.hesapla(g(function (s, i) { return i === 0 ? { dogru: s, yanlis: 1 } : { dogru: 0, yanlis: 0 }; })))); });
  sert(c[0] + ': negatif reddedilir', function () { assert.ok(red(M.hesapla(g(function (s, i) { return i === 0 ? { dogru: -1, yanlis: 0 } : { dogru: 0, yanlis: 0 }; })))); });
  sert(c[0] + ': 99999 reddedilir', function () { assert.ok(red(M.hesapla(g(function (s, i) { return i === 0 ? { dogru: 99999, yanlis: 0 } : { dogru: 0, yanlis: 0 }; })))); });
  sert(c[0] + ': NaN reddedilir', function () { assert.ok(red(M.hesapla(g(function (s, i) { return i === 0 ? { dogru: NaN, yanlis: 0 } : { dogru: 0, yanlis: 0 }; })))); });
  sert(c[0] + ': kesirli reddedilir', function () { assert.ok(red(M.hesapla(g(function (s, i) { return i === 0 ? { dogru: 2.5, yanlis: 0 } : { dogru: 0, yanlis: 0 }; })))); });
  sert(c[0] + ': tam doğru -> ok + sonlu', function () { var s = M.hesapla(g(function (s0) { return { dogru: s0, yanlis: 0 }; })); assert.ok(s.ok === true && sonlu(s)); });
  if (c[2]) {
    sert(c[0] + ': sıfır -> ok + sonlu (taban puan)', function () { var s = M.hesapla(g(function () { return { dogru: 0, yanlis: 0 }; })); assert.ok(s.ok === true && sonlu(s), JSON.stringify(s).slice(0,100)); });
  } else {
    sert(c[0] + ': sıfır -> tasarlanmış ret (en az 1 işaretleme kuralı)', function () { var s = M.hesapla(g(function () { return { dogru: 0, yanlis: 0 }; })); assert.ok(s.ok === false && /işaretleme/.test(s.mesaj || ''), JSON.stringify(s).slice(0,100)); });
  }
});

/* MSÜ (net tabanlı) */
(function () {
  var M = require('../assets/js/yks-msu.js');
  sert('msu: sıfır net -> ok, 100 taban', function () { var s = M.hesapla({ nets: { tr: 0, mat: 0, fen: 0, sos: 0 } }); assert.ok(s.ok === true && s.sa === 100); });
  sert('msu: tam net -> ok + sonlu', function () { var s = M.hesapla({ nets: { tr: 40, mat: 40, fen: 20, sos: 20 } }); assert.ok(s.ok === true && sonlu(s)); });
  sert('msu: net>soru reddedilir', function () { assert.ok(red(M.hesapla({ nets: { tr: 41, mat: 0, fen: 0, sos: 0 } }))); });
  sert('msu: negatif net reddedilir', function () { assert.ok(red(M.hesapla({ nets: { tr: -1, mat: 0, fen: 0, sos: 0 } }))); });
  sert('msu: NaN net reddedilir', function () { assert.ok(red(M.hesapla({ nets: { tr: NaN, mat: 0, fen: 0, sos: 0 } }))); });
  sert('msu: eksik alan reddedilir', function () { assert.ok(red(M.hesapla({ nets: { tr: 10 } }))); });
})();

/* Bursluluk (tuple [[d,y]...], doğrulama girdiyiDogrula'da) */
(function () {
  var M = require('../assets/js/lgs-bursluluk.js');
  sert('bursluluk: örnek netler doğru', function () { var s = M.hesapla([[20,5],[15,6],[18,3],[16,4]]); assert.ok(Math.abs(s.netler[0] - 18.3333) < 0.001 && s.puan > 100); });
  sert('bursluluk: sıfır -> 100, tam -> 500', function () {
    assert.strictEqual(M.hesapla([[0,0],[0,0],[0,0],[0,0]]).puan, 100);
    assert.strictEqual(M.hesapla([[25,0],[25,0],[25,0],[25,0]]).puan, 500);
  });
  sert('bursluluk: girdiyiDogrula aşımı yakalar', function () {
    assert.strictEqual(M.girdiyiDogrula(26, 0, 25, 'Türkçe').ok, false);
    assert.strictEqual(M.girdiyiDogrula(20, 6, 25, 'Türkçe').ok, false);
    assert.strictEqual(M.girdiyiDogrula(-1, 0, 25, 'Türkçe').ok, false);
    assert.strictEqual(M.girdiyiDogrula(20, 5, 25, 'Türkçe').ok, true);
  });
})();

/* LGS puan */
(function () {
  var M = require('../assets/js/lgs-puan.js');
  function g(fn) { return M.DERSLER.map(function (d, i) { return fn(d.soru, i); }); }
  sert('lgs: aşım reddedilir', function () { assert.ok(red(M.hesapla(g(function (s, i) { return i === 0 ? { dogru: s + 5, yanlis: 0 } : { dogru: 0, yanlis: 0 }; })))); });
  sert('lgs: NaN reddedilir', function () { assert.ok(red(M.hesapla(g(function (s, i) { return i === 0 ? { dogru: NaN, yanlis: 0 } : { dogru: 0, yanlis: 0 }; })))); });
  sert('lgs: sıfır->100, tam->500', function () {
    assert.strictEqual(M.hesapla(g(function () { return { dogru: 0, yanlis: 0 }; })).puan, 100);
    assert.strictEqual(M.hesapla(g(function (s) { return { dogru: s, yanlis: 0 }; })).puan, 500);
  });
  sert('lgs: dilim monoton + sınırlı', function () { var d1 = M.dilimEnterpole(300), d2 = M.dilimEnterpole(450); assert.ok(d2 < d1 && d1 <= 100 && d2 >= 0); });
})();

/* YKS puan (nets + obp) */
(function () {
  var M = require('../assets/js/yks-puan.js');
  var ORNEK = { tr: 30, sos: 13, tmat: 26, fen: 10, amat: 28, fiz: 9, kim: 8, biy: 9, ede: 0, tar1: 0, cog1: 0, tar2: 0, cog2: 0, fel: 0, din: 0, ydt: 0 };
  sert('yks: örnek -> ok + sonlu', function () { var s = M.hesapla({ nets: ORNEK, obp: 425, kirik: false }); assert.ok(s.ok === true && sonlu(s)); });
  yumusak('yks: net aşımı (tr 41 > 40 soru)', function () { var n = Object.assign({}, ORNEK, { tr: 41 }); var s = M.hesapla({ nets: n, obp: 425, kirik: false }); return 'ok=' + s.ok + ' mesaj=' + (s.mesaj || '-'); });
  yumusak('yks: negatif net', function () { var n = Object.assign({}, ORNEK, { tr: -5 }); var s = M.hesapla({ nets: n, obp: 425, kirik: false }); return 'ok=' + s.ok; });
  yumusak('yks: obp 501', function () { var s = M.hesapla({ nets: ORNEK, obp: 501, kirik: false }); return 'ok=' + s.ok; });
})();

/* ÖABT: hesapla(agsPuan, dogru, yanlis) */
(function () {
  var M = require('../assets/js/oabt-puan.js');
  sert('oabt: bilinen örnek (78.5, 40D, 5Y) -> net 38.75, P2 80.25', function () { var s = M.hesapla(78.5, 40, 5); assert.ok(s.ok === true && s.oabtNet === 38.75 && s.p2 === 80.25); });
  yumusak('oabt: doğru 51 > 50 soru', function () { var s = M.hesapla(70, 51, 0); return 'ok=' + s.ok + ' mesaj=' + (s.mesaj || '-'); });
  yumusak('oabt: AGS puanı 101', function () { var s = M.hesapla(101, 40, 5); return 'ok=' + s.ok; });
})();

/* ALES / DGS puanlayıcılar (saf fonksiyonlar) */
(function () {
  var A = require('../assets/js/hesap-ales.js');
  sert('ales: sıfır -> sonlu taban puanlar', function () { var p = A.puanHesapla({ sayDogru: 0, sayYanlis: 0, sozDogru: 0, sozYanlis: 0 }); assert.ok(sonlu(p)); });
  sert('ales: tam doğru -> sonlu, > sıfır durumu', function () { var f = A.puanHesapla({ sayDogru: 50, sayYanlis: 0, sozDogru: 50, sozYanlis: 0 }); var b = A.puanHesapla({ sayDogru: 0, sayYanlis: 0, sozDogru: 0, sozYanlis: 0 }); assert.ok(sonlu(f) && JSON.stringify(f) !== JSON.stringify(b)); });
  yumusak('ales: sayDogru 51 > 50 soru', function () { var p = A.puanHesapla({ sayDogru: 51, sayYanlis: 0, sozDogru: 0, sozYanlis: 0 }); return JSON.stringify(p).slice(0, 90); });
  var D = require('../assets/js/hesap-dgs.js');
  sert('dgs: obpHesapla(85)=68, (100)=80, (40)=40 taban', function () { assert.strictEqual(D.obpHesapla(85), 68); assert.strictEqual(D.obpHesapla(100), 80); assert.strictEqual(D.obpHesapla(40), 40); });
  yumusak('dgs: puanHesapla aşım (51 doğru)', function () { var p = D.puanHesapla({ sayDogru: 51, sayYanlis: 0, sozDogru: 0, sozYanlis: 0, diploma: 85, kirik: false }); return JSON.stringify(p).slice(0, 90); });
  yumusak('dgs: diploma 101', function () { var p = D.puanHesapla({ sayDogru: 10, sayYanlis: 0, sozDogru: 0, sozYanlis: 0, diploma: 101, kirik: false }); return JSON.stringify(p).slice(0, 90); });
})();

/* YDS / YÖKDİL: doğru x 1.25, 80 soru */
[['hesap-yds.js','YDS'],['hesap-yokdil.js','YÖKDİL']].forEach(function (c) {
  var M = require('../assets/js/' + c[0]);
  sert(c[1] + ': 0->0, 80->100, 40->50', function () {
    assert.strictEqual(M.puanHesapla(0), 0); assert.strictEqual(M.puanHesapla(80), 100); assert.strictEqual(M.puanHesapla(40), 50);
  });
  yumusak(c[1] + ': 81 doğru', function () { return 'puan=' + M.puanHesapla(81); });
  yumusak(c[1] + ': -1 / NaN', function () { return 'neg=' + M.puanHesapla(-1) + ' nan=' + M.puanHesapla(NaN); });
});

/* OBP aracı */
(function () {
  var M = require('../assets/js/yks-obp.js');
  sert('obp araci: 100 diploma -> 500 OBP; katkı tam %12=60, kırık %6=30', function () {
    assert.strictEqual(M.obpHesapla(100), 500);
    assert.strictEqual(M.katkiHesapla(500, false), 60);
    assert.strictEqual(M.katkiHesapla(500, true), 30);
  });
  yumusak('obp araci: diploma 101 / -5', function () { return 'obp101=' + M.obpHesapla(101) + ' obpNeg=' + M.obpHesapla(-5); });
})();

/* Not araçları */
(function () {
  var DN = require('../assets/js/not-donusum.js');
  sert('donusum: 4.00->100 ve 100->4.00', function () { assert.strictEqual(DN.dorteYuize(4).deger, 100); assert.strictEqual(DN.yuzeDorte(100).deger, 4); });
  yumusak('donusum: 4.5 / -1 / 101 aralık dışı', function () { return 'dy(4.5)=' + JSON.stringify(DN.dorteYuize(4.5)) + ' dy(-1)=' + JSON.stringify(DN.dorteYuize(-1)) + ' yd(101)=' + JSON.stringify(DN.yuzeDorte(101)); });
  var G = require('../assets/js/not-gano.js');
  sert('gano: boş liste -> null (NaN değil); AAx5kr -> 4.0', function () {
    assert.strictEqual(G.ganoHesapla([]).gano, null);
    assert.strictEqual(G.ganoHesapla([{ harf: 'AA', kredi: 5 }]).gano, 4);
  });
  var H = require('../assets/js/not-harf.js');
  sert('harf: sınırlar 90 AA / 89.99 BA / 0 FF / 100 AA; aralık dışı null', function () {
    assert.strictEqual(H.harfBul(90), 'AA'); assert.strictEqual(H.harfBul(89.99), 'BA');
    assert.strictEqual(H.harfBul(-5), null); assert.strictEqual(H.harfBul(101), null); assert.strictEqual(H.harfBul('abc'), null);
  });
  var C = require('../assets/js/not-canegrisi.js');
  sert('canegrisi: std 0 ve negatif std sonlu/hatalı ama çökmez', function () { var r = C.hesapla(70, 55, 0); assert.ok(sonlu(r)); });
  var V = require('../assets/js/not-vizefinal.js');
  yumusak('vizefinal: vize 100, hedef 50 -> gerekli final', function () { var r = V.gerekliFinal(100, 50, 40, 60); return JSON.stringify(r).slice(0, 90); });
  yumusak('vizefinal: aralık dışı vize 120', function () { return JSON.stringify(V.agirlikliOrtalama(120, 50, 40, 60)).slice(0, 60); });
  var AO = require('../assets/js/not-aof.js');
  sert('aof: basariNotu(60,80)=74; baraj AĞIRLIKLI nota uygulanır (sayfa SSS teyitli)', function () {
    assert.ok(Math.abs(AO.basariNotu(60, 80) - 74) < 1e-9);
    assert.strictEqual(AO.degerlendir(20, 30).durum, 'kaldi');   /* basari 27 < 35 */
    assert.strictEqual(AO.degerlendir(20, 30).harf, 'FF');
    assert.strictEqual(AO.degerlendir(0, 50).durum, 'gecti');    /* basari tam 35 */
    assert.strictEqual(AO.degerlendir(90, 34).durum, 'gecti');   /* basari 50.8; baraj final notuna DEGIL */
    assert.strictEqual(AO.degerlendir(120, 50).durum, 'hata');   /* aralik disi */
  });
  var T = require('../assets/js/lgs-takdir.js');
  sert('takdir: 85->Takdir, 84.95->Teşekkür, 70->Teşekkür, 69.9->yok', function () {
    assert.strictEqual(T.degerlendir(85, false, 0, 'yok').belge, 'takdir');
    assert.strictEqual(T.degerlendir(84.95, false, 2, 'yok').belge, 'tesekkur');
    assert.strictEqual(T.degerlendir(70, false, 0, 'yok').belge, 'tesekkur');
    assert.ok(T.degerlendir(69.9, false, 0, 'yok').belge !== 'tesekkur');
  });
  yumusak('takdir: ortalama 101 / -5', function () { return 'y101=' + JSON.stringify(T.degerlendir(101, false, 0, 'yok')).slice(0, 60) + ' neg=' + JSON.stringify(T.degerlendir(-5, false, 0, 'yok')).slice(0, 60); });
})();

/* Ehliyet deneme: seçim dağılımı */
(function () {
  var D = require('../assets/js/ehliyet-deneme.js');
  var fs = require('fs'), vm = require('vm');
  var ctx = {}; vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(require('path').join(__dirname, '../assets/js/ehliyet-sorular.js'), 'utf8'), ctx);
  var banka = ctx.EHLIYET_SORULAR || null;
  sert('ehliyet-deneme: banka yüklenir (200 soru)', function () { assert.ok(Array.isArray(banka) && banka.length === 200, 'banka=' + (banka && banka.length)); });
  if (banka) {
    sert('ehliyet-deneme: seçim 50 soru, dağılım 23/12/9/6, tekil', function () {
      var sec = D.denemeSoruSec(banka);
      assert.strictEqual(sec.length, 50);
      var say = {};
      sec.forEach(function (s) { say[s.d] = (say[s.d] || 0) + 1; });
      assert.deepStrictEqual(say, { trafik: 23, ilkyardim: 12, aracteknik: 9, adab: 6 });
      var refset = new Set(sec);
      assert.strictEqual(refset.size, 50);
    });
  }
})();

/* LGS tercih: filtre + bantlar */
(function () {
  var M = require('../assets/js/lgs-tercih.js');
  var okullar = [
    { okul: 'A Lisesi', ilce: 'Merkez', tur: 'Anadolu Lisesi', alan: '', taban: 480, dilim: 1.5, kontenjan: 100 },
    { okul: 'B Lisesi', ilce: 'Merkez', tur: 'Fen Lisesi', alan: '', taban: 495, dilim: 0.5, kontenjan: 60 },
    { okul: 'C Lisesi', ilce: 'Merkez', tur: 'Anadolu Lisesi', alan: '', taban: 300, dilim: 40, kontenjan: 200 },
    { okul: 'D Lisesi', ilce: 'Merkez', tur: 'Anadolu Lisesi', alan: '', taban: null, dilim: null, kontenjan: 50 }
  ];
  sert('tercih: dilim 2 için bant içi okullar, null elenir, sıralı', function () {
    var r = M.okulFiltrele(okullar, 2, null);
    assert.ok(r.okullar.length >= 1 && r.okullar.every(function (o) { return o.dilim != null; }));
    for (var i = 1; i < r.okullar.length; i++) assert.ok(r.okullar[i - 1].taban >= r.okullar[i].taban);
  });
  yumusak('tercih: dilim 0 / 100 sınırları', function () {
    return 'd0=' + M.okulFiltrele(okullar, 0, null).okullar.length + ' d100=' + M.okulFiltrele(okullar, 100, null).okullar.length;
  });
})();

console.log('=== SERT: ' + pass + ' geçti, ' + fails.length + ' FAIL ===');
fails.forEach(function (f) { console.log('FAIL:', f); });
console.log('=== RAPOR ===');
rapor.forEach(function (r) { console.log('RAPOR:', r); });
