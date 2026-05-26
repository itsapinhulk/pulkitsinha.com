#!/usr/bin/env bash
# Install dependencies and serve the dist/ build locally for preview.

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Installing dependencies..."
bun install --frozen-lockfile --cwd "$REPO"

exec bun run --cwd "$REPO" preview
