"use client";

import Link from "next/link";
import { PlanReveal } from "../_components/PlanReveal";
import { useMemo, useState } from "react";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TARGET = "BEMINE";

export default function Valentines6Page() {
  const [tiles, setTiles] = useState<string[]>(() => shuffle(TARGET.split("")));
  const [selected, setSelected] = useState<number | null>(null);

  const solved = tiles.join("") === TARGET;

  const tap = (idx: number) => {
    if (solved) return;
    if (selected === null) {
      setSelected(idx);
      return;
    }
    if (selected === idx) {
      setSelected(null);
      return;
    }
    setTiles((t) => {
      const next = [...t];
      [next[selected], next[idx]] = [next[idx], next[selected]];
      return next;
    });
    setSelected(null);
  };

  const hint = useMemo(() => {
    const words = [
      "Try swapping two tiles.",
      "Tiny steps. Big romance.",
      "It spells something obvious.",
    ];
    return words[Math.floor(Math.random() * words.length)];
  }, []);

  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_20%_10%,rgba(255,105,180,0.35),transparent_42%),radial-gradient(circle_at_85%_35%,rgba(255,0,128,0.14),transparent_50%),linear-gradient(180deg,#fff7fb,#ffffff)] text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center justify-between">
          <Link href="/valentines" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← All valentines
          </Link>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-zinc-700 ring-1 ring-pink-200/60 backdrop-blur">
            #6 puzzle
          </span>
        </div>

        <div className="mt-8 rounded-[2.25rem] bg-white/75 p-8 shadow-sm ring-1 ring-pink-200/60 backdrop-blur">
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Tiny Tile Puzzle
          </h1>
          <p className="mt-2 text-sm text-zinc-700">
            Swap two tiles at a time until it spells the message.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <div className="grid grid-cols-6 gap-3">
              {tiles.map((ch, i) => {
                const isSel = selected === i;
                return (
                  <button
                    key={i}
                    onClick={() => tap(i)}
                    className={`grid h-14 w-14 place-items-center rounded-2xl text-lg font-semibold shadow-sm ring-1 transition active:scale-[0.98] ${
                      solved
                        ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                        : isSel
                          ? "bg-pink-500 text-white ring-pink-300 shadow-md -translate-y-0.5"
                          : "bg-white text-zinc-900 ring-pink-200/60 hover:-translate-y-0.5 hover:shadow-md"
                    }`}
                  >
                    {ch}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-zinc-600">{solved ? "Solved." : hint}</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setTiles(shuffle(TARGET.split("")));
                  setSelected(null);
                }}
                className="rounded-full bg-black/5 px-4 py-2 text-xs font-semibold text-zinc-800 hover:bg-black/10"
              >
                Shuffle
              </button>
              <button
                onClick={() => {
                  setTiles(TARGET.split(""));
                  setSelected(null);
                }}
                className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
              >
                Solve
              </button>
            </div>
          </div>

          {solved && (
            <div className="mt-6">
              <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-rose-400 p-5 text-white shadow-sm">
                <p className="text-sm font-semibold">B E · M I N E</p>
                <p className="mt-1 text-sm opacity-90">
                  You did it. Now you get to keep the message.
                </p>
              </div>

              <PlanReveal />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
