// js/ui.js
import { eventBus } from './events.js';
import { dictionary } from './dictionary.js';
import { storage } from './storage.js';

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
        this.aliasError = document.getElementById('aliasError');
        this.privacyInfoBtn = document.getElementById('privacyInfoBtn');
        this.privacyModal = document.getElementById('privacyModal');
        this.closePrivacyBtn = document.getElementById('closePrivacyBtn');

        this.tabLocal = document.getElementById('tabLocal');
        this.tabGlobal = document.getElementById('tabGlobal');
        this.globalRecordsList = document.getElementById('globalRecordsList');
        this.globalLangSelect = document.getElementById('globalLangSelect');

        this.pendingScore = 0;
        this.currentTexts = null;
        this.currentGlobalRecords = [];

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
                recordsTitle: "Récords Locales",
                privacyTitle: "Tratamiento de Información",
                privacyText: "<p>Al guardar tu puntuación de forma global, aceptas lo siguiente:</p><ul class=\"list-disc pl-5 space-y-1\"><li>Se generará un <strong>token anónimo único</strong> en tu dispositivo que nos permitirá actualizar tu récord sin solicitar datos personales.</li><li>Tu alias y puntuación serán públicos y visibles para todos los jugadores en la tabla de clasificación.</li></ul>",
                publishGlobal: "Publicar en ranking global",
                aliasInvalid: "Alias inválido. Solo letras, números y _.",
                aliasTaken: "Este alias ya está en uso globalmente. Elige otro.",
                saving: "Guardando...",
                saveError: "Error de conexión o guardado."
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
        eventBus.on('DICTIONARY_LOADED', (lang) => this.setReadyState(lang));
        eventBus.on('DICTIONARY_ERROR', (lang) => this.setErrorState(lang));
        eventBus.on('RECORDS_UPDATED', records => this.renderRecords(records));
        eventBus.on('GLOBAL_RECORDS_UPDATED', data => this.renderGlobalRecords(data.records, data.userTokenHash));
        eventBus.on('SAVE_RECORD_SUCCESS', () => this.handleSaveSuccess());
        eventBus.on('SAVE_RECORD_ERROR', msg => this.handleSaveError(msg));
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

        this.privacyInfoBtn.addEventListener('click', () => {
            this.privacyModal.classList.remove('hidden');
            this.privacyModal.classList.add('flex');
        });
        
        const closePrivacyModal = () => {
            this.privacyModal.classList.add('hidden');
            this.privacyModal.classList.remove('flex');
        };
        this.closePrivacyBtn.addEventListener('click', closePrivacyModal);
        this.privacyModal.addEventListener('click', (e) => { if(e.target === this.privacyModal) closePrivacyModal(); });

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
            this.globalLangSelect.value = e.target.value;
        });

        this.saveAliasBtn.addEventListener('click', () => {
            const alias = this.aliasInput.value.trim() || 'Anónimo';
            const regex = /^[a-zA-Z0-9_]{1,20}$/;
            if (alias !== 'Anónimo' && !regex.test(alias)) {
                this.aliasError.innerText = (this.currentTexts && this.currentTexts.aliasInvalid) ? this.currentTexts.aliasInvalid : 'Alias inválido. Solo letras, números y _.';
                this.aliasError.classList.remove('hidden');
                return;
            }
            this.aliasError.classList.add('hidden');
            
            const lang = this.langSelect.value || 'es';
            const saveGlobal = document.getElementById('globalRankCheckbox').checked;
            
            this.saveAliasBtn.disabled = true;
            this.saveAliasBtn.innerText = (this.currentTexts && this.currentTexts.saving) ? this.currentTexts.saving : "Guardando...";

            eventBus.emit('SAVE_RECORD', { 
                lang, 
                points: this.pendingScore, 
                alias, 
                duration: this.pendingDuration,
                saveGlobal: saveGlobal 
            });
        });

        this.skipAliasBtn.addEventListener('click', () => {
            this.aliasError.classList.add('hidden');
            this.aliasContainer.classList.add('hidden');
            this.aliasContainer.classList.remove('flex');
            this.startBtn.classList.remove('hidden');
        });

        this.tabLocal.addEventListener('click', () => this.switchTab('local'));
        this.tabGlobal.addEventListener('click', () => {
            this.switchTab('global');
            eventBus.emit('FETCH_GLOBAL_RECORDS', this.globalLangSelect.value);
        });

        this.globalLangSelect.addEventListener('change', (e) => {
            eventBus.emit('FETCH_GLOBAL_RECORDS', e.target.value);
        });
    }

    handleSaveSuccess() {
        this.saveAliasBtn.disabled = false;
        this.saveAliasBtn.innerText = "Guardar";
        this.aliasContainer.classList.add('hidden');
        this.aliasContainer.classList.remove('flex');
        this.startBtn.classList.remove('hidden');
    }

    handleSaveError(errorCode) {
        this.saveAliasBtn.disabled = false;
        this.saveAliasBtn.innerText = "Guardar";
        
        let msg = errorCode;
        if (errorCode === 'ALIAS_TAKEN') {
            msg = (this.currentTexts && this.currentTexts.aliasTaken) ? this.currentTexts.aliasTaken : "Este alias ya está en uso globalmente. Elige otro.";
        } else if (errorCode === 'SAVE_ERROR') {
            msg = (this.currentTexts && this.currentTexts.saveError) ? this.currentTexts.saveError : "Error de conexión o guardado.";
        }
        
        this.aliasError.innerText = msg;
        this.aliasError.classList.remove('hidden');
    }

    switchTab(tab) {
        if (tab === 'local') {
            this.tabLocal.classList.add('text-indigo-600', 'dark:text-indigo-400', 'border-indigo-600', 'dark:border-indigo-400');
            this.tabLocal.classList.remove('text-slate-400', 'border-transparent');
            this.tabGlobal.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'border-indigo-600', 'dark:border-indigo-400');
            this.tabGlobal.classList.add('text-slate-400', 'border-transparent');
            
            this.recordsContainer.classList.remove('hidden');
            this.recordsContainer.classList.add('flex');
            this.globalRecordsList.classList.add('hidden');
            this.globalRecordsList.classList.remove('flex');
            
            this.clearRecordsBtn.classList.remove('hidden');
            this.globalLangSelect.classList.add('hidden');
        } else {
            this.tabGlobal.classList.add('text-indigo-600', 'dark:text-indigo-400', 'border-indigo-600', 'dark:border-indigo-400');
            this.tabGlobal.classList.remove('text-slate-400', 'border-transparent');
            this.tabLocal.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'border-indigo-600', 'dark:border-indigo-400');
            this.tabLocal.classList.add('text-slate-400', 'border-transparent');
            
            this.globalRecordsList.classList.remove('hidden');
            this.globalRecordsList.classList.add('flex');
            this.recordsContainer.classList.add('hidden');
            this.recordsContainer.classList.remove('flex');
            
            this.clearRecordsBtn.classList.add('hidden');
            this.globalLangSelect.classList.remove('hidden');
        }
    }

    updateStaticUI() {
        if (!this.currentTexts) return;
        const ui = this.currentTexts;
        
        const el = (id) => document.getElementById(id);
        
        if (el('overlayMessage')) el('overlayMessage').innerHTML = ui.subtitle;
        if (el('lblMove')) el('lblMove').innerText = ui.move;
        if (el('lblSubmit')) el('lblSubmit').innerText = ui.submit;
        if (el('lblOrder')) el('lblOrder').innerText = ui.orderTitle;
        if (el('lblHeadTail')) el('lblHeadTail').innerHTML = ui.headTail;
        if (el('lblSubmitBtn')) el('lblSubmitBtn').innerText = ui.submitBtn;
        if (el('lblFound')) el('lblFound').innerText = ui.foundWords;
        if (el('lblRecordsTitle')) el('lblRecordsTitle').innerText = ui.recordsTitle;
        
        if (ui.privacyTitle) {
            document.getElementById('lblPrivacyTitle').innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                ${ui.privacyTitle}
            `;
        }
        if (ui.privacyText) {
            document.getElementById('lblPrivacyText').innerHTML = ui.privacyText;
        }
        
        if (el('lblPublishGlobal') && ui.publishGlobal) {
            el('lblPublishGlobal').innerText = ui.publishGlobal;
        }
        
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

    setReadyState(lang) {
        if(this.currentTexts) this.startBtn.innerText = this.currentTexts.playNow;
        else this.startBtn.innerText = "Jugar Ahora";
        this.startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        this.startBtn.classList.add('hover:scale-105', 'active:scale-95');
        this.startBtn.disabled = false;
    }

    setErrorState(lang) {
        const errorMsg = {
            es: 'Error al cargar el diccionario. Revisa tu conexión.',
            en: 'Failed to load dictionary. Check your connection.',
            fr: 'Erreur de chargement du dictionnaire. Vérifiez votre connexion.',
            gl: 'Erro ao cargar o dicionario. Comproba a túa conexión.',
            ca: 'Error en carregar el diccionari. Comprova la teva connexió.',
            eu: 'Errorea hiztegia kargatzean. Egiaztatu zure konexioa.'
        };
        this.startBtn.innerText = errorMsg[lang] || errorMsg.es;
        this.startBtn.disabled = true;
        this.startBtn.classList.add('opacity-50', 'cursor-not-allowed', 'bg-rose-600');
        this.startBtn.classList.remove('hover:scale-105', 'active:scale-95', 'from-indigo-500', 'to-cyan-500');
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
        this.pendingDuration = data.duration;
        this.aliasInput.value = storage.getAlias();
        this.aliasError.classList.add('hidden');
        this.startBtn.classList.add('hidden');
        this.aliasContainer.classList.remove('hidden');
        this.aliasContainer.classList.add('flex');
        
        // --- Validación para mostrar/ocultar el Checkbox Global ---
        const lang = this.langSelect.value || 'es';
        const localRecords = storage.records[lang] || [];
        const personalBest = localRecords.length > 0 ? Math.max(...localRecords.map(r => r.points)) : -1;
        const beatsLocal = data.score > personalBest;
        
        let lowestGlobalTop20 = 0;
        if (this.currentGlobalRecords && this.currentGlobalRecords.length >= 20) {
            lowestGlobalTop20 = this.currentGlobalRecords[19].score; // El 20vo puesto (índice 19)
        }
        const beatsGlobal = data.score > lowestGlobalTop20;

        const globalCheckbox = document.getElementById('globalRankCheckbox');
        const checkboxContainer = globalCheckbox.parentElement;
        
        if (beatsLocal && beatsGlobal) {
            checkboxContainer.classList.remove('hidden');
            checkboxContainer.classList.add('flex');
            globalCheckbox.checked = true;
        } else {
            checkboxContainer.classList.remove('flex');
            checkboxContainer.classList.add('hidden');
            globalCheckbox.checked = false;
        }
        // ------------------------------------------------------------
        
        this.overlay.classList.remove('opacity-0', 'pointer-events-none');
    }

    renderRecords(records) {
        this.recordsContainer.innerHTML = '';
        if (records.length === 0) {
            this.recordsContainer.innerHTML = `<span class="text-slate-400 dark:text-slate-500 text-[10px] italic w-full text-center mt-1">Sin récords</span>`;
            return;
        }

        records.forEach((rec, i) => {
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center text-[10px] bg-slate-50 dark:bg-slate-700 p-1 rounded font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600';
            const langAbbr = rec.lang.toUpperCase();
            
            const aliasSpan = document.createElement('span');
            aliasSpan.className = 'truncate pr-2';
            aliasSpan.title = rec.alias;
            aliasSpan.textContent = `#${i+1} [${langAbbr}] ${rec.alias}`;
            
            const scoreSpan = document.createElement('span');
            scoreSpan.className = 'text-indigo-600 dark:text-indigo-400 font-bold shrink-0';
            scoreSpan.textContent = `${rec.points} pts`;
            
            div.appendChild(aliasSpan);
            div.appendChild(scoreSpan);
            this.recordsContainer.appendChild(div);
        });
    }

    renderGlobalRecords(records, userTokenHash) {
        this.currentGlobalRecords = records || [];
        this.globalRecordsList.innerHTML = '';
        if (!records) {
            this.globalRecordsList.innerHTML = `<span class="text-slate-400 dark:text-slate-500 text-[10px] italic w-full text-center mt-1">Cargando...</span>`;
            return;
        }

        if (records.length === 0) {
            this.globalRecordsList.innerHTML = `<span class="text-slate-400 dark:text-slate-500 text-[10px] italic w-full text-center mt-1">Sin récords globales</span>`;
            return;
        }

        records.forEach((rec, i) => {
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center text-[10px] bg-slate-50 dark:bg-slate-700 p-1 rounded font-medium border border-slate-200 dark:border-slate-600';
            
            if (userTokenHash && rec.hashedToken === userTokenHash) {
                div.classList.add('ring-1', 'ring-indigo-500', 'bg-indigo-50', 'dark:bg-indigo-900/30');
            }
            
            const aliasSpan = document.createElement('span');
            aliasSpan.className = 'truncate pr-2';
            if (userTokenHash && rec.hashedToken === userTokenHash) {
                aliasSpan.classList.add('text-indigo-700', 'dark:text-indigo-300', 'font-bold');
            } else {
                aliasSpan.classList.add('text-slate-600', 'dark:text-slate-300');
            }
            aliasSpan.textContent = `#${i+1} ${rec.alias}`;
            aliasSpan.title = rec.alias;

            const scoreSpan = document.createElement('span');
            scoreSpan.className = 'text-indigo-600 dark:text-indigo-400 font-bold shrink-0';
            scoreSpan.textContent = `${rec.score} pts`;

            div.appendChild(aliasSpan);
            div.appendChild(scoreSpan);
            this.globalRecordsList.appendChild(div);
        });
    }
}

export const uiManager = new UIManager();
