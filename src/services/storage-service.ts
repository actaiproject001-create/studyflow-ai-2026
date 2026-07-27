import { supabase } from "@/integrations/supabase/client";
import type { StorageBucket } from "@/types";
import { safeFileName, validateUpload } from "@/utils/upload";

export async function uploadUserFile(opts: {
  userId: string;
  bucket: StorageBucket;
  file: File;
  category?: string;
}) {
  const { userId, bucket, file, category } = opts;
  const problem = validateUpload(bucket, file);
  if (problem) throw new Error(problem);

  const path = `${userId}/${Date.now()}-${safeFileName(file.name)}`;
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
  if (uploadError) throw uploadError;

  const { data, error } = await supabase
    .from("uploaded_files")
    .insert({
      user_id: userId,
      bucket,
      path,
      file_name: file.name,
      file_size: file.size,
      mime_type: file.type,
      category: category ?? bucket,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getSignedUrl(bucket: StorageBucket, path: string, expiresIn = 3600) {
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn);
  if (error) throw error;
  return data.signedUrl;
}

export async function listUserFiles(userId: string) {
  const { data, error } = await supabase
    .from("uploaded_files")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}
