# Come aggiornare il sito della raccolta per Francesco

Il sito è fatto di file statici: niente da installare, niente "build".
Per vederlo basta aprire `index.html` con il browser (anche dal computer, senza internet).

```
raccolta-francesco/
├── index.html          ← la pagina italiana (testi della storia)
├── en/index.html       ← la versione inglese (stessi dati, testi in inglese)
├── config.js           ← ★ I DATI DA AGGIORNARE: importi, IBAN, Revolut, ricevuta, contatti
├── styles.css          ← grafica
├── app.js              ← logica (non serve toccarlo)
├── images/
│   ├── francesco.jpg   ← foto di Francesco (già inserita)
│   └── ricevuta.jpg    ← da aggiungere dopo il bonifico a Francesco
└── COME-AGGIORNARE.md  ← questo file
```

Quasi tutto si cambia in **un solo file: `config.js`**. Aprilo con un editor di testo
(Blocco note, TextEdit in modalità "testo semplice", VS Code…) e modifica solo
i valori a destra dei due punti, **lasciando virgolette e virgole al loro posto**.

Tutto ciò che è scritto tra parentesi quadre, ad esempio `[IBAN DA INSERIRE]`,
è un **segnaposto**: sul sito appare evidenziato in giallo finché non lo sostituisci.
(Al momento tutti i dati sono già inseriti: non ci sono segnaposto visibili.)

---

## 1. Dati per donare (già inseriti)

La sezione "Come donare" mostra **due conti per il bonifico**, entrambi intestati a te,
con lo stesso intestatario e la stessa causale. Valori attuali in `config.js`:

```js
intestatario: "Federico Solinas",
causale: "Viaggio Francesco Firenze",

banca: "Crédit Agricole",              // titolo del 1° riquadro: "Bonifico sul conto Crédit Agricole"
iban: "IT08B0623039041000043779380",   // conto 1

ibanRevolut: "LT223250045564603133",   // conto 2: "Bonifico sul conto Revolut"
revolutLink: "",                       // facoltativo, vedi sotto
```

- Gli IBAN puoi scriverli con o senza spazi: sul sito appaiono **a gruppi di 4**
  (es. `IT08 B062 3039 …`) e ogni pulsante **"Copia IBAN"** copia sempre la versione **senza spazi**.
  Anche la causale ha il suo pulsante "Copia".
- `banca: ""` → il primo riquadro si chiama semplicemente "Bonifico bancario".
- `ibanRevolut: ""` → il riquadro Revolut sparisce del tutto.
- **`revolutLink` (facoltativo)**: se un giorno vuoi aggiungere anche il link di pagamento revolut.me,
  incollalo completo, es. `revolutLink: "https://revolut.me/tuonome"` (lo trovi nell'app Revolut,
  nel tuo profilo). Comparirà il pulsante **"Dona con Revolut"** dentro il riquadro Revolut.
  Se è vuoto `""` (come ora) o non inizia con `https://`, il pulsante resta nascosto.

## 2. Aggiornare la cifra raccolta (ogni volta che arrivano donazioni)

```js
raccolto: 0,              // → es. 152.50
obiettivo: 754,           // non serve cambiarlo
aggiornatoIl: "",         // → es. "2026-10-12"
```

- Usa il **punto** per i decimali (`152.50`, non `152,50`) e **niente virgolette** attorno al numero.
- La barra, la percentuale e "mancano … €" si aggiornano da sole.
  Quando `raccolto` arriva a 754 (o più) compare "obiettivo raggiunto, grazie di cuore!".

## 3. Pubblicare la ricevuta del bonifico a Francesco

1. Fai lo screenshot o la foto della ricevuta del bonifico.
2. **Prima di pubblicarla, oscura i dati sensibili**: l'IBAN di destinazione e,
   soprattutto, **qualsiasi nome di familiare** di Francesco (la famiglia deve restare anonima).
   Se il conto di destinazione è intestato a un familiare, quel nome va coperto.
   Lascia visibili: importo, data, esito "eseguito", e il tuo nome come ordinante.
3. Salvala come `images/ricevuta.jpg` (formato JPG, nome esatto, tutto minuscolo).
4. In `config.js`:
   ```js
   ricevutaPubblicata: true,
   ricevutaData: "2026-10-20",
   ricevutaImporto: 754,
   ```
Finché `ricevutaPubblicata` è `false`, il sito mostra "Ricevuta del bonifico: in arrivo".

## 4. Contatti (footer)

```js
contatto: "solinas.federic261288@gmail.com",
```
Un'email diventa automaticamente un link "scrivi una mail" (mailto); un numero di telefono
(es. `"+39 333 1234567"`) diventa un link per chiamare.

## 5. Indirizzo pubblico del sito

Il sito è pubblicato su GitHub Pages: **https://solinasfederic261288-arch.github.io/raccolta-francesco/**

- `urlPagina` in `config.js` contiene già questo indirizzo: i pulsanti WhatsApp/Facebook/Copia link
  condividono sempre il link pubblico.
- In `index.html` i tag `og:url` e `og:image` (anteprima del link su WhatsApp/Facebook) puntano già
  all'indirizzo pubblico e alla foto `images/francesco.jpg`.
- **Per aggiornare il sito online**: modifica il file nel repository GitHub
  `solinasfederic261288-arch/raccolta-francesco` (anche dal sito github.com: apri il file → icona matita →
  "Commit changes"). Dopo circa 1–2 minuti la pagina online si aggiorna.
  Per la ricevuta: "Add file" → "Upload files" → carica `ricevuta.jpg` dentro la cartella `images/`.

## 5b. Versione inglese (/en/)

La pagina inglese è **https://solinasfederic261288-arch.github.io/raccolta-francesco/en/**
(file `en/index.html`). In alto a destra di entrambe le pagine c'è il selettore **IT | EN**.

- Usa gli **stessi** `config.js`, `app.js`, `styles.css` e `images/`: quando aggiorni `raccolto`,
  la ricevuta o i dati dei conti, **si aggiornano tutte e due le pagine** con una sola modifica.
- Le **date** (`aggiornatoIl`, `ricevutaData`) scrivile nel formato `AAAA-MM-GG` (es. `"2026-10-12"`):
  il sito le mostra da solo come "12 ottobre 2026" in italiano e "12 October 2026" in inglese.
  Se scrivi una data a parole (es. "12 ottobre 2026") appare così com'è anche nella pagina inglese.
- La causale resta in italiano anche nella pagina inglese (viene spiegato che è il riferimento del bonifico).
- Se cambi la storia in italiano (`index.html`), ricordati di aggiornare anche il testo in `en/index.html`.

## 6. Cambiare la foto o i testi

- **Foto**: sostituisci `images/francesco.jpg` con un'altra immagine con lo stesso nome
  (meglio verticale, circa 720 px di larghezza). Se il viso viene tagliato male, in `styles.css`
  cerca `object-position: 30% 8%;` — il primo numero sposta l'inquadratura a destra/sinistra,
  il secondo in alto/basso.
- **Storia e testi**: sono direttamente in `index.html`, nella sezione `<section id="storia">`.
  Modifica solo il testo tra i tag `<p>` e `</p>`.

## Note

- Il sito non usa cookie, statistiche o script esterni (c'è anche una regola di sicurezza
  "Content-Security-Policy" in `index.html` che blocca qualsiasi script esterno).
  Se un giorno volessi aggiungere un widget esterno (es. un pulsante di pagamento ufficiale), andrebbe adattata quella riga.
- I file `preview-*.png` sono solo anteprime: non servono online e possono essere esclusi dalla pubblicazione.
