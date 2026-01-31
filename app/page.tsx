const highlights = [
  {
    title: "Draft auction live",
    description:
      "Aste in tempo reale con budget tracking, storico offerte e auto-assegnazione roster."
  },
  {
    title: "Formazioni settimanali",
    description:
      "Drag & drop per 6 titolari, 4 riserve in ordine, captain e lock automatico."
  },
  {
    title: "Inserimento risultati",
    description:
      "Form admin con rating Cagematch, bonus/malus e preview dei punti prima del salvataggio."
  },
  {
    title: "Classifiche",
    description:
      "Leaderboard settimanali, trimestrali e stagionali con breakdown match-by-match."
  }
];

const nextSteps = [
  "Configurare Supabase e importare il roster iniziale",
  "Abilitare le realtime subscriptions per il draft",
  "Collegare il calcolo punti e la gestione lineup",
  "Stabilire il calendario stagionale e le finestre di trade"
];

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="pill">MVP Fase 1</p>
          <h1>Gestisci la tua lega FantaWWE in un unico hub.</h1>
          <p className="lead">
            Questo starter include struttura, schema dati e motore punti per avviare
            lo sviluppo della piattaforma completa.
          </p>
          <div className="hero-actions">
            <button className="primary-button" type="button">
              Avvia draft demo
            </button>
            <button className="ghost-button" type="button">
              Vedi schema database
            </button>
          </div>
        </div>
        <div className="hero-card">
          <h2>MVP roadmap</h2>
          <ul>
            {nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid">
        {highlights.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="cta">
        <div>
          <h2>Motore punti già incluso</h2>
          <p>
            Il calcolo dei punteggi segue tutte le regole FantaWWE: rating, bonus
            vittoria, narrative, malus e moltiplicatore captain.
          </p>
        </div>
        <button className="primary-button" type="button">
          Leggi la documentazione
        </button>
      </section>
    </div>
  );
}
