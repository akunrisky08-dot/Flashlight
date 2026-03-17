// service-worker.js
const CACHE_NAME = 'senter-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/controller.html',
    '/manifest.json',
    '/icon.png'
];

// Install service worker
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Fetch from cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Handle push notifications
self.addEventListener('push', (event) => {
    const data = event.data.json();
    
    const options = {
        body: data.body || 'Command diterima!',
        icon: '/icon.png',
        badge: '/icon.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/',
            command: data.command
        },
        actions: [
            { action: 'open', title: 'Buka Aplikasi' },
            { action: 'close', title: 'Tutup' }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || 'Remote Senter', options)
    );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'close') {
        return;
    }
    
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});

// Background sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-commands') {
        event.waitUntil(
            fetch('https://otrat-27a09-default-rtdb.firebaseio.com/.json')
        );
    }
});