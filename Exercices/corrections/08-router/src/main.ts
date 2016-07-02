import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent, environment } from './app/';
import { CustomerService } from './app/service/customer.service';
import { ProductService } from './app/service/product.service';

import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './app/home/home.component';
import { BasketComponent } from './app/basket/basket.component';

if (environment.production) {
  enableProdMode();
}

const routes: RouterConfig = [
  { path: '',  component: HomeComponent },
  { path: 'basket', component: BasketComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];

bootstrap(AppComponent, [
  HTTP_PROVIDERS, 
  APP_ROUTER_PROVIDERS,
  UpperCasePipe, ProductService, CustomerService, {provide: String, useValue: 'Bienvenue sur Zenika Ecommerce'}]);

