'use strict';
var assert = require('assert');
var A = require('../assets/js/not-aof.js');

function yaklasik(a, b, eps) {
  assert.ok(Math.abs(a - b) < (eps || 1e-9), 'beklenen ' + b + ', gelen ' + a);
}

/* 1. Çalışılmış örnek (sayfadakiyle birebir): ara 60, final 80 → 18 + 56 = 74 */
(function () {
  yaklasik(A.basariNotu(60, 80), 74);
  var r = A.degerlendir(60, 80);
  yaklasik(r.basari, 74);
  assert.strictEqual(r.durum, 'gecti');
  assert.strictEqual(r.harf, null); /* harf eğriye göre belirlenir */
})();

/* 2. Sınır: 35 barajının altı → otomatik FF */
(function () {
  var r = A.degerlendir(20, 30); /* 6 + 21 = 27 */
  yaklasik(r.basari, 27);
  assert.strictEqual(r.durum, 'kaldi');
  assert.strictEqual(r.harf, 'FF');
})();

/* 3. Sınır: tam 35 → baraj geçilir (harf eğriye göre) */
(function () {
  var r = A.degerlendir(0, 50); /* 0 + 35 = 35 */
  yaklasik(r.basari, 35);
  assert.strictEqual(r.durum, 'gecti');
  assert.strictEqual(r.harf, null);
})();

/* 4. Resmî ağırlıklar: %30 / %70 */
(function () {
  assert.strictEqual(A.AGIRLIK_ARA, 0.30);
  assert.strictEqual(A.AGIRLIK_FINAL, 0.70);
  assert.strictEqual(A.ALT_SINIR, 35);
})();

/* 5. Hata durumları */
(function () {
  assert.strictEqual(A.degerlendir('abc', 80).durum, 'hata');
  assert.strictEqual(A.degerlendir(120, 80).durum, 'hata');
  assert.ok(Number.isNaN(A.basariNotu(-1, 50)));
})();

console.log('not-aof: 5 test geçti ✓');
