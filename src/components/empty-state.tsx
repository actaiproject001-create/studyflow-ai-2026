import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-elegant sm:p-16">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="mt-6 font-display text-xl font-semibold text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {actionLabel && (
        <Button className="mt-6 bg-gradient-primary text-white shadow-glow hover:opacity-95">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
