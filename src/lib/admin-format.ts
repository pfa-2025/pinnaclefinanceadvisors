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
  return value.split("\n");
}

export function sanitizeArrayInput(values: string[]) {
  return values.map((item) => item.trim()).filter(Boolean);
}

export function formatJsonInput(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function parseJsonInput(value: string) {
  return JSON.parse(value);
}

export function normalizeImageUrl(value: string) {
  const trimmed = value.trim();

  const driveFileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveFileMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveFileMatch[1]}`;
  }

  const driveOpenMatch = trimmed.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (driveOpenMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveOpenMatch[1]}`;
  }

  return trimmed;
}

export function getInitials(name?: string | null, fallback = "AD") {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const initials = parts.map((part) => part.charAt(0).toUpperCase()).join("");
  return initials || fallback;
}
