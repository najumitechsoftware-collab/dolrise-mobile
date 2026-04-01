"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import IdentitySection from "./components/IdentitySection";
import SecuritySection from "./components/SecuritySection";
import PaymentMethodsSection from "./components/PaymentMethodsSection";
import CurrencySection from "./components/CurrencySection";
import LimitsSection from "./components/LimitsSection";
import PrivacySection from "./components/PrivacySection";
import HistorySection from "./components/HistorySection";
import LegalSection from "./components/LegalSection";

import "./styles/settings.css";

type KycStatus =
  | "not_started"
  | "pending"
  | "approved"
  | "rejected"
  | "auto_failed";

export default function WalletSettingsPage() {
  const router = useRouter();

  const [kycStatus, setKycStatus] =
    useState<KycStatus>("not_started");
  const [preferredCurrency, setPreferredCurrency] =
    useState("NGN");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =========================================================
     LOAD WALLET DASHBOARD DATA
  ========================================================= */
  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await fetch(
          "https://api.dolrise.com/api/wallet/dashboard",
          { credentials: "include" }
        );

        if (!res.ok) {
          throw new Error("Failed to load dashboard");
        }

        const data = await res.json();

        if (data?.success) {
          setKycStatus(
            data.data?.kyc?.status ?? "not_started"
          );

          if (data.data?.settings?.preferred_currency) {
            setPreferredCurrency(
              data.data.settings.preferred_currency
            );
          }
        }
      } catch (err: any) {
        console.error("Wallet settings error:", err);
        setError(
          "Unable to load wallet settings. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  /* =========================================================
     LOADING STATE
  ========================================================= */
  if (loading) {
    return (
      <div className="wallet-settings loading-state">
        <div className="loader-card">
          <div className="spinner" />
          <p>Loading Wallet Control Center…</p>
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR STATE
  ========================================================= */
  if (error) {
    return (
      <div className="wallet-settings error-state">
        <div className="error-card">
          <h2>Wallet Unavailable</h2>
          <p>{error}</p>

          {/* ✅ FIXED HERE */}
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.reload();
              }
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN UI
  ========================================================= */
  return (
    <div className="wallet-settings">
      {/* HEADER */}
      <div className="wallet-settings-header">
        <h1>Wallet Control Center</h1>
        <p>
          Secure your financial access, manage payout
          infrastructure and control global withdrawal
          preferences.
        </p>
      </div>

      {/* SECTIONS */}
      <div className="wallet-settings-sections">
        <IdentitySection status={kycStatus} />
        <SecuritySection router={router} />
        <PaymentMethodsSection router={router} />
        <CurrencySection
          preferredCurrency={preferredCurrency}
          setPreferredCurrency={setPreferredCurrency}
        />
        <LimitsSection />
        <PrivacySection />
        <HistorySection router={router} />
        <LegalSection />
      </div>

      {/* FOOTER NOTE */}
      <div className="wallet-settings-footer">
        <p>
          DolRise Financial Infrastructure •
          Enterprise-grade wallet architecture •
          Global compliant payout system
        </p>
      </div>
    </div>
  );
}
