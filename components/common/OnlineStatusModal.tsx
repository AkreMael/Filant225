import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Headphones, UserCheck, Eye, X } from 'lucide-react';
import { ProviderProfileDetailModal } from './ProviderProfileDetailModal';

export { ProviderProfileDetailModal } from './ProviderProfileDetailModal';

export function isInscriptionOnlineAndActive(item: any): boolean {
  if (!item) return false;
  if (item.isActive === false || item.onlineRefused === true) return false;
  const isOnline = item.isOnline === true || item.onlineApproved === true || item.status === 'Actif';
  if (!isOnline) return false;
  const now = Date.now();
  if (item.onlineEnd && now > Number(item.onlineEnd)) return false;
  return true;
}

export function normalizeSearchString(str: string = ''): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchInscriptionsForTitle(title: string, inscriptions: any[]): any[] {
  const normTitle = normalizeSearchString(title);
  if (!normTitle) return [];

  const stopWords = new Set([
    'a', 'de', 'des', 'du', 'le', 'la', 'les', 'un', 'une', 
    'louer', 'vendre', 'location', 'service', 'evenement', 'd', 'l',
    'pour', 'en', 'ou', 'rapide', 'professionnel', 'professionnelle', 'petit', 'petite'
  ]);

  const targetWords = normTitle
    .split(' ')
    .filter(w => w.length >= 3 && !stopWords.has(w));

  return inscriptions.filter(item => {
    if (!isInscriptionOnlineAndActive(item)) return false;

    const propTypes = Array.isArray(item.propertyTypes)
      ? item.propertyTypes.join(' ')
      : String(item.propertyTypes || '');

    const searchableBlob = [
      item.job,
      item.equipmentType,
      item.equipmentCategory,
      propTypes,
      item.agencyName,
      item.companyName,
      item.companyDomain,
      item.companyServices,
      item.companyPoste,
      item.profession,
      item.metier,
      item.skillsDescription,
      item.equipmentDescription,
      item.description,
      item.agencyDescription,
      item.companySkills,
      item.name,
      item.profileType
    ]
      .filter(Boolean)
      .map(s => normalizeSearchString(String(s)))
      .join(' ');

    // Exact string search
    if (normTitle.length >= 4 && searchableBlob.includes(normTitle)) {
      return true;
    }

    // Keyword match
    if (targetWords.length > 0) {
      const matchCount = targetWords.filter(word => searchableBlob.includes(word)).length;
      if (matchCount > 0) {
        return true;
      }
    }

    return false;
  });
}

export function isUserRegistrationOnline(user: any, inscriptions: any[], userInscriptionData?: any): boolean {
  if (userInscriptionData && isInscriptionOnlineAndActive(userInscriptionData)) {
    return true;
  }
  if (!user?.phone) return false;
  const cleanPhone = user.phone.replace(/\D/g, '');
  if (!cleanPhone) return false;

  const found = inscriptions.find(item => {
    const itemPhone = String(item.phone || item.id || '').replace(/\D/g, '');
    const isPhoneMatch = (itemPhone && (itemPhone.includes(cleanPhone) || cleanPhone.includes(itemPhone)));
    const isIdMatch = user.id && (item.userId === user.id || item.id === user.id);
    return isPhoneMatch || isIdMatch;
  });

  return found ? isInscriptionOnlineAndActive(found) : false;
}

// --- MODAL 1: ALREADY REGISTERED AND ONLINE ---
interface AlreadyRegisteredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewProfile: () => void;
}

export const AlreadyRegisteredModal: React.FC<AlreadyRegisteredModalProps> = ({
  isOpen,
  onClose,
  onViewProfile
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 border-emerald-500 flex flex-col items-center text-center relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-inner">
          <UserCheck className="w-9 h-9" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Profil en ligne
        </div>

        <h3 className="text-lg font-black text-gray-900 mb-2">
          Inscription terminée
        </h3>

        <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6">
          Vous avez déjà terminé votre inscription, votre profil est déjà en ligne.
        </p>

        <div className="w-full flex flex-col gap-2.5">
          <button
            onClick={() => {
              onClose();
              onViewProfile();
            }}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Voir mon profil</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 active:scale-98 text-gray-700 rounded-2xl font-bold text-xs transition-all"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

// Helpers to extract provider information cleanly
export function getProviderName(item: any): string {
  if (!item) return 'Prestataire';
  return item.name || item.fullName || item.agencyName || item.companyName || item.userName || 'Prestataire';
}

export function getProviderMetier(item: any, fallbackTitle?: string): string {
  if (!item) return fallbackTitle || 'Prestataire';
  const propTypes = Array.isArray(item.propertyTypes)
    ? item.propertyTypes.join(', ')
    : item.propertyTypes;
  return item.job || item.metier || item.profession || item.equipmentType || item.titleOrActivity || propTypes || item.companyPoste || item.companyDomain || item.profileType || fallbackTitle || 'Prestataire';
}

export function getProviderCity(item: any): string {
  if (!item) return 'Non spécifiée';
  return item.city || item.commune || item.location || item.address || item.zone || 'Non spécifiée';
}

export function getProviderAmount(item: any): string {
  if (!item) return 'contrat';

  // Check if Contract was explicitly selected
  const isContractPeriod = item.salaryPeriod === 'Contrat' || 
    item.paymentFrequency === 'Contrat' || 
    item.remunerationType === 'Contrat' || 
    item.salaryType === 'Contrat' || 
    item.contractType === 'Contrat' ||
    String(item.desiredSalary || '').trim().toLowerCase() === 'contrat' ||
    String(item.salaryAmount || '').trim().toLowerCase() === 'contrat' ||
    String(item.salary || '').trim().toLowerCase() === 'contrat';

  if (isContractPeriod) {
    return 'contrat';
  }

  const rawVal = item.desiredSalary ?? item.salaryAmount ?? item.salary ?? item.proposedSalary ?? item.rentalPrice ?? item.price ?? item.montant ?? item.dailyRate ?? item.monthlyRate ?? '';
  
  if (typeof rawVal === 'string' && rawVal.trim().toLowerCase() === 'contrat') {
    return 'contrat';
  }

  if (rawVal !== undefined && rawVal !== null && String(rawVal).trim() !== '') {
    const rawStr = String(rawVal).trim();
    const cleanNum = rawStr.replace(/[^\d]/g, '');
    if (cleanNum && !isNaN(Number(cleanNum)) && Number(cleanNum) > 0) {
      const formatted = Number(cleanNum).toLocaleString('fr-FR').replace(/\s/g, ' ') + ' CFA';
      if (item.salaryPeriod && item.salaryPeriod !== 'Contrat') {
        const periodClean = String(item.salaryPeriod).trim();
        return `${formatted} -${periodClean}`;
      }
      return formatted;
    }
    return rawStr;
  }

  return 'contrat';
}

// Fallback avatar image matching the screenshot (woman in yellow shirt)
export const DEFAULT_PROVIDER_AVATAR = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop";

// --- MODAL 2: PROVIDER SEARCH AVAILABILITY ---
interface ProviderAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  providers: any[];
  foundCount?: number;
  onOpenServiceClient: (selectedProvider?: any) => void;
}

export const ProviderAvailabilityModal: React.FC<ProviderAvailabilityModalProps> = ({
  isOpen,
  onClose,
  title,
  providers = [],
  foundCount,
  onOpenServiceClient
}) => {
  const [selectedProviderForDetail, setSelectedProviderForDetail] = useState<any | null>(null);

  if (!isOpen) return null;

  const actualList = providers && providers.length > 0 ? providers : [];
  const count = typeof foundCount === 'number' ? foundCount : actualList.length;
  const hasProvider = count > 0;

  // If viewing detailed profile
  if (selectedProviderForDetail) {
    return (
      <ProviderProfileDetailModal
        isOpen={true}
        onClose={() => setSelectedProviderForDetail(null)}
        provider={selectedProviderForDetail}
        fallbackTitle={title}
        onContinueToForm={() => {
          setSelectedProviderForDetail(null);
          onClose();
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10 cursor-pointer"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header (Exact Mockup Match) */}
        <div className="pt-6 pb-4 px-4 flex flex-col items-center text-center">
          {hasProvider ? (
            <>
              {/* Checkmark Icon in Light Green Rounded Square */}
              <div className="w-14 h-14 rounded-2xl bg-[#dcfce7] text-[#16a34a] flex items-center justify-center mb-3 shadow-sm">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              {/* Pill Count */}
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#f0fdf4] text-[#15803d] text-xs font-black uppercase tracking-wider mb-2 border border-[#bbf7d0]">
                <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span>
                {count === 1 ? '1 PRESTATAIRE TROUVÉ' : `${count} PRESTATAIRES TROUVÉS`}
              </div>

              {/* Main Title */}
              <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">
                Prestataire{count > 1 ? 's' : ''} disponible{count > 1 ? 's' : ''} en ligne
              </h3>

              {/* Subtitle in orange */}
              <p className="text-xs sm:text-sm font-bold text-orange-600 mt-0.5">
                « {title} »
              </p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3 shadow-sm">
                <AlertCircle className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-wider mb-2 border border-orange-200">
                Non disponible en direct
              </div>

              <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-tight">
                Aucun prestataire disponible
              </h3>

              <p className="text-xs sm:text-sm font-bold text-gray-700 mt-0.5">
                « {title} »
              </p>
            </>
          )}
        </div>

        {/* Body Content / Cards */}
        {hasProvider ? (
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 max-h-[58vh]">
            {actualList.map((item, index) => {
              const name = getProviderName(item);
              const metier = getProviderMetier(item, title);
              const city = getProviderCity(item);
              const amount = getProviderAmount(item);
              const avatarUrl = item.profileImageUrl || item.imageLink || item.photo || item.avatar || DEFAULT_PROVIDER_AVATAR;

              return (
                <div 
                  key={item.id || index}
                  onClick={() => {
                    setSelectedProviderForDetail(item);
                  }}
                  className="bg-[#06532d] hover:bg-[#054626] active:scale-[0.99] rounded-[20px] p-3.5 sm:p-4 text-white flex items-center gap-3.5 shadow-md cursor-pointer transition-all border border-emerald-700/40"
                  role="button"
                  tabIndex={0}
                >
                  {/* Avatar circular */}
                  <img 
                    src={avatarUrl} 
                    alt={name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm shrink-0 bg-white/10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_PROVIDER_AVATAR;
                    }}
                  />

                  {/* Content details: 3 lines */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    {/* Line 1: MIMI (cuisinière) */}
                    <div className="text-base sm:text-lg font-black text-white leading-tight truncate">
                      {name} <span className="font-bold text-white/90 lowercase">({metier})</span>
                    </div>

                    {/* Line 2: VILLE: grand Bassam */}
                    <div className="text-xs font-semibold text-white/90 mt-1 leading-tight truncate">
                      VILLE: <span className="font-normal text-white">{city}</span>
                    </div>

                    {/* Line 3: Montant proposé : 250 000 CFA -Mois / contrat */}
                    <div className="text-xs font-semibold text-white/90 mt-0.5 leading-tight truncate">
                      Montant proposé : <span className={`font-black text-white ${amount.toLowerCase() === 'contrat' ? 'font-extrabold' : ''}`}>{amount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-6 py-4 text-center">
            <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
              Aucun prestataire correspondant n'est actuellement disponible en ligne. Vous pouvez néanmoins soumettre votre besoin au Service client.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenServiceClient();
              }}
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 active:scale-98 text-white rounded-2xl font-black text-sm shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Headphones className="w-4 h-4" />
              <span>Service client</span>
            </button>
          </div>
        )}

        {/* Footer Close */}
        <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-gray-200 hover:bg-gray-300 active:scale-98 text-gray-700 rounded-xl font-bold text-xs transition-all cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
