"use client";

import { useEffect, useState } from "react";
import SecuritySummaryCard from "./components/SecuritySummaryCard";
import AccessModeSection from "./components/AccessModeSection";
import TransactionPinSection from "./components/TransactionPinSection";
import SessionControlSection from "./components/SessionControlSection";
import "./security.css";

export default function WalletSecurityDashboard() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await fetch(
        "https://api.dolrise.com/api/wallet/security",
        { credentials: "include" }
      );

      const data = await res.json();

      if (data.success) {
        setSettings(data.data);
      } else {
        setSettings(null);
      }
    } catch (err) {
      console.error(err);
      setSettings(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="security-loading">
        Loading security settings...
      </div>
    );
  }

  // 🔐 TRUE ONLY IF PIN EXISTS
  const hasTransactionPin =
    !!settings?.transaction_pin_hash;

  return (
    <div className="security-dashboard">

      <div className="security-header">
        <h1>Wallet Security Control</h1>
        <p>
          Secure your wallet with layered protection.
        </p>
      </div>

      <SecuritySummaryCard settings={settings} />

      {/* ALWAYS SHOW PIN SECTION */}
      <TransactionPinSection
        settings={settings}
        refresh={load}
      />

      {/* SHOW OTHER SECTIONS ONLY AFTER PIN */}
      {hasTransactionPin && (
        <>
          <AccessModeSection
            settings={settings}
            refresh={load}
          />

          <SessionControlSection
            settings={settings}
            refresh={load}
          />
        </>
      )}

    </div>
  );
}
