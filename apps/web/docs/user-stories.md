# User stories (E2E)

## Cross-cutting
1) As a user, I can open the site URL on desktop and see a clear entry to each product (Agent World / NFL / Poker).
- Acceptance: navigation links visible; no console errors; page interactive.

2) As a user, I can refresh any page and it still loads (no client-only routing dependency).
- Acceptance: hard refresh works on `/`, `/nfl`, `/poker`.

---

## NFL Tutor
3) As a beginner, I can start a “4 downs” lesson and understand the goal in <2 minutes.
- Acceptance: a “Begin” CTA exists; lesson shows (a) what a down is (b) what “10 yards” means (c) turnover on downs.

4) As a learner, I can try an “Explain this play” scenario and get feedback.
- Acceptance: scenario shown; I can choose an answer; I get explanation + next step.

---

## Poker Tutor (Texas Hold’em)
5) As a beginner, I can learn hand rankings interactively.
- Acceptance: ranking module exists; I answer at least 3 questions; I get correct/incorrect feedback.

6) As a learner, I can use “Hand Lab” to pick hole cards + board and see the best 5-card hand explained.
- Acceptance: I can select cards; app outputs the best hand name and the key rule (e.g. “you always make the best 5”).

---

## Agent World (VoxYZ-style)
7) As a user, I can open the Agent World URL and see current system status.
- Acceptance: shows missions/steps/events (even if empty) and a clear “create proposal” entry.

8) As a user, I can create a proposal and see it appear in the queue.
- Acceptance: proposal creation succeeds; event emitted; visible in dashboard.
