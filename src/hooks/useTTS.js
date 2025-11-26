// useTTS.js - Custom React Hook for Text-to-Speech
import { useState, useEffect, useCallback, useRef } from 'react';

export const useTTS = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [settings, setSettings] = useState({
    voice: null,
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8,
    autoSpeak: true
  });
  
  const utteranceRef = useRef(null);
  const queueRef = useRef([]);
  const isProcessingRef = useRef(false);

  // Initialize TTS support and voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      const updateVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Auto-select best voice for Ayurvedic content (prefer female, English)
        if (availableVoices.length > 0 && !settings.voice) {
          const preferredVoice = availableVoices.find(voice => 
            voice.lang.startsWith('en') && 
            (voice.name.includes('Female') || voice.name.includes('Zira') || voice.name.includes('Samantha'))
          ) || availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];
          
          setSettings(prev => ({ ...prev, voice: preferredVoice }));
        }
      };

      updateVoices();
      speechSynthesis.onvoiceschanged = updateVoices;
      
      return () => {
        speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  // Process speech queue
  const processQueue = useCallback(() => {
    if (isProcessingRef.current || queueRef.current.length === 0) return;
    
    isProcessingRef.current = true;
    const { text, options } = queueRef.current.shift();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = options.voice || settings.voice;
    utterance.rate = options.rate || settings.rate;
    utterance.pitch = options.pitch || settings.pitch;
    utterance.volume = options.volume || settings.volume;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      isProcessingRef.current = false;
      utteranceRef.current = null;
      // Process next item in queue
      setTimeout(processQueue, 100);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      isProcessingRef.current = false;
      utteranceRef.current = null;
      setTimeout(processQueue, 100);
    };
    
    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [settings]);

  // Main speak function - automatically queues and speaks text
  const speakText = useCallback((text, options = {}) => {
    if (!isSupported || !text?.trim()) return;
    
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
    
    // Add to queue
    queueRef.current.push({
      text: cleanText,
      options: { ...settings, ...options }
    });
    
    // Start processing if not already processing
    processQueue();
  }, [isSupported, settings, processQueue]);

  // Auto-speak function for chatbot responses
  const autoSpeakResponse = useCallback((responseText) => {
    if (!settings.autoSpeak || !responseText?.trim()) return;
    
    // Add slight delay to ensure DOM is updated
    setTimeout(() => {
      speakText(responseText);
    }, 500);
  }, [speakText, settings.autoSpeak]);

  // Stop all speech
  const stopSpeech = useCallback(() => {
    speechSynthesis.cancel();
    queueRef.current = [];
    isProcessingRef.current = false;
    utteranceRef.current = null;
    setIsSpeaking(false);
  }, []);

  // Pause/Resume speech
  const pauseSpeech = useCallback(() => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
    }
  }, []);

  const resumeSpeech = useCallback(() => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  }, []);

  // Update settings
  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return {
    isSupported,
    isSpeaking,
    voices,
    settings,
    speakText,
    autoSpeakResponse, // This is the key function for automatic speech
    stopSpeech,
    pauseSpeech,
    resumeSpeech,
    updateSettings
  };
};