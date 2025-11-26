// TTSControls.jsx - Control Panel Component
import React, { useState } from 'react';
import { useTTSContext } from '../context/TTSProvider';

const TTSControls = ({ className = '' }) => {
  const {
    isSupported,
    isSpeaking,
    voices,
    settings,
    stopSpeech,
    pauseSpeech,
    resumeSpeech,
    updateSettings
  } = useTTSContext();

  const [isExpanded, setIsExpanded] = useState(false);

  if (!isSupported) {
    return (
      <div className={`tts-controls ${className}`}>
        <div className="tts-error">
          🔇 Text-to-Speech not supported in this browser
        </div>
      </div>
    );
  }

  const handleVoiceChange = (e) => {
    const selectedVoice = voices.find(voice => voice.name === e.target.value);
    updateSettings({ voice: selectedVoice });
  };

  const handleSettingChange = (setting, value) => {
    updateSettings({ [setting]: value });
  };

  return (
    <div className={`tts-controls ${className}`}>
      {/* Floating Toggle Button */}
      <button 
        className={`tts-toggle ${isSpeaking ? 'speaking' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        title="Text-to-Speech Controls"
      >
        {isSpeaking ? '🔊' : '🎤'}
      </button>

      {/* Expanded Controls Panel */}
      {isExpanded && (
        <div className="tts-panel">
          <div className="tts-panel-header">
            <h4>🌿 Voice Controls</h4>
            <button 
              className="tts-close"
              onClick={() => setIsExpanded(false)}
            >
              ✕
            </button>
          </div>

          {/* Playback Controls */}
          <div className="tts-playback-controls">
            {isSpeaking ? (
              <>
                <button onClick={pauseSpeech} className="tts-btn">⏸️ Pause</button>
                <button onClick={resumeSpeech} className="tts-btn">▶️ Resume</button>
                <button onClick={stopSpeech} className="tts-btn stop">⏹️ Stop</button>
              </>
            ) : (
              <button onClick={stopSpeech} className="tts-btn">🔇 Clear Queue</button>
            )}
          </div>

          {/* Voice Selection */}
          <div className="tts-setting">
            <label>Voice:</label>
            <select 
              value={settings.voice?.name || ''} 
              onChange={handleVoiceChange}
              className="tts-select"
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Speed Control */}
          <div className="tts-setting">
            <label>Speed: {settings.rate.toFixed(1)}x</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.rate}
              onChange={(e) => handleSettingChange('rate', parseFloat(e.target.value))}
              className="tts-slider"
            />
          </div>

          {/* Pitch Control */}
          <div className="tts-setting">
            <label>Pitch: {settings.pitch.toFixed(1)}</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.pitch}
              onChange={(e) => handleSettingChange('pitch', parseFloat(e.target.value))}
              className="tts-slider"
            />
          </div>

          {/* Volume Control */}
          <div className="tts-setting">
            <label>Volume: {Math.round(settings.volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) => handleSettingChange('volume', parseFloat(e.target.value))}
              className="tts-slider"
            />
          </div>

          {/* Auto-speak Toggle */}
          <div className="tts-setting">
            <label className="tts-checkbox-label">
              <input
                type="checkbox"
                checked={settings.autoSpeak}
                onChange={(e) => handleSettingChange('autoSpeak', e.target.checked)}
                className="tts-checkbox"
              />
              Auto-speak bot responses
            </label>
          </div>
        </div>
      )}

      <style jsx>{`
        .tts-controls {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }

        .tts-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #107c0d, #0f6b0b);
          color: white;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(16, 124, 13, 0.3);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tts-toggle:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 124, 13, 0.4);
        }

        .tts-toggle.speaking {
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .tts-panel {
          position: absolute;
          bottom: 70px;
          right: 0;
          width: 300px;
          background: var(--techwave-some-r-bg-color, #ffffff);
          border: 1px solid var(--techwave-border-color, #ddd);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          padding: 0;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .tts-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid var(--techwave-border-color, #ddd);
          background: var(--techwave-some-a-bg-color, #f8f9fa);
          border-radius: 12px 12px 0 0;
        }

        .tts-panel-header h4 {
          margin: 0;
          color: var(--techwave-heading-color, #333);
          font-size: 16px;
        }

        .tts-close {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: var(--techwave-body-color, #666);
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tts-close:hover {
          color: var(--techwave-heading-color, #333);
        }

        .tts-playback-controls {
          padding: 15px;
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--techwave-border-color, #ddd);
        }

        .tts-btn {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid var(--techwave-border-color, #ddd);
          border-radius: 6px;
          background: var(--techwave-some-a-bg-color, #f8f9fa);
          color: var(--techwave-heading-color, #333);
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s ease;
        }

        .tts-btn:hover {
          background: var(--techwave-main-color, #107c0d);
          color: white;
          border-color: var(--techwave-main-color, #107c0d);
        }

        .tts-btn.stop {
          background: #dc3545;
          color: white;
          border-color: #dc3545;
        }

        .tts-btn.stop:hover {
          background: #c82333;
          border-color: #c82333;
        }

        .tts-setting {
          padding: 10px 15px;
          border-bottom: 1px solid var(--techwave-border-color, #ddd);
        }

        .tts-setting:last-child {
          border-bottom: none;
          border-radius: 0 0 12px 12px;
        }

        .tts-setting label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--techwave-heading-color, #333);
          margin-bottom: 8px;
        }

        .tts-select, .tts-slider {
          width: 100%;
          padding: 6px;
          border: 1px solid var(--techwave-border-color, #ddd);
          border-radius: 4px;
          background: var(--techwave-site-bg-color, #ffffff);
          color: var(--techwave-heading-color, #333);
          font-size: 12px;
        }

        .tts-slider {
          padding: 0;
          height: 20px;
          cursor: pointer;
        }

        .tts-checkbox-label {
          display: flex !important;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .tts-checkbox {
          width: auto !important;
          margin: 0;
        }

        .tts-error {
          background: #f8d7da;
          color: #721c24;
          padding: 10px;
          border-radius: 6px;
          font-size: 12px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .tts-panel {
            width: 280px;
            right: -10px;
          }
          
          .tts-toggle {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default TTSControls;