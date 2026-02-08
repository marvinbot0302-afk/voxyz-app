#!/usr/bin/env bash
set -euo pipefail

: "${VERCEL_TOKEN:?VERCEL_TOKEN not set}"

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$ROOT_DIR/apps/web"

# One repo, 3 projects. Use APP_FLAVOR to make each project land on the right route.

deploy_one() {
  local project="$1"
  local flavor="$2"

  echo "--- Deploying $project (flavor=$flavor)"

  # Ensure Vercel metadata exists
  mkdir -p "$APP_DIR/.vercel"
  cat > "$APP_DIR/.vercel/project.json" <<JSON
{"projectId":null,"orgId":null}
JSON

  # Link (non-interactive) by creating a new project if needed.
  # We rely on Vercel CLI to create the project on first deploy.

  # Deploy prebuilt? For speed, do normal deploy.
  (cd "$APP_DIR" && npx -y vercel@latest \
    --token "$VERCEL_TOKEN" \
    --name "$project" \
    --env APP_FLAVOR="$flavor" \
    --build-env APP_FLAVOR="$flavor" \
    --confirm \
    --prod)
}

deploy_one "voxyz-agentworld" "agentworld"
deploy_one "voxyz-nfl" "nfl"
deploy_one "voxyz-poker" "poker"
