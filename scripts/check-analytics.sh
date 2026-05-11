#!/usr/bin/env bash
# Verifies every HTML file in dist/ references analytics.js.
# Usage: ./scripts/check-analytics.sh [dist-dir]
# Exit code: 0 = pass, 1 = failures found.

set -euo pipefail

DIST="${1:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/dist}"
HOME_BASE_URL="${HOME_BASE_URL:-pulkitsinha.com}"
NEEDLE="${HOME_BASE_URL}/analytics.js"
FAIL=0

while IFS= read -r -d '' html; do
    if ! grep -qF "$NEEDLE" "$html"; then
        echo "FAIL: ${html#$DIST/} — missing analytics.js reference"
        FAIL=$((FAIL + 1))
    fi
done < <(find "$DIST" -name "*.html" -print0)

if [[ $FAIL -gt 0 ]]; then
    echo "analytics check: $FAIL file(s) missing analytics.js" >&2
    exit 1
fi

echo "analytics check: OK ($(find "$DIST" -name "*.html" | wc -l | tr -d ' ') HTML files)"
