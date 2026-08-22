import React from 'react';
import { CheckCircle2, AlertCircle, Headphones, UserCheck, Eye, X } from 'lucide-react';

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
  if (!item) return 'Contrat';

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
    return 'Contrat';
  }

  const rawVal = item.desiredSalary ?? item.salaryAmount ?? item.salary ?? item.proposedSalary ?? item.rentalPrice ?? item.price ?? item.montant ?? item.dailyRate ?? item.monthlyRate ?? '';
  
  if (typeof rawVal === 'string' && rawVal.trim().toLowerCase() === 'contrat') {
    return 'Contrat';
  }

  if (rawVal !== undefined && rawVal !== null && String(rawVal).trim() !== '') {
    const rawStr = String(rawVal).trim();
    const cleanNum = rawStr.replace(/[^\d]/g, '');
    if (cleanNum && !isNaN(Number(cleanNum)) && Number(cleanNum) > 0) {
      const formatted = Number(cleanNum).toLocaleString('fr-FR') + ' FCFA';
      if (item.salaryPeriod && item.salaryPeriod !== 'Contrat' && !rawStr.toLowerCase().includes(item.salaryPeriod.toLowerCase())) {
        return `${formatted} / ${item.salaryPeriod}`;
      }
      return formatted;
    }
    return rawStr;
  }

  return 'Contrat';
}

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
  if (!isOpen) return null;

  const actualList = providers && providers.length > 0 ? providers : [];
  const count = typeof foundCount === 'number' ? foundCount : actualList.length;
  const hasProvider = count > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`bg-white rounded-3xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl border-2 ${hasProvider ? 'border-emerald-500' : 'border-orange-500'} relative animate-in zoom-in-95 duration-200 overflow-hidden`}>
        {/* Header */}
        <div className="p-5 pb-3 flex flex-col items-center text-center border-b border-gray-100 relative bg-slate-50/50">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-200 transition-colors"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {hasProvider ? (
            <>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2.5 shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider mb-1.5 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {count === 1 ? '1 Prestataire trouvé' : `${count} Prestataires trouvés`}
              </div>

              <h3 className="text-base sm:text-lg font-black text-gray-900 leading-tight">
                Prestataire{count > 1 ? 's' : ''} disponible{count > 1 ? 's' : ''} en ligne
              </h3>

              <p className="text-xs font-extrabold text-orange-600 mt-0.5">
                « {title} »
              </p>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2.5 shadow-inner">
                <AlertCircle className="w-8 h-8" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-wider mb-1.5 border border-orange-200">
                Non disponible en direct
              </div>

              <h3 className="text-base sm:text-lg font-black text-gray-900 leading-tight">
                Aucun prestataire disponible
              </h3>

              <p className="text-xs font-extrabold text-gray-700 mt-0.5">
                « {title} »
              </p>
            </>
          )}
        </div>

        {/* Body Content */}
        {hasProvider ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[55vh]">
            <p className="text-xs text-gray-500 font-bold px-1 text-center">
              Sélectionnez un prestataire pour lui adresser votre demande via le Service client :
            </p>

            {actualList.map((item, index) => {
              const name = getProviderName(item);
              const metier = getProviderMetier(item, title);
              const city = getProviderCity(item);
              const amount = getProviderAmount(item);

              return (
                <div 
                  key={item.id || index}
                  className="bg-white border-2 border-emerald-500/20 hover:border-emerald-500 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 text-left"
                >
                  {/* Item Index + Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      Prestataire #{index + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      En ligne
                    </span>
                  </div>

                  {/* 1. Nom du prestataire */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-gray-500 shrink-0">Nom du prestataire :</span>
                    <span className="text-xs font-black text-gray-900 uppercase text-right truncate" title={name}>
                      {name}
                    </span>
                  </div>

                  {/* 2. Type / métier */}
                  <div className="flex items-center justify-between gap-2 py-1 border-t border-gray-100">
                    <span className="text-xs font-bold text-gray-500 shrink-0">Type / métier :</span>
                    <span className="text-xs font-black text-emerald-700 uppercase text-right truncate" title={metier}>
                      {metier}
                    </span>
                  </div>

                  {/* 3. Ville */}
                  <div className="flex items-center justify-between gap-2 py-1 border-t border-gray-100">
                    <span className="text-xs font-bold text-gray-500 shrink-0">Ville :</span>
                    <span className="text-xs font-black text-gray-900 uppercase text-right truncate" title={city}>
                      {city}
                    </span>
                  </div>

                  {/* 4. Montant proposé */}
                  <div className="flex items-center justify-between gap-2 py-1 border-t border-gray-100">
                    <span className="text-xs font-bold text-gray-500 shrink-0">Montant proposé :</span>
                    <span className="text-xs font-black text-orange-600 uppercase text-right">
                      {amount}
                    </span>
                  </div>

                  {/* Bouton de contact */}
                  <button
                    onClick={() => {
                      onClose();
                      onOpenServiceClient(item);
                    }}
                    className="w-full mt-1 py-2.5 px-3 bg-orange-500 hover:bg-orange-600 active:scale-98 text-white rounded-xl font-black text-xs shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Headphones className="w-4 h-4" />
                    <span>Choisir ce prestataire</span>
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
              Aucun prestataire correspondant n'est actuellement disponible en ligne. Vous pouvez néanmoins soumettre votre besoin au Service client.
            </p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/70 flex flex-col gap-2">
          {hasProvider && (
            <button
              onClick={() => {
                onClose();
                onOpenServiceClient();
              }}
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 active:scale-98 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Headphones className="w-4 h-4" />
              <span>Service client (Demande générale)</span>
            </button>
          )}

          {!hasProvider && (
            <button
              onClick={() => {
                onClose();
                onOpenServiceClient();
              }}
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 active:scale-98 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Headphones className="w-4 h-4" />
              <span>Service client</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-gray-200 hover:bg-gray-300 active:scale-98 text-gray-700 rounded-2xl font-bold text-xs transition-all cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
