package com.filant225.app.ui.screens

import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.filant225.app.data.repository.AuthRepository
import com.filant225.app.data.repository.IdentityRepository
import com.filant225.app.ui.theme.EmeraldVerified
import com.filant225.app.ui.theme.NavyDark
import com.filant225.app.ui.theme.OrangePrimary
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun IdentityVerificationScreen(
    authRepository: AuthRepository,
    identityRepository: IdentityRepository,
    onBack: () -> Unit
) {
    val phone = authRepository.getSavedPhone() ?: ""
    val user by authRepository.observeCurrentUser(phone).collectAsState(initial = null)
    val identityDoc by identityRepository.observeUserIdentity(phone).collectAsState(initial = null)

    var rectoUri by remember { mutableStateOf<Uri?>(null) }
    var versoUri by remember { mutableStateOf<Uri?>(null) }
    var selfieUri by remember { mutableStateOf<Uri?>(null) }
    var isUploading by remember { mutableStateOf(false) }
    var uploadStatusMessage by remember { mutableStateOf<String?>(null) }
    val scope = rememberCoroutineScope()

    val rectoLauncher = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        rectoUri = uri
    }
    val versoLauncher = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        versoUri = uri
    }
    val selfieLauncher = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        selfieUri = uri
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Vérification d'Identité", fontWeight = FontWeight.Bold, color = NavyDark) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Retour", tint = NavyDark)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFF8FAFC))
                .padding(padding)
                .verticalScroll(rememberScrollState())
                .padding(16.dp)
        ) {
            Text(
                text = "Certification officielle de votre profil",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                color = NavyDark
            )
            Text(
                text = "Conformément aux normes FILANT°225, la pièce d'identité et le selfie sont traités et validés de manière sécurisée par nos administrateurs.",
                fontSize = 13.sp,
                color = Color(0xFF64748B),
                modifier = Modifier.padding(top = 4.dp, bottom = 16.dp)
            )

            // Step 1: Recto
            DocumentPickerCard(
                title = "1. Pièce d'Identité - RECTO",
                subtitle = "CNI, Passeport ou Attestation (Face avant)",
                currentUrl = identityDoc?.rectoUrl,
                selectedUri = rectoUri,
                onPick = { rectoLauncher.launch("image/*") }
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Step 2: Verso
            DocumentPickerCard(
                title = "2. Pièce d'Identité - VERSO",
                subtitle = "Face arrière de votre pièce d'identité",
                currentUrl = identityDoc?.versoUrl,
                selectedUri = versoUri,
                onPick = { versoLauncher.launch("image/*") }
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Step 3: Selfie Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(
                    modifier = Modifier.padding(16.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "3. Selfie / Photo du visage en direct",
                        fontWeight = FontWeight.Bold,
                        fontSize = 15.sp,
                        color = NavyDark,
                        modifier = Modifier.fillMaxWidth()
                    )
                    Text(
                        text = "Prenez un selfie bien éclairé, visage centré, sans lunettes de soleil ni masque.",
                        fontSize = 12.sp,
                        color = Color(0xFF64748B),
                        modifier = Modifier.fillMaxWidth().padding(top = 2.dp, bottom = 12.dp)
                    )

                    Box(
                        modifier = Modifier
                            .size(130.dp)
                            .border(3.dp, if (selfieUri != null || identityDoc?.selfieUrl?.isNotEmpty() == true) EmeraldVerified else OrangePrimary, CircleShape)
                            .padding(4.dp)
                            .clip(CircleShape)
                            .background(Color(0xFFF1F5F9))
                            .clickable { selfieLauncher.launch("image/*") },
                        contentAlignment = Alignment.Center
                    ) {
                        when {
                            selfieUri != null -> {
                                AsyncImage(
                                    model = selfieUri,
                                    contentDescription = "Selfie",
                                    modifier = Modifier.fillMaxSize(),
                                    contentScale = ContentScale.Crop
                                )
                            }
                            identityDoc?.selfieUrl?.isNotEmpty() == true -> {
                                AsyncImage(
                                    model = identityDoc?.selfieUrl,
                                    contentDescription = "Selfie",
                                    modifier = Modifier.fillMaxSize(),
                                    contentScale = ContentScale.Crop
                                )
                            }
                            else -> {
                                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                    Icon(Icons.Default.CameraAlt, contentDescription = null, tint = OrangePrimary, modifier = Modifier.size(36.dp))
                                    Text("Prendre selfie", fontSize = 11.sp, color = OrangePrimary, fontWeight = FontWeight.Bold)
                                }
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    TextButton(onClick = { selfieLauncher.launch("image/*") }) {
                        Text(if (selfieUri != null) "Changer le selfie" else "Sélectionner / Prendre la photo", fontSize = 13.sp, color = OrangePrimary)
                    }
                }
            }

            if (uploadStatusMessage != null) {
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = uploadStatusMessage ?: "",
                    color = if (uploadStatusMessage?.contains("succès", ignoreCase = true) == true) EmeraldVerified else MaterialTheme.colorScheme.error,
                    fontSize = 13.sp,
                    textAlign = TextAlign.Center,
                    modifier = Modifier.fillMaxWidth()
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Submit Button
            Button(
                onClick = {
                    if (rectoUri == null && versoUri == null && selfieUri == null) {
                        uploadStatusMessage = "Veuillez sélectionner au moins une image à soumettre."
                        return@Button
                    }
                    isUploading = true
                    uploadStatusMessage = "Téléversement des documents en cours..."

                    scope.launch {
                        try {
                            var uploadedRecto = identityDoc?.rectoUrl ?: ""
                            var uploadedVerso = identityDoc?.versoUrl ?: ""
                            var uploadedSelfie = identityDoc?.selfieUrl ?: ""

                            if (rectoUri != null) {
                                val r = identityRepository.uploadImage(phone, "recto", rectoUri!!)
                                if (r.isSuccess) uploadedRecto = r.getOrThrow()
                            }
                            if (versoUri != null) {
                                val r = identityRepository.uploadImage(phone, "verso", versoUri!!)
                                if (r.isSuccess) uploadedVerso = r.getOrThrow()
                            }
                            if (selfieUri != null) {
                                val r = identityRepository.uploadImage(phone, "selfie", selfieUri!!)
                                if (r.isSuccess) uploadedSelfie = r.getOrThrow()
                            }

                            val submitResult = identityRepository.submitIdentityDocument(
                                userId = phone,
                                userName = user?.name ?: "Utilisateur",
                                userPhone = phone,
                                rectoUrl = uploadedRecto,
                                versoUrl = uploadedVerso,
                                selfieUrl = uploadedSelfie
                            )

                            isUploading = false
                            if (submitResult.isSuccess) {
                                uploadStatusMessage = "Vos documents et votre selfie ont été soumis avec succès ! L'administrateur va procéder à leur validation."
                            } else {
                                uploadStatusMessage = "Erreur lors de l'enregistrement dans la base de données."
                            }
                        } catch (e: Exception) {
                            isUploading = false
                            uploadStatusMessage = "Erreur : ${e.message}"
                        }
                    }
                },
                enabled = !isUploading,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = OrangePrimary)
            ) {
                if (isUploading) {
                    CircularProgressIndicator(color = Color.White, modifier = Modifier.size(24.dp))
                } else {
                    Text("Soumettre pour validation", fontSize = 16.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
fun DocumentPickerCard(
    title: String,
    subtitle: String,
    currentUrl: String?,
    selectedUri: Uri?,
    onPick: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(text = title, fontWeight = FontWeight.Bold, fontSize = 15.sp, color = NavyDark)
            Text(text = subtitle, fontSize = 12.sp, color = Color(0xFF64748B), modifier = Modifier.padding(top = 2.dp, bottom = 12.dp))

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(140.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color(0xFFF1F5F9))
                    .clickable { onPick() },
                contentAlignment = Alignment.Center
            ) {
                when {
                    selectedUri != null -> {
                        AsyncImage(
                            model = selectedUri,
                            contentDescription = null,
                            modifier = Modifier.fillMaxSize(),
                            contentScale = ContentScale.Crop
                        )
                    }
                    !currentUrl.isNullOrEmpty() -> {
                        AsyncImage(
                            model = currentUrl,
                            contentDescription = null,
                            modifier = Modifier.fillMaxSize(),
                            contentScale = ContentScale.Crop
                        )
                    }
                    else -> {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Icon(Icons.Default.CloudUpload, contentDescription = null, tint = OrangePrimary, modifier = Modifier.size(40.dp))
                            Spacer(modifier = Modifier.height(6.dp))
                            Text("Sélectionner ou prendre la photo", fontSize = 13.sp, color = OrangePrimary, fontWeight = FontWeight.Medium)
                        }
                    }
                }
            }
        }
    }
}
