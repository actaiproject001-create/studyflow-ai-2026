import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Logo } from "@/components/logo";
import { GoogleButton } from "@/components/google-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Get Started — StudyFlow AI" },
      { name: "description", content: "Create your free StudyFlow AI account and study smarter today." },
      { property: "og:title", content: "Get Started — StudyFlow AI" },
      { property: "og:description", content: "Create your free account in seconds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GetStartedPage,
});

function GetStartedPage() {
  const { signUpWithEmail, signInWithGoogle, user, loading } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) void navigate({ to: "/dashboard", replace: true });
  }, [user, loading, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      await signUpWithEmail(email.trim(), password, fullName.trim());
      setNotice("Account created. Check your inbox to confirm your email, then sign in.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create your account.");
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
      setError(err instanceof Error ? err.message : "Google sign-up failed.");
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen bg-gradient-hero lg:grid-cols-2">
      <div className="hidden flex-col justify-between p-12 lg:flex">
        <Logo />
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
            Study smarter.<br />Stress less.
          </h2>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "AI copilot for every assignment",
              "Personalized study schedules",
              "Private, secure, yours forever",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-primary" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} StudyFlow AI</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-elegant">
          <div className="lg:hidden"><Logo /></div>
          <h1 className="mt-6 font-display text-2xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Free forever — no credit card required.</p>

          <div className="mt-6">
            <GoogleButton onClick={handleGoogle} loading={busy} label="Sign up with Google" />
          </div>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label className="text-sm font-medium" htmlFor="name">Full name</label>
              <Input
                id="name"
                className="mt-1.5"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Student"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="signup-email">Email</label>
              <Input
                id="signup-email"
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
              <label className="text-sm font-medium" htmlFor="signup-password">Password</label>
              <Input
                id="signup-password"
                className="mt-1.5"
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
            {notice && (
              <p className="rounded-xl bg-primary/10 px-3 py-2 text-sm text-primary">{notice}</p>
            )}

            <Button
              type="submit"
              disabled={busy}
              className="bg-gradient-primary text-white shadow-glow hover:opacity-95"
            >
              {busy ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
