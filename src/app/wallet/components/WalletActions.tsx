"use client";
import { useRouter } from "next/navigation";
import "../styles/wallet-actions.css";

interface Props {
  canWithdraw: boolean;
  withdrawReason?: string;
  availableBalance?: number;
  onRefresh?: () => void; // ✅ ADD THIS
}

export default function WalletActions({
  canWithdraw,
  withdrawReason,
  availableBalance,
}: Props) {
  const router = useRouter();

  const isKycRequired = withdrawReason === "KYC_REQUIRED";
  const isDisabled = isKycRequired;

  /* ===============================
     💳 ADD FUNDS
  =============================== */
  function handleAddFunds() {
    router.push("/wallet/add-funds");
  }

  /* ===============================
     💸 WITHDRAW
  =============================== */
  function handleWithdraw() {
    if (!isDisabled) {
      router.push("/wallet/withdraw");
    }
  }

  /* ===============================
     🏦 PAYMENT METHODS
  =============================== */
  function handleMethods() {
    router.push("/wallet/settings/payout-methods");
  }

  return (
    <div className="wallet-actions-wrapper">
      {/* 🌊 PRIMARY ACTION */}
      <div className="wallet-primary-action">
        <button
          className="wallet-btn-primary"
          onClick={handleAddFunds}
        >
          Add Funds
        </button>
        <p className="wallet-action-hint">
          Grow your balance calmly and securely.
        </p>
      </div>

      {/* ⚡ SECONDARY ACTIONS */}
      <div className="wallet-secondary-grid">
        {/* Withdraw */}
        <button
          className={`wallet-btn-secondary gold ${
            isDisabled ? "disabled" : ""
          }`}
          onClick={handleWithdraw}
          disabled={isDisabled}
        >
          Withdraw
        </button>

        {/* Payment Methods */}
        <button
          className="wallet-btn-secondary outline"
          onClick={handleMethods}
        >
          Payment Methods
        </button>
      </div>

      {/* 💡 OPTIONAL INFO */}
      {availableBalance !== undefined && (
        <p className="wallet-balance-info">
          Available for withdrawal: {availableBalance} NC
        </p>
      )}

      {/* 🔐 KYC PANEL */}
      {isKycRequired && (
        <div className="wallet-kyc-card">
          <div className="wallet-kyc-icon">🔐</div>
          <div>
            <strong>Verification required</strong>
            <p>
              To protect your financial space, please complete identity verification before withdrawing.
            </p>
            <button
              className="wallet-kyc-btn"
              onClick={() => router.push("/wallet/kyc")}
            >
              Verify now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
