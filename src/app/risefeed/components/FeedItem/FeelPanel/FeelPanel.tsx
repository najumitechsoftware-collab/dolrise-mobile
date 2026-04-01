"use client";
import { useState } from "react";
import "./FeelPanel.css";

interface FeelPanelProps {
  onClose: () => void;
  onSelect: (emoji: string, label: string) => void;
}

/* ===============================
   🌍 PUBLIC / COMMON MOODS (7)
================================ */
const PRIMARY_FEELS = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😔", label: "Sad" },
  { emoji: "❤️", label: "Loved" },
  { emoji: "🙏", label: "Grateful" },
  { emoji: "😤", label: "Stressed" },
  { emoji: "🌱", label: "Hopeful" },
];

/* ===============================
   ➕ EXTENDED MOODS (30+)
================================ */
const MORE_FEELS = [
  { emoji: "😢", label: "Hurt" },
  { emoji: "🥹", label: "Moved" },
  { emoji: "💛", label: "Touched" },
  { emoji: "😴", label: "Tired" },
  { emoji: "😕", label: "Confused" },
  { emoji: "😠", label: "Angry" },
  { emoji: "😮‍💨", label: "Overwhelmed" },
  { emoji: "🤍", label: "Gentle" },
  { emoji: "✨", label: "Inspired" },
  { emoji: "🧘", label: "Grounded" },
  { emoji: "🌊", label: "Flowing" },
  { emoji: "🔥", label: "Motivated" },
  { emoji: "😇", label: "Blessed" },
  { emoji: "🫶", label: "Connected" },
  { emoji: "😬", label: "Anxious" },
  { emoji: "🫂", label: "Supported" },
  { emoji: "😞", label: "Heavy" },
  { emoji: "😐", label: "Numb" },
  { emoji: "😃", label: "Excited" },
  { emoji: "🤔", label: "Reflective" },
  { emoji: "🪶", label: "Light" },
  { emoji: "💭", label: "Thoughtful" },
  { emoji: "🌙", label: "Quiet" },
  { emoji: "☀️", label: "Positive" },
  { emoji: "🕊️", label: "At Peace" },
  { emoji: "💫", label: "Awake" },
  { emoji: "🧠", label: "Aware" },
  { emoji: "💗", label: "Affectionate" },
  { emoji: "🌸", label: "Soft" },
  { emoji: "🎯", label: "Focused" },
];

export default function FeelPanel({ onClose, onSelect }: FeelPanelProps) {
  const [showMore, setShowMore] = useState(false);

  const feelsToShow = showMore
    ? [...PRIMARY_FEELS, ...MORE_FEELS]
    : PRIMARY_FEELS;

  return (
    <div className="feel-overlay" onClick={onClose}>
      <div className="feel-panel" onClick={(e) => e.stopPropagation()}>
        <p className="feel-title">How did this feel?</p>

        <div className="feel-grid">
          {feelsToShow.map((f) => (
            <button
              key={f.label}
              className="feel-item"
              onClick={() => onSelect(f.emoji, f.label)}
            >
              <span className="feel-emoji">{f.emoji}</span>
              <span className="feel-label">{f.label}</span>
            </button>
          ))}
        </div>

        {!showMore && (
          <button
            className="feel-more"
            onClick={() => setShowMore(true)}
          >
            + more feelings
          </button>
        )}
      </div>
    </div>
  );
}
