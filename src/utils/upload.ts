import type { StorageBucket } from "@/types";

export const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20 MB

const ALLOWED: Record<StorageBucket, string[] | null> = {
  // General-purpose per-user bucket: any supported file type is allowed.
  "user-files": null,
  avatars: ["image/png", "image/jpeg", "image/webp", "image/gif"],
  images: ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"],
  voice: ["audio/mpeg", "audio/mp4", "audio/wav", "audio/webm", "audio/ogg"],
  assignments: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "image/png",
    "image/jpeg",
  ],
  research: [
    "application/pdf",
    "text/plain",
    "text/markdown",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  notes: ["application/pdf", "text/plain", "text/markdown"],
  documents: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    "text/csv",
  ],
};

export function validateUpload(bucket: StorageBucket, file: File): string | null {
  if (file.size === 0) return "That file is empty.";
  if (file.size > MAX_FILE_BYTES) return "Files must be smaller than 20 MB.";
  const allowed = ALLOWED[bucket];
  if (allowed && !allowed.includes(file.type)) {
    return "That file type isn't supported here.";
  }
  return null;
}

export function safeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
}
