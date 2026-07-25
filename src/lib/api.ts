const defaultApiBaseUrl = "http://localhost:4000/api/v1";

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? defaultApiBaseUrl;
}

export async function postJson<TResponse>(path: string, body: unknown, options?: RequestInit) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    credentials: "include",
    ...options,
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => null)) as
    | { success?: boolean; data?: TResponse; error?: { message?: string } }
    | null;

  if (!response.ok || !payload?.success) {
    throw new Error(payload?.error?.message ?? "Request failed");
  }

  return payload.data as TResponse;
}
