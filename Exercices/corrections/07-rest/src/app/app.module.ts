import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UpperCasePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';

import { SortPipe } from './pipes/sort.pipe';

import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';

@NgModule({
  declarations: [
    AppComponent, 
    MenuComponent, 
    ProductComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ 
    ProductService, 
    CustomerService, 
    UpperCasePipe,
    {provide: 'welcomeMsg', useValue: 'Bienvenue sur Zenika Ecommerce'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
