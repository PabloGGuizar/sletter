// js/ui.js
import { eventBus } from './events.js';
import { dictionary } from './dictionary.js';

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
        this.currentTexts = null;

        this.bindEvents();
        this.setupEventListeners();
    }

    async loadLocale(lang) {
        try {
            const res = await fetch(`./data/locales/${lang}.json`);
            if (!res.ok) throw new Error("Locale not found");
            this.currentTexts = await res.json();
        } catch (e) {
            console.error("Error loading locale, using fallback", e);
            this.currentTexts = {
                subtitle: "Solo se validan las palabras unidas a tu <strong>Cola</strong>.",
                loading: "Cargando...",
                playNow: "Jugar Ahora",
                move: "Moverse",
                submit: "Validar",
                orderTitle: "Orden de Letras Comidas",
                headTail: "<span>(Cabeza)</span> <span>(Cola)</span>",
                eatTiles: "Come fichas...",
                submitBtn: "Validar Palabra",
                foundWords: "Palabras Formadas",
                noWords: "Ninguna palabra aún",
                gameOver: "¡Juego Terminado!",
                scoreMsg: "Puntuación final: <strong>{score}</strong><br>Palabras formadas: {count}",
                playAgain: "Jugar de Nuevo",
                helpTitle: "Instrucciones",
                helpText: "Instrucciones no disponibles.",
                footer: "Sletter",
                recordsTitle: "Récords Locales"
            };
        }
        this.updateStaticUI();
    }

    bindEvents() {
        eventBus.on('SCORE_UPDATED', score => this.scoreDisplay.innerText = score);
        eventBus.on('LETTERS_UPDATED', letters => this.renderLetters(letters));
        eventBus.on('WORD_VALIDATED', data => this.addWordFound(data));
        eventBus.on('GAME_OVER', data => this.showGameOver(data));
        eventBus.on('DICTIONARY_LOADING', () => this.setLoadingState());
        eventBus.on('DICTIONARY_LOADED', (lang) => this.setReadyState(lang, false));
        eventBus.on('DICTIONARY_OFFLINE', (lang) => this.setReadyState(lang, true));
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

    updateStaticUI() {
        if (!this.currentTexts) return;
        const ui = this.currentTexts;
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
        if (this.wordsListContainer.children.length === 1 && this.wordsListContainer.children[0].id === 'lblNoWords') {
            this.wordsListContainer.innerHTML = `<span id="lblNoWords" class="text-slate-400 dark:text-slate-500 text-xs italic text-center mt-2">${ui.noWords}</span>`;
        }
        
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
        if(this.currentTexts) this.startBtn.innerText = this.currentTexts.loading;
        else this.startBtn.innerText = "Cargando...";
        this.startBtn.disabled = true;
        this.startBtn.classList.add('opacity-50', 'cursor-not-allowed');
        this.startBtn.classList.remove('hover:scale-105', 'active:scale-95');
    }

    setReadyState(lang, isOffline = false) {
        if(this.currentTexts) this.startBtn.innerText = isOffline
            ? (this.currentTexts.playOffline || this.currentTexts.playNow)
            : this.currentTexts.playNow;
        else this.startBtn.innerText = "Jugar Ahora";
        this.startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        this.startBtn.classList.add('hover:scale-105', 'active:scale-95');
        this.startBtn.disabled = false;

        this._setOfflineMode(isOffline);
    }

    _setOfflineMode(isOffline) {
        // Limpiar badge previo si existe
        const existingBadge = document.getElementById('offlineBadge');
        if (existingBadge) existingBadge.remove();

        // Restaurar pie de página normal
        const footerEl = document.getElementById('lblFooter');
        if (this.currentTexts) footerEl.innerHTML = this.currentTexts.footer;

        if (!isOffline) return;

        const ui = this.currentTexts || {};
        const badgeTitle = ui.offlineBadgeTitle || 'Sletter Pocket';
        const tooltip   = ui.offlineTooltip   || 'Modo de vocabulario reducido.';
        const footerTxt = ui.offlineFooter    || '⚡ Modo Pocket activado';

        // --- Badge en la esquina superior del canvas ---
        const canvasWrapper = document.querySelector('.relative.w-full.aspect-square');
        const badge = document.createElement('button');
        badge.id = 'offlineBadge';
        badge.setAttribute('aria-label', badgeTitle);
        badge.className = [
            'absolute top-2 right-2 z-20',
            'flex items-center gap-1',
            'bg-amber-400/90 dark:bg-amber-500/90 backdrop-blur-sm',
            'text-amber-900 dark:text-amber-950',
            'text-[10px] font-bold px-2 py-0.5 rounded-full',
            'shadow-md border border-amber-300 dark:border-amber-400',
            'transition-all hover:scale-105 active:scale-95 cursor-pointer',
            'select-none'
        ].join(' ');
        badge.innerHTML = `
            <svg class="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
                <path d="M10.71 5.05A16 16 0 0 1 22.56 9"/>
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                <line x1="12" y1="20" x2="12.01" y2="20"/>
            </svg>
            <span>${badgeTitle}</span>
        `;
        canvasWrapper.appendChild(badge);

        // --- Tooltip al tocar/hacer click en el badge ---
        let tooltipEl = null;
        const showTooltip = () => {
            if (tooltipEl) return;
            tooltipEl = document.createElement('div');
            tooltipEl.className = [
                'absolute top-10 right-2 z-30 max-w-[220px]',
                'bg-slate-800 dark:bg-slate-900 text-slate-100',
                'text-[11px] leading-snug font-medium',
                'px-3 py-2 rounded-xl shadow-2xl',
                'border border-slate-600',
                'animate-fade-in'
            ].join(' ');
            tooltipEl.textContent = tooltip;
            canvasWrapper.appendChild(tooltipEl);

            // Auto-cerrar tras 4s o al click fuera
            const dismiss = (e) => {
                if (tooltipEl && !badge.contains(e.target)) {
                    tooltipEl.remove();
                    tooltipEl = null;
                    document.removeEventListener('click', dismiss);
                }
            };
            setTimeout(() => {
                if (tooltipEl) { tooltipEl.remove(); tooltipEl = null; }
            }, 4000);
            // Delay para que el mismo click que abre no lo cierre
            setTimeout(() => document.addEventListener('click', dismiss), 50);
        };
        badge.addEventListener('click', showTooltip);

        // --- Pie de página modo pocket ---
        if (footerEl) {
            footerEl.innerHTML = `
                <span class="inline-flex items-center gap-1 text-amber-500 dark:text-amber-400 font-semibold">
                    ⚡ ${footerTxt.replace(/^⚡\s*/, '')}
                </span>
            `;
        }
    }

    renderLetters(letters) {
        if (letters.length === 0) {
            let eatText = this.currentTexts ? this.currentTexts.eatTiles : "Come fichas...";
            this.currentLettersContainer.innerHTML = `<span class="text-slate-400 dark:text-slate-500 text-xs italic w-full text-center mt-1">${eatText}</span>`;
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
        const ui = this.currentTexts || {
            gameOver: "¡Juego Terminado!",
            scoreMsg: "Puntuación final: <strong>{score}</strong><br>Palabras formadas: {count}",
            playAgain: "Jugar de Nuevo"
        };
        
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
