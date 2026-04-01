"use client";

import "./wallet-header.css";

export default function WalletHeader() {
  return (
    <div className="wallet-header">
      <div className="wallet-header-content">
        
        <h1 className="wallet-title">
          Your quiet space
        </h1>

        {/* 🧠 Moving calm ticker */}
        <div className="wallet-ticker">
          <div className="wallet-ticker-track">
            <span>
              Your wallet is protected • Exchange rates update in real-time • Move calmly at your own pace • Your balance is safe and steady •
            </span>
            <span>
              Your wallet is protected • Exchange rates update in real-time • Move calmly at your own pace • Your balance is safe and steady •
            </span>
          </div>
        </div>

        <p className="wallet-subtitle">
          This wallet is yours alone. Protected, steady, and designed for calm exchange.
        </p>

      </div>
    </div>
  );
}
