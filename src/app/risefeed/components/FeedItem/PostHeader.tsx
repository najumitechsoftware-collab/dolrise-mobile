"use client";

import { memo, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { timeAgo } from "@/lib/timeAgo";
import "./PostHeader.css";

interface Author {
  id?: number;
  username?: string;
  avatar_url?: string | null;
}

interface PostHeaderProps {
  post: {
    author?: Author;
    mood?: string;
    mood_emoji?: string;
    created_at: string;
    isOwner?: boolean;
  };
}

function PostHeader({ post }: PostHeaderProps) {
  const router = useRouter();

  const username = post?.author?.username || "";
  const avatar = post?.author?.avatar_url || "";

  const mood = (post.mood || "neutral").toLowerCase();

  /* ⏱ TIME */
  const createdAtText = useMemo(() => {
    return timeAgo(post.created_at);
  }, [post.created_at]);

  /* 👤 PROFILE NAVIGATION */
  const goToProfile = useCallback(() => {
    if (!username) return;

    if (post?.isOwner) {
      router.push("/profile-ui");
      return;
    }

    router.push(`/u/${username}`);
  }, [router, username, post?.isOwner]);

  /* 👤 AVATAR FALLBACK INITIAL */
  const avatarInitial = useMemo(() => {
    return username?.[0]?.toUpperCase() || "U";
  }, [username]);

  return (
    <div className="feed-header">

      {/* 👤 AVATAR */}
      <div
        className="feed-avatar"
        onClick={goToProfile}
        role="button"
      >
        {avatar ? (
          <img
            src={avatar}
            alt={username || "user"}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="avatar-fallback">
            {avatarInitial}
          </div>
        )}
      </div>

      {/* 👤 USER INFO */}
      <div className="feed-user-info">

        {/* USERNAME */}
        <div
          className="feed-username"
          onClick={goToProfile}
          role="button"
        >
          @{username}
        </div>

        {/* MOOD + TIME */}
        <div className="feed-sub-info">
          <div className={`mood-badge mood-${mood}`}>
            <span>{post.mood_emoji || "🙂"}</span>
            <span className="mood-text">
              {post.mood || "neutral"}
            </span>
          </div>

          <span className="post-time">
            · {createdAtText}
          </span>
        </div>

      </div>
    </div>
  );
}

export default memo(PostHeader);
