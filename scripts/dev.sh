#!/usr/bin/env bash
# Start all dev servers concurrently.

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

exec bun run --cwd "$REPO" dev
