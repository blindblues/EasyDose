# EasyDose 💉

**EasyDose** è un calcolatore di insulina moderno, intuitivo e veloce, progettato per semplificare la gestione quotidiana del diabete. Permette di calcolare le unità di insulina necessarie in base ai carboidrati assunti e correggere la glicemia con facilità.

![EasyDose Preview](https://via.placeholder.com/800x450.png?text=EasyDose+Preview)

## ✨ Funzionalità

- **Calcolo Rapido Insulina**: Seleziona i cibi, inserisci le quantità e ottieni istantaneamente le unità suggerite.
- **Gestione Cibi Dinamica**: Aggiungi, modifica o elimina cibi dal tuo database personale.
- **Sistema multi-tag**: Organizza i tuoi alimenti con categorie multiple e filtrali velocemente tramite chip interattivi.
- **Correzione Glicemia**: Inserisci il valore attuale della glicemia per calcolare supplementi o correzioni di carboidrati.
- **Cloud Sync**: Sincronizzazione in tempo reale tramite Supabase per avere i tuoi dati su ogni dispositivo.
- **Dark Premium Design**: Interfaccia scura moderna e riposante, ottimizzata per l'uso in ogni condizione di luce.
- **Responsive Web Design**: Esperienza fluida sia su smartphone che su desktop.

## 🚀 Tecnologie Utilizzate

- **Frontend**: HTML5, Vanilla CSS3 (Custom Variables, Flexbox, Grid), JavaScript (ES6+).
- **Backend & Auth**: Supabase.
- **Database**: PostgreSQL (tramite Supabase).
- **Design**: Material Icons Round, Google Fonts (Funnel Sans).

## 🛠️ Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/tuo-username/easydose.git
   ```
2. Apri il file `index.html` nel tuo browser o caricalo su un server locale.

## ⚙️ Configurazione Supabase

Per abilitare il database e la sincronizzazione cloud, assicurati di configurare le tue chiavi in `app.js`:

```javascript
const SUPABASE_URL = 'IL_TUO_URL_SUPABASE';
const SUPABASE_KEY = 'LA_TUA_CHIAVE_APERTURA_SUPABASE';
```

Aggiungi la colonna `tags` al tuo database con il seguente comando SQL:
```sql
ALTER TABLE public.foods ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
```

## 📱 Mobile

EasyDose è una **Web App ottimizzata**, puoi "Aggiungerla alla Home" sul tuo smartphone per utilizzarla come un'app nativa.

---
Sviluppato con ❤️ per rendere la gestione del diabete un po' più semplice ogni giorno.
