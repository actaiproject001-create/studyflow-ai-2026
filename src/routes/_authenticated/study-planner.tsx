import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarClock } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { EmptyState } from "@/components/empty-state";
import { AiAssistantPanel } from "@/components/ai-assistant-panel";
import { useAuth } from "@/contexts/auth-context";
import { fetchAssignments, fetchStudyPlans } from "@/services/study-service";
import { dueLabel } from "@/utils/format";

export const Route = createFileRoute("/_authenticated/study-planner")({
  head: () => ({
    meta: [
      { title: "Smart Study Planner — StudyFlow AI" },
      { name: "description", content: "Generate personalized, realistic study schedules with AI." },
      { property: "og:title", content: "Smart Study Planner — StudyFlow AI" },
      { property: "og:description", content: "A study plan that fits your real life." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const { user } = useAuth();

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["study-plans", user?.id],
    queryFn: () => fetchStudyPlans(user!.id),
    enabled: !!user?.id,
  });

  const { data: assignments = [] } = useQuery({
    queryKey: ["assignments", user?.id],
    queryFn: () => fetchAssignments(user!.id),
    enabled: !!user?.id,
  });

  return (
    <AppLayout
      title="Smart Study Planner"
      description="Turn deadlines and goals into a realistic week-by-week study schedule."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          {!isLoading && plans.length === 0 ? (
            <EmptyState
              icon={CalendarClock}
              title="No study plans yet"
              description="Tell the planner your goals, deadlines and free hours to generate a schedule."
            />
          ) : (
            plans.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {[p.subject, dueLabel(p.start_date)].filter(Boolean).join(" · ")}
                </p>
                {p.goal && <p className="mt-3 text-sm text-muted-foreground">{p.goal}</p>}
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="bg-gradient-primary px-4 py-3 text-sm font-semibold text-white">
              Study Planner
            </div>
            <AiAssistantPanel
              tool="study_planner"
              placeholder="I have 10 hours this week..."
              context={
                assignments.length
                  ? `Upcoming assignments: ${assignments
                      .map((a) => `${a.title}${a.due_date ? ` (due ${a.due_date})` : ""}`)
                      .join("; ")}`
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
