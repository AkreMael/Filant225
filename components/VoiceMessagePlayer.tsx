import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Mic, Volume2, Sparkles, Download, Check, AlertCircle, HardDrive } from 'lucide-react';
import { localAudioStorage } from '../services/localAudioStorage';

interface VoiceMessagePlayerProps {
  messageId?: string;
  audioUrl: string;
  audioDuration?: number;
  transcription?: string;
  isMe: boolean;
  timestamp: number;
}

// Global variable to keep track of currently active audio player instance
let globalActiveAudio: HTMLAudioElement | null = null;
let globalSetActivePlayer: ((active: boolean) => void) | null = null;

export const VoiceMessagePlayer: React.FC<VoiceMessagePlayerProps> = ({
  messageId,
  audioUrl,
  audioDuration = 0,
  transcription,
  isMe,
  timestamp
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(audioDuration || 0);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [showTranscription, setShowTranscription] = useState<boolean>(true);
  const [isAudioLoading, setIsAudioLoading] = useState<boolean>(false);

  // Local device storage states
  const [isDownloadedLocally, setIsDownloadedLocally] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [effectiveAudioSrc, setEffectiveAudioSrc] = useState<string>('');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const effectiveId = messageId || audioUrl;

  // 1. Check if audio exists in local phone storage (IndexedDB) or initialize download
  useEffect(() => {
    let isMounted = true;

    const checkLocalCache = async () => {
      if (!audioUrl) return;

      // If it's already a blob URL (e.g. freshly recorded on this device)
      if (audioUrl.startsWith('blob:')) {
        if (isMounted) {
          setIsDownloadedLocally(true);
          setEffectiveAudioSrc(audioUrl);
        }
        return;
      }

      // Check IndexedDB
      const cachedUrl = await localAudioStorage.getLocalPlayableUrl(effectiveId, audioUrl);
      if (!isMounted) return;

      if (cachedUrl) {
        setIsDownloadedLocally(true);
        setEffectiveAudioSrc(cachedUrl);
      } else {
        // Auto-download to phone storage in the background with indicator
        setIsDownloading(true);
        setDownloadProgress(10);
        
        const result = await localAudioStorage.downloadAndStoreLocally(
          effectiveId,
          audioUrl,
          (progress) => {
            if (isMounted) setDownloadProgress(progress);
          }
        );

        if (!isMounted) return;

        if (result && result.localUrl) {
          setIsDownloadedLocally(true);
          setIsDownloading(false);
          setEffectiveAudioSrc(result.localUrl);
        } else {
          setIsDownloading(false);
          // Fallback to direct network audio URL if offline/error
          setEffectiveAudioSrc(audioUrl);
        }
      }
    };

    checkLocalCache();

    return () => {
      isMounted = false;
    };
  }, [effectiveId, audioUrl]);

  // 2. Setup HTML5 Audio element
  useEffect(() => {
    if (!effectiveAudioSrc) return;

    const audio = new Audio();
    audio.src = effectiveAudioSrc;
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
  }, [effectiveAudioSrc, audioDuration]);

  // Manual download trigger if needed
  const handleManualDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloading || isDownloadedLocally) return;

    setIsDownloading(true);
    setDownloadError(null);

    const result = await localAudioStorage.downloadAndStoreLocally(
      effectiveId,
      audioUrl,
      (progress) => setDownloadProgress(progress)
    );

    setIsDownloading(false);
    if (result && result.localUrl) {
      setIsDownloadedLocally(true);
      setEffectiveAudioSrc(result.localUrl);
    } else {
      setDownloadError("Échec");
    }
  };

  // Toggle play/pause
  const togglePlay = async () => {
    // If not yet downloaded locally and no source, download first then play
    if (!effectiveAudioSrc && !isDownloadedLocally) {
      setIsDownloading(true);
      const result = await localAudioStorage.downloadAndStoreLocally(
        effectiveId,
        audioUrl,
        (progress) => setDownloadProgress(progress)
      );
      setIsDownloading(false);
      if (result && result.localUrl) {
        setIsDownloadedLocally(true);
        setEffectiveAudioSrc(result.localUrl);
      }
      return;
    }

    if (!audioRef.current) return;

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
    <div className="flex flex-col gap-1.5 w-full select-none">
      {/* WhatsApp Voice Note Card */}
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

        {/* Play/Pause or Download Button */}
        {isDownloading ? (
          <div className="w-10 h-10 rounded-full flex flex-col items-center justify-center shrink-0 bg-black/10 dark:bg-white/10 text-[#00a884] relative" title="Téléchargement local sur le téléphone...">
            <div className="w-5 h-5 border-2 border-[#00a884] border-t-transparent rounded-full animate-spin" />
            <span className="text-[8px] font-black mt-0.5 text-slate-600 dark:text-slate-300">{downloadProgress > 0 ? `${downloadProgress}%` : ''}</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={togglePlay}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all shadow-sm active:scale-90 cursor-pointer ${
              isMe 
                ? 'bg-black/10 dark:bg-white/15 text-slate-900 dark:text-white hover:bg-black/15 dark:hover:bg-white/20' 
                : 'bg-[#00a884] text-white hover:bg-[#008f72]'
            }`}
            title={isPlaying ? 'Pause' : 'Écouter le vocal'}
          >
            {isAudioLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause size={18} className="fill-current" />
            ) : (
              <Play size={18} className="fill-current translate-x-0.5" />
            )}
          </button>
        )}

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

          {/* Time, Local Storage Badge & Speed indicators */}
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300 opacity-90 px-0.5">
            <div className="flex items-center gap-1.5">
              <span>
                {isPlaying ? formatTime(currentTime) : formatTime(duration || 0)}
              </span>

              {/* Local Storage Indicator */}
              {isDownloadedLocally && (
                <span 
                  className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-full"
                  title="Enregistré dans le stockage local du téléphone"
                >
                  <Check size={9} strokeWidth={3} />
                  <span>Local</span>
                </span>
              )}
            </div>

            {/* Playback speed switcher */}
            <button
              type="button"
              onClick={cyclePlaybackRate}
              className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 cursor-pointer ${
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

      {/* Automatic Voice Transcription Block */}
      {transcription && transcription.trim().length > 0 && (
        <div className={`mt-0.5 pt-1.5 border-t ${
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
