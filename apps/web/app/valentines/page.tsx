import Link from "next/link";

const cards = [
  {
    id: 1,
    title: "Choose-your-own Valentine",
    vibe: "storybook + soft gradient + twinkly hearts",
  },
  {
    id: 2,
    title: "Scratch-off Reveal",
    vibe: "foil shimmer + secret message",
  },
  {
    id: 3,
    title: "Two Truths & a Kiss",
    vibe: "party-game + confetti pop",
  },
  {
    id: 4,
    title: "Spin the Wheel",
    vibe: "candy wheel + sweet dares",
  },
  {
    id: 5,
    title: "Chat Simulator",
    vibe: "cute texting + typing dots",
  },
  {
    id: 6,
    title: "Tiny Puzzle",
    vibe: "bubble tiles + satisfying clicks",
  },
  {
    id: 7,
    title: "Lyric / Line Reveal",
    vibe: "stage lights + gentle reveal",
  },
  {
    id: 8,
    title: "Memory Match",
    vibe: "flip cards + sparkly win",
  },
  {
    id: 9,
    title: "Polaroid Stack",
    vibe: "film grain + handwritten captions",
  },
  {
    id: 10,
    title: "Shy ‘No’ Button",
    vibe: "playful + impossible-to-refuse",
  },
] as const;

export const metadata = {
  title: "Valentines",
  description: "10 tiny Valentine micro-sites — cute, bubbly, and interactive.",
};

export default function ValentinesHubPage() {
  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_20%_10%,rgba(255,105,180,0.25),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,0,128,0.18),transparent_45%),radial-gradient(circle_at_40%_90%,rgba(255,240,246,0.95),rgba(255,255,255,1))] text-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight">
              Valentines Micro-sites
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-zinc-700">
              Ten tiny interactive Valentine pages — each with its own aesthetic.
              Pick a number, tap around, and enjoy the little animations.
            </p>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600">
              Built for Janine.
            </p>
          </div>
          <div className="hidden rounded-3xl bg-white/70 px-5 py-4 shadow-sm ring-1 ring-pink-200/60 backdrop-blur md:block">
            <p className="text-sm text-zinc-700">
              Tip: try them on mobile — most are designed for touch.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.id}
              href={`/valentines/${c.id}`}
              className="group rounded-3xl bg-white/70 p-5 shadow-sm ring-1 ring-pink-200/60 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 text-sm font-semibold text-white shadow-sm transition group-hover:scale-[1.03]">
                  {c.id}
                </div>
                <span className="text-xs text-zinc-500">Open →</span>
              </div>
              <h2 className="mt-4 text-lg font-semibold tracking-tight">
                {c.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-600">{c.vibe}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-white/70 p-6 text-sm text-zinc-700 shadow-sm ring-1 ring-pink-200/60 backdrop-blur">
          <p className="font-medium text-zinc-900">Routes</p>
          <p className="mt-2">
            Hub: <code className="rounded bg-black/5 px-1.5 py-0.5">/valentines</code>
            {" · "}
            Pages: <code className="rounded bg-black/5 px-1.5 py-0.5">/valentines/1</code>
            …
            <code className="rounded bg-black/5 px-1.5 py-0.5">/valentines/10</code>
          </p>
        </div>
      </div>
    </main>
  );
}
