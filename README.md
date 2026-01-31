# FantaWWE

Fantasy WWE league management app (MVP starter).

## ✨ Cosa include questo starter
- **Struttura Next.js 14** con pagina introduttiva per il prodotto.
- **Motore di calcolo punti** conforme alle regole FantaWWE.
- **Schema database Supabase** pronto per migrazione.
- **Dataset CSV** di esempio per popolare il roster iniziale.

## Requisiti
- Node.js 18+ / pnpm, npm o yarn

## Setup rapido
```bash
npm install
npm run dev
```
Apri `http://localhost:3000`.

## Variabili d'ambiente
Se usi Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Schema database (Supabase)
Lo schema SQL è in `docs/db/schema.sql`. Importalo via SQL Editor in Supabase.

## Dataset iniziale
Il file `data/wrestlers.csv` contiene un roster di esempio per il primo seed.

## Script disponibili
- `npm run dev` — avvia il dev server
- `npm run build` — build di produzione
- `npm run start` — avvia la build
- `npm run test` — esegue i test del motore punti

## Prossimi step (MVP)
1. Collegare Supabase Auth e protezione route.
2. Implementare auction draft con realtime.
3. Schermata lineup settimanale + lock deadline.
4. Form admin per inserimento match + preview punti.
5. Leaderboard settimanale/trimestrale/stagionale.
