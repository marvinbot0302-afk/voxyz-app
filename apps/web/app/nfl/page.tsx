import Link from "next/link";

export default function NflPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">
            NFL Rules Tutor
          </h1>
          <Link
            href="/"
            className="text-sm text-white/70 hover:text-white"
          >
            Back
          </Link>
        </div>

        <p className="mt-6 max-w-2xl text-white/80">
          Learn NFL rules by playing through realistic situations. Short modules,
          zero jargon, lots of visuals.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-medium">Start: 4 Downs in 2 minutes</h2>
            <p className="mt-2 text-sm text-white/70">
              The one concept that makes the whole game click.
            </p>
            <Link
              href="/nfl/downs"
              className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
            >
              Begin
            </Link>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-medium">Explain this play</h2>
            <p className="mt-2 text-sm text-white/70">
              Pick a situation. Predict the call. Learn the rule.
            </p>
            <button className="mt-4 rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
              Try a scenario
            </button>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:col-span-2">
            <h2 className="text-lg font-medium">Modules</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                "Objective",
                "Downs & Distance",
                "Scoring",
                "Turnovers",
                "Special Teams",
                "Clock",
                "Penalties",
                "Situations",
              ].map((m) => (
                <div
                  key={m}
                  className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/80"
                >
                  {m}
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-white/50">
              Prototype stub — next step is wiring the drive simulator + lesson
              JSON.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
