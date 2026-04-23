/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  /** CTA under results (“Discover how to make…”). If unset, a built-in default is used. */
  readonly VITE_DISCOVER_DONATIONS_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
