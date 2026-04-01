"use client";
import "../Settings.css";

export default function NotificationsSection({ onBack }: { onBack: () => void }) {
  return (
    <div className="settings-sheet">
      <header className="sheet-header">
        <button onClick={onBack}>← Back</button>
        <h2>Notifications</h2>
        <p>Manage alerts and messages</p>
      </header>

      <div className="sheet-body">
        <div className="placeholder">
          Notification settings will appear here.
        </div>
      </div>
    </div>
  );
}
