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
- `mergeMap(fn)` : applique fn comme map mais merge les valeurs qui sont des observables
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

- Exemple complet d'utilisation des Observables

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
  .mergeMap((rep1: SomeClass): Observable<SomeOtherClass> => {
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
- **Attention**, il faut la version *5+*, alors que la *4* est encore répendue
- *Angular* expose des objets *RxJS* dans plusieurs cas :
  - Requêtes HTTP
  - Intéraction avec un formulaire
  - Affichage des vues par le *router*
- *ngrx* est un projet qui propose d'étendre l'utilisation d'Rx avec Angular
  - *@ngrx/store*, *@ngrx/devtools*, *@ngrx/router*, ...

Notes :



## HTTP

- *Angular* fournit un module `HttpClientModule` dédié à la communication HTTP
- Ce module contient un ensemble de service pour les requêtes HTTP
- Avant *Angular 4.3*, utilisation du module `HttpModule`
- Se base sur le pattern `Observable`
  - Contrairement à AngularJS qui utilisait le pattern `Promises`
  - Plus grande flexibilité grâce aux différents opérateurs de `RxJS`
- Le point d'entré est le service `HttpClient` accessible via l'injection de dépendance
- Nombreuses configurations pour paramétrer ou transformer les requêtes
- Bonne pratique : implémenter les appels REST dans les services

Notes :



## HTTP - Exemple

- Exemple d'un service utilisant `HttpClient`
- Penser à `import` le `HttpClientModule` dans votre module
- Import de la classe `HttpClient` depuis le module `@angular/common/http`
- Injection du service via le constructeur
- La méthode du service retournera l'observable de la requête `HTTP`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Person } from './model/person';

@Injectable()
export class ContactService {
  constructor(private http: HttpClient){ }

  getContacts(): Observable<Person[]> {
    return this.http.get<Person[]>('people.json');
  }
}
```

Notes :



## HTTP - Configuration

- La requête HTTP peut être configurée via un paramètre supplémentaire

```typescript
interface RequestOptionsArgs {
  body?: any;
  headers?: Headers;
  observe?: 'body';
  reportProgress?: boolean:
  withCredentials?: boolean;
  responseType?: ResponseContentType;
}
```

Notes :



## HTTP - Configuration

- `HttpClient` propose également de nombreux raccourcis

```typescript
class HttpClient {
  request(url: string|Request, options?: RequestOptionsArgs): Observable<any>

  get(url: string, options?: RequestOptionsArgs): Observable<any>

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any>

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any>

  delete(url: string, options?: RequestOptionsArgs): Observable<any>
  /* ... */
}
```

Notes :



## HTTP - Exemple

- Requête HTTP de type `PUT` avec surcharge des `Headers`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from './model/contact';

Injectable()
export class ContactService {
  constructor(private http: HttpClient) { }

  save(contact: Contact): Observable<Contact> {
    const headers = new HttpHeaders();
    headers.set('Authorization', 'xxxxxxx');

    const requestOptions: RequestOptionsArgs = {
      headers
    };
    return this.http.put(`rest/contacts/${contact.id}`, contact, requestOptions);
  }
}
```

Notes :



## HTTP - Exemple

- Exemple avec l'utilisation d'opérateurs *RxJS*

```typescript
import {Component} from '@angular/core';
import {ContactService} from './contact.service';

@Component({
  selector: 'app',
  template: '{{ displayedData | json }}'
})
export class AppComponent {
  displayedData: Array<Contact>;

  constructor(private contactService: ContactService) {
    contactService.getContacts().subscribe(contacts => {
      this.displayedData = contacts;
    });
  }
}
```

Notes :



## HTTP - Exemple

- Exemple utilisant d'avantage d'opérateurs

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Project, Person } from './model/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app',
  template: `<ul>
    <li *ngFor="let project of (projects$ | async)">{{project.name}}</li>
  </ul>`
})
export class AppComponent {
  projects$: Observable<Project[]>
  constructor(http: HttpClient) {
    this.projects$ = http.get<Person[]>('person.json')
      .mergeMap((person: Person): Observable<Project[]> => getProjects(person))
  }
}
```

Notes :



## HTTP - Intercepteurs

- Possibilité de créer des intercepteurs
- S'appliqueront sur les requêtes et les réponses

```typescript
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const clone = req.clone({ setHeaders: {'Authorization': `token ${TOKEN}`} });
    return next.handle(clone);
  }

}
```

Notes :



## HTTP - Intercepteurs

- Enregistrement de l'intercepteurs via le token `HTTP_INTERCEPTORS` dans la configuration du module

```typescript
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './header.interceptor';

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true,
  }],
})
export class AppModule {}
```

Notes :



## HTTP - Tests

- *Angular* propose un module de test pour le système de requêtage : `HttpClientTestingModule`

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [UserService]
  }));

  /* ... */
});
```

Notes :



## HTTP - Tests

- `HttpTestingController` permet de programmer des requêtes et leurs réponses

```typescript
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';

/* ... */

it('return return 1 user', async(
  () => {
    const userService = TestBed.get(UserService);
    const http = TestBed.get(HttpTestingController);
    const mockedUsers = [{ name: 'Zenika' }];

    userService.getUsers().subscribe((users: User[]) => {
      expect(users.length).toBe(1);
    });

    http.expectOne('/api/users').flush(mockedUsers);
  }
)));
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp7" -->
