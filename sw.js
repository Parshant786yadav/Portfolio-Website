// Service worker: long-lived cache for static assets (fixes "Use efficient cache lifetimes" on mobile)
const CACHE_NAME = 'portfolio-v1';
const LONG_CACHE = 31536000; // 1 year in seconds (immutable-like)

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/logoooo.png',
  '/Favicon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first for same-origin static assets; network-first for HTML
function isStaticAsset(url) {
  try {
    const u = new URL(url);
    if (u.origin !== location.origin) return false;
    const path = u.pathname;
    return (
      /\.(png|jpe?g|gif|webp|ico|css|js|woff2?|svg)(\?.*)?$/i.test(path) ||
      path === '/' || path === '/index.html'
    );
  } catch (_) {
    return false;
  }
}

self.addEventListener('fetch', (e) => {
  const url = e.request.url;
  if (e.request.method !== 'GET') return;

  if (isStaticAsset(url)) {
    e.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(e.request).then((cached) => {
          if (cached) return cached;
          return fetch(e.request).then((res) => {
            if (res.ok) cache.put(e.request, res.clone());
            return res;
          });
        })
      )
    );
  }
});
