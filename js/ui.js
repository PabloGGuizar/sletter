// js/ui.js
import { eventBus } from './events.js';
import { dictionary } from './dictionary.js';

export const uiTexts = {
    es: {
        subtitle: "Solo se validan las palabras unidas a tu <strong>Cola</strong>. Si comes una letra equivocada, bloqueará tu palabra.",
        loading: "Cargando diccionario...",
        playNow: "Jugar Ahora",
        playOffline: "Jugar (Modo Offline)",
        move: "Moverse",
        submit: "Validar",
        orderTitle: "Orden de Letras Comidas",
        headTail: "<span>(Cabeza / Antigua)</span> <span>(Cola / Reciente)</span>",
        eatTiles: "Come fichas...",
        submitBtn: "Validar Palabra",
        foundWords: "Palabras Formadas",
        noWords: "Ninguna palabra aún",
        gameOver: "¡Juego Terminado!",
        scoreMsg: "Puntuación final: <strong>{score}</strong><br>Palabras formadas: {count}",
        playAgain: "Jugar de Nuevo",
        helpTitle: "Instrucciones",
        helpText: `
            <ul class="list-disc pl-5 space-y-2">
                <li>Mueve la serpiente usando las <b>flechas</b>, <b>WASD</b>, o deslizando.</li>
                <li>Come fichas para añadir letras a tu <b>cola</b>.</li>
                <li>Forma palabras válidas de 3 o más letras que terminen en la punta de tu cola.</li>
                <li>Presiona <b>Espacio</b> (o el botón Validar) para canjear tu palabra por puntos y reducir tu tamaño.</li>
                <li>Si te equivocas de letra, tu palabra quedará <b>bloqueada</b>. Debes usar esa letra errónea para formar una nueva palabra y liberarte.</li>
                <li>¡Pasa tus letras sobre los multiplicadores (<b>x2 L</b>, <b>x3 P</b>) en el tablero al momento de validar para multiplicar tu puntaje!</li>
                <li><b>Diccionarios Locales:</b> Español (636k), Inglés (274k) y Francés (336k) palabras validadas.</li>
            </ul>
        `,
        footer: "Creado por <a href='https://www.linkedin.com/in/pablogguizar/' target='_blank' class='text-indigo-500 hover:text-indigo-400 font-semibold underline'>Pablo G. Guízar</a>. Código fuente en <a href='https://github.com/PabloGGuizar/sletter' target='_blank' class='text-indigo-500 hover:text-indigo-400 font-semibold underline'>GitHub</a>.",
        recordsTitle: "Top Récords Locales"
    },
    en: {
        subtitle: "Only words attached to your <strong>Tail</strong> are validated. Wrong letters block your word.",
        loading: "Loading dictionary...",
        playNow: "Play Now",
        playOffline: "Play (Offline Mode)",
        move: "Move",
        submit: "Submit",
        orderTitle: "Eaten Letters Order",
        headTail: "<span>(Head / Oldest)</span> <span>(Tail / Newest)</span>",
        eatTiles: "Eat tiles...",
        submitBtn: "Submit Word",
        foundWords: "Words Found",
        noWords: "No words yet",
        gameOver: "Game Over!",
        scoreMsg: "Final score: <strong>{score}</strong><br>Words formed: {count}",
        playAgain: "Play Again",
        helpTitle: "How to Play",
        helpText: `
            <ul class="list-disc pl-5 space-y-2">
                <li>Move the snake using <b>Arrows</b>, <b>WASD</b>, or swipe gestures.</li>
                <li>Eat tiles to add letters to your <b>tail</b>.</li>
                <li>Form valid words of 3 or more letters ending at the tip of your tail.</li>
                <li>Press <b>Space</b> (or Submit button) to cash in your word for points and reduce your size.</li>
                <li>If you eat a wrong letter, it <b>blocks</b> your word. You must use that wrong letter to form a new word to free yourself!</li>
                <li>Place your letters over multipliers (<b>x2 L</b>, <b>x3 W</b>) on the board when submitting for massive points!</li>
                <li><b>Local Dictionaries:</b> Spanish (636k), English (274k), and French (336k) validated words.</li>
            </ul>
        `,
        footer: "Created by <a href='https://www.linkedin.com/in/pablogguizar/' target='_blank' class='text-indigo-500 hover:text-indigo-400 font-semibold underline'>Pablo G. Guízar</a>. Source code on <a href='https://github.com/PabloGGuizar/sletter' target='_blank' class='text-indigo-500 hover:text-indigo-400 font-semibold underline'>GitHub</a>.",
        recordsTitle: "Top Local Records"
    },
    fr: {
        subtitle: "Seuls les mots rattachés à votre <strong>Queue</strong> sont validés. Les mauvaises lettres bloquent votre mot.",
        loading: "Chargement du dictionnaire...",
        playNow: "Jouer Maintenant",
        playOffline: "Jouer (Mode Hors Ligne)",
        move: "Bouger",
        submit: "Valider",
        orderTitle: "Ordre des Lettres Mangées",
        headTail: "<span>(Tête / Plus ancienne)</span> <span>(Queue / Plus récente)</span>",
        eatTiles: "Mangez des tuiles...",
        submitBtn: "Valider le Mot",
        foundWords: "Mots Formés",
        noWords: "Aucun mot pour l'instant",
        gameOver: "Fin de Partie!",
        scoreMsg: "Score final: <strong>{score}</strong><br>Mots formés: {count}",
        playAgain: "Rejouer",
        helpTitle: "Comment Jouer",
        helpText: `
            <ul class="list-disc pl-5 space-y-2">
                <li>Déplacez le serpent avec les <b>Flèches</b>, <b>WASD</b>, ou en glissant.</li>
                <li>Mangez des tuiles pour ajouter des lettres à votre <b>queue</b>.</li>
                <li>Formez des mots valides de 3 lettres ou plus se terminant à la pointe de votre queue.</li>
                <li>Appuyez sur <b>Espace</b> (ou le bouton Valider) pour échanger votre mot contre des points et réduire votre taille.</li>
                <li>Si vous mangez une mauvaise lettre, cela <b>bloque</b> votre mot. Vous devez utiliser cette lettre pour former un nouveau mot !</li>
                <li>Placez vos lettres sur les multiplicateurs (<b>x2 L</b>, <b>x3 M</b>) sur le plateau lors de la validation pour des points massifs !</li>
                <li><b>Dictionnaires Locaux:</b> Espagnol (636k), Anglais (274k) et Français (336k) mots validés.</li>
            </ul>
        `,
        footer: "Créé par <a href='https://www.linkedin.com/in/pablogguizar/' target='_blank' class='text-indigo-500 hover:text-indigo-400 font-semibold underline'>Pablo G. Guízar</a>. Code source sur <a href='https://github.com/PabloGGuizar/sletter' target='_blank' class='text-indigo-500 hover:text-indigo-400 font-semibold underline'>GitHub</a>.",
        recordsTitle: "Meilleurs Records Locaux"
    }
};

class UIManager {
    constructor() {
        // Elements
        this.themeToggleBtn = document.getElementById('themeToggleBtn');
        this.muteToggleBtn = document.getElementById('muteToggleBtn');
        this.iconSoundOn = document.getElementById('iconSoundOn');
        this.iconSoundOff = document.getElementById('iconSoundOff');
        
        this.helpBtn = document.getElementById('helpBtn');
        this.closeHelpBtn = document.getElementById('closeHelpBtn');
        this.helpModal = document.getElementById('helpModal');
        this.langSelect = document.getElementById('langSelect');
        
        this.startBtn = document.getElementById('startBtn');
        this.submitWordBtn = document.getElementById('submitWordBtn');
        
        this.scoreDisplay = document.getElementById('scoreDisplay');
        this.currentLettersContainer = document.getElementById('currentLetters');
        this.wordsListContainer = document.getElementById('wordsList');
        this.recordsContainer = document.getElementById('recordsList');
        this.clearRecordsBtn = document.getElementById('clearRecordsBtn');
        
        this.overlay = document.getElementById('overlay');
        this.overlayTitle = document.getElementById('overlayTitle');
        this.overlayMessage = document.getElementById('overlayMessage');
        
        this.aliasContainer = document.getElementById('aliasContainer');
        this.aliasInput = document.getElementById('aliasInput');
        this.saveAliasBtn = document.getElementById('saveAliasBtn');
        this.skipAliasBtn = document.getElementById('skipAliasBtn');

        this.pendingScore = 0;

        this.bindEvents();
        this.setupEventListeners();
    }

    bindEvents() {
        eventBus.on('SCORE_UPDATED', score => this.scoreDisplay.innerText = score);
        eventBus.on('LETTERS_UPDATED', letters => this.renderLetters(letters));
        eventBus.on('WORD_VALIDATED', data => this.addWordFound(data));
        eventBus.on('GAME_OVER', data => this.showGameOver(data));
        eventBus.on('DICTIONARY_LOADING', () => this.setLoadingState());
        eventBus.on('DICTIONARY_LOADED', (lang) => this.setReadyState(lang));
        eventBus.on('RECORDS_UPDATED', records => this.renderRecords(records));
    }

    setupEventListeners() {
        this.themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            eventBus.emit('THEME_TOGGLED');
        });

        this.muteToggleBtn.addEventListener('click', () => {
            eventBus.emit('TOGGLE_MUTE');
            this.iconSoundOn.classList.toggle('hidden');
            this.iconSoundOn.classList.toggle('block');
            this.iconSoundOff.classList.toggle('hidden');
            this.iconSoundOff.classList.toggle('block');
        });

        this.clearRecordsBtn.addEventListener('click', () => {
            if(confirm("¿Estás seguro de que deseas borrar todos los récords locales?")) {
                eventBus.emit('CLEAR_RECORDS');
            }
        });

        this.helpBtn.addEventListener('click', () => {
            this.helpModal.classList.remove('hidden');
            this.helpModal.classList.add('flex');
        });
        
        const closeModal = () => {
            this.helpModal.classList.add('hidden');
            this.helpModal.classList.remove('flex');
        };
        this.closeHelpBtn.addEventListener('click', closeModal);
        this.helpModal.addEventListener('click', (e) => { if(e.target === this.helpModal) closeModal(); });

        this.startBtn.addEventListener('click', () => {
            this.wordsListContainer.innerHTML = '';
            eventBus.emit('START_GAME');
            this.overlay.classList.add('opacity-0', 'pointer-events-none');
        });

        this.submitWordBtn.addEventListener('click', () => {
            eventBus.emit('SUBMIT_WORD');
        });

        this.langSelect.addEventListener('change', (e) => {
            eventBus.emit('LANGUAGE_CHANGED', e.target.value);
        });

        this.saveAliasBtn.addEventListener('click', () => {
            const alias = this.aliasInput.value.trim() || 'Anónimo';
            const lang = this.langSelect.value || 'es';
            
            eventBus.emit('SAVE_RECORD', { lang, points: this.pendingScore, alias });
            
            this.aliasContainer.classList.add('hidden');
            this.aliasContainer.classList.remove('flex');
            this.startBtn.classList.remove('hidden');
        });

        this.skipAliasBtn.addEventListener('click', () => {
            this.aliasContainer.classList.add('hidden');
            this.aliasContainer.classList.remove('flex');
            this.startBtn.classList.remove('hidden');
        });
    }

    updateStaticUI(lang) {
        const ui = uiTexts[lang];
        document.getElementById('overlayMessage').innerHTML = ui.subtitle;
        document.getElementById('lblMove').innerText = ui.move;
        document.getElementById('lblSubmit').innerText = ui.submit;
        document.getElementById('lblOrder').innerText = ui.orderTitle;
        document.getElementById('lblHeadTail').innerHTML = ui.headTail;
        document.getElementById('lblSubmitBtn').innerText = ui.submitBtn;
        document.getElementById('lblFound').innerText = ui.foundWords;
        document.getElementById('lblRecordsTitle').innerText = ui.recordsTitle;
        
        document.getElementById('lblHelpTitle').innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ${ui.helpTitle}
        `;
        document.getElementById('lblHelpText').innerHTML = ui.helpText;
        document.getElementById('lblFooter').innerHTML = ui.footer;
        
        this.currentLettersContainer.innerHTML = `<span class="text-slate-400 dark:text-slate-500 text-xs italic w-full text-center mt-1">${ui.eatTiles}</span>`;
        this.wordsListContainer.innerHTML = `<span class="text-slate-400 dark:text-slate-500 text-xs italic text-center mt-2">${ui.noWords}</span>`;
        
        this.overlayTitle.innerHTML = `
            <span class="relative inline-block mr-[0.02em]">
                <span class="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-emerald-600">S</span>
                <span class="absolute top-[22%] right-[12%] w-[0.2em] h-[0.2em] bg-white rounded-full flex items-center justify-center shadow-sm pointer-events-none">
                    <span class="w-[0.1em] h-[0.1em] bg-slate-900 rounded-full"></span>
                </span>
                <svg class="absolute top-[8%] -right-[20%] w-[0.35em] h-[0.35em] text-rose-500 -rotate-12 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M0 12h12l6 -6"></path>
                    <path d="M12 12l6 6"></path>
                </svg>
            </span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">letter</span>
        `;
    }

    setLoadingState() {
        const lang = document.getElementById('langSelect').value || 'es';
        this.startBtn.innerText = uiTexts[lang].loading;
        this.startBtn.disabled = true;
        this.startBtn.classList.add('opacity-50', 'cursor-not-allowed');
        this.startBtn.classList.remove('hover:scale-105', 'active:scale-95');
    }

    setReadyState(lang) {
        // En caso de modo offline, el diccionario podría notificar, pero asumimos Play Now.
        this.startBtn.innerText = uiTexts[lang].playNow;
        this.startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        this.startBtn.classList.add('hover:scale-105', 'active:scale-95');
        this.startBtn.disabled = false;
    }

    renderLetters(letters) {
        if (letters.length === 0) {
            const lang = document.getElementById('langSelect').value || 'es';
            this.currentLettersContainer.innerHTML = `<span class="text-slate-400 dark:text-slate-500 text-xs italic w-full text-center mt-1">${uiTexts[lang].eatTiles}</span>`;
            return;
        }

        this.currentLettersContainer.innerHTML = '';
        letters.forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded tile font-bold text-sm sm:text-base border border-indigo-700 relative shrink-0';
            span.innerText = char;
            
            if(index === 0) span.classList.add('ring-2', 'ring-emerald-400');
            if(index === letters.length - 1) span.classList.add('ring-2', 'ring-rose-400');
            
            this.currentLettersContainer.appendChild(span);
        });
    }

    addWordFound(data) {
        const span = document.createElement('div');
        span.className = 'flex justify-between items-center text-xs sm:text-sm bg-slate-100 dark:bg-slate-700/50 p-1.5 sm:p-2 rounded font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600';
        
        let multBadge = '';
        if (data.multTypes && data.multTypes.length > 0) {
            const mText = data.multTypes.join(', ');
            multBadge = `<span class="text-[10px] bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 px-1 rounded ml-2">+${mText}</span>`;
        }

        span.innerHTML = `<span>${data.word} ${multBadge}</span> <span class="text-emerald-600 dark:text-emerald-400">+${data.points} pts</span>`;
        this.wordsListContainer.prepend(span);
        
        const noWords = document.getElementById('lblNoWords');
        if (noWords) noWords.remove();
    }

    showGameOver(data) {
        const lang = document.getElementById('langSelect').value || 'es';
        const ui = uiTexts[lang];
        
        this.overlayTitle.innerHTML = `<span class="text-rose-500">${ui.gameOver}</span>`;
        this.overlayMessage.innerHTML = ui.scoreMsg.replace('{score}', data.score).replace('{count}', data.wordsCount);
        this.startBtn.innerText = ui.playAgain;
        
        this.pendingScore = data.score;
        this.aliasInput.value = '';
        this.startBtn.classList.add('hidden');
        this.aliasContainer.classList.remove('hidden');
        this.aliasContainer.classList.add('flex');
        
        this.overlay.classList.remove('opacity-0', 'pointer-events-none');
    }

    renderRecords(records) {
        this.recordsContainer.innerHTML = '';
        if (records.length === 0) {
            this.recordsContainer.innerHTML = `<span class="text-slate-400 dark:text-slate-500 text-[10px] italic w-full text-center mt-1">Sin récords</span>`;
            return;
        }

        const flags = { es: '🇪🇸', en: '🇺🇸', fr: '🇫🇷' };

        records.forEach((rec, i) => {
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center text-[10px] bg-slate-50 dark:bg-slate-700 p-1 rounded font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600';
            const flag = flags[rec.lang] || '🏳️';
            div.innerHTML = `<span class="truncate pr-2" title="${rec.alias}">#${i+1} ${flag} ${rec.alias}</span> <span class="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">${rec.points} pts</span>`;
            this.recordsContainer.appendChild(div);
        });
    }
}

export const uiManager = new UIManager();
