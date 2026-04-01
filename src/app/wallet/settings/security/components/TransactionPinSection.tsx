"use client";

import { useState } from "react";

interface Props {
  settings: any;
  refresh: () => void;
}

export default function TransactionPinSection({
  settings,
  refresh,
}: Props) {
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [walletPassword, setWalletPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const hasPin = !!settings?.transaction_pin_hash;
  const requiresPassword =
    hasPin && settings?.access_password_hash;

  async function handleSubmit() {
    setMessage("");

    if (!/^\d+$/.test(pin))
      return setMessage("PIN must contain numbers only.");

    if (![6, 8].includes(pin.length))
      return setMessage("PIN must be 6 or 8 digits.");

    if (pin !== confirm)
      return setMessage("PINs do not match.");

    if (requiresPassword && !walletPassword)
      return setMessage("Wallet password required.");

    try {
      setLoading(true);

      const res = await fetch(
        "https://api.dolrise.com/api/wallet/security/transaction-pin",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pin,
            wallet_password: walletPassword,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage("Transaction PIN updated.");
      setPin("");
      setConfirm("");
      setWalletPassword("");
      refresh();
    } catch (err: any) {
      setMessage(err.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="security-card">

      <h2>Transaction PIN</h2>

      <div className="input-group">
        <input
          type={show ? "text" : "password"}
          placeholder="Enter 6 or 8 digit PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          type={show ? "text" : "password"}
          placeholder="Confirm PIN"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>

      {requiresPassword && (
        <div className="input-group">
          <input
            type="password"
            placeholder="Enter Wallet Password"
            value={walletPassword}
            onChange={(e) =>
              setWalletPassword(e.target.value)
            }
          />
        </div>
      )}

      <button
        className="toggle-btn"
        onClick={() => setShow(!show)}
      >
        {show ? "Hide PIN" : "Show PIN"}
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="primary-btn"
      >
        {loading ? "Saving..." : "Update Transaction PIN"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
}
