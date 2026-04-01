"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./PostCaption.css";

interface PostCaptionPost {
  id?: number;
  slug?: string;
  type?: string;
  content?: string;
  mood?: string;
}

interface PostCaptionProps {
  post: PostCaptionPost;
}

/* ===============================
   🔥 RENDER HASHTAG + MENTION
================================ */
const renderText = (
  text: string,
  router: ReturnType<typeof useRouter>
) => {
  if (!text) return null;

  return text.split(/(\s+)/).map((word, i) => {
    // HASHTAG
    if (word.startsWith("#")) {
      const tag = word.replace("#", "");

      return (
        <span
          key={i}
          className="hashtag"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/hashtag/${tag}`);
          }}
        >
          {word}
        </span>
      );
    }

    // MENTION
    if (word.startsWith("@")) {
      const username = word.replace("@", "");

      return (
        <span
          key={i}
          className="mention"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/u/${username}`); // ✅ FIXED
          }}
        >
          {word}
        </span>
      );
    }

    return <span key={i}>{word}</span>;
  });
};

export default function PostCaption({ post }: PostCaptionProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  if (!post?.content) return null;

  const mood = (post.mood || "neutral").toLowerCase();
  const type = post.type;

  /* ===============================
     SHORT TEXT
  =============================== */
  if (type === "short_text") {
    return (
      <div className={`short-text-card mood-${mood}`}>
        <p className="short-text-content">
          {renderText(post.content, router)}
        </p>
      </div>
    );
  }

  /* ===============================
     LONG TEXT — PREMIUM EDITORIAL
  =============================== */
  if (type === "long_text") {
    const parts = post.content.split("\n");
    const title = parts[0];
    const body = parts.slice(1).join("\n").trim();
    const firstLetter =
      title?.charAt(0)?.toUpperCase() || "S";

    return (
      <div
        className={`story-editorial-card mood-${mood}`}
        onClick={() => {
          if (post.slug) {
            router.push(`/story/${post.slug}`);
          } else if (post.id) {
            router.push(`/story/${post.id}`);
          }
        }}
      >
        <div className="story-editorial-left">
          <h2 className="story-editorial-title">
            {title}
          </h2>

          {body && (
            <p className="story-editorial-preview">
              {body}
            </p>
          )}

          <span className="story-editorial-read">
            Read more →
          </span>
        </div>

        <div className="story-editorial-accent">
          <span className="story-editorial-letter">
            {firstLetter}
          </span>
        </div>
      </div>
    );
  }

  /* ===============================
     DEFAULT CAPTION
  =============================== */
  const isLong = post.content.length > 180;

  return (
    <div className="feed-caption-wrapper">
      <p
        className={`feed-caption ${
          !expanded && isLong
            ? "feed-caption-clamped"
            : ""
        }`}
      >
        {renderText(post.content, router)}
      </p>

      {isLong && (
        <button
          className="feed-read-toggle"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
