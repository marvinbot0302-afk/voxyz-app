"use client";

import Link from "next/link";
import { PlanReveal } from "../_components/PlanReveal";
import { useMemo, useState } from "react";

type Shot = {
  title: string;
  caption: string;
  emoji: string;
  gradient: string;
};

const SHOTS: Shot[] = [
  {
    title: "first glance",
    caption: "i looked up and decided: oh. *that one.*",
    emoji: "🌸",
    gradient: "linear-gradient(135deg,#ff5db0,#ffd1e6)",
  },
  {
    title: "tiny chaos",
    caption: "you made a mess and somehow it was charming.",
    emoji: "🍓",
    gradient: "linear-gradient(135deg,#ff4f7f,#fff0f7)",
  },
  {
    title: "soft win",
    caption: "you said something kind and the room got warmer.",
    emoji: "🫶",
    gradient: "linear-gradient(135deg,#ff6aa2,#ffe7f2)",
  },
  {
    title: "late-night laugh",
    caption: "i heard your laugh and forgot my own name.",
    emoji: "✨",
    gradient: "linear-gradient(135deg,#ff3b8d,#ffd9ea)",
  },
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function Valentines9Page() {
  const [order, setOrder] = useState<number[]>(() => SHOTS.map((_, i) => i));
  const [flipped, setFlipped] = useState(false);

  const transforms = useMemo(() => {
    return SHOTS.map(() => ({
      r: rand(-10, 10),
      x: rand(-6, 6),
      y: rand(-6, 6),
    }));
  }, []);

  const top = order[0];

  const next = () => {
    setFlipped(false);
    setOrder((o) => {
      const [first, ...rest] = o;
      return [...rest, first];
    });
  };

  const shuffleStack = () => {
    setFlipped(false);
    setOrder((o) => {
      const a = [...o];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    });
  };

  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_20%_10%,rgba(255,105,180,0.33),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(255,0,128,0.14),transparent_50%),linear-gradient(180deg,#fff7fb,#ffffff)] text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between">
          <Link href="/valentines" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← All valentines
          </Link>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-zinc-700 ring-1 ring-pink-200/60 backdrop-blur">
            #9 polaroid
          </span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-center">
          <div className="rounded-[2.25rem] bg-white/75 p-8 shadow-sm ring-1 ring-pink-200/60 backdrop-blur">
            <h1 className="text-balance text-3xl font-semibold tracking-tight">
              Polaroid Stack
            </h1>
            <p className="mt-2 text-sm text-zinc-700">
              Tap the top photo to flip it. Tap “Next” to pull the next one.
            </p>
            <p className="mt-2 text-xs text-zinc-600">
              A note for Janine: I saved the best one for last.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setFlipped((f) => !f)}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md active:scale-[0.99]"
              >
                Flip
              </button>
              <button
                onClick={next}
                className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99]"
              >
                Next
              </button>
              <button
                onClick={shuffleStack}
                className="inline-flex items-center justify-center rounded-2xl bg-black/5 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-black/10"
              >
                Shuffle
              </button>
            </div>

            <div className="mt-7 rounded-3xl bg-pink-50 p-5 text-sm text-pink-800 ring-1 ring-pink-200">
              Current: <span className="font-semibold">{SHOTS[top].title}</span>
            </div>

            {flipped && <PlanReveal />}
          </div>

          <div className="relative mx-auto h-[420px] w-full max-w-md">
            {order
              .slice()
              .reverse()
              .map((idx, layer) => {
                const shot = SHOTS[idx];
                const t = transforms[idx];
                const isTop = idx === top;
                const z = 10 + layer;

                return (
                  <div
                    key={idx}
                    className="absolute inset-0 grid place-items-center"
                    style={{ zIndex: z }}
                  >
                    <button
                      onClick={() => (isTop ? setFlipped((f) => !f) : undefined)}
                      className={`relative h-[380px] w-[290px] rounded-[1.75rem] bg-white shadow-lg ring-1 ring-pink-200/60 transition ${
                        isTop ? "cursor-pointer" : "cursor-default"
                      }`}
                      style={{
                        transform: `translate(${t.x}px, ${t.y}px) rotate(${t.r}deg) scale(${isTop ? 1 : 0.98})`,
                      }}
                    >
                      <div className="absolute inset-0 rounded-[1.75rem] [perspective:1100px]">
                        <div
                          className={`absolute inset-0 rounded-[1.75rem] transition-transform duration-500 [transform-style:preserve-3d] ${
                            isTop && flipped ? "[transform:rotateY(180deg)]" : ""
                          }`}
                        >
                          {/* front */}
                          <div className="absolute inset-0 rounded-[1.75rem] bg-white p-4 [backface-visibility:hidden]">
                            <div
                              className="h-[265px] rounded-[1.25rem] shadow-inner"
                              style={{ background: shot.gradient }}
                            >
                              <div className="grid h-full place-items-center text-6xl">
                                {shot.emoji}
                              </div>
                            </div>
                            <div className="mt-4 px-1">
                              <p className="text-sm font-semibold tracking-tight text-zinc-900">
                                {shot.title}
                              </p>
                              <p className="mt-1 text-xs text-zinc-600">
                                tap to flip
                              </p>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-10 rounded-b-[1.75rem] bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.03))]" />
                          </div>

                          {/* back */}
                          <div className="absolute inset-0 rounded-[1.75rem] bg-white p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                              caption
                            </p>
                            <p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-900">
                              {shot.caption}
                            </p>
                            <p className="mt-6 text-sm text-zinc-600">
                              — handwritten in pink ink
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
