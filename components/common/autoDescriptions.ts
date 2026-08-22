/**
 * Auto-description generator utilities for Filant Inscription forms
 */

// Helper to sanitize and lowercase
const clean = (str?: string): string => (str || '').trim();

/**
 * Generates worker / job description automatically
 * Ex: "Maçon" -> "Je suis maçon, veuillez me contacter pour mes services."
 */
export const generateWorkerDescription = (job: string): string => {
  const j = clean(job);
  if (!j) return '';
  return `Je suis ${j.toLowerCase()}, veuillez me contacter pour mes services.`;
};

/**
 * Generates equipment description automatically
 * Ex: "Groupe électrogène" -> "Mon groupe électrogène est disponible, veuillez me contacter pour toute location."
 * Ex: "Bétonnière" -> "Ma bétonnière est disponible, veuillez me contacter pour toute location."
 * Ex: "Chaises d'événement" -> "Mes chaises d'événement sont disponibles, veuillez me contacter pour toute location."
 */
export const generateEquipmentDescription = (equipment: string): string => {
  const eq = clean(equipment);
  if (!eq) return '';
  const lower = eq.toLowerCase();

  // Plural items
  if (
    lower.startsWith('chaise') || 
    lower.startsWith('table') || 
    lower.startsWith('bâche') || 
    lower.startsWith('bache') ||
    lower.startsWith('jeux') || 
    (lower.endsWith('s') && !lower.endsWith('pass') && !lower.endsWith('corps'))
  ) {
    return `Mes ${lower} sont disponibles, veuillez me contacter pour toute location.`;
  }

  // Feminine items
  const feminineWords = [
    'bétonnière', 'betonniere', 'tente', 'échelle', 'echelle', 
    'dameuse', 'motopompe', 'débroussailleuse', 'debroussailleuse', 
    'glacière', 'glaciere', 'mini pelle', 'pelle', 'scie', 
    'sonorisation', 'bâche', 'bache'
  ];
  const isFem = feminineWords.some(w => lower.startsWith(w) || lower.includes(` ${w}`));

  if (isFem) {
    return `Ma ${lower} est disponible, veuillez me contacter pour toute location.`;
  }

  return `Mon ${lower} est disponible, veuillez me contacter pour toute location.`;
};

/**
 * Generates real estate / agency presentation automatically
 * Ex: "Terrain" -> "Notre agence est spécialisée dans les terrains. Nous sommes disponibles pour toute vente ou location."
 */
export const generateAgencyDescription = (propertyTypes: string, agencyName?: string): string => {
  const types = clean(propertyTypes);
  const name = clean(agencyName);
  const prefix = name ? `Notre agence "${name}"` : 'Notre agence';

  if (!types) {
    return `${prefix} est disponible pour toute vente ou location de biens immobiliers. Veuillez nous contacter.`;
  }

  const lower = types.toLowerCase();
  if (lower === 'terrain') {
    return `${prefix} est spécialisée dans les terrains. Nous sommes disponibles pour toute vente ou acquisition.`;
  }
  if (lower === 'appartement') {
    return `${prefix} est spécialisée dans les appartements, villas et résidences. Nous sommes disponibles pour toute vente ou location.`;
  }
  if (lower === 'automobile') {
    return `${prefix} propose des véhicules et automobiles de qualité. Nous sommes disponibles pour toute vente ou location.`;
  }
  if (lower.includes('terrain') && lower.includes('appartement')) {
    return `${prefix} propose des appartements, villas et terrains sécurisés. Nous sommes disponibles pour toute vente ou location.`;
  }

  return `${prefix} est spécialisée dans les biens suivants : ${lower}. Nous sommes disponibles pour toute vente ou location.`;
};

/**
 * Generates company job offer / presentation automatically
 * Ex: "Serveur" -> "Notre entreprise recrute activement pour le poste de serveur..."
 */
export const generateCompanyDescription = (companyPoste: string, companyName?: string): string => {
  const poste = clean(companyPoste);
  const name = clean(companyName);
  const prefix = name ? `Notre entreprise "${name}"` : 'Notre entreprise';

  if (!poste) {
    return `${prefix} est à la recherche de collaborateurs motivés et compétents. Veuillez nous contacter pour postuler.`;
  }

  return `${prefix} recrute activement pour le poste de ${poste.toLowerCase()}. Nous recherchons des personnes rigoureuses, sérieuses et motivées. Veuillez nous contacter pour postuler.`;
};
