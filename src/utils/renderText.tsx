import React from "react";

export const renderTextWithTags = (text: string) => {
  if (!text) return null;

  const parts = text.split(/(\s+)/);

  return parts.map((word, i) => {
    // 🔥 HASHTAG
    if (word.startsWith("#")) {
      const tag = word.replace("#", "");

      return (
        <span
          key={i}
          style={{
            color: "#facc15",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = `/hashtag/${tag}`;
          }}
        >
          {word}
        </span>
      );
    }

    // 🔥 MENTION
    if (word.startsWith("@")) {
      const username = word.replace("@", "");

      return (
        <span
          key={i}
          style={{
            color: "#60a5fa",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => {
            window.location.href = `/user/${username}`;
          }}
        >
          {word}
        </span>
      );
    }

    return <React.Fragment key={i}>{word}</React.Fragment>;
  });
};
