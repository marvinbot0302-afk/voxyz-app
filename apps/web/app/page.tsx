import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Valentines</h1>
        <p className="mt-4 max-w-2xl text-white/80">Ten tiny interactive pages.</p>

        <div className="mt-10">
          <Link
            href="/valentines"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium hover:bg-white/10"
          >
            Open /valentines
          </Link>
        </div>
      </div>
    </main>
  );
}
