import { db, storage, auth } from '../firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc,
  onSnapshot, 
  serverTimestamp, 
  query, 
  orderBy,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { 
  ref as storageRef, 
  uploadBytes, 
  uploadString, 
  getDownloadURL 
} from 'firebase/storage';
import { signInAnonymously } from 'firebase/auth';
import type { IdentityDocument, IdentityVerificationStatus } from '../types';

const sanitizeUserId = (id: string): string => {
  return (id || '').replace(/\D/g, '') || id.replace(/[.#$[\]/]/g, '_');
};

const ensureAuth = async () => {
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      console.warn("Silent anonymous auth in identityService:", e);
    }
  }
};

export const identityService = {
  /**
   * Uploads identity document or selfie image to Firebase Storage
   * Path: identityDocuments/{userId}/recto, verso, or selfie
   */
  uploadIdentityImage: async (
    userId: string, 
    side: 'recto' | 'verso' | 'selfie', 
    imageData: File | Blob | string
  ): Promise<string> => {
    const cleanId = sanitizeUserId(userId);
    if (!cleanId) throw new Error("ID utilisateur manquant pour l'upload");

    await ensureAuth();

    // Specific dedicated folder strictly separated from standard uploads
    const path = `identityDocuments/${cleanId}/${side}`;
    const fileRef = storageRef(storage, path);

    try {
      if (typeof imageData === 'string') {
        if (imageData.startsWith('data:')) {
          await uploadString(fileRef, imageData, 'data_url', {
            contentType: 'image/jpeg',
            customMetadata: {
              userId: cleanId,
              side: side,
              type: side === 'selfie' ? 'face_verification_selfie' : 'identity_document',
              uploadedAt: new Date().toISOString()
            }
          });
        } else if (imageData.startsWith('http://') || imageData.startsWith('https://')) {
          // Already a remote URL
          return imageData;
        } else {
          await uploadString(fileRef, imageData, 'raw', {
            contentType: 'image/jpeg',
            customMetadata: {
              userId: cleanId,
              side: side,
              type: side === 'selfie' ? 'face_verification_selfie' : 'identity_document'
            }
          });
        }
      } else {
        await uploadBytes(fileRef, imageData, {
          contentType: imageData.type || 'image/jpeg',
          customMetadata: {
            userId: cleanId,
            side: side,
            type: side === 'selfie' ? 'face_verification_selfie' : 'identity_document',
            uploadedAt: new Date().toISOString()
          }
        });
      }

      const downloadUrl = await getDownloadURL(fileRef);
      return downloadUrl;
    } catch (storageError) {
      console.warn("Storage upload error for identity doc, using data fallback:", storageError);
      // Fallback: If Storage has network restriction, return the data string
      if (typeof imageData === 'string') {
        return imageData;
      }
      throw storageError;
    }
  },

  /**
   * Save or submit identity verification request in Firestore
   */
  submitIdentityVerification: async (
    userId: string,
    userInfo: { name: string; phone: string; city?: string },
    rectoUrl: string,
    versoUrl: string,
    selfieUrl?: string
  ): Promise<boolean> => {
    const cleanId = sanitizeUserId(userId || userInfo.phone);
    if (!cleanId) return false;

    await ensureAuth();

    const identityDocRef = doc(db, 'IdentityDocuments', cleanId);
    const docData: Record<string, any> = {
      id: cleanId,
      userId: cleanId,
      userName: userInfo.name || 'Utilisateur',
      userPhone: userInfo.phone || cleanId,
      userCity: userInfo.city || 'Non spécifiée',
      rectoUrl: rectoUrl,
      versoUrl: versoUrl,
      status: 'en_attente' as IdentityVerificationStatus,
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      adminReadStatus: 'NON LU',
      rejectionReason: null
    };

    if (selfieUrl) {
      docData.selfieUrl = selfieUrl;
      docData.selfieStatus = 'en_attente' as IdentityVerificationStatus;
    }

    try {
      await setDoc(identityDocRef, docData, { merge: true });

      // Synchronize identity status & URLs to user profile in collections
      const userProfileUpdates: Record<string, any> = {
        idCardFront: rectoUrl,
        idCardBack: versoUrl,
        idCardStatus: 'en_attente',
        idCardUploadedAt: serverTimestamp()
      };
      if (selfieUrl) {
        userProfileUpdates.selfieUrl = selfieUrl;
        userProfileUpdates.selfieStatus = 'en_attente';
      }

      const collectionsToSync = ['Clients', 'Travailleurs', 'Agences immobilières', 'Équipements', 'Entreprises', 'Inscriptions'];
      for (const col of collectionsToSync) {
        try {
          const userRef = doc(db, col, cleanId);
          await setDoc(userRef, userProfileUpdates, { merge: true });
        } catch (syncErr) {
          // silent sync ignore
        }
      }

      // Also persist in local storage cache
      localStorage.setItem(`filant_id_image_front_${cleanId}`, rectoUrl);
      localStorage.setItem(`filant_id_image_back_${cleanId}`, versoUrl);
      localStorage.setItem(`filant_id_status_${cleanId}`, 'en_attente');
      if (selfieUrl) {
        localStorage.setItem(`filant_id_selfie_${cleanId}`, selfieUrl);
        localStorage.setItem(`filant_id_selfie_status_${cleanId}`, 'en_attente');
      }

      return true;
    } catch (e) {
      console.error("Error submitting identity verification in Firestore:", e);
      return false;
    }
  },

  /**
   * Save or submit Selfie verification request in Firestore
   */
  submitSelfieVerification: async (
    userId: string,
    userInfo: { name: string; phone: string; city?: string },
    selfieUrl: string
  ): Promise<boolean> => {
    const cleanId = sanitizeUserId(userId || userInfo.phone);
    if (!cleanId) return false;

    await ensureAuth();

    const identityDocRef = doc(db, 'IdentityDocuments', cleanId);
    const docData: Record<string, any> = {
      id: cleanId,
      userId: cleanId,
      userName: userInfo.name || 'Utilisateur',
      userPhone: userInfo.phone || cleanId,
      userCity: userInfo.city || 'Non spécifiée',
      selfieUrl: selfieUrl,
      selfieStatus: 'en_attente' as IdentityVerificationStatus,
      selfieSubmittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      adminReadStatus: 'NON LU',
      selfieRejectionReason: null
    };

    try {
      await setDoc(identityDocRef, docData, { merge: true });

      // Synchronize selfie to user profile in collections
      const userProfileUpdates = {
        selfieUrl: selfieUrl,
        selfieStatus: 'en_attente',
        selfieUploadedAt: serverTimestamp()
      };

      const collectionsToSync = ['Clients', 'Travailleurs', 'Agences immobilières', 'Équipements', 'Entreprises', 'Inscriptions'];
      for (const col of collectionsToSync) {
        try {
          const userRef = doc(db, col, cleanId);
          await setDoc(userRef, userProfileUpdates, { merge: true });
        } catch (syncErr) {
          // silent sync ignore
        }
      }

      // Persist in local storage
      localStorage.setItem(`filant_id_selfie_${cleanId}`, selfieUrl);
      localStorage.setItem(`filant_id_selfie_status_${cleanId}`, 'en_attente');

      return true;
    } catch (e) {
      console.error("Error submitting selfie verification in Firestore:", e);
      return false;
    }
  },

  /**
   * Fetch single user identity document
   */
  getIdentityDocument: async (userId: string): Promise<IdentityDocument | null> => {
    const cleanId = sanitizeUserId(userId);
    if (!cleanId) return null;

    try {
      await ensureAuth();
      const snap = await getDoc(doc(db, 'IdentityDocuments', cleanId));
      if (snap.exists()) {
        const d = snap.data();
        return {
          id: snap.id,
          userId: d.userId || snap.id,
          userName: d.userName || 'Utilisateur',
          userPhone: d.userPhone || snap.id,
          userCity: d.userCity || 'Non spécifiée',
          rectoUrl: d.rectoUrl || '',
          versoUrl: d.versoUrl || '',
          selfieUrl: d.selfieUrl || '',
          status: (d.status || 'non_soumis') as IdentityVerificationStatus,
          selfieStatus: (d.selfieStatus || (d.selfieUrl ? 'en_attente' : 'non_soumis')) as IdentityVerificationStatus,
          selfieVerifiedAt: d.selfieVerifiedAt,
          selfieRejectionReason: d.selfieRejectionReason,
          submittedAt: d.submittedAt,
          updatedAt: d.updatedAt,
          verifiedAt: d.verifiedAt,
          rejectionReason: d.rejectionReason,
          adminReadStatus: d.adminReadStatus || 'NON LU'
        };
      }
    } catch (e) {
      console.error("Error getting identity document:", e);
    }
    return null;
  },

  /**
   * Real-time subscription to a user's identity status
   */
  subscribeToUserIdentity: (
    userId: string, 
    callback: (idDoc: IdentityDocument | null) => void
  ): (() => void) => {
    const cleanId = sanitizeUserId(userId);
    if (!cleanId) {
      callback(null);
      return () => {};
    }

    const docRef = doc(db, 'IdentityDocuments', cleanId);
    return onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        const idDoc: IdentityDocument = {
          id: snap.id,
          userId: d.userId || snap.id,
          userName: d.userName || 'Utilisateur',
          userPhone: d.userPhone || snap.id,
          userCity: d.userCity || 'Non spécifiée',
          rectoUrl: d.rectoUrl || '',
          versoUrl: d.versoUrl || '',
          selfieUrl: d.selfieUrl || '',
          status: (d.status || 'non_soumis') as IdentityVerificationStatus,
          selfieStatus: (d.selfieStatus || (d.selfieUrl ? 'en_attente' : 'non_soumis')) as IdentityVerificationStatus,
          selfieVerifiedAt: d.selfieVerifiedAt,
          selfieRejectionReason: d.selfieRejectionReason,
          submittedAt: d.submittedAt,
          updatedAt: d.updatedAt,
          verifiedAt: d.verifiedAt,
          rejectionReason: d.rejectionReason,
          adminReadStatus: d.adminReadStatus || 'NON LU'
        };
        
        // Update local cache
        localStorage.setItem(`filant_id_status_${cleanId}`, idDoc.status);
        if (idDoc.rectoUrl) localStorage.setItem(`filant_id_image_front_${cleanId}`, idDoc.rectoUrl);
        if (idDoc.versoUrl) localStorage.setItem(`filant_id_image_back_${cleanId}`, idDoc.versoUrl);
        if (idDoc.selfieUrl) localStorage.setItem(`filant_id_selfie_${cleanId}`, idDoc.selfieUrl);
        if (idDoc.selfieStatus) localStorage.setItem(`filant_id_selfie_status_${cleanId}`, idDoc.selfieStatus);
        
        callback(idDoc);
      } else {
        callback(null);
      }
    }, (error) => {
      console.error("Error listening to user identity document:", error);
    });
  },

  /**
   * Real-time subscription for Admin to all identity verification requests
   */
  subscribeToAllIdentities: (
    callback: (list: IdentityDocument[]) => void
  ): (() => void) => {
    const colRef = collection(db, 'IdentityDocuments');
    return onSnapshot(colRef, (snapshot) => {
      const docs: IdentityDocument[] = snapshot.docs.map(docSnap => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          userId: d.userId || docSnap.id,
          userName: d.userName || 'Utilisateur',
          userPhone: d.userPhone || docSnap.id,
          userCity: d.userCity || 'Non spécifiée',
          rectoUrl: d.rectoUrl || '',
          versoUrl: d.versoUrl || '',
          selfieUrl: d.selfieUrl || '',
          status: (d.status || 'non_soumis') as IdentityVerificationStatus,
          selfieStatus: (d.selfieStatus || (d.selfieUrl ? 'en_attente' : 'non_soumis')) as IdentityVerificationStatus,
          selfieVerifiedAt: d.selfieVerifiedAt,
          selfieRejectionReason: d.selfieRejectionReason,
          submittedAt: d.submittedAt,
          updatedAt: d.updatedAt,
          verifiedAt: d.verifiedAt,
          rejectionReason: d.rejectionReason,
          adminReadStatus: d.adminReadStatus || 'NON LU'
        };
      });

      // Sort: en_attente (either ID card or selfie) first, then by date descending
      docs.sort((a, b) => {
        const aPending = a.status === 'en_attente' || a.selfieStatus === 'en_attente';
        const bPending = b.status === 'en_attente' || b.selfieStatus === 'en_attente';
        if (aPending && !bPending) return -1;
        if (!aPending && bPending) return 1;
        const timeA = a.submittedAt?.toMillis ? a.submittedAt.toMillis() : (a.submittedAt ? new Date(a.submittedAt).getTime() : 0);
        const timeB = b.submittedAt?.toMillis ? b.submittedAt.toMillis() : (b.submittedAt ? new Date(b.submittedAt).getTime() : 0);
        return timeB - timeA;
      });

      callback(docs);
    }, (err) => {
      console.error("Error listening to all identity documents:", err);
    });
  },

  /**
   * Admin action: Validate user's ID Card (Recto & Verso)
   */
  validateIdentity: async (target: string | IdentityDocument): Promise<boolean> => {
    const rawId = typeof target === 'string' ? target : (target.userId || target.id);
    const cleanId = sanitizeUserId(rawId);
    if (!cleanId) return false;

    await ensureAuth();

    try {
      const docRef = doc(db, 'IdentityDocuments', cleanId);
      await setDoc(docRef, {
        status: 'validee',
        verifiedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        adminReadStatus: 'VU',
        rejectionReason: null
      }, { merge: true });

      // Update user collections with verified status
      const userUpdates = {
        idCardStatus: 'validee',
        isVerified: true,
        identityVerified: true,
        verifiedAt: serverTimestamp()
      };

      const collectionsToSync = ['Clients', 'Travailleurs', 'Agences immobilières', 'Équipements', 'Entreprises', 'Inscriptions'];
      for (const col of collectionsToSync) {
        try {
          const userRef = doc(db, col, cleanId);
          await setDoc(userRef, userUpdates, { merge: true });
        } catch (e) {
          // ignore
        }
      }

      // Notify user via private message
      try {
        await addDoc(collection(db, 'PrivateMessages'), {
          userId: cleanId,
          recipientId: cleanId,
          sender: 'admin',
          senderName: 'Administration FILANT°225',
          message: "✅ Votre pièce d'identité a été validée par l'administrateur. Votre profil est désormais certifié officiel sur FILANT°225.",
          timestamp: serverTimestamp(),
          adminReadStatus: 'LU',
          type: 'identity_validation'
        });
      } catch (msgErr) {
        // non-blocking
      }

      localStorage.setItem(`filant_id_status_${cleanId}`, 'validee');
      return true;
    } catch (e) {
      console.error("Error validating identity:", e);
      return false;
    }
  },

  /**
   * Admin action: Reject user's ID Card
   */
  rejectIdentity: async (target: string | IdentityDocument, reason?: string): Promise<boolean> => {
    const rawId = typeof target === 'string' ? target : (target.userId || target.id);
    const cleanId = sanitizeUserId(rawId);
    if (!cleanId) return false;

    await ensureAuth();

    const officialRejectionMessage = reason || "Votre pièce d’identité n’a pas été validée par l’administrateur. Veuillez soumettre à nouveau des pièces d’identité correctement visibles.";

    try {
      const docRef = doc(db, 'IdentityDocuments', cleanId);
      await setDoc(docRef, {
        status: 'refusee',
        rejectionReason: officialRejectionMessage,
        rejectedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        adminReadStatus: 'VU'
      }, { merge: true });

      const userUpdates = {
        idCardStatus: 'refusee',
        isVerified: false,
        identityVerified: false,
        rejectionReason: officialRejectionMessage,
        rejectedAt: serverTimestamp()
      };

      const collectionsToSync = ['Clients', 'Travailleurs', 'Agences immobilières', 'Équipements', 'Entreprises', 'Inscriptions'];
      for (const col of collectionsToSync) {
        try {
          const userRef = doc(db, col, cleanId);
          await setDoc(userRef, userUpdates, { merge: true });
        } catch (e) {
          // ignore
        }
      }

      // Notify user via private message
      try {
        await addDoc(collection(db, 'PrivateMessages'), {
          userId: cleanId,
          recipientId: cleanId,
          sender: 'admin',
          senderName: 'Administration FILANT°225',
          message: `⚠️ ${officialRejectionMessage}`,
          timestamp: serverTimestamp(),
          adminReadStatus: 'LU',
          type: 'identity_rejection'
        });
      } catch (msgErr) {
        // non-blocking
      }

      localStorage.setItem(`filant_id_status_${cleanId}`, 'refusee');
      return true;
    } catch (e) {
      console.error("Error rejecting identity:", e);
      return false;
    }
  },

  /**
   * Admin action: Validate user's Selfie / Face verification
   */
  validateSelfie: async (target: string | IdentityDocument, selfieUrl?: string): Promise<boolean> => {
    const rawId = typeof target === 'string' ? target : (target.userId || target.id);
    const cleanId = sanitizeUserId(rawId);
    if (!cleanId) return false;

    await ensureAuth();

    try {
      const docRef = doc(db, 'IdentityDocuments', cleanId);
      await setDoc(docRef, {
        selfieStatus: 'validee',
        selfieVerifiedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        adminReadStatus: 'VU',
        selfieRejectionReason: null
      }, { merge: true });

      // Determine selfie URL
      let validSelfieUrl = selfieUrl;
      if (!validSelfieUrl && typeof target !== 'string' && target.selfieUrl) {
        validSelfieUrl = target.selfieUrl;
      }

      const userUpdates: Record<string, any> = {
        selfieStatus: 'validee',
        faceVerified: true,
        selfieVerifiedAt: serverTimestamp()
      };

      if (validSelfieUrl) {
        userUpdates.selfieUrl = validSelfieUrl;
        userUpdates.verifiedFaceUrl = validSelfieUrl;
      }

      const collectionsToSync = ['Clients', 'Travailleurs', 'Agences immobilières', 'Équipements', 'Entreprises', 'Inscriptions'];
      for (const col of collectionsToSync) {
        try {
          const userRef = doc(db, col, cleanId);
          await setDoc(userRef, userUpdates, { merge: true });
        } catch (e) {
          // ignore
        }
      }

      // Notify user via private message
      try {
        await addDoc(collection(db, 'PrivateMessages'), {
          userId: cleanId,
          recipientId: cleanId,
          sender: 'admin',
          senderName: 'Administration FILANT°225',
          message: "✅ Votre selfie / photo de visage a été validé avec succès par l'administrateur. Votre profil affiche désormais votre photo officielle certifiée.",
          timestamp: serverTimestamp(),
          adminReadStatus: 'LU',
          type: 'selfie_validation'
        });
      } catch (msgErr) {
        // non-blocking
      }

      localStorage.setItem(`filant_id_selfie_status_${cleanId}`, 'validee');
      if (validSelfieUrl) {
        localStorage.setItem(`filant_id_selfie_${cleanId}`, validSelfieUrl);
        // Also update profile avatar if appropriate
        localStorage.setItem(`filant_profile_image_${cleanId}`, validSelfieUrl);
        window.dispatchEvent(new CustomEvent('filant-profile-image-updated', {
          detail: { phone: cleanId, imageUrl: validSelfieUrl }
        }));
      }

      return true;
    } catch (e) {
      console.error("Error validating selfie:", e);
      return false;
    }
  },

  /**
   * Admin action: Reject user's Selfie / Face verification
   */
  rejectSelfie: async (target: string | IdentityDocument, reason?: string): Promise<boolean> => {
    const rawId = typeof target === 'string' ? target : (target.userId || target.id);
    const cleanId = sanitizeUserId(rawId);
    if (!cleanId) return false;

    await ensureAuth();

    const officialRejectionMessage = reason || "Votre selfie n'a pas été validé par l'administrateur. Veuillez soumettre à nouveau un selfie net, bien éclairé et sans masque ou lunettes de soleil dans le cercle prévu.";

    try {
      const docRef = doc(db, 'IdentityDocuments', cleanId);
      await setDoc(docRef, {
        selfieStatus: 'refusee',
        selfieRejectionReason: officialRejectionMessage,
        selfieRejectedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        adminReadStatus: 'VU'
      }, { merge: true });

      const userUpdates = {
        selfieStatus: 'refusee',
        faceVerified: false,
        selfieRejectionReason: officialRejectionMessage,
        selfieRejectedAt: serverTimestamp()
      };

      const collectionsToSync = ['Clients', 'Travailleurs', 'Agences immobilières', 'Équipements', 'Entreprises', 'Inscriptions'];
      for (const col of collectionsToSync) {
        try {
          const userRef = doc(db, col, cleanId);
          await setDoc(userRef, userUpdates, { merge: true });
        } catch (e) {
          // ignore
        }
      }

      // Notify user via private message
      try {
        await addDoc(collection(db, 'PrivateMessages'), {
          userId: cleanId,
          recipientId: cleanId,
          sender: 'admin',
          senderName: 'Administration FILANT°225',
          message: `⚠️ ${officialRejectionMessage}`,
          timestamp: serverTimestamp(),
          adminReadStatus: 'LU',
          type: 'selfie_rejection'
        });
      } catch (msgErr) {
        // non-blocking
      }

      localStorage.setItem(`filant_id_selfie_status_${cleanId}`, 'refusee');
      return true;
    } catch (e) {
      console.error("Error rejecting selfie:", e);
      return false;
    }
  },

  /**
   * Admin action: Delete identity submission
   */
  deleteIdentity: async (target: string | IdentityDocument): Promise<boolean> => {
    const rawId = typeof target === 'string' ? target : (target.userId || target.id);
    const cleanId = sanitizeUserId(rawId);
    if (!cleanId) return false;

    await ensureAuth();

    try {
      await deleteDoc(doc(db, 'IdentityDocuments', cleanId));
      localStorage.removeItem(`filant_id_status_${cleanId}`);
      localStorage.removeItem(`filant_id_image_front_${cleanId}`);
      localStorage.removeItem(`filant_id_image_back_${cleanId}`);
      localStorage.removeItem(`filant_id_selfie_${cleanId}`);
      localStorage.removeItem(`filant_id_selfie_status_${cleanId}`);
      return true;
    } catch (e) {
      console.error("Error deleting identity document:", e);
      return false;
    }
  },

  /**
   * Mark identity document as read/seen by admin
   */
  markIdentityAsRead: async (userId: string): Promise<void> => {
    const cleanId = sanitizeUserId(userId);
    if (!cleanId) return;
    try {
      const docRef = doc(db, 'IdentityDocuments', cleanId);
      await setDoc(docRef, { adminReadStatus: 'VU' }, { merge: true });
    } catch (e) {
      // silent
    }
  }
};
