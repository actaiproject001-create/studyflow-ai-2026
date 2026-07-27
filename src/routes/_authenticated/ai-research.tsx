import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { EmptyState } from "@/components/empty-state";
import { FlaskConical } from "lucide-react";

export const Route = createFileRoute("/_authenticated/ai-research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — StudyFlow AI" },
      { name: "description", content: "Summarize notes, explain concepts, and answer research questions instantly." },
      { property: "og:title", content: "AI Research Assistant — StudyFlow AI" },
      { property: "og:description", content: "Research faster with an AI that reads with you." },
    ],
  }),
  component: () => (
    <AppLayout
      title="AI Research Assistant"
      description="Summarize notes, explain concepts, and get grounded answers to your research questions."
    >
      <EmptyState
        icon={FlaskConical}
        title="Ready to explore"
        description="Ask a question, upload a PDF, or paste your notes to get instant, cited summaries."
        actionLabel="Start research"
      />
    </AppLayout>
  ),
});
