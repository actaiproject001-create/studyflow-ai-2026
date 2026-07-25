import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — StudyFlow AI" },
      { name: "description", content: "StudyFlow AI is on a mission to help every student study smarter and stress less." },
      { property: "og:title", content: "About — StudyFlow AI" },
      { property: "og:description", content: "Our mission: help students study smarter and stress less." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">About</span>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          We're building the study companion we wished we had.
        </h1>
        <div className="prose prose-neutral mt-8 max-w-none text-muted-foreground">
          <p className="text-lg leading-relaxed">
            StudyFlow AI started with a simple observation: students juggle too many apps —
            notes here, deadlines there, AI tools everywhere. We're combining the best of them
            into one secure, focused workspace designed for how students actually learn.
          </p>
          <p className="text-lg leading-relaxed">
            Our mission is to make learning less overwhelming and more empowering, using
            responsible AI that respects your privacy.
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
