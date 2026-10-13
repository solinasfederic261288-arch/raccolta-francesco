/* ==========================================================================
   CONFIGURAZIONE DELLA RACCOLTA  —  è l'UNICO file da modificare.
   --------------------------------------------------------------------------
   - Cambia solo i valori a destra dei due punti, lasciando virgolette e virgole.
   - Tutto ciò che inizia con "[" è un SEGNAPOSTO: il sito lo mostra evidenziato
     come "da inserire" finché non lo sostituisci con il dato vero.
   - Gli importi sono numeri SENZA virgolette e con il PUNTO per i decimali
     (es. 152.50, non "152,50").
   Vale sia per la pagina italiana (index.html) sia per quella inglese (en/index.html).
   Istruzioni complete: COME-AGGIORNARE.md
   ========================================================================== */
window.CONFIG = {

  /* ---- AVANZAMENTO RACCOLTA --------------------------------------------- */
  raccolto: 200,          // euro raccolti finora  (es. 152.50)
  obiettivo: 754,         // obiettivo in euro: viaggio a Firenze di Francesco e famiglia
  aggiornatoIl: "2026-10-09",   // data ultimo aggiornamento, meglio come "2026-10-12" (tradotta da sola in IT/EN; "" = non mostrare)

  /* ---- BANNER "URGENTE" IN CIMA ALLA PAGINA ----------------------------- */
  urgenza: true,          // true = mostra il banner (la cifra mancante si calcola da sola: obiettivo - raccolto)
                          // il banner sparisce da solo quando l'obiettivo è raggiunto

  /* ---- COME DONARE: DATI COMUNI ----------------------------------------- */
  intestatario: "Federico Solinas",
  causale: "Viaggio Francesco Firenze",

  /* ---- CONTO 1: BONIFICO BANCARIO --------------------------------------- */
  banca: "Crédit Agricole",              // nome mostrato nel titolo ("" = titolo generico "Bonifico bancario")
  iban: "IT08B0623039041000043779380",   // con o senza spazi: il sito lo mostra a gruppi di 4

  /* ---- REVOLUT DAL TELEFONO (primo metodo mostrato) --------------------- */
  telefonoRevolut: "+39 327 623 1454",   // "" = nascondi il riquadro (il pulsante copia il numero senza spazi)

  /* ---- CONTO 2: REVOLUT ------------------------------------------------- */
  ibanRevolut: "LT223250045564603133",   // IBAN del conto Revolut ("" = nascondi il riquadro Revolut)
  // Dati per bonifici da fuori area SEPA (tutti "" = nascondi il riquadrino)
  bicRevolut: "REVOLT21",
  bancaRevolut: "Revolut Bank UAB",
  indirizzoBancaRevolut: "Konstitucijos ave. 21B, 08130 Vilnius, Lithuania",
  bicCorrispondente: "CHASDEFX",
  revolutLink: "",                       // FACOLTATIVO: link revolut.me, es. "https://revolut.me/..."
                                         // vuoto o segnaposto = il pulsante "Dona con Revolut" non compare

  /* ---- TRASPARENZA 1: CONFERMA DI DONAZIONI RICEVUTE -------------------- */
  // Immagine: images/ricevuta.jpg  (prova che i soldi sono arrivati a Federico, NON il bonifico a Francesco)
  ricevutaPubblicata: true,     // true = mostra images/ricevuta.jpg
  ricevutaData: "2026-10-09",   // formato AAAA-MM-GG (tradotto da solo in IT/EN)
  ricevutaImporto: 200,         // importo ricevuto mostrato nella didascalia (null = non mostrare)
  // Didascalia della conferma (se vuota viene generata da data e importo)
  ricevutaDidascalia: "Donazione ricevuta: 200 euro da Noi per Voi OdV, 9 ottobre 2026, contributo per viaggio Francesco",
  ricevutaDidascaliaEn: "Donation received: €200 from Noi per Voi OdV, 9 October 2026, contribution towards Francesco's trip",
  ricevutaDidascaliaHe: "תרומה שהתקבלה: 200 € מ־⁨Noi per Voi OdV⁩, 9 באוקטובר 2026, השתתפות בנסיעה של פרנצ'סקו",
  ricevutaDidascaliaTr: "Gelen bağış: Noi per Voi OdV'den €200, 9 Ekim 2026, Francesco'nun yolculuğuna katkı",
  ricevutaDidascaliaAr: "تبرع مستلم: 200 € من ⁨Noi per Voi OdV⁩، 9 أكتوبر 2026، مساهمة في رحلة فرانشيسكو",

  // Ricevuta firmata da Federico per Noi per Voi OdV (images/ricevuta-firmata.jpg)
  ricevutaFirmataPubblicata: true,
  ricevutaFirmataDidascalia: "Ricevuta firmata da Federico per Noi per Voi OdV, 13 ottobre 2026, con un ringraziamento scritto a mano",
  ricevutaFirmataDidascaliaEn: "Receipt signed by Federico for Noi per Voi OdV, 13 October 2026, with a handwritten thank-you note",
  ricevutaFirmataDidascaliaHe: "קבלה חתומה על ידי פדריקו עבור ⁨Noi per Voi OdV⁩, 13 באוקטובר 2026, עם מכתב תודה בכתב יד",
  ricevutaFirmataDidascaliaTr: "Federico'nun Noi per Voi OdV için imzaladığı makbuz, 13 Ekim 2026, el yazısı teşekkür notuyla",
  ricevutaFirmataDidascaliaAr: "إيصال موقّع من فيديريكو لصالح ⁨Noi per Voi OdV⁩، 13 أكتوبر 2026، مع رسالة شكر بخط اليد",

  /* ---- TRASPARENZA 2: BONIFICO UNICO A FRANCESCO (a obiettivo raggiunto) - */
  // Immagine: images/bonifico-francesco.jpg  (oscura IBAN e nomi dei familiari prima di caricarla!)
  bonificoFinalePubblicato: false,   // true dopo aver fatto il bonifico e caricato l'immagine
  bonificoFinaleData: "",            // es. "2026-10-30"
  bonificoFinaleImporto: null,       // es. 754

  /* ---- CONTATTI (footer) ------------------------------------------------ */
  contatto: "solinas.federic261288@gmail.com",   // email (diventa un link mailto) oppure telefono

  /* ---- INDIRIZZO DELLA PAGINA (per i pulsanti di condivisione) ---------- */
  urlPagina: "https://solinasfederic261288-arch.github.io/raccolta-francesco/"   // indirizzo pubblico del sito ("" = usa l'indirizzo attuale della pagina)
};
