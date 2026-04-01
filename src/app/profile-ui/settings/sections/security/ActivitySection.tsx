"use client";
import "./ActivitySection.css";

export default function ActivitySection({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="security-sheet slide-up">
      <header className="sheet-header">
        <button onClick={onBack}>← Back</button>
        <h3>Security Activity</h3>
      </header>

      <div className="placeholder-box">
        Recent login and security events will appear here.
      </div>
    </div>
  );
}
