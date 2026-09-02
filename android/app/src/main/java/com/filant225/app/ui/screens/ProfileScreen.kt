package com.filant225.app.ui.screens

import androidx.compose.foundation.background
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
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.filant225.app.data.repository.AuthRepository
import com.filant225.app.data.repository.IdentityRepository
import com.filant225.app.ui.theme.EmeraldVerified
import com.filant225.app.ui.theme.NavyDark
import com.filant225.app.ui.theme.OrangePrimary

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    authRepository: AuthRepository,
    identityRepository: IdentityRepository,
    onNavigateToIdentityVerification: () -> Unit,
    onNavigateToPayment: () -> Unit,
    onLogout: () -> Unit
) {
    val phone = authRepository.getSavedPhone() ?: ""
    val user by authRepository.observeCurrentUser(phone).collectAsState(initial = null)
    val identityDoc by identityRepository.observeUserIdentity(phone).collectAsState(initial = null)

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Mon Profil", fontWeight = FontWeight.Bold, color = NavyDark) },
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
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Profile Card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(
                    modifier = Modifier.padding(20.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Box {
                        val avatarUrl = user?.profileImage?.ifEmpty { user?.selfieUrl } ?: ""
                        if (avatarUrl.isNotEmpty()) {
                            AsyncImage(
                                model = avatarUrl,
                                contentDescription = "Avatar",
                                modifier = Modifier
                                    .size(90.dp)
                                    .clip(CircleShape),
                                contentScale = ContentScale.Crop
                            )
                        } else {
                            Box(
                                modifier = Modifier
                                    .size(90.dp)
                                    .background(Color(0xFFF1F5F9), CircleShape),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(Icons.Default.Person, contentDescription = null, tint = Color(0xFF94A3B8), modifier = Modifier.size(50.dp))
                            }
                        }

                        // Face certified badge
                        if (user?.faceVerified == true || identityDoc?.selfieStatus == "validee") {
                            Box(
                                modifier = Modifier
                                    .size(26.dp)
                                    .background(EmeraldVerified, CircleShape)
                                    .align(Alignment.BottomEnd),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(Icons.Default.Check, contentDescription = "Certifié", tint = Color.White, modifier = Modifier.size(16.dp))
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Text(
                        text = user?.name ?: "Utilisateur FILANT°225",
                        fontWeight = FontWeight.Bold,
                        fontSize = 18.sp,
                        color = NavyDark
                    )

                    Text(
                        text = "+225 $phone",
                        fontSize = 14.sp,
                        color = Color(0xFF64748B)
                    )

                    if (user?.faceVerified == true || identityDoc?.selfieStatus == "validee") {
                        Spacer(modifier = Modifier.height(8.dp))
                        Surface(
                            shape = RoundedCornerShape(20.dp),
                            color = Color(0xFFECFDF5)
                        ) {
                            Row(
                                modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Icon(Icons.Default.VerifiedUser, contentDescription = null, tint = EmeraldVerified, modifier = Modifier.size(14.dp))
                                Spacer(modifier = Modifier.width(4.dp))
                                Text("Identité & Visage Certifiés", fontSize = 11.sp, color = EmeraldVerified, fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Identity & Face verification card
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Default.Badge, contentDescription = null, tint = OrangePrimary)
                        Spacer(modifier = Modifier.width(10.dp))
                        Text("Vérification d'Identité & Selfie", fontWeight = FontWeight.Bold, fontSize = 15.sp, color = NavyDark)
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    // ID Card status
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("Pièce d'identité (Recto/Verso) :", fontSize = 13.sp, color = Color(0xFF64748B))
                        StatusBadge(status = identityDoc?.status ?: "non_soumis")
                    }

                    Spacer(modifier = Modifier.height(8.dp))

                    // Selfie status
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text("Photo Selfie / Visage :", fontSize = 13.sp, color = Color(0xFF64748B))
                        StatusBadge(status = identityDoc?.selfieStatus ?: "non_soumis")
                    }

                    Spacer(modifier = Modifier.height(14.dp))

                    Button(
                        onClick = onNavigateToIdentityVerification,
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = OrangePrimary)
                    ) {
                        Icon(Icons.Default.CameraAlt, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = if (identityDoc?.status == "validee" && identityDoc?.selfieStatus == "validee") 
                                "Mettre à jour mes documents" 
                            else 
                                "Soumettre ma pièce & mon selfie",
                            fontSize = 13.sp
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Account settings list
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column {
                    ProfileMenuRow(
                        icon = Icons.Default.AccountBalanceWallet,
                        title = "Solde & Paiements Wave / MoMo",
                        onClick = onNavigateToPayment
                    )
                    Divider(color = Color(0xFFF1F5F9))
                    ProfileMenuRow(
                        icon = Icons.Default.Logout,
                        title = "Déconnexion",
                        tint = Color(0xFFEF4444),
                        onClick = {
                            authRepository.logout()
                            onLogout()
                        }
                    )
                }
            }
        }
    }
}

@Composable
fun StatusBadge(status: String) {
    val (label, bg, fg) = when (status) {
        "validee" -> Triple("Validée", Color(0xFFECFDF5), EmeraldVerified)
        "en_attente" -> Triple("En attente", Color(0xFFFEF3C7), Color(0xFFD97706))
        "refusee" -> Triple("Refusée", Color(0xFFFEF2F2), Color(0xFFEF4444))
        else -> Triple("Non soumis", Color(0xFFF1F5F9), Color(0xFF64748B))
    }

    Surface(shape = RoundedCornerShape(12.dp), color = bg) {
        Text(text = label, color = fg, fontSize = 11.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp))
    }
}

@Composable
fun ProfileMenuRow(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    title: String,
    tint: Color = NavyDark,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(icon, contentDescription = null, tint = tint, modifier = Modifier.size(20.dp))
        Spacer(modifier = Modifier.width(14.dp))
        Text(title, fontSize = 14.sp, fontWeight = FontWeight.Medium, color = tint, modifier = Modifier.weight(1f))
        Icon(Icons.Default.ChevronRight, contentDescription = null, tint = Color(0xFFCBD5E1), modifier = Modifier.size(18.dp))
    }
}
