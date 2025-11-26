// hooks/useTTS.js - Complete TTS Hook with Automatic Triggering
import { useState, useEffect, useCallback, useRef } from 'react';

export const useTTS = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [settings, setSettings] = useState({
    voiceName: '',
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8,
    autoSpeak: true
  });

  const currentUtteranceRef = useRef(null);
  const lastSpokenMessageRef = useRef(null);

  // Initialize TTS and voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);

      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);

        // Auto-select preferred voice (female English voice for wellness content)
        if (availableVoices.length > 0 && !settings.voiceName) {
          const preferredVoice = availableVoices.find(voice => 
            voice.lang.startsWith('en') && 
            (voice.name.toLowerCase().includes('female') || 
             voice.name.toLowerCase().includes('zira') ||
             voice.name.toLowerCase().includes('samantha') ||
             voice.name.toLowerCase().includes('karen'))
          ) || availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];

          setSettings(prev => ({ ...prev, voiceName: preferredVoice.name }));
        }
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        speechSynthesis.onvoiceschanged = null;
        if (currentUtteranceRef.current) {
          speechSynthesis.cancel();
        }
      };
    }
  }, []);

  // Core speakText function
  const speakText = useCallback((text, voiceName = null, rate = null, pitch = null) => {
    if (!isSupported || !text?.trim()) {
      console.warn('TTS not supported or invalid text:', text);
      return;
    }

    // Stop any current speech
    speechSynthesis.cancel();
    setIsSpeaking(false);

    // Clean text for better speech
    const cleanText = text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
      .replace(/\*(.*?)\*/g, '$1') // Remove markdown italic
      .replace(/`(.*?)`/g, '$1') // Remove code blocks
      .replace(/\n+/g, '. ') // Replace newlines with pauses
      .replace(/([.!?])\s*([A-Z])/g, '$1 $2') // Add pauses between sentences
      .trim();

    if (!cleanText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Set voice
      const selectedVoice = voices.find(voice => 
        voice.name === (voiceName || settings.voiceName)
      );
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      // Set speech parameters
      utterance.rate = rate || settings.rate;
      utterance.pitch = pitch || settings.pitch;
      utterance.volume = settings.volume;

      // Event handlers
      utterance.onstart = () => {
        setIsSpeaking(true);
        console.log('🔊 TTS Started:', cleanText.substring(0, 50) + '...');
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
        console.log('✅ TTS Completed');
      };

      utterance.onerror = (event) => {
        setIsSpeaking(false);
        currentUtteranceRef.current = null;
        console.error('❌ TTS Error:', event.error);
      };

      // Store reference and speak
      currentUtteranceRef.current = utterance;
      speechSynthesis.speak(utterance);

    } catch (error) {
      console.error('TTS Error:', error);
      setIsSpeaking(false);
    }
  }, [isSupported, voices, settings]);

  // Auto-speak function for chatbot messages
  const autoSpeakMessage = useCallback((message) => {
    if (!settings.autoSpeak || !message?.text) return;

    // Prevent speaking the same message twice
    const messageId = message.id || message.text;
    if (lastSpokenMessageRef.current === messageId) return;

    lastSpokenMessageRef.current = messageId;
    
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      speakText(message.text);
    }, 300);
  }, [speakText, settings.autoSpeak]);

  // Stop speech
  const stopSpeech = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    currentUtteranceRef.current = null;
    lastSpokenMessageRef.current = null;
  }, []);

  // Update settings
  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return {
    isSupported,
    voices,
    isSpeaking,
    settings,
    speakText,
    autoSpeakMessage,
    stopSpeech,
    updateSettings
  };
};