import Link from "next/link";
import { PokerGame } from "./PokerGame.client";

export default function PokerGamePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Poker Tutor</h1>
          <Link href="/poker" className="text-sm text-white/70 hover:text-white">
            Back
          </Link>
        </div>

        <p className="mt-6 max-w-3xl text-white/80">
          Play real hands (heads-up) with a coach that teaches you betting flow,
          legality, and simple strategy.
        </p>

        <div className="mt-10">
          <PokerGame />
        </div>
      </div>
    </main>
  );
}
