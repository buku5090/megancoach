export const ADMIN_EMAILS = ["paulaghcoach@gmail.com"];

export function isAdmin(user) {
  return !!(user && ADMIN_EMAILS.includes((user.email || "").toLowerCase()));
}
