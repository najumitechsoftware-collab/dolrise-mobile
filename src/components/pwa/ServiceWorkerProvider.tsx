"use client";

import { useEffect } from "react";

export default function ServiceWorkerProvider() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    // 🔒 Register ONLY in production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          "/sw.js",
          { scope: "/" }
        );

        console.log(
          "✅ DolRise Service Worker registered:",
          registration
        );
      } catch (error) {
        console.error(
          "❌ DolRise Service Worker registration failed:",
          error
        );
      }
    };

    // Delay slightly to avoid race with hydration
    setTimeout(registerSW, 500);
  }, []);

  return null;
}
