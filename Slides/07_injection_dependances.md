# Injection de<br>Dépendances

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
- **[Injection de Dépendances](#/7)**
- [Les Pipes](#/8)
- [Service HTTP](#/9)

Notes :



## Sommaire

<!-- .slide: class="toc" -->

- [Router](#/10)
- [Gestion des Formulaires](#/11)
- [Server-side Rendering](#/12)
- [Bonne Pratiques pour une migration heureuse](#/13)

Notes :



## Injecteurs

- Élément utilisé pour injecter les services
- 1 injecteur par composant contrairement à *AngularJS*
- 1 injecteur d'un composant hérite de celui du parent
- Nécessité de configurer les injecteurs
    - de manière globale via `bootstrap`
    - de manière locale via `@Component`
- Les services sont injectés via la constructeur du parent et sont des singletons

Notes :



## Configuration globale de l'Injecteur

- La méthode `bootstrap` peut prendre un second paramètre
- Ce paramètre est un tableau de `providers`

```typescript
import {MyService} from './myservice'

@Component({ ... })
export class AppComponent {
    constructor(service:MyService){
        console.log(service.myMethod());
    }   
}

bootstrap(AppComponent, [MyService]);
```

Notes :



## Configuration locale de l'Injecteur

- Possibilité de définir une propriété `providers` dans l'annotation `@Component`
- Même syntaxe que la configuration globale

```typescript
import {MyService} from './myservice'

@Component({
    providers: [MyService]
})
export class AppComponent {
    constructor(service:MyService){
        console.log(service.myMethod());
    }   
}

bootstrap(AppComponent, []);
```

Notes :



## Dépendances des services

- Nécessité d'ajouter l'annotation `@Injectable`
- Utilisé pour que *Angular2* puisse générér les métadatas nécessaires pour l'injection de dépendances
- Inutile pour les composants, car nous utilisons déjà `@Component`

```typescript
import {Injectable} from 'angular2/core';

@Injectable()
export class MyService {

    constructor(public logger:Logger){

    }
    myMethod(){ ... }

}
```

Notes :



## Configurer les providers

- Plusieurs syntaxes existent pour définir les providers
- Ces syntaxes peuvent être utilisées via `bootstrap` ou `Injectable`
- L'identifiant du provider peut être un objet, une chaîne de caractères ou un `OpaqueToken`

```typescript
bootstrap(AppComponent, [MyService]);
bootstrap(AppComponent, [new Provider(AppComponent, {useClass: AppComponent})]);
bootstrap(AppComponent, [provide(MyService, {useClass: MyService})]);
bootstrap(AppComponent, [provide(string, {useValue: 'hello world'})]);
bootstrap(AppComponent, [provide(string, {
    useFactory: (myService:MyService) => {
        return myService.myMethod();  
    },
    deps: [MyService]
})]);
```

Notes :



## Configurer les providers

- Lorsque nous avons des objets à injecter, et non des classes
- Possibilité de définir une chaîne de caractère comme identifiant
- *Angular2* convertit les objets et chaines de caratères en `OpaqueToken`
- Nécessité d'utilisation l'annotation `Inject` pour injecter ce genre de service

```typescript
let config = {
    apiEndpoint: 'api.heroes.com',
    title: 'The Hero Employment Agency'
};
bootstrap(AppComponent, [
    provide('config', {useValue:config})
]);

class AppComponent {
    constructor(@Inject('config') config){ ... }
}
```

Notes :



<!-- .slide: class="page-questions" -->
