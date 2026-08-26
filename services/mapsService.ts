import { db } from '../firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  where, 
  serverTimestamp,
  getDocs,
  getDoc
} from 'firebase/firestore';
import { WorkerLiveLocation, AddressValidationResult, NavigationRoute } from '../types';

export const GOOGLE_MAPS_API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

export const hasGoogleMapsKey = Boolean(GOOGLE_MAPS_API_KEY) && GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY';

let watchPositionId: number | null = null;
const workerPathHistories: Record<string, { lat: number; lng: number; timestamp: number }[]> = {};

/**
 * Calcule la distance en kilomètres entre deux coordonnées géographiques (Formule de Haversine)
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  if (lat1 === lat2 && lon1 === lon2) return 0;
  const R = 6371; // Rayon de la Terre en kilomètres
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Formate la distance calculée en m ou km pour un affichage lisible
 */
export function formatDistance(distanceKm: number): string {
  if (isNaN(distanceKm) || distanceKm === null || distanceKm === undefined) return '0 m';
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

export const mapsService = {
  getApiKey: () => GOOGLE_MAPS_API_KEY,
  calculateDistanceKm,
  formatDistance,

  /**
   * Valide une adresse avec l'API Address Validation de Google Maps Platform
   */
  validateAddress: async (address: string, regionCode: string = 'CI'): Promise<AddressValidationResult> => {
    try {
      if (!address || !address.trim()) {
        return {
          success: false,
          isValid: false,
          formattedAddress: address
        };
      }

      const response = await fetch('/api/maps/validate-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, regionCode })
      });

      if (!response.ok) {
        throw new Error(`Address validation error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('[mapsService] Address validation network notice:', error);
      return {
        success: true,
        isValid: true,
        formattedAddress: address,
        source: 'local-fallback'
      };
    }
  },

  /**
   * Calcule un itinéraire routier et le temps de trajet avec l'API Routes de Google Maps
   */
  computeRoute: async (
    origin: string | { lat: number; lng: number },
    destination: string | { lat: number; lng: number },
    travelMode: 'DRIVE' | 'WALK' | 'BICYCLE' = 'DRIVE'
  ): Promise<NavigationRoute | null> => {
    try {
      const response = await fetch('/api/maps/compute-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination, travelMode })
      });

      if (!response.ok) {
        throw new Error(`Routes API computation error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success && data.route) {
        return data.route as NavigationRoute;
      }
      return null;
    } catch (error) {
      console.warn('[mapsService] Route computation notice:', error);
      return null;
    }
  },

  /**
   * Met à jour la position GPS en temps réel d'un travailleur dans Firestore
   */
  updateWorkerLiveLocation: async (
    workerId: string, 
    data: Partial<WorkerLiveLocation>
  ): Promise<boolean> => {
    try {
      const sanitizedId = workerId.replace(/\D/g, '') || workerId;
      const docRef = doc(db, 'WorkerLiveLocations', sanitizedId);
      
      const payload: any = {
        ...data,
        workerId: sanitizedId,
        lastUpdated: Date.now(),
        updatedAt: serverTimestamp()
      };

      await setDoc(docRef, payload, { merge: true });

      // Synchroniser aussi dans Inscriptions et Users si le document existe
      try {
        if (data.lat && data.lng) {
          const inscRef = doc(db, 'Inscriptions', sanitizedId);
          await updateDoc(inscRef, {
            latitude: data.lat,
            longitude: data.lng,
            isLiveTracking: data.isLiveTracking ?? true,
            lastLocationUpdate: Date.now()
          }).catch(() => {});

          const userRef = doc(db, 'Users', sanitizedId);
          await updateDoc(userRef, {
            latitude: data.lat,
            longitude: data.lng,
            isLiveTracking: data.isLiveTracking ?? true,
            lastLocationUpdate: Date.now()
          }).catch(() => {});
        }
      } catch (_) {}

      // Notification au serveur optionnelle
      fetch('/api/workers/live-location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});

      return true;
    } catch (error) {
      console.error('[mapsService] Error updating worker live location:', error);
      return false;
    }
  },

  /**
   * Écoute en temps réel la position d'un travailleur spécifique
   */
  subscribeWorkerLiveLocation: (
    workerId: string, 
    callback: (location: WorkerLiveLocation | null) => void
  ) => {
    try {
      const sanitizedId = workerId.replace(/\D/g, '') || workerId;
      const docRef = doc(db, 'WorkerLiveLocations', sanitizedId);

      return onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          callback(snap.data() as WorkerLiveLocation);
        } else {
          callback(null);
        }
      }, (error) => {
        console.warn('[mapsService] Error listening to worker live location:', error);
        callback(null);
      });
    } catch (e) {
      console.warn('[mapsService] Failed to establish location listener:', e);
      return () => {};
    }
  },

  /**
   * Écoute en temps réel tous les travailleurs actifs avec géolocalisation
   */
  subscribeAllActiveWorkers: (callback: (locations: WorkerLiveLocation[]) => void) => {
    try {
      const q = query(
        collection(db, 'WorkerLiveLocations')
      );

      return onSnapshot(q, (snapshot) => {
        const list: WorkerLiveLocation[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as WorkerLiveLocation);
        });
        callback(list);
      }, (error) => {
        console.warn('[mapsService] Error listening to active workers:', error);
        callback([]);
      });
    } catch (e) {
      console.warn('[mapsService] Failed to establish active workers listener:', e);
      return () => {};
    }
  },

  /**
   * Démarre la diffusion en direct du GPS du travailleur (watchPosition)
   */
  startLiveBroadcasting: (
    worker: { id: string; name: string; phone: string; category?: string; photoUrl?: string },
    onUpdate?: (pos: { lat: number; lng: number; speed: number | null }) => void,
    onError?: (errorMsg: string, code?: number) => void
  ): boolean => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      onError?.("La géolocalisation n'est pas supportée sur cet appareil ou navigateur.");
      return false;
    }

    if (watchPositionId !== null) {
      navigator.geolocation.clearWatch(watchPositionId);
    }

    const sanitizedId = (worker.id || worker.phone || '').replace(/\D/g, '');
    if (!workerPathHistories[sanitizedId]) {
      workerPathHistories[sanitizedId] = [];
    }

    watchPositionId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, heading, speed, accuracy } = position.coords;
        const now = Date.now();

        // Mettre à jour l'historique du parcours (breadcrumbs)
        const history = workerPathHistories[sanitizedId] || [];
        const lastPoint = history.length > 0 ? history[history.length - 1] : null;

        // Ajouter un point de parcours si déplacement de plus de 5 mètres ou premier point
        if (!lastPoint || calculateDistanceKm(lastPoint.lat, lastPoint.lng, latitude, longitude) > 0.005) {
          history.push({ lat: latitude, lng: longitude, timestamp: now });
          // Conserver les 50 derniers points maximum
          if (history.length > 50) {
            history.shift();
          }
          workerPathHistories[sanitizedId] = history;
        }

        mapsService.updateWorkerLiveLocation(sanitizedId, {
          workerName: worker.name,
          workerPhone: worker.phone,
          category: worker.category || 'Travailleur',
          profileImageUrl: worker.photoUrl,
          lat: latitude,
          lng: longitude,
          heading: heading || 0,
          speed: speed || 0,
          accuracy: accuracy || 10,
          isLiveTracking: true,
          status: 'disponible',
          pathHistory: workerPathHistories[sanitizedId]
        });

        localStorage.setItem(`filant_live_tracking_${sanitizedId}`, 'true');
        localStorage.setItem('filant_location_permission_status', 'granted');

        onUpdate?.({ lat: latitude, lng: longitude, speed });
      },
      (err) => {
        console.warn('[mapsService] Geolocation watch error:', err);
        if (err.code === 1) { // PERMISSION_DENIED
          localStorage.setItem('filant_location_permission_status', 'denied');
          onError?.("Autorisation de localisation refusée par l'appareil ou le navigateur.", 1);
        } else if (err.code === 2) { // POSITION_UNAVAILABLE
          onError?.("Signal GPS indisponible. Veuillez activer le GPS sur votre téléphone.", 2);
        } else {
          onError?.("Délai d'attente dépassé pour la position GPS.", 3);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 3000
      }
    );

    return true;
  },

  /**
   * Arrête la diffusion en direct du GPS
   */
  stopLiveBroadcasting: (workerId: string) => {
    if (watchPositionId !== null && typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchPositionId);
      watchPositionId = null;
    }

    const sanitizedId = workerId.replace(/\D/g, '') || workerId;
    mapsService.updateWorkerLiveLocation(sanitizedId, {
      isLiveTracking: false,
      status: 'hors_ligne'
    });
    localStorage.setItem(`filant_live_tracking_${sanitizedId}`, 'false');
  }
};

