// js/main.js
import { eventBus } from './events.js';
import { storage } from './storage.js';
import { dictionary } from './dictionary.js';
import { uiManager } from './ui.js';
import { GameEngine } from './game.js';
import { audioManager } from './audio.js';

// Initialize Game Engine
const game = new GameEngine('gameCanvas');

// Listen to storage events
eventBus.on('SAVE_RECORD', (data) => {
    storage.saveRecord(data.lang, data.points, data.alias);
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
