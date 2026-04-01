"use client";

import { useRouter, usePathname } from "next/navigation";
import "./WalletBottomNav.css";

export default function WalletBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  function isActive(path: string) {
    return pathname === path;
  }

  return (
    <div className="wallet-nav-wrapper">
      <div className="wallet-bottom-nav">

        {/* HOME */}
        <button
          className={`nav-item ${
            isActive("/wallet") ? "active" : ""
          }`}
          onClick={() => router.push("/wallet")}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </button>

        {/* FEED */}
        <button
          className={`nav-item ${
            pathname === "/risefeed" ? "active" : ""
          }`}
          onClick={() => router.push("/risefeed")}
        >
          <span className="nav-icon">🌊</span>
          <span className="nav-label">Feed</span>
        </button>

        {/* SETTINGS */}
        <button
          className={`nav-item ${
            pathname === "/wallet/settings"
              ? "active"
              : ""
          }`}
          onClick={() =>
            router.push("/wallet/settings")
          }
        >
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Settings</span>
        </button>

      </div>
    </div>
  );
}
