/* PuanRobotu — site davranışları: arama, kenar çubuğu, ilgili araçlar, mobil menü */
(function () {
  "use strict";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Anasayfa arama ---------- */
  function initSearch() {
    var input = document.getElementById("arama");
    var results = document.getElementById("arama-sonuc");
    if (!input || !results) return;

    function norm(s) {
      return s.toLocaleLowerCase("tr-TR");
    }

    function render(q) {
      q = norm(q.trim());
      if (q.length < 2) {
        results.innerHTML = "";
        results.hidden = true;
        return;
      }
      var hits = window.PR_TOOLS.filter(function (t) {
        var hay = norm(t.ad + " " + t.aciklama + " " + t.kw.join(" "));
        return q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
      }).slice(0, 8);

      if (!hits.length) {
        results.innerHTML = '<div class="arama-bos">Sonuç bulunamadı. Farklı bir kelime dene (ör. "puan", "not", "tercih").</div>';
      } else {
        results.innerHTML = hits.map(function (t) {
          var cat = window.PR_catById(t.cat);
          return '<a class="arama-oge" href="' + t.url + '">' +
            '<span class="arama-ikon">' + (cat ? cat.ikon : "🧮") + "</span>" +
            '<span class="arama-metin"><strong>' + esc(t.ad) + "</strong>" +
            "<small>" + esc(t.aciklama) + "</small></span>" +
            "</a>";
        }).join("");
      }
      results.hidden = false;
    }

    input.addEventListener("input", function () { render(input.value); });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".arama-kutu")) results.hidden = true;
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var first = results.querySelector("a");
        if (first) window.location.href = first.getAttribute("href");
      }
    });
  }

  /* ---------- Kenar çubuğu: aynı kategorideki diğer araçlar ---------- */
  function initSidebar() {
    var aside = document.getElementById("kenar-cubugu");
    if (!aside) return;
    var toolId = aside.getAttribute("data-arac");
    var catId = aside.getAttribute("data-kategori");
    var tool = window.PR_toolById(toolId);
    if (tool) catId = tool.cat;
    var cat = window.PR_catById(catId);
    if (!cat) return;

    var others = window.PR_toolsByCat(catId).filter(function (t) { return t.id !== toolId; });
    var html = '<div class="kenarcubugu-baslik">' + cat.ikon + " " + esc(cat.ad) + " Araçları</div><ul class="kenarcubugu-liste">";
    html += others.map(function (t) {
      return '<li><a href="' + t.url + '">' + esc(t.ad) + "</a></li>";
    }).join("");
    html += "</ul>";
    html += '<a class="kenarcubugu-tumu" href="/' + cat.slug + '/">Tüm ' + esc(cat.ad) + " araçları →</a>";
    aside.innerHTML = html;
  }

  /* ---------- Sayfa altı: ilgili hesaplayıcılar ---------- */
  function initRelated() {
    var sec = document.getElementById("ilgili-araclar");
    if (!sec) return;
    var toolId = sec.getAttribute("data-arac");
    var tool = window.PR_toolById(toolId);
    if (!tool) return;

    // Önce aynı kategori, sonra kullanıcı yolculuğu sırasına göre komşu kategoriler
    var journey = ["lgs", "yks", "uninot", "lisansustu", "kamu"];
    var picks = [];
    window.PR_toolsByCat(tool.cat).forEach(function (t) {
      if (t.id !== toolId) picks.push(t);
    });
    var idx = journey.indexOf(tool.cat);
    [idx + 1, idx - 1].forEach(function (j) {
      if (j >= 0 && j < journey.length) {
        window.PR_toolsByCat(journey[j]).slice(0, 2).forEach(function (t) { picks.push(t); });
      }
    });
    picks = picks.slice(0, 6);
    if (!picks.length) { sec.hidden = true; return; }

    sec.innerHTML =
      '<div class="wrap"><h2>İlgili Hesaplayıcılar</h2>' +
      '<div class="arac-kartlari">' +
      picks.map(function (t) {
        var cat = window.PR_catById(t.cat);
        return '<a class="arac-kart" href="' + t.url + '">' +
          '<span class="arac-kart-ikon">' + (cat ? cat.ikon : "🧮") + "</span>" +
          "<strong>" + esc(t.ad) + "</strong>" +
          "<small>" + esc(t.aciklama) + "</small></a>";
      }).join("") +
      "</div></div>";
  }

  /* ---------- Kategori hub: araç kartlarını doldur ---------- */
  function initHubCards() {
    document.querySelectorAll("[data-kategori-kartlar]").forEach(function (box) {
      var catId = box.getAttribute("data-kategori-kartlar");
      var tools = window.PR_toolsByCat(catId);
      box.innerHTML = tools.map(function (t) {
        return '<a class="arac-kart arac-kart-buyuk" href="' + t.url + '">' +
          "<strong>" + esc(t.ad) + "</strong>" +
          "<small>" + esc(t.aciklama) + "</small>" +
          '<span class="arac-kart-ok">Hesapla →</span></a>';
      }).join("");
    });
  }

  /* ---------- Mobil menü ---------- */
  function initNav() {
    var btn = document.getElementById("menu-dugme");
    var nav = document.getElementById("site-nav");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("acik");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSearch();
    initSidebar();
    initRelated();
    initHubCards();
    initNav();
  });
})();
