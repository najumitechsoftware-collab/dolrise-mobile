"use client";
import { useState } from "react";
import "./DeleteRecovery.css";

export default function DeleteRecovery() {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/cancel-deletion`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      window.location.href = "/profile";
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recovery-wrapper">
      <h2>Account Scheduled for Deletion</h2>
      <p>You may cancel within 30 days.</p>

      <button onClick={handleCancel} disabled={loading}>
        {loading ? "Restoring…" : "Cancel Deletion"}
      </button>
    </div>
  );
}
