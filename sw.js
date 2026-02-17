const CACHE_NAME = 'aletamoney-v8';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://raw.githubusercontent.com/AlleRock/atmoney/main/icona.png',
  'https://cdn.tailwindcss.com'
];

// Installazione: salva i file nella cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Attivazione: pulisce vecchie versioni della cache
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch: serve i file dalla cache se sei offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
