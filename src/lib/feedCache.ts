const PREFIX = "dolrise_feed_cache_v2";
const MAX_POSTS = 50;
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

export function saveFeedCache(
  mode: string,
  posts: any[]
) {
  try {
    const limited = posts.slice(0, MAX_POSTS);

    localStorage.setItem(
      `${PREFIX}_${mode}`,
      JSON.stringify({
        at: Date.now(),
        posts: limited,
      })
    );
  } catch {}
}

export function loadFeedCache(mode: string): any[] {
  try {
    const raw = localStorage.getItem(
      `${PREFIX}_${mode}`
    );
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (
      !parsed.at ||
      Date.now() - parsed.at > CACHE_TTL
    ) {
      return [];
    }

    return Array.isArray(parsed.posts)
      ? parsed.posts
      : [];
  } catch {
    return [];
  }
}
