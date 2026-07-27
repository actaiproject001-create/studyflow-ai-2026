import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { updateProfile } from "@/services/profile-service";
import { initialsFrom, profileCompletion } from "@/utils/format";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profile — StudyFlow AI" },
      { name: "description", content: "Manage your StudyFlow AI profile." },
      { property: "og:title", content: "Profile — StudyFlow AI" },
      { property: "og:description", content: "Your account, your way." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    full_name: "",
    university: "",
    degree: "",
    semester: "",
    phone: "",
    bio: "",
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    setForm({
      full_name: profile.full_name ?? "",
      university: profile.university ?? "",
      degree: profile.degree ?? "",
      semester: profile.semester ?? "",
      phone: profile.phone ?? "",
      bio: profile.bio ?? "",
    });
  }, [profile]);

  const mutation = useMutation({
    mutationFn: () => updateProfile(user!.id, form),
    onSuccess: async () => {
      setSaved(true);
      setError(null);
      await refreshProfile();
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setTimeout(() => setSaved(false), 2500);
    },
    onError: (err: unknown) =>
      setError(err instanceof Error ? err.message : "Could not save your profile."),
  });

  const completion = profileCompletion({ ...profile, ...form });
  const email = profile?.email ?? user?.email ?? "";

  function field(key: keyof typeof form) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  return (
    <AppLayout title="Profile" description="Manage your personal information and study preferences.">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
        <div className="flex flex-wrap items-center gap-5">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-2xl font-bold text-white shadow-glow">
            {initialsFrom(form.full_name || profile?.full_name, email)}
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold">{form.full_name || "Your name"}</h3>
            <p className="text-sm text-muted-foreground">
              {[form.degree, form.semester].filter(Boolean).join(" · ") || email}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 w-40 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-gradient-primary" style={{ width: `${completion}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{completion}% complete</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium" htmlFor="full_name">Full name</label>
            <Input id="full_name" className="mt-1.5" {...field("full_name")} />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <Input id="email" className="mt-1.5" type="email" value={email} disabled />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="university">University</label>
            <Input id="university" className="mt-1.5" {...field("university")} />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="degree">Degree / Major</label>
            <Input id="degree" className="mt-1.5" {...field("degree")} />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="semester">Semester / Year</label>
            <Input id="semester" className="mt-1.5" {...field("semester")} />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="phone">Phone (WhatsApp)</label>
            <Input id="phone" className="mt-1.5" {...field("phone")} placeholder="+1 555 000 1234" />
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-6 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-8 flex items-center justify-end gap-3">
          {saved && <span className="text-sm text-primary">Saved</span>}
          <Button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || !user}
            className="bg-gradient-primary text-white shadow-glow hover:opacity-95"
          >
            {mutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
