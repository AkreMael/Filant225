package com.filant225.app.ui.screens

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.filant225.app.data.repository.AuthRepository
import com.filant225.app.ui.theme.EmeraldVerified
import com.filant225.app.ui.theme.NavyDark
import com.filant225.app.ui.theme.OrangePrimary

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PaymentScreen(
    authRepository: AuthRepository,
    onBack: () -> Unit
) {
    val context = LocalContext.current
    val phone = authRepository.getSavedPhone() ?: ""
    var selectedAmount by remember { mutableStateOf(2000) }
    var selectedMethod by remember { mutableStateOf("WAVE") }
    var paymentSuccess by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Paiement & Rechargement", fontWeight = FontWeight.Bold, color = NavyDark) },
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
                .padding(16.dp)
        ) {
            Text(
                text = "Paiement sécurisé FILANT°225",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                color = NavyDark
            )
            Text(
                text = "Rechargez votre compte ou réglez vos prestations via Wave ou Mobile Money.",
                fontSize = 13.sp,
                color = Color(0xFF64748B),
                modifier = Modifier.padding(top = 4.dp, bottom = 20.dp)
            )

            // Select Amount
            Text("Montant à régler :", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = NavyDark)
            Spacer(modifier = Modifier.height(8.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                listOf(1000, 2000, 5000, 10000).forEach { amt ->
                    val isSelected = selectedAmount == amt
                    OutlinedButton(
                        onClick = { selectedAmount = amt },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(10.dp),
                        colors = ButtonDefaults.outlinedButtonColors(
                            containerColor = if (isSelected) OrangePrimary else Color.White,
                            contentColor = if (isSelected) Color.White else NavyDark
                        )
                    ) {
                        Text("${amt} F", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Select Provider
            Text("Moyen de paiement :", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = NavyDark)
            Spacer(modifier = Modifier.height(8.dp))

            PaymentMethodCard(
                name = "Wave Côte d'Ivoire",
                subtitle = "Paiement instantané sans frais additionnels",
                isSelected = selectedMethod == "WAVE",
                onClick = { selectedMethod = "WAVE" }
            )

            Spacer(modifier = Modifier.height(8.dp))

            PaymentMethodCard(
                name = "Orange / MTN / Moov Money",
                subtitle = "Débit direct par numéro de téléphone",
                isSelected = selectedMethod == "MOMO",
                onClick = { selectedMethod = "MOMO" }
            )

            Spacer(modifier = Modifier.height(28.dp))

            if (paymentSuccess) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = Color(0xFFECFDF5))
                ) {
                    Row(
                        modifier = Modifier.padding(16.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Icon(Icons.Default.CheckCircle, contentDescription = null, tint = EmeraldVerified)
                        Spacer(modifier = Modifier.width(12.dp))
                        Text(
                            text = "Paiement de $selectedAmount FCFA initié avec succès !",
                            color = EmeraldVerified,
                            fontWeight = FontWeight.Bold,
                            fontSize = 13.sp
                        )
                    }
                }
                Spacer(modifier = Modifier.height(16.dp))
            }

            Button(
                onClick = {
                    if (selectedMethod == "WAVE") {
                        // Open Wave Payment Deep Link / Intent
                        val waveUri = Uri.parse("https://pay.wave.com/c/filant225?amount=$selectedAmount&client=$phone")
                        val intent = Intent(Intent.ACTION_VIEW, waveUri)
                        try {
                            context.startActivity(intent)
                        } catch (e: Exception) {
                            // Fallback
                        }
                    }
                    paymentSuccess = true
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                shape = RoundedCornerShape(12.dp),
                colors = ButtonDefaults.buttonColors(containerColor = OrangePrimary)
            ) {
                Text("Payer $selectedAmount FCFA", fontSize = 16.sp, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun PaymentMethodCard(
    name: String,
    subtitle: String,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(
            containerColor = if (isSelected) Color(0xFFFFF7ED) else Color.White
        ),
        border = if (isSelected) ButtonDefaults.outlinedButtonBorder else null
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            RadioButton(
                selected = isSelected,
                onClick = onClick,
                colors = RadioButtonDefaults.colors(selectedColor = OrangePrimary)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Column {
                Text(name, fontWeight = FontWeight.Bold, fontSize = 14.sp, color = NavyDark)
                Text(subtitle, fontSize = 12.sp, color = Color(0xFF64748B))
            }
        }
    }
}
