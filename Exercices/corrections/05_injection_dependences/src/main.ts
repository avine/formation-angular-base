import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { AppComponent, environment } from './app/';
import { CustomerService } from './app/service/customer.service';
import { ProductService } from './app/service/product.service';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [ProductService, CustomerService, {provide: String, useValue: 'Bienvenue sur Zenika Ecommerce'}]);

