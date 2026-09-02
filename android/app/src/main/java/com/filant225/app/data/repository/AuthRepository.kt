package com.filant225.app.data.repository

import android.content.Context
import android.content.SharedPreferences
import com.filant225.app.data.models.User
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await

class AuthRepository(private val context: Context) {
    private val firestore: FirebaseFirestore = FirebaseFirestore.getInstance()
    private val prefs: SharedPreferences = context.getSharedPreferences("filant_auth_prefs", Context.MODE_PRIVATE)

    companion object {
        private const val KEY_PHONE = "saved_user_phone"
        private const val KEY_NAME = "saved_user_name"
        private const val KEY_ROLE = "saved_user_role"
        private const val KEY_IS_LOGGED_IN = "is_logged_in"
        private const val KEY_IS_ADMIN = "is_admin"

        // Default Master Admin Phone numbers
        val ADMIN_PHONES = listOf("0102030405", "0708091011", "0506070809", "admin")
    }

    fun cleanPhone(phone: String): String {
        return phone.replace(Regex("[^0-9]"), "")
    }

    suspend fun loginWithPhoneAndPin(phone: String, pin: String): Result<User> {
        val sanitizedPhone = cleanPhone(phone)
        if (sanitizedPhone.isBlank() || pin.length != 4) {
            return Result.failure(Exception("Numéro de téléphone ou code PIN invalide (4 chiffres requis)."))
        }

        try {
            // Check in Clients collection
            var userDoc = firestore.collection("Clients").document(sanitizedPhone).get().await()
            var role = "client"

            if (!userDoc.exists()) {
                // Check in Travailleurs
                userDoc = firestore.collection("Travailleurs").document(sanitizedPhone).get().await()
                if (userDoc.exists()) {
                    role = "travailleur"
                } else {
                    // Check in Inscriptions
                    userDoc = firestore.collection("Inscriptions").document(sanitizedPhone).get().await()
                    if (userDoc.exists()) {
                        role = "client"
                    }
                }
            }

            val isAdmin = ADMIN_PHONES.contains(sanitizedPhone) || sanitizedPhone == "admin"

            if (userDoc.exists()) {
                val dbPin = userDoc.getString("pin") ?: ""
                if (dbPin.isNotEmpty() && dbPin != pin) {
                    return Result.failure(Exception("Code PIN incorrect. Veuillez réessayer ou contacter l'administrateur."))
                }

                val user = User(
                    id = sanitizedPhone,
                    name = userDoc.getString("name") ?: userDoc.getString("nom") ?: "Utilisateur",
                    phone = sanitizedPhone,
                    pin = pin,
                    role = if (isAdmin) "admin" else role,
                    commune = userDoc.getString("commune") ?: "",
                    ville = userDoc.getString("ville") ?: "Abidjan",
                    balance = userDoc.getDouble("balance") ?: 0.0,
                    profileImage = userDoc.getString("profileImage") ?: userDoc.getString("photo") ?: "",
                    idCardFront = userDoc.getString("idCardFront") ?: "",
                    idCardBack = userDoc.getString("idCardBack") ?: "",
                    idCardStatus = userDoc.getString("idCardStatus") ?: "non_soumis",
                    selfieUrl = userDoc.getString("selfieUrl") ?: "",
                    selfieStatus = userDoc.getString("selfieStatus") ?: "non_soumis",
                    faceVerified = userDoc.getBoolean("faceVerified") ?: false,
                    isAvailable = userDoc.getBoolean("isAvailable") ?: true
                )

                saveSession(user, isAdmin)
                return Result.success(user)
            } else {
                // First-time user registration on login
                val newUser = User(
                    id = sanitizedPhone,
                    name = "Utilisateur",
                    phone = sanitizedPhone,
                    pin = pin,
                    role = if (isAdmin) "admin" else "client"
                )

                firestore.collection("Clients").document(sanitizedPhone).set(newUser).await()
                saveSession(newUser, isAdmin)
                return Result.success(newUser)
            }
        } catch (e: Exception) {
            return Result.failure(e)
        }
    }

    private fun saveSession(user: User, isAdmin: Boolean) {
        prefs.edit()
            .putString(KEY_PHONE, user.phone)
            .putString(KEY_NAME, user.name)
            .putString(KEY_ROLE, user.role)
            .putBoolean(KEY_IS_LOGGED_IN, true)
            .putBoolean(KEY_IS_ADMIN, isAdmin)
            .apply()
    }

    fun getSavedPhone(): String? = prefs.getString(KEY_PHONE, null)
    fun isLoggedIn(): Boolean = prefs.getBoolean(KEY_IS_LOGGED_IN, false)
    fun isAdmin(): Boolean = prefs.getBoolean(KEY_IS_ADMIN, false)

    fun logout() {
        prefs.edit().clear().apply()
    }

    fun observeCurrentUser(phone: String): Flow<User?> = callbackFlow {
        val docRef = firestore.collection("Clients").document(cleanPhone(phone))
        val listener = docRef.addSnapshotListener { snapshot, _ ->
            if (snapshot != null && snapshot.exists()) {
                val user = snapshot.toObject(User::class.java)?.copy(id = snapshot.id)
                trySend(user)
            } else {
                trySend(null)
            }
        }
        awaitClose { listener.remove() }
    }
}
