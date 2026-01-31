import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          FantaWWE
        </p>
        <h1 className="text-4xl font-bold tracking-tight">
          Fantasy WWE league management app
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Setup base completato: Supabase, schema iniziale, calcolo punti e
          struttura App Router.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          href="/login"
        >
          Vai al login
        </Link>
        <Link
          className="rounded-lg border border-border px-4 py-2 text-sm font-semibold"
          href="/register"
        >
          Registrati
        </Link>
      </div>
    </main>
  );
}
