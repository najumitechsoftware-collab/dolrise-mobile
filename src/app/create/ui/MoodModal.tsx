"use client";

import { useState } from "react";
import { moodGroups, MoodCategory } from "./moods";
import styles from "./MoodModal.module.css";

export default function MoodModal({
  setMood,
  onClose,
}: {
  setMood: (m: string) => void;
  onClose: () => void;
}) {
  const [active, setActive] = useState<MoodCategory>("Positive");

  const currentGroup = moodGroups.find((g) => g.key === active)!;

  return (
    <div className={styles.overlay}>
      <div className={styles.sheet}>
        {/* HEADER */}
        <div className={styles.header}>
          <h3>Select your mood</h3>
          <button onClick={onClose} className={styles.close}>✕</button>
        </div>

        {/* CATEGORY BAR */}
        <div className={styles.categoryBar}>
          {moodGroups.map((g) => (
            <button
              key={g.key}
              className={`${styles.categoryTab} ${
                active === g.key ? styles.active : ""
              }`}
              onClick={() => setActive(g.key)}
            >
              {g.title}
            </button>
          ))}
        </div>

        {/* MOODS GRID */}
        <div className={styles.moodGrid}>
          {currentGroup.moods.map((m) => (
            <button
              key={m.label}
              className={styles.moodCard}
              onClick={() => {
                setMood(m.label);
                onClose();
              }}
            >
              <span className={styles.emoji}>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
