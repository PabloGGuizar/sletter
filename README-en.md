*Read this in other languages: [Español](README.md), [English](README-en.md), [Français](README-fr.md), [Galego](README-gl.md), [Català](README-ca.md), [Euskara](README-eu.md)*

![Sletter Cover](./assets/portada.jpg)

# Sletter 🐍🔤

Sletter is an educational browser game that combines the mechanics of the classic **Snake** with word-building gameplay.

The goal is to move the snake, eat tiles with letters, and form valid words of three letters or more, avoiding colliding with the edges or your own body.

![Sletter UI Screenshot](./assets/Sletter%20UI%20Screenshot.png)

## Key Features 🚀

- **Hybrid Gameplay:** Classic Snake movement mechanics with real-time dictionary validation.
- **Multilingual:** Full support to play in six languages with locally validated high-capacity dictionaries:
  - 🇪🇸 **Spanish:** 636,598 words.
  - 🇺🇸 **English:** 274,937 words.
  - 🇫🇷 **French:** 336,524 words.
  - 💙🟡 **Galician:** 687,447 words.
  - 💛🟥 **Catalan:** 891,424 words.
  - 🟢🔴⚪ **Basque:** 864,882 words.
- **Offline Support (PWA Ready):** Dictionaries are downloaded the first time and stored in the browser using **IndexedDB**, allowing you to play offline afterwards.
- **Retro Audio Engine:** 8-bit sound effects dynamically synthesized using the **Web Audio API** (without relying on external `.mp3` or `.wav` files).
- **Global Ranking:** Local records system (`localStorage`) that saves your best scores with your alias and the flag of the played language.
- **Visual Customization:** Responsive support and dynamic Light/Dark themes.

## Architecture and Technologies 🏗️

The project is built under a modular architecture (Frontend ES6) without using heavy frameworks:

- **HTML5 Canvas:** For high-performance rendering of the board and the snake.
- **Vanilla JavaScript (ES6 Modules):** Decoupled logic using a `Pub/Sub` pattern (EventBus) and strict separation of concerns (`game.js`, `audio.js`, `storage.js`, `ui.js`, `dictionary.js`).
- **CSS3 and Tailwind CSS:** Use of utility classes via CDN for a modern, clean, and highly responsive interface.
- **IndexedDB & LocalStorage:** Asynchronous data persistence for dictionaries (huge) and synchronous fast data for scores/settings.
- **Web Audio API:** Procedural sound synthesis.

## Installation and Development 🛠️

Being structured with **ES6 Modules (`import`/`export`)**, opening the `index.html` file directly in the browser will generate a `CORS` error. A local server is required to test it:

1. Clone the repository:
   ```bash
   git clone https://github.com/s-letter/s-letter.github.io.git
   ```
2. Start a local web server in the root folder. You can use the **Live Server** extension in VSCode, or via command line:
   - **Python 3:** `python -m http.server 8000`
   - **Node.js (npx):** `npx serve`
3. Open `http://localhost:8000` in your web browser.

## Acknowledgments and Dictionaries 📚

The extensive dictionaries integrated into **Sletter** have been made possible thanks to linguistic projects and open-source repositories. We recognize and thank the communities that maintain these lexical databases:

- **Spanish (636k words):** [github.com/words/an-array-of-spanish-words](https://github.com/words/an-array-of-spanish-words)
- **English (274k words):** [github.com/words/an-array-of-english-words](https://github.com/words/an-array-of-english-words)
- **French (336k words):** [github.com/words/an-array-of-french-words](https://github.com/words/an-array-of-french-words)
- **Galician (687k words):** [github.com/s-letter/an-array-of-galician-words](https://github.com/s-letter/an-array-of-galician-words)
- **Catalan (891k words):** [github.com/s-letter/an-array-of-catalan-words](https://github.com/s-letter/an-array-of-catalan-words)
- **Basque (864k words):** [github.com/s-letter/an-array-of-basque-words](https://github.com/s-letter/an-array-of-basque-words)

## Author 👨‍💻

**Pablo G. Guízar**

- [LinkedIn](https://www.linkedin.com/in/pablogguizar/)
- [GitHub](https://github.com/PabloGGuizar)

## License 📄

This project is licensed under the [MIT License](LICENSE).
