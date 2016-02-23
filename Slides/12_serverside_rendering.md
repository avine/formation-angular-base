# Server-side Rendering

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular2](#/3)
- [Tests](#/4)
- [Composants](#/5)
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- [Service HTTP](#/9)

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Router](#/10)
- [Gestion des Formulaires](#/11)
- **[Server-side Rendering](#/12)**
- [Bonne Pratiques pour une migration heureuse](#/13)

Notes :



## Besoin

- Indexation par les moteur de recherche (SEO)
- Prévisualition (comme dans le partage facebook)
- Amélioration progressive
  - Proposer une version simple pour tous
  - Enrichir l'experience en fonction du client
  
  
- *Limiter le delais de chargement de l'application*
  
Notes :



## Angular Universal

- Projet Angular officiel
- Contient deux modules
  - Le premier rend le code coté serveur
  - Le deuxieme enregistre les actions de l'utilisateur pour les rejouer une fois l'interface completement chargé
- Le terme Universal vient de l'idée de pouvoir proposer l'application dans d'autre environnement que celui du navigateur 
- Encore en développement

![Angular Universal Logo](ressources/angular-universal-logo.png "Angular Universal Logo")

Notes :



## Mechanisme

- `AngularJS` fortement lié au DOM
- `Angular 2` introduit une séparation du mécanisme de rendu
  
  
![Angular Universal Architecture](ressources/angular-universal-architecture.png "Angular Universal Architecture")
  
Notes :



## Procédure de rendu

- Le moteur de rendu (Express en NodeJS) va construire le HTML
- Le plugin `Angular Universal` attaché va faire le `bootstrap` de l'application
- La réponse des appels REST est attendu
- La page complètement construire est retourné à l'utilisateur
- La librairie `Preboot` de `Angular Universal` enregistre les actions de l'utilisateur
- L'utilisateur termine de charger le code javascript
- La librairie `Preboot` rejoue les actions de l'utilisateur
  
Notes :



## Mise en place

- Le plus simple est de reprendre le starter 
https://github.com/angular/universal-starter

- Créer deux point d'entré pour l'application
  - Classique pour le client avec la fonction `bootstrap`
  - Pour le serveur avec la mise en place de `Express` et de `Angular Universal`
  
Notes :



<!-- .slide: class="page-questions" -->
