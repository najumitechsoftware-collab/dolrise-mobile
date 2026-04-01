"use client";

interface Props {
  status: "not_started" | "pending" | "approved" | "rejected";
  onClick?: () => void;
}

export default function KycCard({
  status,
  onClick,
}: Props) {
  const label =
    status === "approved"
      ? "Verified"
      : status === "pending"
      ? "Under review"
      : status === "rejected"
      ? "Needs attention"
      : "Not started";

  return (
    <div className="wallet-settings-card">
      <div className="wallet-settings-card-info">
        <h3>Identity verification</h3>
        <p>
          Required to enable withdrawals and
          protect your wallet.
        </p>

        <span
          className={`kyc-status ${status}`}
        >
          {label}
        </span>
      </div>

      <button
        className="wallet-settings-action"
        onClick={onClick}
        disabled={status === "approved"}
      >
        {status === "approved"
          ? "Completed"
          : "Continue"}
      </button>
    </div>
  );
}
