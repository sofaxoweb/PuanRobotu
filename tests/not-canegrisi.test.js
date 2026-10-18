'use strict';
var assert = require('assert');
var C = require('../assets/js/not-canegrisi.js');

function yaklasik(a, b, eps) {
  assert.ok(Math.abs(a - b) < (eps || 1e-9), 'beklenen ' + b + ', gelen ' + a);
}

/* 1. Çalışılmış örnek (sayfadakiyle birebir): X=70, μ=55, σ=10 → z=1,5, T=65 */
(function () {
  yaklasik(C.zHesapla(70, 55, 10), 1.5);
  yaklasik(C.tHesapla(1.5), 65);
  var r = C.hesapla(70, 55, 10);
  yaklasik(r.z, 1.5);
  yaklasik(r.t, 65);
  assert.strictEqual(r.harf, 'AA'); /* örnek bant: T≥65 → AA */
})();

/* 2. Görelilik: aynı 70 puan, sınıf ortalaması 75 ise z=−0,5, T=45 */
(function () {
  var r = C.hesapla(70, 75, 10);
  yaklasik(r.z, -0.5);
  yaklasik(r.t, 45);
  assert.strictEqual(r.harf, 'CC'); /* örnek bant: 45 ≤ T < 55 → CC */
})();

/* 3. Sınır: standart sapma 0 ya da negatif → hata */
(function () {
  var r = C.hesapla(70, 55, 0);
  assert.ok(r.hata, 'sapma 0 iken hata beklenir');
  var r2 = C.hesapla(70, 55, -5);
  assert.ok(r2.hata, 'negatif sapmada hata beklenir');
})();

/* 4. Bantlar yapılandırılabilir: özel bantta T=65 farklı harf vermeli */
(function () {
  var ozel = [
    { harf: 'AA', minT: 70 }, { harf: 'BB', minT: 55 },
    { harf: 'CC', minT: 45 }, { harf: 'DD', minT: 35 }, { harf: 'FF', minT: -Infinity }
  ];
  assert.strictEqual(C.harfBul(65, ozel), 'BB');
  assert.strictEqual(C.harfBul(65), 'AA'); /* varsayılan bantta AA */
})();

/* 5. Konum açıklaması z işaretine göre değişmeli */
(function () {
  assert.ok(C.konumAciklama(2).indexOf('üst') !== -1);
  assert.ok(C.konumAciklama(-2).indexOf('alt') !== -1);
  assert.ok(C.konumAciklama(0).length > 10);
})();

console.log('not-canegrisi: 5 test geçti ✓');
