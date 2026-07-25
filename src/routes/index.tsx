import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  FlaskConical,
  CalendarClock,
  MessageCircle,
  Lock,
  ShieldCheck,
  MessagesSquare,
  Check,
  Bell,
  FileText,
  PlayCircle,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { Button } from "@/components/ui/button";
import heroStudent from "@/assets/hero-student.png";
import privacyShield from "@/assets/privacy-shield.png";

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
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

type FloatCard = {
  icon: typeof BookOpen;
  title: string;
  desc: string;
  iconBg: string;
  iconColor: string;
  className: string;
  delay?: string;
};

const floatCards: FloatCard[] = [
  {
    icon: FileText,
    title: "Assignment",
    desc: "Get help, break tasks into simple steps",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    className: "top-[6%] left-[2%] sm:left-[4%] lg:left-0",
  },
  {
    icon: FlaskConical,
    title: "Research",
    desc: "Summarize, explain and research faster",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    className: "top-[6%] right-[2%] sm:right-[4%] lg:right-0",
    delay: "animation-delay-200",
  },
  {
    icon: MessagesSquare,
    title: "AI Assistant",
    desc: "Ask anything. Get instant answers",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    className: "top-[36%] right-[0%] sm:right-[2%] lg:-right-4",
  },
  {
    icon: CalendarClock,
    title: "Study Planner",
    desc: "Personalized plans that fit your goals",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    className: "bottom-[16%] right-[2%] sm:right-[4%] lg:right-0",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Reminder",
    desc: "Get smart reminders and stay on track",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    className: "bottom-[24%] left-[2%] sm:left-[4%] lg:-left-4",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "AI Assignment Copilot",
    desc: "Understand assignments, generate roadmaps, and break tasks into simple steps.",
    tint: "from-indigo-500/15 to-blue-500/15",
  },
  {
    icon: FlaskConical,
    title: "AI Research Assistant",
    desc: "Summarize notes, explain concepts, and answer research questions.",
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
    desc: "Stay updated with intelligent reminders and automation — even on WhatsApp.",
    tint: "from-emerald-500/15 to-teal-500/15",
  },
];

function Landing() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        {/* soft sparkles */}
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_30%,rgba(124,92,255,0.08),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(79,124,255,0.10),transparent_45%)]" />

        <div className="mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:px-8">
          {/* Illustration + floating cards */}
          <div className="relative mx-auto w-full max-w-4xl">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full text-primary/25"
              viewBox="0 0 800 500"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path d="M120,90 C220,140 300,180 380,240" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round" />
              <path d="M680,90 C580,140 500,180 420,240" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round" />
              <path d="M740,220 C620,240 520,260 440,270" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round" />
              <path d="M720,380 C600,360 500,340 430,320" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round" />
              <path d="M80,360 C220,340 320,320 380,300" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round" />
            </svg>

            <div className="relative mx-auto aspect-[5/4] w-full max-w-3xl">
              {/* soft circular glow behind student */}
              <div className="absolute left-1/2 top-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl" />
              <img
                src={heroStudent}
                alt="Student using StudyFlow AI"
                width={1280}
                height={1024}
                className="relative z-10 h-full w-full object-contain"
              />

              {floatCards.map((c) => (
                <div
                  key={c.title}
                  className={`absolute z-20 max-w-[190px] rounded-2xl border border-border/70 bg-card/90 px-3 py-2.5 shadow-elegant backdrop-blur-md animate-fade-in ${c.className} ${c.delay ?? ""}`}
                  style={{ animation: "float 6s ease-in-out infinite" }}
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${c.iconBg}`}>
                      <c.icon className={`h-4.5 w-4.5 ${c.iconColor}`} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold leading-tight text-foreground">{c.title}</p>
                      <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{c.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero text */}
          <div className="mx-auto mt-4 max-w-3xl text-center animate-fade-in">
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Stop Switching Between Apps.
              <br />
              <span className="text-gradient-primary">Start Studying Smarter.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              StudyFlow AI combines assignment help, research, study planning, and smart
              reminders into one secure platform designed for university and college students.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-white shadow-glow hover:opacity-95">
                <Link to="/get-started">
                  Get Started <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/features">
                  <PlayCircle className="mr-1 h-4 w-4" /> Learn More
                </Link>
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Free to start", "No credit card", "Secure & Private"].map((f) => (
                <li key={f} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Powerful AI Tools
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-muted-foreground">
            Four powerful AI tools working together to help you focus on learning, not logistics.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className={`absolute inset-x-0 -top-24 h-40 bg-gradient-to-b ${f.tint} opacity-70 blur-2xl`} />
              <div className="relative">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
                  <f.icon className="h-6 w-6 text-white" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl" />
              <img
                src={privacyShield}
                alt="Privacy shield with lock"
                width={1024}
                height={1024}
                loading="lazy"
                className="relative h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Privacy First</span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Your Privacy Matters
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                🔒 Your data stays yours. StudyFlow AI is built with privacy and security in mind.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Lock, title: "Secure Login", desc: "Modern authentication with encrypted sessions.", bg: "bg-blue-100", color: "text-blue-600" },
                  { icon: ShieldCheck, title: "Protected Data", desc: "End-to-end encryption and industry standard security.", bg: "bg-violet-100", color: "text-violet-600" },
                  { icon: MessagesSquare, title: "Private AI Chats", desc: "Your conversations are private and never shared.", bg: "bg-emerald-100", color: "text-emerald-600" },
                ].map((s) => (
                  <div key={s.title} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <span className={`grid h-10 w-10 place-items-center rounded-xl ${s.bg}`}>
                      <s.icon className={`h-5 w-5 ${s.color}`} />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
