# Démarrage

<!-- .slide: class="page-title" -->

<!-- separator-vertical -->

## Table des matières

<div class="columns">
<div class="column-50">

- **Démarrage**
- [Espace de travail](#/2)
- [Prérequis techniques](#/3)
- [Composants](#/4)
- [Tests unitaires](#/5)
- [Flux de contrôle](#/6)
- [Directives](#/7)

</div>
<div class="column-50">

- [Signaux](#/8)
- [Injection de dépendances](#/9)
- [Pipes](#/10)
- [Client HTTP](#/11)
- [Routage](#/12)
- [Formulaires](#/13)
- [Annexe](#/14)

</div>
</div>

<!-- separator-vertical -->

## Architecture client-serveur

- Fait référence à un mode de **communication** entre deux ordinateurs
  - le client envoie une **requête** au serveur
  - le serveur renvoie la **réponse** au client

- Cette communication utilise généralement le **protocole** HTTP (mais d'autres protocoles existent...)

- Chaque **message** HTTP entre le client et le serveur se compose généralement de deux parties
  - les **en-têtes**, qui contiennent des métadonnées contextuelles
  - le **corps**, qui contient les données transmises

<!-- separator-vertical -->

## Architecture client-serveur - Exemple

- **en-têtes** d'une requête de document, envoyée par le client (un navigateur web)

```txt
GET /home HTTP/1.1
Accept: text/html
Accept-Encoding: gzip
```

- **corps** de la réponse, renvoyée par le serveur (une page web)

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Home</title>
    <link href="styles.css" rel="stylesheet" />
  </head>
  <body>
    <app-root></app-root>
    <script src="main.js"></script>
  </body>
</html>
```

😉 *Ce n'est pas un exemple au hasard ; c'est en fait le retour serveur typique pour une application Angular*

<!-- separator-vertical -->

## Technologies du navigateur web

- Un navigateur web est un logiciel capable d'afficher des **pages web**

- Les pages web sont construites autour de 3 technologies principales
  - **HTML**
  - **CSS**
  - **JavaScript**

<!-- separator-vertical -->

## HTML - HyperText Markup Language <img src="./resources/01-html.png" />

- HTML est un **langage de balisage hypertexte** utilisé pour **structurer le contenu** des pages web

```html
<h1>Google Chrome est un navigateur web</h1>

<p> <a href="https://www.google.com/chrome/">Plus d'infos</a> </p>

<img src="https://www.google.com/chrome/static/images/chrome-logo-m100.svg" />
```

- Syntaxe des balises
  - balises **ouvrantes** `<tag>` et **fermantes** `</tag>` (telles que `h1`, `p`, `a`, ...) avec du contenu entre les deux
  - balises **auto-fermantes** `<tag />` (telles que `img`, ...) sans contenu
  - **attributs** `nom-attribut="valeur"` (tels que `href`, `src`, ...) applicables aux balises ouvrantes et auto-fermantes
  - le **contenu** (entre les balises ouvrantes et fermantes) peut contenir d'autres *balises imbriquées*

<!-- separator-vertical -->

## CSS - Cascading Style Sheets <img src="./resources/01-css.png" />

- CSS est un **langage basé sur des règles** utilisé pour contrôler le **formatage** visuel des pages web

```html
<button>Valider</button>

<style>
  button {
    padding: 15px;
    background-color: yellow;
  }
</style>
```

- Syntaxe des **règles**
  - **sélecteur** ciblant un ou plusieurs éléments de la page web : `sélecteur { ...  }`
  - **déclarations** s'appliquant à ce sélecteur : `propriété: valeur;`

- Une feuille de style peut être définie dans une balise `<style>`, ou dans un fichier externe
  - `<link href="styles.css" rel="stylesheet" />`

<!-- separator-vertical -->

## JavaScript <img src="./resources/01-javascript.png" />

- JavaScript est un **langage de script** utilisé pour ajouter de l'**interactivité** aux pages web

```html
<button onclick="showAlert()">Valider</button>

<script>
  function showAlert() {
    window.alert('Bouton cliqué !');
  }
</script>
```

- Un script peut être défini dans une balise `<script>`, ou dans un fichier externe
  - `<script src="main.js"></script>`

<!-- separator-vertical -->

## HTML - CSS - JavaScript

- Les 3 technologies sont bien présentes dans la page web donnée ci-dessus en exemple
  - **HTML:** toutes les balises du document
  - **CSS:** chargé par le fichier `styles.css`
  - **JavaScript:** chargé par le fichier `main.js`

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Home</title>
    <link href="styles.css" rel="stylesheet" />
  </head>
  <body>
    <app-root></app-root>
    <script src="main.js"></script>
  </body>
</html>
```

😉 *Plus tard, nous expliquerons le rôle de la balise `<app-root>` en relation avec **Angular**...*

<!-- separator-vertical -->

## Technologies en dehors du navigateur web

- En fin de compte, une application Angular **s'exécute** dans un navigateur web

- Les artefacts d'une telle application sont donc des fichiers HTML, CSS et JavaScript, que le navigateur sait interpréter

- Cependant, une application Angular est **construite** en utilisant des technologies supplémentaires (non comprises par le navigateur), qui améliorent l'expérience du développeur et la qualité des artefacts

- Ces technologies, utilisées uniquement pendant la phase de développement, sont principalement
  - **TypeScript**
  - **Node.js**
  - **NPM**
  - **Vite**

<!-- separator-vertical -->

## TypeScript <img src="./resources/01-typescript.svg" />

- TypeScript est un **sur-ensemble** de JavaScript, qui améliore et sécurise la production de code JavaScript

- Contrairement à JavaScript, TypeScript est un **langage de programmation typé**

```js
// JavaScript
let data;         // Il n'y a aucune contrainte sur les valeurs possibles
data = 1;         // ✅ Ici c'est un `number`
data = true;      // ✅ Et ici c'est un `boolean`
```

```ts
// TypeScript
let data: number; // Seules les valeurs de type `number` sont autorisées
data = 1;         // ✅ Ici l'affectation est valide
data = true;      // ❌ Et ici l'affectation est invalide
```

<!-- separator-vertical -->

## TypeScript <img src="./resources/01-typescript.svg" />

- Un programme TypeScript doit être **transpilé en JavaScript** avant de pouvoir être exécuté dans le navigateur web
- La transpilation consiste simplement à **supprimer le typage** pour en faire un programme JavaScript valide
- TypeScript est utilisé en **phase de développement** tandis que JavaScript est utilisé en **phase d'exécution**

<!-- separator-vertical -->

## Node.js <img src="./resources/01-nodejs.svg" />

- Node.js est une technologie qui permet d'exécuter du code JavaScript **en dehors du navigateur**
- Avec Node.js, le **contexte d'exécution** pour JavaScript est votre **système d'exploitation**

- Node.js peut, par exemple, accéder à votre système de fichiers, connaître les caractéristiques de votre processeur, etc...

```bash
# L'exécution des commandes suivantes dans le Terminal de votre ordinateur...
node
process.arch # ...renvoie par exemple : `x64` (processeur Intel 64 bits)
```

*Dans un navigateur web, en revanche, le contexte d'exécution de JavaScript est la page web avec laquelle il interagit.
JavaScript peut, par exemple, connaître la langue préférée de l'utilisateur, la taille de la fenêtre du navigateur, etc...*

```bash
# L'exécution de la commande suivante dans la console de votre navigateur...
window.innerWidth # ...renvoie par exemple : `1135` (largeur de la fenêtre en px)
```

<!-- separator-vertical -->

## NPM (Node package Manager) <img src="./resources/01-npm.svg" />

- NPM est le **gestionnaire de paquets** pour l'environnement d'exécution JavaScript Node.js
- Fournit des programmes et des bibliothèques pour l'écosystème JavaScript sous forme de paquets téléchargeables depuis un **registre**

- Exemple d'installation d'un paquet puis de son utilisation

```bash
# L'exécution de la commande suivante dans un Terminal,
# installera le paquet `@angular/cli` globalement sur votre ordinateur
npm install --global @angular/cli

# Une fois le paquet installé, il fournit globalement la commande `ng`,
# qui permet par exemple de générer un squelette d'application Angular
ng new
```

😉 *Note : dans le dossier d'un projet Node.js, l'installation d'un paquet sans l'option `--global`, l'installera localement pour le projet.*

<!-- separator-vertical -->

## Vite <img src="./resources/01-vite.svg" />

- Vite est un **outil de construction** pour les applications web modernes

- Principales fonctionnalités
  - **serveur de développement** (dev server)
  - **commande de construction des artefacts** (bundler)

<img src="./resources/01-bundler.drawio.svg" width="60%" style="display: block; margin: 4rem auto 0 auto" />

<!-- separator-vertical -->

## Angular <img src="./resources/01-angular.png" />

- Un framework web qui permet aux développeurs de **créer des applications rapides et fiables**

- Annoncé en 2014, c'est une réécriture totale d'**AngularJS** (bien que certains concepts subsistent)

- Première version d'**Angular 2** en septembre 2016

- Version majeure tous les 6 mois

- Dernière version majeure `21` sortie en novembre 2025

- Maintenu par une équipe dédiée chez **Google**

<!-- separator-vertical -->

## Angular - Vue d'ensemble 1/2 <img src="./resources/01-angular.png" />

- En **phase de développement**, vous écrivez des composants en TypeScript
  - Angular a une architecture basée sur les composants
  - et utilisez des templates HTML simples

```ts
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',             // --> sélecteur CSS
  template: '<p>Hello world!</p>',  // --> template HTML
})
class App {}                        // --> classe JavaScript (enrichie par les métadonnées de son décorateur)

bootstrapApplication(App);
```

*(pour le moment, mettons de côté les détails d'implémentation du code et concentrons-nous sur la vue d'ensemble...)*

<!-- separator-vertical -->

## Angular - Vue d'ensemble 2/2 <img src="./resources/01-angular.png" />

- En **phase d'exécution** (une fois que l'application a été construite et s'exécute dans un navigateur web), Angular tente de **démarrer** l'application
  - il recherche dans la page web la balise correspondant au **sélecteur CSS** du composant
  - il affiche ensuite le **template HTML** du composant à l'intérieur de cette balise

```html
<app-root>
  <p>Hello world!</p>
</app-root>
```

😉 *Vous connaissez maintenant le rôle de la balise `<app-root>` en relation avec **Angular**, qui était présente dans la page web donnée ci-dessus en exemple*

<!-- separator-vertical -->

## Ressources approfondies

- **HTML - CSS - JavaScript:** https://developer.mozilla.org
- **TypeScript:** https://www.typescriptlang.org
- **Node.js:** https://nodejs.org
- **NPM:** https://npmjs.com
- **Vite:** https://vitejs.dev
- **Angular:** https://angular.dev

<!-- separator-vertical -->

## Démarrage - Résumé

**Dans ce chapitre sur le démarrage, nous avons couvert les sujets suivants**

<div class="columns">
<div class="column-50">

- Architecture client-serveur
- HTML
- CSS
- JavaScript
- TypeScript

</div>
<div class="column-50">

- Node.js
- NPM
- Vite
- Angular

</div>
</div>

<!-- separator-vertical -->

## Démarrage - Questions
<!-- .slide: data-background-image="./resources/background-questions.svg" data-background-size="45%" -->

<!-- separator-vertical -->

## Démarrage - Labo 1
<!-- .slide: data-background-image="./resources/background-lab.svg" data-background-size="45%" -->
