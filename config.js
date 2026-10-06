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
  raccolto: 0,            // euro raccolti finora  (es. 152.50)
  obiettivo: 754,         // obiettivo in euro: viaggio a Firenze di Francesco e famiglia
  aggiornatoIl: "",       // data ultimo aggiornamento, meglio come "2026-10-12" (tradotta da sola in IT/EN; "" = non mostrare)

  /* ---- COME DONARE: DATI COMUNI AI DUE CONTI ---------------------------- */
  intestatario: "Federico Solinas",
  causale: "Viaggio Francesco Firenze",

  /* ---- CONTO 1: BONIFICO BANCARIO --------------------------------------- */
  banca: "Crédit Agricole",              // nome mostrato nel titolo ("" = titolo generico "Bonifico bancario")
  iban: "IT08B0623039041000043779380",   // con o senza spazi: il sito lo mostra a gruppi di 4

  /* ---- CONTO 2: REVOLUT ------------------------------------------------- */
  ibanRevolut: "LT223250045564603133",   // IBAN del conto Revolut ("" = nascondi il riquadro Revolut)
  revolutLink: "",                       // FACOLTATIVO: link revolut.me, es. "https://revolut.me/..."
                                         // vuoto o segnaposto = il pulsante "Dona con Revolut" non compare

  /* ---- TRASPARENZA: RICEVUTA DEL BONIFICO A FRANCESCO ------------------- */
  ricevutaPubblicata: false,   // metti true dopo aver caricato images/ricevuta.jpg
  ricevutaData: "",            // es. "2026-10-20" (formato AAAA-MM-GG, tradotto da solo in IT/EN)
  ricevutaImporto: null,       // es. 754  (null = non mostrare l'importo)

  /* ---- CONTATTI (footer) ------------------------------------------------ */
  contatto: "solinas.federic261288@gmail.com",   // email (diventa un link mailto) oppure telefono

  /* ---- INDIRIZZO DELLA PAGINA (per i pulsanti di condivisione) ---------- */
  urlPagina: "https://solinasfederic261288-arch.github.io/raccolta-francesco/"   // indirizzo pubblico del sito ("" = usa l'indirizzo attuale della pagina)
};
