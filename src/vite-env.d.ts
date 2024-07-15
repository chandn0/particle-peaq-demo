/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_KEY: string
    readonly VITE_CLIENT_KEY: string
    readonly VITE_PROJECT_KEY: string
    readonly VITE_MOBULA_KEY: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}