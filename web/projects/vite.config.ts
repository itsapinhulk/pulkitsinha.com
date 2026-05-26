import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const PORT = 6002
const themeScript = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), '../common/theme.js'),
  'utf-8'
)

process.env.VITE_HOME_URL ??= 'http://localhost:6001'
process.env.VITE_PROJECTS_URL ??= `http://localhost:${PORT}`
process.env.VITE_ANALYTICS_URL ??= 'http://localhost:6001/analytics.js'

// ── Subprojects ───────────────────────────────────────────────────────────────
// Each entry is proxied at /path on this dev server and started alongside it.
// To add a new subproject: append an entry here. src is relative to this file.
export const SUBPROJECTS = [
  { path: '/us-green-card-wait-time', port: 6010, src: '../../ext/visa-tracker/src/web', devScript: 'start' },
]

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inline-theme',
      transformIndexHtml: {
        order: 'pre',
        handler: () => [{ tag: 'script', injectTo: 'head-prepend', children: themeScript }],
      },
    },
  ],
  publicDir: '../export',
  appType: 'mpa',
  server: {
    host: true,
    port: PORT,
    proxy: Object.fromEntries(
      SUBPROJECTS.map(({ path, port }) => [
        path,
        { target: `http://localhost:${port}`, ws: true, changeOrigin: true },
      ])
    ),
  },
  define: {
    __BUILD_TIME__: JSON.stringify(process.env.VITE_BUILD_TIME || String(Date.now())),
  },
})
