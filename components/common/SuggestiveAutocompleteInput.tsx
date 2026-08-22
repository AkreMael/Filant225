import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Check, ChevronRight } from 'lucide-react';

// Common job titles catalog in Ivory Coast / West Africa
export const JOB_SUGGESTIONS: string[] = [
  "Coiffeur",
  "Coiffeuse",
  "Coiffeur Homme",
  "Coiffeuse Femme",
  "Électricien",
  "Électricien bâtiment",
  "Électricien auto",
  "Plombier",
  "Plombier bâtiment",
  "Plombier sanitaire",
  "Maçon",
  "Maçonnerie générale",
  "Menuisier",
  "Menuisier bois",
  "Menuisier aluminium",
  "Menuisier métallique",
  "Carreleur",
  "Charpentier",
  "Peintre",
  "Peintre bâtiment",
  "Peintre auto",
  "Soudeur",
  "Ferrailleur",
  "Coffreur",
  "Staffeur",
  "Étancheur",
  "Serrurier",
  "Vitrier",
  "Technicien de surface",
  "Femme de ménage",
  "Agent d’entretien",
  "Nounou",
  "Baby-sitter",
  "Cuisinier",
  "Cuisinière",
  "Pâtissier",
  "Pâtissière",
  "Chauffeur",
  "Chauffeur VTC",
  "Chauffeur poids lourd",
  "Livreur",
  "Livreur moto",
  "Vigile",
  "Agent de sécurité",
  "Jardinier",
  "Vendeur",
  "Vendeuse",
  "Caissier",
  "Caissière",
  "Hôtesse d’accueil",
  "Réceptionniste",
  "Esthéticienne",
  "Manucure",
  "Pédicure",
  "Maquilleuse professionnelle",
  "Couturier",
  "Couturière",
  "Déménageur",
  "Manutentionnaire",
  "Magasinier",
  "Frigoriste",
  "Technicien climatisation",
  "Mécanicien auto",
  "Installateur caméras de surveillance",
  "Poseur de portail",
  "Sonorisateur",
  "DJ",
  "Organisateur événementiel",
  "Photographe",
  "Vidéaste",
  "Technicien forage",
  "Constructeur maison"
];

// Common equipment catalog in Ivory Coast / West Africa
export const EQUIPMENT_SUGGESTIONS: string[] = [
  "Bétonnière",
  "Bétonnière électrique",
  "Bétonnière thermique",
  "Échafaudage",
  "Échafaudage de chantier",
  "Échafaudage mobile",
  "Groupe électrogène",
  "Groupe électrogène 5kVA",
  "Groupe électrogène 10kVA",
  "Compresseur",
  "Compresseur d'air",
  "Marteau-piqueur",
  "Tracteur",
  "Tracteur agricole",
  "Tractopelle",
  "Mini pelle",
  "Pelle mécanique",
  "Camion benne",
  "Camion plateau",
  "Camion de campagne",
  "Bâche à louer",
  "Bâche de réception",
  "Chaise d'événement",
  "Chaise VIP",
  "Table d'événement",
  "Table ronde",
  "Table rectangulaire",
  "Sonorisation",
  "Baffle amplifié",
  "Podium",
  "Écran géant LED",
  "Vidéoprojecteur",
  "Jeux de lumière",
  "Projecteur LED portable",
  "Tente pliante",
  "Tente événementielle",
  "Échelle télescopique",
  "Échelle pliante",
  "Poste à souder",
  "Dameuse / Compacteur",
  "Motopompe d'eau",
  "Débroussailleuse",
  "Glacière événementielle",
  "Mégaphone"
];

// Aliases / common phonetic terms / keywords mapping to help auto-correct queries
const SYNONYMS_MAP: Record<string, string[]> = {
  // Jobs
  "coif": ["Coiffeur", "Coiffeuse", "Coiffeur Homme", "Coiffeuse Femme"],
  "coiff": ["Coiffeur", "Coiffeuse", "Coiffeur Homme", "Coiffeuse Femme"],
  "barbier": ["Coiffeur Homme", "Coiffeur"],
  "tresses": ["Coiffeuse Femme", "Coiffeuse"],
  "coiffure": ["Coiffeur", "Coiffeuse"],
  "masson": ["Maçon", "Maçonnerie générale"],
  "macon": ["Maçon", "Maçonnerie générale"],
  "maconerie": ["Maçonnerie générale", "Maçon"],
  "plonbier": ["Plombier", "Plombier bâtiment"],
  "plomberie": ["Plombier", "Plombier bâtiment"],
  "electrisien": ["Électricien", "Électricien bâtiment"],
  "electricite": ["Électricien", "Électricien bâtiment"],
  "peintur": ["Peintre", "Peintre bâtiment"],
  "peinture": ["Peintre", "Peintre bâtiment"],
  "ferayeur": ["Ferrailleur"],
  "ferailleur": ["Ferrailleur"],
  "securite": ["Agent de sécurité", "Vigile"],
  "gardien": ["Vigile", "Agent de sécurité"],
  "menagere": ["Femme de ménage", "Technicien de surface"],
  "menage": ["Femme de ménage", "Agent d’entretien"],
  "nettoyage": ["Technicien de surface", "Agent d’entretien"],
  "babysiter": ["Baby-sitter", "Nounou"],
  "gardienne": ["Nounou", "Baby-sitter"],
  "cuisin": ["Cuisinier", "Cuisinière"],
  "conducteur": ["Chauffeur", "Chauffeur VTC"],
  "chauffeur": ["Chauffeur", "Chauffeur VTC", "Chauffeur poids lourd"],
  "coursier": ["Livreur", "Livreur moto"],
  "clim": ["Technicien climatisation", "Frigoriste"],
  "climatiseur": ["Technicien climatisation", "Frigoriste"],
  "camera": ["Installateur caméras de surveillance"],
  "photo": ["Photographe"],
  "video": ["Vidéaste"],
  "sono": ["Sonorisateur", "DJ"],

  // Equipment
  "beton": ["Bétonnière", "Bétonnière électrique", "Bétonnière thermique"],
  "betoniere": ["Bétonnière", "Bétonnière électrique"],
  "betonniere": ["Bétonnière", "Bétonnière électrique"],
  "echafodage": ["Échafaudage", "Échafaudage de chantier"],
  "echaffaudage": ["Échafaudage", "Échafaudage de chantier"],
  "echafaudage": ["Échafaudage", "Échafaudage de chantier"],
  "groupe": ["Groupe électrogène", "Groupe électrogène 5kVA"],
  "generateur": ["Groupe électrogène"],
  "baffle": ["Sonorisation", "Baffle amplifié"],
  "enceinte": ["Sonorisation", "Baffle amplifié"],
  "lumier": ["Jeux de lumière", "Projecteur LED portable"],
  "lumiere": ["Jeux de lumière", "Projecteur LED portable"],
  "projecteur": ["Projecteur LED portable", "Jeux de lumière"],
  "chapiteau": ["Tente événementielle", "Bâche de réception"],
  "tente": ["Tente événementielle", "Tente pliante", "Bâche à louer"],
  "bache": ["Bâche à louer", "Bâche de réception"],
  "camionette": ["Camion plateau", "Camion benne"],
  "camion": ["Camion benne", "Camion plateau", "Camion de campagne"],
  "chaises": ["Chaise d'événement", "Chaise VIP"],
  "tables": ["Table d'événement", "Table ronde", "Table rectangulaire"],
  "echelle": ["Échelle télescopique", "Échelle pliante"],
  "soudure": ["Poste à souder"]
};

// String sanitizer: remove accents, special chars, and lowercase
export const normalizeText = (str: string): string => {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
};

// Levenshtein distance for fuzzy matching typos
function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

interface SuggestionMatch {
  text: string;
  isFuzzy: boolean;
  score: number;
  reason?: string;
}

export const getSuggestions = (query: string, catalog: string[]): SuggestionMatch[] => {
  const q = normalizeText(query);
  if (!q || q.length < 1) return [];

  const results: SuggestionMatch[] = [];

  // Check synonym mappings first
  for (const [key, targets] of Object.entries(SYNONYMS_MAP)) {
    const keyNorm = normalizeText(key);
    if (keyNorm.startsWith(q) || q.startsWith(keyNorm) || (q.length >= 3 && levenshteinDistance(q, keyNorm) <= 1)) {
      for (const target of targets) {
        if (catalog.includes(target)) {
          results.push({
            text: target,
            isFuzzy: !normalizeText(target).startsWith(q),
            score: 95,
            reason: 'Correction'
          });
        }
      }
    }
  }

  for (const item of catalog) {
    const itemNorm = normalizeText(item);
    const words = item.split(/\s+/).map(w => normalizeText(w));

    // 1. Exact start on full string
    if (itemNorm.startsWith(q)) {
      results.push({ 
        text: item, 
        isFuzzy: false, 
        score: 100 - (itemNorm.length - q.length),
        reason: 'Correspondance'
      });
      continue;
    }

    // 2. Exact start on any word within item (e.g. "bois" -> "Menuisier bois")
    const wordStarts = words.some(w => w.startsWith(q));
    if (wordStarts) {
      results.push({ 
        text: item, 
        isFuzzy: false, 
        score: 85,
        reason: 'Mot correspondant'
      });
      continue;
    }

    // 3. Substring match
    if (itemNorm.includes(q)) {
      results.push({ 
        text: item, 
        isFuzzy: false, 
        score: 70,
        reason: 'Correspondance'
      });
      continue;
    }

    // 4. Fuzzy / typo matching (Levenshtein)
    if (q.length >= 3) {
      const distWhole = levenshteinDistance(q, itemNorm.slice(0, Math.max(q.length + 2, 8)));
      const distFirstWord = words[0] ? levenshteinDistance(q, words[0]) : 99;
      const minDistance = Math.min(distWhole, distFirstWord);

      const threshold = q.length <= 4 ? 1 : q.length <= 7 ? 2 : 3;
      if (minDistance <= threshold) {
        results.push({ 
          text: item, 
          isFuzzy: true, 
          score: 50 - minDistance * 10,
          reason: 'Correction suggérée'
        });
      }
    }
  }

  // Deduplicate and sort by score descending
  const seen = new Set<string>();
  return results
    .filter(r => {
      if (seen.has(r.text)) return false;
      seen.add(r.text);
      return true;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
};

interface SuggestiveAutocompleteInputProps {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  catalog: string[];
  typeLabel?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  required?: boolean;
}

export const SuggestiveAutocompleteInput: React.FC<SuggestiveAutocompleteInputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  className = "w-full",
  inputClassName = "",
  catalog,
  typeLabel = "Suggestion",
  onFocus,
  onBlur,
  required
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = getSuggestions(value, catalog);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (item: string) => {
    onChange(item);
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[activeIndex].text);
      } else if (suggestions.length > 0 && normalizeText(value) !== normalizeText(suggestions[0].text)) {
        e.preventDefault();
        handleSelect(suggestions[0].text);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} id={`autocomplete-wrapper-${id || 'field'}`}>
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
          setActiveIndex(-1);
        }}
        onFocus={() => {
          setShowSuggestions(true);
          if (onFocus) onFocus();
        }}
        onBlur={() => {
          setTimeout(() => {
            if (onBlur) onBlur();
          }, 250);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={inputClassName}
        required={required}
        autoComplete="off"
      />

      {/* Floating Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          id={`suggestions-box-${id || 'field'}`}
          className="absolute left-0 right-0 z-[9999] mt-2 bg-white rounded-2xl p-2 shadow-2xl border border-orange-200/90 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between px-3 py-1.5 mb-1 border-b border-gray-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1 text-orange-600">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Suggestions {typeLabel ? `(${typeLabel})` : ''}
            </span>
            <span className="text-gray-400 text-[9px] font-medium">Touchez pour sélectionner</span>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-1 scrollbar-thin">
            {suggestions.map((item, idx) => {
              const isActive = idx === activeIndex;
              const isExact = normalizeText(value) === normalizeText(item.text);

              return (
                <button
                  key={`${item.text}-${idx}`}
                  type="button"
                  onClick={() => handleSelect(item.text)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-left font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isExact
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      : 'text-slate-800 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : item.isFuzzy ? 'bg-amber-400' : 'bg-blue-500'}`} />
                    <span className="truncate">{item.text}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {item.isFuzzy && (
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                        isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                      }`}>
                        Correction
                      </span>
                    )}
                    {isExact ? (
                      <Check className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-600'}`} />
                    ) : (
                      <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestiveAutocompleteInput;
