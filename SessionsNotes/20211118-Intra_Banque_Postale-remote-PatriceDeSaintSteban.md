# Ressenti global
Deux types de profils : des devs qui vont utiliser (ou utilise déjà) angular, et des managers (ou scrum masters) qui vont avoir un projet qui l'utilise. 
Les stagiaires étaient motivés (un des manageurs n'a pas fait les TP, il a eu des choses à gérer dans son travail, et comme il ne code pas, il est resté en observateur de la formation) et de bon retours.
La formation aurait besoin je pense d'un petit rafraichissement, dans le sens, qu'elle a été écrite lors du changement d'AngularJS vers Angular. Or depuis maintenant 5-6 ans qu'Angular 2 et plus existe, les stagiaires ne connaissent plus AngularJS (qui est maintenant presque plus utilisé).
Modifier les slides pour supprimer toutes les comparaisons avec comment on l'utilisait avant avec AngularJS réduirait de la complexité dans la formation.

# Problèmes

En utilisant Strigo, plusieurs soucis :
- Les raccourcis claviers ne sont pas disponibles dans la VM
- Il manque un pointer sur les slides pour montrer quelques choses
- Pas possible de partager un code html dans les snippets


# Planning

- Jour 1 : Fin avec le TP4 (Directive)
- Jour 2 : Fin pendant le TP6
- Jour 3 : matin Router, après midi Forms

# Kahoot
Reprise de l'idée de faire un kahoot, voici les questions que j'ai mis

# matin Jour 2
https://create.kahoot.it/share/formation-angular-jour-2/09fac25b-68bb-4cf3-9889-ac3daac429ef

Quel est la dernière version d'Angular ?
- 2
- 11
- *13*
- 42

Comment créer un nouveau projet angular ?
- ng create application
- ng --new application
- angular-cli new application
- *ng new application*

Qu'es-ce qu'utilise angular cli pour construire l'application
- *Webpack*
- Bazel
- Rollup
- Vite

Quel brique utiliser pour constuire un écran d'une application ?
- Service
- *Component*
- Directive
- Pipe

Lequel n'est pas une directive angular
- ngIf
- *ngShow*
- ngFor
- ngStyle

Dans le cycle de vie d'un composant, quel méthode est appelé en
dernier ?
- ngOnInit()
- ngAfterViewInit()
- *ngOnDestroy()*
- ngDoCheck()

Quel est la bonne façon de s'abonner à un évènement ?
- *(click)="onClick()"*
- [click]="onClick()"
- ngClick="onClick()"
- (on-click)="onClick()"

Comment ajouter du css sur un composant ?
- @Component({style:``})
- @Component({styleUrl:``})
- @Component({styles:``})
- *@Component({styleUrls:[``]})*

# matin Jour 3
https://create.kahoot.it/share/formation-angular-jour-3/987266b6-d797-42bc-bdc6-fb89442ea811

En mettant un service dans la section "providers" de @Component et le
module, combien d'instances de service existent ?
- 3
- 1
- aucune
- *2*

Quel annotation permet de décorer un service ?
- @Service()
- @Injectable()
- @Inject()
- @Injection()

Quel pipe(s) est(sont) fournis par Angular ?
- *DatePipe*
- SortPipe
- *LowerCasePipe*
- *CurrencyPipe*

Comment s'abonner à un observable ?
- *subscribe()*
- listen()
- subscrit()
- then()

Comment faire une requête post ?
- http.post('/basket')
- http.post('/basket', {})
- *http.post('/basket', {}).subscribe()*
- http.request('POST', '/basket', {body: {}})

Pour faire une requette HTTP, il faut injecter le service ?
- HttpCommonClient
- RestService
- *HttpClient*
- Http