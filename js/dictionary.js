// js/dictionary.js
import { eventBus } from './events.js';

export const langData = {
    es: {
        url: './data/es.json',
        values: {'A':1, 'B':3, 'C':3, 'D':2, 'E':1, 'F':4, 'G':2, 'H':4, 'I':1, 'J':7, 'L':1, 'M':3, 'N':1, 'Ñ':8, 'O':1, 'P':3, 'Q':5, 'R':1, 'S':1, 'T':1, 'U':1, 'V':4, 'X':8, 'Y':4, 'Z':9},
        bag: "AAAAAAAAAAAAEEEEEEEEEEEEOOOOOOOOOIIIIIISSSSSSNNNNNLLLLRRRRRUUUUUTTTTDDDDDGGCCCCBBMMMPPHHFFVYYQJXZÑ"
    },
    en: {
        url: './data/en.json',
        values: {'A':1, 'B':3, 'C':3, 'D':2, 'E':1, 'F':4, 'G':2, 'H':4, 'I':1, 'J':7, 'K':5, 'L':1, 'M':3, 'N':1, 'O':1, 'P':3, 'Q':9, 'R':1, 'S':1, 'T':1, 'U':1, 'V':4, 'W':4, 'X':7, 'Y':4, 'Z':9},
        bag: "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ"
    },
    fr: {
        url: './data/fr.json',
        values: {'A':1, 'B':3, 'C':3, 'D':2, 'E':1, 'F':4, 'G':2, 'H':4, 'I':1, 'J':8, 'K':10, 'L':1, 'M':2, 'N':1, 'O':1, 'P':3, 'Q':8, 'R':1, 'S':1, 'T':1, 'U':1, 'V':4, 'W':10, 'X':10, 'Y':10, 'Z':10},
        bag: "AAAAAAAAAAAAAAABBCCCDDDEEEEEEEEEEEEEEEEEEFFGGHHIIIIIIIIJKLLLLLMMMNNNNNNOOOOOOPPQRRRRRRSSSSSSTTTTTTUUUUUUVVWXYZ"
    },
    gl: {
        url: './data/gl.json',
        values: {'A':1, 'B':3, 'C':3, 'D':2, 'E':1, 'F':4, 'G':2, 'H':4, 'I':1, 'J':8, 'L':1, 'M':3, 'N':1, 'Ñ':8, 'O':1, 'P':3, 'Q':5, 'R':1, 'S':1, 'T':1, 'U':1, 'V':4, 'X':4, 'Z':7},
        bag: "AAAAAAAAAAAAEEEEEEEEEEEEOOOOOOOOOIIIIIISSSSSSNNNNNNLLLLRRRRRRUUUUUTTTTDDDDDGGCCCCBBMMMPPHHFFVXXZÑQ"
    },
    ca: {
        url: './data/ca.json',
        values: {'A':1, 'B':3, 'C':2, 'D':2, 'E':1, 'F':4, 'G':3, 'H':4, 'I':1, 'J':8, 'L':1, 'M':3, 'N':1, 'O':1, 'P':3, 'Q':5, 'R':1, 'S':1, 'T':1, 'U':1, 'V':4, 'X':8, 'Z':8},
        bag: "AAAAAAAAAAAAEEEEEEEEEEEEOOOOOOOIIIIIISSSSSSNNNNNNLLLLLRRRRRRTTTTTUUUUDDDDCCCCCBBMMMGGGPPHHFFVXXZQJ"
    }
};

class Dictionary {
    constructor() {
        this.words = new Set();
        this.isLoaded = false;
        this.currentLang = 'es';
        this.db = null;
        this.initDB();
    }

    initDB() {
        const request = indexedDB.open('SletterDB', 1);
        
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('dictionaries')) {
                db.createObjectStore('dictionaries');
            }
        };

        request.onsuccess = (e) => {
            this.db = e.target.result;
        };

        request.onerror = (e) => {
            console.error('IndexedDB error', e);
        };
    }

    async loadDictionary(lang) {
        this.currentLang = lang;
        this.words.clear();
        this.isLoaded = false;
        eventBus.emit('DICTIONARY_LOADING');

        // Intentar cargar de IndexedDB primero
        if (this.db) {
            const cached = await this.getFromDB(lang);
            if (cached) {
                this.populate(cached);
                this.isLoaded = true;
                eventBus.emit('DICTIONARY_LOADED', lang);
                return;
            }
        }

        // Si no está en caché, hacer fetch a los JSON locales
        try {
            const response = await fetch(langData[lang].url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const wordsArray = await response.json();
            
            // Guardar en DB
            if (this.db) {
                this.saveToDB(lang, wordsArray);
            }
            
            this.populate(wordsArray);
            this.isLoaded = true;
            eventBus.emit('DICTIONARY_LOADED', lang);
        } catch (error) {
            console.error("Error al cargar el diccionario.", error);
            eventBus.emit('DICTIONARY_ERROR', lang);
        }
    }

    populate(wordsArray) {
        wordsArray.forEach(w => {
            if(w.length >= 3) {
                // Primero pasar a mayúsculas
                let upperW = w.toUpperCase();
                // Proteger la Ñ antes de normalizar
                let protectedW = upperW.replace(/Ñ/g, "##NYE##");
                // Quitar el punto volado del catalán (L·L → LL)
                protectedW = protectedW.replace(/·/g, "");
                // Normalizar y quitar diacríticos
                let normalized = protectedW.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                // Restaurar la Ñ
                normalized = normalized.replace(/##NYE##/g, "Ñ");
                
                this.words.add(normalized);
            }
        });
    }

    getFromDB(lang) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['dictionaries'], 'readonly');
            const store = transaction.objectStore('dictionaries');
            const request = store.get(lang);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    saveToDB(lang, data) {
        const transaction = this.db.transaction(['dictionaries'], 'readwrite');
        const store = transaction.objectStore('dictionaries');
        store.put(data, lang);
    }

    hasWord(word) {
        return this.words.has(word);
    }

    getBag() {
        return langData[this.currentLang].bag;
    }

    getValues() {
        return langData[this.currentLang].values;
    }
}

export const dictionary = new Dictionary();
