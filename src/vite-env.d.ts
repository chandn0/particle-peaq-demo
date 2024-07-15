/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly APP_KEY: string
    readonly CLIENT_KEY: string
    readonly PROJECT_KEY: string
    readonly MOBULA_KEY: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}