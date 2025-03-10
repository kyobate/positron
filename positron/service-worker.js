const CACHE_NAME = "hls-player-cache-v1";
const urlsToCache = [
    "/positron/",
    "/positron/index.html",
    "/positron/app.js",
    "/positron/manifest.json",
    "https://cdn.jsdelivr.net/npm/hls.js@latest"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
