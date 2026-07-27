import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Logo } from "@/components/logo";
import { GoogleButton } from "@/components/google-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — StudyFlow AI" },
      { name: "description", content: "Sign in to your StudyFlow AI account." },
      { property: "og:title", content: "Login — StudyFlow AI" },
      { property: "og:description", content: "Welcome back to StudyFlow AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signInWithEmail, signInWithGoogle, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) void navigate({ to: "/dashboard", replace: true });
  }, [user, loading, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signInWithEmail(email.trim(), password);
      await navigate({ to: "/dashboard", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setBusy(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed.");
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen bg-gradient-hero lg:grid-cols-2">
      <div className="hidden flex-col justify-between p-12 lg:flex">
        <Logo />
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
            Welcome back.<br />Let's keep the streak going.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Pick up right where you left off — your assignments, plans and research are waiting.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} StudyFlow AI</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-elegant">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back — let's get you studying.</p>

          <div className="mt-6">
            <GoogleButton onClick={handleGoogle} loading={busy} />
          </div>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <Input
                id="email"
                className="mt-1.5"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                className="mt-1.5"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={busy}
              className="bg-gradient-primary text-white shadow-glow hover:opacity-95"
            >
              {busy ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link to="/get-started" className="font-medium text-primary hover:underline">
              Get started
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
