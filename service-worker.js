self.addEventListener("install", (event) => {
    console.log("Service Worker installing.");
    event.waitUntil(
        caches.open("positron-cache").then((cache) => {
            return cache.addAll([
                "/positron/",
                "/positron/index.html",
                "/positron/style.css",
                "/positron/manifest.json",
                "/positron/app.js",
                "/positron/icon-192.png",
                "/positron/icon-512.png"
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
