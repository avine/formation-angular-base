# Service HTTP

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular](#/3)
- [Tests](#/4)
- [Template, Directives & Composants](#/5)
- [Les directives Angular](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- **[Service HTTP](#/9)**
- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)

Notes :



## Les Observables

- Le pattern *Observable* se base sur la librairie *RxJS*
- Documentation ici : https://github.com/Reactive-Extensions/RxJS
- Traitement de tâches asynchrones similaires à des tableaux
- Permet d'avoir des traitements asynchrones retournant plusieurs données
- Un Observable peut être *cancelable*
- Utilisation de méthodes dérivées de la programmation fonctionnelle
    - `map`, `forEach`, `filter`, ...
- Utilisable pour les traitements asynchrones : WebSocket, gestion des événements JavaScript

Notes :



## Les Observables

- Tout observable peut être, comme un tableau, utilisé par  des fonctions classiques :
    - take(n) va piocher les n premiers éléments.
    - map(fn) va appliquer la fonction fn sur chaque événement et retourner le résultat.
    - filter(predicate) laissera passer les seuls événements qui répondent positivement au prédicat.
    - reduce(fn) appliquera la fonction fn à chaque événement pour réduire le flux à une seule valeur unique.
    - merge(s1, s2) fusionnera les deux flux.
    - subscribe(fn) appliquera la fonction fn à chaque évènement qu’elle reçoit.
    - debounce(ms) retardera l'exécution d'un observable

Notes :




## Les Observables - Exemple simple

- Exmple complet d'utilisation des Observables
    - `getDataFromNetwork` et `getDateFromAnotherRequest` sont des traitements asynchrones

```typescript
getDataFromNetwork()
    .debounce(300)
    .filter (rep1 => rep1 != null)
    .flatMap(rep1 => getDateFromAnotherRequest(rep1))
    .map(rep2 => `${rep2} transformed`)
    .subscribe(value => console.log(`next => ${value}`))
```

Notes :




## Les Observables - Création

- Conversion de `setInterval` en `Observable`

```typescript
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

@Component({})
export class AppComponent {

  private subscriber:Subscriber;

  constructor() {
       let source = new Observable(observer => {
            let interval = setInterval(_ => observer.next('TICK'), 1000);
            return function () {
                observer.complete();
                clearInterval(interval);
            };
      });
      this.subscriber = source.subscribe(v => console.log(v));
  }

  reset() { this.subscriber.unsubscribe(); }

}
```

Notes  :



## Les Observables dans Angular

- Angular utilise ce système d'Observables à plusieurs endroits :
    - requêtes HTTP
    - intéraction avec un formulaire
    - affichage des vues par le *router*
    - *ngrx* : *ngrx/store*, *ngrx/devtools*, *ngrx/router*, ...

Notes :



## In Memory API

- L'équipe d'Angular propose le module *angular2-in-memory-api* pour commencer à intégrer une API sans serveur
    - se base sur une implémentation *in-memory* du service `XHRBackend`
    - idéal pour commencer les développements

```shell
npm install --save angular2-in-memory-web-api
```

- Nécessité d'implémenter l'interface `InMemoryDbService`
- Surcharger dans le système d'Injection de Dépendances l'implémentation de `XHRBackend` à utiliser

Notes :



## In Memory API

- Exemple d'utilisation :

    - Implémentation de l'interface `InMemoryDbService`

```typescript
import { InMemoryDbService }  from 'angular2-in-memory-web-api'

//API accessible via app/heroes
export class HeroData implements InMemoryDbService{
  createDb() {
    let heroes = [
      { id: '1', name: 'Windstorm' },
      { id: '2', name: 'Tornado' }
    ];
    //return {heroes: heroes};
    return {heroes};
  }
}
```

Notes :



## In Memory API

- Exemple d'utilisation :

    - Enregistrement de notre `InMemoryDbService`
    - Utilisation de l'implémentation `InMemoryBackendService` pour l'interface `XHRBackend`

```typescript
import { XHRBackend } from '@angular/http';
import { InMemoryBackendService, SEED_DATA }  from 'angular2-in-memory-web-api';
import { HeroData }   from './hero-data';

@NgModule({
  providers: [
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA,  useClass: HeroData }                // in-mem server data
  ],
})
export class AppModule { }
```

Notes :



## HTTP

- *Angular* fournit un ensemble de services pour pouvoir communiquer via des requêtes AJAX
- Services sont disponibles via le module `HttpModule` que nous devons importer dans notre module applicatif.
- Se base sur le pattern `Observable` contrairement à AngularJS et ses `Promises`
  - Plus grande flexibilité grâce aux différents opérateurs de `RxJS` : `retry`, ...
- Nous injecterons le service `Http` pour envoyer nos requêtes HTTP
- D'autres providers disponibles : `RequestOptions` similaire à `transformRequest` d'AngularJS
- Bonne pratique : implémenter les appels REST dans des services

Notes :



## HTTP

- Exemple simple d'un service utilisant `Http`
  - Import d'`Http` depuis le module `@angular/http`
  - Injection du service via le constructeur
  - La méthode du service retournera le résultat de la requête `HTTP`

```typescript
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpService {
    constructor(private http:Http){ }

    getContacts() {
      return this.http.get('people.json');
    }
}
```

Notes :



## HTTP - Configuration

- La requête HTTP pourra être configurée via un objet `RequestOptionsArgs`
- Possibilité de définir la méthode HTTP utilisée, les `headers`, le corps de la requête ...
- Structure de l'interface `RequestOptionsArgs` :

```typescript
url : string
method : string | RequestMethod
search : string | URLSearchParams
headers : Headers
body : string
```

- `RequestMethod` : enum avec les différents méthodes HTTP possibles
- `Headers` : correspond à la spécification `fetch`

Notes :



## HTTP - Exemple

- Requête HTTP de type `PUT` avec surcharge des `Headers`

```typescript
import {Http, Headers} from '@angular/http';

export class HttpService {
    constructor(private http:Http){ }

    save(contact){
      let headers = new Headers();
      headers.set('Content-Type', 'application/json');

      return this.http.put('rest/contacts/' + contact.id,
                                  JSON.stringify(contact), {'headers': headers});
    }
}
```

Notes :



## HTTP - Exemple

- Exemple simple d'une requête HTTP

```typescript
import {Http, Response} from '@angular/http';
import {Component} from '@angular/core';
import 'rxjs/add/operator/map';

@Component({selector: 'app', template: '{{displayedData}}'})
export class AppComponent {
    private displayedData;

    constructor(private http:Http) {
        http.get('people.json')
            .map((result:Response) => result.json())
            .subscribe(jsonObject => {
                this.displayedData = jsonObject;
            });
    }
}
```

Notes :



## HTTP - Exemple

- Exemple d'un Observable utilisant la méthode `filter`

```typescript
import 'rxjs/add/operator/map';
import {MyObject} from './MyObject';
import {Http, Response} from '@angular/http';
import {Component} from '@angular/core';

@Component({selector: 'app',template: '{{displayedData | json}}'})
export class AppComponent {
    private displayedData = [];

    constructor(private http:Http) {
        http.get('people.json')
            .map((result:Response) => result.json())
            .filter(data => data.hasToBeDisplayed)
            .map(data => new MyObject(data.id, data.name))
            .subscribe((jsonObject:MyObject) => {
                this.displayedData.push(jsonObject);
            });
    }
}
```

Notes :



## HTTP - Surcharger les en-têtes

- Possibilité de surcharger les paramètres `HTTP` par défaut
  - grâce à l'injection de dépendances, utilisation du token `RequestOptions`
  - token utilisé dans le constructeur du service `Http`
  - utilisation de la classe `BaseRequestOptions` pour bénéficier des paramètres par défaut définis par *Angular*

```typescript
import {provide} from '@angular/core';
import {Http, BaseRequestOptions, RequestOptions} from '@angular/http';

class MyOptions extends BaseRequestOptions {
  search: string = 'coreTeam=true';
}

@NgModule({
  providers: [{provide: RequestOptions, useClass: MyOptions}],
})
export class AppModule { }
```

Notes :



## HTTP - Tests

- Possibilité de définir une implémentation bouchonnée du service `Http`

```typescript
import {TestBed, inject} from '@angular/core/testing';
import {Http, RequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import 'rxjs/add/operator/map';

describe('UserService', () => {
  beforeEach(() => {
   TestBed.configureTestingModule({
     providers: [
       UserService,
       MockBackend,
       BaseRequestOptions,
       {
         provide: Http,
         useFactory: (backend: MockBackend, defaultsOptions: RequestOptions) =>
           new Http(backend, defaultsOptions),
         deps: [MockBackend, RequestOptions]
       }
     ]
   });
});
```

Notes :



## HTTP - Tests

- Création d'un test avec cette implémentation bouchonnée

```typescript
it('return return 1 user', inject([UserService, MockBackend],
  (service, mockBackend) => {
      let mockedUsers = [new User()];

      let response = new Response(new ResponseOptions({body: mockedUsers}));

      mockBackend.connections.subscribe(connection=>connection.mockRespond(response));

      service.getUsers().subscribe(users => {
          expect(users.length).toBe(1);
      });
  }));
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp7" -->
