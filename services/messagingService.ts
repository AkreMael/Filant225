import { messaging } from '../firebase';
import { getToken, onMessage, isSupported, Messaging } from 'firebase/messaging';
import { databaseService } from './databaseService';
import { User } from '../types';

let currentToken: string | null = null;
let messagingInstance: Messaging | null = messaging;

export const messagingService = {
  getCurrentToken: () => currentToken,

  getMessagingInstance: async (): Promise<Messaging | null> => {
    if (messagingInstance) return messagingInstance;
    if (typeof window === 'undefined') return null;

    try {
      const supported = await isSupported();
      if (supported && messaging) {
        messagingInstance = messaging;
        return messagingInstance;
      }
    } catch (e) {
      console.warn("FCM isSupported check failed:", e);
    }
    return messaging;
  },

  requestPermission: async (user: User) => {
    try {
      if (typeof window === 'undefined' || typeof Notification === 'undefined') {
        console.warn('HTML5 Notifications are not supported in this environment.');
        return null;
      }

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.log('Permission de notification refusée ou non accordée.');
        return null;
      }

      // S'assurer que le Service Worker est bien enregistré pour la réception en arrière-plan
      let registration: ServiceWorkerRegistration | undefined;
      if ('serviceWorker' in navigator) {
        try {
          registration = await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js') 
            || await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          await navigator.serviceWorker.ready;
        } catch (swErr) {
          console.warn('Service Worker registration warning in messagingService:', swErr);
        }
      }

      const fcm = await messagingService.getMessagingInstance();
      if (!fcm) {
        console.warn('Firebase Messaging non disponible.');
        return null;
      }

      const token = await getToken(fcm, {
        vapidKey: 'BD-9TCbxrgpuS2jfxxip1ahWtMLdPOXV9qQVi3MsoxfTO1XAqY9ZEqpDzQDm1GsaJ_pq2JlYyqdMBQacwgjFyVE',
        serviceWorkerRegistration: registration
      });

      if (token) {
        currentToken = token;
        console.log('FCM Token obtenu avec succès:', token);
        await databaseService.saveFCMToken(user, token);
        return token;
      } else {
        console.log('Aucun jeton d\'enregistrement FCM disponible.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du token FCM:', error);
    }
    return null;
  },

  onMessageListener: (phone: string) =>
    new Promise(async (resolve) => {
      const fcm = await messagingService.getMessagingInstance();
      if (!fcm) return;

      onMessage(fcm, (payload) => {
        console.log('[FCM] Message reçu au premier plan (Foreground):', payload);

        if (payload.notification || payload.data) {
          const title = payload.notification?.title || payload.data?.title || 'FILANT°225';
          const body = payload.notification?.body || payload.data?.body || payload.data?.message || '';

          // Enregistrer la notification dans l'historique de l'utilisateur
          if (phone) {
            databaseService.addNotification(phone, {
              title: title,
              message: body
            });
          }

          const PLATFORM_LOGO = "https://i.supaimg.com/5cd01a23-e101-4415-9e28-ff02a617cd11.png";
          const iconToUse = payload.notification?.icon || payload.data?.icon || PLATFORM_LOGO;

          // Afficher une notification système si autorisée
          if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.ready.then(reg => {
                reg.showNotification(title, {
                  body: body,
                  icon: iconToUse,
                  badge: '/icon.svg',
                  tag: payload.data?.chatUserId ? `chat-${payload.data.chatUserId}` : 'filant-foreground-notification',
                  data: {
                    ...payload.data,
                    url: payload.data?.url || '/?tab=userChat'
                  }
                });
              }).catch(() => {
                const notifInstance = new Notification(title, {
                  body: body,
                  icon: iconToUse,
                  data: payload.data
                });
                notifInstance.onclick = () => {
                  window.focus();
                  window.dispatchEvent(new CustomEvent('navigate-to-chat', { detail: payload.data }));
                };
              });
            } else {
              const notifInstance = new Notification(title, {
                body: body,
                icon: iconToUse,
                data: payload.data
              });
              notifInstance.onclick = () => {
                window.focus();
                window.dispatchEvent(new CustomEvent('navigate-to-chat', { detail: payload.data }));
              };
            }
          }

          // Déclencher un événement personnalisé pour notifier les composants React
          window.dispatchEvent(new CustomEvent('new-notification', { detail: payload }));
        }

        resolve(payload);
      });
    }),
};
