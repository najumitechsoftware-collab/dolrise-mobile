"use client";

import { useState } from "react";
import "../DeactivateSheet.css";

export default function DeactivateSheet({
  onClose,
}: {
  onClose: () => void;
}) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleDeactivate = async () => {
    if (!password || !confirm) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/deactivate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            password,
            confirm: true,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Deactivation failed");
      }

      setSuccess(true);

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deactivate-overlay">
      <div className="deactivate-sheet slide-up">

        {/* HEADER */}
        <header className="deactivate-header">
          <button onClick={onClose}>← Back</button>
          <h2>Deactivate Account</h2>
        </header>

        {/* BODY */}
        <div className="deactivate-body">

          {success ? (
            <div className="success-box">
              Your account has been deactivated.
              Redirecting…
            </div>
          ) : (
            <>
              <div className="warning-box">
                <ul>
                  <li>Your profile will become invisible</li>
                  <li>You cannot post or interact</li>
                  <li>You can reactivate anytime</li>
                </ul>
              </div>

              <div className="password-field">
                <label>Confirm your password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="confirm-check">
                <input
                  type="checkbox"
                  checked={confirm}
                  onChange={() => setConfirm(!confirm)}
                />
                <span>
                  I understand this action will deactivate my account.
                </span>
              </div>

              {error && <div className="error-box">{error}</div>}
            </>
          )}
        </div>

        {/* FOOTER */}
        {!success && (
          <footer className="deactivate-footer">
            <button
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              className="confirm-btn"
              disabled={!password || !confirm || loading}
              onClick={handleDeactivate}
            >
              {loading ? "Processing…" : "Deactivate My Account"}
            </button>
          </footer>
        )}

      </div>
    </div>
  );
}
