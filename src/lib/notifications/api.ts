export interface Notification {
  id: number;
  type: string;
  message: string;
  icon?: string;
  deep_link?: string;
  is_read: boolean;
  created_at: string;
  extra?: any;
}

export async function fetchNotifications() {
  const res = await fetch("https://api.dolrise.com/api/notifications", {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to load notifications");
  return res.json(); // { notifications, unreadCount }
}

export async function markAllNotificationsRead() {
  await fetch(
    "https://api.dolrise.com/api/notifications/mark-all",
    {
      method: "POST",
      credentials: "include",
    }
  );
}

export async function deleteNotification(id: number) {
  await fetch(
    `https://api.dolrise.com/api/notifications/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
}
