const CACHE_NAME = "hls-player-cache-v1";
const urlsToCache = [
    "/positron/",
    "/positron/index.html",
    "/positron/app.js",
    "/positron/manifest.json",
    "/positron/icon.png"
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated.");
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
});
