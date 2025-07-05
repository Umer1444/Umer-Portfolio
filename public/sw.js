/* --- Umer Shaikh – PWA Service-Worker ------------------------------ */
/*   v1 – caches shell files & serves them offline                     */
/* -------------------------------------------------------------------*/

// ⚙️  Adjust these if you add more assets you want precached
const CACHE = "umer-portfolio-v1"
const PRECACHE = ["/", "/manifest.json"]

/* INSTALL: precache shell files */
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)))
  self.skipWaiting()
})

/* ACTIVATE: clean up old caches */
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((k) => k !== CACHE && caches.delete(k)))))
  self.clients.claim()
})

/* FETCH: network-first, fallback to cache */
self.addEventListener("fetch", (event) => {
  // ignore non-GET or cross-origin
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) return

  event.respondWith(
    fetch(event.request)
      .then((resp) => {
        // clone & store successful same-origin responses
        if (resp.ok && resp.type === "basic") {
          const clone = resp.clone()
          caches.open(CACHE).then((c) => c.put(event.request, clone))
        }
        return resp
      })
      .catch(() => caches.match(event.request)), // offline fallback
  )
})
