/* PuanRobotu — YDS puan hesaplama (pure fonksiyonlar)
   Resmi formül (2026-YDS/1 kılavuzu 3.8): yanlış cevap cezası YOK,
   Puan = Doğru Sayısı × 1,25. Sonuç kesindir (tahmin değil). */
(function () {
  "use strict";

  function puanHesapla(dogru) {
    var d = Math.floor(Number(dogru) || 0);
    d = Math.max(0, Math.min(80, d));
    return Math.round(d * 1.25 * 100) / 100;
  }

  // Resmi dil seviyeleri: A 90–100, B 80–89, C 70–79, D 60–69, E 50–59
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
  if (typeof window !== "undefined") { window.PR_yds = api; }
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
})();
