# Service HTTP

<!-- .slide: class="page-title" -->

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Rappels](#/1)
- [Présentation](#/2)
- [Démarrer une application Angular](#/3)
- [Tests](#/4)
- [Template & Composants](#/5)
- [Directives](#/6)
- [Injection de Dépendances](#/7)
- [Pipes](#/8)
- **[Service HTTP](#/9)**
- [Router](#/10)
- [Formulaires](#/11)
- [Server-side Rendering](#/12)

Notes :



## RxJS

- *Angular* a une dépendance forte sur la librairie *RxJS 5+*
- Elle est très utilisée dans le coeur du framework
- *RxJS* est une librairie permettant de faire du **Reactive Programming**
- C'est un nouveau paradigme de programmation très en vogue
- Il en existe de nombreuses implémentations : http://reactivex.io/
- Documentaion pour *RxJS* : https://github.com/ReactiveX/rxjs



## Observables

- Les `Observable` sont la notion centrale dans la librairie *RxJS*
- Ils représentent un flux de données, on parle souvent de **stream**
- Permet le traitement de tâches asynchrones similaires à des tableaux
- Remplace l'utilisation des promesses qu'il y avait dans *AngularJS*
- Apporte des avantages par rapport aux promessses
  - Permet d'avoir des traitements asynchrones retournant plusieurs données
  - Un Observable peut être *cancelable*
  - Propose de nombreux outils pour traiter les données
- Utilisable pour tous les traitements asynchrones

  Requêtes HTTP, WebSocket, gestion des événements

Notes :



## Observables

- *RxJS* fourni une liste importante d'opérateurs pour les `Observable`
- Ces opérateurs s'inspirent largement des transformations sur un tableau
- `take(n)` : pioche les n premiers éléments et coupe le flux
- `filter(fn)` : laisser passer les événements pour lesquels fn rend `true`
- `map(fn)` : applique la fonction fn sur chaque élément et retourner le résultat
- `merge(s1, s2)` : fusionne la source aux observables en argument
- `flatMap(fn)` : applique fn comme map mais merge les valeurs qui sont des observables
- `debounce(ms)` : retarde et filtre pour n'envoyer un élément que lorsqu'il n'y a pas eu de nouveaux éléments depuis le temps en argument
- Ressource importante pour apprendre les opérateurs : http://rxmarbles.com/

Notes :



## Subscriptions

- Pour écouter le résultat d'un flux, il faut utiliser la méthode `subscribe`
- **Attention**
  - `subscribe` n'est pas un opérateur, il ne peux pas être chaîné
  - Il rend un objet `subscription` qui permet de stopper l'écoute
  - Un observable qui n'a pas été **subscribed** ne **démarre** pas
  - Un observable ne peut être écouté qu'une seule fois
- `subscribe` prend trois fonctions en arguments, tous optionnels
  - `next` : Appelé pour chaque élément dans le flux
  - `error` : Appelé pour chaque erreur dans le flux
  - `complete` : Appelé lors de la fermeture du flux

Notes :



## Exemple

- Exmple complet d'utilisation des Observables

```typescript
function getDataFromNetwork(): Observable<SomeClass> {
  /* ... */
}

function getDataFromAnotherRequest(arg: SomeClass): Observable<SomeOtherClass> {
  /* ... */
}

getDataFromNetwork()
  .debounce(300)
  .filter((rep1: SomeClass): boolean => rep1 !== null)
  .flatMap((rep1: SomeClass): Observable<SomeOtherClass> => {
    return getDataFromAnotherRequest(rep1);
  })
  .map((rep2: SomeOtherClass): string => `${rep2} transformed`)
  .subscribe((value: string) => console.log(`next => ${value}`));
```

Notes :



## Création

- Il existe de nombreux initialiseur à partir d'un tableau par exemple
- Possibilité également d'en créer un via le constructeur

```typescript
import { Observable, Subscriber } from "rxjs";

@Component({ ... })
export class AppComponent {
  private subscriber: Subscriber;

  constructor() {
    const source = new Observable(observer => {
      const interval = setInterval(() => observer.next('TICK'), 1000);
      return () => {
        observer.complete();
        clearInterval(interval);
      };
    });
    this.subscriber = source.subscribe(value => console.log(value));
  }

  reset() { this.subscriber.unsubscribe(); }
}
```

Notes :



## RxJS et Angular

- *Angular* utilise énormément *RxJS* en interne
- La dépendance est en mode **peer** c'est à dire qu'elle est à ajouter en plus
- **Atention**, il faut la version *5+*, alors que la *4* est encore répendue
- *Angular* expose des objets *RxJS* dans plusieurs cas :
  - Requêtes HTTP
  - Intéraction avec un formulaire
  - Affichage des vues par le *router*
- *ngrx* est un projet qui propose d'étendre l'utilisation d'Rx ave Angular
  - *@ngrx/store*, *@ngrx/devtools*, *@ngrx/router*, ...

Notes :



## HTTP

- *Angular* fournit un module dédié à la communication HTTP
- Ce module contient un ensemble de service pour les requêtes HTTP
- Le module `HttpModule` est à importer explicitement
- Se base sur le pattern `Observable`
  - Contrairement à AngularJS qui utilisait le pattern `Promises`
  - Plus grande flexibilité grâce aux différents opérateurs de `RxJS`
- Le point d'entré est le service `Http` accessible via l'injection de dépendance
- Nombreuses configurations pour paramétrer ou transformer les requêtes
- Bonne pratique : implémenter les appels REST dans les services

Notes :



## HTTP - Exemple

- Exemple d'un service utilisant `Http`
- Penser à `import` le `HttpModule` dans votre module
- Import de la classe `Http` depuis le module `@angular/http`
- Injection du service via le constructeur
- La méthode du service retournera l'observable de la requête `HTTP`

```typescript
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ContactService {
  constructor(private http: Http){ }

  getContacts(): Observable<Response> {
    return this.http.get('people.json');
  }
}
```

Notes :



## HTTP - Configuration

- La requête HTTP peut être configurée via un objet `RequestOptionsArgs`

```typescript
interface RequestOptionsArgs {
  url: string
  method: string|RequestMethod
  search: string|URLSearchParams|{[key: string]: any | any[]}
  params: string|URLSearchParams|{[key: string]: any | any[]}
  headers: Headers
  body: any
  withCredentials: boolean
  responseType: ResponseContentType
}
```

Notes :



## HTTP - Configuration

- `Http` propose également de nombreux raccourcis

```typescript
class Http {
  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response>

  get(url: string, options?: RequestOptionsArgs): Observable<Response>

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>

  delete(url: string, options?: RequestOptionsArgs): Observable<Response>
  /* ... */
}
```

Notes :



## HTTP - Exemple

- Requête HTTP de type `PUT` avec surcharge des `Headers`

```typescript
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';
import { Contact } from './model/contact';

Injectable()
export class ContactService {
  constructor(private http: Http) { }

  save(contact: Contact): Observable<Response> {
    const headers = new Headers();
    headers.set('Authorization', 'xxxxxxx');

    const requestOptions: RequestOptionsArgs = {
      url: `rest/contacts/${contact.id}`,
      method: RequestMethod.Put,
      body: contact,
      headers
    };
    return this.http.request(requestOptions);
  }
}
```

Notes :



## HTTP - Exemple

- Exemple avec l'utilisation d'opérateurs *RxJS*

```typescript
import {Http, Response} from '@angular/http';
import {Component} from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app', 
  template: '{{ displayedData | json }}'
})
export class AppComponent {
  private displayedData: string;

  constructor(private http: Http) {
    http.get('people.json')
      .map((result: Response): any => result.json())
      .subscribe((jsonObject: any): void => {
        this.displayedData = jsonObject;
      });
  }
}
```

Notes :



## HTTP - Exemple

- Exemple utilisant d'avantage d'opérateurs

```typescript
import { Http, Response } from '@angular/http';
import { Component } from '@angular/core';
import { Project, Person } from './model/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app',
  template: `<ul>
    <li *ngFor="project of (projects$ | async)">{{project.name}}</li>
  </ul>`
})
export class AppComponent {
  projects$: Observable<Project[]>
  constructor(http: Http) {
    this.projects$ = http.get('person.json')
      .map((result: Response): Person => result.json())
      .mergeMap((person: Person): Observable<Project[]> => getProjects(person))
  }
}
```

Notes :



## HTTP - RequestOptions

- Possibilité de surcharger les paramètres `HTTP` pour toutes les requêtes
- Il faut surcharger `RequestOptions` dans l'injection de dépendances
- Le service `Http` utilise `RequestOptions` par injection
- *Angular* fournit la classe `BaseRequestOptions` de laquelle il faut partir

```typescript
import { Http, BaseRequestOptions, RequestOptions } from '@angular/http';

class MyOptions extends BaseRequestOptions {
  search: string = 'coreTeam=true';
}

@NgModule({
  providers: [
    { provide: RequestOptions, useClass: MyOptions }
  ]
})
export class AppModule { }
```

Notes :



## HTTP - Tests

- *Angular* propose un **Mock** pour le système de requêtage : `MockBackend`

```typescript
import { XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed } from '@angular/core/testing';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  /* ... */
});
```

Notes :



## HTTP - Tests

- `MockBackend` permet de programmer des requêtes et leurs réponses

```typescript
import { Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';

/* ... */

it('return return 1 user', async(inject([ UserService, XHRBackend ],
  (service, mockBackend) => {
    const mockedUsers = [ new User() ];
    const response = new Response(new ResponseOptions({ body: mockedUsers }));

    mockBackend.connections.subscribe(
      connection => connection.mockRespond(response)
    );

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(1);
    });
  }
)));
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp7" -->
