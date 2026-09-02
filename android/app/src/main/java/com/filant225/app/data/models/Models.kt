package com.filant225.app.data.models

import com.google.firebase.Timestamp

data class User(
    val id: String = "",
    val name: String = "",
    val phone: String = "",
    val pin: String = "",
    val role: String = "client", // client, travailleur, admin, entreprise
    val commune: String = "",
    val ville: String = "Abidjan",
    val balance: Double = 0.0,
    val profileImage: String = "",
    val idCardFront: String = "",
    val idCardBack: String = "",
    val idCardStatus: String = "non_soumis", // non_soumis, en_attente, validee, refusee
    val selfieUrl: String = "",
    val selfieStatus: String = "non_soumis",
    val faceVerified: Boolean = false,
    val isAvailable: Boolean = true,
    val activity: String = "",
    val createdAt: Timestamp? = null
)

data class Worker(
    val id: String = "",
    val name: String = "",
    val phone: String = "",
    val profession: String = "",
    val commune: String = "",
    val ville: String = "Abidjan",
    val rating: Double = 5.0,
    val verified: Boolean = false,
    val faceVerified: Boolean = false,
    val isAvailable: Boolean = true,
    val profileImage: String = "",
    val hourlyRate: String = ""
)

data class IdentityDocument(
    val id: String = "",
    val userId: String = "",
    val userName: String = "",
    val userPhone: String = "",
    val userCity: String = "",
    val rectoUrl: String = "",
    val versoUrl: String = "",
    val selfieUrl: String = "",
    val status: String = "non_soumis", // ID card status
    val selfieStatus: String = "non_soumis", // Selfie verification status
    val rejectionReason: String? = null,
    val selfieRejectionReason: String? = null,
    val submittedAt: Timestamp? = null,
    val verifiedAt: Timestamp? = null,
    val adminReadStatus: String = "NON LU"
)

data class ChatMessage(
    val id: String = "",
    val userId: String = "",
    val recipientId: String = "",
    val sender: String = "", // "user" or "admin"
    val senderName: String = "",
    val message: String = "",
    val audioUrl: String? = null,
    val isVoice: Boolean = false,
    val timestamp: Timestamp? = null,
    val adminReadStatus: String = "NON LU"
)

data class ServiceRequest(
    val id: String = "",
    val clientId: String = "",
    val clientName: String = "",
    val clientPhone: String = "",
    val serviceCategory: String = "",
    val description: String = "",
    val commune: String = "",
    val status: String = "en_attente", // en_attente, attribue, termine, annule
    val isEmergency: Boolean = false,
    val timestamp: Timestamp? = null
)

data class PaymentTransaction(
    val id: String = "",
    val reference: String = "",
    val userPhone: String = "",
    val amount: Int = 0,
    val method: String = "WAVE", // WAVE, ORANGE, MTN, MOOV
    val status: String = "SUCCESS",
    val description: String = "",
    val timestamp: Timestamp? = null
)
