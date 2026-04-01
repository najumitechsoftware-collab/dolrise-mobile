"use client";

import { useState } from "react";
import "./pin.css";

export default function TransactionPinPage() {
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  async function handleSave() {
    setMessage("");

    if (![6, 8].includes(pin.length)) {
      return setMessage(
        "PIN must be 6 or 8 digits."
      );
    }

    if (!/^\d+$/.test(pin)) {
      return setMessage(
        "PIN must contain numbers only."
      );
    }

    if (pin !== confirm) {
      return setMessage("PINs do not match.");
    }

    const res = await fetch(
      "https://api.dolrise.com/api/wallet/security/set-transaction-pin",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setMessage("Transaction PIN updated.");
    } else {
      setMessage("Failed to update.");
    }
  }

  return (
    <div className="pin-page">

      <div className="pin-card">

        <h1>Transaction PIN</h1>

        <input
          type="password"
          maxLength={8}
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) =>
            setPin(e.target.value)
          }
        />

        <input
          type="password"
          maxLength={8}
          placeholder="Confirm PIN"
          value={confirm}
          onChange={(e) =>
            setConfirm(e.target.value)
          }
        />

        <button onClick={handleSave}>
          Save PIN
        </button>

        {message && <p>{message}</p>}

      </div>
    </div>
  );
}
