## TP 1 : Démarrer une application Angular2

Dans ce premier TP, nous allons initier notre première application **Angular2**, qui sera réutilisée dans les TPs suivant. 

L'initialisation de cette étape se décomposera en plusieurs étapes : 

- Création d'un projet NPM
- Installation des dépendances NPM
- Configuration de TypeScript
- Implémentation de la page principale
- Création du composant principal
- Lancement du serveur afin de tester

###  Création d'un projet NPM

Nous allons utiliser l'outil **NPM** afin de gérer les dépendances de notre application. Nous allons télécharger : 
- des dépendances de développement (**typscript** et **live-server**)
- des dépendances de runtime (**angular2** et **SystemJS**)

Pour initier la configuration nécessaire à **NPM**, nous allons exécuter la commande `init` à la racine de votre répertoire de travail

```shell
mkdir formation-angular2
cd formation-angular2
npm init
```

Cette commande vous posera quelques questions auxquelles vous devez répondre avec de générer le fichier `package.json`

### Installation des dépendances NPM

Comme indiqué ci-dessus, nous allons télécharger depuis le repository NPM des dépendances de développement et des dépendances de runtime. 
En fonction du type de dépendance, la commande a exécuter va légèrement changer.

- Pour une dépendance de développement

```shell
npm install dependance_name --save-dev
``` 

- Pour une dépendance de runtime

```shell
npm install dependance_name --save
```

Les options `--save-dev` et `--save` permettent d'ajouter la dépendance téléchargée dans le fichier `package.json`.

- Téléchargez tout d'abord les dépendances de développement `typescript` et `live-server`
- Téléchargez ensuite les dépendances de runtime `Angular2` and `SystemJS`

Comme `Angular2` est toujours en version alpha, nous préférons specifier la version exacte que nous désirons utiliser : 

```shell
npm install angular2@2.0.0-alpha.46 systemjs@0.19.2 --save 
```

### Configuration de TypeScript

Le compilateur `tsc` se base sur un fichier de configuration `tsconfig.json`, dans lequel nous allons configurer les paramètres que nous définissons habituellement dans la ligne de commande. 
Le faire dans un fichier permet de s'assurer que tous les collaborateurs du projet utilisent la même configuration pour compiler les sources de votre application.

Vous pouvez générer ce fichier grâce à la commande suivante : 

```shell
mkdir src
cd src
tsc --init
```

Le fichier généré par défaut n'est pas suffisant. Faites les modifications nécessaires pour qu'il ressemble à cette configuration : 

```json
{
	"compilerOptions": {
		"target": "ES5",
		"module": "commonjs",
		"sourceMap": true,
		"emitDecoratorMetadata": true,
		"experimentalDecorators": true,
		"removeComments": false,
		"noImplicitAny": false
	}
}
```

Les paramètres `emitDecoratorMetadata` et `experimentalDecorators` sont des paramètres utiles à **Angular2**, afin des pouvoir utiliser le mécanisme des décorateurs que nous aborderons dans la suite de cette formation. 

Vous pouvez dès à présent compiler votre premier fichier TypeScript. Créez un fichier `src/app/AppComponent.ts` dans lequel nous allons implémenter le composant principal de notre application. 

Pour compiler votre fichier, utilisez la commande suivante : 

```shell
tsc -p app -w
``` 

- `-p` : pour spécifier le répertoire contenant nos sources TypeScript
- `-w` : pour compiler nos fichiers dès qu'une modification est détectée

Vous pouvez laisser votre terminal de côté, vos sources seront à présent compilées. Pour s'en assurer, copiez/collez le code suivant dans le fichier `AppComponent.ts` et vérifiez le fichier JavaScript généré

```typescript
class AppComponent {
}
```

### Implémentation de la page principale

Dans cette étape, nous allons implémenter notre page `index.html`. Dans celle-ci, nous devrons 
- Importer les librairies `Angular2`et `SystemJS`
- Configurer `SystemJS`

Veuillez créer un fichier `src/index.html` avec la structure suivante : 

```html
<html>
	<head>
		<title>Angular 2 QuickStart</title>
	</head>
	<body>
	</body>
</html>
```

Ensuite, veuillez importer les librairies **Angular2** et **SystemJS** précédemment téléchargées via `NPM`. Vous devriez trouver ces librairies dans le répertoire `node_modules`.

La dernière étape consiste à configurer **SystemJS** et de charger le composant principal de notre application (`app.ts` que nous implémenterons dans le point suivant).

Pour cela nous allons utiliser deux méthodes : 
- `System.config` : pour la configuration
- `System.import` : pour importer le composant principal   

Ajoutez la configuration ci-dessous dans votre fichier `index.html` : 

```html
<script>
	System.config({
		packages: {'app': {defaultExtension: 'js'}}
	});
	System.import('app/app');
</script>
```

### Création du composant principal

Nous n'allons pas entrer dans le détail de la création de composants Angular2. Elle fera le sujet d'un prochain chapitre. Pour tester notre simple application, veuillez copier/coller le code suivant dans le fichier `AppComponent.ts`

```typescript
import {Component, bootstrap} from "angular2/angular2"


@Component({
  selector: "app",
  template: `<h1>Hello</h1>`
})
class AppComponent {
}

bootstrap(AppComponent)
```

La méthode `bootstrap` est très importante. Elle indique au framework le composant principal de votre application, qui va permettre de commencer le rendu de votre application.  

Ce composant sera utilisé via un nouvel élément HTML `<app></app>` et aura pour but d'afficher un titre `h1` dans votre page. 

Ajoutez ce nouvel élément dans votre `index.html`

### Lancement du serveur afin de tester

Votre application est maintenant prête. Vous venez d'initialiser votre première application **Angular2**. Il est maintenant venu le temps de la tester. Pour cela nous allons utiliser le module `NPM` `live-server` que nous avons téléchargé précédemment. 

Dans le répertoire principal de votre application, lancez la commande suivante, et votre application sera normalement accessible à l'adresse `http://127.0.0.1:8080/src/`

```shell
live-server --open=src
```  