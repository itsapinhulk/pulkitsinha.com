#!/usr/bin/env bash
# Install dependencies and start all dev servers concurrently.

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Installing dependencies..."
bun install --frozen-lockfile --cwd "$REPO" &
bun install --frozen-lockfile --cwd "$REPO/web/home" &
bun install --frozen-lockfile --cwd "$REPO/web/projects" &
wait

exec bun run --cwd "$REPO" dev
