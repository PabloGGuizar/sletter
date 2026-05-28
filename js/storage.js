// js/storage.js
import { eventBus } from './events.js';

class StorageManager {
    constructor() {
        this.records = this.loadRecords();
        this.alias = this.loadAlias();
        this.token = this.loadToken();
    }

    loadRecords() {
        const stored = localStorage.getItem('sletter_records');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Error parsing records", e);
            }
        }
        return { es: [], en: [], fr: [], gl: [], ca: [], eu: [] };
    }

    saveRecord(lang, points, alias) {
        if (!this.records[lang]) {
            this.records[lang] = [];
        }

        this.records[lang].push({
            points: points,
            date: new Date().getTime(),
            lang: lang,
            alias: alias || 'Anónimo'
        });

        // Ordenar de mayor a menor y mantener el top 20 por idioma
        this.records[lang].sort((a, b) => b.points - a.points);
        this.records[lang] = this.records[lang].slice(0, 20);

        localStorage.setItem('sletter_records', JSON.stringify(this.records));
        eventBus.emit('RECORDS_UPDATED', this.getTopGlobal());
    }

    getTopGlobal(limit = 10) {
        let allRecords = [];
        Object.values(this.records).forEach(langArr => {
            if (Array.isArray(langArr)) {
                allRecords = allRecords.concat(langArr);
            }
        });
        
        allRecords.sort((a, b) => b.points - a.points);
        return allRecords.slice(0, limit);
    }

    clearRecords() {
        this.records = { es: [], en: [], fr: [], gl: [], ca: [], eu: [] };
        localStorage.removeItem('sletter_records');
        eventBus.emit('RECORDS_UPDATED', this.getTopGlobal());
    }

    // --- Global Logic ---
    loadAlias() {
        return localStorage.getItem('sletter_alias') || '';
    }

    getAlias() {
        return this.alias;
    }

    setAlias(newAlias) {
        this.alias = newAlias;
        localStorage.setItem('sletter_alias', newAlias);
        if (!this.token) {
            this.generateToken();
        }
    }

    loadToken() {
        return localStorage.getItem('sletter_token') || '';
    }

    getToken() {
        return this.token;
    }

    generateToken() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randStr = '';
        for (let i = 0; i < 12; i++) {
            randStr += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.token = 'sletter_' + randStr;
        localStorage.setItem('sletter_token', this.token);
        return this.token;
    }
}

export const storage = new StorageManager();
