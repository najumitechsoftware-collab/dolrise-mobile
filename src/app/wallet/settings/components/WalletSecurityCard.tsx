"use client";

interface Props {
  onClick?: () => void;
}

export default function WalletSecurityCard({
  onClick,
}: Props) {
  return (
    <div className="wallet-settings-card">
      <div className="wallet-settings-card-info">
        <h3>Wallet access password</h3>
        <p>
          Add an extra layer of protection to
          access your wallet dashboard.
        </p>
      </div>

      <button
        className="wallet-settings-action"
        onClick={onClick}
      >
        Set password
      </button>
    </div>
  );
}
