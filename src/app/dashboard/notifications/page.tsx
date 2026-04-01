"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchNotifications,
  markAllNotificationsRead,
} from "@/lib/notifications.api";

/* ======================================
   TYPES (MATCH BACKEND EXACTLY)
====================================== */
interface Notification {
  id: number;
  type: string;
  message: string;
  icon?: string | null;   // ✅ FIX: allow null
  is_read: boolean;
  created_at: string;
  deep_link?: string | null;
}

export default function DashboardNotificationsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  /* ======================================
     LOAD NOTIFICATIONS
  ====================================== */
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchNotifications();
        setNotifications(data.notifications ?? []);
        await markAllNotificationsRead();
      } catch (err) {
        console.error("Failed to load notifications", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ======================================
     RENDER
  ====================================== */
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      {/* 🔙 BACK */}
      <button
        onClick={() => router.push("/dashboard")}
        style={{
          marginBottom: 16,
          fontSize: 14,
          opacity: 0.7,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Back to Feed
      </button>

      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20 }}>
        Notifications
      </h1>

      {/* LOADING */}
      {loading && <p style={{ opacity: 0.6 }}>Loading…</p>}

      {/* EMPTY */}
      {!loading && notifications.length === 0 && (
        <p style={{ opacity: 0.6 }}>No notifications yet 🌱</p>
      )}

      {/* LIST */}
      {!loading &&
        notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              if (n.deep_link) router.push(n.deep_link);
            }}
            style={{
              padding: 14,
              borderRadius: 12,
              marginBottom: 10,
              background: n.is_read ? "#fff" : "#fff7e9",
              cursor: n.deep_link ? "pointer" : "default",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: 14 }}>
              {n.icon && (
                <span style={{ marginRight: 6 }}>{n.icon}</span>
              )}
              {n.message}
            </div>

            <div style={{ fontSize: 12, opacity: 0.5, marginTop: 4 }}>
              {new Date(n.created_at).toLocaleString()}
            </div>
          </div>
        ))}
    </div>
  );
}
