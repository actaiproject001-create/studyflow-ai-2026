import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { EmptyState } from "@/components/empty-state";
import { LifeBuoy } from "lucide-react";

export const Route = createFileRoute("/_authenticated/support")({
  head: () => ({
    meta: [
      { title: "Support — StudyFlow AI" },
      { name: "description", content: "Get help from the StudyFlow AI team." },
      { property: "og:title", content: "Support — StudyFlow AI" },
      { property: "og:description", content: "We're here to help." },
    ],
  }),
  component: () => (
    <AppLayout title="Support" description="We're here to help — 24/7.">
      <EmptyState
        icon={LifeBuoy}
        title="How can we help?"
        description="Browse the help center or start a chat with our team. We usually reply within an hour."
        actionLabel="Contact support"
      />
    </AppLayout>
  ),
});
