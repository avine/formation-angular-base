## TP 1 : Démarrer une application Angular2

Dans ce premier TP, nous allons initier notre première application **Angular2**, qui sera réutilisée dans les TPs suivant.

L'initialisation de cette application se décomposera en plusieurs étapes :

- Création d'un projet Angular2 avec `angular-cli`
- Implémentation de la page principale
- Création du composant principal
- Lancement du serveur afin de tester

### Création du projet

L'application, que nous allons implémenter, sera initialiser via l'outil `angular-cli`. Cet outil va automatier
- la création et la configuration du squelette de l'application
- la gestion des dépendances


- Téléchargez `angular-cli` en utilisant `NPM`

- Depuis votre console, créez un nouveau projet via la commande `ng new Application`

- Regardez la structure de l'application tout juste créée
	- dépendances installées
	- configuration TypeScript
	- les différents fichiers TypeScript

- Une fois cette étape terminée, vous pouvez à présent lancer votre application en exécutant la commande `ng serve`. Cette commande va prendre en charge la compilation de vos sources et le lancement d'un serveur.

### Modification de l'application

Même si nous n'avons pas encore abordé les concepts du framework, nous allons faire des petites modifications afin de prendre en main la structure de notre application.

- Le composant principal doit contenir l'HTML suivant :

```html
<p>This is my first component</p>
```

- La chaîne de caractère ci-dessous sera définie dans une variable `helloMsg` de la classe `Application`. Pour afficher cette variable dans le template, nous utiliserons la même syntaxe que AngularJS : `{{helloMsg}}`

- Vérifiez que vous obtenez bien la toute de dernière version de votre application dans le navigteur.

- Ajoutez un test unitaire dans le fichier `application.spec.ts` pour tester la valeur de la variable qui vient d'être créée.

- Lancez les tests via `angular-cli` et `karma`

```shell
ng build
karma start
```
