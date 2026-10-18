/* PuanRobotu — YÖKDİL puan hesaplama (pure fonksiyonlar)
   Resmi formül (2026-YÖKDİL/2 kılavuzu 3.8): yanlış cevap cezası YOK,
   Puan = Doğru Sayısı × 1,25. Alan (Fen/Sağlık/Sosyal) puanı etkilemez.
   Sonuç kesindir (tahmin değil). */
(function () {
  "use strict";

  function puanHesapla(dogru) {
    var d = Math.floor(Number(dogru) || 0);
    d = Math.max(0, Math.min(80, d));
    return Math.round(d * 1.25 * 100) / 100;
  }

  // YDS ile aynı resmi dil seviyeleri
  function seviye(puan) {
    var p = Number(puan) || 0;
    if (p >= 90) return "A";
    if (p >= 80) return "B";
    if (p >= 70) return "C";
    if (p >= 60) return "D";
    if (p >= 50) return "E";
    return null;
  }

  var api = { puanHesapla: puanHesapla, seviye: seviye };
  if (typeof window !== "undefined") { window.PR_yokdil = api; }
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
})();
