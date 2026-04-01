"use client";
import { useState } from "react";
import "./DeleteSheet.css";
import DeleteConfirm from "./DeleteConfirm";

export default function DeleteSheet({ onClose }: { onClose: () => void }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"password" | "confirm">("password");

  const handleVerify = async () => {
    if (!password) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/initiate-deletion`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();
      if (data.requiresFinalConfirmation) {
        setStep("confirm");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (step === "confirm") {
    return <DeleteConfirm onClose={onClose} />;
  }

  return (
    <div className="delete-overlay">
      <div className="delete-sheet slide-up">
        <header>
          <button onClick={onClose}>← Back</button>
          <h2>Delete Account</h2>
        </header>

        <div className="delete-body">
          <p className="delete-intro">
            For security reasons, please confirm your password.
          </p>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <footer>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>

          <button
            className="danger-btn"
            disabled={!password || loading}
            onClick={handleVerify}
          >
            {loading ? "Verifying…" : "Continue"}
          </button>
        </footer>
      </div>
    </div>
  );
}
