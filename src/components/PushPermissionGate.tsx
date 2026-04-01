"use client";

import { usePushNotifications } from "@/hooks/usePushNotifications";

export default function PushPermissionGate() {
  const { permission, requestPermission } = usePushNotifications();

  // Idan user ya riga ya yanke hukunci, kada mu dame shi
  if (permission !== "default") return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        padding: 14,
        background: "#fff7e9",
        borderRadius: 12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        zIndex: 50,
      }}
    >
      <p style={{ marginBottom: 8 }}>
        🔔 DolRise can gently notify you when something meaningful happens.
      </p>
      <button
        onClick={requestPermission}
        style={{
          padding: "8px 14px",
          borderRadius: 8,
          background: "#d4af37",
          color: "#000",
          border: "none",
          fontWeight: 600,
        }}
      >
        Enable notifications
      </button>
    </div>
  );
}
