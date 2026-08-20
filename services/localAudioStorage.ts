/**
 * Local Audio Storage Service for FILANT°225
 * Uses IndexedDB to persist voice notes locally on the device (phone/browser).
 * Audio files are stored offline in the browser's IndexedDB database,
 * allowing instant local playback without Firebase Storage.
 */

const DB_NAME = 'filant_voice_audio_db';
const DB_VERSION = 1;
const STORE_NAME = 'voice_audios';

interface StoredVoiceRecord {
  id: string;
  blob: Blob;
  mimeType: string;
  duration?: number;
  timestamp: number;
  size: number;
}

class LocalAudioStorageService {
  private dbPromise: Promise<IDBDatabase> | null = null;
  private objectUrlCache: Map<string, string> = new Map();

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error("IndexedDB n'est pas disponible sur cet appareil"));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };

      request.onerror = (event) => {
        console.error("[LocalAudioStorage] Erreur ouverture IndexedDB:", (event.target as IDBOpenDBRequest).error);
        reject((event.target as IDBOpenDBRequest).error);
      };
    });

    return this.dbPromise;
  }

  /**
   * Sauvegarde un Blob audio localement sur l'appareil (IndexedDB)
   */
  async saveLocalAudio(id: string, blob: Blob, duration?: number): Promise<string> {
    try {
      const db = await this.getDB();
      const record: StoredVoiceRecord = {
        id,
        blob,
        mimeType: blob.type || 'audio/webm',
        duration: duration || 0,
        timestamp: Date.now(),
        size: blob.size
      };

      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const req = store.put(record);

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });

      // Crée une URL d'objet locale et la met en cache
      const objectUrl = URL.createObjectURL(blob);
      this.objectUrlCache.set(id, objectUrl);
      return objectUrl;
    } catch (err) {
      console.warn("[LocalAudioStorage] Échec de sauvegarde locale:", err);
      // Fallback vers ObjectURL direct en mémoire
      const objectUrl = URL.createObjectURL(blob);
      this.objectUrlCache.set(id, objectUrl);
      return objectUrl;
    }
  }

  /**
   * Récupère le Blob audio stocké localement
   */
  async getLocalAudioBlob(id: string): Promise<Blob | null> {
    try {
      const db = await this.getDB();
      return new Promise<Blob | null>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const req = store.get(id);

        req.onsuccess = () => {
          const result = req.result as StoredVoiceRecord | undefined;
          if (result && result.blob) {
            resolve(result.blob);
          } else {
            resolve(null);
          }
        };

        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn("[LocalAudioStorage] Erreur lecture locale:", err);
      return null;
    }
  }

  /**
   * Vérifie si le fichier vocal existe déjà dans le stockage local de l'appareil
   */
  async hasLocalAudio(id: string): Promise<boolean> {
    if (this.objectUrlCache.has(id)) return true;
    try {
      const blob = await this.getLocalAudioBlob(id);
      return !!blob;
    } catch {
      return false;
    }
  }

  /**
   * Récupère ou génère l'URL d'écoute locale (blob URL)
   */
  async getLocalAudioUrl(id: string): Promise<string | null> {
    if (this.objectUrlCache.has(id)) {
      return this.objectUrlCache.get(id)!;
    }

    const blob = await this.getLocalAudioBlob(id);
    if (blob) {
      const objectUrl = URL.createObjectURL(blob);
      this.objectUrlCache.set(id, objectUrl);
      return objectUrl;
    }

    return null;
  }

  /**
   * Télécharge le fichier audio depuis sa source (serveur ou base64)
   * et le stocke de manière permanente dans la mémoire locale de l'appareil
   */
  async downloadAndStoreLocally(id: string, sourceUrlOrBase64: string, duration?: number): Promise<string> {
    // 1. Si déjà en mémoire locale, retourner directement
    const existingUrl = await this.getLocalAudioUrl(id);
    if (existingUrl) {
      return existingUrl;
    }

    try {
      let audioBlob: Blob;

      // Cas 1 : Données Base64 (data:audio/...)
      if (sourceUrlOrBase64.startsWith('data:')) {
        const res = await fetch(sourceUrlOrBase64);
        audioBlob = await res.blob();
      } 
      // Cas 2 : URL serveur relative ou absolue (/uploads/..., https://...)
      else {
        const response = await fetch(sourceUrlOrBase64);
        if (!response.ok) {
          throw new Error(`Erreur de téléchargement audio (HTTP ${response.status})`);
        }
        audioBlob = await response.blob();
      }

      // Enregistre dans IndexedDB
      const localUrl = await this.saveLocalAudio(id, audioBlob, duration);
      return localUrl;
    } catch (error) {
      console.error("[LocalAudioStorage] Impossible de télécharger et stocker le vocal:", error);
      // Retourner la source brute si échec pour ne pas bloquer complètement
      return sourceUrlOrBase64;
    }
  }

  /**
   * Supprime un vocal du stockage local
   */
  async deleteLocalAudio(id: string): Promise<void> {
    if (this.objectUrlCache.has(id)) {
      URL.revokeObjectURL(this.objectUrlCache.get(id)!);
      this.objectUrlCache.delete(id);
    }
    try {
      const db = await this.getDB();
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.delete(id);
    } catch (e) {
      console.warn("[LocalAudioStorage] Erreur suppression locale:", e);
    }
  }
}

export const localAudioStorage = new LocalAudioStorageService();
