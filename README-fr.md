*Lire dans d'autres langues: [Español](README.md), [English](README-en.md), [Français](README-fr.md)*

![Sletter Cover](./assets/portada.jpg)

# Sletter 🐍🔤

Sletter est un jeu éducatif par navigateur qui combine les mécaniques du classique **Snake** avec le jeu de formation de mots **Scrabble**.

L'objectif est de déplacer le serpent, de manger des tuiles avec des lettres et de former des mots valides de trois lettres ou plus, en évitant d'entrer en collision avec les bords ou votre propre corps.

![Sletter UI Screenshot](./assets/Sletter%20UI%20Screenshot.png)

## Caractéristiques Principales 🚀

- **Jeu Hybride:** Mécanique classique de mouvement Snake avec validation de dictionnaire en temps réel.
- **Multilingue:** Support complet pour jouer en trois langues avec des dictionnaires de haute capacité validés localement:
  - 🇪🇸 **Espagnol:** 636 598 mots.
  - 🇺🇸 **Anglais:** 274 937 mots.
  - 🇫🇷 **Français:** 336 524 mots.
- **Support Hors Ligne (PWA Ready):** Les dictionnaires sont téléchargés la première fois et stockés dans le navigateur en utilisant **IndexedDB**, vous permettant de jouer sans connexion Internet par la suite.
- **Moteur Audio Rétro:** Effets sonores 8 bits synthétisés dynamiquement via la **Web Audio API** (sans dépendre de fichiers `.mp3` ou `.wav` externes).
- **Classement Global:** Système de records locaux (`localStorage`) qui enregistre vos meilleurs scores avec votre pseudo et le drapeau de la langue jouée.
- **Personnalisation Visuelle:** Support responsive et thèmes Clair/Sombre dynamiques.

## Architecture et Technologies 🏗️

Le projet est construit sous une architecture modulaire (Frontend ES6) sans utiliser de frameworks lourds:

- **HTML5 Canvas:** Pour un rendu haute performance du plateau et du serpent.
- **Vanilla JavaScript (Modules ES6):** Logique découplée utilisant un modèle `Pub/Sub` (EventBus) et une stricte séparation des responsabilités (`game.js`, `audio.js`, `storage.js`, `ui.js`, `dictionary.js`).
- **CSS3 et Tailwind CSS:** Utilisation de classes utilitaires via CDN pour une interface moderne, propre et très responsive.
- **IndexedDB & LocalStorage:** Persistance asynchrone des données pour les dictionnaires (gigantesques) et données rapides synchrones pour les scores/paramètres.
- **Web Audio API:** Synthèse sonore procédurale.

## Installation et Développement 🛠️

Étant structuré avec des **Modules ES6 (`import`/`export`)**, l'ouverture du fichier `index.html` directement dans le navigateur générera une erreur `CORS`. Un serveur local est requis pour le tester:

1. Clonez le dépôt:
   ```bash
   git clone https://github.com/s-letter/s-letter.github.io.git
   ```
2. Démarrez un serveur web local dans le dossier racine. Vous pouvez utiliser l'extension **Live Server** dans VSCode, ou via la ligne de commande:
   - **Python 3:** `python -m http.server 8000`
   - **Node.js (npx):** `npx serve`
3. Ouvrez `http://localhost:8000` dans votre navigateur web.

## Remerciements et Dictionnaires 📚

Les vastes dictionnaires intégrés dans **Sletter** ont été rendus possibles grâce à des projets linguistiques et des dépôts open-source. Nous reconnaissons et remercions les communautés qui maintiennent ces bases de données lexicales:

- **Espagnol (636k mots):** [github.com/words/an-array-of-spanish-words](https://github.com/words/an-array-of-spanish-words)
- **Anglais (274k mots):** [github.com/words/an-array-of-english-words](https://github.com/words/an-array-of-english-words)
- **Français (336k mots):** [github.com/words/an-array-of-french-words](https://github.com/words/an-array-of-french-words)

## Auteur 👨‍💻

**Pablo G. Guízar**

- [LinkedIn](https://www.linkedin.com/in/pablogguizar/)
- [GitHub](https://github.com/PabloGGuizar)

## Licence 📄

Ce projet est sous licence [MIT](LICENSE).
