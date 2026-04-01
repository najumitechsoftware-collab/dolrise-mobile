"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./security.css";

export default function WalletSecurityAccessPage() {
  const router = useRouter();

  const [accessMode, setAccessMode] = useState<
    "none" | "pin" | "password" | "pattern"
  >("none");

  const [credential, setCredential] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lockedMessage, setLockedMessage] = useState("");

  useEffect(() => {
    async function loadSecurity() {
      try {
        const res = await fetch(
          "https://api.dolrise.com/api/wallet/security/settings",
          { credentials: "include" }
        );

        const data = await res.json();

        if (data?.success) {
          setAccessMode(data.data.access_mode);
        }
      } catch (err) {
        console.error("Security load error", err);
      } finally {
        setLoading(false);
      }
    }

    loadSecurity();
  }, []);

  async function handleVerify() {
    setError("");
    setLockedMessage("");

    try {
      const res = await fetch(
        "https://api.dolrise.com/api/wallet/security/verify",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        if (data.error === "WALLET_TEMPORARILY_LOCKED") {
          setLockedMessage(
            "Wallet temporarily locked. Please wait 15 minutes."
          );
        } else {
          setError("Invalid credentials.");
        }
        return;
      }

      router.push("/wallet/dashboard");
    } catch (err) {
      setError("Verification failed.");
    }
  }

  if (loading) {
    return <div className="wallet-security-container">Loading…</div>;
  }

  if (accessMode === "none") {
    router.push("/wallet/dashboard");
    return null;
  }

  return (
    <div className="wallet-security-container">

      <div className="wallet-security-card">

        <h1>Secure Wallet Access</h1>

        {accessMode === "pin" && (
          <>
            <label>Enter Access PIN</label>
            <input
              type="password"
              maxLength={8}
              value={credential}
              onChange={(e) =>
                setCredential(e.target.value)
              }
              placeholder="••••••"
            />
          </>
        )}

        {accessMode === "password" && (
          <>
            <label>Enter Wallet Password</label>
            <input
              type="password"
              value={credential}
              onChange={(e) =>
                setCredential(e.target.value)
              }
              placeholder="Enter password"
            />
          </>
        )}

        {accessMode === "pattern" && (
          <>
            <label>Enter Pattern Code</label>
            <input
              type="password"
              value={credential}
              onChange={(e) =>
                setCredential(e.target.value)
              }
              placeholder="Pattern"
            />
          </>
        )}

        {error && <p className="error-text">{error}</p>}
        {lockedMessage && (
          <p className="locked-text">{lockedMessage}</p>
        )}

        <button
          className="verify-btn"
          onClick={handleVerify}
          disabled={!credential}
        >
          Unlock Wallet
        </button>

      </div>
    </div>
  );
}
