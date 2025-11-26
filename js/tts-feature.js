/**
 * VedaNex Text-to-Speech Feature
 * Enhanced TTS functionality for Ayurvedic content
 * Compatible with all modern browsers using Web Speech API
 */

class VedaNexTTS {
    constructor() {
        this.synth = window.speechSynthesis;
        this.currentUtterance = null;
        this.isPlaying = false;
        this.isPaused = false;
        this.voices = [];
        this.currentVoice = null;
        this.settings = {
            rate: 0.9,
            pitch: 1.0,
            volume: 0.8,
            lang: 'en-US'
        };
        
        this.init();
    }

    init() {
        // Wait for voices to load
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.loadVoices();
        }
        this.loadVoices();
        this.createTTSControls();
        this.attachEventListeners();
    }

    loadVoices() {
        this.voices = this.synth.getVoices();
        
        // Prefer female voices for Ayurvedic content (more soothing)
        const preferredVoices = [
            'Google UK English Female',
            'Microsoft Zira - English (United States)',
            'Alex',
            'Samantha',
            'Karen',
            'Moira'
        ];

        // Find the best available voice
        for (const voiceName of preferredVoices) {
            const voice = this.voices.find(v => 
                v.name.includes(voiceName) || 
                (v.name.toLowerCase().includes('female') && v.lang.startsWith('en'))
            );
            if (voice) {
                this.currentVoice = voice;
                break;
            }
        }

        // Fallback to first English voice
        if (!this.currentVoice) {
            this.currentVoice = this.voices.find(v => v.lang.startsWith('en')) || this.voices[0];
        }
    }

    createTTSControls() {
        // Create floating TTS control panel
        const ttsPanel = document.createElement('div');
        ttsPanel.id = 'vedanex-tts-panel';
        ttsPanel.className = 'vedanex-tts-panel';
        ttsPanel.innerHTML = `
            <div class="tts-main-button" id="tts-main-btn" title="Text to Speech">
                <svg class="tts-icon speak-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18V6l8 6-8 6z"/>
                    <path d="M16 6v12"/>
                    <path d="M21 9v6"/>
                </svg>
                <svg class="tts-icon pause-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                </svg>
                <svg class="tts-icon stop-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                </svg>
            </div>
            <div class="tts-controls" id="tts-controls" style="display: none;">
                <div class="tts-control-item">
                    <label>Speed:</label>
                    <input type="range" id="tts-rate" min="0.5" max="2" step="0.1" value="0.9">
                    <span id="rate-value">0.9x</span>
                </div>
                <div class="tts-control-item">
                    <label>Pitch:</label>
                    <input type="range" id="tts-pitch" min="0.5" max="2" step="0.1" value="1.0">
                    <span id="pitch-value">1.0</span>
                </div>
                <div class="tts-control-item">
                    <label>Volume:</label>
                    <input type="range" id="tts-volume" min="0" max="1" step="0.1" value="0.8">
                    <span id="volume-value">80%</span>
                </div>
                <button class="tts-select-text-btn" id="select-text-btn">Select Text to Read</button>
            </div>
        `;

        document.body.appendChild(ttsPanel);
        this.addTTSStyles();
    }

    addTTSStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .vedanex-tts-panel {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                font-family: var(--techwave-heading-font-family);
            }

            .tts-main-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--techwave-main-color), #0d5d0a);
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

            .tts-icon {
                width: 24px;
                height: 24px;
                transition: opacity 0.2s ease;
            }

            .tts-controls {
                position: absolute;
                bottom: 70px;
                right: 0;
                background: var(--techwave-main-color);
                border-radius: 12px;
                padding: 15px;
                min-width: 250px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                border: 1px solid var(--techwave-border-color);
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

            /* Inline TTS button for content */
            .tts-inline-btn {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                padding: 4px 8px;
                background: var(--techwave-some-a-bg-color);
                border: 1px solid var(--techwave-border-color);
                border-radius: 4px;
                color: var(--techwave-heading-color);
                cursor: pointer;
                font-size: 12px;
                margin-left: 8px;
                transition: all 0.2s ease;
                text-decoration: none;
            }

            .tts-inline-btn:hover {
                background: var(--techwave-main-color);
                color: white;
            }

            .tts-inline-btn svg {
                width: 14px;
                height: 14px;
            }

            /* Text selection highlight */
            .tts-text-selection {
                background: rgba(16, 124, 13, 0.2) !important;
                border-radius: 3px;
                padding: 2px;
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .vedanex-tts-panel {
                    bottom: 80px;
                    right: 15px;
                }
                
                .tts-main-button {
                    width: 50px;
                    height: 50px;
                }
                
                .tts-controls {
                    min-width: 200px;
                    right: -150px;
                }
            }

            /* Dark mode adjustments */
            [data-techwave-skin="dark"] .tts-controls {
                background: var(--techwave-some-r-bg-color);
                border-color: var(--techwave-border-color);
            }

            [data-techwave-skin="dark"] .tts-control-item {
                color: var(--techwave-heading-color);
            }
        `;

        document.head.appendChild(style);
    }

    attachEventListeners() {
        const mainBtn = document.getElementById('tts-main-btn');
        const controls = document.getElementById('tts-controls');
        const rateSlider = document.getElementById('tts-rate');
        const pitchSlider = document.getElementById('tts-pitch');
        const volumeSlider = document.getElementById('tts-volume');
        const selectTextBtn = document.getElementById('select-text-btn');

        // Main button click
        mainBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.isPlaying) {
                if (this.isPaused) {
                    this.resumeSpeech();
                } else {
                    this.pauseSpeech();
                }
            } else {
                // Toggle controls visibility
                controls.style.display = controls.style.display === 'none' ? 'block' : 'none';
            }
        });

        // Close controls when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.vedanex-tts-panel')) {
                controls.style.display = 'none';
            }
        });

        // Settings sliders
        rateSlider.addEventListener('input', (e) => {
            this.settings.rate = parseFloat(e.target.value);
            document.getElementById('rate-value').textContent = e.target.value + 'x';
        });

        pitchSlider.addEventListener('input', (e) => {
            this.settings.pitch = parseFloat(e.target.value);
            document.getElementById('pitch-value').textContent = e.target.value;
        });

        volumeSlider.addEventListener('input', (e) => {
            this.settings.volume = parseFloat(e.target.value);
            document.getElementById('volume-value').textContent = Math.round(e.target.value * 100) + '%';
        });

        // Select text to read
        selectTextBtn.addEventListener('click', () => {
            this.enableTextSelection();
            controls.style.display = 'none';
        });
    }

    // Main TTS function - can be called from anywhere
    speakText(text, options = {}) {
        if (!text || text.trim() === '') {
            this.showNotification('No text to speak', 'warning');
            return;
        }

        // Stop any current speech
        this.stopSpeech();

        // Clean text for better speech
        const cleanText = this.cleanTextForSpeech(text);

        // Create utterance
        this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
        
        // Apply settings
        this.currentUtterance.rate = options.rate || this.settings.rate;
        this.currentUtterance.pitch = options.pitch || this.settings.pitch;
        this.currentUtterance.volume = options.volume || this.settings.volume;
        this.currentUtterance.lang = options.lang || this.settings.lang;
        
        if (this.currentVoice) {
            this.currentUtterance.voice = this.currentVoice;
        }

        // Event listeners
        this.currentUtterance.onstart = () => {
            this.isPlaying = true;
            this.isPaused = false;
            this.updateButtonState('playing');
            this.showNotification('Speaking...', 'success');
        };

        this.currentUtterance.onend = () => {
            this.isPlaying = false;
            this.isPaused = false;
            this.updateButtonState('stopped');
            this.showNotification('Speech completed', 'info');
        };

        this.currentUtterance.onerror = (event) => {
            this.isPlaying = false;
            this.isPaused = false;
            this.updateButtonState('stopped');
            this.showNotification('Speech error: ' + event.error, 'error');
        };

        this.currentUtterance.onpause = () => {
            this.isPaused = true;
            this.updateButtonState('paused');
        };

        this.currentUtterance.onresume = () => {
            this.isPaused = false;
            this.updateButtonState('playing');
        };

        // Start speaking
        this.synth.speak(this.currentUtterance);
    }

    cleanTextForSpeech(text) {
        return text
            .replace(/[^\w\s.,!?;:()\-'"]/g, '') // Remove special characters
            .replace(/\s+/g, ' ') // Normalize whitespace
            .replace(/([.!?])\s*([A-Z])/g, '$1 $2') // Add pause between sentences
            .trim();
    }

    pauseSpeech() {
        if (this.synth.speaking && !this.synth.paused) {
            this.synth.pause();
        }
    }

    resumeSpeech() {
        if (this.synth.paused) {
            this.synth.resume();
        }
    }

    stopSpeech() {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
        this.isPlaying = false;
        this.isPaused = false;
        this.updateButtonState('stopped');
    }

    updateButtonState(state) {
        const mainBtn = document.getElementById('tts-main-btn');
        const speakIcon = mainBtn.querySelector('.speak-icon');
        const pauseIcon = mainBtn.querySelector('.pause-icon');
        const stopIcon = mainBtn.querySelector('.stop-icon');

        // Hide all icons first
        speakIcon.style.display = 'none';
        pauseIcon.style.display = 'none';
        stopIcon.style.display = 'none';

        switch (state) {
            case 'playing':
                pauseIcon.style.display = 'block';
                mainBtn.classList.add('playing');
                mainBtn.title = 'Pause Speech';
                break;
            case 'paused':
                speakIcon.style.display = 'block';
                mainBtn.classList.remove('playing');
                mainBtn.title = 'Resume Speech';
                break;
            case 'stopped':
            default:
                speakIcon.style.display = 'block';
                mainBtn.classList.remove('playing');
                mainBtn.title = 'Text to Speech';
                break;
        }
    }

    enableTextSelection() {
        this.showNotification('Select any text on the page and it will be read aloud', 'info');
        
        const handleSelection = () => {
            const selectedText = window.getSelection().toString();
            if (selectedText.length > 0) {
                this.speakText(selectedText);
                // Remove selection listener after use
                document.removeEventListener('mouseup', handleSelection);
                document.removeEventListener('touchend', handleSelection);
            }
        };

        document.addEventListener('mouseup', handleSelection);
        document.addEventListener('touchend', handleSelection);
    }

    // Add inline TTS button to any element
    addInlineButton(element, text = null) {
        if (!element) return;

        const textToSpeak = text || element.textContent || element.innerText;
        
        const inlineBtn = document.createElement('button');
        inlineBtn.className = 'tts-inline-btn';
        inlineBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 19 2 12 11 5 11 19"></polygon>
                <polygon points="22 19 13 12 22 5 22 19"></polygon>
            </svg>
            Listen
        `;
        
        inlineBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.speakText(textToSpeak);
        });

        element.appendChild(inlineBtn);
        return inlineBtn;
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.tts-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `tts-notification tts-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--techwave-main-color);
            color: white;
            padding: 12px 18px;
            border-radius: 6px;
            z-index: 10001;
            font-size: 14px;
            font-family: var(--techwave-heading-font-family);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideInRight 0.3s ease;
        `;

        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            warning: '#ff9800',
            info: 'var(--techwave-main-color)'
        };

        if (colors[type]) {
            notification.style.background = colors[type];
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Utility method to speak chatbot responses
    speakBotResponse(responseElement) {
        if (!responseElement) return;
        
        const text = responseElement.textContent || responseElement.innerText;
        this.speakText(text, { rate: 0.85 }); // Slightly slower for better comprehension
    }

    // Method to auto-add TTS to chat responses
    enhanceChatResponses() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Look for bot chat responses
                        const botChats = node.querySelectorAll('.bot__chat .chat');
                        botChats.forEach(chat => {
                            if (!chat.querySelector('.tts-inline-btn')) {
                                this.addInlineButton(chat);
                            }
                        });
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Initialize TTS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if browser supports speech synthesis
    if ('speechSynthesis' in window) {
        window.vedanexTTS = new VedaNexTTS();
        
        // Auto-enhance chat responses
        window.vedanexTTS.enhanceChatResponses();
        
        // Add CSS animations
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(animationStyle);
        
        console.log('VedaNex TTS initialized successfully!');
    } else {
        console.warn('Speech Synthesis not supported in this browser');
    }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VedaNexTTS;
}