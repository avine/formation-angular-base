import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { SortPipe } from './pipes/sort.pipe';
import { ProductComponent } from './product/product.component';

registerLocaleData(localeFr);
@NgModule({
  declarations: [AppComponent, ProductComponent, MenuComponent, SortPipe],
  imports: [BrowserModule, CommonModule],
  providers: [
    { provide: 'welcomeMsg', useValue: 'Welcome to Zenika Ecommerces' },
    { provide: LOCALE_ID, useValue: navigator.language },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
