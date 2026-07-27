import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  LifeBuoy,
  Bell,
  BookOpen,
  Clock,
  CalendarDays,
  TrendingUp,
  FlaskConical,
  MessageCircle,
  HeartPulse,
  Brain,
  Upload,
  FileUp,
  Sparkles,
  Send,
  X,
  ArrowUpRight,
  MessagesSquare,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import welcomeArt from "@/assets/dashboard-welcome.png";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — StudyFlow AI" },
      {
        name: "description",
        content:
          "Your StudyFlow AI workspace: assignments, research, study planning, deadlines and AI tools in one premium dashboard.",
      },
      { property: "og:title", content: "Dashboard — StudyFlow AI" },
      {
        property: "og:description",
        content: "Track assignments, deadlines and study hours with your AI workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const stats = [
  { icon: BookOpen, label: "Assignments", value: "12", unit: "Active", tint: "from-[#4F7CFF] to-[#7C5CFF]" },
  { icon: Clock, label: "Study Hours", value: "5.5", unit: "Hours Today", tint: "from-[#7C5CFF] to-[#B15CFF]" },
  { icon: CalendarDays, label: "Deadlines", value: "3", unit: "This Week", tint: "from-[#4F7CFF] to-[#37C4FF]" },
  { icon: TrendingUp, label: "Productivity", value: "89%", unit: "This Week", tint: "from-[#FFC94D] to-[#FF8A4D]" },
];

const tools = [
  {
    icon: BookOpen,
    title: "AI Assignment Copilot",
    desc: "Understand assignments, generate roadmaps, and break work into simple steps.",
    to: "/ai-copilot" as const,
  },
  {
    icon: FlaskConical,
    title: "AI Research Assistant",
    desc: "Summarize PDFs, explain concepts, and answer research questions.",
    to: "/ai-research" as const,
  },
  {
    icon: CalendarDays,
    title: "Smart Study Planner",
    desc: "Generate personalized study schedules using AI.",
    to: "/study-planner" as const,
  },
  {
    icon: MessageCircle,
    title: "Smart WhatsApp Reminders",
    desc: "Receive assignment, exam, and study reminders directly on WhatsApp.",
    to: "/notifications" as const,
  },
  {
    icon: HeartPulse,
    title: "Student Health Assistant",
    desc: "Healthy study habits, hydration reminders, posture tips, and stress reduction.",
    to: "/support" as const,
  },
  {
    icon: Brain,
    title: "Digital Second Brain",
    desc: "Store notes, PDFs, links, and ask AI to find anything instantly.",
    to: "/profile" as const,
  },
];

const deadlines = [
  { title: "AI Assignment", when: "Tomorrow", level: "High" },
  { title: "Cybersecurity Quiz", when: "Friday", level: "Medium" },
  { title: "Database Project", when: "Monday", level: "Low" },
];

const conversations = [
  { icon: BookOpen, title: "Assignment Help", time: "2h ago" },
  { icon: FlaskConical, title: "Research on AI Ethics", time: "Yesterday" },
  { icon: Brain, title: "Operating Systems Notes", time: "2 days ago" },
  { icon: MessagesSquare, title: "Machine Learning Summary", time: "4 days ago" },
];

const schedule = [
  { time: "9:00 AM", title: "Cybersecurity Lecture" },
  { time: "11:00 AM", title: "Assignment Writing" },
  { time: "2:00 PM", title: "Research Session" },
  { time: "6:00 PM", title: "Revision" },
];

const quickActions = [
  { icon: Upload, label: "Upload Assignment" },
  { icon: FileUp, label: "Upload PDF" },
  { icon: FlaskConical, label: "Start Research" },
  { icon: Sparkles, label: "Ask AI" },
];

const priorityStyles: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-[#FFC94D]/20 text-[#8A5B00]",
  Low: "bg-primary/10 text-primary",
};

function DashboardPage() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Logo compact />
          <span className="hidden font-display text-base font-bold tracking-tight sm:inline">
            StudyFlow <span className="text-gradient-primary">AI</span>
          </span>

          <div className="relative mx-auto w-full max-w-xl">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search notes, assignments, research..."
              aria-label="Search notes, assignments, research"
              className="h-11 w-full rounded-2xl border border-border bg-secondary/50 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:bg-card focus:shadow-elegant"
            />
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/support"
              aria-label="Help center"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary hover:shadow-elegant"
            >
              <LifeBuoy className="h-4 w-4" />
            </Link>
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-primary hover:shadow-elegant"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive" />
            </Link>
            <Link
              to="/profile"
              aria-label="Profile"
              className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
            >
              JS
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <section className="animate-fade-in overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
          <div className="relative flex flex-col items-center gap-6 bg-gradient-hero p-6 sm:p-10 md:flex-row md:justify-between">
            <div className="max-w-xl text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Your workspace</p>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Good Morning 👋
              </h1>
              <p className="mt-2 text-base text-muted-foreground">
                Ready to achieve today's study goals?
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <button className="rounded-xl bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105">
                  Plan my day
                </button>
                <button className="rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                  View progress
                </button>
              </div>
            </div>
            <img
              src={welcomeArt}
              alt="3D illustration of a student studying with an AI assistant"
              width={1024}
              height={768}
              loading="lazy"
              className="w-56 max-w-full drop-shadow-xl sm:w-72 md:w-80"
              style={{ animation: "float 6s ease-in-out infinite" }}
            />
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
            >
              <span
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-glow transition-transform duration-300 group-hover:scale-110",
                  s.tint,
                )}
              >
                <s.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-3xl font-bold tracking-tight">{s.value}</p>
              <p className="text-sm font-medium">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.unit}</p>
            </div>
          ))}
        </section>

        {/* AI Workspace */}
        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Your AI Workspace</h2>
              <p className="mt-1 text-sm text-muted-foreground">Six AI tools built for student life.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((t) => (
              <div
                key={t.title}
                className="group relative rounded-2xl bg-gradient-primary p-px transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 group-hover:border-transparent group-hover:shadow-elegant">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-white shadow-glow transition-transform duration-300 group-hover:-translate-y-1">
                    <t.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{t.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                  <Link
                    to={t.to}
                    className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
                  >
                    Open <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Three panels */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold">Upcoming Deadlines</h3>
            <div className="mt-5 space-y-3">
              {deadlines.map((d) => (
                <div
                  key={d.title}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:shadow-elegant"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{d.title}</p>
                    <p className="text-xs text-muted-foreground">{d.when}</p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                      priorityStyles[d.level],
                    )}
                  >
                    {d.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold">Recent AI Conversations</h3>
            <div className="mt-5 space-y-3">
              {conversations.map((c) => (
                <div
                  key={c.title}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:shadow-elegant"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold">Today's Schedule</h3>
            <ol className="relative mt-5 space-y-5 border-l border-border pl-6">
              {schedule.map((s) => (
                <li key={s.time} className="relative">
                  <span className="absolute -left-[31px] top-1 grid h-3 w-3 place-items-center rounded-full bg-gradient-primary shadow-glow" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{s.time}</p>
                  <p className="text-sm font-medium">{s.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Quick actions */}
        <section>
          <h2 className="font-display text-2xl font-bold tracking-tight">Quick Actions</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((a) => (
              <button
                key={a.label}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                  <a.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">{a.label}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p className="font-medium text-foreground">StudyFlow AI © 2026</p>
          <p className="mt-1">Built for smarter students.</p>
        </div>
      </footer>

      {/* Floating AI assistant */}
      {chatOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-[min(360px,calc(100vw-2.5rem))] animate-scale-in overflow-hidden rounded-2xl border border-border bg-card/95 shadow-elegant backdrop-blur-xl">
          <div className="flex items-center gap-3 bg-gradient-primary px-4 py-3 text-white">
            <Sparkles className="h-4 w-4" />
            <p className="flex-1 text-sm font-semibold">StudyFlow Assistant</p>
            <button onClick={() => setChatOpen(false)} aria-label="Close assistant">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3 p-4">
            <div className="rounded-xl bg-secondary p-3 text-sm text-muted-foreground">
              Hi Jane! I'm your study assistant. AI responses are coming soon — this is a preview panel.
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-2">
              <input
                disabled
                placeholder="Ask me anything..."
                className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"
              />
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-white">
                <Send className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setChatOpen((v) => !v)}
        aria-label="Open AI assistant"
        className="fixed bottom-6 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-white shadow-glow transition-transform hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
        <Sparkles className="relative h-6 w-6" />
      </button>
    </div>
  );
}
