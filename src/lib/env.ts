type ViteEnvLike = Record<string, any>;

export function resolveMtWorkerBaseUrl(env: ViteEnvLike): string {
  return String(env.VITE_MT_API_BASE_URL || env.VITE_MT_WORKER_BASE_URL || env.VITE_WORKER_BASE_URL || '');
}

export const ENV = {
  // Multi-tenant API worker base URL.
  // NOTE: other apps in this repo use `VITE_MT_API_BASE_URL`, while older code used `VITE_MT_WORKER_BASE_URL`.
  // Support both to avoid misconfiguration breaking login/contact forms.
  MT_WORKER_BASE_URL: resolveMtWorkerBaseUrl(import.meta.env),
  API_BASE_URL: (import.meta.env.VITE_MT_API_BASE_URL || import.meta.env.VITE_API_BASE_URL || '') as string,
  MT_TENANT_SUBDOMAIN: (import.meta.env.VITE_MT_TENANT_SUBDOMAIN || '') as string,
  INTERNAL_DASHBOARD_URL: (import.meta.env.VITE_INTERNAL_DASHBOARD_URL || '') as string,
  CLIENT_DASHBOARD_URL: (import.meta.env.VITE_CLIENT_DASHBOARD_URL || '') as string,
  SUPABASE_URL: (import.meta.env.VITE_SUPABASE_URL || '') as string,
  SUPABASE_ANON_KEY: (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '') as string,
};
