import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const PORT = 6001
const themeScript = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), '../common/theme.js'),
  'utf-8'
)

process.env.VITE_HOME_URL ??= `http://localhost:${PORT}`
process.env.VITE_PROJECTS_URL ??= 'http://localhost:6002'
process.env.VITE_ANALYTICS_URL ??= `http://localhost:${PORT}/analytics.js`

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
  server: { host: true, port: PORT },
  define: {
    __BUILD_TIME__: JSON.stringify(process.env.VITE_BUILD_TIME || String(Date.now())),
  },
})
