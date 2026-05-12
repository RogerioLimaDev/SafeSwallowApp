/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PASSWORD: string
  readonly NEW_GEMINI_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
