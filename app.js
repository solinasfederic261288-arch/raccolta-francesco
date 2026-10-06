/* Logica della pagina. Non serve modificare questo file: i dati sono in config.js */
(function () {
  "use strict";
  var C = window.CONFIG || {};
  var $ = function (id) { return document.getElementById(id); };

  function isPlaceholder(v) {
    return typeof v !== "string" || v.trim() === "" || v.trim().charAt(0) === "[";
  }
  function num(v, def) {
    var n = typeof v === "number" ? v : parseFloat(String(v).replace(",", "."));
    return isFinite(n) && n >= 0 ? n : def;
  }
  function euro(n) {
    var dec = Math.round(n * 100) % 100 !== 0;
    return new Intl.NumberFormat("it-IT", {
      style: "currency", currency: "EUR",
      minimumFractionDigits: dec ? 2 : 0, maximumFractionDigits: dec ? 2 : 0
    }).format(n);
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.add("visibile");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("visibile"); }, 2600);
  }

  /* ---------- Copia negli appunti (con fallback per http/file) ---------- */
  function copia(testo, msgOk) {
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = testo;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      toast(ok ? msgOk : "Copia non riuscita: seleziona il testo e copialo a mano.");
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(testo).then(function () { toast(msgOk); }, fallback);
    } else {
      fallback();
    }
  }

  /* ---------- Avanzamento ---------- */
  var obiettivo = num(C.obiettivo, 754) || 754;
  var raccolto = num(C.raccolto, 0);
  var perc = Math.min(100, Math.round((raccolto / obiettivo) * 100));
  var mancano = Math.max(0, obiettivo - raccolto);

  $("raccolto").textContent = euro(raccolto);
  $("obiettivo").textContent = euro(obiettivo);
  $("percentuale").textContent = perc + "%";
  $("mancano").textContent = mancano > 0 ? "mancano " + euro(mancano) : "obiettivo raggiunto, grazie di cuore!";
  if (C.aggiornatoIl) $("aggiornato").textContent = " · aggiornato il " + C.aggiornatoIl;
  var barra = $("barra");
  barra.setAttribute("aria-valuemax", String(obiettivo));
  barra.setAttribute("aria-valuenow", String(Math.min(raccolto, obiettivo)));
  barra.setAttribute("aria-valuetext", euro(raccolto) + " raccolti su " + euro(obiettivo));
  if (mancano === 0) document.querySelector(".progresso").classList.add("completo");
  requestAnimationFrame(function () {
    $("barra-riempimento").style.width = (raccolto > 0 ? Math.max(perc, 2) : 0) + "%";
  });

  /* ---------- Dati per donare / contatti ---------- */
  function riempi(id, valore) {
    var el = $(id);
    if (!el) return;
    el.textContent = valore;
    el.classList.toggle("placeholder", isPlaceholder(valore));
  }
  function ibanCompatto(v) { return String(v).replace(/\s+/g, "").toUpperCase(); }
  // IBAN mostrato a gruppi di 4 caratteri; i pulsanti "Copia IBAN" copiano sempre senza spazi
  function ibanLeggibile(v) { return ibanCompatto(v).replace(/(.{4})(?=.)/g, "$1 "); }

  var valori = {
    intestatario: C.intestatario || "[INTESTATARIO DA INSERIRE]",
    iban: C.iban || "[IBAN DA INSERIRE]",
    ibanRevolut: C.ibanRevolut || "[IBAN REVOLUT DA INSERIRE]",
    causale: C.causale || "[CAUSALE DA INSERIRE]",
    contatto: C.contatto || "[CONTATTO DA INSERIRE]"
  };
  Array.prototype.forEach.call(document.querySelectorAll("[data-campo]"), function (el) {
    var k = el.getAttribute("data-campo"), v = valori[k];
    if (v == null) return;
    var ph = isPlaceholder(v);
    el.textContent = (!ph && (k === "iban" || k === "ibanRevolut")) ? ibanLeggibile(v) : v;
    el.classList.toggle("placeholder", ph);
  });

  // Nome della banca nel titolo del primo riquadro (facoltativo)
  if (C.banca && !isPlaceholder(C.banca)) $("titolo-banca").textContent = "Bonifico sul conto " + C.banca;

  // Contatto cliccabile se è un'email o un numero di telefono
  if (!isPlaceholder(C.contatto)) {
    var c = C.contatto.trim(), href = null;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c)) href = "mailto:" + c;
    else if (/^\+?[\d\s.\-()]{6,}$/.test(c)) href = "tel:" + c.replace(/[^\d+]/g, "");
    if (href) {
      var a = document.createElement("a");
      a.href = href; a.textContent = c;
      var span = $("contatto"); span.textContent = ""; span.appendChild(a);
    }
  }

  // Pulsanti "Copia"
  Array.prototype.forEach.call(document.querySelectorAll("[data-copia]"), function (btn) {
    btn.addEventListener("click", function () {
      var k = btn.getAttribute("data-copia"), v = valori[k];
      if (k === "causale") {
        if (isPlaceholder(v)) { toast("La causale non è ancora stata inserita."); return; }
        copia(v.trim(), "Causale copiata negli appunti");
      } else {
        if (isPlaceholder(v)) { toast("L'IBAN non è ancora stato inserito."); return; }
        copia(ibanCompatto(v), "IBAN copiato negli appunti");
      }
    });
  });

  // Riquadro Revolut: nascosto se manca l'IBAN Revolut (ibanRevolut: "")
  if (C.ibanRevolut === "") $("card-revolut").hidden = true;
  // Pulsante "Dona con Revolut": visibile solo con un link valido (vuoto o segnaposto = nascosto)
  if (typeof C.revolutLink === "string" && /^https:\/\/\S+$/.test(C.revolutLink.trim())) {
    var rl = $("revolut-link");
    rl.href = C.revolutLink.trim();
    rl.hidden = false;
  }

  /* ---------- Immagini (caricate solo se il file esiste) ---------- */
  function caricaImmagine(src, onOk) {
    var img = new Image();
    img.onload = function () { if (img.naturalWidth > 0) onOk(img); };
    img.src = src;
  }

  if (C.ricevutaPubblicata === true) {
    caricaImmagine("images/ricevuta.jpg", function (img) {
      var testo = "Ricevuta del bonifico a Francesco";
      if (C.ricevutaImporto != null && num(C.ricevutaImporto, null) != null) testo += " di " + euro(num(C.ricevutaImporto, 0));
      if (C.ricevutaData) testo += " del " + C.ricevutaData;
      img.alt = testo;
      var fig = document.createElement("figure");
      var link = document.createElement("a");
      link.href = "images/ricevuta.jpg"; link.target = "_blank"; link.rel = "noopener";
      link.appendChild(img);
      var cap = document.createElement("figcaption");
      cap.textContent = testo + ". Tocca l'immagine per ingrandirla.";
      fig.appendChild(link); fig.appendChild(cap);
      var box = $("ricevuta"); box.innerHTML = ""; box.appendChild(fig);
    });
  }

  /* ---------- Condivisione ---------- */
  var url = (C.urlPagina && C.urlPagina.trim()) || location.href.split("#")[0];
  var titolo = "Aiutiamo Francesco ad arrivare a Firenze";
  var messaggio = "Francesco ha 19 anni e deve andare a Firenze per curarsi. Stiamo raccogliendo " + euro(obiettivo) + " per il suo viaggio: anche una piccola donazione o una condivisione aiuta.";

  $("share-whatsapp").href = "https://wa.me/?text=" + encodeURIComponent(messaggio + " " + url);
  $("share-facebook").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
  $("share-copia").addEventListener("click", function () { copia(url, "Link copiato negli appunti"); });

  if (navigator.share) {
    var nat = $("share-nativo");
    nat.hidden = false;
    nat.addEventListener("click", function () {
      navigator.share({ title: titolo, text: messaggio, url: url }).catch(function () {});
    });
  }
})();
