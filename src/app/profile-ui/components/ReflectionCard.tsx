"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./ReflectionCard.css";

interface Reflection {
  id: number;
  content?: string;
  created_at: string;
  post_id: number;
  post?: {
    content?: string;
    author?: {
      username?: string;
      avatar_url?: string;
    };
    author_username?: string;
  };
}

interface Author {
  username: string;
  avatar_url?: string;
}

/* ===============================
   🕒 SIMPLE RELATIVE TIME
================================ */
function timeAgo(dateString: string) {
  const now = Date.now();
  const past = new Date(dateString).getTime();
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateString).toLocaleDateString();
}

export default function ReflectionCard({
  reflection,
}: {
  reflection: Reflection;
}) {
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(
    null
  );

  /* =====================================================
     🔗 ENSURE REAL RISE PROFILE (SAFE + TYPED)
     ===================================================== */
  useEffect(() => {
    const direct = reflection.post?.author;

    // ✅ DIRECT AUTHOR AVAILABLE
    if (direct?.username) {
      setAuthor({
        username: direct.username,
        avatar_url: direct.avatar_url,
      });
      return;
    }

    // 🔁 FALLBACK: FETCH REAL PROFILE
    const fallbackUsername =
      reflection.post?.author_username;

    if (!fallbackUsername) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/u/${fallbackUsername}`,
      { credentials: "include" }
    )
      .then((r) => r.json())
      .then((data) => {
        if (data?.profile?.username) {
          setAuthor({
            username: data.profile.username,
            avatar_url: data.profile.avatar_url,
          });
        }
      })
      .catch(() => {});
  }, [reflection]);

  return (
    <article
      className="reflection-card"
      onClick={() =>
        router.push(
          `/risefeed#post-${reflection.post_id}`
        )
      }
    >
      {/* ================= HEADER ================= */}
      <header className="reflection-header">
        <div className="reflection-author">
          <img
            src={
              author?.avatar_url ||
              "/default-avatar.png"
            }
            alt={author?.username || "user"}
          />
          <div>
            <strong>
              @{author?.username || "user"}
            </strong>
            <span>
              You reflected ·{" "}
              {timeAgo(reflection.created_at)}
            </span>
          </div>
        </div>
      </header>

      {/* ================= REFLECTION ================= */}
      {reflection.content && (
        <p className="reflection-content">
          “{reflection.content}”
        </p>
      )}

      {/* ================= POST PREVIEW ================= */}
      {reflection.post?.content && (
        <div className="reflection-post-preview">
          <p>
            {reflection.post.content.slice(0, 120)}
            {reflection.post.content.length > 120 &&
              "…"}
          </p>
        </div>
      )}
    </article>
  );
}
