/**
 * WhatsApp Business Cloud API Integration Service for FILANT°225
 * Automatically handles notifications, status alerts, welcome messages,
 * payment confirmations, and service request notifications via Meta Cloud API.
 */

export interface WhatsAppNotificationPayload {
  to: string;
  message?: string;
  templateName?: string;
  languageCode?: string;
}

export const whatsappService = {
  /**
   * Generic sender via backend endpoint /api/whatsapp/send
   */
  sendWhatsAppNotification: async (payload: WhatsAppNotificationPayload): Promise<{ success: boolean; messageId?: string; error?: string }> => {
    try {
      if (!payload.to) {
        return { success: false, error: "Missing recipient phone number" };
      }

      // Format Ivoirian phone numbers to international standard if needed (e.g. 2250700000000)
      let phone = payload.to.replace(/\D/g, '');
      if (phone.length === 10) {
        phone = `225${phone}`;
      }

      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phone,
          message: payload.message,
          templateName: payload.templateName,
          languageCode: payload.languageCode || 'fr'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.warn('[WhatsApp Service] Notification sending failed:', data);
        return { success: false, error: data.error || 'Failed to send WhatsApp message' };
      }

      console.log('[WhatsApp Service] Notification sent successfully:', data.messageId);
      return { success: true, messageId: data.messageId };
    } catch (err: any) {
      console.error('[WhatsApp Service] Exception while sending notification:', err);
      return { success: false, error: err.message };
    }
  },

  /**
   * 1. Bienvenue après inscription
   */
  sendWelcomeMessage: async (phone: string, name: string) => {
    const text = `🎉 Bienvenue sur FILANT°225, ${name} !\n\nVotre compte a été créé avec succès. Vous pouvez maintenant accéder à nos services en ligne, trouver des prestataires ou proposer vos compétences sur toute la Côte d'Ivoire.`;
    return whatsappService.sendWhatsAppNotification({
      to: phone,
      message: text,
      templateName: 'filant225_bienvenue'
    });
  },

  /**
   * 2. Confirmation d'inscription
   */
  sendRegistrationConfirmation: async (phone: string, name: string, category: string) => {
    const text = `✅ Confirmation d'inscription - FILANT°225\n\nBonjour ${name}, votre inscription dans la catégorie [${category}] a été enregistrée. Votre profil est en cours de traitement pour la mise en ligne.`;
    return whatsappService.sendWhatsAppNotification({
      to: phone,
      message: text,
      templateName: 'filant225_confirmation_inscription'
    });
  },

  /**
   * 3. Confirmation de paiement
   */
  sendPaymentConfirmation: async (phone: string, amount: string, description: string) => {
    const text = `💳 Paiement confirmé ! - FILANT°225\n\nNous avons bien reçu votre paiement de ${amount} FCFA pour : ${description}.\nMerci pour votre confiance !`;
    return whatsappService.sendWhatsAppNotification({
      to: phone,
      message: text,
      templateName: 'filant225_paiement_valide'
    });
  },

  /**
   * 4. Notification lorsqu'un prestataire reçoit une nouvelle demande de service
   */
  sendNewServiceRequestNotification: async (providerPhone: string, clientName: string, serviceTitle: string) => {
    const text = `🔔 NOUVELLE DEMANDE DE SERVICE - FILANT°225\n\nBonjour, vous avez reçu une nouvelle demande de service de la part de ${clientName} pour : "${serviceTitle}".\nConnectez-vous sur l'application pour consulter les détails et répondre.`;
    return whatsappService.sendWhatsAppNotification({
      to: providerPhone,
      message: text,
      templateName: 'filant225_demande_service'
    });
  },

  /**
   * 5. Notification de statut de demande (Acceptée ou Refusée)
   */
  sendRequestStatusNotification: async (clientPhone: string, providerName: string, isAccepted: boolean) => {
    const statusText = isAccepted ? 'ACCEPTÉE ✅' : 'REFUSÉE ❌';
    const text = `📢 MISE À JOUR DE VOTRE DEMANDE - FILANT°225\n\nVotre demande auprès du prestataire ${providerName} a été ${statusText}.\nConsultez vos messages sur l'application pour plus de détails.`;
    return whatsappService.sendWhatsAppNotification({
      to: clientPhone,
      message: text,
      templateName: isAccepted ? 'filant225_demande_acceptee' : 'filant225_demande_refusee'
    });
  },

  /**
   * 6. Rappel de renouvellement du profil avant expiration
   */
  sendRenewalReminder: async (phone: string, name: string, expirationDateStr: string) => {
    const text = `⏳ Rappel de renouvellement - FILANT°225\n\nBonjour ${name}, votre profil en ligne expirera le ${expirationDateStr}.\nRenouvelez dès maintenant (210 FCFA) pour rester visible par vos futurs clients sans interruption.`;
    return whatsappService.sendWhatsAppNotification({
      to: phone,
      message: text,
      templateName: 'filant225_renouvellement'
    });
  },

  /**
   * 7. Confirmation de renouvellement
   */
  sendRenewalConfirmation: async (phone: string, name: string, newExpirationDateStr: string) => {
    const text = `✨ Profil renouvelé avec succès ! - FILANT°225\n\nBonjour ${name}, votre profil est réactivé et restera en ligne jusqu'au ${newExpirationDateStr}.\nMerci pour votre fidélité !`;
    return whatsappService.sendWhatsAppNotification({
      to: phone,
      message: text,
      templateName: 'filant225_renouvellement'
    });
  },

  /**
   * 8. Alerte importante administrée
   */
  sendAdminAlert: async (phone: string, alertText: string) => {
    const text = `📢 ALERTE FILANT°225\n\n${alertText}`;
    return whatsappService.sendWhatsAppNotification({
      to: phone,
      message: text,
      templateName: 'filant225_notification'
    });
  },

  /**
   * 9. Envoi de code de vérification du numéro (OTP)
   */
  sendVerificationCode: async (phone: string, code: string) => {
    const text = `🔐 CODE DE VÉRIFICATION FILANT°225\n\nVotre code de sécurité à 6 chiffres est : *${code}*\n\nSaisissez ce code dans l'application pour valider votre numéro. Ne le partagez avec personne.`;
    return whatsappService.sendWhatsAppNotification({
      to: phone,
      message: text,
      templateName: 'filant225_verification_code'
    });
  }
};
