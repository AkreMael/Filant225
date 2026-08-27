importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBYoX0tIbEeM2PlP44ToE_kDcpj6RheIIo",
  authDomain: "filant225-base.firebaseapp.com",
  projectId: "filant225-base",
  storageBucket: "filant225-base.firebasestorage.app",
  messagingSenderId: "620102449526",
  appId: "1:620102449526:web:034bb2d244362260682257",
  measurementId: "G-TC4M61VX2S"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const PLATFORM_LOGO = 'https://i.supaimg.com/5cd01a23-e101-4415-9e28-ff02a617cd11.png';

// ====== GESTION DES MESSAGES EN ARRIÈRE-PLAN (BACKGROUND MESSAGES) ======
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Message reçu en arrière-plan:', payload);

  const notificationTitle = payload.notification?.title || payload.data?.title || 'FILANT°225';
  const notificationBody = payload.notification?.body || payload.data?.body || payload.data?.message || 'Nouveau message reçu.';
  const notificationIcon = payload.notification?.icon || payload.data?.icon || PLATFORM_LOGO;
  const notificationImage = payload.notification?.image || payload.data?.image || undefined;

  const targetUrl = payload.data?.url || payload.data?.click_action || '/?tab=userChat';

  let actionTitle = 'Ouvrir';
  if (payload.data?.targetAction === 'qr_code' || targetUrl.includes('tab=qr')) {
    actionTitle = 'Voir le code QR';
  } else if (payload.data?.type === 'chat_message' || payload.data?.type === 'admin_chat_message' || targetUrl.includes('userChat')) {
    actionTitle = 'Ouvrir la discussion';
  } else if (payload.data?.targetAction === 'recherche' || targetUrl.includes('recherche')) {
    actionTitle = 'Voir la recherche';
  } else if (payload.data?.targetAction === 'paiement' || targetUrl.includes('paiement')) {
    actionTitle = 'Accéder au paiement';
  }

  const notificationOptions = {
    body: notificationBody,
    icon: notificationIcon,
    badge: '/icon.svg',
    image: notificationImage,
    data: {
      ...payload.data,
      url: targetUrl
    },
    tag: payload.data?.tag || (payload.data?.chatUserId ? `filant-chat-${payload.data.chatUserId}` : (payload.data?.targetAction ? `filant-act-${payload.data.targetAction}` : 'filant-notification')),
    renotify: true,
    vibrate: [200, 100, 200],
    actions: [
      { action: 'open', title: actionTitle }
    ]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// ====== GESTION DU CLIC SUR LA NOTIFICATION ======
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  let urlToOpen = data.url || '/?tab=userChat';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Si une fenêtre est déjà ouverte, la mettre au premier plan et notifier l'app
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          // Informer la page React d'ouvrir la vue contextuelle
          client.postMessage({
            type: 'NOTIFICATION_CLICK',
            data: data
          });
          return client.focus();
        }
      }
      // Sinon ouvrir une nouvelle fenêtre vers l'application
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// ====== CACHE PWA POUR COMPATIBILITÉ HORS-LIGNE ======
const CACHE_NAME = 'filant225-pwa-cache-v4';
const ASSETS_TO_PRECACHE = [
  '/',
  'index.html',
  'offline.html',
  'manifest.json',
  'icon.svg',
  'icons/icon-72x72.png',
  'icons/icon-96x96.png',
  'icons/icon-128x128.png',
  'icons/icon-144x144.png',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png'
];

// Installation : mise en cache des éléments essentiels du shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des ressources');
        return cache.addAll(ASSETS_TO_PRECACHE).catch(err => {
          console.warn('[Service Worker] Avertissement non bloquant de pré-cache:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activation : suppression des anciens caches obsolètes
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Suppression de l\'ancien cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch : Stratégie Réseau en priorité avec fallback hors-ligne
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes dynamiques, API et Firebase
  if (
    request.method !== 'GET' ||
    url.pathname.includes('/api/') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('firebase') ||
    url.hostname.includes('firestore') ||
    url.pathname.startsWith('/@') || 
    url.pathname.includes('/vite') ||
    url.protocol === 'ws:' ||
    url.protocol === 'wss:'
  ) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200 && (response.type === 'basic' || url.origin === self.location.origin)) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (request.headers.get('accept')?.includes('text/html') || request.mode === 'navigate') {
            return caches.match('/offline.html') || caches.match('/index.html') || caches.match('/');
          }
          return new Response('Connexion perdue. FILANT°225 nécessite une connexion internet pour actualiser ces données.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })
          });
        });
      })
  );
});
