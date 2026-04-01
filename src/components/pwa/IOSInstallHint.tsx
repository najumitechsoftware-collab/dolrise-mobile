"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/* =========================================================
   CONSTANTS
========================================================= */
const STORAGE_KEY = "dolrise_ios_install_hint";
const ONE_DAY = 24 * 60 * 60 * 1000;

/* =========================================================
   COMPONENT
========================================================= */
export default function IOSInstallHint() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 🔒 Show ONLY on Risefeed
    if (pathname !== "/risefeed") return;

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = (window.navigator as any).standalone === true;

    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (lastShown && Date.now() - Number(lastShown) < ONE_DAY) {
      return;
    }

    if (isIOS && !isStandalone) {
      setVisible(true);
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }
  }, [pathname]);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "18px",
        left: "16px",
        right: "16px",
        zIndex: 60,

        background: "#f8fafc", // 🥛 milk
        border: "1px solid #0b7285", // 🌊 sea blue
        borderRadius: "16px",
        padding: "14px 16px",

        boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
        fontSize: "14px",
      }}
    >
      <strong style={{ color: "#0b7285" }}>
        🌊 Get DolRise App
      </strong>

      <p style={{ margin: "6px 0 10px", color: "#334155" }}>
        Add DolRise to your Home Screen for the best experience.
      </p>

      <p style={{ fontSize: "13px", color: "#475569" }}>
        Tap <strong>Share</strong> → <strong>Add to Home Screen</strong>
      </p>

      <div style={{ marginTop: "10px", textAlign: "right" }}>
        <button
          onClick={dismiss}
          style={{
            background: "transparent",
            border: "none",
            color: "#64748b",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Not now
        </button>
      </div>
    </div>
  );
}
