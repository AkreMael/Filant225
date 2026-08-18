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

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Background message: ', payload);
  const notificationTitle = payload.notification?.title || payload.data?.title || 'FILANT°225';
  const notificationBody = payload.notification?.body || payload.data?.body || payload.data?.message || 'Nouveau message reçu.';
  const notificationIcon = payload.notification?.icon || payload.data?.icon || PLATFORM_LOGO;
  const targetUrl = payload.data?.url || '/?tab=userChat';

  const notificationOptions = {
    body: notificationBody,
    icon: notificationIcon,
    badge: '/icon.svg',
    data: {
      ...payload.data,
      url: targetUrl
    },
    tag: payload.data?.tag || (payload.data?.chatUserId ? `filant-chat-${payload.data.chatUserId}` : (payload.data?.targetAction ? `filant-act-${payload.data.targetAction}` : 'filant-notification')),
    renotify: true,
    vibrate: [200, 100, 200]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const data = event.notification.data || {};
  const urlToOpen = data.url || '/?tab=userChat';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({
            type: 'NOTIFICATION_CLICK',
            data: data
          });
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
