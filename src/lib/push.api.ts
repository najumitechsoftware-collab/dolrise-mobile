/* ======================================================
   DOLRISE WEB PUSH CLIENT
====================================================== */

const PUBLIC_VAPID_KEY =
  "BCnq-RsZQR6xbNv8urOAYm6R8jGdkk8H0Uhf6WPRirIJWejl2qLOiJ9V_a6ejv6dMsiBw2x75qagLlm2OZdu5TA";

/* ======================================================
   REGISTER SERVICE WORKER
====================================================== */
export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return null;

  const reg = await navigator.serviceWorker.register("/sw.js");
  return reg;
}

/* ======================================================
   SUBSCRIBE USER TO PUSH
====================================================== */
export async function subscribeToPush() {
  if (!("serviceWorker" in navigator)) return;
  if (!("PushManager" in window)) return;

  // 🔐 Ask permission
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("❌ Push permission denied");
    return;
  }

  // 📌 Ensure SW is ready
  const registration = await navigator.serviceWorker.ready;

  // 🔁 Prevent duplicate subscriptions
  const existing = await registration.pushManager.getSubscription();
  if (existing) {
    console.log("ℹ️ Push already subscribed");
    return existing;
  }

  // 🔔 Subscribe
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });

  // 📡 Send to backend
  const res = await fetch(
    "https://api.dolrise.com/api/push/subscribe",
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to save push subscription");
  }

  console.log("✅ Push subscription saved");
  return subscription;
}

/* ======================================================
   HELPERS
====================================================== */
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
