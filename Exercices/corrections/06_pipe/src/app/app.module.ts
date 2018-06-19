import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { MenuComponent } from './menu/menu.component';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    MenuComponent,
    SortPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide: 'welcomeMsg', useValue: 'Bienvenue sur Zenika Ecommerce'},
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
