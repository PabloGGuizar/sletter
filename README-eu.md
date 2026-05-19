*Irakurri beste hizkuntza batzuetan: [Español](README.md), [English](README-en.md), [Français](README-fr.md), [Galego](README-gl.md), [Català](README-ca.md), [Euskara](README-eu.md)*

![Sletter Cover](./assets/portada.jpg)

# Sletter 🐍🔤

Sletter nabigatzaileko joko didaktiko bat da, **Snake** klasikoaren mekanika eta hitzen osaketa uztartzen dituena.

Helburua sugea mugitzea, letrak dituzten fitxak jatea eta hiru letra edo gehiagoko hitz baliodunak osatzea da, ertzekin edo zure gorputzarekin talka egitea saihestuz.

![Sletter UI Screenshot](./assets/Sletter%20UI%20Screenshot.png)

## Nola Jolastu eta Puntuazioa 🎮

- **Mugimendua:** Erabili **geziak**, **WASD**, edo irristatu ukipen-pantailetan.
- **Helburua:** Jan fitxak letrak zure buztanari gehitzeko. 3 letra edo gehiagoko hitz baliodunak osatu behar dituzu, buztanaren puntan amaituz. Letra oker bat jaten baduzu, hitza blokeatu egingo da berri batean erabili arte.
- **Puntuazioaren Kalkulua:**
  - Automatikoki **+1 puntu** lortzen duzu jandako fitxa bakoitzeko.
  - Hitza baliozkotzean (**Zuriunea** edo botoiarekin), letra bakoitzak bere **oinarrizko balioa** gehitzen du.
  - Taulako **lauki biderkatzaileak** aplikatuko dira baliozkotzean letrak haien gainean jartzen badituzu. Letrari (**x2 L**, **x3 L**) edo hitz osoari (**x2 H**, **x3 H**) eragiten diote.
  - Puntuazio osoa hitzaren **luzeraren** araberako hobari batez biderkatzen da (adibidez, 4 letra = x2, 5 letra = x3).

## Ezaugarri Nagusiak 🚀

- **Joko Hibridoa:** Snake estiloko mugimendu klasikoa eta denbora errealean hiztegi bidezko baliozkotzea.
- **Eleanitza:** Sei hizkuntzatan jolasteko laguntza osoa, tokiko baliozkotzea duten edukiera handiko hiztegiekin:
  - **Espainiera:** 636.598 hitz.
  - **Ingelesa:** 274.937 hitz.
  - **Frantsesa:** 336.524 hitz.
  - **Galiziera:** 687.447 hitz.
  - **Katalana:** 891.424 hitz.
  - **Euskara:** 864.882 hitz.
- **Lineaz Kanpoko Jolasa (PWA Ready):** Hiztegiak lehenengo aldian deskargatu eta nabigatzailean gordetzen dira **IndexedDB** erabiliz, ondoren internetik gabe jolasteko aukera emanez.
- **Audio Motor Retroa:** 8 biteko soinu-efektuak dinamikoki sintetizatzen dira **Web Audio API** bidez (kanpoko `.mp3` edo `.wav` fitxategien beharrik gabe).
- **Mundu Mailako Sailkapena:** Tokiko errekorren sistema (`localStorage`), zure puntuazio onenak, zure aliasa eta jokatutako hizkuntzaren laburdura gordetzen dituena.
- **Pertsonalizazio Bisuala:** Diseinu moldakorra eta Gai Argi/Ilun dinamikoak.

## Arkitektura eta Teknologiak 🏗️

Proiektua arkitektura modularrean oinarrituta dago (Frontend ES6), framework astunik erabili gabe:

- **HTML5 Canvas:** Taula eta sugea errendimendu handiz irudikatzeko.
- **Vanilla JavaScript (ES6 Moduluak):** Logika banandua `Pub/Sub` patroia (EventBus) eta erantzukizunen banaketa zorrotza erabiliz (`game.js`, `audio.js`, `storage.js`, `ui.js`, `dictionary.js`).
- **CSS3 eta Tailwind CSS:** CDN bidezko klase utilitarioak erabiltzen dira interfaze moderno, garbi eta oso moldakorra lortzeko.
- **IndexedDB eta LocalStorage:** Datuen iraupen asinkronoa (hiztegi erraldoietarako) eta datu azkar sinkronoak (puntuazio/ezarpenetarako).
- **Web Audio API:** Soinuaren sintesi prozedurala.

## Instalazioa eta Garapena 🛠️

**ES6 Moduluak (`import`/`export`)** erabiliz egituratuta dagoenez, `index.html` fitxategia nabigatzailean zuzenean irekitzeak `CORS` errorea sortuko du. Tokiko zerbitzari bat behar da probatzeko:

1. Klonatu biltegia:
   ```bash
   git clone https://github.com/s-letter/s-letter.github.io.git
   ```
2. Abiarazi tokiko web zerbitzari bat erroko karpetan. VSCode-ko **Live Server** luzapena erabil dezakezu, edo komando-lerroaren bidez:
   - **Python 3:** `python -m http.server 8000`
   - **Node.js (npx):** `npx serve`
3. Ireki `http://localhost:8000` zure web nabigatzailean.

## Esker Onak eta Hiztegiak 📚

**Sletter**-en barneratutako hiztegi zabalak proiektu linguistikoei eta kode irekiko biltegiei esker izan dira posible. Eskertzen dugu datu-base lexiko hauek mantentzen dituzten komunitateen lana:

- **Espainiera (636k hitz):** [github.com/words/an-array-of-spanish-words](https://github.com/words/an-array-of-spanish-words)
- **Ingelesa (274k hitz):** [github.com/words/an-array-of-english-words](https://github.com/words/an-array-of-english-words)
- **Frantsesa (336k hitz):** [github.com/words/an-array-of-french-words](https://github.com/words/an-array-of-french-words)
- **Galiziera (687k hitz):** [github.com/s-letter/an-array-of-galician-words](https://github.com/s-letter/an-array-of-galician-words)
- **Katalana (891k hitz):** [github.com/s-letter/an-array-of-catalan-words](https://github.com/s-letter/an-array-of-catalan-words)
- **Euskara (864k hitz):** [github.com/s-letter/an-array-of-basque-words](https://github.com/s-letter/an-array-of-basque-words)

## Egilea 👨‍💻

**Pablo G. Guízar**

- [LinkedIn](https://www.linkedin.com/in/pablogguizar/)
- [GitHub](https://github.com/PabloGGuizar)

## Lizentzia 📄

Proiektu hau [MIT](LICENSE) lizentziapean dago.
