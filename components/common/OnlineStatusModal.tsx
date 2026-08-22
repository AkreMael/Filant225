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

// --- MODAL 2: PROVIDER SEARCH AVAILABILITY ---
interface ProviderAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  foundCount: number;
  onOpenServiceClient: () => void;
}

export const ProviderAvailabilityModal: React.FC<ProviderAvailabilityModalProps> = ({
  isOpen,
  onClose,
  title,
  foundCount,
  onOpenServiceClient
}) => {
  if (!isOpen) return null;

  const hasProvider = foundCount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 ${hasProvider ? 'border-emerald-500' : 'border-orange-500'} flex flex-col items-center text-center relative animate-in zoom-in-95 duration-200`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {hasProvider ? (
          <>
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {foundCount === 1 ? 'Prestataire trouvé' : `${foundCount} Prestataires trouvés`}
            </div>

            <h3 className="text-lg font-black text-gray-900 mb-1">
              Prestataire trouvé
            </h3>

            <p className="text-xs font-extrabold text-orange-600 mb-2">
              « {title} »
            </p>

            <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6">
              Cliquez sur Service client pour soumettre votre demande.
            </p>

            <div className="w-full flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenServiceClient();
                }}
                className="w-full py-3.5 px-4 bg-orange-500 hover:bg-orange-600 active:scale-98 text-white rounded-2xl font-black text-sm shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Headphones className="w-5 h-5" />
                <span>Service client</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 active:scale-98 text-gray-700 rounded-2xl font-bold text-xs transition-all"
              >
                Fermer
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4 shadow-inner">
              <AlertCircle className="w-9 h-9" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-wider mb-2 border border-orange-200">
              Non disponible en direct
            </div>

            <h3 className="text-lg font-black text-gray-900 mb-1">
              Aucun prestataire disponible
            </h3>

            <p className="text-xs font-extrabold text-gray-700 mb-2">
              « {title} »
            </p>

            <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6">
              Aucun prestataire correspondant n'est actuellement disponible en ligne. Vous pouvez néanmoins soumettre votre besoin au Service client.
            </p>

            <div className="w-full flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenServiceClient();
                }}
                className="w-full py-3.5 px-4 bg-orange-500 hover:bg-orange-600 active:scale-98 text-white rounded-2xl font-black text-sm shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Headphones className="w-5 h-5" />
                <span>Service client</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 active:scale-98 text-gray-700 rounded-2xl font-bold text-xs transition-all"
              >
                Fermer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
