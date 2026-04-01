"use client";

import { useEffect, useRef, useState } from "react";

export type FeedHealth =
  | "healthy"
  | "limited"
  | "paused";

const HEALTH_URL = "https://api.dolrise.com/api/health";
const CHECK_INTERVAL = 20000; // 20s – calm heartbeat
const REQUEST_TIMEOUT = 4000; // 4s – patience window

export function useFeedHealth() {
  const [status, setStatus] =
    useState<FeedHealth>("healthy");

  const consecutiveFailures = useRef(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const checkHealth = async () => {
      // 🌙 If user is offline → paused (gentle)
      if (!navigator.onLine) {
        if (mounted.current) setStatus("paused");
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        REQUEST_TIMEOUT
      );

      try {
        const res = await fetch(HEALTH_URL, {
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error("Health not OK");

        consecutiveFailures.current = 0;

        if (mounted.current) {
          setStatus("healthy");
        }
      } catch {
        clearTimeout(timeoutId);
        consecutiveFailures.current += 1;

        if (!mounted.current) return;

        // 🌿 First failures → limited (still flowing)
        if (consecutiveFailures.current < 3) {
          setStatus("limited");
        } else {
          // 🧘 Sustained failure → paused
          setStatus("paused");
        }
      }
    };

    // 🔁 Initial check
    checkHealth();

    // 🫀 Calm heartbeat
    const interval = setInterval(
      checkHealth,
      CHECK_INTERVAL
    );

    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, []);

  return { status };
}
