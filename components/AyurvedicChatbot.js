// components/AyurvedicChatbot.js - Complete Chatbot with Automatic TTS
import React, { useState, useEffect, useRef } from 'react';
import { useTTS } from '../hooks/useTTS';

const AyurvedicChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      type: 'assistant',
      text: 'Namaste! Welcome to VedaNex, your trusted Ayurvedic wellness companion. I can help you with natural remedies, dosha analysis, and holistic health guidance. How may I assist you today?',
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // TTS Integration
  const { 
    isSupported, 
    voices, 
    isSpeaking, 
    settings, 
    speakText, 
    autoSpeakMessage, 
    stopSpeech, 
    updateSettings 
  } = useTTS();

  // 🎯 CRITICAL: Auto-trigger TTS when new assistant messages are added
  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    
    // Only speak assistant/bot messages, not user messages
    if (lastMessage && lastMessage.type === 'assistant' && lastMessage.text) {
      console.log('🎤 New assistant message detected, triggering TTS:', lastMessage.text.substring(0, 50) + '...');
      autoSpeakMessage(lastMessage);
    }
  }, [messages, autoSpeakMessage]); // Re-run when messages array changes

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Ayurvedic Response Database
  const ayurvedicResponses = {
    headache: "For headaches, I recommend applying a cooling paste of sandalwood powder mixed with rose water on your forehead. Drink warm ginger tea with honey to improve circulation. Practice Pranayama breathing exercises, specifically Sheetali and Sheetkari for cooling. Ensure adequate rest in a dark, quiet room and avoid excessive screen time.",

    digestion: "Poor digestion indicates weakened Agni or digestive fire. Start your day with warm water infused with lemon and fresh ginger. Eat your largest meal at midday when Agni is strongest according to Ayurvedic principles. Include digestive spices like cumin, coriander, and fennel in your cooking. Avoid cold drinks with meals as they extinguish the digestive fire.",

    stress: "Chronic stress creates Vata imbalance in your system. Practice daily meditation for at least 15 minutes, preferably at sunrise. Perform Abhyanga, which is self-massage with warm sesame oil before bathing. Drink Ashwagandha tea before bedtime to calm the nervous system. Maintain regular sleep schedules and include grounding foods like warm soups and cooked grains.",

    skin: "For radiant skin, balance your doshas through proper diet and lifestyle. Use natural face masks with turmeric, neem, or rose water depending on your skin type. Stay hydrated with lukewarm water throughout the day. Include antioxidant-rich foods like berries, leafy greens, and pomegranates. Practice daily oil cleansing with coconut or jojoba oil.",

    energy: "Low energy suggests Ojas depletion in Ayurvedic terms. Begin each day with warm water and lemon to stimulate digestion. Include energy-building foods like soaked almonds, dates, and ghee in your diet. Practice Surya Namaskara, the Sun Salutation sequence, each morning. Ensure 7 to 8 hours of quality sleep. Consider taking Chyawanprash, a traditional Ayurvedic tonic.",

    immunity: "To boost immunity naturally, take Triphala churna with warm water before bed. Include turmeric, ginger, and tulsi in your daily routine. Practice oil pulling with sesame oil each morning for 10 to 15 minutes. Maintain regular exercise and adequate sleep. Reduce processed foods and sugar intake while increasing fresh fruits and vegetables.",

    sleep: "For better sleep, follow Ayurvedic principles of Ratricharya or night routine. Massage your feet with warm ghee before bed. Drink warm milk with a pinch of nutmeg and cardamom. Keep your bedroom cool and dark. Avoid screens for at least one hour before sleep. Practice gentle yoga or meditation to calm your mind.",

    weight: "For healthy weight management, eat according to your dosha. Include warming spices like ginger, black pepper, and cinnamon to boost metabolism. Practice intermittent fasting by eating only during daylight hours. Stay active with regular exercise suited to your constitution. Drink warm water throughout the day to aid digestion and elimination."
  };

  // Generate contextual Ayurvedic response
  const generateAyurvedicResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Check for keywords and return appropriate response
    for (const [key, response] of Object.entries(ayurvedicResponses)) {
      if (input.includes(key) || 
          (key === 'digestion' && (input.includes('stomach') || input.includes('acidity') || input.includes('indigestion'))) ||
          (key === 'skin' && (input.includes('acne') || input.includes('rash') || input.includes('complexion'))) ||
          (key === 'energy' && (input.includes('tired') || input.includes('fatigue') || input.includes('weakness'))) ||
          (key === 'immunity' && (input.includes('cold') || input.includes('fever') || input.includes('infection'))) ||
          (key === 'sleep' && (input.includes('insomnia') || input.includes('sleepless') || input.includes('rest'))) ||
          (key === 'weight' && (input.includes('obesity') || input.includes('lose weight') || input.includes('diet')))) {
        return response;
      }
    }
    
    // Default response for unmatched queries
    return "Thank you for your question about Ayurvedic wellness. For personalized treatment recommendations, I suggest consulting with a qualified Ayurvedic practitioner who can assess your unique constitution and current health status. In the meantime, focus on maintaining regular daily routines, eating fresh seasonal foods according to your dosha, and practicing mindfulness through meditation or yoga. Would you like information about any specific health concern or Ayurvedic practice?";
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: inputText.trim(),
      timestamp: Date.now()
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Stop any current speech when user sends new message
    stopSpeech();

    // Simulate AI processing with realistic delay
    setTimeout(() => {
      const botResponse = generateAyurvedicResponse(userMessage.text);
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        text: botResponse,
        timestamp: Date.now()
      };

      // 🚀 CRITICAL: Adding assistant message will automatically trigger TTS via useEffect
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

    }, Math.random() * 1000 + 1500); // 1.5-2.5 second delay
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Manual speak function for re-playing messages
  const handleManualSpeak = (messageText) => {
    speakText(messageText);
  };

  return (
    <div className="ayurvedic-chatbot">
      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <h2>🌿 VedaNex AI Assistant</h2>
          <p>Ancient Ayurvedic Wisdom for Modern Health</p>
          {isSupported && (
            <div className="tts-status">
              {isSpeaking ? '🔊 Speaking...' : '🎤 Voice Ready'}
            </div>
          )}
        </div>
      </div>

      {/* TTS Controls */}
      {isSupported && (
        <div className="tts-controls">
          <div className="control-group">
            <label>Voice:</label>
            <select 
              value={settings.voiceName} 
              onChange={(e) => updateSettings({ voiceName: e.target.value })}
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang}) {voice.gender || ''}
                </option>
              ))}
            </select>
          </div>
          
          <div className="control-group">
            <label>Speed: {settings.rate.toFixed(1)}x</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.rate}
              onChange={(e) => updateSettings({ rate: parseFloat(e.target.value) })}
            />
          </div>
          
          <div className="control-group">
            <label>Pitch: {settings.pitch.toFixed(1)}</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.pitch}
              onChange={(e) => updateSettings({ pitch: parseFloat(e.target.value) })}
            />
          </div>
          
          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={settings.autoSpeak}
                onChange={(e) => updateSettings({ autoSpeak: e.target.checked })}
              />
              Auto-speak responses
            </label>
          </div>
          
          <button onClick={stopSpeech} className="stop-btn">
            ⏹️ Stop Speech
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-bubble">
              <div className="message-text">{message.text}</div>
              <div className="message-footer">
                <span className="timestamp">
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                {message.type === 'assistant' && isSupported && (
                  <button 
                    className="speak-btn"
                    onClick={() => handleManualSpeak(message.text)}
                    title="Speak this message"
                    disabled={isSpeaking}
                  >
                    🔊
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="message assistant">
            <div className="message-bubble typing">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="typing-text">Consulting Ayurvedic wisdom...</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input">
        <div className="input-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Ayurvedic remedies, symptoms, or wellness tips..."
            rows="2"
            disabled={isTyping}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="send-btn"
          >
            {isTyping ? '⏳' : '🚀'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .ayurvedic-chatbot {
          max-width: 800px;
          margin: 0 auto;
          height: 700px;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .chat-header {
          background: linear-gradient(135deg, #107c0d, #0f6b0b);
          color: white;
          padding: 20px;
          text-align: center;
        }

        .header-content h2 {
          margin: 0 0 5px 0;
          font-size: 24px;
          font-weight: 600;
        }

        .header-content p {
          margin: 0 0 10px 0;
          opacity: 0.9;
          font-size: 14px;
        }

        .tts-status {
          font-size: 12px;
          opacity: 0.8;
          font-weight: 500;
        }

        .tts-controls {
          background: #f8f9fa;
          padding: 15px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          gap: 15px;
          align-items: center;
          flex-wrap: wrap;
          font-size: 12px;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 120px;
        }

        .control-group label {
          font-weight: 500;
          color: #495057;
        }

        .control-group select,
        .control-group input[type="range"] {
          padding: 4px 8px;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          font-size: 11px;
        }

        .control-group input[type="checkbox"] {
          margin-right: 5px;
        }

        .stop-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
          height: fit-content;
        }

        .stop-btn:hover {
          background: #c82333;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background: #f8f9fa;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .message {
          display: flex;
          max-width: 80%;
        }

        .message.user {
          align-self: flex-end;
          margin-left: auto;
        }

        .message.assistant {
          align-self: flex-start;
          margin-right: auto;
        }

        .message-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          position: relative;
          word-wrap: break-word;
          max-width: 100%;
        }

        .message.user .message-bubble {
          background: #107c0d;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.assistant .message-bubble {
          background: white;
          color: #333;
          border: 1px solid #e9ecef;
          border-bottom-left-radius: 4px;
        }

        .message-text {
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .message-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          opacity: 0.7;
          margin-top: 5px;
        }

        .speak-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 12px;
          padding: 2px 4px;
          border-radius: 3px;
          transition: background 0.2s;
        }

        .speak-btn:hover:not(:disabled) {
          background: rgba(16, 124, 13, 0.1);
        }

        .speak-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .typing {
          opacity: 0.8;
        }

        .typing-dots {
          display: flex;
          gap: 4px;
          margin-bottom: 5px;
        }

        .typing-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #107c0d;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .typing-text {
          font-style: italic;
          color: #6c757d;
          font-size: 11px;
        }

        .chat-input {
          background: white;
          padding: 20px;
          border-top: 1px solid #e9ecef;
        }

        .input-container {
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }

        .input-container textarea {
          flex: 1;
          padding: 12px;
          border: 1px solid #dee2e6;
          border-radius: 20px;
          resize: none;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.4;
          min-height: 20px;
          max-height: 100px;
        }

        .input-container textarea:focus {
          outline: none;
          border-color: #107c0d;
          box-shadow: 0 0 0 2px rgba(16, 124, 13, 0.1);
        }

        .send-btn {
          background: #107c0d;
          color: white;
          border: none;
          padding: 12px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          min-width: 50px;
        }

        .send-btn:hover:not(:disabled) {
          background: #0f6b0b;
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .ayurvedic-chatbot {
            height: 600px;
            margin: 10px;
          }
          
          .tts-controls {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          
          .control-group {
            min-width: auto;
          }
          
          .message {
            max-width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default AyurvedicChatbot;