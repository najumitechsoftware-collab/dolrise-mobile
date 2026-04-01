"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import "./FeedBottomNav.css";

export default function FeedBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  const lastTapRef = useRef(0);
  const DOUBLE_TAP_DELAY = 300;

  const isActive = useCallback(
    (path: string) => pathname.startsWith(path),
    [pathname]
  );

  /* ===============================
     ⚡ INSTANT NAVIGATION + DOUBLE TAP
  =============================== */

  const go = useCallback(
    (path: string) => {
      const now = Date.now();
      const timeSinceLastTap = now - lastTapRef.current;
      lastTapRef.current = now;

      if (pathname === path) {
        if (path === "/risefeed") {

          // 🔥 DOUBLE TAP → SCROLL TOP
          if (timeSinceLastTap < DOUBLE_TAP_DELAY) {
            window.dispatchEvent(new Event("dolrise:scrollTop"));
            return;
          }

          // 🔄 SINGLE TAP → REFRESH
          window.dispatchEvent(new Event("dolrise:refreshFeed"));
        }
        return;
      }

      router.prefetch(path);
      router.replace(path);
    },
    [pathname, router]
  );

  /* ===============================
     👁️ SCROLL HIDE (PERF SAFE)
  =============================== */

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const lastY = lastYRef.current;

        if (Math.abs(currentY - lastY) > 8) {
          setHidden(currentY > lastY);
          lastYRef.current = currentY;
        }

        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`dolbar ${hidden ? "hide" : ""}`}>

      {/* 🏠 HOME */}
      <button
        onClick={() => go("/risefeed")}
        className={isActive("/risefeed") ? "active" : ""}
      >
        <span className="icon">🏠</span>
        <span className="label">Home</span>
      </button>

      {/* 💰 WALLET */}
      <button
        onClick={() => go("/wallet")}
        className={isActive("/wallet") ? "active" : ""}
      >
        <span className="icon">💰</span>
        <span className="label">Wallet</span>
      </button>

      {/* ➕ CREATE */}
      <button
        onClick={() => go("/create")}
        className={isActive("/create") ? "active" : ""}
      >
        <span className="icon">➕</span>
        <span className="label">Create</span>
      </button>

      {/* 👤 PROFILE */}
      <button
        onClick={() => go("/profile-ui")}
        className={isActive("/profile-ui") ? "active" : ""}
      >
        <span className="icon">👤</span>
        <span className="label">Profile</span>
      </button>

    </div>
  );
}
