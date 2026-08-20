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
  getDocs
} from 'firebase/firestore';
import { WorkerLiveLocation, AddressValidationResult, NavigationRoute } from '../types';

export const GOOGLE_MAPS_API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

export const hasGoogleMapsKey = Boolean(GOOGLE_MAPS_API_KEY) && GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY';

let watchPositionId: number | null = null;

export const mapsService = {
  getApiKey: () => GOOGLE_MAPS_API_KEY,

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
      
      const payload = {
        ...data,
        workerId: sanitizedId,
        lastUpdated: Date.now(),
        updatedAt: serverTimestamp()
      };

      await setDoc(docRef, payload, { merge: true });

      // Notify server endpoint optionally
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
        collection(db, 'WorkerLiveLocations'),
        where('isLiveTracking', '==', true)
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
    worker: { id: string; name: string; phone: string; category?: string },
    onUpdate?: (pos: { lat: number; lng: number; speed: number | null }) => void,
    onError?: (errorMsg: string) => void
  ): boolean => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      onError?.("La géolocalisation n'est pas disponible sur cet appareil.");
      return false;
    }

    if (watchPositionId !== null) {
      navigator.geolocation.clearWatch(watchPositionId);
    }

    watchPositionId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, heading, speed, accuracy } = position.coords;
        
        mapsService.updateWorkerLiveLocation(worker.id, {
          workerName: worker.name,
          workerPhone: worker.phone,
          category: worker.category || 'Travailleur',
          lat: latitude,
          lng: longitude,
          heading: heading || 0,
          speed: speed || 0,
          accuracy: accuracy || 10,
          isLiveTracking: true,
          status: 'disponible'
        });

        onUpdate?.({ lat: latitude, lng: longitude, speed });
      },
      (err) => {
        console.warn('[mapsService] Geolocation watch error:', err);
        onError?.("Signal GPS faible ou autorisation de localisation requise.");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000
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

    mapsService.updateWorkerLiveLocation(workerId, {
      isLiveTracking: false,
      status: 'hors_ligne'
    });
  }
};
