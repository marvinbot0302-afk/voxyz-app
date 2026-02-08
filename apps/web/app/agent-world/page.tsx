import Link from "next/link";

export default function AgentWorldPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Agent World</h1>
          <Link href="/" className="text-sm text-white/70 hover:text-white">
            Back
          </Link>
        </div>

        <p className="mt-6 max-w-2xl text-white/80">
          This is the “main app” surface: a home for agents, tools, and reusable
          workflows. Today this is a placeholder page so we can iterate on IA and
          navigation.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-medium">World Map</h2>
            <p className="mt-2 text-sm text-white/70">
              Agents as rooms. Projects as planets. Click to enter.
            </p>
            <div className="mt-4 text-xs text-white/50">Stub</div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-medium">Workflows</h2>
            <p className="mt-2 text-sm text-white/70">
              Saved playbooks: “build a tutor”, “ship a landing page”, “summarize
              a thread”.
            </p>
            <div className="mt-4 text-xs text-white/50">Stub</div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:col-span-2">
            <h2 className="text-lg font-medium">Next</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
              <li>Define navigation: Home → Projects → Tutor modules</li>
              <li>Decide auth + persistence strategy (local first)</li>
              <li>Design shared UI primitives (cards, progress, quizzes)</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
