import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { BookOpen, FlaskConical, CalendarClock, Bell, TrendingUp, Clock } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — StudyFlow AI" },
      { name: "description", content: "Your StudyFlow AI dashboard: assignments, plans, and progress." },
      { property: "og:title", content: "Dashboard — StudyFlow AI" },
      { property: "og:description", content: "Everything you're working on, in one place." },
    ],
  }),
  component: DashboardPage,
});

const stats = [
  { label: "Active assignments", value: "4", icon: BookOpen, trend: "+1 this week" },
  { label: "Study hours", value: "12.5", icon: Clock, trend: "+3.2 vs last week" },
  { label: "Focus streak", value: "6 days", icon: TrendingUp, trend: "Personal best" },
  { label: "Upcoming reminders", value: "9", icon: Bell, trend: "Next in 2h" },
];

const quickActions = [
  { icon: BookOpen, title: "New assignment", desc: "Break it down with AI Copilot" },
  { icon: FlaskConical, title: "Research a topic", desc: "Get a summary in seconds" },
  { icon: CalendarClock, title: "Plan the week", desc: "Auto-generate your schedule" },
];

function DashboardPage() {
  return (
    <AppLayout title="Welcome back, Jane 👋" description="Here's what's on your plate today.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary">
                <s.icon className="h-4 w-4 text-primary" />
              </span>
              <span className="text-xs text-muted-foreground">{s.trend}</span>
            </div>
            <p className="mt-4 font-display text-2xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold">Today's focus</h3>
          <p className="mt-1 text-sm text-muted-foreground">AI-suggested tasks based on your deadlines.</p>
          <div className="mt-5 space-y-3">
            {[
              { t: "Draft outline for History essay", d: "Due Fri · 45 min" },
              { t: "Read Chapter 4 — Microeconomics", d: "Due Mon · 30 min" },
              { t: "Review flashcards: Biology", d: "Daily · 15 min" },
            ].map((task) => (
              <div key={task.t} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{task.t}</p>
                  <p className="text-xs text-muted-foreground">{task.d}</p>
                </div>
                <button className="rounded-lg bg-gradient-primary px-3 py-1.5 text-xs font-semibold text-white shadow-glow">
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold">Quick actions</h3>
          <div className="mt-5 space-y-3">
            {quickActions.map((a) => (
              <button
                key={a.title}
                className="flex w-full items-start gap-3 rounded-xl border border-border bg-background p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-elegant"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <a.icon className="h-4 w-4 text-white" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{a.title}</span>
                  <span className="block text-xs text-muted-foreground">{a.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
