import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Mic, Volume2, Sparkles, Download, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { localAudioStorage } from '../services/localAudioStorage';

interface VoiceMessagePlayerProps {
  audioUrl?: string;
  audioDuration?: number;
  transcription?: string;
  isMe: boolean;
  timestamp: number;
  audioFileId?: string;
  messageId?: string;
}

// Global variable to keep track of currently active audio player instance
let globalActiveAudio: HTMLAudioElement | null = null;
let globalSetActivePlayer: ((active: boolean) => void) | null = null;

export const VoiceMessagePlayer: React.FC<VoiceMessagePlayerProps> = ({
  audioUrl,
  audioDuration = 0,
  transcription,
  isMe,
  timestamp,
  audioFileId,
  messageId
}) => {
  const fileKey = audioFileId || messageId || (audioUrl ? audioUrl.split('/').pop() || 'voice_note' : 'voice_note');

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(audioDuration || 0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);

  // Local device storage states
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadError, setDownloadError] = useState<boolean>(false);
  const [effectiveAudioUrl, setEffectiveAudioUrl] = useState<string>('');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 1. Initial local audio storage verification & auto-download
  const loadOrDownloadLocalAudio = useCallback(async () => {
    if (!fileKey && !audioUrl) return;

    try {
      // Check if already in device's IndexedDB
      const alreadyCached = await localAudioStorage.hasLocalAudio(fileKey);
      if (alreadyCached) {
        const localBlobUrl = await localAudioStorage.getLocalAudioUrl(fileKey);
        if (localBlobUrl) {
          setEffectiveAudioUrl(localBlobUrl);
          setIsDownloaded(true);
          setIsDownloading(false);
          setDownloadError(false);
          return;
        }
      }

      // If this is the sender's own message and audioUrl is already a blob URL
      if (audioUrl && audioUrl.startsWith('blob:')) {
        setEffectiveAudioUrl(audioUrl);
        setIsDownloaded(true);
        setIsDownloading(false);
        return;
      }

      // If audio is available on server / remote, download to local phone storage
      if (audioUrl) {
        setIsDownloading(true);
        setDownloadError(false);
        
        const localUrl = await localAudioStorage.downloadAndStoreLocally(fileKey, audioUrl, audioDuration);
        setEffectiveAudioUrl(localUrl);
        setIsDownloaded(true);
        setIsDownloading(false);
      }
    } catch (err) {
      console.warn("[VoiceMessagePlayer] Erreur téléchargement local:", err);
      // If download failed, fallback to the raw audioUrl if available
      if (audioUrl) {
        setEffectiveAudioUrl(audioUrl);
      }
      setIsDownloading(false);
      setDownloadError(true);
    }
  }, [fileKey, audioUrl, audioDuration]);

  useEffect(() => {
    loadOrDownloadLocalAudio();
  }, [loadOrDownloadLocalAudio]);

  // 2. Setup Audio instance with the effective local audio URL
  useEffect(() => {
    if (!effectiveAudioUrl) return;

    const audio = new Audio();
    audio.src = effectiveAudioUrl;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(Math.round(audio.duration));
      } else if (audioDuration > 0) {
        setDuration(audioDuration);
      }
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const onPlay = () => {
      setIsPlaying(true);
      setIsAudioLoading(false);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onWaiting = () => {
      setIsAudioLoading(true);
    };

    const onCanPlay = () => {
      setIsAudioLoading(false);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
      audio.pause();
      audio.src = '';
      if (globalActiveAudio === audio) {
        globalActiveAudio = null;
        globalSetActivePlayer = null;
      }
    };
  }, [effectiveAudioUrl, audioDuration]);

  // Toggle play/pause from local device
  const togglePlay = () => {
    if (!audioRef.current) {
      if (isDownloading) return;
      if (!effectiveAudioUrl) {
        loadOrDownloadLocalAudio();
        return;
      }
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Pause any previously playing audio instance
      if (globalActiveAudio && globalActiveAudio !== audioRef.current) {
        globalActiveAudio.pause();
        if (globalSetActivePlayer) {
          globalSetActivePlayer(false);
        }
      }

      globalActiveAudio = audioRef.current;
      globalSetActivePlayer = setIsPlaying;
      audioRef.current.playbackRate = playbackRate;
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('[VoicePlayer] Audio play failed:', err);
          setIsPlaying(false);
        });
      }
    }
  };

  // Change playback speed (1x -> 1.5x -> 2x -> 1x)
  const cyclePlaybackRate = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextRate = playbackRate === 1.0 ? 1.5 : playbackRate === 1.5 ? 2.0 : 1.0;
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  // Seek audio on click in waveform / progress bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = percentage * duration;
    audioRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  // Waveform bars simulation
  const waveformHeights = [
    25, 45, 75, 55, 30, 70, 90, 60, 40, 85, 100, 75, 45, 65, 80, 50, 35, 70, 85, 60,
    40, 65, 95, 75, 50, 30, 60, 80, 65, 45, 70, 90, 55, 35, 60, 75, 50, 40, 65, 80
  ];

  return (
    <div className="flex flex-col gap-2 w-full select-none">
      {/* Downloading indicator state (while downloading into local device storage) */}
      {isDownloading ? (
        <div className="flex items-center gap-3 py-2 px-1 min-w-[220px]">
          <div className="w-10 h-10 rounded-full bg-[#00a884]/20 flex items-center justify-center animate-spin text-[#00a884] shrink-0">
            <Loader2 size={20} />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <Download size={13} className="text-[#00a884] animate-bounce" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                Téléchargement du vocal...
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Enregistrement dans la mémoire locale
            </span>
          </div>
        </div>
      ) : downloadError && !effectiveAudioUrl ? (
        <div className="flex items-center justify-between gap-2 py-2 px-1 min-w-[220px]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
              <RefreshCw size={15} />
            </div>
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
              Échec téléchargement local
            </span>
          </div>
          <button
            type="button"
            onClick={loadOrDownloadLocalAudio}
            className="px-2.5 py-1 bg-[#00a884] text-white rounded-lg text-[10px] font-bold active:scale-95 shadow-sm"
          >
            Réessayer
          </button>
        </div>
      ) : (
        /* WhatsApp Voice Note Card (Ready to play from local device storage) */
        <div className="flex items-center gap-3 w-full py-1">
          {/* Avatar / Mic indicator with WhatsApp green ring */}
          <div className="relative shrink-0">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-transform ${
              isMe 
                ? 'bg-[#00a884] text-white' 
                : 'bg-emerald-600 dark:bg-emerald-500 text-white'
            }`}>
              <Mic size={20} className={isPlaying ? 'animate-pulse' : ''} />
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 ${
              isMe 
                ? 'bg-emerald-700 text-white border-[#d9fdd3] dark:border-[#005c4b]' 
                : 'bg-[#00a884] text-white border-white dark:border-[#202c33]'
            }`}>
              <Volume2 size={9} />
            </div>
          </div>

          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all shadow-sm active:scale-90 ${
              isMe 
                ? 'bg-black/10 dark:bg-white/15 text-slate-900 dark:text-white hover:bg-black/15 dark:hover:bg-white/20' 
                : 'bg-[#00a884] text-white hover:bg-[#008f72]'
            }`}
            title={isPlaying ? 'Pause' : 'Écouter le vocal depuis le stockage local'}
          >
            {isAudioLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause size={18} className="fill-current" />
            ) : (
              <Play size={18} className="fill-current translate-x-0.5" />
            )}
          </button>

          {/* Waveform & Timeline */}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            {/* Interactive Waveform Track */}
            <div 
              onClick={handleSeek}
              className="h-8 flex items-center gap-[2.5px] cursor-pointer group py-1 relative"
              title="Cliquer pour avancer"
            >
              {waveformHeights.map((h, i) => {
                const barPercent = (i / waveformHeights.length) * 100;
                const isFilled = barPercent <= progressPercent;

                return (
                  <div
                    key={i}
                    className="flex-1 rounded-full transition-all duration-75"
                    style={{
                      height: `${Math.max(15, h * 0.28)}px`,
                      backgroundColor: isFilled
                        ? (isMe ? '#128c7e' : '#00a884')
                        : (isMe ? 'rgba(0,0,0,0.18)' : 'rgba(100,116,139,0.3)'),
                    }}
                  />
                );
              })}
            </div>

            {/* Time & Speed indicators */}
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300 opacity-90 px-0.5">
              <span className="flex items-center gap-1.5">
                <span>{isPlaying ? formatTime(currentTime) : formatTime(duration || 0)}</span>
                {isDownloaded && (
                  <span className="inline-flex items-center gap-0.5 text-[8.5px] font-bold text-emerald-700 dark:text-emerald-400 opacity-80" title="Audio enregistré localement sur votre appareil">
                    <CheckCircle2 size={10} />
                    <span>Local</span>
                  </span>
                )}
              </span>

              {/* Playback speed switcher */}
              <button
                type="button"
                onClick={cyclePlaybackRate}
                className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${
                  playbackRate > 1.0 
                    ? 'bg-[#00a884] text-white shadow-xs' 
                    : 'bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-black/10'
                }`}
                title="Vitesse de lecture"
              >
                {playbackRate}x
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Automatic Voice Transcription Block */}
      {transcription && transcription.trim().length > 0 && (
        <div className={`mt-1 pt-2 border-t ${
          isMe 
            ? 'border-emerald-700/20 dark:border-emerald-300/20' 
            : 'border-slate-200 dark:border-slate-700/60'
        }`}>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
              isMe ? 'text-emerald-900 dark:text-emerald-200' : 'text-[#00a884] dark:text-[#00c99e]'
            }`}>
              <Sparkles size={11} className="shrink-0" />
              <span>Transcription vocale</span>
            </span>
          </div>

          <p className={`text-xs font-medium italic leading-relaxed break-words px-2.5 py-1.5 rounded-xl ${
            isMe 
              ? 'bg-black/5 dark:bg-black/20 text-slate-900 dark:text-slate-100' 
              : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700/40'
          }`}>
            « {transcription} »
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceMessagePlayer;
