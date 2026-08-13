import React, { useState, useEffect, useCallback } from 'react';
import { WifiOff, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OfflineScreenProps {
  onRetry?: () => Promise<boolean> | boolean | void;
  isStandalone?: boolean;
}

export const OfflineScreen: React.FC<OfflineScreenProps> = ({ onRetry, isStandalone = false }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [checkStatus, setCheckStatus] = useState<'idle' | 'failed' | 'success'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const checkConnectivity = useCallback(async (): Promise<boolean> => {
    // 1. Check basic navigator status
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return false;
    }

    // 2. Perform a real lightweight fetch test with cache-busting
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      
      const response = await fetch(`/api/ping?_t=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
        signal: controller.signal
      }).catch(async () => {
        // Fallback to testing favicon or static root if /api/ping had issues
        return await fetch(`/favicon.ico?_t=${Date.now()}`, {
          method: 'HEAD',
          cache: 'no-store',
          signal: controller.signal
        });
      });

      clearTimeout(timeoutId);
      return !!(response && (response.ok || response.status === 200 || response.status === 304));
    } catch (e) {
      return false;
    }
  }, []);

  const handleRetry = async () => {
    if (isChecking) return;
    setIsChecking(true);
    setCheckStatus('idle');
    setStatusMessage('Vérification du réseau...');

    try {
      let isConnected = await checkConnectivity();

      if (!isConnected && onRetry) {
        // Allow custom retry callback to attempt reconnect
        const customResult = await Promise.resolve(onRetry());
        if (customResult === true) {
          isConnected = true;
        }
      }

      if (isConnected) {
        setCheckStatus('success');
        setStatusMessage('Connexion rétablie ! Rechargement...');
        setTimeout(() => {
          if (isStandalone || typeof window !== 'undefined') {
            window.location.reload();
          }
        }, 600);
      } else {
        setCheckStatus('failed');
        setStatusMessage('Connexion toujours indisponible. Veuillez vérifier votre réseau.');
        setTimeout(() => {
          setCheckStatus('idle');
          setStatusMessage('');
        }, 3500);
      }
    } catch (error) {
      setCheckStatus('failed');
      setStatusMessage('Impossible de contacter le serveur. Réessayez dans un instant.');
      setTimeout(() => {
        setCheckStatus('idle');
        setStatusMessage('');
      }, 3500);
    } finally {
      setIsChecking(false);
    }
  };

  // Auto-listen to window online event
  useEffect(() => {
    const handleOnline = async () => {
      setStatusMessage('Réseau détecté, vérification...');
      setIsChecking(true);
      const isConnected = await checkConnectivity();
      if (isConnected) {
        setCheckStatus('success');
        setStatusMessage('Connexion rétablie !');
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }, 500);
      } else {
        setIsChecking(false);
        setStatusMessage('');
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [checkConnectivity]);

  return (
    <div 
      id="filant-offline-screen"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-between p-6 sm:p-8 bg-gradient-to-b from-[#f97316] via-[#ea580c] to-[#c2410c] text-white select-none overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* Top Brand Tag */}
      <div className="w-full flex items-center justify-between max-w-sm pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-white text-xs border border-white/30 shadow-sm">
            225
          </div>
          <span className="font-black tracking-widest text-sm text-white uppercase drop-shadow-sm">
            FILANT°225
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white/90">
          <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
          <span>Hors ligne</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md w-full my-auto px-2">
        {/* Wifi Off Icon Illustration */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative mb-8"
        >
          {/* Pulsing Backlight */}
          <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl transform scale-125 animate-pulse"></div>
          
          {/* Main Icon Container */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
            <WifiOff className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-md" strokeWidth={2.2} />
          </div>
          
          {/* Small Badge Indicator */}
          <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-red-600 border-2 border-white flex items-center justify-center shadow-lg animate-bounce">
            <span className="text-white font-black text-sm">!</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3 drop-shadow-sm"
        >
          Vérifiez votre connexion
        </motion.h1>

        {/* Secondary Description */}
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-white/90 text-sm sm:text-base font-semibold leading-relaxed max-w-xs sm:max-w-sm mb-8"
        >
          Une connexion Internet est nécessaire pour accéder à FILANT225.
        </motion.p>

        {/* Action Button: Réessayer */}
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="w-full max-w-xs flex flex-col items-center gap-3"
        >
          <button
            id="filant-retry-btn"
            onClick={handleRetry}
            disabled={isChecking}
            className={`w-full py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-wider shadow-[0_15px_30px_rgba(0,0,0,0.25)] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 ${
              isChecking 
                ? 'bg-white/80 text-orange-700 cursor-wait'
                : 'bg-white hover:bg-slate-50 text-orange-600 active:bg-orange-50'
            }`}
          >
            <RefreshCw 
              className={`w-5 h-5 ${isChecking ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} 
              strokeWidth={2.5}
            />
            <span>{isChecking ? 'Vérification...' : 'Réessayer'}</span>
          </button>

          {/* Feedback Status Alert */}
          <AnimatePresence>
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold w-full justify-center shadow-md backdrop-blur-md ${
                  checkStatus === 'failed' 
                    ? 'bg-red-700/90 text-white border border-red-400/40' 
                    : checkStatus === 'success'
                    ? 'bg-emerald-700/90 text-white border border-emerald-400/40'
                    : 'bg-black/30 text-white border border-white/20'
                }`}
              >
                {checkStatus === 'failed' && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                {checkStatus === 'success' && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
                <span>{statusMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="w-full max-w-sm flex flex-col items-center justify-center text-center pt-4 pb-2 border-t border-white/15">
        <p className="text-[11px] font-bold text-white/70 tracking-wider uppercase">
          FILANT°225 • Plateforme Sécurisée
        </p>
        <p className="text-[10px] text-white/50 mt-0.5">
          Vérifiez vos données mobiles ou votre signal Wi-Fi
        </p>
      </div>
    </div>
  );
};

export default OfflineScreen;
