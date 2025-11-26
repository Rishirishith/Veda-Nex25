// App.jsx - Main Application with TTS Integration
import React from 'react';
import { TTSProvider } from './context/TTSProvider';
import AyurvedicChatbot from './components/AyurvedicChatbot';
import TTSControls from './components/TTSControls';

const App = () => {
  return (
    <TTSProvider>
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1>🌿 VedaNex - Ayurvedic Wellness Platform</h1>
            <p>Experience ancient healing wisdom with modern AI assistance</p>
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            <div className="feature-intro">
              <h2>🎤 Automatic Text-to-Speech Enabled</h2>
              <p>All chatbot responses will be automatically spoken aloud. Use the floating voice controls to customize your experience.</p>
            </div>

            <AyurvedicChatbot />

            <div className="ayurvedic-info">
              <div className="info-grid">
                <div className="info-card">
                  <h3>🧘‍♀️ Personalized Dosha Analysis</h3>
                  <p>Discover your unique Ayurvedic constitution and receive tailored health recommendations.</p>
                </div>
                <div className="info-card">
                  <h3>🌱 Natural Remedies Database</h3>
                  <p>Access thousands of time-tested herbal remedies and holistic treatments.</p>
                </div>
                <div className="info-card">
                  <h3>🍃 Lifestyle Guidance</h3>
                  <p>Learn daily routines, dietary practices, and wellness habits based on Ayurvedic principles.</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Floating TTS Controls */}
        <TTSControls />

        <style jsx>{`
          :root {
            --techwave-main-color: #107c0d;
            --techwave-site-bg-color: #ffffff;
            --techwave-heading-color: #333;
            --techwave-body-color: #666;
            --techwave-border-color: #ddd;
            --techwave-some-a-bg-color: #f8f9fa;
            --techwave-some-r-bg-color: #ffffff;
          }

          [data-theme="dark"] {
            --techwave-site-bg-color: #1c1925;
            --techwave-heading-color: #c0bcca;
            --techwave-body-color: #7e7a86;
            --techwave-border-color: #312e37;
            --techwave-some-a-bg-color: #2a2636;
            --techwave-some-r-bg-color: #252131;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: var(--techwave-site-bg-color);
            color: var(--techwave-body-color);
            line-height: 1.6;
            transition: all 0.3s ease;
          }

          .app {
            min-height: 100vh;
            background: var(--techwave-site-bg-color);
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
            margin-bottom: 10px;
            font-weight: 700;
          }

          .app-header p {
            font-size: 1.2rem;
            opacity: 0.9;
          }

          .app-main {
            padding: 60px 0;
          }

          .feature-intro {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: var(--techwave-some-r-bg-color);
            border: 1px solid var(--techwave-border-color);
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .feature-intro h2 {
            color: var(--techwave-heading-color);
            margin-bottom: 15px;
            font-size: 2rem;
          }

          .feature-intro p {
            font-size: 1.1rem;
            color: var(--techwave-body-color);
          }

          .ayurvedic-info {
            margin-top: 60px;
          }

          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
          }

          .info-card {
            background: var(--techwave-some-r-bg-color);
            padding: 30px;
            border-radius: 12px;
            border: 1px solid var(--techwave-border-color);
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .info-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }

          .info-card h3 {
            color: var(--techwave-heading-color);
            margin-bottom: 15px;
            font-size: 1.3rem;
          }

          .info-card p {
            color: var(--techwave-body-color);
            line-height: 1.6;
          }

          @media (max-width: 768px) {
            .app-header {
              padding: 40px 0;
            }
            
            .app-header h1 {
              font-size: 2rem;
            }
            
            .app-main {
              padding: 40px 0;
            }
            
            .container {
              padding: 0 15px;
            }
            
            .info-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }
        `}</style>
      </div>
    </TTSProvider>
  );
};

export default App;