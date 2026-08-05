import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, XCircle, Handshake, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { App as CapApp } from '@capacitor/app';

interface FirstLaunchScreenProps {
  onComplete: () => void;
}

const termsPoints = [
  "FILANT°225 est une plateforme de mise en relation entre les prestataires et les clients.",
  "Notre rôle est uniquement de faciliter le contact entre les utilisateurs.",
  "Les prestations, les négociations, les contrats, les paiements et les accords conclus entre les utilisateurs relèvent de leur seule responsabilité.",
  "FILANT°225 n'intervient pas dans les accords privés conclus entre les parties et ne peut être tenu responsable des conséquences d'une rencontre, d'une prestation ou d'un contrat réalisé en dehors de la plateforme.",
  "La plateforme ne prélève aucun pourcentage sur le salaire ou les revenus gagnés par les travailleurs ou les prestataires à la suite d'une mission.",
  "Chaque utilisateur est invité à rester vigilant et à vérifier l'identité des personnes avec lesquelles il échange.",
  "En cas de comportement frauduleux, de faux profil ou d'utilisation abusive de la plateforme, nous vous invitons à utiliser la fonction Signaler afin que notre équipe puisse examiner la situation.",
  "En utilisant FILANT°225, vous vous engagez à respecter les lois en vigueur ainsi que les règles de bonne conduite sur la plateforme."
];

const FirstLaunchScreen: React.FC<FirstLaunchScreenProps> = ({ onComplete }) => {
  const [hasQuit, setHasQuit] = useState(false);

  const handleAccept = () => {
    try {
      localStorage.setItem('filant_terms_accepted', 'true');
      localStorage.setItem('filant_has_selected_profile', 'true');
    } catch (e) {
      console.warn("Could not write to localStorage:", e);
    }
    onComplete();
  };

  const handleQuit = () => {
    setHasQuit(true);
    try {
      CapApp.exitApp();
    } catch (e) {}
    try {
      window.close();
    } catch (e) {}
  };

  if (hasQuit) {
    return (
      <div className="fixed inset-0 z-[1000] bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-6">
            <XCircle className="w-10 h-10 text-red-500 animate-pulse" />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white mb-3">
            Accès non autorisé
          </h2>

          <p className="text-sm text-slate-300 font-medium leading-relaxed mb-8">
            Vous avez choisi de quitter la plateforme. Pour pouvoir accéder aux opportunités et services de <strong className="text-orange-400">FILANT°225</strong>, vous devez lire et accepter les conditions générales d'utilisation.
          </p>

          <button
            onClick={() => setHasQuit(false)}
            className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Consulter et accepter les conditions
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-orange-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Main Scrollable Window */}
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 md:px-8 relative scrollbar-thin scrollbar-thumb-slate-700">
        <div className="max-w-2xl mx-auto space-y-6 pb-28">

          {/* Header Brand Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between border-b border-slate-800 pb-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-2xl p-0.5 shadow-lg shadow-orange-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-orange-500 block">Plateforme Officielle</span>
                <h1 className="text-xl font-black text-white tracking-tight">FILANT°225</h1>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-full flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-bold text-slate-300">CGU v1.0</span>
            </div>
          </motion.div>

          {/* Welcome Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl relative overflow-hidden"
          >
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
              Bienvenue sur <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">FILANT°225</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed mb-4">
              Bienvenue sur <strong>FILANT°225</strong>, une plateforme ivoirienne de mise en relation entre les travailleurs, les propriétaires d'équipements, les agences immobilières, les entreprises et les clients.
            </p>

            <p className="text-sm sm:text-base text-slate-300/90 font-normal leading-relaxed">
              Notre mission est de faciliter la recherche de services, d'opportunités professionnelles et de partenaires grâce à une plateforme simple, rapide et accessible.
            </p>
          </motion.div>

          {/* Conditions Générales Card */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-slate-800/60 border border-slate-700/60 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-tight">Conditions générales</h3>
                <p className="text-xs text-slate-400 font-medium">Cadre d'utilisation & engagements</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-bold uppercase tracking-wider text-amber-400">
              En utilisant FILANT°225, vous reconnaissez et acceptez les conditions suivantes :
            </p>

            <ul className="space-y-3.5">
              {termsPoints.map((point, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 + index * 0.04 }}
                  className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/50 p-3.5 rounded-2xl border border-slate-700/40 hover:border-orange-500/30 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>

            {/* Confirmation Box */}
            <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-500/30 rounded-2xl p-4 text-center">
              <p className="text-xs sm:text-sm font-bold text-amber-300 leading-relaxed">
                En cliquant sur « J'accepte », vous confirmez avoir lu et accepté ces conditions d'utilisation.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 p-4 sm:p-6 shadow-2xl relative z-10">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAccept}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-500/25 active:scale-95 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>J'accepte</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleQuit}
            className="sm:w-36 py-3.5 px-6 bg-slate-900 hover:bg-red-500/10 text-slate-400 hover:text-red-400 font-bold text-xs uppercase tracking-wider rounded-2xl border border-slate-800 hover:border-red-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <XCircle className="w-4 h-4" />
            <span>Quitter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstLaunchScreen;
