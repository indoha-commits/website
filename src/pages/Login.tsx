import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { ENV } from "@/lib/env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import logoImage from "@/assets/indataflow-logo.png";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === 'failed') {
      return 'Login failed. Please fix the issue and try again.';
    }
    return null;
  });
  const [authBlocked, setAuthBlocked] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('auth') === 'failed';
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authBlocked) {
      setError('Login is locked after a previous failure. Reset the form to try again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!ENV.API_BASE_URL) {
        throw new Error('Missing VITE_API_BASE_URL');
      }

      const tenantHeader = ENV.MT_TENANT_SUBDOMAIN
        ? { 'x-mt-tenant-subdomain': ENV.MT_TENANT_SUBDOMAIN }
        : {};

      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;

      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) throw new Error('Missing access token');

      let meRes = await fetch(`${ENV.API_BASE_URL}/me`, {
        headers: { authorization: `Bearer ${token}`, ...tenantHeader },
      });

      if (meRes.status === 401 || meRes.status === 403) {
        meRes = await fetch(`${ENV.API_BASE_URL}/client/me`, {
          headers: { authorization: `Bearer ${token}`, ...tenantHeader },
        });
      }

      if (!meRes.ok) {
        const txt = await meRes.text().catch(() => '');
        throw new Error(`Role lookup failed: ${meRes.status} ${txt}`);
      }

      const me = (await meRes.json()) as { role: 'client' | 'ops' | 'admin' };

      let internalSessionId: string | null = null;
      if (me.role === 'ops' || me.role === 'admin') {
        internalSessionId = crypto.randomUUID();
        const claimRes = await fetch(`${ENV.API_BASE_URL}/ops/internal-session/claim`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
            ...tenantHeader,
          },
          body: JSON.stringify({ session_id: internalSessionId }),
        });

        if (claimRes.status === 409) {
          const txt = await claimRes.text().catch(() => '');
          throw new Error(`Already signed in elsewhere. Please sign out from the other device or wait for the session to expire. (${txt})`);
        }

        if (!claimRes.ok) {
          const txt = await claimRes.text().catch(() => '');
          throw new Error(`Failed to start internal session: ${claimRes.status} ${txt}`);
        }
      }

      const resolveRes = await fetch(`${ENV.API_BASE_URL}/auth/resolve-tenant`, {
        headers: { authorization: `Bearer ${token}`, ...tenantHeader },
      });

      if (!resolveRes.ok) {
        const txt = await resolveRes.text().catch(() => '');
        throw new Error(`Tenant resolve failed: ${resolveRes.status} ${txt}`);
      }

      const resolve = (await resolveRes.json()) as { redirect_url?: string };
      const redirectUrl = resolve.redirect_url;
      if (!redirectUrl) {
        throw new Error('Tenant resolve missing redirect_url');
      }

      const target = new URL(redirectUrl);
      const basePath = target.pathname.replace(/\/+$/, '');
      target.pathname = `${basePath}/auth/callback`;
      target.hash = new URLSearchParams({
        access_token: token,
        refresh_token: data.session?.refresh_token || '',
        ...(internalSessionId ? { internal_session_id: internalSessionId } : {}),
      }).toString();

      window.location.href = target.toString();
    } catch (err: any) {
      await supabase.auth.signOut();
      const message = String(err?.message ?? err);
      setError(message);
      setAuthBlocked(true);
      const url = new URL(window.location.href);
      url.searchParams.set('auth', 'failed');
      window.history.replaceState({}, '', url.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleResetLogin = async () => {
    await supabase.auth.signOut().catch(() => undefined);
    setEmail('');
    setPassword('');
    setLoading(false);
    setError(null);
    setAuthBlocked(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('auth');
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen bg-background flex home-theme">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 20%, hsl(var(--home-blue) / 0.18), transparent 55%)' }} />
        <div className="relative z-10">
          <Link to="/" className="flex items-center">
            <img src={logoImage} alt="InDataFlow" className="h-14 w-auto brightness-0 invert home-logo" />
          </Link>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            Your cargo operations,
            <br />under control.
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            The operating system for port-to-warehouse logistics.
          </p>
        </div>

        <div className="relative z-10 text-primary-foreground/60 text-sm">
          © {new Date().getFullYear()} InDataFlow. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: 'var(--gradient-surface)' }}>
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-center">
            <Link to="/" className="inline-flex items-center justify-center">
              <img src={logoImage} alt="InDataFlow" className="h-14 w-auto brightness-0 invert home-logo" />
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to access your dashboard.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-accent hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="space-y-3">
                <p className="text-sm text-destructive text-center">{error}</p>
                <Button type="button" variant="outline" className="w-full" onClick={handleResetLogin}>
                  Reset login
                </Button>
              </div>
            )}

            <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : "Sign in"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
