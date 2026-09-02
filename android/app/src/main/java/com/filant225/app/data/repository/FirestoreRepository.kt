package com.filant225.app.data.repository

import com.filant225.app.data.models.ChatMessage
import com.filant225.app.data.models.ServiceRequest
import com.filant225.app.data.models.Worker
import com.google.firebase.Timestamp
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await

class FirestoreRepository {
    private val firestore: FirebaseFirestore = FirebaseFirestore.getInstance()

    fun observeWorkers(): Flow<List<Worker>> = callbackFlow {
        val listener = firestore.collection("Travailleurs")
            .addSnapshotListener { snapshot, _ ->
                if (snapshot != null) {
                    val workers = snapshot.documents.mapNotNull { doc ->
                        doc.toObject(Worker::class.java)?.copy(id = doc.id)
                    }
                    trySend(workers)
                }
            }
        awaitClose { listener.remove() }
    }

    fun observeMessages(userId: String): Flow<List<ChatMessage>> = callbackFlow {
        val listener = firestore.collection("PrivateMessages")
            .whereEqualTo("userId", userId)
            .orderBy("timestamp", Query.Direction.ASCENDING)
            .addSnapshotListener { snapshot, _ ->
                if (snapshot != null) {
                    val messages = snapshot.documents.mapNotNull { doc ->
                        doc.toObject(ChatMessage::class.java)?.copy(id = doc.id)
                    }
                    trySend(messages)
                }
            }
        awaitClose { listener.remove() }
    }

    suspend fun sendMessage(
        userId: String,
        sender: String,
        senderName: String,
        text: String,
        audioUrl: String? = null
    ): Result<Boolean> {
        return try {
            val message = ChatMessage(
                userId = userId,
                recipientId = if (sender == "admin") userId else "admin",
                sender = sender,
                senderName = senderName,
                message = text,
                audioUrl = audioUrl,
                isVoice = audioUrl != null,
                timestamp = Timestamp.now(),
                adminReadStatus = if (sender == "admin") "LU" else "NON LU"
            )
            firestore.collection("PrivateMessages").add(message).await()
            Result.success(true)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun sendEmergencyRequest(
        clientId: String,
        clientName: String,
        clientPhone: String,
        description: String,
        commune: String
    ): Result<Boolean> {
        return try {
            val request = ServiceRequest(
                clientId = clientId,
                clientName = clientName,
                clientPhone = clientPhone,
                serviceCategory = "URGENCE",
                description = description,
                commune = commune,
                isEmergency = true,
                status = "en_attente",
                timestamp = Timestamp.now()
            )
            firestore.collection("ServicesRequests").add(request).await()
            Result.success(true)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
