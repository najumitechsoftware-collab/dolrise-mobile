const PUBLIC_VAPID_KEY =
  "BCnq-RsZQR6xbNv8urOAYm6R8jGdkk8H0Uhf6WPRirIJWejl2qLOiJ9V_a6ejv6dMsiBw2x75qagLlm2OZdu5TA";

/* =========================
   REGISTER SERVICE WORKER
========================= */
export async function registerSW() {
  if (!("serviceWorker" in navigator)) return null;
  return navigator.serviceWorker.register("/sw.js");
}

/* =========================
   SUBSCRIBE TO PUSH
========================= */
export async function subscribeToPush() {
  const reg = await navigator.serviceWorker.ready;

  const existing = await reg.pushManager.getSubscription();
  if (existing) return existing;

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });

  await fetch("https://api.dolrise.com/api/push/subscribe", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sub),
  });

  return sub;
}

/* =========================
   HELPERS
========================= */
function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const base64Safe = (base64 + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const raw = atob(base64Safe);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}
