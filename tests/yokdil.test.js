/* YÖKDİL testleri — window.PR_yokdil */
const assert = require("assert");
const K = require("../assets/js/hesap-yokdil.js");

function yaklasik(a, b, eps) {
  assert.ok(Math.abs(a - b) <= eps, "beklenen " + b + ", bulunan " + a);
}

// 1) Çalışılmış örnek (sayfadakiyle birebir): 64 doğru → 80,00 (B)
assert.strictEqual(K.puanHesapla(64), 80);
assert.strictEqual(K.seviye(K.puanHesapla(64)), "B");

// 2) Sınır durumu: hepsi boş → 0 puan, seviye yok
assert.strictEqual(K.puanHesapla(0), 0);
assert.strictEqual(K.seviye(0), null);

// 3) Sınır durumu: hepsi doğru → 100 puan, A seviyesi
assert.strictEqual(K.puanHesapla(80), 100);
assert.strictEqual(K.seviye(100), "A");

// 4) Seviye eşikleri (YDS ile aynı resmi aralıklar)
assert.strictEqual(K.seviye(90), "A");
assert.strictEqual(K.seviye(80), "B");
assert.strictEqual(K.seviye(70), "C");
assert.strictEqual(K.seviye(60), "D");
assert.strictEqual(K.seviye(50), "E");

// 5) Aralık dışı girişler kırpılır; 44 doğru = 55 puan
assert.strictEqual(K.puanHesapla(99), 100);
yaklasik(K.puanHesapla(44), 55, 0.001);

console.log("yokdil.test.js: OK");
