"use client";

interface Props {
  onClick?: () => void;
}

export default function BankAccountCard({
  onClick,
}: Props) {
  return (
    <div className="wallet-settings-card">
      <div className="wallet-settings-card-info">
        <h3>Bank account</h3>
        <p>
          Add a verified bank account for
          withdrawals.
        </p>
      </div>

      <button
        className="wallet-settings-action"
        onClick={onClick}
      >
        Manage
      </button>
    </div>
  );
}
