"use client";

import { useState } from "react";
import "./AddToWalletModal.css";

interface Props {
  onClose: () => void;
}

/**
 * 🪙 Najumi Currency (NC)
 * MINIMUM: 10 NC
 * Conversion handled ONLY by backend
 */
export default function AddToWalletModal({ onClose }: Props) {
  const [ncAmount, setNcAmount] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTopup = async () => {
    if (ncAmount < 10) {
      setError("Minimum top-up is 10 NC");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "https://api.dolrise.com/api/wallet/init-topup",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ncAmount, // 🪙 SEND NC ONLY
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data?.authorization_url) {
        throw new Error("TOPUP_INIT_FAILED");
      }

      // 🔐 Redirect to Paystack
      window.location.href = data.authorization_url;
    } catch (err) {
      console.error("Topup init error:", err);
     setError("Could not start payment. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-overlay" onClick={onClose}>
      <div
        className="wallet-sheet"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="wallet-header">
          <h3>Add to wallet</h3>
          <p>
            This balance is private.<br />
            Minimum top-up: <strong>10 NC</strong>
          </p>
        </div>

        {/* INPUT */}
        <div className="wallet-input">
          <label htmlFor="nc">Amount (NC)</label>
          <input
            id="nc"
            type="number"
            min={10}
            step={1}
            value={ncAmount}
            onChange={(e) => setNcAmount(Number(e.target.value))}
            placeholder="Enter NC amount"
          />
        </div>

        {/* ERROR */}
        {error && <p className="wallet-error">{error}</p>}

        {/* ACTION */}
        <div className="wallet-actions">
          <button
            className="wallet-confirm"
            onClick={handleTopup}
            disabled={loading}
          >
            {loading ? "Processing…" : "Continue"}
          </button>

          <button
            type="button"
            className="wallet-close"
            onClick={onClose}
            disabled={loading}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
