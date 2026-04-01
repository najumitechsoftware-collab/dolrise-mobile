"use client";

import { useCreateStore } from "@/store/createStore";

const moods = [
  { label: "Joy", icon: "🌞", color: "#FFD93D" },
  { label: "Calm", icon: "🌿", color: "#8FD6A9" },
  { label: "Inspired", icon: "✨", color: "#F7C8E0" },
  { label: "Heartbroken", icon: "💔", color: "#FF8E8E" },
  { label: "Sad", icon: "🥀", color: "#A0A0A0" },
  { label: "Angry", icon: "🔥", color: "#FF6B6B" },
  { label: "Lonely", icon: "🌫️", color: "#B4C5E4" },
  { label: "Hopeful", icon: "🌙", color: "#B19CD9" },
  { label: "Grateful", icon: "💛", color: "#F9D342" },
  { label: "Busy", icon: "⚡", color: "#F0A500" },
  { label: "Chill", icon: "🌾", color: "#CDE7BE" },
];

export default function MoodSelector() {
  const mood = useCreateStore((s) => s.mood);
  const setMood = useCreateStore((s) => s.setMood);

  return (
    <div className="mood-section">
      <h3 className="section-title">Select Mood</h3>

      <div className="mood-grid">
        {moods.map((m) => (
          <button
            key={m.label}
            className={`mood-item ${mood === m.label ? "active" : ""}`}
            style={{
              borderColor: m.color,
              background: mood === m.label ? m.color + "33" : "transparent",
            }}
            onClick={() => setMood(m.label)}
          >
            <span className="mood-icon">{m.icon}</span>
            <span className="mood-label">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
