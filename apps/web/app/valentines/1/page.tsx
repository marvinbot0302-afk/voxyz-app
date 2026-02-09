"use client";

import Link from "next/link";
import { PlanReveal } from "../_components/PlanReveal";
import { useMemo, useState } from "react";

type Node = {
  id: string;
  title: string;
  body: string;
  choices?: { label: string; to: string }[];
};

const STORY: Record<string, Node> = {
  start: {
    id: "start",
    title: "A tiny Valentine quest",
    body: "You find a heart-shaped envelope on your doorstep. It’s warm. Like… *suspiciously* warm.",
    choices: [
      { label: "Open it", to: "open" },
      { label: "Shake it (gently)", to: "shake" },
    ],
  },
  shake: {
    id: "shake",
    title: "The envelope purrs",
    body: "It makes a soft *prrr* sound. Inside, something tiny clinks — a charm? a key? a candy?",
    choices: [
      { label: "Okay fine, open it", to: "open" },
      { label: "Put it under a lamp", to: "lamp" },
    ],
  },
  lamp: {
    id: "lamp",
    title: "Backlit secrets",
    body: "Under the light you can see glittery handwriting: “Choose the sweetest path.”",
    choices: [
      { label: "Sweet path", to: "sweet" },
      { label: "Spicy path", to: "spicy" },
    ],
  },
  open: {
    id: "open",
    title: "Inside: a map",
    body: "A tiny paper map unfolds. It’s drawn in pink ink and smells like strawberries. Two routes are marked.",
    choices: [
      { label: "Follow the Sweet route", to: "sweet" },
      { label: "Follow the Spicy route", to: "spicy" },
    ],
  },
  sweet: {
    id: "sweet",
    title: "Sweet route",
    body: "You arrive at a cupcake café. The barista hands you a note: “Your prize is a compliment you can keep.”",
    choices: [
      { label: "Read the compliment", to: "compliment" },
      { label: "Trade it for a hug coupon", to: "hug" },
    ],
  },
  spicy: {
    id: "spicy",
    title: "Spicy route",
    body: "You end up at a tiny salsa class. Someone whispers: “Confidence looks good on you.” The music swells.",
    choices: [
      { label: "Take the lead", to: "lead" },
      { label: "Blush & giggle", to: "blush" },
    ],
  },
  compliment: {
    id: "compliment",
    title: "Keep this",
    body: "You are the kind of person people feel safer around — and somehow also a little more brave.",
    choices: [
      { label: "Restart", to: "start" },
      { label: "Collect a heart stamp", to: "stamp" },
    ],
  },
  hug: {
    id: "hug",
    title: "Redeemable anytime",
    body: "A gold coupon appears: “One hug, no questions asked, valid forever.” It sparkles like it means it.",
    choices: [
      { label: "Restart", to: "start" },
      { label: "Collect a heart stamp", to: "stamp" },
    ],
  },
  lead: {
    id: "lead",
    title: "Bold choice",
    body: "You step forward — and the room cheers like this was always your moment. Your heart does a happy drumroll.",
    choices: [
      { label: "Restart", to: "start" },
      { label: "Collect a heart stamp", to: "stamp" },
    ],
  },
  blush: {
    id: "blush",
    title: "Soft choice",
    body: "You blush so hard it should be illegal. The instructor smiles: “That’s the cutest thing I’ve seen all week.”",
    choices: [
      { label: "Restart", to: "start" },
      { label: "Collect a heart stamp", to: "stamp" },
    ],
  },
  stamp: {
    id: "stamp",
    title: "Stamp collected",
    body: "A heart stamp lands on your hand with a *pop*. It reads: “Approved: extremely lovable.”",
    choices: [{ label: "Back to start", to: "start" }],
  },
};

function HeartsBackdrop() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.2,
        size: 10 + Math.random() * 22,
        duration: 7 + Math.random() * 7,
        opacity: 0.25 + Math.random() * 0.35,
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute top-[-10%] text-pink-500"
          style={{
            left: `${h.left}%`,
            animation: `floatDown ${h.duration}s linear ${h.delay}s infinite`,
            opacity: h.opacity,
            fontSize: h.size,
            filter: "drop-shadow(0 10px 20px rgba(255,0,128,0.18))",
          }}
        >
          ♥
        </div>
      ))}
      <style jsx>{`
        @keyframes floatDown {
          0% {
            transform: translateY(-10%) translateX(0) rotate(0deg);
          }
          100% {
            transform: translateY(125vh) translateX(20px) rotate(18deg);
          }
        }
      `}</style>
    </div>
  );
}

export default function Valentines1Page() {
  const [nodeId, setNodeId] = useState<keyof typeof STORY>("start");
  const node = STORY[nodeId];

  const isEnding = (
    ["compliment", "hug", "lead", "blush", "stamp"] as Array<keyof typeof STORY>
  ).includes(nodeId);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(255,105,180,0.35),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(255,0,128,0.2),transparent_45%),linear-gradient(180deg,#fff7fb,#ffffff)] text-zinc-900">
      <HeartsBackdrop />

      <div className="mx-auto flex max-w-3xl flex-col px-6 py-12">
        <div className="flex items-center justify-between gap-4">
          <Link href="/valentines" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← All valentines
          </Link>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-zinc-700 ring-1 ring-pink-200/60 backdrop-blur">
            #1 story
          </span>
        </div>

        <div className="mt-8 rounded-[2.25rem] bg-white/75 p-8 shadow-sm ring-1 ring-pink-200/60 backdrop-blur">
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            {node.title}
          </h1>
          <p className="mt-4 text-pretty text-zinc-700 leading-relaxed">
            {node.body}
          </p>

          <div className="mt-7 flex flex-col gap-3">
            {node.choices?.map((c) => (
              <button
                key={c.to + c.label}
                onClick={() => setNodeId(c.to as keyof typeof STORY)}
                className="group inline-flex items-center justify-between rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 px-5 py-4 text-left text-sm font-semibold text-white shadow-sm transition hover:shadow-md active:scale-[0.99]"
              >
                <span>{c.label}</span>
                <span className="opacity-80 transition group-hover:translate-x-0.5">→</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between text-xs text-zinc-600">
            <button
              onClick={() => setNodeId("start")}
              className="rounded-full bg-black/5 px-3 py-1.5 hover:bg-black/10"
            >
              Restart
            </button>
            <span className="rounded-full bg-pink-50 px-3 py-1.5 text-pink-700 ring-1 ring-pink-200">
              Tap choices to continue
            </span>
          </div>

          {isEnding && <PlanReveal />}
        </div>
      </div>
    </main>
  );
}
