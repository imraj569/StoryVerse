const CACHE_NAME = 'storyverse-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/audiobooks.json',
  '/manifest.json',
  '/placeholder.svg',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@600&family=Open+Sans:wght@400;600&display=swap'
];

// Install event: cache all critical assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(assetsToCache);
      })
  );
});

// Fetch event: serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});