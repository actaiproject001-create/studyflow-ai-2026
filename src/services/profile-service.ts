import { supabase } from "@/integrations/supabase/client";
import type { Profile, ProfileUpdate } from "@/types";

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function ensureProfile(userId: string, email?: string | null, fullName?: string | null) {
  const existing = await fetchProfile(userId);
  if (existing) return existing;
  const { data, error } = await supabase
    .from("profiles")
    .insert({ id: userId, email: email ?? null, full_name: fullName ?? null })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, patch: ProfileUpdate): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .update(patch)
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
