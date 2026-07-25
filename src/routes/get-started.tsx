import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Get Started — StudyFlow AI" },
      { name: "description", content: "Create your free StudyFlow AI account and study smarter today." },
      { property: "og:title", content: "Get Started — StudyFlow AI" },
      { property: "og:description", content: "Create your free account in seconds." },
    ],
  }),
  component: GetStartedPage,
});

function GetStartedPage() {
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

          <form onSubmit={(e) => e.preventDefault()} className="mt-6 grid gap-4">
            <div>
              <label className="text-sm font-medium">Full name</label>
              <Input className="mt-1.5" placeholder="Jane Student" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input className="mt-1.5" type="email" placeholder="you@school.edu" />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <Input className="mt-1.5" type="password" placeholder="At least 8 characters" />
            </div>
            <Button asChild className="bg-gradient-primary text-white shadow-glow hover:opacity-95">
              <Link to="/dashboard">Create account</Link>
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
