import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { EmptyState } from "@/components/empty-state";
import { CalendarClock } from "lucide-react";

export const Route = createFileRoute("/study-planner")({
  head: () => ({
    meta: [
      { title: "Study Planner — StudyFlow AI" },
      { name: "description", content: "Personalized AI-generated study schedules that adapt to your life." },
      { property: "og:title", content: "Study Planner — StudyFlow AI" },
      { property: "og:description", content: "The planner that plans itself." },
    ],
  }),
  component: () => (
    <AppLayout
      title="Smart Study Planner"
      description="Personalized schedules that adapt to your deadlines, energy, and priorities."
    >
      <EmptyState
        icon={CalendarClock}
        title="Let's build your week"
        description="Add your courses and deadlines — StudyFlow will generate an optimized weekly plan."
        actionLabel="Generate plan"
      />
    </AppLayout>
  ),
});
