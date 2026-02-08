import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const flavor = (process.env.APP_FLAVOR || "").toLowerCase();

  if (flavor === "nfl") redirect("/nfl");
  if (flavor === "poker") redirect("/poker");

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">VoxYZ Lab</h1>
        <p className="mt-4 max-w-2xl text-white/80">
          Agent World + interactive tutors.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link
            href="/nfl"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            <div className="text-lg font-medium">NFL Rules Tutor</div>
            <div className="mt-2 text-sm text-white/70">Learn by scenarios.</div>
          </Link>

          <Link
            href="/poker"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            <div className="text-lg font-medium">Poker Tutor</div>
            <div className="mt-2 text-sm text-white/70">Texas Hold’em, step-by-step.</div>
          </Link>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-medium">Agent World</div>
            <div className="mt-2 text-sm text-white/70">(Coming next)</div>
          </div>
        </div>
      </div>
    </main>
  );
}
