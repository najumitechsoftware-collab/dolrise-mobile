"use client";

import { useEffect, useState } from "react";
import "./AboutSection.css";

type Props = {
  value?: string;
  saving: boolean;
  onSave: (data: { bio: string }) => void;
  onBack: () => void;
};

const MAX_WORDS = 240;

export default function AboutSection({
  value,
  saving,
  onSave,
  onBack,
}: Props) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (value) setText(value);
  }, [value]);

  /* WORD COUNT – REAL TIME */
  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const remaining = MAX_WORDS - words.length;

  const counterState =
    remaining <= 0
      ? "danger"
      : remaining <= 5
      ? "warn"
      : "safe";

  return (
    <div className="about-overlay">
      <div className="about-sheet slide-up">
        {/* HEADER */}
        <header className="about-header">
          <button
            className="about-back"
            onClick={onBack}
            aria-label="Back"
          >
            ← Back
          </button>

          <h2>About you</h2>
          <p className="about-emotion">
            This is how people understand your presence.
            Keep it honest, calm, and human.
          </p>
        </header>

        {/* BODY */}
        <div className="about-body">
          <label>Bio</label>

          <textarea
            value={text}
            placeholder="Write something meaningful about yourself…"
            onChange={(e) => {
              const input = e.target.value;
              const inputWords = input
                .trim()
                .split(/\s+/)
                .filter(Boolean);

              if (inputWords.length <= MAX_WORDS) {
                setText(input);
              }
            }}
          />

          <div className={`about-counter ${counterState}`}>
            {remaining} words left
          </div>
        </div>

        {/* FOOTER */}
        <footer className="about-footer">
          <button
            className="save-btn"
            disabled={
              saving ||
              words.length === 0 ||
              words.length > MAX_WORDS
            }
            onClick={() => onSave({ bio: text.trim() })}
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </footer>
      </div>
    </div>
  );
}
