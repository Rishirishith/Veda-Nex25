// TTSProvider.jsx - Context Provider for TTS functionality
import React, { createContext, useContext } from 'react';
import { useTTS } from '../hooks/useTTS';

const TTSContext = createContext();

export const useTTSContext = () => {
  const context = useContext(TTSContext);
  if (!context) {
    throw new Error('useTTSContext must be used within a TTSProvider');
  }
  return context;
};

export const TTSProvider = ({ children }) => {
  const ttsHook = useTTS();

  return (
    <TTSContext.Provider value={ttsHook}>
      {children}
    </TTSContext.Provider>
  );
};