# Communication avec une API REST

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
- **[Service HTTP](#/9)**

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonne Pratiques pour une migration heureuse](#/13)

Notes :



## HTTP

- *Angular2* fournit un ensemble de services pour pouvoir communiquer via des requêtes AJAX
- Services sont disponibles via un alias `HTTP_PROVIDERS` que nous devons définir dans la configuration de nos injecteurs
- Se base sur le pattern `Observable` contrairement à AngularJS et ses `Promises`
  - Plus grande flexibilité grâce aux différents opérateurs de `RxJS` : `retry`, ...
- Nous injecterons le service `Http` pour envoyer nos requêtes HTTP
- D'autres providers disponibles : `RequestOptions` similaire à `transformRequest` d'AngularJS
- Bonne pratique d'implémenter les appels REST dans des services

Notes :



## HTTP

- Exemple simple d'un service utilisant `Http`
  - Import d'`Http` depuis le module `angular2/http`
  - Injection du service via le constructeur
  - La méthode du service retournera le résultat de la requête `HTTP`

```typescript
import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class Service {
    constructor(private http:Http){ }

    getContacts(){
      return http.get('people.json');
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

- Requête HTTP de type `POST` avec surcharge des `Headers`

```typescript
import {Http, HTTP_PROVIDERS} from 'angular2/http';

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
import 'rxjs/Rx';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';
import {bootstrap} from 'angular2/platform/browser'
import {Component} from "angular2/core";

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
import 'rxjs/Rx'; import {MyObject} from "./MyObject";
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';
import {bootstrap} from 'angular2/platform/browser'; 
import {Component} from "angular2/core";

@Component({selector: 'app',template: '{{displayedData}}'})
export class AppComponent {
    private displayedData;

    constructor(private http:Http) {
        http.get('people.json')
            .map((result:Response) => result.json())
            .filter(data => data.hasToBeDisplayed)
            .map(data => new MyObject(data.id, data.name))
            .subscribe((jsonObject:MyObject) => {
            this.displayedData = jsonObject;
        })
    }
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);
```

Notes :



<!-- .slide: class="page-questions" -->
