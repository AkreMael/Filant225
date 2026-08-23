import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Clock, 
  Coins, 
  CheckCircle2, 
  GraduationCap, 
  Truck,
  Building,
  User,
  ShieldCheck,
  Phone,
  Tag
} from 'lucide-react';
import { 
  getProviderName, 
  getProviderMetier, 
  getProviderCity, 
  getProviderAmount,
  DEFAULT_PROVIDER_AVATAR 
} from './OnlineStatusModal';

interface ProviderProfileDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: any;
  fallbackTitle?: string;
  onContinueToForm: (provider: any) => void;
  currentUserPhone?: string;
  onOpenOnlineForm?: () => void;
}

export const ProviderProfileDetailModal: React.FC<ProviderProfileDetailModalProps> = ({
  isOpen,
  onClose,
  provider,
  fallbackTitle,
  onContinueToForm,
  currentUserPhone,
  onOpenOnlineForm
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!isOpen || !provider) return null;

  // Extract photos
  const rawPhotos: string[] = [];
  if (Array.isArray(provider.photos) && provider.photos.length > 0) {
    provider.photos.forEach((p: any) => {
      if (typeof p === 'string' && p.trim()) rawPhotos.push(p.trim());
    });
  }
  if (Array.isArray(provider.onlineImages) && provider.onlineImages.length > 0) {
    provider.onlineImages.forEach((p: any) => {
      if (typeof p === 'string' && p.trim()) rawPhotos.push(p.trim());
    });
  }
  if (Array.isArray(provider.images) && provider.images.length > 0) {
    provider.images.forEach((p: any) => {
      if (typeof p === 'string' && p.trim()) rawPhotos.push(p.trim());
    });
  }
  if (provider.profileImageUrl && typeof provider.profileImageUrl === 'string') {
    rawPhotos.push(provider.profileImageUrl);
  }
  if (provider.imageLink && typeof provider.imageLink === 'string') {
    rawPhotos.push(provider.imageLink);
  }
  if (provider.photo && typeof provider.photo === 'string') {
    rawPhotos.push(provider.photo);
  }
  if (provider.avatar && typeof provider.avatar === 'string') {
    rawPhotos.push(provider.avatar);
  }

  // Deduplicate and fallback
  const photos = Array.from(new Set(rawPhotos.filter(Boolean)));
  const displayPhotos = photos.length > 0 ? photos : [DEFAULT_PROVIDER_AVATAR];

  // Helper getters
  const name = getProviderName(provider);
  const metier = getProviderMetier(provider, fallbackTitle);
  const city = getProviderCity(provider);
  const amount = getProviderAmount(provider);

  // Profile type badge
  const profileType = provider.profileType || 
    (provider.job ? 'TRAVAILLEUR' : 
     provider.equipmentType ? 'LOCATION' : 
     provider.agencyName ? 'AGENCE' : 
     provider.companyName ? 'ENTREPRISE' : 'TRAVAILLEUR');

  // Description
  const description = provider.skillsDescription || 
    provider.description || 
    provider.equipmentDescription || 
    provider.agencyDescription || 
    provider.companyServices || 
    provider.companySkills || 
    `Je suis ${metier.toLowerCase()}, veuillez me contacter pour mes services.`;

  // Additional details
  const availability = provider.availability || 'TOUJOURS DISPONIBLE';
  const experienceOrDiploma = provider.learnedFrom || provider.experience || provider.diplome || provider.diploma || '';
  const movementZone = provider.movementZone || provider.agencyZone || provider.zone || provider.city || '';
  const contractType = provider.companyContractType || provider.contractType || provider.salaryPeriod || '';

  // Check if own card
  const cleanPhone = (p?: string) => (p || '').replace(/\D/g, '');
  const isOwnCard = currentUserPhone && provider.phone && cleanPhone(currentUserPhone) === cleanPhone(provider.phone);
  const isOnline = provider.status === 'Code QR Actif' || provider.isOnline === true || provider.enLigne === true;

  const now = Date.now();
  const isDeactivated = provider.isActive === false || provider.visibilityStatus === 'desactive';
  const isExpired = !isDeactivated && (
    (provider.onlineEnd && typeof provider.onlineEnd === 'number' && provider.onlineEnd < now) ||
    (provider.expiryDate && new Date(provider.expiryDate).getTime() < now) ||
    provider.status === 'Expiré' ||
    provider.visibilityStatus === 'expire'
  );

  const handleActivateQR = () => {
    window.dispatchEvent(new CustomEvent('trigger-payment-view', {
      detail: {
        title: "Activation Code QR",
        amount: "7100",
        waveLink: "https://pay.wave.com/m/M_ci_jwxwatdcoKS8/c/ci/?amount=7100",
        paymentType: "Activation"
      }
    }));
  };

  const handleRenewOnline = () => {
    window.dispatchEvent(new CustomEvent('trigger-payment-view', {
      detail: {
        title: "Renouvellement mise en ligne",
        amount: "210",
        waveLink: "https://pay.wave.com/m/M_ci_jwxwatdcoKS8/c/ci/?amount=210",
        paymentType: "Renouvellement de profil"
      }
    }));
  };

  // Navigation handlers
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : displayPhotos.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < displayPhotos.length - 1 ? prev + 1 : 0));
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Découvrez le profil de ${name} (${metier}) à ${city} sur Filant°225 !`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name} - ${metier}`,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or failed
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2500);
      } catch (e) {
        // clipboard not available
      }
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleServiceDemandClick = () => {
    onClose();
    // Dispatch cross-navigation event so user always lands on the location map with "Veuillez cliquer ici pour soumettre votre demande"
    window.dispatchEvent(new CustomEvent('go-to-demande-recherche', {
      detail: { targetProfile: provider }
    }));
    if (onContinueToForm) {
      onContinueToForm(provider);
    }
  };

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/75 backdrop-blur-md animate-in fade-in duration-200 p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md h-full sm:h-auto sm:max-h-[92vh] sm:rounded-[36px] shadow-2xl flex flex-col relative overflow-hidden animate-in zoom-in-95 duration-200 text-left">
        
        {/* Copy confirmation toast */}
        {copiedNotification && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-gray-700 animate-in fade-in">
            Lien du profil copié !
          </div>
        )}

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
          
          {/* 1. TOP IMAGE CAROUSEL (Pixel-perfect match with screenshot) */}
          <div className="relative w-full h-[360px] sm:h-[380px] bg-slate-900 select-none">
            
            {/* Image */}
            <img 
              src={displayPhotos[currentImageIndex] || DEFAULT_PROVIDER_AVATAR} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_PROVIDER_AVATAR;
              }}
              referrerPolicy="no-referrer"
            />

            {/* Dark overlay gradients for top/bottom readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none" />

            {/* Top Bar: Back, Favorite, Share */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
              {/* Back Button */}
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-white/10"
                title="Retour"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>

              {/* Action Buttons Right */}
              <div className="flex items-center gap-2.5">
                {/* Heart Button */}
                <button 
                  onClick={handleToggleFavorite}
                  className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-white/10"
                  title="Ajouter aux favoris"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>

                {/* Share Button (Green matching screenshot) */}
                <button 
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white flex items-center justify-center transition-all shadow-md cursor-pointer active:scale-95 border border-white/20"
                  title="Partager le profil"
                >
                  <Share2 className="w-5 h-5 stroke-[2.2]" />
                </button>
              </div>
            </div>

            {/* Left & Right Chevron Arrows on Image */}
            {displayPhotos.length > 1 && (
              <>
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 flex items-center justify-center transition-all z-20 cursor-pointer active:scale-90"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
                <button 
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 flex items-center justify-center transition-all z-20 cursor-pointer active:scale-90"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </>
            )}

            {/* Bottom-left Photo Counter Badge (e.g. 1 / 2) */}
            <div className="absolute bottom-6 left-4 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-full tracking-wider">
              {currentImageIndex + 1} / {displayPhotos.length}
            </div>

            {/* Bottom-right Dots Indicator */}
            {displayPhotos.length > 1 && (
              <div className="absolute bottom-6 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full">
                {displayPhotos.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-[#f97316] w-3' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 2. BODY CARD (Overlapping rounded white container) */}
          <div className="bg-white rounded-t-[32px] -mt-5 relative z-30 px-5 pt-5 pb-6 space-y-4">
            
            {/* DEACTIVATED OR EXPIRED BANNER AT THE TOP OF PROFILE */}
            {isDeactivated ? (
              <div className="bg-red-50/90 border-2 border-red-200 rounded-3xl p-5 text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                  <Clock className="w-6 h-6 text-red-600 stroke-[2.5]" />
                </div>
                <p className="text-xs sm:text-sm font-black text-red-900 leading-relaxed">
                  Votre première mise en relation gratuite est atteinte. Veuillez activer votre code QR pour être mis en relation avec les clients. Votre profil est actuellement désactivé. Veuillez activer votre code QR pour continuer à être mis en relation avec les clients.
                </p>
                <button
                  type="button"
                  onClick={handleActivateQR}
                  className="w-full py-4 px-4 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-500"
                >
                  <span>Cliquez ici</span>
                </button>
              </div>
            ) : isExpired ? (
              <div className="bg-amber-50/90 border-2 border-amber-200 rounded-3xl p-5 text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                  <Clock className="w-6 h-6 text-amber-600 stroke-[2.5]" />
                </div>
                <p className="text-xs sm:text-sm font-black text-amber-900 leading-relaxed">
                  La date d’expiration de votre mise en ligne est arrivée. Veuillez effectuer à nouveau le paiement de 210 FCFA pour renouveler votre mise en ligne pendant un mois.
                </p>
                <button
                  type="button"
                  onClick={handleRenewOnline}
                  className="w-full py-4 px-4 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer border border-orange-500"
                >
                  <span>Renouveler maintenant</span>
                </button>
              </div>
            ) : null}

            {/* Pill Type Badge */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#fff7ed] text-[#ea580c] text-[11px] font-black uppercase tracking-wider border border-orange-200/70">
                {profileType}
              </span>
            </div>

            {/* Metier / Title & Name */}
            <div>
              <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-tight">
                {metier}
              </h1>
              <p className="text-sm font-extrabold text-slate-600 uppercase tracking-wider mt-1">
                {name}
              </p>
            </div>

            {/* LOCALISATION DU PRESTATAIRE BOX */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#f3e8ff] text-[#9333ea] flex items-center justify-center shrink-0 shadow-inner">
                <MapPin className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  LOCALISATION DU PRESTATAIRE
                </span>
                <span className="block text-sm font-black text-slate-900 uppercase truncate">
                  {city.toUpperCase()}, CÔTE D'IVOIRE
                </span>
              </div>
            </div>

            {/* If NOT deactivated, show full details and descriptions */}
            {!isDeactivated && (
              <>
                {/* DESCRIPTION DES SERVICES BOX */}
                <div>
                  <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                    DESCRIPTION DES SERVICES
                  </h2>
                  <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-4 text-sm font-medium text-slate-700 leading-relaxed shadow-sm">
                    <p className="whitespace-pre-line">{description}</p>
                  </div>
                </div>

                {/* INFORMATIONS COMPLÉMENTAIRES / SALAIRE / DISPONIBILITÉ */}
                <div className="flex flex-col gap-3 pt-1">
                  
                  {/* Montant / Rémunération */}
                  <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        MONTANT PROPOSÉ
                      </span>
                      <span className="block text-xs font-black text-orange-600 uppercase truncate">
                        {amount}
                      </span>
                    </div>
                  </div>

                  {/* Disponibilité */}
                  <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        DISPONIBILITÉ
                      </span>
                      <span className="block text-xs font-black text-emerald-700 uppercase truncate">
                        {availability}
                      </span>
                    </div>
                  </div>

                  {/* Zone de déplacement */}
                  <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        ZONE DE DÉPLACEMENT
                      </span>
                      <span className="block text-xs font-black text-slate-900 uppercase truncate">
                        {movementZone.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Formation / Apprentissage si renseigné */}
                  {experienceOrDiploma && (
                    <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          FORMATION PROFESSIONNELLE
                        </span>
                        <span className="block text-xs font-black text-slate-900 uppercase truncate">
                          {experienceOrDiploma.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Type de contrat si renseigné */}
                  {contractType && (
                    <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          TYPE DE CONTRAT
                        </span>
                        <span className="block text-xs font-black text-slate-900 uppercase truncate">
                          {contractType.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}

                </div>
              </>
            )}

          </div>
        </div>

        {/* 3. FIXED BOTTOM BAR */}
        <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md p-4 border-t border-slate-100 shadow-2xl z-40">
          {isDeactivated ? (
            <button
              type="button"
              onClick={handleActivateQR}
              className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white rounded-2xl font-black text-sm tracking-wider uppercase shadow-lg shadow-red-600/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer border border-red-400/30"
            >
              <span>Cliquez ici</span>
            </button>
          ) : isExpired ? (
            <button
              type="button"
              onClick={handleRenewOnline}
              className="w-full py-4 px-6 bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white rounded-2xl font-black text-sm tracking-wider uppercase shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer border border-orange-400/30"
            >
              <span>Renouveler maintenant</span>
            </button>
          ) : isOwnCard ? (
            isOnline ? (
              <button
                type="button"
                onClick={handleServiceDemandClick}
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-2xl font-black text-sm tracking-wider uppercase shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer border border-emerald-400/30"
              >
                <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping shrink-0" />
                <span>PROFIL EN LIGNE</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenOnlineForm) onOpenOnlineForm();
                }}
                className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white rounded-2xl font-black text-sm tracking-wider uppercase shadow-lg shadow-red-600/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer border border-red-400/30"
              >
                <span className="w-2.5 h-2.5 bg-white rounded-full shrink-0 animate-pulse" />
                <span>SE REMETTRE EN LIGNE</span>
              </button>
            )
          ) : (
            <button
              onClick={handleServiceDemandClick}
              className="w-full py-4 px-6 bg-[#f95700] hover:bg-[#ea4e00] active:scale-[0.98] text-white rounded-2xl font-black text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2.5 transition-all cursor-pointer border border-orange-400/30"
            >
              <MapPin className="w-5 h-5 stroke-[2.5]" />
              <span>DEMANDE DE SERVICE</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
