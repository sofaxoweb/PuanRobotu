/* ALES testleri — window.PR_ales */
const assert = require("assert");
const A = require("../assets/js/hesap-ales.js");

function yaklasik(a, b, eps) {
  assert.ok(Math.abs(a - b) <= eps, "beklenen " + b + ", bulunan " + a);
}

// 1) Çalışılmış örnek (sayfadakiyle birebir):
//    Sayısal 32D/8Y → net 30; Sözel 36D/4Y → net 35
const r = A.puanHesapla({ sayDogru: 32, sayYanlis: 8, sozDogru: 36, sozYanlis: 4 });
assert.deepStrictEqual(r, {
  netSayisal: 30, netSozel: 35,
  say: 81.59, soz: 84.84, ea: 83.21
});

// 2) Sınır durumu: hepsi boş → en düşük bant
const b = A.puanHesapla({ sayDogru: 0, sayYanlis: 0, sozDogru: 0, sozYanlis: 0 });
assert.deepStrictEqual(b.netSayisal, 0);
assert.deepStrictEqual(b.netSozel, 0);
yaklasik(b.say, 41.15, 0.05);
yaklasik(b.soz, 41.67, 0.05);

// 3) Sınır durumu: hepsi doğru → 100'e kırpılır
const f = A.puanHesapla({ sayDogru: 50, sayYanlis: 0, sozDogru: 50, sozYanlis: 0 });
assert.deepStrictEqual(f.say, 100);
assert.deepStrictEqual(f.soz, 100);
assert.deepStrictEqual(f.ea, 100);

// 4) Çapa 1 (gerçek ÖSYM sonuç belgesi, 20.11.2022):
//    net 15,75/19,75 → SAY 62,81835 / SÖZ 65,64572
const c1 = A.puanHesapla({ sayDogru: 17, sayYanlis: 5, sozDogru: 24, sozYanlis: 17 });
yaklasik(c1.say, 62.82, 0.05);
yaklasik(c1.soz, 65.65, 0.05);

// 5) Çapa 2 (gerçek ÖSYM sonuç belgesi, 28.07.2024):
//    net 32,50/38,75 → SAY 85,22163 / SÖZ 89,23376
const c2 = A.puanHesapla({ sayDogru: 36, sayYanlis: 14, sozDogru: 41, sozYanlis: 9 });
yaklasik(c2.say, 85.22, 0.05);
yaklasik(c2.soz, 89.23, 0.05);

// 6) Net formülü: 32D/8Y = 30
assert.strictEqual(A.netHesapla(32, 8), 30);
assert.strictEqual(A.netHesapla(0, 0), 0);

console.log("ales.test.js: OK");
