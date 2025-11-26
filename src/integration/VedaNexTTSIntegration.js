// VedaNexTTSIntegration.js - Standalone Integration Guide

/**
 * 🌿 VedaNex Automatic Text-to-Speech Integration Guide
 * 
 * This file shows EXACTLY where and how to integrate automatic TTS
 * into your existing chatbot or any React component.
 */

// ================================
// 1. BASIC INTEGRATION EXAMPLE
// ================================

import React, { useState, useEffect } from 'react';
import { useTTSContext } from '../context/TTSProvider';

const YourExistingChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // 🎯 KEY: Get the autoSpeakResponse function
  const { autoSpeakResponse } = useTTSContext();

  // Your existing message handling function
  const handleBotResponse = async (userInput) => {
    setIsLoading(true);
    
    try {
      // Your existing API call or response generation
      const response = await generateAyurvedicResponse(userInput);
      
      const newMessage = {
        id: Date.now(),
        type: 'bot',
        text: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // 🚀 CRITICAL: Add this ONE line for automatic speech
      autoSpeakResponse(response);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Your existing chat UI */}
      {messages.map(message => (
        <div key={message.id} className={`message ${message.type}`}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

// ================================
// 2. IMMEDIATE CALL PATTERN
// ================================

// Pattern A: After state update
const addBotMessage = (responseText) => {
  const botMessage = { id: Date.now(), type: 'bot', text: responseText };
  setMessages(prev => [...prev, botMessage]);
  
  // 🎯 Call immediately after state update
  autoSpeakResponse(responseText);
};

// Pattern B: In useEffect after messages change
useEffect(() => {
  const lastMessage = messages[messages.length - 1];
  if (lastMessage && lastMessage.type === 'bot') {
    // 🎯 Auto-speak new bot messages
    autoSpeakResponse(lastMessage.text);
  }
}, [messages, autoSpeakResponse]);

// Pattern C: With async operations
const processAIResponse = async (input) => {
  const response = await fetch('/api/ayurvedic-ai', {
    method: 'POST',
    body: JSON.stringify({ query: input })
  });
  
  const data = await response.json();
  
  // 🎯 Speak immediately when response is ready
  autoSpeakResponse(data.message);
  
  return data;
};

// ================================
// 3. STREAMING RESPONSE INTEGRATION
// ================================

const handleStreamingResponse = async (userInput) => {
  let fullResponse = '';
  
  const stream = await fetch('/api/stream-response', {
    method: 'POST',
    body: JSON.stringify({ input: userInput })
  });
  
  const reader = stream.body.getReader();
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = new TextDecoder().decode(value);
    fullResponse += chunk;
    
    // Update UI with streaming text
    setStreamingText(fullResponse);
  }
  
  // 🎯 Speak complete response when streaming is done
  autoSpeakResponse(fullResponse);
};

// ================================
// 4. INTEGRATION WITH EXISTING HOOKS
// ================================

const useAyurvedicChat = () => {
  const [messages, setMessages] = useState([]);
  const { autoSpeakResponse } = useTTSContext();
  
  const sendMessage = useCallback(async (text) => {
    // Add user message
    const userMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    
    // Generate bot response
    const botResponse = await getAyurvedicAdvice(text);
    const botMsg = { id: Date.now() + 1, type: 'bot', text: botResponse };
    
    setMessages(prev => [...prev, botMsg]);
    
    // 🎯 Auto-speak bot response
    autoSpeakResponse(botResponse);
    
  }, [autoSpeakResponse]);
  
  return { messages, sendMessage };
};

// ================================
// 5. CONDITIONAL SPEAKING
// ================================

const smartAutoSpeak = (responseText, conditions = {}) => {
  const { 
    minLength = 10,           // Don't speak very short responses
    maxLength = 1000,         // Don't speak very long responses
    excludePatterns = [],     // Skip responses matching patterns
    onlyAyurvedic = true      // Only speak Ayurvedic content
  } = conditions;
  
  // Check length constraints
  if (responseText.length < minLength || responseText.length > maxLength) {
    return;
  }
  
  // Check exclusion patterns
  if (excludePatterns.some(pattern => responseText.match(pattern))) {
    return;
  }
  
  // Check for Ayurvedic keywords
  if (onlyAyurvedic) {
    const ayurvedicKeywords = [
      'dosha', 'vata', 'pitta', 'kapha', 'ayurveda', 'ayurvedic',
      'triphala', 'turmeric', 'ginger', 'ashwagandha', 'pranayama',
      'meditation', 'herb', 'natural', 'holistic', 'wellness'
    ];
    
    const hasAyurvedicContent = ayurvedicKeywords.some(keyword =>
      responseText.toLowerCase().includes(keyword)
    );
    
    if (!hasAyurvedicContent) return;
  }
  
  // 🎯 Speak if all conditions are met
  autoSpeakResponse(responseText);
};

// ================================
// 6. ERROR HANDLING & FALLBACKS
// ================================

const robustAutoSpeak = (text) => {
  try {
    if (!text || typeof text !== 'string') {
      console.warn('Invalid text for TTS:', text);
      return;
    }
    
    // Clean and validate text
    const cleanText = text.trim();
    if (cleanText.length === 0) return;
    
    // Check TTS availability
    if (!('speechSynthesis' in window)) {
      console.warn('TTS not supported in this browser');
      return;
    }
    
    // 🎯 Safe auto-speak call
    autoSpeakResponse(cleanText);
    
  } catch (error) {
    console.error('TTS Error:', error);
    // Continue without TTS - don't break the app
  }
};

// ================================
// 7. COMPLETE INTEGRATION EXAMPLE
// ================================

const CompleteAyurvedicChatExample = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  
  // 🎯 Essential TTS integration
  const { autoSpeakResponse, speakText } = useTTSContext();
  
  // Sample Ayurvedic knowledge base
  const ayurvedicResponses = {
    digestive: "For digestive issues, try warm ginger tea with lemon. Eat your main meal when the sun is highest. Include digestive spices like cumin, coriander, and fennel in your cooking.",
    stress: "Stress indicates Vata imbalance. Practice daily meditation and yoga. Perform oil massage with warm sesame oil. Maintain regular sleep patterns.",
    immunity: "Boost immunity with Triphala daily. Include turmeric, ginger, and tulsi in your routine. Practice pranayama breathing exercises."
  };
  
  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('digestion') || input.includes('stomach')) {
      return ayurvedicResponses.digestive;
    } else if (input.includes('stress') || input.includes('anxiety')) {
      return ayurvedicResponses.stress;
    } else if (input.includes('immunity') || input.includes('cold')) {
      return ayurvedicResponses.immunity;
    }
    
    return "Thank you for your question about Ayurvedic wellness. For personalized guidance, please consult with a qualified practitioner.";
  };
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = generateResponse(userMessage.text);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsThinking(false);
      
      // 🚀 AUTOMATIC SPEECH - This is the key line!
      autoSpeakResponse(botResponse);
      
    }, 1500);
  };
  
  return (
    <div className="ayurvedic-chat">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <div className="text">{msg.text}</div>
            {msg.type === 'bot' && (
              <button onClick={() => speakText(msg.text)}>
                🔊 Repeat
              </button>
            )}
          </div>
        ))}
        {isThinking && (
          <div className="message bot thinking">
            Consulting Ayurvedic knowledge base...
          </div>
        )}
      </div>
      
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about Ayurvedic remedies..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

// ================================
// 8. SETUP INSTRUCTIONS
// ================================

/**
 * SETUP STEPS:
 * 
 * 1. Wrap your app with TTSProvider:
 *    <TTSProvider>
 *      <YourApp />
 *    </TTSProvider>
 * 
 * 2. Import useTTSContext in components:
 *    const { autoSpeakResponse } = useTTSContext();
 * 
 * 3. Call autoSpeakResponse wherever you generate bot responses:
 *    autoSpeakResponse(responseText);
 * 
 * 4. Add floating controls:
 *    <TTSControls />
 * 
 * That's it! Automatic TTS is now working.
 */

export {
  YourExistingChatComponent,
  CompleteAyurvedicChatExample,
  useAyurvedicChat,
  smartAutoSpeak,
  robustAutoSpeak
};