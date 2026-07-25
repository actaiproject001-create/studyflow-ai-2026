import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  CalendarClock,
  Bell,
  LifeBuoy,
  User,
  Settings,
  Menu,
  X,
  Search,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/ai-copilot", label: "AI Assignment Copilot", icon: BookOpen },
  { to: "/ai-research", label: "AI Research Assistant", icon: FlaskConical },
  { to: "/study-planner", label: "Study Planner", icon: CalendarClock },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/support", label: "Support", icon: LifeBuoy },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const Sidebar = (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
        {items.map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-gradient-primary text-white shadow-glow"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-xl bg-gradient-primary p-4 text-white shadow-glow">
          <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Pro tip</p>
          <p className="mt-1 text-sm font-medium leading-snug">
            Ask your AI copilot to break down any assignment in seconds.
          </p>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">{Sidebar}</div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative h-full">{Sidebar}</div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 hover:bg-secondary lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden max-w-sm flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search anything..."
              className="h-10 w-full rounded-xl border border-border bg-secondary/50 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary focus:bg-background"
            />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background hover:bg-secondary">
              <Bell className="h-4 w-4" />
            </button>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-sm font-semibold text-white">
              JS
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="hidden"
            aria-hidden
          >
            <X />
          </button>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl animate-fade-in">
            <div className="mb-8">
              <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h1>
              {description && (
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                  {description}
                </p>
              )}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
