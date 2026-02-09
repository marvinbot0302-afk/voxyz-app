"use client";

import Link from "next/link";
import { PlanReveal } from "../_components/PlanReveal";
import { useMemo, useState } from "react";

type Round = {
  prompt: string;
  truths: [string, string];
  kiss: string;
};

const ROUNDS: Round[] = [
  {
    prompt: "Two truths & a kiss: which one is the kiss?",
    truths: [
      "I will absolutely share my fries with you.",
      "I think your laugh is contagious (in the best way).",
    ],
    kiss: "I have never once replayed a cute message in my head.",
  },
  {
    prompt: "Okay… pick the kiss:",
    truths: [
      "I’m proud of you — like, genuinely.",
      "I would cross the street to walk next to you.",
    ],
    kiss: "I don’t get butterflies. I get… regular moths.",
  },
  {
    prompt: "One more:",
    truths: [
      "I’m a little obsessed with how your brain works.",
      "I’d choose you in every timeline.",
    ],
    kiss: "I totally don’t care when you text back.",
  },
];

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Valentines3Page() {
  const [roundIdx, setRoundIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const round = ROUNDS[roundIdx];
  const options = useMemo(
    () => shuffle([round.truths[0], round.truths[1], round.kiss]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roundIdx]
  );

  const reveal = (choice: string) => {
    if (picked) return;
    setPicked(choice);
    if (choice === round.kiss) setScore((s) => s + 1);
  };

  const next = () => {
    setPicked(null);
    setRoundIdx((i) => (i + 1) % ROUNDS.length);
  };

  const correct = picked === round.kiss;

  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_20%_10%,rgba(255,105,180,0.35),transparent_42%),radial-gradient(circle_at_70%_25%,rgba(255,0,128,0.14),transparent_50%),linear-gradient(180deg,#fff7fb,#ffffff)] text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center justify-between">
          <Link href="/valentines" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← All valentines
          </Link>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-zinc-700 ring-1 ring-pink-200/60 backdrop-blur">
            #3 game
          </span>
        </div>

        <div className="mt-8 rounded-[2.25rem] bg-white/75 p-8 shadow-sm ring-1 ring-pink-200/60 backdrop-blur">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-balance text-3xl font-semibold tracking-tight">
                Two Truths & a Kiss
              </h1>
              <p className="mt-2 text-sm text-zinc-700">{round.prompt}</p>
            </div>
            <div className="rounded-2xl bg-pink-50 px-4 py-2 text-sm text-pink-700 ring-1 ring-pink-200">
              Score <span className="font-semibold">{score}</span>
            </div>
          </div>

          <div className="mt-7 grid gap-3">
            {options.map((t) => {
              const isPicked = picked === t;
              const isKiss = t === round.kiss;
              const stateClass = !picked
                ? "hover:-translate-y-0.5 hover:shadow-md"
                : isKiss
                  ? "ring-2 ring-emerald-400 bg-emerald-50"
                  : isPicked
                    ? "ring-2 ring-rose-300 bg-rose-50"
                    : "opacity-70";
              return (
                <button
                  key={t}
                  onClick={() => reveal(t)}
                  className={`relative overflow-hidden rounded-3xl bg-white/80 p-5 text-left shadow-sm ring-1 ring-pink-200/60 transition ${stateClass}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-pretty text-sm text-zinc-800 leading-relaxed">
                      {t}
                    </p>
                    <span className="mt-0.5 text-xs text-zinc-500">tap</span>
                  </div>
                  {isPicked && picked && (
                    <div
                      className={`pointer-events-none absolute inset-x-0 bottom-0 h-1 ${
                        isKiss
                          ? "bg-gradient-to-r from-emerald-400 to-teal-400"
                          : "bg-gradient-to-r from-rose-400 to-pink-500"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {picked && (
            <div className="mt-6">
              <div className="rounded-3xl bg-white/70 p-5 ring-1 ring-pink-200/60">
                <p className="text-sm font-semibold">
                  {correct ? "Correct." : "Not quite."}{" "}
                  <span className="font-normal text-zinc-700">
                    The kiss was the one pretending not to be into you.
                  </span>
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={next}
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md active:scale-[0.99]"
                  >
                    Next round
                  </button>
                  <button
                    onClick={() => {
                      setPicked(null);
                      setScore(0);
                      setRoundIdx(0);
                    }}
                    className="inline-flex items-center justify-center rounded-2xl bg-black/5 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-black/10"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <PlanReveal />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
