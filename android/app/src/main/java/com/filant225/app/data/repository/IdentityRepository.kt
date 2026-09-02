package com.filant225.app.data.repository

import android.net.Uri
import com.filant225.app.data.models.IdentityDocument
import com.google.firebase.Timestamp
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.SetOptions
import com.google.firebase.storage.FirebaseStorage
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await

class IdentityRepository {
    private val firestore: FirebaseFirestore = FirebaseFirestore.getInstance()
    private val storage: FirebaseStorage = FirebaseStorage.getInstance()

    suspend fun uploadImage(userId: String, side: String, imageUri: Uri): Result<String> {
        return try {
            val storageRef = storage.reference.child("identityDocuments/$userId/$side")
            val uploadTask = storageRef.putFile(imageUri).await()
            val downloadUrl = uploadTask.storage.downloadUrl.await().toString()
            Result.success(downloadUrl)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun submitIdentityDocument(
        userId: String,
        userName: String,
        userPhone: String,
        rectoUrl: String,
        versoUrl: String,
        selfieUrl: String? = null
    ): Result<Boolean> {
        return try {
            val docData = mutableMapOf<String, Any>(
                "id" to userId,
                "userId" to userId,
                "userName" to userName,
                "userPhone" to userPhone,
                "rectoUrl" to rectoUrl,
                "versoUrl" to versoUrl,
                "status" to "en_attente",
                "submittedAt" to Timestamp.now(),
                "adminReadStatus" to "NON LU"
            )

            if (!selfieUrl.isNullOrEmpty()) {
                docData["selfieUrl"] = selfieUrl
                docData["selfieStatus"] = "en_attente"
            }

            firestore.collection("IdentityDocuments").document(userId)
                .set(docData, SetOptions.merge())
                .await()

            // Update user profile
            val profileUpdates = mutableMapOf<String, Any>(
                "idCardFront" to rectoUrl,
                "idCardBack" to versoUrl,
                "idCardStatus" to "en_attente"
            )
            if (!selfieUrl.isNullOrEmpty()) {
                profileUpdates["selfieUrl"] = selfieUrl
                profileUpdates["selfieStatus"] = "en_attente"
            }

            firestore.collection("Clients").document(userId)
                .set(profileUpdates, SetOptions.merge())
                .await()

            Result.success(true)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun submitSelfie(
        userId: String,
        userName: String,
        userPhone: String,
        selfieUrl: String
    ): Result<Boolean> {
        return try {
            val docData = mapOf(
                "id" to userId,
                "userId" to userId,
                "userName" to userName,
                "userPhone" to userPhone,
                "selfieUrl" to selfieUrl,
                "selfieStatus" to "en_attente",
                "selfieSubmittedAt" to Timestamp.now(),
                "adminReadStatus" to "NON LU"
            )

            firestore.collection("IdentityDocuments").document(userId)
                .set(docData, SetOptions.merge())
                .await()

            firestore.collection("Clients").document(userId)
                .set(mapOf("selfieUrl" to selfieUrl, "selfieStatus" to "en_attente"), SetOptions.merge())
                .await()

            Result.success(true)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    fun observeUserIdentity(userId: String): Flow<IdentityDocument?> = callbackFlow {
        val listener = firestore.collection("IdentityDocuments").document(userId)
            .addSnapshotListener { snapshot, _ ->
                if (snapshot != null && snapshot.exists()) {
                    val doc = snapshot.toObject(IdentityDocument::class.java)?.copy(id = snapshot.id)
                    trySend(doc)
                } else {
                    trySend(null)
                }
            }
        awaitClose { listener.remove() }
    }

    fun observeAllSubmissions(): Flow<List<IdentityDocument>> = callbackFlow {
        val listener = firestore.collection("IdentityDocuments")
            .addSnapshotListener { snapshot, _ ->
                if (snapshot != null) {
                    val list = snapshot.documents.mapNotNull { it.toObject(IdentityDocument::class.java)?.copy(id = it.id) }
                    trySend(list)
                }
            }
        awaitClose { listener.remove() }
    }

    // Admin validation: CNI / Attestation
    suspend fun validateIdCard(userId: String): Result<Boolean> {
        return try {
            firestore.collection("IdentityDocuments").document(userId)
                .set(mapOf("status" to "validee", "verifiedAt" to Timestamp.now(), "adminReadStatus" to "VU"), SetOptions.merge())
                .await()
            firestore.collection("Clients").document(userId)
                .set(mapOf("idCardStatus" to "validee"), SetOptions.merge())
                .await()
            Result.success(true)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    // Admin validation: Selfie / Visage certifié
    suspend fun validateSelfie(userId: String, selfieUrl: String): Result<Boolean> {
        return try {
            firestore.collection("IdentityDocuments").document(userId)
                .set(mapOf("selfieStatus" to "validee", "selfieVerifiedAt" to Timestamp.now(), "adminReadStatus" to "VU"), SetOptions.merge())
                .await()
            firestore.collection("Clients").document(userId)
                .set(mapOf("selfieStatus" to "validee", "faceVerified" to true, "selfieUrl" to selfieUrl), SetOptions.merge())
                .await()
            Result.success(true)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun rejectIdCard(userId: String, reason: String): Result<Boolean> {
        return try {
            firestore.collection("IdentityDocuments").document(userId)
                .set(mapOf("status" to "refusee", "rejectionReason" to reason, "adminReadStatus" to "VU"), SetOptions.merge())
                .await()
            firestore.collection("Clients").document(userId)
                .set(mapOf("idCardStatus" to "refusee"), SetOptions.merge())
                .await()
            Result.success(true)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun rejectSelfie(userId: String, reason: String): Result<Boolean> {
        return try {
            firestore.collection("IdentityDocuments").document(userId)
                .set(mapOf("selfieStatus" to "refusee", "selfieRejectionReason" to reason, "adminReadStatus" to "VU"), SetOptions.merge())
                .await()
            firestore.collection("Clients").document(userId)
                .set(mapOf("selfieStatus" to "refusee", "faceVerified" to false), SetOptions.merge())
                .await()
            Result.success(true)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
