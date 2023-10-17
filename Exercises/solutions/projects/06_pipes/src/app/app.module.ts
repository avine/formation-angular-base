import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appTitleProvider } from './app.token';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { SelectProductKeyComponent } from './select-product-key/select-product-key.component';
import { SortProductsPipe } from './sort-products/sort-products.pipe';

registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent, MenuComponent, ProductComponent, SelectProductKeyComponent, SortProductsPipe],
  imports: [BrowserModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    appTitleProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
