import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { EmptyState } from "@/components/empty-state";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — StudyFlow AI" },
      { name: "description", content: "Smart reminders and updates from StudyFlow AI." },
      { property: "og:title", content: "Notifications — StudyFlow AI" },
      { property: "og:description", content: "Stay on top of what matters." },
    ],
  }),
  component: () => (
    <AppLayout
      title="Notifications"
      description="Smart reminders, deadline nudges, and study insights — all in one inbox."
    >
      <EmptyState
        icon={Bell}
        title="You're all caught up"
        description="New reminders and updates will show up here as soon as they arrive."
      />
    </AppLayout>
  ),
});
