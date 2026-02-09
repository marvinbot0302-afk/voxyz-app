"use client";

import { useMemo, useState } from "react";

type Suit = "s" | "h" | "d" | "c";
type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "T"
  | "J"
  | "Q"
  | "K"
  | "A";

type Card = `${Rank}${Suit}`;

type Street = "PREFLOP" | "FLOP" | "TURN" | "RIVER" | "SHOWDOWN";

type ActionKind = "FOLD" | "CHECK" | "CALL" | "BET" | "RAISE";

type PlayerId = "HERO" | "VILLAIN";

type Player = {
  id: PlayerId;
  name: string;
  stack: number; // chips behind
  committed: number; // total committed in hand
  streetBet: number; // committed this street
  inHand: boolean;
};

type HandState = {
  handId: string;
  dealer: PlayerId; // button
  street: Street;
  deck: Card[];
  heroCards: [Card, Card];
  villainCards: [Card, Card];
  board: Card[];

  blinds: { sb: number; bb: number };
  pot: number; // accumulated pot (excluding street bets? we keep simple and keep it as committed sum)
  currentBetToMatch: number; // max streetBet
  actor: PlayerId;

  hero: Player;
  villain: Player;

  history: string[];
  lastAggressor?: PlayerId;
};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

const RANKS: Rank[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];
const SUITS: Suit[] = ["s", "h", "d", "c"];

function makeDeck(): Card[] {
  const d: Card[] = [];
  for (const r of RANKS) {
    for (const s of SUITS) d.push(`${r}${s}`);
  }
  return d;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rankValue(r: Rank): number {
  return RANKS.indexOf(r) + 2;
}

function parseCard(c: Card) {
  const r = c[0] as Rank;
  const s = c[1] as Suit;
  return { r, s, v: rankValue(r) };
}

function combos5<T>(arr: T[]): T[][] {
  const out: T[][] = [];
  const n = arr.length;
  for (let a = 0; a < n - 4; a++)
    for (let b = a + 1; b < n - 3; b++)
      for (let c = b + 1; c < n - 2; c++)
        for (let d = c + 1; d < n - 1; d++)
          for (let e = d + 1; e < n; e++) out.push([arr[a], arr[b], arr[c], arr[d], arr[e]]);
  return out;
}

// Hand categories (higher is better)
// 8 straight flush
// 7 quads
// 6 full house
// 5 flush
// 4 straight
// 3 trips
// 2 two pair
// 1 pair
// 0 high

type HandRank = {
  cat: number;
  tiebreak: number[]; // lexicographic compare
  label: string;
};

function cmpRank(a: HandRank, b: HandRank): number {
  if (a.cat !== b.cat) return a.cat - b.cat;
  const n = Math.max(a.tiebreak.length, b.tiebreak.length);
  for (let i = 0; i < n; i++) {
    const av = a.tiebreak[i] ?? 0;
    const bv = b.tiebreak[i] ?? 0;
    if (av !== bv) return av - bv;
  }
  return 0;
}

function eval5(cards: Card[]): HandRank {
  const cs = cards.map(parseCard).sort((a, b) => b.v - a.v);
  const suits = cs.map((c) => c.s);
  const values = cs.map((c) => c.v);

  const isFlush = new Set(suits).size === 1;

  // counts by value
  const counts = new Map<number, number>();
  for (const v of values) counts.set(v, (counts.get(v) || 0) + 1);
  const groups = [...counts.entries()]
    .map(([v, n]) => ({ v, n }))
    .sort((a, b) => b.n - a.n || b.v - a.v);

  // straight detection (A can be low)
  const uniq = [...new Set(values)].sort((a, b) => b - a);
  let straightHigh: number | null = null;
  if (uniq.length >= 5) {
    const u = uniq;
    // normal
    for (let i = 0; i <= u.length - 5; i++) {
      const slice = u.slice(i, i + 5);
      if (slice[0] - slice[4] === 4) {
        straightHigh = slice[0];
        break;
      }
    }
    // wheel A-5
    if (straightHigh === null) {
      const wheel = [14, 5, 4, 3, 2];
      if (wheel.every((v) => u.includes(v))) straightHigh = 5;
    }
  }
  const isStraight = straightHigh !== null;

  if (isStraight && isFlush) {
    return {
      cat: 8,
      tiebreak: [straightHigh!],
      label: straightHigh === 14 ? "Royal flush" : "Straight flush",
    };
  }

  if (groups[0]?.n === 4) {
    const quad = groups[0].v;
    const kicker = groups.find((g) => g.v !== quad)!.v;
    return { cat: 7, tiebreak: [quad, kicker], label: "Four of a kind" };
  }

  if (groups[0]?.n === 3 && groups[1]?.n === 2) {
    return {
      cat: 6,
      tiebreak: [groups[0].v, groups[1].v],
      label: "Full house",
    };
  }

  if (isFlush) {
    return { cat: 5, tiebreak: values, label: "Flush" };
  }

  if (isStraight) {
    return { cat: 4, tiebreak: [straightHigh!], label: "Straight" };
  }

  if (groups[0]?.n === 3) {
    const trip = groups[0].v;
    const kickers = groups
      .filter((g) => g.v !== trip)
      .map((g) => g.v)
      .sort((a, b) => b - a);
    return { cat: 3, tiebreak: [trip, ...kickers], label: "Three of a kind" };
  }

  if (groups[0]?.n === 2 && groups[1]?.n === 2) {
    const p1 = Math.max(groups[0].v, groups[1].v);
    const p2 = Math.min(groups[0].v, groups[1].v);
    const kicker = groups.filter((g) => g.n === 1)[0]!.v;
    return { cat: 2, tiebreak: [p1, p2, kicker], label: "Two pair" };
  }

  if (groups[0]?.n === 2) {
    const pair = groups[0].v;
    const kickers = groups
      .filter((g) => g.v !== pair)
      .map((g) => g.v)
      .sort((a, b) => b - a);
    return { cat: 1, tiebreak: [pair, ...kickers], label: "Pair" };
  }

  return { cat: 0, tiebreak: values, label: "High card" };
}

function eval7(cards: Card[]): HandRank {
  const c5 = combos5(cards);
  let best = eval5(c5[0]!);
  for (let i = 1; i < c5.length; i++) {
    const r = eval5(c5[i]!);
    if (cmpRank(best, r) < 0) best = r;
  }
  return best;
}

function fmtCard(c: Card) {
  const { r, s } = parseCard(c);
  const suit = s === "s" ? "♠" : s === "h" ? "♥" : s === "d" ? "♦" : "♣";
  return `${r}${suit}`;
}

function other(p: PlayerId): PlayerId {
  return p === "HERO" ? "VILLAIN" : "HERO";
}

function toCall(state: HandState, pid: PlayerId): number {
  const pl = pid === "HERO" ? state.hero : state.villain;
  return Math.max(0, state.currentBetToMatch - pl.streetBet);
}

function minRaiseTo(state: HandState): number {
  // Simple: min raise-to is currentBetToMatch + last bet size, but we approximate as +bb.
  return state.currentBetToMatch + state.blinds.bb;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function applyCommit(state: HandState, pid: PlayerId, add: number) {
  const s = structuredClone(state) as HandState;
  const p = pid === "HERO" ? s.hero : s.villain;
  const amt = clamp(add, 0, p.stack);
  p.stack -= amt;
  p.committed += amt;
  p.streetBet += amt;
  s.pot += amt;
  s.currentBetToMatch = Math.max(s.currentBetToMatch, p.streetBet);
  return s;
}

function resetStreetBets(state: HandState) {
  const s = structuredClone(state) as HandState;
  s.hero.streetBet = 0;
  s.villain.streetBet = 0;
  s.currentBetToMatch = 0;
  s.lastAggressor = undefined;
  return s;
}

function advanceStreet(state: HandState) {
  const s = structuredClone(state) as HandState;
  if (s.street === "PREFLOP") {
    s.street = "FLOP";
    s.board.push(s.deck.shift()!, s.deck.shift()!, s.deck.shift()!);
  } else if (s.street === "FLOP") {
    s.street = "TURN";
    s.board.push(s.deck.shift()!);
  } else if (s.street === "TURN") {
    s.street = "RIVER";
    s.board.push(s.deck.shift()!);
  } else if (s.street === "RIVER") {
    s.street = "SHOWDOWN";
  }
  // Postflop: first to act is non-dealer in heads up
  if (s.street !== "PREFLOP" && s.street !== "SHOWDOWN") {
    s.actor = other(s.dealer);
  }
  return resetStreetBets(s);
}

function roundClosed(state: HandState): boolean {
  // Closed when both players still in hand AND their street bets match currentBetToMatch AND the last action was not a raise awaiting response.
  if (!state.hero.inHand || !state.villain.inHand) return true;
  const h = state.hero.streetBet;
  const v = state.villain.streetBet;
  return h === state.currentBetToMatch && v === state.currentBetToMatch;
}

function postBlinds(dealer: PlayerId, sb: number, bb: number) {
  // Heads up: dealer posts SB, other posts BB. Preflop first to act is dealer (button).
  const heroDealer = dealer === "HERO";
  const hero: Player = {
    id: "HERO",
    name: "You",
    stack: 100,
    committed: 0,
    streetBet: 0,
    inHand: true,
  };
  const villain: Player = {
    id: "VILLAIN",
    name: "Bot",
    stack: 100,
    committed: 0,
    streetBet: 0,
    inHand: true,
  };

  let pot = 0;
  let currentBetToMatch = 0;

  // SB
  if (heroDealer) {
    hero.stack -= sb;
    hero.committed += sb;
    hero.streetBet += sb;
    pot += sb;
  } else {
    villain.stack -= sb;
    villain.committed += sb;
    villain.streetBet += sb;
    pot += sb;
  }

  // BB
  if (heroDealer) {
    villain.stack -= bb;
    villain.committed += bb;
    villain.streetBet += bb;
    pot += bb;
    currentBetToMatch = bb;
  } else {
    hero.stack -= bb;
    hero.committed += bb;
    hero.streetBet += bb;
    pot += bb;
    currentBetToMatch = bb;
  }

  return { hero, villain, pot, currentBetToMatch };
}

function newHand(prevDealer: PlayerId): HandState {
  const dealer: PlayerId = prevDealer === "HERO" ? "VILLAIN" : "HERO";
  const blinds = { sb: 1, bb: 2 };
  const deck = shuffle(makeDeck());
  const heroCards: [Card, Card] = [deck.shift()!, deck.shift()!];
  const villainCards: [Card, Card] = [deck.shift()!, deck.shift()!];

  const posted = postBlinds(dealer, blinds.sb, blinds.bb);

  const history = [
    `New hand. Dealer: ${dealer === "HERO" ? "You" : "Bot"}. Blinds ${blinds.sb}/${blinds.bb}.`,
  ];

  return {
    handId: uid(),
    dealer,
    street: "PREFLOP",
    deck,
    heroCards,
    villainCards,
    board: [],
    blinds,
    pot: posted.pot,
    currentBetToMatch: posted.currentBetToMatch,
    actor: dealer, // HU preflop: button acts first
    hero: posted.hero,
    villain: posted.villain,
    history,
  };
}

function legalActions(state: HandState, pid: PlayerId) {
  const call = toCall(state, pid);
  const p = pid === "HERO" ? state.hero : state.villain;
  const acts: { kind: ActionKind; label: string; amount?: number }[] = [];

  acts.push({ kind: "FOLD", label: "Fold" });

  if (call === 0) {
    acts.push({ kind: "CHECK", label: "Check" });
    // bet sizes
    const halfPot = Math.max(1, Math.floor(state.pot / 2));
    const pot = Math.max(1, state.pot);
    const max = p.stack;
    if (max > 0) {
      acts.push({ kind: "BET", label: `Bet 1/2 pot (${clamp(halfPot, 1, max)})`, amount: clamp(halfPot, 1, max) });
      acts.push({ kind: "BET", label: `Bet pot (${clamp(pot, 1, max)})`, amount: clamp(pot, 1, max) });
    }
  } else {
    acts.push({ kind: "CALL", label: `Call (${clamp(call, 0, p.stack)})`, amount: clamp(call, 0, p.stack) });
    const raiseTo = clamp(Math.max(minRaiseTo(state), state.currentBetToMatch * 2), state.currentBetToMatch + 1, state.currentBetToMatch + p.stack);
    if (p.stack > call && raiseTo > state.currentBetToMatch) {
      const add = raiseTo - p.streetBet;
      acts.push({ kind: "RAISE", label: `Raise to ${raiseTo} (+${add})`, amount: add });
    }
  }

  // Hide fold when check is available (beginner-friendly)
  if (call === 0) return acts.filter((a) => a.kind !== "FOLD");
  return acts;
}

function coachSuggestion(state: HandState) {
  // Simple: use current hand strength proxy from 7-card eval when possible.
  const have7 = state.board.length >= 3;
  const rank = have7 ? eval7([...state.heroCards, ...state.board]) : null;

  const callAmt = toCall(state, "HERO");
  const potOdds = callAmt > 0 ? callAmt / (state.pot + callAmt) : 0;

  // crude strength score
  const strength = rank ? rank.cat : 0;
  const label = rank ? rank.label : "Preflop";

  // Heuristic policy
  if (callAmt === 0) {
    if (strength >= 2) {
      return {
        headline: `Coach: Bet for value (${label}).`,
        detail:
          "You’re likely ahead. A small bet builds the pot and charges draws. If you get raised, you can slow down.",
        suggested: "Bet 1/2 pot",
      };
    }
    return {
      headline: "Coach: Check is fine.",
      detail:
        "With a weak/unclear hand, checking keeps the pot small and lets you see what the opponent does.",
      suggested: "Check",
    };
  }

  // facing a bet
  if (!have7) {
    return {
      headline: "Coach: Call or fold based on hand quality.",
      detail:
        "Preflop is mostly about ranges. For MVP we’ll keep it simple: call small bets with decent cards, fold trash.",
      suggested: callAmt <= state.blinds.bb * 2 ? "Call" : "Fold",
    };
  }

  if (strength >= 3) {
    return {
      headline: `Coach: Raise for value (${label}).`,
      detail:
        "Strong made hand. Raising gets value from worse hands and denies equity.",
      suggested: "Raise",
    };
  }

  if (strength >= 1) {
    return {
      headline: `Coach: Call (${label}).`,
      detail:
        `You have something, and the price might be OK. Pot odds here are ~${Math.round(potOdds * 100)}%.`,
      suggested: "Call",
    };
  }

  return {
    headline: "Coach: Usually fold.",
    detail:
      `You likely don’t have enough equity. Pot odds are ~${Math.round(potOdds * 100)}%, but your hand is weak.`,
    suggested: "Fold",
  };
}

function botAct(state: HandState): HandState {
  // Very simple bot: prefers checking; bets small with strength; calls cheap; folds to big bets.
  let s = structuredClone(state) as HandState;
  const pid: PlayerId = "VILLAIN";
  if (s.actor !== pid) return s;
  if (!s.villain.inHand || !s.hero.inHand) return s;

  const callAmt = toCall(s, pid);
  const haveEval = s.board.length >= 3;
  const rank = haveEval ? eval7([...s.villainCards, ...s.board]) : null;
  const strength = rank ? rank.cat : 0;

  const acts = legalActions(s, pid);

  function push(line: string) {
    s.history = [line, ...s.history].slice(0, 12);
  }

  // Decision
  if (callAmt === 0) {
    if (strength >= 2 && acts.some((a) => a.kind === "BET")) {
      const bet = acts.find((a) => a.kind === "BET" && a.label.includes("1/2")) ?? acts.find((a) => a.kind === "BET");
      if (bet?.amount) {
        s = applyCommit(s, pid, bet.amount);
        s.lastAggressor = pid;
        push(`Bot bets ${bet.amount}.`);
        s.actor = other(pid);
        return s;
      }
    }
    push("Bot checks.");
    s.actor = other(pid);
    return s;
  }

  // Facing bet
  const big = callAmt > s.pot * 0.6;
  if (strength >= 2 && acts.some((a) => a.kind === "RAISE")) {
    const raise = acts.find((a) => a.kind === "RAISE");
    if (raise?.amount) {
      s = applyCommit(s, pid, raise.amount);
      s.lastAggressor = pid;
      push(`Bot raises (+${raise.amount}).`);
      s.actor = other(pid);
      return s;
    }
  }

  if (!big || strength >= 1) {
    const call = acts.find((a) => a.kind === "CALL");
    if (call?.amount !== undefined) {
      s = applyCommit(s, pid, call.amount);
      push(`Bot calls ${call.amount}.`);
      s.actor = other(pid);
      return s;
    }
  }

  // fold
  s.villain.inHand = false;
  push("Bot folds.");
  return s;
}

function settleIfEnded(state: HandState): HandState {
  let s = structuredClone(state) as HandState;

  // If someone folded
  if (!s.hero.inHand || !s.villain.inHand) {
    const winner: PlayerId = s.hero.inHand ? "HERO" : "VILLAIN";
    const w = winner === "HERO" ? s.hero : s.villain;
    w.stack += s.pot;
    s.history = [`${winner === "HERO" ? "You" : "Bot"} win ${s.pot} (opponent folded).`, ...s.history].slice(0, 12);
    s.street = "SHOWDOWN";
    return s;
  }

  if (s.street !== "SHOWDOWN") return s;

  const heroRank = eval7([...s.heroCards, ...s.board]);
  const villainRank = eval7([...s.villainCards, ...s.board]);
  const cmp = cmpRank(heroRank, villainRank);
  if (cmp > 0) {
    s.hero.stack += s.pot;
    s.history = [`You win ${s.pot} at showdown (${heroRank.label}).`, ...s.history].slice(0, 12);
  } else if (cmp < 0) {
    s.villain.stack += s.pot;
    s.history = [`Bot wins ${s.pot} at showdown (${villainRank.label}).`, ...s.history].slice(0, 12);
  } else {
    // split
    const half = Math.floor(s.pot / 2);
    s.hero.stack += half;
    s.villain.stack += s.pot - half;
    s.history = [`Split pot (${heroRank.label}).`, ...s.history].slice(0, 12);
  }
  return s;
}

export function PokerGame() {
  const [state, setState] = useState<HandState>(() => newHand("VILLAIN"));
  const [coachOn, setCoachOn] = useState(true);

  const coach = useMemo(() => coachSuggestion(state), [state]);
  const heroActs = useMemo(() => legalActions(state, "HERO"), [state]);

  const heroTurn = state.actor === "HERO" && state.street !== "SHOWDOWN" && state.hero.inHand && state.villain.inHand;

  function stepBot(s: HandState) {
    // Let bot act; if round closes, advance street; repeat until hero to act or showdown.
    let cur = structuredClone(s) as HandState;
    for (let iter = 0; iter < 6; iter++) {
      if (cur.street === "SHOWDOWN") break;
      if (cur.actor === "VILLAIN") {
        cur = botAct(cur);
      }
      if (cur.street !== "SHOWDOWN" && roundClosed(cur) && cur.actor !== "VILLAIN") {
        // if both matched, advance
        cur = advanceStreet(cur);
        // if reached showdown, fall through
      }
      if (cur.street === "SHOWDOWN") break;
      if (cur.actor === "HERO") break;
    }
    if (cur.street === "SHOWDOWN") cur = settleIfEnded(cur);
    return cur;
  }

  function onHeroAction(a: { kind: ActionKind; amount?: number }) {
    const s0 = structuredClone(state) as HandState;
    let s = s0;
    if (!heroTurn) return;

    const callAmt = toCall(s, "HERO");

    const push = (line: string) => {
      s.history = [line, ...s.history].slice(0, 12);
    };

    if (a.kind === "FOLD") {
      s.hero.inHand = false;
      push("You fold.");
      s.street = "SHOWDOWN";
      s = settleIfEnded(s);
      setState(s);
      return;
    }

    if (a.kind === "CHECK") {
      push("You check.");
      s.actor = "VILLAIN";
      s = stepBot(s);
      setState(s);
      return;
    }

    if (a.kind === "CALL") {
      s = applyCommit(s, "HERO", callAmt);
      push(`You call ${callAmt}.`);
      s.actor = "VILLAIN";
      s = stepBot(s);
      setState(s);
      return;
    }

    if (a.kind === "BET") {
      const amt = a.amount ?? 0;
      s = applyCommit(s, "HERO", amt);
      s.lastAggressor = "HERO";
      push(`You bet ${amt}.`);
      s.actor = "VILLAIN";
      s = stepBot(s);
      setState(s);
      return;
    }

    if (a.kind === "RAISE") {
      const amt = a.amount ?? 0;
      s = applyCommit(s, "HERO", amt);
      s.lastAggressor = "HERO";
      push(`You raise (+${amt}).`);
      s.actor = "VILLAIN";
      s = stepBot(s);
      setState(s);
      return;
    }
  }

  const showVillainCards = state.street === "SHOWDOWN";

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs text-white/50">No-limit Hold’em • Heads-up</div>
          <div className="mt-1 text-lg font-medium">Poker Game + Coach</div>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-white/70">
            <input
              type="checkbox"
              checked={coachOn}
              onChange={(e) => setCoachOn(e.target.checked)}
            />
            Coach mode
          </label>
          <button
            className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            onClick={() => setState(newHand(state.dealer))}
          >
            New hand
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm text-white/80">
              Street: <span className="font-medium">{state.street}</span>
            </div>
            <div className="text-sm text-white/80">
              Pot: <span className="font-medium">{state.pot}</span>
              <span className="text-white/50"> • </span>
              To call: <span className="font-medium">{toCall(state, "HERO")}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-xl border border-white/10 bg-black/40 p-4">
              <div className="text-xs text-white/50">Board</div>
              <div className="mt-2 flex flex-wrap gap-2 text-lg">
                {state.board.length === 0 ? (
                  <span className="text-white/40">(no cards yet)</span>
                ) : (
                  state.board.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg border border-white/10 bg-black px-2 py-1"
                    >
                      {fmtCard(c)}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/50">You</div>
                  <div className="text-xs text-white/60">stack {state.hero.stack}</div>
                </div>
                <div className="mt-2 flex gap-2 text-lg">
                  {state.heroCards.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg border border-white/10 bg-black px-2 py-1"
                    >
                      {fmtCard(c)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/50">Bot</div>
                  <div className="text-xs text-white/60">stack {state.villain.stack}</div>
                </div>
                <div className="mt-2 flex gap-2 text-lg">
                  {showVillainCards
                    ? state.villainCards.map((c) => (
                        <span
                          key={c}
                          className="rounded-lg border border-white/10 bg-black px-2 py-1"
                        >
                          {fmtCard(c)}
                        </span>
                      ))
                    : ["🂠", "🂠"].map((x, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-white/10 bg-black px-2 py-1 text-white/60"
                        >
                          {x}
                        </span>
                      ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/40 p-4">
              <div className="text-xs text-white/50">Actions</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {heroActs.map((a) => (
                  <button
                    key={a.label}
                    disabled={!heroTurn}
                    onClick={() => onHeroAction(a)}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs text-white/50">
                {heroTurn
                  ? "Your turn."
                  : state.street === "SHOWDOWN"
                    ? "Hand ended. Start a new hand."
                    : "Waiting for bot / advancing street…"}
              </div>
            </div>
          </div>
        </section>

        <aside className="grid gap-4">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-white/90">Coach</h3>
              <div className="text-xs text-white/50">MVP heuristics</div>
            </div>
            {coachOn ? (
              <div className="mt-3">
                <div className="text-sm text-white/90">{coach.headline}</div>
                <div className="mt-2 text-xs text-white/70">{coach.detail}</div>
                {coach.suggested ? (
                  <div className="mt-3 text-xs text-white/60">
                    Suggested: <span className="text-white/80">{coach.suggested}</span>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="mt-3 text-xs text-white/60">Coach mode is off.</div>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-sm font-medium text-white/90">Hand history</h3>
            <div className="mt-3 grid gap-2 text-xs text-white/70">
              {state.history.map((h, idx) => (
                <div key={idx} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                  {h}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <div className="text-xs text-white/50">
        Notes: This is a playable MVP (heads-up) with simplified betting sizes and
        a lightweight coach. Next upgrades: better bot strategy, bet sizing
        slider, hand history export, and 6-max.
      </div>
    </div>
  );
}
