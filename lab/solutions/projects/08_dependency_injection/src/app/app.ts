import { Component, inject } from '@angular/core';
import { APP_TITLE } from './app.token';
import { BasketResource } from './basket/basket-resource';
import { CatalogResource } from './catalog/catalog-resource';
import { Menu } from './menu/menu';
import { ProductCard } from './product/product-card';
import { Product } from './product/product-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Menu, ProductCard],
})
export class App {
  private catalogResource = inject(CatalogResource);

  private basketResource = inject(BasketResource);

  appTitle = inject(APP_TITLE);

  products = this.catalogResource.products;

  productsInStock = this.catalogResource.productsInStock;

  total = this.basketResource.total;

  addToBasket({ id, title, price }: Product) {
    this.basketResource.addItem({ id, title, price });
    this.catalogResource.decreaseStock(id);
  }
}
