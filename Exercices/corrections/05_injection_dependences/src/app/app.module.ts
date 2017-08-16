import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { MenuComponent } from './menu/menu.component';
import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    ProductService,
    CustomerService,
    {provide: 'welcomeMsg', useValue: 'Bienvenue sur Zenika Ecommerce'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
