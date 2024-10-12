declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_JWT_EXPIRE: string;
    NEXT_PUBLIC_SERVER_URL: string;
    NEXT_PUBLIC_TMDB_API_KEY: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  }
}
