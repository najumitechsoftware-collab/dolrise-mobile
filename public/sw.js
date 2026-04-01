/* =========================================================
   DolRise Service Worker
   Fast • Stable • PWA Optimized
========================================================= */

const CACHE_NAME = "dolrise-static-v2";

/* Core assets for instant launch */
const STATIC_ASSETS = [
  "/",
  "/manifest.json",

  /* Icons */
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-512-maskable.png",

  /* Favicons */
  "/favicon.ico",
  "/favicon.png",
  "/apple-touch-icon.png"
];

/* =========================================================
   INSTALL
========================================================= */

self.addEventListener("install", (event) => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch(() => {})
  );

});

/* =========================================================
   ACTIVATE
========================================================= */

self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )

  );

  /* Enable navigation preload for faster startup */
  if (self.registration.navigationPreload) {
    self.registration.navigationPreload.enable();
  }

  self.clients.claim();

});

/* =========================================================
   FETCH STRATEGY
========================================================= */

self.addEventListener("fetch", (event) => {

  const request = event.request;
  const url = new URL(request.url);

  /* Never touch API requests */
  if (url.pathname.startsWith("/api")) {
    return;
  }

  /* PAGE NAVIGATION */
  if (request.mode === "navigate") {

    event.respondWith(

      (async () => {

        try {

          const preload = await event.preloadResponse;
          if (preload) return preload;

          const network = await fetch(request);

          const cache = await caches.open(CACHE_NAME);
          cache.put(request, network.clone());

          return network;

        } catch {

          const cached = await caches.match("/");
          if (cached) return cached;

        }

      })()

    );

    return;
  }

  /* STATIC FILES */
  event.respondWith(

    caches.match(request).then((cached) => {

      if (cached) return cached;

      return fetch(request)
        .then((response) => {

          if (!response || response.status !== 200) {
            return response;
          }

          const copy = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => cache.put(request, copy));

          return response;

        })
        .catch(() => cached);

    })

  );

});

/* =========================================================
   PUSH NOTIFICATIONS
========================================================= */

self.addEventListener("push", (event) => {

  if (!event.data) return;

  const data = event.data.json();

  const title = data.title || "DolRise";

  const options = {
    body: data.body || "You have a new notification",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    data: {
      url: data.url || "/notifications"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );

});

/* =========================================================
   NOTIFICATION CLICK
========================================================= */

self.addEventListener("notificationclick", (event) => {

  event.notification.close();

  const url = event.notification.data?.url || "/notifications";

  event.waitUntil(

    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {

        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(url);
        }

      })

  );

});
