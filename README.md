# FantaWWE

Fantasy WWE league management app built with Next.js 15, Supabase, and Tailwind + shadcn/ui.

## Requisiti

- Node.js 20+
- Supabase project attivo

## Setup locale

1. Installa le dipendenze:

```bash
npm install
```

2. Crea il file `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://<your-project>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<your-anon-key>"
```

3. Avvia l'app:

```bash
npm run dev
```

## Portare il progetto in locale

Se hai un repository remoto (GitHub/GitLab), clona o aggiorna la cartella locale:

```bash
git clone <URL-DEL-REPO>
cd fantawwe
git pull
```

Se invece hai solo questa cartella di lavoro, copia l’intera directory `fantawwe` sul tuo PC
e poi esegui i comandi di setup locale sopra.

## Environment variables

| Variabile | Descrizione |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del progetto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chiave anon (client) Supabase |

## Migrations Supabase

Le migration sono in `supabase/migrations`.

```bash
supabase db push
```

Se usi la CLI Supabase locale:

```bash
supabase start
supabase db reset
```

## Seed dati iniziali (wrestler)

Esempio di seed manuale via SQL:

```sql
insert into wrestlers (name, brand, status, photo_url)
values
  ('Roman Reigns', 'smackdown', 'active', null),
  ('Cody Rhodes', 'raw', 'active', null),
  ('Rhea Ripley', 'raw', 'active', null);
```

## Architettura del progetto

```
app/                # Next.js App Router (routes, layouts, API)
components/         # UI components (shadcn/ui)
lib/                # Supabase client/server, utils, points calculator
supabase/           # SQL migrations
types/              # Tipi TypeScript condivisi
```

### Moduli principali

- **Supabase clients**: `lib/supabase/*` per browser, server components e middleware.
- **Points calculator**: `lib/points-calculator.ts` implementa tutte le regole di punteggio.
- **Database types**: `types/database.ts` per tipizzazione completa delle tabelle.

## Note di sviluppo

- Next.js 15 App Router
- TypeScript strict mode
- Tailwind CSS + shadcn/ui
- Supabase per auth e database
