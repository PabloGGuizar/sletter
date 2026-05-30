// js/api.js

export class APIClient {
    constructor() {
        // El usuario reemplazará esto con su URL de Apps Script (Web App)
        this.baseUrl = 'https://script.google.com/macros/s/AKfycbyB_Bqn-yRG58NlYQkYFjyCV1PuTr84ahQz9UNUbXhLf9-0TDPUu_9jJHczt8EAzZ7HGg/exec';
    }

    async generateSignature(data, token) {
        const dataString = String(data.alias) + String(data.score) + String(data.language) + String(data.duration) + String(data.timestamp) + String(token);
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(dataString);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    async submitScore(data) {
        if (this.baseUrl === 'YOUR_WEB_APP_URL') {
            console.warn("API URL no configurada. Saltando envío al servidor global.");
            return { success: false, error: 'not_configured' };
        }

        try {
            // Firmar los datos usando el token como secreto
            const signature = await this.generateSignature(data, data.token);
            const payloadWithSignature = { ...data, signature };

            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                // Apps script requires POST body to be sent as string in plain text
                body: JSON.stringify(payloadWithSignature)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error("Error enviando score global:", error);
            return { success: false, error: error.message };
        }
    }

    async getLeaderboard(lang) {
        if (this.baseUrl === 'YOUR_WEB_APP_URL') {
            return []; // Retorna vacío si no hay URL configurada
        }

        try {
            const response = await fetch(`${this.baseUrl}?lang=${encodeURIComponent(lang)}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result.data || [];
        } catch (error) {
            console.error("Error obteniendo el tablero global:", error);
            return [];
        }
    }
}

export const api = new APIClient();
