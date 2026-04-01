"use client";
import "./TwoFactorSection.css";

export default function TwoFactorSection({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="security-sheet slide-up">
      <header className="sheet-header">
        <button onClick={onBack}>← Back</button>
        <h3>Two-Factor Authentication</h3>
      </header>

      <div className="placeholder-box">
        Two-factor authentication setup coming soon.
      </div>
    </div>
  );
}
