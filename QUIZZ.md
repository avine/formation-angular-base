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