import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — StudyFlow AI" },
      { name: "description", content: "How StudyFlow AI protects your data and privacy." },
      { property: "og:title", content: "Privacy Policy — StudyFlow AI" },
      { property: "og:description", content: "Your data stays yours." },
    ],
  }),
  component: () => (
    <MarketingLayout>
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Legal</span>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-6 text-muted-foreground">
          🔒 Your data stays yours. StudyFlow AI is built with privacy and security in mind.
          This is a placeholder for the full privacy policy — coming soon.
        </p>
      </section>
    </MarketingLayout>
  ),
});
