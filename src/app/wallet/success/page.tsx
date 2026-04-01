"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/* =========================
   PAGE WRAPPER (Suspense)
========================= */

export default function WalletSuccessPage() {
  return (
    <Suspense fallback={<div />}>
      <WalletSuccessPageInner />
    </Suspense>
  );
}

/* =========================
   ORIGINAL PAGE CONTENT
========================= */

function WalletSuccessPageInner() {
  const router = useRouter();
  const params = useSearchParams();

  const reference = params.get("reference");

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #faf9f6, #f4f2ee)",
        padding: 24,
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: 22,
          padding: "36px 30px",
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* ICON */}
        <div
          style={{
            fontSize: 42,
            marginBottom: 12,
          }}
        >
          🌱
        </div>

        <h2
          style={{
            marginBottom: 10,
            fontSize: 22,
            fontWeight: 600,
            color: "#0f172a",
          }}
        >
          Wallet funded successfully
        </h2>

        <p
          style={{
            color: "#475569",
            fontSize: 14,
            marginBottom: 22,
            lineHeight: 1.6,
          }}
        >
          Your Najumi Currency has been added safely.
          <br />
          You’re all set — take your time 🤍
        </p>

        {reference && (
          <p
            style={{
              fontSize: 12,
              color: "#94a3b8",
              marginBottom: 20,
            }}
          >
            Reference
            <br />
            <code
              style={{
                background: "#f1f5f9",
                padding: "4px 8px",
                borderRadius: 6,
                display: "inline-block",
                marginTop: 4,
              }}
            >
              {reference}
            </code>
          </p>
        )}

        {/* ACTIONS */}

        <div style={{ marginTop: 28 }}>
          <button
            className="wallet-action primary"
            style={{
              width: "100%",
              marginBottom: 12,
            }}
            onClick={() => router.push("/wallet")}
          >
            Go to wallet
          </button>

          <button
            className="wallet-action"
            style={{
              width: "100%",
            }}
            onClick={() => router.push("/risefeed")}
          >
            Back to feed
          </button>
        </div>
      </div>
    </div>
  );
}
