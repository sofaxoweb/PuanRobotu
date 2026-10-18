'use strict';
var assert = require('assert');
var H = require('../assets/js/not-harf.js');

/* 1. Çalışılmış örnek (sayfadakiyle birebir, varsayılan bant): 84 → BB, 92 → AA */
(function () {
  assert.strictEqual(H.harfBul(84), 'BB');
  assert.strictEqual(H.harfBul(92), 'AA');
  assert.strictEqual(H.harfBul(49.9), 'FF');
})();

/* 2. Sınır değerleri: 90 → AA, 89.99 → BA, 50 → FD, 0 → FF */
(function () {
  assert.strictEqual(H.harfBul(90), 'AA');
  assert.strictEqual(H.harfBul(89.99), 'BA');
  assert.strictEqual(H.harfBul(50), 'FD');
  assert.strictEqual(H.harfBul(0), 'FF');
  assert.strictEqual(H.harfBul(100), 'AA');
})();

/* 3. Öngörülen bant farkı: 62 puan Kent'te CC, GTÜ'de DD olmalı */
(function () {
  assert.strictEqual(H.harfBul(62, H.BANT_ONAYARLAR.kent.bantlar), 'CC');
  assert.strictEqual(H.harfBul(62, H.BANT_ONAYARLAR.gtu.bantlar), 'DD');
  assert.strictEqual(H.harfBul(62, H.BANT_ONAYARLAR.aydin.bantlar), 'DC');
})();

/* 4. Geçersiz girdi → null */
(function () {
  assert.strictEqual(H.harfBul(-5), null);
  assert.strictEqual(H.harfBul(101), null);
  assert.strictEqual(H.harfBul('abc'), null);
})();

/* 5. Bant doğrulama: bozuk bant yakalanmalı */
(function () {
  assert.strictEqual(H.bantDogrula(H.BANT_ONAYARLAR.yaygin.bantlar).ok, true);
  var bozuk = [{ harf: 'AA', min: 80 }, { harf: 'BA', min: 80 }]; /* aynı alt sınır */
  assert.strictEqual(H.bantDogrula(bozuk).ok, false);
  var aralikDisi = [{ harf: 'AA', min: 120 }];
  assert.strictEqual(H.bantDogrula(aralikDisi).ok, false);
})();

console.log('not-harf: 5 test geçti ✓');
