# E2E test plan

## Tooling
- Playwright (`@playwright/test`)
- Base URL set via `BASE_URL` (supports Vercel deployment URLs)

## How to run locally
1) Start Next:
- `pnpm dev`
2) In another shell:
- `BASE_URL=http://127.0.0.1:3000 pnpm test:e2e`

## How to run against Vercel
- `BASE_URL=https://<project>.vercel.app pnpm test:e2e`

## Test suites
### smoke.spec.ts
- `/` loads
- `/nfl` loads (heading present)
- `/poker` loads (heading present)

### nfl.spec.ts (next)
- Start lesson, complete 3 steps, verify progress saved in session

### poker.spec.ts (next)
- Hand rankings mini-quiz
- Hand Lab best-hand explainer

### agentworld.spec.ts (next)
- Proposal creation
- Auto-approve gate path
- Step creation + status transitions

## Non-goals (for MVP)
- Mobile-specific layout testing
- Full accessibility audit (later add axe)
