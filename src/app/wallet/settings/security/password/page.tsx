"use client";

import { useState } from "react";
import "./password.css";

export default function WalletPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  async function handleSave() {
    setMessage("");

    if (password.length < 8) {
      return setMessage("Minimum 8 characters required.");
    }

    if (!/[A-Z]/.test(password)) {
      return setMessage(
        "At least one capital letter required."
      );
    }

    if (password !== confirm) {
      return setMessage("Passwords do not match.");
    }

    const res = await fetch(
      "https://api.dolrise.com/api/wallet/security/set-password",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setMessage("Wallet password updated.");
    } else {
      setMessage("Failed to update.");
    }
  }

  return (
    <div className="security-page">

      <div className="security-card">

        <h1>Wallet Password</h1>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) =>
            setConfirm(e.target.value)
          }
        />

        <button onClick={handleSave}>
          Save Password
        </button>

        {message && <p>{message}</p>}

      </div>
    </div>
  );
}
