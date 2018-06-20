import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { MenuComponent } from './menu/menu.component';
import { SortPipe } from './pipes/sort.pipe';
import { HomeComponent } from './home/home.component';
import { BasketComponent } from './basket/basket.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'basket', component: BasketComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    MenuComponent,
    SortPipe,
    HomeComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    {provide: 'welcomeMsg', useValue: 'Bienvenue sur Zenika Ecommerce'},
    {provide: LOCALE_ID, useValue: navigator.language}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
