*Leer en otros idiomas: [Español](README.md), [English](README-en.md), [Français](README-fr.md), [Galego](README-gl.md), [Català](README-ca.md), [Euskara](README-eu.md)*

![Sletter Cover](./assets/portada.jpg)

# Sletter 🐍🔤

Sletter es un juego educativo de navegador que combina las mecánicas del clásico **Snake** con la formación de palabras. 

El objetivo es mover la serpiente, comer fichas con letras y formar palabras válidas de tres letras o más, evitando colisionar con los bordes o tu propio cuerpo.

![Sletter UI Screenshot](./assets/Sletter%20UI%20Screenshot.png)

## Características Principales 🚀

- **Híbrido de Juego:** Mecánica clásica de movimiento estilo Snake con validación de diccionario en tiempo real.
- **Multilingüe:** Soporte completo para jugar en seis idiomas con diccionarios de alta capacidad validados localmente:
  - 🇪🇸 **Español:** 636,598 palabras.
  - 🇺🇸 **Inglés:** 274,937 palabras.
  - 🇫🇷 **Francés:** 336,524 palabras.
  - 💙🟡 **Gallego:** 687,447 palabras.
  - 💛🟥 **Catalán:** 891,424 palabras.
  - 🟢🔴⚪ **Euskera:** 864,882 palabras.
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
   git clone https://github.com/s-letter/s-letter.github.io.git
   ```
2. Inicia un servidor web local en la carpeta raíz. Puedes usar la extensión **Live Server** de VSCode, o mediante línea de comandos:
   - **Python 3:** `python -m http.server 8000`
   - **Node.js (npx):** `npx serve`
3. Abre `http://localhost:8000` en tu navegador web.

## Agradecimientos y Diccionarios 📚

Los extensos diccionarios integrados en **Sletter** han sido posibles gracias a proyectos lingüísticos y repositorios de código abierto. Reconocemos y agradecemos a las comunidades que mantienen estas bases de datos léxicas:

- **Español (636k palabras):** [github.com/words/an-array-of-spanish-words](https://github.com/words/an-array-of-spanish-words)
- **Inglés (274k palabras):** [github.com/words/an-array-of-english-words](https://github.com/words/an-array-of-english-words)
- **Francés (336k palabras):** [github.com/words/an-array-of-french-words](https://github.com/words/an-array-of-french-words)
- **Gallego (687k palabras):** [github.com/s-letter/an-array-of-galician-words](https://github.com/s-letter/an-array-of-galician-words)
- **Catalán (891k palabras):** [github.com/s-letter/an-array-of-catalan-words](https://github.com/s-letter/an-array-of-catalan-words)
- **Euskera (864k palabras):** [github.com/s-letter/an-array-of-basque-words](https://github.com/s-letter/an-array-of-basque-words)

## Autor 👨‍💻

**Pablo G. Guízar**

- [LinkedIn](https://www.linkedin.com/in/pablogguizar/)
- [GitHub](https://github.com/PabloGGuizar)

## Licencia 📄

Este proyecto está bajo licencia [MIT](LICENSE).
