/* Minimal service worker for offline caching static assets. Customize for your needs. */
const CACHE_NAME = "portfolio-cache-v1";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/file.svg",
  "/next.svg",
  "/vercel.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
