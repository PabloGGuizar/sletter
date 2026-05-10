# Sletter 🐍🔤

Sletter es un juego educativo de navegador que combina las mecánicas del clásico **Snake** con el juego de formar palabras **Scrabble**. 

El objetivo es mover la serpiente, comer fichas con letras y formar palabras válidas de tres letras o más, evitando colisionar con los bordes o tu propio cuerpo.

![Sletter UI Screenshot]() *(Añade una captura de pantalla aquí)*

## Características Principales 🚀

- **Híbrido de Juego:** Mecánica clásica de movimiento estilo Snake con validación de diccionario en tiempo real.
- **Multilingüe:** Soporte completo para jugar en tres idiomas con diccionarios de alta capacidad validados localmente:
  - 🇪🇸 **Español:** 636,598 palabras.
  - 🇺🇸 **Inglés:** 274,937 palabras.
  - 🇫🇷 **Francés:** 336,524 palabras.
- **Soporte Offline (PWA Ready):** Los diccionarios se descargan la primera vez y se almacenan en el navegador utilizando **IndexedDB**, permitiendo jugar sin conexión a internet posteriormente.
- **Motor de Audio Retro:** Efectos de sonido de 8-bits sintetizados dinámicamente mediante la **Web Audio API** (sin depender de archivos `.mp3` o `.wav` externos).
- **Ranking Global:** Sistema de récords locales (`localStorage`) que guarda tus mejores puntuaciones con tu alias y la bandera del idioma jugado.
- **Personalización Visual:** Soporte responsivo y temas Claro/Oscuro dinámicos.

## Arquitectura y Tecnologías 🏗️

El proyecto está construido bajo una arquitectura modular (Frontend ES6) sin utilizar frameworks pesados:

- **HTML5 Canvas:** Para el renderizado de alto rendimiento del tablero y la serpiente.
- **Vanilla JavaScript (ES6 Modules):** Lógica desacoplada mediante un patrón `Pub/Sub` (EventBus) y división estricta de responsabilidades (`game.js`, `audio.js`, `storage.js`, `ui.js`, `dictionary.js`).
- **CSS3 y Tailwind CSS:** Uso de clases utilitarias a través de CDN para una interfaz moderna, limpia y altamente responsiva.
- **IndexedDB & LocalStorage:** Persistencia de datos asíncrona para diccionarios (gigantes) y datos rápidos síncronos para puntajes/ajustes.
- **Web Audio API:** Síntesis procedural del sonido.

## Instalación y Desarrollo 🛠️

Al estar estructurado con **ES6 Modules (`import`/`export`)**, abrir el archivo `index.html` directamente en el navegador generará un error de `CORS`. Se requiere un servidor local para probarlo:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/PabloGGuizar/sletter.git
   ```
2. Inicia un servidor web local en la carpeta raíz. Puedes usar la extensión **Live Server** de VSCode, o mediante línea de comandos:
   - **Python 3:** `python -m http.server 8000`
   - **Node.js (npx):** `npx serve`
3. Abre `http://localhost:8000` en tu navegador web.

## Autor 👨‍💻

**Pablo G. Guízar**

- [LinkedIn](https://www.linkedin.com/in/pablogguizar/)
- [GitHub](https://github.com/PabloGGuizar)

## Licencia 📄

Este proyecto está bajo licencia [MIT](LICENSE).
