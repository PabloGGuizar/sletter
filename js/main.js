// js/main.js
import { eventBus } from './events.js';
import { storage } from './storage.js';
import { dictionary } from './dictionary.js';
import { uiManager } from './ui.js';
import { GameEngine } from './game.js';
import { audioManager } from './audio.js';
import { api } from './api.js';

// Initialize Game Engine
const game = new GameEngine('gameCanvas');

let currentGlobalRecords = [];
let currentLangFetching = null;

// Listen to storage events
eventBus.on('SAVE_RECORD', async (data) => {
    let globalError = null;

    // Asegurarse de tener un token generado antes de mandar al global
    if (!storage.getToken()) {
        storage.generateToken();
    }

    if (data.duration !== undefined && data.saveGlobal) {
        // Filtro Local: Solo enviar si supera el récord personal y entra al Top 20 Global
        const localRecords = storage.records[data.lang] || [];
        const personalBest = localRecords.length > 0 ? Math.max(...localRecords.map(r => r.points)) : -1;
        
        let lowestGlobalTopScore = 0;
        if (currentGlobalRecords && currentGlobalRecords.length >= 20) {
            lowestGlobalTopScore = currentGlobalRecords[19].score;
        }

        // Si el puntaje no supera el récord personal o no entra al Top 20, cancelar petición y simular éxito
        if (data.points <= personalBest || data.points <= lowestGlobalTopScore) {
            storage.setAlias(data.alias);
            storage.saveRecord(data.lang, data.points, data.alias);
            eventBus.emit('SAVE_RECORD_SUCCESS');
            return;
        }

        // Send to global leaderboard
        const payload = {
            alias: data.alias,
            token: storage.getToken(),
            score: data.points,
            language: data.lang,
            duration: data.duration,
            timestamp: new Date().getTime()
        };
        try {
            const res = await api.submitScore(payload);
            if (res && res.error === 'ALIAS_TAKEN') {
                globalError = 'ALIAS_TAKEN';
            } else if (res && res.error && res.error !== 'not_configured') {
                // Ignore not_configured for local play
                globalError = 'SAVE_ERROR';
            }
        } catch (e) {
            globalError = 'SAVE_ERROR';
        }
    }

    if (globalError) {
        eventBus.emit('SAVE_RECORD_ERROR', globalError);
        return;
    }

    storage.setAlias(data.alias);
    storage.saveRecord(data.lang, data.points, data.alias);
    eventBus.emit('SAVE_RECORD_SUCCESS');
    
    if (data.duration !== undefined && data.saveGlobal) {
        const globalLangSelect = document.getElementById('globalLangSelect');
        if (globalLangSelect && !globalLangSelect.classList.contains('hidden')) {
            eventBus.emit('FETCH_GLOBAL_RECORDS', globalLangSelect.value);
        }
    }
});

eventBus.on('FETCH_GLOBAL_RECORDS', async (lang) => {
    currentLangFetching = lang;
    eventBus.emit('GLOBAL_RECORDS_UPDATED', { records: null }); // loading state
    const records = await api.getLeaderboard(lang);
    
    if (currentLangFetching === lang) {
        currentGlobalRecords = records;
    }
    
    // We try to highlight by alias since the token is secretly hashed by the server
    const currentAlias = storage.getAlias();
    const recordsWithHighlight = records.map(r => {
        if (r.alias === currentAlias) {
            return { ...r, hashedToken: 'current_user' };
        }
        return r;
    });
    
    eventBus.emit('GLOBAL_RECORDS_UPDATED', { records: recordsWithHighlight, userTokenHash: 'current_user' });
});

eventBus.on('CLEAR_RECORDS', () => {
    storage.clearRecords();
});

eventBus.on('TOGGLE_MUTE', () => {
    audioManager.toggleMute();
});

// Listen to language change
eventBus.on('LANGUAGE_CHANGED', async (lang) => {
    await uiManager.loadLocale(lang);
    dictionary.loadDictionary(lang);
    // Refresh records UI
    eventBus.emit('RECORDS_UPDATED', storage.getTopGlobal());
    // Redraw game to apply possible localized texts on multipliers
    if(!game.isGameRunning) game.drawGame();
});

// App initialization
async function init() {
    // Initial language
    const langSelect = document.getElementById('langSelect');
    const initialLang = langSelect.value || 'es';
    
    await uiManager.loadLocale(initialLang);
    eventBus.emit('RECORDS_UPDATED', storage.getTopGlobal());
    eventBus.emit('FETCH_GLOBAL_RECORDS', initialLang);
    
    // First load dictionary
    dictionary.loadDictionary(initialLang);
    
    // Initial draw
    game.drawGame();
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

