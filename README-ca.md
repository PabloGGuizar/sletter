*Llegir en altres idiomes: [Español](README.md), [English](README-en.md), [Français](README-fr.md), [Galego](README-gl.md), [Català](README-ca.md), [Euskara](README-eu.md)*

![Sletter Cover](./assets/portada.jpg)

# Sletter 🐍🔤

Sletter és un joc educatiu de navegador que combina les mecàniques del clàssic **Snake** amb la formació de paraules.

L'objectiu és moure la serp, menjar fitxes amb lletres i formar paraules vàlides de tres lletres o més, evitant col·lisionar amb les vores o el teu propi cos.

![Sletter UI Screenshot](./assets/Sletter%20UI%20Screenshot.png)

## Característiques Principals 🚀

- **Joc Híbrid:** Mecànica clàssica de moviment estil Snake amb validació de diccionari en temps real.
- **Multilingüe:** Suport complet per jugar en sis idiomes amb diccionaris d'alta capacitat validats localment:
  - 🇪🇸 **Espanyol:** 636.598 paraules.
  - 🇺🇸 **Anglès:** 274.937 paraules.
  - 🇫🇷 **Francès:** 336.524 paraules.
  - 💙🟡 **Gallec:** 687.447 paraules.
  - 💛🟥 **Català:** 891.424 paraules.
  - 🟢🔴⚪ **Basc:** 864.882 paraules.
- **Suport Offline (PWA Ready):** Els diccionaris es descarreguen la primera vegada i s'emmagatzemen al navegador usant **IndexedDB**, permetent jugar sense connexió a internet posteriorment.
- **Motor d'Àudio Retro:** Efectes de so de 8 bits sintetitzats dinàmicament mitjançant la **Web Audio API** (sense dependre de fitxers `.mp3` o `.wav` externs).
- **Rànquing Global:** Sistema de rècords locals (`localStorage`) que desa les teves millors puntuacions amb el teu àlies i la bandera de l'idioma jugat.
- **Personalització Visual:** Suport responsiu i temes Clar/Fosc dinàmics.

## Arquitectura i Tecnologies 🏗️

El projecte està construït sota una arquitectura modular (Frontend ES6) sense usar frameworks pesats:

- **HTML5 Canvas:** Per al renderitzat d'alt rendiment del tauler i la serp.
- **Vanilla JavaScript (Mòduls ES6):** Lògica desacoblada mitjançant un patró `Pub/Sub` (EventBus) i divisió estricta de responsabilitats (`game.js`, `audio.js`, `storage.js`, `ui.js`, `dictionary.js`).
- **CSS3 i Tailwind CSS:** Ús de classes utilitàries a través de CDN per a una interfície moderna, neta i altament responsiva.
- **IndexedDB & LocalStorage:** Persistència de dades asíncrona per a diccionaris (gegants) i dades ràpides síncrones per a puntuacions/ajustos.
- **Web Audio API:** Síntesi procedural del so.

## Instal·lació i Desenvolupament 🛠️

En estar estructurat amb **Mòduls ES6 (`import`/`export`)**, obrir el fitxer `index.html` directament al navegador generarà un error de `CORS`. Es requereix un servidor local per provar-lo:

1. Clona el repositori:
   ```bash
   git clone https://github.com/s-letter/s-letter.github.io.git
   ```
2. Inicia un servidor web local a la carpeta arrel. Pots usar l'extensió **Live Server** de VSCode, o mitjançant línia de comandes:
   - **Python 3:** `python -m http.server 8000`
   - **Node.js (npx):** `npx serve`
3. Obre `http://localhost:8000` al teu navegador web.

## Agraïments i Diccionaris 📚

Els extensos diccionaris integrats a **Sletter** han estat possibles gràcies a projectes lingüístics i repositoris de codi obert. Reconeixem i agraïm a les comunitats que mantenen aquestes bases de dades lèxiques:

- **Espanyol (636k paraules):** [github.com/words/an-array-of-spanish-words](https://github.com/words/an-array-of-spanish-words)
- **Anglès (274k paraules):** [github.com/words/an-array-of-english-words](https://github.com/words/an-array-of-english-words)
- **Francès (336k paraules):** [github.com/words/an-array-of-french-words](https://github.com/words/an-array-of-french-words)
- **Gallec (687k paraules):** [github.com/s-letter/an-array-of-galician-words](https://github.com/s-letter/an-array-of-galician-words)
- **Català (891k paraules):** [github.com/s-letter/an-array-of-catalan-words](https://github.com/s-letter/an-array-of-catalan-words)
- **Basc (864k paraules):** [github.com/s-letter/an-array-of-basque-words](https://github.com/s-letter/an-array-of-basque-words)

## Autor 👨‍💻

**Pablo G. Guízar**

- [LinkedIn](https://www.linkedin.com/in/pablogguizar/)
- [GitHub](https://github.com/PabloGGuizar)

## Llicència 📄

Aquest projecte està sota llicència [MIT](LICENSE).
