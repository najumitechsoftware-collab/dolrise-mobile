"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUnreadCount } from "@/lib/notifications.api";

export default function NotificationBell({
  onClick,
}: {
  onClick: () => void;
}) {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);

  /* ===============================
     LOAD UNREAD COUNT
  =============================== */
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const unread = await fetchUnreadCount();
        if (mounted) setCount(unread);
      } catch (err) {
        console.error("Failed to load unread count", err);
      }
    }

    load();

    // optional: poll every 30s (socket zai maye gurbinsa daga baya)
    const interval = setInterval(load, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <button
      onClick={onClick}
      className="relative"
      aria-label="Notifications"
    >
      🔔

      {/* 🔴 RED BADGE */}
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            minWidth: 18,
            height: 18,
            borderRadius: "50%",
            background: "#e11d48",
            color: "#fff",
            fontSize: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 5px",
            lineHeight: 1,
          }}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
