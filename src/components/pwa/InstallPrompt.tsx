"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/* =========================================================
   TYPES
========================================================= */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/* =========================================================
   CONSTANTS
========================================================= */
const STORAGE_KEY = "dolrise_pwa_install_prompt";
const ONE_DAY = 24 * 60 * 60 * 1000;

/* =========================================================
   COMPONENT
========================================================= */
export default function InstallPrompt() {
  const pathname = usePathname();

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  /* =======================================================
     CONDITIONS
  ======================================================= */

  // 🔒 Show ONLY on Risefeed
  const isAllowedPage = pathname === "/risefeed";

  /* =======================================================
     EFFECT: Listen for install prompt
  ======================================================= */
  useEffect(() => {
    if (!isAllowedPage) return;

    const lastShown = localStorage.getItem(STORAGE_KEY);
    if (lastShown && Date.now() - Number(lastShown) < ONE_DAY) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, [isAllowedPage]);

  /* =======================================================
     INSTALL ACTION
  ======================================================= */
  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    // ✅ If installed → never show again
    if (choice.outcome === "accepted") {
      localStorage.setItem(STORAGE_KEY, "installed");
    }

    setDeferredPrompt(null);
    setVisible(false);
  };

  /* =======================================================
     EXIT CONDITIONS
  ======================================================= */
  if (!visible || !isAllowedPage) return null;

  /* =======================================================
     UI
  ======================================================= */
  return (
    <div
      onClick={handleInstall}
      style={{
        position: "fixed",
        bottom: "16px",
        left: "16px",
        right: "16px",
        zIndex: 60,

        background: "#f8fafc", // 🥛 milk
        border: "1px solid #0b7285", // 🌊 sea blue
        borderRadius: "14px",
        padding: "14px 16px",

        boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
        cursor: "pointer",
      }}
    >
      <strong style={{ color: "#0b7285", fontSize: "15px" }}>
        🌊 DolRise App
      </strong>

      <p
        style={{
          margin: "6px 0 10px",
          fontSize: "14px",
          color: "#334155",
          lineHeight: 1.4,
        }}
      >
        Use DolRise like a real app on your phone.
      </p>

      <span
        style={{
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: "999px",
          background: "#0b7285",
          color: "#ffffff",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        Install App
      </span>
    </div>
  );
}
