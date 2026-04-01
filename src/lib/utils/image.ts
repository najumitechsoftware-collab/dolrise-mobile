// src/lib/utils/image.ts

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://api.dolrise.com";

export function resolveImageUrl(url?: string | null) {
  if (!url) return "";

  // Already absolute
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Force backend domain
  return `${API_BASE}${url}`;
}
