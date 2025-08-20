const CACHE_NAME = 'hooma-v1';
const urlsToCache = [
  '/Hooma-Website/',
  '/Hooma-Website/index.html',
  '/Hooma-Website/manifest.json',
  '/Hooma-Website/images/logo.png',
  '/Hooma-Website/images/icon-192.png',
  '/Hooma-Website/images/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});