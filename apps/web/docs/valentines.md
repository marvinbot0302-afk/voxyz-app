# Valentines Micro-sites

Routes live in **`apps/web/app/valentines`**.

## Hub
- `/valentines` – index page linking to all 10.

## Plan
Each page ends with the same reveal: **Camino Alto dinner** this Saturday (Feb 14, 2026).

## Pages
- `/valentines/1` – Choose-your-own-adventure mini story
- `/valentines/2` – Scratch-off canvas reveal
- `/valentines/3` – Two truths & a kiss (pick the “kiss”)
- `/valentines/4` – Spin wheel (CSS conic-gradient)
- `/valentines/5` – Chat simulator (choose replies)
- `/valentines/6` – Tiny tile swap puzzle (“BEMINE”)
- `/valentines/7` – Lyric / line reveal
- `/valentines/8` – Memory match (flip cards)
- `/valentines/9` – Polaroid stack (flip + next)
- `/valentines/10` – Shy “No” button

## Notes
- No extra dependencies were added (animations are CSS / Tailwind).
- All pages are lightweight client components (`"use client"`).

## Dev
From `apps/web`:

```bash
pnpm dev
```

Then open:
- http://localhost:3000/valentines
