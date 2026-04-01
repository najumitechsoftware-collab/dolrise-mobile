"use client";
import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  availableNC: number;
}

export default function WithdrawalModal({
  open,
  onClose,
  availableNC,
}: Props) {
  const [amount, setAmount] = useState<number>(100);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 NEW STATES
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<
    "success" | "processing" | "error" | null
  >(null);

  const FEE = 3;
  const MIN = 100;
  const MAX = 5000;

  // 🔥 DolRise exchange (same as backend)
  const RATE = 10;

  const netAmount = amount - FEE;
  const receiveNGN = netAmount * RATE;

  useEffect(() => {
    if (amount < MIN) {
      setError(`Minimum withdrawal is ${MIN} NC`);
    } else if (amount > MAX) {
      setError(`Maximum per request is ${MAX} NC`);
    } else if (amount > availableNC) {
      setError("Insufficient balance");
    } else {
      setError("");
    }
  }, [amount, availableNC]);

  async function handleWithdraw() {
    if (error || pin.length < 4) return;

    try {
      setLoading(true);
      setError("");
      setStatusMessage("");
      setStatusType(null);

      const res = await fetch(
        "https://api.dolrise.com/api/wallet/payout",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount_nc: amount,
            transaction_pin: pin,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Withdrawal failed");
      }

      // 🔥 STATUS HANDLING
      const status = data?.status || "processing";

      if (status === "completed") {
        setStatusType("success");
        setStatusMessage(
          `🎉 Success! You withdrew ${amount} NC.\nFee: ${FEE} NC.\nYou will receive ₦${receiveNGN.toLocaleString()} in your bank.`
        );
      } else {
        setStatusType("processing");
        setStatusMessage(
          `⏳ Your withdrawal is being processed.\nAmount: ${amount} NC.\nExpected: ₦${receiveNGN.toLocaleString()}`
        );
      }

      setPin("");
    } catch (err: any) {
      setStatusType("error");
      setStatusMessage(err.message || "Withdrawal failed");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="withdraw-overlay">
      <div className="withdraw-modal">
        <div className="withdraw-header">
          <h2>Withdraw Funds</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="withdraw-balance">
          Available Balance
          <strong>{availableNC} NC</strong>
        </div>

        <div className="withdraw-input-group">
          <label>Amount (NC)</label>
          <input
            type="number"
            value={amount}
            min={MIN}
            max={MAX}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        {/* 🔥 SUMMARY WITH REAL MONEY */}
        <div className="withdraw-summary">
          <div>
            <span>Platform Fee</span>
            <span>{FEE} NC</span>
          </div>

          <div>
            <span>After Fee</span>
            <strong>{netAmount > 0 ? netAmount : 0} NC</strong>
          </div>

          <div>
            <span>You will receive (NGN)</span>
            <strong>₦{receiveNGN.toLocaleString()}</strong>
          </div>
        </div>

        <div className="withdraw-input-group">
          <label>Transaction PIN</label>
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={6}
          />
        </div>

        {/* ❌ ERROR */}
        {error && <p className="withdraw-error">{error}</p>}

        {/* 🔥 STATUS MESSAGE */}
        {statusMessage && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "13px",
              whiteSpace: "pre-line",
              background:
                statusType === "success"
                  ? "#e6fffa"
                  : statusType === "processing"
                  ? "#fffbe6"
                  : "#ffe6e6",
              color:
                statusType === "success"
                  ? "#065f46"
                  : statusType === "processing"
                  ? "#92400e"
                  : "#7f1d1d",
            }}
          >
            {statusMessage}
          </div>
        )}

        <button
          className="withdraw-submit"
          disabled={loading || !!error || pin.length < 4}
          onClick={handleWithdraw}
        >
          {loading ? "Processing…" : "Confirm Withdrawal"}
        </button>

        <p className="withdraw-note">
          Processing time: 1–3 business days
        </p>
      </div>
    </div>
  );
}
