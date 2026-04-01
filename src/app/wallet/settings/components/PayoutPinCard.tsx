"use client";

interface Props {
  onClick?: () => void;
}

export default function PayoutPinCard({
  onClick,
}: Props) {
  return (
    <div className="wallet-settings-card">
      <div className="wallet-settings-card-info">
        <h3>Withdrawal PIN</h3>
        <p>
          Required before requesting any payout
          from your wallet.
        </p>
      </div>

      <button
        className="wallet-settings-action"
        onClick={onClick}
      >
        Set PIN
      </button>
    </div>
  );
}
