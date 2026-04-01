"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./styles/addFunds.css";

const MIN = 10;

export default function AddFundsPage() {
  const router = useRouter();

  const [amount, setAmount] = useState<number | "">("");
  const [fiatPreview, setFiatPreview] = useState<number | null>(null);
  const [fiatCurrency, setFiatCurrency] = useState("");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const numericAmount = typeof amount === "number" ? amount : 0;

  /* ================= PREVIEW ================= */

  useEffect(() => {
    if (!numericAmount || numericAmount <= 0) {
      setFiatPreview(null);
      return;
    }

    async function preview() {
      try {
        const res = await fetch(
          "https://api.dolrise.com/api/wallet/exchange/preview",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nc_amount: numericAmount,
            }),
          }
        );

        const data = await res.json();

        if (res.ok && data.success) {
          setFiatPreview(data.data.fiat_amount);
          setFiatCurrency(data.data.fiat_currency);
          setRate(data.data.rate_snapshot);
        }
      } catch (err) {
        console.error("Preview failed");
      }
    }

    preview();
  }, [numericAmount]);

  /* ================= SUBMIT ================= */

  async function handleSubmit() {
    try {
      if (numericAmount < MIN) {
        setError("Minimum top-up is 10 NC");
        return;
      }

      setLoading(true);
      setError("");

      const res = await fetch(
        "https://api.dolrise.com/api/wallet/init-topup",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ncAmount: numericAmount,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data?.authorization_url) {
        throw new Error("Unable to start payment");
      }

      window.location.href = data.authorization_url;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="addfunds-container">

      <h1 className="addfunds-title">Add Funds</h1>

      <div className="addfunds-card">

        <div className="addfunds-field">
          <label>Amount (NC)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(Number(e.target.value))
            }
            placeholder="Enter NC amount"
          />
        </div>

        {fiatPreview !== null && (
          <div className="addfunds-preview">

            <div>
              <span>You Pay</span>
              <strong>
                ≈ {Number(fiatPreview).toLocaleString()}{" "}
                {fiatCurrency}
              </strong>
            </div>

            {rate && (
              <div className="rate-info">
                Rate: 1 NC ≈ {rate} {fiatCurrency}
              </div>
            )}

          </div>
        )}

        {error && (
          <div className="addfunds-error">
            {error}
          </div>
        )}

        <button
          className="addfunds-btn"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Processing…" : "Continue to Payment"}
        </button>

      </div>

    </div>
  );
}
