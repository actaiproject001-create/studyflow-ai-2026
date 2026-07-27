import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { AppLayout } from "@/components/app-layout";
import { EmptyState } from "@/components/empty-state";
import { useAuth } from "@/contexts/auth-context";
import { fetchNotifications, fetchReminders, markNotificationRead } from "@/services/notification-service";
import { cn } from "@/lib/utils";
import { relativeTime } from "@/utils/format";

export const Route = createFileRoute("/_authenticated/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — StudyFlow AI" },
      { name: "description", content: "Smart reminders and updates from StudyFlow AI." },
      { property: "og:title", content: "Notifications — StudyFlow AI" },
      { property: "og:description", content: "Stay on top of what matters." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => fetchNotifications(user!.id),
    enabled: !!user?.id,
  });

  const { data: reminders = [] } = useQuery({
    queryKey: ["reminders", user?.id],
    queryFn: () => fetchReminders(user!.id),
    enabled: !!user?.id,
  });

  const markRead = useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] }),
  });

  return (
    <AppLayout
      title="Notifications"
      description="Smart reminders, deadline nudges and study insights — all in one place."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <h3 className="font-display text-lg font-semibold">Recent</h3>
          {!isLoading && notifications.length === 0 ? (
            <EmptyState
              icon={Bell}
              title="You're all caught up"
              description="Deadline nudges and study reminders will show up here."
            />
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => !n.is_read && markRead.mutate(n.id)}
                className={cn(
                  "w-full rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-elegant",
                  !n.is_read && "border-primary/40",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-semibold">{n.title}</p>
                  {!n.is_read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </div>
                {n.body && <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>}
                <p className="mt-2 text-xs text-muted-foreground">{relativeTime(n.created_at)}</p>
              </button>
            ))
          )}
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-lg font-semibold">Scheduled reminders</h3>
          {reminders.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No reminders scheduled yet.
            </p>
          ) : (
            reminders.map((r) => (
              <div key={r.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-sm font-semibold">{r.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(r.remind_at).toLocaleString()} · {r.channel}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
}
