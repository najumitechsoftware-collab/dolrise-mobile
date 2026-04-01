"use client";

import { useRouter, useSearchParams } from "next/navigation";
import "./search.css";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import LumiAnswerCard from "./components/LumiAnswerCard";
import RisingSearches from "./components/RisingSearches";
import SearchSuggestions from "./components/SearchSuggestions";

/* ======================================================
   TYPES
====================================================== */

type UserResult = {
  id: number;
  username: string;
  full_name: string;
  avatar_url?: string | null;
  emotional_identity?: string | null;
};

type PostResult = {
  id: number;
  content: string;
  feels_count: number;
  reflects_count: number;
  reecho_count: number;
  author: {
    id: number;
    username: string;
    avatar_url?: string | null;
  };
};

/* ======================================================
   COMPONENT
====================================================== */

export default function SearchClient() {
  const router = useRouter();
  const params = useSearchParams();

  const initialQ = params.get("q") || "";

  const [query, setQuery] = useState(initialQ);

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserResult[]>([]);
  const [posts, setPosts] = useState<PostResult[]>([]);

  /* 🤖 LUMI */
  const [lumiLoading, setLumiLoading] = useState(false);
  const [lumiAnswer, setLumiAnswer] = useState<string | undefined>();

  /* ⚡ SUGGESTIONS */
  const [suggestions, setSuggestions] = useState<any>(null);

  /* ⌨️ Keyboard navigation */
  const [activeIndex, setActiveIndex] = useState(-1);

  const flatResults = useMemo(
    () => [
      ...users.map((u) => ({ type: "user" as const, data: u })),
      ...posts.map((p) => ({ type: "post" as const, data: p })),
    ],
    [users, posts],
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  /* ======================================================
     AUTO FOCUS
  ====================================================== */

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* ======================================================
     ⚡ FETCH SUGGESTIONS (DEBOUNCE)
  ====================================================== */

  useEffect(() => {
    if (!query) {
      setSuggestions(null);
      return;
    }

    const delay = setTimeout(() => {
      fetch(
        `https://api.dolrise.com/api/search/suggestions?q=${encodeURIComponent(
          query,
        )}`,
        { credentials: "include" },
      )
        .then((r) => r.json())
        .then((data) => {
          setSuggestions(data);
        })
        .catch(() => {
          setSuggestions(null);
        });
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  /* ======================================================
     🔎 FETCH SEARCH + LUMI
  ====================================================== */

  useEffect(() => {
    if (!query) {
      setUsers([]);
      setPosts([]);
      setLumiAnswer(undefined);
      return;
    }

    let active = true;

    setLoading(true);
    setActiveIndex(-1);

    /* 🔎 SEARCH */
    fetch(
      `https://api.dolrise.com/api/search?q=${encodeURIComponent(query)}`,
      { credentials: "include" },
    )
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        setUsers(data.users || []);
        setPosts(data.posts || []);
      })
      .catch(() => {
        if (!active) return;
        setUsers([]);
        setPosts([]);
      })
      .finally(() => active && setLoading(false));

    /* 🤖 LUMI */
    setLumiLoading(true);

    fetch(
      `https://api.dolrise.com/api/search/lumi?q=${encodeURIComponent(query)}`,
      { credentials: "include" },
    )
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        setLumiAnswer(d?.answer);
      })
      .catch(() => {})
      .finally(() => active && setLumiLoading(false));

    return () => {
      active = false;
    };
  }, [query]);

  /* ======================================================
     SELECT SUGGESTION
  ====================================================== */

  function handleSelect(value: string) {
    setQuery(value);
    router.replace(`/search?q=${encodeURIComponent(value)}`);
    setSuggestions(null);
  }

  /* ======================================================
     KEYBOARD NAVIGATION
  ====================================================== */

  function onKeyDown(e: React.KeyboardEvent) {
    if (!flatResults.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) =>
        Math.min(i + 1, flatResults.length - 1),
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      const item = flatResults[activeIndex];

      if (item.type === "user") {
        router.push(`/profile/${item.data.username}`);
      } else {
        router.push(`/reflect/${item.data.id}`);
      }
    }
  }

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div className="search-page">
      {/* ===============================
          TOP SEARCH AREA
      =============================== */}
      <div className="search-hero">
        <div className="search-input-wrapper">
          <Search size={22} />

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              router.replace(
                `/search?q=${encodeURIComponent(e.target.value)}`,
              );
            }}
            onKeyDown={onKeyDown}
            placeholder="Ask Lumi, search people or Rising moments…"
            aria-label="Search DolRise"
          />

          {query && (
            <button
              className="clear-btn"
              onClick={() => {
                setQuery("");
                router.replace("/search");
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* ⚡ SUGGESTIONS */}
        {query && suggestions && (
          <SearchSuggestions
            query={query}
            data={suggestions}
            onSelect={handleSelect}
          />
        )}

        <div className="search-hero-hint">
          <strong>Ask LUMI ✨</strong>
          <br />
          Search people, feelings, Rising thoughts or ask anything about
          DolRise.
        </div>
      </div>

      {/* ===============================
          BODY
      =============================== */}
      <div className="search-body">
        {/* EMPTY STATE */}
        {!query && (
          <RisingSearches
            onSelect={(q) => {
              setQuery(q);
              router.replace(`/search?q=${encodeURIComponent(q)}`);
            }}
          />
        )}

        {/* LUMI */}
        {query && (
          <LumiAnswerCard
            query={query}
            answer={lumiAnswer}
            loading={lumiLoading}
          />
        )}

        {/* RESULTS */}
        {query && (
          <div className="search-results">
            {/* USERS */}
            {users.length > 0 && (
              <div className="search-section">
                <h4>People</h4>

                {users.map((u, i) => {
                  const active = i === activeIndex;

                  return (
                    <div
                      key={u.id}
                      className={`search-item ${
                        active ? "active" : ""
                      }`}
                      onClick={() =>
                        router.push(`/profile/${u.username}`)
                      }
                    >
                      <img
                        src={u.avatar_url || "/default-avatar.png"}
                      />

                      <div>
                        <div className="username">
                          @{u.username}
                        </div>

                        <div className="meta">
                          {u.emotional_identity || "—"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* POSTS */}
            {posts.length > 0 && (
              <div className="search-section">
                <h4>Rising Moments</h4>

                {posts.map((p, i) => {
                  const index = users.length + i;
                  const active = index === activeIndex;

                  return (
                    <div
                      key={p.id}
                      className={`search-item ${
                        active ? "active" : ""
                      }`}
                      onClick={() =>
                        router.push(`/reflect/${p.id}`)
                      }
                    >
                      <img
                        src={
                          p.author.avatar_url ||
                          "/default-avatar.png"
                        }
                      />

                      <div>
                        <div className="post-snippet">
                          {p.content.slice(0, 90)}
                          {p.content.length > 90 && "…"}
                        </div>

                        <div className="meta">
                          💫 {p.feels_count} · 💬{" "}
                          {p.reflects_count} · 🔁{" "}
                          {p.reecho_count}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* EMPTY */}
            {!loading &&
              users.length === 0 &&
              posts.length === 0 && (
                <div className="empty">
                  Nothing found — try asking LUMI ✨
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
