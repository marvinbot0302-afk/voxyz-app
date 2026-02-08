"use client";

import { useMemo, useState } from "react";

type Step = {
  title: string;
  prompt: string;
  choices: { label: string; correct: boolean; why: string }[];
};

const steps: Step[] = [
  {
    title: "Downs: the one rule that makes the game click",
    prompt:
      "You have 4 downs to gain 10 yards. If you get 10+, you reset to 1st down. What happens if you fail on 4th down?",
    choices: [
      {
        label: "You keep the ball but lose 10 yards",
        correct: false,
        why: "No — possession changes. The other team takes over at the spot (turnover on downs).",
      },
      {
        label: "The other team gets the ball (turnover on downs)",
        correct: true,
        why: "Yes. On 4th down, if you don’t convert and you don’t kick, the defense takes over at the spot.",
      },
      {
        label: "The quarter ends automatically",
        correct: false,
        why: "No — downs and quarters are independent.",
      },
    ],
  },
  {
    title: "Why teams punt",
    prompt:
      "It’s 4th & 8 at your own 22. You’re not in FG range. What’s usually the best choice?",
    choices: [
      {
        label: "Go for it every time",
        correct: false,
        why: "Sometimes you do — but here failing gives the opponent amazing field position.",
      },
      {
        label: "Punt",
        correct: true,
        why: "Yes. Punt trades possession but pushes the opponent farther away from scoring.",
      },
      {
        label: "Take a knee",
        correct: false,
        why: "That’s used to run clock, not as a normal 4th down strategy.",
      },
    ],
  },
  {
    title: "Convert resets the count",
    prompt:
      "It’s 3rd & 3. You gain 4 yards. What’s the next down?",
    choices: [
      {
        label: "4th & 3",
        correct: false,
        why: "No — you gained enough to reach the line to gain.",
      },
      {
        label: "1st & 10",
        correct: true,
        why: "Yes. Converting a first down resets the downs and usually sets a new 10-yard target.",
      },
      {
        label: "2nd & 6",
        correct: false,
        why: "That would be true if you were short of the line to gain.",
      },
    ],
  },
];

export function DownsTutor() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const step = steps[i];

  const isCorrect = useMemo(() => {
    if (picked === null) return null;
    return step.choices[picked]?.correct ?? null;
  }, [picked, step]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div className="text-xs text-white/50">
          Module: 4 Downs • {i + 1}/{steps.length}
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

      <h2 className="mt-3 text-xl font-semibold tracking-tight">{step.title}</h2>
      <p className="mt-3 text-sm text-white/80">{step.prompt}</p>

      <div className="mt-5 grid gap-3">
        {step.choices.map((c, idx) => {
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
            const next = Math.min(i + 1, steps.length - 1);
            setI(next);
            setPicked(null);
          }}
        >
          {i === steps.length - 1 ? "Done" : "Next"}
        </button>
      </div>
    </div>
  );
}
