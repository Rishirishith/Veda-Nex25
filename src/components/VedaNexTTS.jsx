import React, { useState, useEffect, useRef } from 'react';

/**
 * VedaNex TTS React Component
 * Text-to-Speech feature for Ayurvedic content in Next.js/React
 */

const VedaNexTTS = ({ 
  autoEnhanceChat = true, 
  position = 'bottom-right',
  showInlineButtons = true,
  theme = 'auto' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [voices, setVoices] = useState([]);
  const [currentVoice, setCurrentVoice] = useState(null);
  const [settings, setSettings] = useState({
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8,
    lang: 'en-US'
  });

  const synth = useRef(null);
  const currentUtterance = useRef(null);
  const notificationTimer = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synth.current = window.speechSynthesis;
      loadVoices();
      
      // Listen for voices changed event
      if (synth.current.onvoiceschanged !== undefined) {
        synth.current.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (synth.current) {
        synth.current.cancel();
      }
      if (notificationTimer.current) {
        clearTimeout(notificationTimer.current);
      }
    };
  }, []);

  const loadVoices = () => {
    if (!synth.current) return;
    
    const availableVoices = synth.current.getVoices();
    setVoices(availableVoices);

    // Prefer female voices for Ayurvedic content
    const preferredVoices = [
      'Google UK English Female',
      'Microsoft Zira - English (United States)',
      'Alex',
      'Samantha',
      'Karen',
      'Moira'
    ];

    let selectedVoice = null;
    for (const voiceName of preferredVoices) {
      const voice = availableVoices.find(v => 
        v.name.includes(voiceName) || 
        (v.name.toLowerCase().includes('female') && v.lang.startsWith('en'))
      );
      if (voice) {
        selectedVoice = voice;
        break;
      }
    }

    if (!selectedVoice) {
      selectedVoice = availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
    }

    setCurrentVoice(selectedVoice);
  };

  const cleanTextForSpeech = (text) => {
    return text
      .replace(/[^\w\s.,!?;:()\-'"]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/([.!?])\s*([A-Z])/g, '$1 $2')
      .trim();
  };

  const speakText = (text, options = {}) => {
    if (!text || text.trim() === '' || !synth.current) {
      showNotification('No text to speak', 'warning');
      return;
    }

    // Stop any current speech
    stopSpeech();

    const cleanText = cleanTextForSpeech(text);
    currentUtterance.current = new SpeechSynthesisUtterance(cleanText);

    // Apply settings
    currentUtterance.current.rate = options.rate || settings.rate;
    currentUtterance.current.pitch = options.pitch || settings.pitch;
    currentUtterance.current.volume = options.volume || settings.volume;
    currentUtterance.current.lang = options.lang || settings.lang;

    if (currentVoice) {
      currentUtterance.current.voice = currentVoice;
    }

    // Event listeners
    currentUtterance.current.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      showNotification('Speaking...', 'success');
    };

    currentUtterance.current.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      showNotification('Speech completed', 'info');
    };

    currentUtterance.current.onerror = (event) => {
      setIsPlaying(false);
      setIsPaused(false);
      showNotification('Speech error: ' + event.error, 'error');
    };

    currentUtterance.current.onpause = () => {
      setIsPaused(true);
    };

    currentUtterance.current.onresume = () => {
      setIsPaused(false);
    };

    synth.current.speak(currentUtterance.current);
  };

  const pauseSpeech = () => {
    if (synth.current && synth.current.speaking && !synth.current.paused) {
      synth.current.pause();
    }
  };

  const resumeSpeech = () => {
    if (synth.current && synth.current.paused) {
      synth.current.resume();
    }
  };

  const stopSpeech = () => {
    if (synth.current && synth.current.speaking) {
      synth.current.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleMainButtonClick = () => {
    if (isPlaying) {
      if (isPaused) {
        resumeSpeech();
      } else {
        pauseSpeech();
      }
    } else {
      setShowControls(!showControls);
    }
  };

  const enableTextSelection = () => {
    showNotification('Select any text on the page and it will be read aloud', 'info');
    setShowControls(false);
    
    const handleSelection = () => {
      const selectedText = window.getSelection().toString();
      if (selectedText.length > 0) {
        speakText(selectedText);
      }
    };

    const cleanup = () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);

    // Auto cleanup after 10 seconds
    setTimeout(cleanup, 10000);
  };

  const showNotification = (message, type = 'info') => {
    // This would typically use a toast notification library in a real React app
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const getPositionStyles = () => {
    const positions = {
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' },
    };
    return positions[position] || positions['bottom-right'];
  };

  const buttonIcon = () => {
    if (isPlaying && !isPaused) {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V6l8 6-8 6z"/>
          <path d="M16 6v12"/>
          <path d="M21 9v6"/>
        </svg>
      );
    }
  };

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null; // Don't render on server or unsupported browsers
  }

  return (
    <>
      <div className="vedanex-tts-panel" style={getPositionStyles()}>
        <button
          className={`tts-main-button ${isPlaying ? 'playing' : ''}`}
          onClick={handleMainButtonClick}
          title={isPlaying ? (isPaused ? 'Resume Speech' : 'Pause Speech') : 'Text to Speech'}
        >
          {buttonIcon()}
        </button>

        {showControls && (
          <div className="tts-controls">
            <div className="tts-control-item">
              <label>Speed:</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.rate}
                onChange={(e) => updateSetting('rate', parseFloat(e.target.value))}
              />
              <span>{settings.rate}x</span>
            </div>

            <div className="tts-control-item">
              <label>Pitch:</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.pitch}
                onChange={(e) => updateSetting('pitch', parseFloat(e.target.value))}
              />
              <span>{settings.pitch}</span>
            </div>

            <div className="tts-control-item">
              <label>Volume:</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.volume}
                onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
              />
              <span>{Math.round(settings.volume * 100)}%</span>
            </div>

            <button className="tts-select-text-btn" onClick={enableTextSelection}>
              Select Text to Read
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .vedanex-tts-panel {
          position: fixed;
          z-index: 10000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .tts-main-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #107c0d, #0d5d0a);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(16, 124, 13, 0.3);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .tts-main-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(16, 124, 13, 0.4);
        }

        .tts-main-button:active {
          transform: scale(0.95);
        }

        .tts-main-button.playing {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 124, 13, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(16, 124, 13, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 124, 13, 0); }
        }

        .tts-main-button svg {
          width: 24px;
          height: 24px;
        }

        .tts-controls {
          position: absolute;
          bottom: 70px;
          right: 0;
          background: #107c0d;
          border-radius: 12px;
          padding: 15px;
          min-width: 250px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tts-control-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          color: white;
          font-size: 14px;
        }

        .tts-control-item label {
          width: 60px;
          font-weight: 500;
        }

        .tts-control-item input[type="range"] {
          flex: 1;
          margin: 0 10px;
          accent-color: white;
        }

        .tts-control-item span {
          width: 40px;
          text-align: right;
          font-size: 12px;
          opacity: 0.9;
        }

        .tts-select-text-btn {
          width: 100%;
          padding: 8px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          color: white;
          cursor: pointer;
          font-size: 12px;
          margin-top: 5px;
          transition: background 0.2s ease;
        }

        .tts-select-text-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          .tts-main-button {
            width: 50px;
            height: 50px;
          }
          
          .tts-controls {
            min-width: 200px;
            right: -150px;
          }
        }
      `}</style>
    </>
  );
};

// Inline TTS Button Component
export const TTSInlineButton = ({ text, children, className = '', ...props }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.vedanexTTS) {
      window.vedanexTTS.speakText(text);
    } else if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      className={`tts-inline-btn ${className}`}
      onClick={handleClick}
      title="Listen to this text"
      {...props}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="11 19 2 12 11 5 11 19"></polygon>
        <polygon points="22 19 13 12 22 5 22 19"></polygon>
      </svg>
      {children || 'Listen'}
      
      <style jsx>{`
        .tts-inline-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 8px;
          background: #f8f9fa;
          border: 1px solid #ddd;
          border-radius: 4px;
          color: #333;
          cursor: pointer;
          font-size: 12px;
          margin-left: 8px;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .tts-inline-btn:hover {
          background: #107c0d;
          color: white;
          border-color: #107c0d;
        }

        .tts-inline-btn svg {
          width: 14px;
          height: 14px;
        }
      `}</style>
    </button>
  );
};

// Hook for TTS functionality
export const useTTS = () => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  const speak = (text, options = {}) => {
    if (!isSupported || !text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 0.8;
    utterance.lang = options.lang || 'en-US';

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (isSupported) {
      window.speechSynthesis.cancel();
    }
  };

  const pause = () => {
    if (isSupported && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  };

  const resume = () => {
    if (isSupported && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };

  return {
    speak,
    stop,
    pause,
    resume,
    isSupported
  };
};

export default VedaNexTTS;