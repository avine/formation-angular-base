# Service HTTP

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular2](#/3)
- [Tests](#/4)
- [Template, Directives & Composants](#/5)
- [Les composants Angular2](#/6)
- [Injection de Dépendances](#/7)
- [Les Pipes](#/8)
- **[Service HTTP](#/9)**
- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonnes Pratiques pour une migration heureuse](#/13)

Notes :



## HTTP

- *Angular2* fournit un ensemble de services pour pouvoir communiquer via des requêtes AJAX
- Services sont disponibles via un alias `HTTP_PROVIDERS` que nous devons définir dans la configuration de nos injecteurs
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
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Http, HTTP_PROVIDERS, Headers} from '@angular/http';

export class AppComponent {
    constructor(private http:Http){ }

    save(contact){
      let headers = new Headers();
      headers.set('Content-Type', 'application/json');

      return this.http.put('rest/contacts/' + contact.id,
                                  JSON.stringify(contact), {'headers': headers});
    }
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);
```

Notes :



## HTTP - Observable

- Le pattern *Observable* se base sur la librairie *RxJS*
- Documentation ici : https://github.com/Reactive-Extensions/RxJS
- Traitement de tâches asynchrones similaires à des tableaux
- Permet d'avoir des traitements asynchrones retournant plusieurs données
- Un Observable peut être *cancelable*
- Utilisation de méthodes dérivées de la programmation fonctionnelle
    - `map`, `forEach`, `filter`, ...
- Utilisable pour les traitements asynchrones : WebSocket, gestion des événements JavaScript

Notes :



## HTTP - Exemple

- Exemple simple d'une requête HTTP

```typescript
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component} from "@angular/core";
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

bootstrap(AppComponent, [HTTP_PROVIDERS]);
```

Notes :



## HTTP - Exemple

- Exemple d'un Observable utilisant la méthode `filter`

```typescript
import 'rxjs/add/operator/map';
import {MyObject} from "./MyObject";
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component} from "@angular/core";

@Component({selector: 'app',template: '{{displayedData}}'})
export class AppComponent {
    private displayedData;

    constructor(private http:Http) {
        http.get('people.json')
            .flatMap((result:Response) => result.json())
            .filter(data => data.hasToBeDisplayed)
            .map(data => new MyObject(data.id, data.name))
            .subscribe((jsonObject:MyObject) => {
                this.displayedData = jsonObject;
            });
    }
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);
```

Notes :



## HTTP - Intercepteurs (NEW !!!)

- Possibilité de créer des Intercepteurs grâce
    - à l'injection de dépendances
    - à l'héritage

```typescript
import {HTTP_PROVIDERS, Http, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend} from '@angular/http';
import {ROUTER_PROVIDERS, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';

class HttpInterceptor extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private _router: Router) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
    			if (err.status  == 401 && !_.endsWith(err.url, 'api/auth/login')) {
                    this._router.navigate(['/login']);
                    return Observable.empty();
                } else {
                    return Observable.throw(err);
    			}
        });
    }
}

bootstrap(MyApp, [
  HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(Http, {
        useFactory: (xhrBackend, requestOptions, router: Router) => new HttpInterceptor(xhrBackend, requestOptions, router),
        deps: [XHRBackend, RequestOptions, Router]
    })
])
```

Notes : 



## HTTP - Surcharger les en-têtes (NEW !!!)

- Possibilité de surcharger les paramètres `HTTP` par défaut
  - grâce à l'injection de dépendances, utilisation du token `RequestOptions`
  - token utilisé dans le constructeur du service `Http`
  - utilisation de la classe `BaseRequestOptions` pour bénéficier des paramètres par défaut définis par *Angular*
  
```typescript
import {provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser/browser';
import {HTTP_PROVIDERS, Http, BaseRequestOptions, RequestOptions} from '@angular/http';
import {App} from './myapp';
class MyOptions extends BaseRequestOptions {
  search: string = 'coreTeam=true';
}
bootstrap(App, [HTTP_PROVIDERS, {provide: RequestOptions, useClass: MyOptions}]);
```

Notes : 



## HTTP - Tests

- Possibilité de définir une implémentation bouchonnée du service `Http`

```typescript
import {
  describe, it, expect, beforeEachProviders, inject
} from '@angular/core/testing';
import {Http, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import 'rxjs/add/operator/map';

describe('UserService', () => {
  beforeEachProviders(() => [
    MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions)
        => new Http(backend, defaultOptions),
      deps: [MockBackend, BaseRequestOptions]
    },
    UserService
  ]);
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
