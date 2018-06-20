import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { MenuComponent } from './menu/menu.component';
import { SortPipe } from './pipes/sort.pipe';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    MenuComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {provide: 'welcomeMsg', useValue: 'Bienvenue sur Zenika Ecommerce'},
    {provide: LOCALE_ID, useValue: navigator.language}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
