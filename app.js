/* Logica della pagina. Non serve modificare questo file: i dati sono in config.js
   La lingua si legge da <html lang="...">: it (pagina principale), en, he, tr, ar (sottocartelle). */
(function () {
  "use strict";
  var C = window.CONFIG || {};
  var $ = function (id) { return document.getElementById(id); };
  // Lingua della pagina: it (radice), en, he, tr, ar (sottocartelle /en/, /he/, /tr/, /ar/)
  var LANG = ((document.documentElement.lang || "it").toLowerCase().match(/^(it|en|he|tr|ar)/) || ["it"])[0];
  var SUFFISSO = { it: "", en: "En", he: "He", tr: "Tr", ar: "Ar" }[LANG];

  // Cartella dove si trova app.js (radice del sito): serve per trovare le immagini anche dalle sottocartelle
  var BASE = (document.currentScript && document.currentScript.src) ? new URL(".", document.currentScript.src).href : "";

  /* ---------- Testi nelle varie lingue ---------- */
  var TESTI = {
    it: {
      locale: "it-IT",
      mancano: function (x) { return "mancano " + x; },
      raggiunto: "obiettivo raggiunto, grazie di cuore!",
      aggiornato: " · aggiornato il ",
      raccoltiSu: " raccolti su ",
      titoloBanca: function (b) { return "Bonifico sul conto " + b; },
      ibanMancante: "L'IBAN non è ancora stato inserito.",
      causaleMancante: "La causale non è ancora stata inserita.",
      ibanCopiato: "IBAN copiato negli appunti",
      causaleCopiata: "Causale copiata negli appunti",
      linkCopiato: "Link copiato negli appunti",
      copiaFallita: "Copia non riuscita: seleziona il testo e copialo a mano.",
      ricezione: function (imp, d) { return "Conferma di donazioni ricevute" + (imp ? ": " + imp + " ricevuti" : "") + (d ? " il " + d : "") + " (IBAN oscurato). Non è il bonifico a Francesco: quel bonifico unico arriverà quando l'obiettivo sarà raggiunto."; },
      finale: function (imp, d) { return "Ricevuta del bonifico unico a Francesco" + (imp ? " di " + imp : "") + (d ? " del " + d : "") + "."; },
      ricevutaTocca: " Tocca l'immagine per ingrandirla.",
      numeroCopiato: "Numero copiato negli appunti",
      bicCopiato: "BIC copiato negli appunti",
      datoMancante: "Questo dato non è ancora stato inserito.",
      shareTitolo: "Aiutiamo Francesco ad arrivare a Firenze",
      shareTesto: function (x) { return "Francesco ha 19 anni e deve andare a Firenze per curarsi. Stiamo raccogliendo " + x + " per il suo viaggio: anche una piccola donazione o una condivisione aiuta."; },
      ph: { intestatario: "[INTESTATARIO DA INSERIRE]", iban: "[IBAN DA INSERIRE]", ibanRevolut: "[IBAN REVOLUT DA INSERIRE]", causale: "[CAUSALE DA INSERIRE]", contatto: "[CONTATTO DA INSERIRE]" }
    },
    en: {
      locale: "en-IE",
      mancano: function (x) { return x + " to go"; },
      raggiunto: "goal reached, thank you so much!",
      aggiornato: " · updated ",
      raccoltiSu: " raised of ",
      titoloBanca: function (b) { return "Bank transfer – " + b + " account"; },
      ibanMancante: "The IBAN hasn't been added yet.",
      causaleMancante: "The payment reference hasn't been added yet.",
      ibanCopiato: "IBAN copied to clipboard",
      causaleCopiata: "Reference copied to clipboard",
      linkCopiato: "Link copied to clipboard",
      copiaFallita: "Couldn't copy: please select the text and copy it manually.",
      ricezione: function (imp, d) { return "Confirmation of donations received" + (imp ? ": " + imp + " received" : "") + (d ? " on " + d : "") + " (IBAN hidden). This is not the transfer to Francesco: that single transfer will be made once the goal is reached."; },
      finale: function (imp, d) { return "Receipt of the single bank transfer to Francesco" + (imp ? " for " + imp : "") + (d ? ", dated " + d : "") + "."; },
      ricevutaTocca: " Tap the image to enlarge it.",
      numeroCopiato: "Number copied to clipboard",
      bicCopiato: "BIC copied to clipboard",
      datoMancante: "This detail hasn't been added yet.",
      shareTitolo: "Help Francesco get to Florence",
      shareTesto: function (x) { return "Francesco is 19 and has to go to Florence for treatment. We're raising " + x + " for his trip: even a small donation or a share helps."; },
      ph: { intestatario: "[ACCOUNT HOLDER TO BE ADDED]", iban: "[IBAN TO BE ADDED]", ibanRevolut: "[REVOLUT IBAN TO BE ADDED]", causale: "[REFERENCE TO BE ADDED]", contatto: "[CONTACT TO BE ADDED]" }
    },
    he: {
      locale: "he-IL",
      mancano: function (x) { return "חסרים " + x; },
      raggiunto: "הגענו ליעד, תודה רבה!",
      aggiornato: " · עודכן ב־",
      raccoltiSu: " נאספו מתוך ",
      titoloBanca: function (b) { return "העברה בנקאית – חשבון " + b; },
      ibanMancante: "ה־IBAN עדיין לא הוזן.",
      causaleMancante: "מטרת ההעברה עדיין לא הוזנה.",
      ibanCopiato: "ה־IBAN הועתק",
      causaleCopiata: "מטרת ההעברה הועתקה",
      linkCopiato: "הקישור הועתק",
      copiaFallita: "ההעתקה נכשלה: סמנו את הטקסט והעתיקו אותו ידנית.",
      ricezione: function (imp, d) { return "תרומה שהתקבלה" + (imp ? ": " + imp : "") + (d ? ", " + d : ""); },
      finale: function (imp, d) { return "אסמכתא של ההעברה האחת לפרנצ'סקו" + (imp ? " על סך " + imp : "") + (d ? ", מתאריך " + d : "") + "."; },
      ricevutaTocca: "",
      numeroCopiato: "המספר הועתק",
      bicCopiato: "ה־BIC הועתק",
      datoMancante: "הפרט הזה עדיין לא הוזן.",
      shareTitolo: "עזרו לפרנצ'סקו להגיע לפירנצה",
      shareTesto: function (x) { return "פרנצ'סקו בן 19 וצריך לנסוע לפירנצה לטיפול. אנחנו אוספים " + x + " לנסיעה שלו: גם תרומה קטנה או שיתוף עוזרים."; },
      ph: { intestatario: "[בעל החשבון]", iban: "[IBAN]", ibanRevolut: "[IBAN]", causale: "[מטרת ההעברה]", contatto: "[פרטי קשר]" }
    },
    tr: {
      locale: "tr-TR",
      mancano: function (x) { return "hedefe " + x + " kaldı"; },
      raggiunto: "hedefe ulaşıldı, çok teşekkürler!",
      aggiornato: " · güncelleme: ",
      raccoltiSu: " toplandı, hedef ",
      titoloBanca: function (b) { return "Banka havalesi – " + b + " hesabı"; },
      ibanMancante: "IBAN henüz eklenmedi.",
      causaleMancante: "Açıklama henüz eklenmedi.",
      ibanCopiato: "IBAN kopyalandı",
      causaleCopiata: "Açıklama kopyalandı",
      linkCopiato: "Bağlantı kopyalandı",
      copiaFallita: "Kopyalanamadı: metni seçip elle kopyalayın.",
      ricezione: function (imp, d) { return "Gelen bağış" + (imp ? ": " + imp : "") + (d ? ", " + d : ""); },
      finale: function (imp, d) { return "Francesco'ya yapılan tek havalenin dekontu" + (imp ? " (" + imp + ")" : "") + (d ? ", " + d : "") + "."; },
      ricevutaTocca: "",
      numeroCopiato: "Numara kopyalandı",
      bicCopiato: "BIC kopyalandı",
      datoMancante: "Bu bilgi henüz eklenmedi.",
      shareTitolo: "Francesco'nun Floransa'ya gitmesine yardım edelim",
      shareTesto: function (x) { return "Francesco 19 yaşında ve tedavi için Floransa'ya gitmesi gerekiyor. Yolculuğu için " + x + " topluyoruz: küçük bir bağış ya da bir paylaşım bile yardımcı olur."; },
      ph: { intestatario: "[HESAP SAHİBİ]", iban: "[IBAN]", ibanRevolut: "[IBAN]", causale: "[AÇIKLAMA]", contatto: "[İLETİŞİM]" }
    },
    ar: {
      locale: "ar-u-nu-latn",
      mancano: function (x) { return "يتبقى " + x; },
      raggiunto: "تم بلوغ الهدف، شكرًا من القلب!",
      aggiornato: " · آخر تحديث: ",
      raccoltiSu: " جُمعت من أصل ",
      titoloBanca: function (b) { return "تحويل بنكي – حساب " + b; },
      ibanMancante: "لم تتم إضافة رقم IBAN بعد.",
      causaleMancante: "لم تتم إضافة بيان التحويل بعد.",
      ibanCopiato: "تم نسخ رقم IBAN",
      causaleCopiata: "تم نسخ بيان التحويل",
      linkCopiato: "تم نسخ الرابط",
      copiaFallita: "تعذّر النسخ: حدّد النص وانسخه يدويًا.",
      ricezione: function (imp, d) { return "تبرع مستلم" + (imp ? ": " + imp : "") + (d ? "، " + d : ""); },
      finale: function (imp, d) { return "إيصال التحويل الواحد إلى فرانشيسكو" + (imp ? " بقيمة " + imp : "") + (d ? "، بتاريخ " + d : "") + "."; },
      ricevutaTocca: "",
      numeroCopiato: "تم نسخ الرقم",
      bicCopiato: "تم نسخ رمز BIC",
      datoMancante: "لم تتم إضافة هذه المعلومة بعد.",
      shareTitolo: "لنساعد فرانشيسكو على الوصول إلى فلورنسا",
      shareTesto: function (x) { return "فرانشيسكو عمره 19 عامًا وعليه السفر إلى فلورنسا للعلاج. نجمع " + x + " لرحلته: حتى تبرع صغير أو مشاركة يساعدان."; },
      ph: { intestatario: "[صاحب الحساب]", iban: "[IBAN]", ibanRevolut: "[IBAN]", causale: "[بيان التحويل]", contatto: "[للتواصل]" }
    }
  };
  var T = TESTI[LANG] || TESTI.it;

  function isPlaceholder(v) {
    return typeof v !== "string" || v.trim() === "" || v.trim().charAt(0) === "[";
  }
  function num(v, def) {
    var n = typeof v === "number" ? v : parseFloat(String(v).replace(",", "."));
    return isFinite(n) && n >= 0 ? n : def;
  }
  function euro(n) {
    var dec = Math.round(n * 100) % 100 !== 0;
    return new Intl.NumberFormat(T.locale, {
      style: "currency", currency: "EUR",
      minimumFractionDigits: dec ? 2 : 0, maximumFractionDigits: dec ? 2 : 0
    }).format(n);
  }
  // Date: se scritte come "AAAA-MM-GG" (es. "2026-10-12") vengono tradotte in automatico
  // ("12 ottobre 2026" / "12 October 2026"); altrimenti vengono mostrate così come sono.
  function data(v) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v).trim());
    if (!m) return String(v);
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
    return new Intl.DateTimeFormat(T.locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d);
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
      toast(ok ? msgOk : T.copiaFallita);
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
  $("mancano").textContent = mancano > 0 ? T.mancano(euro(mancano)) : T.raggiunto;
  if (C.aggiornatoIl) $("aggiornato").textContent = T.aggiornato + data(C.aggiornatoIl);
  var barra = $("barra");
  barra.setAttribute("aria-valuemax", String(obiettivo));
  barra.setAttribute("aria-valuenow", String(Math.min(raccolto, obiettivo)));
  barra.setAttribute("aria-valuetext", euro(raccolto) + T.raccoltiSu + euro(obiettivo));
  if (mancano === 0) document.querySelector(".progresso").classList.add("completo");

  // Banner "urgente": cifra mancante e numero di persone calcolati da obiettivo - raccolto
  var banner = $("urgenza");
  if (banner) {
    if (C.urgenza === true && mancano > 0) {
      Array.prototype.forEach.call(document.querySelectorAll("[data-mancano]"), function (el) { el.textContent = euro(mancano); });
      Array.prototype.forEach.call(document.querySelectorAll("[data-persone]"), function (el) {
        el.textContent = new Intl.NumberFormat(T.locale).format(Math.ceil(mancano));
      });
    } else {
      banner.hidden = true;
    }
  }
  requestAnimationFrame(function () {
    $("barra-riempimento").style.width = (raccolto > 0 ? Math.max(perc, 2) : 0) + "%";
  });

  /* ---------- Dati per donare / contatti ---------- */
  function ibanCompatto(v) { return String(v).replace(/\s+/g, "").toUpperCase(); }
  // IBAN mostrato a gruppi di 4 caratteri; i pulsanti "Copia IBAN" copiano sempre senza spazi
  function ibanLeggibile(v) { return ibanCompatto(v).replace(/(.{4})(?=.)/g, "$1 "); }

  var valori = {
    intestatario: C.intestatario || T.ph.intestatario,
    iban: C.iban || T.ph.iban,
    ibanRevolut: C.ibanRevolut || T.ph.ibanRevolut,
    causale: C.causale || T.ph.causale,
    contatto: C.contatto || T.ph.contatto,
    telefonoRevolut: C.telefonoRevolut || "",
    bicRevolut: C.bicRevolut || "",
    bancaRevolut: C.bancaRevolut || "",
    indirizzoBancaRevolut: C.indirizzoBancaRevolut || "",
    bicCorrispondente: C.bicCorrispondente || ""
  };
  Array.prototype.forEach.call(document.querySelectorAll("[data-campo]"), function (el) {
    var k = el.getAttribute("data-campo"), v = valori[k];
    if (v == null) return;
    var ph = isPlaceholder(v);
    el.textContent = (!ph && (k === "iban" || k === "ibanRevolut")) ? ibanLeggibile(v) : v;
    el.classList.toggle("placeholder", ph);
  });

  // Nome della banca nel titolo del primo riquadro (facoltativo)
  if (C.banca && !isPlaceholder(C.banca)) $("titolo-banca").textContent = T.titoloBanca(C.banca);

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
        if (isPlaceholder(v)) { toast(T.causaleMancante); return; }
        copia(v.trim(), T.causaleCopiata);
      } else if (k === "telefonoRevolut") {
        if (isPlaceholder(v)) { toast(T.datoMancante); return; }
        copia(v.replace(/[^\d+]/g, ""), T.numeroCopiato);
      } else if (k === "bicRevolut" || k === "bicCorrispondente") {
        if (isPlaceholder(v)) { toast(T.datoMancante); return; }
        copia(ibanCompatto(v), T.bicCopiato);
      } else {
        if (isPlaceholder(v)) { toast(T.ibanMancante); return; }
        copia(ibanCompatto(v), T.ibanCopiato);
      }
    });
  });

  // Riquadro Revolut: nascosto se manca l'IBAN Revolut (ibanRevolut: "")
  if (C.ibanRevolut === "") $("card-revolut").hidden = true;
  if (!C.telefonoRevolut) $("card-revolut-tel").hidden = true;
  if (!C.bicRevolut && !C.bancaRevolut && !C.indirizzoBancaRevolut && !C.bicCorrispondente && $("extra-sepa")) $("extra-sepa").hidden = true;
  // Pulsante "Dona con Revolut": visibile solo con un link valido (vuoto o segnaposto = nascosto)
  if (typeof C.revolutLink === "string" && /^https:\/\/\S+$/.test(C.revolutLink.trim())) {
    var rl = $("revolut-link");
    rl.href = C.revolutLink.trim();
    rl.hidden = false;
  }

  /* ---------- Ricevuta (caricata solo se il file esiste) ---------- */
  function caricaImmagine(src, onOk) {
    var img = new Image();
    img.onload = function () { if (img.naturalWidth > 0) onOk(img); };
    img.src = src;
  }

  function mostraRicevuta(file, boxId, testo, onOk) {
    var src = BASE + file;
    caricaImmagine(src, function (img) {
      img.alt = testo;
      var fig = document.createElement("figure");
      var link = document.createElement("a");
      link.href = src; link.target = "_blank"; link.rel = "noopener";
      link.appendChild(img);
      var cap = document.createElement("figcaption");
      cap.textContent = testo;
      fig.appendChild(link); fig.appendChild(cap);
      var box = $(boxId); box.innerHTML = ""; box.appendChild(fig);
      if (onOk) onOk();
    });
  }
  function importo(v) { return (v != null && num(v, null) != null) ? euro(num(v, 0)) : ""; }

  // 1) Conferma di donazioni ricevute (NON è il bonifico a Francesco)
  if (C.ricevutaPubblicata === true) {
    mostraRicevuta("images/ricevuta.jpg", "ricezione",
      (C["ricevutaDidascalia" + SUFFISSO] || T.ricezione(importo(C.ricevutaImporto), C.ricevutaData ? data(C.ricevutaData) : "")),
      function () { $("blocco-ricezione").hidden = false; });
  }
  // 2) Bonifico unico a Francesco (a obiettivo raggiunto)
  if (C.bonificoFinalePubblicato === true) {
    mostraRicevuta("images/bonifico-francesco.jpg", "ricevuta",
      T.finale(importo(C.bonificoFinaleImporto), C.bonificoFinaleData ? data(C.bonificoFinaleData) : ""));
  }

  /* ---------- Condivisione ---------- */
  // La pagina inglese condivide l'indirizzo .../en/ (ricavato da urlPagina)
  var url = location.href.split("#")[0];
  if (C.urlPagina && C.urlPagina.trim()) {
    url = C.urlPagina.trim();
    if (LANG !== "it") { try { url = new URL(LANG + "/", url.replace(/\/?$/, "/")).href; } catch (e) { /* lascia url */ } }
  }
  var messaggio = T.shareTesto(euro(obiettivo));

  $("share-whatsapp").href = "https://wa.me/?text=" + encodeURIComponent(messaggio + " " + url);
  $("share-facebook").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
  $("share-copia").addEventListener("click", function () { copia(url, T.linkCopiato); });

  if (navigator.share) {
    var nat = $("share-nativo");
    nat.hidden = false;
    nat.addEventListener("click", function () {
      navigator.share({ title: T.shareTitolo, text: messaggio, url: url }).catch(function () {});
    });
  }
})();
