import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { EmptyState } from "@/components/empty-state";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/ai-copilot")({
  head: () => ({
    meta: [
      { title: "AI Assignment Copilot — StudyFlow AI" },
      { name: "description", content: "Break down assignments into simple, doable steps with your AI copilot." },
      { property: "og:title", content: "AI Assignment Copilot — StudyFlow AI" },
      { property: "og:description", content: "Your always-on assignment sidekick." },
    ],
  }),
  component: () => (
    <AppLayout
      title="AI Assignment Copilot"
      description="Understand assignments, generate roadmaps, and turn overwhelm into a plan."
    >
      <EmptyState
        icon={BookOpen}
        title="Your copilot is warming up"
        description="Paste an assignment brief or drop a file to get a personalized roadmap and step-by-step plan."
        actionLabel="New assignment"
      />
    </AppLayout>
  ),
});
