"use client";

import { useMemo, useState } from "react";

type Question = {
  title: string;
  prompt: string;
  choices: { label: string; correct: boolean; why: string }[];
};

const questions: Question[] = [
  {
    title: "What beats what?",
    prompt: "Which hand is strongest?",
    choices: [
      {
        label: "Straight",
        correct: false,
        why: "Straight loses to a flush.",
      },
      {
        label: "Flush",
        correct: true,
        why: "Flush beats a straight (but loses to a full house).",
      },
      {
        label: "Two pair",
        correct: false,
        why: "Two pair is much weaker than a straight or flush.",
      },
    ],
  },
  {
    title: "Full house vs. flush",
    prompt: "Which one wins?",
    choices: [
      {
        label: "Flush",
        correct: false,
        why: "Flush is strong, but full house is stronger.",
      },
      {
        label: "Full house",
        correct: true,
        why: "Yes — full house beats a flush.",
      },
      {
        label: "It depends on suits",
        correct: false,
        why: "Suits don’t rank in Texas Hold’em (except as tie-breakers for making a flush).",
      },
    ],
  },
  {
    title: "Pairs",
    prompt: "Which is stronger?",
    choices: [
      {
        label: "Three of a kind",
        correct: true,
        why: "Trips beat two pair.",
      },
      {
        label: "Two pair",
        correct: false,
        why: "Two pair loses to three of a kind.",
      },
      {
        label: "High card",
        correct: false,
        why: "High card is the weakest made hand.",
      },
    ],
  },
];

export function RankingsTutor() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const q = questions[i];

  const isCorrect = useMemo(() => {
    if (picked === null) return null;
    return q.choices[picked]?.correct ?? null;
  }, [picked, q]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div className="text-xs text-white/50">
          Module: Hand Rankings • {i + 1}/{questions.length}
        </div>
        <button
          className="text-xs text-white/60 hover:text-white"
          onClick={() => {
            setI(0);
            setPicked(null);
          }}
        >
          Reset
        </button>
      </div>

      <h2 className="mt-3 text-xl font-semibold tracking-tight">{q.title}</h2>
      <p className="mt-3 text-sm text-white/80">{q.prompt}</p>

      <div className="mt-5 grid gap-3">
        {q.choices.map((c, idx) => {
          const selected = picked === idx;
          const show = picked !== null;
          const correct = c.correct;

          const border = !show
            ? "border-white/10"
            : correct
              ? "border-emerald-400/40"
              : selected
                ? "border-rose-400/40"
                : "border-white/10";

          const bg = !show
            ? "bg-black/40 hover:bg-white/10"
            : correct
              ? "bg-emerald-400/10"
              : selected
                ? "bg-rose-400/10"
                : "bg-black/30";

          return (
            <button
              key={c.label}
              disabled={picked !== null}
              className={`rounded-xl border ${border} ${bg} px-4 py-3 text-left text-sm text-white/90 disabled:cursor-default`}
              onClick={() => setPicked(idx)}
            >
              <div className="font-medium">{c.label}</div>
              {show && selected && (
                <div className="mt-2 text-xs text-white/70">{c.why}</div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-xs text-white/60">
          {isCorrect === null
            ? "Pick an answer."
            : isCorrect
              ? "Correct."
              : "Not quite — read the explanation and continue."}
        </div>
        <button
          className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 disabled:opacity-50"
          disabled={picked === null}
          onClick={() => {
            const next = Math.min(i + 1, questions.length - 1);
            setI(next);
            setPicked(null);
          }}
        >
          {i === questions.length - 1 ? "Done" : "Next"}
        </button>
      </div>
    </div>
  );
}
