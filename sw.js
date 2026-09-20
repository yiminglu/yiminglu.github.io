/*
 * Service worker template. scripts/generateSW.js fills in the revision and the
 * precache-list placeholders and writes the result to public/sw.js — never edit
 * the generated file by hand.
 *
 * Strategy:
 *   - install:  precache the app shell atomically, bypassing the HTTP cache.
 *   - activate: drop only OUR older precache versions, then claim clients.
 *   - fetch:    navigations are network-first (fresh HTML, cached copy or
 *               /offline.html when the network fails); other same-origin GETs
 *               are cache-first with a network fallback.
 */

const CACHE_PREFIX = 'sr-precache-';
const cacheName = CACHE_PREFIX + '5b052c53c001';
const OFFLINE_URL = '/offline.html';
const PRECACHE = [
  "/",
  "/posts.html",
  "/about.html",
  "/links.html",
  "/offline.html",
  "/css/main.min.0766c2f724c20fa75a56ba0d7b21b04cf5bfb897ac58146a46c6684fa7e7d35b.css",
  "/js/main.min.4691eb0679edb07512a91bf1a38ba304b0ce53b5b4caefa49bf558c9ac1ac584.js",
  "/manifest.json",
  "/favicon.ico",
  "/favicon.svg",
  "/images/logo/SR-oneline.png",
  "/images/topbar/1.jpg",
  "/images/topbar/2.jpg",
  "/images/topbar/3.jpg"
];

self.addEventListener('install', function (e) {
  console.log('[SW] Install', cacheName);
  e.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        // { cache: 'reload' } goes to the network, so a stale HTTP cache can
        // never be baked into a new precache version.
        return cache.addAll(PRECACHE.map(function (url) {
          return new Request(url, { cache: 'reload' });
        }));
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function (e) {
  console.log('[SW] Activate', cacheName);
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return key.startsWith(CACHE_PREFIX) && key !== cacheName;
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', function (e) {
  const request = e.request;

  // Let the browser handle anything we do not want to serve from cache.
  if (request.method !== 'GET') {
    return;
  }
  if (new URL(request.url).origin !== self.location.origin) {
    return;
  }
  // Firefox: fetch() throws for 'only-if-cached' unless mode is 'same-origin'.
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return;
  }

  if (request.mode === 'navigate') {
    e.respondWith(networkFirst(e, request));
    return;
  }

  e.respondWith(cacheFirst(request));
});

function networkFirst(e, request) {
  return fetch(request)
    .then(function (response) {
      if (response.ok) {
        const copy = response.clone();
        e.waitUntil(
          caches.open(cacheName)
            .then(function (cache) {
              return cache.put(request, copy);
            })
            .catch(function () {
              // A failed cache write must never break the navigation.
            })
        );
      }
      return response;
    })
    .catch(function () {
      return caches.match(request, { ignoreSearch: true })
        .then(function (cached) {
          return cached || caches.match(OFFLINE_URL);
        })
        .then(function (fallback) {
          return fallback || Response.error();
        });
    });
}

function cacheFirst(request) {
  return caches.match(request)
    .then(function (cached) {
      return cached || fetch(request);
    })
    .catch(function () {
      // Network failure with no cached copy: a plain network error, not an
      // unhandled rejection.
      return Response.error();
    });
}
