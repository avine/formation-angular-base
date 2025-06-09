# Validation des acquis - Angular

## Rappel des Objectifs :

* OBJ01: Comprendre l'écosystème du framework Angular
* OBJ02: Connaitre les fonctionnalités du framework Angular

## OBJ01

### Quelle est la fonctionnalité majeure de Typescript ?

- [ ] L'amélioration des performances
- [ ] Un meilleur support des versions récentes des navigateurs
- [x] Le typage statique
- [ ] Une gestion améliorée des valeurs null

### A quoi sert NPM pour un projet Angular ?

- [ ] Compiler le code source de l'application
- [x] Permet de télécharger les dépendances du projet
- [ ] Identifier les bugs à la compilation
- [ ] Vérifier la qualité du code

### A quoi sert le fichier package.json ?

- [ ] C'est un fichier de configuration pour le compilateur TypeScript
- [ ] Ce fichier n'existe pas
- [x] Lister les dépendances d'un projet Angular du point de vue de Node.js
- [ ] Fichier utilisé par la CLI d'Angular pour exécuter des commandes

### Qu'est-ce qu'une Single-Page Application (SPA) ?

- [x] Une application Web dont le contenu est généré côté client en JavaScript
- [ ] Une application Web qui n'a qu'une seule page
- [ ] Une application Web dont le contenu est généré côté client en HTML
- [ ] Une application en cours de développement

## OBJ02

### Quel élément ne permet pas de constituer un composant ?

- [ ] Un template HTML
- [ ] Une classe TypeScript
- [ ] Un sélecteur CSS
- [x] Une définition de type

### Laquelle de ces interpolations de texte est invalide dans le template d'un composant ?

- [ ] {{ 'Hello' }}
- [ ] {{ 'Hello' + ' World!' }}
- [x] {{ () => 'Hello World!' }}
- [ ] {{ true ? 'Ok' : 'Ko' }}

### Quelle syntaxe permet de lier une propriété ?

- [ ] `<img src="{{mySrc}}" />`
- [ ] `<img prop="{src: mySrc}" />`
- [x] `<img [src]="mySrc" />`
- [ ] `<img (src)="mySrc" />`

### Comment exposer une propriété de classe d'un composant Angular ?

- [ ] En l'initialisant avec la function entry()
- [x] En l'initialisant avec la function input()
- [ ] En l'initialisant avec la function output()
- [ ] En l'initialisant avec la function signal()

### Quel est l'objectif du contrôle de flux @for ?

- [ ] Ce contrôle n'existe pas dans Angular
- [ ] Pouvoir afficher l'élément uniquement si l'expression attachée au contrôle retourne true
- [ ] C'est un alias de @repeat
- [x] Pouvoir répéter plusieurs fois l'élément qu'il contient

### Quelle est la différence entre une Directive et un composant ?

- [ ] Une directive ne permet pas l'injection de dépendances
- [x] Une directive c'est comme un composant sans template et qui doit donc s'attacher à un élément hôte 
- [ ] Il n'y pas de différence. Ce sont des noms différents pour designer le même concept.
- [ ] Une directive ne permet pas d'interagir avec le DOM

### Laquelle de ces syntaxes est correcte en tant que Pipe Angular  ?

- [ ] {{ amount | currency | 'USD' }}
- [x] {{ amount | currency: 'USD' }}
- [ ] {{ amount | currency:: '$' }}
- [ ] Aucune n'est correcte

### Qu'est-ce que la CLI Angular ?

- [ ] Le module essentiel pour construire les bases de l'architecture
- [ ] Une libraire de composants graphiques
- [ ] Un moteur de rendu 
- [x] Un outil permettant de créer, faire évoluer et tester une application Angular

### Laquelle de ces fonctions ne fait pas partie de l'API des signaux ?

- [ ] effect()
- [ ] signal()
- [x] observable()
- [ ] computed()

### À quoi sert l'injection de dépendance Angular ?

- [ ] À automatiser le téléchargement des dépendances de l'application via NPM
- [x] À déléguer au framework l'instanciation des dépendances
- [ ] À accéder aux outils du framework depuis le template
- [ ] À configurer automatiquement l'application

### Lequel de ces décorateurs permet de définir une classe en tant que service ?

- [ ] @Inject
- [ ] @Service
- [ ] @NgService
- [x] @Injectable

### Laquelle de ces syntaxes permet d'injecter le `LoginService` dans un composant ?

- [x] myService = inject(LoginService);
- [ ] loginService = constructor(loginService: LoginService);
- [ ] loginservice = create(LoginService)
- [ ] @Injectable() loginService: LoginService;

### À quoi sert le `<router-outlet />` ?

- [ ] Une directive utilisée pour créer un lien vers une autre page
- [x] Une directive utilisée pour insérer le composant associé à la route active
- [ ] Un service fournit par Angular pour récupérer les paramètres de la route active
- [ ] Un composant fournit par angular pour afficher un fil d'Ariane sur la page

### Laquelle des propriétés suivantes n'existe pas dans `NgModel` ? 

- [ ] valid
- [x] async
- [ ] dirty
- [ ] untouched

### Laquelle de ces syntaxes permet d'accéder à l'instance `NgForm` dans un formulaire template-driven ?

- [ ] Turning an Observable into a Signal
- [ ] #model="ngModel"
- [x] #form="ngForm"
- [ ] [ngForm]="value"
