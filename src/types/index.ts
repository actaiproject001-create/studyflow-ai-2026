import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles">;
export type ProfileUpdate = TablesUpdate<"profiles">;

export type Assignment = Tables<"assignments">;
export type AssignmentInsert = TablesInsert<"assignments">;

export type ResearchProject = Tables<"research_projects">;
export type StudyPlan = Tables<"study_plans">;
export type Note = Tables<"notes">;
export type Reminder = Tables<"reminders">;
export type HealthLog = Tables<"health_logs">;
export type UploadedFile = Tables<"uploaded_files">;
export type AppNotification = Tables<"notifications">;
export type DashboardStatistic = Tables<"dashboard_statistics">;
export type AiHistory = Tables<"ai_history">;
export type UserSettings = Tables<"settings">;
export type UserSettingsUpdate = TablesUpdate<"settings">;

export type AiTool = "assignment_copilot" | "research_assistant" | "study_planner" | "second_brain";

export type StorageBucket =
  | "avatars"
  | "assignments"
  | "research"
  | "notes"
  | "documents"
  | "voice"
  | "images";

export interface DashboardSummary {
  assignmentsCount: number;
  activeAssignmentsCount: number;
  researchCount: number;
  studyPlansCount: number;
  remindersCount: number;
  filesCount: number;
  notesCount: number;
  studyHoursToday: number;
  productivityScore: number;
  upcomingDeadlines: Assignment[];
  recentActivity: AiHistory[];
  todaySchedule: StudyPlan[];
  profileCompletion: number;
}
