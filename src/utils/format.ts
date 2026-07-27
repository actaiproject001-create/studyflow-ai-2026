export function initialsFrom(name?: string | null, email?: string | null): string {
  const source = (name ?? "").trim() || (email ?? "").split("@")[0] || "";
  if (!source) return "ST";
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function greeting(date = new Date()): string {
  const h = date.getHours();
  if (h < 12) return "Good Morning";
  if (h < 18) return "Good Afternoon";
  return "Good Evening";
}

export function relativeTime(value?: string | null): string {
  if (!value) return "";
  const diff = Date.now() - new Date(value).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  return new Date(value).toLocaleDateString();
}

export function dueLabel(value?: string | null): string {
  if (!value) return "No due date";
  const due = new Date(value);
  const today = new Date();
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((startOfDay(due) - startOfDay(today)) / 86_400_000);
  if (days < 0) return "Overdue";
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days < 7) return due.toLocaleDateString(undefined, { weekday: "long" });
  return due.toLocaleDateString();
}

export function timeLabel(value?: string | null): string {
  if (!value) return "";
  return new Date(value).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

const PROFILE_FIELDS = [
  "full_name",
  "email",
  "avatar_url",
  "university",
  "degree",
  "semester",
  "phone",
  "timezone",
  "bio",
] as const;

export function profileCompletion(profile: Record<string, unknown> | null | undefined): number {
  if (!profile) return 0;
  const filled = PROFILE_FIELDS.filter((f) => {
    const v = profile[f];
    return typeof v === "string" && v.trim().length > 0;
  }).length;
  return Math.round((filled / PROFILE_FIELDS.length) * 100);
}
