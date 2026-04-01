"use client";
import { useState } from "react";
import "./DeleteConfirm.css";
import DeleteGoodbye from "./DeleteGoodbye";

export default function DeleteConfirm({ onClose }: { onClose: () => void }) {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/confirm-deletion`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ confirm: true }),
        }
      );
      setDone(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return <DeleteGoodbye />;
  }

  return (
    <div className="delete-overlay">
      <div className="delete-sheet slide-up">

        <h2>Permanent Deletion</h2>

        <div className="warning-box">
          <ul>
            <li>Your profile becomes hidden immediately</li>
            <li>All posts will be hidden</li>
            <li>You have 30 days to cancel</li>
            <li>After 30 days, recovery is impossible</li>
          </ul>
        </div>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          I understand this action cannot be undone after 30 days
        </label>

        <div className="actions">
          <button onClick={onClose}>Cancel</button>
          <button
            className="danger-btn"
            disabled={!checked || loading}
            onClick={handleDelete}
          >
            {loading ? "Processing…" : "Delete My Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
