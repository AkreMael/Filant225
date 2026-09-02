package com.filant225.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.filant225.app.data.repository.AuthRepository
import com.filant225.app.data.repository.FirestoreRepository
import com.filant225.app.data.repository.IdentityRepository
import com.filant225.app.ui.screens.*
import com.filant225.app.ui.theme.FilantTheme
import com.filant225.app.ui.theme.NavyDark
import com.filant225.app.ui.theme.OrangePrimary

class MainActivity : ComponentActivity() {

    private lateinit var authRepository: AuthRepository
    private lateinit var identityRepository: IdentityRepository
    private lateinit var firestoreRepository: FirestoreRepository

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        authRepository = AuthRepository(applicationContext)
        identityRepository = IdentityRepository()
        firestoreRepository = FirestoreRepository()

        setContent {
            FilantTheme {
                val navController = rememberNavController()
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentRoute = navBackStackEntry?.destination?.route

                val isLoggedIn = authRepository.isLoggedIn()
                val isAdmin = authRepository.isAdmin()
                val startDestination = if (isLoggedIn) "home" else "auth"

                // Define bottom bar visibility
                val showBottomBar = currentRoute in listOf("home", "chat", "payment", "profile")

                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    bottomBar = {
                        if (showBottomBar) {
                            NavigationBar(
                                containerColor = Color.White,
                                tonalElevation = 8.dp
                            ) {
                                NavigationBarItem(
                                    selected = currentRoute == "home",
                                    onClick = { navController.navigate("home") { launchSingleTop = true } },
                                    icon = { Icon(Icons.Default.Home, contentDescription = "Accueil") },
                                    label = { Text("Accueil") },
                                    colors = NavigationBarItemDefaults.colors(
                                        selectedIconColor = OrangePrimary,
                                        selectedTextColor = OrangePrimary,
                                        indicatorColor = Color(0xFFFFF7ED)
                                    )
                                )
                                NavigationBarItem(
                                    selected = currentRoute == "chat",
                                    onClick = { navController.navigate("chat") { launchSingleTop = true } },
                                    icon = { Icon(Icons.Default.Chat, contentDescription = "Messages") },
                                    label = { Text("Messages") },
                                    colors = NavigationBarItemDefaults.colors(
                                        selectedIconColor = OrangePrimary,
                                        selectedTextColor = OrangePrimary,
                                        indicatorColor = Color(0xFFFFF7ED)
                                    )
                                )
                                NavigationBarItem(
                                    selected = currentRoute == "payment",
                                    onClick = { navController.navigate("payment") { launchSingleTop = true } },
                                    icon = { Icon(Icons.Default.AccountBalanceWallet, contentDescription = "Payer") },
                                    label = { Text("Paiement") },
                                    colors = NavigationBarItemDefaults.colors(
                                        selectedIconColor = OrangePrimary,
                                        selectedTextColor = OrangePrimary,
                                        indicatorColor = Color(0xFFFFF7ED)
                                    )
                                )
                                NavigationBarItem(
                                    selected = currentRoute == "profile",
                                    onClick = { navController.navigate("profile") { launchSingleTop = true } },
                                    icon = { Icon(Icons.Default.Person, contentDescription = "Profil") },
                                    label = { Text("Profil") },
                                    colors = NavigationBarItemDefaults.colors(
                                        selectedIconColor = OrangePrimary,
                                        selectedTextColor = OrangePrimary,
                                        indicatorColor = Color(0xFFFFF7ED)
                                    )
                                )
                                if (isAdmin) {
                                    NavigationBarItem(
                                        selected = currentRoute == "admin",
                                        onClick = { navController.navigate("admin") { launchSingleTop = true } },
                                        icon = { Icon(Icons.Default.AdminPanelSettings, contentDescription = "Admin") },
                                        label = { Text("Admin") },
                                        colors = NavigationBarItemDefaults.colors(
                                            selectedIconColor = Color(0xFF2563EB),
                                            selectedTextColor = Color(0xFF2563EB),
                                            indicatorColor = Color(0xFFEFF6FF)
                                        )
                                    )
                                }
                            }
                        }
                    }
                ) { innerPadding ->
                    NavHost(
                        navController = navController,
                        startDestination = startDestination,
                        modifier = Modifier.padding(innerPadding)
                    ) {
                        composable("auth") {
                            AuthScreen(
                                authRepository = authRepository,
                                onLoginSuccess = { userIsAdmin ->
                                    if (userIsAdmin) {
                                        navController.navigate("admin") {
                                            popUpTo("auth") { inclusive = true }
                                        }
                                    } else {
                                        navController.navigate("home") {
                                            popUpTo("auth") { inclusive = true }
                                        }
                                    }
                                }
                            )
                        }

                        composable("home") {
                            HomeScreen(
                                firestoreRepository = firestoreRepository,
                                userName = authRepository.getSavedPhone() ?: "Utilisateur",
                                onNavigateToQR = { navController.navigate("qr_scanner") },
                                onNavigateToEmergency = { navController.navigate("chat") },
                                onNavigateToPayment = { navController.navigate("payment") },
                                onWorkerClick = { /* View worker detail */ }
                            )
                        }

                        composable("profile") {
                            ProfileScreen(
                                authRepository = authRepository,
                                identityRepository = identityRepository,
                                onNavigateToIdentityVerification = { navController.navigate("identity_verification") },
                                onNavigateToPayment = { navController.navigate("payment") },
                                onLogout = {
                                    navController.navigate("auth") {
                                        popUpTo(0) { inclusive = true }
                                    }
                                }
                            )
                        }

                        composable("identity_verification") {
                            BackHandler {
                                navController.popBackStack()
                            }
                            IdentityVerificationScreen(
                                authRepository = authRepository,
                                identityRepository = identityRepository,
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("chat") {
                            BackHandler {
                                navController.popBackStack()
                            }
                            ChatScreen(
                                authRepository = authRepository,
                                firestoreRepository = firestoreRepository,
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("qr_scanner") {
                            BackHandler {
                                navController.popBackStack()
                            }
                            QRScannerScreen(
                                onBack = { navController.popBackStack() },
                                onCodeScanned = { _ ->
                                    // Handle QR code verification result
                                }
                            )
                        }

                        composable("payment") {
                            BackHandler {
                                navController.popBackStack()
                            }
                            PaymentScreen(
                                authRepository = authRepository,
                                onBack = { navController.popBackStack() }
                            )
                        }

                        composable("admin") {
                            BackHandler {
                                if (navController.previousBackStackEntry != null) {
                                    navController.popBackStack()
                                } else {
                                    navController.navigate("home")
                                }
                            }
                            AdminDashboardScreen(
                                identityRepository = identityRepository,
                                onBack = {
                                    if (navController.previousBackStackEntry != null) {
                                        navController.popBackStack()
                                    } else {
                                        navController.navigate("home")
                                    }
                                }
                            )
                        }
                    }
                }
            }
        }
    }
}
