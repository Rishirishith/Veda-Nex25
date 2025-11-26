// utils/tts.js - Standalone TTS Functions
/**
 * 🎯 PRODUCTION-READY TTS FUNCTIONS
 * Core speakText function and utilities for automatic text-to-speech
 */

// Global TTS state
let currentUtterance = null;
let lastSpokenMessageId = null;

/**
 * 🚀 MAIN FUNCTION: speakText
 * This is the reusable function you requested
 * 
 * @param {string} text - Text to speak
 * @param {string} voiceName - Optional voice name
 * @param {number} rate - Speech rate (0.5 to 2.0)
 * @param {number} pitch - Speech pitch (0.5 to 2.0)
 * @returns {Promise<void>}
 */
export function speakText(text, voiceName = null, rate = 0.9, pitch = 1.0) {
  return new Promise((resolve, reject) => {
    // Check browser support
    if (!('speechSynthesis' in window)) {
      console.warn('❌ Text-to-Speech not supported in this browser');
      reject(new Error('TTS not supported'));
      return;
    }

    // Validate input
    if (!text || typeof text !== 'string') {
      console.warn('❌ Invalid text provided for TTS');
      reject(new Error('Invalid text'));
      return;
    }

    // Stop any current speech
    speechSynthesis.cancel();

    // Clean text for better speech
    const cleanText = text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
      .replace(/\*(.*?)\*/g, '$1') // Remove markdown italic
      .replace(/`(.*?)`/g, '$1') // Remove code blocks
      .replace(/\n+/g, '. ') // Replace newlines with pauses
      .replace(/([.!?])\s*([A-Z])/g, '$1 $2') // Add pauses between sentences
      .trim();

    if (!cleanText) {
      reject(new Error('No valid text to speak'));
      return;
    }

    try {
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Get available voices
      const voices = speechSynthesis.getVoices();
      
      // Set voice
      if (voiceName && voices.length > 0) {
        const selectedVoice = voices.find(voice => voice.name === voiceName);
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
      } else if (voices.length > 0) {
        // Auto-select preferred voice for Ayurvedic content
        const preferredVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          (voice.name.toLowerCase().includes('female') || 
           voice.name.toLowerCase().includes('zira') ||
           voice.name.toLowerCase().includes('samantha'))
        ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        
        utterance.voice = preferredVoice;
      }

      // Set speech parameters
      utterance.rate = Math.max(0.5, Math.min(2.0, rate));
      utterance.pitch = Math.max(0.5, Math.min(2.0, pitch));
      utterance.volume = 0.8;

      // Event handlers
      utterance.onstart = () => {
        console.log('🔊 TTS Started:', cleanText.substring(0, 50) + '...');
      };

      utterance.onend = () => {
        console.log('✅ TTS Completed');
        currentUtterance = null;
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('❌ TTS Error:', event.error);
        currentUtterance = null;
        reject(new Error(`TTS Error: ${event.error}`));
      };

      // Store reference and speak
      currentUtterance = utterance;
      speechSynthesis.speak(utterance);

    } catch (error) {
      console.error('❌ TTS Exception:', error);
      reject(error);
    }
  });
}

/**
 * 🎯 AUTO-SPEAK FUNCTION FOR MESSAGES
 * Automatically speaks new messages with duplicate prevention
 * 
 * @param {Object} message - Message object with id and text
 * @param {Object} options - Optional TTS settings
 */
export function autoSpeakMessage(message, options = {}) {
  if (!message?.text) return;

  // Prevent speaking the same message twice
  const messageId = message.id || message.text;
  if (lastSpokenMessageId === messageId) return;

  lastSpokenMessageId = messageId;

  // Extract options
  const { voiceName, rate, pitch, delay = 300 } = options;

  // Add small delay to ensure DOM is updated
  setTimeout(() => {
    speakText(message.text, voiceName, rate, pitch)
      .catch(error => console.error('Auto-speak failed:', error));
  }, delay);
}

/**
 * 🛑 STOP SPEECH FUNCTION
 * Stops any current speech and clears state
 */
export function stopSpeech() {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    currentUtterance = null;
    lastSpokenMessageId = null;
    console.log('🔇 Speech stopped');
  }
}

/**
 * 🎤 GET AVAILABLE VOICES
 * Returns list of available voices for selection
 * 
 * @returns {Array} Array of voice objects
 */
export function getAvailableVoices() {
  if (!('speechSynthesis' in window)) return [];
  
  return speechSynthesis.getVoices();
}

/**
 * 🔍 CHECK TTS SUPPORT
 * Checks if TTS is supported in current browser
 * 
 * @returns {boolean} True if TTS is supported
 */
export function isTTSSupported() {
  return 'speechSynthesis' in window;
}

/**
 * 🎯 SMART MESSAGE FILTER
 * Determines if a message should be spoken based on content
 * 
 * @param {string} text - Message text
 * @param {Object} criteria - Filtering criteria
 * @returns {boolean} True if message should be spoken
 */
export function shouldSpeakMessage(text, criteria = {}) {
  const {
    minLength = 10,
    maxLength = 1000,
    excludePatterns = [],
    requireAyurvedic = false
  } = criteria;

  // Length check
  if (text.length < minLength || text.length > maxLength) {
    return false;
  }

  // Exclusion patterns
  if (excludePatterns.some(pattern => text.match(pattern))) {
    return false;
  }

  // Ayurvedic content check
  if (requireAyurvedic) {
    const ayurvedicKeywords = [
      'dosha', 'vata', 'pitta', 'kapha', 'ayurveda', 'ayurvedic',
      'triphala', 'turmeric', 'ginger', 'ashwagandha', 'pranayama',
      'meditation', 'herb', 'natural', 'holistic', 'wellness',
      'namaste', 'chakra', 'yoga', 'ojas', 'agni'
    ];

    const hasAyurvedicContent = ayurvedicKeywords.some(keyword =>
      text.toLowerCase().includes(keyword)
    );

    if (!hasAyurvedicContent) return false;
  }

  return true;
}

/**
 * 🔊 CURRENT SPEECH STATUS
 * Gets current TTS status
 * 
 * @returns {Object} Status object
 */
export function getSpeechStatus() {
  if (!('speechSynthesis' in window)) {
    return { supported: false, speaking: false, paused: false };
  }

  return {
    supported: true,
    speaking: speechSynthesis.speaking,
    paused: speechSynthesis.paused,
    pending: speechSynthesis.pending
  };
}

// Export default object for easier importing
export default {
  speakText,
  autoSpeakMessage,
  stopSpeech,
  getAvailableVoices,
  isTTSSupported,
  shouldSpeakMessage,
  getSpeechStatus
};