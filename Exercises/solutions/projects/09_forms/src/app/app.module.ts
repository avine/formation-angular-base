import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appTitleProvider } from './app.token';
import { BasketEmptyComponent } from './basket-empty/basket-empty.component';
import { BasketComponent } from './basket/basket.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { CheckoutReactiveFormComponent } from './checkout-reactive-form/checkout-reactive-form.component';
import { MenuComponent } from './menu/menu.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { SelectProductKeyComponent } from './select-product-key/select-product-key.component';
import { SortProductsPipe } from './sort-products/sort-products.pipe';

registerLocaleData(localeFr);

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    appTitleProvider,
  ],
  declarations: [
    AppComponent,
    BasketEmptyComponent,
    BasketComponent,
    CatalogComponent,
    CheckoutFormComponent,
    MenuComponent,
    ProductDetailsComponent,
    ProductComponent,
    SelectProductKeyComponent,
    SortProductsPipe,
    CheckoutReactiveFormComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
