# VoxYZ-style Agent World (OpenClaw + Vercel + Supabase)

Monorepo:
- `apps/web` – Next.js (dashboard + pixel office UI + API routes)
- `packages/worker` – step executor (runs on VPS/DGX)
- `packages/db` – SQL migrations + policy seeds
- `packages/shared` – shared types + helpers

This repo is designed around a closed loop:
**proposal → gate/auto-approve → mission+steps → worker executes → event → triggers/reactions → repeat**
