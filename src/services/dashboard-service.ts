import { supabase } from "@/integrations/supabase/client";
import type { DashboardSummary } from "@/types";
import { profileCompletion } from "@/utils/format";

export async function fetchDashboardSummary(userId: string): Promise<DashboardSummary> {
  const today = new Date().toISOString().slice(0, 10);

  const [
    assignments,
    activeAssignments,
    research,
    plans,
    reminders,
    files,
    notes,
    stats,
    deadlines,
    activity,
    schedule,
    profile,
  ] = await Promise.all([
    supabase.from("assignments").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase
      .from("assignments")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .neq("status", "done"),
    supabase.from("research_projects").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase.from("study_plans").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase
      .from("reminders")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_completed", false),
    supabase.from("uploaded_files").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase.from("notes").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase
      .from("dashboard_statistics")
      .select("*")
      .eq("user_id", userId)
      .eq("stat_date", today)
      .maybeSingle(),
    supabase
      .from("assignments")
      .select("*")
      .eq("user_id", userId)
      .neq("status", "done")
      .not("due_date", "is", null)
      .order("due_date", { ascending: true })
      .limit(5),
    supabase
      .from("ai_history")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("study_plans")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("start_date", { ascending: true })
      .limit(5),
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
  ]);

  return {
    assignmentsCount: assignments.count ?? 0,
    activeAssignmentsCount: activeAssignments.count ?? 0,
    researchCount: research.count ?? 0,
    studyPlansCount: plans.count ?? 0,
    remindersCount: reminders.count ?? 0,
    filesCount: files.count ?? 0,
    notesCount: notes.count ?? 0,
    studyHoursToday: Number(stats.data?.study_hours ?? 0),
    productivityScore: stats.data?.productivity_score ?? 0,
    upcomingDeadlines: deadlines.data ?? [],
    recentActivity: activity.data ?? [],
    todaySchedule: schedule.data ?? [],
    profileCompletion: profileCompletion(profile.data),
  };
}
