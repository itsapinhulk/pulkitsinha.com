import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = 6002

process.env.VITE_HOME_URL ??= 'http://localhost:6001'
process.env.VITE_PROJECTS_URL ??= `http://localhost:${PORT}`
process.env.VITE_ANALYTICS_URL ??= 'http://localhost:6001/analytics.js'

export default defineConfig({
  plugins: [react()],
  appType: 'mpa',
  server: { host: true, port: PORT },
  define: {
    __BUILD_TIME__: JSON.stringify(process.env.VITE_BUILD_TIME || String(Date.now())),
  },
})
