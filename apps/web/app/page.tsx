import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const flavor = (process.env.APP_FLAVOR || "").toLowerCase();

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
            href="/poker"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            <div className="text-lg font-medium">Poker</div>
            <div className="mt-2 text-sm text-white/70">Interactive game + coach.</div>
          </Link>

          <Link
            href="/agent-world"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            <div className="text-lg font-medium">Agent World</div>
            <div className="mt-2 text-sm text-white/70">Main app prototype.</div>
          </Link>

          <Link
            href="/valentines"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            <div className="text-lg font-medium">Valentines</div>
            <div className="mt-2 text-sm text-white/70">10 tiny interactive pages.</div>
          </Link>
        </div>
      </div>
    </main>
  );
}
