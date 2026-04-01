"use client";

import { useEffect, useState } from "react";
import { fetchNotifications } from "@/lib/notifications.api";

export default function NotificationModal({ onClose }: any) {
  const [notis, setNotis] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications().then((data) => {
      setNotis(data.notifications || []);
    });
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(4px)",
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "70%",
          background: "#fff7e9",
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          padding: "20px",
          animation: "slideUp 0.25s ease",
        }}
      >
        {/* 🔔 ICON + TITLE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: 28, color: "#d4af37" }}>🔔</span>

          <h2
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#d4af37",
            }}
          >
            Notifications
          </h2>
        </div>

        {/* CONTENT */}
        {notis.length === 0 ? (
          <p style={{ marginTop: 20, opacity: 0.6 }}>No notifications yet…</p>
        ) : (
          <div style={{ marginTop: 18 }}>
            {notis.map((n) => (
              <div
                key={n.id}
                style={{
                  background: "#ffffff",
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 10,
                  borderLeft: "3px solid #d4af37",
                }}
              >
                <strong>{n.icon}</strong> {n.message}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
