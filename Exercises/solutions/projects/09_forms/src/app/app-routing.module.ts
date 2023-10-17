import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketEmptyComponent } from './basket-empty/basket-empty.component';
import { BasketComponent } from './basket/basket.component';
import { basketGuard } from './basket/basket.guard';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details/product-details.config';

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: `product/:${PRODUCT_DETAILS_PARAM_KEY}`,
    component: ProductDetailsComponent,
  },
  {
    path: 'basket',
    component: BasketComponent,
    canMatch: [basketGuard],
  },
  {
    path: 'basket',
    component: BasketEmptyComponent,
  },
  {
    path: '**',
    redirectTo: 'catalog',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
