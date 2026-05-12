// js/dictionary.js
import { eventBus } from './events.js';

export const langData = {
    es: {
        url: './data/es.json',
        fallback: "SODA ODA ROL LEY REY QUE LOS DEL POR LAS CON UNA SUS SER SON DOS ASI MAS MUY SIN SOBRE TAMBIEN ESTA HAY ESTE FUE HAN ESTO TIENE AQUI ESTAN COMO SOLO TODOS CUANDO TIENEN TODAS TODO ESTABA ESTOS DONDE ESTAMOS PUEDE TIEMPO PARTE VIDA CADA OTROS MISMO HASTA OTRO SIEMPRE DIA AÑOS GRANDE AHORA TRES COSAS AÑO ANTES LUGAR BIEN POCO MUNDO LUEGO OTROS MUCHOS MUCHO ENTRE VER NADA DECIR ELLA ESTADO QUIEN HACER NUEVO MEJOR FORMA ESTAS CASO ESE PODER ELLOS OTRA VECES ALGO PAIS MISMA FORMAS SEGUIR QUERER AGUA MADRE HOMBRE CASA MUJER DIAS DIJO PARTE GENTE LLEGAR QUEDAR PADRE COSA CIERTO VERDAD QUIERE FINAL TOMAR POCO PASAR TRABAJO MANOS LADO NUEVA QUIEN NUNCA PASO IGUAL MENOS TRABAJAR SIENDO DAR GRUPO MANERA AUNQUE HOY HECHO PENSAR PUNTO ESTABAN ELLO LUGAR TENIA HABER CUAL SABER OJO LUZ MAYOR PERO PERRO GATO LEON TIGRE OSO VACA TORO PEZ AVE PAJARO RATA RATON CERDO OVEJA CABALLO PATO ROJO AZUL VERDE NEGRO BLANCO ROSA AMARILLO GRIS MARRON MESA SILLA CAMA PUERTA VENTANA VASO PLATO COCHE AUTO TREN AVION BARCO ROPA ZAPATO RELOJ GAFAS SOL LUNA CIELO NUBE LLUVIA NIEVE MAR RIO LAGO ARBOL FLOR HOJA PIEDRA ARENA FUEGO TIERRA MANO PIE BRAZO PIERNA CABEZA BOCA NARIZ OREJA PELO DEDO CARA CUERPO ALMA MENTE CORAZON AMOR ODIO RISA LLANTO FELIZ TRISTE ENOJO MIEDO SALUD ENFERMO RICO POBRE CARO BARATO ALTO BAJO LARGO CORTO ANCHO ESTRECHO FUERTE DEBIL JOVEN VIEJO NUEVO LENTO RAPIDO DULCE SALADO AMARGO CALIENTE FRIO TIBIO DURO BLANDO FACIL DIFICIL LIBRE PRESO BUENO MALO LINDO FEO HERMOSO BONITO HORRIBLE JUGAR SALTAR CORRER DORMIR COMER BEBER HABLAR CANTAR BAILAR REIR LLORAR ESTUDIAR LEER ESCRIBIR CONTAR SUMAR RESTAR MULTIPLICAR DIVIDIR GANAR PERDER COMPRAR VENDER PAGAR COBRAR ROBAR REGALAR ABRIR CERRAR SUBIR BAJAR ENTRAR SALIR NACER MORIR VIVIR MATAR SALVAR ROMPER ARREGLAR CORTAR PEGAR BUSCAR ENCONTRAR PERDER ESCONDER MOSTRAR OCULTAR CAER LEVANTAR SENTAR ACOSTAR VOLAR NADAR CAMINAR PASEAR VIAJAR LLEVAR TRAER ENVIAR RECIBIR PEDIR DAR TOMAR DEJAR PONER QUITAR CAJA PAPEL LAPIZ LIBRO LETRA NUMERO PALABRA FRASE TEXTO CUENTO HISTORIA FOTO IMAGEN JUEGO JUGUETE PELOTA MUÑECA REY REINA PRINCIPE PRINCESA CASTILLO ESPADA ESCUDO ARCO FLECHA MAGIA BRUJA DUENDE HADA DIOS CIELO INFIERNO LUZ OSCURIDAD SOMBRA DIA NOCHE MAÑANA TARDE MADRUGADA HORA MINUTO SEGUNDO SEMANA MES AÑO SIGLO MILENIO LUNES MARTES MIERCOLES JUEVES VIERNES SABADO DOMINGO ENERO FEBRERO MARZO ABRIL MAYO JUNIO JULIO AGOSTO SEPTIEMBRE OCTUBRE NOVIEMBRE DICIEMBRE NORTE SUR ESTE OESTE DERECHA IZQUIERDA ARRIBA ABAJO CENTRO MEDIO FONDO FRENTE ATRAS CERCA LEJOS AQUI ALLI ALLA ACA FUERA DENTRO DENTRO FUERA ENCIMA DEBAJO ADELANTE ATRA CON CONTRA DE DESDE EN ENTRE HACIA HASTA PARA POR SEGUN SIN SOBRE TRAS YO TU EL NOSOTROS VOSOTROS ELLOS MI TI SI ME TE SE NOS OS LE LES LO LA LOS LAS MIO TUYO SUYO NUESTRO VUESTRO UNO PRIMERO SEGUNDO TERCERO CUARTO QUINTO SEXTO SEPTIMO OCTAVO NOVENO DECIMO ONCE DOCE DOCENA CIEN CIENTO MIL MILLON MITAD DOBLE TRIPLE CUADRUPLE BASTANTE DEMASIADO SUFICIENTE ESCASO NINGUN ALGUN CUALQUIER AMBOS VARIOS DEMAS QUIEN CUAL CUANTO DONDE CUANDO COMO PORQUE OSEA SINO AUN INCLUSO ADEMAS TAMPOCO CASI APENAS SOLAMENTE UNICAMENTE PRECISAMENTE VERDADERAMENTE REALMENTE SEGURAMENTE PROBABLEMENTE QUIZA ACASO OJALA HOLA ADIOS GRACIAS FAVOR PERDON DISCULPA CLARO BUENO VALE BASTA AMIGO ENEMIGO COMPAÑERO VECINO JEFE EMPLEADO MAESTRO ALUMNO MEDICO PACIENTE POLICIA LADRON JUEZ ABOGADO LEY NORMA REGLA ORDEN CAOS PAZ GUERRA ARMA BOMBA TIRO BALA HERIDA SANGRE DOLOR CURA MEDICINA VENENO DROGA ALCOHOL VINO CERVEZA AGUA LECHE JUGO TE CAFE QUESO PAN CARNE PESCADO POLLO HUEVO FRUTA VERDURA SAL AZUCAR ACEITE VINAGRE ARROZ PASTA SOPA ENSALADA POSTRE HELADO PASTEL GALLETA CHOCOLATE CARAMELO CINE TEATRO MUSICA ARTE PINTURA ESCULTURA FOTOGRAFIA CIENCIA HISTORIA MATEMATICA FILOSOFIA RELIGION POLITICA ECONOMIA DEPORTE FUTBOL BALONCESTO TENIS NATACION ATLETISMO CARRERA SALTO LANZAMIENTO EQUIPO PARTIDO CAMPEONATO PREMIO MEDALLA COPA TROFEO RECORD VICTORIA DERROTA EMPATE CRIA CRIAR",
        values: {'A':1, 'B':3, 'C':3, 'D':2, 'E':1, 'F':4, 'G':2, 'H':4, 'I':1, 'J':7, 'L':1, 'M':3, 'N':1, 'Ñ':8, 'O':1, 'P':3, 'Q':5, 'R':1, 'S':1, 'T':1, 'U':1, 'V':4, 'X':8, 'Y':4, 'Z':9},
        bag: "AAAAAAAAAAAAEEEEEEEEEEEEOOOOOOOOOIIIIIISSSSSSNNNNNLLLLRRRRRUUUUUTTTTDDDDDGGCCCCBBMMMPPHHFFVYYQJXZÑ"
    },
    en: {
        url: './data/en.json',
        fallback: "THE AND FOR THAT THIS WITH YOU NOT ARE FROM HAVE WAS ONE ALL THEY THEIR MORE HAS WILL WOULD THERE THEIR WHAT SO UP OUT IF ABOUT WHO GET WHICH GO ME WHEN MAKE CAN LIKE TIME NO JUST HIM KNOW TAKE PEOPLE INTO YEAR YOUR GOOD SOME COULD THEM SEE OTHER THAN THEN NOW LOOK ONLY COME ITS OVER THINK ALSO BACK AFTER USE TWO HOW OUR WORK FIRST WELL WAY EVEN NEW WANT BECAUSE ANY THESE GIVE DAY MOST US GAME TIME WORD PLAY LETTERS",
        values: {'A':1, 'B':3, 'C':3, 'D':2, 'E':1, 'F':4, 'G':2, 'H':4, 'I':1, 'J':7, 'K':5, 'L':1, 'M':3, 'N':1, 'O':1, 'P':3, 'Q':9, 'R':1, 'S':1, 'T':1, 'U':1, 'V':4, 'W':4, 'X':7, 'Y':4, 'Z':9},
        bag: "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ"
    },
    fr: {
        url: './data/fr.json',
        fallback: "ET DE EN DANS POUR SUR QUE QUI PLUS PAS IL EST LE LA LES UN UNE DES CE CET CETTE CES AU AUX DU DES AVEC SANS SOUS VERS PAR MAIS OU DONC CAR NI OR COMME QUAND BIEN SI TRES TOUT TOUS TOUTE TOUTES QUEL QUELLE QUELS QUELLES MON TON SON MA TA SA MES TES SES NOTRE VOTRE LEUR NOS VOS LEURS CEUX CELLE CELLES LUI ELLE EUX ELLES MOI TOI NOUS VOUS ON FAIT ETRE AVOIR FAIRE DIRE ALLER VOIR SAVOIR POUVOIR VOULOIR DEVOIR VENIR SUIVRE PARLER PRENDRE CROIRE AIMER PASSER PENSER LAISSER TROUVER DONNER COMPRENDRE METTRE TENIR PORTER MONTRER CONTINUER JOUER MANGER BOIRE DORMIR CHAT CHIEN OISEAU ARBRE FLEUR EAU FEU TERRE CIEL SOLEIL LUNE ETOILE JOUR NUIT MATIN SOIR TEMPS ANNEE MOIS SEMAINE HEURE MINUTE MAISON PORTE FENETRE TABLE CHAISE LIT HOMME FEMME ENFANT PERE MERE FRERE SOEUR AMI AMIE GARCON FILLE VILLE PAYS MONDE VIE MORT AMOUR PAIX",
        values: {'A':1, 'B':3, 'C':3, 'D':2, 'E':1, 'F':4, 'G':2, 'H':4, 'I':1, 'J':8, 'K':10, 'L':1, 'M':2, 'N':1, 'O':1, 'P':3, 'Q':8, 'R':1, 'S':1, 'T':1, 'U':1, 'V':4, 'W':10, 'X':10, 'Y':10, 'Z':10},
        bag: "AAAAAAAAAAAAAAABBCCCDDDEEEEEEEEEEEEEEEEEEFFGGHHIIIIIIIIJKLLLLLMMMNNNNNNOOOOOOPPQRRRRRRSSSSSSTTTTTTUUUUUUVVWXYZ"
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
                this.populate(cached, false);
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
            
            this.populate(wordsArray, false);
            this.isLoaded = true;
            eventBus.emit('DICTIONARY_LOADED', lang);
        } catch (error) {
            console.error("Usando respaldo de fallback.", error);
            const fallbackArray = langData[lang].fallback.split(" ");
            this.populate(fallbackArray, true);
            this.isLoaded = true;
            eventBus.emit('DICTIONARY_OFFLINE', lang); // Modo pocket: diccionario reducido
        }
    }

    populate(wordsArray, isFallback = false) {
        wordsArray.forEach(w => {
            if(w.length >= 3) {
                // Primero pasar a mayúsculas
                let upperW = w.toUpperCase();
                // Proteger la Ñ antes de normalizar
                let protectedW = upperW.replace(/Ñ/g, "##NYE##");
                // Normalizar y quitar diacríticos
                let normalized = protectedW.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                // Restaurar la Ñ
                normalized = normalized.replace(/##NYE##/g, "Ñ");
                
                this.words.add(normalized);
                
                // Generar plurales básicos SOLO para el fallback de emergencia.
                // El diccionario completo ya contiene todas las formas válidas;
                // aplicar esto globalmente genera palabras inválidas (ej: "CREMOS").
                if (isFallback) {
                    if(this.currentLang === 'es') {
                        let lastChar = normalized[normalized.length-1];
                        if ("AEIOU".includes(lastChar)) {
                            this.words.add(normalized + "S");
                        } else if (lastChar === 'Z') {
                            this.words.add(normalized.slice(0, -1) + "CES");
                        } else if (lastChar !== 'S') {
                            this.words.add(normalized + "ES");
                        }
                    } else if (this.currentLang === 'en' || this.currentLang === 'fr') {
                        if (!normalized.endsWith("S")) this.words.add(normalized + "S");
                    }
                }
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
