import { supabase } from "@/integrations/supabase/client";
import type { Assignment, AssignmentInsert, Note, ResearchProject, StudyPlan } from "@/types";

export async function fetchAssignments(userId: string): Promise<Assignment[]> {
  const { data, error } = await supabase
    .from("assignments")
    .select("*")
    .eq("user_id", userId)
    .order("due_date", { ascending: true, nullsFirst: false });
  if (error) throw error;
  return data ?? [];
}

export async function createAssignment(input: AssignmentInsert): Promise<Assignment> {
  const { data, error } = await supabase.from("assignments").insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updateAssignment(id: string, patch: Partial<Assignment>) {
  const { data, error } = await supabase.from("assignments").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteAssignment(id: string) {
  const { error } = await supabase.from("assignments").delete().eq("id", id);
  if (error) throw error;
}

export async function fetchResearchProjects(userId: string): Promise<ResearchProject[]> {
  const { data, error } = await supabase
    .from("research_projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchStudyPlans(userId: string): Promise<StudyPlan[]> {
  const { data, error } = await supabase
    .from("study_plans")
    .select("*")
    .eq("user_id", userId)
    .order("start_date", { ascending: true, nullsFirst: false });
  if (error) throw error;
  return data ?? [];
}

export async function fetchNotes(userId: string): Promise<Note[]> {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
