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

  # Note: do NOT pre-create apps/web/.vercel/project.json.
  # Writing a stub project.json (e.g., {projectId:null,orgId:null}) can make Vercel
  # reject deploys with “Project Settings are invalid”. Let the Vercel CLI link/create
  # the project itself based on flags/token.
  # Ensure correct project linkage for this deploy.
  (cd "$APP_DIR" && rm -rf .vercel)
  (cd "$APP_DIR" && npx -y vercel@latest link \
    --token "$VERCEL_TOKEN" \
    --project "$project" \
    --yes)

  (cd "$APP_DIR" && npx -y vercel@latest deploy \
    --token "$VERCEL_TOKEN" \
    --env APP_FLAVOR="$flavor" \
    --build-env APP_FLAVOR="$flavor" \
    --yes \
    --prod)
}

deploy_one "voxyz-agentworld" "agentworld"
deploy_one "voxyz-nfl" "nfl"
deploy_one "voxyz-poker" "poker"
