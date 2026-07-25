import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — StudyFlow AI" },
      { name: "description", content: "Configure your StudyFlow AI experience." },
      { property: "og:title", content: "Settings — StudyFlow AI" },
      { property: "og:description", content: "Customize StudyFlow AI to fit how you study." },
    ],
  }),
  component: SettingsPage,
});

const sections = [
  {
    title: "Notifications",
    items: [
      { label: "Email reminders", desc: "Deadline and study session reminders", on: true },
      { label: "WhatsApp reminders", desc: "Get pinged on WhatsApp", on: true },
      { label: "Weekly digest", desc: "A summary of your study week", on: false },
    ],
  },
  {
    title: "Privacy",
    items: [
      { label: "Private AI conversations", desc: "Never used for training", on: true },
      { label: "Anonymous usage analytics", desc: "Help us improve StudyFlow", on: false },
    ],
  },
];

function SettingsPage() {
  return (
    <AppLayout title="Settings" description="Fine-tune StudyFlow AI to fit how you study.">
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-display text-lg font-semibold">{section.title}</h3>
            <div className="mt-4 divide-y divide-border">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.on} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
