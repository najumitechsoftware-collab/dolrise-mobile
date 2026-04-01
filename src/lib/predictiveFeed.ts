const BATCH_SIZE = 30;

/* ===============================
   TAB WARM CACHE
================================ */

const warmedTabs = new Set<string>();

export async function predictivePreloadTab(
  tab: "flow" | "moments" | "space" | "notes"
) {
  try {
    if (warmedTabs.has(tab)) return;
    warmedTabs.add(tab);

    const query = new URLSearchParams();
    query.set("mode", tab);
    query.set("limit", BATCH_SIZE.toString());

    const res = await fetch(
      `/api/feed/lumi?${query.toString()}`,
      { credentials: "include", cache: "no-store" }
    );

    if (!res.ok) return;

    const data = await res.json();
    if (!Array.isArray(data?.feed)) return;

    const { saveFeedCache } = await import(
      "@/lib/feedCache"
    );

    saveFeedCache(tab, data.feed);
  } catch {}
}

/* ===============================
   CURSOR MULTI-LAYER ENGINE
================================ */

interface CursorBuffer {
  [key: string]: any[];
}

const pageBuffer: CursorBuffer = {};

export function getBufferedPage(
  key: string
): any[] | null {
  if (!pageBuffer[key]) return null;

  const data = pageBuffer[key];
  delete pageBuffer[key];
  return data;
}

/* ======================================
   STRING CURSOR VERSION (created_at)
====================================== */

export async function predictivePreloadCursor(
  mode: string,
  cursor: string,
  depth: number = 1
) {
  try {
    if (!cursor) return;

    const key = `${mode}-${cursor}`;

    if (pageBuffer[key]) return;

    const query = new URLSearchParams();
    query.set("mode", mode);
    query.set("limit", BATCH_SIZE.toString());
    query.set("cursor", cursor);

    const res = await fetch(
      `/api/feed/lumi?${query.toString()}`,
      { credentials: "include", cache: "no-store" }
    );

    if (!res.ok) return;

    const data = await res.json();
    if (!Array.isArray(data?.feed)) return;

    pageBuffer[key] = data.feed;

    /* ------------------------------
       Deep Preload using nextCursor
    ------------------------------ */
    if (
      depth > 1 &&
      typeof data?.nextCursor === "string"
    ) {
      await predictivePreloadCursor(
        mode,
        data.nextCursor,
        depth - 1
      );
    }
  } catch {}
}
