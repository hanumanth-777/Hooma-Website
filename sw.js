// Simple Service Worker for Hooma - Fast Loading Version
const CACHE_NAME = 'hooma-fast-v1';
const urlsToCache = [
  '/Hooma-Website/',
  '/Hooma-Website/index.html',
  '/Hooma-Website/manifest.json',
  '/Hooma-Website/images/logo.png',
  '/Hooma-Website/images/icon-192.png',
  '/Hooma-Website/images/icon-512.png'
];

// INSTALL - Cache essential files immediately
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting(); // Activate immediately without waiting
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching essential files');
        return cache.addAll(urlsToCache).catch(error => {
          console.log('Cache addAll failed:', error);
        });
      })
  );
});

// ACTIVATE - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control immediately
});

// FETCH - Serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

console.log('Service Worker loaded successfully');
// ADVANCED FEATURES (Not needed for Hooma)
// Push notifications
self.addEventListener('push', function(event) {
  const options = {
    body: 'New homes available!',
    icon: 'images/icon-192.png',
    badge: 'images/icon-72.png'
  };
  event.waitUntil(self.registration.showNotification('Hooma', options));
});

// Background sync
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  return new Promise((resolve) => {
    console.log('Background sync completed');
    resolve();
  });
}

