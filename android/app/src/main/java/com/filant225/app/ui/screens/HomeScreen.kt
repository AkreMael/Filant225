package com.filant225.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
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
import com.filant225.app.data.models.Worker
import com.filant225.app.data.repository.FirestoreRepository
import com.filant225.app.ui.theme.EmeraldVerified
import com.filant225.app.ui.theme.NavyDark
import com.filant225.app.ui.theme.OrangePrimary

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    firestoreRepository: FirestoreRepository,
    userName: String,
    onNavigateToQR: () -> Unit,
    onNavigateToEmergency: () -> Unit,
    onNavigateToPayment: () -> Unit,
    onWorkerClick: (Worker) -> Unit
) {
    val workers by firestoreRepository.observeWorkers().collectAsState(initial = emptyList())
    val categories = listOf("Tous", "Plomberie", "Électricité", "Maçonnerie", "Climatisation", "Menuiserie", "Peinture", "Mécanique")
    var selectedCategory by remember { mutableStateOf("Tous") }
    var searchQuery by remember { mutableStateOf("") }

    val filteredWorkers = workers.filter { worker ->
        (selectedCategory == "Tous" || worker.profession.contains(selectedCategory, ignoreCase = true)) &&
        (searchQuery.isBlank() || worker.name.contains(searchQuery, ignoreCase = true) || worker.profession.contains(searchQuery, ignoreCase = true))
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Box(
                            modifier = Modifier
                                .size(34.dp)
                                .background(OrangePrimary, RoundedCornerShape(8.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("F", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                        }
                        Spacer(modifier = Modifier.width(10.dp))
                        Text("FILANT°225", fontWeight = FontWeight.Bold, fontSize = 18.sp, color = NavyDark)
                    }
                },
                actions = {
                    IconButton(onClick = onNavigateToQR) {
                        Icon(Icons.Default.QrCodeScanner, contentDescription = "Scanner QR", tint = OrangePrimary)
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
        ) {
            // Greeting & Quick Action Banner
            item {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "Bonjour, $userName 👋",
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        color = NavyDark
                    )
                    Text(
                        text = "Trouvez un professionnel certifié en Côte d'Ivoire",
                        fontSize = 13.sp,
                        color = Color(0xFF64748B)
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    // SOS Emergency Alert Banner
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onNavigateToEmergency() },
                        shape = RoundedCornerShape(16.dp),
                        colors = CardDefaults.cardColors(containerColor = Color(0xFFFEF2F2))
                    ) {
                        Row(
                            modifier = Modifier.padding(16.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(42.dp)
                                    .background(Color(0xFFEF4444), CircleShape),
                                contentAlignment = Alignment.Center
                            ) {
                                Icon(Icons.Default.Warning, contentDescription = null, tint = Color.White)
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Column(modifier = Modifier.weight(1f)) {
                                Text("Besoin d'aide urgente ?", fontWeight = FontWeight.Bold, fontSize = 15.sp, color = Color(0xFF991B1B))
                                Text("Assistance rapide géolocalisée 24/7", fontSize = 12.sp, color = Color(0xFFB91C1C))
                            }
                            Button(
                                onClick = onNavigateToEmergency,
                                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFEF4444)),
                                shape = RoundedCornerShape(8.dp),
                                contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp)
                            ) {
                                Text("SOS", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    // Search field
                    OutlinedTextField(
                        value = searchQuery,
                        onValueChange = { searchQuery = it },
                        placeholder = { Text("Rechercher un service, métier, ville...") },
                        leadingIcon = { Icon(Icons.Default.Search, contentDescription = null, tint = Color(0xFF64748B)) },
                        modifier = Modifier.fillMaxWidth(),
                        shape = RoundedCornerShape(14.dp),
                        singleLine = true,
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedContainerColor = Color.White,
                            unfocusedContainerColor = Color.White
                        )
                    )
                }
            }

            // Categories list
            item {
                Column {
                    Text(
                        text = "Catégories",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = NavyDark,
                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
                    )
                    LazyRow(
                        contentPadding = PaddingValues(horizontal = 16.dp),
                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                    ) {
                        items(categories) { cat ->
                            val isSelected = selectedCategory == cat
                            FilterChip(
                                selected = isSelected,
                                onClick = { selectedCategory = cat },
                                label = { Text(cat, fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal) },
                                colors = FilterChipDefaults.filterChipColors(
                                    selectedContainerColor = OrangePrimary,
                                    selectedLabelColor = Color.White
                                )
                            )
                        }
                    }
                }
            }

            // Workers List Header
            item {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(start = 16.dp, end = 16.dp, top = 20.dp, bottom = 8.dp),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "Professionnels disponibles (${filteredWorkers.size})",
                        fontSize = 16.sp,
                        fontWeight = FontWeight.Bold,
                        color = NavyDark
                    )
                }
            }

            // Workers items
            if (filteredWorkers.isEmpty()) {
                item {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(40.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("Aucun professionnel trouvé dans cette catégorie.", color = Color(0xFF94A3B8), fontSize = 14.sp)
                    }
                }
            } else {
                items(filteredWorkers) { worker ->
                    WorkerCard(worker = worker, onClick = { onWorkerClick(worker) })
                }
            }
        }
    }
}

@Composable
fun WorkerCard(worker: Worker, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 6.dp)
            .clickable { onClick() },
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Profile image with certification badge
            Box {
                if (worker.profileImage.isNotEmpty()) {
                    AsyncImage(
                        model = worker.profileImage,
                        contentDescription = null,
                        modifier = Modifier
                            .size(56.dp)
                            .clip(CircleShape),
                        contentScale = ContentScale.Crop
                    )
                } else {
                    Box(
                        modifier = Modifier
                            .size(56.dp)
                            .background(Color(0xFFF1F5F9), CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.Person, contentDescription = null, tint = Color(0xFF94A3B8), modifier = Modifier.size(32.dp))
                    }
                }
                if (worker.faceVerified || worker.verified) {
                    Box(
                        modifier = Modifier
                            .size(18.dp)
                            .background(EmeraldVerified, CircleShape)
                            .align(Alignment.BottomEnd),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.Check, contentDescription = "Certifié", tint = Color.White, modifier = Modifier.size(12.dp))
                    }
                }
            }

            Spacer(modifier = Modifier.width(14.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(text = worker.name, fontWeight = FontWeight.Bold, fontSize = 15.sp, color = NavyDark)
                Text(text = worker.profession, fontSize = 13.sp, color = OrangePrimary, fontWeight = FontWeight.Medium)
                Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.padding(top = 2.dp)) {
                    Icon(Icons.Default.LocationOn, contentDescription = null, tint = Color(0xFF94A3B8), modifier = Modifier.size(14.dp))
                    Text(
                        text = if (worker.commune.isNotEmpty()) "${worker.commune}, ${worker.ville}" else worker.ville,
                        fontSize = 12.sp,
                        color = Color(0xFF64748B)
                    )
                }
            }

            // Rating & Action
            Column(horizontalAlignment = Alignment.End) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Default.Star, contentDescription = null, tint = Color(0xFFF59E0B), modifier = Modifier.size(16.dp))
                    Spacer(modifier = Modifier.width(2.dp))
                    Text(text = String.format("%.1f", worker.rating), fontWeight = FontWeight.Bold, fontSize = 13.sp)
                }
                Spacer(modifier = Modifier.height(6.dp))
                IconButton(
                    onClick = onClick,
                    modifier = Modifier.size(32.dp)
                ) {
                    Icon(Icons.Default.ChevronRight, contentDescription = null, tint = Color(0xFFCBD5E1))
                }
            }
        }
    }
}
