"use client";

export const dynamic = "force-dynamic";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import WalletHeader from "./components/WalletHeader";
import WalletBalances from "./components/WalletBalances";
import WalletActions from "./components/WalletActions";
import WalletActivity from "./components/WalletActivity";
import WalletBottomNav from "./components/WalletBottomNav";

import "./styles/wallet.css";

export default function WalletPage() {
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [fiatPreview, setFiatPreview] = useState<number | null>(null);
  const [rateInfo, setRateInfo] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /* ===============================
     🚀 LOAD WALLET
  =============================== */
  const loadWallet = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      else setRefreshing(true);

      const res = await fetch(
        "https://api.dolrise.com/api/wallet/dashboard",
        {
          credentials: "include",
        }
      );

      if (res.status === 401) {
        router.replace("/login");
        return;
      }

      const json = await res.json();

      if (json.success) {
        setData(json.data);

        const available = json.data?.balance?.available_nc ?? 0;

        await previewExchange(available);
      }
    } catch (err) {
      console.error("Wallet load error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  /* ===============================
     💱 PREVIEW EXCHANGE
  =============================== */
  const previewExchange = useCallback(async (ncAmount: number) => {
    try {
      const res = await fetch(
        "https://api.dolrise.com/api/wallet/exchange/preview",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nc_amount: ncAmount,
          }),
        }
      );

      const json = await res.json();

      if (json.success) {
        setFiatPreview(json.data.fiat_amount);
        setRateInfo(json.data);
      }
    } catch {
      console.error("Exchange preview failed");
    }
  }, []);

  /* ===============================
     🔄 INITIAL LOAD
  =============================== */
  useEffect(() => {
    loadWallet();
  }, [loadWallet]);

  /* ===============================
     🔁 AUTO REFRESH (REAL-TIME)
  =============================== */
  useEffect(() => {
    const interval = setInterval(() => {
      loadWallet(true); // silent refresh
    }, 5000);

    return () => clearInterval(interval);
  }, [loadWallet]);

  /* ===============================
     🔄 MANUAL REFRESH
  =============================== */
  const handleRefresh = () => {
    loadWallet(true);
  };

  /* ===============================
     🧠 DEFAULTS
  =============================== */
  const balance = data?.balance ?? {
    available_nc: 0,
    locked_nc: 0,
  };

  const withdrawal = data?.withdrawal ?? {
    can_withdraw: false,
    reason: undefined,
  };

  /* ===============================
     ⏳ LOADING UI
  =============================== */
  if (loading) {
    return (
      <div className="wallet-loader-wrapper">
        <div className="wallet-loader-circle"></div>
      </div>
    );
  }

  /* ===============================
     🎯 MAIN UI
  =============================== */
  return (
    <div className="wallet-page">
      <WalletHeader />

      {/* 🔄 Refresh Indicator */}
      {refreshing && (
        <div style={{ textAlign: "center", fontSize: 12, opacity: 0.6 }}>
          Updating...
        </div>
      )}

      <WalletBalances
        availableNC={balance.available_nc}
        lockedNC={balance.locked_nc}
        fiatPreview={fiatPreview}
        rateInfo={rateInfo}
      />

      <WalletActions
        canWithdraw={withdrawal.can_withdraw}
        withdrawReason={withdrawal.reason}
        availableBalance={balance.available_nc}
        onRefresh={handleRefresh} // 🔥 NEW
      />

      <WalletActivity
        activities={data?.recent_activity ?? []}
      />

      <WalletBottomNav />
    </div>
  );
}
