import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  FlaskConical,
  CalendarClock,
  Bell,
  MessageCircle,
  Lock,
  ShieldCheck,
  MessagesSquare,
  Check,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudyFlow AI — Study Smarter. Stress Less." },
      {
        name: "description",
        content:
          "All-in-one AI study platform: assignment copilot, research assistant, planner, and smart reminders for university students.",
      },
      { property: "og:title", content: "StudyFlow AI — Study Smarter. Stress Less." },
      {
        property: "og:description",
        content: "The AI-powered study platform students actually love.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: BookOpen,
    title: "AI Assignment Copilot",
    desc: "Understand assignments, generate roadmaps, and break tasks into simple, do-able steps.",
    tint: "from-blue-500/15 to-indigo-500/15",
  },
  {
    icon: FlaskConical,
    title: "AI Research Assistant",
    desc: "Summarize notes, explain complex concepts, and answer research questions instantly.",
    tint: "from-violet-500/15 to-fuchsia-500/15",
  },
  {
    icon: CalendarClock,
    title: "Smart Study Planner",
    desc: "Generate personalized study schedules that adapt to your deadlines and energy.",
    tint: "from-sky-500/15 to-blue-500/15",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    desc: "Stay on track with intelligent reminders and automation — even on WhatsApp.",
    tint: "from-purple-500/15 to-pink-500/15",
  },
];

const floatingCards = [
  { icon: BookOpen, label: "Assignment", tone: "text-blue-600", pos: "top-2 -left-4 sm:-left-8" },
  { icon: FlaskConical, label: "Research", tone: "text-violet-600", pos: "top-24 -right-2 sm:-right-6" },
  { icon: CalendarClock, label: "Study Planner", tone: "text-indigo-600", pos: "bottom-24 -left-6 sm:-left-10" },
  { icon: Sparkles, label: "AI Assistant", tone: "text-fuchsia-600", pos: "bottom-40 -right-2 sm:-right-8" },
  { icon: MessageCircle, label: "WhatsApp Reminder", tone: "text-emerald-600", pos: "bottom-2 left-1/2 -translate-x-1/2" },
];

function Landing() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24 lg:px-8">
          <div className="flex flex-col justify-center animate-fade-in">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Built for the AI-native generation of students
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Stop switching between apps.{" "}
              <span className="text-gradient-primary">Start studying smarter.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              StudyFlow AI combines assignment help, research, study planning, and smart
              reminders into one secure platform designed for university and college students.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-white shadow-glow hover:opacity-95">
                <Link to="/get-started">
                  Get Started <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/features">Learn More</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Free to start", "No credit card", "Private by design"].map((f) => (
                <li key={f} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-square">
              <div className="absolute inset-8 rounded-[2.5rem] bg-gradient-primary opacity-20 blur-3xl" />
              <div className="relative flex h-full items-center justify-center rounded-[2.5rem] border border-border bg-card/70 shadow-elegant backdrop-blur">
                <img
                  src={heroImage}
                  alt="Student using StudyFlow AI"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-contain p-6"
                />
              </div>
              {floatingCards.map((c) => (
                <div
                  key={c.label}
                  className={`absolute ${c.pos} animate-fade-in rounded-2xl border border-border bg-card/95 px-3.5 py-2.5 shadow-elegant backdrop-blur`}
                >
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary">
                      <c.icon className={`h-4 w-4 ${c.tone}`} />
                    </span>
                    <span className="text-xs font-semibold text-foreground">{c.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Features</span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to study, in one place
          </h2>
          <p className="mt-4 text-muted-foreground">
            Four powerful AI tools working together to help you focus on learning, not logistics.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className={`absolute inset-x-0 -top-24 h-40 bg-gradient-to-b ${f.tint} blur-2xl transition-opacity group-hover:opacity-100 opacity-70`} />
              <div className="relative">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                  <f.icon className="h-5 w-5 text-white" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Privacy</span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Your privacy matters
              </h2>
              <p className="mt-4 text-muted-foreground">
                🔒 Your data stays yours. StudyFlow AI is built with privacy and security in mind —
                encrypted end to end, never sold, never shared.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-gradient-primary text-white shadow-glow hover:opacity-95">
                  <Link to="/get-started">Create free account</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/privacy">Read privacy policy</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Lock, title: "Secure Login", desc: "Modern auth with encrypted sessions." },
                { icon: ShieldCheck, title: "Protected Data", desc: "End-to-end encryption at rest." },
                { icon: MessagesSquare, title: "Private AI Chats", desc: "Your conversations are yours." },
              ].map((s) => (
                <div key={s.title} className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                    <s.icon className="h-5 w-5 text-white" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-center text-white shadow-glow sm:p-16">
          <div className="absolute inset-0 opacity-20 [background:radial-gradient(600px_200px_at_50%_0%,white,transparent)]" />
          <h2 className="relative font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to study smarter?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/85">
            Join thousands of students turning chaos into clarity with StudyFlow AI.
          </p>
          <div className="relative mt-8">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/get-started">
                Get Started Free <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
