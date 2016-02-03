import {bootstrap} from 'angular2/platform/browser';
import {provide} from 'angular2/core'
import {UpperCasePipe} from 'angular2/common'
import {Application} from './app/application';
import {ProductService} from './app/service/ProductService'
import {CustomerService} from './app/service/CustomerService'

bootstrap(Application, [
    UpperCasePipe,
    ProductService,
    CustomerService,
    provide(String, {useValue: 'Bienvenue sur Zenika Ecommerce'})
]);
