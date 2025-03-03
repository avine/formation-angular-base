import { Routes } from '@angular/router';
import { BasketEmptyComponent } from './basket-empty/basket-empty.component';
import { BasketComponent } from './basket/basket.component';
import { basketGuard } from './basket/basket.guard';
import { CatalogComponent } from './catalog/catalog.component';
import { PRODUCT_DETAILS_PARAM_KEY } from './product-details/product-details.config';

export const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: `product/:${PRODUCT_DETAILS_PARAM_KEY}`,
    loadComponent: () => import('./product-details/product-details.component'),
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
