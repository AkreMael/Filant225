
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CityAutocompleteInput from './common/CityAutocompleteInput';
import SuggestiveAutocompleteInput, { JOB_SUGGESTIONS, EQUIPMENT_SUGGESTIONS } from './common/SuggestiveAutocompleteInput';
import { 
  generateWorkerDescription, 
  generateEquipmentDescription, 
  generateAgencyDescription, 
  generateCompanyDescription 
} from './common/autoDescriptions';
import { 
  ChevronRight, 
  ChevronDown,
  Check, 
  User, 
  HardHat, 
  Home, 
  Building2,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Camera,
  Upload,
  X,
  Sparkles,
  Lock
} from 'lucide-react';
import { databaseService } from '../services/databaseService';
import { imageService } from '../services/imageService';
import WhatsAppPaymentSupportButton from './WhatsAppPaymentSupportButton';

interface SmartRegistrationScreenProps {
  onComplete: () => void;
  onBack: () => void;
  currentUser?: any;
  initialProfile?: ProfileType;
  initialStep?: number;
  initialTitle?: string;
  onShowPopup?: (
    message: string, 
    type: 'alert' | 'confirm', 
    onConfirm?: (close: () => void, setLoading: (l: boolean) => void) => void,
    confirmLabel?: string,
    cancelLabel?: string,
    title?: string
  ) => void;
  onGoToMenu?: () => void;
  onRegisterBackHandler?: (handler: (() => boolean) | null) => void;
}

type ProfileType = 'Travailleur' | 'Propriétaire' | 'Agence' | 'Entreprise';

const SmartRegistrationScreen: React.FC<SmartRegistrationScreenProps> = ({ 
  onComplete, 
  onBack, 
  currentUser,
  initialProfile,
  initialStep,
  initialTitle,
  onShowPopup,
  onGoToMenu,
  onRegisterBackHandler
}) => {
  const [step, setStep] = useState(initialStep || (initialProfile ? 2 : 1));
  const [selectedProfile, setSelectedProfile] = useState<ProfileType>(initialProfile || 'Travailleur');
  
  const initJob = (initialProfile === 'Travailleur' && initialTitle) ? initialTitle : '';
  const initEquip = (initialProfile === 'Propriétaire' && initialTitle) ? initialTitle : '';
  const initProp = (initialProfile === 'Agence' && initialTitle) ? initialTitle : '';
  const initPoste = (initialProfile === 'Entreprise' && initialTitle) ? initialTitle : '';

  const [formData, setFormData] = useState({ 
    name: currentUser?.name || '', 
    city: currentUser?.city || '', 
    phone: currentUser?.phone || '',
    profileImageUrl: currentUser?.profileImageUrl || '',
    photos: [] as string[],
    // Travailleur
    job: initJob,
    learnedFrom: '' as 'Sur le tas' | 'Formation professionnelle' | 'Diplôme' | '',
    availability: '',
    movementZone: '',
    skillsDescription: initJob ? generateWorkerDescription(initJob) : '',
    paymentFrequency: '' as 'Semaine' | 'Mois' | 'Jour' | 'Contrat' | '',
    salaryAmount: '',
    salary: '',
    // Propriétaire
    equipmentType: initEquip,
    equipmentCategory: '',
    quantity: '',
    equipmentCity: '',
    rentalPrice: '',
    equipmentDescription: initEquip ? generateEquipmentDescription(initEquip) : '',
    // Agence
    agencyName: '',
    agencyCity: '',
    agencyPhone: '',
    propertyTypes: initProp,
    agencyZone: '',
    agencyDescription: initProp ? generateAgencyDescription(initProp) : '',
    // Entreprise
    companyName: '',
    companyCity: '',
    companyPhone: '',
    companyDomain: '',
    companyServices: '',
    proposedSalary: '',
    companyOwner: '',
    companyPoste: initPoste,
    companyWorkersCount: '',
    companyContractType: '',
    companySalary: '',
    companyHours: '',
    companySkills: initPoste ? generateCompanyDescription(initPoste) : '',
  });

  useEffect(() => {
    if (initialProfile) {
      setSelectedProfile(initialProfile);
      setStep(initialStep || 2);
    }
    if (initialTitle) {
      if (initialProfile === 'Travailleur') {
        setFormData(prev => ({
          ...prev,
          job: initialTitle,
          skillsDescription: generateWorkerDescription(initialTitle)
        }));
      } else if (initialProfile === 'Propriétaire') {
        setFormData(prev => ({
          ...prev,
          equipmentType: initialTitle,
          equipmentDescription: generateEquipmentDescription(initialTitle)
        }));
      } else if (initialProfile === 'Agence') {
        setFormData(prev => ({
          ...prev,
          propertyTypes: initialTitle,
          agencyDescription: generateAgencyDescription(initialTitle)
        }));
      } else if (initialProfile === 'Entreprise') {
        setFormData(prev => ({
          ...prev,
          companyPoste: initialTitle,
          companySkills: generateCompanyDescription(initialTitle)
        }));
      }
    }
  }, [initialProfile, initialTitle, initialStep]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCompressingPhotos, setIsCompressingPhotos] = useState(false);

  const handlePhotosSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentPhotos = formData.photos || [];
    if (currentPhotos.length >= 3) {
      alert("Vous pouvez ajouter jusqu'à 3 photos maximum.");
      return;
    }

    const remainingSlots = 3 - currentPhotos.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    setIsCompressingPhotos(true);
    const newPhotos: string[] = [];
    
    for (const f of filesToProcess) {
      const file = f as File;
      try {
        const compressed = await imageService.compressImage(file, 800, 0.75);
        newPhotos.push(compressed);
      } catch (err) {
        console.error("Error compressing photo:", err);
        const fallback = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        newPhotos.push(fallback);
      }
    }

    const updatedPhotos = [...currentPhotos, ...newPhotos].slice(0, 3);
    setFormData(prev => ({
      ...prev,
      photos: updatedPhotos,
      profileImageUrl: prev.profileImageUrl || updatedPhotos[0] || ''
    }));
    setIsCompressingPhotos(false);
    e.target.value = '';
  };

  const handleRemovePhoto = (index: number) => {
    setFormData(prev => {
      const updated = (prev.photos || []).filter((_, i) => i !== index);
      return {
        ...prev,
        photos: updated,
        profileImageUrl: updated[0] || ''
      };
    });
  };

  const handleBackWithConfirmation = () => {
    const hasStarted = step > 1 || formData.name !== '' || formData.city !== '' || formData.job !== '' || formData.equipmentType !== '' || formData.agencyName !== '' || formData.companyName !== '';
    if (hasStarted && !isSaved) {
      if (onShowPopup && onGoToMenu) {
        onShowPopup(
          "Les informations non enregistrées seront perdues.",
          "confirm",
          (close) => {
            close();
            // Clear local draft so they can start fresh next time
            localStorage.removeItem('filant_registration_draft');
            onGoToMenu();
          },
          "Quitter",
          "Continuer la saisie",
          "Quitter ce formulaire ?"
        );
      } else {
        const confirmExit = window.confirm("Quitter ce formulaire ? Les informations non enregistrées seront perdues.");
        if (confirmExit) {
          localStorage.removeItem('filant_registration_draft');
          if (onGoToMenu) onGoToMenu(); else onBack();
        }
      }
      return true; // handled
    }
    onBack();
    return true; // handled
  };

  useEffect(() => {
    if (onRegisterBackHandler) {
      onRegisterBackHandler(handleBackWithConfirmation);
      return () => {
        onRegisterBackHandler(null);
      };
    }
  }, [onRegisterBackHandler, step, formData, isSaved, onBack, onGoToMenu, onShowPopup]);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleViewportResize = () => {
      if (window.visualViewport) {
        setIsKeyboardVisible(window.visualViewport.height < window.innerHeight - 150);
      }
    };
    window.visualViewport?.addEventListener('resize', handleViewportResize);
    return () => {
      window.visualViewport?.removeEventListener('resize', handleViewportResize);
    };
  }, []);

  // Persistence logic
  useEffect(() => {
    if (initialProfile) {
      setSelectedProfile(initialProfile);
      setStep(initialStep || 2);
    }
    const saved = localStorage.getItem('filant_registration_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.formData) setFormData(parsed.formData);
        if (!initialProfile && parsed.profile) setSelectedProfile(parsed.profile);
        if (!initialStep && !initialProfile && parsed.step) setStep(parsed.step);
        if (parsed.isSaved !== undefined) setIsSaved(parsed.isSaved);
      } catch (e) {
        console.error("Error loading draft:", e);
      }
    }
  }, [initialProfile, initialStep]);

  useEffect(() => {
    const draft = {
      formData,
      profile: selectedProfile,
      step,
      isSaved,
      updatedAt: new Date().getTime()
    };
    localStorage.setItem('filant_registration_draft', JSON.stringify(draft));
  }, [formData, selectedProfile, step, isSaved]);

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || '',
        city: currentUser.city || '',
        phone: currentUser.phone || ''
      }));
    }
  }, [currentUser]);

  const profiles = [
    {
      id: 'Travailleur',
      label: 'Travailleur',
      icon: <HardHat className="w-8 h-8" />,
      description: 'Prestataire de service indépendant',
      active: true
    },
    {
      id: 'Propriétaire',
      label: 'Propriétaire d’équipement',
      icon: <Briefcase className="w-8 h-8" />,
      description: 'Location de matériel et engins',
      active: true
    },
    {
      id: 'Agence',
      label: 'Agence immobilière',
      icon: <Home className="w-8 h-8" />,
      description: 'Gestion et vente de biens',
      active: true
    },
    {
      id: 'Entreprise',
      label: 'Entreprise',
      icon: <Building2 className="w-8 h-8" />,
      description: 'Sociétés et organisations',
      active: true 
    }
  ];

  const [errors, setErrors] = useState<string[]>([]);

  const getInputClass = (fieldName: string) => {
    const hasError = errors.includes(fieldName);
    return `w-full bg-white border-2 rounded-2xl py-3 px-4 text-black font-semibold text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all ${
      hasError ? 'border-red-500 bg-red-55/30' : 'border-blue-500'
    }`;
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    
    // Base fields (even if fixed, check them)
    if (!formData.name) newErrors.push('name');
    if (!formData.city) newErrors.push('city');
    if (!formData.phone) newErrors.push('phone');

    if (selectedProfile === 'Travailleur') {
      if (!formData.job) newErrors.push('job');
      if (!formData.learnedFrom) newErrors.push('learnedFrom');
      if (!formData.availability) newErrors.push('availability');
      if (!formData.movementZone) newErrors.push('movementZone');
      if (!formData.skillsDescription && !formData.job) newErrors.push('skillsDescription');
      if (!formData.paymentFrequency) newErrors.push('paymentFrequency');
      if (formData.paymentFrequency !== 'Contrat' && !formData.salaryAmount) newErrors.push('salaryAmount');
    } else if (selectedProfile === 'Propriétaire') {
      if (!formData.equipmentType) newErrors.push('equipmentType');
      if (!formData.equipmentCategory) newErrors.push('equipmentCategory');
      if (!formData.quantity) newErrors.push('quantity');
      if (!formData.equipmentCity) newErrors.push('equipmentCity');
      if (!formData.rentalPrice) newErrors.push('rentalPrice');
      if (!formData.equipmentDescription && !formData.equipmentType) newErrors.push('equipmentDescription');
    } else if (selectedProfile === 'Agence') {
      if (!formData.agencyName) newErrors.push('agencyName');
      if (!formData.agencyCity) newErrors.push('agencyCity');
      if (!formData.agencyPhone) newErrors.push('agencyPhone');
      if (!formData.propertyTypes) newErrors.push('propertyTypes');
      if (!formData.agencyZone) newErrors.push('agencyZone');
    } else if (selectedProfile === 'Entreprise') {
      if (!formData.companyName) newErrors.push('companyName');
      if (!formData.companyCity) newErrors.push('companyCity');
      if (!formData.companyPhone) newErrors.push('companyPhone');
      if (!formData.companyOwner) newErrors.push('companyOwner');
      if (!formData.companyPoste) newErrors.push('companyPoste');
      if (!formData.companyWorkersCount) newErrors.push('companyWorkersCount');
      if (!formData.companyContractType) newErrors.push('companyContractType');
      if (!formData.companySalary) newErrors.push('companySalary');
      if (!formData.companyHours) newErrors.push('companyHours');
      if (!formData.companySkills && !formData.companyPoste && !formData.companyName) newErrors.push('companySkills');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
        const firstErrorField = document.querySelector('.border-red-500');
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert("Veuillez remplir tous les champs obligatoires (indiqués par une étoile).");
        }
        return;
    }

    setIsSubmitting(true);
    
    // Safety timer to prevent stuck loading state (20s)
    const safetyTimer = setTimeout(() => {
        setIsSubmitting(false);
        // We don't alert here to avoid double alerts if it eventually finishes or fails
        console.warn("Submission is taking longer than expected...");
    }, 20000);

    try {
        const rawPhotos = formData.photos || [];
        const firstPhoto = rawPhotos.length > 0 ? rawPhotos[0] : '';
        let currentProfileImageUrl = firstPhoto || formData.profileImageUrl || '';

        const effectiveWorkerDesc = formData.skillsDescription || generateWorkerDescription(formData.job);
        const effectiveEquipDesc = formData.equipmentDescription || generateEquipmentDescription(formData.equipmentType);
        const effectiveAgencyDesc = formData.agencyDescription || generateAgencyDescription(formData.propertyTypes, formData.agencyName);
        const effectiveCompanySkills = formData.companySkills || generateCompanyDescription(formData.companyPoste, formData.companyName);

        const inscriptionData: any = {
          profileType: selectedProfile,
          name: formData.name,
          city: formData.city,
          phone: formData.phone,
          profileImageUrl: currentProfileImageUrl,
          imageLink: currentProfileImageUrl,
          photos: rawPhotos,
          onlineImages: rawPhotos,
          images: rawPhotos,
          registrationStatus: 'pending',
          submissionType: 'SmartRegistration',
          submittedAt: new Date().toISOString(),
          ...(selectedProfile === 'Travailleur' && {
              job: formData.job,
              learnedFrom: formData.learnedFrom,
              availability: formData.availability,
              movementZone: formData.movementZone,
              skillsDescription: effectiveWorkerDesc,
              description: effectiveWorkerDesc,
              paymentFrequency: formData.paymentFrequency,
              salaryPeriod: formData.paymentFrequency,
              salaryAmount: formData.paymentFrequency === 'Contrat' ? '' : formData.salaryAmount,
              desiredSalary: formData.paymentFrequency === 'Contrat' ? 'Contrat' : formData.salaryAmount,
              salary: formData.paymentFrequency === 'Contrat' 
                ? 'Contrat' 
                : (formData.salaryAmount ? `${formData.salaryAmount} FCFA / ${formData.paymentFrequency?.toLowerCase()}` : (formData.salary || '')),
              pretentionSalariale: formData.paymentFrequency === 'Contrat' 
                ? 'Contrat' 
                : (formData.salaryAmount ? `${formData.salaryAmount} FCFA / ${formData.paymentFrequency?.toLowerCase()}` : (formData.salary || ''))
          }),
          ...(selectedProfile === 'Propriétaire' && {
              equipmentType: formData.equipmentType,
              equipmentCategory: formData.equipmentCategory,
              quantity: formData.quantity,
              equipmentCity: formData.equipmentCity,
              rentalPrice: formData.rentalPrice,
              equipmentDescription: effectiveEquipDesc,
              description: effectiveEquipDesc
          }),
          ...(selectedProfile === 'Agence' && {
              agencyName: formData.agencyName,
              agencyCity: formData.agencyCity,
              agencyPhone: formData.agencyPhone,
              propertyTypes: formData.propertyTypes,
              agencyZone: formData.agencyZone,
              agencyDescription: effectiveAgencyDesc,
              description: effectiveAgencyDesc
          }),
          ...(selectedProfile === 'Entreprise' && {
              companyName: formData.companyName,
              companyCity: formData.companyCity,
              companyPhone: formData.companyPhone,
              companyOwner: formData.companyOwner,
              companyPoste: formData.companyPoste,
              companyWorkersCount: formData.companyWorkersCount,
              companyContractType: formData.companyContractType,
              companySalary: formData.companySalary,
              companyHours: formData.companyHours,
              companySkills: effectiveCompanySkills,
              companyServices: effectiveCompanySkills,
              description: effectiveCompanySkills,
              companyDomain: formData.companyPoste,
              proposedSalary: formData.companySalary
          })
        };

        // Sanitize to prevent Firestore 'undefined value' crash
        const cleanedInscriptionData = Object.fromEntries(
          Object.entries(inscriptionData).filter(([_, v]) => v !== undefined && v !== null && v !== '')
        );

        console.log("Submitting inscription data:", cleanedInscriptionData);
        const success = await databaseService.saveInscription(cleanedInscriptionData);
        
        if (success) {
            console.log("Inscription saved successfully, updating QR code activation...");
            try {
              await databaseService.updateQRCodeActivation(formData.phone, {
                name: formData.name,
                phone: formData.phone,
                city: formData.city,
                profileType: selectedProfile,
                profession: formData.job || formData.equipmentType || formData.agencyName || formData.companyName || '',
                domain: formData.skillsDescription || formData.equipmentCategory || formData.propertyTypes || formData.companyDomain || '',
                status: "En attente paiement frais (310 FCFA)",
                fraisDossierPayes: false,
                updatedAt: new Date().toISOString()
              });
            } catch (e) {
              console.warn("Could not update QR code activation right now:", e);
            }
            
            clearTimeout(safetyTimer);
            setIsSubmitting(false); 
            setIsSaved(true);
            localStorage.removeItem('filant_registration_draft');
            
            setTimeout(() => {
              onComplete();
            }, 1200);
        } else {
            clearTimeout(safetyTimer);
            setIsSubmitting(false);
            alert("Une erreur est survenue lors de l'enregistrement de l'inscription. Veuillez vérifier votre connexion.");
        }
    } catch (e) {
        clearTimeout(safetyTimer);
        console.error("Critical error saving inscription:", e);
        setIsSubmitting(false);
        alert("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  };

  const handlePayRegistration = () => {
      setPaymentInitiated(true);
      const event = new CustomEvent('trigger-payment-view', {
          detail: {
              title: `Frais Dossier (${selectedProfile})`,
              amount: '310',
              waveLink: 'https://pay.wave.com/m/M_ci_jwxwatdcoKS8/c/ci/?amount=310',
              paymentType: 'Inscription'
          }
      });
      window.dispatchEvent(event);
      
      // Cleanup draft upon payment success is handled via a callback if possible, 
      // but we'll leave it for now to ensure persistence until confirmed
  };

  const handleModify = () => {
    setIsSaved(false);
    setStep(2);
  };

  const handleNext = () => {
    if (step === 1) {
      if (selectedProfile) {
        setStep(2);
      }
    } else {
      handleSubmit();
    }
  };

  if (showConfirmation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white p-6 text-center">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
        >
          <CheckCircle2 className="w-16 h-16 text-white" />
        </motion.div>
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">Inscription Envoyée !</h2>
        <p className="text-gray-400 text-sm max-w-xs">
          Votre demande d'inscription a été transmise avec succès à notre équipe administrative.
        </p>
      </div>
    );
  }

  const renderCategoryFields = () => {
    switch (selectedProfile) {
      case 'Travailleur':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Métier *</label>
              <SuggestiveAutocompleteInput 
                id="job"
                value={formData.job}
                onChange={(val) => {
                    const autoDesc = generateWorkerDescription(val);
                    setFormData({
                      ...formData, 
                      job: val,
                      skillsDescription: autoDesc
                    });
                    if (errors.includes('job')) setErrors(errors.filter(e => e !== 'job'));
                    if (errors.includes('skillsDescription')) setErrors(errors.filter(e => e !== 'skillsDescription'));
                }}
                placeholder="Ex: Coiffeur, Électricien, Maçon..."
                catalog={JOB_SUGGESTIONS}
                typeLabel="Métier"
                inputClassName={getInputClass('job')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">A appris : *</label>
              <div className="relative">
                <select
                  value={formData.learnedFrom || ''}
                  onChange={(e) => {
                      setFormData({...formData, learnedFrom: e.target.value as any});
                      if (errors.includes('learnedFrom')) setErrors(errors.filter(e => e !== 'learnedFrom'));
                  }}
                  className={`${getInputClass('learnedFrom')} appearance-none pr-10 cursor-pointer`}
                >
                  <option value="">-- Sélectionner une option --</option>
                  <option value="Sur le tas">Sur le tas</option>
                  <option value="Formation professionnelle">Formation professionnelle</option>
                  <option value="Diplôme">Diplôme</option>
                </select>
                <ChevronDown className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Disponibilité *</label>
              <div className="relative">
                <select
                  value={formData.availability || ''}
                  onChange={(e) => {
                      setFormData({...formData, availability: e.target.value});
                      if (errors.includes('availability')) setErrors(errors.filter(e => e !== 'availability'));
                  }}
                  className={`${getInputClass('availability')} appearance-none pr-10 cursor-pointer`}
                >
                  <option value="">-- Sélectionner la disponibilité --</option>
                  <option value="Toujours disponible">Toujours disponible</option>
                  <option value="Disponible en permanence">Disponible en permanence</option>
                </select>
                <ChevronDown className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Zone de déplacement *</label>
              <CityAutocompleteInput 
                id="movementZone"
                value={formData.movementZone}
                onChange={(val) => {
                    setFormData({...formData, movementZone: val});
                    if (errors.includes('movementZone')) setErrors(errors.filter(e => e !== 'movementZone'));
                }}
                placeholder="Ex: Toute la ville, Cocody uniquement..."
                inputClassName={getInputClass('movementZone')}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] block">
                  Description du savoir-faire *
                </label>
                <span className="text-[9px] font-bold text-amber-200 bg-black/25 px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" /> Automatique
                </span>
              </div>
              <textarea 
                id="skillsDescription"
                value={formData.skillsDescription || generateWorkerDescription(formData.job)}
                readOnly
                placeholder="La description se génère automatiquement selon votre métier..."
                className={`w-full bg-white text-slate-900 border-2 rounded-2xl py-3 px-4 font-bold text-sm outline-none cursor-not-allowed select-text min-h-[80px] shadow-sm transition-all ${
                  errors.includes('skillsDescription') ? 'border-red-500 bg-red-50' : 'border-blue-400'
                }`}
              />
              <p className="text-[10px] font-medium text-white/90 mt-1 ml-1 flex items-center gap-1">
                <Lock className="w-3 h-3 text-white/80" /> Description générée automatiquement (non modifiable)
              </p>
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">
                Vous souhaitez être payé par… *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {(['Semaine', 'Mois', 'Jour', 'Contrat'] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        paymentFrequency: freq,
                        salaryAmount: freq === 'Contrat' ? '' : formData.salaryAmount,
                        salary: freq === 'Contrat' ? 'Contrat' : formData.salary
                      });
                      if (errors.includes('paymentFrequency')) {
                        setErrors(errors.filter(e => e !== 'paymentFrequency'));
                      }
                      if (freq === 'Contrat' && errors.includes('salaryAmount')) {
                        setErrors(errors.filter(e => e !== 'salaryAmount'));
                      }
                    }}
                    className={`py-3 px-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all border text-center cursor-pointer ${
                      formData.paymentFrequency === freq
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                        : 'bg-white text-slate-800 border-white hover:bg-slate-50'
                    } ${errors.includes('paymentFrequency') ? 'border-red-500 bg-red-50' : ''}`}
                  >
                    {freq}
                  </button>
                ))}
              </div>

              {formData.paymentFrequency && formData.paymentFrequency !== 'Contrat' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="text-[10px] font-black text-white uppercase tracking-widest ml-1 mb-1 block">
                    Montant souhaité ({formData.paymentFrequency.toLowerCase()}) en FCFA *
                  </label>
                  <div className="relative">
                    <input 
                      id="salaryAmount"
                      type="number"
                      min="0"
                      value={formData.salaryAmount}
                      onChange={(e) => {
                          const val = e.target.value;
                          setFormData({
                            ...formData, 
                            salaryAmount: val,
                            salary: val ? `${val} FCFA / ${formData.paymentFrequency.toLowerCase()}` : ''
                          });
                          if (errors.includes('salaryAmount')) setErrors(errors.filter(e => e !== 'salaryAmount'));
                      }}
                      placeholder={`Ex: ${formData.paymentFrequency === 'Jour' ? '5000' : formData.paymentFrequency === 'Semaine' ? '25000' : '100000'}`}
                      className={`${getInputClass('salaryAmount')} pr-16 font-bold`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-500 select-none">
                      FCFA
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'Propriétaire':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Type d’équipement *</label>
              <SuggestiveAutocompleteInput 
                id="equipmentType"
                value={formData.equipmentType}
                onChange={(val) => {
                    const autoDesc = generateEquipmentDescription(val);
                    setFormData({
                      ...formData, 
                      equipmentType: val,
                      equipmentDescription: autoDesc
                    });
                    if (errors.includes('equipmentType')) setErrors(errors.filter(e => e !== 'equipmentType'));
                    if (errors.includes('equipmentDescription')) setErrors(errors.filter(e => e !== 'equipmentDescription'));
                }}
                placeholder="Ex: Bétonnière, Échafaudage, Groupe électrogène..."
                catalog={EQUIPMENT_SUGGESTIONS}
                typeLabel="Équipement"
                inputClassName={getInputClass('equipmentType')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Catégorie d’équipement *</label>
              <input 
                type="text"
                value={formData.equipmentCategory}
                onChange={(e) => {
                    setFormData({...formData, equipmentCategory: e.target.value});
                    if (errors.includes('equipmentCategory')) setErrors(errors.filter(e => e !== 'equipmentCategory'));
                }}
                placeholder="Ex: Construction, Transport..."
                className={getInputClass('equipmentCategory')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Quantité disponible *</label>
              <input 
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.quantity}
                onChange={(e) => {
                    setFormData({...formData, quantity: e.target.value});
                    if (errors.includes('quantity')) setErrors(errors.filter(e => e !== 'quantity'));
                }}
                placeholder="Ex: 1"
                className={getInputClass('quantity')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Ville où l'équipement est situé *</label>
              <CityAutocompleteInput 
                id="equipmentCity"
                value={formData.equipmentCity || ''}
                onChange={(val) => {
                    setFormData({...formData, equipmentCity: val});
                    if (errors.includes('equipmentCity')) setErrors(errors.filter(e => e !== 'equipmentCity'));
                }}
                placeholder="Ville de localisation"
                inputClassName={getInputClass('equipmentCity')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Prix de location en 1 jour *</label>
              <input 
                type="text"
                inputMode="decimal"
                pattern="[0-9]*"
                value={formData.rentalPrice}
                onChange={(e) => {
                    setFormData({...formData, rentalPrice: e.target.value});
                    if (errors.includes('rentalPrice')) setErrors(errors.filter(e => e !== 'rentalPrice'));
                }}
                placeholder="Ex: 5000"
                className={getInputClass('rentalPrice')}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] block">
                  Description de l’équipement *
                </label>
                <span className="text-[9px] font-bold text-amber-200 bg-black/25 px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" /> Automatique
                </span>
              </div>
              <textarea 
                id="equipmentDescription"
                value={formData.equipmentDescription || generateEquipmentDescription(formData.equipmentType)}
                readOnly
                placeholder="La description se génère automatiquement selon votre équipement..."
                className={`w-full bg-white text-slate-900 border-2 rounded-2xl py-3 px-4 font-bold text-sm outline-none cursor-not-allowed select-text min-h-[80px] shadow-sm transition-all ${
                  errors.includes('equipmentDescription') ? 'border-red-500 bg-red-50' : 'border-blue-400'
                }`}
              />
              <p className="text-[10px] font-medium text-white/90 mt-1 ml-1 flex items-center gap-1">
                <Lock className="w-3 h-3 text-white/80" /> Description générée automatiquement (non modifiable)
              </p>
            </div>
          </div>
        );
      case 'Agence':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Nom de l'agence *</label>
              <input 
                type="text"
                value={formData.agencyName}
                onChange={(e) => {
                    const newName = e.target.value;
                    const autoDesc = generateAgencyDescription(formData.propertyTypes, newName);
                    setFormData({
                      ...formData, 
                      agencyName: newName,
                      agencyDescription: autoDesc
                    });
                    if (errors.includes('agencyName')) setErrors(errors.filter(e => e !== 'agencyName'));
                }}
                placeholder="Nom de votre agence"
                className={getInputClass('agencyName')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Ville où l'agence est située *</label>
              <CityAutocompleteInput 
                id="agencyCity"
                value={formData.agencyCity || ''}
                onChange={(val) => {
                    setFormData({...formData, agencyCity: val});
                    if (errors.includes('agencyCity')) setErrors(errors.filter(e => e !== 'agencyCity'));
                }}
                placeholder="Ville du siège"
                inputClassName={getInputClass('agencyCity')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Numéro de l’agence *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-500 select-none flex items-center gap-1">
                  <span>🇨🇮</span>
                  <span>+225</span>
                </span>
                <input 
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9]*"
                  value={formData.agencyPhone}
                  onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData({...formData, agencyPhone: clean});
                      if (errors.includes('agencyPhone')) setErrors(errors.filter(e => e !== 'agencyPhone'));
                  }}
                  placeholder="0701020304"
                  className={`${getInputClass('agencyPhone')} pl-20 text-sm font-semibold`}
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Type de biens proposés : *</label>
              <div className="relative">
                <select
                  value={formData.propertyTypes || ''}
                  onChange={(e) => {
                      const newType = e.target.value;
                      const autoDesc = generateAgencyDescription(newType, formData.agencyName);
                      setFormData({
                        ...formData, 
                        propertyTypes: newType,
                        agencyDescription: autoDesc
                      });
                      if (errors.includes('propertyTypes')) setErrors(errors.filter(e => e !== 'propertyTypes'));
                  }}
                  className={`${getInputClass('propertyTypes')} appearance-none pr-10 cursor-pointer`}
                >
                  <option value="">-- Sélectionner le type de biens --</option>
                  <option value="Appartement">Appartement</option>
                  <option value="Terrain">Terrain</option>
                  <option value="Automobile">Automobile</option>
                  <option value="Appartement, Terrain">Appartement & Terrain</option>
                  <option value="Appartement, Automobile">Appartement & Automobile</option>
                  <option value="Terrain, Automobile">Terrain & Automobile</option>
                  <option value="Appartement, Terrain, Automobile">Tous les biens (Appartement, Terrain, Automobile)</option>
                </select>
                <ChevronDown className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] block">
                  Présentation de l'agence *
                </label>
                <span className="text-[9px] font-bold text-amber-200 bg-black/25 px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" /> Automatique
                </span>
              </div>
              <textarea 
                id="agencyDescription"
                value={formData.agencyDescription || generateAgencyDescription(formData.propertyTypes, formData.agencyName)}
                readOnly
                placeholder="La présentation se génère automatiquement selon les biens proposés..."
                className="w-full bg-white text-slate-900 border-2 border-blue-400 rounded-2xl py-3 px-4 font-bold text-sm outline-none cursor-not-allowed select-text min-h-[80px] shadow-sm"
              />
              <p className="text-[10px] font-medium text-white/90 mt-1 ml-1 flex items-center gap-1">
                <Lock className="w-3 h-3 text-white/80" /> Présentation générée automatiquement (non modifiable)
              </p>
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Zone d’activité *</label>
              <CityAutocompleteInput 
                id="agencyZone"
                value={formData.agencyZone}
                onChange={(val) => {
                    setFormData({...formData, agencyZone: val});
                    if (errors.includes('agencyZone')) setErrors(errors.filter(e => e !== 'agencyZone'));
                }}
                placeholder="Ex: Abidjan, Côte Ouest..."
                inputClassName={getInputClass('agencyZone')}
              />
            </div>
          </div>
        );
      case 'Entreprise':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Nom de l'entreprise *</label>
              <input 
                type="text"
                value={formData.companyName}
                onChange={(e) => {
                    const newName = e.target.value;
                    const autoDesc = generateCompanyDescription(formData.companyPoste, newName);
                    setFormData({
                      ...formData, 
                      companyName: newName,
                      companySkills: autoDesc
                    });
                    if (errors.includes('companyName')) setErrors(errors.filter(e => e !== 'companyName'));
                }}
                placeholder="Ex: BTP Services CI"
                className={getInputClass('companyName')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Nom du responsable ou propriétaire *</label>
              <input 
                type="text"
                value={formData.companyOwner}
                onChange={(e) => {
                    setFormData({...formData, companyOwner: e.target.value});
                    if (errors.includes('companyOwner')) setErrors(errors.filter(e => e !== 'companyOwner'));
                }}
                placeholder="Ex: Mael Kouadio"
                className={getInputClass('companyOwner')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Ville de l’entreprise *</label>
              <CityAutocompleteInput 
                id="companyCity"
                value={formData.companyCity || ''}
                onChange={(val) => {
                    setFormData({...formData, companyCity: val});
                    if (errors.includes('companyCity')) setErrors(errors.filter(e => e !== 'companyCity'));
                }}
                placeholder="Ville du siège"
                inputClassName={getInputClass('companyCity')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Numéro de l’entreprise *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-500 select-none flex items-center gap-1">
                  <span>🇨🇮</span>
                  <span>+225</span>
                </span>
                <input 
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9]*"
                  value={formData.companyPhone}
                  onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData({...formData, companyPhone: clean});
                      if (errors.includes('companyPhone')) setErrors(errors.filter(e => e !== 'companyPhone'));
                  }}
                  placeholder="0701020304"
                  className={`${getInputClass('companyPhone')} pl-20 text-sm font-semibold`}
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Poste recherché *</label>
              <SuggestiveAutocompleteInput 
                id="companyPoste"
                value={formData.companyPoste}
                onChange={(val) => {
                    const autoDesc = generateCompanyDescription(val, formData.companyName);
                    setFormData({
                      ...formData, 
                      companyPoste: val,
                      companySkills: autoDesc
                    });
                    if (errors.includes('companyPoste')) setErrors(errors.filter(e => e !== 'companyPoste'));
                    if (errors.includes('companySkills')) setErrors(errors.filter(e => e !== 'companySkills'));
                }}
                placeholder="Ex: Serveur, Cuisinier, Livreur, Chauffeur..."
                catalog={JOB_SUGGESTIONS}
                typeLabel="Poste / Métier"
                inputClassName={getInputClass('companyPoste')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Nombre de travailleurs recherchés *</label>
              <input 
                type="number"
                min="1"
                value={formData.companyWorkersCount}
                onChange={(e) => {
                    setFormData({...formData, companyWorkersCount: e.target.value});
                    if (errors.includes('companyWorkersCount')) setErrors(errors.filter(e => e !== 'companyWorkersCount'));
                }}
                placeholder="Ex: 5"
                className={getInputClass('companyWorkersCount')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Type de contrat *</label>
              <div className="relative">
                <select
                  value={formData.companyContractType}
                  onChange={(e) => {
                      setFormData({...formData, companyContractType: e.target.value});
                      if (errors.includes('companyContractType')) setErrors(errors.filter(e => e !== 'companyContractType'));
                  }}
                  className={`${getInputClass('companyContractType')} appearance-none pr-10 cursor-pointer`}
                >
                  <option value="">Sélectionner un contrat</option>
                  <option value="Temps plein">Temps plein</option>
                  <option value="Temps partiel">Temps partiel</option>
                  <option value="Temporaire">Temporaire</option>
                  <option value="Stage">Stage</option>
                  <option value="Autre">Autre</option>
                </select>
                <ChevronDown className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Salaire proposé *</label>
              <input 
                type="text"
                value={formData.companySalary}
                onChange={(e) => {
                    setFormData({...formData, companySalary: e.target.value});
                    if (errors.includes('companySalary')) setErrors(errors.filter(e => e !== 'companySalary'));
                }}
                placeholder="Ex: 150 000 FCFA / mois"
                className={getInputClass('companySalary')}
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] ml-1 mb-1.5 block">Horaires de travail *</label>
              <input 
                type="text"
                value={formData.companyHours}
                onChange={(e) => {
                    setFormData({...formData, companyHours: e.target.value});
                    if (errors.includes('companyHours')) setErrors(errors.filter(e => e !== 'companyHours'));
                }}
                placeholder="Ex: 8H00 - 17H00, Lun au Ven"
                className={getInputClass('companyHours')}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5 ml-1">
                <label className="text-[10px] font-black text-white uppercase tracking-[0.15em] block">
                  Compétences & Description du poste *
                </label>
                <span className="text-[9px] font-bold text-amber-200 bg-black/25 px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" /> Automatique
                </span>
              </div>
              <textarea 
                id="companySkills"
                value={formData.companySkills || generateCompanyDescription(formData.companyPoste, formData.companyName)}
                readOnly
                placeholder="La description du poste se génère automatiquement selon l'activité et le poste..."
                className={`w-full bg-white text-slate-900 border-2 rounded-2xl py-3 px-4 font-bold text-sm outline-none cursor-not-allowed select-text min-h-[90px] shadow-sm transition-all ${
                  errors.includes('companySkills') ? 'border-red-500 bg-red-50' : 'border-blue-400'
                }`}
              />
              <p className="text-[10px] font-medium text-white/90 mt-1 ml-1 flex items-center gap-1">
                <Lock className="w-3 h-3 text-white/80" /> Description générée automatiquement (non modifiable)
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getPhotosConfig = () => {
    switch (selectedProfile) {
      case 'Travailleur':
        return {
          title: 'PHOTOS DE VOUS ET DE VOTRE ACTIVITÉ (3 MAXIMUM)',
          description: 'Ajoutez jusqu’à 3 photos maximum : des photos de vous et de votre activité professionnelle ou de vos réalisations.'
        };
      case 'Entreprise':
        return {
          title: 'PHOTOS DE VOTRE ENTREPRISE ET DE VOTRE ACTIVITÉ (3 MAXIMUM)',
          description: 'Ajoutez jusqu’à 3 photos maximum : des photos de votre entreprise, de vos locaux, de votre activité ou de vos réalisations. Vous pouvez également ajouter votre logo.'
        };
      case 'Propriétaire':
        return {
          title: 'PHOTOS DE VOS ÉQUIPEMENTS (3 MAXIMUM)',
          description: 'Ajoutez jusqu’à 3 photos maximum de vos équipements disponibles à la location. Les photos doivent permettre aux clients de voir clairement les équipements proposés.'
        };
      case 'Agence':
        return {
          title: 'PHOTOS DE VOTRE AGENCE ET DE VOTRE ACTIVITÉ (3 MAXIMUM)',
          description: 'Ajoutez jusqu’à 3 photos maximum : une photo de la devanture de votre agence, votre logo et/ou une photo de vous ou de votre équipe.'
        };
      default:
        return {
          title: 'PHOTOS DE VOTRE ACTIVITÉ (3 MAXIMUM)',
          description: 'Ajoutez jusqu’à 3 photos maximum pour illustrer votre profil, vos travaux, équipements ou locaux.'
        };
    }
  };

  const isStep2Form = step === 2 && !isSaved;

  return (
    <div className="flex flex-col h-full font-sans overflow-y-auto scrollbar-hide bg-orange-500 text-white">
      {/* Header */}
      {!isStep2Form ? (
        <header className={`px-6 flex flex-col items-center text-center relative shrink-0 transition-all duration-300 ${isKeyboardVisible ? 'pt-4 pb-2' : 'pt-8 pb-6'} bg-orange-500`}>
          <button 
            type="button"
            onClick={handleBackWithConfirmation}
            className={`absolute left-6 p-2 bg-white/20 hover:bg-white/30 rounded-xl active:scale-90 transition-all text-white ${isKeyboardVisible ? 'top-4' : 'top-8'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1 mb-2">
            <span className="text-white font-black text-3xl tracking-tighter transition-all duration-300">FILANT</span>
            <span className="text-white/90 font-bold text-3xl tracking-tighter opacity-90">225</span>
          </div>
          <h2 className={`font-medium text-white/95 transition-all duration-300 ${isKeyboardVisible ? 'text-xs' : 'text-lg'}`}>Inscription intelligente</h2>
          <p className={`text-white/90 text-xs mt-2 max-w-[280px] transition-all duration-300 overflow-hidden ${isKeyboardVisible ? 'h-0 mt-0 opacity-0' : 'h-auto opacity-100'}`}>
            Nous vous invitons à vous inscrire sur la plateforme afin d’être rapidement mis en relation avec des clients.
          </p>
          <p className={`text-white/80 text-[10px] mt-1 italic font-light tracking-tight transition-all duration-300 overflow-hidden ${isKeyboardVisible ? 'h-0 mt-0 opacity-0' : 'h-auto opacity-100'}`}>
            Frais d’inscription : 310.CFA fin
          </p>
        </header>
      ) : (
        <header className={`px-6 flex flex-col items-start relative border-b border-orange-400/50 bg-orange-500 shrink-0 transition-all duration-300 ${isKeyboardVisible ? 'pt-3 pb-3' : 'pt-6 pb-4'}`}>
          <button 
            type="button"
            onClick={() => setStep(1)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-xl active:scale-90 transition-all text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className={`text-left transition-all duration-300 overflow-hidden ${isKeyboardVisible ? 'h-0 mt-0 opacity-0' : 'mt-4 h-auto opacity-100'}`}>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">INSCRIPTION</h2>
            <p className="text-white/90 text-xs mt-1">
              Complétez vos coordonnées et spécificités de <span className="text-white font-black underline">{selectedProfile}</span>.
            </p>
          </div>
        </header>
      )}

      {/* Main Container */}
      <main className="flex-1 flex flex-col p-0 bg-orange-500 w-full">
        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className={`flex flex-col flex-1 bg-orange-500 ${
            isStep2Form 
              ? 'p-6 w-full max-w-xl mx-auto' 
              : 'rounded-[2.5rem] p-6 min-h-[500px]'
          }`}
        >
          {/* Connexion Rapide & Progress */}
          <div className="flex justify-between items-center mb-8 px-2 shrink-0">
            <span className="text-white font-black text-sm uppercase tracking-wider">
              {isStep2Form ? "Étape 2 sur 2" : "Connexion rapide"}
            </span>
            <div className="flex gap-1">
              <div className={`w-8 h-1.5 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-white' : 'bg-white/40'}`}></div>
              <div className={`w-8 h-1.5 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-blue-600' : 'bg-white/40'}`}></div>
              <div className={`w-8 h-1.5 rounded-full transition-all duration-500 ${selectedProfile ? 'bg-white' : 'bg-white/40'}`}></div>
            </div>
          </div>

          {!isStep2Form && (
            <div className="text-center mb-8 shrink-0">
              <h1 className="text-white font-black text-3xl tracking-tighter mb-1 uppercase">INSCRIPTION</h1>
              <h3 className="text-white/80 font-bold text-sm tracking-widest uppercase">ÉTAPE {step} : {step === 1 ? 'PROFIL' : 'INFORMATION'}</h3>
            </div>
          )}

          <div className="flex-1 overflow-y-auto scrollbar-hide px-1">
            {isSaved ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-8 animate-in fade-in zoom-in duration-500">
                 <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-12 h-12 text-white stroke-[3]" />
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">Validation Réussie !</h3>
                    <p className="text-white/95 font-medium leading-relaxed">
                      Votre inscription en tant que <span className="text-white font-black underline">{selectedProfile}</span> a été enregistrée avec succès.
                    </p>
                    <div className="p-6 bg-white/20 rounded-3xl border border-white/30 backdrop-blur-sm">
                       <p className="text-white font-bold text-sm">
                          Pour finaliser et activer votre mise en ligne, veuillez régler les frais de dossier de :
                       </p>
                       <p className="text-3xl font-black text-white mt-2">310 FCFA</p>
                    </div>
                 </div>

                 <div className="w-full pt-8 space-y-4">
                    <button
                      type="button"
                      onClick={handlePayRegistration}
                      disabled={paymentInitiated}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-3xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all text-sm uppercase tracking-widest disabled:opacity-50 cursor-pointer"
                    >
                      {paymentInitiated ? 'Redirection Wave...' : 'Payer les frais (310 FCFA)'}
                      {!paymentInitiated && <ArrowRight className="w-5 h-5" />}
                    </button>
                    {paymentInitiated && (
                      <WhatsAppPaymentSupportButton
                        serviceName={`Frais de dossier Inscription (${selectedProfile || 'Utilisateur'})`}
                        amount="310"
                        waveLink="https://pay.wave.com/m/M_ci_jwxwatdcoKS8/c/ci/?amount=310"
                      />
                    )}
                    <button
                      type="button"
                      onClick={handleModify}
                      className="w-full py-4 rounded-3xl border-2 border-white/30 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Briefcase className="w-3 h-3" />
                      Modifier mes informations
                    </button>
                    <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest text-center mt-2">Paiement sécurisé via Wave</p>
                 </div>
              </div>
            ) : step === 1 ? (
              <div className="px-2 mb-6">
                <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">QUI ÊTES-VOUS ?</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  {profiles.map((profile) => (
                    <button
                      key={profile.id}
                      type="button"
                      disabled={!profile.active}
                      onClick={() => {
                        setSelectedProfile(profile.id as ProfileType);
                      }}
                      className={`
                        relative p-4 rounded-3xl border-2 transition-all duration-300 text-left flex flex-col justify-between h-[120px]
                        ${!profile.active ? 'bg-white/60 border-white/40 opacity-60' : 
                          selectedProfile === profile.id ? 'bg-white border-white ring-4 ring-blue-600/30' : 'bg-white/90 border-white hover:bg-white'}
                      `}
                    >
                      <div className={`p-2 rounded-xl w-fit ${selectedProfile === profile.id && profile.active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                        {profile.icon}
                      </div>
                      
                      <div className="mt-2 text-wrap">
                        <p className={`text-[10px] font-black leading-tight uppercase ${selectedProfile === profile.id && profile.active ? 'text-blue-700' : 'text-slate-700'}`}>
                          {profile.label}
                        </p>
                      </div>

                      {selectedProfile === profile.id && profile.active && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <Check className="w-3 h-3 text-white stroke-[4]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-2 mb-6 space-y-6">
                <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">VOS DÉTAILS PERSONNELS</h4>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-white uppercase tracking-[0.12em] ml-1 mb-1.5 block">Nom complet (fixé)</label>
                      <input 
                        type="text"
                        value={formData.name}
                        readOnly
                        className="w-full bg-white border-2 border-white rounded-2xl py-3 px-4 text-black font-black text-xs outline-none cursor-not-allowed opacity-95"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-white uppercase tracking-[0.12em] ml-1 mb-1.5 block">Ville actuelle (fixée)</label>
                      <input 
                        type="text"
                        value={formData.city}
                        readOnly
                        className="w-full bg-white border-2 border-white rounded-2xl py-3 px-4 text-black font-black text-xs outline-none cursor-not-allowed opacity-95"
                      />
                    </div>
                  </div>

                  <div>
                     <label className="text-[10px] font-black text-white uppercase tracking-[0.12em] ml-1 mb-1.5 block">Numéro personnel (fixé)</label>
                     <div className="relative bg-white border-2 border-white rounded-2xl flex items-center opacity-95">
                       <span className="pl-4 text-xs font-black text-slate-500 select-none flex items-center gap-1.5 flex-shrink-0">
                         <span>🇨🇮</span>
                         <span>+225</span>
                       </span>
                       <input 
                         type="text"
                         value={formData.phone}
                         readOnly
                         className="w-full bg-transparent py-3 pl-4 pr-4 text-black font-black text-xs outline-none cursor-not-allowed"
                       />
                     </div>
                  </div>

                  <div className="h-[2px] bg-white/20 my-4"></div>

                  <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4">Spécificités {selectedProfile}</h4>

                  {renderCategoryFields()}

                  {/* Photos Upload Section (Up to 3 photos) */}
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-[11px] font-black text-white uppercase tracking-[0.15em] flex items-center gap-2">
                        <Camera className="w-4 h-4 text-white shrink-0" />
                        <span>{getPhotosConfig().title}</span>
                      </label>
                      <span className="text-[10px] font-bold text-white bg-white/20 px-2.5 py-1 rounded-full shrink-0">
                        {(formData.photos || []).length} / 3
                      </span>
                    </div>
                    <p className="text-[11px] text-white/90 mb-3 font-medium leading-relaxed">
                      {getPhotosConfig().description}
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      {(formData.photos || []).map((photoUrl, idx) => (
                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white/40 shadow-sm group">
                          <img src={photoUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(idx)}
                            className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-all active:scale-90 cursor-pointer"
                            title="Supprimer la photo"
                          >
                            <X className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                          <div className="absolute bottom-1 left-1.5 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                            #{idx + 1}
                          </div>
                        </div>
                      ))}

                      {(formData.photos || []).length < 3 && (
                        <label className={`aspect-square rounded-2xl border-2 border-dashed border-white/60 hover:border-white bg-white/20 hover:bg-white/30 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95 text-white ${isCompressingPhotos ? 'opacity-50 pointer-events-none' : ''}`}>
                          <input 
                            type="file" 
                            accept="image/*" 
                            multiple 
                            onChange={handlePhotosSelected} 
                            className="hidden" 
                            disabled={isCompressingPhotos}
                          />
                          {isCompressingPhotos ? (
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span className="text-[9px] font-bold uppercase">Optimisation...</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-1.5 text-center p-2">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600">
                                <Upload className="w-4 h-4" />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-wider">Ajouter photo</span>
                            </div>
                          )}
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isSaved && (
            <div className="mt-auto pt-6 px-2 shrink-0">
              <AnimatePresence>
                {errors.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mb-4 p-3 bg-red-600/90 border border-white/30 rounded-2xl flex items-center gap-3 text-white shadow-lg backdrop-blur-sm"
                  >
                    <div className="w-5 h-5 bg-white text-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-black">!</span>
                    </div>
                    <p className="text-white text-[10px] font-black uppercase tracking-tight">
                      Veuillez remplir tous les champs obligatoires (*)
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 active:scale-95 transition-all text-white font-black py-5 rounded-3xl flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(37,99,235,0.4)] cursor-pointer"
              >
                {isSubmitting ? (
                   <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="text-lg uppercase tracking-wider">{step === 1 ? 'Suivant' : 'S’inscrire'}</span>
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
              {step === 2 && (
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full mt-4 text-white/90 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
                >
                  Retour
                </button>
              )}
            </div>
          )}
        </motion.div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        .font-sans {
          font-family: 'Inter', system-ui, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default SmartRegistrationScreen;
