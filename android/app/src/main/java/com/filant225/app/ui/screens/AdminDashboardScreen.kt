package com.filant225.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
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
import com.filant225.app.data.models.IdentityDocument
import com.filant225.app.data.repository.IdentityRepository
import com.filant225.app.ui.theme.EmeraldVerified
import com.filant225.app.ui.theme.NavyDark
import com.filant225.app.ui.theme.OrangePrimary
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AdminDashboardScreen(
    identityRepository: IdentityRepository,
    onBack: () -> Unit
) {
    val submissions by identityRepository.observeAllSubmissions().collectAsState(initial = emptyList())
    var selectedFilter by remember { mutableStateOf("En attente") }
    val scope = rememberCoroutineScope()

    val pendingCount = submissions.count { it.status == "en_attente" || it.selfieStatus == "en_attente" }
    val validatedCount = submissions.count { it.status == "validee" && it.selfieStatus == "validee" }

    val filteredList = when (selectedFilter) {
        "En attente" -> submissions.filter { it.status == "en_attente" || it.selfieStatus == "en_attente" }
        "Validés" -> submissions.filter { it.status == "validee" || it.selfieStatus == "validee" }
        else -> submissions
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Espace Administrateur", fontWeight = FontWeight.Bold, color = NavyDark) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Retour", tint = NavyDark)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White)
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .background(Color(0xFFF8FAFC))
                .padding(padding)
                .padding(16.dp)
        ) {
            // Metrics Summary
            item {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    AdminStatCard(
                        title = "En attente",
                        count = pendingCount.toString(),
                        bgColor = Color(0xFFFEF3C7),
                        textColor = Color(0xFFD97706),
                        modifier = Modifier.weight(1f)
                    )
                    AdminStatCard(
                        title = "Certifiés",
                        count = validatedCount.toString(),
                        bgColor = Color(0xFFECFDF5),
                        textColor = EmeraldVerified,
                        modifier = Modifier.weight(1f)
                    )
                    AdminStatCard(
                        title = "Total",
                        count = submissions.size.toString(),
                        bgColor = Color(0xFFEFF6FF),
                        textColor = Color(0xFF2563EB),
                        modifier = Modifier.weight(1f)
                    )
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Filter tabs
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    listOf("En attente", "Validés", "Tous").forEach { tab ->
                        val isSelected = selectedFilter == tab
                        FilterChip(
                            selected = isSelected,
                            onClick = { selectedFilter = tab },
                            label = { Text(tab, fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal) },
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = OrangePrimary,
                                selectedLabelColor = Color.White
                            )
                        )
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = "Dossiers de vérification d'identité (${filteredList.size})",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold,
                    color = NavyDark
                )
                Spacer(modifier = Modifier.height(8.dp))
            }

            if (filteredList.isEmpty()) {
                item {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(40.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("Aucun dossier dans cette section.", color = Color(0xFF94A3B8), fontSize = 14.sp)
                    }
                }
            } else {
                items(filteredList) { doc ->
                    AdminDocumentCard(
                        doc = doc,
                        onValidateId = {
                            scope.launch { identityRepository.validateIdCard(doc.userId) }
                        },
                        onRejectId = {
                            scope.launch { identityRepository.rejectIdCard(doc.userId, "Pièce illisible ou non conforme.") }
                        },
                        onValidateSelfie = {
                            scope.launch { identityRepository.validateSelfie(doc.userId, doc.selfieUrl) }
                        },
                        onRejectSelfie = {
                            scope.launch { identityRepository.rejectSelfie(doc.userId, "Selfie non conforme, flou ou sans visage net.") }
                        }
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                }
            }
        }
    }
}

@Composable
fun AdminStatCard(title: String, count: String, bgColor: Color, textColor: Color, modifier: Modifier = Modifier) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = bgColor)
    ) {
        Column(
            modifier = Modifier.padding(14.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(text = count, fontSize = 22.sp, fontWeight = FontWeight.Bold, color = textColor)
            Text(text = title, fontSize = 11.sp, color = textColor, fontWeight = FontWeight.Medium)
        }
    }
}

@Composable
fun AdminDocumentCard(
    doc: IdentityDocument,
    onValidateId: () -> Unit,
    onRejectId: () -> Unit,
    onValidateSelfie: () -> Unit,
    onRejectSelfie: () -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            // User info row
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .background(Color(0xFFF1F5F9), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Default.Person, contentDescription = null, tint = OrangePrimary)
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    Text(text = doc.userName, fontWeight = FontWeight.Bold, fontSize = 15.sp, color = NavyDark)
                    Text(text = "Tél: ${doc.userPhone} | Ville: ${doc.userCity}", fontSize = 12.sp, color = Color(0xFF64748B))
                }
            }

            Divider(color = Color(0xFFF1F5F9), modifier = Modifier.padding(vertical = 12.dp))

            // SECTION 1: PIÈCE D'IDENTITÉ (RECTO / VERSO)
            Text(
                text = "1. Pièce d'Identité (Recto / Verso)",
                fontWeight = FontWeight.Bold,
                fontSize = 13.sp,
                color = NavyDark
            )
            Spacer(modifier = Modifier.height(8.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(90.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(Color(0xFFF1F5F9))
                ) {
                    if (doc.rectoUrl.isNotEmpty()) {
                        AsyncImage(model = doc.rectoUrl, contentDescription = "Recto", modifier = Modifier.fillMaxSize(), contentScale = ContentScale.Crop)
                    } else {
                        Text("Pas de Recto", fontSize = 11.sp, color = Color.Gray, modifier = Modifier.align(Alignment.Center))
                    }
                }
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(90.dp)
                        .clip(RoundedCornerShape(8.dp))
                        .background(Color(0xFFF1F5F9))
                ) {
                    if (doc.versoUrl.isNotEmpty()) {
                        AsyncImage(model = doc.versoUrl, contentDescription = "Verso", modifier = Modifier.fillMaxSize(), contentScale = ContentScale.Crop)
                    } else {
                        Text("Pas de Verso", fontSize = 11.sp, color = Color.Gray, modifier = Modifier.align(Alignment.Center))
                    }
                }
            }

            Spacer(modifier = Modifier.height(8.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                StatusBadge(status = doc.status)
                Spacer(modifier = Modifier.weight(1f))
                OutlinedButton(
                    onClick = onRejectId,
                    shape = RoundedCornerShape(8.dp),
                    colors = ButtonDefaults.outlinedButtonColors(contentColor = Color(0xFFEF4444)),
                    contentPadding = PaddingValues(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text("Rejeter Pièce", fontSize = 11.sp)
                }
                Button(
                    onClick = onValidateId,
                    shape = RoundedCornerShape(8.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = EmeraldVerified),
                    contentPadding = PaddingValues(horizontal = 8.dp, vertical = 4.dp)
                ) {
                    Text("Valider Pièce", fontSize = 11.sp)
                }
            }

            Divider(color = Color(0xFFF1F5F9), modifier = Modifier.padding(vertical = 12.dp))

            // SECTION 2: SELFIE / VISAGE
            Text(
                text = "2. Selfie / Photo du Visage",
                fontWeight = FontWeight.Bold,
                fontSize = 13.sp,
                color = NavyDark
            )
            Spacer(modifier = Modifier.height(8.dp))
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(70.dp)
                        .clip(CircleShape)
                        .background(Color(0xFFF1F5F9)),
                    contentAlignment = Alignment.Center
                ) {
                    if (doc.selfieUrl.isNotEmpty()) {
                        AsyncImage(model = doc.selfieUrl, contentDescription = "Selfie", modifier = Modifier.fillMaxSize(), contentScale = ContentScale.Crop)
                    } else {
                        Text("Aucun", fontSize = 11.sp, color = Color.Gray)
                    }
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column(modifier = Modifier.weight(1f)) {
                    StatusBadge(status = doc.selfieStatus)
                    Spacer(modifier = Modifier.height(6.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        OutlinedButton(
                            onClick = onRejectSelfie,
                            shape = RoundedCornerShape(8.dp),
                            colors = ButtonDefaults.outlinedButtonColors(contentColor = Color(0xFFEF4444)),
                            contentPadding = PaddingValues(horizontal = 8.dp, vertical = 4.dp)
                        ) {
                            Text("Rejeter Visage", fontSize = 11.sp)
                        }
                        Button(
                            onClick = onValidateSelfie,
                            shape = RoundedCornerShape(8.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = EmeraldVerified),
                            contentPadding = PaddingValues(horizontal = 8.dp, vertical = 4.dp)
                        ) {
                            Text("Valider Visage", fontSize = 11.sp)
                        }
                    }
                }
            }
        }
    }
}
