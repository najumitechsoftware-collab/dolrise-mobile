"use client";
import "./FeedList.css";
import {
  useEffect,
  useRef,
  useState,
  startTransition,
  useCallback,
} from "react";

import { predictivePreloadTab } from "@/lib/predictiveFeed";
import { getMemoryFeed, setMemoryFeed } from "@/lib/instantFeedMemory";
import { saveFeedCache, loadFeedCache } from "@/lib/feedCache";
import EmotionalShell from "./shell/EmotionalShell";
import FeedItem from "./FeedItem/FeedItem";
import FeedMoodPrompt from "./FeedMoodPrompt";
import { useFeedMoodPrompt } from "../hooks/useFeedMoodPrompt";

const BATCH_SIZE = 25;
const MAX_DOM_POSTS = 150;

/* 🔥 unified threshold (no double trigger) */
const SCROLL_TRIGGER_THRESHOLD = 0.75;

const MIN_BUFFER = 10;

interface FeedListProps {
  activeTab: "flow" | "moments" | "space" | "notes" | string;
  targetPostId?: string | null;
}

export default function FeedList({
  activeTab,
  targetPostId,
}: FeedListProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [hasHydrated, setHasHydrated] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const seenPostIdsRef = useRef<Set<number>>(new Set());
  const requestIdRef = useRef(0);

  /* 🔥 new refs for smooth scroll */
  const tickingRef = useRef(false);
  const loadingLockRef = useRef(false);

  const { shouldShow, onSelectMood, onSkip } = useFeedMoodPrompt();

  const tabToMode: Record<string, "flow" | "moments" | "space" | "notes"> = {
    flow: "flow",
    moments: "moments",
    space: "space",
    notes: "notes",
  };

  const mode = tabToMode[activeTab] || "flow";

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const resetFeedState = () => {
    setCursor(null);
    setHasMore(true);
    seenPostIdsRef.current.clear();
    requestIdRef.current++;
  };

  const insertWithoutShift = (updater: (prev: any[]) => any[]) => {
    startTransition(() => {
      setPosts((prev) => {
        let next = updater(prev);

        if (next.length > MAX_DOM_POSTS) {
          next = next.slice(next.length - MAX_DOM_POSTS);
        }

        saveFeedCache(mode, next);
        setMemoryFeed(mode, next);
        return next;
      });
    });
  };

  const loadFeed = useCallback(
    async (forceFresh = false) => {
      if (fetching || loadingLockRef.current) return;
      if (!forceFresh && !hasMore) return;

      loadingLockRef.current = true;

      if (forceFresh) {
        resetFeedState();
      }

      const requestId = ++requestIdRef.current;
      setFetching(true);

      try {
        const query = new URLSearchParams();
        query.set("mode", mode);
        query.set("limit", BATCH_SIZE.toString());

        if (!forceFresh && cursor) {
          query.set("cursor", cursor);
        }

        const res = await fetch(`/api/feed/lumi?${query.toString()}`, {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) throw new Error();

        const data = await res.json();

        const incomingRaw = Array.isArray(data?.feed) ? data.feed : [];
        const apiNextCursor =
          typeof data?.nextCursor === "string" ? data.nextCursor : null;

        const incoming = incomingRaw.filter(
          (p: any) => !seenPostIdsRef.current.has(p.id)
        );

        if (requestId === requestIdRef.current) {
          incoming.forEach((p: any) =>
            seenPostIdsRef.current.add(p.id)
          );

          insertWithoutShift((prev) =>
            forceFresh ? incoming : [...prev, ...incoming]
          );

          if (apiNextCursor) {
            setCursor(apiNextCursor);
            setHasMore(true);
          } else {
            setHasMore(false);
          }
        }
      } catch (e) {
        console.error("Feed error:", e);
      } finally {
        if (requestId === requestIdRef.current) {
          setFetching(false);
          loadingLockRef.current = false;
        }
      }
    },
    [mode, cursor, fetching, hasMore]
  );

  useEffect(() => {
    resetFeedState();

    const memory = getMemoryFeed(mode);

    if (memory?.length) {
      setPosts(memory);
    } else {
      const cached = loadFeedCache(mode);
      if (cached?.length) {
        setPosts(cached);
        setMemoryFeed(mode, cached);
      }
    }

    loadFeed(true);
  }, []);

  useEffect(() => {
    resetFeedState();

    const memory = getMemoryFeed(mode);

    if (memory?.length) {
      setPosts(memory);
    } else {
      const cached = loadFeedCache(mode);
      if (cached?.length) {
        setPosts(cached);
        setMemoryFeed(mode, cached);
      } else {
        setPosts([]);
      }
    }

    loadFeed(true);

    predictivePreloadTab("flow");
    predictivePreloadTab("moments");
    predictivePreloadTab("space");
  }, [mode, targetPostId]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;

      requestAnimationFrame(() => {
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        const progress = (scrollTop + clientHeight) / scrollHeight;

        if (
          progress > SCROLL_TRIGGER_THRESHOLD &&
          hasMore &&
          !fetching &&
          !loadingLockRef.current
        ) {
          loadFeed(false);
        }

        tickingRef.current = false;
      });
    };

    container.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [fetching, hasMore, loadFeed]);

  useEffect(() => {
    if (posts.length < MIN_BUFFER && hasMore && !fetching) {
      loadFeed(false);
    }
  }, [posts.length, hasMore, fetching, loadFeed]);

  return (
    <div ref={scrollContainerRef} className="feed-list-wrapper">
      {shouldShow && (
        <FeedMoodPrompt
          onSelectMood={onSelectMood}
          onSkip={onSkip}
        />
      )}

      {(!hasHydrated || (posts.length === 0 && fetching)) && (
        <EmotionalShell />
      )}

      {posts.map((post, index) => (
        <div
          key={post.id}
          data-id={post.id}
          className="feed-item-wrap"
        >
          <FeedItem
            post={post}
            index={index}
            allPosts={posts}
            onFlowGlobal={() => {}}
          />
        </div>
      ))}
    </div>
  );
}
