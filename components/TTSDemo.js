// components/TTSDemo.js - Demo Component Showing Exact Integration
import React, { useState, useEffect } from 'react';
import { speakText, autoSpeakMessage, stopSpeech, getAvailableVoices } from '../utils/tts';

/**
 * 🎯 COMPLETE EXAMPLE: How to integrate automatic TTS in your chatbot
 * This shows EXACTLY where to place the TTS calls in your existing code
 */
const TTSIntegrationDemo = () => {
  const [messages, setMessages] = useState([
    {
      id: 'demo-1',
      type: 'assistant',
      text: 'Welcome! This demo shows automatic TTS integration. Every new response will be spoken automatically.',
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [speechRate, setSpeechRate] = useState(0.9);
  const [speechPitch, setSpeechPitch] = useState(1.0);

  // Load voices on component mount
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = getAvailableVoices();
      setVoices(availableVoices);
      
      // Auto-select preferred voice
      if (availableVoices.length > 0 && !selectedVoice) {
        const preferredVoice = availableVoices.find(voice => 
          voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female')
        ) || availableVoices[0];
        setSelectedVoice(preferredVoice.name);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, [selectedVoice]);

  // 🚀 CRITICAL: Auto-trigger TTS when messages change
  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    
    // ✅ EXACT INTEGRATION POINT: Only speak assistant messages
    if (lastMessage && lastMessage.type === 'assistant') {
      console.log('🎤 Triggering automatic TTS for:', lastMessage.text.substring(0, 50));
      
      // 🎯 THIS IS THE KEY LINE: autoSpeakMessage with settings
      autoSpeakMessage(lastMessage, {
        voiceName: selectedVoice,
        rate: speechRate,
        pitch: speechPitch,
        delay: 500 // Wait 500ms for DOM update
      });
    }
  }, [messages, selectedVoice, speechRate, speechPitch]); // Dependencies ensure re-trigger when settings change

  // Sample responses for demo
  const sampleResponses = [
    "For digestive issues, I recommend drinking warm ginger tea with lemon in the morning. This helps kindle your Agni or digestive fire according to Ayurvedic principles.",
    "Stress indicates a Vata imbalance. Practice daily meditation, oil massage with warm sesame oil, and maintain regular sleep patterns for optimal balance.",
    "For better immunity, include turmeric, ginger, and tulsi in your daily routine. Practice pranayama breathing exercises and ensure adequate rest.",
    "Skin health reflects internal balance. Use natural face masks with turmeric and neem. Stay hydrated and include antioxidant-rich foods in your diet."
  ];

  // Handle message sending
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: inputText.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Stop current speech when user sends new message
    stopSpeech();

    // Simulate AI response after delay
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        text: randomResponse,
        timestamp: Date.now()
      };

      // 🚀 CRITICAL: Adding to messages will trigger useEffect → automatic TTS
      setMessages(prev => [...prev, assistantMessage]);
      
    }, 1500);
  };

  // Manual TTS test
  const testTTS = () => {
    const testText = "This is a test of the text-to-speech functionality using the speakText function with custom voice settings.";
    speakText(testText, selectedVoice, speechRate, speechPitch);
  };

  return (
    <div className="tts-demo">
      <h2>🎯 Automatic TTS Integration Demo</h2>
      
      {/* Voice Controls */}
      <div className="controls-panel">
        <div className="control-group">
          <label>Voice:</label>
          <select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
            {voices.map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
        
        <div className="control-group">
          <label>Rate: {speechRate}x</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
          />
        </div>
        
        <div className="control-group">
          <label>Pitch: {speechPitch}</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speechPitch}
            onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
          />
        </div>
        
        <button onClick={testTTS} className="test-btn">🔊 Test Voice</button>
        <button onClick={stopSpeech} className="stop-btn">⏹️ Stop</button>
      </div>

      {/* Chat Messages */}
      <div className="messages-container">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <div className="message-content">
              <strong>{msg.type === 'user' ? 'You' : '🌿 VedaNex AI'}:</strong>
              <p>{msg.text}</p>
              <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
              {msg.type === 'assistant' && (
                <button 
                  onClick={() => speakText(msg.text, selectedVoice, speechRate, speechPitch)}
                  className="replay-btn"
                >
                  🔊 Replay
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about Ayurvedic remedies..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      <div className="integration-notes">
        <h3>🔧 Integration Notes:</h3>
        <ul>
          <li><strong>useEffect dependency:</strong> [messages] triggers TTS when array changes</li>
          <li><strong>Message type check:</strong> Only assistant messages are spoken</li>
          <li><strong>autoSpeakMessage:</strong> Handles duplicate prevention automatically</li>
          <li><strong>Voice settings:</strong> Passed to TTS function for customization</li>
          <li><strong>stopSpeech:</strong> Called when user sends new message</li>
        </ul>
      </div>

      <style jsx>{`
        .tts-demo {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .controls-panel {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          gap: 20px;
          align-items: center;
          flex-wrap: wrap;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 150px;
        }

        .control-group label {
          font-size: 12px;
          font-weight: 600;
          color: #495057;
        }

        .control-group select,
        .control-group input[type="range"] {
          padding: 5px;
          border: 1px solid #dee2e6;
          border-radius: 4px;
        }

        .test-btn, .stop-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          height: fit-content;
        }

        .test-btn {
          background: #107c0d;
          color: white;
        }

        .stop-btn {
          background: #dc3545;
          color: white;
        }

        .messages-container {
          height: 400px;
          overflow-y: auto;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
          background: white;
        }

        .message {
          margin-bottom: 20px;
          padding: 15px;
          border-radius: 8px;
        }

        .message.user {
          background: #e3f2fd;
          margin-left: 50px;
        }

        .message.assistant {
          background: #f1f8e9;
          margin-right: 50px;
        }

        .message-content strong {
          color: #107c0d;
        }

        .message-content p {
          margin: 10px 0;
          line-height: 1.5;
        }

        .message-content small {
          color: #6c757d;
          font-size: 11px;
        }

        .replay-btn {
          background: none;
          border: 1px solid #107c0d;
          color: #107c0d;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
          margin-left: 10px;
        }

        .input-area {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .input-area input {
          flex: 1;
          padding: 12px;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          font-size: 14px;
        }

        .input-area button {
          background: #107c0d;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 6px;
          cursor: pointer;
        }

        .integration-notes {
          background: #fff3cd;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #ffc107;
        }

        .integration-notes h3 {
          margin: 0 0 15px 0;
          color: #856404;
        }

        .integration-notes ul {
          margin: 0;
          padding-left: 20px;
        }

        .integration-notes li {
          margin-bottom: 8px;
          color: #856404;
        }

        .integration-notes strong {
          color: #495057;
        }
      `}</style>
    </div>
  );
};

export default TTSIntegrationDemo;