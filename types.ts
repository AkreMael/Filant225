
export enum Tab {
  Profile = 'Profile',
  Menu = 'Menu',
  Offer = 'Offer',
  Admin = 'Admin',
  Emergency = 'Emergency',
  WavePayment = 'WavePayment',
  Map = 'Map',
  Payment = 'Payment',
  Notifications = 'Notifications',
  UserChat = 'UserChat',
  MyQRCode = 'MyQRCode',
  Evolution = 'Evolution'
}

export interface User {
  id?: string;
  userId?: string; // Firebase Auth UID
  name: string;
  city: string;
  phone: string;
  role?: string;
  isVerified?: boolean;
  isBlocked?: boolean;
  status?: 'active' | 'pending' | 'blocked';
  activeSessionId?: string;
  pin?: string; // 4-digit PIN
  idCardFront?: string;
  idCardBack?: string;
  idCardUploadedAt?: any;
  idCardStatus?: string;
}

export interface NotificationButton {
  label: string;
  action: 'travailleurs' | 'equipements' | 'agences' | 'recherche' | 'simple_demande' | 'url_link' | 'qr_code' | 'paiement' | 'inscription' | 'inscriptions' | 'requests' | 'demandes' | 'services_requests' | 'payments' | string;
  searchFilter?: string; // Optional filter for search
  amount?: number; // Optional amount for payment
}

export interface NotificationStep {
  message: string;
  imageUrl?: string;
  buttons?: NotificationButton[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  isRead: boolean;
  imageUrl?: string;
  hasButton?: boolean;
  buttons?: NotificationButton[];
  steps?: NotificationStep[];
}

export interface Worker {
  id: string;
  name: string;
  profileImageUrl: string;
  phone: string;
  rating: number;
  description: string;
  category: string;
  isVerified?: boolean;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface PersonalRequest {
  id: string;
  type: 'Location' | 'Travailleur';
  title: string;
  name: string;
  city: string;
  phone: string;
  description: string;
  interventionPlace?: string; // Specific to Location
  rawAnswers?: Record<string, string | null>;
  totalPrice?: number;
}

export interface FavoriteRequest {
  id: string;
  title: string;
  date: string; // ISO string
  formType: 'worker' | 'location' | 'personal_worker' | 'personal_location' | 'night_service' | 'rapid_building_service' | 'stage' | 'formation' | 'simple_demande';
  answers: Record<string, string | null>;
  userInfo: User;
  totalPrice?: number;
}

export interface FavoriteWorker {
  id: string;
  workerId?: string;
  name: string;
  category?: string;
  description?: string;
  profileImageUrl?: string;
  rating?: number;
  phone?: string;
  isVerified?: boolean;
  formType?: 'worker' | 'location' | 'night_service' | 'rapid_building_service';
  userPhone?: string;
  addedAt?: number;
}

export interface WorkerLiveLocation {
  workerId: string;
  workerName: string;
  workerPhone: string;
  category?: string;
  profileImageUrl?: string;
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
  accuracy?: number;
  status: 'disponible' | 'en_route' | 'en_intervention' | 'hors_ligne' | string;
  currentAddress?: string;
  city?: string;
  destinationLat?: number;
  destinationLng?: number;
  destinationAddress?: string;
  isLiveTracking: boolean;
  pathHistory?: { lat: number; lng: number; timestamp: number }[];
  lastUpdated: number;
  updatedAt?: any;
}

export interface AddressValidationResult {
  success: boolean;
  isValid: boolean;
  formattedAddress: string;
  regionCode?: string;
  source?: string;
  verdict?: {
    inputGranularity?: string;
    validationGranularity?: string;
    geocodeGranularity?: string;
    addressComplete?: boolean;
    hasUnconfirmedComponents?: boolean;
    hasInferredComponents?: boolean;
  };
  geocode?: {
    location?: {
      latitude?: number;
      longitude?: number;
    };
    placeId?: string;
  };
  postalAddress?: any;
}

export interface NavigationRoute {
  distanceKm: number;
  formattedDistance: string;
  durationMinutes: number;
  formattedDuration: string;
  encodedPolyline?: string;
  source?: string;
}

export interface VoiceMessagePayload {
  audioUrl: string;
  audioDuration: number;
  transcription?: string;
}

export type IdentityVerificationStatus = 'non_soumis' | 'en_attente' | 'validee' | 'refusee';

export interface IdentityDocument {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userCity?: string;
  rectoUrl: string;
  versoUrl: string;
  status: IdentityVerificationStatus;
  submittedAt?: any;
  updatedAt?: any;
  verifiedAt?: any;
  rejectionReason?: string;
  adminReadStatus?: 'LU' | 'NON LU' | 'VU';
}

