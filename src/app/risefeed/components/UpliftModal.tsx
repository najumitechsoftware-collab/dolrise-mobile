"use client";

import { useState } from "react";
import "./UpliftModal.css";

interface Props {
  postId: number;
  receiverId: number;
  onClose: () => void;
}

export type UpliftTier =
  | "SEED"
  | "KIND"
  | "WARM"
  | "CARE"
  | "GENTLE"
  | "UPLIFT"
  | "STEADY"
  | "HEART"
  | "SUPPORT"
  | "ENCOURAGE"
  | "STRENGTH"
  | "HOPE"
  | "TRUST"
  | "DEEP"
  | "HONOR";

const UPLIFT_TIERS = [
  { tier: "SEED", label: "Seed", emoji: "🌱", nc: 10 },
  { tier: "KIND", label: "Kind", emoji: "🫧", nc: 25 },
  { tier: "WARM", label: "Warm", emoji: "✨", nc: 35 },
  { tier: "CARE", label: "Care", emoji: "🌿", nc: 50 },
  { tier: "GENTLE", label: "Gentle", emoji: "🌼", nc: 75 },
  { tier: "UPLIFT", label: "Uplift", emoji: "🔆", nc: 100 },
  { tier: "STEADY", label: "Steady", emoji: "🌊", nc: 125 },
  { tier: "HEART", label: "Heart", emoji: "💛", nc: 150 },
  { tier: "SUPPORT", label: "Support", emoji: "🔆", nc: 200 },
  { tier: "ENCOURAGE", label: "Encourage", emoji: "🌸", nc: 250 },
  { tier: "STRENGTH", label: "Strength", emoji: "🔥", nc: 300 },
  { tier: "HOPE", label: "Hope", emoji: "🌈", nc: 350 },
  { tier: "TRUST", label: "Trust", emoji: "🕊️", nc: 500 },
  { tier: "DEEP", label: "Deep", emoji: "💎", nc: 700 },
  { tier: "HONOR", label: "Honor", emoji: "👑", nc: 1000 },
] as const;

export default function UpliftModal({
  postId,
  receiverId,
  onClose,
}: Props) {
  const [loadingTier, setLoadingTier] = useState<UpliftTier | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any>(null);

  const PLATFORM_PERCENT = 0.3;

  const handleUplift = async (tier: UpliftTier) => {
    if (loadingTier) return;

    const selected = UPLIFT_TIERS.find((t) => t.tier === tier);
    if (!selected) return;

    setLoadingTier(tier);
    setError(null);

    try {
      /* ===============================
         1️⃣ INITIATE PAYMENT
      =============================== */
      const initRes = await fetch(
        "https://api.dolrise.com/api/payment/initiate",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nc_amount: selected.nc,
            meta: { postId },
          }),
        }
      );

      const initData = await initRes.json();

      if (!initData?.success) {
        throw new Error("INIT_FAILED");
      }

      /* ===============================
         2️⃣ VERIFY PAYMENT (🔥 CORE FIX)
      =============================== */
      const verifyRes = await fetch(
        "https://api.dolrise.com/api/payment/verify",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referenceId: initData.reference,
            receiverId,
            postId,
            tier,
            nc_amount: selected.nc,
          }),
        }
      );

      const verifyData = await verifyRes.json();

      if (!verifyData?.success) {
        throw new Error(verifyData?.error || "VERIFY_FAILED");
      }

      /* ===============================
         SUCCESS UI
      =============================== */
      const total = selected.nc;
      const platform = Math.floor(total * PLATFORM_PERCENT);
      const creator = total - platform;

      setSuccessData({
        total,
        creator,
        platform,
      });

    } catch (err: any) {
      console.error("❌ UPLIFT ERROR:", err);

      if (err.message === "INSUFFICIENT_BALANCE") {
        setError("Insufficient balance.");
      } else {
        setError("Uplift failed. Try again.");
      }
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="uplift-overlay" onClick={onClose}>
      <div
        className="uplift-sheet uplift-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="uplift-header">
          <button className="uplift-close" onClick={onClose}>
            ✕
          </button>
          <h3>Send Uplift</h3>
          <p>Your kindness has meaning 🤍</p>
        </div>

        <div className="uplift-tiers-grid">
          {UPLIFT_TIERS.map((t) => (
            <button
              key={t.tier}
              className={`uplift-tier ${
                t.tier === "HEART" ? "featured" : ""
              }`}
              disabled={!!loadingTier && loadingTier !== t.tier}
              onClick={() => handleUplift(t.tier)}
            >
              <div className="emoji">{t.emoji}</div>
              <div className="label">{t.label}</div>
              <div className="amount">
                {loadingTier === t.tier ? "Sending…" : `${t.nc} NC`}
              </div>
            </button>
          ))}
        </div>

        {error && <p className="uplift-error">{error}</p>}

        {successData && (
          <div className="uplift-success-modal">
            <div className="success-card">
              <h3>✨ Kindness delivered</h3>
              <p>You gave {successData.total} NC</p>

              <div className="breakdown">
                <div>
                  <span>They received</span>
                  <strong>{successData.creator} NC 🤍</strong>
                </div>

                <div>
                  <span>Platform fee</span>
                  <strong>{successData.platform} NC</strong>
                </div>
              </div>

              <button className="success-close" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
