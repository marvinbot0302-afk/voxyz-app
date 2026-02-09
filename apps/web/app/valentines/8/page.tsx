"use client";

import Link from "next/link";
import { PlanReveal } from "../_components/PlanReveal";
import { useEffect, useMemo, useState } from "react";

const EMOJIS = ["💗", "🍓", "🌸", "🫶", "🍒", "🎀", "💌", "✨"];

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Valentines8Page() {
  const [deck, setDeck] = useState<string[]>(() => shuffle([...EMOJIS, ...EMOJIS]));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(() => new Set());
  const [moves, setMoves] = useState(0);

  const done = matched.size === deck.length;

  const reset = () => {
    setDeck(shuffle([...EMOJIS, ...EMOJIS]));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
  };

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    if (deck[a] === deck[b]) {
      setMatched((s) => new Set([...s, a, b]));
      setFlipped([]);
      return;
    }
    const t = window.setTimeout(() => setFlipped([]), 650);
    return () => window.clearTimeout(t);
  }, [flipped, deck]);

  const tap = (idx: number) => {
    if (done) return;
    if (matched.has(idx)) return;
    if (flipped.includes(idx)) return;
    if (flipped.length >= 2) return;

    setFlipped((f) => [...f, idx]);
    if (flipped.length === 1) setMoves((m) => m + 1);
  };

  const tagline = useMemo(
    () => ["flip & sparkle", "tiny dopamine", "soft chaos"][Math.floor(Math.random() * 3)],
    []
  );

  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_20%_10%,rgba(255,105,180,0.33),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(255,0,128,0.14),transparent_50%),linear-gradient(180deg,#fff7fb,#ffffff)] text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex items-center justify-between">
          <Link href="/valentines" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← All valentines
          </Link>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-zinc-700 ring-1 ring-pink-200/60 backdrop-blur">
            #8 match
          </span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-start">
          <div className="rounded-[2.25rem] bg-white/75 p-8 shadow-sm ring-1 ring-pink-200/60 backdrop-blur">
            <h1 className="text-balance text-3xl font-semibold tracking-tight">
              Memory Match
            </h1>
            <p className="mt-2 text-sm text-zinc-700">mood: {tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="rounded-2xl bg-pink-50 px-4 py-2 text-sm text-pink-700 ring-1 ring-pink-200">
                Moves <span className="font-semibold">{moves}</span>
              </div>
              <button
                onClick={reset}
                className="rounded-2xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800"
              >
                Reset
              </button>
            </div>

            {done && (
              <div className="mt-6">
                <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-rose-400 p-5 text-white shadow-sm">
                  <p className="text-sm font-semibold">Perfect match.</p>
                  <p className="mt-1 text-sm opacity-90">
                    You found all the pairs. That’s very romantic of you.
                  </p>
                </div>
                <PlanReveal />
              </div>
            )}

            <p className="mt-6 text-xs text-zinc-600">
              Flip two cards. If they match, they stay. If not… they pretend nothing happened.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="grid grid-cols-4 gap-3">
              {deck.map((e, i) => {
                const faceUp = flipped.includes(i) || matched.has(i);
                return (
                  <button
                    key={i}
                    onClick={() => tap(i)}
                    className="relative aspect-square rounded-3xl [perspective:900px]"
                  >
                    <div
                      className={`absolute inset-0 rounded-3xl shadow-sm ring-1 ring-pink-200/60 transition-transform duration-500 [transform-style:preserve-3d] ${
                        faceUp ? "[transform:rotateY(180deg)]" : ""
                      }`}
                    >
                      <div className="absolute inset-0 grid place-items-center rounded-3xl bg-gradient-to-br from-pink-500 to-rose-400 text-white [backface-visibility:hidden]">
                        <span className="text-xl">♥</span>
                      </div>
                      <div className="absolute inset-0 grid place-items-center rounded-3xl bg-white text-3xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        {e}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
