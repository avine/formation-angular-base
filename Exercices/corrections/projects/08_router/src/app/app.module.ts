import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { SortPipe } from './pipes/sort.pipe';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    MenuComponent,
    SortPipe,
    HomeComponent,
    BasketComponent,
    ProductDetailComponent,
  ],
  imports: [BrowserModule, CommonModule, HttpClientModule, AppRoutingModule],
  providers: [
    { provide: 'welcomeMsg', useValue: 'Welcome to Zenika Ecommerces' },
    { provide: LOCALE_ID, useValue: navigator.language },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
