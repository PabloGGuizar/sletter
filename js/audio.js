// js/audio.js
import { eventBus } from './events.js';

class AudioManager {
    constructor() {
        this.audioCtx = null;
        this.isEnabled = true; 
        this.bindEvents();
        
        // Inicializar contexto de audio al primer click de la página para esquivar políticas de autoplay
        const unlockAudio = () => {
            this.init();
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('keydown', unlockAudio);
        };
        document.addEventListener('click', unlockAudio);
        document.addEventListener('keydown', unlockAudio);
    }

    init() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    }

    playTone(freq, type, duration, vol=0.1) {
        if (!this.isEnabled) return;
        this.init();

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(vol, this.audioCtx.currentTime);
        // Add a small initial attack to avoid clicks, then decay
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
    }

    playEat() {
        this.playTone(880, 'square', 0.1, 0.05);
    }

    playMove() {
        // Un click muy sutil y corto
        this.playTone(300, 'triangle', 0.05, 0.01);
    }

    playStart() {
        if (!this.isEnabled) return;
        this.init();
        this.playTone(440, 'sine', 0.1, 0.05);
        setTimeout(() => this.playTone(554, 'sine', 0.1, 0.05), 100);
        setTimeout(() => this.playTone(659, 'sine', 0.15, 0.05), 200);
    }

    playWordValid() {
        if (!this.isEnabled) return;
        this.init();
        this.playTone(440, 'sine', 0.15, 0.1);
        setTimeout(() => this.playTone(554, 'sine', 0.15, 0.1), 100);
        setTimeout(() => this.playTone(659, 'sine', 0.2, 0.1), 200);
        setTimeout(() => this.playTone(880, 'sine', 0.4, 0.1), 300);
    }

    playWordInvalid() {
        this.playTone(150, 'sawtooth', 0.3, 0.1);
    }

    playGameOver() {
        if (!this.isEnabled) return;
        this.init();
        this.playTone(440, 'square', 0.2, 0.1);
        setTimeout(() => this.playTone(392, 'square', 0.2, 0.1), 200);
        setTimeout(() => this.playTone(349, 'square', 0.2, 0.1), 400);
        setTimeout(() => this.playTone(330, 'square', 0.6, 0.1), 600);
    }

    toggleMute() {
        this.isEnabled = !this.isEnabled;
        return this.isEnabled;
    }

    bindEvents() {
        eventBus.on('PLAY_SOUND', (type) => {
            switch(type) {
                case 'start': this.playStart(); break;
                case 'move': this.playMove(); break;
                case 'eat': this.playEat(); break;
                case 'valid': this.playWordValid(); break;
                case 'invalid': this.playWordInvalid(); break;
                case 'gameover': this.playGameOver(); break;
            }
        });
    }
}

export const audioManager = new AudioManager();
