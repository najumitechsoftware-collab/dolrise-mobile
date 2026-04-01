"use client";
import { useRouter } from "next/navigation";
import { Notification } from "@/lib/notifications/api";

export default function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  const router = useRouter();

  return (
    <div
      className={`flex gap-3 p-3 rounded-xl cursor-pointer ${
        notification.is_read ? "opacity-70" : "bg-white"
      }`}
      onClick={() => {
        if (notification.deep_link) {
          router.push(notification.deep_link);
        }
      }}
    >
      <div className="text-xl">
        {notification.icon || "🔔"}
      </div>

      <div className="flex-1">
        <p className="text-sm leading-snug">
          {notification.message}
        </p>
        <span className="text-xs opacity-50">
          {new Date(notification.created_at).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
