// AyurvedicChatbot.jsx - Main Chatbot Component with Automatic TTS
import React, { useState, useEffect, useRef } from 'react';
import { useTTSContext } from '../context/TTSProvider';

const AyurvedicChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Namaste! Welcome to VedaNex, your trusted Ayurvedic wellness companion. I can help you with natural remedies, dosha analysis, and holistic health guidance. How may I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Get TTS functionality from context
  const { autoSpeakResponse, speakText } = useTTSContext();

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-speak initial welcome message
  useEffect(() => {
    const welcomeMessage = messages.find(msg => msg.id === 1);
    if (welcomeMessage) {
      autoSpeakResponse(welcomeMessage.text);
    }
  }, [autoSpeakResponse]);

  // Simulated Ayurvedic responses database
  const ayurvedicResponses = {
    headache: "For headaches, try applying a paste of sandalwood powder with rose water on your forehead. Drink warm ginger tea with honey. Practice Pranayama breathing exercises and ensure adequate rest. Avoid excessive screen time and bright lights.",
    
    digestion: "Poor digestion indicates weakened Agni (digestive fire). Drink warm water with lemon and ginger in the morning. Eat your largest meal at midday when Agni is strongest. Include digestive spices like cumin, coriander, and fennel. Avoid cold drinks with meals.",
    
    stress: "Stress creates Vata imbalance. Practice daily meditation and yoga. Perform Abhyanga (oil massage) with warm sesame oil. Drink Ashwagandha tea before bed. Maintain regular sleep schedule. Include grounding foods like warm soups and cooked grains.",
    
    skin: "For healthy skin, balance your doshas through proper diet. Use natural face masks with turmeric, neem, or rose water. Stay hydrated with lukewarm water. Include antioxidant-rich foods like berries and leafy greens. Practice daily oil cleansing.",
    
    energy: "Low energy suggests Ojas depletion. Start your day with warm water and lemon. Include energy-building foods like almonds, dates, and ghee. Practice Surya Namaskara (Sun Salutations). Ensure 7-8 hours of quality sleep. Consider Chyawanprash supplementation.",
    
    immunity: "Boost immunity with Triphala, turmeric, and ginger daily. Practice oil pulling with sesame oil. Include immune-supporting herbs like tulsi and amla. Maintain regular exercise and adequate sleep. Reduce processed foods and sugar intake."
  };

  // Generate bot response based on user input
  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Find matching response
    for (const [key, response] of Object.entries(ayurvedicResponses)) {
      if (input.includes(key) || 
          (key === 'digestion' && (input.includes('stomach') || input.includes('acidity'))) ||
          (key === 'skin' && (input.includes('acne') || input.includes('rash'))) ||
          (key === 'energy' && (input.includes('tired') || input.includes('fatigue'))) ||
          (key === 'immunity' && (input.includes('cold') || input.includes('fever')))) {
        return response;
      }
    }
    
    // Default response
    return "Thank you for your question about Ayurvedic wellness. For personalized treatment recommendations, I suggest consulting with a qualified Ayurvedic practitioner. In the meantime, focus on maintaining regular daily routines, eating fresh seasonal foods, and practicing mindfulness. Would you like information about any specific health concern?";
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText.trim(),
      timestamp: new Date()
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage.text);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // 🎯 CRITICAL: Auto-speak the bot response immediately
      autoSpeakResponse(botResponse);

    }, 1500);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Manual TTS for any message
  const handleSpeakMessage = (text) => {
    speakText(text);
  };

  return (
    <div className="ayurvedic-chatbot">
      <div className="chat-header">
        <div className="header-info">
          <h2>🌿 VedaNex AI Assistant</h2>
          <p>Ancient Ayurvedic Wisdom for Modern Health</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-content">
              <div className="message-text">
                {message.text}
              </div>
              <div className="message-footer">
                <span className="timestamp">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                {message.type === 'bot' && (
                  <button 
                    className="speak-btn"
                    onClick={() => handleSpeakMessage(message.text)}
                    title="Speak this message"
                  >
                    🔊
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot typing">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <div className="input-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Ayurvedic remedies, symptoms, or wellness tips..."
            className="message-input"
            rows="2"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="send-button"
          >
            {isTyping ? '⏳' : '🚀'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .ayurvedic-chatbot {
          display: flex;
          flex-direction: column;
          height: 600px;
          max-width: 800px;
          margin: 0 auto;
          background: var(--techwave-site-bg-color, #ffffff);
          border: 1px solid var(--techwave-border-color, #ddd);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .chat-header {
          background: linear-gradient(135deg, #107c0d, #0f6b0b);
          color: white;
          padding: 20px;
          text-align: center;
        }

        .header-info h2 {
          margin: 0 0 5px 0;
          font-size: 24px;
        }

        .header-info p {
          margin: 0;
          opacity: 0.9;
          font-size: 14px;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background: var(--techwave-some-a-bg-color, #f8f9fa);
        }

        .message {
          margin-bottom: 20px;
          display: flex;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message.bot {
          justify-content: flex-start;
        }

        .message-content {
          max-width: 70%;
          padding: 15px;
          border-radius: 12px;
          position: relative;
        }

        .message.user .message-content {
          background: var(--techwave-main-color, #107c0d);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.bot .message-content {
          background: var(--techwave-some-r-bg-color, #ffffff);
          color: var(--techwave-heading-color, #333);
          border: 1px solid var(--techwave-border-color, #ddd);
          border-bottom-left-radius: 4px;
        }

        .message-text {
          line-height: 1.5;
          margin-bottom: 8px;
        }

        .message-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          opacity: 0.7;
        }

        .speak-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .speak-btn:hover {
          background: rgba(16, 124, 13, 0.1);
          transform: scale(1.1);
        }

        .typing {
          opacity: 0.7;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--techwave-main-color, #107c0d);
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .chat-input {
          padding: 20px;
          background: var(--techwave-some-r-bg-color, #ffffff);
          border-top: 1px solid var(--techwave-border-color, #ddd);
        }

        .input-container {
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }

        .message-input {
          flex: 1;
          padding: 12px;
          border: 1px solid var(--techwave-border-color, #ddd);
          border-radius: 8px;
          background: var(--techwave-site-bg-color, #ffffff);
          color: var(--techwave-heading-color, #333);
          font-family: inherit;
          font-size: 14px;
          resize: none;
          min-height: 44px;
          max-height: 120px;
        }

        .message-input:focus {
          outline: none;
          border-color: var(--techwave-main-color, #107c0d);
          box-shadow: 0 0 0 2px rgba(16, 124, 13, 0.1);
        }

        .send-button {
          padding: 12px 16px;
          background: var(--techwave-main-color, #107c0d);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s ease;
          min-width: 50px;
          height: 44px;
        }

        .send-button:hover:not(:disabled) {
          background: #0f6b0b;
          transform: translateY(-1px);
        }

        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .ayurvedic-chatbot {
            height: 500px;
          }
          
          .message-content {
            max-width: 85%;
          }
          
          .chat-messages {
            padding: 15px;
          }
          
          .chat-input {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default AyurvedicChatbot;