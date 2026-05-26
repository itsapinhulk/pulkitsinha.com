/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOME_URL: string
  readonly VITE_PROJECTS_URL: string
  readonly VITE_ANALYTICS_URL: string
}

declare const __BUILD_TIME__: string

interface Window {
  __theme: { isLight(): boolean; toggle(): boolean }
}
