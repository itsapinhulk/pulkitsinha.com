#!/usr/bin/env bash
# Build all sites into dist/.

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="$REPO/dist"
GIT_LAST_UPDATED="$REPO/ext/shellutils/bash/git-last-updated"

HOME_BASE_URL="${HOME_BASE_URL:-pulkitsinha.com}"
PROJECTS_BASE_URL="${PROJECTS_BASE_URL:-projects.pulkitsinha.com}"
IMAGES_BASE_URL="${IMAGES_BASE_URL:-images.pulkitsinha.com}"

export VITE_HOME_URL="https://${HOME_BASE_URL}"
export VITE_PROJECTS_URL="https://${PROJECTS_BASE_URL}"
export VITE_IMAGES_URL="https://${IMAGES_BASE_URL}"
export VITE_ANALYTICS_URL="${VITE_HOME_URL}/analytics.js"

# Returns last-commit Unix timestamp (ms) for a repo-relative path.
# Fails with exit code 1 if shellutils not initialised or path has no history.
last_updated_ms() {
    local path="$1"
    local ts=""
    if [[ -x "$GIT_LAST_UPDATED" ]]; then
        ts=$("$GIT_LAST_UPDATED" -C "$REPO" "$path" 2>/dev/null) || ts=""
    fi
    if [[ -z "$ts" ]]; then
        echo "error: git-last-updated unavailable or no history for $path" >&2
        echo -1
        return 1
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
        bun install --frozen-lockfile
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
    local out="$DIST/home"
    build_vite "$REPO/web/home" "$out" "/"
    cp "$REPO/web/export/analytics.js" "$out/analytics.js"
}

build_site_images() {
    echo "==> ${IMAGES_BASE_URL}"
    local out="$DIST/images"
    mkdir -p "$out"
    cp -r "$REPO/web/images/." "$out/"
}

build_site_projects() {
    echo "==> ${PROJECTS_BASE_URL}"
    local out="$DIST/projects"
    build_vite "$REPO/web/projects" "$out" "/"

    # Subpath: /us-green-card-wait-time  (submodule)
    local vt_src="$REPO/ext/visa-tracker/src/web"
    if [[ ! -f "$vt_src/package.json" ]]; then
        echo "error: visa-tracker submodule not initialised (run: git submodule update --init)" >&2
        exit 1
    fi
    echo "  subpath: /us-green-card-wait-time"
    build_vite "$vt_src" "$out/us-green-card-wait-time" "/us-green-card-wait-time/"
}

# ── Main ─────────────────────────────────────────────────────────────────────
# Usage: build.sh [clean|home|projects] ...  (default: all sites)

if [[ "${1:-}" == "clean" ]]; then
    echo "Cleaning $DIST..."
    rm -rf "${DIST:?}"/*/
    exit 0
fi

if [[ $# -eq 0 ]]; then
    SITES=(home projects images)
else
    SITES=("$@")
fi

for site in "${SITES[@]}"; do
    if ! declare -f "build_site_${site}" > /dev/null; then
        echo "error: unknown site '${site}' (known: home, projects, images)" >&2
        exit 1
    fi
done

echo "Building: ${SITES[*]} (HOME=$HOME_BASE_URL  PROJECTS=$PROJECTS_BASE_URL  IMAGES=$IMAGES_BASE_URL)"
echo "Output: $DIST"
echo

mkdir -p "$DIST"

for site in "${SITES[@]}"; do
    "build_site_${site}"
done

echo
echo "Done. Output:"
find "$DIST" -type f | sort | sed "s|$DIST/||"
