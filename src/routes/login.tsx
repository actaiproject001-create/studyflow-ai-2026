import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — StudyFlow AI" },
      { name: "description", content: "Sign in to your StudyFlow AI account." },
      { property: "og:title", content: "Login — StudyFlow AI" },
      { property: "og:description", content: "Welcome back to StudyFlow AI." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
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

          <form onSubmit={(e) => e.preventDefault()} className="mt-6 grid gap-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input className="mt-1.5" type="email" placeholder="you@school.edu" />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <Input className="mt-1.5" type="password" placeholder="••••••••" />
            </div>
            <Button asChild className="bg-gradient-primary text-white shadow-glow hover:opacity-95">
              <Link to="/dashboard">Sign in</Link>
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
