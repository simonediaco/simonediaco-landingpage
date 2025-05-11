# Simone Diaco - Personal Portfolio Website

Una moderna landing page personale, responsive e multilingual per Simone Diaco, sviluppatore software.

## Caratteristiche

- Design moderno e responsivo
- Supporto multilingue (Italiano e Inglese)
- Animazioni di entrata per le sezioni
- Form di contatto funzionante
- Completamente containerizzato con Docker

## Struttura del Progetto

```
.
├── docker-compose.yml
├── Dockerfile
├── package.json
├── server.js
├── .env
├── README.md
└── public/
    ├── index.html
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── main.js
    │   └── translations.js
    └── img/
        ├── profile.jpg
        ├── about.jpg
        └── projects/
            └── ...
```

## Prerequisiti

- Docker e Docker Compose
- Node.js (per lo sviluppo locale)

## Configurazione

1. Modifica il file `.env` con le tue credenziali email:

```
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/contact_db
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Nota: Per Gmail, dovrai utilizzare una "App Password" anziché la tua password normale.

## Avvio Rapido

Per avviare l'applicazione in container Docker:

```bash
# Clona il repository
git clone <repository-url>
cd simone-diaco-portfolio

# Avvia i container
docker-compose up -d
```

L'applicazione sarà disponibile su: http://localhost:3000

## Sviluppo Locale

Per eseguire l'applicazione localmente per lo sviluppo:

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

## Personalizzazione

- Per aggiungere progetti, modificare la sezione corrispondente in `public/index.html`
- Per cambiare i colori, modificare le variabili CSS in `public/css/style.css`
- Per aggiungere lingue, aggiungere le traduzioni in `public/js/translations.js`
- Per modificare le immagini, sostituire i file nella cartella `public/img/`

## Note di Implementazione

- Il server è sviluppato con Express.js e serve sia i file statici del frontend sia le API per il form di contatto
- Il database utilizza MongoDB per salvare i messaggi del form di contatto
- Il multilingua è implementato tramite JavaScript lato client

## Licenza

MIT
