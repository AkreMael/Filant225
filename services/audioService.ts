
class AudioService {
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;

  /**
   * Lit le texte à haute voix en utilisant la synthèse vocale native du navigateur.
   * Filtre les astérisques pour une lecture plus naturelle.
   * @param text Le texte à lire
   * @param onStart Callback au début de la lecture
   * @param onEnd Callback au début de la fin de lecture
   */
  speak(text: string, onStart?: () => void, onEnd?: () => void): void {
    if (!this.synth) return;
    this.synth.cancel();

    // Suppression des astérisques (*) pour que la voix ne les prononce pas
    const cleanText = text.replace(/\*/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-FR';
    utterance.rate = 1.0; // Vitesse professionnelle
    utterance.pitch = 1.0;

    if (onStart) utterance.onstart = onStart;
    if (onEnd) utterance.onend = onEnd;

    // Tentative de sélection d'une voix française de meilleure qualité si disponible
    const voices = this.synth.getVoices();
    const frVoice = voices.find(v => v.lang.startsWith('fr') && v.name.includes('Google')) || 
                   voices.find(v => v.lang.startsWith('fr'));
    
    if (frVoice) {
      utterance.voice = frVoice;
    }

    this.synth.speak(utterance);
  }

  cancel(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Convertit un Blob audio en chaîne Base64 avec Data URL
   */
  async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Envoie le vocal audio vers l'API Gemini pour transcription automatique en texte
   */
  async transcribeAudio(audioBase64: string, mimeType: string = 'audio/webm'): Promise<string> {
    try {
      const response = await fetch('/api/transcribe-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          audioBase64,
          mimeType
        })
      });

      if (!response.ok) {
        console.warn('Transcription API returned status:', response.status);
        return '';
      }

      const data = await response.json();
      return (data.transcription || '').trim();
    } catch (error) {
      console.error('Audio transcription error:', error);
      return '';
    }
  }

  // Gardé pour compatibilité de signature si nécessaire ailleurs, mais n'utilise plus d'API
  async getAudioUrl(text: string): Promise<string> {
    console.warn("getAudioUrl est déprécié, utilisez audioService.speak pour le vocal local.");
    return "";
  }
}

export const audioService = new AudioService();

