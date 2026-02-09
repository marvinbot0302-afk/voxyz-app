"use client";

import Link from "next/link";
import { PlanReveal } from "../_components/PlanReveal";
import { useMemo, useState } from "react";

function HeartsBurst() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        delay: (i % 8) * 0.08,
        size: 14 + (i % 6) * 5,
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-[-20px] text-pink-500"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animation: `burst 1.15s ${h.delay}s ease-out both`,
            filter: "drop-shadow(0 10px 20px rgba(255,0,128,0.22))",
            opacity: 0.9,
          }}
        >
          ♥
        </span>
      ))}
      <style jsx>{`
        @keyframes burst {
          0% {
            transform: translateY(0) scale(0.7);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) scale(1.15) rotate(12deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function Valentines10Page() {
  const [yes, setYes] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const moveNo = () => {
    setNoCount((c) => c + 1);
    const x = Math.floor((Math.random() - 0.5) * 260);
    const y = Math.floor((Math.random() - 0.5) * 180);
    setNoPos({ x, y });
  };

  const yesScale = 1 + Math.min(noCount, 8) * 0.1;
  const yesText = yes ? "Yay!" : "Will you be my Valentine?";

  return (
    <main className="relative min-h-dvh bg-[radial-gradient(circle_at_20%_10%,rgba(255,105,180,0.35),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(255,0,128,0.16),transparent_50%),linear-gradient(180deg,#fff7fb,#ffffff)] text-zinc-900">
      {yes && <HeartsBurst />}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center justify-between">
          <Link href="/valentines" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← All valentines
          </Link>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-zinc-700 ring-1 ring-pink-200/60 backdrop-blur">
            #10 shy-no
          </span>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[2.25rem] bg-white/75 p-10 text-center shadow-sm ring-1 ring-pink-200/60 backdrop-blur">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            extremely important question
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight">
            {yesText}
          </h1>
          <p className="mt-4 text-sm text-zinc-700">
            The “No” button is a little shy. Please be gentle.
          </p>

          <div className="relative mx-auto mt-10 flex max-w-md items-center justify-center gap-4">
            <button
              onClick={() => setYes(true)}
              style={{ transform: `scale(${yesScale})` }}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 px-7 py-4 text-base font-semibold text-white shadow-sm transition hover:shadow-md active:scale-[0.99]"
            >
              Yes
            </button>

            {!yes && (
              <button
                onMouseEnter={moveNo}
                onFocus={moveNo}
                onClick={moveNo}
                className="inline-flex items-center justify-center rounded-2xl bg-black/5 px-7 py-4 text-base font-semibold text-zinc-800 transition hover:bg-black/10"
                style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
              >
                No
              </button>
            )}
          </div>

          {yes ? (
            <div className="mx-auto mt-8 max-w-md space-y-4 text-left">
              <div className="rounded-3xl bg-pink-50 p-6 ring-1 ring-pink-200">
                <p className="text-sm font-semibold text-zinc-900">Accepted.</p>
                <p className="mt-2 text-sm text-zinc-700">
                  That’s it. That’s the whole plot. Janine, you’re my favorite.
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setYes(false);
                      setNoCount(0);
                      setNoPos({ x: 0, y: 0 });
                    }}
                    className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
                  >
                    Do it again
                  </button>
                  <Link
                    href="/valentines"
                    className="rounded-full bg-black/5 px-4 py-2 text-xs font-semibold text-zinc-800 hover:bg-black/10"
                  >
                    More pages
                  </Link>
                </div>
              </div>

              <PlanReveal />
            </div>
          ) : (
            <p className="mt-8 text-xs text-zinc-600">
              Attempts to press “No”: <span className="font-semibold">{noCount}</span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
