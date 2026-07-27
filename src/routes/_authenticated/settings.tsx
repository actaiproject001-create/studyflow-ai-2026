import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppLayout } from "@/components/app-layout";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { fetchSettings, updateSettings } from "@/services/settings-service";
import type { UserSettings, UserSettingsUpdate } from "@/types";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "Settings — StudyFlow AI" },
      { name: "description", content: "Configure your StudyFlow AI experience." },
      { property: "og:title", content: "Settings — StudyFlow AI" },
      { property: "og:description", content: "Customize StudyFlow AI to fit how you study." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

const toggles: { key: keyof UserSettings; label: string; desc: string }[] = [
  { key: "email_notifications", label: "Email notifications", desc: "Deadline and study session reminders" },
  { key: "whatsapp_notifications", label: "WhatsApp reminders", desc: "Get pinged on WhatsApp" },
  { key: "push_notifications", label: "Push notifications", desc: "Browser alerts for urgent items" },
  { key: "study_reminders", label: "Study reminders", desc: "Nudges to keep your streak alive" },
];

function SettingsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings", user?.id],
    queryFn: () => fetchSettings(user!.id),
    enabled: !!user?.id,
  });

  const mutation = useMutation({
    mutationFn: (patch: UserSettingsUpdate) => updateSettings(user!.id, patch),
    onSuccess: (next) => queryClient.setQueryData(["settings", user?.id], next),
  });

  return (
    <AppLayout title="Settings" description="Fine-tune StudyFlow AI to fit how you study.">
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold">Notifications</h3>
          <div className="mt-4 divide-y divide-border">
            {toggles.map((item) => (
              <div key={String(item.key)} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  disabled={isLoading || mutation.isPending}
                  checked={Boolean(settings?.[item.key] ?? false)}
                  onCheckedChange={(checked) => mutation.mutate({ [item.key]: checked })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold">Study preferences</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium" htmlFor="goal">Daily goal (hours)</label>
              <Input
                id="goal"
                className="mt-1.5"
                type="number"
                min={0}
                max={16}
                step={0.5}
                defaultValue={settings?.daily_goal_hours ?? 4}
                key={settings?.daily_goal_hours ?? "goal"}
                onBlur={(e) => mutation.mutate({ daily_goal_hours: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="whatsapp">WhatsApp number</label>
              <Input
                id="whatsapp"
                className="mt-1.5"
                placeholder="+1 555 000 1234"
                defaultValue={settings?.whatsapp_number ?? ""}
                key={settings?.whatsapp_number ?? "wa"}
                onBlur={(e) => mutation.mutate({ whatsapp_number: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
