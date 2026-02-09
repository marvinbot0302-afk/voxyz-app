"use client";

import Link from "next/link";
import { PlanReveal } from "../_components/PlanReveal";
import { useMemo, useState } from "react";

const PRIZES = [
  "Forehead kiss",
  "Hand-hold walk",
  "Pick a dessert",
  "One compliment (very specific)",
  "Movie night",
  "Tiny dance",
  "Secret high five",
  "Your song, on repeat",
] as const;

export default function Valentines4Page() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  const segments = PRIZES.length;
  const per = 360 / segments;

  const gradient = useMemo(() => {
    const colors = [
      "#ff4fa3",
      "#ff7bbd",
      "#ffc1dc",
      "#ffd9ea",
      "#ffb3d7",
      "#ff89c3",
      "#ff5db0",
      "#ffd1e6",
    ];
    const stops = PRIZES.map((_, i) => {
      const c = colors[i % colors.length];
      const a = i * per;
      const b = (i + 1) * per;
      return `${c} ${a}deg ${b}deg`;
    }).join(", ");
    return `conic-gradient(from -90deg, ${stops})`;
  }, [per]);

  const spin = () => {
    if (spinning) return;
    setPicked(null);
    setSpinning(true);

    const turns = 6 + Math.floor(Math.random() * 3); // 6-8
    const landing = Math.random() * 360;
    const nextRot = rotation + turns * 360 + landing;
    setRotation(nextRot);

    const idx =
      segments -
      1 -
      (Math.floor(((landing % 360) + per / 2) / per) % segments);
    const choice = PRIZES[(idx + segments) % segments];

    window.setTimeout(() => {
      setPicked(choice);
      setSpinning(false);
    }, 1600);
  };

  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_20%_10%,rgba(255,105,180,0.35),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(255,0,128,0.14),transparent_50%),linear-gradient(180deg,#fff7fb,#ffffff)] text-zinc-900">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex items-center justify-between">
          <Link href="/valentines" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← All valentines
          </Link>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-zinc-700 ring-1 ring-pink-200/60 backdrop-blur">
            #4 wheel
          </span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-center">
          <div className="rounded-[2.25rem] bg-white/75 p-8 shadow-sm ring-1 ring-pink-200/60 backdrop-blur">
            <h1 className="text-balance text-3xl font-semibold tracking-tight">
              Spin the Wheel
            </h1>
            <p className="mt-2 text-sm text-zinc-700">
              A cute little wheel of sweet outcomes. Spin it when you’re feeling brave.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={spin}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md active:scale-[0.99] disabled:opacity-70"
                disabled={spinning}
              >
                {spinning ? "Spinning…" : "Spin"}
              </button>
              <button
                onClick={() => {
                  setRotation(0);
                  setPicked(null);
                }}
                className="inline-flex items-center justify-center rounded-2xl bg-black/5 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-black/10"
              >
                Reset
              </button>
            </div>

            {picked && (
              <div className="mt-6">
                <div className="rounded-3xl bg-pink-50 p-5 ring-1 ring-pink-200">
                  <p className="text-sm text-pink-700">It landed on:</p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900">
                    {picked}
                  </p>
                </div>

                <PlanReveal compact />
              </div>
            )}

            <p className="mt-6 text-xs text-zinc-600">
              (If you don’t like the result, that’s okay. Spin again. Destiny is flexible.)
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="absolute left-1/2 top-[-6px] z-20 h-0 w-0 -translate-x-1/2 border-x-[14px] border-b-[22px] border-x-transparent border-b-zinc-900 drop-shadow" />
            <div
              className="absolute inset-0 rounded-full p-3"
              style={{
                background:
                  "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.9), rgba(255,255,255,0.0) 55%), radial-gradient(circle at 50% 50%, rgba(255,0,128,0.16), transparent 60%)",
              }}
            />
            <div
              className="absolute inset-3 rounded-full shadow-lg ring-1 ring-pink-200/60"
              style={{
                background: gradient,
                transform: `rotate(${rotation}deg)`,
                transition: spinning
                  ? "transform 1.6s cubic-bezier(0.12, 0.78, 0.18, 1)"
                  : "transform 0.35s ease",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-full bg-white/85 px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm ring-1 ring-pink-200/70 backdrop-blur">
                spin me
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
