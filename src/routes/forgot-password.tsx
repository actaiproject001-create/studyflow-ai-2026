import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — StudyFlow AI" },
      { name: "description", content: "Request a password reset link for your StudyFlow AI account." },
      { property: "og:title", content: "Reset your password — StudyFlow AI" },
      { property: "og:description", content: "We'll email you a secure reset link." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await sendPasswordReset(email.trim());
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send the reset email.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-hero p-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-elegant">
        <Logo />
        <h1 className="mt-6 font-display text-2xl font-bold">Forgot your password?</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your email and we'll send you a secure reset link.
        </p>

        {sent ? (
          <p className="mt-6 rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary">
            If an account exists for {email}, a reset link is on its way.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <div>
              <label className="text-sm font-medium" htmlFor="reset-email">Email</label>
              <Input
                id="reset-email"
                className="mt-1.5"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
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
              {busy ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/login" className="font-medium text-primary hover:underline">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
