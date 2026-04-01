"use client";

import { useEffect, useState } from "react";
import PostsSection from "./sections/PostsSection";
import UsersSection from "./sections/UsersSection";

let debounceTimer: any = null;

export default function SearchResults({
  query,
  onSelect,
}: {
  query: string;
  onSelect: () => void;
}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setData(null);
      return;
    }

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.dolrise.com/api/search?q=${encodeURIComponent(query)}`,
          { credentials: "include" },
        );
        const json = await res.json();
        setData(json);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }, 350);
  }, [query]);

  if (!query) return null;

  if (loading) {
    return <div className="search-loading">Searching…</div>;
  }

  if (!data) {
    return <div className="search-empty">No results</div>;
  }

  return (
    <div className="search-results">
      <UsersSection users={data.users} onSelect={onSelect} />
      <PostsSection posts={data.posts} onSelect={onSelect} />
    </div>
  );
}
