import { supabase } from "@/integrations/supabase/client";
import type { UserSettings, UserSettingsUpdate } from "@/types";

export async function fetchSettings(userId: string): Promise<UserSettings | null> {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  if (data) return data;

  const { data: created, error: insertError } = await supabase
    .from("settings")
    .insert({ user_id: userId })
    .select()
    .single();
  if (insertError) throw insertError;
  return created;
}

export async function updateSettings(userId: string, patch: UserSettingsUpdate): Promise<UserSettings> {
  const { data, error } = await supabase
    .from("settings")
    .update(patch)
    .eq("user_id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
