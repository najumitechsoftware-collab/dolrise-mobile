"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchNotifications,
  markAllNotificationsRead,
} from "@/lib/notifications.api";

import NotificationsTabs from "./NotificationsTabs";
import NotificationItem from "./NotificationItem";
import "./notifications.css";

export default function NotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchNotifications();
        setNotifications(data.notifications || []);
        markAllNotificationsRead().catch(() => {});
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function filteredNotifications() {
    if (activeTab === "all") return notifications;
    return notifications.filter((n) => n.type === activeTab);
  }

  return (
    <div className="notifications-page">
      {/* HEADER */}
      <div className="notifications-header">
        {/* ⬅ BACK BUTTON */}
        <button
          className="notifications-back"
          onClick={() => router.push("/risefeed")}
          aria-label="Back to feed"
        >
          ←
        </button>

        <h1>Notifications</h1>
      </div>

      {/* TABS */}
      <NotificationsTabs active={activeTab} onChange={setActiveTab} />

      {/* LIST */}
      <div className="notifications-list">
        {loading && <p className="muted">Loading…</p>}

        {!loading && filteredNotifications().length === 0 && (
          <p className="muted">Nothing here 🌱</p>
        )}

        {filteredNotifications().map((n) => (
          <NotificationItem key={n.id} data={n} />
        ))}
      </div>
    </div>
  );
}
