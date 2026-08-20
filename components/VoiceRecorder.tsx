import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, Trash2, Send, AlertCircle } from 'lucide-react';

interface VoiceRecorderProps {
  onSendRecording: (audioBlob: Blob, durationSeconds: number, liveTranscription?: string) => Promise<void> | void;
  onRecordingStateChange?: (isRecording: boolean) => void;
  disabled?: boolean;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onSendRecording,
  onRecordingStateChange,
  disabled = false
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const liveTranscriptRef = useRef<string>('');
  const speechRecognitionRef = useRef<any>(null);
  const isStoppingRef = useRef<boolean>(false);
  const secondsCountRef = useRef<number>(0);
  const selectedMimeTypeRef = useRef<string>('audio/webm');

  // Notify parent component about recording state changes
  const updateRecordingState = useCallback((active: boolean) => {
    setIsRecording(active);
    if (onRecordingStateChange) {
      onRecordingStateChange(active);
    }
  }, [onRecordingStateChange]);

  // Clean up all streams and timers
  const cleanupStream = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
      } catch (e) {
        // ignore
      }
      streamRef.current = null;
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      speechRecognitionRef.current = null;
    }
  }, []);

  // Format recording timer: 0:00 -> 0:30
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Stop recording and send audio blob
  const stopAndSend = useCallback((forcedDuration?: number) => {
    if (isStoppingRef.current) return;
    isStoppingRef.current = true;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const duration = forcedDuration !== undefined ? forcedDuration : Math.max(1, secondsCountRef.current);
    const recorder = mediaRecorderRef.current;

    const finalizeAndSend = () => {
      const mime = selectedMimeTypeRef.current || 'audio/webm';
      const audioBlob = new Blob(audioChunksRef.current, { type: mime });
      const transcript = liveTranscriptRef.current;
      
      cleanupStream();
      setRecordingSeconds(0);
      secondsCountRef.current = 0;
      updateRecordingState(false);
      isStoppingRef.current = false;

      if (audioBlob.size > 0 || audioChunksRef.current.length > 0) {
        onSendRecording(audioBlob, duration, transcript);
      }
    };

    if (recorder && recorder.state !== 'inactive') {
      recorder.onstop = () => {
        finalizeAndSend();
      };
      try {
        recorder.stop();
      } catch (e) {
        finalizeAndSend();
      }
    } else {
      finalizeAndSend();
    }
  }, [cleanupStream, onSendRecording, updateRecordingState]);

  // Cancel recording and discard data
  const handleCancel = useCallback(() => {
    isStoppingRef.current = true;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.onstop = null;
      try {
        recorder.stop();
      } catch (e) {
        // ignore
      }
    }

    cleanupStream();
    setRecordingSeconds(0);
    secondsCountRef.current = 0;
    audioChunksRef.current = [];
    liveTranscriptRef.current = '';
    updateRecordingState(false);
    isStoppingRef.current = false;
  }, [cleanupStream, updateRecordingState]);

  // Start microphone recording
  const startRecording = async () => {
    setErrorMessage(null);
    audioChunksRef.current = [];
    liveTranscriptRef.current = '';
    setRecordingSeconds(0);
    secondsCountRef.current = 0;
    isStoppingRef.current = false;

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("L'enregistrement vocal n'est pas supporté par votre navigateur.");
      }

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
      } catch (micErr) {
        // Fallback with simpler audio constraints
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      streamRef.current = stream;

      // Select supported audio mime type
      let mimeType = 'audio/webm;codecs=opus';
      if (typeof MediaRecorder !== 'undefined') {
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'audio/webm';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = 'audio/mp4';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
              mimeType = 'audio/ogg;codecs=opus';
              if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = '';
              }
            }
          }
        }
      }

      selectedMimeTypeRef.current = mimeType || 'audio/webm';
      const options = mimeType ? { mimeType } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Optional Browser Speech Recognition for live transcription
      try {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRec) {
          const rec = new SpeechRec();
          rec.lang = 'fr-FR';
          rec.continuous = true;
          rec.interimResults = true;
          rec.onresult = (event: any) => {
            let current = '';
            for (let i = 0; i < event.results.length; i++) {
              current += event.results[i][0].transcript + ' ';
            }
            liveTranscriptRef.current = current.trim();
          };
          rec.start();
          speechRecognitionRef.current = rec;
        }
      } catch (e) {
        // Non-blocking
      }

      mediaRecorder.start(100); // 100ms chunks for smooth recording
      updateRecordingState(true);

      // Start 30-second interval timer
      let seconds = 0;
      timerRef.current = setInterval(() => {
        seconds += 1;
        secondsCountRef.current = seconds;
        setRecordingSeconds(seconds);

        // Automatic stop and send at 30 seconds
        if (seconds >= 30) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          stopAndSend(30);
        }
      }, 1000);

    } catch (err: any) {
      console.error("[VoiceRecorder] Microphone access error:", err);
      let msg = "Impossible d'accéder au microphone.";
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = "Veuillez autoriser l'accès au microphone dans votre navigateur.";
      }
      setErrorMessage(msg);
      cleanupStream();
      updateRecordingState(false);
    }
  };

  useEffect(() => {
    return () => {
      cleanupStream();
    };
  }, [cleanupStream]);

  if (!isRecording) {
    return (
      <div className="relative shrink-0">
        <button
          type="button"
          id="btn_start_voice_record"
          onClick={startRecording}
          disabled={disabled}
          className="w-11 h-11 rounded-full flex items-center justify-center bg-[#00a884] text-white hover:brightness-95 hover:shadow-lg transition-all active:scale-90 shadow-md shrink-0 disabled:bg-slate-300 dark:disabled:bg-slate-750 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer"
          title="Enregistrer un message vocal (max 30s)"
        >
          <Mic size={20} />
        </button>

        {errorMessage && (
          <div className="absolute bottom-14 right-0 z-50 bg-red-600 text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow-xl whitespace-nowrap flex items-center gap-1.5 animate-in fade-in">
            <AlertCircle size={14} className="shrink-0" />
            <span>{errorMessage}</span>
            <button 
              type="button" 
              onClick={() => setErrorMessage(null)} 
              className="ml-1 text-white/80 hover:text-white font-black"
            >
              ×
            </button>
          </div>
        )}
      </div>
    );
  }

  // Active WhatsApp Recording Bar Mode
  return (
    <div 
      id="voice_recording_active_bar"
      className="flex-1 flex items-center justify-between min-h-[44px] bg-white dark:bg-[#202c33] rounded-3xl px-3 py-1.5 border border-emerald-500/30 shadow-md animate-in fade-in duration-150"
    >
      {/* Delete / Cancel Button */}
      <button
        type="button"
        id="btn_cancel_voice_record"
        onClick={handleCancel}
        className="w-9 h-9 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all active:scale-90 shrink-0 cursor-pointer"
        title="Annuler l'enregistrement"
      >
        <Trash2 size={18} />
      </button>

      {/* Recording Status & Wave Animation */}
      <div className="flex items-center gap-2.5 px-2">
        {/* Pulsing Red Dot Indicator */}
        <div className="w-3 h-3 rounded-full bg-red-500 animate-ping shrink-0" />

        {/* Live Timer (0:00 / 0:30) */}
        <span className="text-xs font-black text-slate-800 dark:text-slate-100 font-mono tracking-wider min-w-[36px]">
          {formatTimer(recordingSeconds)}
        </span>

        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
          / 0:30 max
        </span>

        {/* Animated Waveform Bars */}
        <div className="hidden sm:flex items-center gap-1 h-5 px-1">
          <div className="w-1 bg-red-500 rounded-full animate-[bounce_0.6s_infinite_100ms] h-3" />
          <div className="w-1 bg-red-500 rounded-full animate-[bounce_0.6s_infinite_200ms] h-5" />
          <div className="w-1 bg-red-500 rounded-full animate-[bounce_0.6s_infinite_300ms] h-2" />
          <div className="w-1 bg-red-500 rounded-full animate-[bounce_0.6s_infinite_150ms] h-4" />
          <div className="w-1 bg-red-500 rounded-full animate-[bounce_0.6s_infinite_250ms] h-3" />
        </div>
      </div>

      {/* Send / Complete Button */}
      <button
        type="button"
        id="btn_send_voice_record"
        onClick={() => stopAndSend()}
        className="w-9 h-9 rounded-full flex items-center justify-center bg-[#00a884] text-white hover:brightness-95 shadow-md transition-all active:scale-90 shrink-0 cursor-pointer"
        title="Envoyer le vocal maintenant"
      >
        <Send size={16} />
      </button>
    </div>
  );
};

export default VoiceRecorder;
