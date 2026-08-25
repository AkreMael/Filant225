import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, MapPin, ShieldCheck, Users, Briefcase, Zap, CheckCircle2 } from 'lucide-react';

interface WorkerSearchLoadingAnimationProps {
  searchTerm?: string;
  category?: string;
  variant?: 'full' | 'inline' | 'skeleton-only' | 'radar-only';
  message?: string;
  itemCount?: number;
}

const SEARCH_STEPS = [
  {
    icon: Search,
    title: "Recherche des professionnels qualifiés...",
    subtitle: "Filtrage selon vos critères et compétences recherchées"
  },
  {
    icon: ShieldCheck,
    title: "Vérification des profils certifiés...",
    subtitle: "Contrôle des identités et des garanties de service"
  },
  {
    icon: MapPin,
    title: "Localisation des prestataires à proximité...",
    subtitle: "Optimisation de la proximité géographique en Côte d'Ivoire"
  },
  {
    icon: Zap,
    title: "Scan des disponibilités en direct...",
    subtitle: "Prise de contact instantanée et mise en relation rapide"
  }
];

export const WorkerSearchLoadingAnimation: React.FC<WorkerSearchLoadingAnimationProps> = ({
  searchTerm = '',
  category = 'Disponible',
  variant = 'full',
  message,
  itemCount = 3
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % SEARCH_STEPS.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const currentStep = SEARCH_STEPS[stepIndex];
  const StepIcon = currentStep.icon;

  // Radar / Scanner view
  const renderRadarView = () => (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-white dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900 rounded-[2.5rem] p-6 sm:p-8 border-2 border-orange-500/30 shadow-xl flex flex-col items-center justify-center text-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-400/15 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-400/15 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Central Radar Pulse Animation */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-6">
        {/* Concentric expanding ripples */}
        <motion.div
          animate={{
            scale: [0.8, 1.8],
            opacity: [0.8, 0]
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute inset-0 rounded-full border-2 border-orange-500/40 bg-orange-500/5"
        />
        <motion.div
          animate={{
            scale: [0.8, 2.2],
            opacity: [0.6, 0]
          }}
          transition={{
            duration: 2.4,
            delay: 0.8,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute inset-0 rounded-full border-2 border-emerald-500/30 bg-emerald-500/5"
        />
        <motion.div
          animate={{
            scale: [0.8, 2.6],
            opacity: [0.4, 0]
          }}
          transition={{
            duration: 2.4,
            delay: 1.6,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute inset-0 rounded-full border border-orange-400/20"
        />

        {/* Sweeping Radar Beam */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full pointer-events-none overflow-hidden"
        >
          <div className="w-1/2 h-1/2 origin-bottom-right bg-gradient-to-br from-orange-500/40 via-orange-500/10 to-transparent rounded-tl-full" />
        </motion.div>

        {/* Orbiting Worker Icons */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white dark:bg-slate-800 shadow-md border border-orange-300 flex items-center justify-center">
            <Briefcase className="w-3.5 h-3.5 text-orange-600" />
          </div>
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-slate-800 shadow-md border border-emerald-300 flex items-center justify-center">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white dark:bg-slate-800 shadow-md border border-blue-300 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-7 h-7 rounded-full bg-white dark:bg-slate-800 shadow-md border border-amber-300 flex items-center justify-center">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
          </div>
        </motion.div>

        {/* Center Orb with FILANT Brand Icon */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/40 flex flex-col items-center justify-center border-2 border-white/80 dark:border-slate-800"
        >
          <motion.div
            key={stepIndex}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <StepIcon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Dynamic Animated Status Text */}
      <div className="relative z-10 max-w-md w-full px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-1"
          >
            <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center justify-center gap-1.5">
              <span>{message || currentStep.title}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {searchTerm ? (
                <span>Filtrage pour <strong className="text-orange-600 dark:text-orange-400 font-extrabold">« {searchTerm} »</strong></span>
              ) : (
                currentStep.subtitle
              )}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Animated Progress Bar */}
        <div className="w-full bg-orange-100 dark:bg-slate-800 rounded-full h-1.5 mt-4 overflow-hidden relative">
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1/2 h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 rounded-full"
          />
        </div>

        {/* Live Badges */}
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span>Direct FILANT°225</span>
          </span>
          {category && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60">
              <Sparkles className="w-3 h-3 text-orange-500 shrink-0" />
              <span>{category}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // High-Fidelity Skeleton Card Matching WorkerCard
  const renderSkeletonCard = (key: number) => (
    <div
      key={key}
      className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-5 flex flex-col relative overflow-hidden shadow-md border-2 border-orange-200 dark:border-slate-800 animate-pulse"
    >
      {/* Top row */}
      <div className="flex gap-4">
        {/* Avatar skeleton */}
        <div className="w-24 h-24 rounded-3xl border-2 border-orange-200 dark:border-slate-700 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 overflow-hidden flex-shrink-0 relative">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
        </div>

        {/* Content skeleton */}
        <div className="flex-1 flex flex-col justify-start space-y-2.5 pt-1">
          {/* Title */}
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
          </div>

          {/* Rating stars */}
          <div className="flex gap-1 items-center">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3.5 h-3.5 bg-amber-100 dark:bg-amber-950/40 rounded-full" />
            ))}
            <div className="w-6 h-3 bg-slate-200 dark:bg-slate-700 rounded ml-1" />
          </div>

          {/* Description lines */}
          <div className="space-y-1.5 pt-0.5">
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-5/6" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-2/3" />
          </div>
        </div>
      </div>

      {/* 3 Action button skeletons */}
      <div className="flex items-stretch gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex-1 h-9 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40" />
        <div className="flex-1 h-9 rounded-2xl bg-orange-100 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/40" />
        <div className="flex-1 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40" />
      </div>

      {/* Top right status badge skeleton */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <div className="w-12 h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
      </div>
    </div>
  );

  if (variant === 'radar-only') {
    return renderRadarView();
  }

  if (variant === 'skeleton-only') {
    return (
      <div className="flex flex-col gap-5 w-full">
        {Array.from({ length: itemCount }).map((_, idx) => renderSkeletonCard(idx))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      {renderRadarView()}
      <div className="flex flex-col gap-4">
        {Array.from({ length: itemCount }).map((_, idx) => renderSkeletonCard(idx))}
      </div>
    </div>
  );
};

export default WorkerSearchLoadingAnimation;
