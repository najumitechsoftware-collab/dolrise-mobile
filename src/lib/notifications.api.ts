const API_BASE = "https://api.dolrise.com/api/notifications";

/* ======================================
   FETCH ALL NOTIFICATIONS
====================================== */
export async function fetchNotifications() {
  const res = await fetch(API_BASE, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to load notifications");
  }
  return res.json(); // { notifications, unreadCount }
}

/* ======================================
   FETCH UNREAD COUNT ONLY
====================================== */
export async function fetchUnreadCount(): Promise<number> {
  const res = await fetch(API_BASE, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch unread count");
  }

  const data = await res.json();
  return data.unreadCount ?? 0;
}

/* ======================================
   MARK ALL AS READ
====================================== */
export async function markAllNotificationsRead() {
  const res = await fetch(`${API_BASE}/mark-all`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to mark notifications as read");
  }

  return res.json();
}

/* ======================================
   DELETE SINGLE NOTIFICATION
====================================== */
export async function deleteNotification(id: number) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to delete notification");
  }

  return res.json();
}
