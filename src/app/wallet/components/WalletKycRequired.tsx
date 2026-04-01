"use client";

export default function WalletKycRequired() {
  return (
    <div className="wallet-kyc-wrapper">
      <div className="wallet-kyc-card">
        <div className="wallet-kyc-icon">🔐</div>

        <h2 className="wallet-kyc-title">
          Almost there
        </h2>

        <p className="wallet-kyc-text">
          Your wallet is ready, but we need to verify your identity to keep
          your funds secure.
        </p>

        <p className="wallet-kyc-sub">
          This takes about <strong>2 minutes</strong> and is required by
          financial regulations.
        </p>

        <a href="/wallet/kyc" className="wallet-kyc-btn">
          Start verification
        </a>

        <p className="wallet-kyc-trust">
          🔒 Your information is encrypted and reviewed securely
        </p>
      </div>
    </div>
  );
}
