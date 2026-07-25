import { getApiBaseUrl } from "@/lib/api";

const accessTokenKey = "pfa_admin_access_token";
const userKey = "pfa_admin_user";

type ApiEnvelope<T> = {
  success?: boolean;
  data?: T;
  error?: { message?: string };
};

export function getAdminAccessToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(accessTokenKey);
}

export function setAdminAccessToken(token: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(accessTokenKey, token);
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(accessTokenKey);
  window.localStorage.removeItem(userKey);
}

export function setAdminUser(user: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(userKey, JSON.stringify(user));
}

export function getStoredAdminUser<T>() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(userKey);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function parseResponse<T>(response: Response) {
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.error?.message ?? "Request failed");
  }

  return payload.data as T;
}

async function refreshAdminAccessToken() {
  const response = await fetch(`${getApiBaseUrl()}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  const data = await parseResponse<{ accessToken: string; user: unknown }>(response);
  setAdminAccessToken(data.accessToken);
  setAdminUser(data.user);
  return data.accessToken;
}

async function requestWithAuth<T>(path: string, init?: RequestInit, retry = true): Promise<T> {
  const token = getAdminAccessToken();
  const headers = new Headers(init?.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });

  if (response.status === 401 && retry) {
    try {
      await refreshAdminAccessToken();
      return requestWithAuth<T>(path, init, false);
    } catch {
      clearAdminSession();
      throw new Error("Your admin session has expired. Please sign in again.");
    }
  }

  return parseResponse<T>(response);
}

export function adminGet<T>(path: string) {
  return requestWithAuth<T>(path, { method: "GET" });
}

export function adminPost<T>(path: string, body: unknown) {
  return requestWithAuth<T>(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function adminPatch<T>(path: string, body: unknown) {
  return requestWithAuth<T>(path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function adminDelete<T>(path: string) {
  return requestWithAuth<T>(path, { method: "DELETE" });
}

export async function adminUpload<T>(path: string, formData: FormData) {
  const token = getAdminAccessToken();
  const headers = new Headers();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: "POST",
    headers,
    body: formData,
    credentials: "include",
  });

  if (response.status === 401) {
    try {
      await refreshAdminAccessToken();
      return adminUpload<T>(path, formData);
    } catch {
      clearAdminSession();
      throw new Error("Your admin session has expired. Please sign in again.");
    }
  }

  return parseResponse<T>(response);
}

export async function adminLogout() {
  try {
    await fetch(`${getApiBaseUrl()}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } finally {
    clearAdminSession();
  }
}
