"use client";

import { useState } from "react";

interface Props {
  settings: any;
  refresh: () => void;
}

export default function AccessModeSection({
  settings,
  refresh,
}: Props) {
  const [mode, setMode] = useState(settings?.access_mode);
  const [value, setValue] = useState("");
  const [transactionPin, setTransactionPin] =
    useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    setMessage("");

    if (!transactionPin)
      return setMessage("Transaction PIN required.");

    if (mode === "password") {
      if (!value || value.length < 8)
        return setMessage("Minimum 8 characters.");
    }

    if (mode === "pin") {
      if (!/^\d+$/.test(value))
        return setMessage("Numbers only.");
    }

    try {
      setLoading(true);

      const payload: any = {
        access_mode: mode,
        transaction_pin: transactionPin,
      };

      if (mode === "password")
        payload.access_password = value;

      if (mode === "pin")
        payload.access_pin = value;

      const res = await fetch(
        "https://api.dolrise.com/api/wallet/security/access",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage("Access mode updated.");
      setValue("");
      setTransactionPin("");
      refresh();
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="security-card">

      <h2>Wallet Access Protection</h2>

      <div className="access-modes">
        {["none", "pin", "password"].map((m) => (
          <label key={m}>
            <input
              type="radio"
              checked={mode === m}
              onChange={() => setMode(m)}
            />
            {m.toUpperCase()}
          </label>
        ))}
      </div>

      {mode !== "none" && (
        <div className="input-group">
          <input
            type={show ? "text" : "password"}
            placeholder={
              mode === "password"
                ? "Enter Password"
                : "Enter Access PIN"
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      )}

      <div className="input-group">
        <input
          type="password"
          placeholder="Enter Transaction PIN"
          value={transactionPin}
          onChange={(e) =>
            setTransactionPin(e.target.value)
          }
        />
      </div>

      <button
        className="toggle-btn"
        onClick={() => setShow(!show)}
      >
        {show ? "Hide" : "Show"}
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="primary-btn"
      >
        {loading ? "Saving..." : "Save Access Mode"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}
