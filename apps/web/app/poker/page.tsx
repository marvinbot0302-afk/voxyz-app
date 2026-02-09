import Link from "next/link";

export default function PokerPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Poker Tutor</h1>
          <Link href="/" className="text-sm text-white/70 hover:text-white">
            Back
          </Link>
        </div>

        <p className="mt-6 max-w-2xl text-white/80">
          Learn Texas Hold’em step-by-step via micro-hands and interactive
          scenarios.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-medium">Start: Hand rankings</h2>
            <p className="mt-2 text-sm text-white/70">
              The foundation. Learn it in minutes with instant feedback.
            </p>
            <Link
              href="/poker/rankings"
              className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
            >
              Begin
            </Link>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-medium">Interactive Game + Coach</h2>
            <p className="mt-2 text-sm text-white/70">
              Play real hands (heads-up). Learn betting flow and decisions.
            </p>
            <Link
              href="/poker/game"
              className="mt-4 inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              Play a hand
            </Link>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:col-span-2">
            <h2 className="text-lg font-medium">Modules</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                "Rankings",
                "Flow",
                "Betting",
                "Position",
                "Board",
                "Ranges",
                "Pot odds",
                "Quizzes",
              ].map((m) => (
                <div
                  key={m}
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/80"
                >
                  {m}
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-white/50">Prototype stub.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
