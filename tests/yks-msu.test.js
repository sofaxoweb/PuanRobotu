'use strict';
/* MSÜ Puan Hesaplama motoru testleri — node tests/yks-msu.test.js */
var assert = require('assert');
var PR = require('../assets/js/yks-msu.js');

function yaklasik(a, b, eps) {
  assert.ok(Math.abs(a - b) <= (eps || 0.01), 'beklenen ' + b + ', bulunan ' + a);
}

/* Çalışılmış örnek (sayfadaki örnekle BİREBİR aynı):
   TR28 / MAT24 / FEN11 / SOS9 → SA 338,0 */
var ORNEK = { tr: 28, mat: 24, fen: 11, sos: 9 };
var s = PR.hesapla({ nets: ORNEK });
assert.strictEqual(s.ok, true);
yaklasik(s.sa, 338.0);
yaklasik(s.ea, 340.0);
yaklasik(s.soz, 331.0);
yaklasik(s.gn, 344.4);
assert.strictEqual(s.gecerli, true);
console.log('1. çalışılmış örnek (SA 338,0 / EA 340,0 / SÖZ 331,0 / GN 344,4): OK');

/* Sınır durumu: hepsi boş → 100, geçersiz */
var z = PR.hesapla({ nets: { tr: 0, mat: 0, fen: 0, sos: 0 } });
assert.strictEqual(z.ok, true);
yaklasik(z.sa, 100);
yaklasik(z.gn, 100);
assert.strictEqual(z.gecerli, false);
console.log('2. sınır durumu (hepsi boş → 100, geçersiz): OK');

/* Sınır durumu: hepsi tam → 500 */
var f = PR.hesapla({ nets: { tr: 40, mat: 40, fen: 20, sos: 20 } });
assert.strictEqual(f.ok, true);
yaklasik(f.sa, 500);
yaklasik(f.ea, 500);
yaklasik(f.soz, 500);
yaklasik(f.gn, 500);
console.log('3. sınır durumu (hepsi tam → 500): OK');

/* Net formülü ve aralık doğrulaması */
assert.strictEqual(PR.netHesapla(30, 8), 28);
var kotu = PR.hesapla({ nets: { tr: 41, mat: 0, fen: 0, sos: 0 } });
assert.strictEqual(kotu.ok, false); /* 41 > 40 soru */
console.log('4. net formülü ve aralık doğrulaması: OK');

console.log('\nyks-msu: tüm testler geçti.');
