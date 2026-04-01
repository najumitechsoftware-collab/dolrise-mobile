const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://api.dolrise.com";

export async function fetchWithAuth(
  path: string,
  options: RequestInit = {}
) {
  const isFullUrl = path.startsWith("http");

  const url = isFullUrl ? path : `${API_BASE}${path}`;

  return fetch(url, {
    credentials: "include", // 🔥 ALWAYS INCLUDE COOKIE
    ...options,
  });
}
