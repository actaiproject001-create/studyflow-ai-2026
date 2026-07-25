import { Link } from "@tanstack/react-router";
import { GraduationCap, Sparkles } from "lucide-react";

export function Logo({
  compact = false,
  showTagline = false,
}: {
  compact?: boolean;
  showTagline?: boolean;
}) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-primary shadow-glow">
        <GraduationCap className="h-5 w-5 text-white" strokeWidth={2.4} />
        <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 text-[#FFC94D] drop-shadow" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            StudyFlow <span className="text-gradient-primary">AI</span>
          </span>
          {showTagline && (
            <span className="text-[11px] font-medium text-muted-foreground">
              Study Smarter. Stress Less.
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
