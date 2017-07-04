import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { UpperCasePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';

import { SortPipe } from './pipes/sort.pipe';

import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'basket', component: BasketComponent}
]

@NgModule({
  declarations: [
    AppComponent, 
    MenuComponent, 
    ProductComponent, 
    BasketComponent,
    HomeComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
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
