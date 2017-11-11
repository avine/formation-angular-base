## TP 1 : Démarrer une application Angular

Dans ce premier TP, nous allons initier notre première application **Angular**, qui sera réutilisée dans les TPs suivant.

L'initialisation de cette application se décomposera en plusieurs étapes :

- Création d'un projet Angular avec `@angular/cli`
- Implémentation de la page principale
- Création du composant principal
- Lancement du serveur afin de tester

### Création du projet

L'application, que nous allons implémenter, sera initialisée via l'outil `@angular/cli`. Cet outil va automatiser :

- la création et la configuration du squelette de l'application
- la gestion des dépendances


- Téléchargez `@angular/cli` en utilisant `NPM`. Ce module nécessite une version récente de *NodeJS*

- Depuis votre console, créez un nouveau projet via la commande `ng new Application --style=scss`

- Regardez la structure de l'application tout juste créée
	- dépendances installées
	- configuration TypeScript
	- les différents fichiers TypeScript

- Une fois cette étape terminée, vous pouvez à présent lancer votre application en exécutant la commande `npm start`. Cette commande va prendre en charge la compilation de vos sources et le lancement d'un serveur.

### Modification de l'application

Même si nous n'avons pas encore abordé les concepts du framework, nous allons faire des petites modifications afin de prendre en main la structure de notre application.

- Le composant principal devra contenir le code HTML suivant :

```html
<h1>Welcome to app!</h1>
```

- La chaîne de caractère ci-dessus pourra être modifiée par la variable `title` de la classe `Application`. Pour afficher cette variable dans le template, nous utiliserons la même syntaxe que AngularJS : `{{title}}`

- Vérifiez que vous obtenez bien la toute dernière version de votre application dans le navigateur.
