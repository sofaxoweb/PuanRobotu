'use strict';
var assert = require('assert');
var D = require('../assets/js/not-donusum.js');

function yaklasik(a, b, eps) {
  assert.ok(Math.abs(a - b) < (eps || 0.011), 'beklenen ' + b + ', gelen ' + a);
}

/* 1. Çalışılmış örnek (sayfadakiyle birebir): 3,50 → 88,33 */
(function () {
  var r = D.dorteYuize(3.50);
  yaklasik(r.deger, 88.33);
})();

/* 2. Enterpolasyon: 3,55 → 89,50 (raporun ince satırıyla birebir) */
(function () {
  var r = D.dorteYuize(3.55);
  yaklasik(r.deger, 89.50);
})();

/* 3. Ters yön: 88,33 → 3,50 ve 89,50 → 3,55 */
(function () {
  yaklasik(D.yuzeDorte(88.33).deger, 3.50);
  yaklasik(D.yuzeDorte(89.50).deger, 3.55);
})();

/* 4. Uçlar: 4,00 → 100 ve 100 → 4,00 */
(function () {
  assert.strictEqual(D.dorteYuize(4.00).deger, 100);
  assert.strictEqual(D.yuzeDorte(100).deger, 4.00);
  yaklasik(D.dorteYuize(1.00).deger, 30.00);
  yaklasik(D.yuzeDorte(30.00).deger, 1.00);
})();

/* 5. Tablo dışı değerler → hata, uydurma yok */
(function () {
  assert.ok(D.dorteYuize(4.5).hata, '4,5 tablo dışı olmalı');
  assert.ok(D.dorteYuize(0.5).hata, '0,5 tablo dışı olmalı');
  assert.ok(D.yuzeDorte(120).hata, '120 tablo dışı olmalı');
  assert.ok(D.yuzeDorte(10).hata, '10 tablo dışı olmalı');
})();

/* 6. Kilit satırlar tabloda birebir durmalı */
(function () {
  var tablo = {};
  D.TABLO.forEach(function (s) { tablo[s[0].toFixed(2)] = s[1]; });
  assert.strictEqual(tablo['3.90'], 97.66);
  assert.strictEqual(tablo['3.00'], 76.66);
  assert.strictEqual(tablo['2.50'], 65.00);
  assert.strictEqual(tablo['2.00'], 53.33);
})();

console.log('not-donusum: 6 test geçti ✓');
