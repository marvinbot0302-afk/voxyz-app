"use client";

import Link from "next/link";
import { PlanReveal } from "../_components/PlanReveal";
import { useMemo, useState } from "react";

const LINES = [
  "I don’t have a perfect plan…",
  "but I have a very clear favorite person.",
  "I like the way you turn ordinary days",
  "into something I replay later.",
  "So here’s my tiny chorus:",
  "be my valentine?",
];

function Sparkle({ show }: { show: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 transition ${show ? "opacity-100" : "opacity-0"}`}
    >
      {Array.from({ length: 14 }).map((_, i) => {
        const left = (i * 73) % 100;
        const top = (i * 41) % 100;
        const d = (i % 7) * 0.12;
        return (
          <span
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              opacity: 0.7,
              transform: "translate(-50%,-50%)",
              animation: `sparkle 1.1s ${d}s ease-in-out infinite`,
              filter: "drop-shadow(0 10px 20px rgba(255,0,128,0.25))",
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes sparkle {
          0% {
            transform: translate(-50%, -50%) scale(0.7);
            opacity: 0.25;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.7);
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  );
}

export default function Valentines7Page() {
  const [idx, setIdx] = useState(0);
  const revealed = LINES.slice(0, idx);
  const done = idx >= LINES.length;

  const subtitle = useMemo(
    () => ["soft lights", "slow reveal", "tiny chorus"][Math.floor(Math.random() * 3)],
    []
  );

  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_30%_0%,rgba(255,105,180,0.38),transparent_45%),radial-gradient(circle_at_70%_15%,rgba(255,0,128,0.16),transparent_50%),linear-gradient(180deg,#fff7fb,#ffffff)] text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center justify-between">
          <Link href="/valentines" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← All valentines
          </Link>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-zinc-700 ring-1 ring-pink-200/60 backdrop-blur">
            #7 reveal
          </span>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[2.25rem] bg-white/75 p-8 shadow-sm ring-1 ring-pink-200/60 backdrop-blur">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.9), transparent 55%), radial-gradient(circle at 20% 80%, rgba(255,0,128,0.10), transparent 55%)",
            }}
          />
          <Sparkle show={done} />

          <div className="relative">
            <h1 className="text-balance text-3xl font-semibold tracking-tight">
              Lyric Reveal
            </h1>
            <p className="mt-2 text-sm text-zinc-700">mood: {subtitle}</p>

            <div className="mt-7 space-y-3">
              {revealed.map((l, i) => (
                <p
                  key={i}
                  className={`text-pretty text-lg leading-relaxed ${
                    i === revealed.length - 1
                      ? "animate-[fadeInUp_.5s_ease]"
                      : ""
                  }`}
                >
                  {l}
                </p>
              ))}

              {!done && (
                <p className="text-sm text-zinc-500">Tap to reveal the next line.</p>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setIdx((i) => Math.min(LINES.length, i + 1))}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md active:scale-[0.99]"
              >
                Reveal
              </button>
              <button
                onClick={() => setIdx(LINES.length)}
                className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99]"
              >
                Reveal all
              </button>
              <button
                onClick={() => setIdx(0)}
                className="inline-flex items-center justify-center rounded-2xl bg-black/5 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-black/10"
              >
                Reset
              </button>
            </div>

            {done && (
              <div className="mt-7 space-y-4">
                <div className="rounded-3xl bg-pink-50 p-5 text-sm text-pink-800 ring-1 ring-pink-200">
                  If you want, you can screenshot this one.
                </div>
                <PlanReveal />
              </div>
            )}
          </div>

          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      </div>
    </main>
  );
}
