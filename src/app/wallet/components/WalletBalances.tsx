"use client";

import "./wallet-balances.css";

interface Props {
  availableNC: number;
  lockedNC: number;
  fiatPreview: number | null;
  rateInfo?: any;
}

export default function WalletBalances({
  availableNC,
  lockedNC,
  fiatPreview,
  rateInfo,
}: Props) {
  const currency = rateInfo?.fiat_currency || "";
  const country = rateInfo?.country || "";

  const rate =
    availableNC > 0 && fiatPreview
      ? fiatPreview / availableNC
      : 0;

  return (
    <div className="wallet-balance-card">

      {/* =========================
         PRIMARY BALANCE
      ========================= */}
      <div className="balance-primary">
        <span className="balance-label">
          Available Balance
        </span>

        <h1 className="balance-nc">
          {availableNC} NC
        </h1>

        {fiatPreview !== null && (
          <div className="balance-fiat">
            ≈ {fiatPreview.toLocaleString()} {currency}
          </div>
        )}
      </div>

      {/* =========================
         PROTECTED BALANCE
      ========================= */}
      <div className="balance-section">
        <span className="section-title">
          Protected Balance
        </span>
        <span className="section-value gold">
          {lockedNC} NC
        </span>
      </div>

      {/* =========================
         EXCHANGE RATE
      ========================= */}
      {rateInfo && availableNC > 0 && (
        <div className="balance-section">
          <span className="section-title">
            Live Exchange Rate
          </span>
          <span className="section-value">
            1 NC ≈{" "}
            {rate.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}{" "}
            {currency}
          </span>
        </div>
      )}

      {/* =========================
         REGION INFO
      ========================= */}
      {currency && (
        <div className="balance-section">
          <span className="section-title">
            Region
          </span>
          <span className="section-value">
            {country || "Your region"} • {currency}
          </span>
        </div>
      )}

      {/* =========================
         EMOTIONAL TEXT
      ========================= */}
      <div className="balance-emotional">
        Your balance is steady and protected.
      </div>

    </div>
  );
}
