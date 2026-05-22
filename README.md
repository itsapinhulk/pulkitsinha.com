# pulkitsinha.com

Source for [pulkitsinha.com](https://pulkitsinha.com) and its subdomains. Bun + Vite + React static sites deployed via Cloudflare.

## Structure

```
scripts/
  build.sh          # build all sites → dist/
  dev.sh            # start all dev servers
  check-analytics.sh
web/
  home/             # pulkitsinha.com          (port 6001)
  projects/         # projects.pulkitsinha.com  (port 6002)
  common/
    analytics.js    # served at pulkitsinha.com/analytics.js
ext/
  shellutils/       # submodule — provides bash/git-last-updated
  visa-tracker/     # submodule — projects.pulkitsinha.com/visa-tracker
```

## Dev

```bash
./scripts/dev.sh
```

Opens:
- http://localhost:6001 — home
- http://localhost:6002 — projects

## Build

```bash
./scripts/build.sh
```

Output goes to `dist/home/` and `dist/projects/`. Accepts optional args to build a single site: `./scripts/build.sh home`. Requires `HOME_BASE_URL` and `PROJECTS_BASE_URL` env vars (default to `pulkitsinha.com` and `projects.pulkitsinha.com`).

## Submodules

```bash
git submodule update --init --recursive
```
