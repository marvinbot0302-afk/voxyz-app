"use client";

import Link from "next/link";
import { PlanReveal } from "../_components/PlanReveal";
import { useEffect, useMemo, useRef, useState } from "react";

type Msg = { from: "them" | "you"; text: string };

type Step =
  | { kind: "say"; msg: Msg; delayMs?: number }
  | {
      kind: "choose";
      options: { label: string; next: Script }[];
    };

type Script = Step[];

const SCRIPTS: Record<string, Script> = {
  start: [
    { kind: "say", msg: { from: "them", text: "hey" }, delayMs: 450 },
    {
      kind: "say",
      msg: { from: "them", text: "i found something that reminded me of you" },
      delayMs: 700,
    },
    {
      kind: "choose",
      options: [
        {
          label: "oh?? what is it",
          next: [
            {
              kind: "say",
              msg: { from: "them", text: "a little pink keychain. it’s cute & brave." },
              delayMs: 700,
            },
            {
              kind: "choose",
              options: [
                {
                  label: "brave? 😳",
                  next: [
                    {
                      kind: "say",
                      msg: { from: "them", text: "yeah. like you. you make things feel possible." },
                      delayMs: 800,
                    },
                    {
                      kind: "choose",
                      options: [
                        {
                          label: "ok now i’m blushing",
                          next: [
                            {
                              kind: "say",
                              msg: { from: "them", text: "good. i wanted that." },
                              delayMs: 900,
                            },
                            {
                              kind: "say",
                              msg: { from: "them", text: "valentine’s?" },
                              delayMs: 750,
                            },
                          ],
                        },
                        {
                          label: "you’re sweet",
                          next: [
                            {
                              kind: "say",
                              msg: { from: "them", text: "only for you." },
                              delayMs: 850,
                            },
                            {
                              kind: "say",
                              msg: { from: "them", text: "valentine’s?" },
                              delayMs: 750,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  label: "that’s adorable",
                  next: [
                    {
                      kind: "say",
                      msg: { from: "them", text: "i thought so too." },
                      delayMs: 650,
                    },
                    {
                      kind: "say",
                      msg: { from: "them", text: "i can give it to you… if you say yes to one thing" },
                      delayMs: 900,
                    },
                    {
                      kind: "choose",
                      options: [
                        {
                          label: "dangerous wording",
                          next: [
                            {
                              kind: "say",
                              msg: { from: "them", text: "valentine’s?" },
                              delayMs: 650,
                            },
                          ],
                        },
                        {
                          label: "what thing",
                          next: [
                            {
                              kind: "say",
                              msg: { from: "them", text: "valentine’s." },
                              delayMs: 650,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "i’m listening 👀",
          next: [
            {
              kind: "say",
              msg: { from: "them", text: "okay. don’t laugh." },
              delayMs: 650,
            },
            {
              kind: "say",
              msg: { from: "them", text: "i wrote you a tiny poem" },
              delayMs: 850,
            },
            {
              kind: "say",
              msg: { from: "them", text: "roses are red…" },
              delayMs: 700,
            },
            {
              kind: "say",
              msg: { from: "them", text: "i’m very afraid" },
              delayMs: 650,
            },
            {
              kind: "choose",
              options: [
                {
                  label: "continue!!",
                  next: [
                    {
                      kind: "say",
                      msg: { from: "them", text: "…violets are blue…" },
                      delayMs: 700,
                    },
                    {
                      kind: "say",
                      msg: { from: "them", text: "i’d like to be your valentine" },
                      delayMs: 850,
                    },
                  ],
                },
                {
                  label: "i would never laugh",
                  next: [
                    {
                      kind: "say",
                      msg: { from: "them", text: "good. because i’m being extremely sincere." },
                      delayMs: 850,
                    },
                    {
                      kind: "say",
                      msg: { from: "them", text: "valentine’s?" },
                      delayMs: 750,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-2">
      <span className="h-1.5 w-1.5 animate-[bounce_1s_infinite] rounded-full bg-zinc-400" />
      <span className="h-1.5 w-1.5 animate-[bounce_1s_0.15s_infinite] rounded-full bg-zinc-400" />
      <span className="h-1.5 w-1.5 animate-[bounce_1s_0.3s_infinite] rounded-full bg-zinc-400" />
    </div>
  );
}

export default function Valentines5Page() {
  const [script, setScript] = useState<Script>(SCRIPTS.start);
  const [cursor, setCursor] = useState(0);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const step = script[cursor];
  const choices = step?.kind === "choose" ? step.options : null;
  const finished = !step;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (!step) return;

    if (step.kind === "say") {
      const delay = step.delayMs ?? 650;
      setTyping(step.msg.from === "them");
      const t = window.setTimeout(() => {
        setTyping(false);
        setMessages((m) => [...m, step.msg]);
        setCursor((c) => c + 1);
      }, delay);
      return () => window.clearTimeout(t);
    }
  }, [step]);

  const send = (label: string, next: Script) => {
    setMessages((m) => [...m, { from: "you", text: label }]);
    setScript(next);
    setCursor(0);
  };

  const headerTag = useMemo(
    () => ["soft", "sincere", "dangerous" as const][Math.floor(Math.random() * 3)],
    []
  );

  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_15%_10%,rgba(255,105,180,0.33),transparent_40%),radial-gradient(circle_at_85%_30%,rgba(255,0,128,0.16),transparent_50%),linear-gradient(180deg,#fff7fb,#ffffff)] text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center justify-between">
          <Link href="/valentines" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← All valentines
          </Link>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-zinc-700 ring-1 ring-pink-200/60 backdrop-blur">
            #5 chat
          </span>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2.25rem] bg-white/75 shadow-sm ring-1 ring-pink-200/60 backdrop-blur">
          <div className="flex items-center justify-between gap-4 border-b border-pink-100 px-6 py-5">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Valentine Texts</h1>
              <p className="text-xs text-zinc-600">mood: {headerTag}</p>
            </div>
            <button
              onClick={() => {
                setScript(SCRIPTS.start);
                setCursor(0);
                setMessages([]);
                setTyping(false);
              }}
              className="rounded-full bg-black/5 px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-black/10"
            >
              Restart
            </button>
          </div>

          <div
            ref={scrollerRef}
            className="h-[55vh] space-y-3 overflow-y-auto px-6 py-6"
          >
            {messages.length === 0 && (
              <div className="rounded-3xl bg-pink-50 p-5 text-sm text-pink-800 ring-1 ring-pink-200">
                Tap a reply when it appears. This chat is extremely low-stakes and highly adorable.
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm shadow-sm ring-1 ${
                    m.from === "you"
                      ? "bg-gradient-to-br from-pink-500 to-rose-400 text-white ring-pink-300/40"
                      : "bg-white text-zinc-900 ring-pink-200/60"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="rounded-3xl bg-white px-4 py-3 shadow-sm ring-1 ring-pink-200/60">
                  <TypingDots />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-pink-100 px-6 py-5">
            {choices ? (
              <div className="flex flex-wrap gap-2">
                {choices.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => send(o.label, o.next)}
                    className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99]"
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            ) : finished ? (
              <div className="space-y-4">
                <div className="rounded-3xl bg-pink-50 p-5 text-sm text-pink-800 ring-1 ring-pink-200">
                  That’s the end of the thread. (No further messages were harmed in the making of this Valentine.)
                </div>
                <PlanReveal />
              </div>
            ) : (
              <p className="text-xs text-zinc-600">
                {typing ? "They’re typing…" : "Keep going…"}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
