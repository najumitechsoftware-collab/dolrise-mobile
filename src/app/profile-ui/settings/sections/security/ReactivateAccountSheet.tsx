"use client";

import { useState } from "react";
import "./ReactivateAccountSheet.css";

export default function ReactivateAccountSheet({
  onBack,
}: {
  onBack: () => void;
}) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [checked, setChecked] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit() {
    if (!password || !confirm || !checked) {
      setError("Please complete all fields.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setProcessing(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/reactivate`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password, confirm }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess("Your account has been successfully reactivated.");

      setTimeout(() => {
        onBack();
      }, 2000);

    } catch (e: any) {
      setError(e.message);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="reactivate-sheet slide-up">
      <div className="reactivate-header">
        <button onClick={onBack}>← Back</button>
        <h3>Reactivate Account</h3>
      </div>

      {success && <div className="success-box">{success}</div>}

      <input
        className="reactivate-input"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        className="reactivate-input"
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      <label className="reactivate-checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        I confirm this action
      </label>

      <button
        className="reactivate-btn"
        disabled={processing}
        onClick={handleSubmit}
      >
        {processing ? "Processing..." : "Confirm Reactivation"}
      </button>

      {error && <p className="reactivate-error">{error}</p>}
    </div>
  );
}
