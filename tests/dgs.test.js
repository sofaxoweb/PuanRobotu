/* DGS testleri — window.PR_dgs */
const assert = require("assert");
const D = require("../assets/js/hesap-dgs.js");

function yaklasik(a, b, eps) {
  assert.ok(Math.abs(a - b) <= eps, "beklenen " + b + ", bulunan " + a);
}

// 1) Çalışılmış örnek (sayfadakiyle birebir):
//    Sayısal 30D/5Y → 28,75 net; Sözel 28D/4Y → 27 net; diploma 85 → ÖBP 68
const r = D.puanHesapla({ sayDogru: 30, sayYanlis: 5, sozDogru: 28, sozYanlis: 4, diploma: 85, kirik: false });
assert.deepStrictEqual(r, {
  netSayisal: 28.75, netSozel: 27, obp: 68,
  say: 245.7, soz: 237.3, ea: 241.5
});

// 2) Sınır durumu: hepsi boş → resmi 1 net kuralı, puan hesaplanamaz
assert.strictEqual(
  D.puanHesapla({ sayDogru: 0, sayYanlis: 0, sozDogru: 0, sozYanlis: 0, diploma: 50, kirik: false }),
  null
);
// Tek testte net yoksa da null
assert.strictEqual(
  D.puanHesapla({ sayDogru: 40, sayYanlis: 0, sozDogru: 0, sozYanlis: 0, diploma: 70, kirik: false }),
  null
);

// 3) Sınır durumu: hepsi doğru → SP kırpma (90) devrede
const f = D.puanHesapla({ sayDogru: 50, sayYanlis: 0, sozDogru: 50, sozYanlis: 0, diploma: 100, kirik: false });
assert.deepStrictEqual(f, {
  netSayisal: 50, netSozel: 50, obp: 80,
  say: 372, soz: 372, ea: 372
});

// 4) Kırık ÖBP: katsayı 0,45 olur (0,6 yerine) → 0,15×68 = 10,2 puan kayıp
const k = D.puanHesapla({ sayDogru: 30, sayYanlis: 5, sozDogru: 28, sozYanlis: 4, diploma: 85, kirik: true });
yaklasik(k.say, 235.5, 0.01);
yaklasik(k.soz, 227.1, 0.01);
yaklasik(k.ea, 231.3, 0.01);

// 5) Çapa tutarlılığı: 75–76 net + ÖBP 70 → EA ≈ 313,8 (gözlem: 315–316)
const c = D.puanHesapla({ sayDogru: 38, sayYanlis: 1, sozDogru: 38, sozYanlis: 1, diploma: 87.5, kirik: false });
yaklasik(c.ea, 313.8, 1.5);

// 6) ÖBP kuralları: 50'nin altı 50 sayılır; aralık 40–80
assert.strictEqual(D.obpHesapla(85), 68);
assert.strictEqual(D.obpHesapla(40), 40);
assert.strictEqual(D.obpHesapla(100), 80);
// Net formülü: 30D/5Y = 28,75
assert.strictEqual(D.netHesapla(30, 5), 28.75);

console.log("dgs.test.js: OK");
