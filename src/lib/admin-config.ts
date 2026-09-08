// Allowed admin emails. Configure via VITE_ADMIN_EMAILS (comma-separated)
// in your environment without code edits. Falls back to the default below.
const DEFAULT_ADMIN_EMAILS = ["rstsealed@gmail.com"];

const fromEnv = (import.meta.env.VITE_ADMIN_EMAILS as string | undefined)
  ?.split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const ADMIN_EMAILS: string[] =
  fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_ADMIN_EMAILS.map((e) => e.toLowerCase());

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
