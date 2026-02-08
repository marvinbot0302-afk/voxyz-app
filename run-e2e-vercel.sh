#!/usr/bin/env bash
set -euo pipefail

urls=(
  "https://voxyz-agentworld.vercel.app"
  "https://voxyz-nfl.vercel.app"
  "https://voxyz-poker.vercel.app"
)

for u in "${urls[@]}"; do
  echo "=== E2E against $u"
  sudo -n docker run --rm -u $(id -u):$(id -g) -v "$PWD":/repo -w /repo node:22-bookworm bash -lc '
    set -e
    npx -y pnpm@9.15.4 -w install
    cd apps/web
    npx -y playwright@1.50.1 install --with-deps chromium
    BASE_URL='"$u"' npx -y pnpm@9.15.4 test:e2e
  '
done
