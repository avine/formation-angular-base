import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core'
import {UpperCasePipe} from 'angular2/common'
import {Application} from './app/application';
import {ProductService} from './app/service/ProductService'
import {CustomerService} from './app/service/CustomerService'
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_BINDINGS, HashLocationStrategy, LocationStrategy} from 'angular2/router';

bootstrap(Application, [
    HTTP_PROVIDERS,
    ROUTER_BINDINGS,
    UpperCasePipe,
    ProductService,
    CustomerService,
    provide(String, {useValue: 'Bienvenue sur Zenika Ecommerce'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
