// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_CURRENCY_API_URL: string;

  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }