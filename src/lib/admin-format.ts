export function formatAdminDate(value?: string | Date | null) {
  if (!value) return "N/A";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function formatArrayInput(values: string[]) {
  return values.join("\n");
}

export function parseArrayInput(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatJsonInput(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function parseJsonInput(value: string) {
  return JSON.parse(value);
}

export function getInitials(name?: string | null, fallback = "AD") {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const initials = parts.map((part) => part.charAt(0).toUpperCase()).join("");
  return initials || fallback;
}
