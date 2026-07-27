import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FlaskConical } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { EmptyState } from "@/components/empty-state";
import { AiAssistantPanel } from "@/components/ai-assistant-panel";
import { useAuth } from "@/contexts/auth-context";
import { fetchResearchProjects } from "@/services/study-service";
import { relativeTime } from "@/utils/format";

export const Route = createFileRoute("/_authenticated/ai-research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — StudyFlow AI" },
      { name: "description", content: "Summarize sources, explain concepts and explore research topics with AI." },
      { property: "og:title", content: "AI Research Assistant — StudyFlow AI" },
      { property: "og:description", content: "Research faster, understand deeper." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const { user } = useAuth();
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["research", user?.id],
    queryFn: () => fetchResearchProjects(user!.id),
    enabled: !!user?.id,
  });

  return (
    <AppLayout
      title="AI Research Assistant"
      description="Summarize sources, explain hard concepts, and explore any topic in depth."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          {!isLoading && projects.length === 0 ? (
            <EmptyState
              icon={FlaskConical}
              title="No research projects yet"
              description="Ask the assistant a research question to get started — your history is saved automatically."
            />
          ) : (
            projects.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {[p.topic, relativeTime(p.updated_at)].filter(Boolean).join(" · ")}
                </p>
                {p.summary && (
                  <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{p.summary}</p>
                )}
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="bg-gradient-primary px-4 py-3 text-sm font-semibold text-white">
              Research Assistant
            </div>
            <AiAssistantPanel tool="research_assistant" placeholder="Ask a research question..." />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
