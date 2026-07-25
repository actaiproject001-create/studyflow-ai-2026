import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing-layout";
import { BookOpen, FlaskConical, CalendarClock, Bell } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — StudyFlow AI" },
      { name: "description", content: "Explore StudyFlow AI features: assignment copilot, research assistant, planner and smart reminders." },
      { property: "og:title", content: "Features — StudyFlow AI" },
      { property: "og:description", content: "The AI toolkit built for modern students." },
    ],
  }),
  component: FeaturesPage,
});

const features = [
  { icon: BookOpen, title: "AI Assignment Copilot", desc: "Understand assignments, generate roadmaps, and break tasks into simple steps." },
  { icon: FlaskConical, title: "AI Research Assistant", desc: "Summarize notes, explain concepts, and answer questions." },
  { icon: CalendarClock, title: "Smart Study Planner", desc: "Generate personalized study schedules using AI." },
  { icon: Bell, title: "Smart Reminders", desc: "Stay updated with intelligent reminders and automation." },
];

function FeaturesPage() {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Features</span>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            An AI toolkit built for students
          </h1>
          <p className="mt-4 text-muted-foreground">
            Everything you need to plan, research, and finish work with confidence.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-elegant">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                <f.icon className="h-5 w-5 text-white" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </MarketingLayout>
  );
}
