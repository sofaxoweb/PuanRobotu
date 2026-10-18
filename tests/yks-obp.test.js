'use strict';
/* OBP Hesaplama motoru testleri — node tests/yks-obp.test.js */
var assert = require('assert');
var PR = require('../assets/js/yks-obp.js');

function yaklasik(a, b, eps) {
  assert.ok(Math.abs(a - b) <= (eps || 0.0001), 'beklenen ' + b + ', bulunan ' + a);
}

/* Çalışılmış örnek (sayfadaki ve MEB örneğindeki sayılarla aynı):
   diploma 78 → OBP 390 → katkı 46,8 */
var s = PR.hesapla(78, false);
assert.strictEqual(s.ok, true);
assert.strictEqual(s.obp, 390);
yaklasik(s.katki, 46.8);
console.log('1. çalışılmış örnek (78 → 390 → 46,8): OK');

/* Kırık OBP: 390 × 0,06 = 23,4 */
var k = PR.hesapla(78, true);
assert.strictEqual(k.ok, true);
assert.strictEqual(k.obp, 390);
yaklasik(k.katki, 23.4);
console.log('2. kırık OBP (390 × 0,06 = 23,4): OK');

/* Sınır durumları: 50 → 250 (+30); 100 → 500 (+60) */
var alt = PR.hesapla(50, false);
assert.strictEqual(alt.obp, 250);
yaklasik(alt.katki, 30);
var ust = PR.hesapla(100, false);
assert.strictEqual(ust.obp, 500);
yaklasik(ust.katki, 60);
console.log('3. sınır durumları (50→250, 100→500): OK');

/* Geçersiz girdiler reddedilir */
assert.strictEqual(PR.hesapla(49, false).ok, false);
assert.strictEqual(PR.hesapla(101, false).ok, false);
assert.strictEqual(PR.hesapla(NaN, false).ok, false);
console.log('4. geçersiz diploma notları reddedilir: OK');

console.log('\nyks-obp: tüm testler geçti.');
