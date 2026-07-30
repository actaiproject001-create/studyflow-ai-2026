/** Turns raw backend/auth errors into clear, user-friendly messages. */
const MAP: Array<[RegExp, string]> = [
  [/invalid login credentials/i, "That email or password doesn't match an account."],
  [/email not confirmed/i, "Please confirm your email address first — check your inbox."],
  [/user already registered|already been registered/i, "An account with this email already exists. Try signing in."],
  [/password should be at least/i, "Your password needs to be at least 6 characters."],
  [/pwned|compromised/i, "That password has appeared in a data breach. Please choose a different one."],
  [/rate limit|too many requests/i, "Too many attempts. Please wait a moment and try again."],
  [/unable to validate email|invalid email/i, "Please enter a valid email address."],
  [/network|fetch failed|failed to fetch/i, "We couldn't reach the server. Check your connection and try again."],
  [/jwt|token|session/i, "Your session expired. Please sign in again."],
  [/row-level security|permission denied|not authorized/i, "You don't have access to that item."],
  [/duplicate key|already exists/i, "That already exists."],
  [/exceeded the maximum allowed size|payload too large/i, "That file is too large."],
  [/bucket not found/i, "File storage isn't available right now. Please try again later."],
];

export function friendlyError(error: unknown, fallback = "Something went wrong. Please try again."): string {
  const raw =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : (error as { message?: string } | null)?.message ?? "";
  if (!raw) return fallback;
  for (const [pattern, message] of MAP) if (pattern.test(raw)) return message;
  return raw.length > 160 ? fallback : raw;
}

export class FriendlyError extends Error {
  constructor(error: unknown, fallback?: string) {
    super(friendlyError(error, fallback));
    this.name = "FriendlyError";
  }
}
