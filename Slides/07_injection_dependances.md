# Injection de<br>Dépendances

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
- **[Injection de Dépendances](#/7)**
- [Les Pipes](#/8)
- [Service HTTP](#/9)
- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonnes Pratiques pour une migration heureuse](#/13)

Notes :



## Injecteurs

- Élément utilisé pour injecter les services
- Possibilité d'un injecteur par composant contrairement à *AngularJS* (un unique injecteur global)
- Les composants héritent de l'injecteur de leur parent
- Nécessité de configurer les injecteurs
    - de manière globale via `bootstrap`
    - de manière locale via `@Component`
- Les services sont injectés via la constructeur du parent et sont des singletons

Notes :



## Configuration globale de l'Injecteur

- La méthode `bootstrap` peut prendre un second paramètre
- Ce paramètre est un tableau de `providers`

```typescript
// fichier application.component.ts
import {MyService} from './myservice'

@Component({ ... })
export class AppComponent {
    constructor(service:MyService){
        console.log(service.myMethod());
    }
}

// fichier app.module.ts
import { MyService } from './services/myservice.service';

@NgModule({
  providers: [MyService],
})
export class AppModule { }
```

Notes :



## Configuration locale de l'Injecteur

- Possibilité de définir une propriété `providers` dans l'annotation `@Component`
- Même syntaxe que la configuration globale

```typescript
// fichier application.component.ts
import {MyService} from './myservice'

@Component({
    providers: [MyService]
})
export class AppComponent {
    constructor(service:MyService){
        console.log(service.myMethod());
    }
}
```

Notes :



## Dépendances des services

- Nécessité d'ajouter l'annotation `@Injectable`
- Utilisée pour que *Angular2* puisse générer les métadatas nécessaires pour l'injection de dépendances
- Inutile pour les composants, car nous utilisons déjà `@Component`

```typescript
import {Injectable} from '@angular/core';
import {Logger} from './logger-service';

@Injectable()
export class MyService {

    constructor(public logger:Logger){

    }
    myMethod(){ ... }

}
```

Notes :
- La documentation précise que c'est une (très) bonne pratique d'annoter tous les services avec @Injectable, même ceux n'ayant aucune dépendance (voir ici : https://angular.io/docs/ts/latest/guide/dependency-injection.html).
- Possibilité d'avoir des dépendances optionnelles (en utilisant l'annotation @Optional() sur le paramètre).



## Configurer les providers

- Plusieurs syntaxes existent pour définir les providers
- Ces syntaxes peuvent être utilisées via `bootstrap` ou `Component`
- L'identifiant du provider peut être un objet, une chaîne de caractères ou un `OpaqueToken`

```typescript
providers: [MyService]
providers: [new Provider(MyService, {useClass: MyService})]
providers: [{ provide: MyService, useClass: MyService }]
providers: [{
  provide: ServerConfig,
  useFactory: (appService: AppService) => appService.getConfig();
  deps: [AppService]
}]
```

Notes :



## Configurer les providers

- Lorsque nous avons des objets à injecter, et non des classes
- Possibilité de définir une chaîne de caractère comme identifiant
- Utilisation de l'objet `OpaqueToken` de préférence
- Nécessité d'utiliser l'annotation `Inject` pour injecter ce genre de service

```typescript
let apiUrl: string = 'api.heroes.com';
let env: string = 'dev';

@NgModule({
  providers: [{provide: 'apiUrl', useValue:apiUrl},{provide: 'env', useValue:env}],
})
export class AppModule { }

class AppComponent {
    constructor(@Inject('apiUrl') api:string) { ... }
}
```

Notes :



## Injection de Dépendances - Tests

- Possibilité de bénéficier de l'injection de dépendance grâce à la méthode `inject`
- Définition des services injectés dans les tests via la méthode `beforeEachProviders`
- Méthode `async` utilisée pour tester les services asynchrones (utilise le méchanisme de *Zone*)

```typescript
import {
  describe, it, expect, async, inject, beforeEachProviders
} from '@angular/core/testing';

describe('UserService', () => {

  beforeEachProviders(() => [UserService]);

  it('should return 1 user', async(inject([UserService], service => {
    service.getUsers().then(users => {
      expect(users.length).toBe(1);
    });
  })));
});
```

Notes :



<!-- .slide: class="page-questions" -->



<!-- .slide: class="page-tp5" -->
