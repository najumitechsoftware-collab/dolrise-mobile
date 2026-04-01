"use client";

import "./EmotionalShell.css";

export default function EmotionalShell() {
  return (
    <div className="emotional-shell">
      {[1, 2, 3].map((i) => (
        <div key={i} className="shell-card">
          <div className="shell-header">
            <div className="shell-avatar shimmer" />
            <div className="shell-user">
              <div className="shell-line short shimmer" />
              <div className="shell-line tiny shimmer" />
            </div>
          </div>

          <div className="shell-content">
            <div className="shell-line long shimmer" />
            <div className="shell-line medium shimmer" />
            <div className="shell-line small shimmer" />
          </div>

          <div className="shell-actions">
            <div className="shell-action shimmer" />
            <div className="shell-action shimmer" />
            <div className="shell-action shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}
