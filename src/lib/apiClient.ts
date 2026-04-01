const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.dolrise.com";

type FetchOptions = RequestInit & {
  timeoutMs?: number;
};

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeoutMs = 8000, ...rest } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // 🔥 GET TOKEN FROM LOCAL STORAGE
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    const res = await fetch(`${API_BASE}${path}`, {
      ...rest,
      credentials: "include", // ✅ cookie
      signal: controller.signal,

      headers: {
        "Content-Type": "application/json",

        // 🔥 ADD TOKEN (VERY IMPORTANT)
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),

        ...(rest.headers || {}),
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return (await res.json()) as T;
  } finally {
    clearTimeout(id);
  }
}
