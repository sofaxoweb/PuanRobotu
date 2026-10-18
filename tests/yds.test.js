/* YDS testleri — window.PR_yds */
const assert = require("assert");
const Y = require("../assets/js/hesap-yds.js");

function yaklasik(a, b, eps) {
  assert.ok(Math.abs(a - b) <= eps, "beklenen " + b + ", bulunan " + a);
}

// 1) Çalışılmış örnek (sayfadakiyle birebir): 52 doğru → 65,00 (D)
assert.strictEqual(Y.puanHesapla(52), 65);
assert.strictEqual(Y.seviye(Y.puanHesapla(52)), "D");

// 2) Sınır durumu: hepsi boş → 0 puan, seviye yok
assert.strictEqual(Y.puanHesapla(0), 0);
assert.strictEqual(Y.seviye(0), null);

// 3) Sınır durumu: hepsi doğru → 100 puan, A seviyesi
assert.strictEqual(Y.puanHesapla(80), 100);
assert.strictEqual(Y.seviye(100), "A");

// 4) Seviye eşikleri
assert.strictEqual(Y.seviye(90), "A");
assert.strictEqual(Y.seviye(89.99), "B");
assert.strictEqual(Y.seviye(70), "C");
assert.strictEqual(Y.seviye(60), "D");
assert.strictEqual(Y.seviye(50), "E");
assert.strictEqual(Y.seviye(49.99), null);

// 5) Aralık dışı girişler kırpılır
assert.strictEqual(Y.puanHesapla(120), 100);
assert.strictEqual(Y.puanHesapla(-5), 0);
yaklasik(Y.puanHesapla(56), 70, 0.001); // 70 puan için 56 doğru

console.log("yds.test.js: OK");
