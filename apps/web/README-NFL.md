# NFL Rules Tutor — Interactive Website Concept

Goal: an interactive, high-aesthetic, fun, easy-to-learn website that teaches NFL rules fast.

## Product Principles
- **Learn by doing**: short interactions instead of long text.
- **Progressive disclosure**: start with essentials (downs, scoring), then edge cases (penalties, clock).
- **Visual-first**: field diagrams, animated drives, play-by-play cards.
- **No jargon without tooltips**: every term has hover/click explainer.
- **Short sessions**: 2–5 minute modules.

## Core Experience
### 1) Onboarding: “What do you already know?”
- 5 quick taps: "I know what a touchdown is", "I know what downs are", etc.
- Generates a **personal learning path**.

### 2) Field-as-UI (main teaching surface)
- A stylized, animated football field.
- User advances a drive: choose plays (run/pass/punt/field goal) and see outcomes.
- Rules appear as **contextual popovers**.

### 3) Micro-lessons (Modules)
1. **The Objective** (score more points)
2. **Downs & Distance** (4 downs to gain 10 yards)
3. **Scoring** (TD/XP/2pt/FG/Safety)
4. **Possession & Turnovers** (INT/fumble/downs)
5. **Special Teams** (kickoff/punt/FG)
6. **Clock Basics** (quarters, play clock, timeouts)
7. **Penalties 101** (hold, offside, PI — the ones you actually see)
8. **Situational Football** (2-minute drill, 4th down decisions)

Each module:
- 60–120 seconds
- one interaction
- 3–5 “rules cards”
- a 3-question mini-quiz

### 4) “Explain this play” mode
- Feed a scenario card (e.g., “3rd & 7 at own 40, 1:12 left”).
- User predicts best decision; site explains outcomes & rules.

### 5) Spaced repetition
- Daily 2-minute “warmup” (penalty recognition + down math).

## Aesthetic Direction
- Dark mode by default; neon-accent field lines.
- Large typography, clean motion, subtle grain.
- Sound toggles: crowd swell, whistle, chain gang click.

## Tech (fits our Next.js repo)
- Next.js app route: `/nfl`
- Canvas/SVG animations for field
- State machine for drive simulation
- Content as JSON for easy editing

## Deliverables
- Landing page + module selector
- MVP: Modules 1–4 + drive simulator
- Polished: full module set + explain-this-play
