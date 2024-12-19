// Cache resources during service worker installation
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-pwa-cache').then((cache) => {
            return cache.addAll([
                '/',               // Cache the homepage
                '/index.html',     // Cache the main HTML page
                '/style.css',      // Cache the CSS file
                '/script.js',      // Cache the JS file
                '/icons/web-app-manifest-192x192.png', // Cache the icons
                '/icons/web-app-manifest-512x512.png'
            ]);
        })
    );
});

// Serve cached files when offline or fetch them from the network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return cached file if available, otherwise fetch from network
            return cachedResponse || fetch(event.request);
        })
    );
});
