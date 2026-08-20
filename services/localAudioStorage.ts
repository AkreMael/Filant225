/**
 * FILANT°225 - Service de stockage audio local sur l'appareil (IndexedDB)
 * 
 * Permet de conserver les fichiers vocaux localement sur le téléphone ou le navigateur
 * sans solliciter Firebase Storage. 
 * Firestore synchronise uniquement les métadonnées (texte, durée, date, transcription, URL relative).
 */

const DB_NAME = 'filant_local_audio_db';
const DB_VERSION = 1;
const STORE_NAME = 'voice_recordings';

interface StoredVoiceRecord {
  id: string;
  blob: Blob;
  audioUrl?: string;
  savedAt: number;
  mimeType?: string;
}

class LocalAudioStorage {
  private dbPromise: Promise<IDBDatabase> | null = null;
  private objectUrlCache: Map<string, string> = new Map();

  private getDB(): Promise<IDBDatabase> {
    if (this.dbPromise) return this.dbPromise;

    this.dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error("IndexedDB n'est pas supporté par cet appareil."));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('audioUrl', 'audioUrl', { unique: false });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("[LocalAudioStorage] Erreur d'ouverture IndexedDB:", request.error);
        reject(request.error);
      };
    });

    return this.dbPromise;
  }

  /**
   * Sauvegarde un Blob audio localement sur le téléphone
   */
  async saveAudio(messageId: string, blob: Blob, audioUrl?: string): Promise<void> {
    try {
      const db = await this.getDB();
      const record: StoredVoiceRecord = {
        id: messageId,
        blob: blob,
        audioUrl: audioUrl || '',
        savedAt: Date.now(),
        mimeType: blob.type || 'audio/webm'
      };

      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(record);

        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });

      // Mettre en cache l'Object URL local
      const oldUrl = this.objectUrlCache.get(messageId);
      if (oldUrl) {
        try { URL.revokeObjectURL(oldUrl); } catch (e) {}
      }
      this.objectUrlCache.set(messageId, URL.createObjectURL(blob));
    } catch (err) {
      console.warn(`[LocalAudioStorage] Erreur sauvegarde locale du vocal (${messageId}):`, err);
    }
  }

  /**
   * Récupère le Blob audio stocké localement
   */
  async getAudioBlob(messageId: string, audioUrl?: string): Promise<Blob | null> {
    try {
      const db = await this.getDB();

      // Recherche par messageId
      const recordById = await new Promise<StoredVoiceRecord | null>((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(messageId);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      });

      if (recordById && recordById.blob) {
        return recordById.blob;
      }

      // Si pas trouvé et qu'on a l'URL audio, chercher via l'index
      if (audioUrl) {
        const recordByUrl = await new Promise<StoredVoiceRecord | null>((resolve) => {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const index = store.index('audioUrl');
          const req = index.get(audioUrl);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        });

        if (recordByUrl && recordByUrl.blob) {
          return recordByUrl.blob;
        }
      }

      return null;
    } catch (err) {
      console.warn(`[LocalAudioStorage] Erreur lecture locale (${messageId}):`, err);
      return null;
    }
  }

  /**
   * Vérifie si le fichier vocal est déjà disponible dans la mémoire de l'appareil
   */
  async isCachedLocally(messageId: string, audioUrl?: string): Promise<boolean> {
    if (this.objectUrlCache.has(messageId)) return true;
    const blob = await this.getAudioBlob(messageId, audioUrl);
    return blob !== null;
  }

  /**
   * Obtient un Object URL prêt pour la lecture HTML5 Audio depuis le stockage local
   */
  async getLocalPlayableUrl(messageId: string, audioUrl?: string): Promise<string | null> {
    if (this.objectUrlCache.has(messageId)) {
      return this.objectUrlCache.get(messageId)!;
    }

    const blob = await this.getAudioBlob(messageId, audioUrl);
    if (!blob) return null;

    const url = URL.createObjectURL(blob);
    this.objectUrlCache.set(messageId, url);
    return url;
  }

  /**
   * Télécharge le fichier audio depuis le serveur et le stocke immédiatement sur l'appareil
   */
  async downloadAndStoreLocally(
    messageId: string, 
    remoteUrl: string, 
    onProgress?: (percent: number) => void
  ): Promise<{ blob: Blob; localUrl: string } | null> {
    try {
      if (onProgress) onProgress(15);
      
      const response = await fetch(remoteUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} impossible de télécharger le vocal.`);
      }

      if (onProgress) onProgress(60);
      const blob = await response.blob();
      
      if (onProgress) onProgress(85);
      await this.saveAudio(messageId, blob, remoteUrl);

      const localUrl = this.objectUrlCache.get(messageId) || URL.createObjectURL(blob);
      if (onProgress) onProgress(100);

      return { blob, localUrl };
    } catch (err) {
      console.error(`[LocalAudioStorage] Échec du téléchargement du vocal (${messageId}):`, err);
      return null;
    }
  }

  /**
   * Supprime un fichier audio du stockage local
   */
  async removeAudio(messageId: string): Promise<void> {
    try {
      const db = await this.getDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(messageId);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });

      const cached = this.objectUrlCache.get(messageId);
      if (cached) {
        try { URL.revokeObjectURL(cached); } catch (e) {}
        this.objectUrlCache.delete(messageId);
      }
    } catch (e) {
      console.warn(`[LocalAudioStorage] Erreur suppression (${messageId}):`, e);
    }
  }
}

export const localAudioStorage = new LocalAudioStorage();
export default localAudioStorage;
