"use client";

import "./ProfilePostCard.css";

/* ======================
   TYPES
====================== */

type Author = {
  id?: number;
  username?: string;
  full_name?: string;
  avatar_url?: string | null;
};

type Post = {
  content: string;
  created_at: string;
  author?: Author;
  feels?: number;
  reflects?: number;
  reecho?: number;
};

/* ======================
   HELPERS
====================== */

function resolveImageUrl(url?: string | null) {
  if (!url) return "";

  if (url.startsWith("http")) return url;

  const API =
    process.env.NEXT_PUBLIC_API_URL || "https://api.dolrise.com";

  return `${API}${url}`;
}

/* ======================
   COMPONENT
====================== */

export default function ProfilePostCard({
  post,
}: {
  post: Post;
}) {
  const avatarUrl = resolveImageUrl(post.author?.avatar_url);

  const fullName = post.author?.full_name;
  const username = post.author?.username;

  const displayName =
    fullName || username || "Unknown";

  const usernameHandle = username
    ? `@${username}`
    : "";

  return (
    <article className="feed-card">

      {/* HEADER */}
      <div className="feed-header">
        <div className="feed-user">

          {/* AVATAR */}
          <div className="avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} />
            ) : (
              <span>
                {(fullName?.[0] ||
                  username?.[0] ||
                  "U"
                ).toUpperCase()}
              </span>
            )}
          </div>

          {/* USER META */}
          <div className="meta">
            <strong className="name">
              {displayName}
            </strong>

            <span className="username">
              {usernameHandle}
            </span>

            <span className="mood">
              🙂 Calm ·{" "}
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button className="menu-btn">⋮</button>
      </div>

      {/* CONTENT */}
      <div className="feed-content">
        <p>{post.content}</p>
      </div>

      {/* REACTIONS */}
      <div className="feed-reactions">
        <button className="reaction">
          ✨ Feel <span>{post.feels ?? 0}</span>
        </button>

        <button className="reaction">
          💬 Reflect <span>{post.reflects ?? 0}</span>
        </button>

        <button className="reaction">
          🔁 ReEcho <span>{post.reecho ?? 0}</span>
        </button>
      </div>
    </article>
  );
}
