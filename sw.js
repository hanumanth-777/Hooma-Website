// Simple Service Worker for Hooma
const CACHE_NAME = 'hooma-v1';
const urlsToCache = [
  '/Hooma-Website/',
  '/Hooma-Website/index.html',
  '/Hooma-Website/manifest.json',
  '/Hooma-Website/images/logo.png',
  '/Hooma-Website/images/icon-192.png',
  '/Hooma-Website/images/icon-512.png'
];

// Install event - cache files immediately
self.addEventListener('install', event => {
  self.skipWaiting(); // Activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
