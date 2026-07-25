import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — StudyFlow AI" },
      { name: "description", content: "Manage your StudyFlow AI profile." },
      { property: "og:title", content: "Profile — StudyFlow AI" },
      { property: "og:description", content: "Your account, your way." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <AppLayout title="Profile" description="Manage your personal information and study preferences.">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
        <div className="flex flex-wrap items-center gap-5">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-2xl font-bold text-white shadow-glow">
            JS
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold">Jane Student</h3>
            <p className="text-sm text-muted-foreground">Computer Science · Year 3</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Full name</label>
            <Input className="mt-1.5" defaultValue="Jane Student" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input className="mt-1.5" type="email" defaultValue="jane@school.edu" />
          </div>
          <div>
            <label className="text-sm font-medium">University</label>
            <Input className="mt-1.5" defaultValue="State University" />
          </div>
          <div>
            <label className="text-sm font-medium">Major</label>
            <Input className="mt-1.5" defaultValue="Computer Science" />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button className="bg-gradient-primary text-white shadow-glow hover:opacity-95">
            Save changes
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
