"use client";

import { useEffect, useState } from "react";
import { registerServiceWorker, subscribeToPush } from "@/lib/push.api";

type PermissionState = NotificationPermission;

export function usePushNotifications() {
  const [permission, setPermission] =
    useState<PermissionState>("default");

  useEffect(() => {
    if (!("Notification" in window)) return;
    setPermission(Notification.permission);
  }, []);

  async function requestPermission() {
    if (!("Notification" in window)) return;

    const result = await Notification.requestPermission();
    setPermission(result);

    if (result === "granted") {
      try {
        await registerServiceWorker();
        await subscribeToPush();
        console.log("✅ Push subscription created");
      } catch (err) {
        console.error("❌ Push subscribe failed:", err);
      }
    }
  }

  return {
    permission,
    requestPermission,
  };
}
