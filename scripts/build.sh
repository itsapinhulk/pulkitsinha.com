#!/usr/bin/env bash
# Build all sites into dist/.

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="$REPO/dist"
GIT_LAST_UPDATED="$REPO/ext/shellutils/bash/git-last-updated"

HOME_BASE_URL="${HOME_BASE_URL:-pulkitsinha.com}"
PROJECTS_BASE_URL="${PROJECTS_BASE_URL:-projects.${HOME_BASE_URL}}"

export VITE_HOME_URL="https://${HOME_BASE_URL}"
export VITE_PROJECTS_URL="https://${PROJECTS_BASE_URL}"
export VITE_ANALYTICS_URL="${VITE_HOME_URL}/analytics.js"

# Returns last-commit Unix timestamp (ms) for a repo-relative path.
# Falls back to current time if shellutils not initialised or path has no history.
last_updated_ms() {
    local path="$1"
    local ts=""
    if [[ -x "$GIT_LAST_UPDATED" ]]; then
        ts=$("$GIT_LAST_UPDATED" -C "$REPO" "$path" 2>/dev/null) || ts=""
    fi
    if [[ -z "$ts" ]]; then
        echo "  [warn] git-last-updated unavailable for $path, using current time" >&2
        ts=$(date +%s)
    fi
    echo $((ts * 1000))
}

# Build a Vite app, output to a given directory.
# Usage: build_vite <source-dir> <out-dir> [base-path]
build_vite() {
    local src="$1"
    local out="$2"
    local base="${3:-/}"
    local rel="${src#$REPO/}"
    local ts
    ts=$(last_updated_ms "$rel")

    echo "  vite: $rel  (base=$base)"
    mkdir -p "$out"
    (
        cd "$src"
        VITE_BUILD_TIME="$ts" bun run build -- \
            --base="$base" \
            --outDir="$out" \
            --emptyOutDir
    )
}

# ── Site definitions ─────────────────────────────────────────────────────────
# To add a new subdomain: add a build_site_<name>() function and call it below.

build_site_home() {
    echo "==> ${HOME_BASE_URL}"
    local out="$DIST/$HOME_BASE_URL"
    build_vite "$REPO/web/home" "$out" "/"
    cp "$REPO/web/common/analytics.js" "$out/analytics.js"
}

build_site_projects() {
    echo "==> ${PROJECTS_BASE_URL}"
    local out="$DIST/$PROJECTS_BASE_URL"
    build_vite "$REPO/web/projects" "$out" "/"

    # Subpath: /visa-tracker  (submodule)
    local vt_src="$REPO/ext/visa-tracker/src/web"
    if [[ -f "$vt_src/package.json" ]]; then
        echo "  subpath: /visa-tracker"
        build_vite "$vt_src" "$out/visa-tracker" "/visa-tracker/"
    else
        echo "  [skip] visa-tracker submodule not initialised"
    fi
}

# ── Main ─────────────────────────────────────────────────────────────────────

echo "Building all sites (HOME=$HOME_BASE_URL  PROJECTS=$PROJECTS_BASE_URL)"
echo "Output: $DIST"
echo

rm -rf "$DIST"
mkdir -p "$DIST"

build_site_home
build_site_projects

echo
echo "Done. Output:"
find "$DIST" -type f | sort | sed "s|$DIST/||"
