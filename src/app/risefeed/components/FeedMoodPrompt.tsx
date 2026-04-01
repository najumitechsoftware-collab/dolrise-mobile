"use client";
import React, { useState } from "react";

interface FeedMoodPromptProps {
  onSelectMood: (mood: string) => void;
  onSkip: () => void;
}

/*
=========================================================
FeedMoodPrompt — SMART VERSION
---------------------------------------------------------
• Shows top 5 moods by default
• "Read more" expands to all moods (~50)
• Gentle, non-intrusive UI
• Skip always available
=========================================================
*/

/* ⭐ Top / common moods */
const topMoods = [
  { key: "happy", label: "Happy", emoji: "😊" },
  { key: "calm", label: "Calm", emoji: "😌" },
  { key: "sad", label: "Sad", emoji: "😔" },
  { key: "stressed", label: "Stressed", emoji: "😤" },
  { key: "hopeful", label: "Hopeful", emoji: "🌱" },
];

/* 🌈 Extended mood set (sample – can grow to 50+) */
const allMoods = [
  ...topMoods,
  { key: "anxious", label: "Anxious", emoji: "😟" },
  { key: "tired", label: "Tired", emoji: "😴" },
  { key: "lonely", label: "Lonely", emoji: "🥺" },
  { key: "motivated", label: "Motivated", emoji: "🔥" },
  { key: "grateful", label: "Grateful", emoji: "🙏" },
  { key: "overwhelmed", label: "Overwhelmed", emoji: "😵" },
  { key: "peaceful", label: "Peaceful", emoji: "🕊️" },
  { key: "confused", label: "Confused", emoji: "😕" },
  { key: "curious", label: "Curious", emoji: "🤔" },
  { key: "excited", label: "Excited", emoji: "✨" },
  { key: "angry", label: "Angry", emoji: "😠" },
  { key: "empty", label: "Empty", emoji: "🫥" },
  { key: "focused", label: "Focused", emoji: "🎯" },
  { key: "content", label: "Content", emoji: "🙂" },
  { key: "inspired", label: "Inspired", emoji: "💡" },
  // 👉 zaka iya ƙara har 50+
];

export default function FeedMoodPrompt({
  onSelectMood,
  onSkip,
}: FeedMoodPromptProps) {
  const [expanded, setExpanded] = useState(false);

  const moodsToShow = expanded ? allMoods : topMoods;

  return (
    <div
      style={{
        margin: "16px auto",
        padding: "14px 14px 10px",
        maxWidth: 520,
        borderRadius: "16px",
        background: "#fffdf8",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
      }}
    >
      {/* Question */}
      <div
        style={{
          fontSize: "14px",
          fontWeight: 500,
          marginBottom: "10px",
          textAlign: "center",
          opacity: 0.85,
        }}
      >
        How are you feeling right now?
      </div>

      {/* Mood buttons */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {moodsToShow.map((m) => (
          <button
            key={m.key}
            onClick={() => onSelectMood(m.key)}
            style={{
              flex: "1 1 30%",
              minWidth: 90,
              padding: "10px 8px",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.08)",
              background: "#ffffff",
              cursor: "pointer",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "16px" }}>{m.emoji}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* Read more */}
      {!expanded && (
        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <button
            onClick={() => setExpanded(true)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              opacity: 0.7,
            }}
          >
            Read more feelings
          </button>
        </div>
      )}

      {/* Skip */}
      <div
        style={{
          marginTop: expanded ? "10px" : "6px",
          textAlign: "center",
        }}
      >
        <button
          onClick={onSkip}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            opacity: 0.6,
          }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
