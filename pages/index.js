// pages/index.js - Next.js Home Page with Automatic TTS
import React from 'react';
import Head from 'next/head';
import AyurvedicChatbot from '../components/AyurvedicChatbot';

export default function Home() {
  return (
    <>
      <Head>
        <title>VedaNex - Ayurvedic AI with Automatic Speech</title>
        <meta name="description" content="Ayurvedic wellness AI assistant with automatic text-to-speech for every response" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="app-container">
        <header className="app-header">
          <div className="container">
            <h1>🌿 VedaNex - Ayurvedic Wellness AI</h1>
            <p>Experience ancient healing wisdom with automatic voice responses</p>
            <div className="feature-badge">
              🎤 Automatic Text-to-Speech Enabled
            </div>
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            <div className="intro-section">
              <h2>🔊 Automatic Voice Responses</h2>
              <p>
                Every chatbot response will be automatically spoken aloud using your browser's built-in text-to-speech. 
                No external services required - everything runs locally for your privacy.
              </p>
              <div className="features-grid">
                <div className="feature-item">
                  <h3>🎯 Automatic Triggering</h3>
                  <p>Speech starts immediately when responses appear</p>
                </div>
                <div className="feature-item">
                  <h3>🎚️ Full Voice Control</h3>
                  <p>Adjust voice, speed, pitch, and volume</p>
                </div>
                <div className="feature-item">
                  <h3>🌿 Ayurvedic Optimized</h3>
                  <p>Voices selected for wellness content</p>
                </div>
              </div>
            </div>

            <div className="chatbot-container">
              <AyurvedicChatbot />
            </div>

            <div className="usage-instructions">
              <h3>📋 How It Works</h3>
              <ol>
                <li>Type your Ayurvedic health question in the chat</li>
                <li>The AI will generate a personalized response</li>
                <li><strong>🚀 Speech will start automatically</strong> - no button clicking needed</li>
                <li>Use the voice controls to customize your experience</li>
                <li>Click the 🔊 button on any message to replay it</li>
              </ol>
            </div>
          </div>
        </main>

        <style jsx>{`
          .app-container {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }

          .app-header {
            background: linear-gradient(135deg, #107c0d, #0f6b0b);
            color: white;
            padding: 60px 0;
            text-align: center;
          }

          .app-header h1 {
            font-size: 3rem;
            margin: 0 0 10px 0;
            font-weight: 700;
          }

          .app-header p {
            font-size: 1.3rem;
            margin: 0 0 20px 0;
            opacity: 0.9;
          }

          .feature-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .app-main {
            padding: 60px 0;
          }

          .intro-section {
            text-align: center;
            margin-bottom: 40px;
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .intro-section h2 {
            color: #107c0d;
            margin-bottom: 15px;
            font-size: 2rem;
          }

          .intro-section p {
            font-size: 1.1rem;
            color: #6c757d;
            margin-bottom: 30px;
            line-height: 1.6;
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
          }

          .feature-item {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #107c0d;
          }

          .feature-item h3 {
            color: #107c0d;
            margin: 0 0 10px 0;
            font-size: 1.1rem;
          }

          .feature-item p {
            color: #6c757d;
            margin: 0;
            font-size: 0.9rem;
          }

          .chatbot-container {
            margin: 40px 0;
          }

          .usage-instructions {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin-top: 40px;
          }

          .usage-instructions h3 {
            color: #107c0d;
            margin-bottom: 20px;
            font-size: 1.5rem;
          }

          .usage-instructions ol {
            padding-left: 20px;
          }

          .usage-instructions li {
            margin-bottom: 10px;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
          }

          .usage-instructions strong {
            color: #107c0d;
            font-weight: 600;
          }

          @media (max-width: 768px) {
            .app-header {
              padding: 40px 0;
            }
            
            .app-header h1 {
              font-size: 2rem;
            }
            
            .app-header p {
              font-size: 1.1rem;
            }
            
            .container {
              padding: 0 15px;
            }
            
            .intro-section {
              padding: 30px 20px;
            }
            
            .features-grid {
              grid-template-columns: 1fr;
              gap: 15px;
            }
          }
        `}</style>
      </div>
    </>
  );
}